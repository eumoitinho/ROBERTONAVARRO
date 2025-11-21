"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import LocationMap from "@/components/location-map"
import { TestimonialsSection, type TestimonialData } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import QuemSomosSection from "@/components/mentor"
import TransformationVideos from "@/components/transformation-videos"
import EventPopup from "@/components/event-popup"

type CTAData = {
  label: string
  href: string
  newTab?: boolean
}

type FormationItem = {
    title: string
    description: string
    link: string
}

type StatData = {
  value: string
  label: string
}

type MentorData = {
  badgeText: string
  titlePrefix: string
  titleHighlight: string
  titleSuffix: string
  description: string
  backgroundImage: string
  paragraphs: string[]
  stats: StatData[]
}

type EventsSectionData = {
  badgeText: string
  title: string
  highlightedText: string
  description: string
  items: FormationItem[]
}

type BooksSectionData = {
  badgeText: string
  titleHighlight: string
  titleSuffix: string
  description: string[]
  image: string
  cta: CTAData
}

type TrainingsSectionData = {
  badgeText: string
  title: string
  highlightedText: string
  description: string
  cta: CTAData
}

type TestimonialsSectionData = {
  badgeText: string
  title: string
  highlightedText: string
  description: string
  testimonials?: TestimonialData[]
  cta: CTAData
}

type ContactSectionData = {
  badgeText: string
  title: string
  highlightedText: string
  description: string
  email: string
  phone: string
  address: string
  mapEmbedUrl?: string
  formSlug?: string
}

const defaultFormationItems: FormationItem[] = [
    {
      title: "LCF MENTORING",
    description:
      "Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.",
    link: "/formacoes/mentoria",
    },
    {
      title: "EMPREENDEDOR INTELIGENTE",
    description:
      "Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.",
    link: "/formacoes/empreendedor-inteligente",
    },
    {
      title: "EDUCADOR FINANCEIRO",
    description:
      "Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.",
    link: "/formacoes/educador-financeiro",
    },
    {
      title: "LCF MENTORING PRO",
    description:
      "Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.",
    link: "/formacoes/lcf-mentoring-pro",
    },
    {
      title: "MENTORIA DE INVESTIMENTOS",
    description:
      "Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.",
    link: "/formacoes/mentoria-de-investimentos",
  },
  {
    title: "MENTORIA INDIVIDUAL",
    description:
      "Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.",
    link: "/formacoes/mentoria-individual",
  },
  {
    title: "MÉTODO TF",
    description:
      "Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.",
    link: "/formacoes/metodo-tf",
  },
  {
    title: "MENTOR COACHING FINANCEIRO",
    description:
      "Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.",
    link: "/formacoes/mentor-coaching-financeiro",
  },
]

const defaultHero = {
  badgeText: "INSTITUTO COACHING FINANCEIRO",
  titleHighlight: "TRANSFORME SUA MENTALIDADE",
  titleRest: "E CONQUISTE UMA NOVA REALIDADE FINANCEIRA",
  description:
    "Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.",
  backgroundImage: "/images/bgsite.jpg",
  primaryCta: {
    label: "CONHEÇA NOSSAS FORMAÇÕES",
    href: "#formacoes",
    newTab: false,
  } satisfies CTAData,
  stats: [{ value: "300.000+", label: "vidas transformadas" }] as StatData[],
  enableEventPopup: false,
}

const defaultFormationsSection = {
  badgeText: "NOSSAS FORMAÇÕES",
  title: "FORMAÇÕES QUE VÃO",
  highlightedText: "TRANSFORMAR SUA MENTALIDADE",
  description:
    "Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.",
  useFormacoesCollection: true,
  items: defaultFormationItems,
}

const defaultMentorSection: MentorData = {
  badgeText: "QUEM SOMOS",
  titlePrefix: "MAIS DE",
  titleHighlight: "30 ANOS",
  titleSuffix: "IMPACTANDO VIDAS COM INTELIGÊNCIA E PROPÓSITO",
  description: "Te guiamos na jornada de transformação financeira, emocional e espiritual.",
  backgroundImage: "/images/ROBERTO_17.jpg",
  paragraphs: [
    "Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente, trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.",
    "A virada em sua vida veio quando Roberto percebeu que havia um \u201cvilão invisível\u201d bloqueando sua prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.",
    "Hoje, Roberto Navarro é reconhecido como o criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e emocional. Sua missão é transformar a vida financeira de 10 milhões de brasileiros e contribuir para a construção de um país rico e próspero.",
  ],
  stats: [
    { value: "+1,5 Milhões", label: "Alunos" },
    { value: "1280", label: "Técnicas Exclusivas" },
    { value: "5", label: "Livros Publicados" },
    { value: "100+", label: "Vídeos Inspiradores" },
  ],
}

