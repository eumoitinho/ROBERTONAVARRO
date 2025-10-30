"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { FormationPageData } from "@/sanity/lib/formations-api"
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
  X,
  TrendingUp,
  Shield,
  BookOpen,
  BarChart3,
  PiggyBank,
  Heart,
  Clock,
  Award,
  Play,
  DollarSign,
  BarChart,
  Building,
  UserPlus,
  Users2,
  BedDouble,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "@/components/layout/mobile-menu"
import Logo from "@/components/shared/logo"
import HeroPages from "@/components/events/hero-pages"
import { TestimonialsSection }  from "@/components/marketing/testimonials-section"
import Footer from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/header"
import ReusableSection from "@/components/marketing/how-works"
import NotableParticipants from "@/components/events/notable-persons"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import Footerlp from "@/components/layout/footerlp"

interface Props { data: FormationPageData }

export default function MentoriaDeInvestimentosClient({ data }: Props) {
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

      {/* Hero Section */}
      <HeroPages
        title={n.hero?.title || "MENTORIA DE INVESTIMENTOS"}
        subtitle={n.hero?.subtitle || "Faça seu dinheiro trabalhar por você"}
        description={n.hero?.description || "Formação prática para quem quer aprender a investir com segurança, confiança e estratégias reais do mercado."}
        image={n.hero?.backgroundImage?.asset?.url || "/images/HERO_MENTORIAINVESTIMENTOS.png"}
        ctaText={n.hero?.ctaText || "QUERO ME TORNAR UM INVESTIDOR!"}
        ctaHref={n.hero?.ctaLink || "#inscricao"}
        secondtitle={n.hero?.subtitle || "Transforme sua vida financeira com a mentoria de investimentos"}
      />

      {/* The rest keeps existing layout but reads from data with safe fallbacks */}
      {/* Bloco 2 - Reprograme sua mente */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.mainContent?.badge || 'REPROGRAME SUA MENTE'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {n.mainContent?.title || 'REPROGRAME SUA MENTE PARA INVESTIR COM SEGURANÇA'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Caixinha vermelha */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/50 rounded-xl p-8 hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-red-400">{n.aboutSection?.badge || 'PROBLEMAS COMUNS'}</h3>
              <div className="space-y-4">
                {(n.aboutSection?.paragraphs?.slice(0,5) || [
                  "Medo de investir?",
                  "Não sabe por onde começar?",
                  "Cansado de taxas bancárias abusivas?",
                  "Sente que o dinheiro nunca é suficiente?",
                  "Já tentou sozinho e se frustrou?"
                ]).map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300 text-lg">{typeof item === 'string' ? item : item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caixinha verde */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-green-500/50 rounded-xl p-8 hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-green-400">{n.benefits?.badge || 'SOLUÇÕES DA MENTORIA'}</h3>
              <div className="space-y-4">
                {(n.benefits?.items?.map((it: any) => it.title) || [
                  "Aprenda o passo a passo de como investir com segurança, mesmo sendo iniciante.",
                  "Descubra estratégias que os bancos não querem que você saiba.",
                  "Desenvolva confiança para tomar decisões financeiras com autonomia.",
                  "Crie uma renda extra com investimentos, mesmo começando com pouco.",
                  "Tenha o acompanhamento e direcionamento certo para fazer seu dinheiro crescer."
                ]).map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining sections: keep original markup but prefer data fields when present */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {n.mainContent?.title || 'A MENTORIA QUE VAI TRANSFORMAR SUA RELAÇÃO COM O DINHEIRO'}
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              {n.mainContent?.description || 'A Mentoria de Investimentos vai te ajudar a descobrir que o mundo dos investimentos é acessível, simples e lucrativo.'}
            </p>
            <p className="text-lg text-zinc-300 mb-8">
              {n.aboutSection?.paragraphs?.[0] || 'Durante dois dias intensivos de mentoria, você será guiado por Roberto Navarro, um dos maiores educadores financeiros do Brasil, que vai te mostrar as estratégias reais e aplicáveis usadas por investidores bem-sucedidos.'}
            </p>
            <p className="text-lg text-zinc-300 mb-12">
              {n.aboutSection?.paragraphs?.[1] || 'E o melhor: você ainda terá acesso à Universidade do Investidor, com aulas online que aprofundam seu aprendizado. Você vai sair desse treinamento com um plano prático, um novo nível de consciência sobre seu dinheiro e pronto para investir com confiança e segurança.'}
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-4 rounded-lg cta-hover"
              onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {n.hero?.ctaText || 'QUERO ME TORNAR UM INVESTIDOR!'}
            </Button>
          </div>
        </div>
      </section>

      {/* Learn section */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.learnSection?.badge || 'O QUE VOCÊ VAI APRENDER'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {n.learnSection?.title || 'O QUE VOCÊ VAI APRENDER NA FORMAÇÃO'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(n.learnSection?.items || [
              { title: 'Investimentos na Bolsa', desc: 'Descubra como lucrar até quando a bolsa está em queda.' },
              { title: 'Renda fixa', desc: 'Saiba como proteger seu capital e garantir retorno.' },
              { title: 'Análise técnica', desc: 'Aprenda como ler gráficos e tomar decisões baseadas em dados.' },
            ]).map((item: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.desc || item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Newsletter / final CTA */}
      <NewsletterFormacoes
        onSubmit={() => {}}
        title={n.newsletter?.title || "PRONTO PARA TRANSFORMAR SUA VIDA FINANCEIRA?"}
        description={n.newsletter?.description || "Junte-se a milhares de pessoas que já transformaram sua relação com o dinheiro através da Mentoria de Investimentos."}
        source={n.title || "Mentoria de Investimentos"}
        ctaText={n.newsletter?.ctaText || "QUERO ME TORNAR UM INVESTIDOR!"}
      />

      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-zinc-400">© 2024 Roberto Navarro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
