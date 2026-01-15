import type { CollectionConfig } from 'payload'
import { createWebhookAfterChangeHook, createWebhookAfterDeleteHook } from '../lib/webhook-hooks'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Mídia',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto Alternativo',
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Legenda',
    },
  ],
  hooks: {
    afterChange: [createWebhookAfterChangeHook('media')],
    afterDelete: [createWebhookAfterDeleteHook('media')],
  },
}

export default Media
