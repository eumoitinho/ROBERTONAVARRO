import { type NextRequest, NextResponse } from "next/server"
import { testKommoIntegration } from "@/lib/actions"

export async function POST(request: NextRequest) {
  try {
    const result = await testKommoIntegration()

    if (result.success) {
      return NextResponse.json(result, { status: 200 })
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error("Erro na rota de teste Kommo:", error)
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
    message: "Endpoint para testar integração com Kommo. Use POST para executar o teste.",
  })
}
