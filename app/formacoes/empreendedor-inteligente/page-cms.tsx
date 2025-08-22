"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getFormation } from '@/lib/sanity/fetch'
import {
  ArrowRight,
  ChevronRight,
  Users,
  Zap,
  DollarSign,
  BarChart,
  Building,
  TrendingUp,
  UserPlus,
  Users2,
  BedDouble,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import QuemSomosSection from "@/components/mentor"
import { FaMoneyBill } from "react-icons/fa"

export default function EmpreendedorInteligentePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formationData, setFormationData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)

    // Fetch Sanity data for this formation
    const fetchFormationData = async () => {
      try {
        const data = await getFormation('empreendedor-inteligente')
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          eventId: 3, // ID do evento "Empreendedor Inteligente"
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
      console.error("Erro ao processar inscrição:", err)
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao processar sua inscrição")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Use Sanity data or fallback to original static content
  const formationTitle = formationData?.title || "EMPREENDEDOR INTELIGENTE"
  const formationSubtitle = formationData?.subtitle || "Escale seus resultados com segurança e liberdade"
  const formationDescription = formationData?.description || "Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança"
  const formationPrice = formationData?.price?.value ? `R$ ${formationData.price.value.toLocaleString('pt-BR')}` : "R$ 4.997"

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "O Programa", href: "#programa" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      <HeroPages
        title={formationTitle}
        secondtitle={formationSubtitle}
        subtitle="Formação Exclusiva"
        description={formationDescription}
        image="/images/HERO_EMPREENDEDOR.png"
        ctaText="TRANSFORME SEU NEGÓCIO!"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#programa"
      />

      {/* O Programa Section - LAYOUT ORIGINAL */}
      <section id="programa" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O PROGRAMA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              DOMINE A ARTE DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ESCALAR NEGÓCIOS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Metodologia comprovada que já ajudou mais de 5.000 empresários a multiplicar seus resultados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Crescimento Escalável</h3>
              <p className="text-zinc-300">Aprenda a criar sistemas que multiplicam seus resultados sem multiplicar seu trabalho</p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Captação de Investimento</h3>
              <p className="text-zinc-300">Domine as técnicas para atrair investidores e financiar sua expansão</p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Gestão Inteligente</h3>
              <p className="text-zinc-300">Ferramentas e métodos para gerir com eficiência e tomar decisões estratégicas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Section - LAYOUT ORIGINAL */}
      <section id="beneficios" className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ VAI <span className="text-yellow-400">CONQUISTAR</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <BarChart className="h-6 w-6" />,
                title: "Faturamento 10x",
                desc: "Multiplique seu faturamento sem aumentar proporcionalmente os custos"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Time de Alta Performance",
                desc: "Construa e lidere equipes que entregam resultados extraordinários"
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Processos Automatizados",
                desc: "Crie sistemas que funcionam sem sua presença constante"
              },
              {
                icon: <UserPlus className="h-6 w-6" />,
                title: "Networking Estratégico",
                desc: "Conecte-se com investidores e parceiros estratégicos"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                <p className="text-zinc-300 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                QUERO ESCALAR MEU NEGÓCIO <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Conteúdo do Programa - LAYOUT ORIGINAL */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">MÓDULOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              CONTEÚDO <span className="text-yellow-400">TRANSFORMADOR</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                module: "Módulo 1",
                title: "Fundamentos do Crescimento",
                topics: [
                  "Diagnóstico empresarial completo",
                  "Identificação de gargalos e oportunidades",
                  "Definição de metas escaláveis",
                  "Criação de KPIs estratégicos"
                ]
              },
              {
                module: "Módulo 2",
                title: "Sistemas e Processos",
                topics: [
                  "Mapeamento de processos críticos",
                  "Automação inteligente",
                  "Gestão por resultados",
                  "Implementação de metodologias ágeis"
                ]
              },
              {
                module: "Módulo 3",
                title: "Vendas e Marketing",
                topics: [
                  "Funil de vendas de alta conversão",
                  "Marketing digital para B2B",
                  "Estratégias de precificação",
                  "Customer Success e retenção"
                ]
              },
              {
                module: "Módulo 4",
                title: "Finanças e Investimento",
                topics: [
                  "Gestão financeira avançada",
                  "Valuation e preparação para investimento",
                  "Pitch deck que converte",
                  "Negociação com investidores"
                ]
              }
            ].map((item, index) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center text-black font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-yellow-400 font-medium mb-1">{item.module}</div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300 text-sm">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <QuemSomosSection />

      {/* Investment Section - LAYOUT ORIGINAL */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/90 border-2 border-yellow-500/40 rounded-3xl p-10 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">INVESTIMENTO</h3>
              <p className="text-4xl font-extrabold text-yellow-400 mb-2">{formationPrice}</p>
              <p className="text-zinc-300 mb-6">ou 12x de R$ 497</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">O que está incluso:</h4>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>4 módulos completos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Mentoria em grupo semanal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Material complementar</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">Bônus exclusivos:</h4>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Templates e ferramentas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Acesso à comunidade VIP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Certificado de conclusão</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-lg"
              >
                <Link href="#inscricao">
                  GARANTIR MINHA VAGA AGORA <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-400 font-bold">🔥 Oferta Limitada!</p>
                <p className="text-zinc-300 text-sm mt-1">Apenas 30 vagas disponíveis para a próxima turma</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterFormacoes 
        onSubmit={() => {}}
        title="TRANSFORME SEU NEGÓCIO EM UMA MÁQUINA DE RESULTADOS" 
        description="Inscreva-se agora no Empreendedor Inteligente" 
        source="Empreendedor Inteligente" 
        ctaText="QUERO ME INSCREVER!" 
      />

      <Footer />
      <WhatsAppButton source="Empreendedor Inteligente" />
    </div>
  )
}