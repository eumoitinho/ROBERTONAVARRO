"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, ChevronRight, Star, Users, Zap, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"

export default function DespertarMilionarioPage() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode implementar a lógica de envio do formulário
    alert(`Cadastro realizado com sucesso: ${email}`)
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
            <Link href="#como-funciona" className="text-sm hover:text-yellow-400 transition-colors">
              Como Funciona
            </Link>
            <Link href="#beneficios" className="text-sm hover:text-yellow-400 transition-colors">
              Benefícios
            </Link>
            <Link href="#sobre" className="text-sm hover:text-yellow-400 transition-colors">
              Sobre Roberto
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-sm rounded-full px-6"
            >
              <Link href="#cadastro">Entrar</Link>
            </Button>
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-sm rounded-full px-6"
            >
              <Link href="#cadastro">Inscreva-se</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "/", label: "Início" },
                { href: "#como-funciona", label: "Como Funciona" },
                { href: "#beneficios", label: "Benefícios" },
                { href: "#sobre", label: "Sobre Roberto" },
                { href: "#cadastro", label: "Cadastro" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

        {/* Animated background elements */}
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
                <span className="text-sm font-medium">Método exclusivo e comprovado</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                O método perfeito para{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  sair da inércia e alcançar 10 mil reais
                </span>
              </h1>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Uma semana inteira com um plano para que você conquiste a verdadeira prosperidade em sua vida e alcance
                a liberdade financeira que sempre sonhou!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <Link href="#cadastro">QUERO MUDAR MINHA SITUAÇÃO FINANCEIRA</Link>
                </Button>

                <Button
                  asChild
                  className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="#como-funciona">
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
                    <span className="text-white font-medium">130.000+</span> pessoas transformadas
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg_image_580-lY0cc5sPHGEH1UPsZMDhegCDaavXT9.webp"
                  alt="Roberto Navarro"
                  width={500}
                  height={600}
                  className="w-full h-auto object-contain hover-glow"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { icon: <Users className="h-6 w-6 text-yellow-400" />, value: "130.000+", label: "Alunos" },
              { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "4.9/5", label: "Avaliação" },
              { icon: <Zap className="h-6 w-6 text-yellow-400" />, value: "7 dias", label: "Transformação" },
              { icon: <TrendingUp className="h-6 w-6 text-yellow-400" />, value: "R$ 10.000", label: "Meta inicial" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
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
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">COMO FUNCIONA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Entenda como o <span className="text-yellow-400">Despertar Milionário</span> pode transformar sua
              realidade financeira
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Um método exclusivo que já transformou a vida de mais de 130.000 pessoas em todo o Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/mindset.webp"
                  alt="Roberto Navarro"
                  width={500}
                  height={440}
                  className="w-full h-auto object-contain hover-glow"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Descubra o caminho para a <span className="text-yellow-400">liberdade financeira</span>
              </h2>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                  <p className="text-zinc-300">
                    Você já se perguntou por que algumas pessoas parecem sempre prosperar financeiramente, enquanto
                    outras lutam para sair do ciclo de dívidas e dificuldades? A resposta está em entender sua situação
                    atual, quebrar padrões limitantes e adotar uma nova mentalidade de sucesso.
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                  <p className="text-zinc-300">
                    Se você está cansado de viver uma vida financeiramente estagnada, se sentindo preso em um ciclo de
                    escassez, nós temos a solução que você precisa!
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                  <p className="text-zinc-300">
                    Nessa jornada, usarei minhas habilidades para ensinar você a realizar uma avaliação abrangente da
                    sua situação atual e de como você vai mudar ela! Vamos identificar os obstáculos que estão segurando
                    você, descobrir suas forças ocultas e criar um plano de ação personalizado para que você possa sair
                    dessa situação e juntar os seus primeiros <strong className="text-yellow-400">10 MIL REAIS!</strong>
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">
                  QUERO COMEÇAR AGORA <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Saiba os benefícios que você <span className="text-yellow-400">está prestes a ganhar!</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Transforme sua vida financeira com nosso método exclusivo e comprovado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    number: "01",
                    title: "Retome o Controle Financeiro",
                    description: "Receba um plano personalizado que direcionará você para a liberdade financeira.",
                  },
                  {
                    number: "02",
                    title: "Estratégias Comprovadas para 10 MIL REAIS",
                    description: "Aprenda técnicas efetivas para atingir essa meta rapidamente.",
                  },
                  {
                    number: "03",
                    title: "Conteúdo exclusivo e personalizado",
                    description:
                      "Feito para mudar a vida de milhões de brasileiros e você vai me ajudar nisso! Conte com meu suporte em ajudar você em prol dessa missão.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black font-bold text-xl">
                      {benefit.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                      <p className="text-zinc-300">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">
                  QUERO ESSES BENEFÍCIOS <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg_image_92-DqpsNjxnYKXnQAYYF7lmHXPZ7acjBo.webp"
                  alt="Roberto Navarro"
                  width={500}
                  height={220}
                  className="w-full h-auto object-contain hover-glow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Identificação Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PARA QUEM É</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Você se identifica com alguma <span className="text-yellow-400">dessas situações?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Está enfrentando dívidas e não sabe por onde começar para se livrar delas?",
              "Gasta tudo o que ganha e sente que está preso em um ciclo de falta de dinheiro?",
              "Deseja sair da situação financeira em que se encontra e alcançar seus primeiros R$ 10.000,00?",
            ].map((situation, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-black" />
                </div>
                <p className="text-lg">{situation}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-xl mb-6">
              Se você respondeu <span className="text-yellow-400 font-bold">"SIM"</span> para qualquer uma dessas
              perguntas, então esta jornada é especialmente para você!
            </p>
            <p className="text-lg mb-8">
              Aqui, entendemos as dificuldades que você enfrenta e estamos prontos para ajudá-lo a{" "}
              <span className="text-yellow-400 font-bold">
                transformar sua situação financeira de uma vez por todas.
              </span>
            </p>
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#cadastro">QUERO MUDAR MINHA SITUAÇÃO FINANCEIRA</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre Roberto Section */}
      <section id="sobre" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONHEÇA O MENTOR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Roberto Navarro</h2>
          </div>

          <div className="bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/30 rounded-3xl p-8 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-2xl blur-xl -z-10"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg_image_580-lY0cc5sPHGEH1UPsZMDhegCDaavXT9.webp"
                    alt="Roberto Navarro"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover rounded-2xl border border-zinc-700/50"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
                    <p className="text-lg font-bold">Roberto Navarro</p>
                    <p className="text-sm text-yellow-400">Coach Financeiro</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-4">
                <p className="text-zinc-300">
                  Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente,
                  trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que
                  enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.
                </p>
                <p className="text-zinc-300">
                  A virada em sua vida veio quando Roberto percebeu que havia um "vilão invisível" bloqueando sua
                  prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa
                  adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.
                </p>
                <p className="text-zinc-300">
                  Com seu conhecimento adquirido, Roberto Navarro já ajudou mais de 130.000 pessoas a enriquecerem em
                  todo o Brasil e no mundo. Sua metodologia exclusiva combina estratégias financeiras, inteligência
                  emocional e princípios bíblicos, proporcionando resultados transformadores para seus alunos.
                </p>
                <p className="text-zinc-300">
                  Ao longo de sua carreira, Roberto acumulou uma vasta experiência em diferentes áreas, desde o universo
                  dos negócios até a escrita de best-sellers. Ele é reconhecido como o criador do{" "}
                  <strong className="text-yellow-400">COACH FINANCEIRO</strong> no Brasil e especialista em inteligência
                  financeira, espiritual e emocional.
                </p>

                <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "130k+", label: "Alunos" },
                    { value: "7 anos", label: "Experiência" },
                    { value: "10M", label: "Meta de impacto" },
                    { value: "4.9/5", label: "Avaliação" },
                  ].map((stat, index) => (
                    <div key={index} className="bg-zinc-800/50 rounded-xl p-4 text-center">
                      <p className="text-xl font-bold text-yellow-400">{stat.value}</p>
                      <p className="text-sm text-zinc-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cadastro Section */}
      <section id="cadastro" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">Última chance</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Essa é sua última chance... <span className="text-yellow-400">Aproveite!</span>
              </h2>

              <p className="text-lg text-zinc-300 mb-6">
                Você está tendo sua última chance de <strong>transformar completamente a sua vida</strong> financeira de
                uma vez por todas, dando início à <strong>Prosperidade</strong>!
              </p>

              <div className="space-y-6 mb-8">
                {[
                  "Plano personalizado para sua liberdade financeira",
                  "Estratégias comprovadas para alcançar seus primeiros R$ 10.000",
                  "Suporte completo durante toda a jornada",
                  "Garantia de 7 dias para testar sem riscos",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-black" />
                    </div>
                    <p className="text-zinc-300">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 p-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl mb-8">
                <Shield className="h-10 w-10 text-yellow-400" />
                <div>
                  <p className="font-medium">Você não corre riscos!</p>
                  <p className="text-sm text-zinc-400">
                    Você tem 7 dias para testar nossa comunidade e caso não goste, só desistir.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>

                <h3 className="text-2xl font-bold mb-6 text-center">Faça seu cadastro</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">
                      Insira seu melhor e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 text-white"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base"
                  >
                    FAZER MEU CADASTRO
                  </Button>

                  <p className="text-xs text-center text-zinc-400">
                    Ao se cadastrar, você concorda com nossos{" "}
                    <Link href="#" className="text-yellow-400 hover:underline">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="#" className="text-yellow-400 hover:underline">
                      Política de Privacidade
                    </Link>
                    .
                  </p>
                </form>

                <div className="mt-8 pt-8 border-t border-zinc-800/50">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-center text-sm text-zinc-300 italic">
                    "O Despertar Milionário mudou completamente minha vida financeira. Em apenas 3 meses consegui juntar
                    meus primeiros R$ 10.000 e agora estou no caminho para a verdadeira liberdade financeira!"
                  </p>
                  <div className="flex items-center justify-center mt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-black font-bold text-xs">
                      MP
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Marcos Paulo</p>
                      <p className="text-xs text-zinc-400">São Paulo, SP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-zinc-400 text-sm uppercase tracking-wider">COMO VISTO EM</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              "/images/logo-exame.webp",
              "/images/logo-1.png",
              "/images/logo-o-fluminense.webp",
              "/images/commercio.png",
            ].map((logo, index) => (
              <div
                key={index}
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Logo parceiro"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <Logo className="h-10 w-auto mb-4" />
              <p className="text-sm text-zinc-400 mb-4">Transformando vidas financeiras em todo o Brasil desde 2015.</p>
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
                {["Despertar Milionário", "Coaching Financeiro", "Mentoria LCF", "Palestras"].map((program) => (
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
              <p className="text-sm text-zinc-400 mb-2">contato@robertonavarrooficial.com.br</p>
              <p className="text-sm text-zinc-400">São Paulo, SP - Brasil</p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Roberto Navarro Oficial. Todos os direitos reservados.
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
