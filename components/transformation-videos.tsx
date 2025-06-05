"use client"

import { useState } from "react"
import NextImage from "next/image"
import { SectionBadge } from "@/components/section-badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play, ArrowRight, Star, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

// Updated transformation videos with culturally appropriate Brazilian names
const transformationVideos = [

  // New videos added
  {
    id: "sVcR5iq1BG0",
    title: "Estudo de Caso Fabio Santos - ICF",
    person: "Fabio Santos",
    thumbnail: "http://img.youtube.com/vi/sVcR5iq1BG0/maxresdefault.jpg",
    description: "Relato de transformação financeira com o Instituto Coaching Financeiro.",
  },
  {
    id: "AyjH3rNe37M",
    title: "Estudo de Caso Clelio - ICF",
    person: "Clelio",
    thumbnail: "http://img.youtube.com/vi/AyjH3rNe37M/maxresdefault.jpg",
    description: "História de superação e sucesso com o Instituto Coaching Financeiro.",
  },
  {
    id: "pmbpDqpkK78",
    title: "Estudo de Caso Wagner Jovino - ICF",
    person: "Wagner Jovino",
    thumbnail: "http://img.youtube.com/vi/pmbpDqpkK78/maxresdefault.jpg",
    description: "Transformação financeira e pessoal com o Instituto Coaching Financeiro.",
  },
  {
    id: "7N97LDt9F5Y",
    title: "Estudo de Caso Rodrigo - ICF",
    person: "Rodrigo",
    thumbnail: "http://img.youtube.com/vi/7N97LDt9F5Y/maxresdefault.jpg",
    description: "Como Rodrigo transformou sua vida financeira com o ICF.",
  },
  {
    id: "FUkJWtmjGtM",
    title: "Depoimento João Leles - ICF",
    person: "João Leles",
    thumbnail: "http://img.youtube.com/vi/FUkJWtmjGtM/maxresdefault.jpg",
    description: "Depoimento sobre a experiência com o Instituto Coaching Financeiro.",
  },
  {
    id: "Jyokxvo-WOo",
    title: "Depoimento Ricardo - ICF",
    person: "Ricardo",
    thumbnail: "http://img.youtube.com/vi/Jyokxvo-WOo/maxresdefault.jpg",
    description: "Relato de transformação financeira com o Instituto Coaching Financeiro.",
  },
  {
    id: "GQVv0wnK4So",
    title: "Como Roosevelt transformou sua vida financeira - ICF",
    person: "Roosevelt",
    thumbnail: "http://img.youtube.com/vi/GQVv0wnK4So/maxresdefault.jpg",
    description: "História de sucesso com o Instituto Coaching Financeiro.",
  },
  {
    id: "kfZ-hck8bJI",
    title: "Depoimentos - Instituto Coaching Financeiro - ICF",
    person: "Vários Participantes",
    thumbnail: "http://img.youtube.com/vi/kfZ-hck8bJI/maxresdefault.jpg",
    description: "Compilado de depoimentos sobre o impacto do Instituto Coaching Financeiro.",
  },
    {
    id: "4aYDKJQBnRw",
    title: "Como superei minhas dívidas em 6 meses",
    person: "Carlos Eduardo Silva",
    thumbnail: "/images/video-thumb-1.png",
    description:
      "De R$45 mil em dívidas a investidor em apenas 6 meses aplicando os princípios das Crenças da Riqueza.",
  },
  {
    id: "yTELcwYTsnU",
    title: "Minha jornada de funcionário a empresário",
    person: "João Gabriel Pereira",
    thumbnail: "/images/video-thumb-2.png",
    description:
      "Abandonei o medo e a zona de conforto para empreender e hoje tenho liberdade financeira e geográfica.",
  },
  {
    id: "W6rBTJKeJ4w",
    title: "Como multipliquei meu patrimônio",
    person: "Roberto Ferreira Mendes",
    thumbnail: "/images/video-thumb-3.png",
    description:
      "Aprendi a fazer o dinheiro trabalhar para mim e multipliquei meu patrimônio em 3x em apenas 18 meses.",
  },
];

export default function TransformationVideos() {
  // State to track which video is playing
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideo(videoId)
  }

  return (
    <section id="depoimentos" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <SectionBadge text="TRANSFORMAÇÃO REAL" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-white">
            VEJA COMO NOSSOS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
              ALUNOS TRANSFORMARAM
            </span>{" "}
           SUAS VIDAS FINANCEIRAS
          </h2>
          <p className="text-zinc-300 max-w-4xl mx-auto text-base md:text-lg leading-relaxed mb-12">
            Histórias reais de pessoas que aplicaram os princípios das Crenças da Riqueza e mudaram completamente sua relação com o dinheiro.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {transformationVideos.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="h-full">
                    <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10 h-full flex flex-col">
                     {/* Video/Thumbnail Area */}
                      <div className="relative aspect-video cursor-pointer group">
                        {playingVideo === video.id ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                            title={video.title}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <>
                            <NextImage
                              src={`http://img.youtube.com/vi/${video.id}/0.jpg`}
                              alt={video.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div
                              className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all"
                              onClick={() => handlePlayVideo(video.id)}
                            >
                              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-yellow-400/50">
                                <Play className="h-8 w-8 text-black ml-1" />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/* Video Info */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-2">
                          <span className="bg-yellow-400/20 text-yellow-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            História de Sucesso
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{video.title}</h3>
                        <p className="text-yellow-400 text-sm mb-3">{video.person}</p>
                        <p className="text-zinc-300 text-sm leading-relaxed flex-grow">{video.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-1/2 bg-zinc-900/80 border-zinc-700/50 hover:bg-zinc-800 text-white" />
              <CarouselNext className="right-0 translate-x-1/2 bg-zinc-900/80 border-zinc-700/50 hover:bg-zinc-800 text-white" />
            </div>
          </Carousel>
        </div>

        {/* Stats Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/20 rounded-full p-2 flex-shrink-0">
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-400 mb-2">Resultados Comprovados</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Mais de 130 mil pessoas já passaram por nossas formações e transformaram sua relação com o dinheiro.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/20 rounded-full p-2 flex-shrink-0">
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-400 mb-2">Metodologia Exclusiva</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Uma abordagem única que integra inteligência financeira, emocional, espiritual e empresarial.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-400/20 rounded-full p-2 flex-shrink-0">
                <Brain className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-400 mb-2">Transformação Mental</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Reprogramação de crenças limitantes e desenvolvimento de uma mentalidade de prosperidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center px-4 sm:px-0">
          <Button
            asChild
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
          >
            <a href="#inscricao">
              Transformar Minha Vida Financeira! <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
