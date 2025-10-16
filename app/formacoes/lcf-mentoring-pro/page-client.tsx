"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  Target,
  Users,
  Award,
  BarChart,
  ArrowRight,
  ChevronDown,
  Clock,
  Star,
  DollarSign,
  ChevronRight,
} from "lucide-react"
import HeroPages from "@/components/events/hero-pages"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import Footer from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/header"
import ReusableSection from "@/components/marketing/how-works"
import QuemSomosSection from "@/components/marketing/mentor"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import type { FormationPageData } from "@/sanity/lib/formations-api"

interface Props { data: FormationPageData }

export default function LCFMentoringProClient({ data }: Props) {
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
          eventId: 5, // ID do evento "LCF Mentoring Pro"
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
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Mentor", href: "#mentor" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      <HeroPages
        title={n.hero?.title || "LCF MENTORING PRO"}
        secondtitle={n.hero?.subtitle || "Você já tem o dinheiro. Agora, só falta o controle!"}
        subtitle="Mentoria Exclusiva para Transformação"
        description={n.hero?.description || "O LCF Mentoring PRO reúne os treinamentos mais transformadores do educador financeiro Roberto Navarro em um único programa criado para te colocar no seleto grupo de pessoas que vivem com consciência, riqueza e propósito."}
        image={n.hero?.backgroundImage?.asset?.url || "/images/HERO_MENTORIA.png"}
        ctaText={n.hero?.ctaText || "CONQUISTE SUA VAGA!"}
        ctaHref={n.hero?.ctaLink || "#inscricao"}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
      />
     
      {/* What You Will Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.learnSection?.badge || 'O QUE VOCÊ VAI APRENDER'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.learnSection?.title || (<>DOMINE SUA VIDA COM <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">INTELEGENCIA DE ELITE</span></>)}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {(n.learnSection?.items || [
              { title: 'Inteligência emocional', desc: 'Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.' },
              { title: 'Inteligência financeira', desc: 'Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.' },
              { title: 'Inteligência espiritual', desc: 'Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo - é a base para prosperar com equilíbrio.' },
              { title: 'Inteligência estratégica', desc: 'Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.' },
            ]).map((module: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{module.title}</h3>
                <p className="text-zinc-300">{module.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
            >
              <Link href={n.learnSection?.ctaLink || "#inscricao"}>
                {n.learnSection?.ctaText || "CONQUISTE SUA VAGA!"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About the Program Section */}
      <ReusableSection
        id="sobre-o-programa"
        title={n.aboutSection?.heading || "A RIQUEZA COMEÇA COM CLAREZA."}
        subtitle="E SE CONSTRÓI COM MÉTODO"
        description={n.aboutSection?.paragraphs?.[0] || "O LCF Mentoring PRO é o programa mais completo de transformação financeira, emocional e espiritual do Brasil. Idealizado por Roberto Navarro, une três treinamentos impactantes em uma jornada poderosa de evolução pessoal e profissional."}
        imageDesktop={n.aboutSection?.image?.asset?.url || "/images/HERO_EDUCADOR.png"}
        imageMobile="/images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png"
        listItems={n.aboutSection?.paragraphs?.slice(1) || [
          "Transformação Completa: O programa mais completo de transformação financeira, emocional e espiritual.",
          "Resultados Reais: Desenvolva inteligência financeira aplicada e trabalhe sua mentalidade de alta performance.",
          "Ecossistema de Suporte: Conteúdos de alto nível, encontros presenciais e suporte contínuo.",
        ]}
        ctaText={n.aboutSection?.ctaText || "CONQUISTE SUA VAGA!"}
        ctaHref={n.aboutSection?.ctaLink || "#inscricao"}
      />
      
      <TestimonialsSection />
      <QuemSomosSection />

      {/* Investment Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="max-w-md w-full bg-zinc-900/90 border-2 border-yellow-500/40 rounded-3xl p-10 shadow-xl hover:border-yellow-500/80 transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{n.hero?.title || "LCF MENTORING PRO"}</h3>
                <p className="text-4xl font-extrabold text-yellow-400 mb-2 text-center">{n.pricing?.tickets?.[0]?.price || "R$ 20.000"}</p>
                <p className="text-zinc-300 mb-6 text-center">Condições facilitadas e parcelamento disponíveis</p>
                <ul className="space-y-3 mb-8 text-zinc-300 text-base">
                  {(n.benefits?.items || [
                    "Acesso vitalício aos principais treinamentos",
                    "4 imersões presenciais intensivas", 
                    "Mais de 100h de conteúdo prático",
                    "Suporte direto e acompanhamento",
                    "Garantia de 6 meses: Se sua vida não mudar, devolvemos seu dinheiro"
                  ]).map((benefit: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                      {benefit.title || benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-sm font-medium text-yellow-300">INVESTIMENTO</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Sua Vaga Limitada no LCF
                </span>{" "}
                Mentoring PRO
              </h2>
              <p className="text-lg text-zinc-300 mb-4">
                Acesso vitalício, suporte real e garantia total para sua transformação.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  Networking com alunos de alto nível
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  Comunidade exclusiva
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  Mentorias ao vivo e acompanhamento
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                  Material complementar e ferramentas práticas
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  asChild
                  className="cta-hover w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-base text-center"
                >
                  <Link href="#inscricao">QUERO ENTRAR PARA O LCF PRO</Link>
                </Button>

                <Button
                  asChild
                  className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="#formacoes">
                    VER FORMAÇÕES <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterFormacoes  
        onSubmit={() => {}}
        title={n.newsletter?.title || "INSCREVA-SE PARA TER A MUDANÇA DE VIDA"}
        description={n.newsletter?.description || "Obtenha mais informações sobre a LCF Mentoring Pro"}
        source="LCF Mentoring Pro"
        ctaText={n.newsletter?.ctaText || "CONQUISTE SUA VAGA!"}
      />

      {/* FAQ Section */}
      <section className="py-20 bg-zinc-950/90 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-zinc-800/70 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.faq?.badge || "Perguntas Frequentes"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {n.faq?.title || (<>DÚVIDAS? <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">NÓS RESPONDEMOS</span></>)}
            </h2>
            <p className="text-zinc-400">Confira as respostas para as principais dúvidas sobre o LCF Mentoring PRO.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="multiple" className="space-y-3">
              {(n.faq?.items || [
                {
                  question: "O LCF Mentoring PRO é só para quem quer ser coach?",
                  answer: "Não! O programa é para quem deseja transformar sua vida pessoal e profissional. Você pode aplicar os conhecimentos em sua vida ou, se quiser, transformar isso em uma carreira de impacto."
                },
                {
                  question: "Há encontros presenciais?",
                  answer: "Sim! São 4 imersões presenciais em datas estratégicas. Momentos de conexão, aprendizado e virada de chave."
                },
                {
                  question: "Posso parcelar o valor?",
                  answer: "Sim! Oferecemos condições facilitadas para sua entrada. Preencha o formulário e receba orientação personalizada."
                },
                {
                  question: "Qual a diferença do PRO para outros programas?",
                  answer: "O PRO une os treinamentos mais poderosos do Navarro com acompanhamento real, experiência imersiva e aplicação prática. É a experiência mais completa para quem busca transformação de verdade."
                },
                {
                  question: "Em quanto tempo verei resultados?",
                  answer: "Depende do seu comprometimento. Nos primeiros 30 dias você já terá clareza e ações estruturadas. Em 6 meses, os resultados serão visíveis."
                },
              ]).map((faq: any, index: number) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl"
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-yellow-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-zinc-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:bg-yellow-600 text-black font-semibold rounded-full px-8 py-4 text-base"
              >
                <Link href="#cadastro">Ainda tem dúvidas? Fale com a equipe!</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        source="LCF Mentoring PRO"
        className="custom-class"
      />
    </div>
  )
}
