/**
 * Server Component Wrapper para HomePage
 * Busca dados do Strapi e passa para o Client Component
 */

import HomePage from './page';

export default async function HomePageServer() {
  try {
    // Por enquanto, não há Strapi configurado na branch main
    // Quando houver, os dados podem ser buscados aqui
    // const page = await getHomepage();
    // const pageData = formatPageData(page);
    
    // Renderizar sem dados (usa fallback)
    return <HomePage />;
  } catch (error) {
    console.error('Error loading homepage:', error);
    // Em caso de erro, renderizar sem dados (usa fallback)
    return <HomePage />;
  }
}

