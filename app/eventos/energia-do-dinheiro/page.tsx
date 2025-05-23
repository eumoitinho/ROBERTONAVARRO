"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Star, Users, Zap, Brain, Target, Wallet, GraduationCap, Play, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NotableParticipants from "@/components/notable-persons"
import TransformationVideos from "@/components/transformation-videos"
import { NewsletterSignup } from "@/components/newsletter-signup"
import MentorSection from "@/components/mentor"
import { SectionBadge } from "@/components/section-badge"

export default function EnergiaDodinheiroPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const videoModalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Adicionar estilos para efeitos de hover
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
      
      /* Padrão de ruído para o background */
      .noise-bg {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        background-blend-mode: overlay;
        background-size: 200px;
        opacity: 0.015;
      }
    `
    document.head.appendChild(style)
    
    // Adicionar event listener para a tecla ESC para fechar o vídeo
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideoId(null)
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])
  
  // Controlar o scroll quando o modal de vídeo está aberto
  useEffect(() => {
    if (activeVideoId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideoId])
  
  // Fechar o vídeo quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (videoModalRef.current && !videoModalRef.current.contains(event.target as Node)) {
        setActiveVideoId(null)
      }
    }
    
    if (activeVideoId) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeVideoId])

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

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Como Funciona", href: "#como-funciona" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscreva-se", href: "#inscricao", isButton: true }
  ]
  
  const transformationVideos = [
    {
      id: "4aYDKJQBnRw",
      title: "Como superei minhas dívidas em 6 meses",
      person: "Carlos Silva",
      description: "Carlos compartilha como saiu de um ciclo de dívidas para uma vida financeira equilibrada.",
      thumbnail: "/images/video-thumb-1.png"
    },
    {
      id: "yTELcwYTsnU",
      title: "Minha jornada para a liberdade financeira",
      person: "Ana Oliveira",
      description: "Ana conta como transformou sua mentalidade sobre dinheiro e alcançou a independência.",
      thumbnail: "/images/video-thumb-2.png"
    },
    {
      id: "W6rBTJKeJ4w",
      title: "Do zero ao primeiro milhão",
      person: "Roberto Mendes",
      description: "Roberto revela as estratégias que o levaram a conquistar seu primeiro milhão.",
      thumbnail: "/images/video-thumb-3.png"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Como multipliquei meu patrimônio",
      person: "Juliana Costa",
      description: "Juliana explica como conseguiu multiplicar seu patrimônio em apenas 2 anos.",
      thumbnail: "/images/video-thumb-4.png"
    },
    {
      id: "xvFZjo5PgG0",
      title: "Transformando conhecimento em renda",
      person: "Marcos Pereira",
      description: "Marcos mostra como transformou seu conhecimento em múltiplas fontes de renda.",
      thumbnail: "/images/video-thumb-5.png"
    }
  ]

  return (
     <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      {/* Padrão de ruído para o background */}
      <div className="fixed inset-0 noise-bg pointer-events-none"></div>
      
      {/* Elementos decorativos */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: "1s" }}></div>
      
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

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
            <SectionBadge text="QUAIS BLOQUEIOS TE AFASTAM DA RIQUEZA" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">
  Descubra os sabotadores invisíveis que drenam sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">energia financeira</span>
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
                className="bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    <section id="como-funciona" className="py-12 xs:py-12 sm:py-16 md:py-20 relative">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HERO_EMPREENDEDOR.png"
          alt="Roberto Navarro"
          fill
          className="hidden sm:block object-cover w-full h-full"
          style={{
            objectPosition: "center right", // Posição padrão para telas maiores
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <Image
          src="/images/HERO_EDUCADOR_MOBILE.png"
          alt="Roberto Navarro"
          fill
          className="block sm:hidden object-cover w-full h-full"
          style={{
            objectPosition: "center right", // Posição padrão para telas menores
          }}
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r"
          style={{
            background: "linear-gradient(to right, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.6) 60%, transparent)",
          }}
        ></div>
      </div>
      <SectionBadge text="DESPERTAR DE CONSCIÊNCIA" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase">
              Mais do que uma mentoria, um <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">despertar de consciência</span>
            </h2>
            <p className="text-zinc-300 mb-6 font-medium">
              Durante 2 dias transformadores, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade.
            </p>
            <div className="block sm:hidden md:block bg-zinc-900/50 rounded-lg p-4 mt-6">
            <ul className="space-y-4 text-zinc-300">
              {[
                "Qual o efeito do dinheiro em sua vida.",
                "Como o seu estado emocional impacta diretamente sua conta bancária.",
                "Quem está influenciando sua visão sobre dinheiro — e como retomar o controle.",
                "O papel da ambiência e da atmosfera na construção da riqueza.",
                "Como identificar e eliminar sabotadores financeiros.",
                "A conexão poderosa (e oculta) entre energia sexual e prosperidade.",
                "O protocolo da riqueza nos negócios e na vida pessoal.",
                "A verdade sobre o 'dinheirinho' e por que ele pode te manter preso na escassez.",
                "Como criar a motivação certa para que o dinheiro venha até você.",
              ].map((item, index) => (
                
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2 text-xl">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
</div>
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
      <TransformationVideos />
      {/* Modal de vídeo */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
          <div ref={videoModalRef} className="relative w-full max-w-4xl z-[9999]">
            <div className="bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-zinc-400 text-sm">
                  Assista a história completa de transformação
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveVideoId(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                >
                  Fechar Vídeo
                </Button>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setActiveVideoId(null)}
              aria-label="Fechar vídeo"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Fechar vídeo</span>
            </Button>
          </div>
        </div>
      )}

      <NotableParticipants />

      <TestimonialsSection/>
      
     {/* Mentor Section */}
<MentorSection />

      <NewsletterSignup title="SAIBA QUANDO HAVERÁ A ENERGIA DO DINHEIRO" description="Inscreva-se para receber dicas e conteúdos exclusivos sobre finanças pessoais e investimentos." />

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
