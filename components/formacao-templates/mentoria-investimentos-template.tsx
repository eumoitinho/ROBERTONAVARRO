"use client"

import { useEffect } from "react"
import Image from "next/image"
import {
  CheckCircle,
  X,
  TrendingUp,
  Shield,
  BookOpen,
  BarChart3,
  Zap,
  Target,
  Brain,
  PiggyBank,
  Heart,
  Award,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"

interface MentoriaInvestimentosTemplateProps {
  formacao: any
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
        return ""
      })
      .filter(Boolean)
      .join("\n")
  }
  return String(content)
}

const splitTitleDescription = (text: string) => {
  const separators = [" – ", " - "]
  for (const separator of separators) {
    if (text.includes(separator)) {
      const [title, ...rest] = text.split(separator)
      return {
        title: title.trim(),
        description: rest.join(separator).trim(),
      }
    }
  }
  return { title: text, description: "" }
}

export default function MentoriaInvestimentosTemplate({ formacao }: MentoriaInvestimentosTemplateProps) {
  const formSlug = formacao?.form
    ? typeof formacao.form === "object"
      ? formacao.form.slug
      : formacao.form
    : undefined

  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
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
  }, [])

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Como Funciona", href: "#como-funciona" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  const heroDescription = getPlainText(formacao.hero?.description)
  const challenges = Array.isArray(formacao?.challenges) ? formacao.challenges : []
  const solutions = Array.isArray(formacao?.benefits) ? formacao.benefits : []
  const learnings = Array.isArray(formacao?.learnings) ? formacao.learnings : []
  const modules = Array.isArray(formacao?.modules) ? formacao.modules : []

  const mentor = Array.isArray(formacao?.mentors) && formacao.mentors.length > 0 ? formacao.mentors[0] : null
  const mentorImage =
    mentor && typeof mentor.photo === "object" && mentor.photo?.url
      ? mentor.photo.url
      : "/images/roberto.webp"
  const mentorParagraphs = mentor?.bio?.length
    ? mentor.bio.map((item: any) => item.text || item)
    : [
        "Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua família.",
        "Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 300 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.",
        "Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.",
      ]

  const moduleIcons = [TrendingUp, BarChart, BookOpen, Target, Shield]
  const guaranteeParagraphs = Array.isArray(formacao?.guarantee?.description)
    ? formacao.guarantee.description
        .map((block: any) => getPlainText(block))
        .filter(Boolean)
    : [getPlainText(formacao?.guarantee?.description)].filter(Boolean)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      <HeroPages
        title={formacao.hero?.title || formacao.title}
        subtitle={formacao.hero?.subtitle || "Faça seu dinheiro trabalhar por você"}
        description={heroDescription}
        image={
          typeof formacao.hero?.backgroundImage === "object" && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : "/images/HERO_MENTORIAINVESTIMENTOS.png"
        }
        ctaText={formacao.hero?.ctaText || "QUERO ME TORNAR UM INVESTIDOR!"}
        ctaHref={formacao.hero?.ctaLink || "#inscricao"}
        secondtitle={formacao.hero?.badge || "Transforme sua vida financeira com a mentoria de investimentos"}
      />

      <section className="py-20 relative" id="como-funciona">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">REPROGRAME SUA MENTE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">REPROGRAME SUA MENTE PARA INVESTIR COM SEGURANÇA</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/50 rounded-xl p-8 hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-red-400">PROBLEMAS COMUNS</h3>
              <div className="space-y-4">
                {challenges.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300 text-lg">{typeof item === "string" ? item : item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-green-500/50 rounded-xl p-8 hover:border-green-400 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-6 text-green-400">SOLUÇÕES DA MENTORIA</h3>
              <div className="space-y-4">
                {solutions.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-zinc-300 text-lg">
                      {typeof item === "string" ? item : item.description || item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              A MENTORIA QUE VAI TRANSFORMAR SUA RELAÇÃO COM O DINHEIRO
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              A Mentoria de Investimentos vai te ajudar a descobrir que o mundo dos investimentos é acessível, simples e lucrativo.
            </p>
            <p className="text-lg text-zinc-300 mb-8">
              Durante dois dias intensivos de mentoria, você será guiado por Roberto Navarro, um dos maiores educadores financeiros do Brasil, que vai te mostrar as estratégias reais e aplicáveis usadas por investidores bem-sucedidos.
            </p>
            <p className="text-lg text-zinc-300 mb-12">
              E o melhor: você ainda terá acesso à Universidade do Investidor, com aulas online que aprofundam seu aprendizado. Você vai sair desse treinamento com um plano prático, um novo nível de consciência sobre seu dinheiro e pronto para investir com confiança e segurança.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-4 rounded-lg cta-hover"
              onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
            >
              QUERO ME TORNAR UM INVESTIDOR!
            </Button>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O QUE VOCÊ VAI APRENDER NA FORMAÇÃO</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {learnings.map((item: any, index: number) => {
              const parsed = splitTitleDescription(typeof item === "string" ? item : item.text || "")
              const icons = [TrendingUp, Shield, BarChart3, Zap, Target, Brain, PiggyBank, Heart, BookOpen]
              const IconComponent = icons[index % icons.length]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="mb-4">
                    <IconComponent className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{parsed.title}</h3>
                  <p className="text-zinc-300">{parsed.description || parsed.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">INVESTIR NÃO É APOSTA</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((item: any, index: number) => {
                const IconComponent = moduleIcons[index % moduleIcons.length]
                return (
                  <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                    <div className="mb-4">
                      <IconComponent className="h-8 w-8 text-yellow-400" />
                    </div>
                    <p className="text-lg font-medium text-zinc-300">{item.title}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">SEU MENTOR</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">APRENDA COM O MENTOR DOS MENTORES</h2>
              <p className="text-xl text-yellow-400 font-semibold">
                O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src={mentorImage}
                  alt={mentor?.name || "Roberto Navarro"}
                  width={400}
                  height={400}
                  className="rounded-xl mx-auto"
                />
              </div>
              <div className="space-y-6">
                {mentorParagraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-lg text-zinc-300">
                    {paragraph}
                  </p>
                ))}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-4 rounded-lg cta-hover"
                  onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
                >
                  QUERO ME TORNAR UM INVESTIDOR!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={formacao?.testimonials} />

      <section id="depoimentos" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">TRANSFORMAÇÕES QUE FALAM POR SI</h2>
            <div className="aspect-video bg-zinc-900/50 rounded-xl overflow-hidden mb-8">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/k3GPTo26Fn4"
                title="Depoimentos Mentoria de Investimentos"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold text-lg px-8 py-4 rounded-lg cta-hover"
              onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
            >
              QUERO ME TORNAR UM INVESTIDOR!
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">GARANTIAS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">INVESTIMENTO SEGURO</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <div className="mb-4">
                  <Shield className="h-12 w-12 text-yellow-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Garantia legal de 7 dias</h3>
                <p className="text-zinc-300">
                  {guaranteeParagraphs[0] ||
                    "Seu investimento em si mesmo é protegido por uma garantia de satisfação total. Se, por algum motivo, dentro dos primeiros 7 dias de acesso à formação, você decidir que o treinamento não está alinhado com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago."}
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                <div className="mb-4">
                  <Award className="h-12 w-12 text-yellow-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Garantia de resultados em 6 meses</h3>
                <p className="text-zinc-300">
                  {guaranteeParagraphs[1] ||
                    "Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma melhoria significativa em sua vida financeira dentro de poucos dias, devolveremos o dobro do seu investimento no curso. Isso demonstra não apenas a confiança na eficácia de nosso método, mas também nosso compromisso com o seu progresso e resultados."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">PERGUNTAS FREQUENTES</h2>
            </div>
            <div className="space-y-8">
              {(Array.isArray(formacao?.faqs) ? formacao.faqs : []).map((faq: any, index: number) => (
                <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">{faq.question}</h3>
                  <p className="text-zinc-300">{getPlainText(faq.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterFormacoes
        title="PRONTO PARA TRANSFORMAR SUA VIDA FINANCEIRA?"
        description="Junte-se a milhares de pessoas que já transformaram sua relação com o dinheiro através da Mentoria de Investimentos."
        source="Mentoria de Investimentos"
        ctaText="QUERO ME TORNAR UM INVESTIDOR!"
        formSlug={formSlug}
      />

      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-zinc-400">© 2024 Roberto Navarro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
