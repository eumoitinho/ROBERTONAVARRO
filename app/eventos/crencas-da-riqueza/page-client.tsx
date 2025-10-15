"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import { SiteHeader } from "@/components/layout/header"
import HeroPages from "@/components/events/hero-pages"
import { TestimonialsSection } from "@/components/marketing/testimonials-section"
import { SectionBadge } from "@/components/marketing/section-badge"
import Footer from "@/components/layout/footer"
import { TicketPricingCards } from "@/components/events/ticket-pricing-cards"
import type { EventPageData } from '@/sanity/lib/events-api'

interface Props {
  data: EventPageData
}

export default function EventPageClientWrapper({ data }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const navigationLinks = [
    { title: "O Que Aprender", href: "#o-que-aprender" },
    { title: "Depoimentos", href: "#depoimentos" },
    { title: "Ingressos", href: "#ingressos" },
    { title: "Inscreva-se", href: "#inscricao", isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] bg-repeat bg-[length:200px_200px] pointer-events-none"></div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <SiteHeader navigationItems={navigationLinks} showInicio />

      {/* Hero Section */}
      <HeroPages
        title={data.hero?.title || data.title}
        subtitle={data.hero?.subtitle || ''}
        secondtitle={data.hero?.description || ''}
        description=""
        image={data.hero?.backgroundImage ? '/images/HERO_CRENCAS.png' : '/images/HERO_CRENCAS.png'}
        ctaText={data.hero?.ctaText || 'QUERO PARTICIPAR'}
        ctaLink={data.hero?.ctaLink || '#inscricao'}
      />

      {/* Desafios Section */}
      {data.controls?.showChallenges && data.challenges && data.challenges.items && data.challenges.items.length > 0 && (
        <section id="desafios" className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.challenges.badge && <SectionBadge text={data.challenges.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.challenges.title}
              </h2>
              {data.challenges.description && (
                <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                  {data.challenges.description}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.challenges.items.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-yellow-400 mb-3">
                    {challenge.question}
                  </h3>
                  <p className="text-zinc-300">
                    {challenge.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo Principal - 4 Inteligências */}
      {data.controls?.showMainContent && data.mainContent && data.mainContent.items && data.mainContent.items.length > 0 && (
        <section id="o-que-aprender" className="py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.mainContent.badge && <SectionBadge text={data.mainContent.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.mainContent.title}
              </h2>
              {data.mainContent.description && (
                <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                  {data.mainContent.description}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {data.mainContent.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-zinc-300 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  {item.benefits && item.benefits.length > 0 && (
                    <ul className="space-y-3">
                      {item.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Destaques */}
      {data.controls?.showHighlights && data.highlights && data.highlights.items && data.highlights.items.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.highlights.badge && <SectionBadge text={data.highlights.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.highlights.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.highlights.items.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-zinc-300">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bônus */}
      {data.controls?.showBonuses && data.bonuses && data.bonuses.items && data.bonuses.items.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.bonuses.badge && <SectionBadge text={data.bonuses.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.bonuses.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.bonuses.items.map((bonus, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="text-yellow-400 text-sm font-bold mb-2">
                    {bonus.value}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {bonus.title}
                  </h3>
                  <p className="text-zinc-300 text-sm">
                    {bonus.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ingressos */}
      {data.controls?.showPricing && data.pricing && data.pricing.tickets && data.pricing.tickets.length > 0 && (
        <section id="ingressos" className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.pricing.badge && <SectionBadge text={data.pricing.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.pricing.title}
              </h2>
              {data.pricing.description && (
                <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                  {data.pricing.description}
                </p>
              )}
            </div>

            <TicketPricingCards 
              eventSlug="crencas-da-riqueza"
              eventId="event-crencas-da-riqueza"
            />
          </div>
        </section>
      )}

      {/* Depoimentos */}
      {data.controls?.showTestimonials && data.testimonials && (
        <section id="depoimentos" className="py-20 relative">
          <TestimonialsSection
            badge={data.testimonials.badge}
            title={data.testimonials.title}
            highlightedText="Participantes"
            description={data.testimonials.description}
            testimonials={data.testimonials.items?.map(t => ({
              name: t.name || '',
              role: t.role || '',
              initial: t.name?.charAt(0) || 'A',
              quote: t.quote || '',
              rating: t.rating || 5,
              image: t.image,
            })) || []}
            ctaText="Junte-se a quem já transformou sua vida"
            ctaButtonText="GARANTIR MINHA VAGA"
            ctaButtonLink="#inscricao"
          />
        </section>
      )}

      {/* FAQ */}
      {data.controls?.showFaq && data.faq && data.faq.items && data.faq.items.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.faq.badge && <SectionBadge text={data.faq.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.faq.title}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {data.faq.items.map((item, index) => (
                <details
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <summary className="font-bold text-lg cursor-pointer">
                    {item.question}
                  </summary>
                  <p className="text-zinc-300 mt-4">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      {data.finalCta && (
        <section id="inscricao" className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {data.finalCta.title}
              </h2>
              <p className="text-zinc-300 text-lg mb-8 max-w-2xl mx-auto">
                {data.finalCta.description}
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-lg"
              >
                <a href={data.finalCta.buttonLink}>
                  {data.finalCta.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

