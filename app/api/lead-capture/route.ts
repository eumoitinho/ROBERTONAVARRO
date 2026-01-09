import { NextRequest, NextResponse } from "next/server"
import { submitLeadToIntegrations } from "@/lib/lead-submission"

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

    const result = await submitLeadToIntegrations({
      name,
      email,
      phone: phone || "",
      source: source || "Lead Capture Popup",
      utm_source: body.utm_source || "",
      utm_medium: body.utm_medium || "",
      utm_campaign: body.utm_campaign || "",
      utm_term: body.utm_term || "",
      utm_content: body.utm_content || "",
      page_url: body.page_url || "",
      user_agent: body.user_agent || "",
    })

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 })
    }

    // Retorna sucesso
    return NextResponse.json({
      success: true,
      message: "Lead capturado com sucesso",
    })

  } catch (error) {
    console.error("Erro ao processar lead:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
