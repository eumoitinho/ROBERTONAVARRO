import { getEventBySlug } from '@/sanity/lib/events-api'
import SegredosDaMenteMilionariaClient from './page-client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEventBySlug('segredos-da-mente-milionaria')
  
  if (!data) {
    return {
      title: 'Segredos da Mente Milionária - Roberto Navarro',
      description: 'Imersão exclusiva e transformadora para despertar seu potencial milionário',
    }
  }

  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description || data.hero?.description,
    keywords: data.seo?.keywords,
  }
}

export default async function SegredosDaMenteMilionaria() {
  const data = await getEventBySlug('segredos-da-mente-milionaria')
  
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

  return <SegredosDaMenteMilionariaClient data={data} />
}