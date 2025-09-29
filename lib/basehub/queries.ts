import { basehub } from 'basehub';
import type { BlogPost, BlogCategory } from './client';

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.BASEHUB_TOKEN) {
      console.log('BaseHub token not configured, using fallback data');
      return [];
    }

    const result = await basehub().query({
      blog: {
        posts: {
          items: {
            _id: true,
            _title: true,
            _slug: true,
            excerpt: true,
            date: true,
            author: {
              _id: true,
              _title: true,
            },
            body: {
              html: true,
              plainText: true,
              readingTime: true,
            },
            coverImage: {
              url: true,
              alt: true,
            }
          }
        }
      }
    });

    // Transform BaseHub data to BlogPost format
    return result.blog.posts.items.map(post => ({
      _id: post._id,
      _title: post._title,
      slug: post._slug,
      excerpt: post.excerpt,
      content: {
        html: post.body?.html || '',
        raw: post.body?.plainText || ''
      },
      coverImage: post.coverImage ? {
        url: post.coverImage.url,
        alt: post.coverImage.alt || post._title
      } : undefined,
      publishedAt: post.date,
      author: post.author._title,
      category: 'Geral', // Default category until we implement categories
      readingTime: post.body?.readingTime || Math.ceil(post.excerpt.split(' ').length / 200),
    }));
  } catch (error) {
    console.error('Error fetching posts from BaseHub:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!process.env.BASEHUB_TOKEN) {
      console.log('BaseHub token not configured, using fallback data');
      return null;
    }

    const result = await basehub().query({
      blog: {
        posts: {
          items: {
            _id: true,
            _title: true,
            _slug: true,
            excerpt: true,
            date: true,
            author: {
              _id: true,
              _title: true,
            },
            body: {
              html: true,
              plainText: true,
              readingTime: true,
            },
            coverImage: {
              url: true,
              alt: true,
            }
          }
        }
      }
    });

    const post = result.blog.posts.items.find(p => p._slug === slug);
    if (!post) return null;

    return {
      _id: post._id,
      _title: post._title,
      slug: post._slug,
      excerpt: post.excerpt,
      content: {
        html: post.body?.html || '',
        raw: post.body?.plainText || ''
      },
      coverImage: post.coverImage ? {
        url: post.coverImage.url,
        alt: post.coverImage.alt || post._title
      } : undefined,
      publishedAt: post.date,
      author: post.author._title,
      category: 'Geral', // Default category until we implement categories
      readingTime: post.body?.readingTime || Math.ceil(post.excerpt.split(' ').length / 200),
    };
  } catch (error) {
    console.error('Error fetching post from BaseHub:', error);
    return null;
  }
}

export async function getCategories(): Promise<BlogCategory[]> {
  try {
    if (!process.env.BASEHUB_TOKEN) {
      console.log('BaseHub token not configured, using fallback data');
      return [];
    }

    // BaseHub categories query would go here
    console.log('BaseHub integration ready for categories, but returning fallback until posts are imported');
    return [];
  } catch (error) {
    console.error('Error fetching categories from BaseHub:', error);
    return [];
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    if (!process.env.BASEHUB_TOKEN) {
      console.log('BaseHub token not configured, using fallback data');
      return [];
    }

    // BaseHub category filtering query would go here
    console.log(`BaseHub integration ready for category: ${category}, but returning fallback until posts are imported`);
    return [];
  } catch (error) {
    console.error('Error fetching posts by category from BaseHub:', error);
    return [];
  }
}