"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Clock, Users, Check, Star, Trophy, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionBadge } from "@/components/section-badge"
import ScrollAnimation from "@/components/scroll-animation"
import { urlFor } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"

interface EventPageContentProps {
  eventData?: any
  slug: string
}

export default function EventPageContent({ eventData, slug }: EventPageContentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fallback data for each event
  const getDefaultData = (slug: string) => {
    const defaults: Record<string, any> = {
      'crencas-da-riqueza': {
        title: "Crenças da Riqueza",
        subtitle: "Transforme suas crenças limitantes em crenças de prosperidade",
        description: "Um evento transformador que vai reprogramar sua mente para a abundância e prosperidade.",
        date: "15 de Março de 2024",
        time: "19h às 22h",
        location: "São Paulo - SP",
        locationDetails: "Teatro Municipal - Av. Paulista, 1000",
        price: "R$ 197,00",
        originalPrice: "R$ 397,00",
        spots: 500,
        spotsAvailable: 127,
        ctaText: "Garantir Minha Vaga",
        ctaLink: "/inscricao",
        benefits: [
          "Identifique e elimine crenças limitantes sobre dinheiro",
          "Aprenda a reprogramar sua mente para a abundância",
          "Desenvolva uma mentalidade milionária",
          "Técnicas práticas de transformação mental",
          "Networking com pessoas de sucesso"
        ],
        agenda: [
          { time: "19:00", activity: "Abertura e boas-vindas" },
          { time: "19:30", activity: "Identificando crenças limitantes" },
          { time: "20:30", activity: "Reprogramação mental" },
          { time: "21:30", activity: "Plano de ação personalizado" },
          { time: "22:00", activity: "Encerramento e networking" }
        ],
        speaker: {
          name: "Roberto Navarro",
          role: "Coach Financeiro e Palestrante Internacional",
          bio: "Especialista em transformação financeira com mais de 15 anos de experiência."
        }
      },
      'energia-do-dinheiro': {
        title: "A Energia do Dinheiro",
        subtitle: "Aprenda a atrair prosperidade através da energia",
        description: "Descubra como a energia que você emana influencia diretamente sua vida financeira.",
        date: "22 de Março de 2024",
        time: "14h às 18h",
        location: "Rio de Janeiro - RJ",
        locationDetails: "Centro de Convenções - Copacabana",
        price: "R$ 297,00",
        originalPrice: "R$ 597,00",
        spots: 300,
        spotsAvailable: 89,
        ctaText: "Reservar Ingresso",
        ctaLink: "/inscricao",
        benefits: [
          "Entenda a relação entre energia e dinheiro",
          "Técnicas de alinhamento energético",
          "Limpeza de bloqueios financeiros",
          "Ativação da prosperidade",
          "Meditações guiadas"
        ],
        agenda: [
          { time: "14:00", activity: "Check-in e welcome coffee" },
          { time: "14:30", activity: "A ciência da energia financeira" },
          { time: "15:30", activity: "Limpeza energética" },
          { time: "16:30", activity: "Ativação da abundância" },
          { time: "17:30", activity: "Ritual de prosperidade" }
        ],
        speaker: {
          name: "Roberto Navarro",
          role: "Mentor de Prosperidade",
          bio: "Autor de 5 livros sobre educação financeira e desenvolvimento pessoal."
        }
      },
      'escalador-de-negocios': {
        title: "Escalador de Negócios",
        subtitle: "Multiplique seus resultados em 90 dias",
        description: "Sistema comprovado para escalar seu negócio e multiplicar seus lucros.",
        date: "5 de Abril de 2024",
        time: "9h às 18h",
        location: "São Paulo - SP",
        locationDetails: "Hotel Unique - Av. Brigadeiro Luís Antônio",
        price: "R$ 997,00",
        originalPrice: "R$ 1.997,00",
        spots: 200,
        spotsAvailable: 43,
        ctaText: "Quero Escalar Meu Negócio",
        ctaLink: "/inscricao",
        benefits: [
          "Sistema de escalada em 5 passos",
          "Automação de processos",
          "Estratégias de vendas avançadas",
          "Gestão financeira eficiente",
          "Plano de 90 dias personalizado"
        ],
        agenda: [
          { time: "09:00", activity: "Diagnóstico do negócio" },
          { time: "10:30", activity: "Sistema de escalada" },
          { time: "12:00", activity: "Almoço networking" },
          { time: "14:00", activity: "Automação e processos" },
          { time: "16:00", activity: "Plano de ação 90 dias" },
          { time: "17:30", activity: "Q&A e encerramento" }
        ],
        speaker: {
          name: "Roberto Navarro",
          role: "Estrategista de Negócios",
          bio: "Ajudou mais de 5.000 empresários a escalar seus negócios."
        }
      },
      'segredos-da-mente-milionaria': {
        title: "Segredos da Mente Milionária",
        subtitle: "Desenvolva o mindset dos grandes milionários",
        description: "Evento baseado nos princípios que transformaram pessoas comuns em milionários.",
        date: "12 de Abril de 2024",
        time: "19h às 23h",
        location: "Brasília - DF",
        locationDetails: "Centro de Convenções Ulysses Guimarães",
        price: "R$ 397,00",
        originalPrice: "R$ 797,00",
        spots: 1000,
        spotsAvailable: 312,
        ctaText: "Inscrever-se Agora",
        ctaLink: "/inscricao",
        benefits: [
          "17 arquivos de riqueza",
          "Reprogramação do modelo financeiro",
          "Hábitos dos milionários",
          "Estratégias de investimento",
          "Mentalidade de abundância"
        ],
        agenda: [
          { time: "19:00", activity: "Abertura especial" },
          { time: "19:30", activity: "Os 17 arquivos de riqueza" },
          { time: "20:30", activity: "Reprogramação mental" },
          { time: "21:30", activity: "Plano milionário" },
          { time: "22:30", activity: "Sessão de perguntas" }
        ],
        speaker: {
          name: "Roberto Navarro",
          role: "Especialista em Mindset Milionário",
          bio: "Formou mais de 1,5 milhão de alunos em educação financeira."
        }
      }
    }
    
    return defaults[slug] || defaults['crencas-da-riqueza']
  }

  const data = eventData || getDefaultData(slug)

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
    }
  }

  const spotsPercentage = data.spotsAvailable && data.spots 
    ? Math.round((data.spotsAvailable / data.spots) * 100)
    : 25

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation animation="fadeInUp">
              <SectionBadge text="Evento Presencial" className="mb-6" />
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                {data.subtitle}
              </p>
              <p className="text-lg text-gray-400 mb-8">
                {data.description}
              </p>
            </ScrollAnimation>

            {/* Event Details */}
            <ScrollAnimation animation="fadeInUp" animationDelay="200ms">
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-5 w-5 text-yellow-500" />
                  <span>{data.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span>{data.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                  <span>{data.location}</span>
                </div>
              </div>
            </ScrollAnimation>

            {/* Spots Available */}
            {data.spotsAvailable && (
              <ScrollAnimation animation="fadeInUp" animationDelay="400ms">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
                    <Users className="h-5 w-5" />
                    <span className="font-semibold">
                      Apenas {data.spotsAvailable} vagas restantes!
                    </span>
                  </div>
                  <div className="bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-yellow-500 h-full transition-all duration-1000"
                      style={{ width: `${100 - spotsPercentage}%` }}
                    />
                  </div>
                </div>
              </ScrollAnimation>
            )}

            {/* Price & CTA */}
            <ScrollAnimation animation="fadeInUp" animationDelay="600ms">
              <div className="flex flex-col items-center gap-6">
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
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                O que você vai aprender
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Conteúdo exclusivo e transformador
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.benefits?.map((benefit: string, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-800 border-zinc-700 hover:border-yellow-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-500/10 rounded-full p-2 flex-shrink-0">
                        <Check className="h-5 w-5 text-yellow-500" />
                      </div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      {data.agenda && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fadeInUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Programação Completa
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Cronograma detalhado do evento
                </p>
              </div>
            </ScrollAnimation>

            <div className="max-w-3xl mx-auto">
              {data.agenda.map((item: any, index: number) => (
                <ScrollAnimation key={index} animation="fadeInLeft" animationDelay={`${index * 100}ms`}>
                  <div className="flex gap-4 mb-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-yellow-500/50 transition-colors">
                    <div className="text-yellow-500 font-bold text-lg min-w-[80px]">
                      {item.time}
                    </div>
                    <div className="text-gray-300">
                      {item.activity}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Speaker Section */}
      {data.speaker && (
        <section className="py-20 bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fadeInUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Seu Mentor
                </h2>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp">
              <div className="max-w-3xl mx-auto">
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-black text-4xl font-bold">
                        RN
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">{data.speaker.name}</h3>
                        <p className="text-yellow-500 mb-3">{data.speaker.role}</p>
                        <p className="text-gray-300">{data.speaker.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* Location Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Local do Evento
              </h2>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-xl text-gray-300 mb-2">
                  <MapPin className="h-6 w-6 text-yellow-500" />
                  <span>{data.location}</span>
                </div>
                {data.locationDetails && (
                  <p className="text-gray-400">{data.locationDetails}</p>
                )}
              </div>
            </div>
          </ScrollAnimation>
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

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-t from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Garanta sua vaga agora!
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Vagas limitadas. Não perca esta oportunidade única de transformação.
              </p>

              {data.spotsAvailable && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 max-w-md mx-auto">
                  <span className="text-red-400 font-semibold">
                    ⚠️ Restam apenas {data.spotsAvailable} vagas!
                  </span>
                </div>
              )}

              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  {data.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      De {data.originalPrice}
                    </div>
                  )}
                  <div className="text-5xl font-bold text-yellow-500 mb-2">
                    {data.price}
                  </div>
                  <div className="text-gray-400">Parcelamento em até 12x</div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold text-xl px-12 py-6 rounded-xl transition-all duration-300 hover:scale-105 animate-pulse"
                >
                  <Link href={data.ctaLink}>
                    {data.ctaText}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}