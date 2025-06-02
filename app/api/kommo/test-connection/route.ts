import { NextResponse } from "next/server"
import { kommoAPI } from "@/lib/kommo-api"

export async function GET() {
  try {
    const result = await kommoAPI.testConnection()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Conexão com Kommo estabelecida com sucesso!",
        data: result.data,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Falha ao conectar com Kommo",
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erro ao testar conexão com Kommo:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao testar conexão com Kommo",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
