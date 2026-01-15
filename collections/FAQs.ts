import type { CollectionConfig } from 'payload'
import { createWebhookAfterChangeHook, createWebhookAfterDeleteHook } from '../lib/webhook-hooks'

const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Conteúdo',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Pergunta',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      label: 'Resposta',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Formação', value: 'formacao' },
        { label: 'Evento', value: 'evento' },
        { label: 'Livro', value: 'livro' },
        { label: 'Pagamento', value: 'pagamento' },
        { label: 'Certificação', value: 'certificacao' },
        { label: 'Geral', value: 'geral' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem',
      admin: {
        description: 'Ordem de exibição (menor = primeiro)',
      },
    },
  ],
  hooks: {
    afterChange: [createWebhookAfterChangeHook('faqs')],
    afterDelete: [createWebhookAfterDeleteHook('faqs')],
  },
}

export default FAQs
