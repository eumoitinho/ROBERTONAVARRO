import { sanityClient } from './client'
import { homepageQuery } from './homepage-queries'

export type HomepageData = {
  _id: string
  title: string
  heroSection?: {
    badge?: string
    title?: string
    subtitle?: string
    description?: string
    achievementsNumber?: string
    achievementsLabel?: string
    primaryButtonText?: string
    primaryButtonLink?: string
    backgroundImage?: { asset?: { url?: string } }
  }
  formacoesSection?: {
    badge?: string
    title?: string
    highlightedText?: string
    description?: string
    formacoes?: Array<{ title?: string; description?: string; link?: string; buttonText?: string }>
  }
  mentorSection?: {
    badge?: string
    title?: string
    highlightedText?: string
    subtitle?: string
    backgroundImage?: { asset?: { url?: string } }
    bioParagraphs?: string[]
    stats?: Array<{ icon?: string; value?: string; label?: string }>
  }
  videosSection?: {
    badge?: string
    title?: string
    highlightedText?: string
    description?: string
    videos?: Array<{ youtubeId?: string; title?: string; person?: string; description?: string; chipLabel?: string; thumbnail?: { asset?: { url?: string } } }>
    stats?: Array<{ icon?: string; title?: string; description?: string }>
    ctaButtonText?: string
    ctaButtonLink?: string
  }
  testimonialsSection?: {
    badge?: string
    title?: string
    highlightedText?: string
    description?: string
    testimonials?: Array<{ name?: string; role?: string; initial?: string; quote?: string; rating?: number; image?: { asset?: { url?: string } } }>
    ctaText?: string
    ctaButtonText?: string
    ctaButtonLink?: string
  }
  locationSection?: {
    show?: boolean
    mapEmbedUrl?: string
    address?: string
    phone?: string
    email?: string
  }
  sectionControls?: {
    showMentorSection?: boolean
    showVideosSection?: boolean
    showTestimonialsSection?: boolean
    showLocationSection?: boolean
    showEventPopup?: boolean
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: { asset?: { url?: string } }
  }
}

export async function getHomepage(): Promise<HomepageData | null> {
  try {
    const data = await sanityClient.fetch<HomepageData>(homepageQuery)
    return data ?? null
  } catch (err) {
    console.error('[Sanity] getHomepage error', err)
    return null
  }
}


