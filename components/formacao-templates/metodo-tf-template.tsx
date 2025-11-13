'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import HeroPages from '@/components/hero-pages'
import { TestimonialsSection } from '@/components/testimonials-section'
import MentorSection from '@/components/mentor'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Shield, Users, BookOpen, Video, Star, Target, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface MetodoTFTemplateProps {
  formacao: any
}

export default function MetodoTFTemplate({ formacao }: MetodoTFTemplateProps) {
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Para Quem É', href: '#para-quem' },
    { title: 'Benefícios', href: '#beneficios' },
    { title: 'Conteúdo', href: '#conteudo' },
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
            : '/images/HERO_EDUCADOR.png'
        }
        ctaText={formacao.hero?.ctaText || 'QUERO ENTRAR NO MÉTODO TF!'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#para-quem"
      />

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Users, value: '+1,5 Milhões', label: 'de Alunos' },
              { icon: Star, value: '1280', label: 'Técnicas Exclusivas' },
              { icon: BookOpen, value: '5', label: 'Livros Publicados' },
              { icon: Video, value: '+500', label: 'Vídeos Inspiradores' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Bloqueio Invisível Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              O <span className="text-yellow-400">BLOQUEIO INVISÍVEL</span> QUE TE IMPEDE DE PROSPERAR
            </h2>
            <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
              {typeof formacao.hero?.description === 'string' 
                ? formacao.hero.description 
                : 'Descubra como desbloquear sua mente para a riqueza e transformar sua vida financeira.'}
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold px-8 py-6 text-lg rounded-xl"
            >
              <Link href="#inscricao">QUERO TRANSFORMAR MINHA VIDA!</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Para Quem É Section */}
      {formacao.benefits && formacao.benefits.length > 0 && (
        <section id="para-quem" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                PARA QUEM É <span className="text-yellow-400">INDICADO</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {formacao.benefits.slice(0, 6).map((benefit: any, index: number) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-zinc-200">
                      {typeof benefit === 'string' ? benefit : benefit.title || benefit.description || benefit.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              BENEFÍCIOS DO <span className="text-yellow-400">MÉTODO TF</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              'Transformação financeira genuína',
              'Estratégias comprovadas e eficazes',
              'Networking de alto valor',
              'Suporte contínuo e personalizado',
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <Target className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <p className="text-zinc-200 text-lg">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo do Curso Section */}
      {formacao.modules && formacao.modules.length > 0 && (
        <section id="conteudo" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                CONTEÚDO DO <span className="text-yellow-400">CURSO</span>
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
                    <div className="p-6">
                      <ul className="space-y-2">
                        {module.topics.map((topic: any, tIndex: number) => (
                          <li key={tIndex} className="flex items-center gap-3 text-zinc-300">
                            <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                            <span className="text-sm">{topic.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mentor Section */}
      <MentorSection />

      {/* Diferenciais Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              DIFERENCIAIS DO <span className="text-yellow-400">MÉTODO TF</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Zap, title: 'Método exclusivo e comprovado', description: 'Técnicas validadas por mais de 1,5 milhão de alunos' },
              { icon: Users, title: 'Aulas presenciais', description: 'Experiência imersiva e transformadora' },
              { icon: BookOpen, title: 'Material de apoio abrangente', description: 'Tudo que você precisa para aplicar o método' },
            ].map((diferencial, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center"
              >
                <diferencial.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-yellow-400">{diferencial.title}</h3>
                <p className="text-zinc-300">{diferencial.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantia Section */}
      {formacao.guarantee && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/50 rounded-3xl p-8 md:p-12 text-center">
              <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                GARANTIA <span className="text-yellow-400">INCONDICIONAL</span>
              </h2>
              <p className="text-zinc-200 text-lg mb-4">
                Satisfação garantida ou dinheiro de volta
              </p>
              <p className="text-zinc-300 mb-4">
                Garantia incondicional de 6 meses
              </p>
              <p className="text-yellow-400 font-bold text-xl">
                Dobro do dinheiro se não houver resultados
              </p>
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

      {/* Testimonials */}
      {formacao.testimonials && formacao.testimonials.length > 0 && (
        <TestimonialsSection />
      )}

      {/* Newsletter/Form Section */}
      <section id="inscricao" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <NewsletterFormacoes
            title="Método TF"
            description="Desbloqueie a riqueza em sua vida e transforme seu futuro financeiro."
            source="Método TF"
            ctaText="QUERO ENTRAR NO MÉTODO TF!"
            accent="yellow"
          />
        </div>
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source="Método TF" />
    </div>
  )
}

