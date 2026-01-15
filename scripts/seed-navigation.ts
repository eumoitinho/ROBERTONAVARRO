import { getPayloadClient } from '@/lib/payload/client'
import { seedNavigation } from '../seed/navigation'

async function run() {
  const payload = await getPayloadClient()
  await seedNavigation(payload)
  process.exit(0)
}

run().catch((error) => {
  console.error('❌ Erro ao atualizar navegação:', error)
  process.exit(1)
})
