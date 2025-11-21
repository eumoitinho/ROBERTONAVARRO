import Image from "next/image";
import { Star, Quote, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TestimonialData = {
  id?: string;
  name?: string;
  role?: string;
  testimonial?: string;
  rating?: number;
  photo?: {
    url?: string;
  };
};

interface TestimonialsSectionProps {
  badgeText?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
  testimonials?: TestimonialData[];
  cta?: {
    label?: string;
    href?: string;
    newTab?: boolean;
  };
}

const fallbackTestimonials: TestimonialData[] = [
  {
    name: "Ana Souza",
    role: "Empresária",
    testimonial:
      "Eu estava completamente endividada, sem esperança de sair do vermelho. O método do Roberto me ajudou a organizar minhas finanças, quitar dívidas e voltar a sonhar. Hoje tenho controle e paz financeira!",
    rating: 5,
  },
  {
    name: "José Lima",
    role: "Professor",
    testimonial:
      "Sempre achei impossível sair das dívidas do cartão. Com as orientações do Roberto, consegui renegociar tudo, criar uma reserva e até investir. Minha vida mudou completamente.",
    rating: 5,
  },
  {
    name: "Patrícia Gomes",
    role: "Autônoma",
    testimonial:
      "O Roberto me mostrou que é possível recomeçar. Saí do sufoco das dívidas, aprendi a gastar com consciência e hoje ajudo minha família a ter uma vida mais tranquila.",
    rating: 5,
  },
];

export function TestimonialsSection({
  badgeText = "DEPOIMENTOS",
  title = "O QUE NOSSO",
  highlightedText = "ALUNOS DIZEM",
  description = "Conheça as histórias de transformação de pessoas que já passaram pelos nossos programas.",
  testimonials,
  cta = {
    label: "COMECE SUA TRANSFORMAÇÃO",
    href: "#inscricao",
  },
}: TestimonialsSectionProps = {}) {
  const testimonialItems = (testimonials?.length ? testimonials : fallbackTestimonials).slice(0, 6);
  const buttonLabel = cta?.label || "COMECE SUA TRANSFORMAÇÃO";
  const buttonHref = cta?.href || "#inscricao";
  const buttonNewTab = cta?.newTab ?? false;

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
            <span className="text-sm font-medium">{badgeText}</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {title} <span className="text-yellow-400">{highlightedText}</span>
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-sm md:text-base">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonialItems.map((testimonial, index) => {
            const rating = Math.max(1, Math.min(5, testimonial.rating ?? 5));
            const initials = testimonial.name
              ? testimonial.name
                  .split(" ")
                  .map((part) => part.charAt(0))
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "RN";

            return (
              <div key={testimonial.id ?? index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-zinc-900/60 backdrop-blur-lg border border-zinc-800/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-yellow-500/50 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-t-3xl"></div>

                  {/* Quote icon */}
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-yellow-400 opacity-50" />
                  </div>

                  {/* Profile section */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center overflow-hidden">
                      {testimonial.photo?.url ? (
                        <Image
                          src={testimonial.photo.url}
                          alt={testimonial.name ?? "Foto do depoimento"}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          {testimonial.name ? (
                            <span className="text-black font-bold text-xl">{initials}</span>
                          ) : (
                            <User className="h-6 w-6 text-black" />
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{testimonial.name ?? "Cliente satisfeito"}</h3>
                      {testimonial.role && <p className="text-sm text-zinc-400">{testimonial.role}</p>}
                    </div>
                  </div>

                  {/* Testimonial text */}
                  <p className="text-zinc-300 text-base leading-relaxed mb-6">
                    &ldquo;{testimonial.testimonial ?? ""}&rdquo;
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-zinc-400 mb-6">Junte-se a milhares de pessoas que já transformaram suas vidas</p>
          <Button
            asChild
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 hover:scale-105"
          >
            <a
              href={buttonHref}
              {...(buttonNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {buttonLabel} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
