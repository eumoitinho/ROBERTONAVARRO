'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import HeroPages from '@/components/hero-pages'
import ReusableSection from '@/components/how-works'
import TransformationVideos from '@/components/transformation-videos'
import NotableParticipants from '@/components/notable-persons'
import { TestimonialsSection } from '@/components/testimonials-section'
import DynamicForm from '@/components/dynamic-form'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Users, Brain, Target, Zap, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import ScrollToButton from '@/components/scroll-to-button'

interface MentoriaTemplateProps {
  formacao: any
}

export default function MentoriaTemplate({ formacao }: MentoriaTemplateProps) {
  const formSlug = formacao?.form
    ? typeof formacao.form === 'object'
      ? formacao.form.slug
      : formacao.form
    : undefined
  const defaultNavigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Desafios', href: '#desafios' },
    { title: 'Como Funciona', href: '#como-funciona' },
    { title: 'Benefícios', href: '#beneficios' },
    { title: 'Módulos', href: '#modulos' },
    { title: 'Inscrição', href: '#inscricao', isButton: true },
  ]
  const navigationItems =
    Array.isArray(formacao?.navigationItems) && formacao.navigationItems.length > 0
      ? formacao.navigationItems
      : defaultNavigationItems

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
            : '/images/HERO_EDUCADOR.png'
        }
        ctaText={formacao.hero?.ctaText || 'MAIS INFORMAÇÕES SOBRE A FORMAÇÃO'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Contate-nos"
        secondaryCtaHref="#inscricao"
      />

      {/* Desafios Section - 4 Inteligências */}
      {formacao.challenges && formacao.challenges.length > 0 && (
        <section id="desafios" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">DESAFIOS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O QUE ESTÁ TRAVANDO SUA <span className="text-yellow-400">LIBERDADE FINANCEIRA?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {formacao.challenges.slice(0, 4).map((challenge: any, index: number) => {
                const iconMap = [Brain, Target, Zap, Users]
                const IconComponent = iconMap[index] || Target
                const titles = ['Inteligência emocional', 'Inteligência financeira', 'Inteligência espiritual', 'Inteligência estratégica']
                
                return (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">
                      {titles[index] || (typeof challenge === 'object' ? challenge.title : challenge.text?.split('\n')[0])}
                    </h3>
                    <p className="text-zinc-300 text-sm">
                      {typeof challenge === 'object' ? challenge.description : challenge.text?.split('\n').slice(1).join(' ') || challenge.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">COMO FUNCIONA</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE É O <span className="text-yellow-400">LCF MENTORING?</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-zinc-300 mb-12">
            {renderRichText(formacao.hero?.description || 'Um programa único no Brasil que une Life Coaching e Mentor Coaching Financeiro. Com base em centenas de histórias de sucesso, o programa entrega não apenas conhecimento técnico, mas uma verdadeira mudança de mentalidade, hábitos e comportamentos.')}
          </div>

          {formacao.benefits && formacao.benefits.length >= 3 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {formacao.benefits.slice(0, 3).map((benefit: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-bold text-yellow-400">
                      {typeof benefit === 'object' ? benefit.title : benefit.text?.split(':')[0] || 'Benefício'}
                    </h3>
                  </div>
                  <p className="text-zinc-300 text-sm">
                    {typeof benefit === 'object' ? benefit.description : benefit.text?.split(':')[1]?.trim() || benefit.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <ScrollToButton targetId="inscricao" className="px-8 py-4 text-base">
              CONQUISTE SUA VAGA! <ArrowRight className="ml-2 h-4 w-4" />
            </ScrollToButton>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      {formacao.benefits && formacao.benefits.length > 0 && (
        <section id="beneficios" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">BENEFÍCIOS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O QUE VOCÊ VAI CONQUISTAR COM O <span className="text-yellow-400">LCF MENTORING?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {formacao.benefits.map((benefit: any, index: number) => (
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
                        {typeof benefit === 'object' ? benefit.title : benefit.text?.split('\n')[0] || 'Benefício'}
                      </h3>
                      <p className="text-zinc-300">
                        {typeof benefit === 'object' ? benefit.description : benefit.text?.split('\n').slice(1).join(' ') || benefit.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <TransformationVideos accent="yellow" />
      <NotableParticipants accent="yellow" />

      {/* Módulos da Mentoria Section */}
      {formacao.mentoriaModules?.enabled !== false && formacao.mentoriaModules && formacao.mentoriaModules.modules && formacao.mentoriaModules.modules.length > 0 && (
        <section id="modulos" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">MÓDULOS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {formacao.mentoriaModules.title || 'MÓDULOS DA MENTORIA'}
              </h2>
            </div>

            <div className="max-w-6xl mx-auto space-y-12">
              {formacao.mentoriaModules.modules.map((module: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                      {module.duration && (
                        <span className="text-yellow-100 text-sm font-medium bg-yellow-600/30 px-4 py-2 rounded-full">
                          {module.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {module.sections && module.sections.length > 0 && (
                    <div className="p-6 space-y-8">
                      {module.sections.map((section: any, sIndex: number) => (
                        <div key={sIndex} className="space-y-4">
                          {section.title && (
                            <h4 className="text-xl font-bold text-yellow-400 mb-4">{section.title}</h4>
                          )}
                          {section.items && section.items.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-3">
                              {section.items.map((item: any, iIndex: number) => (
                                <div key={iIndex} className="flex items-start gap-3 text-zinc-300">
                                  <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                                  <span className="text-sm">{item.text}</span>
                                </div>
                              ))}
                            </div>
                          )}
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

      {/* Múltiplos Mentores Section */}
      {formacao.multipleMentors?.enabled !== false && formacao.multipleMentors && formacao.multipleMentors.mentors && formacao.multipleMentors.mentors.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">MENTORES</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {formacao.multipleMentors.title || 'CONHEÇA SEUS MENTORES'}
              </h2>
              {formacao.multipleMentors.subtitle && (
                <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                  {formacao.multipleMentors.subtitle}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {formacao.multipleMentors.mentors.map((mentor: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-3xl blur-3xl -z-10"></div>
                    <div className="bg-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                      <Image
                        src={
                          typeof mentor.image === 'object' && mentor.image?.url
                            ? mentor.image.url
                            : '/images/ROBERTO_17.jpg'
                        }
                        alt={mentor.name || 'Mentor'}
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover rounded-2xl"
                        style={{ objectPosition: 'top' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-400">{mentor.name}</h3>
                    {mentor.title && (
                      <p className="text-zinc-400 text-sm">{mentor.title}</p>
                    )}
                    {mentor.bio && (
                      <div className="space-y-3 text-zinc-300 leading-relaxed">
                        {renderRichText(mentor.bio)}
                      </div>
                    )}
                    <div className="pt-4">
                      <ScrollToButton targetId="inscricao" className="px-6 py-3 text-sm">
                        {mentor.ctaText || 'GARANTA SUA VAGA!'} <ArrowRight className="ml-2 h-4 w-4" />
                      </ScrollToButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Garantias Section */}
      {formacao.guarantee && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,204,21,0.15)_0%,_rgba(0,0,0,0)_60%)] opacity-80"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border border-yellow-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    NOSSO COMPROMISSO É COM O SEU <span className="text-yellow-400">CRESCIMENTO</span>
                  </h2>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                    Garantia Incondicional de Satisfação
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50">
                    <h4 className="text-xl font-bold mb-4 text-yellow-400">Garantia Legal de 7 Dias</h4>
                    <p className="text-zinc-300">
                      Seu investimento em si mesmo é protegido por uma garantia de satisfação total. Se, por algum motivo, dentro dos primeiros 7 dias de acesso à formação, você decidir que o Coach Financeiro não está alinhado com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago.
                    </p>
                  </div>
                  <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800/50">
                    <h4 className="text-xl font-bold mb-4 text-yellow-400">Garantia de Resultado em 6 meses</h4>
                    <p className="text-zinc-300">
                      Se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma melhoria significativa em sua vida financeira dentro de 6 meses, devolveremos o dobro do seu investimento no curso.
                    </p>
                  </div>
                </div>
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
      {formSlug ? (
        <section id="inscricao" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">INSCRIÇÃO</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  INSCREVA-SE PARA TER A <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">MUDANÇA DE VIDA</span>
                </h2>
                <p className="text-lg text-zinc-300">
                  Obtenha mais informações sobre a LCF Mentoring
                </p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12">
                <DynamicForm
                  formSlug={formSlug}
                  accent="yellow" 
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NewsletterFormacoes
          title="TRANSFORMAR MINHA VIDA FINANCEIRA!"
          description="Preencha o formulário abaixo e dê o primeiro passo rumo à sua transformação financeira"
          source="LCF Mentoring"
          ctaText="CONQUISTE SUA VAGA!"
          accent="yellow"
          formSlug={formSlug}
        />
      )}

      <Footer accent="yellow" />
      <WhatsAppButton source="LCF Mentoring" />
    </div>
  )
}
