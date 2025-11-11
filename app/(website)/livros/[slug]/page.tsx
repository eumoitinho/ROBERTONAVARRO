import { notFound } from 'next/navigation'
import { getLivroBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import { TestimonialsLivros } from '@/components/testimonials-livros'
import { Button } from '@/components/ui/button'
import { CheckCircle, BookOpen, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

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

export default async function LivroPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  // Buscar livro do Payload
  const livro = await getLivroBySlug(slug, isPreview)

  if (!livro) {
    notFound()
  }

  // Se não estiver em preview, só mostrar publicados
  if (!isPreview && livro.status !== 'published') {
    notFound()
  }

  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Sobre o Livro', href: '#sobre' },
    { title: 'Destaques', href: '#destaques' },
    { title: 'Comprar', href: '#comprar', isButton: true },
  ]

  const purchaseLink = livro.purchaseLink || livro.amazonLink || '#'

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-zinc-950 text-white">
        {isPreview && (
          <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm font-medium">
              🔴 Modo Preview - Você está visualizando uma versão não publicada
            </p>
          </div>
        )}

        <SiteHeader navigationItems={navigationItems} showInicio={true} />

        {/* Hero Section */}
        <HeroPages
          title={livro.title}
          subtitle={livro.subtitle || ''}
          secondtitle="LIVRO"
          description={typeof livro.description === 'string' ? livro.description : ''}
          image={
            typeof livro.coverImage === 'object' && livro.coverImage?.url
              ? livro.coverImage.url
              : '/images/book-default.jpg'
          }
          ctaText="COMPRAR AGORA"
          ctaHref={purchaseLink}
        />

        {/* About Section */}
        <section id="sobre" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl -z-10"></div>
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-red-400 transition-all duration-300">
                    {typeof livro.coverImage === 'object' && livro.coverImage?.url ? (
                      <Image
                        src={livro.coverImage.url}
                        alt={livro.title}
                        width={500}
                        height={700}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-zinc-800 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-24 w-24 text-zinc-600" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                    {renderRichText(livro.description)}
                  </div>

                  {livro.author && (
                    <div className="mt-8 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                      <p className="text-zinc-400 text-sm mb-1">Autor</p>
                      <p className="text-xl font-bold text-red-400">{livro.author}</p>
                    </div>
                  )}

                  {livro.pages && (
                    <div className="mt-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                      <p className="text-zinc-400 text-sm mb-1">Páginas</p>
                      <p className="text-xl font-bold text-zinc-200">{livro.pages} páginas</p>
                    </div>
                  )}

                  {livro.isbn && (
                    <div className="mt-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                      <p className="text-zinc-400 text-sm mb-1">ISBN</p>
                      <p className="text-xl font-bold text-zinc-200">{livro.isbn}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        {livro.highlights && livro.highlights.length > 0 && (
          <section id="destaques" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">DESTAQUES</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  POR QUE LER ESTE <span className="text-red-400">LIVRO</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {livro.highlights.map((highlight: any, index: number) => (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-zinc-300 text-lg">{highlight.text || highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What You Will Learn Section */}
        {livro.whatYouWillLearn && livro.whatYouWillLearn.length > 0 && (
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">O QUE VOCÊ VAI APRENDER</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  CONTEÚDO <span className="text-red-400">COMPLETO</span>
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {livro.whatYouWillLearn.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <BookOpen className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-zinc-300 text-lg">{item.text || item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Purchase Section */}
        <section id="comprar" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  GARANTA SEU <span className="text-red-400">EXEMPLAR</span>
                </h2>
                {livro.price && (
                  <div className="mb-8">
                    <p className="text-5xl font-bold text-red-400 mb-2">
                      R$ {livro.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                )}
                <Button
                  className={cn(
                    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 hover:scale-105',
                    'px-10 py-5 text-lg shadow-lg hover:shadow-xl',
                  )}
                  onClick={() => {
                    if (purchaseLink && purchaseLink !== '#') {
                      window.open(purchaseLink, '_blank')
                    }
                  }}
                >
                  COMPRAR AGORA <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {livro.amazonLink && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                      onClick={() => window.open(livro.amazonLink, '_blank')}
                    >
                      Também disponível na Amazon
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {livro.testimonials && Array.isArray(livro.testimonials) && livro.testimonials.length > 0 && (
          <TestimonialsLivros 
            heading="O QUE NOSSOS LEITORES DIZEM"
            description="Conheça as histórias de transformação de pessoas que já leram nossos livros."
            testimonials={livro.testimonials}
          />
        )}

        <Footer accent="red" />
        <WhatsAppButton source={livro.title} />
      </div>
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const livro = await getLivroBySlug(slug)

  if (!livro) {
    return {
      title: 'Livro não encontrado',
    }
  }

  return {
    title: livro.seo?.title || livro.title,
    description: livro.seo?.description || '',
    keywords: livro.seo?.keywords || '',
  }
}