const defaultEventsSection: EventsSectionData = {
  badgeText: "EVENTOS PRESENCIAIS",
  title: "EVENTOS PRESENCIAIS QUE GERAM",
  highlightedText: "MUDANÇAS REAIS",
  description:
    "Nossos eventos são imersões poderosas criadas para desbloquear crenças, despertar seu potencial e colocar você no caminho da liberdade e abundância.",
  items: [
    {
      title: "CRENÇAS DA RIQUEZA",
      description: "Supere bloqueios mentais e eleve seu padrão financeiro e pessoal.",
      link: "/eventos/crencas-da-riqueza",
    },
    {
      title: "SEGREDOS DA MENTE MILIONÁRIA",
      description: "Descubra os princípios fundamentais que separam os ricos dos pobres e transforme sua vida financeira.",
      link: "/eventos/segredos-da-mente-milionaria",
    },
    {
      title: "ESCALADOR DE NEGÓCIOS",
      description: "Aplique estratégias para escalar vendas, lucros e conquistar liberdade empresarial.",
      link: "/eventos/escalador-de-negocios",
    },
    {
      title: "ENERGIA DO DINHEIRO",
      description: "Descubra como alinhar sua energia com a frequência da prosperidade.",
      link: "/eventos/energia-do-dinheiro",
    },
  ],
}

const defaultBooksSection: BooksSectionData = {
  badgeText: "LIVROS",
  titleHighlight: "LIVROS PARA QUEM QUER",
  titleSuffix: "PROSPERAR DE VERDADE",
  description: [
    "Conheça os best-sellers de Roberto Navarro, que já impactaram milhares de leitores com estratégias práticas e transformadoras.",
    "Cada página traz ensinamentos que moldaram a jornada de um multimilionário, agora disponíveis para você.",
  ],
  image: "/images/LIVRO_MOCKUP.png",
  cta: {
    label: "COMPRE SEU LIVRO AGORA!",
    href: "/livros",
    newTab: false,
  },
}

const defaultTrainingsSection: TrainingsSectionData = {
  badgeText: "TREINAMENTOS DIGITAIS",
  title: "APRENDA NO SEU TEMPO COM NOSSOS",
  highlightedText: "TREINAMENTOS DIGITAIS",
  description:
    "Conheça nossos cursos gravados e descubra como eliminar dívidas, organizar sua vida financeira e construir seu primeiro milhão com estratégia e propósito.",
  cta: {
    label: "ADQUIRA SEU TREINAMENTO!",
    href: "#",
    newTab: false,
  },
}

const defaultTestimonialsSection: TestimonialsSectionData = {
  badgeText: "DEPOIMENTOS",
  title: "O QUE NOSSO",
  highlightedText: "ALUNOS DIZEM",
  description:
    "Conheça as histórias de transformação de pessoas que já passaram pelos nossos programas.",
  cta: {
    label: "COMECE SUA TRANSFORMAÇÃO",
    href: "#inscricao",
    newTab: false,
  },
}

const defaultContactSection: ContactSectionData = {
  badgeText: "CONTATO",
  title: "ENTRE EM",
  highlightedText: "CONTATO",
  description:
    "Estamos à disposição para ajudar você a transformar sua vida financeira. Entre em contato conosco e comece sua jornada rumo à liberdade financeira.",
  email: "contato@robertonavarrooficial.com.br",
  phone: "(12) 99765-9057",
  address: "Alameda Araguaia 751, Alphaville – SP",
  formSlug: "contato",
}

const defaultTransformationContent = {
  accent: "yellow" as const,
  orientation: "landscape" as const,
  title: "VEJA COMO NOSSOS",
  highlightedText: "ALUNOS TRANSFORMARAM",
  description:
    "Histórias reais de pessoas que aplicaram os princípios das Crenças da Riqueza e mudaram completamente sua relação com o dinheiro.",
  videos: undefined,
  stats: undefined,
  cta: {
    label: "Transformar Minha Vida Financeira!",
    href: "#inscricao",
    newTab: false,
  },
}

