import { type NextRequest, NextResponse } from "next/server"

// Webhook para receber notificações do Kommo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Log do webhook recebido
    console.log("Webhook Kommo recebido:", JSON.stringify(body, null, 2))

    // Aqui você pode processar os dados do webhook conforme necessário
    // Por exemplo, atualizar status de leads, sincronizar dados, etc.

    // Verificar o tipo de evento
    const eventType = body.account?.subdomain
    const leads = body.leads
    const contacts = body.contacts

    if (leads && leads.add) {
      console.log("Novos leads adicionados:", leads.add)
      // Processar novos leads
    }

    if (leads && leads.update) {
      console.log("Leads atualizados:", leads.update)
      // Processar leads atualizados
    }

    if (contacts && contacts.add) {
      console.log("Novos contatos adicionados:", contacts.add)
      // Processar novos contatos
    }

    if (contacts && contacts.update) {
      console.log("Contatos atualizados:", contacts.update)
      // Processar contatos atualizados
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao processar webhook Kommo:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar webhook",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint para Kommo. Configure este URL no seu Kommo.",
  })
}
