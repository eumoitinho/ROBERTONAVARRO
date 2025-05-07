"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Star, Users, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import LocationMap from "@/components/location-map"

export default function CoachingFinanceiro() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-10 w-auto" />
          <nav className="hidden md:flex space-x-8">
            <Link href="#sobre" className="text-sm hover:text-yellow-400 transition-colors">
              Sobre
            </Link>
            <Link href="#beneficios" className="text-sm hover:text-yellow-400 transition-colors">
              Benefícios
            </Link>
            <Link href="#depoimentos" className="text-sm hover:text-yellow-400 transition-colors">
              Depoimentos
            </Link>
            <Link href="#contato" className="text-sm hover:text-yellow-400 transition-colors">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-sm rounded-full px-6"
            >
              <Link href="#contato">Contato</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-sm rounded-full px-6"
            >
              <Link href="#beneficios">Benefícios</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "#sobre", label: "Sobre" },
                { href: "#beneficios", label: "Benefícios" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#contato", label: "Contato" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/money-image.webp"
            alt="Roberto Navarro"
            fill
            className="object-cover mt-[-20px] opacity-30"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>
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
                <span className="text-sm font-medium">Coaching Financeiro</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Coaching Financeiro
                </span>{" "}
                para uma vida de abundância
              </h1>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Descubra como transformar sua mentalidade e conquistar a liberdade financeira com metodologias
                exclusivas e comprovadas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <Link href="#beneficios">CONHEÇA OS BENEFÍCIOS</Link>
                </Button>

                <Button
                  asChild
                  className="bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="#sobre">
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
                    <span className="text-white font-medium">130.000+</span> vidas transformadas
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { icon: <Users className="h-6 w-6 text-yellow-400" />, value: "130.000+", label: "Alunos" },
              { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "4.9/5", label: "Avaliação" },
              { icon: <Zap className="h-6 w-6 text-yellow-400" />, value: "10+", label: "Anos de experiência" },
              { icon: <Shield className="h-6 w-6 text-yellow-400" />, value: "100%", label: "Satisfação" },
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
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">SOBRE O PROGRAMA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transformando <span className="text-yellow-400">vidas financeiras</span> desde 2015
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              O Coaching Financeiro é um programa completo para quem deseja mudar sua mentalidade, organizar as finanças e conquistar liberdade com segurança e inteligência.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/images/hero-image.webp"
                  alt="Roberto Navarro"
                  width={500}
                  height={440}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Conheça <span className="text-yellow-400">Roberto Navarro</span>
              </h2>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Roberto Navarro é referência nacional em inteligência financeira e criador do Coaching Financeiro no Brasil. Sua missão é transformar a vida financeira de milhões de brasileiros.
                  </p>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Com uma metodologia exclusiva, Roberto já ajudou milhares de pessoas a destravarem suas finanças e atingirem novos patamares de prosperidade.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#beneficios">
                  CONHEÇA OS BENEFÍCIOS <ArrowRight className="ml-2 h-4 w-4" />
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
              O que você vai conquistar com o <span className="text-yellow-400">Coaching Financeiro</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Mentalidade de riqueza, estratégias práticas, liberdade financeira, gestão emocional e muito mais.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Mentalidade de Riqueza",
                description: "Aprenda a pensar como os ricos e transforme sua relação com o dinheiro para sempre.",
              },
              {
                title: "Estratégias Práticas",
                description:
                  "Técnicas comprovadas para aumentar sua renda e construir patrimônio de forma consistente.",
              },
              {
                title: "Liberdade Financeira",
                description:
                  "Desenvolva um plano personalizado para conquistar a independência financeira em menos tempo.",
              },
              {
                title: "Gestão Emocional",
                description: "Supere os bloqueios emocionais que impedem seu crescimento financeiro.",
              },
              {
                title: "Networking Estratégico",
                description: "Conecte-se com pessoas que compartilham seus objetivos e podem impulsionar sua carreira.",
              },
              {
                title: "Plano de Ação",
                description: "Saia com um roteiro claro e prático para implementar imediatamente em sua vida.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DEPOIMENTOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos <span className="text-yellow-400">alunos dizem</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Conheça as histórias de transformação de pessoas que passaram pelo Coaching Financeiro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Roberto Almeida",
                role: "Empresário",
                image: "/images/man-smiling.webp",
                testimonial:
                  "Em apenas 6 meses, consegui triplicar meu faturamento e eliminar todas as minhas dívidas. A mudança de mentalidade foi transformadora.",
              },
              {
                name: "Juliana Costa",
                role: "Profissional Liberal",
                image: "/images/woman-working.webp",
                testimonial:
                  "Depois de anos trabalhando 12 horas por dia, hoje tenho mais tempo livre e ganho o dobro. O método realmente funciona!",
              },
              {
                name: "Fernando Mendes",
                role: "Investidor",
                image: "/images/working-man.webp",
                testimonial:
                  "Aprendi estratégias que nenhum curso tradicional de finanças ensina. Meu patrimônio cresceu 70% no último ano.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-300">{testimonial.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONTATO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Entre em <span className="text-yellow-400">contato</span> conosco
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Estamos à disposição para ajudar você a transformar sua vida financeira. Entre em contato conosco e comece
              sua jornada rumo à liberdade financeira.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Informações de Contato</h3>
              <div className="space-y-4">
                <p className="text-zinc-300">
                  <strong>Email:</strong> contato@robertonavarrooficial.com.br
                </p>
                <p className="text-zinc-300">
                  <strong>Telefone:</strong> (11) 99999-9999
                </p>
                <p className="text-zinc-300">
                  <strong>Endereço:</strong> Alameda Araguaia 751, Alphaville – SP
                </p>
              </div>
              <div className="mt-8">
                <h4 className="font-bold mb-4">Localização</h4>
                <div className="rounded-xl overflow-hidden">
                  <LocationMap />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Envie uma Mensagem</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
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
                {["Despertar Milionário", "Coaching Financeiro", "Mentoria LCF", "Segredos da Mente Milionária"].map(
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