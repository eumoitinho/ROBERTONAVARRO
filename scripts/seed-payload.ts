#!/usr/bin/env tsx
import dotenv from 'dotenv'
import { seedAll } from '../seed/index'

// Carregar variáveis de ambiente
dotenv.config()

seedAll()
  .then(() => {
    console.log('✅ Seed concluído com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro no seed:', error)
    process.exit(1)
  })

