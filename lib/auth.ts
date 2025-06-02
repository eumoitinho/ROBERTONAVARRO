import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"
import { sql } from "@/lib/db" // Importar o cliente sql do db.ts

// Chave secreta para JWT
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_in_production")

export type User = {
  id: number
  email: string
  name: string
  role: string
}

export async function login(email: string, password: string) {
  try {
    const users = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`

    if (users.length === 0) {
      console.log(`Usuário não encontrado: ${email}`)
      return null
    }

    const user = users[0]

    // Verificar a senha usando bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      console.log(`Senha incorreta para usuário: ${email}`)
      return null
    }

    // Criar token JWT
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secretKey)

    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error("Erro durante o login:", error)
    return null
  }
}

export async function logout() {
  cookies().delete("auth_token")
}

export async function getSession() {
  const token = cookies().get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, secretKey)
    return verified.payload as {
      id: number
      email: string
      name: string
      role: string
    }
  } catch (error) {
    console.error("Erro ao verificar token:", error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    return null
  }

  return session
}

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, secretKey)
    return verified.payload as {
      id: number
      email: string
      name: string
      role: string
    }
  } catch (error) {
    console.error("Erro ao verificar token:", error)
    return null
  }
}

export async function getUserFromSession(): Promise<User | null> {
  const session = await getSession()

  if (!session) {
    return null
  }

  return {
    id: session.id,
    email: session.email,
    name: session.name || "Admin", // Assuming a default name for admin users
    role: session.role,
  }
}
