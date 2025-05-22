import { type NextRequest, NextResponse } from "next/server"
import { createEduzzInvoice, getEduzzProductIdForEvent } from "@/lib/eduzz-api"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, productId, customer, paymentMethod } = body

    console.log("[API] Processing ticket purchase:", {
      eventId,
      productId,
      customer,
      paymentMethod,
    })

    if (!eventId || !customer || !customer.name || !customer.email) {
      return NextResponse.json({ error: "Dados incompletos para a compra" }, { status: 400 })
    }

    // Get the Eduzz product ID for this event
    const eduzzProductId = productId || (await getEduzzProductIdForEvent(eventId))

    if (!eduzzProductId) {
      console.log(`[API] No Eduzz product found for event ${eventId}, creating direct registration`)

      // Generate ticket code
      const ticketCode = Math.random().toString(36).substring(2, 15).toUpperCase()

      // Create registration directly
      await sql`
        INSERT INTO registrations (
          event_id, name, email, phone, ticket_code
        ) VALUES (
          ${eventId}, ${customer.name}, ${customer.email}, ${customer.phone || ""}, ${ticketCode}
        )
      `

      return NextResponse.json({
        success: true,
        ticketCode,
        message: "Inscrição realizada com sucesso",
      })
    }

    try {
      // Get event price from database or use default
      const eventResult = await sql`
        SELECT name FROM events WHERE id = ${eventId}
      `

      const eventName = eventResult.rows?.[0]?.name || "Evento"

      // Create invoice in Eduzz
      const invoiceData = {
        content_id: eduzzProductId,
        client_name: customer.name,
        client_email: customer.email,
        client_cel: customer.phone || "",
        sale_payment_method: mapPaymentMethod(paymentMethod),
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/inscricao/confirmacao`,
      }

      console.log("[API] Creating Eduzz invoice:", invoiceData)

      const invoice = await createEduzzInvoice(invoiceData)

      console.log("[API] Eduzz invoice created:", invoice)

      // Store pending registration
      await sql`
        INSERT INTO pending_registrations (
          event_id, name, email, phone, eduzz_invoice_id
        ) VALUES (
          ${eventId}, ${customer.name}, ${customer.email}, ${customer.phone || ""}, ${invoice.sale_id}
        )
      `

      return NextResponse.json({
        success: true,
        invoiceId: invoice.sale_id,
        paymentUrl:
          invoice.sale_url || `${process.env.NEXT_PUBLIC_APP_URL}/inscricao/confirmacao?invoice=${invoice.sale_id}`,
      })
    } catch (eduzzError) {
      console.error("Error with Eduzz API:", eduzzError)

      // Fallback to direct registration if Eduzz fails
      const ticketCode = Math.random().toString(36).substring(2, 15).toUpperCase()

      await sql`
        INSERT INTO registrations (
          event_id, name, email, phone, ticket_code
        ) VALUES (
          ${eventId}, ${customer.name}, ${customer.email}, ${customer.phone || ""}, ${ticketCode}
        )
      `

      return NextResponse.json({
        success: true,
        ticketCode,
        message: "Inscrição realizada com sucesso (processamento direto)",
      })
    }
  } catch (error) {
    console.error("Error processing ticket purchase:", error)
    return NextResponse.json(
      {
        error: "Erro ao processar compra de ingresso",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

// Map our payment methods to Eduzz payment methods
function mapPaymentMethod(method: string): string {
  switch (method) {
    case "credit_card":
      return "Cartão de Crédito"
    case "boleto":
      return "Boleto Bancário"
    case "pix":
      return "PIX"
    default:
      return "Boleto Bancário"
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST instead." }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed. Use POST instead." }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed. Use POST instead." }, { status: 405 })
}

export async function PATCH() {
  return NextResponse.json({ error: "Method not allowed. Use POST instead." }, { status: 405 })
}
