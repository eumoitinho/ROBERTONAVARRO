import Script from 'next/script'
import WhatsAppButton from '@/components/whatsapp-button'

export default function ObrigadoEducadorFinanceiro() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">PARABÉNS POR SUA INSCRIÇÃO</h1>
      <p className="mb-4">SUA INSCRIÇÃO FOI CONFIRMADA COM SUCESSO! ABAIXO VOCÊ JÁ CONSEGUE AGENDAR SUA REUNIÃO PARA ENTENDER SOBRE O PROGRAMA</p>

      <div className="my-6">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/coachrobertonavarro/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=ff9600"
          style={{ minWidth: '320px', height: '700px' }}
        />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </div>

      <p className="mt-6">Se preferir, pode falar diretamente com um consultor no WhatsApp</p>
      <WhatsAppButton message="Olá, quero falar sobre o programa">Abrir conversa no WhatsApp</WhatsAppButton>
    </main>
  )
}
