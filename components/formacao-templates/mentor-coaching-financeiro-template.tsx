"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Brain,
  Shield,
  TrendingUp,
  Award,
  Briefcase,
  Building,
  DollarSign,
  AlertCircle,
  Lightbulb,
  Lock,
  BarChart3,
  RefreshCw,
  Zap,
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { TestimonialsSection } from "@/components/testimonials-section"
import ScrollAnimation from "@/components/scroll-animation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface MentorCoachingFinanceiroTemplateProps {
  formacao: any
}

type DecisionPath = {
  number: string
  title?: string
  description?: string
  color: string
}

type FaqItem = {
  question: string
  answer: string
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

const getParagraphs = (content: any): string[] => {
  if (!content) return []
  if (typeof content === "string") {
    return content.split("\n").map((item) => item.trim()).filter(Boolean)
  }
  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block?.type === "p") {
          return block.children?.map((child: any) => child.text || "").join("")
        }
        return block?.text || ""
      })
      .map((item: string) => item.trim())
      .filter(Boolean)
  }
  return [String(content)]
}

export default function MentorCoachingFinanceiroTemplate({ formacao }: MentorCoachingFinanceiroTemplateProps) {
  const ctaLink = formacao?.hero?.ctaLink || formacao?.pricing?.link || "#inscricao"

  const symptoms = (Array.isArray(formacao?.challenges) && formacao.challenges.length > 0
    ? formacao.challenges
        .map((challenge: any) => {
          const parsed = splitTitleDescription(challenge.text || "")
          return {
            title: parsed.title,
            description: parsed.description,
          }
        })
        .filter((item: any) => item.title || item.description)
    : [
        {
          title: "O paradoxo da escolha financeira",
          description:
            "Com tantas opções de investimento e estratégias, você fica paralisado, adiando decisões importantes ou tomando decisões baseadas em emoção, não em inteligência.",
        },
        {
          title: "A prisão do padrão de vida",
          description:
            "Você se tornou refém de um estilo de vida que consome praticamente toda sua renda, deixando pouco espaço para construção real de patrimônio.",
        },
        {
          title: "O medo do próximo nível",
          description:
            "Subconscientemente, você sabota suas próprias oportunidades de crescimento financeiro porque não se sente 'merecedor' ou tem medo das responsabilidades.",
        },
        {
          title: "A dependência da renda ativa",
          description:
            "Você está completamente dependente do seu trabalho para manter seu padrão de vida, sem verdadeira liberdade ou segurança financeira.",
        },
      ]
  ).map((item: any, index: number) => {
    const iconMap = [AlertCircle, Lock, Brain, RefreshCw]
    return {
      ...item,
      icon: iconMap[index % iconMap.length],
    }
  })

  const learningModules = (Array.isArray(formacao?.learnings) && formacao.learnings.length > 0
    ? formacao.learnings
        .map((learning: any) => {
          const parsed = splitTitleDescription(learning.text || "")
          return {
            title: parsed.title,
            description: parsed.description,
          }
        })
        .filter((item: any) => item.title || item.description)
    : [
        {
          title: "Anamnese financeira profunda",
          description:
            "Faça uma análise cirúrgica de sua relação com o dinheiro, identificando crenças limitantes profundamente enraizadas que sabotam seu crescimento financeiro.",
        },
        {
          title: "Inteligência financeira automática",
          description:
            "Desenvolva a capacidade de tomar decisões financeiras com a clareza de um investidor profissional e construa um senso financeiro aguçado que guiará suas decisões.",
        },
        {
          title: "Ampliação de seu potencial financeiro",
          description:
            "Mude literalmente sua identidade financeira, permitindo que níveis superiores de riqueza se manifestem naturalmente em sua vida.",
        },
        {
          title: "Potes da Riqueza",
          description:
            "Descubra como estruturar suas finanças para que o dinheiro trabalhe para você, criando múltiplas fontes de renda passiva e ativa.",
        },
        {
          title: "Blindagem contra o consumo desnecessário",
          description:
            "Aprenda a identificar e neutralizar os gatilhos psicológicos que levam ao consumo impulsivo e ao desperdício de recursos.",
        },
        {
          title: "Estratégias de multiplicação de renda",
          description:
            "Descubra como aumentar sua capacidade de geração de renda, criando novas oportunidades de renda e expandindo suas possibilidades financeiras.",
        },
      ]
  ).map((item: any, index: number) => {
    const iconMap = [Brain, Lightbulb, TrendingUp, DollarSign, Shield, BarChart3]
    return {
      ...item,
      icon: iconMap[index % iconMap.length],
    }
  })

  const targetAudience = (Array.isArray(formacao?.targetAudience) && formacao.targetAudience.length > 0
    ? formacao.targetAudience
        .map((item: any) => {
          const parsed = splitTitleDescription(item.text || "")
          return {
            title: parsed.title,
            description: parsed.description,
          }
        })
        .filter((item: any) => item.title || item.description)
    : [
        {
          title: "Empresários e empreendedores de sucesso",
          description:
            "Que já construíram negócios rentáveis, mas sentem que poderiam otimizar muito melhor seus recursos e criar riqueza real a partir dos resultados do negócio.",
        },
        {
          title: "Executivos e profissionais liberais",
          description:
            "Médicos, advogados, consultores, engenheiros e outros profissionais que querem transformar sua renda em patrimônio sólido e liberdade financeira.",
        },
        {
          title: "Investidores e gestores de patrimônio",
          description:
            "Que já possuem conhecimento técnico sobre investimentos, mas querem desenvolver a mentalidade dos verdadeiros criadores de riqueza.",
        },
        {
          title: "Servidores públicos",
          description:
            "Que possuem estabilidade e renda consistente e querem maximizar seu potencial de construção de patrimônio.",
        },
        {
          title: "Profissionais de marketing e consultoria",
          description:
            "Que já dominam as técnicas de geração de renda online mas querem estruturar sua vida financeira como verdadeiros empresários.",
        },
      ]
  ).map((item: any, index: number) => {
    const iconMap = [Briefcase, Building, BarChart3, Award, Zap]
    return {
      ...item,
      icon: iconMap[index % iconMap.length],
    }
  })

  const expectedResults = (Array.isArray(formacao?.results) && formacao.results.length > 0
    ? formacao.results
        .map((item: any) => {
          const parsed = splitTitleDescription(item.text || "")
          return {
            title: parsed.title,
            description: parsed.description,
          }
        })
        .filter((item: any) => item.title || item.description)
    : [
        {
          title: "Clareza total",
          description: "Você saberá exatamente onde quer chegar financeiramente e terá um plano claro para isso.",
        },
        {
          title: "Inteligência financeira automática",
          description: "Suas decisões financeiras se tornarão naturalmente mais inteligentes e estratégicas.",
        },
        {
          title: "Múltiplas fontes de renda",
          description: "Você desenvolverá a capacidade de identificar e criar novas oportunidades de renda.",
        },
        {
          title: "Proteção contra crises",
          description: "Sua estrutura financeira será blindada contra oscilações econômicas e crises setoriais.",
        },
        {
          title: "Legado familiar",
          description: "Você construirá não apenas riqueza para si, mas um patrimônio que beneficiará as próximas gerações.",
        },
        {
          title: "Liberdade real",
          description: "Tenha mais opções e não dependa mais de uma única fonte de renda para manter seu padrão de vida.",
        },
      ]
  )

  const paths: DecisionPath[] = (Array.isArray(formacao?.decisionPaths) && formacao.decisionPaths.length > 0
    ? formacao.decisionPaths
        .map((item: any) => {
          const parsed = splitTitleDescription(item.text || "")
          return {
            title: parsed.title,
            description: parsed.description,
          }
        })
        .filter((item: any) => item.title || item.description)
    : [
        {
          title: "Continue como está",
          description:
            "Mantenha os mesmos padrões, as mesmas limitações e os mesmos resultados. Daqui a 5 anos, você provavelmente estará na mesma situação financeira, apenas um pouco mais velho e com mais arrependimentos.",
        },
        {
          title: "Tente sozinho",
          description:
            "Continue tentando descobrir por conta própria, cometendo os mesmos erros que a maioria comete, desperdiçando anos valiosos em tentativa e erro.",
        },
        {
          title: "Acelere sua transformação",
          description:
            "Invista em uma metodologia comprovada, com a mentoria de quem já percorreu este caminho e comprovou que é possível transformar completamente sua vida financeira em meses.",
        },
      ]
  ).map((item: any, index: number) => {
    const colorMap = ["text-red-500", "text-yellow-500", "text-green-500"]
    return {
      number: `${index + 1}`,
      title: item.title,
      description: item.description,
      color: colorMap[index % colorMap.length],
    }
  })

  const faqs: FaqItem[] = Array.isArray(formacao?.faqs) && formacao.faqs.length > 0
    ? formacao.faqs.map((faq: any) => ({
        question: faq.question || faq.title || "",
        answer: getPlainText(faq.answer) || "",
      }))
    : [
        {
          question: "Para quem é esta formação?",
          answer:
            "O Mentor Coaching Financeiro é desenvolvido para profissionais que já possuem uma renda considerável mas sentem que poderiam otimizar muito melhor seus recursos financeiros. É ideal para empresários, executivos, profissionais liberais, investidores e qualquer pessoa que queira quebrar barreiras internas para alcançar um novo patamar de riqueza.",
        },
        {
          question: "O que eu vou aprender no treinamento?",
          answer:
            "Você aprenderá a identificar e modificar padrões inconscientes que limitam seu crescimento financeiro, desenvolverá inteligência financeira automatizada, criará múltiplas fontes de renda, construirá proteção contra o consumo desnecessário e estabelecerá um sistema pessoal de criação de riqueza.",
        },
        {
          question: "O que acontece depois do treinamento?",
          answer:
            "Após concluir o treinamento, você terá acesso a uma comunidade exclusiva de ex-alunos, atualizações periódicas da metodologia e suporte contínuo para garantir que você mantenha e expanda os resultados conquistados.",
        },
        {
          question: "Como este treinamento pode transformar minha vida e meu negócio?",
          answer:
            "O Mentor Coaching Financeiro trabalha na raiz das limitações financeiras - sua programação mental e emocional sobre dinheiro. Ao transformar esta base, você naturalmente toma melhores decisões, identifica mais oportunidades, constrói riqueza mais rapidamente e desenvolve uma relação saudável e próspera com o dinheiro.",
        },
      ]

  const mentor = Array.isArray(formacao?.mentors) && formacao.mentors.length > 0 ? formacao.mentors[0] : null
  const mentorImage =
    mentor && typeof mentor.photo === "object" && mentor.photo?.url
      ? mentor.photo.url
      : "/images/roberto.webp"
  const mentorBio = mentor?.bio || [
    "Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, se tornou multimilionário em menos de sete anos.",
    "Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos.",
    "Ao longo de sua trajetória, já impactou mais de 1,5 milhão de alunos no Brasil e no mundo.",
  ]

  const mentorSectionBenefits = Array.isArray(formacao?.benefits) && formacao.benefits.length > 0
    ? formacao.benefits.slice(0, 3).map((item: any) => item.description || item.title || item.text)
    : [
        "Metodologia comprovada com mais de 1,5 milhão de alunos transformados",
        "Técnicas exclusivas de reprogramação mental para a riqueza",
        "Acompanhamento personalizado para garantir seus resultados",
      ]

  const specialGuaranteeTitle =
    formacao?.specialGuarantee?.title || "6 meses para experimentar uma mudança real"
  const specialGuaranteeParagraphs = getParagraphs(formacao?.specialGuarantee?.description)
  const guaranteeParagraphs =
    specialGuaranteeParagraphs.length > 0
      ? specialGuaranteeParagraphs
      : [
          "Ao se inscrever no Mentor Coaching Financeiro, você conta com uma garantia incondicional de 6 meses. Aplique o método, veja resultados reais na sua vida financeira ou receba o dobro do seu dinheiro de volta!",
          "Essa não é só uma garantia. É a nossa forma de mostrar que acreditamos profundamente no que fazemos – e no seu potencial de mudança.",
        ]
  const decisionPathsNote =
    formacao?.decisionPathsNote ||
    "Quanto vale ter a tranquilidade de saber exatamente como gerar riqueza e garantir o futuro da sua família?"

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader showInicio={true} />

      {/* [Bloco 1] Hero Section */}
      <section className="relative min-h-[700px] pt-32 pb-20 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center">
          <ScrollAnimation animation="fadeInUp" className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              <span className="text-sm font-medium">MENTOR COACHING FINANCEIRO</span>
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              {formacao.hero?.title || "Transformamos profissionais em verdadeiros"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                {formacao.hero?.subtitle || "geradores da riqueza"}
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              {getPlainText(formacao.hero?.description) ||
                "Aprenda a instalar a inteligência financeira na sua vida e aumentar sua renda, com estratégias comprovadas."}
            </p>

            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                {formacao.hero?.ctaText || "ESTOU PRONTO PARA MUDAR MINHA VIDA!"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 2] Seção Mentor */}
      <section className="py-20 bg-zinc-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollAnimation animation="fadeInLeft">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/roberto-palestra.jpeg"
                  alt="Roberto Navarro palestrando"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white text-lg font-semibold">
                    &ldquo;A verdadeira riqueza começa na mente. Quando você muda sua mentalidade, você muda sua vida.&rdquo;
                  </p>
                  <p className="text-yellow-400 mt-2">- Roberto Navarro</p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInRight">
              <div>
                <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                  TRANSFORME SUA VIDA
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  De profissional bem-sucedido a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                    gerador de riqueza
                  </span>
                </h2>
                <p className="text-zinc-300 text-lg mb-6">
                  Você já conquistou muito, mas sente que pode ir além? O Mentor Coaching Financeiro foi criado para profissionais como você, que desejam quebrar o teto de vidro financeiro e alcançar um novo patamar de prosperidade.
                </p>
                <div className="space-y-4">
                  {mentorSectionBenefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                      <p className="text-zinc-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* [Bloco 3] A Armadilha Invisível */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A ARMADILHA INVISÍVEL DA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                MEDIOCRIDADE FINANCEIRA
              </span>
            </h2>
            <p className="text-xl text-zinc-300">Você reconhece alguns desses sintomas em sua vida?</p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {symptoms.map((symptom: any, index: number) => (
              <ScrollAnimation key={index} animation="fadeInLeft" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-red-900/30 hover:border-red-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-red-500/10 rounded-full p-3 text-red-400">
                          <symptom.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-red-400">{symptom.title}</h3>
                        <p className="text-zinc-300 text-sm">{symptom.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeIn" className="text-center">
            <p className="text-xl font-semibold text-yellow-400">
              O que você descobrirá a seguir pode mudar completamente sua relação com o dinheiro.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 3] Sobre a Metodologia */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <ScrollAnimation animation="fadeInUp">
                  <Badge variant="outline" className="mb-6 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                    MENTOR COACHING FINANCEIRO
                  </Badge>
                </ScrollAnimation>
                <ScrollAnimation animation="fadeInUp" animationDelay="100ms">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {formacao.methodology?.title || "A metodologia que vai"}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                      {formacao.methodology?.highlight ? getPlainText(formacao.methodology.highlight) : "reprogramar"}
                    </span>{" "}
                    sua relação com o dinheiro
                  </h2>
                </ScrollAnimation>
                <div className="space-y-4 text-zinc-300">
                  {getParagraphs(formacao.methodology?.description).length > 0
                    ? getParagraphs(formacao.methodology?.description).map((paragraph, index) => (
                        <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${(index + 2) * 100}ms`}>
                          <p>{paragraph}</p>
                        </ScrollAnimation>
                      ))
                    : [
                        "O Mentor Coaching Financeiro é resultado de mais de uma década de pesquisa e aplicação prática com milhares de alunos. É a síntese de tudo que Roberto Navarro descobriu sobre como pessoas realmente bem-sucedidas pensam, sentem e agem em relação ao dinheiro.",
                        "Esta não é mais uma formação sobre \"como investir\" ou \"como controlar gastos\".",
                        "Este é um processo de transformação profunda que ataca a raiz do problema: sua programação inconsciente sobre dinheiro, sucesso e merecimento.",
                      ].map((paragraph, index) => (
                        <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${(index + 2) * 100}ms`}>
                          <p className={index === 1 ? "font-semibold text-yellow-400 text-lg" : undefined}>{paragraph}</p>
                        </ScrollAnimation>
                      ))}
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 4] O Que Você Aprenderá */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              CONTEÚDO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                APRENDERÁ?
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {learningModules.map((module: any, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <div className="bg-yellow-500/10 rounded-full p-4 w-fit mb-4 mx-auto">
                      <div className="text-yellow-400">
                        <module.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">{module.title}</h3>
                    <p className="text-zinc-300 text-sm text-center">{module.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 5] Para Quem é o Treinamento */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              PÚBLICO-ALVO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PARA QUEM É O{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                TREINAMENTO?
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {targetAudience.map((audience: any, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <div className="bg-yellow-500/10 rounded-full p-4 w-fit mb-4 mx-auto">
                      <div className="text-yellow-400">
                        <audience.icon className="h-12 w-12" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">{audience.title}</h3>
                    <p className="text-zinc-300 text-sm text-center">{audience.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 6] Sobre Roberto Navarro */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 max-w-5xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-[400px] md:h-auto">
                    <Image src={mentorImage} alt={mentor?.name || "Roberto Navarro"} fill className="object-cover" />
                  </div>
                  <div className="p-8 md:p-12">
                    <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
                      MENTOR
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4">
                      Aprenda com o{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                        mentor dos mentores
                      </span>
                    </h2>
                    <p className="text-zinc-300 mb-6">
                      O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!
                    </p>
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">{mentor?.name || "Roberto Navarro"}</h3>
                    <div className="space-y-4 text-zinc-300">
                      {getParagraphs(mentorBio).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                    <Button
                      className="mt-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 py-3"
                      asChild
                    >
                      <a href={ctaLink}>
                        QUERO TRANSFORMAR MINHA VIDA!
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 7] O Que Esperar */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              RESULTADOS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ PODE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                ESPERAR
              </span>{" "}
              APÓS O TREINAMENTO
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {expectedResults.map((result: any, index: number) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{result.title}</h3>
                    <p className="text-zinc-300 text-sm">{result.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 8] Garantia */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="zoomIn">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-500/50 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12 text-center">
                <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {specialGuaranteeTitle.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-yellow-400">{specialGuaranteeTitle.split(" ").slice(-1)}</span>
                </h2>
                <div className="space-y-4 text-lg">
                  {guaranteeParagraphs.map((paragraph, index) => (
                    <p key={index} className={index === 1 ? "font-semibold text-yellow-400" : undefined}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 9] 3 Caminhos */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              DECISÃO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              VOCÊ TEM{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                3 CAMINHOS
              </span>{" "}
              A PARTIR DE AGORA
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {paths.map((path, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <div className={`text-5xl font-bold mb-4 ${path.color}`}>{path.number}</div>
                    <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                    <p className="text-zinc-300 text-sm">{path.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeInUp" className="text-center mt-12">
            <p className="text-zinc-300 mb-8 max-w-3xl mx-auto">{decisionPathsNote}</p>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                ESTOU PRONTO PARA MUDAR MINHA VIDA!
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 10] FAQ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                Frequentes
              </span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn">
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800">
                  <AccordionTrigger className="text-left hover:text-yellow-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={formacao.testimonials} />

      <Footer />
      <WhatsAppButton source={formacao.title || "Mentor Coaching Financeiro"} />
    </div>
  )
}
