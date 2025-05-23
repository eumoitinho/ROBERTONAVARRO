import NextImage from "next/image";
import { SectionBadge } from "@/components/section-badge";

const notableParticipants = [
  {
    name: "Alfredo Soares",
    role: "Autoridade em vendas e autor best-seller",
    image: "/images/alfredo-soares.webp",
    testimonial: "Uma experiência transformadora que mudou minha visão sobre dinheiro e negócios.",
  },
  {
    name: "Tiago Brunet",
    role: "Referência em treinamento de líderes e espiritualidade",
    image: "/images/tiago-brunet.webp",
    testimonial: "Roberto tem um dom único de unir princípios espirituais e financeiros de forma prática.",
  },
  {
    name: "Flávio Prado",
    role: "Jornalista esportivo que já cobriu 10 Copas do Mundo",
    image: "/images/flavio-prado.webp",
    testimonial: "Aprendi mais sobre finanças em um dia do que em anos de leituras e cursos.",
  },
  {
    name: "Pyong Lee",
    role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
    image: "/images/pyong-lee.webp",
    testimonial: "Uma metodologia que realmente funciona e transforma a mentalidade sobre dinheiro.",
  },
];

export default function NotableParticipants() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-900/95 to-zinc-900/95"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <SectionBadge text="PARTICIPANTES" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
            JÁ PASSARAM POR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">NOSSOS TREINAMENTOS</span>
          </h2>
          <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
            Conheça algumas personalidades que já participaram dos nossos eventos
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {notableParticipants.map((person, index) => (
            <div
              key={index}
              className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-400/10 group"
            >
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="p-6">
                <div className="relative h-48 mb-6 overflow-hidden rounded-2xl">
                  <NextImage
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{person.name}</h3>
                <p className="text-zinc-300 mb-4 leading-relaxed">{person.role}</p>
                <div className="bg-zinc-800/40 rounded-2xl p-4 border border-zinc-700/30">
                  <p className="text-sm text-zinc-300 italic leading-relaxed">"{person.testimonial}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}