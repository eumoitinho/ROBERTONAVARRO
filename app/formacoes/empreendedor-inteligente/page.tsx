"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LeadCapturePopup from "@/components/lead-capture-popup"
import { useScrollTrigger } from "@/hooks/use-scroll-trigger"
import {
  ArrowRight,
  ChevronRight,
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
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection }  from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { NewsletterFormacoes } from "@/components/newsletter-formacoes"
import QuemSomosSection from "@/components/mentor"
import { FaMoneyBill } from "react-icons/fa"

export default function EmpreendedorInteligentePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { isTriggered: showPopup } = useScrollTrigger({ threshold: 35, delay: 1500 })
  const [isPopupVisible, setIsPopupVisible] = useState(false)

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

  useEffect(() => {
    if (showPopup) {
      setIsPopupVisible(true)
    }
  }, [showPopup])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({
          eventId: 3, // ID do evento "Empreendedor Inteligente"
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
      console.error("Erro ao processar inscrição:", err)
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
];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      {/* Hero Section */}
      <HeroPages
        title="EMPREENDEDOR INTELIGENTE"
        subtitle="Formação exclusiva para empresários"
        secondtitle="Empreender com lucro, leveza e liberdade é possível"
        description={`Formação exclusiva para empresários que querem escalar resultados, atrair investidores, otimizar a gestão\ne parar de apagar incêndios na própria empresa.`}
        image="/images/HERO_EMPREENDEDOR.png"
        ctaText="GARANTA SUA VAGA!"
        ctaHref="#inscricao"
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre"
      />

      {/* //Challenges Section */}
      <section id="sobre" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">DESAFIOS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              POR QUE SUA EMPRESA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">NÃO DECOLA?</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              A diferença entre empresários que prosperam e os que lutam para sobreviver está no conhecimento certo e no
              acesso às pessoas certas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Você fatura, mas não lucra?",
                desc: "Aprenda a formar caixa, controlar gastos invisíveis e parar de pagar juros desnecessários.",
              },
              {
                title: "Quer crescer, mas está preso à operação?",
                desc: "Crie um modelo de gestão inteligente para ter mais tempo e liberdade sem comprometer os resultados.",
              },
              {
                title: "Dificuldade para contratar pessoas?",
                desc: "Descubra como atrair, treinar e reter talentos que realmente vestem a camisa da sua empresa.",
              },
              {
                title: "Sente que ninguém entende seus desafios?",
                desc: "Participe de uma imersão com networking de alto nível e troque com empresários como você.",
              },
            ].map((challenge, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{challenge.title}</h3>
                <p className="text-zinc-300">{challenge.desc}</p>
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
        O QUE OS GRANDES EMPRESÁRIOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">SABEM</span> QUE VOCÊ AINDA NÃO SABE
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

      {/* // What You Will Learn Section */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONTEÚDO</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              O QUE VOCÊ VAI APRENDER PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">DESTRAVAR O CRESCIMENTO</span> DA SUA
              EMPRESA
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <DollarSign className="h-6 w-6 text-yellow-400" />,
                title: "Crédito inteligente",
                desc: "Pare de ser refém de bancos e aprenda a acessar capital de giro sem taxas abusivas.",
              },
              {
                icon: <BarChart className="h-6 w-6 text-yellow-400" />,
                title: "Contabilidade estratégica",
                desc: "Use a contabilidade como aliada do lucro e da tomada de decisão.",
              },
              {
                icon: <Users className="h-6 w-6 text-yellow-400" />,
                title: "Sócios e investidores",
                desc: "Estruture sua empresa para atrair investimentos sem abrir mão do controle.",
              },
              {
                icon: <UserPlus className="h-6 w-6 text-yellow-400" />,
                title: "Time comprometido",
                desc: "Monte um time que entrega resultado, mesmo quando você não está por perto.",
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-yellow-400" />,
                title: "Modelo de vendas lucrativo",
                desc: "Construa seu próprio sistema de vendas e pare de depender de fórmulas genéricas.",
              },
              {
                icon: <Zap className="h-6 w-6 text-yellow-400" />,
                title: "Marketing digital de verdade",
                desc: "Invista com inteligência e escale sua presença digital sem desperdiçar recursos.",
              },
              {
                icon: <Building className="h-6 w-6 text-yellow-400" />,
                title: "Formação de caixa e capital de giro",
                desc: "Crie uma base financeira sólida para crescer com segurança e consistência.",
              },
              {
                icon: <FaMoneyBill className="h-6 w-6 text-yellow-400" />,
                title: "Diversificação de rendas",
                desc: "Descubra como criar novas fontes de receita e blindar seu negócio contra imprevistos.",
              },
              {
                icon: <BedDouble className="h-6 w-6 text-yellow-400" />,
                title: "Plano de aposentadoria" ,
                desc: "Aprenda a construir sua liberdade financeira e garantir um futuro tranquilo, mesmo fora da operação.",
              }, 
              {
                icon: <Users2 className="h-6 w-6 text-yellow-400" />,
                title: "Networking de alto nível",
                desc: "Conecte-se com empresários que podem abrir portas e transformar seu negócio.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.desc}</p>
              </div>
            ))}
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
        METODOLOGIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">LEAN</span> PARA CRESCIMENTO EFICIENTE
      </h2>
      <p className="text-zinc-300 max-w-3xl mx-auto">
        Empresas que crescem de forma consistente mesmo em tempos difíceis têm algo em comum: uma gestão enxuta, inteligente e focada em resultados. Aprenda com a Metodologia Lean, usada pelas maiores empresas do mundo, para eliminar desperdícios, otimizar processos e crescer com eficiência.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: <TrendingUp className="h-6 w-6 text-yellow-400" />,
          title: "Crescimento x Escala",
          desc: "Entenda a diferença entre crescer e escalar — e como se preparar para isso com segurança e previsibilidade.",
        },
        {
          icon: <DollarSign className="h-6 w-6 text-yellow-400" />,
          title: "Capital de Giro",
          desc: "Organize seu fluxo de caixa, equilibre entradas e saídas e mantenha seu negócio financeiramente saudável.",
        },
        {
          icon: <Zap className="h-6 w-6 text-yellow-400" />,
          title: "Modelo de Trabalho ABC",
          desc: "Implante um modelo de operação eficiente, com prioridades bem definidas e foco no que gera valor.",
        },
        {
          icon: <Users className="h-6 w-6 text-yellow-400" />,
          title: "Marketing Digital",
          desc: "Use a comunicação digital para fortalecer sua presença online, atraindo e fidelizando clientes.",
        },
        {
          icon: <BarChart className="h-6 w-6 text-yellow-400" />,
          title: "Valuation",
          desc: "Saiba quanto vale sua empresa e como aumentar esse valor, preparando-se para investidores.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
        >
          <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
          <p className="text-zinc-300">{item.desc}</p>
        </div>
      ))}
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
        PARA QUEM É O <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">EMPREENDEDOR INTELIGENTE</span>?
      </h2>
      <p className="text-zinc-300 max-w-3xl mx-auto">
        O treinamento é indicado para empresários e empreendedores que enfrentam desafios como falta de clientes ou dificuldades para fazer o negócio prosperar. Aqui, você pode:
      </p>
    </div>
    <div className="max-w-2xl mx-auto">
      <ul className="space-y-6">
        {[
          {
            title: "Construir um planejamento eficiente",
            desc: "Atinga seu primeiro milhão com um plano claro e prático.",
          },
          {
            title: "Criar objetivos práticos",
            desc: "Desenvolva uma empresa rica e próspera com metas bem definidas.",
          },
          {
            title: "Elaborar estratégias inteligentes",
            desc: "Torne seu negócio o número 1 do seu segmento com abordagens eficazes.",
          },
        ].map((item, index) => (
          <li
            key={index}
            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
            <p className="text-zinc-300">{item.desc}</p>
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

      <TestimonialsSection />
      {/*

      {/* 
// Registration Section */}
      <NewsletterFormacoes onSubmit={() => {
          /* não precisa mais chamar router.push aqui,
             o componente já faz isso */
        }} title="INSCREVA-SE AGORA E SAIA DO MODO SOBREVIVÊNCIA" description="Preencha seus dados abaixo e entre para um grupo seleto de empresários prontos para escalar resultados com inteligência e estratégia." source="Empreendedor Inteligente" ctaText="GARANTA SUA VAGA AGORA!" />

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              DÚVIDAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">COMUNS</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Quem pode participar do programa Empreendedor Inteligente?",
                  answer:
                    "O programa é destinado a empresários e empreendedores que desejam escalar seus negócios, melhorar a gestão e aumentar a lucratividade. Não importa o tamanho da sua empresa ou o setor em que atua, o conteúdo é adaptável a diferentes realidades empresariais.",
                },
                {
                  question: "Qual a duração do programa?",
                  answer:
                    "O programa tem duração de 3 meses, com encontros semanais online e um encontro presencial mensal (opcional).",
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
              ].map((faq, index) => (
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

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        source="Empreendedor Inteligente"
        className="custom-class"
      />

      {/* Lead Capture Popup */}
      <LeadCapturePopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        title="Transforme sua Empresa com o Empreendedor Inteligente"
        subtitle="Aprenda a escalar resultados, atrair investidores e otimizar sua gestão empresarial"
      />
    </div>
  )
}
