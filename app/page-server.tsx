/**
 * Server Component Wrapper para HomePage
 * Busca dados do Strapi e passa para o Client Component
 */

import { getHomepage, formatPageData } from '@/lib/strapi/queries';
import HomePage from './page';

export default async function HomePageServer() {
  try {
    // Buscar dados do Strapi
    const page = await getHomepage();
    const pageData = formatPageData(page);
    
    // Passar dados para o Client Component
    return <HomePage pageData={pageData || undefined} />;
  } catch (error) {
    console.error('Error loading homepage from Strapi:', error);
    // Em caso de erro, renderizar sem dados (usa fallback)
    return <HomePage />;
  }
}

