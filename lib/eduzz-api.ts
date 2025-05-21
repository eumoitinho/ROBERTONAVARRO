import { getEduzzToken } from "./eduzz-auth"
import type { EduzzProduct, EduzzInvoice, CreateInvoiceRequest } from "./eduzz-types"

const EDUZZ_API_BASE = "https://api.eduzz.com"

// Helper function to make authenticated requests to Eduzz API
async function eduzzRequest<T>(endpoint: string, method = "GET", body?: any): Promise<T> {
  const token = await getEduzzToken()

  if (!token) {
    throw new Error("No authentication token available")
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token.access_token}`,
    "Content-Type": "application/json",
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${EDUZZ_API_BASE}${endpoint}`, options)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }))
    throw new Error(`Eduzz API error: ${JSON.stringify(error)}`)
  }

  return response.json()
}

// Get all products (events)
export async function getEduzzProducts(): Promise<EduzzProduct[]> {
  return eduzzRequest<EduzzProduct[]>("/myeduzz/v1/products")
}

// Get a specific product by ID
export async function getEduzzProduct(productId: number): Promise<EduzzProduct> {
  return eduzzRequest<EduzzProduct>(`/myeduzz/v1/products/${productId}`)
}

// Create an invoice for ticket purchase
export async function createEduzzInvoice(invoiceData: CreateInvoiceRequest): Promise<EduzzInvoice> {
  return eduzzRequest<EduzzInvoice>("/myeduzz/v1/invoices", "POST", invoiceData)
}

// Get invoice details
export async function getEduzzInvoice(invoiceId: number): Promise<EduzzInvoice> {
  return eduzzRequest<EduzzInvoice>(`/myeduzz/v1/invoices/${invoiceId}`)
}

// Map our event to Eduzz product ID
export async function getEduzzProductIdForEvent(eventId: number): Promise<number | null> {
  try {
    // This would typically come from a database mapping
    // For now, we'll use a simple mapping function
    const products = await getEduzzProducts()

    // Find product that matches our event (by name or some other identifier)
    // This is a simplified example - you'd need to implement proper mapping logic
    const event = await fetch(`/api/events/${eventId}`).then((res) => res.json())

    const matchingProduct = products.find((p) => p.name.includes(event.name))
    return matchingProduct?.id || null
  } catch (error) {
    console.error("Error mapping event to Eduzz product:", error)
    return null
  }
}
