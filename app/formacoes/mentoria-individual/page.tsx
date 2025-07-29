"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import LeadCapturePopup from "@/components/lead-capture-popup"
import { useScrollTrigger } from "@/hooks/use-scroll-trigger"
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
import { Notable } from "next/font/google"
import NotableParticipants from "@/components/notable-persons"
import ReusableSection from "@/components/how-works"

export default function MentoriaIndividual() {
  const [isVisible, setIsVisible] = useState(false)
  const { isTriggered: showPopup } = useScrollTrigger({ threshold: 35, delay: 1500 })
  const [isPopupVisible, setIsPopupVisible] = useState(false)

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

  useEffect(() => {
    if (showPopup) {
      setIsPopupVisible(true)
    }
  }, [showPopup])
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
  {/* Hero Section */}
      <HeroPages
        title="MENTORIA INDIVIDUAL EXCLUSIVA"
        subtitle="Transforme sua vida com a mentoria mais exclusiva do Brasil"
        secondtitle="Acompanhamento 100% personalizado para destravar seu potencial"
        description="A Mentoria Individual com Roberto Navarro é o caminho para quem busca resultados extraordinários em finanças, emoções e propósito. Um acompanhamento 100% personalizado para destravar seu potencial e alcançar liberdade financeira com equilíbrio."
        image="/images/HERO_MENTORIAINDIVIDUAL.png"
        ctaText="QUERO TRANSFORMAR MINHA VIDA"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
        />


      {/* // Benefícios Section */}
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


<TestimonialsSection />
      <NewsletterFormacoes title="Mentoria Individual" description="Obtenha mais informações sobre a Mentoria Individual" source="Mentoria Individual" ctaText="QUERO TRANSFORMAR MINHA VIDA" onSubmit={() => {
          /* não precisa mais chamar router.push aqui,
             o componente já faz isso */
        }} />

     <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        source="Mentoria Individual"
        className="custom-class"
      />

      {/* Lead Capture Popup */}
      <LeadCapturePopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        title="Mentoria Individual Exclusiva"
        subtitle="Acompanhamento personalizado para transformar sua vida financeira e pessoal"
      />
    </div>
  )
}
