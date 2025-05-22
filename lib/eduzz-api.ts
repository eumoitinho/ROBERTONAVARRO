import { getEduzzToken } from "./eduzz-auth"
import { sql } from "./db"

const EDUZZ_API_BASE = "https://api.eduzz.com"

// Generic function to make authenticated requests to Eduzz API
export async function eduzzRequest<T>(endpoint: string, method = "GET", body?: any): Promise<T> {
  try {
    const token = await getEduzzToken()

    const url = `${EDUZZ_API_BASE}${endpoint}`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      token: token, // As specified in the documentation
    }

    const options: RequestInit = {
      method,
      headers,
      cache: "no-store", // Ensure we don't use cached responses
    }

    if (body && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(body)
    }

    console.log(`[Eduzz API] ${method} ${url}`, body ? { body } : "")
    console.log(`[Eduzz API] Using token: ${token.substring(0, 10)}...`)

    const response = await fetch(url, options)

    if (!response.ok) {
      let errorDetails = ""
      try {
        errorDetails = await response.text()
      } catch (e) {
        errorDetails = response.statusText
      }
      throw new Error(`Eduzz API error: ${errorDetails} (Status: ${response.status})`)
    }

    const text = await response.text()
    if (!text) {
      throw new Error("Empty response from Eduzz API")
    }

    return JSON.parse(text)
  } catch (error) {
    console.error("Error in Eduzz API request:", error)
    throw error
  }
}

// Get list of products (events)
export async function getEduzzProducts(): Promise<any[]> {
  const response = await eduzzRequest<any>("/content/content_list")
  return response.data || []
}

// Get product details
export async function getEduzzProduct(productId: number): Promise<any> {
  const response = await eduzzRequest<any>(`/content/content/${productId}`)
  return response.data?.[0] || null
}

// Create a sale/invoice
export async function createEduzzInvoice(invoiceData: any): Promise<any> {
  // Make sure we're using the correct endpoint for creating invoices
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

    // Get products from Eduzz
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
