'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import NotableParticipants from '@/components/notable-persons'
import { TestimonialsSection } from '@/components/testimonials-section'
import { SectionBadge } from '@/components/section-badge'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import { Briefcase, TrendingUp, Lightbulb, Settings } from 'lucide-react'
import Image from 'next/image'

interface EscaladorDeNegociosTemplateProps {
  evento: any
}

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  'trending-up': TrendingUp,
  lightbulb: Lightbulb,
  settings: Settings,
}

export default function EscaladorDeNegociosTemplate({ evento }: EscaladorDeNegociosTemplateProps) {
  const formSlug = evento?.form
    ? typeof evento.form === 'object'
      ? evento.form.slug
      : evento.form
    : undefined
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Desafios', href: '#desafios' },
    { title: 'O Que Você Vai Aprender', href: '#aprender' },
    { title: 'Depoimentos', href: '#depoimentos' },
    { title: 'Inscreva-se', href: '#newsletter', isButton: true },
  ]

  const getHeroImage = () => {
    if (typeof evento.hero?.backgroundImage === 'object' && evento.hero?.backgroundImage?.url) {
      return evento.hero.backgroundImage.url
    }
    return '/IMAGES/HERO_ESCALADOR.png'
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={evento.hero?.title || evento.title}
        subtitle={evento.hero?.subtitle || 'EVENTO PRESENCIAL EXCLUSIVO'}
        secondtitle={evento.hero?.badge || 'Empreendedores de sucesso não crescem por acaso'}
        description={
          typeof evento.hero?.description === 'string'
            ? evento.hero.description
            : 'Saia da estagnação e aplique, de forma imediata, estratégias reais para escalar vendas, lucros e liberdade.'
        }
        image={getHeroImage()}
        ctaText={evento.hero?.ctaText || 'GARANTA SUA VAGA!'}
        ctaHref={evento.hero?.ctaLink || '#newsletter'}
      />

      {/* Challenges Section */}
      {evento.challenges && evento.challenges.length > 0 && (
        <section id="desafios" className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="DESAFIOS DO CRESCIMENTO" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                SE ESTÁ DIFÍCIL CRESCER, É PORQUE VOCÊ ESTÁ TENTANDO{' '}
                <span className="text-red-400">DO JEITO ERRADO</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {evento.challenges.map((challenge: any, index: number) => {
                const IconComponent = challenge.icon ? iconMap[challenge.icon] : null
                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 text-center"
                  >
                    {IconComponent && <IconComponent className="h-10 w-10 text-red-400 mx-auto mb-4" />}
                    <h3 className="text-lg font-bold mb-2 text-red-400">{challenge.question}</h3>
                    <p className="text-zinc-300 text-sm">{challenge.answer}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* What You Will Learn Section */}
      {((evento.learnings?.items && evento.learnings.items.length > 0) || (Array.isArray(evento.learnings) && evento.learnings.length > 0)) && (
        <section id="aprender" className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="O QUE VOCÊ VAI APRENDER" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {evento.learnings?.sectionTitle || (
                  <>
                    ESTRATÉGIAS REAIS PARA <span className="text-red-400">ESCALAR SEU NEGÓCIO</span>
                  </>
                )}
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto">
                {evento.learnings?.sectionDescription ||
                  'Aplique, de forma imediata, estratégias reais para escalar vendas, lucros e liberdade.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {(evento.learnings?.items || (Array.isArray(evento.learnings) ? evento.learnings : [])).map((learning: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500/20 rounded-lg p-3 flex-shrink-0">
                      <span className="text-2xl font-bold text-red-400">{index + 1}</span>
                    </div>
                    <p className="text-zinc-300">{learning.text || learning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Highlights Section */}
      {((evento.highlights?.items && evento.highlights.items.length > 0) || (Array.isArray(evento.highlights) && evento.highlights.length > 0)) && (
        <section className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="DESTAQUES" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {evento.highlights?.sectionTitle || (
                  <>
                    POR QUE PARTICIPAR DESTE <span className="text-red-400">EVENTO</span>
                  </>
                )}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {(evento.highlights?.items || (Array.isArray(evento.highlights) ? evento.highlights : [])).map((highlight: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-red-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-red-400">{highlight.title}</h3>
                  <p className="text-zinc-300">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Notable Participants */}
      <NotableParticipants accent="red" />

      {/* Testimonials */}
      {evento.testimonials && Array.isArray(evento.testimonials) && evento.testimonials.length > 0 && (
        <section id="depoimentos" className="py-20 relative overflow-hidden bg-zinc-950">
          <TestimonialsSection testimonials={evento.testimonials} />
        </section>
      )}

      {/* Mentors Section */}
      {evento.mentors && Array.isArray(evento.mentors) && evento.mentors.length > 0 && (
        <section className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <SectionBadge text="MENTORES" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                CONHEÇA SEU <span className="text-red-400">MENTOR</span>
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto">
                Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente e, com
                determinação e uma abordagem única, ele se tornou multimilionário em menos de 7 anos. Hoje, é reconhecido
                como criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e
                emocional.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {evento.mentors.map((mentor: any, index: number) => {
                const mentorData = typeof mentor === 'object' && mentor.id ? mentor : mentor
                const photoUrl =
                  typeof mentorData.photo === 'object' && mentorData.photo?.url
                    ? mentorData.photo.url
                    : typeof mentorData.photo === 'string'
                      ? mentorData.photo
                      : mentorData.image || '/images/roberto-palestra.jpeg'

                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-red-400">
                        <Image src={photoUrl} alt={mentorData.name || 'Mentor'} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-red-400">{mentorData.name || 'Mentor'}</h3>
                        {mentorData.role && <p className="text-sm text-zinc-400 mb-2">{mentorData.role}</p>}
                        {mentorData.shortBio && <p className="text-sm text-zinc-300 mb-4">{mentorData.shortBio}</p>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 relative overflow-hidden bg-zinc-950">
        <NewsletterFormacoes
          title="FIQUE LIGADO NO PRÓXIMO ESCALADOR DE NEGÓCIOS"
          description="Receba novidades e dicas exclusivas para escalar seu negócio. Preencha seus dados para garantir sua vaga na próxima edição."
          source="Escalador de Negócios"
          accent="red"
          formSlug={formSlug}
        />
      </section>

      <Footer accent="red" />
      <WhatsAppButton source={evento.title || 'Escalador de Negócios'} />
    </div>
  )
}
