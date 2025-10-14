import { getPostBySlug, getAllPosts } from '@/lib/blog/queries'
import { fallbackBlogPosts } from '@/lib/blog/fallback-data'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    // Fallback to predefined slugs when API fails
    return fallbackBlogPosts.map((post) => ({
      slug: post.slug,
    }))
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post = await getPostBySlug(params.slug)

  // Fallback to static posts if BaseHub doesn't return anything
  if (!post) {
    post = fallbackBlogPosts.find(p => p.slug === params.slug) || null
  }

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Voltar para o blog
      </Link>

      {post.coverImage && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt || post._title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post._title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {post.author && (
            <span>Por {post.author}</span>
          )}
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          )}
        </div>

        {post.category && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {post.category}
            </span>
          </div>
        )}
      </header>

      {post.excerpt && (
        <div className="text-xl text-gray-600 mb-8 italic">
          {post.excerpt}
        </div>
      )}

      {post.content?.html && (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        />
      )}

      <div className="mt-12 pt-8 border-t">
        <Link
          href="/blog"
          className="text-blue-600 hover:underline"
        >
          ← Voltar ao blog
        </Link>
      </div>
    </article>
  )
}