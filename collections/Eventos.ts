import type { CollectionConfig } from 'payload'
import { createWebhookAfterChangeHook, createWebhookAfterDeleteHook } from '../lib/webhook-hooks'

const Eventos: CollectionConfig = {
  slug: 'eventos',
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    defaultColumns: ['title', 'date', 'status', 'updatedAt'],
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
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Encerrado', value: 'closed' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'accentColor',
      type: 'text',
      label: 'Cor de Destaque',
    },
    {
      name: 'template',
      type: 'select',
      label: 'Template',
      options: [
        { label: 'Padrão', value: 'default' },
        { label: 'Crenças da Riqueza', value: 'crencas-da-riqueza' },
        { label: 'Energia do Dinheiro', value: 'energia-do-dinheiro' },
        { label: 'Segredos da Mente Milionária', value: 'segredos-da-mente-milionaria' },
        { label: 'Escalador de Negócios', value: 'escalador-de-negocios' },
        { label: 'Mentor Milionário', value: 'mentor-milionario' },
      ],
      defaultValue: 'default',
    },
    // Formulário de Inscrição
    {
      name: 'form',
      type: 'relationship',
      label: 'Formulário de Inscrição',
      relationTo: 'forms',
      required: false,
      admin: {
        description: 'Selecione o formulário que será exibido na seção de inscrição. Crie formulários em "Forms" primeiro.',
      },
    },
    // Data e Hora
    {
      name: 'date',
      type: 'date',
      label: 'Data do Evento',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Data de Término',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duração',
      admin: {
        description: 'Ex: 7 horas intensivas',
      },
    },
    // Local
    {
      name: 'location',
      type: 'group',
      label: 'Local',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          options: [
            { label: 'Presencial', value: 'presencial' },
            { label: 'Online', value: 'online' },
            { label: 'Híbrido', value: 'hybrid' },
          ],
        },
        {
          name: 'venue',
          type: 'text',
          label: 'Local',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Endereço',
        },
        {
          name: 'city',
          type: 'text',
          label: 'Cidade',
        },
        {
          name: 'state',
          type: 'text',
          label: 'Estado',
        },
      ],
    },
    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtítulo',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descrição',
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto do CTA',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'Link do CTA',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          label: 'Imagem de Fundo',
          relationTo: 'media',
        },
      ],
    },
    // Countdown
    {
      name: 'countdown',
      type: 'group',
      label: 'Countdown',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Habilitar Countdown',
        },
        {
          name: 'targetDate',
          type: 'date',
          label: 'Data Alvo',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    // Highlights
    {
      name: 'highlights',
      type: 'group',
      label: 'Destaques',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Título da Seção',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: 'Descrição da Seção',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Itens de Destaque',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descrição',
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Ícone',
            },
          ],
        },
      ],
    },
    // O que você vai aprender
    {
      name: 'learnings',
      type: 'group',
      label: 'O que você vai aprender',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Título da Seção',
        },
        {
          name: 'sectionDescription',
          type: 'textarea',
          label: 'Descrição da Seção',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Itens',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Texto',
            },
          ],
        },
      ],
    },
    // Challenges (Desafios)
    {
      name: 'challenges',
      type: 'array',
      label: 'Desafios',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Pergunta',
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Resposta',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Ícone',
        },
      ],
    },
    // Intelligence Types (Tipos de Inteligência)
    {
      name: 'intelligenceTypes',
      type: 'array',
      label: 'Tipos de Inteligência',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Ícone (caminho da imagem)',
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefícios',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
            },
          ],
        },
      ],
    },
    // Programação
    {
      name: 'schedule',
      type: 'array',
      label: 'Programação',
      fields: [
        {
          name: 'time',
          type: 'text',
          label: 'Horário',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
      ],
    },
    // Tickets
    {
      name: 'tickets',
      type: 'array',
      label: 'Ingressos',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nome',
        },
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          options: [
            { label: 'Gratuito', value: 'free' },
            { label: 'Pago', value: 'paid' },
            { label: 'VIP', value: 'vip' },
          ],
        },
        {
          name: 'price',
          type: 'number',
          label: 'Preço',
        },
        {
          name: 'originalPrice',
          type: 'number',
          label: 'Preço Original',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefícios',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
            },
          ],
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link de Compra',
        },
        {
          name: 'available',
          type: 'checkbox',
          label: 'Disponível',
          defaultValue: true,
        },
      ],
    },
    // Vídeo
    {
      name: 'video',
      type: 'group',
      label: 'Vídeo',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          options: [
            { label: 'YouTube', value: 'youtube' },
            { label: 'Upload', value: 'upload' },
          ],
        },
        {
          name: 'youtubeId',
          type: 'text',
          label: 'YouTube ID',
        },
        {
          name: 'file',
          type: 'upload',
          label: 'Arquivo',
          relationTo: 'media',
        },
      ],
    },
    // Mentores
    {
      name: 'mentors',
      type: 'relationship',
      label: 'Mentores',
      relationTo: 'mentores',
      hasMany: true,
    },
    // FAQs
    {
      name: 'faqs',
      type: 'relationship',
      label: 'FAQs',
      relationTo: 'faqs',
      hasMany: true,
    },
    // Depoimentos
    {
      name: 'testimonials',
      type: 'relationship',
      label: 'Depoimentos',
      relationTo: 'testimonials',
      hasMany: true,
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título SEO',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição SEO',
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Palavras-chave',
        },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'Imagem OG',
          relationTo: 'media',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createWebhookAfterChangeHook('eventos')],
    afterDelete: [createWebhookAfterDeleteHook('eventos')],
  },
}

export default Eventos
