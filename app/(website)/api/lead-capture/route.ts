import { NextRequest, NextResponse } from "next/server"
import { submitLead } from "@/lib/actions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, source } = body

    // Validação básica
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      )
    }

    console.log("Novo lead capturado:", { name, email, phone, source })

    const leadResult = await submitLead({
      name,
      email,
      phone: phone || "",
      source: source || "Lead Capture Popup",
      utm_source: body.utm_source || undefined,
      utm_medium: body.utm_medium || undefined,
      utm_campaign: body.utm_campaign || undefined,
      utm_term: body.utm_term || undefined,
      utm_content: body.utm_content || undefined,
      page_url: body.page_url || undefined,
      user_agent: body.user_agent || request.headers.get("user-agent") || undefined,
    })

    if (!leadResult.success) {
      return NextResponse.json(
        { error: leadResult.message || "Erro ao enviar lead" },
        { status: 500 }
      )
    }

    // Retorna sucesso
    return NextResponse.json({
      success: true,
      message: leadResult.message || "Lead capturado com sucesso"
    })

  } catch (error) {
    console.error("Erro ao processar lead:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
