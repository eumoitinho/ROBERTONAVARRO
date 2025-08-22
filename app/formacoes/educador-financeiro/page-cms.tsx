"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getFormation } from '@/lib/sanity/fetch'
import {
  ArrowRight,
  Users,
  Zap,
  Shield,
  Award,
  BookOpen,
  Lightbulb,
  DollarSign,
  BarChart,
  Target,
  Briefcase,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HeroPages from "@/components/hero-pages"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import NotableParticipants from "@/components/notable-persons"
import TransformationVideos from "@/components/transformation-videos"

export default function EducadorFinanceiroPage() {
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
        const data = await getFormation('educador-financeiro')
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
          eventId: 2, // ID do evento "Educador Financeiro"
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

  // Use Sanity data or fallback to original static content
  const formationTitle = formationData?.title || "EDUCADOR FINANCEIRO"
  const formationSubtitle = formationData?.subtitle || "Transforme sua experiência em uma carreira lucrativa"
  const formationDescription = formationData?.description || "Aprenda a transformar suas habilidades e conhecimentos em uma carreira como educador financeiro. Nosso programa oferece certificação, metodologia exclusiva e todo o suporte para você começar."
  const formationPrice = formationData?.price?.value ? `R$ ${formationData.price.value.toLocaleString('pt-BR')}` : "R$ 2.997"
  
  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "O Programa", href: "#o-programa" },
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
        subtitle="Certificação Profissional"
        description={formationDescription}
        image="/images/HERO_EDUCADOR.png"
        ctaText="COMEÇAR AGORA!"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-programa"
      />

      {/* O Programa Section - LAYOUT ORIGINAL */}
      <section id="o-programa" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O PROGRAMA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TORNE-SE UM <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">EDUCADOR FINANCEIRO CERTIFICADO</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Em apenas 90 dias, você estará pronto para transformar vidas e construir uma carreira sólida como educador financeiro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Metodologia Exclusiva</h3>
              <p className="text-zinc-300">Acesso ao método comprovado do Instituto Coaching Financeiro, com mais de 300.000 vidas transformadas.</p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Certificação Reconhecida</h3>
              <p className="text-zinc-300">Certificado oficial do ICF que te credencia a atuar como educador financeiro em todo Brasil.</p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Suporte Completo</h3>
              <p className="text-zinc-300">Mentoria individual, materiais didáticos e acesso à comunidade exclusiva de educadores.</p>
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
                icon: <DollarSign className="h-6 w-6" />,
                title: "Renda Escalável",
                desc: "Construa uma carreira com potencial de ganhos ilimitados"
              },
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: "Conhecimento Transformador",
                desc: "Domine técnicas avançadas de educação financeira"
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Segurança Profissional",
                desc: "Certificação e metodologia comprovada no mercado"
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Propósito de Vida",
                desc: "Transforme vidas enquanto constrói sua prosperidade"
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
              <a href="#inscricao">
                QUERO SER UM EDUCADOR FINANCEIRO <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Conteúdo do Programa - LAYOUT ORIGINAL */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONTEÚDO PROGRAMÁTICO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              90 DIAS DE <span className="text-yellow-400">TRANSFORMAÇÃO PROFISSIONAL</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Módulo 1: Fundamentos</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Princípios da educação financeira</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Psicologia do dinheiro e comportamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Metodologia ICF de ensino</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Técnicas de comunicação e oratória</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Módulo 2: Prática</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Criação de conteúdo educacional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Estruturação de cursos e workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Técnicas de mentoria individual</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Dinâmicas e exercícios práticos</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Módulo 3: Negócios</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Precificação e modelos de negócio</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Marketing digital para educadores</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Captação e fidelização de alunos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Parcerias e networking</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Módulo 4: Certificação</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Avaliação final teórica e prática</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Apresentação de projeto final</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Certificação oficial ICF</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-zinc-300">Entrada na rede de educadores</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TransformationVideos />
      <NotableParticipants />

      {/* Investment Section - LAYOUT ORIGINAL */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/90 border-2 border-yellow-500/40 rounded-3xl p-10 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">INVESTIMENTO</h3>
              <p className="text-4xl font-extrabold text-yellow-400 mb-2">{formationPrice}</p>
              <p className="text-zinc-300 mb-6">ou 12x de R$ 297</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">Incluso no programa:</h4>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <span>90 dias de formação completa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <span>Certificação oficial ICF</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <span>Material didático completo</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-yellow-400 mb-3">Bônus exclusivos:</h4>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <span>Kit de apresentações prontas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <span>Acesso à rede de educadores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <span>Suporte por 1 ano</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-lg"
              >
                <a href="#inscricao">
                  GARANTIR MINHA VAGA AGORA <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NewsletterFormacoes 
        onSubmit={() => {}}
        title="COMECE SUA JORNADA COMO EDUCADOR FINANCEIRO" 
        description="Inscreva-se agora e transforme sua vida em 90 dias" 
        source="Educador Financeiro" 
        ctaText="QUERO ME INSCREVER!" 
      />

      {/* FAQ Section - LAYOUT ORIGINAL */}
      <section className="py-20 bg-zinc-950/90 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-zinc-800/70 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              TIRE SUAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">DÚVIDAS</span>
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="multiple" className="space-y-3">
              {[
                {
                  question: "Preciso ter experiência prévia em finanças?",
                  answer: "Não é necessário ter experiência prévia. Nosso programa é completo e te ensina desde o básico até o avançado."
                },
                {
                  question: "Em quanto tempo posso começar a atuar?",
                  answer: "Após a certificação (90 dias), você já estará apto a começar sua carreira como educador financeiro."
                },
                {
                  question: "Qual o potencial de ganhos?",
                  answer: "Educadores financeiros certificados podem ganhar de R$ 5.000 a R$ 50.000 por mês, dependendo da dedicação e estratégia."
                },
                {
                  question: "O certificado é reconhecido?",
                  answer: "Sim! O certificado do ICF é reconhecido nacionalmente e te credencia a atuar em todo Brasil."
                },
                {
                  question: "Há suporte após a formação?",
                  answer: "Sim! Você terá 1 ano de suporte completo e acesso vitalício à comunidade de educadores."
                }
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-yellow-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-zinc-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Educador Financeiro" />
    </div>
  )
}