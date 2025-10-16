import { sanityClient } from './client'
import { 
  blogPostQuery, 
  blogPostsQuery, 
  blogPostsByCategoryQuery, 
  featuredBlogPostsQuery,
  blogCategoriesQuery 
} from './blog-queries'
import { fallbackBlogPosts } from '@/lib/blog/fallback-data'
import type { BlogPost } from '@/lib/blog/client'

export interface SanityBlogPost {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[]
  coverImage?: {
    asset?: {
      _id: string
      url: string
    }
    alt?: string
  }
  author?: string
  category?: string
  publishedAt: string
  readingTime?: number
  featured?: boolean
}

// Convert Sanity blog post to our BlogPost interface
function convertSanityPost(sanityPost: SanityBlogPost): BlogPost {
  // Extract text content from Sanity portable text
  let contentText = ''
  let contentHtml = ''
  
  if (sanityPost.content && Array.isArray(sanityPost.content)) {
    contentText = sanityPost.content
      .filter(block => block._type === 'block' && block.children)
      .map(block => 
        block.children
          ?.filter((child: any) => child._type === 'span' && child.text)
          .map((child: any) => child.text)
          .join('')
      )
      .join('\n')
    
    // For now, use the text content as HTML
    contentHtml = contentText
  }
  
  return {
    _id: sanityPost._id,
    _title: sanityPost.title,
    slug: sanityPost.slug.current,
    excerpt: sanityPost.excerpt,
    content: {
      raw: contentText,
      html: contentHtml
    },
    coverImage: sanityPost.coverImage?.asset?.url ? {
      url: sanityPost.coverImage.asset.url,
      alt: sanityPost.coverImage.alt || sanityPost.title
    } : undefined,
    author: sanityPost.author || 'Roberto Navarro',
    category: sanityPost.category,
    publishedAt: sanityPost.publishedAt,
    readingTime: sanityPost.readingTime || 5
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!sanityClient) {
      console.log('[getBlogPostBySlug] Sanity client not configured, using fallback')
      return fallbackBlogPosts.find(post => post.slug === slug) || null
    }

    const sanityPost = await sanityClient.fetch<SanityBlogPost | null>(blogPostQuery, { slug })
    
    if (!sanityPost) {
      console.log(`[getBlogPostBySlug] No post found for slug: ${slug}, trying fallback`)
      return fallbackBlogPosts.find(post => post.slug === slug) || null
    }

    return convertSanityPost(sanityPost)
  } catch (error) {
    console.error('[getBlogPostBySlug] Error fetching blog post:', error)
    return fallbackBlogPosts.find(post => post.slug === slug) || null
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!sanityClient) {
      console.log('[getAllBlogPosts] Sanity client not configured, using fallback')
      return fallbackBlogPosts
    }

    const sanityPosts = await sanityClient.fetch<SanityBlogPost[]>(blogPostsQuery)
    
    if (!sanityPosts || sanityPosts.length === 0) {
      console.log('[getAllBlogPosts] No posts found in Sanity, using fallback')
      return fallbackBlogPosts
    }

    return sanityPosts.map(convertSanityPost)
  } catch (error) {
    console.error('[getAllBlogPosts] Error fetching blog posts:', error)
    return fallbackBlogPosts
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    if (!sanityClient) {
      console.log('[getBlogPostsByCategory] Sanity client not configured, using fallback')
      return fallbackBlogPosts.filter(post => post.category === category)
    }

    const sanityPosts = await sanityClient.fetch<SanityBlogPost[]>(blogPostsByCategoryQuery, { category })
    
    if (!sanityPosts || sanityPosts.length === 0) {
      console.log(`[getBlogPostsByCategory] No posts found for category: ${category}, using fallback`)
      return fallbackBlogPosts.filter(post => post.category === category)
    }

    return sanityPosts.map(convertSanityPost)
  } catch (error) {
    console.error('[getBlogPostsByCategory] Error fetching blog posts by category:', error)
    return fallbackBlogPosts.filter(post => post.category === category)
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!sanityClient) {
      console.log('[getFeaturedBlogPosts] Sanity client not configured, using fallback')
      return fallbackBlogPosts.slice(0, 3)
    }

    const sanityPosts = await sanityClient.fetch<SanityBlogPost[]>(featuredBlogPostsQuery)
    
    if (!sanityPosts || sanityPosts.length === 0) {
      console.log('[getFeaturedBlogPosts] No featured posts found in Sanity, using fallback')
      return fallbackBlogPosts.slice(0, 3)
    }

    return sanityPosts.map(convertSanityPost)
  } catch (error) {
    console.error('[getFeaturedBlogPosts] Error fetching featured blog posts:', error)
    return fallbackBlogPosts.slice(0, 3)
  }
}

export async function getBlogCategories(): Promise<string[]> {
  try {
    if (!sanityClient) {
      console.log('[getBlogCategories] Sanity client not configured, using fallback')
      return ['Mentalidade', 'Coragem', 'Inteligência Emocional', 'Decisões Financeiras']
    }

    const categories = await sanityClient.fetch<string[]>(blogCategoriesQuery)
    
    if (!categories || categories.length === 0) {
      console.log('[getBlogCategories] No categories found in Sanity, using fallback')
      return ['Mentalidade', 'Coragem', 'Inteligência Emocional', 'Decisões Financeiras']
    }

    return categories.filter(Boolean)
  } catch (error) {
    console.error('[getBlogCategories] Error fetching blog categories:', error)
    return ['Mentalidade', 'Coragem', 'Inteligência Emocional', 'Decisões Financeiras']
  }
}
