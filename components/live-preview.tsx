'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Componente para Live Preview do Payload CMS
 * Escuta mensagens do admin do Payload e atualiza a página automaticamente
 *
 * Uso:
 * import LivePreview from '@/components/live-preview'
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <LivePreview />
 *       <div>Seu conteúdo aqui</div>
 *     </>
 *   )
 * }
 */
export default function LivePreview() {
  const router = useRouter()
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Verificar se está em modo preview
    const isPreview = typeof window !== 'undefined' &&
                     (window.location.search.includes('preview=true') ||
                      window.location.search.includes('live_preview=true'))

    if (!isPreview) {
      return
    }

    console.log('🔴 Live Preview: Componente ativado')

    // Função para atualizar a página (com debounce)
    const refreshPage = () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
      refreshTimeoutRef.current = setTimeout(() => {
        console.log('🔄 Live Preview: Atualizando página...')
        router.refresh()
      }, 300) // Debounce de 300ms
    }

    // Escutar mensagens do Payload admin
    const handleMessage = (event: MessageEvent) => {
      // Log todas as mensagens para debug
      if (event.data && typeof event.data === 'object') {
        console.log('📨 Live Preview: Mensagem recebida', {
          type: event.data.type,
          message: event.data.message,
          event: event.data.event,
          data: event.data,
          origin: event.origin,
        })
      }

      // Aceitar mensagens de qualquer origem (iframe do admin)
      // O Payload admin envia mensagens do mesmo origin quando está em preview
      
      // Tipos de mensagens do Payload Live Preview (várias possibilidades)
      const payloadMessageTypes = [
        'payload-live-preview',
        'payload-save',
        'payload-change',
        'payload-saved',
        'payload-updated',
        'payload-document-saved',
        'payload-document-updated',
        'payload-field-changed',
      ]

      // Verificar se é uma mensagem do Payload
      const isPayloadMessage = 
        (event.data?.type && payloadMessageTypes.includes(event.data.type)) ||
        (event.data?.message && payloadMessageTypes.includes(event.data.message)) ||
        (event.data?.event && payloadMessageTypes.includes(event.data.event)) ||
        event.data?.type?.startsWith('payload-') ||
        event.data?.message?.startsWith('payload-') ||
        event.data?.event?.startsWith('payload-')

      if (isPayloadMessage) {
        console.log('✅ Live Preview: Mensagem do Payload detectada!', event.data)
        refreshPage()
        return
      }

      // Também escutar eventos genéricos de mudança
      if (event.data?.event === 'save' || 
          event.data?.event === 'update' ||
          event.data?.event === 'change' ||
          event.data?.type === 'save' ||
          event.data?.type === 'update' ||
          event.data?.type === 'change') {
        console.log('✅ Live Preview: Evento genérico detectado', event.data)
        refreshPage()
      }
    }

    window.addEventListener('message', handleMessage, false)

    // Notificar o admin que a página está pronta
    if (window.parent && window.parent !== window) {
      console.log('📤 Live Preview: Enviando mensagem de ready para parent')
      
      // Enviar mensagem para o parent (iframe do admin)
      const readyMessage = {
        type: 'payload-live-preview-ready',
        message: 'payload-live-preview-ready',
        origin: window.location.origin,
        url: window.location.href,
      }
      
      window.parent.postMessage(readyMessage, '*')
      
      // Também tentar enviar para o mesmo origin
      window.parent.postMessage(readyMessage, window.location.origin)
      
      // Enviar periodicamente para garantir que o admin recebe
      const readyInterval = setInterval(() => {
        window.parent.postMessage(readyMessage, '*')
      }, 2000)

      return () => {
        clearInterval(readyInterval)
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current)
        }
        window.removeEventListener('message', handleMessage)
      }
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
      window.removeEventListener('message', handleMessage)
    }
  }, [router])

  return null
}

/**
 * Hook para usar dados do Live Preview
 * Retorna os dados atualizados em tempo real quando em modo preview
 */
export function useLivePreview<T = any>(initialData: T): T {
  const [data, setData] = useState<T>(initialData)
  const router = useRouter()

  useEffect(() => {
    const isPreview = typeof window !== 'undefined' && 
                     window.location.search.includes('preview=true')

    if (!isPreview) {
      return
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return
      }

      // Quando o Payload envia dados atualizados
      if (event.data?.type === 'payload-live-preview-data' && event.data?.data) {
        setData(event.data.data)
      }

      // Ou atualizar a página para buscar novos dados
      if (event.data?.type === 'payload-live-preview') {
        router.refresh()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [router])

  return data
}

