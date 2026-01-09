import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sql } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const result = await sql`
      SELECT id, name, email, role
      FROM users
      WHERE id = ${user.id}
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, currentPassword, newPassword } = body

    if (!name || !email || !currentPassword) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    const userResult = await sql`
      SELECT id, email, password
      FROM users
      WHERE id = ${user.id}
    `

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const existingUser = userResult.rows[0]
    const passwordMatch = await bcrypt.compare(currentPassword, existingUser.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Senha atual incorreta" }, { status: 401 })
    }

    if (email !== existingUser.email) {
      const emailCheck = await sql`
        SELECT id
        FROM users
        WHERE email = ${email}
          AND id <> ${user.id}
      `
      if (emailCheck.rows.length > 0) {
        return NextResponse.json({ error: "Email já está em uso" }, { status: 409 })
      }
    }

    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null

    const updateResult = await sql`
      UPDATE users
      SET
        name = ${name},
        email = ${email},
        password = COALESCE(${hashedPassword}, password)
      WHERE id = ${user.id}
      RETURNING id, name, email, role
    `

    return NextResponse.json(updateResult.rows[0])
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 })
  }
}
