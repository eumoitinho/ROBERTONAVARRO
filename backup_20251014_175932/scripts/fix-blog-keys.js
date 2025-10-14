// Script para corrigir as chaves dos posts do blog
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sku3NuSJsrRD4behyaUUkiddYZeUT37ei1qVx0arD76Qqu9yIYPHvNqlU79xvbsssQogmBKz4mvNZbAUIJZ5bDVls2PRWltMs6K3gzh1iD9mS5s71rusuacKm8EPZwo85XfP1ALeZ0BPbKk1J3H5nLNAWhA4fYh40md9Cf5mWFUALqu6gFIY',
  useCdn: false
})

async function fixBlogPosts() {
  console.log('🔧 Corrigindo chaves dos posts...')
  
  try {
    // Buscar todos os posts
    const posts = await client.fetch('*[_type == "blogPost"]')
    
    console.log(`Encontrados ${posts.length} posts para corrigir`)
    
    for (const post of posts) {
      // Corrigir categories array
      const fixedCategories = post.categories?.map((cat, index) => ({
        ...cat,
        _key: `category-${index}`
      })) || []
      
      // Corrigir body array
      const fixedBody = post.body?.map((block, index) => ({
        ...block,
        _key: `block-${index}`,
        children: block.children?.map((child, childIndex) => ({
          ...child,
          _key: `span-${childIndex}`
        })) || []
      })) || []
      
      // Atualizar o post
      await client.patch(post._id).set({
        categories: fixedCategories,
        body: fixedBody
      }).commit()
      
      console.log(`✅ Corrigido: ${post.title}`)
    }
    
    console.log('🎉 Todos os posts foram corrigidos!')
    
  } catch (error) {
    console.error('❌ Erro ao corrigir posts:', error)
  }
}

fixBlogPosts()