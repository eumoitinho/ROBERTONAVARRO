import type { Metadata } from 'next'
import { getFormationBySlug } from '@/sanity/lib/formations-api'
import MentorCoachingFinanceiroClient from './page-client'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug('mentor-coaching-financeiro')
  return {
    title: data?.hero?.title || 'Mentor Coaching Financeiro',
    description: data?.hero?.description,
  }
}

export default async function MentorCoachingFinanceiroPage() {
  const data = await getFormationBySlug('mentor-coaching-financeiro')
  return <MentorCoachingFinanceiroClient data={data || { _id: 'mentor-coaching-fallback', title: 'Mentor Coaching Financeiro' }} />
}