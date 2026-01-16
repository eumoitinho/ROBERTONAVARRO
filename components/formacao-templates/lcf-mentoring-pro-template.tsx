'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import HeroPages from '@/components/hero-pages'
import ReusableSection from '@/components/how-works'
import { ContentSection } from '@/components/content-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import MentorSection from '@/components/mentor'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Shield, Infinity, Users, BookOpen, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LCFMentoringProTemplateProps {
  formacao: any
}

export default function LCFMentoringProTemplate({ formacao }: LCFMentoringProTemplateProps) {
  const formSlug = formacao?.form
    ? typeof formacao.form === 'object'
      ? formacao.form.slug
      : formacao.form
    : undefined
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'O Que Você Vai Aprender', href: '#aprender' },
    { title: 'Sobre o Programa', href: '#sobre' },
    { title: 'Investimento', href: '#investimento' },
    { title: 'Inscrição', href: '#inscricao', isButton: true },
  ]

  const getPlainText = (content: any): string | undefined => {
    if (!content) return undefined
    if (typeof content === 'string') return content
    if (Array.isArray(content)) {
      return content
        .map((block: any) => {
          if (block?.type === 'p') {
            return block.children?.map((child: any) => child.text || '').join('')
          }
          return ''
        })
        .filter(Boolean)
        .join('\n')
    }
    return String(content)
  }

  const heroDescription = getPlainText(formacao.hero?.description)

  // Preparar dados para ContentSection (4 inteligências)
  const intelligenceItems = formacao.learnings?.slice(0, 4).map((learning: any, index: number) => {
    const titles = ['Inteligência Emocional', 'Inteligência Financeira', 'Inteligência Espiritual', 'Inteligência Estratégica']
    return {
      title: titles[index] || learning.title || `Inteligência ${index + 1}`,
      description: typeof learning === 'string' ? learning : learning.description || learning.text || '',
      benefits: formacao.benefits?.filter((b: any, i: number) => Math.floor(i / 2) === index).map((b: any) => typeof b === 'string' ? b : b.description || b.text) || []
    }
  }) || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <HeroPages
        title={formacao.hero?.title || formacao.title}
        secondtitle={formacao.hero?.subtitle || ''}
        subtitle={formacao.hero?.badge || 'Mentoria exclusiva para transformação'}
        description={heroDescription}
        image={
          typeof formacao.hero?.backgroundImage === 'object' && formacao.hero?.backgroundImage?.url
            ? formacao.hero.backgroundImage.url
            : '/images/HERO_MENTORIA.png'
        }
        ctaText={formacao.hero?.ctaText || 'CONQUISTE SUA VAGA!'}
        ctaHref={formacao.hero?.ctaLink || '#inscricao'}
        secondaryCtaText="Saiba mais"
        secondaryCtaHref="#sobre"
      />

      {/* O Que Você Vai Aprender Section */}
      {intelligenceItems.length > 0 && (
        <section id="aprender" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <ContentSection items={intelligenceItems} />
          </div>
        </section>
      )}

      {/* Sobre o Programa Section */}
      {formacao.hero?.description && (
        <ReusableSection
          id="sobre"
          title="A RIQUEZA COMEÇA COM"
          subtitle="CLAREZA. E SE CONSTRÓI COM MÉTODO"
          description="O LCF Mentoring PRO é o programa mais completo de transformação financeira, emocional e espiritual do Brasil."
          imageDesktop="/images/HERO_EDUCADOR.png"
          imageMobile="/images/HERO_MENTORIAINVESTIMENTOS_MOBILE.png"
          listItems={[
            'Transformação completa: o programa mais completo de transformação financeira, emocional e espiritual.',
            'Resultados reais: desenvolva inteligência financeira aplicada e trabalhe sua mentalidade de alta performance.',
            'Ecossistema de suporte: conteúdos de alto nível, encontros presenciais e suporte contínuo.',
          ]}
          ctaText="QUERO ENTRAR PARA O LCF PRO"
          ctaHref="#investimento"
        />
      )}

      {/* Testimonials Section */}
      {formacao.testimonials && formacao.testimonials.length > 0 && (
        <TestimonialsSection />
      )}

      {/* Mentor Section */}
      <MentorSection />

      {/* Investment Section */}
      <section id="investimento" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                INVESTIMENTO <span className="text-yellow-400">LCF MENTORING PRO</span>
              </h2>
              {formacao.pricing?.price && (
                <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4">
                  R$ {formacao.pricing.price.toLocaleString('pt-BR')}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Benefícios Principais */}
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Benefícios Inclusos</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Infinity, text: 'Acesso vitalício aos principais treinamentos' },
                    { icon: Users, text: '4 imersões presenciais intensivas' },
                    { icon: BookOpen, text: 'Mais de 100 h de conteúdo prático' },
                    { icon: HeadphonesIcon, text: 'Suporte direto e acompanhamento' },
                    { icon: Shield, text: 'Garantia de 6 meses: se sua vida não mudar, devolvemos seu dinheiro' },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-yellow-400" />
                      <span className="text-zinc-200">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefícios Adicionais */}
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Benefícios Adicionais</h3>
                <ul className="space-y-4">
                  {[
                    'Networking com alunos de alto nível',
                    'Comunidade exclusiva',
                    'Mentorias ao vivo e acompanhamento',
                    'Material complementar e ferramentas práticas',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                      <span className="text-zinc-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold px-8 py-6 text-lg rounded-xl"
              >
                <Link href={formacao.pricing?.link || formacao.hero?.ctaLink || '#inscricao'}>
                  QUERO ENTRAR PARA O LCF PRO
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-zinc-700 hover:border-yellow-500 px-8 py-6 text-lg rounded-xl"
              >
                <Link href="/formacoes">
                  VER FORMAÇÕES
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
            title="INSCREVA-SE PARA TER A MUDANÇA DE VIDA"
            description="Obtenha mais informações sobre a LCF Mentoring Pro e dê o primeiro passo rumo à sua transformação financeira."
            source="LCF Mentoring Pro"
            ctaText="QUERO ENTRAR PARA O LCF PRO!"
            accent="yellow"
            formSlug={formSlug}
          />
        </div>
      </section>

      <Footer accent="yellow" />
      <WhatsAppButton source="LCF Mentoring Pro" />
    </div>
  )
}
