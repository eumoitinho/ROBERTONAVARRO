import type { CollectionConfig } from 'payload'
import { createWebhookAfterChangeHook, createWebhookAfterDeleteHook } from '../lib/webhook-hooks'

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    group: 'Conteúdo',
    defaultColumns: ['name', 'rating', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Cargo/Profissão',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Empresa',
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
    },
    {
      name: 'testimonial',
      type: 'textarea',
      label: 'Depoimento',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Avaliação',
      min: 1,
      max: 5,
      admin: {
        description: 'De 1 a 5 estrelas',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL do Vídeo',
      admin: {
        description: 'YouTube URL ou ID',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque',
      defaultValue: false,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Formação', value: 'formacao' },
        { label: 'Evento', value: 'evento' },
        { label: 'Livro', value: 'livro' },
        { label: 'Geral', value: 'geral' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem',
    },
  ],
  hooks: {
    afterChange: [createWebhookAfterChangeHook('testimonials')],
    afterDelete: [createWebhookAfterDeleteHook('testimonials')],
  },
}

export default Testimonials
