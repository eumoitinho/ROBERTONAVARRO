import { getEduzzToken } from "./eduzz-auth"
import { sql } from "./db"

const EDUZZ_API_BASE = "https://api.eduzz.com"
const EDUZZ_API_BASE_V2 = "https://api2.eduzz.com"

// Generic function to make authenticated requests to Eduzz API v1
export async function eduzzRequest<T>(endpoint: string, method = "GET", body?: any): Promise<T> {
  try {
    const token = process.env.EDUZZ_API_TOKEN

    const url = `${EDUZZ_API_BASE}${endpoint}`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }

    const options: RequestInit = {
      method,
      headers,
      cache: "no-store",
    }

    if (body && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(body)
    }

    console.log(`[Eduzz API v1] ${method} ${url}`, body ? { body } : "")
    if (token) {
      console.log(`[Eduzz API v1] Using token: ${token.substring(0, 10)}...`)
    } else {
      throw new Error("Eduzz API token is not defined")
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      let errorDetails = ""
      try {
        errorDetails = await response.text()
      } catch (e) {
        errorDetails = response.statusText
      }
      throw new Error(`Eduzz API v1 error: ${errorDetails} (Status: ${response.status})`)
    }

    const text = await response.text()
    if (!text) {
      throw new Error("Empty response from Eduzz API v1")
    }

    return JSON.parse(text)
  } catch (error) {
    console.error("Error in Eduzz API v1 request:", error)
    throw error
  }
}

// Generic function to make authenticated requests to Eduzz API v2
export async function eduzzRequestV2<T>(endpoint: string, method = "GET", body?: any): Promise<T> {
  try {
    const token = process.env.EDUZZ_API_TOKEN

    const url = `${EDUZZ_API_BASE_V2}${endpoint}`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }

    const options: RequestInit = {
      method,
      headers,
      cache: "no-store",
    }

    if (body && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(body)
    }

    console.log(`[Eduzz API v2] ${method} ${url}`, body ? { body } : "")
    if (token) {
      console.log(`[Eduzz API v2] Using token: ${token.substring(0, 10)}...`)
    } else {
      throw new Error("Eduzz API token is not defined")
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      let errorDetails = ""
      try {
        errorDetails = await response.text()
      } catch (e) {
        errorDetails = response.statusText
      }
      throw new Error(`Eduzz API v2 error: ${errorDetails} (Status: ${response.status})`)
    }

    const text = await response.text()
    if (!text) {
      throw new Error("Empty response from Eduzz API v2")
    }

    return JSON.parse(text)
  } catch (error) {
    console.error("Error in Eduzz API v2 request:", error)
    throw error
  }
}

// Get list of products (events) - now using API v2
export async function getEduzzProducts(): Promise<any[]> {
  const response = await eduzzRequestV2<any>("/content/content_list")
  return response.data || []
}

// Get product details (still using v1)
export async function getEduzzProduct(productId: number): Promise<any> {
  const response = await eduzzRequest<any>(`/content/content/${productId}`)
  return response.data?.[0] || null
}

// Create a sale/invoice (still using v1)
export async function createEduzzInvoice(invoiceData: any): Promise<any> {
  return eduzzRequest<any>("/sun/v1/cart", "POST", invoiceData)
}

// Map our event to Eduzz product ID
export async function getEduzzProductIdForEvent(eventId: number): Promise<number | null> {
  try {
    // First, check our mapping table
    const mappingResult = await sql`
      SELECT eduzz_product_id 
      FROM event_product_mapping 
      WHERE event_id = ${eventId}
    `

    if (mappingResult && mappingResult.rows.length > 0) {
      return mappingResult.rows[0].eduzz_product_id
    }

    // If no mapping found, try to find by name
    const eventResult = await sql`
      SELECT name FROM events WHERE id = ${eventId}
    `

    if (!eventResult || eventResult.rows.length === 0) {
      return null
    }

    const eventName = eventResult.rows[0]?.name

    if (!eventName) {
      return null
    }

    // Get products from Eduzz (v2)
    const products = await getEduzzProducts()

    // Find product with matching name
    const matchingProduct = products.find(
      (p) =>
        p.content_title?.toLowerCase().includes(eventName.toLowerCase()) ||
        eventName.toLowerCase().includes(p.content_title?.toLowerCase() || ""),
    )

    if (matchingProduct) {
      // Store the mapping for future use
      await sql`
        INSERT INTO event_product_mapping (event_id, eduzz_product_id)
        VALUES (${eventId}, ${matchingProduct.content_id})
        ON CONFLICT (event_id, eduzz_product_id) DO NOTHING
      `

      return matchingProduct.content_id
    }

    return null
  } catch (error) {
    console.error("Error mapping event to Eduzz product:", error)
    return null
  }
}