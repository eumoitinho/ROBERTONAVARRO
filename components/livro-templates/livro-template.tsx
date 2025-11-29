'use client'

import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { TestimonialsLivros } from '@/components/testimonials-livros'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  BookOpen,
  ArrowRight,
  Star,
  Brain,
  Target,
  Rocket,
  Atom,
  Settings,
  Heart,
  Shield,
  User,
  Scale,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  Search,
  Quote,
  BookMarked,
  Sparkles,
  BadgeCheck,
  Lock,
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LivroTemplateProps {
  livro: any
}

// Mapeamento de cores por tipo
const colorSchemes = {
  gold: {
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-400',
    accentBgLight: 'bg-yellow-500/20',
    accentBorder: 'border-yellow-500/50',
    accentHover: 'hover:border-yellow-500/50',
    gradient: 'from-yellow-400 to-amber-500',
    gradientBg: 'from-yellow-500 to-amber-600',
    gradientHover: 'hover:from-yellow-600 hover:to-amber-700',
    shadow: 'shadow-yellow-500/10',
    glow: 'from-yellow-500/20 to-amber-600/20',
    buttonText: 'text-black',
  },
  red: {
    accent: 'text-red-400',
    accentBg: 'bg-red-400',
    accentBgLight: 'bg-red-500/20',
    accentBorder: 'border-red-500/50',
    accentHover: 'hover:border-red-500/50',
    gradient: 'from-red-400 to-red-500',
    gradientBg: 'from-red-500 to-red-600',
    gradientHover: 'hover:from-red-600 hover:to-red-700',
    shadow: 'shadow-red-500/10',
    glow: 'from-red-500/20 to-red-600/20',
    buttonText: 'text-white',
  },
  green: {
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-400',
    accentBgLight: 'bg-emerald-500/20',
    accentBorder: 'border-emerald-500/50',
    accentHover: 'hover:border-emerald-500/50',
    gradient: 'from-emerald-400 to-teal-500',
    gradientBg: 'from-emerald-500 to-teal-600',
    gradientHover: 'hover:from-emerald-600 hover:to-teal-700',
    shadow: 'shadow-emerald-500/10',
    glow: 'from-emerald-500/20 to-teal-600/20',
    buttonText: 'text-black',
  },
  orange: {
    accent: 'text-orange-400',
    accentBg: 'bg-orange-400',
    accentBgLight: 'bg-orange-500/20',
    accentBorder: 'border-orange-500/50',
    accentHover: 'hover:border-orange-500/50',
    gradient: 'from-orange-400 to-amber-500',
    gradientBg: 'from-orange-500 to-amber-600',
    gradientHover: 'hover:from-orange-600 hover:to-amber-700',
    shadow: 'shadow-orange-500/10',
    glow: 'from-orange-500/20 to-amber-600/20',
    buttonText: 'text-black',
  },
  blue: {
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400',
    accentBgLight: 'bg-cyan-500/20',
    accentBorder: 'border-cyan-500/50',
    accentHover: 'hover:border-cyan-500/50',
    gradient: 'from-cyan-400 to-blue-500',
    gradientBg: 'from-cyan-500 to-blue-600',
    gradientHover: 'hover:from-cyan-600 hover:to-blue-700',
    shadow: 'shadow-cyan-500/10',
    glow: 'from-cyan-500/20 to-blue-600/20',
    buttonText: 'text-black',
  },
}

// Mapeamento de ícones
const iconMap: Record<string, any> = {
  brain: Brain,
  target: Target,
  rocket: Rocket,
  stairs: TrendingUp,
  atom: Atom,
  gear: Settings,
  heart: Heart,
  star: Star,
  shield: Shield,
  book: BookOpen,
  user: User,
  scale: Scale,
  users: Users,
  dollar: DollarSign,
  chart: BarChart3,
  trending: TrendingUp,
  search: Search,
  check: CheckCircle,
}

