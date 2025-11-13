import crypto from 'crypto'
import type { Payload } from 'payload'

/**
 * Executa um webhook configurado
 */
export async function executeWebhook(
  payload: Payload,
  webhookId: string,
  event: string,
  collection: string,
  data: any,
  operation: 'create' | 'update' | 'delete'
): Promise<void> {
  try {
    // Buscar webhook no banco
    const webhook = await payload.findByID({
      collection: 'webhooks',
      id: webhookId,
    })

    // Verificar se webhook está habilitado
    if (!webhook.enabled) {
      return
    }

    // Verificar se o evento está na lista de eventos configurados
    if (!webhook.events || !webhook.events.includes(event)) {
      return
    }

    // Verificar se a collection corresponde
    if (webhook.collection !== collection) {
      return
    }

    // Preparar payload do webhook
    const webhookPayload = {
      event,
      operation,
      collection,
      data,
      timestamp: new Date().toISOString(),
      webhookId: webhook.id,
      webhookName: webhook.name,
    }

    // Preparar headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'PayloadCMS-Webhook/1.0',
      'X-Webhook-Event': event,
      'X-Webhook-Collection': collection,
      'X-Webhook-Operation': operation,
    }

    // Adicionar headers customizados
    if (webhook.headers && Array.isArray(webhook.headers)) {
      webhook.headers.forEach((header: { key: string; value: string }) => {
        headers[header.key] = header.value
      })
    }

    // Assinar payload se secret estiver configurado
    if (webhook.secret) {
      const signature = crypto
        .createHmac('sha256', webhook.secret)
        .update(JSON.stringify(webhookPayload))
        .digest('hex')
      headers['X-Webhook-Signature'] = signature
    }

    // Executar webhook
    const timeout = (webhook.timeout || 10) * 1000
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(webhook.url, {
        method: webhook.method || 'POST',
        headers,
        body: JSON.stringify(webhookPayload),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Atualizar status do webhook
      await payload.update({
        collection: 'webhooks',
        id: webhook.id,
        data: {
          lastTriggered: new Date().toISOString(),
          lastStatus: response.ok ? 'success' : 'error',
          lastResponse: response.ok
            ? `Status: ${response.status}`
            : `Erro: ${response.status} - ${await response.text().catch(() => 'Sem resposta')}`,
        },
      })

      if (!response.ok) {
        console.error(
          `⚠️ Webhook "${webhook.name}" retornou status ${response.status}:`,
          await response.text().catch(() => '')
        )
      } else {
        console.log(`✅ Webhook "${webhook.name}" executado com sucesso`)
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId)

      const errorMessage =
        fetchError.name === 'AbortError'
          ? `Timeout após ${timeout}ms`
          : fetchError.message

      // Atualizar status do webhook
      await payload.update({
        collection: 'webhooks',
        id: webhook.id,
        data: {
          lastTriggered: new Date().toISOString(),
          lastStatus: fetchError.name === 'AbortError' ? 'timeout' : 'error',
          lastResponse: `Erro: ${errorMessage}`,
        },
      })

      console.error(`❌ Erro ao executar webhook "${webhook.name}":`, errorMessage)

      // Tentar novamente se configurado
      if (webhook.retryOnFailure && webhook.maxRetries) {
        // Implementar lógica de retry aqui se necessário
        // Por enquanto, apenas logamos o erro
      }
    }
  } catch (error) {
    console.error(`❌ Erro ao processar webhook ${webhookId}:`, error)
  }
}

/**
 * Busca todos os webhooks ativos para uma collection e evento específicos
 */
export async function getActiveWebhooks(
  payload: Payload,
  collection: string,
  event: string
): Promise<any[]> {
  try {
    const result = await payload.find({
      collection: 'webhooks',
      where: {
        and: [
          { enabled: { equals: true } },
          { collection: { equals: collection } },
          { events: { contains: event } },
        ],
      },
    })

    return result.docs || []
  } catch (error) {
    console.error('Erro ao buscar webhooks:', error)
    return []
  }
}

/**
 * Dispara webhooks para um evento específico
 */
export async function triggerWebhooks(
  payload: Payload,
  collection: string,
  event: string,
  operation: 'create' | 'update' | 'delete',
  data: any
): Promise<void> {
  const webhooks = await getActiveWebhooks(payload, collection, event)

  // Executar webhooks em paralelo (sem aguardar)
  webhooks.forEach((webhook) => {
    executeWebhook(payload, webhook.id, event, collection, data, operation).catch(
      (error) => {
        console.error(`Erro ao executar webhook ${webhook.id}:`, error)
      }
    )
  })
}

