"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Users,
  Zap,
  Shield,
  Award,
  BookOpen,
  Lightbulb,
  DollarSign,
  BarChart,
  Target,
  Briefcase,
  CheckCircle,
  GraduationCap,
  FileText,
  Video,
  Globe,
  TrendingUp,
  Star,
} from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HeroPagesRed from "@/components/events/hero-pages-red"
import Footer from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/header"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import NotableParticipants from "@/components/events/notable-persons"
import TransformationVideos from "@/components/marketing/transformation-videos"
import { cn } from "@/lib/utils"
import type { FormationPageData } from "@/sanity/lib/formations-api"

interface Props {
  data: FormationPageData
}

const viewportConfig = { once: true, amount: 0.2 } as const

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
}

const SectionBackdrop = ({ variant = "default" }: { variant?: "default" | "muted" | "intense" }) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        variant === "intense"
          ? "bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.25)_0%,_rgba(0,0,0,0)_60%)] opacity-80"
          : variant === "muted"
            ? "bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.12)_0%,_rgba(0,0,0,0)_60%)] opacity-55"
            : "bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.18)_0%,_rgba(0,0,0,0)_62%)] opacity-65",
      )}
    />
  </>
)

const primaryButtonBase =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950"

export default function EducadorFinanceiroClient({ data }: Props) {
  const n = data
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          eventId: 2, // ID do evento "Educador Financeiro"
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
  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Sobre o Curso", href: "#sobre-curso" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-red-950/5 to-zinc-950 text-white">
      {/* Header */}
      <SiteHeader navigationItems={navigationItems} showInicio={true} />
      <HeroPagesRed
        title={n.hero?.title || "EDUCADOR FINANCEIRO"}
        secondtitle={n.hero?.subtitle || "A única formação do mercado com LICENÇA PROFISSIONAL chancelada pela Roberto Navarro Academia - RNA"}
        subtitle={n.hero?.subtitle || ""}
        description={n.hero?.description || `Torne-se um Educador Financeiro licenciado com certificação reconhecida pelo MEC. Transforme vidas enquanto constrói sua própria prosperidade com respaldo profissional e metodologia validada.`}
        image={n.hero?.backgroundImage?.asset?.url || "/images/HERO_EDUCADOR.png"}
        ctaText={n.hero?.ctaText || "QUERO MINHA LICENÇA PROFISSIONAL!"}
        ctaHref={n.hero?.ctaLink || "#inscricao"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre-curso"
      />

      {/* MEC Certification Section - Enhanced */}
      <section className="py-16 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* MEC Seal - Left side */}
              <div className="md:col-span-2 flex justify-center">
                <div className="relative certificate-animation">
                  <Image
                    src={n.mecSection?.image?.asset?.url || "/images/MEC.png"}
                    alt="Reconhecido pelo MEC"
                    width={240}
                    height={240}
                    className="z-10 relative"
                  />
                  <div className="absolute inset-0 bg-red-500/20 rounded-full filter blur-xl -z-10"></div>
                </div>
              </div>

              {/* Content - Right side */}
              <div className="md:col-span-3 space-y-6">
                <h3
                  className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 certificate-item"
                  style={{ animationDelay: "0.1s" }}
                >
                  {n.mecSection?.heading || 'EXCELÊNCIA RECONHECIDA PELO MINISTÉRIO DA EDUCAÇÃO'}
                </h3>

                <p
                  className="text-zinc-300 text-lg leading-relaxed certificate-item"
                  style={{ animationDelay: "0.3s" }}
                >
                  {n.mecSection?.description || (
                    <>Formação com <span className="text-red-400 font-semibold">certificação oficial</span> que valida suas competências e abre portas no mercado. Um diferencial que comprova a qualidade do nosso método e garante credibilidade à sua atuação profissional.</>
                  )}
                </p>

                <div className="pt-2 certificate-item" style={{ animationDelay: "0.5s" }}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {(n.mecSection?.points || [
                      'Reconhecimento nacional',
                      'Validação profissional',
                      'Credibilidade garantida',
                    ]).map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-red-400" />
                        <span className="text-zinc-200">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional License Section - Premium */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="intense" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center mb-10">
                <div className="inline-block mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-[2px] rounded-full">
                    <div className="bg-zinc-900 rounded-full px-6 py-3">
                      <span className="text-red-400 font-bold text-sm tracking-wider">DIFERENCIAL EXCLUSIVO</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  SUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">LICENÇA PROFISSIONAL</span> PARA ATUAR COMO EDUCADOR FINANCEIRO
                </h2>
                
                <p className="text-xl text-zinc-200 mb-8">
                  Esta é a <strong className="text-red-400">ÚNICA formação do mercado</strong> que te concede uma Licença Profissional 
                  chancelada pela Roberto Navarro Academia (RNA)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">{n.licenseSection?.transformationsTitle || 'Essa será sua transformação:'}</h3>
                  <ul className="space-y-4">
                    {(n.licenseSection?.transformations || [
                      "Licença para atuar como Educador Financeiro",
                      "Respeito profissional no mercado",
                      "Mais valorização do seu serviço",
                      "Respaldo do ICF para ensinar sobre geração de riqueza",
                      "Ampliar o número de clientes ativos",
                      "Consolidar uma carreira próspera e segura"
                    ]).map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">{n.licenseSection?.benefitsTitle || 'Benefícios da Licença:'}</h3>
                  <ul className="space-y-4">
                    {(n.licenseSection?.benefits || [
                      "Mais poder nas suas negociações",
                      "Mais otimismo na sua carreira",
                      "Mais admiração no seu círculo social",
                      "Licença chancelada pela RNA",
                      "Respaldo profissional que reduz a concorrência",
                      "Ganhos maiores que os demais profissionais"
                    ]).map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-zinc-900/50 rounded-2xl p-6 border border-red-500/20">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Shield className="h-8 w-8 text-red-400" />
                  <h3 className="text-2xl font-bold text-center text-red-400">
                    {n.licenseSection?.statement || 'Em breve irão sobreviver no mercado apenas quem tiver respeitada Licença Profissional!'}
                  </h3>
                </div>
                <p className="text-center text-zinc-300">
                  Roberto Navarro criou essa Licença para separar os Profissionais dos amadores. 
                  Garanta sua posição no mercado com a credibilidade de quem é referência nacional em educação financeira.
                </p>
              </div>

              <div className="text-center mt-8">
                <Button
                  className={cn(
                    primaryButtonBase,
                    "px-10 py-5 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1",
                  )}
                  onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
                >
                  GARANTIR MINHA LICENÇA PROFISSIONAL <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-curso" className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">SOBRE O CURSO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SEJA UM AGENTE DA MUDANÇA E ENSINE O CAMINHO PARA A <span className="text-red-400">PROSPERIDADE</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-500"></div>
                <Image
                  src="/images/ROBERTO_5.jpg"
                  alt="Educador Financeiro Workshop"
                  width={500}
                  height={440}
                  className="w-[1000px] h-[500px] object-cover hover:scale-105 transition-transform duração-500"
                  style={{ objectPosition: "top" }}
                />
              </div>
            </div>

            <div>
              <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
                <p>
                  Com <span className="text-red-400 font-semibold">certificação reconhecida pelo MEC</span>, a
                  formação de Educador Financeiro é o seu passaporte para uma nova realidade de propósito e
                  prosperidade.
                </p>
                <p>
                  Em  <span className="text-red-400 font-semibold">poucos dias</span>, você verá resultados
                  concretos em sua vida e aprenderá como dominar os fundamentos da educação financeira e aplicar os
                  conhecimentos na prática.
                </p>
 
                <p>
                  Além de possibilitar seu crescimento individual, você desenvolverá{" "}
                  <span className="text-red-400">habilidades pedagógicas e de comunicação</span> para transmitir esse
                  conhecimento de forma eficaz, seja em consultorias, palestras ou cursos. O mercado busca educadores
                  financeiros qualificados, e você estará pronto para atender a essa demanda.
                </p>

                <p>
                  Além de impactar vidas, a formação abre portas para{" "}
                  <span className="text-red-400">novas fontes de renda</span> e permite que você construa um negócio
                  sólido e rentável no campo da educação financeira.
                </p>
              </div>

              <Button
                className={cn(primaryButtonBase, "mt-8 px-8 py-4 text-base")}
                onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              >
                QUERO SER UM EDUCADOR FINANCEIRO! <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Materials Section */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="intense" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/80 to-red-500/60 border border-red-400/60 rounded-full px-5 py-2 uppercase tracking-[0.25em] text-xs text-red-100 shadow-[0_0_25px_rgba(239,68,68,0.25)]">
                {n.exclusiveMaterials?.badge || 'MATERIAIS EXCLUSIVOS'}
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                  {n.exclusiveMaterials?.heading || (
                    <>EXPERIMENTE A <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">IMERSÃO</span> DO EDUCADOR FINANCEIRO</>
                  )}
                </h2>
                <p className="text-lg text-zinc-300 max-w-2xl">
                  {n.exclusiveMaterials?.description || 'Tenha uma prévia da jornada com materiais oficiais, bastidores e um vídeo de apresentação conduzido pelo time da RNA. Explore o ritmo da formação antes de garantir sua vaga definitiva.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {(n.exclusiveMaterials?.chips || [
                  "Download de apostilas e exercícios selecionados",
                  "Bastidores da metodologia com orientações do time",
                  "Vídeo introdutório guiado pela equipe oficial RNA",
                  "Checklist para acelerar seus primeiros atendimentos",
                ]).map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/80 via-zinc-950/70 to-red-900/40 p-4 backdrop-blur-sm shadow-[0_0_25px_rgba(239,68,68,0.15)]"
                  >
                    <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-200">{item}</p>
                  </div>
                ))}
              </div>

              <Button
                className={cn(primaryButtonBase, "mt-2 w-full sm:w-auto px-8 py-4 text-base shadow-[0_0_35px_rgba(239,68,68,0.35)]")}
                onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              >
                {(n.exclusiveMaterials?.ctaText || 'ACESSAR PRÉVIA EXCLUSIVA')} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative w-full max-w-[360px] mx-auto">
              <div className="absolute -inset-10 bg-[radial-gradient(circle,_rgba(239,68,68,0.35)_0%,_rgba(0,0,0,0)_60%)] blur-3xl opacity-90" />
              <div className="relative rounded-[32px] border border-red-500/50 bg-gradient-to-br from-red-950/80 via-zinc-950/70 to-red-900/60 p-4 shadow-[0_25px_70px_rgba(239,68,68,0.35)] backdrop-blur">
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-red-400 animate-pulse" aria-hidden />
                <div className="relative overflow-hidden rounded-3xl aspect-[9/16] bg-black">
                  <video
                    src={n.exclusiveMaterials?.videoSrc || "/educador/WhatsApp%20Video%202025-08-21%20at%2010.38.45.mp4"}
                    controls
                    playsInline
                    poster={(n.exclusiveMaterials?.videoPoster as any)?.asset?.url || "/images/HERO_EDUCADOR_MOBILE.png"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">RECURSOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TUDO O QUE VOCÊ PRECISA PARA <span className="text-red-400">TRANSFORMAR SUA CARREIRA</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(n.features?.items || []).map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10"
              >
                {/* Ícones configuráveis podem ser tratados aqui se necessário */}
                <h3 className="text-xl font-bold mb-2 text-red-400">{feature.title}</h3>
                <p className="text-zinc-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              BENEFÍCIOS DA <span className="text-red-400">FORMAÇÃO</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <DollarSign className="h-6 w-6 text-red-400" />,
                title: "Independência financeira",
                description:
                  "Aprenda a aplicar os conceitos ensinados em sua própria vida e alcance estabilidade e liberdade financeira.",
              },
              {
                icon: <Award className="h-6 w-6 text-red-400" />,
                title: "Reconhecimento profissional",
                description:
                  "Torne-se referência no ensino de finanças e conquiste autoridade e credibilidade na área.",
              },
              {
                icon: <Target className="h-6 w-6 text-red-400" />,
                title: "Realização de sonhos",
                description:
                  "Use seu novo conhecimento para alcançar objetivos pessoais e inspirar outros a fazerem o mesmo.",
              },
              {
                icon: <BarChart className="h-6 w-6 text-red-400" />,
                title: "Alta rentabilidade",
                description: "Transforme a educação financeira em uma fonte real de renda com potencial escalável.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-red-400">{benefit.title}</h3>
                    <p className="text-zinc-300">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">MÓDULOS DO CURSO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              CONTEÚDO <span className="text-red-400">COMPLETO E ESTRUTURADO</span>
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
              Formação completa com mais de 40 aulas organizadas em 5 módulos + bônus exclusivos
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Módulo Inicial */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <GraduationCap className="h-6 w-6" />
                  MÓDULO INICIAL - MUDANÇA DE MENTALIDADE
                </h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-4">
                {[
                  "Introdução à Virada de Chave",
                  "Qualidade de Vida",
                  "A Importância da Qualidade de Vida",
                  "O que é Muito Dinheiro pra Você?",
                  "Maiores Erros e Acertos com o Dinheiro",
                  "Como você quer se Sentir?",
                  "O que te motiva?",
                  "Custo de Vida",
                  "Sentimento com o Dinheiro"
                ].map((aula, index) => (
                  <div key={index} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm">{aula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulo 2 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  MÓDULO 2 - CLAREAMENTO FINANCEIRO
                </h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-4">
                {[
                  "Introdução à Clareza Financeira",
                  "Causa das Dívidas",
                  "Despesas Fantasmas",
                  "Tomada de Decisão",
                  "Classificação de Contas",
                  "Dívida Boa X Dívida Ruim",
                  "Qual o tipo de Dívida você tem?",
                  "A Mágica dos Juros Compostos"
                ].map((aula, index) => (
                  <div key={index} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm">{aula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulo 3 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  MÓDULO 3 - A GERAÇÃO DO DINHEIRO
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-zinc-400 mb-4">(Te preparando pro Mercado)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Introdução à Geração de Dinheiro",
                    "Triatlon da Riqueza",
                    "Renda Principal e Perguntas",
                    "Renda Extra",
                    "Renda Passiva",
                    "Limitações Financeiras",
                    "Teste a sua meta",
                    "Oportunidade de Renda - MMN e Venda Direta",
                    "Oportunidade de Renda - Negócio Próprio, Franquia, Licença",
                    "Oportunidade de Renda - Marketing Digital",
                    "Oportunidade de Renda - Coach",
                    "Make Money"
                  ].map((aula, index) => (
                    <div key={index} className="flex items-center gap-3 text-zinc-300">
                      <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <span className="text-sm">{aula}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Módulo 4 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <BarChart className="h-6 w-6" />
                  MÓDULO 4 - LIBERDADE FINANCEIRA E INVESTIMENTOS
                </h3>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-4">
                {[
                  "Introdução e Fundo de Investimentos",
                  "Fundo de Investimentos - Multimercado",
                  "Fundo de Ações",
                  "Renda Fixa - CDB",
                  "Renda Fixa - Debentures",
                  "Renda Fixa - LCI e LCA",
                  "Renda Fixa - Tesouro Direto",
                  "Home Brocker - Ações",
                  "Conclusão do Curso"
                ].map((aula, index) => (
                  <div key={index} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm">{aula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Módulo 5 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Star className="h-6 w-6" />
                  MÓDULO 5 - FINANÇAS COM ROBERTO NAVARRO
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-zinc-400 mb-4">Apostila de Acompanhamento incluída</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Ciência da Riqueza",
                    "Pilares da Riqueza",
                    "Padrão de Gastos",
                    "Projeto Reduzir para Prosperidade",
                    "Oportunidade de Renda Extra",
                    "Como Garantir um Futuro com Muito Dinheiro",
                    "Como Construir sua Riqueza"
                  ].map((aula, index) => (
                    <div key={index} className="flex items-center gap-3 text-zinc-300">
                      <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <span className="text-sm">{aula}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bônus Section */}
            <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <Award className="h-6 w-6" />
                  BÔNUS EXCLUSIVOS
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-red-400">Materiais e Ferramentas</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-300 text-sm">5 apostilas físicas com mais de 30 exercícios e dinâmicas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-300 text-sm">Scripts de vendas validados e testados</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-300 text-sm">Acesso vitalício com atualizações mensais</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-red-400">Cursos Bônus</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-300 text-sm">Curso de Comunicação para vendas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-300 text-sm">Mentoria Como Atrair Riqueza</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-300 text-sm">Curso Viva Livre das Dívidas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                        <span className="text-zinc-300 text-sm">Aprenda a criar uma Landing Page Lucrativa</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-zinc-900/50 rounded-2xl border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="h-6 w-6 text-red-400" />
                    <h4 className="text-lg font-semibold text-red-400">Bônus Especial</h4>
                  </div>
                  <p className="text-zinc-300 mb-4">
                    <strong className="text-red-400">3 dias intensos ao Vivo Online com Roberto Navarro!</strong>
                  </p>
                  <p className="text-zinc-300 text-sm">
                    Além das aulas gravadas, você terá acesso a um intensivo ao vivo com o próprio Roberto Navarro, 
                    onde poderá tirar dúvidas, receber orientações personalizadas e aprofundar seu conhecimento com 
                    o maior educador financeiro do Brasil.
                  </p>
                </div>

                <div className="mt-6 p-6 bg-zinc-900/50 rounded-2xl border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-red-400" />
                    <h4 className="text-lg font-semibold text-red-400">Afiliação Premium</h4>
                  </div>
                  <p className="text-zinc-300 text-sm">
                    Possibilidade de se afiliar com produto de <strong className="text-red-400">70% de comissão</strong>, 
                    permitindo que você monetize seu conhecimento enquanto ajuda outras pessoas a transformarem suas vidas financeiras.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed Trainer Section */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">OPORTUNIDADE EXCLUSIVA</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              SEJA UM{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                TREINADOR LICENCIADO
              </span>{" "}
              DO INSTITUTO COACHING FINANCEIRO
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-zinc-300 text-lg">
              <p>
                Além de se formar como Educador Financeiro, você poderá atuar como treinador licenciado dos cursos
                oficiais do Instituto Coaching Financeiro (ICF).
              </p>
              <p>
                Ao concluir a formação, você estará apto a revender treinamentos selecionados do ICF, utilizando o
                material didático oficial e emitindo certificados com a sua assinatura, reconhecidos diretamente pelo
                instituto. Ou seja: você já sai com um modelo de negócio pronto para gerar renda.
              </p>
              <p className="text-red-400 font-semibold">Confira os treinamentos disponíveis:</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(n.trainerSection?.courses || []).map((course, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10"
              >
                <div className="h-1 w-full bg-gradient-to-r from-red-400 to-red-500"></div>
                <div className="p-6">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-xl bg-zinc-800 flex items-center justify-center">
                    <Image
                      src={(course as any).image?.asset?.url || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-red-400">{course.title}</h3>
                  <p className="text-zinc-300 mb-6">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="intense" />
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.mentorSection?.badge || 'SEU MENTOR'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {n.mentorSection?.title || <>APRENDA COM O MENTOR DOS <span className="text-red-400">MENTORES</span></>}
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
              {(n.mentorSection?.paragraphs && n.mentorSection.paragraphs[0]) || 'O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-500"></div>
                <Image
                  src="/images/ROBERTO_12.jpg"
                  alt="Roberto Navarro"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">Roberto Navarro</h3>
              <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
                <p>
                  Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando
                  vidros de carros aos 13 anos e, com determinação, construiu um caminho até se tornar multimilionário
                  em menos de sete anos.
                </p>
                <p>
                  Atualmente, é reconhecido como o{" "}
                  <span className="text-red-400">maior Educador Financeiro do Brasil</span> e criador do Coach
                  Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência
                  emocional e princípios bíblicos, proporcionando resultados reais para quem busca sair das dívidas,
                  construir riqueza e alcançar liberdade.
                </p>
                <p>
                  Ao longo de sua trajetória, já impactou <span className="text-red-400">mais de 13 mil alunos</span>{" "}
                  no Brasil e no mundo.
                </p>
                <p>
                  Além de mentor e empreendedor, é autor de best-sellers e especialista em inteligência espiritual e
                  emocional. Hoje, sua missão é clara: {" "}
                  <span className="text-red-400">ajudar 10 milhões de brasileiros</span> a conquistarem uma vida
                  próspera, com autonomia e visão de futuro.
                </p>
              </div>

              <Button
                className={cn(primaryButtonBase, "mt-8 px-8 py-4 text-base")}
                onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              >
                QUERO SER UM EDUCADOR FINANCEIRO! <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
  <TransformationVideos accent="red" />

  <NotableParticipants accent="red" />
      {/* Guarantees Section */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.guarantees?.badge || 'GARANTIAS'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.guarantees?.title || (
                <>INVESTIMENTO{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  SEGURO
                </span></>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  {(n.guarantees?.items || []).map((guarantee, index) => (
    <div
      key={index}
      className={`bg-zinc-900/50 backdrop-blur-sm border rounded-3xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10 ${
        guarantee.title === 'Garantia de resultados em 6 meses'
          ? 'border-red-400/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
          : 'border-zinc-800/50'
      }`}
    >
      <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
        <Shield className="h-6 w-6 text-red-400" />
      </div>
      <h3 className="text-xl font-bold mb-4 text-center text-red-400">{guarantee.title}</h3>
      <p className="text-zinc-300 text-center">{guarantee.description}</p>
    </div>
  ))}
</div>
        </div>
      </section>

      <NewsletterFormacoes
        onSubmit={() => {}}
        title={n.newsletter?.title || "ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR"}
        description={n.newsletter?.description || "Participe da formação que já mudou milhares de vidas e pode mudar a sua. Preencha seus dados abaixo e dê o primeiro passo rumo à liberdade financeira."}
        source="Educador Financeiro"
        ctaText={n.newsletter?.ctaText || "QUERO SER UM EDUCADOR FINANCEIRO!"}
        accent="red"
            />
            <div aria-hidden className="h-16 md:h-24" />

            {/* FAQ Section */}
      <section className="py-20 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              DÚVIDAS{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                COMUNS
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Encontre respostas para as perguntas mais frequentes sobre a formação de Educador Financeiro.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Preciso ter experiência prévia em finanças?",
                  answer:
                    "Não é necessário ter experiência prévia em finanças. O curso foi desenhado para pessoas em diferentes níveis de conhecimento, desde iniciantes até profissionais que já atuam na área e desejam aprimorar suas habilidades como educadores financeiros.",
                },
                {
                  question: "Quanto tempo leva para eu começar a ter resultados?",
                  answer:
                    "Os resultados variam de acordo com o comprometimento e dedicação de cada aluno. No entanto, muitos dos nossos alunos começam a ver resultados já nas primeiras semanas, aplicando os conhecimentos em sua própria vida financeira e iniciando seus primeiros atendimentos como educadores financeiros.",
                },
                {
                  question: "Como funciona a certificação?",
                  answer:
                    "Ao concluir o curso com aproveitamento mínimo de 70% nas avaliações, você receberá um certificado reconhecido pelo MEC que comprova suas habilidades como Educador Financeiro. Este certificado é um diferencial importante para quem deseja atuar profissionalmente na área.",
                },
                {
                  question: "Posso trabalhar como Educador Financeiro em qualquer lugar do Brasil?",
                  answer:
                    "Sim! Uma das grandes vantagens desta formação é a flexibilidade. Você pode atuar como Educador Financeiro presencialmente em sua cidade ou região, ou trabalhar de forma online, atendendo clientes de qualquer lugar do Brasil e até mesmo do exterior.",
                },
                {
                  question: "Terei suporte após a conclusão do curso?",
                  answer:
                    "Sim, oferecemos suporte contínuo após a conclusão do curso. Você terá acesso a uma comunidade exclusiva de educadores financeiros, além de mentorias periódicas e materiais atualizados para continuar aprimorando suas habilidades.",
                },
                {
                  question: "A formação serve para gerar renda ou só para melhorar minha vida pessoal?",
                  answer:
                    "As duas coisas. Você aprenderá a transformar sua própria vida financeira e também como transformar esse conhecimento em uma fonte de renda.",
                },
                {question: "O curso tem carga horária flexível?",
                  answer:
                    "Sim. O conteúdo é online, com acesso 24h por dia, permitindo que você estude no seu ritmo e de onde quiser.",
                },
                {question: "É possível se tornar um treinador licenciado?",
                  answer: 
                    "Sim. Após a formação, você poderá se tornar um treinador oficial do Instituto Coaching Financeiro, com direito a revender treinamentos certificados e gerar renda com um modelo de negócio já validado.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-zinc-800 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-zinc-800/50 text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-zinc-900/50 text-zinc-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

  <Footer accent="red" />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        source="Educador Financeiro"
        className="custom-class"
      />
    </div>
  )
}



