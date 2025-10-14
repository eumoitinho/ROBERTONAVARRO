// Script para deletar posts e categorias na ordem correta
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sku3NuSJsrRD4behyaUUkiddYZeUT37ei1qVx0arD76Qqu9yIYPHvNqlU79xvbsssQogmBKz4mvNZbAUIJZ5bDVls2PRWltMs6K3gzh1iD9mS5s71rusuacKm8EPZwo85XfP1ALeZ0BPbKk1J3H5nLNAWhA4fYh40md9Cf5mWFUALqu6gFIY',
  useCdn: false
})

async function deleteEverything() {
  console.log('🗑️ Deletando tudo na ordem correta...')
  
  try {
    // Primeiro deletar blogPosts
    console.log('Deletando posts...')
    await client.delete({query: '*[_type == "blogPost"]'})
    console.log('✅ Posts deletados!')
    
    // Depois deletar categorias
    console.log('Deletando categorias...')
    await client.delete({query: '*[_type == "category"]'})
    console.log('✅ Categorias deletadas!')
    
  } catch (error) {
    console.error('❌ Erro:', error)
  }
}

deleteEverything()