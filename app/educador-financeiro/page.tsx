"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  ChevronRight,
  Star,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import CountdownTimer from "@/components/countdown-timer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function EducadorFinanceiroPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-10 w-auto" />
          <nav className="hidden md:flex space-x-8">
            <Link href="/#sobre" className="text-sm hover:text-yellow-400 transition-colors">
              Sobre
            </Link>
            <Link href="/#formacoes" className="text-sm hover:text-yellow-400 transition-colors">
              Formações
            </Link>
            <Link href="/#depoimentos" className="text-sm hover:text-yellow-400 transition-colors">
              Depoimentos
            </Link>
            <Link href="/#contato" className="text-sm hover:text-yellow-400 transition-colors">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-sm rounded-full px-6"
            >
              <Link href="/#contato">Contato</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-sm rounded-full px-6"
            >
              <Link href="/#formacoes">Formações</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "/#sobre", label: "Sobre" },
                { href: "/#formacoes", label: "Formações" },
                { href: "/#depoimentos", label: "Depoimentos" },
                { href: "/#contato", label: "Contato" },
              ]}
            />
          </div>
        </div>
      </header>

      <HeroPages
  title="EDUCADOR FINANCEIRO"
  secondtitle="Transforme seu conhecimento em liberdade financeira em apenas 90 dias."
  subtitle="Roberto Navarro"
  description={`Aprenda estratégias comprovadas para se tornar um Educador Financeiro de sucesso e conquistar sua liberdade financeira.`}
  image="/images/HERO_EDUCADOR.png"
  ctaText="QUERO SER UM EDUCADOR FINANCEIRO!"
  ctaHref="#inscricao"
  secondaryCtaText="Saiba mais"
  secondaryCtaHref="#sobre-curso"
