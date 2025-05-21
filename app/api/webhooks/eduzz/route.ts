import { type NextRequest, NextResponse } from "next/server"
import type { EduzzWebhookEvent } from "@/lib/eduzz-types"
import { sql } from "@/lib/db"

// Webhook secret for verification
const WEBHOOK_SECRET = process.env.EDUZZ_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature if provided
    const signature = request.headers.get("x-eduzz-signature")
    if (WEBHOOK_SECRET && signature) {
      // Implement signature verification logic here
      // This is a simplified example
    }

    const body = (await request.json()) as EduzzWebhookEvent

    // Process different webhook events
    switch (body.event) {
      case "invoice.paid":
        await handleInvoicePaid(body)
        break
      case "invoice.canceled":
        await handleInvoiceCanceled(body)
        break
      // Add more event handlers as needed
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing Eduzz webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

// Handle paid invoice event
async function handleInvoicePaid(event: EduzzWebhookEvent) {
  const invoiceId = event.resource_id

  // Get invoice details from event data or fetch from API
  const invoice = event.data

  // Process each item in the invoice
  for (const item of invoice.items) {
    // Map Eduzz product to our event
    // This is a simplified example - implement your mapping logic
    const eventId = await mapProductToEvent(item.product_id)

    if (eventId) {
      // Create registration for this event
      await sql`
        INSERT INTO registrations (
          event_id, name, email, phone, ticket_code, eduzz_invoice_id
        ) VALUES (
          ${eventId}, 
          ${invoice.customer.name}, 
          ${invoice.customer.email}, 
          ${invoice.customer.phone || ""}, 
          ${generateTicketCode()},
          ${invoiceId}
        )
      `
    }
  }
}

// Handle canceled invoice event
async function handleInvoiceCanceled(event: EduzzWebhookEvent) {
  const invoiceId = event.resource_id

  // Mark registrations as canceled
  await sql`
    UPDATE registrations 
    SET status = 'canceled' 
    WHERE eduzz_invoice_id = ${invoiceId}
  `
}

// Helper function to map Eduzz product to our event
async function mapProductToEvent(productId: number): Promise<number | null> {
  // This would typically come from a database mapping
  // For now, we'll use a simple query
  const result = await sql`
    SELECT event_id FROM event_product_mapping
    WHERE eduzz_product_id = ${productId}
  `

  // Use rows and rowCount from the query result
  if ((result.rowCount ?? 0) > 0) {
    return (result.rows[0] as { event_id: number }).event_id
  }
  return null
}

// Generate a unique ticket code
function generateTicketCode(): string {
  return Math.random().toString(36).substring(2, 15).toUpperCase()
}
