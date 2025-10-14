import { Suspense } from 'react';
import { getPageBySlug, getAllPageSlugs, getSiteSettings } from '@/sanity/lib/api';
import UniversalPage from '@/components/universal-page';
import { notFound } from 'next/navigation';

// Revalidate every hour
export const revalidate = 3600;

// Generate static params for all pages
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();

  return slugs.map((slug) => ({
    slug: slug.replace(/^\//, ''), // Remove leading slash if exists
  }));
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = await getPageBySlug(resolvedParams.slug);
  const siteSettings = await getSiteSettings();

  if (!page) {
    return {
      title: 'Página não encontrada',
      description: '',
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
    keywords: page.seo?.keywords?.join(', '),
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const [page, siteSettings] = await Promise.all([
    getPageBySlug(resolvedParams.slug),
    getSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="text-white">Carregando...</div>
        </div>
      }
    >
      <UniversalPage page={page} siteSettings={siteSettings} />
    </Suspense>
  );
}
