import { type NextRequest, NextResponse } from "next/server"
import { getRegistrationWithEventDetails } from "@/lib/database/db"

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code: ticketCode } = params

    if (!ticketCode) {
      return NextResponse.json({ error: "Código de ticket não fornecido" }, { status: 400 })
    }

    console.log(`[API] Buscando ticket com código: ${ticketCode}`)

    const registration = await getRegistrationWithEventDetails(ticketCode)

    if (!registration) {
      return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
    }

    return NextResponse.json(registration)
  } catch (error) {
    console.error("Erro ao buscar ticket:", error)
    return NextResponse.json(
      {
        error: "Erro ao buscar ticket",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
