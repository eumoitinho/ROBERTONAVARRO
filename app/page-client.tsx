"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import { SiteHeader } from "@/components/layout/header"
import QuemSomosSection from "@/components/marketing/mentor"
import { SectionBadge } from "@/components/marketing/section-badge"
import TransformationVideos from "@/components/marketing/transformation-videos"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import LocationMap from "@/components/events/location-map"
import Footer from "@/components/layout/footer"
import type { HomepageData } from "@/sanity/lib/homepage-api"

interface Props {
  data: HomepageData
  siteSettings?: any
}

export default function HomePageClient({ data, siteSettings }: Props) {
  const hero = data.heroSection || {}
  const formacoes = data.formacoesSection || {}
  const controls = data.sectionControls || {}

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={siteSettings?.mainNavigation ?? undefined} logoSrc={siteSettings?.logo?.asset?.url} />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          {hero.backgroundImage?.asset?.url ? (
            <Image
              src={hero.backgroundImage.asset.url}
              alt={"Roberto Navarro"}
              fill
              unoptimized
              className="object-cover mt-24"
              style={{ objectPosition: 'center' }}
              priority
            />
          ) : (
            <Image
              src="/images/bgsite.jpg"
              alt="Roberto Navarro"
              fill
              className="object-cover mt-24"
              style={{ objectPosition: 'center' }}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 xs-gap-4 sm:gap-8 lg:gap-12 items-center">
            <div>
              {(hero.badge || 'INSTITUTO COACHING FINANCEIRO') && (
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                  <span className="text-sm font-medium">{hero.badge || 'INSTITUTO COACHING FINANCEIRO'}</span>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  {hero.title || 'TRANSFORME SUA MENTALIDADE'}
                </span>{' '}
                {hero.subtitle || 'E CONQUISTE UMA NOVA REALIDADE FINANCEIRA'}
              </h1>

              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                {hero.description || 'Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <Link href={hero.primaryButtonLink || '#formacoes'}>{hero.primaryButtonText || 'CONHEÇA NOSSAS FORMAÇÕES'}</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-medium">{hero.achievementsNumber || '300.000+'}</span>{' '}
                    {hero.achievementsLabel || 'vidas transformadas'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="formacoes" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">{formacoes.badge || 'NOSSAS FORMAÇÕES'}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {(formacoes.title || 'FORMAÇÕES QUE VÃO')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">{formacoes.highlightedText || 'TRANSFORMAR SUA MENTALIDADE'}</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              {formacoes.description || 'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.'}
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs-gap-4 sm:gap-8">
            {(formacoes.formacoes || [
              { title: 'LCF MENTORING', description: 'Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.', link: '/formacoes/mentoria', buttonText: 'SAIBA MAIS' },
              { title: 'EMPREENDEDOR INTELIGENTE', description: 'Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.', link: '/formacoes/empreendedor-inteligente', buttonText: 'SAIBA MAIS' },
              { title: 'EDUCADOR FINANCEIRO', description: 'Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.', link: '/formacoes/educador-financeiro', buttonText: 'SAIBA MAIS' },
              { title: 'LCF MENTORING PRO', description: 'Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.', link: '/formacoes/lcf-mentoring-pro', buttonText: 'SAIBA MAIS' },
              { title: 'MENTORIA DE INVESTIMENTOS', description: 'Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.', link: '/formacoes/mentoria-de-investimentos', buttonText: 'SAIBA MAIS' },
              { title: 'MENTORIA INDIVIDUAL', description: 'Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.', link: '/formacoes/mentoria-individual', buttonText: 'SAIBA MAIS' },
              { title: 'MÉTODO TF', description: 'Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.', link: '/formacoes/metodo-tf', buttonText: 'SAIBA MAIS' },
              { title: 'MENTOR COACHING FINANCEIRO', description: 'Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.', link: '/formacoes/mentor-coaching-financeiro', buttonText: 'SAIBA MAIS' },
            ]).slice(0,8).map((card, idx) => (
              <div key={idx} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 group p-6 flex flex-col">
                <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-amber-500 mb-4"></div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">{card.title}</h3>
                <p className="text-zinc-300 mb-6 flex-1">{card.description}</p>
                <div className="mt-auto">
                  <Button asChild className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl w-full">
                    <Link href={card.link || '#'}>
                      {(card.buttonText || 'SAIBA MAIS')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {controls.showMentorSection !== false && <QuemSomosSection data={data.mentorSection} />}
    {controls.showVideosSection !== false && <TransformationVideos data={data.videosSection} />}
    {controls.showTestimonialsSection !== false && <TestimonialsSection data={data.testimonialsSection} />}
    {controls.showLocationSection !== false && <LocationMap data={data.locationSection} />}

    <Footer siteSettings={siteSettings} />
      <WhatsAppButton />
    </div>
  )
}


