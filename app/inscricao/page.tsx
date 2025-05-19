import { Suspense } from "react"
import { getEventBySlug } from "@/lib/db"
import { RegistrationForm } from "@/components/registration-form"
import { notFound } from "next/navigation"

export default async function InscricaoPage({
  searchParams,
}: {
  searchParams: { evento?: string }
}) {
  const eventSlug = searchParams.evento

  if (!eventSlug) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Inscrição para Evento</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <p className="text-center mb-4">Por favor, acesse esta página a partir de um dos nossos eventos.</p>
        </div>
      </div>
    )
  }

  const event = await getEventBySlug(eventSlug)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Inscrição para {event.name}</h1>
      <p className="text-center text-gray-600 mb-8">
        {event.description || `Preencha o formulário abaixo para se inscrever no evento ${event.name}`}
      </p>

      <Suspense fallback={<div className="text-center">Carregando formulário...</div>}>
        <RegistrationForm event={event} />
      </Suspense>
    </div>
  )
}
