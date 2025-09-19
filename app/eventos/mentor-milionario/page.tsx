"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  MapPin,
  Calendar,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Target,
  Users,
  Award,
  BookOpen,
  DollarSign,
  Zap,
  Brain,
  Lightbulb,
  Star,
  Crown,
  Trophy,
  Briefcase
} from "lucide-react"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
import WhatsAppButton from "@/components/whatsapp-button"
import { useRouter } from "next/navigation"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import MentorSection from "@/components/mentor"
import { LeadFormData, NewsletterSignup } from "@/components/newsletter-signup"
import NotableParticipants from "@/components/notable-persons"
import { SectionBadge } from "@/components/section-badge"
import EventCTAButton from "@/components/event-cta-button"

export default function MentorMilionario() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    const style = document.createElement("style")
    style.innerHTML = `
      .card-hover {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .card-hover:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.25);
      }
      .card-modern {
        background: linear-gradient(135deg, rgba(24, 24, 27, 0.8), rgba(39, 39, 42, 0.6));
        backdrop-filter: blur(16px);
        border: 1px solid rgba(245, 158, 11, 0.1);
      }
      .card-modern:hover {
        border-color: rgba(245, 158, 11, 0.3);
        background: linear-gradient(135deg, rgba(24, 24, 27, 0.9), rgba(39, 39, 42, 0.7));
      }
      .floating-animation {
        animation: float 6s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      .pulse-glow {
        animation: pulse-glow 3s ease-in-out infinite;
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.2); }
        50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.4); }
      }
    `
    document.head.appendChild(style)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          eventId: 4, // ID do evento "Escalador de Negócios"
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao processar inscrição")
      }

      const data = await response.json()
      router.push(`/inscricao/confirmacao?ticket=${data.ticketCode}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao processar sua inscrição")
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Mentor", href: "#mentor" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] bg-repeat bg-[length:200px_200px] pointer-events-none"></div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="relative z-10">
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />
      {/* Hero Section */}
      <HeroPages
        title="MENTOR MILIONÁRIO"
        subtitle="O Evento Que Vai Transformar Conhecimento em Fortuna e Criar Múltiplas Fontes de Renda"
        secondtitle="De Lavador de Vidros a Multimilionário em 7 Anos..."
        description={`Agora Roberto Navarro Revela os Segredos para Você Se Tornar um Mentor de Sucesso ou Conquistar Seu Primeiro Milhão`}
        image="/IMAGES/HERO_ESCALADOR.png"
        ctaText="QUERO MINHA VAGA NO MENTOR MILIONÁRIO"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
      />
      {/* Para Quem É Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-3 px-6 mb-6 pulse-glow">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">PARA QUEM É ESTE EVENTO?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
              Seu Perfil de Sucesso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                text: "Profissionais que querem monetizar seu conhecimento",
                icon: <Briefcase className="h-10 w-10" />,
                gradient: "from-yellow-500/20 to-amber-500/20"
              },
              {
                text: "Pessoas em busca do primeiro milhão",
                icon: <Target className="h-10 w-10" />,
                gradient: "from-yellow-500/20 to-amber-500/20"
              },
              {
                text: "Quem deseja se tornar mentor de sucesso",
                icon: <Crown className="h-10 w-10" />,
                gradient: "from-yellow-500/20 to-amber-500/20"
              },
              {
                text: "Empreendedores que querem múltiplas fontes de renda",
                icon: <TrendingUp className="h-10 w-10" />,
                gradient: "from-yellow-500/20 to-amber-500/20"
              },
              {
                text: "Especialistas prontos para escalar seus resultados",
                icon: <Trophy className="h-10 w-10" />,
                gradient: "from-yellow-500/20 to-amber-500/20"
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`card-modern card-hover rounded-2xl p-8 text-center group relative overflow-hidden ${index === 4 ? 'md:col-span-2 lg:col-span-1 mx-auto lg:mx-0' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="bg-yellow-500/10 rounded-2xl p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors duration-300">
                    <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-100 transition-colors duration-300">
                    {item.text}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solution Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

            {/* Left Side - Challenges */}
            <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-3 px-6 mb-6">
                  <Target className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-400">DESAFIOS</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                  O Que Está Travando Sua Prosperidade?
                </h2>

                <div className="space-y-6">
                  {[
                    "Você tem conhecimento valioso, mas não sabe como transformá-lo em dinheiro?",
                    "Quer alcançar o primeiro milhão, mas não tem uma estratégia clara?",
                    "Sonha em se tornar um mentor reconhecido, mas não sabe por onde começar?",
                    "Precisa de múltiplas fontes de renda para conquistar liberdade financeira?"
                  ].map((question, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="bg-yellow-500/20 rounded-full p-2 mt-1 flex-shrink-0">
                        <ArrowRight className="h-4 w-4 text-yellow-400" />
                      </div>
                      <p className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{question}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                  <p className="text-xl font-bold text-yellow-400 text-center">
                    Se você respondeu SIM para qualquer uma dessas perguntas, este evento foi criado especialmente para VOCÊ!
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Solution */}
            <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-3 px-6 mb-6">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-400">A SOLUÇÃO</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                  Mentor Milionário
                </h2>

                <p className="text-lg text-zinc-300 mb-8 group-hover:text-zinc-200 transition-colors">
                  <strong>Em um único dia de imersão</strong>, Roberto Navarro - criador do Coach Financeiro no Brasil e responsável por transformar mais de <strong className="text-yellow-400">300.000 vidas</strong> - vai mostrar <strong>como qualquer pessoa pode multiplicar seus resultados</strong> e conquistar a prosperidade através de estratégias comprovadas.
                </p>

                <div className="bg-zinc-800/40 rounded-2xl p-6 border border-yellow-500/20">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400 text-center">FORMATO DO EVENTO</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Data:", value: "24 de Setembro" },
                      { label: "Local:", value: "Alameda Araguaia, 751, Alphaville, Barueri, SP" },
                      { label: "Duração:", value: "7 horas intensivas" },
                      { label: "Metodologia:", value: "Blocos estratégicos de alto impacto" },
                      { label: "Resultado:", value: "Plano claro para alcançar 1 milhão" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-2">
                        <span className="font-semibold text-yellow-400 min-w-[100px]">{item.label}</span>
                        <span className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programa Completo Section */}
      <section id="o-que-aprender" className="py-20 relative bg-zinc-900/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-3 px-6 mb-6 pulse-glow">
              <BookOpen className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">PROGRAMA COMPLETO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
              7 Horas de Transformação Intensiva
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Um mergulho profundo nas estratégias que separam milionários de pessoas comuns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* ABERTURA */}
            <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-4 floating-animation">
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">ABERTURA</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-100 transition-colors">A Mentalidade do Milhão</h3>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-4 text-yellow-400">A Trajetória de Roberto Navarro</h4>
                <div className="space-y-3">
                  {[
                    "Como saiu de lavador de vidros para multimilionário em menos de 7 anos",
                    "Por que a prosperidade é uma ESCOLHA, não sorte",
                    "Os 3 pilares que sustentam qualquer fortuna"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="bg-yellow-500/20 rounded-full p-1 mt-1 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                      </div>
                      <p className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BLOCO 1 */}
            <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-4 floating-animation">
                    <Brain className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">BLOCO 1</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-100 transition-colors">Reprogramação Mental</h3>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-4 text-yellow-400">Desbloqueando Seu Potencial Financeiro</h4>
                <div className="space-y-3">
                  {[
                    "Como identificar e quebrar as crenças que limitam seu crescimento",
                    "O 'reset' mental que liberta sua capacidade de gerar riqueza",
                    "Estratégias para desenvolver autoridade como especialista"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="bg-yellow-500/20 rounded-full p-1 mt-1 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                      </div>
                      <p className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BLOCO 2 */}
            <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-4 floating-animation">
                    <DollarSign className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">BLOCO 2</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-100 transition-colors">As Regras Secretas do Dinheiro</h3>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-4 text-yellow-400">O Código dos Milionários</h4>
                <div className="space-y-3">
                  {[
                    "As 7 regras fundamentais que todo milionário segue",
                    "Como gerar riqueza de forma sustentável e escalável",
                    "A diferença entre quem fica rico e quem fica milionário"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="bg-yellow-500/20 rounded-full p-1 mt-1 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                      </div>
                      <p className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BLOCO 3 */}
            <div className="card-modern card-hover rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-4 floating-animation">
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">BLOCO 3</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-100 transition-colors">Múltiplas Fontes de Renda</h3>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-4 text-yellow-400">Duas Estratégias Poderosas de Crescimento</h4>

                <div className="space-y-4">
                  <div className="bg-zinc-800/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm font-bold text-yellow-300">ESTRATÉGIA 1: Negócio Digital</span>
                    </div>
                    <ul className="space-y-1 text-sm text-zinc-400">
                      <li>• Transformar conhecimento em produto lucrativo</li>
                      <li>• Estruturação de programas de mentoria</li>
                      <li>• Posicionamento como autoridade</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm font-bold text-yellow-300">ESTRATÉGIA 2: Investimentos</span>
                    </div>
                    <ul className="space-y-1 text-sm text-zinc-400">
                      <li>• Estratégias financeiras aceleradas</li>
                      <li>• Como fazer o dinheiro trabalhar</li>
                      <li>• Proteção e multiplicação de patrimônio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCO 4 - Destaque especial */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="card-modern card-hover rounded-3xl p-10 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 via-amber-500/10 to-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-500/30 to-amber-600/30 rounded-3xl p-6 floating-animation">
                    <Target className="h-12 w-12 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">BLOCO FINAL</span>
                    <h3 className="text-3xl font-bold text-white group-hover:text-yellow-100 transition-colors">Seu Plano Milionário</h3>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-6 text-yellow-400">Estruturando Sua Jornada ao Primeiro Milhão</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Criação do seu plano pessoal e objetivo",
                    "Métricas e marcos para acompanhar evolução",
                    "Sistema de execução que gera resultados consistentes"
                  ].map((item, idx) => (
                    <div key={idx} className="bg-zinc-800/40 rounded-2xl p-6 border border-yellow-500/20">
                      <div className="bg-yellow-500/20 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-yellow-400" />
                      </div>
                      <p className="text-zinc-300 group-hover:text-zinc-200 transition-colors font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Que Você Vai Conquistar Section */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI CONQUISTAR</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Clareza total sobre como monetizar seu conhecimento",
              "Estratégia estruturada para alcançar o primeiro milhão",
              "Mentalidade reprogramada para a prosperidade",
              "Plano concreto com ações práticas e mensuráveis",
              "Conhecimento das regras que todo milionário segue",
              "Duas fontes de renda estruturadas para crescimento acelerado"
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                <p className="text-lg font-semibold text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Este Evento é Para Você Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">ESTE EVENTO É PARA VOCÊ SE:</span>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-lg text-zinc-300"><strong className="text-yellow-400">Você está CANSADO</strong> de ter conhecimento valioso, mas conta bancária vazia</p>
              <p className="text-lg text-zinc-300"><strong className="text-yellow-400">Você quer PARAR</strong> de trocar tempo por dinheiro e criar renda escalável</p>
              <p className="text-lg text-zinc-300"><strong className="text-yellow-400">Você está DETERMINADO</strong> a sair da zona de conforto financeiro</p>
              <p className="text-lg text-zinc-300"><strong className="text-yellow-400">Você ACREDITA</strong> que merece prosperidade e está disposto a agir</p>
            </div>
          </div>
        </div>
      </section>

      {/* Momento de Decidir Section */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">MOMENTO DE DECIDIR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">A diferença entre quem conquista o primeiro milhão e quem apenas sonha com ele está em UMA decisão.</span>
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto mb-12">
              <p className="text-xl text-zinc-300"><strong>Roberto Navarro não apenas ensina teorias.</strong></p>
              <p className="text-xl text-zinc-300"><strong>Ele VIVEU a transformação.</strong></p>
              <p className="text-xl text-zinc-300"><strong>Ele PROVOU que é possível.</strong></p>
              <p className="text-xl text-zinc-300"><strong>E agora ele vai mostrar EXATAMENTE como fazer.</strong></p>
            </div>
            <p className="text-2xl font-bold text-yellow-400 mb-8">Sua prosperidade está a um clique de distância.</p>
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-lg"
            >
              <Link href="#inscricao" className="flex items-center">
                QUERO MINHA VAGA NO MENTOR MILIONÁRIO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="mt-12">
              <p className="text-lg italic text-zinc-400">
                &quot;A prosperidade não é um acidente. É uma escolha estratégica.&quot;
              </p>
              <p className="text-md text-zinc-500 mt-2">- Roberto Navarro</p>
            </div>
          </div>
        </div>
      </section>

      <NotableParticipants />

      <TestimonialsSection />
      {/* Mentor Section - imagem à esquerda, texto à direita */}
      <MentorSection />

      <section id="inscricao" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.03)_0%,_rgba(39,39,42,0.1)_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="INSCRIÇÃO" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              ESCOLHA SEU <span className="text-yellow-400">INGRESSO</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Participe do evento Mentor Milionário e comece a mudar sua relação com o dinheiro. Vagas
              limitadas!
            </p>
          </div>

          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                  <Calendar className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Data e Horário</h4>
                  <p className="text-zinc-300 text-lg"> 24 de Setembro de 2025, 13h às 20h</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-zinc-700/30"></div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                  <MapPin className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Local</h4>
                  <p className="text-zinc-300 text-lg">Alameda Araguaia, 751, Barueri, SP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
                      <EventCTAButton
              eduzzUrl="https://evento.blinket.com.br/mentor-milionario"
              buttonText="GARANTIR MINHA INSCRIÇÃO"
              className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold py-4 px-8 rounded-full text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              showArrow={false}
            />
                    </div>

          {/* <TicketPricingCards
            eventId={1}
            eventName="Crenças da Riqueza"
            ticketTypes={[
              {
                id: 2745132,
                name: "Ingresso Especial",
                price: 9.9,
                description: "Acesso completo ao evento presencial",
                benefits: [
                  "Experiência completa de 10 horas",
                  "Material digital exclusivo",
                  "Certificado de participação",
                  "Networking com participantes",
                ],
              },
              {
                id: 2745133,
                name: "Ingresso VIP",
                price: 49.9,
                description: "Experiência premium com benefícios exclusivos",
                benefits: [
                  "Tudo do Ingresso Especial",
                  "Assentos nas primeiras fileiras",
                  "Perguntas e respostas com Roberto Navarro",
                  "Compre 1, leve 2 (traga um acompanhante)",
                  "Acesso antecipado ao evento",
                ],
                featured: true,
              },
            ]}
          /> */}
        </div>
      </section>


      {/* <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-yellow-400">Transforme</span> seu Negócio Hoje
          </h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto mb-8">
            Não deixe para amanhã o que pode escalar sua empresa hoje. Vagas limitadas!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao" className="flex items-center">
                GARANTA SUA VAGA!
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <WhatsAppButton />
          </div>
        </div>
      </section> */}

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        source="Mentor Milionário"
        className="custom-class"
      />
      </main>
    </div>
  )
}
