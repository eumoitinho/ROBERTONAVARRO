"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import Logo from "@/components/logo"
import { useRouter } from "next/navigation"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TicketPurchaseForm } from "@/components/ticket-purchase-form"

export default function CrencasDaRiquezaPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const videoIds = ["4aYDKJQBnRw", "yTELcwYTsnU", "W6rBTJKeJ4w"]
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)

    // Add keyframe animation for fade-in effect
    const style = document.createElement("style")
    style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .cta-hover {
    transition: all 0.3s ease;
  }
  .cta-hover:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.3);
  }
  
  .cta-hover-subtle {
    transition: all 0.3s ease;
  }
  .cta-hover-subtle:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 15px -5px rgba(245, 158, 11, 0.2);
  }
`
    document.head.appendChild(style)

    // Set up YouTube API
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    // Set up intersection observer for video autoplay
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoSection = document.getElementById("video-section")
          if (videoSection) {
            const iframe = videoSection.querySelector("iframe")
            if (iframe && iframe.src.indexOf("autoplay=1") === -1) {
              iframe.src += "&autoplay=1"
            }
          }
        }
      })
    }, options)

    const videoSection = document.getElementById("video-section")
    if (videoSection) {
      observer.observe(videoSection)
    }

    return () => {
      if (videoSection) {
        observer.unobserve(videoSection)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <HeroPages
        title="CRENÇAS DA RIQUEZA"
        subtitle="Transformação mental"
        secondtitle="A riqueza começa na mente e se materializa nas decisões"
        description={`Desbloqueie seu potencial, supere crenças limitantes e alcance um novo patamar de liberdade financeira e realização pessoal.`}
        image="/images/HERO_CRENCAS.png"
        ctaText="GARANTA SUA VAGA!"
        ctaHref="#form"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
      />
      {/* Challenges Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE ESTÁ TE <span className="text-yellow-400">IMPEDINDO DE PROSPERAR</span> ESTÁ DENTRO DE VOCÊ
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Identifique os bloqueios mentais que estão limitando seu crescimento financeiro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                question: "Você trava na hora de tomar decisões financeiras importantes?",
                answer: "Aprenda a identificar e neutralizar crenças limitantes que afetam suas escolhas.",
              },
              {
                question: "Sente que está sempre correndo, mas sem sair do lugar?",
                answer: "Direcione sua energia com foco, clareza e propósito para crescer com consistência.",
              },
              {
                question: "Tem dificuldade em pensar grande e definir metas ousadas?",
                answer: "Comece a expandir sua mentalidade e enxergar oportunidades onde antes via riscos.",
              },
              {
                question: "Sabe que precisa mudar, mas não consegue dar o próximo passo?",
                answer: "Descubra o que está te bloqueando e como destravar seu potencial com técnicas práticas.",
              },
              {
                question: "Sente que algo te impede de alcançar a liberdade financeira?",
                answer: "Aprenda a destravar suas crenças de escassez e ressignifique sua relação com o dinheiro.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <h3 className="text-lg font-bold mb-4 text-white">{item.question}</h3>
                <p className="text-zinc-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <Image
                  src="/financial-mindset-workshop.png"
                  alt="Crenças da Riqueza"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 rounded-xl"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="text-sm font-medium">SOBRE O EVENTO</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                NÃO É SOBRE O QUANTO VOCÊ GANHA… <span className="text-yellow-400">É SOBRE COMO VOCÊ PENSA</span>
              </h2>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    O evento Crenças da Riqueza é uma imersão intensa de 10 horas com o especialista Roberto Navarro,
                    criada para empresários e profissionais que já perceberam que o maior obstáculo para crescer
                    financeiramente está dentro da própria mente.
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Durante um dia inteiro, você vai mergulhar em conceitos de inteligência emocional, financeira,
                    espiritual e empresarial para reprogramar a forma como pensa, sente e age em relação ao dinheiro.
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-zinc-300">
                    Esta não é uma formação comum. É uma virada de chave. Você sairá dessa imersão com uma nova visão
                    sobre prosperidade e munido (a) de ferramentas mentais precisas para acessar o próximo nível da sua
                    vida pessoal e profissional.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="mt-8 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base cta-hover"
              >
                <a href="#form">
                  QUERO PARTICIPAR AGORA! <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONTEÚDO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ VAI <span className="text-yellow-400">APRENDER</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Desenvolva as quatro inteligências essenciais para a prosperidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Inteligência emocional",
                description:
                  "Domine suas emoções e fortaleça sua confiança para tomar decisões claras e corajosas, mesmo diante de pressões e incertezas.",
                icon: "/emotional-intelligence-icon.png",
              },
              {
                title: "Inteligência financeira",
                description:
                  "Reescreva sua história com o dinheiro. Supere crenças negativas, aprenda as regras da prosperidade e construa sua segurança financeira com consistência.",
                icon: "/financial-intelligence-icon.png",
              },
              {
                title: "Inteligência espiritual",
                description:
                  "Alinhe sua mente e espírito com seu propósito de vida e descubra como viver com mais sentido, leveza e prosperidade.",
                icon: "/placeholder.svg?height=60&width=60&query=spiritual intelligence icon",
              },
              {
                title: "Inteligência empresarial",
                description:
                  "Adote o mindset dos empreendedores de sucesso. Saiba como identificar oportunidades, tomar decisões estratégicas e pensar grande, com ousadia e visão de futuro.",
                icon: "/placeholder.svg?height=60&width=60&query=business intelligence icon",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-zinc-800/80 rounded-2xl p-4">
                    <Image
                      src={item.icon || "/placeholder.svg"}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="w-12 h-12"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-yellow-400">{item.title}</h3>
                    <p className="text-zinc-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Participants Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PARTICIPANTES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              JÁ PASSARAM POR <span className="text-yellow-400">NOSSOS TREINAMENTOS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Conheça algumas personalidades que já participaram dos nossos eventos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alfredo Soares",
                role: "Autoridade em vendas e autor best-seller",
                image: "/professional-businessman-headshot.png",
              },
              {
                name: "Tiago Brunet",
                role: "Referência em treinamento de líderes e espiritualidade",
                image: "/placeholder.svg?height=300&width=300&query=professional man headshot",
              },
              {
                name: "Flávio Prado",
                role: "Jornalista esportivo que já cobriu 10 Copas do Mundo",
                image: "/placeholder.svg?height=300&width=300&query=sports journalist headshot",
              },
              {
                name: "Pyong Lee",
                role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
                image: "/placeholder.svg?height=300&width=300&query=asian influencer headshot",
              },
            ].map((person, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group"
              >
                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="p-6">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{person.name}</h3>
                  <p className="text-zinc-300 mb-6">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Mentors Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">MENTORES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">Especialistas que vão guiar sua jornada de transformação</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Roberto Navarro */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-400">
                    <Image
                      src="/professional-businessman-headshot.png"
                      alt="Roberto Navarro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-yellow-400">ROBERTO NAVARRO</h3>
                    <p className="text-zinc-300 italic mb-4">
                      De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-zinc-300">
                  <p>
                    Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de
                    escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua
                    família.
                  </p>
                  <p>
                    Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com
                    sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios
                    bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e
                    ação.
                  </p>
                  <p>
                    Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência
                    financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua
                    missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e
                    visão de futuro.
                  </p>
                </div>

                <Button
                  asChild
                  className="mt-8 w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 cta-hover"
                >
                  <a href="#form">GARANTA SUA VAGA!</a>
                </Button>
              </div>
            </div>

            {/* Raíssa Navarro */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-400">
                    <Image src="/professional-woman-headshot.png" alt="Raíssa Navarro" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-yellow-400">RAÍSSA NAVARRO</h3>
                    <p className="text-zinc-300 italic mb-4">
                      Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL).
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-zinc-300">
                  <p>
                    Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras autorizadas
                    a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.
                  </p>
                  <p>
                    Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching no
                    mundo e acumula mais de 10 anos em estudos sobre PNL e comportamento humano.
                  </p>
                  <p>
                    Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação emocional,
                    sempre com bom humor e energia elevada. Seus ensinamentos são uma chave para quem quer vencer o
                    medo, a procrastinação e o sentimento de incapacidade.
                  </p>
                </div>

                <Button
                  asChild
                  className="mt-8 w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 cta-hover"
                >
                  <a href="#form">GARANTA SUA VAGA!</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Purchase Section */}
      <section id="form" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">INSCRIÇÃO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GARANTA SEU <span className="text-yellow-400">INGRESSO AGORA MESMO!</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Escolha a opção que melhor se adapta às suas necessidades e transforme sua relação com o dinheiro
            </p>
          </div>

          {/* Enhanced Ticket Purchase Form */}
          <div className="max-w-5xl mx-auto">
            <TicketPurchaseForm eventId={1} eventName="Crenças da Riqueza" />
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-500/20 rounded-full p-4 mb-4">
                  <Calendar className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Data e Horário</h3>
                <p className="text-zinc-300">27 de Junho de 2025</p>
                <p className="text-zinc-300">Das 9h às 19h</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-500/20 rounded-full p-4 mb-4">
                  <MapPin className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Local</h3>
                <p className="text-zinc-300">Centro de Convenções</p>
                <p className="text-zinc-300">São Paulo, SP</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-500/20 rounded-full p-4 mb-4">
                  <Users className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Vagas Limitadas</h3>
                <p className="text-zinc-300">Apenas 300 vagas</p>
                <p className="text-zinc-300">Garanta a sua!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/">
              <Logo className="h-10 w-auto mb-4 md:mb-0" />
            </Link>
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Roberto Navarro Oficial. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
