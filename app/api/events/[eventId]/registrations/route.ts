import { type NextRequest, NextResponse } from "next/server"
import { getRegistrationsByEvent } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    // Verificar autenticação
    const session = await verifyAuth(request)
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const eventId = Number.parseInt(params.eventId)
    if (isNaN(eventId)) {
      return NextResponse.json({ error: "ID de evento inválido" }, { status: 400 })
    }

    const registrations = await getRegistrationsByEvent(eventId)
    return NextResponse.json(registrations)
  } catch (error) {
    console.error("Erro ao buscar inscrições:", error)
    return NextResponse.json({ error: "Erro ao buscar inscrições" }, { status: 500 })
  }
}
