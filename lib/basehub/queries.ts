import { basehub } from './client';
import type { BlogPost, BlogCategory } from './client';

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.BASEHUB_TOKEN) {
      console.log('BaseHub token not configured, using fallback data');
      return [];
    }

    const { blog } = await basehub.query({
      blog: {
        items: {
          _id: true,
          _title: true,
          slug: true,
          excerpt: true,
          content: {
            json: true,
            html: true,
          },
          coverImage: {
            url: true,
            alt: true,
          },
          publishedAt: true,
          author: true,
          category: true,
          readingTime: true,
        },
      },
    });

    return blog.items.map((item: any) => ({
      _id: item._id,
      _title: item._title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: {
        raw: item.content?.json || '',
        html: item.content?.html || '',
      },
      coverImage: item.coverImage ? {
        url: item.coverImage.url,
        alt: item.coverImage.alt,
      } : undefined,
      publishedAt: item.publishedAt,
      author: item.author,
      category: item.category,
      readingTime: item.readingTime,
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

    const { blog } = await basehub.query({
      blog: {
        items: {
          __args: {
            filter: {
              slug: { eq: slug },
            },
          },
          _id: true,
          _title: true,
          slug: true,
          excerpt: true,
          content: {
            json: true,
            html: true,
          },
          coverImage: {
            url: true,
            alt: true,
          },
          publishedAt: true,
          author: true,
          category: true,
          readingTime: true,
        },
      },
    });

    const post = blog.items[0];
    if (!post) return null;

    return {
      _id: post._id,
      _title: post._title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: {
        raw: post.content?.json || '',
        html: post.content?.html || '',
      },
      coverImage: post.coverImage ? {
        url: post.coverImage.url,
        alt: post.coverImage.alt,
      } : undefined,
      publishedAt: post.publishedAt,
      author: post.author,
      category: post.category,
      readingTime: post.readingTime,
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

    const { blogCategories } = await basehub.query({
      blogCategories: {
        items: {
          _id: true,
          _title: true,
          slug: true,
        },
      },
    });

    return blogCategories.items.map((item: any) => ({
      _id: item._id,
      _title: item._title,
      slug: item.slug,
    }));
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

    const { blog } = await basehub.query({
      blog: {
        items: {
          __args: {
            filter: {
              category: { eq: category },
            },
          },
          _id: true,
          _title: true,
          slug: true,
          excerpt: true,
          content: {
            json: true,
            html: true,
          },
          coverImage: {
            url: true,
            alt: true,
          },
          publishedAt: true,
          author: true,
          category: true,
          readingTime: true,
        },
      },
    });

    return blog.items.map((item: any) => ({
      _id: item._id,
      _title: item._title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: {
        raw: item.content?.json || '',
        html: item.content?.html || '',
      },
      coverImage: item.coverImage ? {
        url: item.coverImage.url,
        alt: item.coverImage.alt,
      } : undefined,
      publishedAt: item.publishedAt,
      author: item.author,
      category: item.category,
      readingTime: item.readingTime,
    }));
  } catch (error) {
    console.error('Error fetching posts by category from BaseHub:', error);
    return [];
  }
}