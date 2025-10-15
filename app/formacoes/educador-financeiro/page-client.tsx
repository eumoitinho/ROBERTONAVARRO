"use client"

import { ArrowRight, Star, CheckCircle, Award, Globe, GraduationCap, FileText, TrendingUp, BarChart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Footer from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/header"
import { NewsletterFormacoes } from "@/components/forms/newsletter-formacoes"
import NotableParticipants from "@/components/events/notable-persons"
import TransformationVideos from "@/components/marketing/transformation-videos"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import type { FormationPageData } from "@/sanity/lib/formations-api"

interface Props { data: FormationPageData }

export default function EducadorFinanceiroClient({ data }: Props) {
  const n = data
  const controls = n.controls || {}

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Sobre o Curso", href: "#sobre-curso" },
    { title: "Benefícios", href: "#beneficios" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Inscrição", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-red-950/5 to-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
        <div className="container mx-auto px-4 relative z-10 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {n.hero?.title || 'EDUCADOR FINANCEIRO'}
              </h1>
              <p className="text-lg text-zinc-300 mb-6">
                {n.hero?.description || 'Torne-se um Educador Financeiro licenciado com certificação reconhecida e transforme vidas com metodologia validada.'}
              </p>
              <Button asChild className="px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                <a href={n.hero?.ctaLink || '#inscricao'}>
                  {n.hero?.ctaText || 'QUERO MINHA LICENÇA PROFISSIONAL!'} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="relative h-64 md:h-80">
              <Image src={n.hero?.backgroundImage?.asset?.url || '/images/HERO_EDUCADOR.png'} alt="Hero" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o curso */}
      <section id="sobre-curso" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">SOBRE O CURSO</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              SEJA UM AGENTE DA MUDANÇA E ENSINE O CAMINHO PARA A <span className="text-red-400">PROSPERIDADE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-3xl blur-3xl -z-10" />
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6">
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <Image src={'/images/ROBERTO_5.jpg'} alt="Educador" fill className="object-cover" />
                </div>
              </div>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
              <p>Com <span className="text-red-400 font-semibold">certificação reconhecida</span>, a formação de Educador Financeiro é seu passaporte para propósito e prosperidade.</p>
              <p>Em poucos dias, você verá resultados concretos e aprenderá os fundamentos de educação financeira aplicados na prática.</p>
              <p>Você também desenvolverá <span className="text-red-400">habilidades pedagógicas e de comunicação</span> para atuar em consultorias, palestras e cursos.</p>
              <p>A formação abre portas para <span className="text-red-400">novas fontes de renda</span> e um negócio sólido e rentável.</p>
              <Button asChild className="mt-4 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600">
                <a href="#inscricao">QUERO SER UM EDUCADOR FINANCEIRO! <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      {controls.showBenefits !== false && n.benefits?.items?.length ? (
        <section id="beneficios" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">{n.benefits?.badge || 'BENEFÍCIOS'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{n.benefits?.title || 'BENEFÍCIOS DA FORMAÇÃO'}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {n.benefits?.items?.map((b, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-red-400">{b.title}</h3>
                      <p className="text-zinc-300">{b.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Conteúdo principal */}
      {controls.showMainContent !== false && n.mainContent?.items?.length ? (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              {n.mainContent?.badge && (
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">{n.mainContent.badge}</span>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold">{n.mainContent?.title}</h2>
              {n.mainContent?.description && <p className="text-zinc-300 max-w-3xl mx-auto">{n.mainContent.description}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {n.mainContent.items.map((item, idx) => (
                <div key={idx} className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">{item.title}</h3>
                  <p className="text-zinc-300 mb-6">{item.description}</p>
                  {item.benefits?.length ? (
                    <ul className="space-y-3">
                      {item.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Star className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TransformationVideos accent="red" />
      <NotableParticipants accent="red" />

      {/* Depoimentos */}
      {controls.showTestimonials !== false && n.testimonials?.items?.length ? (
        <section id="depoimentos" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">{n.testimonials?.badge || 'DEPOIMENTOS'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{n.testimonials?.title || 'O QUE NOSSOS ALUNOS DIZEM'}</h2>
              {n.testimonials?.description && <p className="text-zinc-300 max-w-3xl mx-auto">{n.testimonials.description}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {n.testimonials.items.map((t, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-black font-bold text-xl">
                      {t.name?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-zinc-400">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating || 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-red-400 text-red-400" />
                    ))}
                  </div>
                  <p className="text-zinc-300 italic">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Newsletter + CTA final */}
      <NewsletterFormacoes
        onSubmit={() => {}}
        title="ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR"
        description="Participe da formação que já mudou milhares de vidas e pode mudar a sua. Preencha seus dados abaixo e dê o primeiro passo rumo à liberdade financeira."
        source="Educador Financeiro"
        ctaText="QUERO SER UM EDUCADOR FINANCEIRO!"
        accent="red"
      />

      <Footer accent="red" />
      <WhatsAppButton source="Educador Financeiro" className="custom-class" />
    </div>
  )
}


