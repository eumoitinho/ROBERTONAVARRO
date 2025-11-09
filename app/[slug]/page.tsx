import React from 'react'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/payload/client'
import { Metadata } from 'next'
import Image from 'next/image'
import HeroPages from '@/components/hero-pages'
import HeroPagesRed from '@/components/hero-pages-red'

// Helper para renderizar richText do Payload (Slate format)
function renderRichText(content: any): React.ReactNode {
  if (!content || !Array.isArray(content)) return null

  return content.map((node: any, index: number) => {
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-4 text-gray-300 leading-relaxed">
          {node.children?.map((child: any, childIndex: number) => {
            if (child.bold) {
              return <strong key={childIndex} className="font-semibold text-white">{child.text}</strong>
            }
            if (child.italic) {
              return <em key={childIndex} className="italic">{child.text}</em>
            }
            if (child.underline) {
              return <u key={childIndex}>{child.text}</u>
            }
            if (child.linkType) {
              return (
                <a
                  key={childIndex}
                  href={child.url}
                  target={child.newTab ? '_blank' : '_self'}
                  rel={child.newTab ? 'noopener noreferrer' : undefined}
                  className="text-yellow-500 hover:text-yellow-400 underline"
                >
                  {child.text}
                </a>
              )
            }
            return <span key={childIndex}>{child.text}</span>
          })}
        </p>
      )
    }

    if (node.type === 'heading') {
      const HeadingTag = `h${node.depth || 2}` as keyof JSX.IntrinsicElements
      return (
        <HeadingTag key={index} className={`mb-4 font-bold text-white ${node.depth === 1 ? 'text-4xl' : node.depth === 2 ? 'text-3xl' : 'text-2xl'}`}>
          {node.children?.map((child: any, childIndex: number) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </HeadingTag>
      )
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className={`mb-4 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'} pl-6 space-y-2 text-gray-300`}>
          {node.children?.map((item: any, itemIndex: number) => (
            <li key={itemIndex}>
              {item.children?.map((child: any, childIndex: number) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </li>
          ))}
        </ListTag>
      )
    }

    if (node.type === 'blockquote') {
      return (
        <blockquote key={index} className="border-l-4 border-yellow-500 pl-4 my-4 italic text-gray-400">
          {node.children?.map((child: any, childIndex: number) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </blockquote>
      )
    }

    return null
  })
}

export async function generateStaticParams() {
  try {
    const { getPayloadClient } = await import('@/lib/payload/client')
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 100,
    })
    return result.docs.map((page: any) => ({
      slug: page.slug,
    }))
  } catch (error) {
    // Se houver erro (ex: Payload não inicializado, sem páginas), retornar array vazio
    // Isso permite que a página seja renderizada dinamicamente
    console.error('Error generating static params (falling back to dynamic):', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const page = await getPageBySlug(params.slug)

    if (!page) {
      return {
        title: 'Página não encontrada',
      }
    }

    return {
      title: page.seo?.title || page.title,
      description: page.seo?.description || undefined,
      keywords: page.seo?.keywords || undefined,
      openGraph: {
        title: page.seo?.title || page.title,
        description: page.seo?.description || undefined,
        images: page.seo?.ogImage && typeof page.seo.ogImage === 'object' && 'url' in page.seo.ogImage
          ? [{ url: String(page.seo.ogImage.url) }]
          : undefined,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Página',
    }
  }
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  try {
    console.log(`[DynamicPage] Buscando página com slug: ${params.slug}`)
    const page = await getPageBySlug(params.slug)

    if (!page) {
      console.log(`[DynamicPage] Página não encontrada para slug: ${params.slug}`)
      notFound()
    }
    
    console.log(`[DynamicPage] Página encontrada: ${page.title}`)

  const layout = page.layout || 'default'
  const hero = page.hero

  // Renderizar hero baseado no layout
  const renderHero = () => {
    if (!hero) return null

    const heroImage =
      hero.backgroundImage && typeof hero.backgroundImage === 'object' && 'url' in hero.backgroundImage
        ? String(hero.backgroundImage.url)
        : undefined

    if (layout === 'hero-red') {
      return (
        <HeroPagesRed
          title={hero.title || page.title}
          secondtitle={hero.subtitle || ''}
          subtitle={hero.subtitle || undefined}
          image={heroImage}
        />
      )
    }

    return (
      <HeroPages
        title={hero.title || page.title}
        secondtitle={hero.subtitle || ''}
        subtitle={hero.subtitle || undefined}
        image={heroImage}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {renderHero()}

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {layout !== 'hero-red' && layout !== 'hero-image' && (
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{page.title}</h1>
            {hero?.subtitle && (
              <p className="text-xl text-gray-300">{hero.subtitle}</p>
            )}
          </header>
        )}

        {page.content && (
          <div className="prose prose-lg prose-invert max-w-none mb-8">
            {renderRichText(page.content)}
          </div>
        )}

        {page.sections && page.sections.length > 0 && (
          <div className="space-y-12">
            {page.sections.map((section: any, index: number) => (
              <section key={index} className="py-8">
              {section.type === 'text' && section.content && (
                <div className="prose prose-lg prose-invert max-w-none">
                  {renderRichText(section.content)}
                </div>
              )}

              {section.type === 'image' && section.image && (
                <div className="relative w-full h-96 mb-4">
                  <Image
                    src={
                      typeof section.image === 'object' && 'url' in section.image
                        ? String(section.image.url)
                        : String(section.image)
                    }
                    alt={section.alt || ''}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}

              {section.type === 'video' && section.videoUrl && (
                <div className="aspect-video mb-4">
                  <iframe
                    src={String(section.videoUrl)}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {section.type === 'cta' && (
                <div className="bg-yellow-500 text-black p-8 rounded-lg text-center">
                  {section.title && (
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  )}
                  {section.content && (
                    <div className="mb-6">{renderRichText(section.content)}</div>
                  )}
                  {section.buttonText && section.buttonLink && (
                    <a
                      href={String(section.buttonLink)}
                      className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      {section.buttonText}
                    </a>
                  )}
                </div>
              )}
            </section>
            ))}
          </div>
        )}

        {layout === 'form' && page.form && (
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Formulário</h2>
            <p className="text-gray-300 mb-6">
              {page.form.formId
                ? `Formulário ID: ${page.form.formId}`
                : 'Configure o formulário no CMS'}
            </p>
            {page.form.successMessage && (
              <p className="text-green-400">{page.form.successMessage}</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
  } catch (error: any) {
    console.error('Error loading page:', error)
    // Se for erro de Payload não inicializado, mostrar mensagem amigável
    if (error?.message?.includes('getPayload') || error?.message?.includes('Payload')) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Erro ao carregar página</h1>
            <p className="text-gray-300 mb-4">O Payload CMS não está disponível no momento.</p>
            <p className="text-sm text-gray-500">Verifique se o servidor Payload está rodando.</p>
          </div>
        </div>
      )
    }
    notFound()
  }
}
