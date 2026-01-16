'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import { HeroCountdown } from '@/components/hero-countdown'
import TransformationVideos from '@/components/transformation-videos'
import NotableParticipants from '@/components/notable-persons'
import { TestimonialsSection } from '@/components/testimonials-section'
import { IntelligenceCard } from '@/components/intelligence-card'
import { SectionBadge } from '@/components/section-badge'
import { TicketPricingCards } from '@/components/ticket-pricing-cards'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { EventRegistrationButton } from '@/components/event-registration-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import { useState } from 'react'
import Image from 'next/image'
import { Brain, Compass, Target, Move, Unlock } from 'lucide-react'

interface CrencasDaRiquezaTemplateProps {
  evento: any
}

const iconMap: Record<string, any> = {
  brain: Brain,
  compass: Compass,
  target: Target,
  move: Move,
  unlock: Unlock,
}

export default function CrencasDaRiquezaTemplate({ evento }: CrencasDaRiquezaTemplateProps) {
  const [selectedIntelligence, setSelectedIntelligence] = useState<number>(0)
  const formSlug = evento?.form
    ? typeof evento.form === 'object'
      ? evento.form.slug
      : evento.form
    : undefined

  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'O Que Aprender', href: '#o-que-aprender' },
    { title: 'Mentores', href: '#mentores' },
    { title: 'Depoimentos', href: '#depoimentos' },
    { title: 'Inscreva-se', href: '#form', isButton: true },
  ]

  const getHeroImage = () => {
    if (typeof evento.hero?.backgroundImage === 'object' && evento.hero?.backgroundImage?.url) {
      return evento.hero.backgroundImage.url
    }
    return '/images/HERO_CRENCAS.png'
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

      {/* Hero Section com Countdown */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getHeroImage()}
            alt={evento.hero?.title || evento.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/80 via-60% to-transparent md:to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <HeroPages
              title={evento.hero?.title || evento.title}
              subtitle={evento.hero?.subtitle || evento.hero?.secondTitle || ''}
              secondtitle={evento.hero?.badge || 'TRANSFORMAÇÃO MENTAL'}
              description={typeof evento.hero?.description === 'string' ? evento.hero.description : (evento.hero?.subtitle || '')}
              image={getHeroImage()}
              ctaText={evento.hero?.ctaText || "GARANTA SUA VAGA!"}
              ctaHref={evento.hero?.ctaLink || "#form"}
            />

            {/* Countdown */}
            {evento.countdown?.enabled && evento.countdown?.targetDate && (
              <div className="mt-8">
                <HeroCountdown targetDate={new Date(evento.countdown.targetDate)} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      {evento.challenges && evento.challenges.length > 0 && (
        <section className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="DESAFIOS" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                VOCÊ SE IDENTIFICA COM{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                  ALGUM DESSES DESAFIOS?
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {evento.challenges.map((challenge: any, index: number) => {
                const IconComponent = iconMap[challenge.icon] || Brain
                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-500/20 rounded-lg p-3 flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-white">{challenge.question}</h3>
                        <p className="text-zinc-300 text-sm">{challenge.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Transformation Videos */}
      <TransformationVideos accent="yellow" />

      {/* Intelligence Types Section */}
      {evento.intelligenceTypes && evento.intelligenceTypes.length > 0 && (
        <section id="o-que-aprender" className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="CONTEÚDO EXCLUSIVO" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                DESENVOLVA AS{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                  4 INTELIGÊNCIAS DA PROSPERIDADE
                </span>
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto">
                Uma metodologia completa que integra mente, emoções, propósito e estratégia para sua transformação financeira.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {evento.intelligenceTypes.map((intelligence: any, index: number) => (
                <IntelligenceCard
                  key={index}
                  title={intelligence.title}
                  description={intelligence.description}
                  icon={intelligence.icon || '/placeholder.svg'}
                  benefits={intelligence.benefits?.map((b: any) => b.text || b) || []}
                  isActive={selectedIntelligence === index}
                  onClick={() => setSelectedIntelligence(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Highlights */}
      {((evento.highlights?.items && evento.highlights.items.length > 0) || (Array.isArray(evento.highlights) && evento.highlights.length > 0)) && (
        <section className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="DESTAQUES" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {evento.highlights?.sectionTitle || (
                  <>
                    POR QUE PARTICIPAR DESTE <span className="text-yellow-400">EVENTO</span>
                  </>
                )}
              </h2>
              {evento.highlights?.sectionDescription && (
                <p className="text-zinc-300 max-w-3xl mx-auto">{evento.highlights.sectionDescription}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {(evento.highlights?.items || (Array.isArray(evento.highlights) ? evento.highlights : [])).map((highlight: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-400/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{highlight.title}</h3>
                  <p className="text-zinc-300 text-sm">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Notable Participants */}
      <NotableParticipants accent="yellow" />

      {/* Testimonials */}
      {evento.testimonials && Array.isArray(evento.testimonials) && evento.testimonials.length > 0 && (
        <TestimonialsSection testimonials={evento.testimonials} />
      )}

      {/* Mentors Section */}
      {evento.mentors && Array.isArray(evento.mentors) && evento.mentors.length > 0 && (
        <section id="mentores" className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <SectionBadge text="MENTORES" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
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
                        {mentorData.shortBio && (
                          <p className="text-sm text-zinc-300 mb-4">{mentorData.shortBio}</p>
                        )}
                        {mentorData.bio && Array.isArray(mentorData.bio) && (
                          <ul className="space-y-2">
                            {mentorData.bio.map((item: any, bioIndex: number) => (
                              <li key={bioIndex} className="flex items-start gap-2">
                                <span className="text-yellow-400 mt-1">✓</span>
                                <p className="text-xs text-zinc-300">
                                  {typeof item === 'object' ? item.text || item : item}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Registration/Form Section */}
      <section id="form" className="py-20 relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <SectionBadge text="INSCRIÇÃO" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ESCOLHA SEU <span className="text-yellow-400">INGRESSO</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Participe do evento transformador Crenças da Riqueza e comece a mudar sua relação com o dinheiro. Vagas
              limitadas!
            </p>
          </div>

          {/* Event Info */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {evento.date && (
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-400">Data</h3>
                <p className="text-zinc-300">
                  {new Date(evento.date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                {evento.duration && <p className="text-sm text-zinc-400 mt-2">{evento.duration}</p>}
              </div>
            )}

            {evento.location && (
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-400">Local</h3>
                <p className="text-zinc-300">{evento.location.venue || 'A definir'}</p>
                {evento.location.address && <p className="text-sm text-zinc-400 mt-2">{evento.location.address}</p>}
                {evento.location.city && evento.location.state && (
                  <p className="text-sm text-zinc-400">{`${evento.location.city}, ${evento.location.state}`}</p>
                )}
              </div>
            )}

            {evento.mentors && Array.isArray(evento.mentors) && evento.mentors.length > 0 && (
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-2 text-yellow-400">Mentores</h3>
                <p className="text-zinc-300">{evento.mentors.length} mentor(es)</p>
              </div>
            )}
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

      {formSlug && (
        <NewsletterFormacoes
          sectionId="formulario"
          title={`GARANTA SUA VAGA NO ${evento.title || 'Crenças da Riqueza'}`}
          description="Preencha o formulário abaixo e receba as informações completas do evento."
          source={evento.title || 'Crenças da Riqueza'}
          formSlug={formSlug}
          accent="yellow"
        />
      )}

      {/* FAQs */}
      {evento.faqs && Array.isArray(evento.faqs) && evento.faqs.length > 0 && (
        <section id="depoimentos" className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="PERGUNTAS FREQUENTES" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                DÚVIDAS <span className="text-yellow-400">COMUNS</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {evento.faqs.map((faq: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-zinc-800 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-zinc-800/50 text-left font-medium">
                      {typeof faq === 'object' ? (faq.question || faq.title) : 'Pergunta'}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-zinc-900/50 text-zinc-300">
                      {typeof faq === 'object' ? (
                        Array.isArray(faq.answer) ? (
                          <div className="prose prose-invert max-w-none">
                            {faq.answer.map((block: any, bIdx: number) => (
                              <p key={bIdx}>{block.text || String(block)}</p>
                            ))}
                          </div>
                        ) : (
                          String(faq.answer || faq.description || '')
                        )
                      ) : (
                        'Resposta'
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      <Footer accent="yellow" />
      <WhatsAppButton source={evento.title || 'Crenças da Riqueza'} />
    </div>
  )
}
