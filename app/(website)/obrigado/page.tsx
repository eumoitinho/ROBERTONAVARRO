import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import UniversalPagePayload from '@/components/universal-page-payload'

interface PageProps {
  searchParams: Promise<{
    preview?: string
    [key: string]: string | string[] | undefined
  }>
}

export default async function ObrigadoPage({ searchParams }: PageProps) {
  const searchParamsResolved = await searchParams
  const { preview } = searchParamsResolved
  const isPreview = preview === 'true'

  const page = await getPageBySlug('obrigado', isPreview)

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
