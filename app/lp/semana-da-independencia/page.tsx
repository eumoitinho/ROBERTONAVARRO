"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  CheckCircle, 
  Gift,
  Sparkles,
  Trophy,
  Flag,
  Star,
  ShoppingBag,
  Zap
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ScrollAnimation from "@/components/scroll-animation"

const whatsappLink = "https://wa.me/5511999999999?text=Olá,%20quero%20aproveitar%20as%20promoções%20da%20Semana%20da%20Independência!"

export default function SemanaDaIndependenciaPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const promotions = [
    {
      mainProduct: "Educador Milionário",
      bonus: "Make Money de GRAÇA",
      icon: "📚",
      color: "from-green-500 to-yellow-500",
      link: "https://sun.eduzz.com/educador"
    },
    {
      mainProduct: "LCF - Liberdade e Consciência Financeira",
      bonus: "Educador Milionário de GRAÇA",
      icon: "💰",
      color: "from-yellow-500 to-green-500",
      link: "https://sun.eduzz.com/lcf"
    },
    {
      mainProduct: "Empreendedor Produtivo",
      bonus: "Investidor Inteligente de GRAÇA",
      icon: "🚀",
      color: "from-green-500 to-blue-500",
      link: "https://sun.eduzz.com/empreendedor"
    },
    {
      mainProduct: "Investidor Inteligente",
      bonus: "Educador Milionário de GRAÇA",
      icon: "📈",
      color: "from-blue-500 to-green-500",
      link: "https://sun.eduzz.com/investidor"
    },
    {
      mainProduct: "2 Mentorias",
      bonus: "3ª Mentoria de GRAÇA",
      icon: "🎯",
      color: "from-yellow-500 to-blue-500",
      link: "https://sun.eduzz.com/mentorias"
    },
    {
      mainProduct: "Pacote PRO",
      bonus: "1 Mentoria de GRAÇA",
      icon: "👑",
      color: "from-green-500 to-yellow-500",
      link: "https://sun.eduzz.com/pro"
    }
  ]

  const benefits = [
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Produtos Bônus",
      description: "Ganhe produtos extras sem custo adicional"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Economia Real",
      description: "Economize até 50% com os combos especiais"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Oferta Limitada",
      description: "Válido apenas durante a Semana da Independência"
    },
    {
      icon: <Flag className="h-8 w-8" />,
      title: "Independência Financeira",
      description: "Invista em conhecimento e conquiste sua liberdade"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-yellow-950 to-blue-950 text-white">
      <SiteHeader showInicio={true} />

      {/* Hero Section */}
      <section className="relative min-h-[800px] pt-32 pb-20 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-green-900/30 to-blue-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation animation="fadeInDown" className="text-center mb-12">
            <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 border-none text-lg">
              <Flag className="w-5 h-5 mr-2" />
              <span className="font-bold">SEMANA DA INDEPENDÊNCIA 🇧🇷</span>
            </Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Compre 1 e Leve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400">
                2 PRODUTOS
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-200 mb-8 max-w-3xl mx-auto">
              Celebre sua independência financeira com ofertas exclusivas!
              <br />
              <span className="text-yellow-400 font-semibold">Promoção por tempo limitado</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-black font-bold rounded-full px-10 py-7 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
                asChild
              >
                <a href="#promocoes">
                  VER TODAS AS PROMOÇÕES
                  <Zap className="ml-2 h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 font-bold rounded-full px-10 py-7 text-xl"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  FALAR COM CONSULTOR
                  <ArrowRight className="ml-2 h-6 w-6" />
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-yellow-400 text-lg font-semibold">Ofertas Imperdíveis</span>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Promoções Section */}
      <section id="promocoes" className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge className="mb-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 border-none">
              <ShoppingBag className="w-5 h-5 mr-2" />
              OFERTAS EXCLUSIVAS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Escolha Seu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400">
                Combo Especial
              </span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Aproveite essas ofertas únicas e invista em seu crescimento com economia garantida
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {promotions.map((promo, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border-2 border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-2 h-full overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${promo.color}`}></div>
                  <CardContent className="p-8">
                    <div className="text-5xl mb-4 text-center">{promo.icon}</div>
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">{promo.mainProduct}</h3>
                      <div className="text-3xl font-extrabold text-yellow-400 mb-2">+</div>
                      <div className="bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-lg p-3">
                        <p className="text-lg font-bold text-yellow-300">{promo.bonus}</p>
                      </div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${promo.color} hover:opacity-90 text-black font-bold rounded-full py-6 text-lg shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300`}
                      asChild
                    >
                      <a href={promo.link} target="_blank" rel="noopener noreferrer">
                        APROVEITAR OFERTA
                        <Gift className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gradient-to-b from-blue-950/50 to-green-950/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge className="mb-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-green-500 border-none">
              VANTAGENS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que aproveitar{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400">
                agora?
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-900/70 backdrop-blur-sm border-green-500/30 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full p-4 w-fit mx-auto mb-4 text-yellow-400">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-zinc-300 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Urgência Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-yellow-900/30 to-blue-900/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900/95 to-zinc-800/95 backdrop-blur-sm border-2 border-yellow-500 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center gap-3 mb-6">
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
                  <h2 className="text-3xl md:text-4xl font-bold">Oferta Por Tempo Limitado!</h2>
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
                </div>
                
                <p className="text-xl text-zinc-300 mb-8">
                  Estas promoções são válidas apenas durante a{" "}
                  <span className="text-yellow-400 font-bold">Semana da Independência</span>.
                  <br />
                  Não perca a chance de economizar e investir em seu futuro!
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                  <div className="bg-green-500/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-400">50%</div>
                    <div className="text-sm text-zinc-300">Economia</div>
                  </div>
                  <div className="bg-yellow-500/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-400">2X</div>
                    <div className="text-sm text-zinc-300">Mais Valor</div>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-400">7</div>
                    <div className="text-sm text-zinc-300">Dias Apenas</div>
                  </div>
                </div>

                <Button
                  className="bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 hover:from-green-600 hover:via-yellow-600 hover:to-blue-600 text-black font-bold rounded-full px-12 py-7 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
                  asChild
                >
                  <a href="#promocoes">
                    GARANTIR MINHA OFERTA AGORA
                    <Zap className="ml-3 h-6 w-6" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-blue-950 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Celebre Sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400">
                Independência Financeira
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8">
              Invista em conhecimento e conquiste a liberdade que você merece
            </p>
            
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border-2 border-yellow-500 rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <div className="text-2xl font-bold text-yellow-400 mb-4">🇧🇷 SEMANA ESPECIAL 🇧🇷</div>
              <p className="text-lg text-zinc-300 mb-6">Escolha sua promoção e garanta produtos extras GRÁTIS!</p>
              <Button
                className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-black font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 w-full"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  FALAR COM ESPECIALISTA
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Compra 100% segura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Satisfação garantida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Suporte especializado</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="LP - Semana da Independência" />
    </div>
  )
}