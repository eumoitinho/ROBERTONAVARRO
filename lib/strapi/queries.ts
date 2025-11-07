/**
 * Queries e helpers para buscar dados do Strapi
 */

import { strapiClient, type StrapiPage } from './client';

/**
 * Buscar página por slug
 */
export async function getPageBySlug(slug: string): Promise<StrapiPage | null> {
  return strapiClient.getPageBySlug(slug);
}

/**
 * Buscar página por rota
 */
export async function getPageByRoute(route: string): Promise<StrapiPage | null> {
  return strapiClient.getPageByRoute(route);
}

/**
 * Buscar homepage
 */
export async function getHomepage(): Promise<StrapiPage | null> {
  return strapiClient.getHomepage();
}

/**
 * Buscar todas as páginas
 */
export async function getAllPages(): Promise<StrapiPage[]> {
  return strapiClient.getAllPages();
}

/**
 * Buscar páginas por tipo
 */
export async function getPagesByType(type: string): Promise<StrapiPage[]> {
  return strapiClient.getPagesByType(type);
}

/**
 * Buscar todos os slugs de páginas (para generateStaticParams)
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const pages = await getAllPages();
  return pages.map(page => page.attributes.slug);
}

/**
 * Formatar dados da página para uso nos componentes
 */
export function formatPageData(page: StrapiPage | null) {
  if (!page) return null;

  const { attributes } = page;

  return {
    id: page.id,
    slug: attributes.slug,
    route: attributes.route,
    type: attributes.type,
    hero: formatHeroData(attributes.hero),
    formations: attributes.formations ? formatFormationsData(attributes.formations) : undefined,
    sections: attributes.sections ? formatSectionsData(attributes.sections) : undefined,
    registration: attributes.registration || undefined,
    productKit: attributes.productKit || undefined,
    books: attributes.books || undefined,
    knowledgeBarrier: attributes.knowledgeBarrier || undefined,
    finalCta: attributes.finalCta || undefined,
    metadata: attributes.metadata || {},
  };
}

/**
 * Formatar dados do hero
 */
function formatHeroData(hero: any) {
  if (!hero) return null;

  return {
    title: hero.title || '',
    subtitle: hero.subtitle || '',
    secondTitle: hero.secondTitle || '',
    description: hero.description || '',
    highlightText: hero.highlightText || '',
    backgroundImage: strapiClient.getImageUrl(hero.backgroundImage),
    image: strapiClient.getImageUrl(hero.image),
    ctaText: hero.ctaText || '',
    ctaLink: hero.ctaLink || '',
    secondaryCtaText: hero.secondaryCtaText || '',
    secondaryCtaHref: hero.secondaryCtaHref || '',
    achievementsNumber: hero.achievementsNumber || '',
    achievementsLabel: hero.achievementsLabel || '',
  };
}

/**
 * Formatar dados das formações
 */
function formatFormationsData(formations: any) {
  if (!formations) return null;

  return {
    title: formations.title || '',
    description: formations.description || '',
    items: (formations.items || []).map((item: any) => ({
      title: item.title || '',
      description: item.description || '',
      link: item.link || '',
    })),
  };
}

/**
 * Formatar dados das seções
 */
function formatSectionsData(sections: any[]) {
  if (!sections || !Array.isArray(sections)) return [];

  return sections.map(section => ({
    type: section.type || '',
    title: section.title || '',
    subtitle: section.subtitle || '',
    description: section.description || '',
    badge: section.badge || '',
    items: section.items || [],
    highlight: section.highlight || '',
    eventInfo: section.eventInfo || {},
    blocks: section.blocks || [],
    strategies: section.strategies || [],
  }));
}

