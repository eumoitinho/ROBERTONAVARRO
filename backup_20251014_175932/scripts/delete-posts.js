// Script para deletar todos os posts antes de recriar com schema correto
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sku3NuSJsrRD4behyaUUkiddYZeUT37ei1qVx0arD76Qqu9yIYPHvNqlU79xvbsssQogmBKz4mvNZbAUIJZ5bDVls2PRWltMs6K3gzh1iD9mS5s71rusuacKm8EPZwo85XfP1ALeZ0BPbKk1J3H5nLNAWhA4fYh40md9Cf5mWFUALqu6gFIY',
  useCdn: false
})

async function deletePosts() {
  console.log('🗑️ Deletando todos os posts antigos...')
  
  try {
    // Deletar todos os posts
    await client
      .delete({query: '*[_type == "post"]'})
    
    console.log('✅ Posts antigos deletados!')
    
    // Deletar todas as categorias antigas também
    await client
      .delete({query: '*[_type == "category"]'})
      
    console.log('✅ Categorias antigas deletadas!')
    
  } catch (error) {
    console.error('❌ Erro ao deletar posts:', error)
  }
}

deletePosts()