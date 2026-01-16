"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Users,
  Zap,
  DollarSign,
  BarChart,
  Building,
  TrendingUp,
  UserPlus,
  Users2,
  BedDouble,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import QuemSomosSection from "@/components/mentor"
import { FaMoneyBill } from "react-icons/fa"

interface EmpreendedorInteligenteTemplateProps {
  formacao: any
}

type CardItem = {
  title: string
  description: string
}

const fallbackChallenges: CardItem[] = [
  {
    title: "Você fatura, mas não lucra?",
    description: "Aprenda a formar caixa, controlar gastos invisíveis e parar de pagar juros desnecessários.",
  },
  {
    title: "Quer crescer, mas está preso à operação?",
    description: "Crie um modelo de gestão inteligente para ter mais tempo e liberdade sem comprometer os resultados.",
  },
  {
    title: "Dificuldade para contratar pessoas?",
    description: "Descubra como atrair, treinar e reter talentos que realmente vestem a camisa da sua empresa.",
  },
  {
    title: "Sente que ninguém entende seus desafios?",
    description: "Participe de uma imersão com networking de alto nível e troque com empresários como você.",
  },
]

const fallbackLearnings = [
  {
    title: "Crédito inteligente",
    description: "Pare de ser refém de bancos e aprenda a acessar capital de giro sem taxas abusivas.",
  },
  {
    title: "Contabilidade estratégica",
    description: "Use a contabilidade como aliada do lucro e da tomada de decisão.",
  },
  {
    title: "Sócios e investidores",
    description: "Estruture sua empresa para atrair investimentos sem abrir mão do controle.",
  },
  {
    title: "Time comprometido",
    description: "Monte um time que entrega resultado, mesmo quando você não está por perto.",
  },
  {
    title: "Modelo de vendas lucrativo",
    description: "Construa seu próprio sistema de vendas e pare de depender de fórmulas genéricas.",
  },
  {
    title: "Marketing digital de verdade",
    description: "Invista com inteligência e escale sua presença digital sem desperdiçar recursos.",
  },
  {
    title: "Formação de caixa e capital de giro",
    description: "Crie uma base financeira sólida para crescer com segurança e consistência.",
  },
  {
    title: "Diversificação de rendas",
    description: "Descubra como criar novas fontes de receita e blindar seu negócio contra imprevistos.",
  },
  {
    title: "Plano de aposentadoria",
    description: "Aprenda a construir sua liberdade financeira e garantir um futuro tranquilo, mesmo fora da operação.",
  },
  {
    title: "Networking de alto nível",
    description: "Conecte-se com empresários que podem abrir portas e transformar seu negócio.",
  },
]

const fallbackLean = [
  {
    title: "Crescimento x Escala",
    description: "Entenda a diferença entre crescer e escalar — e como se preparar para isso com segurança e previsibilidade.",
  },
  {
    title: "Capital de Giro",
    description: "Organize seu fluxo de caixa, equilibre entradas e saídas e mantenha seu negócio financeiramente saudável.",
  },
  {
    title: "Modelo de Trabalho ABC",
    description: "Implante um modelo de operação eficiente, com prioridades bem definidas e foco no que gera valor.",
  },
  {
    title: "Marketing Digital",
    description: "Use a comunicação digital para fortalecer sua presença online, atraindo e fidelizando clientes.",
  },
  {
    title: "Valuation",
    description: "Saiba quanto vale sua empresa e como aumentar esse valor, preparando-se para investidores.",
  },
]

const fallbackAudience = [
  {
    title: "Construir um planejamento eficiente",
    description: "Atinga seu primeiro milhão com um plano claro e prático.",
  },
  {
    title: "Criar objetivos práticos",
    description: "Desenvolva uma empresa rica e próspera com metas bem definidas.",
  },
  {
    title: "Elaborar estratégias inteligentes",
    description: "Torne seu negócio o número 1 do seu segmento com abordagens eficazes.",
  },
]

