'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import NotableParticipants from '@/components/notable-persons'
import { TestimonialsSection } from '@/components/testimonials-section'
import { SectionBadge } from '@/components/section-badge'
import { TicketPricingCards } from '@/components/ticket-pricing-cards'
import { EventRegistrationButton } from '@/components/event-registration-button'
import { Lightbulb, DollarSign, Users, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface MentorMilionarioTemplateProps {
  evento: any
}

const iconMap: Record<string, React.ElementType> = {
  lightbulb: Lightbulb,
  'dollar-sign': DollarSign,
  users: Users,
  'trending-up': TrendingUp,
}

export default function MentorMilionarioTemplate({ evento }: MentorMilionarioTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Para Quem É', href: '#para-quem' },
    { title: 'Programa', href: '#programa' },
    { title: 'O Que Você Vai Conquistar', href: '#conquistar' },
    { title: 'Inscreva-se', href: '#inscricao', isButton: true },
  ]

  const getHeroImage = () => {
    if (typeof evento.hero?.backgroundImage === 'object' && evento.hero?.backgroundImage?.url) {
      return evento.hero.backgroundImage.url
    }
    return '/IMAGES/HERO_ESCALADOR.png'
  }

  const ticketTypes = evento.tickets?.map((ticket: any) => ({
    id: ticket.id || Math.random(),
    name: ticket.name || 'Ingresso',
    price: ticket.price || 0,
    originalPrice: ticket.originalPrice || null,
    description: ticket.description || '',
    benefits: ticket.benefits?.map((b: any) => b.text || b) || [],
    link: ticket.link || '',
    available: ticket.available !== false,
  })) || []

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={evento.hero?.title || evento.title}
        subtitle={evento.hero?.subtitle || 'De Lavador de Vidros a Multimilionário em 7 Anos'}
        secondtitle={evento.hero?.badge || 'O EVENTO QUE VAI TRANSFORMAR CONHECIMENTO EM FORTUNA'}
        description={evento.hero?.subtitle || 'Transforme conhecimento em fortuna e conquiste seu primeiro milhão'}
        image={getHeroImage()}
        ctaText="QUERO MINHA VAGA NO MENTOR MILIONÁRIO"
        ctaHref="#inscricao"
      />

      {/* Para Quem É Section */}
      <section id="para-quem" className="py-20 relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="PARA QUEM É" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ESTE EVENTO É PARA <span className="text-yellow-400">VOCÊ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400/50 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Profissionais</h3>
              <p className="text-zinc-300 text-sm">Que querem monetizar conhecimento</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400/50 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Em Busca do Milhão</h3>
              <p className="text-zinc-300 text-sm">Pessoas em busca do primeiro milhão</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400/50 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Futuros Mentores</h3>
              <p className="text-zinc-300 text-sm">Quem deseja se tornar mentor</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400/50 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Empreendedores</h3>
              <p className="text-zinc-300 text-sm">Que querem múltiplas rendas</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400/50 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Especialistas</h3>
              <p className="text-zinc-300 text-sm">Prontos para escalar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solution Section */}
      {evento.challenges && evento.challenges.length > 0 && (
        <section className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Challenges */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-yellow-400">DESAFIOS</h2>
                <div className="space-y-4">
                  {evento.challenges.map((challenge: any, index: number) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-bold mb-2 text-white">{challenge.question}</h3>
                      <p className="text-zinc-300 text-sm">{challenge.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-yellow-400">SOLUÇÃO</h2>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">MENTOR MILIONÁRIO</h3>
                  <p className="text-zinc-300 mb-6">
                    O evento que vai transformar conhecimento em fortuna. Aprenda com Roberto Navarro como monetizar
                    sua expertise e conquistar seu primeiro milhão.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400">✓</span>
                      <span className="text-zinc-300">
                        Data: {evento.date ? new Date(evento.date).toLocaleDateString('pt-BR') : '24 de Setembro'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400">✓</span>
                      <span className="text-zinc-300">
                        Local: {evento.location?.venue || 'Centro de Eventos Alphaville'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400">✓</span>
                      <span className="text-zinc-300">Duração: {evento.duration || '7 horas'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400">✓</span>
                      <span className="text-zinc-300">Metodologia: Prática e aplicável</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400">✓</span>
                      <span className="text-zinc-300">Resultado: Plano milionário completo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Programa Completo Section */}
      {evento.schedule && evento.schedule.length > 0 && (
        <section id="programa" className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <SectionBadge text="PROGRAMA COMPLETO" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O QUE VOCÊ VAI <span className="text-yellow-400">VIVER</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {evento.schedule.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-8 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-yellow-500/20 rounded-lg p-4 min-w-[100px] text-center flex-shrink-0">
                      <p className="text-yellow-400 font-bold text-lg">{item.time || 'A definir'}</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-yellow-400">{item.title}</h3>
                      <p className="text-zinc-300">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* O Que Você Vai Conquistar Section */}
      {evento.highlights && evento.highlights.length > 0 && (
        <section id="conquistar" className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <SectionBadge text="O QUE VOCÊ VAI CONQUISTAR" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                RESULTADOS <span className="text-yellow-400">CONCRETOS</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {evento.highlights.map((highlight: any, index: number) => {
                const IconComponent = highlight.icon ? iconMap[highlight.icon] : null
                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    {IconComponent && <IconComponent className="h-8 w-8 text-yellow-400 mb-4" />}
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{highlight.title}</h3>
                    <p className="text-zinc-300">{highlight.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Este Evento É Para Você Section */}
      <section className="py-20 relative overflow-hidden bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <SectionBadge text="DECISÃO" />
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              ESTE EVENTO É PARA <span className="text-yellow-400">VOCÊ SE...</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <p className="text-xl font-bold text-yellow-400 mb-2">Você está CANSADO...</p>
              <p className="text-zinc-300">...de trabalhar muito e não ver resultados financeiros significativos.</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <p className="text-xl font-bold text-yellow-400 mb-2">Você quer PARAR...</p>
              <p className="text-zinc-300">...de apenas sobreviver e começar a prosperar de verdade.</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <p className="text-xl font-bold text-yellow-400 mb-2">Você está DETERMINADO...</p>
              <p className="text-zinc-300">...a transformar seu conhecimento em riqueza e liberdade financeira.</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <p className="text-xl font-bold text-yellow-400 mb-2">Você ACREDITA...</p>
              <p className="text-zinc-300">...que merece mais e está pronto para agir para conquistar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Momento de Decidir Section */}
      <section className="py-20 relative overflow-hidden bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionBadge text="MOMENTO DE DECIDIR" />
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">
              AGORA É O MOMENTO DE DECIDIR
            </h2>
            <div className="space-y-6 mb-12">
              <p className="text-xl text-zinc-300 font-semibold">
                Você não pode mudar o passado, mas pode criar um futuro diferente.
              </p>
              <p className="text-xl text-zinc-300 font-semibold">
                O conhecimento sem ação não gera resultados. A ação sem conhecimento gera frustração.
              </p>
              <p className="text-xl text-zinc-300 font-semibold">
                Conhecimento + Ação = Resultados Transformadores.
              </p>
              <p className="text-xl text-zinc-300 font-semibold">
                Esta é sua oportunidade de transformar conhecimento em fortuna.
              </p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-yellow-400/50 rounded-xl p-8">
              <p className="text-2xl font-bold text-yellow-400 mb-4">Roberto Navarro</p>
              <p className="text-lg text-zinc-300 italic">
                "De lavador de vidros aos 13 anos a multimilionário em 7 anos. Se eu consegui, você também consegue.
                Mas você precisa decidir AGORA."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Participants */}
      <NotableParticipants accent="yellow" />

      {/* Testimonials */}
      {evento.testimonials && Array.isArray(evento.testimonials) && evento.testimonials.length > 0 && (
        <section className="py-20 relative overflow-hidden bg-zinc-950">
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
                CONHEÇA SEU <span className="text-yellow-400">MENTOR</span>
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
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-400">
                        <Image src={photoUrl} alt={mentorData.name || 'Mentor'} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-400">{mentorData.name || 'Mentor'}</h3>
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

      {/* Inscrição Section */}
      <section id="inscricao" className="py-20 relative overflow-hidden bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <SectionBadge text="INSCRIÇÃO" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ESCOLHA SEU <span className="text-yellow-400">INGRESSO</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Participe do evento transformador Mentor Milionário e comece a transformar conhecimento em fortuna. Vagas
              limitadas!
            </p>
          </div>

          {/* Tickets */}
          {ticketTypes.length > 0 && (
            <TicketPricingCards eventId={evento.id} eventName={evento.title} ticketTypes={ticketTypes} />
          )}

          {/* Registration Button */}
          <div className="text-center mt-12">
            <EventRegistrationButton
              eventSlug={evento.slug}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold px-8 py-4 rounded-full text-lg"
            >
              GARANTIR MINHA INSCRIÇÃO
            </EventRegistrationButton>
          </div>
        </div>
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source={evento.title || 'Mentor Milionário'} />
    </div>
  )
}

