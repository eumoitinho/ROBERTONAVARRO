import { sanityClient } from './client'
import { eventBySlugQuery, allEventsQuery } from './events-queries'

export interface EventPageData {
  _id: string
  title: string
  slug: { current: string }
  hero: {
    title?: string
    subtitle?: string
    secondTitle?: string
    description?: string
    image?: {
      asset?: { _id: string; url: string }
      alt?: string
    }
    ctaText?: string
    ctaHref?: string
    secondaryCtaText?: string
    secondaryCtaHref?: string
    showCountdown?: boolean
    countdownTargetDate?: string
  }
  benefitsSection?: {
    badge?: string
    title?: string
    description?: string
    benefits?: Array<{
      title?: string
      description?: string
      icon?: string
    }>
  }
  challengesSection?: {
    badge?: string
    title?: string
    description?: string
    challenges?: Array<{
      question?: string
      answer?: string
      icon?: string
    }>
  }
  learningSection?: {
    badge?: string
    title?: string
    description?: string
    items?: Array<{
      title?: string
      description?: string
      icon?: string
    }>
  }
  programSection?: {
    badge?: string
    title?: string
    description?: string
    blocks?: Array<{
      title?: string
      subtitle?: string
      icon?: string
      description?: string
      items?: Array<{
        text?: string
      }>
    }>
  }
  audienceSection?: {
    badge?: string
    title?: string
    description?: string
    items?: Array<{
      text?: string
      icon?: string
    }>
  }
  highlightsSection?: {
    badge?: string
    title?: string
    description?: string
    highlights?: Array<{
      title?: string
      description?: string
      icon?: string
    }>
  }
  mentorsSection?: {
    badge?: string
    title?: string
    description?: string
    mentors?: Array<{
      name?: string
      title?: string
      image?: {
        asset?: { _id: string; url: string }
        alt?: string
      }
      description?: string
      achievements?: Array<{
        text?: string
      }>
    }>
  }
  registrationSection?: {
    badge?: string
    title?: string
    description?: string
    eventDate?: string
    eventTime?: string
    eventLocation?: string
    ticketTypes?: Array<{
      id?: number
      name?: string
      price?: number
      description?: string
      benefits?: string[]
      featured?: boolean
      eduzzContentId?: string
    }>
  }
  faqSection?: {
    badge?: string
    title?: string
    description?: string
    faqs?: Array<{
      question?: string
      answer?: string
    }>
  }
  newsletterSection?: {
    source?: string
    title?: string
    description?: string
    ctaText?: string
    eventDate?: string
    eventTime?: string
    eventLocation?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface EventPreview {
  _id: string
  title: string
  slug: { current: string }
  hero: {
    title?: string
    subtitle?: string
    image?: {
      asset?: { _id: string; url: string }
      alt?: string
    }
  }
}

export async function getEventBySlug(slug: string): Promise<EventPageData | null> {
  try {
    if (!sanityClient) {
      console.warn('Sanity client not configured')
      return null
    }

    const event = await sanityClient.fetch(eventBySlugQuery, { slug })
    return event
  } catch (error) {
    console.error('Error fetching event by slug:', error)
    return null
  }
}

export async function getAllEvents(): Promise<EventPreview[]> {
  try {
    if (!sanityClient) {
      console.warn('Sanity client not configured')
      return []
    }

    const events = await sanityClient.fetch(allEventsQuery)
    return events
  } catch (error) {
    console.error('Error fetching all events:', error)
    return []
  }
}

// Fallback data para quando Sanity não estiver configurado
export const fallbackEventPageData: EventPageData = {
  _id: 'fallback-event',
  title: 'Evento',
  slug: { current: 'evento' },
  hero: {
    title: 'Título do Evento',
    subtitle: 'Subtítulo do evento',
    description: 'Descrição do evento',
    ctaText: 'Garanta sua vaga',
    ctaHref: '#inscricao',
  },
}
