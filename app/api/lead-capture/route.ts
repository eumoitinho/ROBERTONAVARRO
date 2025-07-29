import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    // Validação básica
    if (!name || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      )
    }

    // Aqui você pode integrar com:
    // 1. LeadLovers
    // 2. Banco de dados
    // 3. Webhook para outro sistema
    // 4. Email marketing

    console.log("Novo lead capturado:", { name, email, phone })

    // Exemplo de integração com LeadLovers (você precisa configurar)
    try {
      const leadLoversResponse = await fetch("https://api.leadlovers.com/v2/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.LEADLOVERS_API_TOKEN}`,
        },
        body: JSON.stringify({
          email,
          name,
          phone,
          // Lista ou sequência específica para leads de popup
          list_id: process.env.LEADLOVERS_POPUP_LIST_ID,
          tags: ["popup-lead", "evento", "formação"]
        }),
      })

      if (!leadLoversResponse.ok) {
        console.error("Erro ao enviar para LeadLovers:", await leadLoversResponse.text())
      }
    } catch (leadLoversError) {
      console.error("Erro na integração LeadLovers:", leadLoversError)
      // Não falha a requisição se a integração falhar
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