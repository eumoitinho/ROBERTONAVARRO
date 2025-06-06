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
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import MentorSection from "@/components/mentor"
import { LeadFormData, NewsletterSignup } from "@/components/newsletter-signup"
import NotableParticipants from "@/components/notable-persons"

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

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Mentor", href: "#mentor" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />
      {/* Hero Section */}
      <HeroPages
        title="ESCALADOR DE NEGÓCIOS"
        subtitle="Evento Presencial Exclusivo"
        secondtitle="Empreendedores de sucesso não crescem por acaso"
        description={`Saia da estagnação e aplique, de forma imediata, estratégias reais para escalar vendas, lucros e liberdade.`}
        image="/IMAGES/HERO_ESCALADOR.png"
        ctaText="GARANTA SUA VAGA!"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
      />
      {/* Challenges Section - cards em linha no desktop */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS DO CRESCIMENTO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              SE ESTÁ DIFÍCIL CRESCER, É PORQUE VOCÊ ESTÁ TENTANDO DO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">JEITO ERRADO</span>
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
                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">{challenge.title}</h3>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
             ESTRATÉGIAS PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ESCALAR SEU NEGÓCIO</span>
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
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">{item.title}</h3>
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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
              Um Evento que <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ENTREGA O QUE A MAIORIA SÓ PROMETE</span>
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

      <NotableParticipants />

      <TestimonialsSection />
      {/* Mentor Section - imagem à esquerda, texto à direita */}
      <MentorSection />

      <NewsletterSignup source="Escalador de Negócios" title="FIQUE LIGADO NO PRÓXIMO ESCALADOR DE NEGÓCIOS" description="Receba novidades e dicas exclusivas para escalar seu negócio." onSubmit={() => {
          /* não precisa mais chamar router.push aqui,
             o componente já faz isso */
        }} />


      {/* <section className="py-20 relative">
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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <WhatsAppButton />
          </div>
        </div>
      </section> */}

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        source="Escalador de Negócios"
        className="custom-class"
      />
    </main>
  )
}
