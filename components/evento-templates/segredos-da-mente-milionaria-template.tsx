'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import NotableParticipants from '@/components/notable-persons'
import { TestimonialsSection } from '@/components/testimonials-section'
import { SectionBadge } from '@/components/section-badge'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import Image from 'next/image'

interface SegredosDaMenteMilionariaTemplateProps {
  evento: any
}

export default function SegredosDaMenteMilionariaTemplate({ evento }: SegredosDaMenteMilionariaTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Benefícios', href: '#beneficios' },
    { title: 'O Que Você Vai Aprender', href: '#aprender' },
    { title: 'Depoimentos', href: '#depoimentos' },
    { title: 'Inscreva-se', href: '#newsletter', isButton: true },
  ]

  const getHeroImage = () => {
    if (typeof evento.hero?.backgroundImage === 'object' && evento.hero?.backgroundImage?.url) {
      return evento.hero.backgroundImage.url
    }
    return '/images/HERO_SEGREDOS.png'
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={evento.hero?.title || evento.title}
        subtitle={evento.hero?.subtitle || 'Aprenda a despertar seu potencial milionário em 7 horas'}
        secondtitle={evento.hero?.badge || 'IMERSÃO EXCLUSIVA'}
        description={typeof evento.hero?.description === 'string' ? evento.hero.description : (evento.hero?.subtitle || 'Imersão exclusiva e transformadora')}
        image={getHeroImage()}
        ctaText={evento.hero?.ctaText || "QUERO DESPERTAR MINHA MENTE MILIONÁRIA"}
        ctaHref={evento.hero?.ctaLink || "#newsletter"}
      />

      {/* Benefícios Section */}
      {evento.highlights?.items && evento.highlights.items.length > 0 && (
        <section id="beneficios" className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="BENEFÍCIOS" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {evento.highlights.sectionTitle ? (
                  <>
                    {evento.highlights.sectionTitle.split('CONQUISTAR')[0]}
                    <span className="text-yellow-400">CONQUISTAR</span>
                    {evento.highlights.sectionTitle.split('CONQUISTAR')[1]}
                  </>
                ) : (
                  <>
                    O QUE VOCÊ VAI <span className="text-yellow-400">CONQUISTAR</span>
                  </>
                )}
              </h2>
              {evento.highlights.sectionDescription && (
                <p className="text-zinc-300 max-w-3xl mx-auto">
                  {evento.highlights.sectionDescription}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {evento.highlights.items.map((highlight: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{highlight.title}</h3>
                  <p className="text-zinc-300">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* O Que Você Vai Aprender Section */}
      {evento.learnings?.items && evento.learnings.items.length > 0 && (
        <section id="aprender" className="py-20 relative overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <SectionBadge text="O QUE VOCÊ VAI APRENDER" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {evento.learnings.sectionTitle ? (
                  <>
                    {evento.learnings.sectionTitle.split('TRANSFORMADOR')[0]}
                    <span className="text-yellow-400">TRANSFORMADOR</span>
                    {evento.learnings.sectionTitle.split('TRANSFORMADOR')[1]}
                  </>
                ) : (
                  <>
                    CONTEÚDO <span className="text-yellow-400">TRANSFORMADOR</span>
                  </>
                )}
              </h2>
              {evento.learnings.sectionDescription && (
                <p className="text-zinc-300 max-w-3xl mx-auto">
                  {evento.learnings.sectionDescription}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {evento.learnings.items.map((learning: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-400/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 rounded-lg p-3 flex-shrink-0">
                      <span className="text-2xl font-bold text-yellow-400">{index + 1}</span>
                    </div>
                    <p className="text-zinc-300">{learning.text}</p>
                  </div>
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
                CONHEÇA SEUS <span className="text-yellow-400">MENTORES</span>
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto">
                Com Roberto e Raíssa Navarro, você vai aprender com quem realmente transforma vidas através da educação
                financeira e desenvolvimento pessoal.
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

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 relative overflow-hidden bg-zinc-950">
        <NewsletterFormacoes
          title="GARANTA SUA VAGA NO SEGREDOS DA MENTE MILIONÁRIA"
          description="Preencha o formulário abaixo e garanta sua participação na imersão mais transformadora sobre mentalidade milionária."
          source="Segredos da Mente Milionária"
          eventDate={
            evento.date
              ? new Date(evento.date).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }) + ', 13h às 20h'
              : '22 de outubro de 2025, 13h às 20h'
          }
          eventLocation={
            evento.location?.venue && evento.location?.address
              ? `${evento.location.venue}, ${evento.location.address}, ${evento.location.city} - ${evento.location.state}`
              : evento.location?.venue
                ? `${evento.location.venue}, ${evento.location.city} - ${evento.location.state}`
                : 'R. Alameda Araguaia, 751 - Alphaville - SP'
          }
          accent="yellow"
        />
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source={evento.title || 'Segredos da Mente Milionária'} />
    </div>
  )
}

