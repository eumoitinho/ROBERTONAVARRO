"use client"

import { useEffect, useRef, useState } from "react"
import NextImage from "next/image"
import { Calendar, MapPin, Users as UsersIcon, Zap, FileText, Award, Brain, Compass, Target, Move, Unlock, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import WhatsAppButton from "@/components/whatsapp-button"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SectionBadge } from "@/components/section-badge"
import { ContentSection } from "@/components/content-section"
import Footer from "@/components/footer"
import EventCTAButton from "@/components/event-cta-button"
import NotableParticipants from "@/components/notable-persons"
import TransformationVideos from "@/components/transformation-videos"
import { SiteHeader } from "@/components/header"

interface CrencasDaRiquezaTemplateProps {
  evento: any
}

type ChallengeItem = {
  question: string
  answer: string
  icon?: string
}

type HighlightItem = {
  title: string
  description: string
  icon?: string
}

type MentorCard = {
  name: string
  badge: string
  role: string
  image: string
  bio: string[]
}

const fallbackChallenges: ChallengeItem[] = [
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

const fallbackHighlights: HighlightItem[] = [
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

const fallbackIntelligenceTypes = [
  {
    title: "Inteligência Emocional",
    description:
      "Domine suas emoções financeiras e desenvolva autocontrole para tomar decisões racionais mesmo sob pressão. Aprenda a transformar medo em coragem e ansiedade em ação estratégica.",
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
    benefits: [
      "Mindset empreendedor e visão de oportunidades",
      "Estratégias para escalar negócios",
      "Liderança e formação de equipes",
      "Networking estratégico e parcerias",
      "Inovação e adaptação a mudanças",
    ],
  },
]
const fallbackMentors: MentorCard[] = [
  {
    name: "ROBERTO NAVARRO",
    badge: "Fundador do ICF",
    role: "De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.",
    image: "/images/ROBERTO_4.jpg",
    bio: [
      "Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos.",
      "Especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios.",
      "Sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.",
    ],
  },
  {
    name: "RAÍSSA NAVARRO",
    badge: "Especialista em PNL",
    role: "Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL).",
    image: "/images/RAISSA.png",
    bio: [
      "Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.",
      "Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching no mundo.",
      "Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação emocional, sempre com bom humor e energia elevada.",
    ],
  },
]

const fallbackFaqs = [
  {
    question: "Preciso ter conhecimento prévio sobre finanças?",
    answer:
      "Não, o evento foi desenhado para pessoas em diferentes níveis de conhecimento financeiro. O foco está na transformação da mentalidade e nas crenças sobre dinheiro, não em conceitos técnicos avançados.",
  },
  {
    question: "O que devo levar para o evento?",
    answer:
      "Recomendamos que você leve um caderno para anotações, uma garrafa de água e esteja com roupas confortáveis. Todo o material didático será fornecido no evento, incluindo uma apostila digital.",
  },
  {
    question: "Haverá certificado de participação?",
    answer: "Sim, todos os participantes receberão um certificado digital de participação após a conclusão do evento.",
  },
  {
    question: "Posso transferir meu ingresso para outra pessoa?",
    answer:
      "Sim, você pode transferir seu ingresso para outra pessoa até 7 dias antes do evento. Para isso, entre em contato com nossa equipe de suporte informando os dados da nova pessoa.",
  },
  {
    question: "Haverá gravação do evento?",
    answer:
      "Não, o evento Crenças da Riqueza é uma experiência presencial exclusiva e não será gravado. Por isso, é fundamental garantir sua presença para aproveitar todo o conteúdo.",
  },
]

const getPlainText = (content: any): string => {
  if (!content) return ""
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block?.type === "p") {
          return block.children?.map((child: any) => child.text || "").join("")
        }
        return ""
      })
      .filter(Boolean)
      .join("\n")
  }
  return String(content)
}

