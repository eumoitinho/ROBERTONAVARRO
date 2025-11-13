import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { triggerWebhooks } from './webhooks'

/**
 * Hook para disparar webhooks após mudanças (create/update)
 */
export const webhookAfterChangeHook: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (!req.payload) return doc

  const collection = req.collection?.config?.slug
  if (!collection) return doc

  // Disparar webhook para afterChange
  triggerWebhooks(req.payload, collection, 'afterChange', operation, doc).catch(
    (error) => {
      console.error(`Erro ao disparar webhook afterChange para ${collection}:`, error)
    }
  )

  // Disparar webhook específico para create ou update
  if (operation === 'create') {
    triggerWebhooks(req.payload, collection, 'afterCreate', operation, doc).catch(
      (error) => {
        console.error(`Erro ao disparar webhook afterCreate para ${collection}:`, error)
      }
    )
  } else if (operation === 'update') {
    triggerWebhooks(req.payload, collection, 'afterUpdate', operation, doc).catch(
      (error) => {
        console.error(`Erro ao disparar webhook afterUpdate para ${collection}:`, error)
      }
    )
  }

  return doc
}

/**
 * Hook para disparar webhooks após delete
 */
export const webhookAfterDeleteHook: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  if (!req.payload) return

  const collection = req.collection?.config?.slug
  if (!collection) return

  // Disparar webhook para afterDelete
  triggerWebhooks(req.payload, collection, 'afterDelete', 'delete', doc).catch(
    (error) => {
      console.error(`Erro ao disparar webhook afterDelete para ${collection}:`, error)
    }
  )
}

