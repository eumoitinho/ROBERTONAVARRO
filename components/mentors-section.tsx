import Image from "next/image"
import { CheckCircle } from "lucide-react"
import GlowEffect from "./glow-effect"

export default function MentorsSection() {
  return (
    <section className="py-16 bg-zinc-900">
      <div className="container-custom">
        <h2 className="text-center mb-10 animate-on-scroll fade-in">
          CONHEÇA SEUS <span className="text-highlight">MENTORES</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Roberto Navarro */}
          <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                <Image src="/images/roberto-palestra.jpeg" alt="Roberto Navarro" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">Roberto Navarro</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente,
                  trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que
                  enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-xs">Criador do método LCF - Life Coaching Financeiro</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-xs">Maior Educador Financeiro do país</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-xs">Já impactou mais de 130.000 alunos em todo o Brasil</p>
                  </li>
                </ul>
              </div>
            </div>
          </GlowEffect>

          {/* Raissa Navarro */}
          <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group_18-1-1LHrdbJhcrEJFv1R5sItLA6gUXYbiw.webp"
                  alt="Raissa Navarro"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">Raissa Navarro</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Há quase 10 anos, Raissa Navarro é uma estudiosa de PNL e comportamento humano, sendo escolhida até
                  para compor a equipe de apoio do Tony Robbins!
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-xs">Faz parte da The Society of NLP</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-xs">Escolhida para compor a equipe de apoio do Tony Robbins</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-xs">Uma das poucas autorizadas a ensinar PNL de verdade no Brasil</p>
                  </li>
                </ul>
              </div>
            </div>
          </GlowEffect>
        </div>
      </div>
    </section>
  )
}
