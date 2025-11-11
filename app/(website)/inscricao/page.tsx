import { Suspense } from "react"
import { getEventoBySlug } from "@/lib/payload/client"
import { RegistrationForm } from "@/components/registration-form"
import { notFound } from "next/navigation"
import LivePreview from '@/components/live-preview'

export default async function InscricaoPage({
  searchParams,
}: {
  searchParams: Promise<{ evento?: string; preview?: string }>
}) {
  const { evento: eventSlug, preview } = await searchParams
  const isPreview = preview === 'true'

  if (!eventSlug) {
    return (
      <>
        <LivePreview />
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Inscrição para Evento</h1>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <p className="text-center mb-4">Por favor, acesse esta página a partir de um dos nossos eventos.</p>
          </div>
        </div>
      </>
    )
  }

  const event = await getEventoBySlug(eventSlug, isPreview)

  if (!event) {
    notFound()
  }

  return (
    <>
      <LivePreview />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Inscrição para {event.title}</h1>
        <p className="text-center text-gray-600 mb-8">
          {event.hero?.subtitle || `Preencha o formulário abaixo para se inscrever no evento ${event.title}`}
        </p>

        <Suspense fallback={<div className="text-center">Carregando formulário...</div>}>
          <RegistrationForm eventId={event.id} eventName={event.title} />
        </Suspense>
      </div>
    </>
  )
}
