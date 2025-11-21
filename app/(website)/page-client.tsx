"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, ChevronDown, Star, Users, BookOpen, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import LocationMap from "@/components/location-map"
import { TestimonialsSection } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { useClickOutside } from "@/hooks/use-click-outside"
import { SiteHeader } from "@/components/header"
import QuemSomosSection from "@/components/mentor"
import { SectionBadge } from "@/components/section-badge"
import TransformationVideos from "@/components/transformation-videos"
import EventPopup from "@/components/event-popup"

interface HomePageProps {
  formationsItems?: Array<{
    title: string
    description: string
    link: string
  }>
}

export default function HomePage({ formationsItems: propsFormationsItems }: HomePageProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [showEventPopup, setShowEventPopup] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => {
    if (openSubmenu) setOpenSubmenu(null)
  })

  const toggleSubmenu = (menu: string) => {
    if (openSubmenu === menu) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(menu)
    }
  }

  useEffect(() => {
    setIsVisible(true)
    // Using static data - no CMS needed

    // Add keyframe animation for hover effects - IDÊNTICO AO ORIGINAL
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

    // Show event popup after 3 seconds
    const popupTimer = setTimeout(() => {
      setShowEventPopup(true)
    }, 3000)

    return () => clearTimeout(popupTimer)
  }, [])

  // Static data - no Strapi
  const heroTitle = "TRANSFORME SUA MENTALIDADE"
  const heroSubtitle = "E CONQUISTE UMA NOVA REALIDADE FINANCEIRA"
  const heroDescription = "Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira."
  const highlightText = "INSTITUTO COACHING FINANCEIRO"
  const achievementsNumber = "300.000+"
  const achievementsLabel = "vidas transformadas"
  const heroBackgroundImage = "/images/bgsite.jpg"
  const heroCtaText = "CONHEÇA NOSSAS FORMAÇÕES"
  const heroCtaLink = "#formacoes"
  
  // Formações data - Usar dados do Payload se fornecidos, senão usar fallback
  const formationsTitle = "FORMAÇÕES QUE VÃO TRANSFORMAR SUA MENTALIDADE"
  const formationsDescription = "Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira."
  
  // Usar formações do Payload se fornecidas, senão usar fallback
  const formationsItems = propsFormationsItems || [
    {
      title: "LCF MENTORING",
      description: "Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.",
      link: "/formacoes/mentoria"
    },
    {
      title: "EMPREENDEDOR INTELIGENTE",
      description: "Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.",
      link: "/formacoes/empreendedor-inteligente"
    },
    {
      title: "EDUCADOR FINANCEIRO",
      description: "Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.",
      link: "/formacoes/educador-financeiro"
    },
    {
      title: "LCF MENTORING PRO",
      description: "Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.",
      link: "/formacoes/lcf-mentoring-pro"
    },
    {
      title: "MENTORIA DE INVESTIMENTOS",
      description: "Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.",
      link: "/formacoes/mentoria-de-investimentos"
    },
    {
      title: "MENTORIA INDIVIDUAL",
      description: "Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.",
      link: "/formacoes/mentoria-individual"
    },
    {
      title: "MÉTODO TF",
      description: "Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.",
      link: "/formacoes/metodo-tf"
    },
    {
      title: "MENTOR COACHING FINANCEIRO",
      description: "Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.",
      link: "/formacoes/mentor-coaching-financeiro"
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader/>
      
      {/* Hero Section - Block 1 */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackgroundImage}
            alt="Roberto Navarro"
            fill
            className="object-cover mt-24"
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
          <div className="grid md:grid-cols-2 gap-6 xs-gap-4 sm:gap-8 lg:gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">{highlightText}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  {heroTitle}
                </span>{" "}
                {heroSubtitle}
              </h1>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                {heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <Link href={heroCtaLink}>{heroCtaText}</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-medium">{achievementsNumber}</span> {achievementsLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease both;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-up {
          animation: slide-up 1s 0.2s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8);}
          60% { opacity: 1; transform: scale(1.1);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-bounce-in {
          animation: bounce-in 1s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>

      {/* Formações Section - Block 3 */}
      <section id="formacoes" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">NOSSAS FORMAÇÕES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {formationsTitle.split('TRANSFORMAR SUA MENTALIDADE').length > 1 ? (
                <>
                  {formationsTitle.split('TRANSFORMAR SUA MENTALIDADE')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"> TRANSFORMAR SUA MENTALIDADE</span>
                </>
              ) : (
                formationsTitle
              )}
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              {formationsDescription}
            </p>
          </div>

          {/* LAYOUT ORIGINAL - Grid de formações com dados do Strapi */}
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs-gap-4 sm:gap-8">
            {formationsItems.map((formation, index) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
                <h3 className={`text-xl font-bold mb-3 ${index === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600' : 'text-yellow-400'}`}>
                  {formation.title}
                </h3>
                <p className="text-zinc-300 mb-6 flex-1">
                  {formation.description}
                </p>
                <div className="mt-auto">
                  <Button
                    asChild
                    className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                  >
                    <Link href={formation.link || '#'}>
                      SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <QuemSomosSection />

      {/* Eventos Section - Block 4 */}
      <section id="eventos" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">EVENTOS PRESENCIAIS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              EVENTOS PRESENCIAIS QUE GERAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"> MUDANÇAS REAIS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Nossos eventos são imersões poderosas criadas para desbloquear crenças, despertar seu potencial e colocar
              você no caminho da liberdade e abundância.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs-gap-4 sm:gap-8">
            {/* Crenças da Riqueza */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">CRENÇAS DA RIQUEZA</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Supere bloqueios mentais e eleve seu padrão financeiro e pessoal.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                  <Link href="/eventos/crencas-da-riqueza">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Segredos da Mente Milionária */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">SEGREDOS DA MENTE MILIONÁRIA</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Descubra os princípios fundamentais que separam os ricos dos pobres e transforme sua vida financeira.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                  <Link href="/eventos/segredos-da-mente-milionaria">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Escalador de Negócios */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">ESCALADOR DE NEGÓCIOS</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Aplique estratégias para escalar vendas, lucros e conquistar liberdade empresarial.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                  <Link href="/eventos/escalador-de-negocios">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Energia do Dinheiro */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">ENERGIA DO DINHEIRO</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Descubra como alinhar sua energia com a frequência da prosperidade.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                  <Link href="/eventos/energia-do-dinheiro">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Livros Section - Block 5 */}
      <section id="livros" className="py-12 xs-py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 xs-gap-4 sm:gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/images/LIVRO_MOCKUP.png"
                    alt="Livros de Roberto Navarro"
                    fill
                    className="object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-sm font-medium text-yellow-300">LIVROS</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  LIVROS PARA QUEM QUER
                </span>{" "}
                PROSPERAR DE VERDADE
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-zinc-300">
                  Conheça os best-sellers de Roberto Navarro, que já impactaram milhares de leitores com estratégias
                  práticas e transformadoras.
                </p>
                <p className="text-zinc-300">
                  Cada página traz ensinamentos que moldaram a jornada de um multimilionário, agora disponíveis para
                  você.
                </p>
              </div>

              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
              >
                <Link href="/livros">
                  COMPRE SEU LIVRO AGORA! <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Videos Section */}
      <TransformationVideos />

      {/* Treinamentos Section - Block 6 */}
      <section id="treinamentos" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">TREINAMENTOS DIGITAIS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
             APRENDA NO SEU TEMPO COM NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">TREINAMENTOS DIGITAIS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Conheça nossos cursos gravados e descubra como eliminar dívidas, organizar sua vida financeira e construir
              seu primeiro milhão com estratégia e propósito.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-lg"
            >
              <Link href="#">
                ADQUIRA SEU TREINAMENTO! <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contato Section - Block 8 */}
      <section id="contato" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONTATO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ENTRE EM <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"> CONTATO</span> CONOSCO
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Estamos à disposição para ajudar você a transformar sua vida financeira. Entre em contato conosco e comece
              sua jornada rumo à liberdade financeira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs-gap-6 sm:gap-12 max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 xs-p-4 sm:p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-xl xs-text-lg sm:text-2xl font-bold mb-4 xs-mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                INFORMAÇÕES DE CONTATO
              </h3>
              <div className="space-y-3 xs-gap-3 sm:space-y-4">
                <p className="text-sm xs-text-sm sm:text-base text-zinc-300">
                  <strong>Email:</strong> contato@robertonavarrooficial.com.br
                </p>
                <p className="text-sm xs-text-sm sm:text-base text-zinc-300">
                  <strong>Telefone:</strong> (12) 99765-9057
                </p>
                <p className="text-sm xs-text-sm sm:text-base text-zinc-300">
                  <strong>Endereço:</strong> Alameda Araguaia 751, Alphaville – SP
                </p>
              </div>
              <div className="mt-6 xs-mt-6 sm:mt-8">
                <h4 className="font-bold mb-3 xs-mb-3 sm:mb-4 text-base xs-text-base sm:text-lg">Localização</h4>
                <div className="rounded-xl overflow-hidden">
                  <LocationMap />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 xs-p-4 sm:p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-xl xs-text-lg sm:text-2xl font-bold mb-4 xs-mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                ENVIE UMA MENSAGEM
              </h3>
              <form className="space-y-4 xs-gap-3 sm:space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  ></textarea>
                </div>
                <Button className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3">
                  ENVIAR MENSAGEM
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Event Popup */}
      <EventPopup 
        isVisible={showEventPopup}
        onClose={() => setShowEventPopup(false)}
      />
    </div>
  )
}