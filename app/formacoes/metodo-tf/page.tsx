import type { Metadata } from 'next'
import { getFormationBySlug } from '@/sanity/lib/formations-api'
import MetodoTFClient from './page-client'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug('metodo-tf')
  
  return {
    title: data?.hero?.title || 'Método TF - Instituto Coaching Financeiro',
    description: data?.hero?.description || 'Desbloqueie a riqueza em sua vida',
  }
}

export default async function MetodoTFPage() {
  const data = await getFormationBySlug('metodo-tf')
  
  // Se não houver dados no Sanity, retorna null e usa os textos hardcoded como fallback
  return <MetodoTFClient data={data} />
}
