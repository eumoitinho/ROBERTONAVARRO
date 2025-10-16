import type { BlogPost, BlogCategory } from './client';
import { fallbackBlogPosts } from './fallback-data';
import { 
  getAllBlogPosts, 
  getBlogPostBySlug, 
  getBlogCategories, 
  getBlogPostsByCategory 
} from '@/sanity/lib/blog-api';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const fallbackCategories: BlogCategory[] = Array.from(
  new Map(
    fallbackBlogPosts
      .filter((post) => Boolean(post.category))
      .map((post) => {
        const title = post.category!.trim();
        return [title, { _id: title, _title: title, slug: slugify(title) } satisfies BlogCategory];
      })
  ).values()
);

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllBlogPosts();
    return posts;
  } catch (error) {
    console.error('[getAllPosts] Error:', error);
    return fallbackBlogPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await getBlogPostBySlug(slug);
    return post;
  } catch (error) {
    console.error('[getPostBySlug] Error:', error);
    return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getCategories(): Promise<BlogCategory[]> {
  try {
    const categories = await getBlogCategories();
    return categories.map(category => ({
      _id: category,
      _title: category,
      slug: slugify(category)
    }));
  } catch (error) {
    console.error('[getCategories] Error:', error);
    return fallbackCategories;
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await getBlogPostsByCategory(category);
    return posts;
  } catch (error) {
    console.error('[getPostsByCategory] Error:', error);
    return fallbackBlogPosts.filter((post) => post.category?.toLowerCase() === category.toLowerCase());
  }
}
