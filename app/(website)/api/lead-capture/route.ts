import { NextRequest, NextResponse } from "next/server"

// URL do Google Apps Script para adicionar na planilha
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx4s6y8Y8RUhqwW1ICXMtG952oe8DbDQGp8ZvK85jRylwlAD6pCBuldkyCuJGWO5-KrzQ/exec"

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

    // Enviar para Google Sheets
    try {
      const payload = {
        name: name,
        email: email,
        phone: phone || "",
        source: source || "Lead Capture Popup",
        utm_source: body.utm_source || "",
        utm_medium: body.utm_medium || "",
        utm_campaign: body.utm_campaign || "",
        utm_term: body.utm_term || "",
        utm_content: body.utm_content || "",
        page_url: body.page_url || "",
        user_agent: body.user_agent || "",
        created_at: new Date().toISOString(),
      }

      const sheetRes = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!sheetRes.ok) {
        const sheetErr = await sheetRes.text()
        console.error("Erro ao enviar para Google Sheets:", sheetRes.status, sheetErr)
        return NextResponse.json(
          { error: "Erro ao salvar dados na planilha" },
          { status: 500 }
        )
      }

      console.log("Dados gravados na planilha com sucesso")
    } catch (sheetError) {
      console.error("Exception ao enviar para Google Sheets:", sheetError)
      return NextResponse.json(
        { error: "Erro ao processar dados" },
        { status: 500 }
      )
    }

    // Retorna sucesso
    return NextResponse.json({
      success: true,
      message: "Lead capturado com sucesso"
    })

  } catch (error) {
    console.error("Erro ao processar lead:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}