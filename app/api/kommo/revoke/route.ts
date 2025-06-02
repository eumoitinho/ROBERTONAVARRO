import { type NextRequest, NextResponse } from "next/server"
import { kommoAuth } from "@/lib/kommo-auth"

export async function POST(request: NextRequest) {
  try {
    await kommoAuth.revokeTokens()

    return NextResponse.json({
      success: true,
      message: "Tokens revogados com sucesso!",
    })
  } catch (error) {
    console.error("Erro ao revogar tokens:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao revogar tokens",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
