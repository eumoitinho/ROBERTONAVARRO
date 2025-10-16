import { sanityClient } from './client'
import { bookBySlugQuery, allBooksQuery } from './books-queries'

export interface BookPageData {
  _id: string
  title: string
  slug: { current: string }
  hero: {
    badge?: string
    title?: string
    subtitle?: string
    description?: string
    coverImage?: {
      asset?: { _id: string; url: string }
      alt?: string
    }
    coverImagePath?: string
    ctaText?: string
    purchaseLink?: string
    rating?: number
    totalReviews?: number
    gradientFrom?: string
    gradientTo?: string
  }
  aboutSection?: {
    title?: string
    paragraphs?: string[]
    highlightText?: string
  }
  pillarsSection?: {
    badge?: string
    title?: string
    description?: string
    items?: Array<{
      title?: string
      description?: string
      icon?: string
    }>
  }
  benefitsSection?: {
    badge?: string
    title?: string
    items?: Array<{
      title?: string
      description?: string
      icon?: string
    }>
  }
  chaptersSection?: {
    badge?: string
    title?: string
    chapters?: Array<{
      title?: string
      description?: string
    }>
  }
  authorSection?: {
    badge?: string
    title?: string
    name?: string
    subtitle?: string
    bio?: string[]
    image?: {
      asset?: { _id: string; url: string }
      alt?: string
    }
    imagePath?: string
  }
  ctaSection?: {
    title?: string
    description?: string
    ctaText?: string
    price?: string
    originalPrice?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface BookPreview {
  _id: string
  title: string
  slug: { current: string }
  hero: {
    title?: string
    subtitle?: string
    coverImagePath?: string
    rating?: number
    totalReviews?: number
  }
}

export async function getBookBySlug(slug: string): Promise<BookPageData | null> {
  try {
    if (!sanityClient) {
      console.warn('Sanity client not configured')
      return null
    }

    const book = await sanityClient.fetch(bookBySlugQuery, { slug })
    return book
  } catch (error) {
    console.error('Error fetching book by slug:', error)
    return null
  }
}

export async function getAllBooks(): Promise<BookPreview[]> {
  try {
    if (!sanityClient) {
      console.warn('Sanity client not configured')
      return []
    }

    const books = await sanityClient.fetch(allBooksQuery)
    return books
  } catch (error) {
    console.error('Error fetching all books:', error)
    return []
  }
}
