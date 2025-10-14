import { Suspense } from 'react';
import { getHomepage, getSiteSettings } from '@/sanity/lib/api';
import UniversalPage from '@/components/universal-page';
import { notFound } from 'next/navigation';

// Revalidate every hour
export const revalidate = 3600;

// Metadata
export async function generateMetadata() {
  const page = await getHomepage();
  const siteSettings = await getSiteSettings();

  if (!page) {
    return {
      title: 'Roberto Navarro | Instituto Coaching Financeiro',
      description: 'Transforme sua mentalidade e conquiste uma nova realidade financeira',
    };
  }

  return {
    title: page.seo?.metaTitle || page.heroSection?.title || page.title,
    description:
      page.seo?.metaDescription ||
      page.heroSection?.subtitle ||
      siteSettings?.seo?.defaultMetaDescription,
    openGraph: {
      title: page.seo?.metaTitle || page.heroSection?.title,
      description: page.seo?.metaDescription || page.heroSection?.subtitle,
      images: page.seo?.ogImage?.asset ? [{ url: (page.seo.ogImage.asset as any).url }] : [],
    },
    robots: {
      index: !page.seo?.noIndex,
      follow: !page.seo?.noIndex,
    },
  };
}

export default async function HomePage() {
  const [page, siteSettings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="text-white">Carregando...</div></div>}>
      <UniversalPage page={page} siteSettings={siteSettings} />
    </Suspense>
  );
}
