"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getEvent } from '@/lib/sanity/fetch'
import { TicketPricingCards } from "@/components/ticket-pricing-cards"
import { Users, Zap, Brain, Target, Wallet, GraduationCap, MapPin, Calendar } from "lucide-react"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SiteHeader } from "@/components/header"
import NotableParticipants from "@/components/notable-persons"
import { SectionBadge } from "@/components/section-badge"
import Footerlp from "@/components/footerlp"

const ticketTypes = [
  {
    id: 2782193,
    name: "Ingresso Especial",
    price: 9.9,
    description: "Acesso completo ao evento presencial",
    benefits: [
      "Experiência completa de 10 horas",
      "Material digital exclusivo",
      "Certificado de participação",
      "Networking com participantes",
    ],
    eduzzContentId: "E9OOG6859B",
  },
  {
    id: 2782194,
    name: "Ingresso VIP",
    price: 49.9,
    description: "Experiência premium com benefícios exclusivos",
    benefits: [
      "Tudo do Ingresso Especial",
      "Assentos nas primeiras fileiras",
      "Perguntas e respostas com Roberto Navarro",
      "Compre 1, leve 2 (traga um acompanhante)",
      "Acesso antecipado ao evento",
    ],
    featured: true,
    eduzzContentId: "6W48G3XN0Z",
  },
]

