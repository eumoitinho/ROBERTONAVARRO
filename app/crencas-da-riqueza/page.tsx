"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import Logo from "@/components/logo"
import CountdownTimer from "@/components/countdown-timer"
import { useRouter } from "next/navigation"

export default function CrencasDaRiquezaPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const videoIds = ["4aYDKJQBnRw", "yTELcwYTsnU", "W6rBTJKeJ4w"]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          eventId: 1, // ID do evento "Crenças da Riqueza"
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao processar inscrição")
      }

      const data = await response.json()
      router.push(`/inscricao/confirmacao?ticket=${data.ticketCode}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao processar sua inscrição")
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?key=kg4rn"
            alt="Crenças da Riqueza"
            fill
            className="object-cover"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">Transformação mental</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  CRENÇAS DA RIQUEZA
                </span>
              </h1>

              <p className="text-xl text-zinc-300 mb-8 max-w-xl">
                A riqueza começa na mente e se materializa nas decisões
              </p>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Desbloqueie seu potencial, supere crenças limitantes e alcance um novo patamar de liberdade financeira e
                realização pessoal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base cta-hover"
                >
                  <a href="#form">GARANTA SUA VAGA!</a>
                </Button>
              </div>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  <span className="text-zinc-300">20 de maio</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  <span className="text-zinc-300">Alameda Araguaia, Alphaville - SP</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-yellow-400" />
                  <span className="text-zinc-300">Com Roberto e Raíssa Navarro</span>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">Próxima turma em:</h3>
                  <CountdownTimer targetDate={new Date("2025-05-20T09:00:00")} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Imersão intensiva de 10 horas</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Material exclusivo</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Certificado de participação</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Networking com empreendedores</p>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 cta-hover"
                >
                  <a href="#form">QUERO PARTICIPAR!</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  src="/placeholder.svg?key=tzrg3"
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
      <section className="py-20 relative">
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
                icon: "/placeholder.svg?key=17995",
              },
              {
                title: "Inteligência financeira",
                description:
                  "Reescreva sua história com o dinheiro. Supere crenças negativas, aprenda as regras da prosperidade e construa sua segurança financeira com consistência.",
                icon: "/placeholder.svg?key=ny4t9",
              },
              {
                title: "Inteligência espiritual",
                description:
                  "Alinhe sua mente e espírito com seu propósito de vida e descubra como viver com mais sentido, leveza e prosperidade.",
                icon: "/placeholder.svg?key=rkj9n",
              },
              {
                title: "Inteligência empresarial",
                description:
                  "Adote o mindset dos empreendedores de sucesso. Saiba como identificar oportunidades, tomar decisões estratégicas e pensar grande, com ousadia e visão de futuro.",
                icon: "/placeholder.svg?key=6v8te",
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
                image: "/placeholder.svg?key=scmaf",
              },
              {
                name: "Flávio Prado",
                role: "Jornalista esportivo que já cobriu 10 Copas do Mundo",
                image: "/placeholder.svg?key=pjqud",
              },
              {
                name: "Pyong Lee",
                role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
                image: "/placeholder.svg?key=jeozg",
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

      {/* Testimonials Video Section */}
      <section id="video-section" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DEPOIMENTOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TRANSFORMAÇÕES QUE <span className="text-yellow-400">FALAM POR SI</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Veja o impacto real na vida de quem já participou dos nossos treinamentos
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="p-6">
                {/* Custom Video Player with Mockup */}
                <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-xl">
                  {/* Video Frame Mockup */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black to-transparent"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black to-transparent"></div>
                    <div className="absolute inset-0 border-[3px] border-yellow-500/20 rounded-xl"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                    </div>
                  </div>

                  {/* YouTube Iframe */}
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoIds[activeVideoIndex]}?rel=0&showinfo=0&controls=0&modestbranding=1`}
                    title="Depoimento"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setActiveVideoIndex((prev) => (prev === 0 ? videoIds.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-yellow-500 text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    aria-label="Vídeo anterior"
                  >
                    <ArrowRight className="w-5 h-5 transform rotate-180" />
                  </button>

                  <button
                    onClick={() => setActiveVideoIndex((prev) => (prev === videoIds.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-yellow-500 text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    aria-label="Próximo vídeo"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/50 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Information */}
                <div className="mb-6 text-center">
                  {activeVideoIndex === 0 && (
                    <div className="animate-fadeIn">
                      <h4 className="text-xl font-bold text-yellow-400">Carlos Mendes</h4>
                      <p className="text-zinc-300">CEO da Mendes Investimentos</p>
                    </div>
                  )}
                  {activeVideoIndex === 1 && (
                    <div className="animate-fadeIn">
                      <h4 className="text-xl font-bold text-yellow-400">Mariana Silva</h4>
                      <p className="text-zinc-300">Fundadora da MS Consultoria</p>
                    </div>
                  )}
                  {activeVideoIndex === 2 && (
                    <div className="animate-fadeIn">
                      <h4 className="text-xl font-bold text-yellow-400">Ricardo Oliveira</h4>
                      <p className="text-zinc-300">Diretor da Oliveira Tech Solutions</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  {videoIds.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveVideoIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeVideoIndex === index ? "bg-yellow-400 scale-125" : "bg-zinc-700 hover:bg-zinc-500"
                      }`}
                      aria-label={`Ver depoimento ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base cta-hover"
                  >
                    <a href="#form">
                      QUERO TRANSFORMAR MINHA VIDA TAMBÉM <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Pricing Section */}
      <section id="inscricao" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">INSCRIÇÃO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              GARANTA SEU <span className="text-yellow-400">INGRESSO AGORA MESMO!</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">Escolha a opção que melhor se adapta às suas necessidades</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Ticket */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-center text-yellow-400">EXPERIÊNCIA SURREAL</h3>
                <p className="text-zinc-400 text-center mb-6">Ingresso geral</p>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">GRATUITO</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Experiência completa</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Material digital</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Certificado de participação</p>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 cta-hover"
                >
                  <a href="#form">EU QUERO!</a>
                </Button>
              </div>
            </div>

            {/* VIP Ticket */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-yellow-500/50 rounded-3xl overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/20 relative">
              <div className="absolute top-6 right-6 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                RECOMENDADO
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-center text-yellow-400">EXPERIÊNCIA VIP</h3>
                <p className="text-zinc-400 text-center mb-6">Experiência premium</p>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">R$ 49,90</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Perguntas e respostas com Roberto Navarro</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Assentos mais próximos ao palco</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Experiência premium</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-zinc-300">Compre 1, leve 2</p>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 cta-hover"
                >
                  <a href="#form">EU QUERO!</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div
            id="form"
            className="max-w-3xl mx-auto mt-20 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden"
          >
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">PREENCHA SEUS DADOS</h3>
              <p className="text-zinc-300 text-center mb-8">
                Preencha o formulário abaixo e dê o primeiro passo rumo à sua transformação financeira
              </p>

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
                  role="alert"
                >
                  <strong className="font-bold">Erro:</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="ticket" className="block text-sm font-medium mb-2">
                      Tipo de ingresso
                    </label>
                    <select
                      id="ticket"
                      name="ticket"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      disabled
                    >
                      <option value="free">Experiência Surreal (Gratuito)</option>
                      <option value="vip">Experiência VIP (R$ 49,90) - Indisponível</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg cta-hover"
                >
                  {isSubmitting ? "Enviando..." : "GARANTIR MINHA VAGA AGORA"}
                </Button>

                <p className="text-xs text-zinc-400 text-center">
                  Ao clicar em "Garantir minha vaga agora", você concorda com nossos termos de uso e política de
                  privacidade.
                </p>
              </form>
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
