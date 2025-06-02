import { type NextRequest, NextResponse } from "next/server"

const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN || ""
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN || ""

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const entity = searchParams.get("entity") || "leads" // leads ou contacts

    if (!KOMMO_SUBDOMAIN || !KOMMO_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          message: "Variáveis de ambiente não configuradas",
        },
        { status: 400 },
      )
    }

    // Buscar campos customizados
    const response = await fetch(`https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/${entity}/custom_fields`, {
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
          message: `Erro ao buscar campos: ${response.status}`,
          error: errorText,
        },
        { status: response.status },
      )
    }

    const fieldsData = await response.json()

    // Filtrar campos importantes
    const importantFields =
      fieldsData._embedded?.custom_fields?.map((field: any) => ({
        id: field.id,
        name: field.name,
        type: field.type,
        code: field.code,
        is_system: field.is_system,
      })) || []

    return NextResponse.json({
      success: true,
      message: `Campos de ${entity} obtidos com sucesso`,
      data: {
        entity,
        fields: importantFields,
        total: importantFields.length,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar campos Kommo:", error)
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
