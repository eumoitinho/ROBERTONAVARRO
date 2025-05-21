import { type NextRequest, NextResponse } from "next/server"
import { createEduzzInvoice, getEduzzProductIdForEvent } from "@/lib/eduzz-api"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, productId, customer, paymentMethod } = body

    if (!eventId || !customer || !customer.name || !customer.email) {
      return NextResponse.json({ error: "Dados incompletos para a compra" }, { status: 400 })
    }

    // Get the Eduzz product ID for this event
    const eduzzProductId = productId || (await getEduzzProductIdForEvent(eventId))

    if (!eduzzProductId) {
      // If no Eduzz product is found, fall back to regular registration
      console.log(`[API] Criando inscrição direta para evento ${eventId}: ${customer.name} (${customer.email})`)

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
      // Create invoice in Eduzz
      const invoice = await createEduzzInvoice({
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          document: customer.document,
        },
        items: [
          {
            product_id: eduzzProductId,
            quantity: 1,
          },
        ],
        payment_method: paymentMethod,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/inscricao/confirmacao`,
      })

      // Store pending registration
      await sql`
        INSERT INTO pending_registrations (
          event_id, name, email, phone, eduzz_invoice_id
        ) VALUES (
          ${eventId}, ${customer.name}, ${customer.email}, ${customer.phone || ""}, ${invoice.id}
        )
      `

      return NextResponse.json({
        success: true,
        invoiceId: invoice.id,
        paymentUrl: invoice.payment_url,
      })
    } catch (eduzzError) {
      console.error("Erro na API da Eduzz:", eduzzError)

      // Return a proper JSON response with error details
      return NextResponse.json(
        {
          error: "Erro ao processar pagamento com a Eduzz",
          details: eduzzError instanceof Error ? eduzzError.message : "Erro desconhecido",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao processar compra de ingresso:", error)

    // Ensure we always return a valid JSON response
    return NextResponse.json(
      {
        error: "Erro ao processar compra de ingresso",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
