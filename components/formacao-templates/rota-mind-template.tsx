'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import MentorSection from '@/components/mentor'
import { SectionBadge } from '@/components/section-badge'
import DynamicForm from '@/components/dynamic-form'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Users, Handshake, BookOpen, Target, Network, Building2, TrendingUp } from 'lucide-react'
import Image from 'next/image'

interface RotaMindTemplateProps {
  formacao: any
}

export default function RotaMindTemplate({ formacao }: RotaMindTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'O Que É', href: '#o-que-e' },
    { title: 'Benefícios', href: '#beneficios' },
    { title: 'Conselho', href: '#conselho' },
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
            : '/images/HERO_ROTAMIND.png'
        }
        ctaText={formacao.hero?.ctaText || 'QUERO ESTAR ENTRE OS MAIORES!'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#o-que-e"
      />

      {/* Challenges Section */}
      {formacao.challenges && formacao.challenges.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                VOCÊ SE IDENTIFICA COM <span className="text-blue-400">ALGUM DESSES DESAFIOS?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {formacao.challenges.map((challenge: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 rounded-full p-2">
                      <Target className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-zinc-200">{typeof challenge === 'string' ? challenge : challenge.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* O Que É Section */}
      <section id="o-que-e" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionBadge text="O QUE É O ROTA MIND" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                CLUBE <span className="text-blue-400">EXTREMAMENTE SELETO</span>
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                2 dias de imersão transformadora
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">DIA 1</h3>
                <p className="text-xl font-semibold mb-4">Conteúdo de Alta Performance</p>
                <p className="text-zinc-300">Imersão completa em estratégias de alto nível</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">DIA 2</h3>
                <p className="text-xl font-semibold mb-4">Clube de Negócios</p>
                <p className="text-zinc-300">Networking estratégico e parcerias reais</p>
              </div>
            </div>

            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/rotamind-meeting.png"
                alt="Rota Mind Meeting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Users, title: 'Clube Seleto', description: 'Acesso exclusivo' },
              { icon: BookOpen, title: 'Imersão de 2 Dias', description: 'Conteúdo intensivo' },
              { icon: Handshake, title: 'Parcerias Reais', description: 'Oportunidades concretas' },
              { icon: Target, title: 'Conselho Estratégico', description: 'Orientação especializada' },
            ].map((highlight, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300"
              >
                <highlight.icon className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2 text-blue-400">{highlight.title}</h3>
                <p className="text-zinc-300 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      {formacao.benefits && formacao.benefits.length > 0 && (
        <section id="beneficios" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                BENEFÍCIOS DO <span className="text-blue-400">ROTA MIND</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { title: 'Networking de Alto Nível', icon: Network },
                { title: 'Parcerias Estratégicas', icon: Handshake },
                { title: 'Treinamentos Exclusivos', icon: BookOpen },
                { title: 'Apoio de Conselheiros', icon: Target },
              ].map((category, catIndex) => (
                <div
                  key={catIndex}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <category.icon className="h-8 w-8 text-blue-400" />
                    <h3 className="text-2xl font-bold text-blue-400">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {formacao.benefits
                      .filter((_: any, i: number) => Math.floor(i / 4) === catIndex)
                      .slice(0, 5)
                      .map((benefit: any, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                          <span className="text-zinc-200">
                            {typeof benefit === 'string' ? benefit : benefit.description || benefit.text}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisory Section */}
      <section id="conselho" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-blue-500/50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              NO ROTA MIND, VOCÊ <span className="text-blue-400">NUNCA MAIS DECIDE SOZINHO</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {['Visão externa', 'Orientações estratégicas', 'Experiências compartilhadas', 'Inteligência coletiva'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <MentorSection />

      {/* Form Section */}
      {formacao.form && (
        <section id="inscricao" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  SE VOCÊ QUER CONTINUAR NO MESMO LUGAR, <span className="text-blue-400">ESSE CLUBE NÃO É PARA VOCÊ</span>
                </h2>
                <p className="text-lg text-zinc-300">
                  Preencha o formulário abaixo para análise de perfil
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12">
                <DynamicForm 
                  formSlug={typeof formacao.form === 'object' ? formacao.form.slug : formacao.form} 
                  accent="blue" 
                />
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
                PERGUNTAS <span className="text-blue-400">FREQUENTES</span>
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

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              PRONTO PARA <span className="text-blue-400">TRANSFORMAR SEU NEGÓCIO?</span>
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              O sucesso acontece no ambiente certo. Junte-se ao Rota Mind.
            </p>
          </div>
        </div>
      </section>

      <Footer accent="blue" />
      <WhatsAppButton source="Rota Mind" />
    </div>
  )
}

