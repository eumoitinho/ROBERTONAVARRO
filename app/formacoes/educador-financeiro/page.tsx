"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
import LeadCapturePopup from "@/components/lead-capture-popup"
import { useScrollTrigger } from "@/hooks/use-scroll-trigger"

export default function EducadorFinanceiroPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Lead capture popup
  const { isTriggered: showPopup } = useScrollTrigger({ threshold: 35, delay: 1500 })
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  
  useEffect(() => {
    if (showPopup) {
      setIsPopupVisible(true)
    }
  }, [showPopup])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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
  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Sobre o Curso", href: "#sobre-curso" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader navigationItems={navigationItems} showInicio={true} />
      <HeroPages
        title="EDUCADOR FINANCEIRO"
        secondtitle="Alcance a liberdade financeira e multiplique esse poder com o mundo"
        subtitle="Roberto Navarro"
        description={`Formação completa para quem deseja dominar suas finanças, construir novas fontes de renda e impactar vidas através da educação financeira.`}
        image="/images/HERO_EDUCADOR.png"
        ctaText="QUERO SER UM EDUCADOR FINANCEIRO!"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre-curso"
      />

      {/* MEC Certification Section - Enhanced */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/5 rounded-full filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* MEC Seal - Left side */}
              <div className="md:col-span-2 flex justify-center">
                <div className="relative certificate-animation">
                  <Image
                    src="/images/MEC.png"
                    alt="Reconhecido pelo MEC"
                    width={240}
                    height={240}
                    className="z-10 relative"
                  />
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-full filter blur-xl -z-10"></div>
                </div>
              </div>

              {/* Content - Right side */}
              <div className="md:col-span-3 space-y-6">
                <h3
                  className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 certificate-item"
                  style={{ animationDelay: "0.1s" }}
                >
                  EXCELÊNCIA RECONHECIDA PELO MINISTÉRIO DA EDUCAÇÃO
                </h3>

                <p
                  className="text-zinc-300 text-lg leading-relaxed certificate-item"
                  style={{ animationDelay: "0.3s" }}
                >
                  Formação com <span className="text-yellow-400 font-semibold">certificação oficial</span> que valida
                  suas competências e abre portas no mercado. Um diferencial que comprova a qualidade do nosso método e
                  garante credibilidade à sua atuação profissional.
                </p>

                <div className="pt-2 certificate-item" style={{ animationDelay: "0.5s" }}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                      <span className="text-zinc-200">Reconhecimento nacional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                      <span className="text-zinc-200">Validação profissional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                      <span className="text-zinc-200">Credibilidade garantida</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-curso" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">SOBRE O CURSO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEJA UM AGENTE DA MUDANÇA E ENSINE O CAMINHO PARA A <span className="text-yellow-400">PROSPERIDADE</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/ROBERTO_5.jpg"
                  alt="Educador Financeiro Workshop"
                  width={500}
                  height={440}
                  className="w-[1000px] h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: "top" }}
                />
              </div>
            </div>

            <div>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                <p>
                  Com <span className="text-yellow-400 font-semibold">certificação reconhecida pelo MEC</span>, a
                  formação de Educador Financeiro é o seu passaporte para uma nova realidade de propósito e
                  prosperidade.
                </p>

                <p>
                  Em  <span className="text-yellow-400 font-semibold">poucos dias</span>, você verá resultados
                  concretos em sua vida e aprenderá como dominar os fundamentos da educação financeira e aplicar os
                  conhecimentos na prática.
                </p>
 
                <p>
                  Além de possibilitar seu crescimento individual, você desenvolverá{" "}
                  <span className="text-yellow-400">habilidades pedagógicas e de comunicação</span> para transmitir esse
                  conhecimento de forma eficaz, seja em consultorias, palestras ou cursos. O mercado busca educadores
                  financeiros qualificados, e você estará pronto para atender a essa demanda.
                </p>

                <p>
                  Além de impactar vidas, a formação abre portas para{" "}
                  <span className="text-yellow-400">novas fontes de renda</span> e permite que você construa um negócio
                  sólido e rentável no campo da educação financeira.
                </p>
              </div>

              <Button
                className="cta-hover mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
                onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              >
                QUERO SER UM EDUCADOR FINANCEIRO! <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">RECURSOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TUDO O QUE VOCÊ PRECISA PARA <span className="text-yellow-400">TRANSFORMAR SUA CARREIRA</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-6 w-6 text-yellow-400" />,
                title: "Conhecimento abrangente",
                description: "Do básico ao avançado em finanças pessoais, planejamento e investimentos.",
              },
              {
                icon: <Briefcase className="h-6 w-6 text-yellow-400" />,
                title: "Ferramentas práticas",
                description: "Planilhas, checklists e templates prontos para aplicar com seus alunos ou clientes.",
              },
              {
                icon: <Users className="h-6 w-6 text-yellow-400" />,
                title: "Mentoria personalizada",
                description: "Orientação direta de especialistas para acelerar sua evolução.",
              },
              {
                icon: <Zap className="h-6 w-6 text-yellow-400" />,
                title: "Networking e oportunidades",
                description: "Acesso a uma comunidade ativa e conexões com profissionais da área.",
              },
              {
                icon: <Award className="h-6 w-6 text-yellow-400" />,
                title: "Certificação reconhecida",
                description: "Competências validadas com um certificado que abre portas no mercado.",
              },
              {
                icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
                title: "Método validado",
                description: "Metodologia estruturada para ensinar finanças de forma clara, envolvente e eficaz.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{feature.title}</h3>
                <p className="text-zinc-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              BENEFÍCIOS DA <span className="text-yellow-400">FORMAÇÃO</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <DollarSign className="h-6 w-6 text-yellow-400" />,
                title: "Independência financeira",
                description:
                  "Aprenda a aplicar os conceitos ensinados em sua própria vida e alcance estabilidade e liberdade financeira.",
              },
              {
                icon: <Award className="h-6 w-6 text-yellow-400" />,
                title: "Reconhecimento profissional",
                description:
                  "Torne-se referência no ensino de finanças e conquiste autoridade e credibilidade na área.",
              },
              {
                icon: <Target className="h-6 w-6 text-yellow-400" />,
                title: "Realização de sonhos",
                description:
                  "Use seu novo conhecimento para alcançar objetivos pessoais e inspirar outros a fazerem o mesmo.",
              },
              {
                icon: <BarChart className="h-6 w-6 text-yellow-400" />,
                title: "Alta rentabilidade",
                description: "Transforme a educação financeira em uma fonte real de renda com potencial escalável.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                    <p className="text-zinc-300">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensed Trainer Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">OPORTUNIDADE EXCLUSIVA</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              SEJA UM{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                TREINADOR LICENCIADO
              </span>{" "}
              DO INSTITUTO COACHING FINANCEIRO
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-zinc-300 text-lg">
              <p>
                Além de se formar como Educador Financeiro, você poderá atuar como treinador licenciado dos cursos
                oficiais do Instituto Coaching Financeiro (ICF).
              </p>
              <p>
                Ao concluir a formação, você estará apto a revender treinamentos selecionados do ICF, utilizando o
                material didático oficial e emitindo certificados com a sua assinatura, reconhecidos diretamente pelo
                instituto. Ou seja: você já sai com um modelo de negócio pronto para gerar renda.
              </p>
              <p className="text-yellow-400 font-semibold">Confira os treinamentos disponíveis:</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "LIVRE DE DÍVIDAS",
                description:
                  "Estratégias práticas para negociação de dívidas e controle financeiro, com metodologia validada e conteúdo gravado. Uma base essencial para suas futuras aulas.",
                image: "/images/DIVIDAS.jpg",
              },
              {
                title: "INVESTIMENTOS INTELIGENTES",
                description:
                  "Curso introdutório e prático sobre bolsa de valores e renda fixa. Ideal para quem quer começar a investir com segurança e repassar seus conhecimentos a outras pessoas.",
                image: "/images/INVESTIMENTO.jpg",
              },
              {
                title: "TRANSFORMAÇÃO FINANCEIRA",
                description:
                  "Formação completa que aborda propósito com o dinheiro, liberdade financeira, planejamento de curto e longo prazo e criação de múltiplas fontes de renda.",
                image: "/images/REALIZAR.jpg",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="p-6">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-xl bg-zinc-800 flex items-center justify-center">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{course.title}</h3>
                  <p className="text-zinc-300 mb-6">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">SEU MENTOR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              APRENDA COM O MENTOR DOS <span className="text-yellow-400">MENTORES</span>
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
              O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/ROBERTO_12.jpg"
                  alt="Roberto Navarro"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Roberto Navarro</h3>
              <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
                <p>
                  Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando
                  vidros de carros aos 13 anos e, com determinação, construiu um caminho até se tornar multimilionário
                  em menos de sete anos.
                </p>
                <p>
                  Atualmente, é reconhecido como o{" "}
                  <span className="text-yellow-400">maior Educador Financeiro do Brasil</span> e criador do Coach
                  Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência
                  emocional e princípios bíblicos, proporcionando resultados reais para quem busca sair das dívidas,
                  construir riqueza e alcançar liberdade.
                </p>
                <p>
                  Ao longo de sua trajetória, já impactou <span className="text-yellow-400">mais de 13 mil alunos</span>{" "}
                  no Brasil e no mundo.
                </p>
                <p>
                  Além de mentor e empreendedor, é autor de best-sellers e especialista em inteligência espiritual e
                  emocional. Hoje, sua missão é clara:{" "}
                  <span className="text-yellow-400">ajudar 10 milhões de brasileiros</span> a conquistarem uma vida
                  próspera, com autonomia e visão de futuro.
                </p>
              </div>

              <Button
                className="cta-hover mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
                onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              >
                QUERO SER UM EDUCADOR FINANCEIRO! <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <TransformationVideos/>

      <NotableParticipants/>
      {/* Guarantees Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">GARANTIAS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              INVESTIMENTO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                SEGURO
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  {[
    {
      icon: <Shield className="h-6 w-6 text-yellow-400" />,
      title: "Garantia legal de 7 dias",
      description:
        "Seu investimento em si mesmo é protegido por uma garantia de satisfação total. Se, por algum motivo, dentro dos primeiros 7 dias de acesso à formação, você decidir que o treinamento não está alinhado com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago.",
    },
    {
      icon: <Target className="h-6 w-6 text-yellow-400 font-bold" />,
      title: "Garantia de resultados em 6 meses",
      description:
        "Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma melhoria significativa em sua vida financeira dentro de poucos dias, devolveremos o dobro do seu investimento no curso. Isso demonstra não apenas a confiança na eficácia de nosso método, mas também nosso compromisso com o seu progresso e resultados.",
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-400" />,
      title: "Certificação reconhecida",
      description:
        "Ao concluir com sucesso a formação, você receberá uma certificação reconhecida no MEC que comprova suas habilidades e competências como educador financeiro, aumentando suas oportunidades de carreira e credibilidade de mercado.",
    },
  ].map((guarantee, index) => (
    <div
      key={index}
      className={`bg-zinc-900/50 backdrop-blur-sm border rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 ${
        guarantee.title === "Garantia de resultados em 6 meses"
          ? "border-yellow-400/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
          : "border-zinc-800/50"
      }`}
    >
      <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
        {guarantee.icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">{guarantee.title}</h3>
      <p className="text-zinc-300 text-center">{guarantee.description}</p>
    </div>
  ))}
</div>
        </div>
      </section>

      <NewsletterFormacoes
        onSubmit={() => {
          /* não precisa mais chamar router.push aqui,
             o componente já faz isso */
        }}
        title="ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR"
        description="Participe da formação que já mudou milhares de vidas e pode mudar a sua. Preencha seus dados abaixo e dê o primeiro passo rumo à liberdade financeira."
        source="Educador Financeiro"
        ctaText="QUERO SER UM EDUCADOR FINANCEIRO!"
      />

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              DÚVIDAS{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                COMUNS
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Encontre respostas para as perguntas mais frequentes sobre a formação de Educador Financeiro.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Preciso ter experiência prévia em finanças?",
                  answer:
                    "Não é necessário ter experiência prévia em finanças. O curso foi desenhado para pessoas em diferentes níveis de conhecimento, desde iniciantes até profissionais que já atuam na área e desejam aprimorar suas habilidades como educadores financeiros.",
                },
                {
                  question: "Quanto tempo leva para eu começar a ter resultados?",
                  answer:
                    "Os resultados variam de acordo com o comprometimento e dedicação de cada aluno. No entanto, muitos dos nossos alunos começam a ver resultados já nas primeiras semanas, aplicando os conhecimentos em sua própria vida financeira e iniciando seus primeiros atendimentos como educadores financeiros.",
                },
                {
                  question: "Como funciona a certificação?",
                  answer:
                    "Ao concluir o curso com aproveitamento mínimo de 70% nas avaliações, você receberá um certificado reconhecido pelo MEC que comprova suas habilidades como Educador Financeiro. Este certificado é um diferencial importante para quem deseja atuar profissionalmente na área.",
                },
                {
                  question: "Posso trabalhar como Educador Financeiro em qualquer lugar do Brasil?",
                  answer:
                    "Sim! Uma das grandes vantagens desta formação é a flexibilidade. Você pode atuar como Educador Financeiro presencialmente em sua cidade ou região, ou trabalhar de forma online, atendendo clientes de qualquer lugar do Brasil e até mesmo do exterior.",
                },
                {
                  question: "Terei suporte após a conclusão do curso?",
                  answer:
                    "Sim, oferecemos suporte contínuo após a conclusão do curso. Você terá acesso a uma comunidade exclusiva de educadores financeiros, além de mentorias periódicas e materiais atualizados para continuar aprimorando suas habilidades.",
                },
                {
                  question: "A formação serve para gerar renda ou só para melhorar minha vida pessoal?",
                  answer:
                    "As duas coisas. Você aprenderá a transformar sua própria vida financeira e também como transformar esse conhecimento em uma fonte de renda.",
                },
                {question: "O curso tem carga horária flexível?",
                  answer:
                    "Sim. O conteúdo é online, com acesso 24h por dia, permitindo que você estude no seu ritmo e de onde quiser.",
                },
                {question: "É possível se tornar um treinador licenciado?",
                  answer: 
                    "Sim. Após a formação, você poderá se tornar um treinador oficial do Instituto Coaching Financeiro, com direito a revender treinamentos certificados e gerar renda com um modelo de negócio já validado.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-zinc-800 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-zinc-800/50 text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-zinc-900/50 text-zinc-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        source="Educador Financeiro"
        className="custom-class"
      />
      
      {/* Lead Capture Popup */}
      <LeadCapturePopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        title="💰 Transforme-se em um Educador Financeiro!"
        subtitle="Receba materiais exclusivos e seja o primeiro a saber sobre oportunidades na área de educação financeira"
      />
    </div>
  )
}
