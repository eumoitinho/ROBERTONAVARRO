"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, DollarSign, BarChart, TrendingUp, Zap, Users, UserPlus, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import HeroPages from "@/components/events/hero-pages"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import type { FormationPageData } from "@/sanity/lib/formations-api"

interface Props { data: FormationPageData }

export default function EmpreendedorInteligenteClient({ data }: Props) {
  const n = data

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Sobre o Curso", href: "#sobre" },
    { title: "Benefícios", href: "#o-que-aprender" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      <HeroPages
        title={n.hero?.title || "EMPREENDEDOR INTELIGENTE"}
        subtitle={n.hero?.subtitle || "Formação exclusiva para empresários"}
        secondtitle={n.hero?.description || "Empreender com lucro, leveza e liberdade é possível"}
        description=""
        image={n.hero?.backgroundImage?.asset?.url || "/images/HERO_EMPREENDEDOR.png"}
        ctaText={n.hero?.ctaText || "GARANTA SUA VAGA!"}
        ctaHref={n.hero?.ctaLink || "#inscricao"}
      />

      {/* DESAFIOS */}
      <section id="sobre" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.challengesSection?.badge || 'DESAFIOS'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.challengesSection?.title || (<>POR QUE SUA EMPRESA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">NÃO DECOLA?</span></>)}
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              {n.challengesSection?.description || 'A diferença entre empresários que prosperam e os que lutam para sobreviver está no conhecimento certo e no acesso às pessoas certas.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {(n.challengesSection?.items || [
              { title: 'Você fatura, mas não lucra?', desc: 'Aprenda a formar caixa, controlar gastos invisíveis e parar de pagar juros desnecessários.' },
              { title: 'Quer crescer, mas está preso à operação?', desc: 'Crie um modelo de gestão inteligente para ter mais tempo e liberdade sem comprometer os resultados.' },
              { title: 'Dificuldade para contratar pessoas?', desc: 'Descubra como atrair, treinar e reter talentos que realmente vestem a camisa da sua empresa.' },
              { title: 'Sente que ninguém entende seus desafios?', desc: 'Participe de networking de alto nível e troque com empresários como você.' },
            ]).map((challenge, index) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{challenge.title}</h3>
                <p className="text-zinc-300">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALOR DO PROGRAMA */}
      <section id="grandes-empresarios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.valueSection?.badge || 'VALOR DO PROGRAMA'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.valueSection?.title || (<>O QUE OS GRANDES EMPRESÁRIOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">SABEM</span> QUE VOCÊ AINDA NÃO SABE</>)}
            </h2>
            {(n.valueSection?.paragraphs || [
              'O programa Empreendedor Inteligente é destinado a empresários que desejam parar de sobreviver e começar a crescer com consistência...',
              'Você terá acesso a uma rede de empresários e métodos práticos para aplicar imediatamente no seu negócio...'
            ]).map((p, i) => (
              <p key={i} className={`text-zinc-300 max-w-3xl mx-auto ${i>0 ? 'mt-4': ''}`}>{p}</p>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
              <Link href={n.valueSection?.ctaLink || '#inscricao'}>
                {n.valueSection?.ctaText || 'GARANTA SUA VAGA AGORA!'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* O QUE VAI APRENDER */}
      <section id="o-que-aprender" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.learnSection?.badge || 'CONTEÚDO'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.learnSection?.title || (<>O QUE VOCÊ VAI APRENDER PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">DESTRAVAR O CRESCIMENTO</span> DA SUA EMPRESA</>)}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(n.learnSection?.items || []).map((item, index) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  {/* Ícone opcional via nome em item.icon */}
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
              <Link href={n.learnSection?.ctaLink || '#inscricao'}>
                {n.learnSection?.ctaText || 'GARANTA SUA VAGA AGORA!'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* METODOLOGIA LEAN */}
      <section id="metodologia-lean" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.methodologySection?.badge || 'METODOLOGIA'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.methodologySection?.title || (<>METODOLOGIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">LEAN</span> PARA CRESCIMENTO EFICIENTE</>)}
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              {n.methodologySection?.description || 'Empresas que crescem de forma consistente possuem gestão enxuta, inteligente e focada em resultados...'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(n.methodologySection?.items || []).map((item, index) => (
              <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-zinc-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
              <Link href={n.methodologySection?.ctaLink || '#inscricao'}>
                {n.methodologySection?.ctaText || 'GARANTA SUA VAGA AGORA!'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PÚBLICO-ALVO */}
      <section id="para-quem" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{n.audienceSection?.badge || 'PÚBLICO-ALVO'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {n.audienceSection?.title || (<>PARA QUEM É O <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">EMPREENDEDOR INTELIGENTE</span>?</>)}
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              {n.audienceSection?.intro || 'O treinamento é indicado para empresários e empreendedores...'}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-6">
              {(n.audienceSection?.bullets || []).map((item, index) => (
                <li key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                  <p className="text-zinc-300">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center mt-12">
            <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base">
              <Link href={n.audienceSection?.ctaLink || '#inscricao'}>
                {n.audienceSection?.ctaText || 'GARANTA SUA VAGA AGORA!'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <NewsletterFormacoes
        onSubmit={() => {}}
        title={n.newsletter?.title || 'INSCREVA-SE AGORA E SAIA DO MODO SOBREVIVÊNCIA'}
        description={n.newsletter?.description || 'Preencha seus dados e entre para um grupo seleto de empresários prontos para escalar resultados com estratégia.'}
        source="Empreendedor Inteligente"
        ctaText={n.newsletter?.ctaText || 'GARANTA SUA VAGA AGORA!'}
      />

      <Footer />
      <WhatsAppButton source="Empreendedor Inteligente" className="custom-class" />
    </div>
  )
}


