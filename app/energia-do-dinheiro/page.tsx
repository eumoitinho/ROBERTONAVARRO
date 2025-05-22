"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
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

export default function EnergiaDodinheiroPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          eventId: 10,
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
      window.location.href = `/inscricao/confirmacao?ticket=${data.ticketCode}`
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

      {/* Hero Section */}
      <HeroPages
        title="ENERGIA DO DINHEIRO"
        subtitle="Desbloqueie a energia do dinheiro e transforme sua realidade"
        secondtitle="Dois dias intensos de transformação para mudar sua relação com o dinheiro"
        description="Alinhe sua energia com a prosperidade e conquiste abundância real na vida e nos negócios. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade."
        image="/images/HERO_ENERGIA.png"
        ctaText="GARANTA SUA VAGA!"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
      />

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">QUAIS BLOQUEIOS TE AFASTAM DA RIQUEZA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Descubra os sabotadores invisíveis que drenam sua <span className="text-yellow-400">energia financeira</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Você trabalha muito, mas nunca sobra dinheiro?",
                description: "Aprenda como sair do ciclo de escassez ativando a verdadeira energia da abundância.",
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                title: "Você sente que nasceu para prosperar, mas algo te trava?",
                description: "Descubra os sabotadores invisíveis que drenam sua energia financeira e como se libertar deles.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Você sente culpa ou medo ao falar de dinheiro?",
                description: "Reprograme sua relação emocional com o dinheiro e viva a leveza da prosperidade.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Você acredita que ganhar dinheiro exige sacrifício?",
                description: "Entenda como alinhar prazer e propósito para que o dinheiro flua com naturalidade.",
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
      <section id="como-funciona" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/energia-do-dinheiro.webp"
                  alt="Como funciona o evento"
                  width={500}
                  height={440}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Mais do que uma mentoria, um <span className="text-yellow-400">despertar de consciência</span>
              </h2>
              <p className="text-zinc-300 mb-6">
                Durante 2 dias transformadores, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade.
              </p>
              <ul className="space-y-4 text-zinc-300">
                {[
                  "Qual o efeito do dinheiro em sua vida.",
                  "Como o seu estado emocional impacta diretamente sua conta bancária.",
                  "Quem está influenciando sua visão sobre dinheiro — e como retomar o controle.",
                  "O papel da ambiência e da atmosfera na construção da riqueza.",
                  "Como identificar e eliminar sabotadores financeiros.",
                  "A conexão poderosa (e oculta) entre energia sexual e prosperidade.",
                  "O protocolo da riqueza nos negócios e na vida pessoal.",
                  "A verdade sobre o “dinheirinho” e por que ele pode te manter preso na escassez.",
                  "Como criar a motivação certa para que o dinheiro venha até você.",
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
                  GARANTA SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">TRANSFORMAÇÕES QUE FALAM POR SI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quem já transformou sua vida com a <span className="text-yellow-400">Imersão</span>
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
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Transformações que Falam por Si</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "https://www.youtube.com/shorts/4aYDKJQBnRw",
                "https://www.youtube.com/shorts/yTELcwYTsnU",
                "https://www.youtube.com/shorts/W6rBTJKeJ4w",
              ].map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  Vídeo {index + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

<TestimonialsSection/>
      {/* Mentor Section */}
      <section id="mentor" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/roberto-navarro.webp"
                  alt="Roberto Navarro"
                  width={500}
                  height={440}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Conheça seu mentor: <span className="text-yellow-400">Roberto Navarro</span>
              </h2>
              <p className="text-zinc-300 mb-4">
                De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.
              </p>
              <p className="text-zinc-300 mb-4">
                Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua família.
              </p>
              <p className="text-zinc-300 mb-4">
                Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.
              </p>
              <p className="text-zinc-300 mb-6">
                Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.
              </p>
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#inscricao">
                  GARANTA SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inscrição Section */}
      <section id="inscricao" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
              Você está a um passo de mudar sua relação com o dinheiro
            </h2>
            <p className="text-lg mb-4 text-zinc-300">Evento presencial - Vagas limitadas</p>
            <p className="text-md mb-8 text-zinc-300">
              Inscreva-se e comece agora sua jornada rumo à abundância.
            </p>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Erro:</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-zinc-700 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 bg-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-zinc-700 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 bg-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full rounded-md border-zinc-700 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 bg-zinc-800 text-white"
                  required
                />
              </div>
              <div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base"
                >
                  {isSubmitting ? "Enviando..." : "ESTOU PRONTO PARA PROSPERAR!"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
<Footer />
      <WhatsAppButton />
    </div>
  )
}
