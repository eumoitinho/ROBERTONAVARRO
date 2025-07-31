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
  Target,
  Brain,
  Heart,
  Sparkles,
  Star,
  Quote
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ScrollAnimation from "@/components/scroll-animation"
import { TestimonialsLivros } from "@/components/testimonials-livros"

const purchaseLink = "https://sun.eduzz.com/956345"

export default function SabedoriaDoDinheiroPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const chapters = [
    {
      title: "Gastar com propósito",
      description: "Descubra como suas despesas podem se tornar ferramentas para construir a vida que você sonha, em vez de um fardo."
    },
    {
      title: "Gerar renda passiva",
      description: "Aprenda estratégias comprovadas para fazer seu dinheiro trabalhar para você, criando múltiplas fontes de renda que garantem sua tranquilidade."
    },
    {
      title: "Proteger seu capital",
      description: "Conheça os métodos para salvaguardar seu patrimônio e garantir a segurança financeira da sua família."
    },
    {
      title: "Ampliar suas oportunidades",
      description: "Abra-se para um mundo de possibilidades financeiras que você nunca imaginou, transformando desafios em degraus para o sucesso."
    }
  ]

  const benefits = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Transformação Mental",
      description: "Reprograme sua mente para atrair e manter a prosperidade"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Clareza de Propósito",
      description: "Alinhe suas finanças com seu propósito de vida"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Equilíbrio Espiritual",
      description: "Mantenha a espiritualidade no centro de sua jornada financeira"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Abundância Real",
      description: "Aprenda a viver em abundância em todas as áreas da vida"
    }
  ]

  const testimonials = [
    {
      quote: "Este livro mudou completamente minha visão sobre dinheiro. Não é apenas sobre ganhar mais, mas sobre ter uma relação saudável e próspera com as finanças.",
      avatar: {
        src: "/images/reviewers/juliano-gorgonio.png",
        alt: "Juliano Gorgonio",
      },
      name: "Juliano Gorgonio",
      role: "Leitor Verificado",
      numberOfStars: 5,
    },
    {
      quote: "Roberto Navarro consegue unir espiritualidade e finanças de uma forma única. A Sabedoria do Dinheiro é um guia essencial para quem busca prosperidade com propósito.",
      avatar: {
        src: "/images/reviewers/marta-celestino.png",
        alt: "Marta Celestino",
      },
      name: "Marta Celestino",
      role: "Leitora Verificada",
      numberOfStars: 5,
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader showInicio={true} />

      {/* Hero Section */}
      <section className="relative min-h-[700px] pt-32 pb-20 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fadeInLeft">
              <div>
                <Badge variant="outline" className="mb-6 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">LIVRO ESSENCIAL</span>
                </Badge>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  A Sabedoria do{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                    Dinheiro
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-300 mb-8">
                  Transforme sua mentalidade e atraia a prosperidade para sua vida
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
                    asChild
                  >
                    <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                      ADQUIRA SEU EXEMPLAR
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
                  <span className="text-zinc-400">4.9/5 (327 avaliações)</span>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" className="relative">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 blur-3xl"></div>
                <Image
                  src="/images/SABEDORIA.png"
                  alt="A Sabedoria do Dinheiro - Capa do Livro"
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
                  <Quote className="h-8 w-8 text-yellow-400" />
                  <h2 className="text-3xl font-bold">Sobre o Livro</h2>
                </div>
                
                <div className="space-y-4 text-zinc-300">
                  <p className="text-lg leading-relaxed">
                    Você está pronto para desvendar os segredos da riqueza e atrair a prosperidade que sempre desejou? Em &quot;A Sabedoria do Dinheiro&quot;, Roberto Navarro revela os 5 passos essenciais para usar a ciência da riqueza a seu favor.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Este não é apenas um livro sobre finanças; é um guia para alinhar sua visão financeira com o seu propósito de vida, mantendo a espiritualidade e a abundância no centro de sua jornada.
                  </p>
                  <p className="text-lg leading-relaxed font-semibold text-yellow-400">
                    Se você deseja sair das dívidas, criar uma vida com mais controle, propósito e abundância, este livro é o seu ponto de partida.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Conteúdo do Livro */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              CONTEÚDO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que você vai{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                aprender
              </span>
            </h2>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-4">
            {chapters.map((chapter, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 50}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{chapter.title}</h3>
                      <p className="text-zinc-400">{chapter.description}</p>
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
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              TRANSFORMAÇÃO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que este livro é{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                essencial para você?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Navarro vai além das técnicas financeiras, mergulhando na mentalidade que impulsiona a verdadeira riqueza. Ele te convida a trilhar o caminho da liberdade financeira com sabedoria, transformando não apenas sua conta bancária, mas sua vida por completo.
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-yellow-500/10 rounded-full p-4 w-fit mx-auto mb-4 text-yellow-400">
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
                    <span>Gente Editora</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Ano de lançamento:</span>
                    <span>2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Dimensões:</span>
                    <span>16x23 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Páginas:</span>
                    <span>224</span>
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
                      src="/images/ROBERTO_4.jpg"
                      alt="Roberto Navarro"
                      fill
                      className="object-cover"
                    />
                  </ScrollAnimation>
                  <div className="p-8 md:p-12">
                    <ScrollAnimation animation="fadeInUp">
                      <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                        AUTOR
                      </Badge>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeInUp" delay={100}>
                      <h2 className="text-3xl font-bold mb-4">
                        Roberto{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                          Navarro
                        </span>
                      </h2>
                    </ScrollAnimation>
                    <div className="space-y-4 text-zinc-300">
                      <ScrollAnimation animation="fadeInUp" delay={200}>
                        <p>
                          Maior educador financeiro do Brasil, com mais de 1,5 milhão de alunos impactados em todo o mundo.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={300}>
                        <p>
                          Criador do conceito de Coaching Financeiro no país, Roberto Navarro desenvolveu uma metodologia única que une finanças, inteligência emocional e espiritualidade.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={400}>
                        <p>
                          Com 5 livros publicados e centenas de vídeos educativos, sua missão é democratizar o acesso à educação financeira de qualidade.
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
        heading="O que os leitores dizem"
        description="Veja como este livro tem transformado vidas"
        testimonials={testimonials}
      />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Comece sua jornada rumo à{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                sabedoria financeira
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-8">
              Não espere mais para transformar sua relação com o dinheiro. Adquira agora &quot;A Sabedoria do Dinheiro&quot; e dê o primeiro passo para uma vida de prosperidade e propósito.
            </p>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <div className="text-4xl font-bold text-yellow-400 mb-2">R$ 50,00</div>
              <p className="text-zinc-400 mb-4">ou 5x de R$ 10,00</p>
              <Button
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 w-full"
                asChild
              >
                <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                  COMPRAR AGORA
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
                <span>Entrega imediata</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Livro - A Sabedoria do Dinheiro" />
    </div>
  )
}