import { sanityClient } from './client';
import {
  pageBySlugQuery,
  allPagesQuery,
  pagesByTypeQuery,
  allPageSlugsQuery,
  siteSettingsQuery,
  homepageQuery,
} from './queries';
import type { Page, SiteSettings } from '../types';

// Fetch página por slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const page = await sanityClient.fetch<Page>(pageBySlugQuery, { slug });
    return page;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}

// Fetch todas as páginas ativas
export async function getAllPages(): Promise<Page[]> {
  try {
    const pages = await sanityClient.fetch<Page[]>(allPagesQuery);
    return pages;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
}

// Fetch páginas por tipo
export async function getPagesByType(pageType: string): Promise<Page[]> {
  try {
    const pages = await sanityClient.fetch<Page[]>(pagesByTypeQuery, { pageType });
    return pages;
  } catch (error) {
    console.error('Error fetching pages by type:', error);
    return [];
  }
}

// Fetch todos os slugs (para generateStaticParams)
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const result = await sanityClient.fetch<{ slug: string }[]>(allPageSlugsQuery);
    return result.map((r) => r.slug);
  } catch (error) {
    console.error('Error fetching all page slugs:', error);
    return [];
  }
}

// Fetch configurações do site
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await sanityClient.fetch<SiteSettings>(siteSettingsQuery);
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// Fetch homepage
export async function getHomepage(): Promise<Page | null> {
  try {
    const page = await sanityClient.fetch<Page>(homepageQuery);
    return page;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

// Helper para formatar URL de imagem do Sanity
export function getImageUrl(imageRef: any): string | undefined {
  if (!imageRef) return undefined;

  // Se já é uma URL completa, retorna
  if (typeof imageRef === 'string' && imageRef.startsWith('http')) {
    return imageRef;
  }

  // Se tem asset._ref, constrói a URL
  if (imageRef?.asset?._ref) {
    const ref = imageRef.asset._ref;
    const [, id, dimensions, format] = ref.split('-');
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`;
  }

  // Se tem asset.url, retorna
  if (imageRef?.asset?.url) {
    return imageRef.asset.url;
  }

  return undefined;
}
