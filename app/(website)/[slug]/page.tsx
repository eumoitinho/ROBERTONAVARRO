import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import UniversalPagePayload from '@/components/universal-page-payload'

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
      {isPreview && (
        <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <p className="text-yellow-400 text-sm font-medium">
            🔴 Modo Preview - Você está visualizando uma versão não publicada
          </p>
        </div>
      )}
      <UniversalPagePayload page={page} />
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
