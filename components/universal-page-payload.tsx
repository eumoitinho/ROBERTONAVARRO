'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { ArrowRight } from 'lucide-react'
import type React from 'react'

interface UniversalPagePayloadProps {
  page: any
}

// Helper para renderizar rich text do Payload
const renderRichText = (content: any): React.ReactNode => {
  if (!content) return null
  
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }
  
  if (Array.isArray(content)) {
    return (
      <div className="prose prose-invert prose-yellow max-w-none">
        {content.map((block: any, idx: number) => {
          if (block.type === 'p') {
            return (
              <p key={idx} className="mb-4 text-zinc-300">
                {block.children?.map((child: any, cIdx: number) => {
                  if (child.bold) {
                    return <strong key={cIdx}>{child.text || ''}</strong>
                  }
                  if (child.italic) {
                    return <em key={cIdx}>{child.text || ''}</em>
                  }
                  if (child.underline) {
                    return <u key={cIdx}>{child.text || ''}</u>
                  }
                  return <span key={cIdx}>{child.text || ''}</span>
                })}
              </p>
            )
          }
          if (block.type === 'h1') {
            return (
              <h1 key={idx} className="text-4xl md:text-5xl font-bold mb-6 mt-12 text-yellow-400">
                {block.children?.map((child: any) => child.text || '').join('')}
              </h1>
            )
          }
          if (block.type === 'h2') {
            return (
              <h2 key={idx} className="text-3xl md:text-4xl font-bold mb-4 mt-10 text-yellow-400">
                {block.children?.map((child: any) => child.text || '').join('')}
              </h2>
            )
          }
          if (block.type === 'h3') {
            return (
              <h3 key={idx} className="text-2xl md:text-3xl font-bold mb-3 mt-8 text-yellow-400">
                {block.children?.map((child: any) => child.text || '').join('')}
              </h3>
            )
          }
          if (block.type === 'ul') {
            return (
              <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-zinc-300">
                {block.children?.map((item: any, iIdx: number) => (
                  <li key={iIdx}>
                    {item.children?.map((child: any) => child.text || '').join('')}
                  </li>
                ))}
              </ul>
            )
          }
          if (block.type === 'ol') {
            return (
              <ol key={idx} className="list-decimal list-inside space-y-2 my-4 text-zinc-300">
                {block.children?.map((item: any, iIdx: number) => (
                  <li key={iIdx}>
                    {item.children?.map((child: any) => child.text || '').join('')}
                  </li>
                ))}
              </ol>
            )
          }
          return null
        })}
      </div>
    )
  }
  
  return <div>{String(content)}</div>
}

export default function UniversalPagePayload({ page }: UniversalPagePayloadProps) {
  const showHeader = page.settings?.showHeader !== false
  const showFooter = page.settings?.showFooter !== false
  const showWhatsApp = page.settings?.showWhatsAppButton !== false

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {showHeader && <SiteHeader showInicio={true} />}
      
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          {page.hero && (
            <div className="mb-12">
              {page.hero.title && (
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
                  {page.hero.title}
                </h1>
              )}
              {page.hero.subtitle && (
                <p className="text-xl text-zinc-300 mb-6">
                  {page.hero.subtitle}
                </p>
              )}
              {page.hero.backgroundImage && typeof page.hero.backgroundImage === 'object' && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                  <Image
                    src={page.hero.backgroundImage.url || ''}
                    alt={page.hero.backgroundImage.alt || page.hero.title || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Content */}
          {page.content && (
            <div className="mb-12">
              {renderRichText(page.content)}
            </div>
          )}

          {/* Sections */}
          {page.sections && page.sections.length > 0 && (
            <div className="mt-12 space-y-12">
              {page.sections.map((section: any, index: number) => (
                <div key={index} className="border-t border-zinc-800 pt-8">
                  {section.type === 'text' && section.content && (
                    <div className="prose prose-invert max-w-none">
                      {renderRichText(section.content)}
                    </div>
                  )}
                  {section.type === 'image' && section.content && (
                    <div className="my-8">
                      {renderRichText(section.content)}
                    </div>
                  )}
                  {section.type === 'video' && section.content && (
                    <div className="my-8">
                      {renderRichText(section.content)}
                    </div>
                  )}
                  {section.type === 'cta' && section.content && (
                    <div className="my-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      {renderRichText(section.content)}
                    </div>
                  )}
                  {section.type === 'grid' && section.content && (
                    <div className="my-8 grid md:grid-cols-2 gap-6">
                      {renderRichText(section.content)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Form Section */}
          {page.layout === 'form' && page.form && (
            <div className="mt-12 p-8 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                {page.title}
              </h2>
              <p className="text-zinc-400 mb-6">
                Formulário: {page.form.formId || 'Não configurado'}
              </p>
              {/* Aqui você pode integrar com o componente de formulário */}
            </div>
          )}
        </div>
      </main>
      
      {showFooter && <Footer accent="yellow" />}
      {showWhatsApp && <WhatsAppButton source={page.title || 'Página'} />}
    </div>
  )
}

