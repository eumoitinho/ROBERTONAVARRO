"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Star,
  Users,
  Zap,
  Brain,
  Target,
  Wallet,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import HeroPages from "@/components/events/hero-pages"
import { TestimonialsSection }  from "@/components/marketing/testimonials-section"
import Footer from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/header"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import NotableParticipants from "@/components/events/notable-persons"
import ReusableSection from "@/components/marketing/how-works"
import type { FormationPageData } from "@/sanity/lib/formations-api"

interface Props { data: FormationPageData }

export default function MentoriaIndividualClient({ data }: Props) {
  const n: any = data
  const [isVisible, setIsVisible] = useState(false)

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

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Como Funciona", href: "#como-funciona" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      <HeroPages
        title={n.hero?.title || "MENTORIA INDIVIDUAL EXCLUSIVA"}
        subtitle={n.hero?.subtitle || "Transforme sua vida com a mentoria mais exclusiva do Brasil"}
        secondtitle={n.hero?.subtitle || "Acompanhamento 100% personalizado para destravar seu potencial"}
        description={n.hero?.description || "A Mentoria Individual com Roberto Navarro é o caminho para quem busca resultados extraordinários em finanças, emoções e propósito. Um acompanhamento 100% personalizado para destravar seu potencial e alcançar liberdade financeira com equilíbrio."}
        image={n.hero?.backgroundImage?.asset?.url || "/images/HERO_MENTORIAINDIVIDUAL.png"}
        ctaText={n.hero?.ctaText || "QUERO TRANSFORMAR MINHA VIDA"}
        ctaHref={n.hero?.ctaLink || "#inscricao"}
        secondaryCtaText={n.hero?.secondaryCtaText || "Saiba mais"}
        secondaryCtaHref={n.hero?.secondaryCtaHref || "#beneficios"}
      />

      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.benefits?.badge || 'BENEFÍCIOS DA MENTORIA'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.benefits?.title || (<><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">MENTORIA INDIVIDUAL</span></>)}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(n.benefits?.items || [
              { title: 'Plano financeiro 100% personalizado', description: 'Estratégias desenhadas exclusivamente para suas metas e realidade.' },
              { title: 'Resultados acelerados e consistentes', description: 'Alcance seus objetivos financeiros com um plano claro e suporte próximo.' },
              { title: 'Acompanhamento 1:1 com Roberto Navarro', description: 'Mentoria direta com um dos maiores especialistas em finanças do Brasil.' },
            ]).map((benefit: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{benefit.icon || <Wallet className="h-8 w-8 text-yellow-400" />}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReusableSection
        id="como-funciona"
        title={n.mainContent?.title || "Mais do que uma mentoria, um"}
        subtitle={n.mainContent?.subtitle || "despertar de consciência"}
        description={n.mainContent?.description || "Durante 2 dias transformadores, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade."}
        imageDesktop={n.aboutSection?.image?.asset?.url || "/images/HERO_ESCALADOR.png"}
        imageMobile="/images/HERO_ESCALADOR_MOBILE.png"
        listItems={n.mainContent?.items?.map((it: any) => it.title) || [
          "Qual o efeito do dinheiro em sua vida.",
          "Como o seu estado emocional impacta diretamente sua conta bancária.",
          "Quem está influenciando sua visão sobre dinheiro — e como retomar o controle.",
        ]}
        ctaText={n.aboutSection?.ctaText || "GARANTA SUA VAGA!"}
        ctaHref={n.aboutSection?.ctaLink || "#inscricao"}
      />

      <NotableParticipants />

      <TestimonialsSection />

      <NewsletterFormacoes title={n.newsletter?.title || "Mentoria Individual"} description={n.newsletter?.description || "Obtenha mais informações sobre a Mentoria Individual"} source={n.title || "Mentoria Individual"} ctaText={n.newsletter?.ctaText || "QUERO TRANSFORMAR MINHA VIDA"} onSubmit={() => {}} />

      <Footer />

      <WhatsAppButton source={n.title || "Mentoria Individual"} className="custom-class" />
    </div>
  )
}
