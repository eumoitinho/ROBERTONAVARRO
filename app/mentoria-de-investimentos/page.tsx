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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-10 w-auto" />
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm hover:text-yellow-400 transition-colors">
              Início
            </Link>
            <Link href="#beneficios" className="text-sm hover:text-yellow-400 transition-colors">
              Benefícios
            </Link>
            <Link href="#como-funciona" className="text-sm hover:text-yellow-400 transition-colors">
              Como Funciona
            </Link>
            <Link href="#depoimentos" className="text-sm hover:text-yellow-400 transition-colors">
              Depoimentos
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-sm rounded-full px-6"
            >
              <Link href="#inscricao">Entrar</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-sm rounded-full px-6"
            >
              <Link href="#inscricao">Inscreva-se</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "/", label: "Início" },
                { href: "#beneficios", label: "Benefícios" },
                { href: "#como-funciona", label: "Como Funciona" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#inscricao", label: "Inscrição" },
              ]}
            />
          </div>
        </div>
      </header>
      {/* 
     // Hero Section */}
    <HeroPages
        title="Mentoria de Investimentos"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher a <span className="text-yellow-400">Mentoria de Investimentos</span>
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
      {/* // Como Funciona Section */}
      <section id="como-funciona" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/investment-mentoring.webp"
                  alt="Como funciona a mentoria"
                  width={500}
                  height={440}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Como funciona a <span className="text-yellow-400">Mentoria de Investimentos</span>
              </h2>
              <ul className="space-y-4 text-zinc-300">
                {[
                  "Diagnóstico financeiro completo",
                  "Definição de metas claras e realistas",
                  "Análise detalhada do seu perfil de investidor",
                  "Montagem de carteira personalizada",
                  "Estratégias avançadas para maximizar retornos",
                  "Acompanhamento contínuo com ajustes periódicos",
                  "Acesso a conteúdos e ferramentas exclusivas",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base mt-8"
              >
                <Link href="#inscricao">
                  QUERO DOMINAR OS INVESTIMENTOS <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* // Depoimentos Section */}
      <section id="depoimentos" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DEPOIMENTOS DE MENTORADOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quem já transformou sua vida com a <span className="text-yellow-400">Mentoria</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Alfredo Soares",
                role: "Autoridade em vendas e autor best-seller",
                image: "/images/alfredo-soares.webp",
              },
              {
                name: "Tiago Brunet",
                role: "Referência em treinamento de líderes e espiritualidade",
                image: "/images/tiago-brunet.webp",
              },
              {
                name: "Flávio Prado",
                role: "Jornalista esportivo que já cobriu 10 Copas do Mundo",
                image: "/images/flavio-prado.webp",
              },
              {
                name: "Pyong Lee",
                role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
                image: "/images/pyong-lee.webp",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                  <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                </div>
                <p className="font-bold text-yellow-400">{testimonial.name}</p>
                <p className="text-sm text-zinc-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      {/* // Inscrição Section     */}
      <section id="inscricao" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
              Garanta sua vaga na Mentoria de Investimentos
            </h2>
            <p className="text-lg mb-4 text-zinc-300">Investimento: R$ 15.000,00</p>
            <p className="text-md mb-8 text-zinc-300">
              Vagas limitadas para quem está comprometido em construir riqueza com inteligência.
            </p>
            <Button
              asChild
              className="cta-hover w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base mb-4"
            >
              <Link href="/inscricao-mentoria-investimentos">
                QUERO ME INSCREVER AGORA <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className="text-xs text-zinc-400 mt-6">
              Garantia de satisfação: 30 dias para testar a mentoria ou seu dinheiro de volta.
            </p>
          </div>
        </div>
      </section>
      <Footer />
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
