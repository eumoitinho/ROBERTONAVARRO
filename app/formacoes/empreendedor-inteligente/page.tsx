import type { Metadata } from 'next'
import { getFormationBySlug } from '@/sanity/lib/formations-api'
import EmpreendedorInteligenteClient from './page-client'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug('empreendedor-inteligente')
  return {
    title: data?.hero?.title || 'Empreendedor Inteligente',
    description: data?.hero?.description,
  }
}

export default async function EmpreendedorInteligentePage() {
  const data = await getFormationBySlug('empreendedor-inteligente')
  return <EmpreendedorInteligenteClient data={data || { _id: 'empreendedor-fallback', title: 'Empreendedor Inteligente' }} />
}