interface HomePageProps {
  formationsItems?: FormationItem[]
  pageData?: any
}

const getMediaUrl = (media: any, fallback?: string): string => {
  if (!media) return fallback ?? ""
  if (typeof media === "string") return media
  if (media?.url) return media.url
  if (media?.value?.url) return media.value.url
  return fallback ?? ""
}

const mapParagraphs = (items?: Array<{ text?: string }>, fallback: string[] = []) => {
  if (!Array.isArray(items)) return fallback
  const parsed = items.map((item) => item?.text?.trim()).filter(Boolean) as string[]
  return parsed.length ? parsed : fallback
}

const mapFormationsItems = (items?: Array<{ title?: string; description?: string; link?: string }>): FormationItem[] | undefined => {
  if (!Array.isArray(items)) return undefined
  const mapped = items
    .map((item) => ({
      title: item?.title?.trim() ?? "",
      description: item?.description?.trim() ?? "",
      link: item?.link?.trim() || "#",
    }))
    .filter((item) => item.title.length > 0)
  return mapped.length ? mapped : undefined
}

const mapTestimonials = (input?: any[]): TestimonialData[] | undefined => {
  if (!Array.isArray(input)) return undefined
  const mapped = input
    .map((testimonial) => {
      if (!testimonial || typeof testimonial === "string") return null
      const data = testimonial.value ?? testimonial
      return {
        id: data.id ?? data._id ?? undefined,
        name: data.name ?? undefined,
        role: data.role ?? data.company ?? undefined,
        testimonial: data.testimonial ?? undefined,
        rating: data.rating ?? undefined,
        photo: getMediaUrl(data.photo) ? { url: getMediaUrl(data.photo)! } : undefined,
      } satisfies TestimonialData
    })
    .filter(Boolean) as TestimonialData[]

  return mapped.length ? mapped : undefined
}

