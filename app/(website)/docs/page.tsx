import fs from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'

export const metadata: Metadata = {
  title: 'Documentação / Payload Guide',
  description:
    'Guia passo a passo para atualizar o conteúdo do site usando o Payload CMS, com interface alinhada ao design oficial.',
}

export const revalidate = 300

async function getDocsContent() {
  const filePath = path.join(process.cwd(), 'docs', 'payload-content-guide.mdx')
  const source = await fs.readFile(filePath, 'utf-8')

  return compileMDX<{ title?: string; description?: string }>({
    source,
    options: {
      parseFrontmatter: true,
    },
  })
}

export default async function DocsPage() {
  const { content, frontmatter } = await getDocsContent()
  const title = frontmatter?.title ?? 'Documentação'
  const description = frontmatter?.description

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white py-14">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-yellow-400/80">Documentação oficial</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 text-white">{title}</h1>
          {description && <p className="mt-4 text-lg text-zinc-300 max-w-3xl">{description}</p>}
        </div>

        <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-zinc-200 prose-li:text-zinc-200 prose-ol:text-zinc-200 prose-a:text-yellow-300 hover:prose-a:text-yellow-200">
          {content}
        </article>
      </div>
    </div>
  )
}

