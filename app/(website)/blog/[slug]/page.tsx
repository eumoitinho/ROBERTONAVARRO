import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

// Helper para renderizar rich text
const renderRichText = (content: any) => {
  if (!content) return null
  if (typeof content === 'string') return <div dangerouslySetInnerHTML={{ __html: content }} />
  if (Array.isArray(content)) {
    return (
      <div className="prose prose-invert max-w-none">
        {content.map((block: any, idx: number) => {
          if (block.type === 'p') {
            return (
              <p key={idx} className="mb-4 text-zinc-300 leading-relaxed">
                {block.children?.map((child: any, cIdx: number) => child.text || '').join('')}
              </p>
            )
          }
          if (block.type === 'h2') {
            return (
              <h2 key={idx} className="text-3xl font-bold mb-4 mt-8 text-white">
                {block.children?.map((child: any, cIdx: number) => child.text || '').join('')}
              </h2>
            )
          }
          if (block.type === 'h3') {
            return (
              <h3 key={idx} className="text-2xl font-bold mb-3 mt-6 text-white">
                {block.children?.map((child: any, cIdx: number) => child.text || '').join('')}
              </h3>
            )
          }
          if (block.type === 'h4') {
            return (
              <h4 key={idx} className="text-xl font-bold mb-2 mt-4 text-white">
                {block.children?.map((child: any, cIdx: number) => child.text || '').join('')}
              </h4>
            )
          }
          if (block.type === 'ul' || block.type === 'ol') {
            return (
              <ul key={idx} className={`${block.type === 'ol' ? 'list-decimal' : 'list-disc'} mb-4 ml-6 text-zinc-300`}>
                {block.children?.map((item: any, iIdx: number) => (
                  <li key={iIdx} className="mb-2">
                    {item.children?.map((child: any, cIdx: number) => child.text || '').join('')}
                  </li>
                ))}
              </ul>
            )
          }
          if (block.type === 'quote') {
            return (
              <blockquote key={idx} className="border-l-4 border-yellow-500 pl-4 my-6 italic text-zinc-300">
                {block.children?.map((child: any, cIdx: number) => child.text || '').join('')}
              </blockquote>
            )
          }
          return null
        })}
      </div>
    )
  }
  return <div>{String(content)}</div>
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  const post = await getBlogPostBySlug(slug, isPreview)

  if (!post) {
    notFound()
  }

  if (!isPreview && post.status !== 'published') {
    notFound()
  }

  const getPostImage = () => {
    if (typeof post.coverImage === 'object' && post.coverImage?.url) {
      return post.coverImage.url
    }
    const categoryImages: Record<string, string> = {
      Mentalidade: '/blog/notopo.jpg',
      Coragem: '/blog/marionete.jpg',
      'Inteligência Emocional': '/blog/golias.webp',
      'Decisões Financeiras': '/blog/segurandodin.jpg',
    }
    const category = post.category || 'Mentalidade'
    return categoryImages[category] || '/blog/notopo.jpg'
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    } catch {
      return dateString
    }
  }

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-zinc-950 text-white">
        {isPreview && (
          <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm font-medium">
              🔴 Modo Preview - Você está visualizando uma versão não publicada
            </p>
          </div>
        )}

        <SiteHeader showInicio={true} />

        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Link href="/blog" className="text-yellow-400 hover:text-yellow-500 mb-6 inline-flex items-center gap-2 transition-colors">
            <ArrowLeft size={16} />
            Voltar para o blog
          </Link>

          {getPostImage() && (
            <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
              <Image src={getPostImage()} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} className="text-yellow-400" />
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                {post.category || 'Mentalidade'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 mb-6">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              )}
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readingTime} min de leitura</span>
                </div>
              )}
            </div>

            {post.excerpt && (
              <div className="text-xl text-zinc-300 mb-8 italic leading-relaxed">{post.excerpt}</div>
            )}
          </header>

          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed">
            {renderRichText(post.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link href="/blog" className="text-yellow-400 hover:text-yellow-500 inline-flex items-center gap-2 transition-colors">
              <ArrowLeft size={16} />
              Voltar ao blog
            </Link>
          </div>
        </article>

        <Footer />
        <WhatsAppButton source={post.title} />
      </div>
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt || '',
    keywords: post.seo?.keywords || post.category || '',
  }
}

export async function generateStaticParams() {
  try {
    const { getBlogPosts } = await import('@/lib/payload/client')
    const posts = await getBlogPosts()
    return posts.map((post: any) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
