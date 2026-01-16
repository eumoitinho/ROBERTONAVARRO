"use client"

import { SiteHeader } from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import HeroPages from "@/components/hero-pages"
import ReusableSection from "@/components/how-works"
import NotableParticipants from "@/components/notable-persons"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CheckCircle, Target, Zap, Brain, GraduationCap, Wallet } from "lucide-react"

interface MentoriaIndividualTemplateProps {
  formacao: any
}

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

export default function MentoriaIndividualTemplate({ formacao }: MentoriaIndividualTemplateProps) {
  const formSlug = formacao?.form
    ? typeof formacao.form === "object"
      ? formacao.form.slug
      : formacao.form
    : undefined

  const defaultNavigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Como Funciona", href: "#como-funciona" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  const navigationItems =
    Array.isArray(formacao?.navigationItems) && formacao.navigationItems.length > 0
      ? formacao.navigationItems
      : defaultNavigationItems

  const heroDescription = getPlainText(formacao.hero?.description)
  const benefits = Array.isArray(formacao?.benefits) && formacao.benefits.length > 0
    ? formacao.benefits
    : []
  const learnings = Array.isArray(formacao?.learnings) && formacao.learnings.length > 0
    ? formacao.learnings
    : []

  const benefitIcons = [Wallet, Zap, CheckCircle, Target, Brain, GraduationCap]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      <HeroPages
        title={formacao.hero?.title || formacao.title}
        subtitle={formacao.hero?.subtitle || "Transforme sua vida com a mentoria mais exclusiva do Brasil"}
        secondtitle={formacao.hero?.badge || "Acompanhamento 100% personalizado para destravar seu potencial"}
        description={heroDescription}
        image={
          typeof formacao.hero?.backgroundImage === "object" && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : "/images/HERO_MENTORIAINDIVIDUAL.png"
        }
        ctaText={formacao.hero?.ctaText || "QUERO TRANSFORMAR MINHA VIDA"}
        ctaHref={formacao.hero?.ctaLink || "#inscricao"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
      />

      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS DA MENTORIA</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              POR QUE ESCOLHER A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                MENTORIA INDIVIDUAL
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit: any, index: number) => {
              const IconComponent = benefitIcons[index % benefitIcons.length]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="mb-4">
                    <IconComponent className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">
                    {typeof benefit === "string" ? benefit : benefit.title}
                  </h3>
                  <p className="text-zinc-300">{typeof benefit === "string" ? "" : benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <ReusableSection
        id="como-funciona"
        title="Mais do que uma mentoria, um"
        subtitle="despertar de consciência"
        description="Durante 2 dias transformadores, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade."
        imageDesktop="/images/HERO_ESCALADOR.png"
        imageMobile="/images/HERO_ESCALADOR_MOBILE.png"
        listItems={learnings.map((item: any) => (typeof item === "string" ? item : item.text))}
        ctaText="GARANTA SUA VAGA!"
        ctaHref="#inscricao"
      />

      <NotableParticipants />

      <TestimonialsSection testimonials={formacao?.testimonials} />

      <NewsletterFormacoes
        title="Mentoria Individual"
        description="Obtenha mais informações sobre a Mentoria Individual"
        source="Mentoria Individual"
        ctaText="QUERO TRANSFORMAR MINHA VIDA"
        formSlug={formSlug}
      />

      <Footer />
      <WhatsAppButton source="Mentoria Individual" className="custom-class" />
    </div>
  )
}
