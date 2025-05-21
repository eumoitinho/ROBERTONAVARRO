import Image from "next/image"
import { Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  text: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    name: "João Silva",
    role: "Desenvolvedor Front-end",
    text: "O curso me proporcionou as ferramentas necessárias para alavancar minha carreira. A didática é excelente e os professores são muito atenciosos.",
    image: "/images/testimonial-1.jpg",
  },
  {
    name: "Maria Oliveira",
    role: "Designer UX/UI",
    text: "As aulas práticas e os projetos me deram a confiança para entrar no mercado de trabalho. Recomendo a todos que querem aprender de verdade.",
    image: "/images/testimonial-2.jpg",
  },
  {
    name: "Carlos Pereira",
    role: "Analista de Dados",
    text: "A mentoria individual foi fundamental para o meu desenvolvimento. Consegui um emprego na área logo após a conclusão do curso.",
    image: "/images/testimonial-3.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testemunhos" className="py-12 md:py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
            <span className="text-sm font-medium">DEPOIMENTOS</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            O que nossos <span className="text-yellow-400">alunos dizem</span>
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-sm md:text-base">
            Conheça as histórias de transformação de pessoas que já passaram pelos nossos programas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-4 md:p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg?height=100&width=100&query=person"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">{testimonial.name}</h3>
                  <p className="text-xs md:text-sm text-zinc-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm md:text-base">{testimonial.text}</p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
