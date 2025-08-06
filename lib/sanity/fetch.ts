import { client } from '@/sanity/lib/client'
import { 
  POSTS_QUERY, 
  POST_QUERY, 
  PAGES_QUERY, 
  PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  FORMATIONS_QUERY,
  FORMATION_QUERY,
  CATEGORIES_QUERY
} from '@/sanity/lib/queries'

export async function getPosts() {
  return client.fetch(POSTS_QUERY)
}

export async function getPost(slug: string) {
  return client.fetch(POST_QUERY, { slug })
}

export async function getCategories() {
  return client.fetch(CATEGORIES_QUERY)
}

export async function getPages() {
  return client.fetch(PAGES_QUERY)
}

export async function getPage(slug: string) {
  return client.fetch(PAGE_QUERY, { slug })
}

export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY)
}

export async function getFormations() {
  return client.fetch(FORMATIONS_QUERY)
}

export async function getFormation(slug: string) {
  return client.fetch(FORMATION_QUERY, { slug })
}