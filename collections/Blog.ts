import type { CollectionConfig } from 'payload'
import { createWebhookAfterChangeHook, createWebhookAfterDeleteHook } from '../lib/webhook-hooks'

const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    defaultColumns: ['title', 'category', 'author', 'publishedAt', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL amigável (ex: meu-post)',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Arquivado', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumo',
      required: true,
      admin: {
        description: 'Breve descrição do post (aparece na listagem)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Conteúdo',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Imagem de Capa',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Autor',
      defaultValue: 'Roberto Navarro',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Mentalidade', value: 'Mentalidade' },
        { label: 'Coragem', value: 'Coragem' },
        { label: 'Inteligência Emocional', value: 'Inteligência Emocional' },
        { label: 'Decisões Financeiras', value: 'Decisões Financeiras' },
      ],
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data de Publicação',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Tempo de Leitura (minutos)',
      admin: {
        description: 'Tempo estimado de leitura em minutos',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título SEO',
          admin: {
            description: 'Título para SEO (deixe vazio para usar o título do post)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição SEO',
          admin: {
            description: 'Meta description para SEO',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Palavras-chave',
          admin: {
            description: 'Palavras-chave separadas por vírgula',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createWebhookAfterChangeHook('blog')],
    afterDelete: [createWebhookAfterDeleteHook('blog')],
  },
}

export default Blog
