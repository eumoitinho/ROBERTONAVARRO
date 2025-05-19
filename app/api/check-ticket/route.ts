import { type NextRequest, NextResponse } from "next/server"
import { getRegistrationByTicketCode } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const ticketCode = searchParams.get("code")

    if (!ticketCode) {
      return NextResponse.json({ error: "Código do ticket é obrigatório" }, { status: 400 })
    }

    console.log(`[API] Verificando ticket com código: ${ticketCode}`)

    const registration = await getRegistrationByTicketCode(ticketCode)

    if (!registration) {
      return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      registration,
    })
  } catch (error) {
    console.error("Erro ao verificar ticket:", error)
    return NextResponse.json(
      {
        error: "Erro ao verificar ticket",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
