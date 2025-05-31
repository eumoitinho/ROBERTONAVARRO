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
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ReusableSection from "@/components/how-works"
import NotableParticipants from "@/components/notable-persons"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"

export default function MentoriaDeInvestimentos() {
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
      {/* 
     // Hero Section */}
    <HeroPages
        title="MENTORIA DE INVESTIMENTOS"
        subtitle="Multiplique seu patrimônio com estratégia e segurança"
        description="Um programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira."
        image="/images/HERO_MENTORIAINVESTIMENTOS.png"
        ctaText="QUERO ME INSCREVER"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
        secondtitle="Transforme sua vida financeira com a mentoria de investimentos"
        />
      {/* // Benefícios Section */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
           <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS DA MENTORIA</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              POR QUE ESCOLHER A <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"> MENTORIA DE INVESTIMENTOS</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Carteira de investimentos personalizada",
                description: "Construa uma carteira alinhada ao seu perfil, objetivos e tolerância ao risco.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Estratégias avançadas de mercado",
                description: "Acesse técnicas comprovadas para maximizar retornos e minimizar perdas.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-yellow-400" />,
                title: "Acompanhamento próximo e contínuo",
                description: "Tenha suporte direto para ajustar sua estratégia em tempo real.",
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                title: "Gestão avançada de riscos",
                description: "Proteja seu capital com métodos testados contra volatilidade.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Mentalidade de investidor profissional",
                description: "Desenvolva a disciplina e confiança dos grandes investidores.",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-yellow-400" />,
                title: "Educação financeira prática",
                description: "Domine conceitos complexos com uma abordagem simples e aplicável.",
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
      {/* Como Funciona Section */}
      <ReusableSection
        id="como-funciona"
        title="COMO FUNCIONA A MENTORIA DE INVESTIMENTOS"
        subtitle="Mentoria de Investimentos"
        description="Descubra como a mentoria pode transformar sua vida financeira com estratégias personalizadas e acompanhamento contínuo."
        imageDesktop="/images/HERO_CRENCAS.png"
        imageMobile="/images/HERO_MENTORIA_INDIVIDUAL.png"
        listItems={[
          "Diagnóstico financeiro completo",
          "Definição de metas claras e realistas",
          "Análise detalhada do seu perfil de investidor",
          "Montagem de carteira personalizada",
          "Estratégias avançadas para maximizar retornos",
          "Acompanhamento contínuo com ajustes periódicos",
          "Acesso a conteúdos e ferramentas exclusivas",
        ]}
        ctaText="QUERO DOMINAR OS INVESTIMENTOS"
        ctaHref="#inscricao"
      />
      <NotableParticipants />

      <TestimonialsSection />
      <NewsletterFormacoes title="INSCREVA-SE PARA A MUDANÇA DE VIDA" description="Garanta sua vaga na Mentoria de Investimentos" source="Mentoria de Investimentos" />
      <Footer />
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
