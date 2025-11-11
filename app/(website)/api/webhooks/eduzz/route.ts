import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    // Get the webhook secret from the request header
    const webhookSecret = request.headers.get("eduzz-webhook-secret")

    // Verify the webhook secret
    if (webhookSecret !== process.env.EDUZZ_WEBHOOK_SECRET) {
      console.error("[Webhook] Invalid webhook secret")
      return NextResponse.json({ error: "Invalid webhook secret" }, { status: 401 })
    }

    const body = await request.json()
    console.log("[Webhook] Received Eduzz webhook:", body)

    // Extract data from the webhook
    const { event, data } = body

    if (!event || !data) {
      return NextResponse.json({ error: "Invalid webhook data" }, { status: 400 })
    }

    // Handle different webhook events
    switch (event) {
      case "invoice.paid":
        await handlePaidInvoice(data)
        break
      case "invoice.canceled":
        await handleCanceledInvoice(data)
        break
      case "invoice.refunded":
        await handleRefundedInvoice(data)
        break
      default:
        console.log(`[Webhook] Unhandled event type: ${event}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Webhook] Error processing Eduzz webhook:", error)
    return NextResponse.json(
      {
        error: "Error processing webhook",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Handle paid invoice
async function handlePaidInvoice(data: any) {
  const { invoice_id } = data

  if (!invoice_id) {
    throw new Error("Missing invoice_id in webhook data")
  }

  // Get the pending registration
  const pendingResult = await sql`
    SELECT * FROM pending_registrations WHERE eduzz_invoice_id = ${invoice_id}
  `
  const pendingRows = pendingResult.rows

  if (pendingRows.length === 0) {
    console.log(`[Webhook] No pending registration found for invoice ${invoice_id}`)
    return
  }

  const registration = pendingRows[0]

  // Generate ticket code
  const ticketCode = Math.random().toString(36).substring(2, 15).toUpperCase()

  // Create confirmed registration
  await sql`
    INSERT INTO registrations (
      event_id, name, email, phone, ticket_code, eduzz_invoice_id, status
    ) VALUES (
      ${registration.event_id}, 
      ${registration.name}, 
      ${registration.email}, 
      ${registration.phone || ""}, 
      ${ticketCode},
      ${invoice_id},
      'confirmed'
    )
  `

  // Delete the pending registration
  await sql`
    DELETE FROM pending_registrations WHERE id = ${registration.id}
  `

  console.log(`[Webhook] Registration confirmed for invoice ${invoice_id}, ticket code: ${ticketCode}`)
}

// Handle canceled invoice
async function handleCanceledInvoice(data: any) {
  const { invoice_id } = data

  if (!invoice_id) {
    throw new Error("Missing invoice_id in webhook data")
  }

  // Delete the pending registration
  await sql`
    DELETE FROM pending_registrations WHERE eduzz_invoice_id = ${invoice_id}
  `

  // Update any existing registration to canceled
  await sql`
    UPDATE registrations 
    SET status = 'canceled' 
    WHERE eduzz_invoice_id = ${invoice_id}
  `

  console.log(`[Webhook] Registration canceled for invoice ${invoice_id}`)
}

// Handle refunded invoice
async function handleRefundedInvoice(data: any) {
  const { invoice_id } = data

  if (!invoice_id) {
    throw new Error("Missing invoice_id in webhook data")
  }

  // Update the registration status
  await sql`
    UPDATE registrations 
    SET status = 'refunded' 
    WHERE eduzz_invoice_id = ${invoice_id}
  `

  console.log(`[Webhook] Registration refunded for invoice ${invoice_id}`)
}
