import { getEventBySlug } from '@/sanity/lib/events-api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EventPageClientWrapper from './page-client';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const event = await getEventBySlug('crencas-da-riqueza');
  
  if (!event) {
    return {
      title: 'Evento não encontrado',
    };
  }

  return {
    title: event.seo?.metaTitle || event.title,
    description: event.seo?.metaDescription,
    keywords: event.seo?.keywords?.join(', '),
    openGraph: {
      title: event.seo?.metaTitle || event.title,
      description: event.seo?.metaDescription,
    },
  };
}

export default async function CrencasDaRiquezaPage() {
  const event = await getEventBySlug('crencas-da-riqueza');

  if (!event) {
    console.error('[Crenças da Riqueza] Evento não encontrado no Sanity');
    notFound();
  }

  return <EventPageClientWrapper data={event} />;
}
