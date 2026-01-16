"use client"

import type React from "react"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  MapPin,
  Calendar,
  ArrowRight,
  TrendingUp,
  Target,
  Users,
  Award,
  BookOpen,
  DollarSign,
  Zap,
  Brain,
  Lightbulb,
  Star,
  Crown,
  Trophy,
  Briefcase,
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import MentorSection from "@/components/mentor"
import NotableParticipants from "@/components/notable-persons"
import { SectionBadge } from "@/components/section-badge"
import EventCTAButton from "@/components/event-cta-button"

interface MentorMilionarioTemplateProps {
  evento: any
}

type AudienceItem = {
  text: string
  icon: React.ReactNode
  gradient: string
}

type HighlightItem = {
  title: string
  description: string
  icon: string
}

const audienceFallback: AudienceItem[] = [
  {
    text: "Profissionais que querem monetizar seu conhecimento",
    icon: <Briefcase className="h-10 w-10" />,
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    text: "Pessoas em busca do primeiro milhão",
    icon: <Target className="h-10 w-10" />,
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    text: "Quem deseja se tornar mentor de sucesso",
    icon: <Crown className="h-10 w-10" />,
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    text: "Empreendedores que querem múltiplas fontes de renda",
    icon: <TrendingUp className="h-10 w-10" />,
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    text: "Especialistas prontos para escalar seus resultados",
    icon: <Trophy className="h-10 w-10" />,
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
]

const resultsFallback = [
  { highlight: "Você está CANSADO", rest: "de ter conhecimento valioso, mas conta bancária vazia" },
  { highlight: "Você quer PARAR", rest: "de trocar tempo por dinheiro e criar renda escalável" },
  { highlight: "Você está DETERMINADO", rest: "a sair da zona de conforto financeiro" },
  { highlight: "Você ACREDITA", rest: "que merece prosperidade e está disposto a agir" },
]

const getPlainText = (content: any): string | undefined => {
  if (!content) return undefined
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block?.type === "p") {
          return block.children?.map((child: any) => child.text || "").join("")
        }
        return ""
      })
      .filter(Boolean)
      .join("\n")
  }
  return String(content)
}

