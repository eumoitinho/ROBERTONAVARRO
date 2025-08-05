"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import WhatsAppButton from "@/components/whatsapp-button"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
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
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import ReusableSection from "@/components/how-works"
import QuemSomosSection from "@/components/mentor"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"

export default function LCFMentoringPro() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)

    // Add keyframe animation for hover effects
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
];
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      <HeroPages
        title="LCF MENTORING PRO"
        secondtitle="Você já tem o dinheiro. Agora, só falta o controle!"
        subtitle="Mentoria Exclusiva para Transformação"
        description={`O LCF Mentoring PRO reúne os treinamentos mais transformadores do educador financeiro Roberto Navarro em um único programa criado para te colocar no seleto grupo de pessoas que vivem com consciência, riqueza e propósito.`}
        image="/images/HERO_MENTORIA.png"
        ctaText="CONQUISTE SUA VAGA!"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-aprender"
      />
     
     
      {/* // What You Will Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
             DOMINE SUA VIDA COM <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">INTELEGENCIA DE ELITE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <BarChart className="h-6 w-6" />,
                title: "Inteligência emocional",
                desc: "Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.",
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Inteligência financeira",
                desc: "Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.",
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "Inteligência espiritual",
                desc: "Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo - é a base para prosperar com equilíbrio.",
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Inteligência estratégica",
                desc: "Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.",
              },
            ].map((module, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black mb-4">
                  {module.icon}
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
              <Link href="#inscricao">
                CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
 {/* Sobre o Programa Section */}
      <ReusableSection
        id="sobre-o-programa"
        title="A RIQUEZA COMEÇA COM CLAREZA."
        subtitle="E SE CONSTRÓI COM MÉTODO"
        description="O LCF Mentoring PRO é o programa mais completo de transformação financeira, emocional e espiritual do Brasil. Idealizado por Roberto Navarro, une três treinamentos impactantes em uma jornada poderosa de evolução pessoal e profissional."
        imageDesktop="/images/HERO_EDUCADOR.png"
        imageMobile="/images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png"
        listItems={[
          "Transformação Completa: O programa mais completo de transformação financeira, emocional e espiritual.",
          "Resultados Reais: Desenvolva inteligência financeira aplicada e trabalhe sua mentalidade de alta performance.",
          "Ecossistema de Suporte: Conteúdos de alto nível, encontros presenciais e suporte contínuo.",
        ]}
        ctaText="CONQUISTE SUA VAGA!"
        ctaHref="#inscricao"
      />
       <TestimonialsSection />
      <QuemSomosSection />

    
     
      {/* <section className="py-20 relative overflow-hidden">
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
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">LCF Mentoring Pro</h3>
                <p className="text-4xl font-extrabold text-yellow-400 mb-2 text-center">R$ 20.000,00</p>
                <p className="text-zinc-300 mb-6 text-center">Condições facilitadas e parcelamento disponíveis</p>
                <ul className="space-y-3 mb-8 text-zinc-300 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Acesso vitalício aos principais treinamentos
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />4 imersões presenciais intensivas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Mais de 100h de conteúdo prático
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Suporte direto e acompanhamento
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
                    Garantia de 6 meses: <br /> Se sua vida não mudar, devolvemos seu dinheiro
                  </li>
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
      </section> */}

      <NewsletterFormacoes  onSubmit={() => {
          /* não precisa mais chamar router.push aqui,
             o componente já faz isso */
        }} title="INSCREVA-SE PARA TER A MUDANÇA DE VIDA" description="Obtenha mais informações sobre a LCF Mentoring Pro" source="LCF Mentoring Pro" ctaText="CONQUISTE SUA VAGA!" />
 {/* // FAQ Section */}
      <section className="py-20 bg-zinc-950/90 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-zinc-800/70 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">Perguntas Frequentes</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              DÚVIDAS? <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">NÓS RESPONDEMOS</span>
            </h2>
            <p className="text-zinc-400">Confira as respostas para as principais dúvidas sobre o LCF Mentoring PRO.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="multiple" className="space-y-3">
              {[
                {
                  question: "O LCF Mentoring PRO é só para quem quer ser coach?",
                  answer: (
                    <>
                      <span className="block mb-2">
                        Não! O programa é para quem deseja transformar sua vida pessoal e profissional.
                      </span>
                      <span className="block">
                        Você pode aplicar os conhecimentos em sua vida ou, se quiser, transformar isso em uma carreira
                        de impacto.
                      </span>
                    </>
                  ),
                },
                {
                  question: "Há encontros presenciais?",
                  answer: (
                    <>
                      <span className="block mb-2">
                        Sim! São <b>4 imersões presenciais</b> em datas estratégicas.
                      </span>
                      <span className="block">Momentos de conexão, aprendizado e virada de chave.</span>
                    </>
                  ),
                },
                {
                  question: "Posso parcelar o valor?",
                  answer: (
                    <>
                      <span className="block mb-2">Sim! Oferecemos condições facilitadas para sua entrada.</span>
                      <span className="block">Preencha o formulário e receba orientação personalizada.</span>
                    </>
                  ),
                },
                {
                  question: "Qual a diferença do PRO para outros programas?",
                  answer: (
                    <>
                      <span className="block mb-2">
                        O PRO une os treinamentos mais poderosos do Navarro com acompanhamento real, experiência
                        imersiva e aplicação prática.
                      </span>
                      <span className="block">
                        É a experiência mais completa para quem busca transformação de verdade.
                      </span>
                    </>
                  ),
                },
                {
                  question: "Em quanto tempo verei resultados?",
                  answer: (
                    <>
                      <span className="block mb-2">Depende do seu comprometimento.</span>
                      <span className="block">
                        Nos primeiros 30 dias você já terá clareza e ações estruturadas. Em 6 meses, os resultados serão
                        visíveis.
                      </span>
                    </>
                  ),
                },
              ].map((faq, index) => (
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
