import { getPost, getPosts } from '@/lib/sanity/fetch'
import { PortableText } from '@/components/sanity/portable-text'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post: any) => ({
    slug: post.slug?.current,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        href="/blog-cms" 
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Voltar para o blog
      </Link>

      {post.mainImage && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
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

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.categories.map((category: any) => (
              <span
                key={category._id}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.excerpt && (
        <div className="text-xl text-gray-600 mb-8 italic">
          {post.excerpt}
        </div>
      )}

      {post.body && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      )}

      <div className="mt-12 pt-8 border-t">
        <Link
          href="/studio"
          className="text-blue-600 hover:underline"
        >
          Editar este post no Sanity Studio →
        </Link>
      </div>
    </article>
  )
}