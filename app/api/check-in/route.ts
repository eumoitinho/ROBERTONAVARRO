import { type NextRequest, NextResponse } from "next/server"
import { getRegistrationByTicketCode, markAttendance } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { ticketCode } = await request.json()

    if (!ticketCode) {
      return NextResponse.json({ error: "Código do ticket é obrigatório" }, { status: 400 })
    }

    const registration = await getRegistrationByTicketCode(ticketCode)

    if (!registration) {
      return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
    }

    if (registration.attended) {
      return NextResponse.json({ error: "Check-in já realizado para este ticket" }, { status: 400 })
    }

    // Marcar presença
    await markAttendance(ticketCode)

    return NextResponse.json({
      success: true,
      message: "Check-in realizado com sucesso",
      registration: {
        ...registration,
        attended: true,
        attended_at: new Date(),
      },
    })
  } catch (error) {
    console.error("Erro ao realizar check-in:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
