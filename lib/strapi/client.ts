/**
 * Cliente Strapi CMS
 * Conecta com a API do Strapi para buscar conteúdo
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiPage {
  id: number;
  attributes: {
    slug: string;
    route: string;
    type: 'home' | 'event' | 'formation' | 'book' | 'book-list' | 'blog' | 'landing' | 'page';
    hero: any;
    formations?: any;
    sections?: any[];
    registration?: any;
    productKit?: any;
    books?: any[];
    knowledgeBarrier?: any;
    finalCta?: any;
    metadata?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

class StrapiClient {
  private baseUrl: string;
  private apiToken: string;

  constructor() {
    this.baseUrl = STRAPI_URL;
    this.apiToken = STRAPI_API_TOKEN;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        next: { revalidate: 3600 }, // Revalidar a cada hora
      });

      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Strapi fetch error:', error);
      throw error;
    }
  }

  /**
   * Buscar página por slug
   */
  async getPageBySlug(slug: string): Promise<StrapiPage | null> {
    try {
      const response = await this.fetch<StrapiResponse<StrapiPage[]>>(
        `/pages?filters[slug][$eq]=${slug}&populate=deep`
      );
      
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching page by slug:', error);
      return null;
    }
  }

  /**
   * Buscar página por rota
   */
  async getPageByRoute(route: string): Promise<StrapiPage | null> {
    try {
      const response = await this.fetch<StrapiResponse<StrapiPage[]>>(
        `/pages?filters[route][$eq]=${route}&populate=deep`
      );
      
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching page by route:', error);
      return null;
    }
  }

  /**
   * Buscar todas as páginas
   */
  async getAllPages(): Promise<StrapiPage[]> {
    try {
      const response = await this.fetch<StrapiResponse<StrapiPage[]>>(
        `/pages?populate=deep&sort=createdAt:desc`
      );
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching all pages:', error);
      return [];
    }
  }

  /**
   * Buscar páginas por tipo
   */
  async getPagesByType(type: string): Promise<StrapiPage[]> {
    try {
      const response = await this.fetch<StrapiResponse<StrapiPage[]>>(
        `/pages?filters[type][$eq]=${type}&populate=deep&sort=createdAt:desc`
      );
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching pages by type:', error);
      return [];
    }
  }

  /**
   * Buscar homepage
   */
  async getHomepage(): Promise<StrapiPage | null> {
    return this.getPageBySlug('home');
  }

  /**
   * Formatar URL de imagem do Strapi
   */
  getImageUrl(image: StrapiImage | string | null | undefined): string {
    if (!image) return '';
    
    if (typeof image === 'string') {
      // Se já é uma URL completa, retorna
      if (image.startsWith('http')) return image;
      // Se é um caminho relativo, adiciona base URL
      if (image.startsWith('/')) return `${this.baseUrl}${image}`;
      return image;
    }

    // Se é um objeto Strapi Image
    if (image.attributes?.url) {
      const url = image.attributes.url;
      if (url.startsWith('http')) return url;
      return `${this.baseUrl}${url}`;
    }

    return '';
  }
}

export const strapiClient = new StrapiClient();

