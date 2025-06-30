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

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      {/* <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-2 xs-px-2 sm:px-4 py-3 xs-py-2 sm:py-4 flex justify-between items-center">
          <Logo className="h-8 xs:h-7 sm:h-10 w-auto" />
          <nav className="hidden md:flex space-x-8">
            <Link href="#quem-somos" className="text-sm hover:text-yellow-400 transition-colors">
              Quem Somos
            </Link>
            <div className="relative group" ref={dropdownRef}>
              <button
                onClick={() => toggleSubmenu("solucoes")}
                className="text-sm hover:text-yellow-400 transition-colors flex items-center gap-1"
              >
                Soluções{" "}
                {openSubmenu === "solucoes" ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
              {openSubmenu === "solucoes" && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-900 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      href="#formacoes"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-zinc-800 hover:text-yellow-400"
                      onClick={() => setOpenSubmenu(null)}
                    >
                      Formações
                    </Link>
                    <Link
                      href="#eventos"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-zinc-800 hover:text-yellow-400"
                      onClick={() => setOpenSubmenu(null)}
                    >
                      Eventos
                    </Link>
                    <Link
                      href="#livros"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-zinc-800 hover:text-yellow-400"
                      onClick={() => setOpenSubmenu(null)}
                    >
                      Livros
                    </Link>
                    <Link
                      href="#treinamentos"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-zinc-800 hover:text-yellow-400"
                      onClick={() => setOpenSubmenu(null)}
                    >
                      Treinamentos
                    </Link>
                    <Link
                      href="/lives"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-zinc-800 hover:text-yellow-400"
                      onClick={() => setOpenSubmenu(null)}
                    >
                      Lives
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-zinc-800 hover:text-yellow-400"
                      onClick={() => setOpenSubmenu(null)}
                    >
                      Palestras
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="#testemunhos" className="text-sm hover:text-yellow-400 transition-colors">
              Testemunhos
            </Link>
            <Link href="#trabalhe-conosco" className="text-sm hover:text-yellow-400 transition-colors">
              Trabalhe Conosco
            </Link>
          </nav>
          <div className="flex items-center gap-2 xs-gap-2 sm:gap-4">
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-xs xs-text-xs sm:text-sm rounded-full px-3 xs-px-2 sm:px-6"
            >
              <Link href="#contato">Contato</Link>
            </Button>
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-xs xs-text-xs sm:text-sm rounded-full px-3 xs-px-2 sm:px-6"
            >
              <Link href="#formacoes">Formações</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "#quem-somos", label: "Quem Somos" },
                {
                  href: "#",
                  label: "Soluções",
                  submenu: [
                    { href: "#formacoes", label: "Formações" },
                    { href: "#eventos", label: "Eventos" },
                    { href: "#livros", label: "Livros" },
                    { href: "#treinamentos", label: "Treinamentos" },
                    { href: "/lives", label: "Lives" },
                    { href: "#", label: "Palestras" },
                  ],
                },
                { href: "#testemunhos", label: "Testemunhos" },
                { href: "#trabalhe-conosco", label: "Trabalhe Conosco" },
              ]}
            />
          </div>
        </div>
      </header> */}
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
                <span className="text-sm font-medium">INSTITUTO COACHING FINANCEIRO</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  TRANSFORME SUA MENTALIDADE
                </span>{" "}
                E CONQUISTE UMA NOVA REALIDADE FINANCEIRA
              </h1>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua
                mentalidade e conquistar uma nova realidade financeira.
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
                    <span className="text-white font-medium">300.000+</span> vidas transformadas
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
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
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
                Formação focada no desenvolvimento de uma mentalidade de riqueza, combinada com estratégias práticas e comprovadas para aumentar sua renda.
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

            {/* Mentor Coach Financeiro*/}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Mentor Coach Financeiro</h3>

              <p className="text-zinc-300 mb-6 flex-1">
                Formação que une inteligência financeira, desenvolvimento pessoal e coaching para transformar sua vida e permitir que você ajude outros a fazerem o mesmo com propósito e estratégia.
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

          </div>
        </div>
      </section>
      <section id="quem-somos" className="py-12 xs:py-12 sm:py-16 md:py-20 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/ROBERTO_17.jpg"
                alt="Roberto Navarro"
                fill
                className="object-cover w-full h-full opacity-70" // Reduced opacity for better text contrast
                style={{
                  objectPosition: "top",
                }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/90 to-transparent md:from-black/100 md:via-black/60 md:to-transparent"></div>
              {/* Noise Texture */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 bg-repeat bg-[length:200px_200px]"></div>
            </div>
      
            <div className="container mx-auto px-4 relative z-10">
              {/* Heading */}
              <div className="text-center mb-12">
                <SectionBadge text="QUEM SOMOS" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  MAIS DE  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">30 ANOS </span>
                  IMPACTANDO VIDAS COM INTELIGÊNCIA E PROPÓSITO 
                </h2>
                <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                 Te guiamos na jornada de transformação financeira, emocional e espiritual. 
                </p>
              </div>
      
              {/* Content */}
              <div className="grid md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                
      
                {/* Text and Stats */}
                <div className="flex flex-col gap-8">
                  {/* Bio Text */}
                  <div className="space-y-4 text-zinc-300 text-base md:text-lg leading-relaxed">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/90 to-transparent rounded-full blur-3xl -z-10"></div>
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                      <p>
                        Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente, trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                      <p>
                        A virada em sua vida veio quando Roberto percebeu que havia um "vilão invisível" bloqueando sua prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                      <p>
                        Hoje, Roberto Navarro é reconhecido como o criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e emocional. Sua missão é transformar a vida financeira de 10 milhões de brasileiros e contribuir para a construção de um país rico e próspero.
                      </p>
                    </div>
                  </div>
      
                  {/* Statistics Badges */}
                  <div className="w-full flex flex-col justify-end mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
                      {[
                        { icon: <Users className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "+1,5 Milhões", label: "Alunos" },
                        { icon: <Star className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "1280", label: "Técnicas Exclusivas" },
                        { icon: <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "5", label: "Livros Publicados" },
                        { icon: <Video className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "100+", label: "Vídeos Inspiradores" },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-500 hover:border-yellow-500/50 hover:-translate-y-1 opacity-0 translate-y-12 animate-[fadeInUp_0.5s_ease-out_forwards]"
                          style={{ animationDelay: `${500 + index * 100}ms` }}
                        >
                          <div className="flex items-center gap-2 md:gap-4">
                            <div className="bg-zinc-800 rounded-full p-2 md:p-3">{stat.icon}</div>
                            <div>
                              <p className="text-sm md:text-xl font-bold text-white">{stat.value}</p>
                              <p className="text-xs md:text-sm text-zinc-400">{stat.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Animation Styles */}
            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(12px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </section>
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
              <p className="text-zinc-300 mb-6 flex-1">Reprograme sua mentalidade e ative seu potencial milionário.</p>
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

      <TransformationVideos/>

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

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
