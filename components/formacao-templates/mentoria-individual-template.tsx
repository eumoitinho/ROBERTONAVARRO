'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import HeroPages from '@/components/hero-pages'
import ReusableSection from '@/components/how-works'
import NotableParticipants from '@/components/notable-persons'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CheckCircle, Target, Zap, Users, Award, Sparkles } from 'lucide-react'

interface MentoriaIndividualTemplateProps {
  formacao: any
}

export default function MentoriaIndividualTemplate({ formacao }: MentoriaIndividualTemplateProps) {
  const formSlug = formacao?.form
    ? typeof formacao.form === 'object'
      ? formacao.form.slug
      : formacao.form
    : undefined
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Benefícios', href: '#beneficios' },
    { title: 'Como Funciona', href: '#como-funciona' },
    { title: 'Inscrição', href: '#inscricao', isButton: true },
  ]

  const getPlainText = (content: any): string | undefined => {
    if (!content) return undefined
    if (typeof content === 'string') return content
    if (Array.isArray(content)) {
      return content
        .map((block: any) => {
          if (block?.type === 'p') {
            return block.children?.map((child: any) => child.text || '').join('')
          }
          return ''
        })
        .filter(Boolean)
        .join('\n')
    }
    return String(content)
  }

  const heroDescription = getPlainText(formacao.hero?.description)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={formacao.hero?.title || formacao.title}
        secondtitle={formacao.hero?.subtitle || ''}
        subtitle={formacao.hero?.badge || 'Acompanhamento 100 % personalizado'}
        description={heroDescription}
        image={
          typeof formacao.hero?.backgroundImage === 'object' && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : '/images/HERO_MENTORIAINDIVIDUAL.png'
        }
        ctaText={formacao.hero?.ctaText || 'QUERO TRANSFORMAR MINHA VIDA'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#beneficios"
      />

      {/* Benefícios Section */}
      {formacao.benefits && formacao.benefits.length > 0 && (
        <section id="beneficios" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                BENEFÍCIOS <span className="text-yellow-400">EXCLUSIVOS</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {formacao.benefits.map((benefit: any, index: number) => {
                const icons = [Target, Zap, Users, Award, Sparkles, CheckCircle]
                const IconComponent = icons[index % icons.length]
                
                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-500/20 rounded-full p-2">
                        <IconComponent className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-yellow-400">
                          {typeof benefit === 'string' ? `Benefício ${index + 1}` : benefit.title}
                        </h3>
                        <p className="text-zinc-300 text-sm">
                          {typeof benefit === 'string' ? benefit : benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Como Funciona Section */}
      {formacao.learnings && formacao.learnings.length > 0 && (
        <ReusableSection
          id="como-funciona"
          title="MAIS DO QUE UMA MENTORIA, UM"
          subtitle="DESPERTAR DE CONSCIÊNCIA"
          description="Durante 2 dias transformadores, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia."
          imageDesktop="/images/HERO_ESCALADOR.png"
          imageMobile="/images/HERO_ESCALADOR_MOBILE.png"
          listItems={formacao.learnings.slice(0, 9).map((l: any) => typeof l === 'string' ? l : l.text)}
          ctaText="QUERO TRANSFORMAR MINHA VIDA"
          ctaHref="#inscricao"
        />
      )}

      {/* Notable Participants */}
      <NotableParticipants accent="yellow" />

      {/* Testimonials */}
      {formacao.testimonials && formacao.testimonials.length > 0 && (
        <TestimonialsSection />
      )}

      {/* Newsletter/Form Section */}
      <section id="inscricao" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <NewsletterFormacoes
            title="MENTORIA INDIVIDUAL"
            description="Preencha seus dados e dê o primeiro passo rumo à sua transformação financeira."
            source="Mentoria Individual"
            ctaText="QUERO TRANSFORMAR MINHA VIDA!"
            accent="yellow"
            formSlug={formSlug}
          />
        </div>
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source="Mentoria Individual" />
    </div>
  )
}
