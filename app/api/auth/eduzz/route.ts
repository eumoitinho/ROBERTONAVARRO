import { type NextRequest, NextResponse } from "next/server"
import { getEduzzAuthUrl } from "@/lib/eduzz-auth"
import { v4 as uuidv4 } from "uuid"

export async function GET(request: NextRequest) {
  try {
    // Generate a state parameter to prevent CSRF attacks
    const state = uuidv4()

    // Store state in cookies to verify later
    const response = NextResponse.redirect(getEduzzAuthUrl(state))
    response.cookies.set("eduzz_auth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error initiating Eduzz auth:", error)
    return NextResponse.json({ error: "Failed to initiate Eduzz authentication" }, { status: 500 })
  }
}
