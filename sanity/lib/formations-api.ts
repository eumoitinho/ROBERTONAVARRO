import { sanityClient } from './client'
import { formationBySlugQuery } from './formations-queries'

export type FormationPageData = {
  _id: string
  title: string
  slug?: { current?: string }
  hero?: { title?: string; subtitle?: string; description?: string; ctaText?: string; ctaLink?: string; backgroundImage?: { asset?: { url?: string } } }
  controls?: { showBenefits?: boolean; showMainContent?: boolean; showHighlights?: boolean; showBonuses?: boolean; showPricing?: boolean; showTestimonials?: boolean; showFaq?: boolean }
  mainContent?: { badge?: string; title?: string; description?: string; items?: Array<{ title?: string; description?: string; benefits?: string[] }> }
  benefits?: { badge?: string; title?: string; description?: string; items?: Array<{ title?: string; description?: string }> }
  highlights?: { badge?: string; title?: string; items?: Array<{ title?: string; description?: string; image?: { asset?: { url?: string } } }> }
  bonuses?: { badge?: string; title?: string; items?: Array<{ value?: string; title?: string; description?: string }> }
  pricing?: { badge?: string; title?: string; description?: string; tickets?: Array<{ name?: string; price?: string; description?: string; features?: string[]; highlighted?: boolean; ctaText?: string; ctaLink?: string }> }
  testimonials?: { badge?: string; title?: string; description?: string; items?: Array<{ name?: string; role?: string; quote?: string; rating?: number }> }
  faq?: { badge?: string; title?: string; items?: Array<{ question?: string; answer?: string }> }
  finalCta?: { title?: string; description?: string; buttonText?: string; buttonLink?: string }
  mecSection?: { heading?: string; description?: string; image?: { asset?: { url?: string } }; points?: string[] }
  licenseSection?: { transformationsTitle?: string; transformations?: string[]; benefitsTitle?: string; benefits?: string[]; statement?: string }
  exclusiveMaterials?: { badge?: string; heading?: string; description?: string; chips?: string[]; videoSrc?: string; videoPoster?: { asset?: { url?: string } }; ctaText?: string }
  features?: { badge?: string; title?: string; items?: Array<{ icon?: string; title?: string; description?: string }> }
  trainerSection?: { badge?: string; title?: string; description?: string; courses?: Array<{ title?: string; description?: string; image?: { asset?: { url?: string } } }> }
  mentorSection?: { badge?: string; title?: string; image?: { asset?: { url?: string } }; paragraphs?: string[] }
  guarantees?: { badge?: string; title?: string; items?: Array<{ title?: string; description?: string }> }
  newsletter?: { title?: string; description?: string; ctaText?: string }
  aboutSection?: { badge?: string; heading?: string; paragraphs?: string[]; image?: { asset?: { url?: string } }; ctaText?: string; ctaLink?: string }
  challengesSection?: { badge?: string; title?: string; description?: string; items?: Array<{ title?: string; desc?: string }> }
  valueSection?: { badge?: string; title?: string; paragraphs?: string[]; ctaText?: string; ctaLink?: string }
  learnSection?: { badge?: string; title?: string; items?: Array<{ title?: string; desc?: string; icon?: string }>; ctaText?: string; ctaLink?: string }
  methodologySection?: { badge?: string; title?: string; description?: string; items?: Array<{ title?: string; desc?: string; icon?: string }>; ctaText?: string; ctaLink?: string }
  audienceSection?: { badge?: string; title?: string; intro?: string; bullets?: Array<{ title?: string; desc?: string }>; ctaText?: string; ctaLink?: string }
  faqSection?: { badge?: string; title?: string; items?: Array<{ question?: string; answer?: string }> }
}

export async function getFormationBySlug(slug: string): Promise<FormationPageData | null> {
  try {
    const data = await sanityClient.fetch<FormationPageData>(formationBySlugQuery, { slug })
    return data ?? null
  } catch (err) {
    console.error('[Sanity] getFormationBySlug error', err)
    return null
  }
}


