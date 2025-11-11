import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  // Buscar página do Payload
  const page = await getPageBySlug(slug, isPreview)

  if (!page) {
    notFound()
  }

  // Se estiver em preview mas a página não existir, ainda mostrar 404
  if (!isPreview && page.status !== 'published') {
    notFound()
  }

  return (
    <>
      <LivePreview />
      <SiteHeader />
      <main className="pt-24 pb-16 bg-zinc-950 text-zinc-200 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          {isPreview && (
            <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-400 text-sm font-medium">
                🔴 Modo Preview - Você está visualizando uma versão não publicada
              </p>
            </div>
          )}

          {/* Hero Section */}
          {page.hero && (
            <div className="mb-12">
              {page.hero.title && (
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
                  {page.hero.title}
                </h1>
              )}
              {page.hero.subtitle && (
                <p className="text-xl text-zinc-300 mb-6">
                  {page.hero.subtitle}
                </p>
              )}
              {page.hero.backgroundImage && typeof page.hero.backgroundImage === 'object' && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                  <img
                    src={page.hero.backgroundImage.url || ''}
                    alt={page.hero.backgroundImage.alt || ''}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* Content */}
          {page.content && (
            <div className="prose prose-invert prose-yellow max-w-none">
              {/* Renderizar rich text content */}
              <div dangerouslySetInnerHTML={{ __html: String(page.content) }} />
            </div>
          )}

          {/* Sections */}
          {page.sections && page.sections.length > 0 && (
            <div className="mt-12 space-y-12">
              {page.sections.map((section: any, index: number) => (
                <div key={index} className="border-t border-zinc-800 pt-8">
                  {section.type === 'text' && section.content && (
                    <div className="prose prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: String(section.content) }} />
                    </div>
                  )}
                  {section.type === 'image' && section.content && (
                    <div className="my-8">
                      <div dangerouslySetInnerHTML={{ __html: String(section.content) }} />
                    </div>
                  )}
                  {section.type === 'video' && section.content && (
                    <div className="my-8">
                      <div dangerouslySetInnerHTML={{ __html: String(section.content) }} />
                    </div>
                  )}
                  {section.type === 'cta' && section.content && (
                    <div className="my-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div dangerouslySetInnerHTML={{ __html: String(section.content) }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Form Section */}
          {page.layout === 'form' && page.form && (
            <div className="mt-12 p-8 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                {page.title}
              </h2>
              <p className="text-zinc-400 mb-6">
                Formulário: {page.form.formId || 'Não configurado'}
              </p>
              {/* Aqui você pode integrar com o componente de formulário */}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

// Gerar metadados
export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const page = await getPageBySlug(slug, isPreview)

  if (!page) {
    return {
      title: 'Página não encontrada',
    }
  }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || '',
    keywords: page.seo?.keywords || '',
  }
}

