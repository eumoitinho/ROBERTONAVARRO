"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, Users, BookOpen, Video, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionBadge } from "@/components/section-badge"
import ScrollAnimation from "@/components/scroll-animation"
import { urlFor } from "@/sanity/lib/client"

interface HomePageContentProps {
  homePageData?: any
  siteSettings?: any
}

export default function HomePageContent({ homePageData, siteSettings }: HomePageContentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fallback data if Sanity is not available
  const defaultData = {
    hero: {
      title: "Transforme sua Vida Financeira",
      subtitle: "com Roberto Navarro",
      description: "Descubra como milhares de pessoas estão conquistando sua liberdade financeira através de metodologias comprovadas e mentoria especializada.",
      ctaText: "Comece Sua Transformação",
      ctaLink: "#formacoes",
      backgroundImage: null,
      stats: [
        { number: "+1,5 milhões", label: "de alunos" },
        { number: "1280", label: "técnicas exclusivas" },
        { number: "5", label: "livros publicados" },
        { number: "+500", label: "vídeos inspiradores" }
      ]
    },
    aboutSection: {
      title: "Quem é Roberto Navarro",
      description: "Coach financeiro, mentor e escritor especializado em transformação de mindset financeiro e estratégias de enriquecimento.",
      highlights: [
        "Mais de 15 anos de experiência",
        "Coach certificado internacionalmente", 
        "Autor de 5 bestsellers",
        "Palestrante renomado"
      ]
    },
    formations: [
      {
        title: "Método TF",
        description: "Transformação Financeira completa",
        price: "R$ 497",
        link: "/formacoes/metodo-tf"
      },
      {
        title: "Mentor Coaching Financeiro",
        description: "Mentoria personalizada para seu crescimento",
        price: "R$ 1.997",
        link: "/formacoes/mentor-coaching-financeiro"
      }
    ]
  }

  const data = homePageData || defaultData
  const settings = siteSettings || { title: "Roberto Navarro", description: "Educação Financeira" }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {data.hero.backgroundImage ? (
            <Image
              src={urlFor(data.hero.backgroundImage).url()}
              alt="Hero Background"
              fill
              className="object-cover opacity-30"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <ScrollAnimation animation="fadeInUp" className="mb-8">
            <SectionBadge text="Educação Financeira Premium" />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" animationDelay="200ms">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {data.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                {data.hero.subtitle}
              </span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" animationDelay="400ms">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {data.hero.description}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" animationDelay="600ms">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Link href={data.hero.ctaLink}>
                  {data.hero.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>

          {/* Stats */}
          {data.hero.stats && (
            <ScrollAnimation animation="fadeInUp" animationDelay="800ms">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {data.hero.stats.map((stat: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="quem-somos" className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fadeInLeft">
              <div>
                <SectionBadge text="Sobre o Mentor" className="mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {data.aboutSection.title}
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {data.aboutSection.description}
                </p>
                
                {data.aboutSection.highlights && (
                  <ul className="space-y-3 mb-8">
                    {data.aboutSection.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Star className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight">
              <div className="relative">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/roberto-navarro-mentor.jpg"
                    alt="Roberto Navarro"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section id="formacoes" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fadeInUp">
              <SectionBadge text="Nossas Formações" className="mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Escolha sua Jornada de Transformação
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Programas desenvolvidos para acelerar sua evolução financeira
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.formations.map((formation: any, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 200}ms`}>
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 group">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-500 transition-colors">
                    {formation.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {formation.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-500">
                      {formation.price}
                    </span>
                    <Button asChild variant="outline" className="group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                      <Link href={formation.link}>
                        Saiba Mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}