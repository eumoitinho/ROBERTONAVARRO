// Importar stub PRIMEIRO, antes de qualquer coisa
import './scripts/setup-scss-stub'

import dotenv from 'dotenv'
import express from 'express'
import payload from 'payload'
import adminConfig from './payload.admin.config'

dotenv.config()

const app = express()

// Middleware básico do Express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Usar porta diferente do Next.js para evitar conflito
const PORT = process.env.PAYLOAD_PORT || process.env.PORT || 3002

// Initialize Payload
const start = async () => {
  try {
    await payload.init({
      config: adminConfig,
      secret: process.env.PAYLOAD_SECRET!,
      express: app,
      onInit: async () => {
        // getAdminURL pode retornar URL completa ou path
        // Vamos sempre construir a URL corretamente com a porta atual
        const adminPath = payload.getAdminURL()
        const adminPathOnly = adminPath.startsWith('http') 
          ? new URL(adminPath).pathname 
          : adminPath
        
        const adminURL = `http://localhost:${PORT}${adminPathOnly}`
        
        payload.logger.info(`Payload Admin URL: ${adminURL}`)
        
        // Iniciar servidor após Payload estar totalmente inicializado
        app.listen(PORT, () => {
          console.log(`🚀 Server running on http://localhost:${PORT}`)
          console.log(`📦 Admin panel: ${adminURL}`)
          console.log(`\n⚠️  Se o admin não carregar, aguarde alguns segundos para o webpack terminar de compilar.`)
        })
      },
    })
  } catch (error: any) {
    console.error('❌ Erro ao inicializar Payload:', error?.message || error)
    process.exit(1)
  }
}

start()
