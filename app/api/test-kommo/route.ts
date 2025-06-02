import { type NextRequest, NextResponse } from "next/server"
import { sendLeadToKommo } from "@/lib/kommo-api"

export async function POST(request: NextRequest) {
  try {
    // Dados de teste
    const testData = {
      name: "João Silva (TESTE)",
      email: "teste@exemplo.com",
      phone: "(11) 99999-9999",
      source: "Teste de Integração - Website",
      utmData: {
        utm_source: "website",
        utm_medium: "teste",
        utm_campaign: "integracao_kommo",
        utm_content: "formulario_teste",
        referrer: "https://financeirocoach.com.br",
      },
    }

    console.log("Enviando lead de teste para Kommo:", testData)

    const result = await sendLeadToKommo(testData)

    console.log("Resultado do Kommo:", result)

    return NextResponse.json({
      success: true,
      message: "Lead de teste criado com sucesso no Kommo!",
      data: result,
    })
  } catch (error) {
    console.error("Erro ao criar lead de teste:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Erro ao criar lead de teste",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
