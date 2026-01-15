import dotenv from 'dotenv'
import { getPayloadClient } from '../lib/payload/client'
import { seedForms } from '../seed/forms'

dotenv.config()

async function run() {
  try {
    const payload = await getPayloadClient()
    await seedForms(payload)
    console.log('\n✅ Formulários criados com sucesso!')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Erro ao criar formulários:', error)
    process.exit(1)
  }
}

run()
