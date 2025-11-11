/**
 * Servidor standalone do Payload (opcional)
 * 
 * NOTA: Com Payload 3.x e Next.js, geralmente não é necessário este servidor,
 * pois o Payload é integrado ao Next.js através do withPayload no next.config.js
 * 
 * Use este arquivo apenas se precisar rodar o Payload standalone sem Next.js
 */

import express from 'express'
import { getPayload } from 'payload'
import configPromise from './payload.config'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Payload
const start = async () => {
  const payload = await getPayload({
    config: await configPromise,
  })

  // Middleware do Payload
  app.use(payload.router)

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📦 Admin panel: http://localhost:${PORT}/admin`)
  })
}

start().catch((error) => {
  console.error('Error starting server:', error)
  process.exit(1)
})
