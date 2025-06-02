import { type NextRequest, NextResponse } from "next/server"
import { kommoAuth } from "@/lib/kommo-auth"

export async function POST(request: NextRequest) {
  try {
    // Renovar token
    const newTokens = await kommoAuth.refreshAccessToken()

    return NextResponse.json({
      success: true,
      message: "Token renovado com sucesso!",
      data: {
        expires_in: newTokens.expires_in,
        expires_at: new Date(newTokens.expires_at!).toISOString(),
      },
    })
  } catch (error) {
    console.error("Erro ao renovar token:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao renovar token",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
