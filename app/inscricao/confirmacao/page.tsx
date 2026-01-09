import { TicketCard } from "@/components/ticket-card"
import { getRegistrationWithEventDetails } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
import { getTicketTemplate } from "@/lib/ticket-templates"

export const dynamic = "force-dynamic"

export default async function ConfirmacaoPage({
  searchParams,
}: {
  searchParams: Promise<{ ticket?: string }>
}) {
  const { ticket } = await searchParams

  console.log(`[ConfirmacaoPage] Código do ticket: ${ticket || "não fornecido"}`)

  let registration = null

  if (ticket) {
    try {
      registration = await getRegistrationWithEventDetails(ticket)
      console.log(`[ConfirmacaoPage] Registro encontrado:`, registration ? "Sim" : "Não")
    } catch (error) {
      console.error(`[ConfirmacaoPage] Erro ao buscar registro:`, error)
    }
  }

  const template = registration ? getTicketTemplate(registration) : null
  const backgroundPattern = registration?.background_pattern || template?.patternStyle

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Inscrição Confirmada!</h1>
          <p className="mt-2 text-gray-600">Obrigado por se inscrever. Seu ticket está pronto abaixo.</p>
        </div>

        {registration ? (
          <TicketCard
            ticketCode={registration.ticket_code}
            eventName={registration.event_name}
            name={registration.name}
            email={registration.email}
            phone={registration.phone}
            eventDate={registration.event_date}
            eventLocation={registration.location}
            primaryColor={registration.primary_color}
            secondaryColor={registration.secondary_color}
            logoUrl={registration.logo_url}
            backgroundPattern={backgroundPattern}
          />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-red-500 font-medium">Não foi possível encontrar as informações do seu ticket.</p>
            <p className="mt-2 text-gray-600">Código do ticket: {ticket || "Não fornecido"}</p>
          </div>
        )}

        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
