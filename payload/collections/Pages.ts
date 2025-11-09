import { CollectionConfig } from 'payload/types'

const Pages: CollectionConfig = {
  slug: 'pages',
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
        description: 'URL da página (ex: politica-privacidade)',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Padrão', value: 'default' },
        { label: 'Hero com Imagem', value: 'hero-image' },
        { label: 'Hero Vermelho', value: 'hero-red' },
        { label: 'Formulário', value: 'form' },
        { label: 'Personalizado', value: 'custom' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
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
          name: 'backgroundImage',
          type: 'upload',
          label: 'Imagem de Fundo',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Conteúdo',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Seções',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          options: [
            { label: 'Texto', value: 'text' },
            { label: 'Imagem', value: 'image' },
            { label: 'Vídeo', value: 'video' },
            { label: 'Formulário', value: 'form' },
            { label: 'CTA', value: 'cta' },
            { label: 'Grid', value: 'grid' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Conteúdo',
        },
      ],
    },
    {
      name: 'form',
      type: 'group',
      label: 'Formulário',
      admin: {
        condition: (data) => data?.layout === 'form',
      },
      fields: [
        {
          name: 'formId',
          type: 'text',
          label: 'ID do Formulário',
        },
        {
          name: 'submitText',
          type: 'text',
          label: 'Texto do Botão',
          defaultValue: 'Enviar',
        },
        {
          name: 'successMessage',
          type: 'textarea',
          label: 'Mensagem de Sucesso',
        },
      ],
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

export default Pages
