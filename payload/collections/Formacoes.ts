import { CollectionConfig } from 'payload/types'

const Formacoes: CollectionConfig = {
  slug: 'formacoes',
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
        description: 'URL amigável (ex: educador-financeiro)',
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
      name: 'accentColor',
      type: 'text',
      label: 'Cor de Destaque',
      admin: {
        description: 'Código hexadecimal (ex: #FFD700)',
      },
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
          name: 'backgroundImage',
          type: 'upload',
          label: 'Imagem de Fundo',
          relationTo: 'media',
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
      ],
    },
    // Desafios
    {
      name: 'challenges',
      type: 'array',
      label: 'Desafios/Problemas',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    // Benefícios
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefícios',
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
          admin: {
            description: 'Nome do ícone Lucide (ex: Trophy, Target)',
          },
        },
      ],
    },
    // O que você vai aprender
    {
      name: 'learnings',
      type: 'array',
      label: 'O que você vai aprender',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    // Módulos
    {
      name: 'modules',
      type: 'array',
      label: 'Módulos',
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
          name: 'topics',
          type: 'array',
          label: 'Tópicos',
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
    // Bônus
    {
      name: 'bonuses',
      type: 'array',
      label: 'Bônus',
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
          name: 'value',
          type: 'text',
          label: 'Valor',
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
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'youtube',
          },
        },
        {
          name: 'file',
          type: 'upload',
          label: 'Arquivo de Vídeo',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'upload',
          },
        },
      ],
    },
    // Pricing
    {
      name: 'pricing',
      type: 'group',
      label: 'Preço',
      fields: [
        {
          name: 'price',
          type: 'number',
          label: 'Preço',
        },
        {
          name: 'installments',
          type: 'number',
          label: 'Parcelas',
        },
        {
          name: 'installmentValue',
          type: 'number',
          label: 'Valor da Parcela',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link de Compra',
        },
      ],
    },
    // Garantia
    {
      name: 'guarantee',
      type: 'group',
      label: 'Garantia',
      fields: [
        {
          name: 'days',
          type: 'number',
          label: 'Dias de Garantia',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descrição',
        },
      ],
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
    // Mentores
    {
      name: 'mentors',
      type: 'relationship',
      label: 'Mentores',
      relationTo: 'mentores',
      hasMany: true,
    },
    // Certificação
    {
      name: 'certification',
      type: 'group',
      label: 'Certificação',
      fields: [
        {
          name: 'hasCertification',
          type: 'checkbox',
          label: 'Possui Certificação',
        },
        {
          name: 'certificationText',
          type: 'richText',
          label: 'Texto da Certificação',
        },
        {
          name: 'certificationImage',
          type: 'upload',
          label: 'Imagem da Certificação',
          relationTo: 'media',
        },
      ],
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
}

export default Formacoes
