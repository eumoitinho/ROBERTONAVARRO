"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlowEffect from "@/components/glow-effect"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  videoId?: string
  imageSrc?: string
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Fabio Santos",
      role: "Empresário",
      content:
        "O método do Roberto transformou completamente minha vida financeira. Em apenas 3 meses, consegui juntar meus primeiros R$10.000 e iniciar meu próprio negócio.",
      rating: 5,
      videoId: "4aYDKJQBnRw",
    },
    {
      id: 2,
      name: "Clelio Ferreira",
      role: "Investidor",
      content:
        "Participar do ICF foi a melhor decisão que tomei. Aprendi estratégias práticas que me ajudaram a sair das dívidas e começar a construir patrimônio.",
      rating: 5,
      videoId: "W6rBTJKeJ4w",
    },
    {
      id: 3,
      name: "Wagner Jovino",
      role: "Empreendedor",
      content:
        "Graças ao Roberto, consegui mudar minha mentalidade sobre dinheiro. Hoje tenho múltiplas fontes de renda e liberdade financeira para viver do meu jeito.",
      rating: 5,
      videoId: "yTELcwYTsnU",
    },
    {
      id: 4,
      name: "Rodrigo Almeida",
      role: "Profissional Liberal",
      content:
        "O programa Despertar Milionário me deu as ferramentas que eu precisava para organizar minhas finanças e começar a investir. Recomendo a todos!",
      rating: 5,
      videoId: "4aYDKJQBnRw",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState<number | null>(null)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="depoimentos" className="py-12 xs:py-10 sm:py-16 bg-zinc-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
            <span className="text-sm font-medium text-yellow-400">DEPOIMENTOS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Faça parte você também das nossas <span className="text-yellow-400">transformações</span>
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
            Conheça algumas das vidas transformadas por meio do nosso programa. Eles começaram como você, e hoje estão
            conquistando seus sonhos e alcançando a liberdade financeira. Veja como o nosso método pode fazer a diferença
            na sua vida também!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-4 sm:gap-8 max-w-6xl mx-auto">
          {/* Video Testimonials */}
          <div className="md:col-span-2 bg-black p-6 rounded-xl border border-zinc-800 animate-on-scroll fade-in-left">
            <h4 className="text-xl font-semibold mb-6 text-yellow-400">Veja o que nossos alunos dizem</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {testimonials.map((testimonial, index) => (
                <GlowEffect
                  key={testimonial.id}
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className="w-full h-full relative"
                    onClick={() => setShowVideo(index)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`}
                      alt={`Thumbnail do depoimento de ${testimonial.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors duration-300">
                      <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-300 transition-colors">
                        <ChevronRight className="w-7 h-7 text-black ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                      <p className="text-sm font-medium text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </GlowEffect>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400/20 hover:text-yellow-300 transition-colors duration-300"
            >
              Ver Todos os Depoimentos
            </Button>
          </div>

          {/* Text Testimonials */}
          <div className="bg-black p-6 rounded-xl border border-zinc-800 animate-on-scroll fade-in-right">
            <div className="relative h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-yellow-400">Depoimentos de Alunos</h4>
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-1 rounded-full bg-zinc-800 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-1 rounded-full bg-zinc-800 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-4">
                  <p className="text-lg italic text-zinc-200 mb-4">"{testimonials[activeIndex].content}"</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-lg">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-gray-400">{testimonials[activeIndex].role}</p>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-yellow-400" : "bg-zinc-700"} transition-colors duration-300`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

         {/* Video Modal */}
        {showVideo !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl">
              <button
                onClick={() => setShowVideo(null)}
                className="absolute top-4 right-4 text-white hover:text-yellow-400 text-lg font-medium bg-zinc-900/80 px-4 py-2 rounded-lg shadow-lg z-10"
                aria-label="Fechar vídeo"
              >
                Sair
              </button>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${testimonials[showVideo].videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`Depoimento de ${testimonials[showVideo].name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}