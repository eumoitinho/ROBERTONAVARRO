import { getFormationBySlug } from '@/sanity/lib/formations-api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormationPageClientWrapper from './page-client';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const formation = await getFormationBySlug('educador-financeiro');
  
  if (!formation) {
    return {
      title: 'Formação não encontrada',
    };
  }

  return {
    title: formation.seo?.metaTitle || formation.title,
    description: formation.seo?.metaDescription,
    keywords: formation.seo?.keywords?.join(', '),
    openGraph: {
      title: formation.seo?.metaTitle || formation.title,
      description: formation.seo?.metaDescription,
    },
  };
}

export default async function EducadorFinanceiroPage() {
  const formation = await getFormationBySlug('educador-financeiro');

  if (!formation) {
    console.error('[Educador Financeiro] Formação não encontrada no Sanity');
    notFound();
  }

  return <FormationPageClientWrapper data={formation} />;
}