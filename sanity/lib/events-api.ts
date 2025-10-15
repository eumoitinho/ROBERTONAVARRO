import { sanityClient } from './client';
import { groq } from 'next-sanity';

// ========================================
// INTERFACES TYPESCRIPT
// ========================================

export interface EventHero {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: {
    asset: any;
  };
  ctaText?: string;
  ctaLink?: string;
  eventInfo?: {
    date?: string;
    location?: string;
    duration?: string;
  };
}

export interface EventChallenge {
  question?: string;
  answer?: string;
  icon?: string;
}

export interface EventChallengesSection {
  badge?: string;
  title?: string;
  description?: string;
  items?: EventChallenge[];
}

export interface EventMainContentItem {
  title?: string;
  description?: string;
  icon?: {
    asset: any;
  };
  benefits?: string[];
}

export interface EventMainContent {
  badge?: string;
  title?: string;
  description?: string;
  items?: EventMainContentItem[];
}

export interface EventHighlight {
  title?: string;
  description?: string;
  icon?: string;
}

export interface EventHighlights {
  badge?: string;
  title?: string;
  items?: EventHighlight[];
}

export interface EventMethodologyStep {
  number?: string;
  title?: string;
  description?: string;
}

export interface EventMethodology {
  badge?: string;
  title?: string;
  description?: string;
  steps?: EventMethodologyStep[];
}

export interface EventBonus {
  title?: string;
  description?: string;
  value?: string;
  icon?: string;
}

export interface EventBonuses {
  badge?: string;
  title?: string;
  items?: EventBonus[];
}

export interface EventTicket {
  name?: string;
  price?: string;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export interface EventPricing {
  badge?: string;
  title?: string;
  description?: string;
  tickets?: EventTicket[];
}

export interface EventTestimonial {
  name?: string;
  role?: string;
  quote?: string;
  image?: {
    asset: any;
  };
  rating?: number;
}

export interface EventTestimonials {
  badge?: string;
  title?: string;
  description?: string;
  items?: EventTestimonial[];
}

export interface EventFaqItem {
  question?: string;
  answer?: string;
}

export interface EventFaq {
  badge?: string;
  title?: string;
  items?: EventFaqItem[];
}

export interface EventLocation {
  show?: boolean;
  title?: string;
  address?: string;
  city?: string;
  state?: string;
  mapEmbedUrl?: string;
}

export interface EventFinalCta {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface EventSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: {
    asset: any;
  };
}

export interface EventControls {
  showChallenges?: boolean;
  showMainContent?: boolean;
  showHighlights?: boolean;
  showMethodology?: boolean;
  showBonuses?: boolean;
  showPricing?: boolean;
  showTestimonials?: boolean;
  showFaq?: boolean;
  showLocation?: boolean;
}

export interface EventPageData {
  _id: string;
  _type: 'eventPage';
  title: string;
  slug: {
    current: string;
  };
  status?: string;
  hero?: EventHero;
  challenges?: EventChallengesSection;
  mainContent?: EventMainContent;
  highlights?: EventHighlights;
  methodology?: EventMethodology;
  bonuses?: EventBonuses;
  pricing?: EventPricing;
  testimonials?: EventTestimonials;
  faq?: EventFaq;
  location?: EventLocation;
  finalCta?: EventFinalCta;
  seo?: EventSeo;
  controls?: EventControls;
}

// ========================================
// GROQ QUERIES
// ========================================

const eventPageQuery = groq`
  *[_type == "eventPage" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    status,
    hero {
      badge,
      title,
      subtitle,
      description,
      backgroundImage {
        asset->
      },
      ctaText,
      ctaLink,
      eventInfo {
        date,
        location,
        duration
      }
    },
    challenges {
      badge,
      title,
      description,
      items[] {
        question,
        answer,
        icon
      }
    },
    mainContent {
      badge,
      title,
      description,
      items[] {
        title,
        description,
        icon {
          asset->
        },
        benefits
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
    bonuses {
      badge,
      title,
      items[] {
        title,
        description,
        value,
        icon
      }
    },
    pricing {
      badge,
      title,
      description,
      tickets[] {
        name,
        price,
        description,
        features,
        highlighted,
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
        image {
          asset->
        },
        rating
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
    location {
      show,
      title,
      address,
      city,
      state,
      mapEmbedUrl
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
      keywords,
      ogImage {
        asset->
      }
    },
    controls {
      showChallenges,
      showMainContent,
      showHighlights,
      showMethodology,
      showBonuses,
      showPricing,
      showTestimonials,
      showFaq,
      showLocation
    }
  }
`;

const allEventsQuery = groq`
  *[_type == "eventPage" && status == "published"] | order(title asc) {
    _id,
    title,
    slug,
    hero {
      title,
      subtitle,
      backgroundImage {
        asset->
      }
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// ========================================
// API FUNCTIONS
// ========================================

export async function getEventBySlug(slug: string): Promise<EventPageData | null> {
  try {
    const event = await sanityClient.fetch<EventPageData>(eventPageQuery, { slug });
    return event;
  } catch (error) {
    console.error(`[Events API] Erro ao buscar evento "${slug}":`, error);
    return null;
  }
}

export async function getAllEvents(): Promise<EventPageData[]> {
  try {
    const events = await sanityClient.fetch<EventPageData[]>(allEventsQuery);
    return events || [];
  } catch (error) {
    console.error('[Events API] Erro ao buscar eventos:', error);
    return [];
  }
}

export async function getEventSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(
      groq`*[_type == "eventPage" && status == "published"].slug.current`
    );
    return slugs || [];
  } catch (error) {
    console.error('[Events API] Erro ao buscar slugs:', error);
    return [];
  }
}

