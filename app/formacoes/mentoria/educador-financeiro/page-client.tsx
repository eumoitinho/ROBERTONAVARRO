"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import { SiteHeader } from "@/components/layout/header"
import HeroPages from "@/components/events/hero-pages"
import { SectionBadge } from "@/components/marketing/section-badge"
import Footer from "@/components/layout/footer"
import type { FormationPageData } from '@/sanity/lib/formations-api'

interface Props {
  data: FormationPageData
}

export default function FormationPageClientWrapper({ data }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const navigationLinks = [
    { title: "Benefícios", href: "#beneficios" },
    { title: "Conteúdo", href: "#conteudo" },
    { title: "Preços", href: "#precos" },
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
        image={data.hero?.backgroundImage ? '/images/HERO_FORMACAO.png' : '/images/HERO_FORMACAO.png'}
        ctaText={data.hero?.ctaText || 'QUERO PARTICIPAR'}
        ctaHref={data.hero?.ctaLink || '#inscricao'}
      />

      {/* Benefícios Section */}
      {data.controls?.showBenefits && data.benefits && data.benefits.items && data.benefits.items.length > 0 && (
        <section id="beneficios" className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.benefits.badge && <SectionBadge text={data.benefits.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.benefits.title}
              </h2>
              {data.benefits.description && (
                <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                  {data.benefits.description}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.items.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-yellow-400 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo Principal */}
      {data.controls?.showMainContent && data.mainContent && data.mainContent.items && data.mainContent.items.length > 0 && (
        <section id="conteudo" className="py-20 relative">
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

      {/* Metodologia */}
      {data.controls?.showMethodology && data.methodology && data.methodology.steps && data.methodology.steps.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {data.methodology.badge && <SectionBadge text={data.methodology.badge} />}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {data.methodology.title}
              </h2>
              {data.methodology.description && (
                <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
                  {data.methodology.description}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.methodology.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-yellow-400 mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Preços */}
      {data.controls?.showPricing && data.pricing && data.pricing.plans && data.pricing.plans.length > 0 && (
        <section id="precos" className="py-20 relative">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.pricing.plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-zinc-900/50 backdrop-blur-sm border rounded-3xl p-8 hover:border-yellow-500/50 transition-all duration-300 ${
                    plan.highlighted ? 'border-yellow-500/50 scale-105' : 'border-zinc-800/50'
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-yellow-400 mb-2">{plan.price}</div>
                    <p className="text-zinc-300 text-sm">{plan.description}</p>
                  </div>
                  {plan.features && plan.features.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold"
                  >
                    <a href={plan.ctaLink}>{plan.ctaText}</a>
                  </Button>
                </div>
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
