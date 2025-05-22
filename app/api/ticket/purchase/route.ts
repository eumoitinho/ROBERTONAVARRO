import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Make sure we export both GET and POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST instead." }, { status: 405 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, productId, customer, paymentMethod } = body

    if (!eventId || !customer || !customer.name || !customer.email) {
      return NextResponse.json({ error: "Dados incompletos para a compra" }, { status: 400 })
    }

    console.log(`[API] Processando compra para evento ${eventId}:`, {
      customer,
      productId,
      paymentMethod,
    })

    // For now, let's create a direct registration without Eduzz integration
    // until we have the Eduzz credentials properly set up

    // Generate ticket code
    const ticketCode = Math.random().toString(36).substring(2, 15).toUpperCase()

    try {
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
    } catch (dbError) {
      console.error("Erro ao salvar no banco de dados:", dbError)
      return NextResponse.json(
        {
          error: "Erro ao salvar inscrição",
          details: dbError instanceof Error ? dbError.message : "Erro desconhecido",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao processar compra de ingresso:", error)
    return NextResponse.json(
      {
        error: "Erro ao processar compra de ingresso",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
