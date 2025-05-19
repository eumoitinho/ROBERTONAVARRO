"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin, Calendar, ChevronDown, ArrowRight } from "lucide-react"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
import WhatsAppButton from "@/components/whatsapp-button"
import { useRouter } from "next/navigation"

export default function EscaladorDeNegocios() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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
                { href: "#o-que-aprender", label: "O Que Aprender" },
                { href: "#mentor", label: "Mentor" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#inscricao", label: "Inscrição" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* Hero Section - agora com imagem ao lado no desktop */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">Evento Presencial Exclusivo</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  ESCALADOR DE NEGÓCIOS
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-light">Empreendedores de sucesso não crescem por acaso</p>
              <p className="text-lg text-zinc-300 mb-8 max-w-3xl">
                Saia da estagnação e aplique, de forma imediata, estratégias reais para escalar vendas, lucros e
                liberdade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Calendar className="text-yellow-400" />
                  <span>27 de maio</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="text-yellow-400" />
                  <span>Alameda Araguaia, Alphaville - SP</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
  asChild
  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
>
  <Link href="#inscricao" className="flex items-center">
    GARANTA SUA VAGA!
    <ArrowRight className="ml-2 h-4 w-4" />
  </Link>
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
            </div>
            <div className="hidden md:block">
              <Image
                src="/escalador-evento.jpg"
                alt="Auditório do evento Escalador de Negócios"
                width={500}
                height={500}
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section - cards em linha no desktop */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS DO CRESCIMENTO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SE ESTÁ DIFÍCIL CRESCER, É PORQUE VOCÊ ESTÁ TENTANDO DO{" "}
              <span className="text-yellow-400">JEITO ERRADO</span>
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">Você sente que:</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {[
              {
                title: "Trabalha demais, mas o faturamento continua estagnado",
                desc: "Aprenda a escalar sem aumentar a carga de trabalho, com um modelo de crescimento sustentável.",
              },
              {
                title: "Sua empresa depende de indicações ou da sorte para vender",
                desc: "Descubra como criar um fluxo previsível de vendas com estratégia e posicionamento.",
              },
              {
                title: "Já tentou várias coisas, mas nada parece funcionar",
                desc: "Siga um método testado e validado por quem já multiplicou resultados.",
              },
              {
                title: "Está preso (a) no operacional e não tem tempo para crescer",
                desc: "Entenda como montar uma estrutura que funciona mesmo sem você por perto.",
              },
            ].map((challenge, index) => (
              <div
                key={index}
                className="flex-1 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{challenge.title}</h3>
                <p className="text-zinc-300">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Learn Section - cards em 3 colunas */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Estratégias para <span className="text-yellow-400">Escalar seu Negócio</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Estratégias reais de escala",
                desc: "Descubra como aumentar seu faturamento com processos inteligentes, sem precisar trabalhar mais.",
              },
              {
                title: "Autoridade e posicionamento de marca",
                desc: "Saiba como se tornar referência em seu segmento e atrair clientes qualificados com naturalidade.",
              },
              {
                title: "Multiplicação de lucros",
                desc: "Conheça os segredos dos empreendedores que saem da média e lucram de forma exponencial.",
              },
              {
                title: "Técnicas avançadas de venda",
                desc: "Aprenda formas de vender mais, fidelizar seus clientes e aumentar seu ticket médio.",
              },
              {
                title: "Networking estratégico e parcerias",
                desc: "Amplie suas conexões e crie novas oportunidades com empresários que também buscam escalar.",
              },
              {
                title: "Plano de ação imediato",
                desc: "Saia do evento com um plano prático e personalizado para aplicar no seu negócio no dia seguinte.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>
                </div>
                <p className="text-zinc-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao" className="flex items-center">
                GARANTA SUA VAGA!
              </Link>{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Event Highlights Section - cards em linha */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESTAQUES DO EVENTO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Um Evento que <span className="text-yellow-400">Entrega o que a Maioria Só Promete</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {[
              { title: "Evento 100% gratuito", icon: <CheckCircle className="h-10 w-10" /> },
              {
                title: "Experiência VIP disponível para os primeiros inscritos",
                icon: <CheckCircle className="h-10 w-10" />,
              },
              {
                title: "Presencial, com metodologia prática e resultados mensuráveis",
                icon: <CheckCircle className="h-10 w-10" />,
              },
            ].map((highlight, index) => (
              <div
                key={index}
                className="flex-1 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="text-yellow-400 mb-4 flex justify-center">{highlight.icon}</div>
                <h3 className="text-lg font-bold text-zinc-300">{highlight.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - grid 2 colunas no desktop */}
      <section id="depoimentos" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">QUEM JÁ PARTICIPOU</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              JÁ PASSARAM POR NOSSOS <span className="text-yellow-400">TREINAMENTOS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Alfredo Soares",
                role: "Autoridade em vendas e autor best-seller",
                image: "/alfredo-soares-portrait.png",
              },
              {
                name: "Tiago Brunet",
                role: "Referência em treinamento de líderes e espiritualidade",
                image: "/tiago-brunet-portrait.png",
              },
              {
                name: "Flávio Prado",
                role: "Jornalista esportivo que já cobriu 10 Copas do Mundo e eventos em mais de 60 países",
                image: "/flavio-prado-portrait.png",
              },
              {
                name: "Pyong Lee",
                role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
                image: "/pyong-lee-portrait.png",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center"
              >
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={120}
                  height={120}
                  className="rounded-full mb-4 border-2 border-yellow-400"
                />
                <h3 className="text-lg font-bold text-yellow-400">{testimonial.name}</h3>
                <p className="text-sm text-zinc-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section - grid 1 coluna mobile, 2 desktop */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DEPOIMENTOS EM VÍDEO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TRANSFORMAÇÕES QUE <span className="text-yellow-400">FALAM POR SI</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Section - imagem à esquerda, texto à direita */}
      <section id="mentor" className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONHEÇA SEU MENTOR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              CONHEÇA SEU <span className="text-yellow-400">MENTOR</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="relative w-full md:w-1/3 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/roberto-navarro-financial-coach.png"
                  alt="Roberto Navarro"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-full border-4 border-yellow-400 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6 w-full md:w-2/3">
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
                  Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência
                  financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão
                  é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de
                  futuro.
                </p>
              </div>
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#inscricao" className="flex items-center">
                  GARANTA SUA VAGA!
                </Link>{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - cards lado a lado */}
      <section id="inscricao" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">GARANTA SEU INGRESSO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GARANTA SEU INGRESSO <span className="text-yellow-400">AGORA MESMO!</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            <Card className="flex-1 border-none shadow-xl overflow-hidden">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-6 text-center rounded-t-xl">
                <h3 className="text-2xl font-bold text-yellow-400">INGRESSO GRATUITO</h3>
              </div>
              <CardContent className="p-8 bg-zinc-900/50 backdrop-blur-sm rounded-b-xl">
                <ul className="space-y-4 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                    <span>Aprenda estratégias para escalar seu negócio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                    <span>Networking com outros empreendedores</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome Completo"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Telefone"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-yellow-400"
                        required
                      />
                    </div>
                    <Button
                      disabled={isSubmitting}
                      className="w-full cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full py-4 text-base"
                    >
                      {isSubmitting ? "Inscrevendo..." : "RESERVE SEU LUGAR!"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 border-none shadow-xl overflow-hidden">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-6 text-center rounded-t-xl">
                <h3 className="text-2xl font-bold text-yellow-400">INGRESSO VIP - R$ 50</h3>
              </div>
              <CardContent className="p-8 bg-zinc-900/50 backdrop-blur-sm rounded-b-xl">
                <ul className="space-y-4 text-zinc-300">
                  {[
                    "Acesso prioritário nas primeiras fileiras",
                    "Material exclusivo do evento para aplicar o aprendizado",
                    "Sessão de perguntas e respostas com Roberto Navarro",
                    "Certificado de participação VIP",
                    "Acesso a conteúdos online",
                    "Gravações de eventos para rever",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome Completo"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Telefone"
                        className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-3 px-6 text-white focus:outline-none focus:border-yellow-400"
                        required
                      />
                    </div>
                    <Button
                      disabled={isSubmitting}
                      className="w-full cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full py-4 text-base"
                    >
                      {isSubmitting ? "Inscrevendo..." : "QUERO ME INSCREVER!"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative">
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
              </Link>
            </Button>
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
              <p className="text-sm text-zinc-400 mb-4">
                Transformando negócios com estratégias escaláveis desde 2015.
              </p>
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
                {["Escalador de Negócios", "Mentoria Financeira", "Estratégias de Vendas", "Liderança"].map(
                  (program) => (
                    <li key={program}>
                      <Link href="#" className="text-sm text-zinc-400 hover:text-yellow-400 transition-colors">
                        {program}
                      </Link>
                    </li>
                  ),
                )}
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
              <p className="text-sm text-zinc-400 mb-2">contato@escaladordenegocios.com.br</p>
              <p className="text-sm text-zinc-400">São Paulo, SP - Brasil</p>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Escalador de Negócios. Todos os direitos reservados.
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
