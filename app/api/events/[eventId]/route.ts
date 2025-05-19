import { type NextRequest, NextResponse } from "next/server"
import { getEventById } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const eventId = Number.parseInt(params.eventId)

    if (isNaN(eventId)) {
      return NextResponse.json({ error: "ID do evento inválido" }, { status: 400 })
    }

    console.log(`[API] Buscando evento com ID: ${eventId}`)

    const event = await getEventById(eventId)

    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Erro ao buscar evento:", error)
    return NextResponse.json(
      {
        error: "Erro ao buscar evento",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
