'use client'

import { useEffect } from 'react'
import { getUTMParameters } from '@/lib/utils'

/**
 * Componente que captura e persiste parâmetros UTM automaticamente
 * ao carregar qualquer página do site
 */
export function UTMTracker() {
  useEffect(() => {
    // Inicializar captura de UTMs ao montar o componente
    getUTMParameters()
    
    // Log para debug (remover em produção se necessário)
    if (process.env.NODE_ENV === 'development') {
      const utms = getUTMParameters()
      const hasUtms = Object.values(utms).some(v => v !== undefined)
      if (hasUtms) {
        console.log('UTMs capturados:', utms)
      }
    }
  }, [])

  // Componente não renderiza nada visualmente
  return null
}

