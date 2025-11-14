import { getPayload } from 'payload'
import config from '../payload.config'

async function testWebhooks() {
  const payload = await getPayload({ config })
  
  console.log('🧪 Testando webhooks...\n')
  
  // Criar um evento de teste
  const evento = await payload.create({
    collection: 'eventos',
    data: {
      title: 'Evento de Teste Webhook',
      slug: 'evento-teste-webhook-' + Date.now(),
      status: 'published',
      date: new Date().toISOString(),
      hero: {
        title: 'Teste',
        subtitle: 'Testando webhooks',
      },
    },
  })
  
  console.log('✅ Evento criado:', evento.id)
  console.log('📨 Webhooks devem ter sido disparados!\n')
  
  // Aguardar um pouco
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Atualizar o evento
  await payload.update({
    collection: 'eventos',
    id: evento.id,
    data: {
      title: 'Evento de Teste Webhook - Atualizado',
    },
  })
  
  console.log('✅ Evento atualizado')
  console.log('📨 Webhooks devem ter sido disparados novamente!\n')
  
  // Aguardar um pouco
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Deletar o evento
  await payload.delete({
    collection: 'eventos',
    id: evento.id,
  })
  
  console.log('✅ Evento deletado')
  console.log('📨 Webhook de delete deve ter sido disparado!\n')
  
  console.log('✨ Teste completo! Verifique seus webhooks.')
  process.exit(0)
}

testWebhooks().catch((error) => {
  console.error('❌ Erro:', error)
  process.exit(1)
})
