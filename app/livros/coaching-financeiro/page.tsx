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
  Brain,
  Heart,
  Target,
  Users,
  Star,
  Quote,
  Compass
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ScrollAnimation from "@/components/scroll-animation"
import { TestimonialsLivros } from "@/components/testimonials-livros"

const purchaseLink = "https://sun.eduzz.com/956345"

export default function CoachingFinanceiroPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const pillars = [
    {
      title: "Controle emocional e financeiro",
      description: "Descubra como suas emoções impactam suas decisões financeiras e aprenda a dominá-las para alcançar seus objetivos.",
      icon: <Heart className="h-6 w-6" />
    },
    {
      title: "Clareza financeira",
      description: "Obtenha uma visão clara de suas finanças, identificando onde você está e para onde quer ir, com estratégias práticas para chegar lá.",
      icon: <Compass className="h-6 w-6" />
    },
    {
      title: "Ação e progresso",
      description: "Aprenda a usar o &quot;giro financeiro&quot; para impulsionar seu autocontrole e progresso, com exercícios práticos e histórias reais de sucesso e fracasso que inspiram e ensinam.",
      icon: <Target className="h-6 w-6" />
    }
  ]

  const transformations = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Autoconhecimento",
      description: "Descubra seus padrões financeiros e como transformá-los"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Equilíbrio Emocional",
      description: "Neutralize gatilhos emocionais que sabotam suas finanças"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Foco em Resultados",
      description: "Desenvolva disciplina para alcançar suas metas financeiras"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Relacionamentos",
      description: "Melhore sua relação com dinheiro, família e sociedade"
    }
  ]

  const testimonials = [
    {
      quote: "O Coaching Financeiro me ajudou a entender que meus problemas com dinheiro eram, na verdade, problemas emocionais. Hoje tenho controle total sobre minhas finanças.",
      avatar: {
        src: "/images/reviewers/andrea-kress.png",
        alt: "Andrea Kress",
      },
      name: "Andrea Kress",
      role: "Leitora Verificada",
      numberOfStars: 5,
    },
    {
      quote: "Este livro é um divisor de águas. Roberto Navarro consegue unir técnicas de coaching com educação financeira de forma brilhante.",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fadeInLeft">
              <div>
                <Badge variant="outline" className="mb-6 px-4 py-2 border-blue-500/50 bg-blue-500/5">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">LIVRO EQUILIBRADOR</span>
                </Badge>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  Coaching{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                    Financeiro
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-300 mb-8">
                  Estratégias e soluções para o seu sucesso financeiro
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
                    asChild
                  >
                    <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                      TRANSFORME SUAS FINANÇAS
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
                  <span className="text-zinc-400">4.9/5 (356 avaliações)</span>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" className="relative">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 blur-3xl"></div>
                <Image
                  src="/images/COACHING.png"
                  alt="Coaching Financeiro - Capa do Livro"
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
                  <Quote className="h-8 w-8 text-blue-400" />
                  <h2 className="text-3xl font-bold">Sobre o Livro</h2>
                </div>
                
                <div className="space-y-4 text-zinc-300">
                  <p className="text-lg leading-relaxed">
                    Você busca mais do que apenas técnicas financeiras? Em &quot;Coaching Financeiro&quot;, Roberto Navarro vai além dos números, mergulhando na tríade essencial para o sucesso: controle emocional, clareza financeira e ação.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Este livro é um convite para transformar sua relação com o dinheiro de forma profunda e duradoura.
                  </p>
                  <p className="text-lg leading-relaxed font-semibold text-blue-400">
                    Se você quer tomar decisões conscientes e viver com mais equilíbrio, clareza e prosperidade, este é o seu guia.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Os 3 Pilares */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-blue-500/50 bg-blue-500/5">
              METODOLOGIA
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que você vai{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                aprender
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 150}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <div className="bg-blue-500/10 rounded-full p-4 w-fit mx-auto mb-4 text-blue-400">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center text-blue-400">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-300 text-center">{pillar.description}</p>
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
            <Badge variant="outline" className="mb-4 px-4 py-2 border-blue-500/50 bg-blue-500/5">
              TRANSFORMAÇÃO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que este livro é{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                essencial para você?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Feito para quem deseja absorver, internalizar e tomar atitudes com sabedoria e propósito, &quot;Coaching Financeiro&quot; é mais do que um livro; é um programa de transformação. Navarro compartilha não apenas estratégias, mas também histórias reais e exercícios práticos que mostram como transformar sua relação com o dinheiro.
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {transformations.map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-500/10 rounded-full p-4 w-fit mx-auto mb-4 text-blue-400">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-zinc-300 text-sm">{item.description}</p>
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
                    <span>16x23 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Páginas:</span>
                    <span>126</span>
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

      {/* Seção Especial */}
      <section className="py-20 relative bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-blue-900/20 to-zinc-900 border-blue-800/50 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  <Users className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold mb-4">
                    Mais que um livro, uma{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                      ferramenta de transformação
                    </span>
                  </h2>
                  <p className="text-lg text-zinc-300 mb-6">
                    Este livro contém:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-zinc-300">Exercícios práticos de coaching</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-zinc-300">Casos reais de transformação</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-zinc-300">Ferramentas de autoavaliação</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-zinc-300">Plano de ação personalizado</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Sobre o Autor */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-5xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <ScrollAnimation animation="fadeInLeft" className="relative h-[400px] md:h-auto">
                    <Image
                      src="/images/ROBERTO_10.jpg"
                      alt="Roberto Navarro"
                      fill
                      className="object-cover"
                    />
                  </ScrollAnimation>
                  <div className="p-8 md:p-12">
                    <ScrollAnimation animation="fadeInUp">
                      <Badge variant="outline" className="mb-4 px-4 py-2 border-blue-500/50 bg-blue-500/5">
                        CRIADOR DO CONCEITO
                      </Badge>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fadeInUp" delay={100}>
                      <h2 className="text-3xl font-bold mb-4">
                        Roberto{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                          Navarro
                        </span>
                      </h2>
                    </ScrollAnimation>
                    <div className="space-y-4 text-zinc-300">
                      <ScrollAnimation animation="fadeInUp" delay={200}>
                        <p>
                          Pioneiro e criador do conceito de Coaching Financeiro no Brasil, Roberto Navarro revolucionou a forma como milhares de pessoas lidam com suas finanças.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={300}>
                        <p>
                          Sua abordagem única integra técnicas avançadas de coaching com educação financeira prática, criando resultados extraordinários na vida de seus alunos.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fadeInUp" delay={400}>
                        <p>
                          Este livro é a síntese de anos de experiência transformando vidas através do equilíbrio entre mente, emoções e finanças.
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
        heading="Vidas transformadas"
        description="O impacto do Coaching Financeiro na prática"
        testimonials={testimonials}
      />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Transforme sua relação com o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                dinheiro
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-8">
              O primeiro passo para a prosperidade financeira é entender que o problema nunca foi o dinheiro, mas sim sua relação com ele. Comece sua transformação agora.
            </p>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <div className="text-4xl font-bold text-blue-400 mb-2">R$ 50,00</div>
              <p className="text-zinc-400 mb-4">ou 5x de R$ 10,00</p>
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 w-full"
                asChild
              >
                <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                  INICIAR TRANSFORMAÇÃO
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Metodologia comprovada</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Suporte online</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Livro - Coaching Financeiro" />
    </div>
  )
}