"use client"

import Image from "next/image"
import { Users, Star, BookOpen, Video } from "lucide-react"
import { SectionBadge } from "./section-badge"

export default function QuemSomosSection() {
  return (
    <section id="quem-somos" className="py-12 xs:py-12 sm:py-16 md:py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ROBERTO_17.jpg"
          alt="Roberto Navarro"
          fill
          className="object-cover w-full h-full opacity-70" // Reduced opacity for better text contrast
          style={{
            objectPosition: "top",
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/90 to-transparent md:from-black/100 md:via-black/60 md:to-transparent"></div>
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 bg-repeat bg-[length:200px_200px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <SectionBadge text="MENTOR" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            CONHEÇA SEU <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">MENTOR</span> 
          </h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
            Especialista que vai guiar sua jornada de transformação
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          

          {/* Text and Stats */}
          <div className="flex flex-col gap-8">
            {/* Bio Text */}
            <div className="space-y-4 text-zinc-300 text-base md:text-lg leading-relaxed">
              <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/90 to-transparent rounded-full blur-3xl -z-10"></div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                <p>
                  Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente, trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                <p>
                  A virada em sua vida veio quando Roberto percebeu que havia um "vilão invisível" bloqueando sua prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 mt-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                <p>
                  Hoje, Roberto Navarro é reconhecido como o criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e emocional. Sua missão é transformar a vida financeira de 10 milhões de brasileiros e contribuir para a construção de um país rico e próspero.
                </p>
              </div>
            </div>

            {/* Statistics Badges */}
            <div className="w-full flex flex-col justify-end mt-8">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
                {[
                  { icon: <Users className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "300 Mil+", label: "Mentorados" },
                  { icon: <Star className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "1280", label: "Técnicas Exclusivas" },
                  { icon: <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "5", label: "Livros Publicados" },
                  { icon: <Video className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />, value: "100+", label: "Vídeos Inspiradores" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-500 hover:border-yellow-500/50 hover:-translate-y-1 opacity-0 translate-y-12 animate-[fadeInUp_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="bg-zinc-800 rounded-full p-2 md:p-3">{stat.icon}</div>
                      <div>
                        <p className="text-sm md:text-xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs md:text-sm text-zinc-400">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
