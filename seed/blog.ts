import { fallbackBlogPosts } from '@/lib/blog/fallback-data'
import { htmlToRichText } from './helpers/html-to-richtext'

export async function seedBlog(payload: any) {
  console.log('📝 Populando Blog...')

  const createOrUpdatePost = async (post: any) => {
    const existing = await payload.find({
      collection: 'blog',
      where: {
        slug: {
          equals: post.slug,
        },
      },
      limit: 1,
    })

    // Converter HTML para richText
    const content = htmlToRichText(post.content?.html || post.content || '')

    const postData: any = {
      title: post._title || post.title,
      slug: post.slug,
      status: 'published',
      excerpt: post.excerpt || '',
      content: content.length > 0 ? content : [
        {
          type: 'p',
          children: [
            {
              text: post.excerpt || '',
            },
          ],
        },
      ],
      author: post.author || 'Roberto Navarro',
      category: post.category || 'Mentalidade',
      publishedAt: post.publishedAt || new Date().toISOString(),
      readingTime: post.readingTime || 5,
      seo: {
        title: post._title || post.title,
        description: post.excerpt || '',
        keywords: post.category || '',
      },
    }

    if (existing.docs.length > 0) {
      console.log(`⚠️  Post "${postData.title}" já existe, atualizando...`)
      try {
        return await payload.update({
          collection: 'blog',
          id: existing.docs[0].id,
          data: postData,
        })
      } catch (error: any) {
        console.error(`❌ Erro ao atualizar post "${postData.title}":`, error.message)
        throw error
      }
    } else {
      console.log(`✅ Criando post "${postData.title}"...`)
      return await payload.create({
        collection: 'blog',
        data: postData,
      })
    }
  }

  const results = []
  for (const post of fallbackBlogPosts) {
    try {
      const result = await createOrUpdatePost(post)
      results.push(result)
    } catch (error: any) {
      console.error(`❌ Erro ao processar post "${post._title || (post as any).title}":`, error.message)
    }
  }

  console.log(`✅ ${results.length} posts do blog processados`)

  return results
}

