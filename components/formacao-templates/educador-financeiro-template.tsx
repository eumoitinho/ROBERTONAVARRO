"use client"

import type React from "react"

import Image from "next/image"
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
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HeroPagesRed from "@/components/hero-pages-red"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import NotableParticipants from "@/components/notable-persons"
import TransformationVideos from "@/components/transformation-videos"
import WhatsAppButton from "@/components/whatsapp-button"
import { cn } from "@/lib/utils"

interface EducadorFinanceiroTemplateProps {
  formacao: any
}

type EducadorModule = {
  title: string
  description?: string
  topics: Array<string | undefined>
}

type FaqItem = {
  question: string
  answer: string
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

export default function EducadorFinanceiroTemplate({ formacao }: EducadorFinanceiroTemplateProps) {
  const formSlug = formacao?.form
    ? typeof formacao.form === "object"
      ? formacao.form.slug
      : formacao.form
    : undefined

  const navigationItems =
    Array.isArray(formacao?.navigationItems) && formacao.navigationItems.length > 0
      ? formacao.navigationItems
      : [
          { title: "Início", href: "/" },
          { title: "Sobre o Curso", href: "#sobre-curso" },
          { title: "Benefícios", href: "#beneficios" },
          { title: "Depoimentos", href: "#depoimentos" },
          { title: "Inscrição", href: "#inscricao", isButton: true },
        ]

  const benefits = Array.isArray(formacao?.benefits) && formacao.benefits.length > 0
    ? formacao.benefits
    : [
        {
          title: "Independência financeira",
          description:
            "Aprenda a aplicar os conceitos ensinados em sua própria vida e alcance estabilidade e liberdade financeira.",
          icon: "DollarSign",
        },
        {
          title: "Reconhecimento profissional",
          description:
            "Torne-se referência no ensino de finanças e conquiste autoridade e credibilidade na área.",
          icon: "Award",
        },
        {
          title: "Realização de sonhos",
          description:
            "Use seu novo conhecimento para alcançar objetivos pessoais e inspirar outros a fazerem o mesmo.",
          icon: "Target",
        },
        {
          title: "Alta rentabilidade",
          description: "Transforme a educação financeira em uma fonte real de renda com potencial escalável.",
          icon: "BarChart",
        },
      ]

  const resourcesItems = Array.isArray(formacao?.resources?.items) && formacao.resources.items.length > 0
    ? formacao.resources.items
    : [
        {
          title: "Conhecimento abrangente",
          description: "Do básico ao avançado em finanças pessoais, planejamento e investimentos.",
          icon: "BookOpen",
        },
        {
          title: "Ferramentas práticas",
          description: "Planilhas, checklists e templates prontos para aplicar com seus alunos ou clientes.",
          icon: "Briefcase",
        },
        {
          title: "Mentoria personalizada",
          description: "Orientação direta de especialistas para acelerar sua evolução.",
          icon: "Users",
        },
        {
          title: "Networking e oportunidades",
          description: "Acesso a uma comunidade ativa e conexões com profissionais da área.",
          icon: "Zap",
        },
        {
          title: "Certificação reconhecida",
          description: "Competências validadas com um certificado que abre portas no mercado.",
          icon: "Award",
        },
        {
          title: "Método validado",
          description: "Metodologia estruturada para ensinar finanças de forma clara, envolvente e eficaz.",
          icon: "Lightbulb",
        },
      ]

  const modules = Array.isArray(formacao?.modules) && formacao.modules.length > 0
    ? formacao.modules.map((module: any) => ({
        title: module.title,
        description: module.description,
        topics: Array.isArray(module.topics) ? module.topics.map((topic: any) => topic.text) : [],
      }))
    : [
        {
          title: "MÓDULO INICIAL - MUDANÇA DE MENTALIDADE",
          description: "",
          topics: [
            "Introdução à Virada de Chave",
            "Qualidade de Vida",
            "A Importância da Qualidade de Vida",
            "O que é Muito Dinheiro pra Você?",
            "Maiores Erros e Acertos com o Dinheiro",
            "Como você quer se Sentir?",
            "O que te motiva?",
            "Custo de Vida",
            "Sentimento com o Dinheiro",
          ],
        },
        {
          title: "MÓDULO 2 - CLAREAMENTO FINANCEIRO",
          description: "",
          topics: [
            "Introdução à Clareza Financeira",
            "Causa das Dívidas",
            "Despesas Fantasmas",
            "Tomada de Decisão",
            "Classificação de Contas",
            "Dívida Boa X Dívida Ruim",
            "Qual o tipo de Dívida você tem?",
            "A Mágica dos Juros Compostos",
          ],
        },
        {
          title: "MÓDULO 3 - A GERAÇÃO DO DINHEIRO",
          description: "(Te preparando pro Mercado)",
          topics: [
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
            "Make Money",
          ],
        },
        {
          title: "MÓDULO 4 - LIBERDADE FINANCEIRA E INVESTIMENTOS",
          description: "",
          topics: [
            "Introdução e Fundo de Investimentos",
            "Fundo de Investimentos - Multimercado",
            "Fundo de Ações",
            "Renda Fixa - CDB",
            "Renda Fixa - Debentures",
            "Renda Fixa - LCI e LCA",
            "Renda Fixa - Tesouro Direto",
            "Home Brocker - Ações",
            "Conclusão do Curso",
          ],
        },
        {
          title: "MÓDULO 5 - FINANÇAS COM ROBERTO NAVARRO",
          description: "Apostila de Acompanhamento incluída",
          topics: [
            "Ciência da Riqueza",
            "Pilares da Riqueza",
            "Padrão de Gastos",
            "Projeto Reduzir para Prosperidade",
            "Oportunidade de Renda Extra",
            "Como Garantir um Futuro com Muito Dinheiro",
            "Como Construir sua Riqueza",
          ],
        },
      ]

  const bonusItems = Array.isArray(formacao?.bonuses) && formacao.bonuses.length > 0
    ? formacao.bonuses
    : [
        { title: "5 apostilas físicas com mais de 30 exercícios e dinâmicas" },
        { title: "Scripts de vendas validados e testados" },
        { title: "Acesso vitalício com atualizações mensais" },
        { title: "Curso de Comunicação para vendas" },
        { title: "Mentoria Como Atrair Riqueza" },
        { title: "Curso Viva Livre das Dívidas" },
        { title: "Aprenda a criar uma Landing Page Lucrativa" },
      ]

  const faqItems: FaqItem[] = Array.isArray(formacao?.faqs) && formacao.faqs.length > 0
    ? formacao.faqs.map((faq: any) => ({
        question: faq.question || faq.title || "",
        answer: getPlainText(faq.answer) || "",
      }))
    : []

  const mentorSection = formacao?.mentorSection
  const mentorImage =
    mentorSection?.image && typeof mentorSection.image === "object" && mentorSection.image.url
      ? mentorSection.image.url
      : "/images/ROBERTO_12.jpg"

  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="h-6 w-6 text-red-400" />,
    Briefcase: <Briefcase className="h-6 w-6 text-red-400" />,
    Users: <Users className="h-6 w-6 text-red-400" />,
    Zap: <Zap className="h-6 w-6 text-red-400" />,
    Award: <Award className="h-6 w-6 text-red-400" />,
    Lightbulb: <Lightbulb className="h-6 w-6 text-red-400" />,
    DollarSign: <DollarSign className="h-6 w-6 text-red-400" />,
    Target: <Target className="h-6 w-6 text-red-400" />,
    BarChart: <BarChart className="h-6 w-6 text-red-400" />,
    Shield: <Shield className="h-6 w-6 text-red-400" />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-red-950/5 to-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />
      <HeroPagesRed
        title={formacao.hero?.title || "EDUCADOR FINANCEIRO"}
        secondtitle={
          formacao.hero?.subtitle ||
          "A única formação do mercado com LICENÇA PROFISSIONAL chancelada pela Roberto Navarro Academia - RNA"
        }
        subtitle="Roberto Navarro"
        description={
          getPlainText(formacao.hero?.description) ||
          "Torne-se um Educador Financeiro licenciado com certificação reconhecida pelo MEC. Transforme vidas enquanto constrói sua própria prosperidade com respaldo profissional e metodologia validada."
        }
        image={
          typeof formacao.hero?.backgroundImage === "object" && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : "/images/HERO_EDUCADOR.png"
        }
        ctaText={formacao.hero?.ctaText || "QUERO MINHA LICENÇA PROFISSIONAL!"}
        ctaHref={formacao.hero?.ctaLink || "#inscricao"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre-curso"
      />

      {/* MEC Certification Section */}
      <section className="py-16 relative overflow-hidden">
        <SectionBackdrop variant="muted" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 flex justify-center">
                <div className="relative certificate-animation">
                  <Image
                    src={
                      formacao.certification?.certificationImage &&
                      typeof formacao.certification.certificationImage === "object" &&
                      formacao.certification.certificationImage.url
                        ? formacao.certification.certificationImage.url
                        : "/images/MEC.png"
                    }
                    alt="Reconhecido pelo MEC"
                    width={240}
                    height={240}
                    className="z-10 relative"
                  />
                  <div className="absolute inset-0 bg-red-500/20 rounded-full filter blur-xl -z-10"></div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  EXCELÊNCIA RECONHECIDA PELO MINISTÉRIO DA EDUCAÇÃO
                </h3>

                <p className="text-zinc-300 text-lg leading-relaxed">
                  {getPlainText(formacao.certification?.certificationText) ||
                    "Formação com certificação oficial que valida suas competências e abre portas no mercado. Um diferencial que comprova a qualidade do nosso método e garante credibilidade à sua atuação profissional."}
                </p>

                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {["Reconhecimento nacional", "Validação profissional", "Credibilidade garantida"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-red-400" />
                        <span className="text-zinc-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional License Section */}
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
                      <span className="text-red-400 font-bold text-sm tracking-wider">{formacao.professionalLicense?.badge || "DIFERENCIAL EXCLUSIVO"}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {formacao.professionalLicense?.title || "SUA"} {" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                    LICENÇA PROFISSIONAL
                  </span> PARA ATUAR COMO EDUCADOR FINANCEIRO
                </h2>

                <p className="text-xl text-zinc-200 mb-8">
                  {formacao.professionalLicense?.description ||
                    "Esta é a ÚNICA formação do mercado que te concede uma Licença Profissional chancelada pela Roberto Navarro Academia (RNA)"}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    {formacao.professionalLicense?.transformationTitle || "Essa será sua transformação:"}
                  </h3>
                  <ul className="space-y-4">
                    {(formacao.professionalLicense?.transformations || []).length > 0
                      ? formacao.professionalLicense.transformations.map((item: any, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            <span className="text-zinc-200">{item.text}</span>
                          </li>
                        ))
                      : [
                          "Licença para atuar como Educador Financeiro",
                          "Respeito profissional no mercado",
                          "Mais valorização do seu serviço",
                          "Respaldo do ICF para ensinar sobre geração de riqueza",
                          "Ampliar o número de clientes ativos",
                          "Consolidar uma carreira próspera e segura",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            <span className="text-zinc-200">{item}</span>
                          </li>
                        ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    {formacao.professionalLicense?.benefitsTitle || "Benefícios da Licença:"}
                  </h3>
                  <ul className="space-y-4">
                    {(formacao.professionalLicense?.benefits || []).length > 0
                      ? formacao.professionalLicense.benefits.map((item: any, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            <span className="text-zinc-200">{item.text}</span>
                          </li>
                        ))
                      : [
                          "Acesso às melhores estratégias de educação financeira",
                          "Autoridade comprovada para ensinar",
                          "Práticas e ferramentas exclusivas",
                          "Suporte do Instituto Coaching Financeiro",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            <span className="text-zinc-200">{item}</span>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-red-500/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="bg-red-500/20 p-4 rounded-full">
                  <Shield className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">
                    {formacao.professionalLicense?.shieldMessage ||
                      "Em breve irão sobreviver no mercado apenas quem tiver respeitada Licença Profissional!"}
                  </h3>
                  <p className="text-zinc-300">
                    {formacao.professionalLicense?.shieldDescription ||
                      "Roberto Navarro criou essa Licença para separar os Profissionais dos amadores. Garanta sua posição no mercado com a credibilidade de quem é referência nacional em educação financeira."}
                  </p>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  className={cn(primaryButtonBase, "px-10 py-5 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1")}
                  onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {formacao.professionalLicense?.ctaText || "GARANTIR MINHA LICENÇA PROFISSIONAL"} <ArrowRight className="ml-2 h-5 w-5" />
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
                  className="w-[1000px] h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: "top" }}
                />
              </div>
            </div>

            <div>
              <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                {getParagraphs(formacao.methodology?.description).length > 0
                  ? getParagraphs(formacao.methodology?.description).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  : [
                      "Com certificação reconhecida pelo MEC, a formação de Educador Financeiro é o seu passaporte para uma nova realidade de propósito e prosperidade.",
                      "Em poucos dias, você verá resultados concretos em sua vida e aprenderá como dominar os fundamentos da educação financeira e aplicar os conhecimentos na prática.",
                      "Além de possibilitar seu crescimento individual, você desenvolverá habilidades pedagógicas e de comunicação para transmitir esse conhecimento de forma eficaz, seja em consultorias, palestras ou cursos. O mercado busca educadores financeiros qualificados, e você estará pronto para atender a essa demanda.",
                      "Além de impactar vidas, a formação abre portas para novas fontes de renda e permite que você construa um negócio sólido e rentável no campo da educação financeira.",
                    ].map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
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
                MATERIAIS EXCLUSIVOS
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                  {formacao.exclusiveMaterials?.title || "EXPERIMENTE A"}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                    IMERSÃO
                  </span> DO EDUCADOR FINANCEIRO
                </h2>
                <p className="text-lg text-zinc-300 max-w-2xl">
                  {formacao.exclusiveMaterials?.description ||
                    "Tenha uma prévia da jornada com materiais oficiais, bastidores e um vídeo de apresentação conduzido pelo time da RNA. Explore o ritmo da formação antes de garantir sua vaga definitiva."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {(formacao.exclusiveMaterials?.items || []).length > 0
                  ? formacao.exclusiveMaterials.items.map((item: any) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/80 via-zinc-950/70 to-red-900/40 p-4 backdrop-blur-sm shadow-[0_0_25px_rgba(239,68,68,0.15)]"
                      >
                        <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-zinc-200">{item.title}</p>
                      </div>
                    ))
                  : [
                      "Download de apostilas e exercícios selecionados",
                      "Bastidores da metodologia com orientações do time",
                      "Vídeo introdutório guiado pela equipe oficial RNA",
                      "Checklist para acelerar seus primeiros atendimentos",
                    ].map((item) => (
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
                className={cn(primaryButtonBase, "px-8 py-4 text-base")}
                onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              >
                {formacao.exclusiveMaterials?.ctaText || "ACESSAR PRÉVIA EXCLUSIVA"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/30 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-500"></div>
                <Image
                  src="/images/ARTE.jpg"
                  alt="Materiais Exclusivos"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                />
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
              {formacao.resources?.title || "TUDO O QUE VOCÊ PRECISA PARA"} <span className="text-red-400">TRANSFORMAR SUA CARREIRA</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourcesItems.map((feature: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10"
              >
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  {iconMap[feature.icon] || <BookOpen className="h-6 w-6 text-red-400" />}
                </div>
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
            {benefits.map((benefit: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    {iconMap[benefit.icon] || <DollarSign className="h-6 w-6 text-red-400" />}
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
              Formação completa com mais de 40 aulas organizadas em módulos + bônus exclusivos
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {modules.map((module: EducadorModule, index: number) => {
              const iconMapByIndex = [GraduationCap, FileText, TrendingUp, BarChart, Star]
              const IconComponent = iconMapByIndex[index % iconMapByIndex.length]
              return (
                <div
                  key={module.title}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <IconComponent className="h-6 w-6" />
                      {module.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    {module.description && <p className="text-sm text-zinc-400 mb-4">{module.description}</p>}
                    <div className="grid md:grid-cols-2 gap-4">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-3 text-zinc-300">
                          <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}

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
                      {bonusItems.slice(0, Math.ceil(bonusItems.length / 2)).map((bonus: any, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                          <span className="text-zinc-300 text-sm">{bonus.title || bonus.description || bonus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-red-400">Cursos Bônus</h4>
                    <ul className="space-y-3">
                      {bonusItems.slice(Math.ceil(bonusItems.length / 2)).map((bonus: any, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                          <span className="text-zinc-300 text-sm">{bonus.title || bonus.description || bonus}</span>
                        </li>
                      ))}
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
              <span className="text-sm font-medium">{formacao.exclusiveOpportunity?.badge || "OPORTUNIDADE EXCLUSIVA"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {formacao.exclusiveOpportunity?.title || "SEJA UM"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                TREINADOR LICENCIADO
              </span>{" "}
              DO INSTITUTO COACHING FINANCEIRO
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-zinc-300 text-lg">
              <p>{formacao.exclusiveOpportunity?.description || "Além de se formar como Educador Financeiro, você poderá atuar como treinador licenciado dos cursos oficiais do Instituto Coaching Financeiro (ICF)."}</p>
              <p>{formacao.exclusiveOpportunity?.subDescription || "Ao concluir a formação, você estará apto a revender treinamentos selecionados do ICF, utilizando o material didático oficial e emitindo certificados com a sua assinatura, reconhecidos diretamente pelo instituto. Ou seja: você já sai com um modelo de negócio pronto para gerar renda."}</p>
              <p className="text-red-400 font-semibold">Confira os treinamentos disponíveis:</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(formacao.exclusiveOpportunity?.trainings || []).length > 0
              ? formacao.exclusiveOpportunity.trainings.map((training: any, index: number) => (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="relative h-56">
                      <Image
                        src="/images/REALIZAR.jpg"
                        alt={training.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent"></div>
                      <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{training.title}</h3>
                    </div>
                    <div className="p-6 text-zinc-300 text-sm">{training.description}</div>
                  </div>
                ))
              : [
                  {
                    title: "LIVRE DE DÍVIDAS",
                    description:
                      "Estratégias práticas para negociação de dívidas e controle financeiro, com metodologia validada e conteúdo gravado. Uma base essencial para suas futuras aulas.",
                    image: "/images/DIVIDAS.jpg",
                  },
                  {
                    title: "INVESTIMENTOS INTELIGENTES",
                    description:
                      "Curso introdutório e prático sobre bolsa de valores e renda fixa. Ideal para quem quer começar a investir com segurança e repassar seus conhecimentos a outras pessoas.",
                    image: "/images/INVESTIMENTO.jpg",
                  },
                  {
                    title: "TRANSFORMAÇÃO FINANCEIRA",
                    description:
                      "Formação completa que aborda propósito com o dinheiro, liberdade financeira, planejamento de curto e longo prazo e criação de múltiplas fontes de renda.",
                    image: "/images/REALIZAR.jpg",
                  },
                ].map((training) => (
                  <div
                    key={training.title}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="relative h-56">
                      <Image src={training.image} alt={training.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent"></div>
                      <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{training.title}</h3>
                    </div>
                    <div className="p-6 text-zinc-300 text-sm">{training.description}</div>
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
              <span className="text-sm font-medium">{mentorSection?.badge || "SEU MENTOR"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {mentorSection?.title || "APRENDA COM O"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                MENTOR DOS MENTORES
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              {mentorSection?.subtitle || "O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-500"></div>
                <Image
                  src={mentorImage}
                  alt="Roberto Navarro"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">{mentorSection?.mentorName || "Roberto Navarro"}</h3>
              <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
                {getParagraphs(mentorSection?.bio).length > 0
                  ? getParagraphs(mentorSection?.bio).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  : [
                      "Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, construiu um caminho até se tornar multimilionário em menos de sete anos.",
                      "Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos, proporcionando resultados reais para quem busca sair das dívidas, construir riqueza e alcançar liberdade.",
                      "Ao longo de sua trajetória, já impactou mais de 13 mil alunos no Brasil e no mundo.",
                      "Além de mentor e empreendedor, é autor de best-sellers e especialista em inteligência espiritual e emocional. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.",
                    ].map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
              </div>

              <Button
                className={cn(primaryButtonBase, "mt-8 px-8 py-4 text-base")}
                onClick={() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })}
              >
                {mentorSection?.ctaText || "QUERO SER UM EDUCADOR FINANCEIRO!"} <ArrowRight className="ml-2 h-4 w-4" />
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
              <span className="text-sm font-medium">GARANTIAS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              INVESTIMENTO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                SEGURO
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Shield className="h-6 w-6 text-red-400" />,
                title: "Garantia legal de 7 dias",
                description:
                  getPlainText(formacao.guarantee?.description) ||
                  "Seu investimento em si mesmo é protegido por uma garantia de satisfação total. Se, por algum motivo, dentro dos primeiros 7 dias de acesso à formação, você decidir que o treinamento não está alinhado com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago.",
              },
              {
                icon: <Target className="h-6 w-6 text-red-400 font-bold" />,
                title: "Garantia de resultados em 6 meses",
                description:
                  "Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma melhoria significativa em sua vida financeira dentro de poucos dias, devolveremos o dobro do seu investimento no curso. Isso demonstra não apenas a confiança na eficácia de nosso método, mas também nosso compromisso com o seu progresso e resultados.",
              },
              {
                icon: <Award className="h-6 w-6 text-red-400" />,
                title: "Certificação reconhecida",
                description:
                  "Ao concluir com sucesso a formação, você receberá uma certificação reconhecida no MEC que comprova suas habilidades e competências como educador financeiro, aumentando suas oportunidades de carreira e credibilidade de mercado.",
              },
            ].map((guarantee) => (
              <div
                key={guarantee.title}
                className={`bg-zinc-900/50 backdrop-blur-sm border rounded-3xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10 ${
                  guarantee.title === "Garantia de resultados em 6 meses"
                    ? "border-red-400/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                    : "border-zinc-800/50"
                }`}
              >
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  {guarantee.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-red-400">{guarantee.title}</h3>
                <p className="text-zinc-300 text-center">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterFormacoes
        title="ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR"
        description="Participe da formação que já mudou milhares de vidas e pode mudar a sua. Preencha seus dados abaixo e dê o primeiro passo rumo à liberdade financeira."
        source={formacao.title || "Educador Financeiro"}
        ctaText={formacao.hero?.ctaText || "QUERO SER UM EDUCADOR FINANCEIRO!"}
        accent="red"
        formSlug={formSlug}
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

          {faqItems.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-zinc-800 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-zinc-800/50 text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-zinc-900/50 text-zinc-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>

      <Footer accent="red" />
      <WhatsAppButton source={formacao.title || "Educador Financeiro"} />
    </div>
  )
}
