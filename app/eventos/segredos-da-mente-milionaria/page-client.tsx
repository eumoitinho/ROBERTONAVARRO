"use client"

import type React from "react"
import {TicketPricingCards} from "@/components/events/ticket-pricing-cards"
import { useState, useEffect } from "react"
import { Users, Zap, Brain, Target, Wallet, GraduationCap, MapPin, Calendar } from "lucide-react"
import HeroPages from "@/components/events/hero-pages"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { SiteHeader } from "@/components/layout/header"
import NotableParticipants from "@/components/events/notable-persons"
import { SectionBadge } from "@/components/marketing/section-badge"
import Footerlp from "@/components/layout/footerlp"
import EventCTAButton from "@/components/events/event-cta-button"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import type { EventPageData } from "@/sanity/lib/events-api"

interface SegredosDaMenteMilionariaClientProps {
  data: EventPageData
}

export default function SegredosDaMenteMilionariaClient({ data }: SegredosDaMenteMilionariaClientProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={data.hero?.title || "SEGREDOS DA MENTE MILIONÁRIA"}
        subtitle={data.hero?.subtitle || "Imersão exclusiva e transformadora"}
        secondtitle={data.hero?.secondTitle || "Em 22 de outubro alcance a liberdade financeira com uma mudança de mentalidade"}
        description={data.hero?.description || "Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Alameda Araguaia, 751 - Alphaville"}
        image={data.hero?.image?.asset?.url || "/images/HERO_SEGREDOS.png"}
        ctaText={data.hero?.ctaText || "QUERO DESPERTAR MINHA MENTE MILIONÁRIA"}
        ctaHref={data.hero?.ctaHref || "#inscricao"}
        secondaryCtaText={data.hero?.secondaryCtaText || "Saiba mais"}
        secondaryCtaHref={data.hero?.secondaryCtaHref || "#beneficios"}
      />

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{data.benefitsSection?.badge || "BENEFÍCIOS DO EVENTO"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {data.benefitsSection?.title || "POR QUE PARTICIPAR DO SEGREDOS DA MENTE MILIONÁRIA"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.benefitsSection?.benefits?.map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">
                  {benefit.icon === "wallet" && <Wallet className="h-8 w-8 text-yellow-400" />}
                  {benefit.icon === "target" && <Target className="h-8 w-8 text-yellow-400" />}
                  {benefit.icon === "zap" && <Zap className="h-8 w-8 text-yellow-400" />}
                  {benefit.icon === "brain" && <Brain className="h-8 w-8 text-yellow-400" />}
                  {benefit.icon === "graduation" && <GraduationCap className="h-8 w-8 text-yellow-400" />}
                  {benefit.icon === "users" && <Users className="h-8 w-8 text-yellow-400" />}
                  {!benefit.icon && <Wallet className="h-8 w-8 text-yellow-400" />}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.description}</p>
              </div>
            )) || [
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Segurança financeira",
                description: "Descubra como criar uma base sólida, com reserva de emergência e planejamento para o futuro.",
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                title: "Propósito de vida",
                description: "Tenha clareza sobre seu propósito de vida e carreira e abra portas para novas oportunidades.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Liberdade financeira",
                description: "Aprenda a diferença entre sobreviver e viver com liberdade — sem depender de salário ou trabalho ativo.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Mentalidade milionária",
                description: "Supere crenças limitantes sobre dinheiro e adote os hábitos, atitudes e estratégias dos que alcançaram a verdadeira riqueza.",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-yellow-400" />,
                title: "Educação financeira",
                description: "Por que aprender com quem já chegou lá pode acelerar (e muito!) sua jornada.",
              },
              {
                icon: <Users className="h-8 w-8 text-yellow-400" />,
                title: "Networking e inspiração",
                description: "Conecte-se com pessoas que já transformaram suas vidas e inspire-se com histórias reais.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Que Você Vai Aprender Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{data.learningSection?.badge || "O QUE VOCÊ VAI DESCOBRIR"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {data.learningSection?.title || "O PASSO A PASSO PARA DESPERTAR SUA MENTE MILIONÁRIA"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {data.learningSection?.items?.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">
                  {item.icon === "wallet" && <Wallet className="h-8 w-8 text-yellow-400" />}
                  {item.icon === "zap" && <Zap className="h-8 w-8 text-yellow-400" />}
                  {item.icon === "brain" && <Brain className="h-8 w-8 text-yellow-400" />}
                  {!item.icon && <Wallet className="h-8 w-8 text-yellow-400" />}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.description}</p>
              </div>
            )) || [
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Múltiplas fontes de renda",
                description: "Entenda como combinar renda principal, extra e passiva para construir sua riqueza de forma estratégica.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Ação e prosperidade",
                description: "Como agir com intenção, propósito claro e prosperidade abundante.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Transformação mental",
                description: "Supere crenças limitantes e construa uma mentalidade de riqueza.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NotableParticipants />
      <TestimonialsSection />
        
      <NewsletterFormacoes
        source={data.newsletterSection?.source || "Segredos da Mente Milionária"}
        title={data.newsletterSection?.title || "GARANTA SUA VAGA NO SEGREDOS DA MENTE MILIONÁRIA"}
        description={data.newsletterSection?.description || "Participe do evento transformador Segredos da Mente Milionária e comece a mudar sua relação com o dinheiro. Vagas limitadas!"}
        ctaText={data.newsletterSection?.ctaText || "GARANTIR MINHA VAGA AGORA!"}
        eventDate={data.newsletterSection?.eventDate || "22 de outubro de 2025"}
        eventTime={data.newsletterSection?.eventTime || "13h às 20h"}
        eventLocation={data.newsletterSection?.eventLocation || "R. Alameda Araguaia, 751 - Alphaville, Campinas - SP"}
        onSubmit={() => {
          /* não precisa mais chamar router.push aqui,
             o componente já faz isso */
        }}
      />

      <Footerlp />
    </div>
  )
}
