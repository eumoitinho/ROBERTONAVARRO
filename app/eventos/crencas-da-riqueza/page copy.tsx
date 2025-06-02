"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Users, Check, Play, ChevronRight, Star, Brain, Compass, Target, Move, Unlock, Zap, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import WhatsAppButton from "@/components/whatsapp-button"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TicketPurchaseForm } from "@/components/ticket-purchase-form"
// Removed unused import
import Footer from "@/components/footer"
import GlowEffect from "@/components/glow-effect"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Dados para a página
const challenges = [
  {
    question: "Você trava na hora de tomar decisões financeiras importantes?",
    answer: "Aprenda a identificar e neutralizar crenças limitantes que afetam suas escolhas.",
    icon: "brain",
  },
  {
    question: "Sente que está sempre correndo, mas sem sair do lugar?",
    answer: "Direcione sua energia com foco, clareza e propósito para crescer com consistência.",
    icon: "compass",
  },
  {
    question: "Tem dificuldade em pensar grande e definir metas ousadas?",
    answer: "Comece a expandir sua mentalidade e enxergar oportunidades onde antes via riscos.",
    icon: "target",
  },
  {
    question: "Sabe que precisa mudar, mas não consegue dar o próximo passo?",
    answer: "Descubra o que está te bloqueando e como destravar seu potencial com técnicas práticas.",
    icon: "move",
  },
  {
    question: "Sente que algo te impede de alcançar a liberdade financeira?",
    answer: "Aprenda a destravar suas crenças de escassez e ressignifique sua relação com o dinheiro.",
    icon: "unlock",
  },
]

const intelligenceTypes = [
  {
    title: "Inteligência emocional",
    description:
      "Domine suas emoções e fortaleça sua confiança para tomar decisões claras e corajosas, mesmo diante de pressões e incertezas.",
    icon: "/emotional-intelligence-icon.png",
    benefits: ["Controle de emoções negativas", "Resiliência sob pressão", "Confiança nas decisões", "Clareza mental"],
  },
  {
    title: "Inteligência financeira",
    description:
      "Reescreva sua história com o dinheiro. Supere crenças negativas, aprenda as regras da prosperidade e construa sua segurança financeira com consistência.",
    icon: "/financial-intelligence-icon.png",
    benefits: [
      "Gestão eficiente de recursos",
      "Estratégias de investimento",
      "Planejamento financeiro",
      "Mentalidade de abundância",
    ],
  },
  {
    title: "Inteligência espiritual",
    description:
      "Alinhe sua mente e espírito com seu propósito de vida e descubra como viver com mais sentido, leveza e prosperidade.",
    icon: "/spiritual-intelligence-icon.png",
    benefits: ["Conexão com propósito maior", "Equilíbrio interior", "Clareza de valores", "Paz mental e emocional"],
  },
  {
    title: "Inteligência empresarial",
    description:
      "Adote o mindset dos empreendedores de sucesso. Saiba como identificar oportunidades, tomar decisões estratégicas e pensar grande, com ousadia e visão de futuro.",
    icon: "/business-intelligence-icon.png",
    benefits: [
      "Visão estratégica",
      "Identificação de oportunidades",
      "Tomada de decisão eficaz",
      "Liderança inspiradora",
    ],
  },
]

const notableParticipants = [
  {
    name: "Alfredo Soares",
    role: "Autoridade em vendas e autor best-seller",
    image: "/professional-businessman-headshot.png",
    testimonial: "Uma experiência transformadora que mudou minha visão sobre dinheiro e negócios.",
  },
  {
    name: "Tiago Brunet",
    role: "Referência em treinamento de líderes e espiritualidade",
    image: "/professional-man-headshot.png",
    testimonial: "Roberto tem um dom único de unir princípios espirituais e financeiros de forma prática.",
  },
  {
    name: "Flávio Prado",
    role: "Jornalista esportivo que já cobriu 10 Copas do Mundo",
    image: "/sports-journalist-headshot.png",
    testimonial: "Aprendi mais sobre finanças em um dia do que em anos de leituras e cursos.",
  },
  {
    name: "Pyong Lee",
    role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
    image: "/placeholder.svg?height=300&width=300&query=asian influencer headshot",
    testimonial: "Uma metodologia que realmente funciona e transforma a mentalidade sobre dinheiro.",
  },
]

