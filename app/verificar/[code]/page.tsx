import { VerifyTicket } from "@/components/verify-ticket"
import { getRegistrationByTicketCode } from "@/lib/db"
import type { Registration } from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function VerifyPage({
  params,
}: {
  params: { code: string }
}) {
  const { code } = params

  // Decodificar o código caso esteja em formato URL-encoded
  const decodedCode = decodeURIComponent(code)

  console.log(`[VerifyPage] Verificando ticket com código: ${decodedCode}`)

  try {
    // Buscar o registro usando o código decodificado
    const registration = (await getRegistrationByTicketCode(decodedCode)) as Registration | null

    console.log(`[VerifyPage] Resultado da busca:`, registration ? "Ticket encontrado" : "Ticket não encontrado")

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <VerifyTicket code={decodedCode} registration={registration} />
      </div>
    )
  } catch (error) {
    console.error(`[VerifyPage] Erro ao verificar ticket:`, error)

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <VerifyTicket
          code={decodedCode}
          registration={null}
          error={`Erro ao verificar ticket: ${error instanceof Error ? error.message : "Erro desconhecido"}`}
        />
      </div>
    )
  }
}