const fallbackFaqs = [
  {
    question: "Quem pode participar do programa Empreendedor Inteligente?",
    answer:
      "O programa é destinado a empresários e empreendedores que desejam escalar seus negócios, melhorar a gestão e aumentar a lucratividade. Não importa o tamanho da sua empresa ou o setor em que atua, o conteúdo é adaptável a diferentes realidades empresariais.",
  },
  {
    question: "Qual a duração do programa?",
    answer: "O programa tem duração de 3 meses, com encontros semanais online e um encontro presencial mensal (opcional).",
  },
  {
    question: "Preciso ter conhecimentos prévios em gestão ou finanças?",
    answer:
      "Não é necessário. O programa foi desenvolvido para ser acessível a empresários com diferentes níveis de conhecimento. Partimos do básico e avançamos gradualmente para conceitos mais complexos.",
  },
  {
    question: "Como são realizados os encontros?",
    answer:
      "Os encontros semanais são realizados online, através de plataforma de videoconferência. Os encontros presenciais mensais são realizados em São Paulo, mas a participação é opcional.",
  },
  {
    question: "Existe garantia de resultados?",
    answer:
      "Oferecemos garantia de satisfação de 30 dias. Se você não estiver satisfeito com o conteúdo e a metodologia, devolvemos 100% do seu investimento. No entanto, os resultados dependem da implementação das estratégias aprendidas.",
  },
]

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
      return { title: title.trim(), description: rest.join(separator).trim() }
    }
  }
  return { title: text, description: "" }
}

