import { neon } from "@neondatabase/serverless"
import { sql } from "@vercel/postgres"

// Tipos
export interface Event {
  id: number
  name: string
  slug: string
  description: string
  location: string
  event_date: Date
  created_at: Date
  image_url: string
  primary_color: string
  secondary_color: string
  logo_url: string
  background_pattern: string
  ticket_template: string
}

export interface Registration {
  id: number
  event_id: number
  name: string
  email: string
  phone: string
  ticket_code: string
  created_at: Date
  attended: boolean
  attended_at: Date | null
  event_name?: string
}

export interface User {
  id: number
  email: string
  password: string
  name: string
  role: string
  created_at: Date
}

// Conexão com o banco de dados
const db = neon(process.env.DATABASE_URL!)

// Funções para eventos
export async function getAllEvents() {
  try {
    const result = await db<Event[]>`
      SELECT * FROM events
      ORDER BY event_date DESC
    `
    return result
  } catch (error) {
    console.error("Erro ao buscar eventos:", error)
    throw error
  }
}

export async function getEventById(id: number) {
  try {
    const result = await db<Event[]>`
      SELECT * FROM events
      WHERE id = ${id}
    `
    return result[0] || null
  } catch (error) {
    console.error(`Erro ao buscar evento com ID ${id}:`, error)
    throw error
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const result = await db<Event[]>`
      SELECT * FROM events
      WHERE slug = ${slug}
    `
    return result[0] || null
  } catch (error) {
    console.error(`Erro ao buscar evento com slug ${slug}:`, error)
    throw error
  }
}

// Funções para inscrições
export async function createRegistration(
  data: Omit<Registration, "id" | "created_at" | "attended" | "attended_at" | "event_name">,
) {
  try {
    const ticket_code = Math.random().toString(36).substring(2, 15).toUpperCase()
    const result = await db<Registration[]>`
      INSERT INTO registrations (
        event_id, name, email, phone, ticket_code
      ) VALUES (
        ${data.event_id}, ${data.name}, ${data.email}, ${data.phone}, ${ticket_code}
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Erro ao criar inscrição:", error)
    throw error
  }
}

export async function getRegistrationsByEvent(eventId: number) {
  try {
    const result = await db<Registration[]>`
      SELECT r.*, e.name as event_name
      FROM registrations r
      JOIN events e ON r.event_id = e.id
      WHERE r.event_id = ${eventId}
      ORDER BY r.created_at DESC
    `
    return result
  } catch (error) {
    console.error(`Erro ao buscar inscrições para o evento ${eventId}:`, error)
    throw error
  }
}

export async function getRegistrationByTicketCode(ticketCode: string) {
  try {
    const result = await db<Registration[]>`
      SELECT * FROM registrations
      WHERE ticket_code = ${ticketCode}
    `
    return result[0] || null
  } catch (error) {
    console.error(`Erro ao buscar inscrição com código de ticket ${ticketCode}:`, error)
    throw error
  }
}

export async function getRegistrationWithEventDetails(ticketCode: string) {
  try {
    const result = await db<Registration[]>`
      SELECT 
        r.*,
        e.name as event_name,
        e.slug as event_slug,
        e.description,
        e.location,
        e.event_date,
        e.image_url,
        e.primary_color,
        e.secondary_color,
        e.logo_url,
        e.background_pattern,
        e.ticket_template
      FROM registrations r
      JOIN events e ON r.event_id = e.id
      WHERE r.ticket_code = ${ticketCode}
    `
    return result[0] || null
  } catch (error) {
    console.error(`Erro ao buscar detalhes da inscrição com código ${ticketCode}:`, error)
    throw error
  }
}

export async function markAttendance(ticketCode: string) {
  try {
    const result = await db<Registration[]>`
      UPDATE registrations
      SET attended = TRUE, attended_at = NOW()
      WHERE ticket_code = ${ticketCode}
      RETURNING *
    `
    return result[0] || null
  } catch (error) {
    console.error(`Erro ao fazer check-in da inscrição com código ${ticketCode}:`, error)
    throw error
  }
}

// Funções para usuários
export async function getUserByEmail(email: string) {
  try {
    const result = await db<User[]>`
      SELECT * FROM users
      WHERE email = ${email}
    `
    return result[0] || null
  } catch (error) {
    console.error(`Erro ao buscar usuário com email ${email}:`, error)
    throw error
  }
}

export async function createUser(data: Omit<User, "id" | "created_at">) {
  try {
    const result = await db<User[]>`
      INSERT INTO users (
        email, password, name, role
      ) VALUES (
        ${data.email}, ${data.password}, ${data.name}, ${data.role}
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    throw error
  }
}

// Funções para estatísticas
export async function getEventStats() {
  try {
    const result = await db`
      SELECT 
        e.id,
        e.name as event_name,
        COUNT(r.id) as total_registrations,
        SUM(CASE WHEN r.attended = TRUE THEN 1 ELSE 0 END) as total_attended
      FROM events e
      LEFT JOIN registrations r ON e.id = r.event_id
      GROUP BY e.id, e.name
      ORDER BY e.name
    `
    return result
  } catch (error) {
    console.error("Erro ao buscar estatísticas do dashboard:", error)
    throw error
  }
}

// Exportar a conexão SQL para uso direto
export { sql }
