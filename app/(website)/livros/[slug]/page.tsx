import { notFound } from 'next/navigation'
import { getLivroBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import LivroTemplate from '@/components/livro-templates/livro-template'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
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

  return (
    <>
      <LivePreview />
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-yellow-500/20 border-b border-yellow-500/50">
          <p className="text-yellow-400 text-sm font-medium text-center">
            Modo Preview - Você está visualizando uma versão não publicada
          </p>
        </div>
      )}
      <LivroTemplate livro={livro} />
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

