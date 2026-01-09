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

    const { eventId } = params
    if (!eventId) {
      return NextResponse.json({ error: "ID do evento não fornecido" }, { status: 400 })
    }

    const body = await request.json()
    const {
      name,
      description,
      location,
      event_date,
      image_url,
      logo_url,
      primary_color,
      secondary_color,
      ticket_template,
      background_pattern,
    } = body

    if (!name || !primary_color || !secondary_color || !ticket_template) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    const parsedEventDate =
      event_date && !Number.isNaN(Date.parse(event_date)) ? new Date(event_date).toISOString() : null

    const result = await sql`
      UPDATE events
      SET 
        name = ${name},
        description = ${description || null},
        location = ${location || null},
        event_date = ${parsedEventDate},
        image_url = ${image_url || null},
        logo_url = ${logo_url || null},
        primary_color = ${primary_color},
        secondary_color = ${secondary_color},
        ticket_template = ${ticket_template},
        background_pattern = ${background_pattern || null}
      WHERE id = ${Number.parseInt(eventId)}
      RETURNING *
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Erro ao atualizar configurações do evento:", error)
    return NextResponse.json({ error: "Erro ao atualizar configurações do evento" }, { status: 500 })
  }
}
