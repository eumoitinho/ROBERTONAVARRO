import { cookies } from "next/headers"
import type { EduzzToken } from "./eduzz-types"

const EDUZZ_CLIENT_ID = process.env.EDUZZ_CLIENT_ID!
const EDUZZ_CLIENT_SECRET = process.env.EDUZZ_CLIENT_SECRET!
const EDUZZ_REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/eduzz/callback`
const EDUZZ_AUTH_URL = "https://accounts.eduzz.com/oauth/authorize"
const EDUZZ_TOKEN_URL = "https://accounts.eduzz.com/oauth/token"

// Generate the authorization URL for Eduzz OAuth
export function getEduzzAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: EDUZZ_CLIENT_ID,
    redirect_uri: EDUZZ_REDIRECT_URI,
    response_type: "code",
    scope: "myeduzz.products.read myeduzz.invoices.write",
    state,
  })

  return `${EDUZZ_AUTH_URL}?${params.toString()}`
}

// Exchange authorization code for access token
export async function exchangeCodeForToken(code: string): Promise<EduzzToken> {
  const response = await fetch(EDUZZ_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: EDUZZ_CLIENT_ID,
      client_secret: EDUZZ_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: EDUZZ_REDIRECT_URI,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to exchange code for token: ${JSON.stringify(error)}`)
  }

  const token = await response.json()

  // Store token in cookies
  const cookieStore = await cookies()
  cookieStore.set("eduzz_token", JSON.stringify(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: token.expires_in,
    path: "/",
  })

  return token
}

// Refresh the access token
export async function refreshToken(refresh_token: string): Promise<EduzzToken> {
  const response = await fetch(EDUZZ_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: EDUZZ_CLIENT_ID,
      client_secret: EDUZZ_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to refresh token: ${JSON.stringify(error)}`)
  }

  const token = await response.json()

  // Update token in cookies
  const cookieStore = await cookies()
  cookieStore.set("eduzz_token", JSON.stringify(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: token.expires_in,
    path: "/",
  })

  return token
}

// Get the current token from cookies
export async function getEduzzToken(): Promise<EduzzToken | null> {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get("eduzz_token")

  if (!tokenCookie) {
    return null
  }

  try {
    const token = JSON.parse(tokenCookie.value) as EduzzToken

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000)
    if (token.created_at + token.expires_in <= now) {
      // Token is expired, try to refresh
      return await refreshToken(token.refresh_token)
    }

    return token
  } catch (error) {
    console.error("Error parsing token:", error)
    return null
  }
}
