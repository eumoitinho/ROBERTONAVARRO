"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  CheckCircle,
  Network,
  Brain,
  Target,
  Zap,
  Compass,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/header"
import HeroPages from "@/components/hero-pages"
import { SectionBadge } from "@/components/section-badge"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { submitLead } from "@/lib/actions"
import { getBrowserInfo, getUTMParameters } from "@/lib/utils"

interface RotaMindTemplateProps {
  formacao: any
}

const splitTitleDescription = (text: string) => {
  const separators = [" – ", " - ", ": "]
  for (const separator of separators) {
    if (text.includes(separator)) {
      const [title, ...rest] = text.split(separator)
      return {
        title: title.trim(),
        description: rest.join(separator).trim(),
      }
    }
  }
  const [first, ...rest] = text.split("\n")
  if (rest.length > 0) {
    return { title: first.trim(), description: rest.join(" ").trim() }
  }
  return { title: text, description: "" }
}

const getPlainText = (content: any): string | undefined => {
  if (!content) return undefined
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block?.type === "p") {
          return block.children?.map((child: any) => child.text || "").join("")
        }
        return block?.text || ""
      })
      .filter(Boolean)
      .join("\n")
  }
  return String(content)
}

export default function RotaMindTemplate({ formacao }: RotaMindTemplateProps) {
  const formSlug = formacao?.form
    ? typeof formacao.form === "object"
      ? formacao.form.slug
      : formacao.form
    : undefined

  const [formData, setFormData] = useState<Record<string, any>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    revenue: "",
    message: "",
    source: formacao?.title || "Rota Mind",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({})

  useEffect(() => {
    const utmParams = getUTMParameters()
    const browserInfo = getBrowserInfo()
    setFormData((prev) => ({
      ...prev,
      ...utmParams,
      ...browserInfo,
    }))
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    const payload = {
      ...formData,
      source: formacao?.title || "Rota Mind",
    }

    try {
      let result: { success?: boolean; message?: string; redirect?: string; error?: string } = {}

      if (formSlug) {
        const response = await fetch(`/api/forms/${formSlug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || result.message || "Erro ao enviar formulário")
        }
      } else {
        result = await submitLead(payload)
        if (!result.success) {
          throw new Error(result.message || "Erro ao enviar formulário")
        }
      }

      setSubmitStatus({
        success: true,
        message: result.message || "Dados enviados com sucesso! Entraremos em contato em breve.",
      })

      const redirectUrl = result.redirect || `/obrigado?source=${encodeURIComponent(formacao?.title || "Rota Mind")}`
      window.location.href = redirectUrl
    } catch (error: any) {
      setSubmitStatus({ success: false, message: error.message || "Erro ao enviar formulário" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigationItems =
    Array.isArray(formacao?.navigationItems) && formacao.navigationItems.length > 0
      ? formacao.navigationItems
      : [
          { title: "O Que É", href: "#o-que-e" },
          { title: "Benefícios", href: "#beneficios" },
          { title: "Mentor", href: "#mentor" },
          { title: "Inscreva-se", href: "#form", isButton: true },
        ]

  const challenges = Array.isArray(formacao?.challenges) && formacao.challenges.length > 0
    ? formacao.challenges.map((item: any) => {
        const parsed = splitTitleDescription(item.text || "")
        return {
          question: parsed.title,
          answer: parsed.description,
        }
      })
    : [
        {
          question: "Você pode ter todo o conhecimento técnico do mundo...",
          answer: "...mas sem as conexões certas, você continuará no mesmo lugar.",
        },
        {
          question: "Sente que está sempre correndo, mas sem sair do lugar?",
          answer: "As oportunidades circulam nos espaços certos, e é isso que o Rota Mind entrega.",
        },
        {
          question: "Tem dificuldade em pensar grande e definir metas ousadas?",
          answer: "No Rota Mind, quem está na mesa não está jogando pequeno. Está construindo crescimento, escala e legado.",
        },
        {
          question: "Precisa de apoio para tomar decisões estratégicas?",
          answer: "Imagine ter três conselheiros ao seu lado apoiando suas decisões e guiando seu crescimento.",
        },
        {
          question: "Busca parcerias estratégicas para seu negócio?",
          answer: "Conecte-se com empresários, investidores e tomadores de decisão em um ambiente seleto e exclusivo.",
        },
      ]

  const benefitsTypes = Array.isArray(formacao?.modules) && formacao.modules.length > 0
    ? formacao.modules.map((module: any) => ({
        title: module.title,
        description: module.description,
        benefits: Array.isArray(module.topics) ? module.topics.map((topic: any) => topic.text) : [],
      }))
    : [
        {
          title: "Networking de Alto Nível",
          description:
            "Conexões diretas com empresários, investidores e tomadores de decisão que podem transformar seu negócio e abrir portas que você nem imaginava existirem.",
          benefits: [
            "Acesso a um círculo seleto de empresários",
            "Conexões com investidores e tomadores de decisão",
            "Ambiente propício para parcerias estratégicas",
            "Oportunidades de negócios exclusivas",
            "Relacionamentos que geram resultados reais",
          ],
        },
        {
          title: "Parcerias Estratégicas",
          description:
            "Encontre sócios, investidores, fornecedores e clientes em potencial em um ambiente estruturado para gerar oportunidades reais de negócio e crescimento.",
          benefits: [
            "Encontre sócios para expandir seu negócio",
            "Conecte-se com investidores interessados",
            "Descubra fornecedores estratégicos",
            "Acesse novos clientes em potencial",
            "Crie alianças comerciais poderosas",
          ],
        },
        {
          title: "Treinamentos Exclusivos",
          description:
            "Conteúdos de alta performance sobre vendas, marketing, gestão, tecnologia e muito mais, entregues por Roberto Navarro e convidados estratégicos.",
          benefits: [
            "Estratégias avançadas de vendas e marketing",
            "Técnicas de gestão e liderança",
            "Inovação e tecnologia para negócios",
            "Inteligência financeira aplicada",
            "Conteúdo exclusivo não disponível em outros lugares",
          ],
        },
        {
          title: "Apoio de Conselheiros",
          description:
            "Tenha ao seu lado profissionais experientes que já percorreram o caminho, erraram, acertaram e construíram negócios de verdade para te ajudar nas decisões.",
          benefits: [
            "Orientação personalizada para seu negócio",
            "Feedback honesto e direto de especialistas",
            "Ajuda na tomada de decisões cruciais",
            "Visão externa e estratégica do seu negócio",
            "Experiência real de quem já esteve no seu lugar",
          ],
        },
      ]

  const advisoryBenefits = Array.isArray(formacao?.results) && formacao.results.length > 0
    ? formacao.results.map((item: any) => {
        const parsed = splitTitleDescription(item.text || "")
        return {
          title: parsed.title,
          description: parsed.description,
        }
      })
    : [
        {
          title: "Visão externa e estratégica",
          description: "Enxergamos seu negócio de fora e trazemos insights que você não percebe sozinho.",
        },
        {
          title: "Orientações",
          description: "Ajudamos você a tomar decisões cruciais em vendas, expansão, gestão, marketing, pessoas e finanças.",
        },
        {
          title: "Experiências reais",
          description: "Você aprende com quem já percorreu o caminho, errou, acertou e construiu negócios de verdade.",
        },
        {
          title: "Inteligência aplicada",
          description: "Munimos você com feedbacks, provocações e conselhos personalizados, aplicados à sua realidade.",
        },
      ]

  const faqs = Array.isArray(formacao?.faqs) && formacao.faqs.length > 0
    ? formacao.faqs.map((faq: any) => ({
        question: faq.question || faq.title || "",
        answer: getPlainText(faq.answer) || "",
      }))
    : [
        {
          question: "Quem pode participar do Rota Mind?",
          answer:
            "O Rota Mind é um clube seleto para empresários e empreendedores que já possuem um negócio estabelecido e buscam conexões estratégicas para acelerar seu crescimento. Analisamos cada perfil individualmente para garantir que todos os participantes possam contribuir e se beneficiar do ambiente.",
        },
        {
          question: "Como funciona a imersão de dois dias?",
          answer:
            "No primeiro dia, você terá acesso a conteúdos exclusivos sobre vendas, marketing, gestão, tecnologia e muito mais, entregues por Roberto Navarro e convidados estratégicos. No segundo dia, o ambiente se transforma em uma sala de negócios, onde os participantes fecham parcerias, discutem estratégias e recebem conselhos diretos de empresários e investidores.",
        },
        {
          question: "Qual é o investimento para participar?",
          answer:
            "O investimento varia de acordo com o perfil do participante e o tipo de acesso desejado. Após a análise do seu perfil, nossa equipe entrará em contato para apresentar as opções disponíveis e o valor do investimento.",
        },
        {
          question: "Onde e quando acontece o próximo Rota Mind?",
          answer:
            "As datas e locais dos próximos eventos são informados diretamente aos participantes selecionados. Geralmente, realizamos o Rota Mind em locais estratégicos e de fácil acesso nas principais capitais do Brasil.",
        },
        {
          question: "O que acontece após os dois dias de imersão?",
          answer:
            "Após a imersão, você continua fazendo parte do clube Rota Mind, com acesso a um grupo exclusivo onde as conexões e oportunidades continuam acontecendo. Além disso, você terá acesso a encontros virtuais periódicos e a possibilidade de participar de futuros eventos presenciais.",
        },
      ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] bg-repeat bg-[length:200px_200px] pointer-events-none"></div>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <SiteHeader navigationItems={navigationItems} showInicio />

      <HeroPages
        title={formacao.hero?.title || "ROTA MIND"}
        subtitle={formacao.hero?.subtitle || "Mastermind exclusivo"}
        secondtitle={formacao.hero?.badge || "O sucesso acontece no ambiente certo"}
        description={
          getPlainText(formacao.hero?.description) ||
          "O Rota Mind é um mastermind seleto para empresários que entendem que negócios não se fecham só com conhecimento técnico, mas com conexões. São dois dias de imersão, conteúdo de altíssimo nível e um clube de negócios que gera oportunidades reais, conselhos estratégicos e crescimento exponencial."
        }
        image={
          typeof formacao.hero?.backgroundImage === "object" && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : "/images/HERO_ROTAMIND.png"
        }
        ctaText={formacao.hero?.ctaText || "QUERO ESTAR ENTRE OS MAIORES!"}
        ctaHref={formacao.hero?.ctaLink || "#form"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-e"
        showCountdown={false}
      />

      {/* Challenges Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-900/95 to-zinc-900/90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <SectionBadge text="DESAFIOS" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              O QUE TE IMPEDE DE CRESCER NÃO É FALTA DE <span className="text-blue-400">TÉCNICA</span>. É FALTA DE{" "}
              <span className="text-blue-400">ACESSO</span>!
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Você pode passar anos estudando, dominando cada detalhe do seu setor e ainda assim assistir outras pessoas
              crescendo enquanto você fica no mesmo lugar. Sabe por quê? Porque negócios não são fechados apenas com
              conhecimento técnico — eles acontecem entre pessoas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((item, index) => {
              const IconComponent = [Brain, Compass, Target, Users, Network][index % 5]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl p-8 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-400/10 group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-blue-400/20 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-400/30 transition-colors duration-300">
                      <div className="w-8 h-8 flex items-center justify-center text-blue-400">
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

      {/* What Is Section */}
      <section id="o-que-e" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="SOBRE" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              O QUE É O <span className="text-blue-400">ROTA MIND</span>?
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed mb-12">
              O Rota Mind é um clube extremamente seleto de empresários que buscam muito mais do que conhecimento
              técnico. Buscam acelerar seus resultados, construir parcerias poderosas e ter ao seu lado pessoas que
              impulsionam seus negócios para outro nível.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
              <Image src="/images/rotamind-meeting.png" alt="Rota Mind Meeting" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white mb-2">Dois dias de imersão transformadora</h3>
                <p className="text-zinc-200 text-sm">Conteúdo de alta performance e conexões estratégicas</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-blue-400 mb-3">Dia 1: Conteúdo de Alta Performance</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Você mergulha em conteúdos de alta performance, entregues por Roberto Navarro e convidados
                  estratégicos. Aprenda sobre vendas, marketing, gestão, tecnologia e muito mais.
                </p>
              </div>

              <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-blue-400 mb-3">Dia 2: Clube de Negócios</h3>
                <p className="text-zinc-300 leading-relaxed">
                  O ambiente se transforma em uma sala de negócios, onde os participantes fecham parcerias, discutem
                  estratégias e recebem conselhos diretos de empresários e investidores.
                </p>
              </div>

              <div className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-blue-400 mb-3">Conexões que Geram Resultados</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Durante todo o evento, você se conectará com mentes brilhantes, trocará experiências e participará de
                  um Clube de Negócios estruturado para gerar parcerias, investidores, clientes e oportunidades reais.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-full px-8 py-4 text-base transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
            >
              <a href="#form">
                QUERO ESTAR ENTRE OS MAIORES! <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/95"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Clube Seleto", description: "Ambiente exclusivo com empresários de alto nível", icon: Users },
              { title: "Imersão de 2 Dias", description: "Conteúdo transformador e conexões estratégicas", icon: Calendar },
              { title: "Parcerias Reais", description: "Ambiente estruturado para fechar negócios", icon: Briefcase },
              { title: "Conselho Estratégico", description: "Apoio direto para decisões importantes", icon: Zap },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-zinc-900/40 backdrop-blur-lg border-zinc-700/30 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-2 rounded-3xl group"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-400/20 rounded-full p-4 mb-4 group-hover:bg-blue-400/30 transition-colors duration-300">
                    <item.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-400">{item.title}</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <SectionBadge text="BENEFÍCIOS" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              POR QUE <span className="text-blue-400">FAZER PARTE</span>?
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              O Rota Mind oferece muito mais do que um simples evento. É uma experiência transformadora que pode mudar
              completamente a trajetória do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefitsTypes.slice(0, 2).map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl p-8 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/10"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{benefit.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{benefit.description}</p>
                <ul className="space-y-3">
                  {benefit.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 text-blue-400 flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            {benefitsTypes.slice(2, 4).map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl p-8 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/10"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{benefit.title}</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">{benefit.description}</p>
                <ul className="space-y-3">
                  {benefit.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 text-blue-400 flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="CONSELHO" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              NO ROTA MIND, VOCÊ <span className="text-blue-400">NUNCA MAIS DECIDE SOZINHO</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Aqui você pode vender seu produto, fechar parcerias estratégicas, encontrar investidores e até trazer o
              Rota Mind para dentro da sua empresa. Imagine ter três conselheiros ao seu lado apoiando suas decisões e
              guiando seu crescimento. Aqui, você nunca estará sozinho.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryBenefits.map((item, index) => {
              const IconComponent = [Eye, Compass, MapPin, Brain][index % 4]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-700/30 rounded-3xl p-6 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="bg-blue-400/20 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                    <div className="text-blue-400">
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400">{item.title}</h3>
                  <p className="text-zinc-300 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-full px-8 py-4 text-base transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
            >
              <a href="#form">
                QUERO ESTAR ENTRE OS MAIORES! <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section id="mentor" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="MENTOR" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-blue-400">ROBERTO NAVARRO</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
                <Image src="/images/ROBERTO_4.JPG" alt="Roberto Navarro" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg">
                <Users className="h-8 w-8" />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-zinc-300 italic text-lg leading-relaxed">
                De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.
              </p>

              <p className="text-zinc-300 leading-relaxed">
                Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de
                escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua
                família.
              </p>

              <p className="text-zinc-300 leading-relaxed">
                Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua
                metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos.
                Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.
              </p>

              <p className="text-zinc-300 leading-relaxed">
                Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência
                financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão é
                clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de
                futuro.
              </p>

              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-full px-8 py-4 text-base transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
              >
                <a href="#form">
                  QUERO ESTAR ENTRE OS MAIORES! <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-900/95 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.03)_0%,_rgba(39,39,42,0.1)_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="INSCRIÇÃO" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              SE VOCÊ QUER CONTINUAR NO MESMO LUGAR, ESSE CLUBE <span className="text-blue-400">NÃO É PARA VOCÊ</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Agora, se você quer crescer e se conectar com quem realmente pode te levar mais longe, a sua oportunidade
              chegou! Preencha seus dados para ser selecionado no Rota Mind. Analisaremos seu perfil para entender se
              você se encaixa nos critérios deste clube seleto e exclusivo.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/30 rounded-3xl p-8 shadow-2xl shadow-blue-500/5">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus.message && (
                  <div
                    className={
                      submitStatus.success
                        ? "rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300"
                        : "rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300"
                    }
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-zinc-300">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                      placeholder="Nome da sua empresa"
                      value={formData.company}
                      onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="position" className="block text-sm font-medium text-zinc-300">
                    Cargo
                  </label>
                  <input
                    type="text"
                    id="position"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Seu cargo na empresa"
                    value={formData.position}
                    onChange={(event) => setFormData((prev) => ({ ...prev, position: event.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="revenue" className="block text-sm font-medium text-zinc-300">
                    Faturamento anual da empresa
                  </label>
                  <select
                    id="revenue"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    value={formData.revenue}
                    onChange={(event) => setFormData((prev) => ({ ...prev, revenue: event.target.value }))}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="até 100 mil">Até R$ 100 mil</option>
                    <option value="100 mil a 500 mil">R$ 100 mil a R$ 500 mil</option>
                    <option value="500 mil a 1 milhão">R$ 500 mil a R$ 1 milhão</option>
                    <option value="1 milhão a 5 milhões">R$ 1 milhão a R$ 5 milhões</option>
                    <option value="acima de 5 milhões">Acima de R$ 5 milhões</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300">
                    Por que você quer participar do Rota Mind?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    placeholder="Conte-nos um pouco sobre suas expectativas..."
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  ></textarea>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "QUERO ESTAR ENTRE OS MAIORES!"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <SectionBadge text="DÚVIDAS FREQUENTES" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              PERGUNTAS <span className="text-blue-400">FREQUENTES</span>
            </h2>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg leading-relaxed">
              Respostas para as dúvidas mais comuns sobre o Rota Mind
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
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

      {/* Final CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-blue-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              PRONTO PARA <span className="text-blue-400">TRANSFORMAR</span> SEU NEGÓCIO?
            </h2>
            <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
              Não perca a oportunidade de fazer parte deste clube seleto e exclusivo. Vagas limitadas!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-full px-12 py-6 text-xl transition-all duration-300 shadow-2xl hover:shadow-blue-400/25"
            >
              <a href="#form">
                QUERO ESTAR ENTRE OS MAIORES! <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer accent="blue" />
      <WhatsAppButton source={formacao?.title || "Rota Mind"} />
    </div>
  )
}
