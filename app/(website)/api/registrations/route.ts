import { type NextRequest, NextResponse } from "next/server"
import { createRegistration, getEventById } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { eventId, name, email, phone } = data

    if (!eventId || !name || !email) {
      return NextResponse.json({ error: "ID do evento, nome e email são obrigatórios" }, { status: 400 })
    }

    // Verificar se o evento existe
    const event = await getEventById(Number.parseInt(eventId))
    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 })
    }

    console.log(`[API] Criando inscrição para evento ${eventId}: ${name} (${email})`)

    // Criar a inscrição
    const registration = await createRegistration({
      event_id: Number.parseInt(eventId),
      name,
      email,
      phone,
    })

    console.log(`[API] Inscrição criada com sucesso. Código do ticket: ${registration.ticket_code}`)

    return NextResponse.json({
      success: true,
      registration,
      ticketCode: registration.ticket_code,
    })
  } catch (error) {
    console.error("Erro ao processar inscrição:", error)
    return NextResponse.json(
      {
        error: "Erro ao processar inscrição",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
