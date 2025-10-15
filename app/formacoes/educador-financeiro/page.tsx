import type { Metadata } from 'next'
import { getFormationBySlug } from '@/sanity/lib/formations-api'
import EducadorFinanceiroClient from './page-client'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug('educador-financeiro')
  return {
    title: data?.hero?.title || 'Educador Financeiro',
    description: data?.hero?.description,
  }
}

export default async function EducadorFinanceiroPage() {
  const data = await getFormationBySlug('educador-financeiro')
  return <EducadorFinanceiroClient data={data || { _id: 'educador-fallback', title: 'Educador Financeiro' }} />
}
