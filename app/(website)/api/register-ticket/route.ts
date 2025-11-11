import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, productId, customer, paymentMethod } = body

    console.log("[API] Processing ticket purchase (fallback endpoint):", {
      eventId,
      productId,
      customer,
      paymentMethod,
    })

    // Basic validation
    if (!eventId || !customer || !customer.name || !customer.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate ticket code
    const ticketCode = Math.random().toString(36).substring(2, 15).toUpperCase()

    try {
      // Create registration directly in the database
      await sql`
        INSERT INTO registrations (
          event_id, name, email, phone, ticket_code
        ) VALUES (
          ${eventId}, ${customer.name}, ${customer.email}, ${customer.phone || ""}, ${ticketCode}
        )
      `

      console.log("[API] Registration created successfully (fallback endpoint):", { ticketCode })

      return NextResponse.json({
        success: true,
        ticketCode,
        message: "Inscrição realizada com sucesso",
      })
    } catch (dbError) {
      console.error("[API] Database error (fallback endpoint):", dbError)
      return NextResponse.json(
        {
          error: "Erro ao salvar inscrição",
          details: dbError instanceof Error ? dbError.message : "Erro desconhecido",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[API] Error processing ticket purchase (fallback endpoint):", error)
    return NextResponse.json(
      {
        error: "Erro ao processar compra de ingresso",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
