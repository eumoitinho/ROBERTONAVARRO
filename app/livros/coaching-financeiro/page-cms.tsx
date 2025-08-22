"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getBook } from '@/lib/sanity/fetch'
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
  const [bookData, setBookData] = useState<any>(null)

  useEffect(() => {
    setIsVisible(true)

    // Fetch Sanity data for this book
    const fetchBookData = async () => {
      try {
        const data = await getBook('coaching-financeiro')
        setBookData(data)
      } catch (error) {
        console.log('Using default book content:', error)
      }
    }

    fetchBookData()
  }, [])

  // Use Sanity data or fallback to original static content
  const bookTitle = bookData?.title || "Coaching Financeiro"
  const bookSubtitle = bookData?.subtitle || "Estratégias e soluções para o seu sucesso financeiro"
  const bookDescription = bookData?.description || "Descubra como dominar suas emoções e transformar sua relação com o dinheiro através de técnicas comprovadas de coaching aplicadas às finanças pessoais."
  const bookPrice = bookData?.price?.value ? `R$ ${bookData.price.value.toLocaleString('pt-BR')}` : "R$ 47,90"
  const bookPurchaseLink = bookData?.purchaseLink || purchaseLink

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
      description: "Aprenda a usar o \"giro financeiro\" para impulsionar seu autocontrole e progresso, com exercícios práticos e histórias reais de sucesso e fracasso que inspiram e ensinam.",
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

      {/* Hero Section - LAYOUT ORIGINAL COM DADOS DO SANITY */}
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
                  {bookTitle.split(' ').map((word: string, index: number) => (
                    index === bookTitle.split(' ').length - 1 ? (
                      <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                        {word}
                      </span>
                    ) : (
                      <span key={index}>{word} </span>
                    )
                  ))}
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-300 mb-8">
                  {bookSubtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
                    asChild
                  >
                    <a href={bookPurchaseLink} target="_blank" rel="noopener noreferrer">
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

            <ScrollAnimation animation="fadeInRight">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-3xl p-8 backdrop-blur-sm">
                  <Image
                    src="/images/books/coaching-financeiro.png"
                    alt={bookTitle}
                    width={400}
                    height={600}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm">Preço</p>
                      <p className="text-2xl font-bold text-white">{bookPrice}</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                      Disponível
                    </Badge>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section - LAYOUT ORIGINAL */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 border-blue-500/50 bg-blue-500/5">
                OS 3 PILARES
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                A Base da{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                  Transformação Financeira
                </span>
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                Descubra os três pilares fundamentais que sustentam sua jornada rumo à liberdade financeira
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <ScrollAnimation key={index} animation="fadeInUp">
                <Card className="bg-zinc-900/50 border-zinc-800/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white mb-4">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{pillar.title}</h3>
                    <p className="text-zinc-300">{pillar.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section - LAYOUT ORIGINAL */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 border-blue-500/50 bg-blue-500/5">
                CONTEÚDO DO LIVRO
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                O Que Você Vai{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                  Aprender
                </span>
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation animation="fadeInLeft">
              <div className="space-y-4">
                {[
                  "Como identificar e superar crenças limitantes sobre dinheiro",
                  "Técnicas de PNL aplicadas às finanças pessoais",
                  "O método dos 6 potes para organizar suas finanças",
                  "Estratégias para eliminar dívidas definitivamente"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight">
              <div className="space-y-4">
                {[
                  "Como criar múltiplas fontes de renda",
                  "Desenvolvimento de inteligência emocional financeira",
                  "Planejamento financeiro de longo prazo",
                  "Como ensinar educação financeira para seus filhos"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mt-12">
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-full px-8 py-4 text-base shadow-xl hover:shadow-blue-500/25"
                asChild
              >
                <a href={bookPurchaseLink} target="_blank" rel="noopener noreferrer">
                  QUERO TRANSFORMAR MINHAS FINANÇAS
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Transformation Section - LAYOUT ORIGINAL */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 border-blue-500/50 bg-blue-500/5">
                TRANSFORMAÇÃO
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Áreas de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                  Transformação
                </span>
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                Este livro vai transformar completamente estas áreas da sua vida
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {transformations.map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp">
                <Card className="bg-zinc-900/50 border-zinc-800/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-zinc-300 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* About the Author - LAYOUT ORIGINAL */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollAnimation animation="fadeInLeft">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-3xl blur-3xl"></div>
                <Image
                  src="/images/roberto-navarro-author.jpg"
                  alt="Roberto Navarro"
                  width={500}
                  height={600}
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight">
              <div>
                <Badge variant="outline" className="mb-4 px-4 py-2 border-blue-500/50 bg-blue-500/5">
                  SOBRE O AUTOR
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Roberto{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                    Navarro
                  </span>
                </h2>
                <div className="space-y-4 text-zinc-300">
                  <p>
                    Considerado o criador do conceito de Coach Financeiro no Brasil, Roberto Navarro é especialista em 
                    inteligência financeira e já transformou a vida de mais de 300.000 pessoas através de seus treinamentos.
                  </p>
                  <p>
                    Com mais de 15 anos de experiência, desenvolveu metodologias únicas que unem desenvolvimento pessoal 
                    e educação financeira, criando um caminho claro para a prosperidade.
                  </p>
                  <p>
                    Autor de diversos best-sellers, Roberto é reconhecido por sua abordagem prática e transformadora, 
                    que vai além das finanças e trabalha o ser humano de forma integral.
                  </p>
                </div>
                <div className="flex gap-4 mt-6">
                  <div>
                    <p className="text-3xl font-bold text-blue-500">300K+</p>
                    <p className="text-sm text-zinc-400">Vidas Transformadas</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-500">15+</p>
                    <p className="text-sm text-zinc-400">Anos de Experiência</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-500">5</p>
                    <p className="text-sm text-zinc-400">Best-sellers</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsLivros 
        heading="O QUE DIZEM OS LEITORES"
        description="Veja como o livro Coaching Financeiro tem transformado a vida financeira de milhares de pessoas"
        testimonials={testimonials} 
      />

      {/* CTA Section - LAYOUT ORIGINAL */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Comece Sua{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                  Transformação Hoje
                </span>
              </h2>
              <p className="text-zinc-300 text-lg mb-8">
                Não espere mais para conquistar a vida financeira que você merece. 
                Este livro é o primeiro passo para sua liberdade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-blue-500/25"
                  asChild
                >
                  <a href={bookPurchaseLink} target="_blank" rel="noopener noreferrer">
                    COMPRAR AGORA POR {bookPrice}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">Entrega Imediata</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">Compra Segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">Garantia de 7 dias</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}