'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Wallet, Brain, Target, Zap, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import { TestimonialsSection } from '@/components/testimonials-section'
import Footer from '@/components/footer'
import { SiteHeader } from '@/components/header'
import NotableParticipants from '@/components/notable-persons'
import TransformationVideos from '@/components/transformation-videos'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import MentorSection from '@/components/mentor'
import { SectionBadge } from '@/components/section-badge'

interface EnergiaDoDinheiroTemplateProps {
  evento: any
}

export default function EnergiaDoDinheiroTemplate({ evento }: EnergiaDoDinheiroTemplateProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const videoModalRef = useRef<HTMLDivElement>(null)

  const formSlug = evento?.form
    ? typeof evento.form === 'object'
      ? evento.form.slug
      : evento.form
    : undefined

  useEffect(() => {
    const style = document.createElement('style')
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
      .noise-bg {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        background-blend-mode: overlay;
        background-size: 200px;
        opacity: 0.015;
      }
    `
    document.head.appendChild(style)

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideoId(null)
      }
    }

    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])

  useEffect(() => {
    if (activeVideoId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideoId])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (videoModalRef.current && !videoModalRef.current.contains(event.target as Node)) {
        setActiveVideoId(null)
      }
    }

    if (activeVideoId) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeVideoId])

  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Benefícios', href: '#beneficios' },
    { title: 'Como Funciona', href: '#como-funciona' },
    { title: 'Depoimentos', href: '#depoimentos' },
    { title: 'Inscreva-se', href: '#inscricao', isButton: true },
  ]

  const getHeroImage = () => {
    if (typeof evento.hero?.backgroundImage === 'object' && evento.hero?.backgroundImage?.url) {
      return evento.hero.backgroundImage.url
    }
    return '/images/HERO_ENERGIA.png'
  }

  const benefitIcons = [Wallet, Target, Brain, Zap]
  const benefits = Array.isArray(evento.challenges) ? evento.challenges : []
  const learnings = evento.learnings?.items || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      <div className="fixed inset-0 noise-bg pointer-events-none"></div>
      <div className="fixed top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      <div
        className="fixed bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"
        style={{ animationDelay: '1s' }}
      ></div>

      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      <HeroPages
        title={evento.hero?.title || evento.title}
        subtitle={evento.hero?.badge || 'Desbloqueie a energia do dinheiro e transforme sua realidade'}
        secondtitle={evento.hero?.subtitle || '07 de outubro - Das 13h às 20h'}
        description={
          typeof evento.hero?.description === 'string'
            ? evento.hero.description
            : 'Alinhe sua energia com a prosperidade e conquiste abundância real na vida e nos negócios.'
        }
        image={getHeroImage()}
        ctaText={evento.hero?.ctaText || 'GARANTA SUA VAGA!'}
        ctaHref={evento.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
      />

      <section id="beneficios" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="QUAIS BLOQUEIOS TE AFASTAM DA RIQUEZA" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">
              Descubra os sabotadores invisíveis que drenam sua{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                energia financeira
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit: any, index: number) => {
              const Icon = benefitIcons[index % benefitIcons.length]
              return (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-lg border border-zinc-800/50 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                    {benefit.question}
                  </h3>
                  <p className="text-zinc-300">{benefit.answer}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-12 xs:py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/HERO_EMPREENDEDOR.png"
            alt="Roberto Navarro"
            fill
            className="hidden sm:block object-cover w-full h-full"
            style={{ objectPosition: 'center right' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <Image
            src="/images/HERO_EDUCADOR_MOBILE.png"
            alt="Roberto Navarro"
            fill
            className="block sm:hidden object-cover w-full h-full"
            style={{ objectPosition: 'center right' }}
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r"
            style={{
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.6) 60%, transparent)',
            }}
          ></div>
        </div>
        <SectionBadge text={evento.learnings?.sectionTitle || 'DESPERTAR DE CONSCIÊNCIA'} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase">
                Mais do que uma mentoria, um{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  despertar de consciência
                </span>
              </h2>
              <p className="text-zinc-300 mb-6 font-medium">
                {evento.learnings?.sectionDescription ||
                  'No dia 07 de outubro, das 13h às 20h, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia.'}
              </p>
              <div className="block sm:hidden md:block bg-zinc-900/50 rounded-lg p-4 mt-6">
                <ul className="space-y-4 text-zinc-300">
                  {learnings.map((item: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-400 mr-2 text-xl">•</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base mt-8"
              >
                <Link href="#inscricao">
                  GARANTA SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TransformationVideos />

      {activeVideoId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
          <div ref={videoModalRef} className="relative w-full max-w-4xl z-[9999]">
            <div className="bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-zinc-400 text-sm">Assista a história completa de transformação</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveVideoId(null)}
                  className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
                >
                  Fechar Vídeo
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setActiveVideoId(null)}
              aria-label="Fechar vídeo"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Fechar vídeo</span>
            </Button>
          </div>
        </div>
      )}

      <NotableParticipants />

      <section id="depoimentos" className="py-20 relative overflow-hidden bg-zinc-950">
        <TestimonialsSection testimonials={evento?.testimonials} />
      </section>

      <MentorSection />

      <NewsletterFormacoes
        source={evento.title || 'Energia do Dinheiro'}
        title="GARANTA SUA VAGA NO ENERGIA DO DINHEIRO"
        description={
          evento.date
            ? `Preencha o formulário abaixo e reserve sua vaga neste evento transformador que acontece no dia ${new Date(evento.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
              })}, das 13h às 20h.`
            : 'Preencha o formulário abaixo e reserve sua vaga neste evento transformador que acontece no dia 07 de outubro, das 13h às 20h.'
        }
        ctaText="GARANTIR MINHA VAGA AGORA!"
        accent="yellow"
        formSlug={formSlug}
      />

      <Footer />
      <WhatsAppButton source={evento.title || 'Energia do Dinheiro'} className="custom-class" />
    </div>
  )
}
