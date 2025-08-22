"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Star, Quote, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionBadge } from "@/components/section-badge"
import ScrollAnimation from "@/components/scroll-animation"
import { urlFor } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"

interface BookPageContentProps {
  bookData?: any
  slug: string
}

export default function BookPageContent({ bookData, slug }: BookPageContentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fallback data if Sanity is not available
  const getDefaultData = (slug: string) => {
    const defaults: Record<string, any> = {
      'coaching-financeiro': {
        title: "Coaching Financeiro",
        subtitle: "Transforme sua relação com o dinheiro",
        description: "Um guia completo para desenvolver inteligência financeira e conquistar a liberdade que você sempre sonhou.",
        price: "R$ 49,90",
        author: "Roberto Navarro",
        pages: 280,
        publishYear: 2023,
        isbn: "978-85-123456-78-9",
        purchaseLink: "https://sun.eduzz.com/956345",
        chapters: [
          "Controle emocional e financeiro",
          "Clareza financeira",
          "Ação e progresso",
          "Estratégias de investimento"
        ],
        highlights: [
          "Técnicas de coaching aplicadas às finanças",
          "Exercícios práticos para mudança de mindset",
          "Histórias reais de transformação",
          "Estratégias para criar riqueza"
        ]
      },
      'arte-de-enriquecer': {
        title: "A Arte de Enriquecer",
        subtitle: "Os segredos da prosperidade financeira",
        description: "Descubra os princípios atemporais da criação de riqueza e aprenda a aplicá-los em sua vida.",
        price: "R$ 59,90",
        author: "Roberto Navarro",
        pages: 320,
        publishYear: 2023,
        isbn: "978-85-123456-79-0",
        purchaseLink: "https://sun.eduzz.com/956345",
        chapters: [
          "Os degraus da liberdade financeira",
          "Enriquecer é uma ciência",
          "Aplicação prática do conhecimento",
          "Construindo patrimônio sólido"
        ],
        highlights: [
          "Metodologia comprovada de enriquecimento",
          "Casos de sucesso reais",
          "Estratégias práticas e aplicáveis",
          "Mindset do investidor de sucesso"
        ]
      }
    }
    
    return defaults[slug] || defaults['coaching-financeiro']
  }

  const data = bookData || getDefaultData(slug)

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <div className="my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ''}
            width={600}
            height={300}
            className="rounded-lg mx-auto"
          />
        </div>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-yellow-500">{children}</strong>,
    },
    block: {
      h2: ({ children }: any) => <h2 className="text-2xl font-bold mb-4 text-yellow-500">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-semibold mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-yellow-500 pl-6 my-6 text-lg italic text-gray-300">
          {children}
        </blockquote>
      ),
    },
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollAnimation animation="fadeInLeft">
                <SectionBadge text="Livro" className="mb-6" />
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  {data.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  {data.subtitle}
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  {data.description}
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInLeft" animationDelay="200ms">
                <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
                  <div>Por <span className="text-yellow-500 font-semibold">{data.author}</span></div>
                  <div>•</div>
                  <div>{data.pages} páginas</div>
                  <div>•</div>
                  <div>{data.publishYear}</div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInLeft" animationDelay="400ms">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-3xl font-bold text-yellow-500">
                    {data.price}
                  </div>
                  <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                    Disponível agora
                  </Badge>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInLeft" animationDelay="600ms">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Link href={data.purchaseLink} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Comprar Agora
                  </Link>
                </Button>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="fadeInRight">
              <div className="relative">
                {data.coverImage ? (
                  <div className="relative h-96 lg:h-[600px] w-full max-w-md mx-auto">
                    <Image
                      src={urlFor(data.coverImage).url()}
                      alt={`Capa do livro ${data.title}`}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                ) : (
                  <div className="relative h-96 lg:h-[600px] w-full max-w-md mx-auto bg-gradient-to-b from-yellow-500 to-amber-600 rounded-lg shadow-2xl flex items-center justify-center">
                    <div className="text-center text-black p-8">
                      <BookOpen className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{data.title}</h3>
                      <p className="text-lg">{data.author}</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                O que você vai aprender
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Principais tópicos abordados no livro
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {data.chapters?.map((chapter: string, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-800 border-zinc-700 hover:border-yellow-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-yellow-500/10 rounded-full p-2 flex-shrink-0">
                        <span className="text-yellow-500 font-bold text-lg">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{chapter}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Por que ler este livro?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Principais benefícios e diferenciais
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.highlights?.map((highlight: string, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 150}ms`}>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500/10 rounded-full p-3">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-300">{highlight}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      {data.content && (
        <section className="py-20 bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="fadeInUp">
                <div className="prose prose-invert prose-lg max-w-none">
                  <PortableText
                    value={data.content}
                    components={portableTextComponents}
                  />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      )}

      {/* Author Quote Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-600/10 rounded-2xl border border-yellow-500/20 p-8 lg:p-12 text-center max-w-4xl mx-auto">
              <Quote className="h-12 w-12 text-yellow-500 mx-auto mb-6" />
              <blockquote className="text-xl lg:text-2xl font-medium mb-6 text-gray-300 leading-relaxed">
                &ldquo;Este livro é o resultado de anos de experiência ajudando pessoas a transformarem suas vidas financeiras. 
                Cada página contém estratégias práticas que realmente funcionam.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">RN</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-yellow-500">Roberto Navarro</div>
                  <div className="text-gray-400 text-sm">Autor e Coach Financeiro</div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Transforme sua vida financeira hoje
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Adquira seu exemplar e comece sua jornada rumo à liberdade financeira
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="text-4xl font-bold text-yellow-500">
                  {data.price}
                </div>
                <div className="text-gray-400">Disponível em formato digital e físico</div>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold text-xl px-12 py-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Link href={data.purchaseLink} target="_blank" rel="noopener noreferrer">
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Comprar Agora
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}