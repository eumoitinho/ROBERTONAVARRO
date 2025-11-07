/**
 * Server Component Wrapper para HomePage
 * Busca dados do Strapi e passa para o Client Component
 */

import HomePage from './page';

export default async function HomePageServer() {
  // Por enquanto, não há Strapi configurado na branch main
  // Quando houver, os dados podem ser buscados aqui
  // const page = await getHomepage();
  // const pageData = formatPageData(page);
  
  // Renderizar sem dados (usa fallback)
  return <HomePage />;
}
