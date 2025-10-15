import { getHomepage, fallbackHomepageData } from '@/sanity/lib/homepage-api';
import HomePageClient from './page-client';

export const revalidate = 3600; // Revalidar a cada hora

export async function generateMetadata() {
  const data = await getHomepage();
  
  return {
    title: data.seo?.metaTitle || 'Roberto Navarro | Transforme sua Mentalidade',
    description: data.seo?.metaDescription || 'Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.',
    keywords: data.seo?.keywords?.join(', '),
    openGraph: {
      title: data.seo?.metaTitle || 'Roberto Navarro | Transforme sua Mentalidade',
      description: data.seo?.metaDescription,
      images: data.seo?.ogImage?.asset ? [{ url: (data.seo.ogImage.asset as any).url }] : [],
    },
  };
}

export default async function HomePage() {
  // Buscar dados do Sanity
  let data = await getHomepage();
  
  // Fallback para dados padrão se Sanity não estiver configurado
  if (!data) {
    console.log('[Homepage] Usando fallback data');
    data = fallbackHomepageData;
  }

  return <HomePageClient data={data} />;
}
