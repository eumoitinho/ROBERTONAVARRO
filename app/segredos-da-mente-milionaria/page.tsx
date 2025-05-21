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
  Clock,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import TestimonialsSection from "@/components/testimonials-section"

export default function SegredosDaMenteMilionaria() {
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
          eventId: 6,
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
            <Link href="#o-que-aprender" className="text-sm hover:text-yellow-400 transition-colors">
              O Que Aprender
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
                { href: "#o-que-aprender", label: "O Que Aprender" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#inscricao", label: "Inscrição" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroPages
        title="SEGREDOS DA MENTE MILIONÁRIA"
        subtitle="Imersão exclusiva e transformadora"
        secondtitle="A liberdade financeira começa com uma mudança de mentalidade"
        description="Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Alameda Araguaia, Alphaville - SP"
        image="/images/HERO_SEGREDOS.png"
        ctaText="QUERO DESPERTAR MINHA MENTE MILIONÁRIA"
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
              <span className="text-sm font-medium">BENEFÍCIOS DO EVENTO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que participar do <span className="text-yellow-400">Segredos da Mente Milionária</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Segurança financeira",
                description: "Descubra como criar uma base sólida, com reserva de emergência e planejamento para o futuro.",
              },
              {
                icon: <Target className="h-8 w-8 text-yellow-400" />,
                title: "Propósito de vida",
                description: "Tenha clareza sobre seu propósito de vida e carreira e abra portas para novas oportunidades.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Liberdade financeira",
                description: "Aprenda a diferença entre sobreviver e viver com liberdade — sem depender de salário ou trabalho ativo.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Mentalidade milionária",
                description: "Supere crenças limitantes sobre dinheiro e adote os hábitos, atitudes e estratégias dos que alcançaram a verdadeira riqueza.",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-yellow-400" />,
                title: "Educação financeira",
                description: "Por que aprender com quem já chegou lá pode acelerar (e muito!) sua jornada.",
              },
              {
                icon: <Users className="h-8 w-8 text-yellow-400" />,
                title: "Networking e inspiração",
                description: "Conecte-se com pessoas que já transformaram suas vidas e inspire-se com histórias reais.",
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

      {/* O Que Você Vai Aprender Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI DESCOBRIR</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O passo a passo para <span className="text-yellow-400">despertar sua mente milionária</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-yellow-400" />,
                title: "Múltiplas fontes de renda",
                description: "Entenda como combinar renda principal, extra e passiva para construir sua riqueza de forma estratégica.",
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Ação e prosperidade",
                description: "Como agir com intenção, propósito claro e prosperidade abundante.",
              },
              {
                icon: <Brain className="h-8 w-8 text-yellow-400" />,
                title: "Transformação mental",
                description: "Supere crenças limitantes e construa uma mentalidade de riqueza.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.description}</p>
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
              <span className="text-sm font-medium">DEPOIMENTOS DE ALUNOS</span>
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
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                </div>
                <p className="font-bold text-yellow-400">{testimonial.name}</p>
                <p className="text-sm text-zinc-400">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />
      {/* Inscrição Section */}
      <section id="inscricao" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">
              Garanta sua vaga na Imersão Segredos da Mente Milionária
            </h2>
            <p className="text-lg mb-4 text-zinc-300">Evento gratuito - Vagas limitadas</p>
            <p className="text-md mb-8 text-zinc-300">
              Preencha o formulário abaixo para participar.
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
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 text-base"
                >
                  {isSubmitting ? "Enviando..." : "Inscreva-se Agora!"}
                </Button>
              </div>
            </form>
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
      <WhatsAppButton />
    </div>
  )
}