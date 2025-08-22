"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { getFormation } from '@/lib/sanity/fetch'
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
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import NotableParticipants from "@/components/notable-persons"
import ReusableSection from "@/components/how-works"

export default function MentoriaIndividualPageCMS() {
  const [isVisible, setIsVisible] = useState(false)
  const [formationData, setFormationData] = useState<any>(null)

  useEffect(() => {
    setIsVisible(true)

    // Fetch Sanity data for this formation
    const fetchFormationData = async () => {
      try {
        const data = await getFormation('mentoria-individual')
        setFormationData(data)
      } catch (error) {
        console.log('Using default formation content:', error)
      }
    }

    fetchFormationData()

    // Add keyframe animation for hover effects - IDÊNTICO AO ORIGINAL
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

  // Use Sanity data or fallback to original static content
  const formationTitle = formationData?.title || "MENTORIA INDIVIDUAL EXCLUSIVA"
  const formationSubtitle = formationData?.subtitle || "Transforme sua vida com a mentoria mais exclusiva do Brasil"
  const formationSecondTitle = formationData?.secondTitle || "Acompanhamento 100% personalizado para destravar seu potencial"
  const formationDescription = formationData?.description || "A Mentoria Individual com Roberto Navarro é o caminho para quem busca resultados extraordinários em finanças, emoções e propósito. Um acompanhamento 100% personalizado para destravar seu potencial e alcançar liberdade financeira com equilíbrio."
  const formationPrice = formationData?.price?.value ? `R$ ${formationData.price.value.toLocaleString('pt-BR')}` : "Sob consulta"

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Como Funciona", href: "#como-funciona" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header - IDÊNTICO AO ORIGINAL */}
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      {/* Hero Section - LAYOUT ORIGINAL COM DADOS DO SANITY */}
      <HeroPages
        title={formationTitle}
        subtitle={formationSubtitle}
        secondtitle={formationSecondTitle}
        description={formationDescription}
        image="/images/HERO_MENTORIAINDIVIDUAL.png"
        ctaText="QUERO TRANSFORMAR MINHA VIDA"
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
              <span className="text-sm font-medium">BENEFÍCIOS DA MENTORIA</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              POR QUE ESCOLHER A <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"> MENTORIA INDIVIDUAL</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Plano financeiro 100% personalizado",
                description: "Estratégias desenhadas exclusivamente para suas metas e realidade.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Resultados acelerados e consistentes",
                description: "Alcance seus objetivos financeiros com um plano claro e suporte próximo.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-yellow-400" />,
                title: "Acompanhamento 1:1 com Roberto Navarro",
                description: "Mentoria direta com um dos maiores especialistas em finanças do Brasil.",
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                title: "Transformação emocional e espiritual",
                description: "Desenvolva equilíbrio e propósito para uma vida plena.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Acesso a ferramentas exclusivas",
                description: "Recursos únicos para maximizar seu crescimento financeiro e pessoal.",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-yellow-400" />,
                title: "Networking de alto nível",
                description: "Conecte-se a uma rede seleta de empreendedores e investidores.",
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

      {/* Como Funciona Section - LAYOUT ORIGINAL */}
      <ReusableSection
        id="como-funciona"
        title="Mais do que uma mentoria, um"
        subtitle="despertar de consciência"
        description="Durante 2 dias transformadores, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade."
        imageDesktop="/images/HERO_ESCALADOR.png"
        imageMobile="/images/HERO_ESCALADOR_MOBILE.png"
        listItems={[
          "Qual o efeito do dinheiro em sua vida.",
          "Como o seu estado emocional impacta diretamente sua conta bancária.",
          "Quem está influenciando sua visão sobre dinheiro — e como retomar o controle.",
          "O papel da ambiência e da atmosfera na construção da riqueza.",
          "Como identificar e eliminar sabotadores financeiros.",
          "A conexão poderosa (e oculta) entre energia sexual e prosperidade.",
          "O protocolo da riqueza nos negócios e na vida pessoal.",
          "A verdade sobre o 'dinheirinho' e por que ele pode te manter preso na escassez.",
          "Como criar a motivação certa para que o dinheiro venha até você.",
        ]}
        ctaText="GARANTA SUA VAGA!"
        ctaHref="#inscricao"
      />

      <NotableParticipants />

      {/* Investment Section - LAYOUT ORIGINAL COM PREÇO DO SANITY */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/90 border-2 border-yellow-500/40 rounded-3xl p-10 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">INVESTIMENTO EXCLUSIVO</h3>
              <p className="text-4xl font-extrabold text-yellow-400 mb-2">{formationPrice}</p>
              <p className="text-zinc-300 mb-6">Mentoria totalmente personalizada</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">O que está incluso:</h4>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Sessões individuais com Roberto Navarro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Plano financeiro 100% personalizado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Acompanhamento contínuo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Acesso direto via WhatsApp</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">Benefícios exclusivos:</h4>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Estratégias avançadas de investimento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Networking com clientes VIP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Materiais e ferramentas exclusivas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Resultados garantidos</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-lg"
              >
                <Link href="#inscricao">
                  QUERO MINHA MENTORIA INDIVIDUAL <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-400 font-bold">⭐ Vagas Extremamente Limitadas</p>
                <p className="text-zinc-300 text-sm mt-1">Apenas 5 vagas por ano para mentoria individual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <NewsletterFormacoes 
        title="Mentoria Individual" 
        description="Obtenha mais informações sobre a Mentoria Individual" 
        source="Mentoria Individual" 
        ctaText="QUERO TRANSFORMAR MINHA VIDA" 
        onSubmit={() => {
          /* não precisa mais chamar router.push aqui,
             o componente já faz isso */
        }} 
      />

      <Footer />

      {/* Floating WhatsApp Button - IDÊNTICO AO ORIGINAL */}
      <WhatsAppButton
        source="Mentoria Individual"
        className="custom-class"
      />

    </div>
  )
}