const eventHighlights = [
  {
    title: "Imersão Completa",
    description: "10 horas de conteúdo transformador em um único dia",
    icon: "zap",
  },
  {
    title: "Material Exclusivo",
    description: "Apostila digital e recursos para implementação imediata",
    icon: "file-text",
  },
  {
    title: "Networking Qualificado",
    description: "Conexão com outros profissionais e empreendedores",
    icon: "users",
  },
  {
    title: "Certificado",
    description: "Documento oficial de participação no evento",
    icon: "award",
  },
]

export default function CrencasDaRiquezaPage() {
  // Removed unused state
  const activeVideoIndex = 0; // Simplified as setter is unused
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoIds = ["4aYDKJQBnRw", "yTELcwYTsnU", "W6rBTJKeJ4w"]
  const videoRef = useRef<HTMLDivElement>(null)
  // Removed unused variable


  const playVideo = () => {
    setIsVideoPlaying(true)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#o-que-aprender" className="text-sm text-zinc-300 hover:text-yellow-400 transition-colors">
              Conteúdo
            </Link>
            <Link href="#mentores" className="text-sm text-zinc-300 hover:text-yellow-400 transition-colors">
              Mentores
            </Link>
            <Link href="#depoimentos" className="text-sm text-zinc-300 hover:text-yellow-400 transition-colors">
              Depoimentos
            </Link>
            <Button
              asChild
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
              size="sm"
            >
              <Link href="#form">Inscreva-se</Link>
            </Button>
          </div>
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

      {/* Countdown Timer */}
      <div className="relative py-6 bg-gradient-to-r from-yellow-500/20 via-yellow-600/10 to-yellow-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-yellow-400">Vagas limitadas!</h3>
              <p className="text-sm text-zinc-300">Garanta seu lugar antes que esgote</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-zinc-800/80 rounded-lg p-2 md:p-3 w-16 md:w-20 text-center">
                <div className="text-xl md:text-2xl font-bold text-yellow-400">15</div>
                <div className="text-xs text-zinc-400">Dias</div>
              </div>
              <div className="bg-zinc-800/80 rounded-lg p-2 md:p-3 w-16 md:w-20 text-center">
                <div className="text-xl md:text-2xl font-bold text-yellow-400">08</div>
                <div className="text-xs text-zinc-400">Horas</div>
              </div>
              <div className="bg-zinc-800/80 rounded-lg p-2 md:p-3 w-16 md:w-20 text-center">
                <div className="text-xl md:text-2xl font-bold text-yellow-400">45</div>
                <div className="text-xs text-zinc-400">Minutos</div>
              </div>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 py-2 text-sm cta-hover"
            >
              <a href="#form">
                RESERVAR AGORA <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-yellow-500/50 bg-yellow-500/5">
              DESAFIOS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE ESTÁ TE <span className="text-yellow-400">IMPEDINDO DE PROSPERAR</span> ESTÁ DENTRO DE VOCÊ
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Identifique os bloqueios mentais que estão limitando seu crescimento financeiro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-yellow-500/20 rounded-full p-2 flex-shrink-0">
                    <div className="w-8 h-8 flex items-center justify-center text-yellow-400">
                      {item.icon === "brain" && <Brain className="h-5 w-5" />}
                      {item.icon === "compass" && <Compass className="h-5 w-5" />}
                      {item.icon === "target" && <Target className="h-5 w-5" />}
                      {item.icon === "move" && <Move className="h-5 w-5" />}
                      {item.icon === "unlock" && <Unlock className="h-5 w-5" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.question}</h3>
                </div>
                <p className="text-zinc-300 ml-12">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 <section id="mentores" className="py-20 bg-zinc-900">
        <div className="container-custom">
          <h2 className="text-center mb-12 animate-on-scroll fade-in text-3xl md:text-4xl font-bold">
            CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
          </h2>
          <p className="text-center mb-10 max-w-3xl mx-auto animate-on-scroll fade-in text-sm">Por trás do LCF Mentoring, duas trajetórias que unem conhecimento, superação e propósito.</p>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Roberto Navarro */}
            <GlowEffect className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
              <div className="flex flex-col gap-8">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                  <Image src="/images/roberto.webp" alt="Roberto Navarro" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">ROBERTO NAVARRO</h3>
                  <div className="space-y-4 text-sm text-gray-300">
                    <p>De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.</p>
                    <p>Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua família.</p>
                    <p>Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.</p>
                    <p>Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.</p>
                    <div className="pt-4">
                      <GlowEffect>
                        <Button className="cta-hover bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">GARANTA SUA VAGA!</Button>
                      </GlowEffect>
                    </div>
                  </div>
                </div>
              </div>
            </GlowEffect>
            {/* Raíssa Navarro */}
            <GlowEffect className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
              <div className="flex flex-col gap-8">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                  <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group_18-1-1LHrdbJhcrEJFv1R5sItLA6gUXYbiw.webp" alt="Raíssa Navarro" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">RAÍSSA NAVARRO</h3>
                  <div className="space-y-4 text-sm text-gray-300">
                    <p>Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL).</p>
                    <p>Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.</p>
                    <p>Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching no mundo e acumula mais de 10 anos em estudos sobre PNL e comportamento humano.</p>
                    <p>Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação emocional, sempre com bom humor e energia elevada. Seus ensinamentos são uma chave para quem quer vencer o medo, a procrastinação e o sentimento de incapacidade.</p>
                    <div className="pt-4">
                      <GlowEffect>
                        <Button className="cta-hover bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">GARANTA SUA VAGA!</Button>
                      </GlowEffect>
                    </div>
                  </div>
                </div>
              </div>
            </GlowEffect>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">{/* Stats unchanged */}</div>
        </div>
      </section>
      {/* Video Section */}
      <section ref={videoRef} id="video-section" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <Badge variant="outline" className="mb-4 px-4 py-1 border-yellow-500/50 bg-yellow-500/5">
                TRANSFORMAÇÃO REAL
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                VEJA COMO NOSSOS <span className="text-yellow-400">ALUNOS TRANSFORMARAM</span> SUAS VIDAS FINANCEIRAS
              </h2>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 rounded-full p-2 flex-shrink-0">
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-400 mb-2">Resultados comprovados</h3>
                      <p className="text-zinc-300">
                        Mais de 130 mil pessoas já passaram por nossas formações e transformaram sua relação com o
                        dinheiro.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 rounded-full p-2 flex-shrink-0">
                      <Zap className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-400 mb-2">Metodologia exclusiva</h3>
                      <p className="text-zinc-300">
                        Uma abordagem única que integra inteligência financeira, emocional, espiritual e empresarial.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 rounded-full p-2 flex-shrink-0">
                      <Brain className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-400 mb-2">Transformação mental</h3>
                      <p className="text-zinc-300">
                        Reprogramação de crenças limitantes e desenvolvimento de uma mentalidade de prosperidade.
                      </p>
                    </div>
                  </div>
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

            <div className="relative order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                {isVideoPlaying ? (
                  <div className="aspect-video w-full">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoIds[activeVideoIndex]}?autoplay=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video w-full relative cursor-pointer group" onClick={playVideo}>
                    <Image
                      src="/images/ROBERTO_9.jpg"
                      alt="Crenças da Riqueza"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse-slow">
                        <Play className="h-8 w-8 md:h-10 md:w-10 text-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg">
                      <h3 className="text-lg font-bold text-yellow-400">Depoimentos transformadores</h3>
                      <p className="text-sm text-zinc-300">Veja como o evento mudou a vida de nossos alunos</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-yellow-500/50 bg-yellow-500/5">
              CONTEÚDO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ VAI <span className="text-yellow-400">APRENDER</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Desenvolva as quatro inteligências essenciais para a prosperidade
            </p>
          </div>

          <Tabs defaultValue="emocional" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="emocional">Emocional</TabsTrigger>
              <TabsTrigger value="financeira">Financeira</TabsTrigger>
              <TabsTrigger value="espiritual">Espiritual</TabsTrigger>
              <TabsTrigger value="empresarial">Empresarial</TabsTrigger>
            </TabsList>
            {intelligenceTypes.map((item, index) => (
              <TabsContent
                key={index}
                value={
                  index === 0 ? "emocional" : index === 1 ? "financeira" : index === 2 ? "espiritual" : "empresarial"
                }
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="flex items-start gap-6 mb-6">
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
                    <div className="ml-20">
                      <h4 className="text-sm font-medium text-zinc-400 mb-3">O QUE VOCÊ VAI DESENVOLVER:</h4>
                      <ul className="space-y-2">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-zinc-300">
                            <Check className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-600/10 rounded-3xl blur-3xl -z-10"></div>
                    <div className="relative w-full max-w-md">
                      <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-500/20 rounded-full filter blur-xl animate-float"></div>
                      <div
                        className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-600/20 rounded-full filter blur-xl animate-float"
                        style={{ animationDelay: "2s" }}
                      ></div>
                      <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                        <h3 className="text-xl font-bold mb-4 text-yellow-400">Benefícios práticos:</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-yellow-500/20 rounded-full p-1.5 flex-shrink-0">
                              <Check className="h-4 w-4 text-yellow-400" />
                            </div>
                            <p className="text-zinc-300 text-sm">
                              <span className="font-medium text-white">Resultados imediatos</span> - Técnicas que você
                              pode aplicar no dia seguinte ao evento
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-yellow-500/20 rounded-full p-1.5 flex-shrink-0">
                              <Check className="h-4 w-4 text-yellow-400" />
                            </div>
                            <p className="text-zinc-300 text-sm">
                              <span className="font-medium text-white">Transformação duradoura</span> - Mudanças
                              profundas na sua relação com dinheiro
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-yellow-500/20 rounded-full p-1.5 flex-shrink-0">
                              <Check className="h-4 w-4 text-yellow-400" />
                            </div>
                            <p className="text-zinc-300 text-sm">
                              <span className="font-medium text-white">Comunidade de apoio</span> - Acesso a um grupo
                              exclusivo de participantes
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-yellow-500/20 rounded-full p-1.5 flex-shrink-0">
                              <Check className="h-4 w-4 text-yellow-400" />
                            </div>
                            <p className="text-zinc-300 text-sm">
                              <span className="font-medium text-white">Material exclusivo</span> - Recursos digitais
                              para implementação contínua
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 relative bg-zinc-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {eventHighlights.map((item, index) => (
              <Card
                key={index}
                className="bg-zinc-900/70 border-zinc-800/50 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-yellow-500/20 rounded-full p-3 mb-4">
                    {item.icon === "zap" && <Zap className="h-6 w-6 text-yellow-400" />}
                    {item.icon === "file-text" && <FileText className="h-6 w-6 text-yellow-400" />}
                    {item.icon === "users" && <Users className="h-6 w-6 text-yellow-400" />}
                    {item.icon === "award" && <Award className="h-6 w-6 text-yellow-400" />}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-yellow-400">{item.title}</h3>
                  <p className="text-sm text-zinc-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Participants Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-yellow-500/50 bg-yellow-500/5">
              PARTICIPANTES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              JÁ PASSARAM POR <span className="text-yellow-400">NOSSOS TREINAMENTOS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Conheça algumas personalidades que já participaram dos nossos eventos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {notableParticipants.map((person, index) => (
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
                  <p className="text-zinc-300 mb-4">{person.role}</p>
                  <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
                    <p className="text-sm text-zinc-300 italic">"{person.testimonial}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos">
        <TestimonialsSection />
      </section>

     

      
            {/* Mentors Section */}
            <section id="mentores" className="py-20 bg-zinc-900">
              <div className="container-custom">
                <h2 className="text-center mb-12 animate-on-scroll fade-in text-3xl md:text-4xl font-bold">
                  CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
                </h2>
                <p className="text-center mb-10 max-w-3xl mx-auto animate-on-scroll fade-in text-sm">
                  Por trás do LCF Mentoring, duas trajetórias que unem conhecimento, superação e propósito.
                </p>
      
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  {/* Roberto Navarro */}
                  <GlowEffect className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-left hover-lift card-hover">
                    <div className="flex flex-col gap-8">
                      <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                        <Image src="/images/roberto.webp" alt="Roberto Navarro" fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-yellow-400">ROBERTO NAVARRO</h3>
                        <div className="space-y-4 text-sm text-gray-300">
                          <p>De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.</p>
                          <p>
                            Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente
                            de escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da
                            sua família.
                          </p>
                          <p>
                            Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com
                            sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios
                            bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito
                            e ação.
                          </p>
                          <p>
                            Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em
                            inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios.
                            Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com
                            autonomia e visão de futuro.
                          </p>
                          <div className="pt-4">
                            <GlowEffect>
                              <Button className="cta-hover bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">
                                GARANTA SUA VAGA!
                              </Button>
                            </GlowEffect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowEffect>
      
                  {/* Raissa Navarro */}
                  <GlowEffect className="bg-black p-8 rounded-xl border border-zinc-700 animate-on-scroll fade-in-right hover-lift card-hover">
                    <div className="flex flex-col gap-8">
                      <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group_18-1-1LHrdbJhcrEJFv1R5sItLA6gUXYbiw.webp"
                          alt="Raissa Navarro"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-yellow-400">RAÍSSA NAVARRO</h3>
                        <div className="space-y-4 text-sm text-gray-300">
                          <p>
                            Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL).
                          </p>
                          <p>
                            Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras
                            autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.
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
                          <div className="pt-4">
                            <GlowEffect>
                              <Button className="cta-hover bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">
                                GARANTA SUA VAGA!
                              </Button>
                            </GlowEffect>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlowEffect>
                </div>
      
                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                  <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-2">130k+</h3>
                    <p className="text-sm text-gray-300">Alunos</p>
                  </div>
                  <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-2">7 anos</h3>
                    <p className="text-sm text-gray-300">Experiência</p>
                  </div>
                  <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-2">10M</h3>
                    <p className="text-sm text-gray-300">Meta de impacto</p>
                  </div>
                  <div className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
                    <h3 className="text-3xl font-bold text-yellow-400 mb-2">4.9/5</h3>
                    <p className="text-sm text-gray-300">Avaliação</p>
                  </div>
                </div>
              </div>
            </section>
      {/* Ticket Purchase Section */}
      <section id="form" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-yellow-500/50 bg-yellow-500/5">
              INSCRIÇÃO
            </Badge>
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

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-yellow-500/50 bg-yellow-500/5">
              DÚVIDAS FREQUENTES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PERGUNTAS <span className="text-yellow-400">FREQUENTES</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">Respostas para as dúvidas mais comuns sobre o evento</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">Preciso ter conhecimento prévio sobre finanças?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-zinc-300">
                  Não, o evento foi desenhado para pessoas em diferentes níveis de conhecimento financeiro. O foco está
                  na transformação da mentalidade e nas crenças sobre dinheiro, não em conceitos técnicos avançados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">O que devo levar para o evento?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-zinc-300">
                  Recomendamos que você leve um caderno para anotações, uma garrafa de água e esteja com roupas
                  confortáveis. Todo o material didático será fornecido no evento, incluindo uma apostila digital.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">Haverá certificado de participação?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-zinc-300">
                  Sim, todos os participantes receberão um certificado digital de participação após a conclusão do
                  evento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">Posso transferir meu ingresso para outra pessoa?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-zinc-300">
                  Sim, você pode transferir seu ingresso para outra pessoa até 7 dias antes do evento. Para isso, entre
                  em contato com nossa equipe de suporte informando os dados da nova pessoa.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">Haverá gravação do evento?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-zinc-300">
                  Não, o evento Crenças da Riqueza é uma experiência presencial exclusiva e não será gravado. Por isso,
                  é fundamental garantir sua presença para aproveitar todo o conteúdo.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

  

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
