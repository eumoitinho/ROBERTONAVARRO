"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import NextImage from "next/image"
import { ArrowRight, Calendar, MapPin, Users, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import WhatsAppButton from "@/components/whatsapp-button"
import { useRouter } from "next/navigation"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SectionBadge } from "@/components/section-badge"
import { ContentSection } from "@/components/content-section"
import Footer from "@/components/footer"
import { TicketPricingCards } from "@/components/ticket-pricing-cards"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

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
    title: "Inteligência Emocional",
    description:
      "Domine suas emoções financeiras e desenvolva autocontrole para tomar decisões racionais mesmo sob pressão. Aprenda a transformar medo em coragem e ansiedade em ação estratégica.",
    icon: "/emotional-intelligence-icon.png",
    benefits: [
      "Controle emocional em decisões financeiras",
      "Técnicas para vencer o medo de investir",
      "Autoconfiança para negociar e empreender",
      "Resiliência diante de perdas e fracassos",
      "Disciplina para manter o foco nos objetivos",
    ],
  },
  {
    title: "Inteligência Financeira",
    description:
      "Desenvolva uma mentalidade de abundância e aprenda as regras fundamentais do dinheiro. Desde o controle de gastos até estratégias de multiplicação de patrimônio.",
    icon: "/financial-intelligence-icon.png",
    benefits: [
      "Planejamento financeiro pessoal eficiente",
      "Estratégias de investimento para iniciantes",
      "Como criar múltiplas fontes de renda",
      "Gestão inteligente de dívidas e crédito",
      "Mentalidade de abundância vs escassez",
    ],
  },
  {
    title: "Inteligência Espiritual",
    description:
      "Alinhe seus valores pessoais com seus objetivos financeiros. Descubra seu propósito de vida e como a prosperidade pode servir a algo maior que você mesmo.",
    icon: "/spiritual-intelligence-icon.png",
    benefits: [
      "Conexão entre propósito e prosperidade",
      "Valores que sustentam o sucesso duradouro",
      "Equilíbrio entre ter e ser",
      "Generosidade como ferramenta de crescimento",
      "Paz interior independente das circunstâncias",
    ],
  },
  {
    title: "Inteligência Empresarial",
    description:
      "Pense como um empreendedor de sucesso. Desenvolva visão estratégica, capacidade de identificar oportunidades e habilidades de liderança para escalar seus resultados.",
    icon: "/business-intelligence-icon.png",
    benefits: [
      "Mindset empreendedor e visão de oportunidades",
      "Estratégias para escalar negócios",
      "Liderança e formação de equipes",
      "Networking estratégico e parcerias",
      "Inovação e adaptação a mudanças",
    ],
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
  const [isVisible, setIsVisible] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")
  const videoRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Data do evento (27 de Junho de 2025)
  const eventDate = new Date("2025-06-27T09:00:00")

  useEffect(() => {
    setIsVisible(true)

    // Adicionar event listener para fechar o vídeo com a tecla ESC
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVideoPlaying) {
        closeVideo()
      }
    }

    document.addEventListener("keydown", handleEscKey)

    // Prevenir scroll quando o modal estiver aberto
    if (isVideoPlaying) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isVideoPlaying])

  const playVideo = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoPlaying(true)
  }

  const closeVideo = () => {
    setIsVideoPlaying(false)
    setCurrentVideoId("")
  }

  // Handler para clicar fora do vídeo e fechar
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      closeVideo()
    }
  }

  const meusLinksCustomizados = [
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Mentores", href: "#mentores" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscreva-se", href: "#form", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] bg-repeat bg-[length:200px_200px] pointer-events-none"></div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div
          ref={modalRef}
          onClick={handleModalClick}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
        >
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeVideo}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Fechar vídeo"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Fechar vídeo</span>
            </Button>
          </div>
          <div className="w-full max-w-5xl aspect-video relative">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            ></iframe>
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <Button
                variant="outline"
                onClick={closeVideo}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Fechar Vídeo
              </Button>
            </div>
          </div>
        </div>
      )}

      <SiteHeader navigationItems={meusLinksCustomizados} showInicio />

      {/* Hero Section */}
      <HeroPages
        title="CRENÇAS DA RIQUEZA"
        subtitle="Transformação mental"
        secondtitle="A riqueza começa na mente e se materializa nas decisões"
        description="Desbloqueie seu potencial, supere crenças limitantes e alcance um novo patamar de liberdade financeira e realização pessoal."
        image="/images/HERO_CRENCAS.png"
        ctaText="GARANTA SUA VAGA!"
        ctaHref="#form"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
        showCountdown={true}
        countdownTargetDate={new Date("2025-05-27T19:00:00")}
      />

      {/* Challenges Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-900/95 to-zinc-900/90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <SectionBadge text="DESAFIOS" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              O QUE ESTÁ TE <span className="text-yellow-400">IMPEDINDO DE PROSPERAR</span> ESTÁ DENTRO DE VOCÊ
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Identifique os bloqueios mentais que estão limitando seu crescimento financeiro
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl p-8 hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-400/10 group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-yellow-400/20 rounded-full p-3 flex-shrink-0 group-hover:bg-yellow-400/30 transition-colors duration-300">
                    <div className="w-8 h-8 flex items-center justify-center text-yellow-400">
                      {item.icon === "brain" && <Brain className="h-6 w-6" />}
                      {item.icon === "compass" && <Compass className="h-6 w-6" />}
                      {item.icon === "target" && <Target className="h-6 w-6" />}
                      {item.icon === "move" && <Move className="h-6 w-6" />}
                      {item.icon === "unlock" && <Unlock className="h-6 w-6" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">{item.question}</h3>
                </div>
                <p className="text-zinc-300 ml-14 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            <TransformationVideos/>

      {/* What You'll Learn Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

        <ContentSection items={intelligenceTypes} />
      </section>

      {/* Event Highlights */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {eventHighlights.map((item, index) => (
              <Card
                key={index}
                className="bg-zinc-900/40 backdrop-blur-lg border-zinc-700/30 hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-2 rounded-3xl group"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-yellow-400/20 rounded-full p-4 mb-4 group-hover:bg-yellow-400/30 transition-colors duration-300">
                    {item.icon === "zap" && <Zap className="h-6 w-6 text-yellow-400" />}
                    {item.icon === "file-text" && <FileText className="h-6 w-6 text-yellow-400" />}
                    {item.icon === "users" && <Users className="h-6 w-6 text-yellow-400" />}
                    {item.icon === "award" && <Award className="h-6 w-6 text-yellow-400" />}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-yellow-400">{item.title}</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <NotableParticipants />

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <TestimonialsSection />
      </section>

      {/* Mentors Section */}
      <section id="mentores" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-24 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="MENTORES" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Especialistas que vão guiar sua jornada de transformação
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Roberto Navarro */}
            <div className="group relative">
              {/* Glow effect */}
              
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-2xl group-hover:shadow-yellow-400/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.12)_0%,_rgba(39,39,42,0)_60%)]"></div>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="relative">
                      {/* Decorative elements */}
                     
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-400/80 shadow-lg shadow-yellow-400/20">
                        <NextImage
                          src="/images/ROBERTO_4.JPG"
                          alt="Roberto Navarro"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                    
                  
                    </div>

                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-yellow-400 bg-yellow-400/10 rounded-full">
                        Fundador do ICF
                      </div>
                      <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                        ROBERTO NAVARRO
                      </h3>
                      <p className="text-zinc-300 italic mb-4 leading-relaxed">
                        De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-zinc-300">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-yellow-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="leading-relaxed">
                        Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas
                        com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e
                        princípios bíblicos.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-yellow-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="leading-relaxed">
                        Especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no
                        mundo dos negócios.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-yellow-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="leading-relaxed">
                        Sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com
                        autonomia e visão de futuro.
                      </p>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>

            {/* Raíssa Navarro */}
            <div className="group relative">
              {/* Glow effect */}
              

              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-2xl group-hover:shadow-yellow-400/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.12)_0%,_rgba(39,39,42,0)_60%)]"></div>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="relative">
                      {/* Decorative elements */}
                    
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-400/80 shadow-lg shadow-yellow-400/20">
                        <NextImage
                          src="/images/RAISSA.png"
                          alt="Raíssa Navarro"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      
                    </div>

                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-yellow-400 bg-yellow-400/10 rounded-full">
                        Especialista em PNL
                      </div>
                      <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                        RAÍSSA NAVARRO
                      </h3>
                      <p className="text-zinc-300 italic mb-4 leading-relaxed">
                        Especialista em comportamento humano e referência nacional em Programação Neurolinguística
                        (PNL).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-zinc-300">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-yellow-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="leading-relaxed">
                        Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras
                        autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-yellow-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="leading-relaxed">
                        Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching
                        no mundo.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-yellow-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="leading-relaxed">
                        Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação
                        emocional, sempre com bom humor e energia elevada.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.03)_0%,_rgba(39,39,42,0.1)_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="INSCRIÇÃO" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              ESCOLHA SEU <span className="text-yellow-400">INGRESSO</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Participe do evento transformador Crenças da Riqueza e comece a mudar sua relação com o dinheiro. Vagas
              limitadas!
            </p>
          </div>

          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                  <Calendar className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Data e Horário</h4>
                  <p className="text-zinc-300 text-lg">27 de Junho de 2025, 9h às 19h</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-zinc-700/30"></div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                  <MapPin className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Local</h4>
                  <p className="text-zinc-300 text-lg">Centro de Convenções, São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>

          <TicketPricingCards
            eventId={1}
            eventName="Crenças da Riqueza"
            ticketTypes={[
              {
                id: 2745132,
                name: "Ingresso Especial",
                price: 9.9,
                description: "Acesso completo ao evento presencial",
                benefits: [
                  "Experiência completa de 10 horas",
                  "Material digital exclusivo",
                  "Certificado de participação",
                  "Networking com participantes",
                ],
              },
              {
                id: 2745133,
                name: "Ingresso VIP",
                price: 49.9,
                description: "Experiência premium com benefícios exclusivos",
                benefits: [
                  "Tudo do Ingresso Especial",
                  "Assentos nas primeiras fileiras",
                  "Perguntas e respostas com Roberto Navarro",
                  "Compre 1, leve 2 (traga um acompanhante)",
                  "Acesso antecipado ao evento",
                ],
                featured: true,
              },
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <SectionBadge text="DÚVIDAS FREQUENTES" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              PERGUNTAS <span className="text-yellow-400">FREQUENTES</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Respostas para as dúvidas mais comuns sobre o evento
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline">
                  <span className="text-left font-medium text-lg">Preciso ter conhecimento prévio sobre finanças?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-zinc-300 leading-relaxed">
                  Não, o evento foi desenhado para pessoas em diferentes níveis de conhecimento financeiro. O foco está
                  na transformação da mentalidade e nas crenças sobre dinheiro, não em conceitos técnicos avançados.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline">
                  <span className="text-left font-medium text-lg">O que devo levar para o evento?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-zinc-300 leading-relaxed">
                  Recomendamos que você leve um caderno para anotações, uma garrafa de água e esteja com roupas
                  confortáveis. Todo o material didático será fornecido no evento, incluindo uma apostila digital.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline">
                  <span className="text-left font-medium text-lg">Haverá certificado de participação?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-zinc-300 leading-relaxed">
                  Sim, todos os participantes receberão um certificado digital de participação após a conclusão do
                  evento.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-4"
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline">
                  <span className="text-left font-medium text-lg">
                    Posso transferir meu ingresso para outra pessoa?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-zinc-300 leading-relaxed">
                  Sim, você pode transferir seu ingresso para outra pessoa até 7 dias antes do evento. Para isso, entre
                  em contato com nossa equipe de suporte informando os dados da nova pessoa.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-5"
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline">
                  <span className="text-left font-medium text-lg">Haverá gravação do evento?</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-zinc-300 leading-relaxed">
                  Não, o evento Crenças da Riqueza é uma experiência presencial exclusiva e não será gravado. Por isso,
                  é fundamental garantir sua presença para aproveitar todo o conteúdo.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

// Componentes adicionais necessários
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Award, Brain, Compass, FileText, Move, Target, Unlock, Zap } from "lucide-react"
import { SiteHeader } from "@/components/header"
import { X } from "lucide-react"
import { CheckCircle } from "lucide-react"
import NotableParticipants from "@/components/notable-persons"
import TransformationVideos from "@/components/transformation-videos"

