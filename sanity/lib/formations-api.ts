import { client } from './client'
import type { FormationPageData } from './types'

// Queries GROQ para Formações
export const formationQueries = {
  bySlug: `*[_type == "formationPage" && slug.current == $slug && status == "published"][0]{
    _id,
    _type,
    slug,
    title,
    status,
    hero {
      title,
      subtitle,
      description,
      backgroundImage {
        asset->{
          _id,
          url
        }
      },
      duration,
      format,
      ctaText,
      ctaLink
    },
    benefits {
      badge,
      title,
      description,
      items[] {
        icon,
        title,
        description
      }
    },
    mainContent {
      badge,
      title,
      description,
      items[] {
        title,
        description,
        benefits[],
        duration
      }
    },
    methodology {
      badge,
      title,
      description,
      steps[] {
        number,
        title,
        description
      }
    },
    highlights {
      badge,
      title,
      items[] {
        title,
        description,
        icon
      }
    },
    includes {
      badge,
      title,
      items[] {
        title,
        description,
        value
      }
    },
    pricing {
      badge,
      title,
      description,
      plans[] {
        name,
        price,
        description,
        highlighted,
        features[],
        ctaText,
        ctaLink
      }
    },
    testimonials {
      badge,
      title,
      description,
      items[] {
        name,
        role,
        quote,
        rating,
        image {
          asset->{
            _id,
            url
          }
        }
      }
    },
    faq {
      badge,
      title,
      items[] {
        question,
        answer
      }
    },
    finalCta {
      title,
      description,
      buttonText,
      buttonLink
    },
    seo {
      metaTitle,
      metaDescription,
      keywords[]
    },
    controls {
      showBenefits,
      showMainContent,
      showMethodology,
      showHighlights,
      showIncludes,
      showPricing,
      showTestimonials,
      showFaq
    }
  }`,

  all: `*[_type == "formationPage" && status == "published"]{
    _id,
    _type,
    slug,
    title,
    hero {
      title,
      subtitle,
      backgroundImage {
        asset->{
          _id,
          url
        }
      }
    }
  }`,

  slugs: `*[_type == "formationPage" && status == "published"].slug.current`
}

// Interfaces TypeScript
export interface FormationHero {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  duration?: string;
  format?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface FormationBenefit {
  icon?: string;
  title?: string;
  description?: string;
}

export interface FormationBenefits {
  badge?: string;
  title?: string;
  description?: string;
  items?: FormationBenefit[];
}

export interface FormationContentItem {
  title?: string;
  description?: string;
  benefits?: string[];
  duration?: string;
}

export interface FormationMainContent {
  badge?: string;
  title?: string;
  description?: string;
  items?: FormationContentItem[];
}

export interface FormationMethodologyStep {
  number?: string;
  title?: string;
  description?: string;
}

export interface FormationMethodology {
  badge?: string;
  title?: string;
  description?: string;
  steps?: FormationMethodologyStep[];
}

export interface FormationHighlight {
  title?: string;
  description?: string;
  icon?: string;
}

export interface FormationHighlights {
  badge?: string;
  title?: string;
  items?: FormationHighlight[];
}

export interface FormationInclude {
  title?: string;
  description?: string;
  value?: string;
}

export interface FormationIncludes {
  badge?: string;
  title?: string;
  items?: FormationInclude[];
}

export interface FormationPlan {
  name?: string;
  price?: string;
  description?: string;
  highlighted?: boolean;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export interface FormationPricing {
  badge?: string;
  title?: string;
  description?: string;
  plans?: FormationPlan[];
}

export interface FormationTestimonial {
  name?: string;
  role?: string;
  quote?: string;
  rating?: number;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
}

export interface FormationTestimonials {
  badge?: string;
  title?: string;
  description?: string;
  items?: FormationTestimonial[];
}

export interface FormationFaqItem {
  question?: string;
  answer?: string;
}

export interface FormationFaq {
  badge?: string;
  title?: string;
  items?: FormationFaqItem[];
}

export interface FormationFinalCta {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface FormationSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface FormationControls {
  showBenefits?: boolean;
  showMainContent?: boolean;
  showMethodology?: boolean;
  showHighlights?: boolean;
  showIncludes?: boolean;
  showPricing?: boolean;
  showTestimonials?: boolean;
  showFaq?: boolean;
}

export interface FormationPageData {
  _id?: string;
  _type?: string;
  slug?: {
    current?: string;
  };
  title?: string;
  status?: string;
  hero?: FormationHero;
  benefits?: FormationBenefits;
  mainContent?: FormationMainContent;
  methodology?: FormationMethodology;
  highlights?: FormationHighlights;
  includes?: FormationIncludes;
  pricing?: FormationPricing;
  testimonials?: FormationTestimonials;
  faq?: FormationFaq;
  finalCta?: FormationFinalCta;
  seo?: FormationSeo;
  controls?: FormationControls;
}

// Funções da API
export async function getFormationBySlug(slug: string): Promise<FormationPageData | null> {
  try {
    const data = await client.fetch(formationQueries.bySlug, { slug });
    return data || null;
  } catch (error) {
    console.error(`[Formations API] Erro ao buscar formação ${slug}:`, error);
    return null;
  }
}

export async function getAllFormations(): Promise<FormationPageData[]> {
  try {
    const data = await client.fetch(formationQueries.all);
    return data || [];
  } catch (error) {
    console.error('[Formations API] Erro ao buscar formações:', error);
    return [];
  }
}

export async function getFormationSlugs(): Promise<string[]> {
  try {
    const data = await client.fetch(formationQueries.slugs);
    return data || [];
  } catch (error) {
    console.error('[Formations API] Erro ao buscar slugs das formações:', error);
    return [];
  }
}

// Fallback data para formações (caso Sanity não esteja disponível)
export const fallbackFormationData: FormationPageData = {
  _id: 'fallback-formation',
  _type: 'formationPage',
  slug: { current: 'fallback' },
  title: 'Formação em Carregamento',
  status: 'published',
  hero: {
    title: 'Formação em Carregamento',
    subtitle: 'Aguarde enquanto carregamos o conteúdo',
    description: 'Esta formação está sendo carregada. Tente novamente em alguns instantes.',
    ctaText: 'Aguarde',
    ctaLink: '#'
  },
  seo: {
    metaTitle: 'Formação em Carregamento',
    metaDescription: 'Aguarde enquanto carregamos o conteúdo da formação.'
  }
}
