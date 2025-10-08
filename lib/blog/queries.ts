import type { BlogPost, BlogCategory } from './client';
import { fallbackBlogPosts } from './fallback-data';

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

const posts = fallbackBlogPosts;

export async function getAllPosts(): Promise<BlogPost[]> {
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getCategories(): Promise<BlogCategory[]> {
  return fallbackCategories;
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  return posts.filter((post) => post.category?.toLowerCase() === category.toLowerCase());
}
