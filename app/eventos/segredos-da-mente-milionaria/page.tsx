"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Users, Zap, Brain, Target, Wallet, GraduationCap, MapPin, Calendar } from "lucide-react"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SiteHeader } from "@/components/header"
import NotableParticipants from "@/components/notable-persons"
import { TicketPricingCards } from "@/components/ticket-pricing-cards"
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
                eduzzContentId: "E9OOG6859B", // ID do produto na Eduzz
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
                eduzzContentId: "6W48G3XN0Z", // ID do produto VIP na Eduzz
              },
]


export default function SegredosDaMenteMilionaria() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
    const style = document.createElement("style")
    style.innerHTML = `
      .cta-hover {
        transition: all 0.3s ease;
      }
      .cta-hover:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.3);
      }
      .cta-hover-subtle {
        transition: all 0.3s ease;
      }
      .cta-hover-subtle:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 15px -5px rgba(245, 158, 11, 0.2);
      }
    `
    document.head.appendChild(style)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/registrations", {
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
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title="SEGREDOS DA MENTE MILIONÁRIA"
        subtitle="Imersão exclusiva e transformadora"
        secondtitle="A liberdade financeira começa com uma mudança de mentalidade"
        description="Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Alameda Araguaia, Alphaville - SP"
        image="/images/HERO_SEGREDOS.png"
        ctaText="QUERO DESPERTAR MINHA MENTE MILIONÁRIA"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
      />

      {/* Benefícios Section */}
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
                SEGREDOS DA MENTE MILIONÁRIA
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
              <span className="text-sm font-medium">O QUE VOCÊ VAI DESCOBRIR</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              O PASSO A PASSO PARA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                DESPERTAR SUA MENTE MILIONÁRIA
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Múltiplas fontes de renda",
                description:
                  "Entenda como combinar renda principal, extra e passiva para construir sua riqueza de forma estratégica.",
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

      <section id="inscricao" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.03)_0%,_rgba(39,39,42,0.1)_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="INSCRIÇÃO" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              ESCOLHA SEU <span className="text-yellow-400">INGRESSO</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Participe do evento transformador Segredos da Mente Milionária e comece a mudar sua relação com o
              dinheiro. Vagas limitadas!
            </p>
          </div>

          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                  <Calendar className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Data e Horário</h4>
                  <p className="text-zinc-300 text-lg">08 de Julho de 2025, 10h às 20h</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-zinc-700/30"></div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                  <MapPin className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Local</h4>
                  <p className="text-zinc-300 text-lg">Alameda Araguaia, 751, Alphaville, Barueri - SP</p>
                </div>
              </div>
            </div>
          </div> 

           <TicketPricingCards eventId={1} eventName="Segredos da Mente Milionária" ticketTypes={ticketTypes} />
        </div>
      </section>

      <Footerlp />
    </div>
  )
}
