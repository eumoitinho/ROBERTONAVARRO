'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import HeroPages from '@/components/hero-pages'
import DynamicForm from '@/components/dynamic-form'
import ScrollToButton from '@/components/scroll-to-button'
import { TestimonialsSection } from '@/components/testimonials-section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Target, ArrowRight, Shield, TrendingUp, Zap, Users, DollarSign, Brain, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

interface MentorCoachingFinanceiroTemplateProps {
  formacao: any
}

export default function MentorCoachingFinanceiroTemplate({ formacao }: MentorCoachingFinanceiroTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Sobre', href: '#sobre' },
    { title: 'Conteúdo', href: '#conteudo' },
    { title: 'Público-Alvo', href: '#publico-alvo' },
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

  // Helper para renderizar ícones dinamicamente
  const renderIcon = (iconName: string, className: string = 'h-6 w-6 text-yellow-400') => {
    const iconMap: Record<string, any> = {
      Target,
      CheckCircle,
      Shield,
      TrendingUp,
      Zap,
      Users,
      DollarSign,
      Brain,
      AlertTriangle,
    }
    const IconComponent = iconMap[iconName] || Target
    return <IconComponent className={className} />
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
            : '/images/HERO_EDUCADOR.png'
        }
        ctaText={formacao.hero?.ctaText || 'ESTOU PRONTO PARA MUDAR MINHA VIDA!'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
      />

      {/* About Section - TRANSFORME SUA VIDA */}
      <section id="sobre" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TRANSFORME SUA <span className="text-yellow-400">VIDA</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
              De profissional bem-sucedido a gerador de riqueza
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-lg leading-relaxed text-zinc-300 mb-8">
              {renderRichText(formacao.hero?.description || 'Você já conquistou muito, mas sente que pode ir além? O Mentor Coaching Financeiro foi criado para profissionais como você, que desejam quebrar o teto de vidro financeiro e alcançar um novo patamar de prosperidade.')}
            </div>

            {formacao.benefits && formacao.benefits.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {formacao.benefits.slice(0, 3).map((benefit: any, index: number) => {
                  const iconMap = [Users, Brain, Target]
                  const IconComponent = iconMap[index] || Target
                  return (
                    <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-zinc-800 rounded-full p-3 flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-yellow-400" />
                        </div>
                        <p className="text-zinc-300">
                          {typeof benefit === 'object' ? benefit.description || benefit.title : benefit}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Challenges Section - A ARMADILHA INVISÍVEL */}
      {formacao.challenges && formacao.challenges.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                A <span className="text-yellow-400">ARMADILHA INVISÍVEL</span> DA MEDIOCRIDADE FINANCEIRA
              </h2>
              <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                Você reconhece alguns desses sintomas em sua vida?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {formacao.challenges.map((challenge: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 rounded-full p-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">
                        {typeof challenge === 'object' ? challenge.title : challenge.text?.split('\n')[0] || 'Desafio'}
                      </h3>
                      <p className="text-zinc-300">
                        {typeof challenge === 'object' ? challenge.description : challenge.text?.split('\n').slice(1).join(' ') || challenge.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Methodology Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-yellow-400">MENTOR COACHING FINANCEIRO</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-4xl mx-auto">
              {formacao.methodology?.title || 'A metodologia que vai reprogramar sua relação com o dinheiro'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-zinc-300">
            {formacao.methodology?.description ? (
              renderRichText(formacao.methodology.description)
            ) : (
              <>
                <p>
                  O Mentor Coaching Financeiro é resultado de mais de uma década de pesquisa e aplicação prática com milhares de alunos. É a síntese de tudo que Roberto Navarro descobriu sobre como pessoas realmente bem-sucedidas pensam, sentem e agem em relação ao dinheiro.
                </p>
                <p>
                  Esta não é mais uma formação sobre &ldquo;como investir&rdquo; ou &ldquo;como controlar gastos&rdquo;.
                </p>
              </>
            )}
            {formacao.methodology?.highlight ? (
              <div className="text-yellow-400 font-semibold">
                {renderRichText(formacao.methodology.highlight)}
              </div>
            ) : (
              <p className="text-yellow-400 font-semibold">
                Este é um processo de transformação profunda que ataca a raiz do problema: sua programação inconsciente sobre dinheiro, sucesso e merecimento.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section - O QUE VOCÊ APRENDERÁ */}
      {formacao.learnings && formacao.learnings.length > 0 && (
        <section id="conteudo" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">CONTEÚDO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O QUE VOCÊ <span className="text-yellow-400">APRENDERÁ?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {formacao.learnings.map((learning: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">
                        {typeof learning === 'object' ? learning.title : learning.text?.split('\n')[0] || 'Aprendizado'}
                      </h3>
                      <p className="text-zinc-300">
                        {typeof learning === 'object' ? learning.description : learning.text?.split('\n').slice(1).join(' ') || learning.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Target Audience Section - PÚBLICO-ALVO */}
      {formacao.targetAudience && formacao.targetAudience.length > 0 && (
        <section id="publico-alvo" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">PÚBLICO-ALVO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                PARA QUEM É O <span className="text-yellow-400">TREINAMENTO?</span>
              </h2>
              <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                Este treinamento foi desenvolvido especificamente para:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {formacao.targetAudience.map((audience: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">
                        {typeof audience === 'object' ? audience.title : audience.text?.split('\n')[0] || 'Público'}
                      </h3>
                      <p className="text-zinc-300">
                        {typeof audience === 'object' ? audience.description : audience.text?.split('\n').slice(1).join(' ') || audience.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mentor Section */}
      {formacao.mentorSection?.enabled !== false && formacao.mentorSection && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">{formacao.mentorSection.badge || 'MENTOR'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {formacao.mentorSection.title ? (
                  <>
                    {formacao.mentorSection.title.split('MENTOR DOS MENTORES')[0]}
                    <span className="text-yellow-400">MENTOR DOS MENTORES</span>
                    {formacao.mentorSection.title.split('MENTOR DOS MENTORES')[1]}
                  </>
                ) : (
                  <>
                    APRENDA COM O <span className="text-yellow-400">MENTOR DOS MENTORES</span>
                  </>
                )}
              </h2>
              {formacao.mentorSection.subtitle && (
                <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                  {formacao.mentorSection.subtitle}
                </p>
              )}
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-3xl blur-3xl -z-10"></div>
                    <div className="bg-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                      <Image
                        src={
                          typeof formacao.mentorSection.image === 'object' && formacao.mentorSection.image?.url
                            ? formacao.mentorSection.image.url
                            : '/images/ROBERTO_17.jpg'
                        }
                        alt={formacao.mentorSection.mentorName || 'Roberto Navarro'}
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover rounded-2xl"
                        style={{ objectPosition: 'top' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-yellow-400">
                      {formacao.mentorSection.mentorName || 'Roberto Navarro'}
                    </h3>
                    {formacao.mentorSection.bio && (
                      <div className="space-y-4 text-zinc-300 leading-relaxed">
                        {renderRichText(formacao.mentorSection.bio)}
                      </div>
                    )}
                    <div className="pt-4">
                      <ScrollToButton targetId="inscricao" className="px-8 py-4 text-base">
                        {formacao.mentorSection.ctaText || 'ESTOU PRONTO PARA MUDAR MINHA VIDA!'} <ArrowRight className="ml-2 h-4 w-4" />
                      </ScrollToButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section - O QUE ESPERAR APÓS O TREINAMENTO */}
      {formacao.results && formacao.results.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">RESULTADOS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O QUE ESPERAR APÓS O <span className="text-yellow-400">TREINAMENTO?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {formacao.results.map((result: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-yellow-400">
                        {typeof result === 'object' ? result.title : result.text?.split('\n')[0] || 'Resultado'}
                      </h3>
                      <p className="text-zinc-300">
                        {typeof result === 'object' ? result.description : result.text?.split('\n').slice(1).join(' ') || result.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Guarantee Section - SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA */}
      {formacao.specialGuarantee && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.15)_0%,_rgba(0,0,0,0)_60%)] opacity-80"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border border-yellow-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="text-center mb-10">
                  <div className="inline-block mb-6">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-[2px] rounded-full">
                      <div className="bg-zinc-900 rounded-full px-6 py-3">
                        <span className="text-yellow-400 font-bold text-sm tracking-wider">
                          SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA
                        </span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {formacao.specialGuarantee.title || '6 meses para experimentar uma mudança real'}
                  </h2>
                  <div className="space-y-4 text-lg text-zinc-300 max-w-3xl mx-auto">
                    {renderRichText(formacao.specialGuarantee.description || 'Ao se inscrever no Mentor Coaching Financeiro, você conta com uma garantia incondicional de 6 meses. Aplique o método, veja resultados reais na sua vida financeira ou receba o dobro do seu dinheiro de volta!')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Decision Paths Section - 3 CAMINHOS DIANTE DE VOCÊ */}
      {formacao.decisionPaths && formacao.decisionPaths.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                3 <span className="text-yellow-400">CAMINHOS DIANTE DE VOCÊ!</span> A DECISÃO É SUA!
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {formacao.decisionPaths.map((path: any, index: number) => (
                <div
                  key={index}
                  className={`bg-zinc-900/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
                    index === 2
                      ? 'border-yellow-500/50 hover:border-yellow-500'
                      : 'border-zinc-800/50 hover:border-zinc-700/50'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl font-bold mb-4 ${
                      index === 2
                        ? 'bg-yellow-500 text-black'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${
                      index === 2 ? 'text-yellow-400' : 'text-zinc-300'
                    }`}>
                      {typeof path === 'object' ? path.title : path.text?.split('\n')[0] || `Caminho ${index + 1}`}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {typeof path === 'object' ? path.description : path.text?.split('\n').slice(1).join(' ') || path.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {formacao.decisionPathsNote && (
              <div className="text-center mt-12">
                <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                  {formacao.decisionPathsNote}
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <ScrollToButton targetId="inscricao" className="px-8 py-4 text-base">
                ESTOU PRONTO PARA MUDAR MINHA VIDA! <ArrowRight className="ml-2 h-4 w-4" />
              </ScrollToButton>
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
                <span className="text-sm font-medium">FAQ</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Perguntas frequentes</span>
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

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={formacao.testimonials} />

      {/* Form Section */}
      {formacao.form && (typeof formacao.form === 'object' ? formacao.form.slug : typeof formacao.form === 'string') ? (
        <section id="inscricao" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">INSCRIÇÃO</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  GARANTA SUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">VAGA</span>
                </h2>
                <p className="text-lg text-zinc-300">
                  Preencha o formulário abaixo e dê o primeiro passo rumo à liberdade financeira.
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12">
                <DynamicForm 
                  formSlug={typeof formacao.form === 'object' ? formacao.form.slug : formacao.form} 
                  accent="yellow" 
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NewsletterFormacoes
          title="ESTOU PRONTO PARA MUDAR MINHA VIDA!"
          description="Preencha seus dados abaixo e dê o primeiro passo rumo à sua transformação financeira."
          source="Mentor Coaching Financeiro"
          ctaText="ESTOU PRONTO PARA MUDAR MINHA VIDA!"
          accent="yellow"
        />
      )}

      <Footer accent="yellow" />
      <WhatsAppButton source="Mentor Coaching Financeiro" />
    </div>
  )
}

