import { NextResponse } from "next/server"
import { sendLeadToKommo } from "@/lib/kommo-api"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar dados
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados incompletos. Nome, email e telefone são obrigatórios.",
        },
        { status: 400 },
      )
    }

    // Enviar lead para Kommo
    const result = await sendLeadToKommo({
      name: body.name,
      email: body.email,
      phone: body.phone,
      source: body.source || "Teste API",
      utmData: body.utmData || undefined,
    })

    return NextResponse.json({
      success: true,
      message: "Lead enviado com sucesso para o Kommo!",
      data: result,
    })
  } catch (error) {
    console.error("Erro ao enviar lead de teste:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar lead de teste",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
