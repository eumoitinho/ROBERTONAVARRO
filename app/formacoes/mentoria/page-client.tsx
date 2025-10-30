"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, ChevronRight, Users, Star, Zap, Brain, CheckCircle, Award, BarChart, DollarSign, Target, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import MobileMenu from "@/components/layout/mobile-menu"
import Logo from "@/components/shared/logo"
import LocationMap from "@/components/events/location-map"
import GlowEffect from "@/components/shared/glow-effect"
import { TestimonialsSection }  from "@/components/marketing/testimonials-section"
import HeroPages from "@/components/events/hero-pages"
import Footer from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/header"
import ReusableSection from "@/components/marketing/how-works"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import NotableParticipants from "@/components/events/notable-persons"
import TransformationVideos from "@/components/marketing/transformation-videos"
import type { FormationPageData } from "@/sanity/lib/formations-api"

interface Props { data: FormationPageData }

export default function MentoriaClient({ data }: Props) {
  const n: any = data as any
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const videoModalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Add keyframe animation for hover effects
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

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideoId(null)
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  useEffect(() => {
    if (activeVideoId) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [activeVideoId])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (videoModalRef.current && !videoModalRef.current.contains(event.target as Node)) setActiveVideoId(null)
    }
    if (activeVideoId) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeVideoId])

  const navigationItems = n.mainNavigation?.items?.map((i: any) => ({ title: i.title, href: i.href })) ?? [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Como Funciona", href: "#sobre" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      <HeroPages
        title={n.hero?.title || "LCF MENTORING"}
        subtitle={n.hero?.subtitle || "Mentoria Exclusiva"}
        description={n.hero?.description || "Uma imersão profunda e transformadora em finanças pessoais, coaching de vida e estratégias práticas para você conquistar a sua liberdade financeira."}
        image={n.hero?.backgroundImage?.asset?.url || "/images/HERO_MENTORIA.png"}
        ctaText={n.hero?.ctaText || "MAIS INFORMAÇÕES SOBRE A FORMAÇÃO"}
        ctaHref={n.hero?.ctaLink || "#sobre"}
        secondaryCtaText={n.hero?.secondaryCtaText || "Contate-nos"}
        secondaryCtaHref={n.hero?.secondaryCtaHref || "#sobre"}
        secondtitle={n.hero?.secondtitle || "Você no controle da sua vida"}
      />

      {/* The rest of the page keeps its existing structure but prefers data from `n` when available. */}
      {/* For brevity we reuse the server-rendered content but keep existing hard-coded fallbacks. */}

      {/* Challenges / What You Will Learn */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.challengesSection?.badge || 'DESAFIOS'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {n.challengesSection?.title || (<><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">O QUE ESTÁ TRAVANDO SUA LIBERDADE FINANCEIRA?</span></>)}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {(n.challengesSection?.items || [
              { title: 'Inteligência emocional', desc: 'Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.' },
              { title: 'Inteligência financeira', desc: 'Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.' },
              { title: 'Inteligência espiritual', desc: 'Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo - é a base para prosperar com equilíbrio.' },
              { title: 'Inteligência estratégica', desc: 'Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.' },
            ]).map((module: any, index: number) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{module.title}</h3>
                <p className="text-zinc-300">{module.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
              <Link href={n.cta?.link || "#inscricao"}>{n.cta?.text || "CONQUISTE SUA VAGA!"} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reuse sections: about, benefits, modules, mentors, etc. We keep content identical but prefer data when present. */}
      <ReusableSection
        id="sobre"
        title={n.aboutSection?.heading || "O QUE É O"}
        subtitle={n.aboutSection?.subtitle || "LCF MENTORING?"}
        description={n.aboutSection?.paragraphs?.[0] || "Um programa único no Brasil que une Life Coaching e Mentor Coaching Financeiro."}
        imageDesktop={n.aboutSection?.image?.asset?.url || "/images/HERO_EDUCADOR.png"}
        imageMobile={n.aboutSection?.imageMobile || "/images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png"}
        listItems={n.aboutSection?.paragraphs?.slice(1) || [
          "Transformação Completa: O programa mais completo de transformação financeira, emocional e espiritual.",
          "Resultados Reais: Desenvolva inteligência financeira aplicada e trabalhe sua mentalidade de alta performance.",
          "Ecossistema de Suporte: Conteúdos de alto nível, encontros presenciais e suporte contínuo.",
        ]}
        ctaText={n.aboutSection?.ctaText || "CONQUISTE SUA VAGA!"}
        ctaHref={n.aboutSection?.ctaLink || "#inscricao"}
      />

  <TestimonialsSection />

      {/* Investment & Pricing - prefer data */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="max-w-md w-full bg-zinc-900/90 border-2 border-yellow-500/40 rounded-3xl p-10 shadow-xl hover:border-yellow-500/80 transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{n.hero?.title || "LCF MENTORING"}</h3>
                <p className="text-4xl font-extrabold text-yellow-400 mb-2 text-center">{n.pricing?.tickets?.[0]?.price || "R$ 5.997"}</p>
                <p className="text-zinc-300 mb-6 text-center">{n.pricing?.subtitle || "Condições facilitadas e parcelamento disponíveis"}</p>
                <ul className="space-y-3 mb-8 text-zinc-300 text-base">
                  {(n.benefits?.items || [
                    "Acesso vitalício aos principais treinamentos",
                    "Imersões presenciais intensivas", 
                    "Conteúdo prático e aplicável",
                    "Suporte e acompanhamento",
                    "Garantia de 6 meses"
                  ]).map((benefit: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                      {benefit.title || benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-sm font-medium text-yellow-300">INVESTIMENTO</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Sua Vaga Limitada</span>
                {" "}{n.hero?.title || "Mentoring PRO"}
              </h2>
              <p className="text-lg text-zinc-300 mb-4">{n.pricing?.description || "Acesso vitalício, suporte real e garantia total para sua transformação."}</p>

              <ul className="space-y-2 mb-8">
                {(n.pricing?.bullets || [
                  'Networking com alunos de alto nível',
                  'Comunidade exclusiva',
                  'Mentorias ao vivo e acompanhamento',
                  'Material complementar e ferramentas práticas',
                ]).map((b: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    <span className="text-zinc-300">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild className="cta-hover w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base text-center">
                  <Link href="#inscricao">{n.cta?.text || 'QUERO ENTRAR'}</Link>
                </Button>

                <Button asChild className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base">
                  <Link href="#formacoes">VER FORMAÇÕES <ChevronRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterFormacoes
        onSubmit={() => {}}
        title={n.newsletter?.title || "INSCREVA-SE PARA TER A MUDANÇA DE VIDA"}
        description={n.newsletter?.description || "Obtenha mais informações sobre a LCF Mentoring"}
        source={n.hero?.title || "LCF Mentoring"}
        ctaText={n.newsletter?.ctaText || "CONQUISTE SUA VAGA!"}
      />

      <TransformationVideos />
      <NotableParticipants />

      {/* FAQ Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container-custom">
          <h2 className="text-center mb-4">{n.faq?.heading || 'Perguntas Frequentes'}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {(n.faq?.items || [
              { question: 'O que é o LCF Mentoring?', answer: 'O LCF Mentoring é uma imersão de 7 dias...' },
              { question: 'Quem pode participar?', answer: 'Empreendedores, profissionais e interessados em transformação.' },
            ]).map((faq: any, index: number) => (
              <GlowEffect key={index} className="bg-black p-5 rounded-xl border border-zinc-700">
                <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                <p className="text-subtitle font-light text-xs">{faq.answer}</p>
              </GlowEffect>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source={n.hero?.title || "LCF Mentoring"} className="custom-class" />
    </div>
  )
}
