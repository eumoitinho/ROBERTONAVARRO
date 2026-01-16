"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import MentorSection from "@/components/mentor"
import NotableParticipants from "@/components/notable-persons"
import { NewsletterSignup } from "@/components/newsletter-signup"
import WhatsAppButton from "@/components/whatsapp-button"

interface EscaladorDeNegociosTemplateProps {
  evento: any
}

type ChallengeItem = {
  title: string
  description: string
}

type LearningItem = {
  title: string
  description: string
}

const fallbackChallenges: ChallengeItem[] = [
  {
    title: "Trabalha demais, mas o faturamento continua estagnado",
    description: "Aprenda a escalar sem aumentar a carga de trabalho, com um modelo de crescimento sustentável.",
  },
  {
    title: "Sua empresa depende de indicações ou da sorte para vender",
    description: "Descubra como criar um fluxo previsível de vendas com estratégia e posicionamento.",
  },
  {
    title: "Já tentou várias coisas, mas nada parece funcionar",
    description: "Siga um método testado e validado por quem já multiplicou resultados.",
  },
  {
    title: "Está preso(a) no operacional e não tem tempo para crescer",
    description: "Entenda como montar uma estrutura que funciona mesmo sem você por perto.",
  },
]

const fallbackLearnings: LearningItem[] = [
  {
    title: "Estratégias reais de escala",
    description: "Descubra como aumentar seu faturamento com processos inteligentes, sem precisar trabalhar mais.",
  },
  {
    title: "Autoridade e posicionamento de marca",
    description: "Saiba como se tornar referência em seu segmento e atrair clientes qualificados com naturalidade.",
  },
  {
    title: "Multiplicação de lucros",
    description: "Conheça os segredos dos empreendedores que saem da média e lucram de forma exponencial.",
  },
  {
    title: "Técnicas avançadas de venda",
    description: "Aprenda formas de vender mais, fidelizar seus clientes e aumentar seu ticket médio.",
  },
  {
    title: "Networking estratégico e parcerias",
    description: "Amplie suas conexões e crie novas oportunidades com empresários que também buscam escalar.",
  },
  {
    title: "Plano de ação imediato",
    description: "Saia do evento com um plano prático e personalizado para aplicar no seu negócio no dia seguinte.",
  },
]

const fallbackHighlights = [
  "Evento 100% gratuito",
  "Experiência VIP disponível para os primeiros inscritos",
  "Presencial, com metodologia prática e resultados mensuráveis",
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

export default function EscaladorDeNegociosTemplate({ evento }: EscaladorDeNegociosTemplateProps) {
  const formSlug = evento?.form
    ? typeof evento.form === "object"
      ? evento.form.slug
      : evento.form
    : undefined

  useEffect(() => {
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

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Mentor", href: "#mentor" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  const heroDescription = getPlainText(evento.hero?.description)
  const challenges: ChallengeItem[] = Array.isArray(evento?.challenges) && evento.challenges.length > 0
    ? evento.challenges.map((item: any) => ({
        title: item.question || item.title || "",
        description: item.answer || item.description || "",
      }))
    : fallbackChallenges

  const learnings: LearningItem[] = Array.isArray(evento?.learnings?.items) && evento.learnings.items.length > 0
    ? evento.learnings.items.map((item: any) => {
        const rawText = typeof item === "string" ? item : item.text || ""
        return splitTitleDescription(rawText)
      })
    : fallbackLearnings

  const highlights = Array.isArray(evento?.highlights?.items) && evento.highlights.items.length > 0
    ? evento.highlights.items.map((item: any) => item.title || item.description).filter(Boolean)
    : fallbackHighlights

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={evento.hero?.title || evento.title || "ESCALADOR DE NEGÓCIOS"}
        subtitle={evento.hero?.subtitle || "Evento Presencial Exclusivo"}
        secondtitle={evento.hero?.badge || "Empreendedores de sucesso não crescem por acaso"}
        description={heroDescription || "Saia da estagnação e aplique, de forma imediata, estratégias reais para escalar vendas, lucros e liberdade."}
        image={
          typeof evento.hero?.backgroundImage === "object" && evento.hero?.backgroundImage?.url
            ? evento.hero.backgroundImage.url
            : "/IMAGES/HERO_ESCALADOR.png"
        }
        ctaText={evento.hero?.ctaText || "GARANTA SUA VAGA!"}
        ctaHref={evento.hero?.ctaLink || "#inscricao"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
      />

      {/* Challenges Section */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS DO CRESCIMENTO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              SE ESTÁ DIFÍCIL CRESCER, É PORQUE VOCÊ ESTÁ TENTANDO DO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                JEITO ERRADO
              </span>
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">Você sente que:</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="flex-1 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  {challenge.title}
                </h3>
                <p className="text-zinc-300">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ESTRATÉGIAS PARA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                ESCALAR SEU NEGÓCIO
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learnings.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                    {item.title}
                  </h3>
                </div>
                <p className="text-zinc-300">{item.description || item.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao" className="flex items-center">
                GARANTA SUA VAGA!
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESTAQUES DO EVENTO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Um Evento que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                ENTREGA O QUE A MAIORIA SÓ PROMETE
              </span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {highlights.map((title: string, index: number) => (
              <div
                key={index}
                className="flex-1 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="text-yellow-400 mb-4 flex justify-center">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-zinc-300">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NotableParticipants />
      <TestimonialsSection testimonials={evento?.testimonials} />
      <MentorSection />

      <NewsletterSignup
        source={evento.title || "Escalador de Negócios"}
        title="FIQUE LIGADO NO PRÓXIMO ESCALADOR DE NEGÓCIOS"
        description="Receba novidades e dicas exclusivas para escalar seu negócio."
        formSlug={formSlug}
      />

      <Footer />
      <WhatsAppButton source={evento.title || "Escalador de Negócios"} className="custom-class" />
    </main>
  )
}
