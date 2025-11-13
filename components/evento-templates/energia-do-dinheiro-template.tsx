'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import TransformationVideos from '@/components/transformation-videos'
import NotableParticipants from '@/components/notable-persons'
import { TestimonialsSection } from '@/components/testimonials-section'
import { SectionBadge } from '@/components/section-badge'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import Image from 'next/image'

interface EnergiaDoDinheiroTemplateProps {
  evento: any
}

export default function EnergiaDoDinheiroTemplate({ evento }: EnergiaDoDinheiroTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Como Funciona', href: '#como-funciona' },
    { title: 'Depoimentos', href: '#depoimentos' },
    { title: 'Inscreva-se', href: '#newsletter', isButton: true },
  ]

  const getHeroImage = () => {
    if (typeof evento.hero?.backgroundImage === 'object' && evento.hero?.backgroundImage?.url) {
      return evento.hero.backgroundImage.url
    }
    return '/images/HERO_ENERGIA.png'
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={evento.hero?.title || evento.title}
        subtitle={evento.hero?.subtitle || 'Desbloqueie a energia do dinheiro e transforme sua realidade'}
        secondtitle={evento.hero?.badge || 'WORKSHOP INTENSIVO'}
        description={typeof evento.hero?.description === 'string' ? evento.hero.description : (evento.hero?.subtitle || 'Alinhe sua energia com a prosperidade')}
        image={getHeroImage()}
        ctaText={evento.hero?.ctaText || "GARANTA SUA VAGA!"}
        ctaHref={evento.hero?.ctaLink || "#newsletter"}
      />

      {/* Benefícios Section */}
      {evento.challenges && evento.challenges.length > 0 && (
        <section className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="BENEFÍCIOS" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                VOCÊ SE IDENTIFICA COM{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                  ALGUMA DESSAS SITUAÇÕES?
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {evento.challenges.map((challenge: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 text-center"
                >
                  <h3 className="text-lg font-bold mb-2 text-white">{challenge.question}</h3>
                  <p className="text-zinc-300 text-sm">{challenge.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Como Funciona Section */}
      {evento.learnings && evento.learnings.length > 0 && (
        <section id="como-funciona" className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="COMO FUNCIONA" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                MAIS DO QUE UMA MENTORIA, UM{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                  DESPERTAR DE CONSCIÊNCIA
                </span>
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                Durante este evento transformador, você vai acessar um novo nível de consciência sobre dinheiro,
                abundância, valor próprio e energia.
              </p>
            </div>

            {/* Event Info */}
            {evento.date && (
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Data do Evento</p>
                    <p className="text-xl font-bold text-green-400">
                      {new Date(evento.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {evento.duration && (
                    <div className="border-l border-zinc-700 pl-6">
                      <p className="text-sm text-zinc-400 mb-1">Duração</p>
                      <p className="text-xl font-bold text-green-400">{evento.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Learnings Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {evento.learnings.map((learning: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 rounded-lg p-3 flex-shrink-0">
                      <span className="text-2xl font-bold text-green-400">{index + 1}</span>
                    </div>
                    <p className="text-zinc-300">{learning.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Images */}
            <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/HERO_EMPREENDEDOR.png"
                  alt="Energia do Dinheiro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/HERO_EDUCADOR_MOBILE.png"
                  alt="Workshop Energia do Dinheiro"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Transformation Videos */}
      <TransformationVideos accent="yellow" />

      {/* Notable Participants */}
      <NotableParticipants accent="yellow" />

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
                CONHEÇA SEUS <span className="text-green-400">MENTORES</span>
              </h2>
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
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-green-400">
                        <Image src={photoUrl} alt={mentorData.name || 'Mentor'} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-green-400">{mentorData.name || 'Mentor'}</h3>
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
          title="GARANTA SUA VAGA NO ENERGIA DO DINHEIRO"
          description="Preencha o formulário abaixo e garanta sua participação no workshop mais transformador sobre energia financeira."
          source="Energia do Dinheiro"
          eventDate={evento.date ? new Date(evento.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) + ', 13h às 20h' : '07 de outubro, 13h às 20h'}
          accent="yellow"
        />
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source={evento.title || 'Energia do Dinheiro'} />
    </div>
  )
}

