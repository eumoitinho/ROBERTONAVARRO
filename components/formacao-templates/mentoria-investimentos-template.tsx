'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import HeroPages from '@/components/hero-pages'
import TestimonialsSection from '@/components/testimonials-section'
import MentorSection from '@/components/mentor'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, XCircle, TrendingUp, Shield, DollarSign, BarChart3, Target, Brain, Zap } from 'lucide-react'
import Image from 'next/image'

interface MentoriaInvestimentosTemplateProps {
  formacao: any
}

export default function MentoriaInvestimentosTemplate({ formacao }: MentoriaInvestimentosTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Problemas e Soluções', href: '#problemas-solucoes' },
    { title: 'O Que Você Vai Aprender', href: '#aprender' },
    { title: 'Princípios', href: '#principios' },
    { title: 'Inscrição', href: '#inscricao', isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={formacao.hero?.title || formacao.title}
        secondtitle={formacao.hero?.subtitle || ''}
        subtitle="Roberto Navarro"
        description={typeof formacao.hero?.description === 'string' ? formacao.hero.description : undefined}
        image={
          typeof formacao.hero?.backgroundImage === 'object' && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : '/images/HERO_MENTORIAINVESTIMENTOS.png'
        }
        ctaText={formacao.hero?.ctaText || 'QUERO ME TORNAR UM INVESTIDOR!'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#problemas-solucoes"
      />

      {/* Problemas e Soluções Section */}
      <section id="problemas-solucoes" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Problemas Comuns */}
            <div className="bg-red-900/20 border-2 border-red-500/50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-400">PROBLEMAS COMUNS</h3>
              <ul className="space-y-4">
                {formacao.challenges?.slice(0, 5).map((challenge: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-zinc-200">{typeof challenge === 'string' ? challenge : challenge.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soluções da Mentoria */}
            <div className="bg-green-900/20 border-2 border-green-500/50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-400">SOLUÇÕES DA MENTORIA</h3>
              <ul className="space-y-4">
                {formacao.benefits?.slice(0, 5).map((benefit: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-zinc-200">{typeof benefit === 'string' ? benefit : benefit.description || benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transformação Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A MENTORIA QUE VAI <span className="text-yellow-400">TRANSFORMAR SUA RELAÇÃO COM O DINHEIRO</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-4">2 dias intensivos + Universidade do Investidor</p>
          </div>
        </div>
      </section>

      {/* O Que Você Vai Aprender Section */}
      {formacao.learnings && formacao.learnings.length > 0 && (
        <section id="aprender" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O QUE VOCÊ <span className="text-yellow-400">VAI APRENDER</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {formacao.learnings.map((learning: any, index: number) => {
                const icons = [TrendingUp, DollarSign, BarChart3, Target, Brain, Zap, Shield, CheckCircle, DollarSign]
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
                      <p className="text-zinc-200">{typeof learning === 'string' ? learning : learning.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Investir Não É Aposta Section */}
      {formacao.modules && formacao.modules.length > 0 && (
        <section id="principios" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                INVESTIR NÃO É <span className="text-yellow-400">APOSTA</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {formacao.modules.slice(0, 5).map((module: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 text-yellow-400">{module.title || `Princípio ${index + 1}`}</h3>
                  <p className="text-zinc-300">{module.description || (module.topics?.[0]?.text) || ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mentor Section */}
      <MentorSection />

      {/* Testimonials */}
      {formacao.testimonials && formacao.testimonials.length > 0 && (
        <TestimonialsSection />
      )}

      {/* Garantias Section */}
      {formacao.guarantee && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 text-center">
                <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Garantia legal de {formacao.guarantee.days || 7} dias
                </h3>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 text-center">
                <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Garantia de resultados em 6 meses
                </h3>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {formacao.faqs && formacao.faqs.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                PERGUNTAS <span className="text-yellow-400">FREQUENTES</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {formacao.faqs.map((faq: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-zinc-800 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-zinc-800/50 text-left font-medium">
                      {typeof faq === 'object' ? faq.question : 'Pergunta'}
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
                          String(faq.answer)
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

      {/* Newsletter/Form Section */}
      <section id="inscricao" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <NewsletterFormacoes
            title="PRONTO PARA TRANSFORMAR SUA VIDA FINANCEIRA?"
            description="Aprenda a investir com segurança e transforme sua relação com o dinheiro."
            source="Mentoria de Investimentos"
            ctaText="QUERO ME TORNAR UM INVESTIDOR!"
            accent="yellow"
          />
        </div>
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source="Mentoria de Investimentos" />
    </div>
  )
}

