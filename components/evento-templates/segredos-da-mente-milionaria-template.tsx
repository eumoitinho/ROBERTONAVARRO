"use client"

import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SiteHeader } from "@/components/header"
import NotableParticipants from "@/components/notable-persons"
import Footerlp from "@/components/footerlp"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import { Wallet, Target, Zap, Brain, GraduationCap, Users } from "lucide-react"

interface SegredosDaMenteMilionariaTemplateProps {
  evento: any
}

type HighlightItem = {
  title: string
  description: string
}

type LearningItem = {
  title: string
  description: string
}

const fallbackHighlights: HighlightItem[] = [
  {
    title: "Segurança financeira",
    description: "Descubra como criar uma base sólida, com reserva de emergência e planejamento para o futuro.",
  },
  {
    title: "Propósito de vida",
    description: "Tenha clareza sobre seu propósito de vida e carreira e abra portas para novas oportunidades.",
  },
  {
    title: "Liberdade financeira",
    description: "Aprenda a diferença entre sobreviver e viver com liberdade — sem depender de salário ou trabalho ativo.",
  },
  {
    title: "Mentalidade milionária",
    description:
      "Supere crenças limitantes sobre dinheiro e adote os hábitos, atitudes e estratégias dos que alcançaram a verdadeira riqueza.",
  },
  {
    title: "Educação financeira",
    description: "Por que aprender com quem já chegou lá pode acelerar (e muito!) sua jornada.",
  },
  {
    title: "Networking e inspiração",
    description: "Conecte-se com pessoas que já transformaram suas vidas e inspire-se com histórias reais.",
  },
]

const fallbackLearnings: LearningItem[] = [
  {
    title: "Múltiplas fontes de renda",
    description:
      "Entenda como combinar renda principal, extra e passiva para construir sua riqueza de forma estratégica.",
  },
  {
    title: "Ação e prosperidade",
    description: "Como agir com intenção, propósito claro e prosperidade abundante.",
  },
  {
    title: "Transformação mental",
    description: "Supere crenças limitantes e construa uma mentalidade de riqueza.",
  },
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

const splitTitleDescription = (text: string): LearningItem => {
  const separators = [" – ", " - "]
  for (const separator of separators) {
    if (text.includes(separator)) {
      const [title, ...rest] = text.split(separator)
      return {
        title: title.trim(),
        description: rest.join(separator).trim(),
      }
    }
  }
  return { title: text, description: "" }
}

const formatEventDate = (date?: string) => {
  if (!date) return "22 de outubro de 2025"
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
  if (!location) return "R. Alameda Araguaia, 751 - Alphaville - SP"
  const main = [location.venue, location.address || location.city].filter(Boolean).join(" - ")
  const tail = location.address ? location.state : location.state
  const composed = [main, tail].filter(Boolean).join(" - ")
  return composed || "R. Alameda Araguaia, 751 - Alphaville - SP"
}

export default function SegredosDaMenteMilionariaTemplate({ evento }: SegredosDaMenteMilionariaTemplateProps) {
  const formSlug = evento?.form
    ? typeof evento.form === "object"
      ? evento.form.slug
      : evento.form
    : undefined

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  const heroDescription = getPlainText(evento.hero?.description)
  const benefits = Array.isArray(evento?.highlights?.items) && evento.highlights.items.length > 0
    ? evento.highlights.items.map((item: any) => ({
        title: item.title,
        description: item.description,
      }))
    : fallbackHighlights

  const learningItems = Array.isArray(evento?.learnings?.items) && evento.learnings.items.length > 0
    ? evento.learnings.items.map((item: any) => {
        const rawText = typeof item === "string" ? item : item.text || ""
        return splitTitleDescription(rawText)
      })
    : fallbackLearnings

  const eventDate = formatEventDate(evento?.date)
  const eventTime = formatEventTime(evento?.date, evento?.endDate, evento?.duration)
  const eventLocation = formatLocation(evento?.location)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={evento.hero?.title || evento.title || "SEGREDOS DA MENTE MILIONÁRIA"}
        subtitle={evento.hero?.subtitle || "Imersão exclusiva e transformadora"}
        secondtitle={evento.hero?.badge || "Em 22 de outubro alcance a liberdade financeira com uma mudança de mentalidade"}
        description={heroDescription || "Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Alameda Araguaia, 751 - Alphaville"}
        image={
          typeof evento.hero?.backgroundImage === "object" && evento.hero?.backgroundImage?.url
            ? evento.hero.backgroundImage.url
            : "/images/HERO_SEGREDOS.png"
        }
        ctaText={evento.hero?.ctaText || "QUERO DESPERTAR MINHA MENTE MILIONÁRIA"}
        ctaHref={evento.hero?.ctaLink || "#inscricao"}
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
            {benefits.map((benefit: HighlightItem, index: number) => {
              const icons = [Wallet, Target, Zap, Brain, GraduationCap, Users]
              const IconComponent = icons[index % icons.length]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="mb-4">
                    <IconComponent className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                  <p className="text-zinc-300">{benefit.description}</p>
                </div>
              )
            })}
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
            {learningItems.map((item: LearningItem, index: number) => {
              const icons = [Wallet, Zap, Brain]
              const IconComponent = icons[index % icons.length]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="mb-4">
                    <IconComponent className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                  <p className="text-zinc-300">{item.description || item.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <NotableParticipants />
      <TestimonialsSection testimonials={evento?.testimonials} />

      <NewsletterFormacoes
        source={evento.title || "Segredos da Mente Milionária"}
        title="GARANTA SUA VAGA NO SEGREDOS DA MENTE MILIONÁRIA"
        description={
          "Participe do evento transformador Segredos da Mente Milionária e comece a mudar sua relação com o dinheiro. Vagas limitadas!"
        }
        ctaText="GARANTIR MINHA VAGA AGORA!"
        eventDate={eventDate}
        eventTime={eventTime}
        eventLocation={eventLocation}
        formSlug={formSlug}
      />

      <Footerlp />
    </div>
  )
}
