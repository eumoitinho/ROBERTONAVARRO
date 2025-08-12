import { client } from '@/sanity/lib/client'
import { 
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  POSTS_QUERY, 
  POST_QUERY, 
  PAGES_QUERY, 
  PAGE_QUERY,
  FORMATIONS_QUERY,
  FORMATION_QUERY,
  CATEGORIES_QUERY,
  EVENTS_QUERY,
  EVENT_QUERY,
  UPCOMING_EVENTS_QUERY,
  BOOKS_QUERY,
  BOOK_QUERY,
  FEATURED_BOOKS_QUERY
} from '@/sanity/lib/queries'

// Site Settings
export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY)
}

// Home Page
export async function getHomePage() {
  return client.fetch(HOME_PAGE_QUERY)
}

// Blog
export async function getPosts() {
  return client.fetch(POSTS_QUERY)
}

export async function getPost(slug: string) {
  return client.fetch(POST_QUERY, { slug })
}

export async function getCategories() {
  return client.fetch(CATEGORIES_QUERY)
}

// Pages
export async function getPages() {
  return client.fetch(PAGES_QUERY)
}

export async function getPage(slug: string) {
  return client.fetch(PAGE_QUERY, { slug })
}

// Formations
export async function getFormations() {
  return client.fetch(FORMATIONS_QUERY)
}

export async function getFormation(slug: string) {
  return client.fetch(FORMATION_QUERY, { slug })
}

// Events
export async function getEvents() {
  return client.fetch(EVENTS_QUERY)
}

export async function getEvent(slug: string) {
  return client.fetch(EVENT_QUERY, { slug })
}

export async function getUpcomingEvents() {
  return client.fetch(UPCOMING_EVENTS_QUERY)
}

// Books
export async function getBooks() {
  return client.fetch(BOOKS_QUERY)
}

export async function getBook(slug: string) {
  return client.fetch(BOOK_QUERY, { slug })
}

export async function getFeaturedBooks() {
  return client.fetch(FEATURED_BOOKS_QUERY)
}