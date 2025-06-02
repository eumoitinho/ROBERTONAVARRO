import { type NextRequest, NextResponse } from "next/server"
import { kommoAuth } from "@/lib/kommo-auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: `Erro na autorização: ${error}`,
        },
        { status: 400 },
      )
    }

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "Código de autorização não fornecido",
        },
        { status: 400 },
      )
    }

    // Trocar código por tokens
    const tokens = await kommoAuth.exchangeCodeForTokens(code)

    return NextResponse.json({
      success: true,
      message: "Autorização realizada com sucesso!",
      data: {
        expires_in: tokens.expires_in,
        expires_at: new Date(tokens.expires_at!).toISOString(),
        state,
      },
    })
  } catch (error) {
    console.error("Erro no callback de autorização:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar autorização",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
