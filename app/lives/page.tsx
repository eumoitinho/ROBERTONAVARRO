"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import { SiteHeader } from "@/components/header"

export default function LivesPage() {
  const [isVisible, setIsVisible] = useState(false)

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
      
      .instagram-container {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        overflow: hidden;
        border-radius: 1rem;
      }
      
      .instagram-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
      
      @media (min-width: 768px) {
        .instagram-container {
          padding-bottom: 80%;
        }
      }
      
      @media (min-width: 1024px) {
        .instagram-container {
          padding-bottom: 56.25%;
        }
      }
    `
    document.head.appendChild(style)
  }, [])

  // Sample live schedule data
  const liveSchedule = [
    {
      day: "Segunda-feira",
      time: "19:00",
      topic: "Finanças Pessoais",
      description: "Dicas práticas para organizar suas finanças e eliminar dívidas.",
    },
    {
      day: "Terça-feira",
      time: "19:00",
      topic: "Investimentos",
      description: "Estratégias de investimento para iniciantes e avançados.",
    },
    {
      day: "Quarta-feira",
      time: "19:00",
      topic: "Empreendedorismo",
      description: "Como iniciar e escalar seu negócio com inteligência.",
    },
    {
      day: "Quinta-feira",
      time: "19:00",
      topic: "Mentalidade",
      description: "Desenvolvendo uma mentalidade de prosperidade e abundância.",
    },
    {
      day: "Sexta-feira",
      time: "19:00",
      topic: "Perguntas e Respostas",
      description: "Roberto responde às principais dúvidas da semana.",
    },
  ]

  // Sample recent lives
  const recentLives = [
    {
      id: "1",
      title: "Como criar múltiplas fontes de renda",
      thumbnail: "/images/live-thumbnail-1.webp",
      date: "15/05/2023",
      views: "12.5k",
    },
    {
      id: "2",
      title: "Investimentos para iniciantes",
      thumbnail: "/images/live-thumbnail-2.webp",
      date: "10/05/2023",
      views: "8.7k",
    },
    {
      id: "3",
      title: "Mentalidade milionária na prática",
      thumbnail: "/images/live-thumbnail-3.webp",
      date: "05/05/2023",
      views: "15.3k",
    },
    {
      id: "4",
      title: "Como sair das dívidas em 90 dias",
      thumbnail: "/images/live-thumbnail-4.webp",
      date: "01/05/2023",
      views: "20.1k",
    },
  ]
const navigationItems = [
  { title: "Início", href: "/" },
  { title: "Formações", href: "/#formacoes" },
  { title: "Eventos", href: "/#eventos" },
  { title: "Lives", href: "/lives" },
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
        title="LIVES DIÁRIAS"
        subtitle="Conteúdo gratuito"
        secondtitle="Conhecimento transformador todos os dias"
        description="Acompanhe as lives diárias de Roberto Navarro no Instagram e transforme sua mentalidade e suas finanças com conteúdo prático e de alta qualidade."
        image="/images/roberto-palestra.jpeg"
        ctaText="SEGUIR NO INSTAGRAM"
        ctaHref="https://www.instagram.com/robertonavarrooficial/"
        secondaryCtaText="Ver programação"
        secondaryCtaHref="#programacao"
      />

      {/* Live Schedule Section */}
      <section id="programacao" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PROGRAMAÇÃO SEMANAL</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ACOMPANHE NOSSAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">LIVES DIÁRIAS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Todos os dias às 19h, Roberto Navarro traz conteúdo exclusivo e gratuito no Instagram para transformar sua
              mentalidade e suas finanças.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {liveSchedule.map((live, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  <h3 className="font-bold text-lg">{live.day}</h3>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <p className="text-zinc-300">{live.time}</p>
                </div>
                <h4 className="text-yellow-400 font-semibold mb-2">{live.topic}</h4>
                <p className="text-zinc-400 text-sm">{live.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <a href="https://www.instagram.com/robertonavarrooficial/" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                SEGUIR NO INSTAGRAM
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Current Live Section */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">ASSISTA AO VIVO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ACOMPANHE-NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">AGORA</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="instagram-container">
                <iframe
                  src="https://www.instagram.com/robertonavarrooficial/embed"
                  allowTransparency={true}
                  allowFullScreen={true}
                  scrolling="no"
                  title="Instagram Feed"
                ></iframe>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <a href="https://www.instagram.com/robertonavarrooficial/" target="_blank" rel="noopener noreferrer">
                  ABRIR NO INSTAGRAM
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Lives Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONTEÚDO RECENTE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              LIVES <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ANTERIORES</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Não conseguiu assistir ao vivo? Confira as gravações das lives anteriores e não perca nenhum conteúdo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentLives.map((live) => (
              <div
                key={live.id}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 md:h-56">
                 
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">
                        {live.date} • {live.views} visualizações
                      </p>
                      <h3 className="font-bold text-white">{live.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Button asChild className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                    <a
                      href={`https://www.instagram.com/robertonavarrooficial/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Assistir no Instagram
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-4 text-base"
            >
              <a href="https://www.instagram.com/robertonavarrooficial/" target="_blank" rel="noopener noreferrer">
                Ver todas as lives <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 relative bg-zinc-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">NÃO PERCA NENHUMA LIVE!</h2>
            <p className="text-lg mb-6 text-zinc-300">
              Ative as notificações no Instagram e seja avisado sempre que uma nova live começar.
            </p>
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base"
            >
              <a href="https://www.instagram.com/robertonavarrooficial/" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5" />
                SEGUIR E ATIVAR NOTIFICAÇÕES
              </a>
            </Button>
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
