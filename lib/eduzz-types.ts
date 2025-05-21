// Eduzz API Types

export interface EduzzToken {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
  created_at: number
}

export interface EduzzProduct {
  id: number
  name: string
  description: string
  price: number
  currency: string
  status: string
  created_at: string
  updated_at: string
  image_url?: string
  category?: string
  stock?: number
  start_date?: string
  end_date?: string
}

export interface EduzzInvoice {
  id: number
  status: string
  amount: number
  currency: string
  created_at: string
  updated_at: string
  due_date: string
  payment_method?: string
  payment_url: string
  customer: {
    name: string
    email: string
    document?: string
    phone?: string
  }
  items: Array<{
    product_id: number
    name: string
    quantity: number
    price: number
  }>
}

export interface EduzzWebhookEvent {
  event: string
  resource_id: number
  resource_type: string
  created_at: string
  data: any
}

export type EduzzPaymentMethod = "credit_card" | "boleto" | "pix"

export interface CreateInvoiceRequest {
  customer: {
    name: string
    email: string
    document?: string
    phone?: string
  }
  items: Array<{
    product_id: number
    quantity: number
  }>
  expiration_date?: string
  payment_method?: EduzzPaymentMethod
  return_url?: string
}
