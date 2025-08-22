"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Clock, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionBadge } from "@/components/section-badge"
import ScrollAnimation from "@/components/scroll-animation"
import { urlFor } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"

interface FormationPageContentProps {
  formationData?: any
  slug: string
}

export default function FormationPageContent({ formationData, slug }: FormationPageContentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fallback data if Sanity is not available
  const getDefaultData = (slug: string) => {
    const defaults: Record<string, any> = {
      'metodo-tf': {
        title: "Método TF - Transformação Financeira",
        subtitle: "O método mais completo para transformar sua vida financeira",
        description: "Descubra as estratégias que já transformaram a vida de mais de 1,5 milhão de pessoas.",
        price: "R$ 497,00",
        originalPrice: "R$ 997,00",
        ctaText: "Quero me Inscrever Agora",
        ctaLink: "#inscricao",
        features: [
          "12 módulos completos",
          "Acesso vitalício",
          "Certificado de conclusão",
          "Grupo VIP no WhatsApp",
          "Suporte especializado"
        ],
        benefits: [
          "Elimine suas dívidas de uma vez por todas",
          "Crie múltiplas fontes de renda",
          "Desenvolva o mindset milionário",
          "Aprenda a investir com segurança"
        ]
      },
      'mentor-coaching-financeiro': {
        title: "Mentor Coaching Financeiro",
        subtitle: "Mentoria personalizada para seu crescimento financeiro",
        description: "Acompanhamento individual com Roberto Navarro para acelerar seus resultados.",
        price: "R$ 1.997,00",
        originalPrice: "R$ 3.997,00",
        ctaText: "Quero Ser Mentorado",
        ctaLink: "#inscricao",
        features: [
          "6 meses de mentoria",
          "Sessões semanais individuais",
          "Plano personalizado",
          "Acesso direto ao mentor",
          "Grupo exclusivo de mentorados"
        ],
        benefits: [
          "Resultados 10x mais rápidos",
          "Estratégias personalizadas",
          "Acompanhamento semanal",
          "Rede de contatos exclusiva"
        ]
      }
    }
    
    return defaults[slug] || defaults['metodo-tf']
  }

  const data = formationData || getDefaultData(slug)

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <div className="my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ''}
            width={800}
            height={400}
            className="rounded-lg"
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
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-none space-y-2 mb-6">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-6">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
          <span className="text-gray-300">{children}</span>
        </li>
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
                <SectionBadge text="Formação Premium" className="mb-6" />
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  {data.title}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {data.subtitle}
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  {data.description}
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInLeft" animationDelay="200ms">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-right">
                    {data.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        De {data.originalPrice}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-yellow-500">
                      {data.price}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    ou 12x sem juros
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInLeft" animationDelay="400ms">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Link href={data.ctaLink}>
                    {data.ctaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="fadeInRight">
              <div className="relative">
                {data.heroImage ? (
                  <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(data.heroImage).url()}
                      alt={data.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-8 border border-yellow-500/20">
                    <div className="text-center">
                      <div className="bg-yellow-500/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <Star className="h-12 w-12 text-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Transformação Garantida</h3>
                      <p className="text-gray-300">
                        Metodologia comprovada por mais de 1,5 milhão de alunos
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                O que você vai receber
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Tudo que você precisa para transformar sua vida financeira
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features?.map((feature: string, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-800 border-zinc-700 hover:border-yellow-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Resultados que você vai conquistar
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Transformações reais na sua vida financeira
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.benefits?.map((benefit: string, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 150}ms`}>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500/10 rounded-full p-3">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-300">{benefit}</p>
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-600/10 rounded-2xl border border-yellow-500/20 p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Pronto para transformar sua vida financeira?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Junte-se aos milhares de alunos que já transformaram suas vidas
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="text-center">
                  {data.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      De {data.originalPrice}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-yellow-500">
                    {data.price}
                  </div>
                  <div className="text-gray-400">ou 12x sem juros</div>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold text-xl px-12 py-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Link href={data.ctaLink}>
                  {data.ctaText}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}