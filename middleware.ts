import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const transactionId = url.searchParams.get("transaction_id");
  if (transactionId) {
    // Redireciona para /obrigado mantendo os parâmetros
    return NextResponse.redirect(new URL(`/obrigado${url.search}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};