import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    // Verificar autenticação
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const eventId = params.eventId
    if (!eventId) {
      return NextResponse.json({ error: "ID do evento não fornecido" }, { status: 400 })
    }

    const body = await request.json()
    const { primary_color, secondary_color, ticket_template, background_pattern } = body

    // Validar dados
    if (!primary_color || !secondary_color || !ticket_template) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Atualizar configurações do evento
    await sql`
      UPDATE events
      SET 
        primary_color = ${primary_color},
        secondary_color = ${secondary_color},
        ticket_template = ${ticket_template},
        background_pattern = ${background_pattern || null}
      WHERE id = ${Number.parseInt(eventId)}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao atualizar configurações do evento:", error)
    return NextResponse.json({ error: "Erro ao atualizar configurações do evento" }, { status: 500 })
  }
}