/>

      {/* Hero Section
      <section className="relative pt-64 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/HERO_EDUCADOR.png"
            alt="Roberto Navarro"
            fill
            className="object-cover mt-20 pt-18"
            style={{ objectPosition: "right" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">Roberto Navarro</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                EDUCADOR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  FINANCEIRO
                </span>
              </h1>
              <p className="text-xl text-zinc-300 mb-4 max-w-xl">
                Transforme seu conhecimento em liberdade financeira em apenas 90 dias
              </p>
              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Aprenda estratégias comprovadas para se tornar um Educador Financeiro de sucesso e conquistar sua liberdade financeira.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                  onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
                >
                  QUERO SER UM EDUCADOR FINANCEIRO!
                </Button>
                <Button
                  asChild
                  className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="#sobre-curso">
                    Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-yellow-200 to-amber-500 flex items-center justify-center text-black font-bold text-xs"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-medium">13.000+</span> alunos formados
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section> */}

                  {/* Image Content */}
            {/* <div className="relative flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
        <Image
          src="/images/ROBERTO_12.jpg"
          alt="Roberto Navarro"
          width={500}
          height={440}
          className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
          style={{ maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
    </div> */}

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
            <p className="text-zinc-300 max-w-3xl mx-auto">
              A formação de Educador Financeiro é o seu passaporte para uma nova realidade mais segura, próspera e cheia
              de propósito.
            </p>
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
                  style={{ objectPosition: "top" }} // <-- ajuste aqui
                />
              </div>
            </div>

            <div>
              <div className="space-y-8 text-lg leading-relaxed text-zinc-300">

                <p>
                  <strong className="text-yellow-400">Nos próximos 90 dias</strong>, você vai dominar os fundamentos da educação financeira, aprender a criar <span className="text-yellow-400">planos personalizados</span> para diferentes perfis, desenvolver habilidades de <span className="text-yellow-400">comunicação e persuasão</span>, além de ter acesso a <span className="text-yellow-400">ferramentas práticas</span> e <span className="text-yellow-400">mentoria especializada</span>.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    É uma jornada que vai <span className="text-yellow-400">muito além da teoria</span>.
                  </li>
                  <li>
                    Você vai aprender a <span className="text-yellow-400">construir autoridade</span>, conquistar alunos ou clientes e criar <span className="text-yellow-400">fontes reais de renda</span>.
                  </li>
                  <li>
                    Contribua para que outras pessoas também tenham uma <span className="text-yellow-400">vida financeira equilibrada</span>.
                  </li>
                </ul>

                <p>
                  <span className="font-semibold text-yellow-400">Não deixe a oportunidade passar.</span> Essa pode ser a virada que você esperava!
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
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Conheça os recursos exclusivos que vão impulsionar sua jornada como Educador Financeiro.
            </p>
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
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              BENEFÍCIOS DA <span className="text-yellow-400">FORMAÇÃO</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Descubra como a formação de Educador Financeiro pode transformar sua vida pessoal e profissional.
            </p>
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
                title: "Empoderamento profissional",
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEJA UM <span className="text-yellow-400">TREINADOR LICENCIADO</span> DO INSTITUTO COACHING FINANCEIRO
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Além de se formar como Educador Financeiro, você poderá atuar como treinador licenciado dos cursos
              oficiais do Instituto Coaching Financeiro (ICF).
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 mb-16">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <p className="text-zinc-300 mb-6">
              Ao concluir a formação, você estará apto a revender treinamentos selecionados do ICF, utilizando o
              material didático oficial e emitindo certificados com a sua assinatura, reconhecidos diretamente pelo
              instituto. Ou seja: você já sai com um modelo de negócio pronto para gerar renda.
            </p>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Confira os treinamentos disponíveis:</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Livre de Dívidas",
                description:
                  "Estratégias práticas para negociação de dívidas e controle financeiro, com metodologia validada e conteúdo gravado. Uma base essencial para suas futuras aulas.",
              },
              {
                title: "Investimentos Inteligentes",
                description:
                  "Curso introdutório e prático sobre bolsa de valores e renda fixa. Ideal para quem quer começar a investir com segurança e repassar seus conhecimentos a outras pessoas.",
              },
              {
                title: "Transformação Financeira",
                description:
                  "Formação completa que aborda propósito com o dinheiro, liberdade financeira, planejamento de curto e longo prazo e criação de múltiplas fontes de renda.",
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
                      src={`/financial-education-course.png?key=5flil&key=5yilk&height=300&width=400&query=financial education course ${course.title}`}
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">SEU MENTOR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              CONHEÇA SEU <span className="text-yellow-400">MENTOR</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/roberto.webp"
                  alt="Roberto Navarro"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Roberto Navarro</h3>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando
                  vidros de carros aos 13 anos e, com determinação, construiu um caminho até se tornar multimilionário
                  em menos de sete anos.
                </p>
                <p>
                  Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no
                  país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e
                  princípios bíblicos, proporcionando resultados reais para quem busca sair das dívidas, construir
                  riqueza e alcançar liberdade. Ao longo de sua trajetória, já impactou mais de 13 mil alunos no Brasil
                  e no mundo.
                </p>
                <p>
                  Além de mentor e empreendedor, é autor de best-sellers e especialista em inteligência espiritual e
                  emocional. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida
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

      <TestimonialsSection/>

      
      {/* Guarantees Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">GARANTIAS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              INVESTIMENTO <span className="text-yellow-400">SEGURO</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Oferecemos garantias que demonstram nossa confiança na eficácia do método.
            </p>
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
                icon: <Target className="h-6 w-6 text-yellow-400" />,
                title: "Garantia de resultado em 6 meses",
                description:
                  "Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma melhoria significativa em sua vida financeira dentro de 6 meses, devolveremos o dobro do seu investimento no curso. Isso demonstra não apenas a confiança na eficácia de nosso método, mas também nosso compromisso com o seu progresso e resultados.",
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
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
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

      {/* Registration Section */}
      <section id="inscricao" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">INSCRIÇÃO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ÚLTIMAS VAGAS: <span className="text-yellow-400">VOCÊ NASCEU PARA PROSPERAR</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Participe da formação que já mudou milhares de vidas e pode mudar a sua. Preencha seus dados abaixo e dê o
              primeiro passo rumo à liberdade financeira.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Erro:</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefone (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">
                    Cidade/Estado
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Sua cidade/estado"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Por que você quer se tornar um Educador Financeiro?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Conte-nos um pouco sobre sua motivação..."
                ></textarea>
              </div>
              <Button
                className="cta-hover w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "QUERO SER UM EDUCADOR FINANCEIRO!"}
              </Button>
              <p className="text-xs text-zinc-400 text-center">
                Ao enviar este formulário, você concorda com nossa política de privacidade e termos de uso.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              DÚVIDAS <span className="text-yellow-400">COMUNS</span>
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
      <WhatsAppButton />
    </div>
  )
}
