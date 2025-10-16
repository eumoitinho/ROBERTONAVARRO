#!/usr/bin/env node
try {
  const { config } = require('dotenv')
  config({ path: '.env.local' })
  config()
} catch (_) {}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET
const TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-10-01'

if (!PROJECT_ID || !DATASET || !TOKEN) {
  console.error('[populate-blog] Variáveis ausentes: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

// Sample blog posts data (simplified version of fallback data)
const blogPosts = [
  {
    _id: "blogpost-1",
    _title: "Cadê a Sua Versão Milionária? Talvez Falta Coragem, Não Planejamento",
    slug: "cade-sua-versao-milionaria",
    excerpt: "Descubra como crenças limitantes sabotam seus sonhos e aprenda a despertar sua mentalidade milionária com coragem e ação.",
    publishedAt: "2025-06-01T10:00:00Z",
    author: "Roberto Navarro",
    category: "Mentalidade",
    coverImage: {
      url: "/blog/notopo.jpg",
      alt: "Cadê a Sua Versão Milionária? Talvez Falta Coragem, Não Planejamento"
    },
    content: {
      html: "<h2>Cadê a Sua Versão Milionária?</h2><p>Lembra daquela versão sua que sonhava grande? Que planejava conquistar a liberdade financeira e viver com propósito? Onde ela está agora?</p>"
    },
    readingTime: 2
  },
  {
    _id: "blogpost-2",
    _title: "Estabilidade: Segurança ou Armadilha Silenciosa?",
    slug: "estabilidade-preco-alto",
    excerpt: "Entenda como a busca por estabilidade pode estar custando sua liberdade e descubra como recuperar sua coragem para viver plenamente.",
    publishedAt: "2025-06-01T10:00:00Z",
    author: "Roberto Navarro",
    category: "Coragem",
    coverImage: {
      url: "/blog/marionete.jpg",
      alt: "Estabilidade: Segurança ou Armadilha Silenciosa?"
    },
    content: {
      html: "<h2>Estabilidade: Segurança ou Armadilha?</h2><p>Você se sente seguro na sua zona de conforto? Talvez essa \"estabilidade\" que você tanto defende seja apenas medo disfarçado.</p>"
    },
    readingTime: 2
  },
  {
    _id: "blogpost-3",
    _title: "O Segredo para Vencer Desafios: Preparo Emocional",
    slug: "preparo-emocional",
    excerpt: "Sonhos não bastam. Descubra por que o preparo emocional é a chave para superar desafios e alcançar grandes vitórias.",
    publishedAt: "2025-06-01T10:00:00Z",
    author: "Roberto Navarro",
    category: "Inteligência Emocional",
    coverImage: {
      url: "/blog/golias.webp",
      alt: "O Segredo para Vencer Desafios: Preparo Emocional"
    },
    content: {
      html: "<h2>O Segredo para Vencer Desafios</h2><p>Sonhos não bastam. Para conquistar grandes vitórias, você precisa de preparo emocional sólido.</p>"
    },
    readingTime: 3
  }
]

// Convert HTML content to Sanity portable text blocks
function htmlToPortableText(html) {
  if (!html) return []
  
  // Simple conversion - in a real scenario you might want to use a proper HTML parser
  const blocks = []
  
  // Split by HTML tags and convert
  const lines = html.split('\n').filter(line => line.trim())
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    if (trimmed.startsWith('<h2>') && trimmed.endsWith('</h2>')) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{
          _type: 'span',
          text: trimmed.replace(/<\/?h2>/g, '')
        }]
      })
    } else if (trimmed.startsWith('<h3>') && trimmed.endsWith('</h3>')) {
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{
          _type: 'span',
          text: trimmed.replace(/<\/?h3>/g, '')
        }]
      })
    } else if (trimmed.startsWith('<blockquote>')) {
      const content = trimmed.replace(/<\/?blockquote>/g, '').replace(/<\/?p>/g, '')
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        children: [{
          _type: 'span',
          text: content
        }]
      })
    } else if (trimmed.startsWith('<ul>')) {
      // Handle lists - simplified
      continue
    } else if (trimmed.startsWith('<li>')) {
      const content = trimmed.replace(/<\/?li>/g, '')
      blocks.push({
        _type: 'block',
        listItem: 'bullet',
        children: [{
          _type: 'span',
          text: content
        }]
      })
    } else if (trimmed.startsWith('<p>') || trimmed.startsWith('<span class="block mb-2">')) {
      let content = trimmed.replace(/<\/?p>/g, '').replace(/<span class="block mb-2">/g, '').replace(/<\/span>/g, '')
      
      // Handle strong tags
      content = content.replace(/<strong>/g, '').replace(/<\/strong>/g, '')
      content = content.replace(/<em>/g, '').replace(/<\/em>/g, '')
      
      if (content.trim()) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: content
          }]
        })
      }
    } else if (!trimmed.startsWith('<')) {
      // Plain text
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: trimmed
        }]
      })
    }
  }
  
  return blocks
}

async function main() {
  console.log(`[populate-blog] Populando ${blogPosts.length} posts do blog...`)
  
  const mutations = blogPosts.map(post => ({
    createOrReplace: {
      _id: `blogpost-${post.slug}`,
      _type: 'blogPost',
      title: post._title,
      slug: {
        _type: 'slug',
        current: post.slug
      },
      excerpt: post.excerpt,
      content: htmlToPortableText(post.content?.html),
      // coverImage: post.coverImage ? {
      //   _type: 'image',
      //   asset: {
      //     _type: 'reference',
      //     _ref: 'image-' + post._id // We'll need to upload images separately
      //   },
      //   alt: post.coverImage.alt
      // } : undefined,
      author: post.author || 'Roberto Navarro',
      category: post.category,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime || 5,
      featured: false
    }
  }))
  
  console.log(`[populate-blog] Criando ${mutations.length} posts...`)
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 10
  for (let i = 0; i < mutations.length; i += batchSize) {
    const batch = mutations.slice(i, i + batchSize)
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${TOKEN}` 
      },
      body: JSON.stringify({ mutations: batch }),
    })
    
    if (!res.ok) {
      const txt = await res.text()
      console.error(`[populate-blog] Falha no batch ${i}-${i + batchSize}:`, res.status, txt)
      continue
    }
    
    const json = await res.json()
    console.log(`[populate-blog] Batch ${i}-${i + batchSize} criado:`, json.results?.length || 0, 'posts')
    
    // Small delay between batches
    if (i + batchSize < mutations.length) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  console.log('[populate-blog] ✅ Todos os posts foram populados com sucesso!')
}

main().catch((err) => {
  console.error('[populate-blog] Erro inesperado', err)
  process.exit(1)
})