const formatEventDate = (date?: string) => {
  if (!date) return "24 de Setembro de 2025"
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const formatEventTime = (startDate?: string, endDate?: string, fallback?: string) => {
  if (fallback) return fallback
  if (!startDate || !endDate) return "13h às 20h"

  const formatTime = (value: string) => {
    const formatted = new Date(value).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    return formatted.replace(":", "h").replace("h00", "h")
  }

  return `${formatTime(startDate)} às ${formatTime(endDate)}`
}

const formatLocation = (location?: any) => {
  if (!location) return "Alameda Araguaia, 751, Barueri, SP"
  const main = [location.venue, location.address || location.city].filter(Boolean).join(", ")
  const tail = location.address ? location.state : location.state
  const composed = [main, tail].filter(Boolean).join(", ")
  return composed || "Alameda Araguaia, 751, Barueri, SP"
}

export default function MentorMilionarioTemplate({ evento }: MentorMilionarioTemplateProps) {
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .card-hover {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .card-hover:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.25);
      }
      .card-modern {
        background: linear-gradient(135deg, rgba(24, 24, 27, 0.8), rgba(39, 39, 42, 0.6));
        backdrop-filter: blur(16px);
        border: 1px solid rgba(245, 158, 11, 0.1);
      }
      .card-modern:hover {
        border-color: rgba(245, 158, 11, 0.3);
        background: linear-gradient(135deg, rgba(24, 24, 27, 0.9), rgba(39, 39, 42, 0.7));
      }
      .floating-animation {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      .pulse-glow {
        animation: pulse-glow 3s ease-in-out infinite;
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.2); }
        50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.4); }
      }
    `
    document.head.appendChild(style)
  }, [])

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Mentor", href: "#mentor" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  const heroDescription = getPlainText(evento.hero?.description)

  const challengeQuestions = Array.isArray(evento?.challenges) && evento.challenges.length > 0
    ? evento.challenges.map((item: any) => item.question || item.title || item.text)
    : [
        "Você tem conhecimento valioso, mas não sabe como transformá-lo em dinheiro?",
        "Quer alcançar o primeiro milhão, mas não tem uma estratégia clara?",
        "Sonha em se tornar um mentor reconhecido, mas não sabe por onde começar?",
        "Precisa de múltiplas fontes de renda para conquistar liberdade financeira?",
      ]

  const scheduleItems = Array.isArray(evento?.schedule) && evento.schedule.length > 0
    ? evento.schedule
    : [
        {
          time: "Abertura",
          title: "A Mentalidade do Milhão",
          description:
            "A trajetória de Roberto Navarro, por que a prosperidade é uma escolha e os 3 pilares que sustentam qualquer fortuna.",
        },
        {
          time: "Bloco 1",
          title: "Reprogramação Mental: Desbloqueando seu potencial financeiro",
          description:
            "Identificar e quebrar crenças que limitam seu crescimento, o “reset” mental que liberta sua capacidade de gerar riqueza e estratégias para desenvolver autoridade como especialista.",
        },
        {
          time: "Bloco 2",
          title: "As Regras Secretas do Dinheiro: O Código dos Milionários",
          description:
            "As 7 regras fundamentais que todo milionário segue, como gerar riqueza de forma sustentável e a diferença entre quem fica rico e quem fica milionário.",
        },
        {
          time: "Bloco 3",
          title: "Múltiplas Fontes de Renda",
          description:
            "Estratégia 1 – Negócio Digital: transformar conhecimento em produto lucrativo e posicionamento como autoridade. Estratégia 2 – Investimentos: como fazer o dinheiro trabalhar e multiplicar patrimônio.",
        },
        {
          time: "Bloco Final",
          title: "Seu Plano Milionário",
          description:
            "Estruturando a jornada ao primeiro milhão: criação do plano pessoal, objetivos, métricas e marcos para acompanhar evolução.",
        },
      ]

  const highlightItems: HighlightItem[] = Array.isArray(evento?.highlights?.items) && evento.highlights.items.length > 0
    ? evento.highlights.items
    : [
        {
          title: "Clareza total sobre como monetizar seu conhecimento",
          description: "Estratégia estruturada para alcançar o primeiro milhão.",
          icon: "dollar-sign",
        },
        {
          title: "Estratégia estruturada para alcançar o primeiro milhão",
          description: "Mentalidade reprogramada para a prosperidade.",
          icon: "target",
        },
        {
          title: "Mentalidade reprogramada para a prosperidade",
          description: "Plano concreto com ações práticas e mensuráveis.",
          icon: "brain",
        },
        {
          title: "Plano concreto com ações práticas e mensuráveis",
          description: "Conhecimento das regras que todo milionário segue.",
          icon: "check-circle",
        },
        {
          title: "Conhecimento das regras que todo milionário segue",
          description: "Duas fontes de renda estruturadas para crescimento acelerado.",
          icon: "book",
        },
        {
          title: "Duas fontes de renda estruturadas para crescimento acelerado",
          description: "Plano claro para alcançar seu primeiro milhão.",
          icon: "trending-up",
        },
      ]

  const iconMap: Record<string, React.ElementType> = {
    "dollar-sign": DollarSign,
    target: Target,
    brain: Brain,
    "check-circle": CheckCircle,
    book: BookOpen,
    "trending-up": TrendingUp,
    zap: Zap,
    lightbulb: Lightbulb,
    users: Users,
  }

  const eventDate = formatEventDate(evento?.date)
  const eventTime = formatEventTime(evento?.date, evento?.endDate, evento?.duration)
  const eventLocation = formatLocation(evento?.location)
  const ticketLink = evento?.tickets?.[0]?.link || "https://evento.blinket.com.br/mentor-milionario"

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] bg-repeat bg-[length:200px_200px] pointer-events-none"></div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="relative z-10">
        <SiteHeader navigationItems={navigationItems} showInicio={true} />

        <HeroPages
          title={evento.hero?.title || evento.title || "MENTOR MILIONÁRIO"}
          subtitle={evento.hero?.subtitle || "O Evento Que Vai Transformar Conhecimento em Fortuna e Criar Múltiplas Fontes de Renda"}
          secondtitle={evento.hero?.badge || "De Lavador de Vidros a Multimilionário em 7 Anos..."}
          description={heroDescription || "Agora Roberto Navarro Revela os Segredos para Você Se Tornar um Mentor de Sucesso ou Conquistar Seu Primeiro Milhão"}
          image={
            typeof evento.hero?.backgroundImage === "object" && evento.hero?.backgroundImage?.url
              ? evento.hero.backgroundImage.url
              : "/IMAGES/HERO_ESCALADOR.png"
          }
          ctaText={evento.hero?.ctaText || "QUERO MINHA VAGA NO MENTOR MILIONÁRIO"}
          ctaHref={evento.hero?.ctaLink || "#inscricao"}
          secondaryCtaText="Saiba mais"
          secondaryCtaHref="#o-que-aprender"
        />

        {/* Para Quem É Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-3 px-6 mb-6 pulse-glow">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">PARA QUEM É ESTE EVENTO?</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
                Seu Perfil de Sucesso
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {audienceFallback.map((item, index) => (
                <div
                  key={index}
                  className={`card-modern card-hover rounded-2xl p-8 text-center group relative overflow-hidden ${
                    index === 4 ? "md:col-span-2 lg:col-span-1 mx-auto lg:mx-0" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <div className="relative z-10">
                    <div className="bg-yellow-500/10 rounded-2xl p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors duration-300">
                      <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-100 transition-colors duration-300">
                      {item.text}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges & Solution Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-3 px-6 mb-6">
                    <Target className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-400">DESAFIOS</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    O Que Está Travando Sua Prosperidade?
                  </h2>

                  <div className="space-y-6">
                    {challengeQuestions.map((question: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="bg-yellow-500/20 rounded-full p-2 mt-1 flex-shrink-0">
                          <ArrowRight className="h-4 w-4 text-yellow-400" />
                        </div>
                        <p className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{question}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                    <p className="text-xl font-bold text-yellow-400 text-center">
                      Se você respondeu SIM para qualquer uma dessas perguntas, este evento foi criado especialmente para VOCÊ!
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-3 px-6 mb-6">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-400">A SOLUÇÃO</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    Mentor Milionário
                  </h2>

                  <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                    Em um único dia de imersão, Roberto Navarro – criador do Coach Financeiro no Brasil e responsável por
                    transformar mais de 300 000 vidas – vai mostrar como qualquer pessoa pode multiplicar resultados e
                    conquistar a prosperidade através de estratégias comprovadas.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500/20 rounded-full p-2">
                        <CheckCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <span className="text-zinc-300">Método testado e validado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500/20 rounded-full p-2">
                        <CheckCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <span className="text-zinc-300">Resultados em tempo recorde</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500/20 rounded-full p-2">
                        <CheckCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <span className="text-zinc-300">Estratégias aplicáveis imediatamente</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base w-full"
                  >
                    <Link href="#inscricao" className="flex items-center justify-center">
                      GARANTA SUA VAGA!
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formato do evento */}
        <section className="py-20 relative bg-zinc-900/40">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">FORMATO DO EVENTO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                UM DIA PARA <span className="text-yellow-400">TRANSFORMAR SUA HISTÓRIA</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400 transition-all duration-300">
                <Calendar className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Data</h3>
                <p className="text-zinc-300">{eventDate}</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400 transition-all duration-300">
                <MapPin className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Local</h3>
                <p className="text-zinc-300">{eventLocation}</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400 transition-all duration-300">
                <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Duração</h3>
                <p className="text-zinc-300">7 horas intensivas</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400 transition-all duration-300">
                <Award className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Metodologia</h3>
                <p className="text-zinc-300">Blocos estratégicos de alto impacto</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programa completo */}
        <section id="o-que-aprender" className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">PROGRAMA COMPLETO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                7 HORAS DE <span className="text-yellow-400">TRANSFORMAÇÃO INTENSIVA</span>
              </h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              {scheduleItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="bg-yellow-500/20 rounded-full px-4 py-2 text-yellow-400 font-bold text-sm">
                      {item.time}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                      <p className="text-zinc-300">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O que você vai conquistar */}
        <section className="py-20 relative bg-zinc-900/40">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">O QUE VOCÊ VAI CONQUISTAR</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                RESULTADOS <span className="text-yellow-400">GARANTIDOS</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {highlightItems.map((item: HighlightItem, index: number) => {
                const IconComponent = iconMap[item.icon] || CheckCircle
                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="bg-yellow-500/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                    <p className="text-zinc-300">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Este evento é para você se */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">ESTE EVENTO É PARA VOCÊ SE:</span>
              </div>
              <div className="space-y-4 max-w-3xl mx-auto">
                {resultsFallback.map((line, index) => (
                  <p key={index} className="text-lg text-zinc-300">
                    <strong className="text-yellow-400">{line.highlight}</strong> {line.rest}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Momento de decidir */}
        <section className="py-20 relative bg-zinc-900/40">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">MOMENTO DE DECIDIR</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  A diferença entre quem conquista o primeiro milhão e quem apenas sonha com ele está em UMA decisão.
                </span>
              </h2>
              <div className="space-y-4 max-w-3xl mx-auto mb-12">
                <p className="text-xl text-zinc-300">
                  <strong>Roberto Navarro não apenas ensina teorias.</strong>
                </p>
                <p className="text-xl text-zinc-300">
                  <strong>Ele VIVEU a transformação.</strong>
                </p>
                <p className="text-xl text-zinc-300">
                  <strong>Ele PROVOU que é possível.</strong>
                </p>
                <p className="text-xl text-zinc-300">
                  <strong>E agora ele vai mostrar EXATAMENTE como fazer.</strong>
                </p>
              </div>
              <p className="text-2xl font-bold text-yellow-400 mb-8">Sua prosperidade está a um clique de distância.</p>
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-lg"
              >
                <Link href="#inscricao" className="flex items-center">
                  QUERO MINHA VAGA NO MENTOR MILIONÁRIO
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="mt-12">
                <p className="text-lg italic text-zinc-400">&quot;A prosperidade não é um acidente. É uma escolha estratégica.&quot;</p>
                <p className="text-md text-zinc-500 mt-2">- Roberto Navarro</p>
              </div>
            </div>
          </div>
        </section>

        <NotableParticipants />
        <TestimonialsSection testimonials={evento?.testimonials} />
        <MentorSection />

        {/* Inscrição */}
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
                Participe do evento Mentor Milionário e comece a mudar sua relação com o dinheiro. Vagas limitadas!
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
                    <p className="text-zinc-300 text-lg">
                      {eventDate}, {eventTime}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-16 bg-zinc-700/30"></div>
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                    <MapPin className="h-7 w-7 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">Local</h4>
                    <p className="text-zinc-300 text-lg">{eventLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <EventCTAButton
                eduzzUrl={ticketLink}
                buttonText="GARANTIR MINHA INSCRIÇÃO"
                className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold py-4 px-8 rounded-full text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                showArrow={false}
              />
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton source={evento.title || "Mentor Milionário"} className="custom-class" />
      </main>
    </div>
  )
}
