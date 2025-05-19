import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Verificar se é uma requisição do painel admin
    const authHeader = request.headers.get("authorization")
    const isAdminRequest = authHeader?.startsWith("Bearer ")

    if (isAdminRequest) {
      // Verificar autenticação para requisições admin
      const user = await getUserFromSession()
      if (!user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
      }
    }

    // Buscar todos os eventos
    const events = await sql`
      SELECT * FROM events 
      ORDER BY event_date ASC
    `

    return NextResponse.json(events)
  } catch (error) {
    console.error("Erro ao buscar eventos:", error)
    return NextResponse.json({ error: "Erro ao buscar eventos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description, location, event_date, max_attendees } = body

    // Validar dados
    if (!name || !slug) {
      return NextResponse.json({ error: "Nome e slug são obrigatórios" }, { status: 400 })
    }

    // Verificar se o slug já existe
    const existingEvent = await sql`
      SELECT id FROM events WHERE slug = ${slug}
    `

    if (existingEvent.length > 0) {
      return NextResponse.json({ error: "Slug já está em uso" }, { status: 400 })
    }

    // Criar novo evento
    const result = await sql`
      INSERT INTO events (
        name, 
        slug, 
        description, 
        location, 
        event_date, 
        max_attendees,
        primary_color,
        secondary_color,
        ticket_template,
        created_at
      )
      VALUES (
        ${name}, 
        ${slug}, 
        ${description || null}, 
        ${location || null}, 
        ${event_date ? new Date(event_date) : null}, 
        ${max_attendees || null},
        '#3B82F6',
        '#8B5CF6',
        'default',
        NOW()
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Erro ao criar evento:", error)
    return NextResponse.json({ error: "Erro ao criar evento" }, { status: 500 })
  }
}
