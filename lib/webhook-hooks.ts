import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { triggerWebhooks } from './webhooks'

/**
 * Cria um hook para disparar webhooks após mudanças
 * @param collectionSlug - Slug da collection (ex: 'eventos', 'formacoes')
 */
export function createWebhookAfterChangeHook(collectionSlug: string): CollectionAfterChangeHook {
  return async ({ doc, operation, req }) => {
    if (!req.payload) return doc

    // Disparar webhook para afterChange
    triggerWebhooks(req.payload, collectionSlug, 'afterChange' as const, operation, doc).catch(
      (error) => {
        console.error(`Erro ao disparar webhook afterChange para ${collectionSlug}:`, error)
      }
    )

    // Disparar webhook específico para create ou update
    if (operation === 'create') {
      triggerWebhooks(req.payload, collectionSlug, 'afterCreate' as const, operation, doc).catch(
        (error) => {
          console.error(`Erro ao disparar webhook afterCreate para ${collectionSlug}:`, error)
        }
      )
    } else if (operation === 'update') {
      triggerWebhooks(req.payload, collectionSlug, 'afterUpdate' as const, operation, doc).catch(
        (error) => {
          console.error(`Erro ao disparar webhook afterUpdate para ${collectionSlug}:`, error)
        }
      )
    }

    return doc
  }
}

/**
 * Cria um hook para disparar webhooks após delete
 * @param collectionSlug - Slug da collection (ex: 'eventos', 'formacoes')
 */
export function createWebhookAfterDeleteHook(collectionSlug: string): CollectionAfterDeleteHook {
  return async ({ doc, req }) => {
    if (!req.payload) return

    // Disparar webhook para afterDelete
    triggerWebhooks(req.payload, collectionSlug, 'afterDelete' as const, 'delete', doc).catch(
      (error) => {
        console.error(`Erro ao disparar webhook afterDelete para ${collectionSlug}:`, error)
      }
    )
  }
}

