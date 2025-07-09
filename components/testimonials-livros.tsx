import { Star } from "lucide-react"
import Image from "next/image"

type ImageProps = {
  src: string
  alt?: string
}

type Testimonial = {
  quote: string
  avatar: ImageProps
  name: string
  role: string
  numberOfStars: number
}

type Props = {
  heading: string
  description: string
  testimonials: Testimonial[]
}

export const TestimonialsLivros = ({ heading, description, testimonials }: Props) => {
  return (
    <section id="depoimentos" className="py-20 relative bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
            <span className="text-sm font-medium">DEPOIMENTOS</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{heading}</h2>
          <p className="text-zinc-300 max-w-3xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-between border border-zinc-800 bg-zinc-900/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-yellow-500/50 hover:-translate-y-1"
            >
              <div className="mb-5 flex md:mb-6">
                {Array(testimonial.numberOfStars)
                  .fill(null)
                  .map((_, starIndex) => (
                    <Star key={starIndex} className="mr-1 size-5 fill-yellow-400 text-yellow-400" />
                  ))}
              </div>
              <blockquote className="text-zinc-300 md:text-md flex-grow">"{testimonial.quote}"</blockquote>
              <div className="mt-5 flex w-full items-center pt-5 border-t border-zinc-800 md:mt-6">
                <Image
                  src={testimonial.avatar.src || "/placeholder.svg"}
                  alt={testimonial.avatar.alt || testimonial.name}
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
