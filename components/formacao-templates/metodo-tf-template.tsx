"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  TrendingUp,
  Target,
  Network,
  HeadphonesIcon,
  Rocket,
  Briefcase,
  DollarSign,
  Lightbulb,
  Star,
  Users,
  BookOpen,
  Award,
  Shield,
} from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { TestimonialsSection } from "@/components/testimonials-section"
import ScrollAnimation from "@/components/scroll-animation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface MetodoTFTemplateProps {
  formacao: any
}

type ContentItem = {
  title: string
  description?: string
}

type DifferentialItem = {
  title: string
  description?: string
  icon?: string
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

export default function MetodoTFTemplate({ formacao }: MetodoTFTemplateProps) {
  const ctaLink = formacao?.hero?.ctaLink || formacao?.pricing?.link || "#inscricao"

  const stats = [
    { number: "+1,5 milhões", label: "de alunos" },
    { number: "1280", label: "técnicas exclusivas" },
    { number: "5", label: "livros publicados" },
    { number: "+500", label: "vídeos inspiradores" },
  ]

  const benefits: ContentItem[] = Array.isArray(formacao?.benefits) && formacao.benefits.length > 0
    ? formacao.benefits.map((benefit: any) => ({
        title: benefit.title || benefit.text || benefit.description,
        description: benefit.description || benefit.text,
      }))
    : [
        {
          title: "Transformação financeira genuína",
          description:
            "Conquiste a liberdade financeira que sempre almejou, redefinindo sua relação com o dinheiro e construindo um futuro de abundância.",
        },
        {
          title: "Estratégias comprovadas e eficazes",
          description:
            "Aprenda técnicas que transcendem a teoria, com aplicação prática e resultados tangíveis, sem promessas vazias ou atalhos ilusórios.",
        },
        {
          title: "Networking de alto valor",
          description:
            "Conecte-se com uma comunidade exclusiva de profissionais visionários, construindo uma rede de contatos que impulsionará seu crescimento.",
        },
        {
          title: "Suporte contínuo e personalizado",
          description:
            "Receba orientação e acompanhamento mesmo após a conclusão do treinamento, garantindo que sua jornada seja contínua e bem-sucedida.",
        },
      ]

  const targetAudience: ContentItem[] = Array.isArray(formacao?.targetAudience) && formacao.targetAudience.length > 0
    ? formacao.targetAudience
        .map((item: any) => {
          const text = item?.text || ""
          const parsed = text ? splitTitleDescription(text) : { title: "", description: "" }
          return {
            title: item?.title || parsed.title,
            description: item?.description || parsed.description,
          }
        })
        .filter((item: any) => item.title || item.description)
    : [
        {
          title: "Empreendedores",
          description: "que buscam escalar seus negócios, otimizar lucros e consolidar sua posição no mercado.",
        },
        {
          title: "Profissionais liberais",
          description: "que almejam independência financeira, expansão de sua carteira de clientes e reconhecimento.",
        },
        {
          title: "Pessoas com renda +R$ 5 mil",
          description: "que desejam exponencializar seu potencial de ganhos e alcançar novos patamares.",
        },
        {
          title: "Futuros mentores",
          description: "que buscam atuar como coach e educador para transformar vidas através da educação financeira.",
        },
        {
          title: "Visionários",
          description: "que compreendem a importância da inteligência financeira como diferencial competitivo.",
        },
        {
          title: "Pessoas ambiciosas",
          description: "que buscam prosperar em todas as áreas da vida.",
        },
      ]

  const courseContent: ContentItem[] = Array.isArray(formacao?.modules) && formacao.modules.length > 0
    ? formacao.modules.map((module: any) => ({
        title: module.title,
        description: module.description,
      }))
    : [
        {
          title: "Introdução ao desbloqueio da riqueza",
          description: "Compreenda os fundamentos para uma vida financeira abundante.",
        },
        {
          title: "Superação de bloqueios financeiros",
          description: "Ferramentas e técnicas para acabar com as barreiras que o impedem de prosperar.",
        },
        {
          title: "Estratégias para aumentar sua renda",
          description: "Métodos acionáveis para expandir seus ganhos de forma consistente.",
        },
        {
          title: "Planejamento financeiro inteligente",
          description: "Domine a arte de gerenciar suas finanças e fazer seu dinheiro trabalhar para você.",
        },
        {
          title: "Criação de um plano de ação personalizado",
          description: "Um guia sob medida para aplicar o conhecimento adquirido e alcançar seus objetivos.",
        },
      ]

  const differentialItems: DifferentialItem[] = Array.isArray(formacao?.resources?.items) && formacao.resources.items.length > 0
    ? formacao.resources.items.map((item: any) => ({
        title: item.title,
        description: item.description,
        icon: item.icon,
      }))
    : [
        {
          title: "Método exclusivo e comprovado",
          description: "Uma abordagem única, com estratégias práticas e testadas para desvendar o caminho da riqueza.",
          icon: "Award",
        },
        {
          title: "Aulas presenciais",
          description: "Interação direta e imersiva com instrutores experientes, em um ambiente propício ao aprendizado.",
          icon: "Users",
        },
        {
          title: "Material de apoio abrangente",
          description: "Apostilas detalhadas, exercícios práticos e acesso a conteúdo exclusivo para solidificar seu conhecimento.",
          icon: "BookOpen",
        },
      ]

  const iconMap: Record<string, typeof Award> = {
    Award,
    Users,
    BookOpen,
    Shield,
  }

  const faqs: FaqItem[] = Array.isArray(formacao?.faqs) && formacao.faqs.length > 0
    ? formacao.faqs.map((faq: any) => ({
        question: faq.question || faq.title || "",
        answer: getPlainText(faq.answer) || "",
      }))
    : [
        {
          question: "E se eu não conseguir aplicar as estratégias?",
          answer:
            "Nosso treinamento é meticulosamente desenhado para ser prático e acessível. Você será guiado passo a passo, com suporte contínuo para garantir que cada estratégia seja implementada com sucesso.",
        },
        {
          question: "Preciso ter algum conhecimento prévio?",
          answer:
            "Não. O Método TF é acessível a todos, independentemente do seu nível de conhecimento financeiro. Nosso objetivo é democratizar o acesso à prosperidade.",
        },
        {
          question: "Quanto tempo dura o treinamento?",
          answer: "O treinamento intensivo tem a duração de 1 dia, focado em imersão e resultados.",
        },
        {
          question: "Onde será realizado o treinamento?",
          answer: "O treinamento será realizado em Alphaville-SP, em um ambiente projetado para otimizar seu aprendizado e networking.",
        },
        {
          question: "O que eu preciso levar para o treinamento?",
          answer:
            "Basta trazer um caderno e uma caneta para anotações. Todo o material didático necessário será fornecido para você.",
        },
      ]

  const mentor = Array.isArray(formacao?.mentors) && formacao.mentors.length > 0 ? formacao.mentors[0] : null
  const mentorImage =
    mentor && typeof mentor.photo === "object" && mentor.photo?.url
      ? mentor.photo.url
      : "/images/ROBERTO_1.jpg"
  const mentorBio = mentor?.bio || [
    "Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, se tornou multimilionário em menos de sete anos.",
    "Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos.",
    "Ao longo de sua trajetória, já impactou mais de 1,5 milhão de alunos no Brasil e no mundo.",
  ]

  const guaranteeParagraphs = getParagraphs(formacao?.guarantee?.description).length > 0
    ? getParagraphs(formacao?.guarantee?.description)
    : [
        "Ao se inscrever no Método TF, você conta com uma garantia incondicional de 6 meses. Aplique o método, veja resultados reais na sua vida financeira ou receba o dobro do seu dinheiro de volta!",
        "Isso mesmo: se em até 6 meses você sentir que não teve nenhum avanço, nós devolvemos duas vezes o valor pago, sem letras miúdas.",
        "Essa não é só uma garantia. É a nossa forma de mostrar que acreditamos profundamente no que fazemos – e no seu potencial de mudança.",
      ]

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
              <span className="text-sm font-medium">MÉTODO TF</span>
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              {formacao.hero?.title || "Desbloqueie a"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                {formacao.hero?.subtitle || "riqueza"}
              </span>{" "}
              {formacao.hero?.badge || "em sua vida"}
            </h1>
            <p className="text-lg md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              {getPlainText(formacao.hero?.description) ||
                "Dê um passo decisivo em direção a um futuro próspero e blindado contra as incertezas financeiras."}
            </p>

            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-8 py-6 text-lg shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                {formacao.hero?.ctaText || "QUERO ENTRAR NO MÉTODO TF!"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 2] Stats Section */}
      <section className="py-20 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-zinc-400">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 3] O Bloqueio Invisível */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeIn">
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                  O bloqueio{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                    invisível
                  </span>{" "}
                  da riqueza
                </h2>
                <div className="space-y-4 text-zinc-300">
                  {getParagraphs(formacao.methodology?.description).length > 0
                    ? getParagraphs(formacao.methodology?.description).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))
                    : [
                        "Você se sente preso em um ciclo financeiro, apesar de todo o esforço? A verdadeira barreira não é a falta de trabalho, mas um \"bloqueio invisível\" que impede sua prosperidade. Isso gera frustração, ansiedade e a sensação de estar estagnado.",
                        "O Método TF foi criado para acabar com essa barreira. Através do programa, você alcançará confiança e segurança para tomar decisões financeiras assertivas e desbloqueará seu verdadeiro potencial.",
                        "Permita-nos ser o seu guia nessa jornada para a abundância.",
                      ].map((paragraph, index) => (
                        <p key={index} className={index === 2 ? "font-semibold text-yellow-400" : undefined}>
                          {paragraph}
                        </p>
                      ))}
                </div>
                <div className="mt-8 text-center">
                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4"
                    asChild
                  >
                    <a href={ctaLink}>
                      QUERO TRANSFORMAR MINHA VIDA!
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 4] Para Quem é Indicado */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              PÚBLICO-ALVO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Para quem é indicado o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                treinamento?
              </span>
            </h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {targetAudience.map((item, index) => {
              const IconComponent = [Rocket, Briefcase, DollarSign, Target, Lightbulb, Star][index % 6]
              return (
                <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                  <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="bg-yellow-500/10 rounded-full p-4 w-fit mx-auto mb-4 text-yellow-400">
                        <IconComponent className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                      <p className="text-zinc-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* [Bloco 5] Benefícios */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              BENEFÍCIOS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefícios{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                inestimáveis
              </span>{" "}
              do Método TF
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              No Método TF, você não apenas adquire conhecimento, mas vivencia uma transformação profunda que reverberará em todas as esferas de sua vida:
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = [TrendingUp, Target, Network, HeadphonesIcon][index % 4]
              return (
                <ScrollAnimation key={index} animation="fadeInLeft" animationDelay={`${index * 100}ms`}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-yellow-500/10 rounded-full p-3 text-yellow-400">
                        <IconComponent className="h-8 w-8" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-zinc-300">{benefit.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* [Bloco 6] Conteúdo do Curso */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-500/50 bg-yellow-500/5">
              CONTEÚDO PROGRAMÁTICO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conteúdo estratégico para sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                máxima transformação
              </span>
            </h2>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-4">
            {courseContent.map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 50}ms`}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 hover:border-yellow-500/50 transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-zinc-400">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 7] Sobre Roberto Navarro */}
      <section className="py-20 relative">
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

      {/* [Bloco 8] Diferenciais */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que torna nosso programa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                incomparável?
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Nosso treinamento se distingue por uma série de elementos que garantem uma experiência de aprendizado superior e resultados duradouros:
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {differentialItems.map((item, index) => {
              const IconComponent = iconMap[item.icon || ""] || Award
              return (
                <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 100}ms`}>
                  <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800 text-center hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6">
                      <IconComponent className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-zinc-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* [Bloco 9] Garantia */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="zoomIn">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-yellow-500/50 max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12 text-center">
                <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Satisfação garantida ou seu{" "}
                  <span className="text-yellow-400">dinheiro de volta!</span>
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

      {/* [Bloco 10] CTA Final */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeInUp" className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Sua jornada rumo à{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                liberdade financeira
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 mb-8">
              Imagine um mundo onde você detém as rédeas do seu destino, com a liberdade de perseguir suas paixões e viver a vida em seus próprios termos, sem a sombra da escassez. O Método TF não é apenas um programa; é um portal para essa realidade.
            </p>
            <p className="text-lg font-semibold text-yellow-400 mb-8">
              Não permita que a hesitação o prive da decisão que pode redefinir sua existência.
            </p>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold rounded-full px-10 py-6 text-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <a href={ctaLink}>
                QUERO TRANSFORMAR MINHA VIDA FINANCEIRA!
                <ArrowRight className="ml-3 h-6 w-6" />
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 11] FAQ */}
      <section className="py-20 bg-zinc-900/30">
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

      <TestimonialsSection testimonials={formacao.testimonials} />

      <Footer />
      <WhatsAppButton source={formacao.title || "Método TF"} />
    </div>
  )
}
