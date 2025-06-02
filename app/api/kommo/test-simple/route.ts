import { NextResponse } from "next/server"

export async function GET() {
  try {
    const subdomain = process.env.KOMMO_SUBDOMAIN
    const token = process.env.KOMMO_LONG_LIVED_TOKEN

    if (!subdomain || !token) {
      return NextResponse.json(
        {
          success: false,
          message: "Configurações do Kommo não encontradas",
          missing: {
            subdomain: !subdomain,
            token: !token,
          },
        },
        { status: 400 },
      )
    }

    // Testar conexão simples
    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/account`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao conectar com Kommo",
          error: errorText,
          status: response.status,
        },
        { status: response.status },
      )
    }

    const accountData = await response.json()

    return NextResponse.json({
      success: true,
      message: "Conexão com Kommo funcionando!",
      account: {
        name: accountData.name,
        subdomain: accountData.subdomain,
        country: accountData.country,
      },
    })
  } catch (error) {
    console.error("Erro no teste do Kommo:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    const subdomain = process.env.KOMMO_SUBDOMAIN
    const token = process.env.KOMMO_LONG_LIVED_TOKEN

    if (!subdomain || !token) {
      return NextResponse.json(
        {
          success: false,
          message: "Configurações do Kommo não encontradas",
        },
        { status: 400 },
      )
    }

    // Criar lead de teste
    const testLead = {
      name: `Lead de Teste - ${new Date().toLocaleString("pt-BR")}`,
      pipeline_id: Number.parseInt(process.env.KOMMO_MAIN_PIPELINE_ID || "10749175"),
      status_id: Number.parseInt(process.env.KOMMO_LEADS_ENTRADA_STATUS_ID || "82422239"),
      custom_fields_values: [
        {
          field_id: Number.parseInt(process.env.KOMMO_EMAIL_FIELD_ID || "1025410"),
          values: [{ value: "teste@exemplo.com" }],
        },
        {
          field_id: Number.parseInt(process.env.KOMMO_PHONE_FIELD_ID || "1025408"),
          values: [{ value: "(11) 99999-9999" }],
        },
        {
          field_id: Number.parseInt(process.env.KOMMO_SOURCE_FIELD_ID || "1025412"),
          values: [{ value: "Teste da Integração" }],
        },
      ],
    }

    const response = await fetch(`https://${subdomain}.kommo.com/api/v4/leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([testLead]),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao criar lead de teste",
          error: errorText,
          status: response.status,
        },
        { status: response.status },
      )
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: "Lead de teste criado com sucesso!",
      lead: result._embedded?.leads?.[0] || result,
    })
  } catch (error) {
    console.error("Erro ao criar lead de teste:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
