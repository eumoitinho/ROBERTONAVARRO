import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import UniversalPagePayload from '@/components/universal-page-payload'

interface PageProps {
  searchParams: Promise<{
    preview?: string
  }>
}

export default async function SemanaDaIndependenciaPage({ searchParams }: PageProps) {
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  const page = await getPageBySlug('mes-da-independencia', isPreview)

  if (!page) {
    notFound()
  }

  if (!isPreview && page.status !== 'published') {
    notFound()
  }

  return (
    <>
      <LivePreview />
      <UniversalPagePayload page={page} />
    </>
  )
}