export default function HomePage({ formationsItems: formationsFromCollection, pageData }: HomePageProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [showEventPopup, setShowEventPopup] = useState(false)

  const blocks = useMemo(() => pageData?.pageBuilder ?? [], [pageData])

  const findBlock = (type: string) => blocks.find((block: any) => block?.blockType === type) ?? null

  const heroBlock = findBlock("homeHero")
  const heroData = {
    badgeText: heroBlock?.badgeText ?? defaultHero.badgeText,
    titleHighlight: heroBlock?.titleHighlight ?? defaultHero.titleHighlight,
    titleRest: heroBlock?.titleRest ?? defaultHero.titleRest,
    description: heroBlock?.description ?? defaultHero.description,
    backgroundImage: getMediaUrl(heroBlock?.backgroundImage, defaultHero.backgroundImage),
    primaryCta: {
      label: heroBlock?.primaryCTA?.label ?? defaultHero.primaryCta.label,
      href: heroBlock?.primaryCTA?.href ?? defaultHero.primaryCta.href,
      newTab: heroBlock?.primaryCTA?.newTab ?? defaultHero.primaryCta.newTab,
    } satisfies CTAData,
    stats: Array.isArray(heroBlock?.stats) && heroBlock.stats.length
      ? (heroBlock.stats as StatData[])
      : defaultHero.stats,
    enableEventPopup:
      typeof heroBlock?.enableEventPopup === "boolean"
        ? heroBlock.enableEventPopup
        : defaultHero.enableEventPopup,
  }

  const formationsBlock = findBlock("formationsGrid")
  const formationsUseCollection = formationsBlock?.useFormacoesCollection ?? defaultFormationsSection.useFormacoesCollection
  const manualFormations = mapFormationsItems(formationsBlock?.items)
  const formationsItems = formationsUseCollection
    ? formationsFromCollection?.length
      ? formationsFromCollection
      : defaultFormationItems
    : manualFormations ?? defaultFormationItems

  const formationsHeading = {
    badgeText: formationsBlock?.badgeText ?? defaultFormationsSection.badgeText,
    title: formationsBlock?.title ?? defaultFormationsSection.title,
    highlightedText: formationsBlock?.highlightedText ?? defaultFormationsSection.highlightedText,
    description: formationsBlock?.description ?? defaultFormationsSection.description,
  }

  const mentorBlock = findBlock("mentorSection")
  const mentorData: MentorData = {
    badgeText: mentorBlock?.badgeText ?? defaultMentorSection.badgeText,
    titlePrefix: mentorBlock?.titlePrefix ?? defaultMentorSection.titlePrefix,
    titleHighlight: mentorBlock?.titleHighlight ?? defaultMentorSection.titleHighlight,
    titleSuffix: mentorBlock?.titleSuffix ?? defaultMentorSection.titleSuffix,
    description: mentorBlock?.description ?? defaultMentorSection.description,
    backgroundImage: getMediaUrl(mentorBlock?.backgroundImage, defaultMentorSection.backgroundImage),
    paragraphs: mapParagraphs(mentorBlock?.paragraphs, defaultMentorSection.paragraphs),
    stats:
      Array.isArray(mentorBlock?.stats) && mentorBlock.stats.length
        ? (mentorBlock.stats as StatData[])
        : defaultMentorSection.stats,
  }

  const eventsBlock = findBlock("eventsGrid")
  const eventsData: EventsSectionData = {
    badgeText: eventsBlock?.badgeText ?? defaultEventsSection.badgeText,
    title: eventsBlock?.title ?? defaultEventsSection.title,
    highlightedText: eventsBlock?.highlightedText ?? defaultEventsSection.highlightedText,
    description: eventsBlock?.description ?? defaultEventsSection.description,
    items: mapFormationsItems(eventsBlock?.items) ?? defaultEventsSection.items,
  }

  const booksBlock = findBlock("booksHighlight")
  const booksData: BooksSectionData = {
    badgeText: booksBlock?.badgeText ?? defaultBooksSection.badgeText,
    titleHighlight: booksBlock?.titleHighlight ?? defaultBooksSection.titleHighlight,
    titleSuffix: booksBlock?.titleSuffix ?? defaultBooksSection.titleSuffix,
    description: mapParagraphs(booksBlock?.description, defaultBooksSection.description),
    image: getMediaUrl(booksBlock?.image, defaultBooksSection.image),
    cta: {
      label: booksBlock?.primaryCTA?.label ?? defaultBooksSection.cta.label,
      href: booksBlock?.primaryCTA?.href ?? defaultBooksSection.cta.href,
      newTab: booksBlock?.primaryCTA?.newTab ?? defaultBooksSection.cta.newTab,
    },
  }

  const transformationBlock = findBlock("transformationVideos")
  const transformationData = {
    accent: (transformationBlock?.accent ?? defaultTransformationContent.accent) as "yellow" | "red",
    orientation: (transformationBlock?.orientation ?? defaultTransformationContent.orientation) as "landscape" | "portrait",
    title: transformationBlock?.title ?? defaultTransformationContent.title,
    highlightedText: transformationBlock?.highlightedText ?? defaultTransformationContent.highlightedText,
    description: transformationBlock?.description ?? defaultTransformationContent.description,
    videos: Array.isArray(transformationBlock?.videos) && transformationBlock.videos.length
      ? transformationBlock.videos.map((video: any) => ({
          id: video?.videoId ?? "",
          title: video?.title ?? "",
          person: video?.person ?? "",
          description: video?.description ?? "",
          thumbnail: getMediaUrl(video?.thumbnail) || undefined,
          chipLabel: video?.chipLabel ?? undefined,
        })).filter((video: any) => video.id && video.title)
      : undefined,
    stats: Array.isArray(transformationBlock?.stats) && transformationBlock.stats.length
      ? transformationBlock.stats.map((stat: any) => ({
          icon: (stat?.icon ?? "star") as "star" | "zap" | "brain",
          title: stat?.title ?? "",
          description: stat?.description ?? "",
        })).filter((stat: any) => stat.title && stat.description)
      : undefined,
    cta: {
      label: transformationBlock?.cta?.label ?? defaultTransformationContent.cta.label,
      href: transformationBlock?.cta?.href ?? defaultTransformationContent.cta.href,
      newTab: transformationBlock?.cta?.newTab ?? defaultTransformationContent.cta.newTab,
    },
  }

  const trainingsBlock = findBlock("trainingsCta")
  const trainingsData: TrainingsSectionData = {
    badgeText: trainingsBlock?.badgeText ?? defaultTrainingsSection.badgeText,
    title: trainingsBlock?.title ?? defaultTrainingsSection.title,
    highlightedText: trainingsBlock?.highlightedText ?? defaultTrainingsSection.highlightedText,
    description: trainingsBlock?.description ?? defaultTrainingsSection.description,
    cta: {
      label: trainingsBlock?.cta?.label ?? defaultTrainingsSection.cta.label,
      href: trainingsBlock?.cta?.href ?? defaultTrainingsSection.cta.href,
      newTab: trainingsBlock?.cta?.newTab ?? defaultTrainingsSection.cta.newTab,
    },
  }

  const testimonialsBlock = findBlock("testimonials")
  const testimonialsData: TestimonialsSectionData = {
    badgeText: testimonialsBlock?.badgeText ?? defaultTestimonialsSection.badgeText,
    title: testimonialsBlock?.title ?? defaultTestimonialsSection.title,
    highlightedText: testimonialsBlock?.highlightedText ?? defaultTestimonialsSection.highlightedText,
    description: testimonialsBlock?.description ?? defaultTestimonialsSection.description,
    testimonials: mapTestimonials(testimonialsBlock?.testimonials),
    cta: {
      label: testimonialsBlock?.cta?.label ?? defaultTestimonialsSection.cta.label,
      href: testimonialsBlock?.cta?.href ?? defaultTestimonialsSection.cta.href,
      newTab: testimonialsBlock?.cta?.newTab ?? defaultTestimonialsSection.cta.newTab,
    },
  }

  const contactBlock = findBlock("contactSection")
  const contactData: ContactSectionData = {
    badgeText: contactBlock?.badgeText ?? defaultContactSection.badgeText,
    title: contactBlock?.title ?? defaultContactSection.title,
    highlightedText: contactBlock?.highlightedText ?? defaultContactSection.highlightedText,
    description: contactBlock?.description ?? defaultContactSection.description,
    email: contactBlock?.email ?? defaultContactSection.email,
    phone: contactBlock?.phone ?? defaultContactSection.phone,
    address: contactBlock?.address ?? defaultContactSection.address,
    mapEmbedUrl: contactBlock?.mapEmbedUrl ?? defaultContactSection.mapEmbedUrl,
    formSlug:
      typeof contactBlock?.form === "string"
        ? contactBlock.form
        : contactBlock?.form?.slug ?? contactBlock?.form?.id ?? defaultContactSection.formSlug,
  }

  const heroPrimaryStat = heroData.stats[0] ?? defaultHero.stats[0]
  const formationsList = formationsItems.length ? formationsItems : defaultFormationItems

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!heroData.enableEventPopup) {
      setShowEventPopup(false)
      return
    }
    const timer = setTimeout(() => setShowEventPopup(true), 3000)
    return () => clearTimeout(timer)
  }, [heroData.enableEventPopup])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src={heroData.backgroundImage}
            alt="Roberto Navarro"
            fill
            className="object-cover mt-24"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 xs-gap-4 sm:gap-8 lg:gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              {heroData.badgeText && (
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                  <span className="text-sm font-medium">{heroData.badgeText}</span>
              </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  {heroData.titleHighlight}
                </span>{" "}
                {heroData.titleRest}
              </h1>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">{heroData.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <Link
                    href={heroData.primaryCta.href}
                    {...(heroData.primaryCta.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {heroData.primaryCta.label}
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-medium">{heroPrimaryStat.value}</span> {heroPrimaryStat.label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease both;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-up {
          animation: slide-up 1s 0.2s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8);}
          60% { opacity: 1; transform: scale(1.1);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-bounce-in {
          animation: bounce-in 1s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>

      {/* Formações Section */}
      <section id="formacoes" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            {formationsHeading.badgeText && (
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">{formationsHeading.badgeText}</span>
            </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {formationsHeading.title}{" "}
              {formationsHeading.highlightedText && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  {formationsHeading.highlightedText}
                </span>
              )}
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">{formationsHeading.description}</p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs-gap-4 sm:gap-8">
            {formationsList.map((formation, index) => (
              <div
                key={`${formation.title}-${index}`}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col"
              >
                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    index === 0
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"
                      : "text-yellow-400"
                  }`}
                >
                  {formation.title}
                </h3>
                <p className="text-zinc-300 mb-6 flex-1">{formation.description}</p>
                <div className="mt-auto">
                  <Button
                    asChild
                    className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                  >
                    <Link href={formation.link || "#"}>
                      SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <QuemSomosSection {...mentorData} />

      {/* Eventos Section */}
      <section id="eventos" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            {eventsData.badgeText && (
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">{eventsData.badgeText}</span>
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {eventsData.title}{" "}
              {eventsData.highlightedText && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  {eventsData.highlightedText}
                </span>
              )}
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">{eventsData.description}</p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs-gap-4 sm:gap-8">
            {eventsData.items.map((event) => (
              <div
                key={event.title}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col"
              >
                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">{event.title}</h3>
                <p className="text-zinc-300 mb-6 flex-1">{event.description}</p>
                <div className="mt-auto">
                  <Button
                    asChild
                    className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full"
                  >
                    <Link href={event.link || "#"}>
                      SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Livros Section */}
      <section id="livros" className="py-12 xs-py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 xs-gap-4 sm:gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="relative h-[400px] w-full">
                  <Image
                    src={booksData.image}
                    alt="Livros de Roberto Navarro"
                    fill
                    className="object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div>
              {booksData.badgeText && (
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full py-2 px-4 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span className="text-sm font-medium text-yellow-300">{booksData.badgeText}</span>
                </div>
              )}

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  {booksData.titleHighlight}
                </span>{" "}
                {booksData.titleSuffix}
              </h2>

              <div className="space-y-6 mb-8">
                {booksData.description.map((paragraph, index) => (
                  <p key={`book-paragraph-${index}`} className="text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
              >
                <Link
                  href={booksData.cta.href}
                  {...(booksData.cta.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {booksData.cta.label} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Videos */}
      <TransformationVideos
        accent={transformationData.accent}
        orientation={transformationData.orientation}
        title={transformationData.title}
        highlightedText={transformationData.highlightedText}
        description={transformationData.description}
        videos={transformationData.videos}
        stats={transformationData.stats}
        cta={transformationData.cta}
      />

      {/* Treinamentos Section */}
      <section id="treinamentos" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            {trainingsData.badgeText && (
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">{trainingsData.badgeText}</span>
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {trainingsData.title}{" "}
              {trainingsData.highlightedText && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  {trainingsData.highlightedText}
                </span>
              )}
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">{trainingsData.description}</p>
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-lg"
            >
              <Link
                href={trainingsData.cta.href}
                {...(trainingsData.cta.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {trainingsData.cta.label} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection
        badgeText={testimonialsData.badgeText}
        title={testimonialsData.title}
        highlightedText={testimonialsData.highlightedText}
        description={testimonialsData.description}
        testimonials={testimonialsData.testimonials}
        cta={testimonialsData.cta}
      />

      {/* Contact Section */}
      <section id="contato" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            {contactData.badgeText && (
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">{contactData.badgeText}</span>
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {contactData.title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                {contactData.highlightedText}
              </span>{" "}
              CONOSCO
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">{contactData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs-gap-6 sm:gap-12 max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 xs-p-4 sm:p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-xl xs-text-lg sm:text-2xl font-bold mb-4 xs-mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                INFORMAÇÕES DE CONTATO
              </h3>
              <div className="space-y-3 xs-gap-3 sm:space-y-4">
                <p className="text-sm xs-text-sm sm:text-base text-zinc-300">
                  <strong>Email:</strong> {contactData.email}
                </p>
                <p className="text-sm xs-text-sm sm:text-base text-zinc-300">
                  <strong>Telefone:</strong> {contactData.phone}
                </p>
                <p className="text-sm xs-text-sm sm:text-base text-zinc-300">
                  <strong>Endereço:</strong> {contactData.address}
                </p>
              </div>
              <div className="mt-6 xs-mt-6 sm:mt-8">
                <h4 className="font-bold mb-3 xs-mb-3 sm:mb-4 text-base xs-text-base sm:text-lg">Localização</h4>
                <div className="rounded-xl overflow-hidden">
                  {contactData.mapEmbedUrl ? (
                    <iframe
                      src={contactData.mapEmbedUrl}
                      title="Localização"
                      className="h-64 w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
      <LocationMap />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 xs-p-4 sm:p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              <h3 className="text-xl xs-text-lg sm:text-2xl font-bold mb-4 xs-mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                ENVIE UMA MENSAGEM
              </h3>
              <form className="space-y-4 xs-gap-3 sm:space-y-4" data-form-slug={contactData.formSlug ?? undefined}>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="seuemail@exemplo.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Como podemos ajudar?"
                    required
                  ></textarea>
                </div>
                <Button className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3">
                  ENVIAR MENSAGEM
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Home" />

      <EventPopup
        isVisible={showEventPopup}
        onClose={() => setShowEventPopup(false)}
      />
    </div>
  )
}