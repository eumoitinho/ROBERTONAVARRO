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
import { getSiteSettings, getHomePage } from '@/lib/sanity/fetch'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [showEventPopup, setShowEventPopup] = useState(false)
  const [homePageData, setHomePageData] = useState<any>(null)
  const [siteSettings, setSiteSettings] = useState<any>(null)

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
    
    // Fetch Sanity data
    const fetchData = async () => {
      try {
        const [homeData, settingsData] = await Promise.all([
          getHomePage(),
          getSiteSettings()
        ])
        setHomePageData(homeData)
        setSiteSettings(settingsData)
      } catch (error) {
        console.log('Using default content:', error)
      }
    }

    fetchData()

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

  // Use Sanity data or fallback to defaults
  const heroTitle = homePageData?.hero?.headline || "TRANSFORME SUA MENTALIDADE"
  const heroSubtitle = homePageData?.hero?.subheadline || "E CONQUISTE UMA NOVA REALIDADE FINANCEIRA"
  const heroDescription = homePageData?.hero?.description || "Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira."
  const highlightText = homePageData?.hero?.highlightText || "INSTITUTO COACHING FINANCEIRO"
  const achievementsNumber = homePageData?.hero?.achievements?.[0]?.number || "300.000+"
  const achievementsLabel = homePageData?.hero?.achievements?.[0]?.label || "vidas transformadas"

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader/>
      
      {/* Hero Section - Block 1 */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bgsite.jpg"
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
                  <Link href="#formacoes">CONHEÇA NOSSAS FORMAÇÕES</Link>
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
              FORMAÇÕES QUE VÃO  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"> TRANSFORMAR SUA MENTALIDADE</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender
              diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua
              liberdade financeira.
            </p>
          </div>

          {/* LAYOUT ORIGINAL - Grid de formações IDÊNTICO ao backup */}
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs-gap-4 sm:gap-8">
            {/* LCF Mentoring */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">LCF MENTORING</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua
                vida financeira.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                  <Link href="/formacoes/mentoria">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Empreendedor Inteligente */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">EMPREENDEDOR INTELIGENTE</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus
                negócios com segurança.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                  <Link href="/formacoes/empreendedor-inteligente">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Educador Financeiro */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">EDUCADOR FINANCEIRO</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino
                de finanças.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
            <Link href="/formacoes/educador-financeiro">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* LCF Mentoring Pro */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">LCF MENTORING PRO</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução
                pessoal e profissional do Brasil.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                 <Link href="/formacoes/lcf-mentoring-pro">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mentoria de Investimentos */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">MENTORIA DE INVESTIMENTOS</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade
                financeira.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                <Link href="/formacoes/mentoria-de-investimentos">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mentoria Individual */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">MENTORIA INDIVIDUAL</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                 <Link href="/formacoes/mentoria-individual">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Método TF */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">MÉTODO TF</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                 <Link href="/formacoes/metodo-tf">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mentor Coach Financeiro*/}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">MENTOR COACHING FINANCEIRO</h3>
              <p className="text-zinc-300 mb-6 flex-1">
                Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                >
                 <Link href="/formacoes/mentor-coaching-financeiro">
                    SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <QuemSomosSection />

      {/* Transformation Videos Section */}
      <TransformationVideos />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Location Map */}
      <LocationMap />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Event Popup */}
      {showEventPopup && <EventPopup isVisible={showEventPopup} onClose={() => setShowEventPopup(false)} />}
    </div>
  )
}