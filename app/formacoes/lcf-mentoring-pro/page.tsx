import type { Metadata } from 'next'
import { getFormationBySlug } from '@/sanity/lib/formations-api'
import LCFMentoringProClient from './page-client'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug('lcf-mentoring-pro')
  return {
    title: data?.hero?.title || 'LCF Mentoring Pro',
    description: data?.hero?.description,
  }
}

export default async function LCFMentoringProPage() {
  const data = await getFormationBySlug('lcf-mentoring-pro')
  return <LCFMentoringProClient data={data || { _id: 'lcf-mentoring-fallback', title: 'LCF Mentoring Pro' }} />
}
