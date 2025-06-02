import { type NextRequest, NextResponse } from "next/server"

const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN || ""
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN || ""

export async function POST(request: NextRequest) {
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!KOMMO_SUBDOMAIN || !KOMMO_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          message: "Variáveis de ambiente não configuradas",
          error: "KOMMO_SUBDOMAIN e KOMMO_ACCESS_TOKEN são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Testar conexão com a API do Kommo
    const response = await fetch(`https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/account`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          success: false,
          message: `Erro na conexão com Kommo: ${response.status}`,
          error: errorText,
        },
        { status: response.status },
      )
    }

    const accountData = await response.json()

    return NextResponse.json({
      success: true,
      message: "Conexão com Kommo estabelecida com sucesso!",
      data: {
        account_name: accountData.name,
        subdomain: accountData.subdomain,
        timezone: accountData.timezone,
        currency: accountData.currency,
      },
    })
  } catch (error) {
    console.error("Erro ao testar conexão Kommo:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Endpoint para testar conexão com Kommo. Use POST para executar o teste.",
  })
}
