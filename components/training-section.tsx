import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrainingSection() {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container-custom">
        <h2 className="text-center mb-16 animate-on-scroll fade-in">
          NOSSAS <span className="text-highlight">FORMAÇÕES</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Despertar Milionário */}
          <div className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg_image_580-lY0cc5sPHGEH1UPsZMDhegCDaavXT9.webp"
                alt="Despertar Milionário"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">Despertar Milionário</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              O método perfeito para sair da inércia e alcançar 10 mil reais. Uma semana inteira com um plano para que
              você conquiste a verdadeira prosperidade.
            </p>
            <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/despertar-milionario">
                Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mentoria LCF */}
          <div className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in hover-lift card-hover">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_5-9EMd8Z38FOoaAQRvqYoNNaJZI3z6ZV.webp"
                alt="Mentoria LCF"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">Mentoria LCF</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              A imersão que vai transformar sua vida e garantir sua liberdade financeira. Aprenda a gerenciar suas
              finanças de maneira eficaz.
            </p>
            <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/mentoria">
                Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Segredos da Mente Milionária */}
          <div className="bg-black p-6 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <Image
                src="/images/logo-sem-fundo.webp"
                alt="Segredos da Mente Milionária"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">Segredos da Mente Milionária</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Desperte seu potencial para a riqueza. Uma imersão completa para transformar sua mentalidade e descobrir
              como pensar como os verdadeiros milionários.
            </p>
            <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/segredos-da-mente-milionaria">
                Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
