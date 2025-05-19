"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import WhatsAppButton from "@/components/whatsapp-button"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  Target,
  Users,
  Award,
  BarChart,
  ArrowRight,
  ChevronDown,
  Clock,
  Star,
  DollarSign,
  ChevronRight,
} from "lucide-react"

export default function LCFMentoringPro() {
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
          eventId: 5, // ID do evento "LCF Mentoring Pro"
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
            <Link href="/" className="text-sm hover:text-yellow-400 transition-colors">
              Início
            </Link>
            <Link href="#o-que-aprender" className="text-sm hover:text-yellow-400 transition-colors">
              O Que Aprender
            </Link>
            <Link href="#mentor" className="text-sm hover:text-yellow-400 transition-colors">
              Mentor
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
              <Link href="#cadastro">Entrar</Link>
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
                { href: "#o-que-aprender", label: "O Que Aprender" },
                { href: "#mentor", label: "Mentor" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#cadastro", label: "Cadastro" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* // Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
              <span className="text-sm font-medium">Mentoria Exclusiva para Transformação</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                LCF MENTORING PRO
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 font-light">Você já tem o dinheiro. Agora, só falta o controle!</p>
            <p className="text-lg text-zinc-300 mb-8 max-w-3xl">
              O LCF Mentoring PRO reúne os treinamentos mais transformadores do educador financeiro Roberto Navarro em
              um único programa - criado para te colocar no seleto grupo de pessoas que vivem com consciência, riqueza e
              propósito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
              >
                <Link href="#inscricao">CONQUISTE SUA VAGA!</Link>
              </Button>
              <Button
                asChild
                className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
              >
                <Link href="#o-que-aprender">
                  Saiba mais <ChevronDown className="h-4 w-4 ml-1" />
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
                  <span className="text-white font-medium">130,000+</span> vidas transformadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // Stats Section */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: <Users className="h-6 w-6 text-yellow-400" />, value: "130,000+", label: "Vidas Transformadas" },
            { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "10M", label: "Brasileiros (Meta)" },
            { icon: <Clock className="h-6 w-6 text-yellow-400" />, value: "6 meses", label: "Garantia" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 transition-all duration-1000 hover:border-yellow-500/50 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-zinc-800 rounded-full p-3">{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* // About Section */}
      <section className="py-24 relative bg-zinc-900/60">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/60 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">SOBRE O PROGRAMA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A RIQUEZA COMEÇA COM CLAREZA.
              <br className="hidden md:block" />
              <span className="text-yellow-400"> E SE CONSTRÓI COM MÉTODO</span>
            </h2>
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            {/* Texto em colunas para melhor leitura */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-950/80 rounded-2xl p-6 border border-zinc-800/60 shadow-lg">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Transformação Completa</h3>
                  <p className="text-zinc-300 text-base">
                    O LCF Mentoring PRO é o programa mais completo de transformação financeira, emocional e espiritual
                    do Brasil. Idealizado por Roberto Navarro, une três treinamentos impactantes em uma jornada poderosa
                    de evolução pessoal e profissional.
                  </p>
                </div>
                <div className="bg-zinc-950/80 rounded-2xl p-6 border border-zinc-800/60 shadow-lg">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Resultados Reais</h3>
                  <p className="text-zinc-300 text-base">
                    Desenvolva inteligência financeira aplicada, aprenda a investir com segurança, trabalhe sua
                    mentalidade de alta performance e encontre clareza sobre seu propósito de vida.
                  </p>
                </div>
              </div>
              <div className="bg-zinc-950/80 rounded-2xl p-6 border border-zinc-800/60 shadow-lg">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Ecossistema de Suporte</h3>
                <p className="text-zinc-300 text-base">
                  Conteúdos de alto nível, encontros presenciais e um ecossistema de suporte contínuo. O programa foi
                  desenhado para levar você do ponto em que está hoje até o estilo de vida que realmente merece viver —
                  com liberdade, consciência e domínio completo sobre sua jornada.
                </p>
              </div>
              <div>
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base mt-4"
                >
                  <Link href="#inscricao">
                    CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            {/* Imagem à direita em desktop */}
            <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
              <div className="relative max-w-md w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
                <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-4 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                  <Image
                    src="/financial-mentoring-session.png"
                    alt="LCF Mentoring Pro"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // What You Will Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Domine Sua Vida com <span className="text-yellow-400">Inteligências de Elite</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <BarChart className="h-6 w-6" />,
                title: "Inteligência emocional",
                desc: "Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.",
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Inteligência financeira",
                desc: "Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.",
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "Inteligência espiritual",
                desc: "Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo - é a base para prosperar com equilíbrio.",
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Inteligência estratégica",
                desc: "Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.",
              },
            ].map((module, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{module.title}</h3>
                <p className="text-zinc-300">{module.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* // Mentor Section */}
      <section id="mentor" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONHEÇA SEU MENTOR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              CONHEÇA SEU <span className="text-yellow-400">MENTOR</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/placeholder.svg?height=300&width=300&query=professional financial mentor"
                  alt="Roberto Navarro"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-yellow-400">Roberto Navarro</h3>
              <div className="space-y-4 text-zinc-300">
                <p>
                  De lavador de vidros aos 13 anos a referência nacional em inteligência financeira. Roberto Navarro
                  construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de escassez, onde o
                  dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua família.
                </p>
                <p>
                  Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua
                  metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos.
                  Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.
                </p>
                <p>
                  Reconhecido como the criador do coaching financeiro no Brasil, Roberto é especialista em inteligência
                  financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão
                  é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de
                  futuro.
                </p>
              </div>
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#inscricao">
                  CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* // Testimonials Section */}
      <section id="depoimentos" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">TRANSFORMAÇÕES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TRANSFORMAÇÕES QUE <span className="text-yellow-400">FALAM POR SI</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { src: "https://www.youtube.com/embed/4aYDKIQBnRw", title: "Depoimento 1" },
              { src: "https://www.youtube.com/embed/vTELcwYTsnl", title: "Depoimento 2" },
              { src: "https://www.youtube.com/embed/W6rBTIKel4w", title: "Depoimento 3" },
            ].map((video, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.src}
                  title={video.title}
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* // FAQ Section */}
      <section className="py-20 bg-zinc-950/90 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-zinc-800/70 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">Perguntas Frequentes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Dúvidas? <span className="text-yellow-400">Nós Respondemos</span>
            </h2>
            <p className="text-zinc-400">Confira as respostas para as principais dúvidas sobre o LCF Mentoring PRO.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="multiple" className="space-y-3">
              {[
                {
                  question: "O LCF Mentoring PRO é só para quem quer ser coach?",
                  answer: (
                    <>
                      <span className="block mb-2">
                        Não! O programa é para quem deseja transformar sua vida pessoal e profissional.
                      </span>
                      <span className="block">
                        Você pode aplicar os conhecimentos em sua vida ou, se quiser, transformar isso em uma carreira
                        de impacto.
                      </span>
                    </>
                  ),
                },
                {
                  question: "Há encontros presenciais?",
                  answer: (
                    <>
                      <span className="block mb-2">
                        Sim! São <b>4 imersões presenciais</b> em datas estratégicas.
                      </span>
                      <span className="block">Momentos de conexão, aprendizado e virada de chave.</span>
                    </>
                  ),
                },
                {
                  question: "Posso parcelar o valor?",
                  answer: (
                    <>
                      <span className="block mb-2">Sim! Oferecemos condições facilitadas para sua entrada.</span>
                      <span className="block">Preencha o formulário e receba orientação personalizada.</span>
                    </>
                  ),
                },
                {
                  question: "Qual a diferença do PRO para outros programas?",
                  answer: (
                    <>
                      <span className="block mb-2">
                        O PRO une os treinamentos mais poderosos do Navarro com acompanhamento real, experiência
                        imersiva e aplicação prática.
                      </span>
                      <span className="block">
                        É a experiência mais completa para quem busca transformação de verdade.
                      </span>
                    </>
                  ),
                },
                {
                  question: "Em quanto tempo verei resultados?",
                  answer: (
                    <>
                      <span className="block mb-2">Depende do seu comprometimento.</span>
                      <span className="block">
                        Nos primeiros 30 dias você já terá clareza e ações estruturadas. Em 6 meses, os resultados serão
                        visíveis.
                      </span>
                    </>
                  ),
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-yellow-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-zinc-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <Button
                asChild
                className="cta-hover bg-yellow-500/90 hover:bg-yellow-600 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">Ainda tem dúvidas? Fale com a equipe!</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="max-w-md w-full bg-zinc-900/90 border-2 border-yellow-500/40 rounded-3xl p-10 shadow-xl hover:border-yellow-500/80 transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">LCF Mentoring Pro</h3>
                <p className="text-4xl font-extrabold text-yellow-400 mb-2 text-center">R$ 20.000,00</p>
                <p className="text-zinc-300 mb-6 text-center">Condições facilitadas e parcelamento disponíveis</p>
                <ul className="space-y-3 mb-8 text-zinc-300 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Acesso vitalício aos principais treinamentos
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />4 imersões presenciais intensivas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Mais de 100h de conteúdo prático
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Suporte direto e acompanhamento
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Garantia de 6 meses: <br /> Se sua vida não mudar, devolvemos seu dinheiro
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-sm font-medium text-yellow-300">INVESTIMENTO</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Sua Vaga Limitada no LCF
                </span>{" "}
                Mentoring PRO
              </h2>
              <p className="text-lg text-zinc-300 mb-4">
                Acesso vitalício, suporte real e garantia total para sua transformação.
              </p>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                Networking com alunos de alto nível
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                Comunidade exclusiva
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                Mentorias ao vivo e acompanhamento
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                Material complementar e ferramentas práticas
              </li>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  asChild
                  className="cta-hover w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base text-center"
                >
                  <Link href="#inscricao">QUERO ENTRAR PARA O LCF PRO</Link>
                </Button>

                <Button
                  asChild
                  className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="#formacoes">
                    VER FORMAÇÕES <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="inscricao" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-yellow-400">Transforme</span> sua Carreira Hoje
          </h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto mb-8">
            Não deixe para amanhã o que pode transformar sua vida profissional hoje. Vagas limitadas!
          </p>
          {/* Registration Form */}
          <div className="max-w-3xl mx-auto mt-20 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">PREENCHA SEUS DADOS</h3>
              <p className="text-zinc-300 text-center mb-8">
                Preencha o formulário abaixo e dê o primeiro passo rumo à sua transformação financeira
              </p>

              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      Telefone
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
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg cta-hover"
                >
                  {isSubmitting ? "Enviando..." : "GARANTIR MINHA VAGA AGORA"}
                </Button>

                <p className="text-xs text-zinc-400 text-center">
                  Ao clicar em "Garantir minha vaga agora", você concorda com nossos termos de uso e política de
                  privacidade.
                </p>
              </form>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <Logo className="h-10 w-auto mb-4" />
              <p className="text-sm text-zinc-400 mb-4">Transformando carreiras no mercado financeiro desde 2015.</p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "youtube", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Programas</h4>
              <ul className="space-y-2">
                {["LCF Mentoring Pro", "Trading Avançado", "Gestão de Risco", "Psicologia do Trader"].map((program) => (
                  <li key={program}>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {program}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Links Úteis</h4>
              <ul className="space-y-2">
                {["Sobre", "Depoimentos", "FAQ", "Blog", "Contato"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contato</h4>
              <p className="text-sm text-zinc-400 mb-2">contato@lcfmentoringpro.com.br</p>
              <p className="text-sm text-zinc-400">São Paulo, SP - Brasil</p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} LCF Mentoring Pro. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-xs text-zinc-500 hover:text-yellow-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
