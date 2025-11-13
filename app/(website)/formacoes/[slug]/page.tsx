import { notFound } from 'next/navigation'
import { getFormacaoBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPagesRed from '@/components/hero-pages-red'
import { NewsletterFormacoes } from '@/components/newsletter-formacoes'
import DynamicForm from '@/components/dynamic-form'
import ScrollToButton from '@/components/scroll-to-button'
import TransformationVideos from '@/components/transformation-videos'
import NotableParticipants from '@/components/notable-persons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, Award, Shield, Target, ArrowRight, Users, Network, BookOpen, Video, FileText, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import EmpreendedorInteligenteTemplate from '@/components/formacao-templates/empreendedor-inteligente-template'
import LCFMentoringProTemplate from '@/components/formacao-templates/lcf-mentoring-pro-template'
import MentoriaIndividualTemplate from '@/components/formacao-templates/mentoria-individual-template'
import MentoriaInvestimentosTemplate from '@/components/formacao-templates/mentoria-investimentos-template'
import MetodoTFTemplate from '@/components/formacao-templates/metodo-tf-template'
import RotaMindTemplate from '@/components/formacao-templates/rota-mind-template'
import MentorCoachingFinanceiroTemplate from '@/components/formacao-templates/mentor-coaching-financeiro-template'
import MentoriaTemplate from '@/components/formacao-templates/mentoria-template'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

// Desabilitar cache para garantir que mudanças do Payload apareçam imediatamente
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function FormacaoPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  // Buscar formação do Payload
  const formacao = await getFormacaoBySlug(slug, isPreview)

  if (!formacao) {
    notFound()
  }

  // Se não estiver em preview, só mostrar publicadas
  if (!isPreview && formacao.status !== 'published') {
    notFound()
  }

  // Renderizar template específico baseado no campo template
  const template = formacao.template || 'default'
  
  // Renderizar templates específicos
  if (template === 'empreendedor-inteligente') {
    return (
      <>
        <LivePreview />
        <EmpreendedorInteligenteTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'lcf-mentoring-pro') {
    return (
      <>
        <LivePreview />
        <LCFMentoringProTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentoria-individual') {
    return (
      <>
        <LivePreview />
        <MentoriaIndividualTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentoria-investimentos') {
    return (
      <>
        <LivePreview />
        <MentoriaInvestimentosTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'metodo-tf') {
    return (
      <>
        <LivePreview />
        <MetodoTFTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'rota-mind') {
    return (
      <>
        <LivePreview />
        <RotaMindTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentor-coaching-financeiro') {
    return (
      <>
        <LivePreview />
        <MentorCoachingFinanceiroTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentoria') {
    return (
      <>
        <LivePreview />
        <MentoriaTemplate formacao={formacao} />
      </>
    )
  }

  // Renderizar rich text description
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
  const renderIcon = (iconName: string, className: string = 'h-6 w-6 text-red-400') => {
    const iconMap: Record<string, any> = {
      Target,
      Award,
      Users,
      Network,
      Shield,
      CheckCircle,
      FileText,
      PlayCircle,
      BookOpen,
      Video,
    }
    const IconComponent = iconMap[iconName] || Target
    return <IconComponent className={className} />
  }

  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Sobre o Curso', href: '#sobre-curso' },
    { title: 'Benefícios', href: '#beneficios' },
    { title: 'Depoimentos', href: '#depoimentos' },
    { title: 'Inscrição', href: '#inscricao', isButton: true },
  ]

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-red-950/5 to-zinc-950 text-white">
        {isPreview && (
          <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm font-medium">
              🔴 Modo Preview - Você está visualizando uma versão não publicada
            </p>
          </div>
        )}

        <SiteHeader navigationItems={navigationItems} showInicio={true} />

        {/* Hero Section - Usando dados do Payload */}
        <HeroPagesRed
          title={formacao.hero?.title || formacao.title}
          secondtitle={formacao.hero?.subtitle || ''}
          subtitle="Roberto Navarro"
          description={typeof formacao.hero?.description === 'string' ? formacao.hero.description : undefined}
          image={
            typeof formacao.hero?.backgroundImage === 'object' && formacao.hero?.backgroundImage?.url
              ? formacao.hero.backgroundImage.url
              : '/images/HERO_EDUCADOR.png'
          }
          ctaText={formacao.hero?.ctaText || 'QUERO MINHA LICENÇA PROFISSIONAL!'}
          ctaHref={formacao.hero?.ctaLink || '#inscricao'}
          secondaryCtaText="Saiba mais"
          secondaryCtaHref="#sobre-curso"
        />

        {/* MEC Certification Section */}
        {formacao.certification?.hasCertification && (
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2 flex justify-center">
                    <div className="relative">
                      <Image
                        src="/images/MEC.png"
                        alt="Reconhecido pelo MEC"
                        width={240}
                        height={240}
                        className="z-10 relative"
                      />
                      <div className="absolute inset-0 bg-red-500/20 rounded-full filter blur-xl -z-10"></div>
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                      EXCELÊNCIA RECONHECIDA PELO MINISTÉRIO DA EDUCAÇÃO
                    </h3>
                    <div className="prose prose-invert max-w-none">
                      {renderRichText(formacao.certification?.certificationText)}
                    </div>
                    <div className="pt-2">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-red-400" />
                          <span className="text-zinc-200">Reconhecimento nacional</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-red-400" />
                          <span className="text-zinc-200">Validação profissional</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-red-400" />
                          <span className="text-zinc-200">Credibilidade garantida</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Professional License Section */}
        {(!formacao.professionalLicense || formacao.professionalLicense.enabled !== false) && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.25)_0%,_rgba(0,0,0,0)_60%)] opacity-80"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                  <div className="text-center mb-10">
                    <div className="inline-block mb-6">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 p-[2px] rounded-full">
                        <div className="bg-zinc-900 rounded-full px-6 py-3">
                          <span className="text-red-400 font-bold text-sm tracking-wider">
                            {formacao.professionalLicense?.badge || 'DIFERENCIAL EXCLUSIVO'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      SUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">LICENÇA PROFISSIONAL</span> PARA ATUAR COMO EDUCADOR FINANCEIRO
                    </h2>
                    <p className="text-xl text-zinc-200 mb-8">
                      Esta é a <strong className="text-red-400">ÚNICA formação do mercado</strong> que te concede uma Licença Profissional chancelada pela Roberto Navarro Academia (RNA)
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-red-400 mb-4">
                        {formacao.professionalLicense?.transformationTitle || 'Essa será sua transformação:'}
                      </h3>
                      <ul className="space-y-4">
                        {(formacao.professionalLicense?.transformations && formacao.professionalLicense.transformations.length > 0
                          ? formacao.professionalLicense.transformations
                          : [
                              'Licença para atuar como Educador Financeiro',
                              'Respeito profissional no mercado',
                              'Mais valorização do seu serviço',
                              'Respaldo do ICF para ensinar sobre geração de riqueza',
                              'Ampliar o número de clientes ativos',
                              'Consolidar uma carreira próspera e segura',
                            ]
                        ).map((item: any, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            <span className="text-zinc-200">{typeof item === 'string' ? item : item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-red-400 mb-4">
                        {formacao.professionalLicense?.benefitsTitle || 'Benefícios da Licença:'}
                      </h3>
                      <ul className="space-y-4">
                        {(formacao.professionalLicense?.benefits && formacao.professionalLicense.benefits.length > 0
                          ? formacao.professionalLicense.benefits
                          : [
                              'Mais poder nas suas negociações',
                              'Mais otimismo na sua carreira',
                              'Mais admiração no seu círculo social',
                              'Licença chancelada pela RNA',
                              'Respaldo profissional que reduz a concorrência',
                              'Ganhos maiores que os demais profissionais',
                            ]
                        ).map((item: any, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <Award className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            <span className="text-zinc-200">{typeof item === 'string' ? item : item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-zinc-900/50 rounded-2xl p-6 border border-red-500/20">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Shield className="h-8 w-8 text-red-400" />
                      <h3 className="text-2xl font-bold text-center text-red-400">
                        {formacao.professionalLicense?.shieldMessage || 'Em breve irão sobreviver no mercado apenas quem tiver respeitada Licença Profissional!'}
                      </h3>
                    </div>
                    <p className="text-center text-zinc-300">
                      {formacao.professionalLicense?.shieldDescription || 'Roberto Navarro criou essa Licença para separar os Profissionais dos amadores. Garanta sua posição no mercado com a credibilidade de quem é referência nacional em educação financeira.'}
                    </p>
                  </div>

                  <div className="text-center mt-8">
                    <ScrollToButton targetId="inscricao">
                      {formacao.professionalLicense?.ctaText || 'GARANTIR MINHA LICENÇA PROFISSIONAL'} <ArrowRight className="ml-2 h-5 w-5" />
                    </ScrollToButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section id="sobre-curso" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">SOBRE O CURSO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                SEJA UM AGENTE DA MUDANÇA E ENSINE O CAMINHO PARA A <span className="text-red-400">PROSPERIDADE</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl -z-10"></div>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-red-400 transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-500"></div>
                  <Image
                    src="/images/ROBERTO_5.jpg"
                    alt="Educador Financeiro Workshop"
                    width={500}
                    height={440}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: 'top' }}
                  />
                </div>
              </div>

              <div>
                <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                  {renderRichText(formacao.hero?.description)}
                </div>
                <ScrollToButton 
                  targetId="inscricao"
                  className="mt-8 px-8 py-4 text-base"
                  variant="secondary"
                >
                  QUERO SER UM EDUCADOR FINANCEIRO! <ArrowRight className="ml-2 h-4 w-4" />
                </ScrollToButton>
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive Materials Section */}
        {formacao.exclusiveMaterials?.enabled !== false && formacao.exclusiveMaterials && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">MATERIAIS EXCLUSIVOS</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {formacao.exclusiveMaterials.title ? (
                    <>
                      {formacao.exclusiveMaterials.title.split('IMERSÃO')[0]}
                      <span className="text-red-400">{formacao.exclusiveMaterials.title.includes('IMERSÃO') ? 'IMERSÃO' : ''}</span>
                      {formacao.exclusiveMaterials.title.split('IMERSÃO')[1]}
                    </>
                  ) : (
                    <>
                      EXPERIMENTE A <span className="text-red-400">IMERSÃO DO EDUCADOR FINANCEIRO</span>
                    </>
                  )}
                </h2>
                {formacao.exclusiveMaterials.description && (
                  <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
                    {formacao.exclusiveMaterials.description}
                  </p>
                )}
              </div>

              {formacao.exclusiveMaterials.items && formacao.exclusiveMaterials.items.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {formacao.exclusiveMaterials.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                        {renderIcon(item.icon || 'Target')}
                      </div>
                      <p className="text-zinc-300 text-sm">{item.title}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <ScrollToButton targetId="inscricao" className="px-8 py-4 text-base">
                  {formacao.exclusiveMaterials.ctaText || 'ACESSAR PRÉVIA EXCLUSIVA'} <ArrowRight className="ml-2 h-4 w-4" />
                </ScrollToButton>
              </div>
            </div>
          </section>
        )}

        {/* Resources Section */}
        {formacao.resources?.enabled !== false && formacao.resources && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">RECURSOS</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {formacao.resources.title ? (
                    <>
                      {formacao.resources.title.split('TRANSFORMAR')[0]}
                      <span className="text-red-400">TRANSFORMAR</span>
                      {formacao.resources.title.split('TRANSFORMAR')[1]}
                    </>
                  ) : (
                    <>
                      TUDO O QUE VOCÊ PRECISA PARA <span className="text-red-400">TRANSFORMAR SUA CARREIRA</span>
                    </>
                  )}
                </h2>
              </div>

              {formacao.resources.items && formacao.resources.items.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {formacao.resources.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                        {renderIcon(item.icon || 'Award')}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-red-400">{item.title}</h3>
                      {item.description && (
                        <p className="text-zinc-300 text-sm">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {formacao.benefits && formacao.benefits.length > 0 && (
          <section id="beneficios" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">BENEFÍCIOS</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  BENEFÍCIOS DA <span className="text-red-400">FORMAÇÃO</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {formacao.benefits.map((benefit: any, index: number) => (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                        <Award className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-red-400">{benefit.title}</h3>
                        <p className="text-zinc-300">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Modules Section */}
        {formacao.modules && formacao.modules.length > 0 && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">MÓDULOS DO CURSO</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  CONTEÚDO <span className="text-red-400">COMPLETO E ESTRUTURADO</span>
                </h2>
              </div>

              <div className="max-w-6xl mx-auto space-y-8">
                {formacao.modules.map((module: any, index: number) => (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                      <h3 className="text-xl font-bold text-white">{module.title}</h3>
                      {module.description && (
                        <p className="text-red-100 text-sm mt-2">{module.description}</p>
                      )}
                    </div>
                    {module.topics && module.topics.length > 0 && (
                      <div className="p-6 grid md:grid-cols-2 gap-4">
                        {module.topics.map((topic: any, tIndex: number) => (
                          <div key={tIndex} className="flex items-center gap-3 text-zinc-300">
                            <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
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

        {/* Guarantees Section */}
        {formacao.guarantee && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">GARANTIAS</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  INVESTIMENTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">SEGURO</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10">
                  <div className="bg-zinc-800 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                    <Shield className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center text-red-400">
                    Garantia legal de {formacao.guarantee.days || 7} dias
                  </h3>
                  <div className="prose prose-invert text-zinc-300 text-center">
                    {renderRichText(formacao.guarantee.description)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Form Section - Mostrar formulário do Payload se houver, caso contrário mostrar NewsletterFormacoes */}
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
                    GARANTA SUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">VAGA</span>
                  </h2>
                  <p className="text-lg text-zinc-300">
                    Preencha o formulário abaixo e dê o primeiro passo rumo à liberdade financeira.
                  </p>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12">
                  <DynamicForm 
                    formSlug={typeof formacao.form === 'object' ? formacao.form.slug : formacao.form} 
                    accent="red" 
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <NewsletterFormacoes
            title="ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR"
            description="Transforme sua vida e a vida de milhares de pessoas através da educação financeira. Preencha seus dados abaixo e dê o primeiro passo rumo à liberdade financeira."
            source="Educador Financeiro"
            ctaText="QUERO SER UM EDUCADOR FINANCEIRO!"
            accent="red"
          />
        )}

        <div aria-hidden className="h-16 md:h-24" />

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
                  DÚVIDAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">COMUNS</span>
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

        {/* Exclusive Opportunity Section - Treinador Licenciado */}
        {formacao.exclusiveOpportunity?.enabled !== false && formacao.exclusiveOpportunity && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.15)_0%,_rgba(0,0,0,0)_60%)] opacity-80"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                  <div className="text-center mb-10">
                    <div className="inline-block mb-6">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 p-[2px] rounded-full">
                        <div className="bg-zinc-900 rounded-full px-6 py-3">
                          <span className="text-red-400 font-bold text-sm tracking-wider">
                            {formacao.exclusiveOpportunity.badge || 'OPORTUNIDADE EXCLUSIVA'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      {formacao.exclusiveOpportunity.title ? (
                        <>
                          {formacao.exclusiveOpportunity.title.split('TREINADOR LICENCIADO')[0]}
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">TREINADOR LICENCIADO</span>
                          {formacao.exclusiveOpportunity.title.split('TREINADOR LICENCIADO')[1]}
                        </>
                      ) : (
                        <>
                          SEJA UM <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">TREINADOR LICENCIADO</span> DO INSTITUTO COACHING FINANCEIRO
                        </>
                      )}
                    </h2>
                    {formacao.exclusiveOpportunity.description && (
                      <p className="text-xl text-zinc-200 mb-4">
                        {formacao.exclusiveOpportunity.description}
                      </p>
                    )}
                    {formacao.exclusiveOpportunity.subDescription && (
                      <p className="text-lg text-zinc-300 mb-8">
                        {formacao.exclusiveOpportunity.subDescription}
                      </p>
                    )}
                  </div>

                  {formacao.exclusiveOpportunity.trainings && formacao.exclusiveOpportunity.trainings.length > 0 && (
                    <div className="space-y-6 mb-10">
                      <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">Confira os treinamentos disponíveis:</h3>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        {formacao.exclusiveOpportunity.trainings.map((training: any, index: number) => (
                          <div
                            key={index}
                            className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2"
                          >
                            <h4 className="text-xl font-bold mb-3 text-red-400">{training.title}</h4>
                            {training.description && (
                              <p className="text-zinc-300 text-sm">{training.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
                  <span className="text-sm font-medium">{formacao.mentorSection.badge || 'SEU MENTOR'}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {formacao.mentorSection.title ? (
                    <>
                      {formacao.mentorSection.title.split('MENTOR DOS MENTORES')[0]}
                      <span className="text-red-400">MENTOR DOS MENTORES</span>
                      {formacao.mentorSection.title.split('MENTOR DOS MENTORES')[1]}
                    </>
                  ) : (
                    <>
                      APRENDA COM O <span className="text-red-400">MENTOR DOS MENTORES</span>
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
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl -z-10"></div>
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
                      <h3 className="text-3xl font-bold text-red-400">
                        {formacao.mentorSection.mentorName || 'Roberto Navarro'}
                      </h3>
                      {formacao.mentorSection.bio && (
                        <div className="space-y-4 text-zinc-300 leading-relaxed">
                          {renderRichText(formacao.mentorSection.bio)}
                        </div>
                      )}
                      <div className="pt-4">
                        <ScrollToButton targetId="inscricao" className="px-8 py-4 text-base">
                          {formacao.mentorSection.ctaText || 'QUERO SER UM EDUCADOR FINANCEIRO!'} <ArrowRight className="ml-2 h-4 w-4" />
                        </ScrollToButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <TransformationVideos accent="red" />
        <NotableParticipants accent="red" />
        <Footer accent="red" />
        <WhatsAppButton source="Educador Financeiro" />
      </div>
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const formacao = await getFormacaoBySlug(slug)

  if (!formacao) {
    return {
      title: 'Formação não encontrada',
    }
  }

  return {
    title: formacao.seo?.title || formacao.title,
    description: formacao.seo?.description || '',
    keywords: formacao.seo?.keywords || '',
  }
}

