"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart, DollarSign, Award, Target, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/header"
import HeroPages from "@/components/hero-pages"
import ReusableSection from "@/components/how-works"
import TransformationVideos from "@/components/transformation-videos"
import NotableParticipants from "@/components/notable-persons"
import GlowEffect from "@/components/glow-effect"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

interface MentoriaTemplateProps {
  formacao: any
}

type TextBlock = {
  title?: string
  description?: string
  text?: string
}

const getPlainText = (content: any): string | undefined => {
  if (!content) return undefined
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    if (content.length > 0 && typeof content[0] === "string") {
      return content.join("\n")
    }
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
    if (content.length > 0 && typeof content[0] === "string") {
      return content.map((item) => item.trim()).filter(Boolean)
    }
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

export default function MentoriaTemplate({ formacao }: MentoriaTemplateProps) {
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

  const navigationItems =
    Array.isArray(formacao?.navigationItems) && formacao.navigationItems.length > 0
      ? formacao.navigationItems
      : [
          { title: "Início", href: "/" },
          { title: "Benefícios", href: "#beneficios" },
          { title: "Como Funciona", href: "#sobre" },
          { title: "Depoimentos", href: "#depoimentos" },
          { title: "Inscrição", href: "#inscricao", isButton: true },
        ]

  const heroDescription = getPlainText(formacao.hero?.description)

  const defaultChallenges = [
    {
      title: "Inteligência emocional",
      description:
        "Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.",
      icon: BarChart,
    },
    {
      title: "Inteligência financeira",
      description:
        "Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.",
      icon: DollarSign,
    },
    {
      title: "Inteligência espiritual",
      description:
        "Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo - é a base para prosperar com equilíbrio.",
      icon: Award,
    },
    {
      title: "Inteligência estratégica",
      description: "Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.",
      icon: Target,
    },
  ]

  const challengeItems = (Array.isArray(formacao?.challenges) && formacao.challenges.length > 0
    ? formacao.challenges
        .map((challenge: TextBlock) => {
          const text = challenge?.text || ""
          const parsed = splitTitleDescription(text)
          return {
            title: parsed.title,
            description: parsed.description,
          }
        })
        .filter((item: { title?: string; description?: string }) => item.title || item.description)
    : defaultChallenges
  ).map((item: any, index: number) => {
    const fallback = defaultChallenges[index % defaultChallenges.length]
    return {
      title: item.title || fallback.title,
      description: item.description || fallback.description,
      icon: fallback.icon,
    }
  })

  const defaultListItems = [
    "Transformação Completa: O programa mais completo de transformação financeira, emocional e espiritual.",
    "Resultados Reais: Desenvolva inteligência financeira aplicada e trabalhe sua mentalidade de alta performance.",
    "Ecossistema de Suporte: Conteúdos de alto nível, encontros presenciais e suporte contínuo.",
  ]

  const listItems = Array.isArray(formacao?.learnings) && formacao.learnings.length > 0
    ? formacao.learnings
        .map((item: TextBlock | string) =>
          typeof item === "string" ? item : item.text || item.title || "",
        )
        .filter(Boolean)
    : defaultListItems

  const defaultBenefits = [
    {
      title: "Liberdade e estabilidade financeira",
      description: "Aprenda a organizar suas finanças com segurança e inteligência.",
    },
    {
      title: "Desenvolvimento pessoal e profissional",
      description: "Adquira habilidades poderosas que impulsionarão todas as áreas da sua vida.",
    },
    {
      title: "Acompanhamento contínuo",
      description:
        "Mesmo após a imersão, você continua recebendo suporte para aplicar o que aprendeu e gerar resultados consistentes.",
    },
    {
      title: "Mudança de mentalidade",
      description: "Transforme a forma como você enxerga o dinheiro, suas escolhas e seu potencial.",
    },
  ]

  const benefits = Array.isArray(formacao?.benefits) && formacao.benefits.length > 0
    ? formacao.benefits.map((benefit: any) => ({
        title: benefit.title || benefit.text || benefit.description,
        description: benefit.description || benefit.text,
      }))
    : defaultBenefits

  const defaultModules = [
    {
      title: "Módulo 1: Life Coaching Profissional",
      duration: "4 dias",
      sections: [
        {
          title: "Desenvolvimento de habilidades pessoais e profissionais",
          items: [
            "Inteligência emocional e social",
            "Desenvolvimento da autoestima e autoconfiança",
            "Gestão do tempo e produtividade",
            "Técnicas de resolução de conflitos",
            "Desenvolvimento de competências de liderança",
            "Ferramentas de avaliação de competências",
          ],
        },
        {
          title: "Técnicas de coaching para transformação de vida",
          items: [
            "Metodologias de mudança de comportamento",
            "Criação de planos de ação personalizados",
            "Técnicas de motivação e manutenção de hábitos",
            "Estratégias para superação de limitações",
          ],
        },
        {
          title: "O que é Coaching",
          items: [
            "História e evolução do Coaching",
            "Tipos de Coaching e seus benefícios",
            "Diferenciação entre Coaching, Mentoria e Terapia",
          ],
        },
        {
          title: "Fundamentos de PNL (Programação Neurolinguística)",
          items: [
            "Fundamentos e história da PNL",
            "Aplicações práticas da PNL no Coaching",
            "Pressupostos fundamentais e suas aplicações",
            "Técnicas avançadas de construção de Rapport",
            "Sistemas representacionais",
            "Comunicação eficaz",
          ],
        },
      ],
    },
    {
      title: "Módulo 2: Mentor Coaching Financeiro",
      duration: "3 dias",
      sections: [
        {
          title: "Estratégias financeiras para alcançar a liberdade financeira",
          items: [
            "Criação de estratégias personalizadas para liberdade financeira",
            "Estudos de caso e exemplos práticos",
            "Planejamento financeiro e investimentos",
            "Análise de risco e gestão de investimentos",
          ],
        },
        {
          title: "Pilares da Riqueza e Clareza Financeira",
          items: [
            "Estrutura e construção dos pilares da riqueza",
            "Ferramentas para avaliação de clareza financeira",
            "Como se livrar das dívidas",
            "Como gerar dinheiro",
            "Métodos e fontes diversificadas de renda",
          ],
        },
        {
          title: "Identidade Financeira e Plano de Ação",
          items: [
            "Construção e reprogramação da identidade financeira",
            "Técnicas de separação de dinheiro e gestão de potes",
            "Criação e implementação de planos de ação detalhados",
            "Técnicas para definição e clareza de objetivos financeiros",
          ],
        },
        {
          title: "Múltiplas inteligências financeiras",
          items: [
            "Identificação e desenvolvimento das inteligências financeiras individuais",
            "Aplicação prática para diversificação de estratégias",
            "Estratégias empreendedoras e de investimento",
            "Análise e comparação de diferentes tipos de investimentos",
          ],
        },
      ],
    },
  ]

  const modules =
    formacao?.mentoriaModules?.enabled !== false &&
    Array.isArray(formacao?.mentoriaModules?.modules) &&
    formacao.mentoriaModules.modules.length > 0
      ? formacao.mentoriaModules.modules.map((module: any) => ({
          title: module.title,
          duration: module.duration,
          sections:
            Array.isArray(module.sections) && module.sections.length > 0
              ? module.sections.map((section: any) => ({
                  title: section.title,
                  items: Array.isArray(section.items)
                    ? section.items.map((item: any) => item.text || "").filter(Boolean)
                    : [],
                }))
              : [],
        }))
      : defaultModules

  const defaultMentors = [
    {
      name: "ROBERTO NAVARRO",
      title: "Mentor",
      bio: [
        "De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.",
        "Roberto Navarro construiu uma trajetória de superação e transformação. Ele nasceu em um ambiente de escassez, onde o dinheiro era sempre um obstáculo — até que decidiu mudar sua realidade e a da sua família.",
        "Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos. Para ele, a liberdade financeira é consequência de um alinhamento entre mente, propósito e ação.",
        "Reconhecido como o criador do coaching financeiro no Brasil, Roberto é especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.",
      ],
      image: "/images/roberto.webp",
      ctaText: "GARANTA SUA VAGA!",
    },
    {
      name: "RAÍSSA NAVARRO",
      title: "Mentora",
      bio: [
        "Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL).",
        "Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.",
        "Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching no mundo e acumula mais de 10 anos em estudos sobre PNL e comportamento humano.",
        "Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação emocional, sempre com bom humor e energia elevada. Seus ensinamentos são uma chave para quem quer vencer o medo, a procrastinação e o sentimento de incapacidade.",
      ],
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group_18-1-1LHrdbJhcrEJFv1R5sItLA6gUXYbiw.webp",
      ctaText: "GARANTA SUA VAGA!",
    },
  ]

  const mentors =
    formacao?.multipleMentors?.enabled !== false &&
    Array.isArray(formacao?.multipleMentors?.mentors) &&
    formacao.multipleMentors.mentors.length > 0
      ? formacao.multipleMentors.mentors.map((mentor: any) => ({
          name: mentor.name,
          title: mentor.title,
          bio: mentor.bio,
          image:
            typeof mentor.image === "object" && mentor.image?.url
              ? mentor.image.url
              : "/images/roberto.webp",
          ctaText: mentor.ctaText || "GARANTA SUA VAGA!",
        }))
      : defaultMentors

  const faqs =
    Array.isArray(formacao?.faqs) && formacao.faqs.length > 0
      ? formacao.faqs.map((faq: any) => ({
          question: faq.question || faq.title || "",
          answer: getPlainText(faq.answer) || "",
        }))
      : [
          {
            question: "O que é o LCF Mentoring?",
            answer:
              "O LCF Mentoring é uma imersão de 7 dias em Alphaville que combina Life Coaching Profissional e Mentor Coaching Financeiro para ajudar você a alcançar a liberdade financeira.",
          },
          {
            question: "Quem pode participar do LCF Mentoring?",
            answer:
              "O programa é ideal para empreendedores, servidores públicos, profissionais liberais, trabalhadores CLT, profissionais de marketing digital e educadores que desejam alcançar a liberdade financeira e transformar suas vidas.",
          },
          {
            question: "Quais são os módulos do programa?",
            answer:
              "O programa é dividido em dois módulos principais: Life Coaching Profissional (4 dias) e Mentor Coaching Financeiro (3 dias), abordando desde desenvolvimento pessoal até estratégias financeiras avançadas.",
          },
          {
            question: "Qual é o investimento?",
            answer:
              "O investimento para o LCF Mentoring é de R$ 5.997 à vista ou em 12x de R$ 597. Considere isso não como um gasto, mas como um investimento no seu futuro financeiro.",
          },
          {
            question: "E se eu não gostar do programa?",
            answer:
              "Oferecemos uma garantia de satisfação de 7 dias. Se você não estiver satisfeito, devolvemos 100% do seu investimento, sem perguntas.",
          },
        ]

  const guaranteePrimary =
    getPlainText(formacao?.guarantee?.description) ||
    "Seu investimento em si mesmo é protegido por uma garantia de satisfação total. Se, por algum motivo, dentro dos primeiros 7 dias de acesso à formação, você decidir que o Coach Financeiro não está alinhado com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago."

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      <HeroPages
        title={formacao.hero?.title || "LCF MENTORING"}
        subtitle={formacao.hero?.subtitle || "Mentoria Exclusiva"}
        description={heroDescription}
        image={
          typeof formacao.hero?.backgroundImage === "object" && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : "/images/HERO_MENTORIA.png"
        }
        ctaText={formacao.hero?.ctaText || "MAIS INFORMAÇÕES SOBRE A FORMAÇÃO"}
        ctaHref={formacao.hero?.ctaLink || "#inscricao"}
        secondaryCtaText="Contate-nos"
        secondaryCtaHref="#sobre"
        secondtitle={formacao.hero?.badge || "Você no controle da sua vida"}
      />

      {/* Desafios */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE ESTÁ TRAVANDO SUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">SUA LIBERDADE FINANCEIRA?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {challengeItems.map((module: { title: string; description?: string; icon: any }, index: number) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  <module.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{module.title}</h3>
                <p className="text-zinc-300">{module.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href="#inscricao">
                CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ReusableSection
        id="sobre"
        title="O QUE É O"
        subtitle={formacao.hero?.title ? `${formacao.hero.title}?` : "LCF MENTORING?"}
        description={
          getPlainText(formacao.methodology?.description) ||
          "Um programa único no Brasil que une Life Coaching e Mentor Coaching Financeiro.\n\nCom base em centenas de histórias de sucesso, o programa entrega não apenas conhecimento técnico, mas uma verdadeira mudança de mentalidade, hábitos e comportamentos. Imagine acordar todos os dias com clareza, segurança e autonomia financeira. Você terá um plano, um propósito e as ferramentas para atingir seus objetivos. Além de aprender a gerenciar seu dinheiro, você também desenvolverá habilidades que transformarão todas as áreas da sua vida."
        }
        imageDesktop="/images/HERO_EDUCADOR.png"
        imageMobile="/images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png"
        listItems={listItems}
        ctaText="CONQUISTE SUA VAGA!"
        ctaHref="#inscricao"
      />

      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BENEFÍCIOS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE VOCÊ VAI CONQUISTAR COM O <span className="text-yellow-400">LCF MENTORING?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {benefits.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TransformationVideos accent="yellow" />

      <NotableParticipants accent="yellow" />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-10">
            MÓDULOS DA <span className="text-yellow-400">MENTORIA</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {modules.map((module: any, index: number) => (
              <GlowEffect
                key={index}
                className="bg-black p-6 rounded-xl border border-zinc-700 hover-lift card-hover"
              >
                <h3 className="text-lg font-semibold mb-4">
                  {module.title} {module.duration && <span className="text-yellow-400">({module.duration})</span>}
                </h3>
                <ul className="space-y-3">
                  {module.sections.map((section: any, sectionIndex: number) => (
                    <li key={sectionIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-sm">{section.title}</p>
                        {section.items?.length > 0 && (
                          <ul className="mt-1 space-y-1 text-zinc-400 text-xs">
                            {section.items.map((item: string, itemIndex: number) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </GlowEffect>
            ))}
          </div>
        </div>
      </section>

      <section id="mentores" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-3xl md:text-4xl font-bold">
            CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
          </h2>
          {formacao?.multipleMentors?.subtitle && (
            <p className="text-center mb-10 max-w-3xl mx-auto text-sm text-zinc-300">
              {formacao.multipleMentors.subtitle}
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {mentors.map((mentor: any, index: number) => (
              <GlowEffect
                key={index}
                className="bg-black p-8 rounded-xl border border-zinc-700 hover-lift card-hover"
              >
                <div className="flex flex-col gap-8">
                  <div className="relative w-full h-[400px] rounded-xl overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                    <Image src={mentor.image} alt={mentor.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">{mentor.name}</h3>
                    <div className="space-y-4 text-sm text-gray-300">
                      {getParagraphs(mentor.bio).map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                      <div className="pt-4">
                        <GlowEffect>
                          <Button className="cta-hover bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-3 btn-hover">
                            {mentor.ctaText || "GARANTA SUA VAGA!"}
                          </Button>
                        </GlowEffect>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowEffect>
            ))}
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {[
              { value: "130k+", label: "Alunos" },
              { value: "7 anos", label: "Experiência" },
              { value: "10M", label: "Meta de impacto" },
              { value: "4.9/5", label: "Avaliação" },
            ].map((stat, index) => (
              <div key={index} className="bg-black p-6 rounded-xl border border-zinc-700 text-center">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">{stat.value}</h3>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">
            Nosso Compromisso É com o Seu <span className="text-yellow-400">Crescimento</span>
          </h2>
          <h3 className="text-center mb-10 text-xl font-semibold">Garantia Incondicional de Satisfação</h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 hover-lift card-hover">
              <h3 className="text-lg font-semibold mb-4">Garantia Legal de 7 Dias</h3>
              <p className="text-sm text-gray-300 mb-4">{guaranteePrimary}</p>
              <p className="text-sm text-gray-300">
                Sem complicações, sem perguntas – é a nossa maneira de garantir sua total confiança e conforto ao dar
                esse passo importante.
              </p>
            </GlowEffect>

            <GlowEffect className="bg-black p-6 rounded-xl border border-zinc-700 hover-lift card-hover">
              <h3 className="text-lg font-semibold mb-4">Garantia de Resultado em 6 meses</h3>
              <p className="text-sm text-gray-300 mb-4">
                Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma
                melhoria significativa em sua vida financeira dentro de 6 meses, devolveremos o dobro do seu
                investimento no curso.
              </p>
              <p className="text-sm text-gray-300">
                Isso demonstra não apenas a confiança na eficácia de nosso método, mas também nosso compromisso com o
                seu progresso e resultados.
              </p>
            </GlowEffect>
          </div>
        </div>
      </section>

      <NewsletterFormacoes
        title="INSCREVA-SE PARA TER A MUDANÇA DE VIDA"
        description="Obtenha mais informações sobre a LCF Mentoring"
        source={formacao.title || "LCF Mentoring"}
        ctaText="CONQUISTE SUA VAGA!"
        formSlug={formSlug}
        accent="yellow"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-10">
            SOMOS NOTÍCIA EM DIVERSOS <span className="text-yellow-400">MEIOS DE COMUNICAÇÃO</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3">
              <Image src="/images/logo-exame.webp" alt="Exame" width={120} height={40} className="object-contain" />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3">
              <Image src="/images/logo-1.png" alt="ProNews" width={120} height={40} className="object-contain" />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3">
              <Image
                src="/images/logo-o-fluminense.webp"
                alt="O Fluminense"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="bg-white h-16 rounded-lg flex items-center justify-center p-3">
              <Image src="/images/commercio.png" alt="Jornal do Commercio" width={120} height={40} className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">
            Entendemos que você pode ter algumas dúvidas antes de se inscrever no LCF Mentoring.
          </h2>
          <p className="text-center mb-10 max-w-3xl mx-auto text-sm text-zinc-300">
            Aqui estão algumas respostas para as perguntas mais comuns:
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq: { question: string; answer: string }, index: number) => (
              <GlowEffect key={index} className="bg-black p-5 rounded-xl border border-zinc-700 hover-lift card-hover">
                <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                <p className="text-zinc-400 font-light text-xs">{faq.answer}</p>
              </GlowEffect>
            ))}
          </div>
        </div>
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source="LCF Mentoring" className="custom-class" />
    </div>
  )
}
