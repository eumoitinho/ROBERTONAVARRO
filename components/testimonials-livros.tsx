import { Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ImageProps = {
  src: string
  alt?: string
}

type Testimonial = {
  quote?: string
  testimonial?: string
  avatar?: ImageProps
  photo?: { url?: string }
  name: string
  role?: string
  company?: string
  numberOfStars?: number
  rating?: number
}

type Props = {
  badgeText?: string
  heading: string
  description: string
  testimonials: Testimonial[] | any[]
  accentColor?: 'gold' | 'red' | 'green' | 'orange' | 'blue'
}

const colorSchemes = {
  gold: {
    hoverBorder: 'hover:border-yellow-500/50',
    starFill: 'fill-yellow-400 text-yellow-400',
  },
  red: {
    hoverBorder: 'hover:border-red-500/50',
    starFill: 'fill-red-400 text-red-400',
  },
  green: {
    hoverBorder: 'hover:border-emerald-500/50',
    starFill: 'fill-emerald-400 text-emerald-400',
  },
  orange: {
    hoverBorder: 'hover:border-orange-500/50',
    starFill: 'fill-orange-400 text-orange-400',
  },
  blue: {
    hoverBorder: 'hover:border-cyan-500/50',
    starFill: 'fill-cyan-400 text-cyan-400',
  },
}

export const TestimonialsLivros = ({
  badgeText = "DEPOIMENTOS",
  heading,
  description,
  testimonials,
  accentColor = 'gold'
}: Props) => {
  const colors = colorSchemes[accentColor] || colorSchemes.gold

  // Normaliza os testimonials vindos do Payload
  const normalizedTestimonials = testimonials.map((t: any) => {
    // Se é um relacionamento do Payload, pode vir com .value
    const data = t.value || t
    return {
      name: data.name || 'Leitor Verificado',
      quote: data.quote || data.testimonial || '',
      role: data.role || data.company || 'Leitor Verificado',
      numberOfStars: data.numberOfStars || data.rating || 5,
      avatar: data.avatar || (data.photo?.url ? { src: data.photo.url } : null),
    }
  }).filter((t: any) => t.quote)

  if (normalizedTestimonials.length === 0) return null

  return (
    <section id="depoimentos" className="py-20 relative bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
            <span className="text-sm font-medium">{badgeText}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{heading}</h2>
          <p className="text-zinc-300 max-w-3xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {normalizedTestimonials.map((testimonial: any, index: number) => (
            <div
              key={index}
              className={cn(
                "flex w-full flex-col items-start justify-between border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1",
                colors.hoverBorder
              )}
            >
              <div className="mb-5 flex md:mb-6">
                {Array(testimonial.numberOfStars || 5)
                  .fill(null)
                  .map((_, starIndex) => (
                    <Star key={starIndex} className={cn("mr-1 size-5", colors.starFill)} />
                  ))}
              </div>
              <blockquote className="text-zinc-300 md:text-md flex-grow">{testimonial.quote}</blockquote>
              <div className="mt-5 flex w-full items-center pt-5 border-t border-zinc-800 md:mt-6">
                <Image
                  src={testimonial.avatar?.src || "/placeholder.svg"}
                  alt={testimonial.avatar?.alt || testimonial.name}
                  width={48}
                  height={48}
                  className="size-12 min-h-12 min-w-12 rounded-full object-cover md:mr-4"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-zinc-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