const formatEventDate = (date?: string) => {
  if (!date) return "13 de Setembro de 2025"
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const formatEventTime = (startDate?: string, endDate?: string, fallback?: string) => {
  if (fallback) return fallback
  if (!startDate || !endDate) return "13h às 20h"

  const formatTime = (value: string) => {
    const formatted = new Date(value).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    return formatted.replace(":", "h").replace("h00", "h")
  }

  return `${formatTime(startDate)} às ${formatTime(endDate)}`
}

const formatLocation = (location?: any) => {
  if (!location) return "Alameda Araguaia, 751, Barueri, SP"
  const main = [location.venue, location.address || location.city].filter(Boolean).join(", ")
  const tail = location.address ? location.state : location.state
  const composed = [main, tail].filter(Boolean).join(", ")
  return composed || "Alameda Araguaia, 751, Barueri, SP"
}

export default function CrencasDaRiquezaTemplate({ evento }: CrencasDaRiquezaTemplateProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVideoPlaying) {
        closeVideo()
      }
    }

    document.addEventListener("keydown", handleEscKey)

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

  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      closeVideo()
    }
  }

  const navigationItems = [
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Mentores", href: "#mentores" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscreva-se", href: "#form", isButton: true },
  ]

  const heroDescription = getPlainText(evento.hero?.description)
  const challenges = Array.isArray(evento?.challenges) && evento.challenges.length > 0 ? evento.challenges : fallbackChallenges
  const intelligenceTypes = Array.isArray(evento?.intelligenceTypes) && evento.intelligenceTypes.length > 0
    ? evento.intelligenceTypes
    : fallbackIntelligenceTypes
  const eventHighlights = Array.isArray(evento?.highlights?.items) && evento.highlights.items.length > 0
    ? evento.highlights.items.slice(0, 4)
    : fallbackHighlights

  const mentors = Array.isArray(evento?.mentors) && evento.mentors.length > 0
    ? evento.mentors.slice(0, 2).map((mentor: any, index: number) => {
        const data = typeof mentor === "object" ? mentor : {}
        const name = data.name ? data.name.toUpperCase() : fallbackMentors[index]?.name
        const image = data.photo?.url || data.image || fallbackMentors[index]?.image
        const role = data.shortBio || data.role || fallbackMentors[index]?.role
        const badge = data.role || fallbackMentors[index]?.badge
        const bio = Array.isArray(data.bio) ? data.bio.map((item: any) => item.text || item) : fallbackMentors[index]?.bio
        return { name, badge, role, image, bio }
      })
    : fallbackMentors

  const faqs = Array.isArray(evento?.faqs) && evento.faqs.length > 0
    ? evento.faqs.map((faq: any) => ({
        question: faq.question || faq.title || "",
        answer: Array.isArray(faq.answer) ? getPlainText(faq.answer) : faq.answer || "",
      }))
    : fallbackFaqs

  const eventDate = formatEventDate(evento?.date)
  const eventTime = formatEventTime(evento?.date, evento?.endDate, evento?.duration)
  const eventLocation = formatLocation(evento?.location)
  const ticketLink = evento?.tickets?.[0]?.link || "https://evento.blinket.com.br/crencas-da-riqueza"

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] bg-repeat bg-[length:200px_200px] pointer-events-none"></div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

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

      <SiteHeader navigationItems={navigationItems} showInicio />

      <HeroPages
        title={evento.hero?.title || evento.title || "CRENÇAS DA RIQUEZA"}
        subtitle={evento.hero?.subtitle || "Transformação mental"}
        secondtitle={evento.hero?.badge || "A riqueza começa na mente e se materializa nas decisões"}
        description={heroDescription || "Desbloqueie seu potencial, supere crenças limitantes e alcance um novo patamar de liberdade financeira e realização pessoal."}
        image={
          typeof evento.hero?.backgroundImage === "object" && evento.hero?.backgroundImage?.url
            ? evento.hero.backgroundImage.url
            : "/images/HERO_CRENCAS.png"
        }
        ctaText={evento.hero?.ctaText || "GARANTA SUA VAGA!"}
        ctaHref={evento.hero?.ctaLink || "#form"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
        showCountdown={Boolean(evento.countdown?.enabled)}
        countdownTargetDate={evento.countdown?.targetDate ? new Date(evento.countdown.targetDate) : undefined}
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
            {challenges.map((item: ChallengeItem, index: number) => {
              const iconMap: Record<string, React.ElementType> = {
                brain: Brain,
                compass: Compass,
                target: Target,
                move: Move,
                unlock: Unlock,
              }
              const IconComponent = item.icon ? iconMap[item.icon] : Brain

              return (
                <div
                  key={index}
                  className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl p-8 hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-400/10 group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-yellow-400/20 rounded-full p-3 flex-shrink-0 group-hover:bg-yellow-400/30 transition-colors duration-300">
                      <div className="w-8 h-8 flex items-center justify-center text-yellow-400">
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight">{item.question}</h3>
                  </div>
                  <p className="text-zinc-300 ml-14 leading-relaxed">{item.answer}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <TransformationVideos />

      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <ContentSection
          items={intelligenceTypes.map((item: any) => ({
            title: item.title,
            description: item.description,
            benefits: (item.benefits || []).map((b: any) => b.text || b),
          }))}
        />
      </section>

      {/* Event Highlights */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {eventHighlights.map((item: HighlightItem, index: number) => {
              const rawIcon = (item.icon || "zap").toString().toLowerCase()
              const normalizedIcon = rawIcon.replace(/[^a-z]/g, "")
              const iconMap: Record<string, React.ElementType> = {
                zap: Zap,
                filetext: FileText,
                users: UsersIcon,
                award: Award,
              }
              const IconComponent = iconMap[normalizedIcon] || Zap

              return (
                <Card
                  key={index}
                  className="bg-zinc-900/40 backdrop-blur-lg border-zinc-700/30 hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-2 rounded-3xl group"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-yellow-400/20 rounded-full p-4 mb-4 group-hover:bg-yellow-400/30 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-yellow-400">{item.title}</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <NotableParticipants />

      <section id="depoimentos" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <TestimonialsSection testimonials={evento?.testimonials} />
      </section>

      {/* Mentors Section */}
      <section id="mentores" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>

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
            {mentors.map((mentor: MentorCard, index: number) => (
              <div key={index} className="group relative">
                <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-2xl group-hover:shadow-yellow-400/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.12)_0%,_rgba(39,39,42,0)_60%)]"></div>

                  <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="relative">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-400/80 shadow-lg shadow-yellow-400/20">
                          <NextImage
                            src={mentor.image}
                            alt={mentor.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-yellow-400 bg-yellow-400/10 rounded-full">
                          {mentor.badge}
                        </div>
                        <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                          {mentor.name}
                        </h3>
                        <p className="text-zinc-300 italic mb-4 leading-relaxed">{mentor.role}</p>
                      </div>
                    </div>

                    <div className="space-y-4 text-zinc-300">
                      {mentor.bio.map((item, bioIndex) => (
                        <div key={bioIndex} className="flex items-start gap-3">
                          <div className="mt-1 text-yellow-400">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <p className="leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  <p className="text-zinc-300 text-lg">
                    {eventDate}, {eventTime}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-px h-16 bg-zinc-700/30"></div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400/10 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
                  <MapPin className="h-7 w-7 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Local</h4>
                  <p className="text-zinc-300 text-lg">{eventLocation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <EventCTAButton
              eduzzUrl={ticketLink}
              buttonText="GARANTIR MINHA INSCRIÇÃO"
              className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold py-4 px-8 rounded-full text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              showArrow={false}
            />
          </div>
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
              {faqs.map((faq: any, index: number) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl overflow-hidden"
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline">
                    <span className="text-left font-medium text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-zinc-300 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source={evento.title || "Crenças da Riqueza"} className="custom-class" />
    </div>
  )
}
