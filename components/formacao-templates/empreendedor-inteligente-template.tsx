'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import HeroPages from '@/components/hero-pages'
import Image from 'next/image'
import { CheckCircle, Target, TrendingUp, Users, Briefcase, DollarSign, BarChart3, Zap, Network, Building2 } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ScrollToButton from '@/components/scroll-to-button'
import { ArrowRight } from 'lucide-react'

interface EmpreendedorInteligenteTemplateProps {
  formacao: any
}

export default function EmpreendedorInteligenteTemplate({ formacao }: EmpreendedorInteligenteTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Sobre', href: '#sobre' },
    { title: 'O Que Você Vai Aprender', href: '#aprender' },
    { title: 'Metodologia', href: '#metodologia' },
    { title: 'Inscrição', href: '#inscricao', isButton: true },
  ]

  const renderRichText = (content: any) => {
    if (!content) return null
    if (typeof content === 'string') return content
    if (Array.isArray(content)) {
      return content.map((block: any, idx: number) => {
        if (block.type === 'p') {
          return (
            <p key={idx} className="mb-4">
              {block.children?.map((child: any, cIdx: number) => child.text || '').join('')}
            </p>
          )
        }
        return null
      })
    }
    return String(content)
  }

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
            : '/images/HERO_EMPREENDEDOR.png'
        }
        ctaText={formacao.hero?.ctaText || 'GARANTA SUA VAGA!'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre"
      />

      {/* Challenges Section */}
      {formacao.challenges && formacao.challenges.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">DESAFIOS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                VOCÊ SE IDENTIFICA COM <span className="text-yellow-400">ALGUM DESSES DESAFIOS?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {formacao.challenges.map((challenge: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 rounded-full p-2">
                      <Target className="h-5 w-5 text-yellow-400" />
                    </div>
                    <p className="text-zinc-200 text-lg">{typeof challenge === 'string' ? challenge : challenge.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value Proposition Section */}
      <section id="sobre" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                O QUE OS <span className="text-yellow-400">GRANDES EMPRESÁRIOS</span> SABEM QUE VOCÊ AINDA NÃO SABE
              </h2>
              <div className="prose prose-invert max-w-none text-lg text-zinc-300 leading-relaxed">
                {renderRichText(formacao.hero?.description)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn Section */}
      {formacao.learnings && formacao.learnings.length > 0 && (
        <section id="aprender" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">CONTEÚDO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O QUE VOCÊ <span className="text-yellow-400">VAI APRENDER</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {formacao.learnings.map((learning: any, index: number) => {
                const icons = [DollarSign, BarChart3, Users, Briefcase, TrendingUp, Network, Building2, Zap, Target, CheckCircle]
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

      {/* Metodologia Lean Section */}
      {formacao.modules && formacao.modules.length > 0 && (
        <section id="metodologia" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">METODOLOGIA</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                METODOLOGIA <span className="text-yellow-400">LEAN</span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {formacao.modules.map((module: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-4">
                    <h3 className="text-xl font-bold text-black">{module.title}</h3>
                    {module.description && (
                      <p className="text-zinc-900 text-sm mt-2">{module.description}</p>
                    )}
                  </div>
                  {module.topics && module.topics.length > 0 && (
                    <div className="p-6 grid md:grid-cols-2 gap-4">
                      {module.topics.map((topic: any, tIndex: number) => (
                        <div key={tIndex} className="flex items-center gap-3 text-zinc-300">
                          <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-sm">{topic.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                DÚVIDAS <span className="text-yellow-400">COMUNS</span>
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
            title="INSCREVA-SE AGORA E SAIA DO MODO SOBREVIVÊNCIA"
            description="Transforme seu negócio e alcance resultados extraordinários. Preencha seus dados abaixo e garanta sua vaga."
            source="Empreendedor Inteligente"
            ctaText="QUERO SER UM EMPREENDEDOR INTELIGENTE!"
            accent="yellow"
          />
        </div>
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source="Empreendedor Inteligente" />
    </div>
  )
}

