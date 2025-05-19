import { EventRegistrationButton } from "@/components/event-registration-button"

export default function CrencasDaRiquezaPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Crenças da Riqueza</h1>

      {/* Conteúdo da página */}
      <div className="max-w-3xl mx-auto">
        <p className="text-lg mb-6">
          Descubra as crenças que moldam sua relação com o dinheiro e aprenda a transformá-las para alcançar a
          prosperidade financeira.
        </p>

        {/* Botão de inscrição */}
        <div className="mt-12 text-center">
          <EventRegistrationButton eventSlug="crencas-da-riqueza" className="text-lg px-8 py-3">
            Garanta sua vaga
          </EventRegistrationButton>
        </div>
      </div>
    </div>
  )
}
