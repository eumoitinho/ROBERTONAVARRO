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
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { SiteHeader } from "@/components/header"

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
const navigationItems = [
  { title: "Início", href: "/" },
  { title: "Benefícios", href: "#beneficios" },
  { title: "O Que Aprender", href: "#o-que-aprender" },
  { title: "Depoimentos", href: "#depoimentos" },
  { title: "Inscrição", href: "#inscricao", isButton: true },
];
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
<SiteHeader
  navigationItems={navigationItems}
  showInicio={true}
/>



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

         {/* Newsletter Section */}
      <section id="inscricao" className="py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <NewsletterSignup
            variant="hero"
            title="Fique por dentro dos próximos eventos"
            description="Cadastre-se para receber em primeira mão informações sobre novos eventos e conteúdos exclusivos."
          />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
