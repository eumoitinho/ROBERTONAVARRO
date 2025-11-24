"use client";

import Script from 'next/script'
import WhatsAppButton from '@/components/whatsapp-button'

export default function ObrigadoEducadorFinanceiro2() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">INSCRIÇÃO CONFIRMADA</h1>
      <p className="mb-4">Obrigado por se inscrever no Educador Financeiro. Agora você pode agendar sua reunião abaixo para entender melhor o programa.</p>

      <div className="my-6">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/coachrobertonavarro/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=ff9600"
          style={{ minWidth: '320px', height: '700px' }}
        />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </div>

      <p className="mt-6">Prefere falar agora com um consultor? Use o WhatsApp:</p>
      <WhatsAppButton source="Educador Financeiro" />
    </main>
  )
}
