import { getPosts, getCategories } from '@/lib/sanity/fetch'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'

export default async function BlogCMSPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog - Conteúdo do Sanity CMS</h1>
        <p className="text-gray-600">
          Este conteúdo vem diretamente do Sanity CMS. 
          <Link href="/studio" className="text-blue-600 hover:underline ml-2">
            Acesse o Studio para editar
          </Link>
        </p>
      </div>

      {/* Categorias */}
      {categories && categories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Categorias</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category: any) => (
              <span
                key={category._id}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <article key={post._id} className="border rounded-lg overflow-hidden shadow-lg">
              {post.mainImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-gray-600 mb-2">{post.excerpt}</p>
                )}
                {post.author && (
                  <p className="text-sm text-gray-500">Por {post.author}</p>
                )}
                {post.publishedAt && (
                  <p className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                  </p>
                )}
                {post.slug?.current && (
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Ler mais →
                  </Link>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">
              Nenhum post encontrado. Adicione conteúdo através do Sanity Studio.
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ir para o Studio
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}