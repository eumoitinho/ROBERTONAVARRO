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
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Shield,
  Star,
  Quote
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ScrollAnimation from "@/components/scroll-animation"
import { TestimonialsLivros } from "@/components/testimonials-livros"

const purchaseLink = "https://sun.eduzz.com/956345"

export default function QuebrandoMitosPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const myths = [
    {
      myth: "Identificar mitos financeiros",
      truth: "Descubra as verdades por trás das falsas crenças que impedem seu crescimento financeiro."
    },
    {
      myth: "Substituir padrões negativos",
      truth: "Aprenda a reprogramar sua mente para adotar hábitos e pensamentos que impulsionam a prosperidade."
    },
    {
      myth: "Educação financeira como ferramenta",
      truth: "Entenda que a educação financeira não é um luxo, mas uma necessidade para transformar realidades pessoais, familiares e até comunitárias."
    }
  ]

  const benefits = [
    {
      icon: <AlertCircle className="h-8 w-8" />,
      title: "Identificação de Crenças",
      description: "Reconheça os mitos que sabotam sua prosperidade"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Nova Mentalidade",
      description: "Substitua crenças limitantes por pensamentos prósperos"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Ações Práticas",
      description: "Implemente estratégias concretas para crescer financeiramente"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Proteção Mental",
      description: "Blinde-se contra influências negativas sobre dinheiro"
    }
  ]

  const testimonials = [
    {
      quote: "Finalmente entendi porque nunca conseguia guardar dinheiro. Este livro revelou crenças que eu nem sabia que tinha!",
      avatar: {
        src: "/images/reviewers/andrea-kress.png",
        alt: "Andrea Kress",
      },
      name: "Andrea Kress",
      role: "Leitora Verificada",
      numberOfStars: 5,
    },
    {
      quote: "Roberto Navarro desmistifica o dinheiro de forma clara e direta. Leitura obrigatória para quem quer prosperar.",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fadeInLeft">
              <div>
                <Badge variant="outline" className="mb-6 px-4 py-2 border-red-500/50 bg-red-500/5">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">LIVRO TRANSFORMADOR</span>
                </Badge>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  Quebrando Mitos com o{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                    Dinheiro
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-300 mb-8">
                  Liberte-se das crenças que limitam sua prosperidade
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 transition-all duration-300"
                    asChild
                  >
                    <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                      QUEBRE SEUS MITOS AGORA
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
                  <span className="text-zinc-400">4.8/5 (289 avaliações)</span>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" className="relative">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-600/20 blur-3xl"></div>
                <Image
                  src="/images/MITOS.png"
                  alt="Quebrando Mitos com o Dinheiro - Capa do Livro"
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
                  <Quote className="h-8 w-8 text-red-400" />
                  <h2 className="text-3xl font-bold">Sobre o Livro</h2>
                </div>
                
                <div className="space-y-4 text-zinc-300">
                  <p className="text-lg leading-relaxed">
                    Você se sente preso a padrões financeiros que parecem impossíveis de quebrar? Em &quot;Quebrando Mitos com o Dinheiro&quot;, Roberto Navarro apresenta um manual direto e transformador para desmistificar tudo aquilo que aprendemos errado sobre o dinheiro.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Prepare-se para identificar as crenças limitantes que sabotam sua vida financeira e substituí-las por atitudes conscientes e focadas em resultados.
                  </p>
                  <p className="text-lg leading-relaxed font-semibold text-red-400">
                    Este livro é perfeito para quem quer dar o primeiro passo rumo à autonomia financeira, quebrando padrões que aprisionam.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* O que você vai aprender */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-red-500/50 bg-red-500/5">
              CONTEÚDO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que você vai{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                aprender
              </span>
            </h2>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-4">
            {myths.map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-red-500/50 transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-black font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{item.myth}</h3>
                      <p className="text-zinc-400">{item.truth}</p>
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
            <Badge variant="outline" className="mb-4 px-4 py-2 border-red-500/50 bg-red-500/5">
              TRANSFORMAÇÃO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que este livro é{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                essencial para você?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Navarro mostra que o caminho para a riqueza começa com a desconstrução de paradigmas e a construção de uma nova mentalidade. Se você está pronto para reescrever sua história com o dinheiro, este manual é o seu ponto de partida.
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-red-500/10 rounded-full p-4 w-fit mx-auto mb-4 text-red-400">
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
                    <span>Momentum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Ano de lançamento:</span>
                    <span>2014</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Dimensões:</span>
                    <span>16 x 23 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Páginas:</span>
                    <span>152</span>
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
                      src="/images/ROBERTO_7.jpg"
                      alt="Roberto Navarro"
                      fill
                      className="object-cover"
                    />
                  </ScrollAnimation>
                  <div className="p-8 md:p-12">
                    <ScrollAnimation animation="fadeInUp">
                      <Badge variant="outline" className="mb-4 px-4 py-2 border-red-500/50 bg-red-500/5">
                        AUTOR
                      </Badge>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeInUp" delay={100}>
                      <h2 className="text-3xl font-bold mb-4">
                        Roberto{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                          Navarro
                        </span>
                      </h2>
                    </ScrollAnimation>
                    <div className="space-y-4 text-zinc-300">
                      <ScrollAnimation animation="fadeInUp" delay={200}>
                        <p>
                          Especialista em quebrar paradigmas financeiros, Roberto Navarro já ajudou milhares de pessoas a identificar e superar suas crenças limitantes sobre dinheiro.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={300}>
                        <p>
                          Sua abordagem direta e prática tem o poder de transformar completamente a forma como você pensa e age em relação às finanças.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={400}>
                        <p>
                          Com mais de 20 anos de experiência, ele desenvolveu técnicas exclusivas para reprogramar a mente para a prosperidade.
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
        heading="Transformações reais"
        description="Veja como este livro tem mudado vidas"
        testimonials={testimonials}
      />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Está na hora de quebrar os{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
                mitos financeiros
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-8">
              Não deixe que crenças limitantes continuem sabotando seu sucesso financeiro. Adquira agora &quot;Quebrando Mitos com o Dinheiro&quot; e liberte-se para prosperar.
            </p>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <div className="text-4xl font-bold text-red-400 mb-2">R$ 50,00</div>
              <p className="text-zinc-400 mb-4">ou 5x de R$ 10,00</p>
              <Button
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-red-500/25 transform hover:-translate-y-1 transition-all duration-300 w-full"
                asChild
              >
                <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                  QUEBRAR MEUS MITOS AGORA
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
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Livro - Quebrando Mitos com o Dinheiro" />
    </div>
  )
}