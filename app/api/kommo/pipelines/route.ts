import { type NextRequest, NextResponse } from "next/server"

const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN || ""
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN || ""

export async function GET(request: NextRequest) {
  try {
    if (!KOMMO_SUBDOMAIN || !KOMMO_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          message: "Variáveis de ambiente não configuradas",
        },
        { status: 400 },
      )
    }

    // Buscar pipelines
    const response = await fetch(`https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/pipelines`, {
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
          message: `Erro ao buscar pipelines: ${response.status}`,
          error: errorText,
        },
        { status: response.status },
      )
    }

    const pipelinesData = await response.json()

    // Formatar dados dos pipelines
    const pipelines =
      pipelinesData._embedded?.pipelines?.map((pipeline: any) => ({
        id: pipeline.id,
        name: pipeline.name,
        sort: pipeline.sort,
        is_main: pipeline.is_main,
        statuses:
          pipeline._embedded?.statuses?.map((status: any) => ({
            id: status.id,
            name: status.name,
            sort: status.sort,
            is_editable: status.is_editable,
            color: status.color,
          })) || [],
      })) || []

    return NextResponse.json({
      success: true,
      message: "Pipelines obtidos com sucesso",
      data: {
        pipelines,
        total: pipelines.length,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar pipelines Kommo:", error)
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