export default function LivroTemplate({ livro }: LivroTemplateProps) {
  const colors = colorSchemes[livro.accentColor as keyof typeof colorSchemes] || colorSchemes.gold

  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Sobre o Livro', href: '#sobre' },
    { title: 'O que você vai aprender', href: '#aprender' },
    { title: 'Comprar', href: '#comprar', isButton: true },
  ]

  const purchaseLink = livro.purchaseLink || livro.amazonLink || '#'
  const hasPurchaseLink = purchaseLink && purchaseLink !== '#'
  const ctaText = livro.ctaText || 'COMPRAR AGORA'

  // Helper para renderizar rich text
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

  // Renderizar ícone
  const renderIcon = (iconName: string, className: string = 'h-6 w-6') => {
    const IconComponent = iconMap[iconName] || BookOpen
    return <IconComponent className={className} />
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className={cn(
          "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-transparent to-transparent",
          livro.accentColor === 'gold' && "via-yellow-500/50",
          livro.accentColor === 'red' && "via-red-500/50",
          livro.accentColor === 'green' && "via-emerald-500/50",
          livro.accentColor === 'orange' && "via-orange-500/50",
          livro.accentColor === 'blue' && "via-cyan-500/50",
        )}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 md:order-1">
              {livro.bookTag && (
                <div className={cn(
                  "inline-flex items-center gap-2 backdrop-blur-sm border rounded-full py-2 px-4 mb-6",
                  colors.accentBgLight,
                  colors.accentBorder
                )}>
                  <span className={cn("text-sm font-medium", colors.accent)}>{livro.bookTag}</span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {livro.title}
              </h1>

              {livro.subtitle && (
                <p className="text-xl text-zinc-300 mb-6">{livro.subtitle}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {hasPurchaseLink ? (
                  <Button
                    asChild
                    className={cn(
                      "cta-hover bg-gradient-to-r font-semibold rounded-full px-8 py-6 text-base",
                      colors.gradientBg,
                      colors.gradientHover,
                      colors.buttonText
                    )}
                  >
                    <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                      {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      "bg-gradient-to-r font-semibold rounded-full px-8 py-6 text-base opacity-50 cursor-not-allowed",
                      colors.gradientBg,
                      colors.buttonText
                    )}
                    disabled
                  >
                    {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Rating */}
              {livro.rating?.score && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i <= Math.round(livro.rating.score) ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-zinc-300">
                    {livro.rating.score.toFixed(2)} ({livro.rating.count || 0} avaliações)
                  </span>
                </div>
              )}
            </div>

            {/* Book Cover */}
            <div className="order-1 md:order-2 relative">
              <div className={cn("absolute inset-0 bg-gradient-to-r rounded-3xl blur-3xl -z-10", colors.glow)}></div>
              <div className={cn(
                "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden transition-all duration-300",
                colors.accentHover
              )}>
                {typeof livro.coverImage === 'object' && livro.coverImage?.url ? (
                  <Image
                    src={livro.coverImage.url}
                    alt={livro.title}
                    width={500}
                    height={700}
                    className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-zinc-800 rounded-lg flex items-center justify-center">
                    <BookOpen className={cn("h-24 w-24", colors.accent)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Livro Section */}
      <section id="sobre" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className={cn(
              "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12 relative overflow-hidden",
              colors.accentHover,
              "transition-all duration-300"
            )}>
              <Quote className={cn("h-12 w-12 mb-6", colors.accent)} />
              <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                {renderRichText(livro.description)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que você vai aprender Section */}
      {livro.whatYouWillLearn && livro.whatYouWillLearn.length > 0 && (
        <section id="aprender" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">METODOLOGIA</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O que você vai <span className={colors.accent}>aprender</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {livro.whatYouWillLearn.map((item: any, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2",
                    colors.accentHover,
                    `hover:${colors.shadow}`
                  )}
                >
                  <div className={cn("rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4", colors.accentBgLight)}>
                    {renderIcon(item.icon || 'book', cn("h-7 w-7", colors.accent))}
                  </div>
                  <h3 className={cn("text-xl font-bold mb-2", colors.accent)}>
                    {item.title || item.text}
                  </h3>
                  {item.description && (
                    <p className="text-zinc-300">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Por que este livro é essencial Section */}
      {livro.whyEssential && livro.whyEssential.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">TRANSFORMAÇÃO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Por que este livro é <span className={colors.accent}>essencial</span> para você?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {livro.whyEssential.map((item: any, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2",
                    colors.accentHover
                  )}
                >
                  <div className={cn("rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4", colors.accentBgLight)}>
                    {renderIcon(item.icon || 'check', cn("h-7 w-7", colors.accent))}
                  </div>
                  <h3 className={cn("text-lg font-bold mb-2", colors.accent)}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-zinc-400 text-sm">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ficha Técnica Section */}
      {(livro.technicalSpecs?.publisher || livro.technicalSpecs?.year || livro.pages) && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className={cn(
                "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-10",
                colors.accentHover,
                "transition-all duration-300"
              )}>
                <h3 className={cn("text-2xl font-bold mb-8 text-center", colors.accent)}>
                  Ficha Técnica
                </h3>
                <div className="space-y-4">
                  {livro.technicalSpecs?.publisher && (
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <span className="text-zinc-400">Editora</span>
                      <span className="font-medium">{livro.technicalSpecs.publisher}</span>
                    </div>
                  )}
                  {livro.technicalSpecs?.year && (
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <span className="text-zinc-400">Ano de lançamento</span>
                      <span className="font-medium">{livro.technicalSpecs.year}</span>
                    </div>
                  )}
                  {livro.technicalSpecs?.dimensions && (
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <span className="text-zinc-400">Dimensões</span>
                      <span className="font-medium">{livro.technicalSpecs.dimensions}</span>
                    </div>
                  )}
                  {livro.pages && (
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <span className="text-zinc-400">Páginas</span>
                      <span className="font-medium">{livro.pages}</span>
                    </div>
                  )}
                  {livro.technicalSpecs?.language && (
                    <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                      <span className="text-zinc-400">Idioma</span>
                      <span className="font-medium">{livro.technicalSpecs.language}</span>
                    </div>
                  )}
                  {livro.isbn && (
                    <div className="flex justify-between items-center py-3">
                      <span className="text-zinc-400">ISBN</span>
                      <span className="font-medium">{livro.isbn}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção de Transformação */}
      {livro.transformationSection?.enabled && (
        <section className="py-20 relative overflow-hidden">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950",
          )}></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className={cn("rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-8", colors.accentBgLight)}>
                <BookMarked className={cn("h-10 w-10", colors.accent)} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {livro.transformationSection.title || 'Mais que um livro, uma ferramenta de transformação'}
              </h2>
              {livro.transformationSection.benefits && livro.transformationSection.benefits.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {livro.transformationSection.benefits.map((benefit: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <CheckCircle className={cn("h-5 w-5 flex-shrink-0", colors.accent)} />
                      <span className="text-zinc-300">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Seção do Autor */}
      {livro.author && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className={cn(
                "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 md:p-12",
                colors.accentHover,
                "transition-all duration-300"
              )}>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Author Image */}
                  <div className="relative">
                    <div className={cn("absolute inset-0 bg-gradient-to-r rounded-3xl blur-3xl -z-10", colors.glow)}></div>
                    <div className="bg-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                      {typeof livro.authorImage === 'object' && livro.authorImage?.url ? (
                        <Image
                          src={livro.authorImage.url}
                          alt={livro.author}
                          width={400}
                          height={500}
                          className="w-full h-auto object-cover rounded-2xl"
                          style={{ objectPosition: 'top' }}
                        />
                      ) : (
                        <Image
                          src="/images/ROBERTO_17.jpg"
                          alt={livro.author}
                          width={400}
                          height={500}
                          className="w-full h-auto object-cover rounded-2xl"
                          style={{ objectPosition: 'top' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div>
                    <div className={cn(
                      "inline-flex items-center gap-2 backdrop-blur-sm border rounded-full py-2 px-4 mb-6",
                      colors.accentBgLight,
                      colors.accentBorder
                    )}>
                      <span className={cn("text-sm font-medium", colors.accent)}>CRIADOR DO CONTEÚDO</span>
                    </div>
                    <h3 className={cn("text-3xl font-bold mb-6", colors.accent)}>
                      {livro.author}
                    </h3>
                    <div className="space-y-4 text-zinc-300 leading-relaxed">
                      {livro.authorBio ? (
                        renderRichText(livro.authorBio)
                      ) : (
                        <p>
                          Roberto Navarro é reconhecido como o criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e emocional. Com mais de 14 milhões de vidas impactadas todos os anos, sua missão é transformar a vida financeira dos brasileiros e contribuir para a construção de um país rico e próspero.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {livro.testimonials && Array.isArray(livro.testimonials) && livro.testimonials.length > 0 && (
        <TestimonialsLivros
          heading="Vidas transformadas"
          description="Conheça as histórias de transformação de pessoas que já leram este livro."
          testimonials={livro.testimonials}
          accentColor={livro.accentColor || 'gold'}
        />
      )}

      {/* CTA Final Section */}
      <section id="comprar" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className={cn(
              "bg-zinc-900/50 backdrop-blur-sm border rounded-3xl p-12",
              colors.accentBorder
            )}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transforme sua relação com o <span className={colors.accent}>dinheiro</span>
              </h2>

              {/* Price */}
              {livro.price && (
                <div className="mb-8">
                  {livro.originalPrice && (
                    <p className="text-zinc-500 text-xl line-through mb-1">
                      R$ {livro.originalPrice.toFixed(2).replace('.', ',')}
                    </p>
                  )}
                  <p className={cn("text-5xl font-bold mb-2", colors.accent)}>
                    R$ {livro.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-zinc-800/50 rounded-full px-4 py-2">
                  <BadgeCheck className={cn("h-5 w-5", colors.accent)} />
                  <span className="text-sm text-zinc-300">Satisfação Garantida</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-800/50 rounded-full px-4 py-2">
                  <Lock className={cn("h-5 w-5", colors.accent)} />
                  <span className="text-sm text-zinc-300">Pagamento 100% Seguro</span>
                </div>
              </div>

              {hasPurchaseLink ? (
                <Button
                  asChild
                  className={cn(
                    "cta-hover bg-gradient-to-r font-semibold rounded-full px-12 py-6 text-lg",
                    colors.gradientBg,
                    colors.gradientHover,
                    colors.buttonText
                  )}
                >
                  <a href={purchaseLink} target="_blank" rel="noopener noreferrer">
                    {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <Button
                  className={cn(
                    "bg-gradient-to-r font-semibold rounded-full px-12 py-6 text-lg opacity-50 cursor-not-allowed",
                    colors.gradientBg,
                    colors.buttonText
                  )}
                  disabled
                >
                  {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}

              {livro.amazonLink && livro.amazonLink !== purchaseLink && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                    asChild
                  >
                    <a href={livro.amazonLink} target="_blank" rel="noopener noreferrer">
                      Também disponível na Amazon
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer accent={livro.accentColor === 'gold' ? 'yellow' : livro.accentColor || 'yellow'} />
      <WhatsAppButton source={livro.title} />
    </div>
  )
}
