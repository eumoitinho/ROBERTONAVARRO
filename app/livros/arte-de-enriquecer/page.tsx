"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  CheckCircle, 
  BookOpen,
  TrendingUp,
  DollarSign,
  Gem,
  BarChart3,
  Star,
  Quote,
  Palette
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ScrollAnimation from "@/components/scroll-animation"
import { TestimonialsLivros } from "@/components/testimonials-livros"

const purchaseLink = "https://sun.eduzz.com/956345"

export default function ArteDeEnriquecerPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const strategies = [
    {
      title: "Os degraus da liberdade financeira",
      description: "Descubra o passo a passo para dobrar sua renda, administrar seus ganhos de forma eficiente e aproveitar a vida como os verdadeiros ricos fazem.",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Enriquecer é uma ciência",
      description: "Entenda que a prosperidade não é obra do acaso, mas sim o resultado da aplicação de princípios e estratégias comprovadas.",
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "Aplicação prática do conhecimento",
      description: "Navarro oferece um guia claro e objetivo para que você possa aplicar imediatamente o que aprender e ver resultados reais em suas finanças.",
      icon: <Target className="h-6 w-6" />
    }
  ]

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Aumento de Renda",
      description: "Metodologia para multiplicar seus ganhos de forma consistente"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Gestão Eficiente",
      description: "Domine a arte de administrar e fazer crescer seu patrimônio"
    },
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Vida Abundante",
      description: "Aprenda a desfrutar da vida enquanto enriquece"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Crescimento Contínuo",
      description: "Estratégias para manter o crescimento financeiro constante"
    }
  ]

  const testimonials = [
    {
      quote: "Este livro me ensinou que enriquecer é uma arte que pode ser aprendida. Em 6 meses, dobrei minha renda seguindo as estratégias do Roberto.",
      avatar: {
        src: "/images/reviewers/marta-celestino.png",
        alt: "Marta Celestino",
      },
      name: "Marta Celestino",
      role: "Leitora Verificada",
      numberOfStars: 5,
    },
    {
      quote: "A Arte de Enriquecer mudou minha perspectiva sobre dinheiro. Não é sobre trabalhar mais, é sobre trabalhar de forma inteligente.",
      avatar: {
        src: "/images/reviewers/juliano-gorgonio.png",
        alt: "Juliano Gorgonio",
      },
      name: "Juliano Gorgonio",
      role: "Leitor Verificado",
      numberOfStars: 5,
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader showInicio={true} />

      {/* Hero Section */}
      <section className="relative min-h-[700px] pt-32 pb-20 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fadeInLeft">
              <div>
                <Badge variant="outline" className="mb-6 px-4 py-2 border-emerald-500/50 bg-emerald-500/5">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">LIVRO PRÁTICO</span>
                </Badge>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  A Arte de{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    Enriquecer
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-300 mb-8">
                  Riqueza é um caminho, não um privilégio
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300"
                    asChild
                  >
                    <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                      DOMINAR A ARTE AGORA
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-zinc-400">5.0/5 (412 avaliações)</span>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" className="relative">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 blur-3xl"></div>
                <Image
                  src="/images/ARTE.png"
                  alt="A Arte de Enriquecer - Capa do Livro"
                  width={400}
                  height={600}
                  className="relative z-10 rounded-lg shadow-2xl"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Sobre o Livro */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Quote className="h-8 w-8 text-emerald-400" />
                  <h2 className="text-3xl font-bold">Sobre o Livro</h2>
                </div>
                
                <div className="space-y-4 text-zinc-300">
                  <p className="text-lg leading-relaxed">
                    Você acredita que enriquecer é um privilégio para poucos? Roberto Navarro, em &quot;A Arte de Enriquecer&quot;, desmistifica essa ideia e revela a metodologia prática que pode transformar sua vida financeira.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Com uma linguagem acessível e conteúdo direto, o autor mostra que a riqueza é um caminho que qualquer pessoa pode trilhar com disciplina e visão.
                  </p>
                  <p className="text-lg leading-relaxed font-semibold text-emerald-400">
                    Se você busca um guia direto, prático e inspirador sobre como construir riqueza de verdade, &quot;A Arte de Enriquecer&quot; é o livro certo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Estratégias */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-emerald-500/50 bg-emerald-500/5">
              METODOLOGIA
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que você vai{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                aprender
              </span>
            </h2>
          </ScrollAnimation>

          <div className="max-w-4xl mx-auto space-y-4">
            {strategies.map((strategy, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-emerald-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                          {strategy.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-emerald-400">{strategy.title}</h3>
                        <p className="text-zinc-300">{strategy.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Por que este livro é essencial */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-emerald-500/50 bg-emerald-500/5">
              TRANSFORMAÇÃO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que este livro é{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                essencial para você?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Ele é recomendado para quem quer transformar suas finanças e mudar sua relação com o dinheiro, provando que a abundância está ao alcance de todos que se dedicam a aprender e aplicar o conhecimento.
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-emerald-500/10 rounded-full p-4 w-fit mx-auto mb-4 text-emerald-400">
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

      {/* Ficha Técnica */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Ficha Técnica</h2>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex justify-between">
                    <span className="font-semibold">Editora:</span>
                    <span>Semente Livros</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Ano de lançamento:</span>
                    <span>2018</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Dimensões:</span>
                    <span>16x23 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Páginas:</span>
                    <span>90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Idioma:</span>
                    <span>Português</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Sobre o Autor */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-5xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <ScrollAnimation animation="fadeInLeft" className="relative h-[400px] md:h-auto">
                    <Image
                      src="/images/ROBERTO_9.jpg"
                      alt="Roberto Navarro"
                      fill
                      className="object-cover"
                    />
                  </ScrollAnimation>
                  <div className="p-8 md:p-12">
                    <ScrollAnimation animation="fadeInUp">
                      <Badge variant="outline" className="mb-4 px-4 py-2 border-emerald-500/50 bg-emerald-500/5">
                        AUTOR
                      </Badge>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeInUp" delay={100}>
                      <h2 className="text-3xl font-bold mb-4">
                        Roberto{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                          Navarro
                        </span>
                      </h2>
                    </ScrollAnimation>
                    <div className="space-y-4 text-zinc-300">
                      <ScrollAnimation animation="fadeInUp" delay={200}>
                        <p>
                          De lavador de carros a multimilionário em menos de 7 anos, Roberto Navarro é a prova viva de que a arte de enriquecer pode ser aprendida.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={300}>
                        <p>
                          Sua experiência prática e metodologia comprovada já transformaram a vida financeira de centenas de milhares de pessoas em todo o Brasil.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={400}>
                        <p>
                          Neste livro, ele compartilha os segredos que aprendeu em sua jornada e nas vidas dos grandes milionários que estudou.
                        </p>
                      </ScrollAnimation>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Depoimentos */}
      <TestimonialsLivros
        heading="Histórias de sucesso"
        description="Pessoas que dominaram a arte de enriquecer"
        testimonials={testimonials}
      />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Domine a arte de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                enriquecer
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-8">
              A diferença entre quem enriquece e quem apenas sonha está no conhecimento certo aplicado de forma consistente. Comece sua jornada agora.
            </p>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <div className="text-4xl font-bold text-emerald-400 mb-2">R$ 50,00</div>
              <p className="text-zinc-400 mb-4">ou 5x de R$ 10,00</p>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300 w-full"
                asChild
              >
                <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                  QUERO ENRIQUECER
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Bônus exclusivos</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Livro - A Arte de Enriquecer" />
    </div>
  )
}