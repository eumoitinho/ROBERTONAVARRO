import { getEventBySlug } from '@/sanity/lib/events-api'
import EnergiaDodinheiroPageClient from './page-client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEventBySlug('energia-do-dinheiro')
  
  if (!data) {
    return {
      title: 'Energia do Dinheiro - Roberto Navarro',
      description: 'Desbloqueie a energia do dinheiro e transforme sua realidade',
    }
  }

  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description || data.hero?.description,
    keywords: data.seo?.keywords,
  }
}

export default async function EnergiaDodinheiroPage() {
  const data = await getEventBySlug('energia-do-dinheiro')
  
  if (!data) {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-4">Evento não encontrado</h1>
          <p className="text-zinc-600">O evento solicitado não está disponível no momento.</p>
        </div>
    </div>
  )
}

  return <EnergiaDodinheiroPageClient data={data} />
}