export default function SegredosDaMenteMilionaria() {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventData, setEventData] = useState<any>(null)

  useEffect(() => {
    // Fetch Sanity data for this event
    const fetchEventData = async () => {
      try {
        const data = await getEvent('segredos-da-mente-milionaria')
        setEventData(data)
      } catch (error) {
        console.log('Using default event content:', error)
      }
    }

    fetchEventData()
  }, [])

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/inscricao", {
        method: "POST",
        body: JSON.stringify({
          eventId: 6,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao processar inscrição")
      }

      const data = await response.json()
      window.location.href = `/inscricao/confirmacao?ticket=${data.ticketCode}`
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao processar sua inscrição")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Use Sanity data or fallback to original static content
  const eventTitle = eventData?.title || "SEGREDOS DA MENTE MILIONÁRIA"
  const eventSubtitle = eventData?.subtitle || "Imersão exclusiva e transformadora"
  const eventSecondTitle = eventData?.secondTitle || "Em 26 de agosto alcance a liberdade financeira com uma mudança de mentalidade"
  const eventDescription = eventData?.description || "Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Hotel Nacional Inn\nAv. Benedicto Campos, 35 - Jardim do Trevo, Campinas - SP"
  const eventDate = eventData?.date || "26 de agosto"
  const eventLocation = eventData?.location || "Hotel Nacional Inn, Campinas - SP"
  const eventDuration = eventData?.duration || "7 horas"

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header - IDÊNTICO AO ORIGINAL */}
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section - LAYOUT ORIGINAL COM DADOS DO SANITY */}
      <HeroPages
        title={eventTitle}
        subtitle={eventSubtitle}
        secondtitle={eventSecondTitle}
        description={eventDescription}
        image="/images/HERO_SEGREDOS.png"
        ctaText="QUERO DESPERTAR MINHA MENTE MILIONÁRIA"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
      />

      {/* Benefícios Section - LAYOUT ORIGINAL */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS DO EVENTO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              POR QUE PARTICIPAR DO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                {eventTitle}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Segurança financeira",
                description:
                  "Descubra como criar uma base sólida, com reserva de emergência e planejamento para o futuro.",
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                title: "Propósito de vida",
                description:
                  "Tenha clareza sobre seu propósito de vida e carreira e abra portas para novas oportunidades.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Liberdade financeira",
                description:
                  "Aprenda a diferença entre sobreviver e viver com liberdade — sem depender de salário ou trabalho ativo.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Mentalidade milionária",
                description:
                  "Supere crenças limitantes sobre dinheiro e adote os hábitos, atitudes e estratégias dos que alcançaram a verdadeira riqueza.",
              },
              {
                icon: <Users className="h-8 w-8 text-yellow-400" />,
                title: "Networking estratégico",
                description:
                  "Conecte-se com pessoas que compartilham seus objetivos e amplie sua rede de oportunidades.",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-yellow-400" />,
                title: "Ferramentas práticas",
                description:
                  "Saia com técnicas aplicáveis para identificar oportunidades e multiplicar recursos.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Que Você Vai Aprender Section - LAYOUT ORIGINAL */}
      <section id="o-que-aprender" className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionBadge text="CONTEÚDO DO EVENTO" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ VAI <span className="text-yellow-400">APRENDER</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Conteúdo prático e transformador que vai mudar sua relação com o dinheiro para sempre
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Mentalidade e Crenças</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Como identificar e eliminar crenças limitantes sobre dinheiro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Os 17 arquivos de riqueza dos milionários</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Reprogramação mental para prosperidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Como desenvolver uma mentalidade de abundância</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Estratégias Práticas</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Sistema de gestão financeira dos ricos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Como criar múltiplas fontes de renda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Estratégias de investimento inteligente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Como fazer o dinheiro trabalhar para você</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Hábitos Milionários</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>A rotina matinal dos grandes empresários</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Como pensar e agir como os ricos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Disciplina financeira e emocional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>O poder dos hábitos compostos</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Transformação Pessoal</h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Técnicas de PNL para reprogramação mental</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Como superar o medo do sucesso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Desenvolvimento de autoconfiança financeira</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Alinhamento entre propósito e prosperidade</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details - LAYOUT ORIGINAL */}
      <section className="py-20 bg-zinc-950/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <SectionBadge text="INFORMAÇÕES DO EVENTO" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                DETALHES DA <span className="text-yellow-400">IMERSÃO</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-400 mb-1">Data</h3>
                    <p className="text-zinc-300">{eventDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-400 mb-1">Local</h3>
                    <p className="text-zinc-300">{eventLocation}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-400 mb-1">Formato</h3>
                    <p className="text-zinc-300">Presencial - Vagas Limitadas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-400 mb-1">Duração</h3>
                    <p className="text-zinc-300">{eventDuration} de pura transformação</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
              <p className="text-center text-yellow-400 font-bold text-lg mb-2">
                ⚠️ ATENÇÃO: Vagas Limitadas!
              </p>
              <p className="text-center text-zinc-300">
                Este evento tem capacidade limitada. Garanta sua vaga antes que esgotem!
              </p>
            </div>
          </div>
        </div>
      </section>

      <NotableParticipants />
      <TestimonialsSection />

      {/* Pricing Section - LAYOUT ORIGINAL */}
      <section id="inscricao" className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <SectionBadge text="INSCREVA-SE AGORA" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ESCOLHA SEU <span className="text-yellow-400">INGRESSO</span>
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Invista em sua transformação financeira e mental. Escolha o ingresso ideal para você.
            </p>
          </div>
          
          <TicketPricingCards 
            eventId={6}
            eventName="Segredos da Mente Milionária"
            ticketTypes={ticketTypes}
          />
        </div>
      </section>

      {/* Guarantee Section - LAYOUT ORIGINAL */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
              <span className="text-sm font-medium">GARANTIA TOTAL</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              100% DE <span className="text-yellow-400">SATISFAÇÃO GARANTIDA</span>
            </h2>
            <p className="text-zinc-300 text-lg mb-8">
              Se por qualquer motivo você não ficar satisfeito com o evento, devolvemos 100% do seu investimento. 
              Sem perguntas, sem burocracia. Esse é nosso compromisso com sua transformação.
            </p>
            <div className="inline-flex items-center gap-2 text-yellow-400">
              <span className="text-5xl">✓</span>
              <span className="text-xl font-bold">Risco Zero para Você</span>
            </div>
          </div>
        </div>
      </section>

      <Footerlp />
    </div>
  )
}