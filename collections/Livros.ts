import type { CollectionConfig } from 'payload'

const Livros: CollectionConfig = {
  slug: 'livros',
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    defaultColumns: ['title', 'author', 'price', 'updatedAt'],
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
        { label: 'Arquivado', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'Autor',
      defaultValue: 'Roberto Navarro',
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
      name: 'coverImage',
      type: 'upload',
      label: 'Capa do Livro',
      relationTo: 'media',
      required: false, // Temporariamente opcional para permitir seed
    },
    {
      name: 'price',
      type: 'number',
      label: 'Preço',
    },
    {
      name: 'amazonLink',
      type: 'text',
      label: 'Link Amazon',
    },
    {
      name: 'purchaseLink',
      type: 'text',
      label: 'Link de Compra',
    },
    {
      name: 'pages',
      type: 'number',
      label: 'Número de Páginas',
    },
    {
      name: 'publishDate',
      type: 'date',
      label: 'Data de Publicação',
    },
    {
      name: 'isbn',
      type: 'text',
      label: 'ISBN',
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Destaques',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    {
      name: 'whatYouWillLearn',
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
    {
      name: 'testimonials',
      type: 'relationship',
      label: 'Depoimentos',
      relationTo: 'testimonials',
      hasMany: true,
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
      ],
    },
  ],
}

export default Livros
