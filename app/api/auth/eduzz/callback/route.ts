import { type NextRequest, NextResponse } from "next/server"
import { exchangeCodeForToken } from "@/lib/eduzz-auth"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // Check for errors from Eduzz
    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/configuracoes?error=${error}`)
    }

    // Validate required parameters
    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/configuracoes?error=missing_params`)
    }

    // Verify state parameter to prevent CSRF
    const storedState = request.cookies.get("eduzz_auth_state")?.value
    if (!storedState || storedState !== state) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/configuracoes?error=invalid_state`)
    }

    // Exchange code for token
    await exchangeCodeForToken(code)

    // Redirect to success page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/configuracoes?success=true`)
  } catch (error) {
    console.error("Error in Eduzz callback:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin/configuracoes?error=token_exchange_failed`)
  }
}