export default function EmpreendedorInteligenteTemplate({ formacao }: EmpreendedorInteligenteTemplateProps) {
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
    { title: "Sobre o Curso", href: "#sobre-curso" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  const heroDescription = getPlainText(formacao.hero?.description)

  const challenges = (Array.isArray(formacao?.challenges) ? formacao.challenges : []).map((item: any, index: number) => {
    const text = typeof item === "string" ? item : item.text || ""
    const parsed = splitTitleDescription(text)
    return {
      title: parsed.title || fallbackChallenges[index]?.title,
      description: parsed.description || fallbackChallenges[index]?.description || "",
    }
  })

  const challengeItems = challenges.length ? challenges : fallbackChallenges

  const learnings = (Array.isArray(formacao?.learnings) ? formacao.learnings : []).map((item: any, index: number) => {
    const text = typeof item === "string" ? item : item.text || ""
    const parsed = splitTitleDescription(text)
    return {
      title: parsed.title || fallbackLearnings[index]?.title,
      description: parsed.description || fallbackLearnings[index]?.description || "",
    }
  })
  const learningItems = learnings.length ? learnings : fallbackLearnings

  const modules = Array.isArray(formacao?.modules) && formacao.modules.length > 0
    ? formacao.modules.map((module: any, index: number) => ({
        title: module.title || fallbackLean[index]?.title,
        description: module.description || fallbackLean[index]?.description,
      }))
    : fallbackLean

  const audience = (Array.isArray(formacao?.targetAudience) ? formacao.targetAudience : []).map((item: any, index: number) => {
    const text = typeof item === "string" ? item : item.text || ""
    const parsed = splitTitleDescription(text)
    return {
      title: parsed.title || fallbackAudience[index]?.title,
      description: parsed.description || fallbackAudience[index]?.description || "",
    }
  })
  const audienceItems = audience.length ? audience : fallbackAudience

  const faqs = Array.isArray(formacao?.faqs) && formacao.faqs.length > 0
    ? formacao.faqs.map((faq: any) => ({
        question: faq.question || faq.title || "",
        answer: getPlainText(faq.answer) || "",
      }))
    : fallbackFaqs

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      <HeroPages
        title={formacao.hero?.title || formacao.title}
        subtitle={formacao.hero?.subtitle || "Formação exclusiva para empresários"}
        secondtitle={formacao.hero?.badge || "Empreender com lucro, leveza e liberdade é possível"}
        description={heroDescription}
        image={
          typeof formacao.hero?.backgroundImage === "object" && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : "/images/HERO_EMPREENDEDOR.png"
        }
        ctaText={formacao.hero?.ctaText || "GARANTA SUA VAGA!"}
        ctaHref={formacao.hero?.ctaLink || "#inscricao"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre"
      />

      <section id="sobre" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              POR QUE SUA EMPRESA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                NÃO DECOLA?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              A diferença entre empresários que prosperam e os que lutam para sobreviver está no conhecimento certo e no
              acesso às pessoas certas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {challengeItems.map((challenge, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{challenge.title}</h3>
                <p className="text-zinc-300">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="grandes-empresarios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">VALOR DO PROGRAMA</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              O QUE OS GRANDES EMPRESÁRIOS{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                SABEM
              </span>{" "}
              QUE VOCÊ AINDA NÃO SABE
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              O programa <span className="font-semibold">Empreendedor Inteligente</span> é destinado a empresários que desejam parar de sobreviver e começar a crescer com consistência. Em 3 dias, você vai aprender as estratégias usadas pelos empresários mais bem-sucedidos do Brasil para escalar faturamento, otimizar gestão, organizar finanças e atrair parceiros estratégicos.
            </p>
            <p className="text-zinc-300 max-w-3xl mx-auto mt-4">
              Você também terá acesso a uma rede de empresários que compartilham experiências reais, além de métodos práticos que você pode aplicar imediatamente no seu negócio. Não é sobre motivação: é sobre transformação empresarial com técnica, visão e resultado.
            </p>
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                GARANTA SUA VAGA AGORA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONTEÚDO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              O QUE VOCÊ VAI APRENDER PARA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                DESTRAVAR O CRESCIMENTO
              </span>{" "}
              DA SUA EMPRESA
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningItems.map((item, index) => {
              const icons = [DollarSign, BarChart, Users, UserPlus, TrendingUp, Zap, Building, FaMoneyBill, BedDouble, Users2]
              const IconComponent = icons[index % icons.length]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                  <p className="text-zinc-300">{item.description}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                GARANTA SUA VAGA AGORA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="metodologia-lean" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">METODOLOGIA</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              METODOLOGIA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                LEAN
              </span>{" "}
              PARA CRESCIMENTO EFICIENTE
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Empresas que crescem de forma consistente mesmo em tempos difíceis têm algo em comum: uma gestão enxuta, inteligente e focada em resultados. Aprenda com a Metodologia Lean, usada pelas maiores empresas do mundo, para eliminar desperdícios, otimizar processos e crescer com eficiência.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((item, index) => {
              const icons = [TrendingUp, DollarSign, Zap, Users, BarChart]
              const IconComponent = icons[index % icons.length]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                  <p className="text-zinc-300">{item.description}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                GARANTA SUA VAGA AGORA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="para-quem" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PÚBLICO-ALVO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              PARA QUEM É O{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                EMPREENDEDOR INTELIGENTE
              </span>
              ?
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              O treinamento é indicado para empresários e empreendedores que enfrentam desafios como falta de clientes ou dificuldades para fazer o negócio prosperar. Aqui, você pode:
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-6">
              {audienceItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                  <p className="text-zinc-300">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                GARANTA SUA VAGA AGORA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <QuemSomosSection />

      <TestimonialsSection testimonials={formacao?.testimonials} />

      <NewsletterFormacoes
        title="INSCREVA-SE AGORA E SAIA DO MODO SOBREVIVÊNCIA"
        description="Preencha seus dados abaixo e entre para um grupo seleto de empresários prontos para escalar resultados com inteligência e estratégia."
        source="Empreendedor Inteligente"
        ctaText="GARANTA SUA VAGA AGORA!"
        formSlug={formSlug}
      />

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              DÚVIDAS{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                COMUNS
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{faq.question}</h3>
                  <p className="text-zinc-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Empreendedor Inteligente" className="custom-class" />
    </div>
  )
}
