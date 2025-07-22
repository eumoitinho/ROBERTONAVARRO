import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TestimonialsSection() {
  return (
    <section id="testemunhos" className="py-12 md:py-20 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-500/5 via-transparent to-amber-500/5"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
            <span className="text-sm font-medium">DEPOIMENTOS</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            O QUE NOSSO <span className="text-yellow-400">ALUNOS DIZEM</span>
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-sm md:text-base">
            Conheça as histórias de transformação de pessoas que já passaram pelos nossos programas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Testimonial 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-zinc-900/60 backdrop-blur-lg border border-zinc-800/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-yellow-500/50 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-t-3xl"></div>

              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-yellow-400 opacity-50" />
              </div>

              {/* Profile section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">A</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Ana Souza</h3>
                  <p className="text-sm text-zinc-400">Empresária</p>
                </div>
              </div>

              {/* Testimonial text */}
              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                "Eu estava completamente endividada, sem esperança de sair do vermelho. O método do Roberto me ajudou
                a organizar minhas finanças, quitar dívidas e voltar a sonhar. Hoje tenho controle e paz financeira!"
              </p>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-zinc-900/60 backdrop-blur-lg border border-zinc-800/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-yellow-500/50 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-t-3xl"></div>

              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-yellow-400 opacity-50" />
              </div>

              {/* Profile section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">J</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">José Lima</h3>
                  <p className="text-sm text-zinc-400">Professor</p>
                </div>
              </div>

              {/* Testimonial text */}
              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                "Sempre achei impossível sair das dívidas do cartão. Com as orientações do Roberto, consegui
                renegociar tudo, criar uma reserva e até investir. Minha vida mudou completamente."
              </p>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-zinc-900/60 backdrop-blur-lg border border-zinc-800/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-yellow-500/50 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-t-3xl"></div>

              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-yellow-400 opacity-50" />
              </div>

              {/* Profile section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">P</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Patrícia Gomes</h3>
                  <p className="text-sm text-zinc-400">Autônoma</p>
                </div>
              </div>

              {/* Testimonial text */}
              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                "O Roberto me mostrou que é possível recomeçar. Saí do sufoco das dívidas, aprendi a gastar com
                consciência e hoje ajudo minha família a ter uma vida mais tranquila."
              </p>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-zinc-400 mb-6">Junte-se a milhares de pessoas que já transformaram suas vidas</p>
          <Button
            asChild
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 hover:scale-105"
          >
            <a href="#inscricao">
              COMECE SUA TRANSFORMAÇÃO <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
