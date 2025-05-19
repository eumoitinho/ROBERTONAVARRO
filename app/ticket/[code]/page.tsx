import type { Metadata } from "next"
import { getRegistrationWithEventDetails, getEventBySlug } from "@/lib/db"
import { TicketCard } from "@/components/ticket-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, MapPin, Calendar } from "lucide-react"
import Image from "next/image"

export const dynamic = "force-dynamic"

interface TicketPageProps {
  params: {
    code: string
  }
}

export async function generateMetadata({ params }: TicketPageProps): Promise<Metadata> {
  const { code } = params

  try {
    const registration = await getRegistrationWithEventDetails(code)

    if (registration) {
      return {
        title: `Ticket para ${registration.event_name || "Evento"}`,
        description: `Ticket de ${registration.name} para ${registration.event_name || "o evento"}`,
      }
    }
  } catch (error) {
    console.error("Erro ao gerar metadata:", error)
  }

  return {
    title: "Ticket",
    description: "Visualização de ticket para evento",
  }
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { code } = params
  const decodedCode = decodeURIComponent(code)

  console.log(`[Page] Buscando ticket com código: ${decodedCode}`)

  try {
    const registration = await getRegistrationWithEventDetails(decodedCode)

    if (!registration) {
      return (
        <div className="container max-w-6xl mx-auto py-12 px-4">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-600">Ticket não encontrado</h1>
            <p className="text-gray-600">Não foi possível encontrar um ticket com o código fornecido.</p>
            <Button asChild className="mt-4">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>
          </div>
        </div>
      )
    }

    // Buscar informações detalhadas do evento para exibir na hero
    const event = registration.event_slug ? await getEventBySlug(registration.event_slug) : null

    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Lado esquerdo - Hero do evento */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-8 shadow-md">
            <h1 className="text-3xl font-bold text-amber-900 mb-6">{registration.event_name}</h1>

            {event?.image_url && (
              <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={event.image_url || "/placeholder.svg"}
                  alt={registration.event_name || "Imagem do evento"}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              {event?.description && (
                <div>
                  <h2 className="text-xl font-semibold text-amber-800 mb-2">Sobre o evento</h2>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              )}

              {event?.location && (
                <div>
                  <h2 className="text-xl font-semibold text-amber-800 mb-2">Local</h2>
                  <p className="text-gray-700 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-amber-600" />
                    {event.location}
                  </p>
                </div>
              )}

              {event?.event_date && (
                <div>
                  <h2 className="text-xl font-semibold text-amber-800 mb-2">Data e Hora</h2>
                  <p className="text-gray-700 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                    {new Date(event.event_date).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <Button asChild variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                <Link href={`/${registration.event_slug || ""}`}>Ver página completa do evento</Link>
              </Button>
            </div>
          </div>

          {/* Lado direito - Ticket */}
          <div>
            <TicketCard
              ticketCode={registration.ticket_code}
              eventId={registration.event_id}
              eventName={registration.event_name}
              attendeeName={registration.name}
              eventDetails={registration}
            />

            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para a página inicial
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Erro ao buscar ticket:", error)

    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Erro ao buscar ticket</h1>
          <p className="text-gray-600">Ocorreu um erro ao tentar buscar as informações do ticket.</p>
          <Button asChild className="mt-4 bg-amber-600 hover:bg-amber-700">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}
