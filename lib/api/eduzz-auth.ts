const EDUZZ_API_BASE = "https://api2.eduzz.com"
const EDUZZ_AUTH_URL = "https://accounts.eduzz.com/oauth/authorize" // Replace with actual URL if different
const EDUZZ_TOKEN_URL = "https://accounts.eduzz.com/oauth/token" // Replace with actual URL if different

// Cache for token to avoid unnecessary requests
let cachedToken: { token: string; expiry: number } | null = null

/**
 * Get a JWT token from Eduzz API using direct credentials
 * The token is valid for 15 minutes
 */
export async function getEduzzToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  // Check if cached token is still valid (with 1-minute margin)
  if (cachedToken && cachedToken.expiry > now + 60) {
    console.log("[Eduzz Auth] Using cached token")
    return cachedToken.token
  }

  console.log("[Eduzz Auth] Generating new token")

  const email = process.env.EDUZZ_EMAIL
  const publicKey = process.env.EDUZZ_PUBLIC_KEY
  const apiKey = process.env.EDUZZ_API_KEY

  if (!email || !publicKey || !apiKey) {
    throw new Error("Eduzz credentials not configured")
  }

  const url = `${EDUZZ_API_BASE}/credential/generate_token`
  const body = new URLSearchParams({
    email,
    publickey: publicKey,
    apikey: apiKey,
  })

  try {
    console.log(`[Eduzz Auth] Requesting token from ${url}`)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store", // Ensure we don't use cached responses
    })

    console.log(`[Eduzz Auth] Token response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to generate token: ${errorText || response.statusText} (Status: ${response.status})`)
    }

    const data = await response.json()
    console.log(`[Eduzz Auth] Token response:`, data)

    if (!data.success || !data.data?.token) {
      throw new Error(`Invalid API response: ${JSON.stringify(data)}`)
    }

    const token = data.data.token

    // Decode token to get expiration time
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      cachedToken = { token, expiry: payload.exp }
      console.log(`[Eduzz Auth] Token generated, expires at: ${new Date(payload.exp * 1000).toISOString()}`)
    } catch (e) {
      console.warn("[Eduzz Auth] Could not decode token payload, using default expiry")
      // If we can't decode the token, use a default expiry of 15 minutes
      cachedToken = { token, expiry: now + 15 * 60 }
    }

    return token
  } catch (error) {
    console.error("[Eduzz Auth] Error getting token:", error)
    throw error
  }
}

/**
 * Check if we have a valid token
 */
export async function hasValidEduzzToken(): Promise<boolean> {
  try {
    // Try to get a token - this will use the cache if available
    await getEduzzToken()
    return true
  } catch (error) {
    console.error("[Eduzz Auth] Token validation failed:", error)
    return false
  }
}

/**
 * Generate the authorization URL for Eduzz OAuth
 */
export function getEduzzAuthUrl(state: string): string {
  const clientId = process.env.EDUZZ_CLIENT_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/eduzz/callback`

  if (!clientId) {
    throw new Error("Eduzz client ID not configured")
  }

const params = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: "myeduzz.products.read myeduzz.invoices.write sun_cart_write",
  state,
});



  return `${EDUZZ_AUTH_URL}?${params.toString()}`
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<any> {
  const clientId = process.env.EDUZZ_CLIENT_ID
  const clientSecret = process.env.EDUZZ_CLIENT_SECRET
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/eduzz/callback`

  if (!clientId || !clientSecret) {
    throw new Error("Eduzz OAuth credentials not configured")
  }

  const response = await fetch(EDUZZ_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to exchange code for token: ${JSON.stringify(error)}`)
  }

  return await response.json()
}
