import { getPostBySlug, getAllPosts } from '@/lib/blog/queries'
import { fallbackBlogPosts } from '@/lib/blog/fallback-data'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return {
    title: post._title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post = await getPostBySlug(params.slug)

  // Fallback to static posts if Sanity doesn't return anything
  if (!post) {
    post = fallbackBlogPosts.find(p => p.slug === params.slug) || null
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/blog"
          className="text-yellow-400 hover:text-yellow-300 mb-4 inline-block transition-colors"
        >
          ← Voltar para o blog
        </Link>

        {post.coverImage && (
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post._title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{post._title}</h1>

          <div className="flex flex-wrap gap-6 text-sm text-zinc-400 mb-6">
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
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-sm">
                {post.category}
              </span>
            </div>
          )}
        </header>

        {post.excerpt && (
          <div className="text-xl text-zinc-300 mb-8 italic leading-relaxed">
            {post.excerpt}
          </div>
        )}

        {post.content?.html && (
          <div className="prose prose-lg prose-invert max-w-none">
            <div
              className="prose-headings:text-white prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8 prose-h1:text-white
                       prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-yellow-400
                       prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-4 prose-h3:text-white
                       prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
                       prose-strong:text-yellow-400 prose-strong:font-semibold
                       prose-em:text-zinc-200 prose-em:italic
                       prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:text-yellow-300 hover:prose-a:underline
                       prose-blockquote:text-zinc-300 prose-blockquote:border-l-yellow-500 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-zinc-800/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                       prose-ul:text-zinc-300 prose-ul:space-y-2 prose-ul:my-4
                       prose-li:text-zinc-300 prose-li:leading-relaxed prose-li:mb-2
                       prose-ol:text-zinc-300 prose-ol:space-y-2 prose-ol:my-4"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            />
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <Link
            href="/blog"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            ← Voltar ao blog
          </Link>
        </div>
      </article>
    </div>
  )
}