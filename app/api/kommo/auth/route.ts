import { type NextRequest, NextResponse } from "next/server"
import { kommoAuth } from "@/lib/kommo-auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get("state") || "auth"

    // Gerar URL de autorização
    const authUrl = kommoAuth.getAuthUrl(state)

    return NextResponse.json({
      success: true,
      authUrl,
      message: "Acesse a URL para autorizar a aplicação no Kommo",
    })
  } catch (error) {
    console.error("Erro ao gerar URL de autorização:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao gerar URL de autorização",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
