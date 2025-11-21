import type { Block, CollectionConfig } from 'payload'

const ctaFields: Block['fields'] = [
  {
    name: 'label',
    type: 'text',
    label: 'Texto do botão',
  },
  {
    name: 'href',
    type: 'text',
    label: 'Link',
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Abrir em nova aba',
    defaultValue: false,
  },
]

const statsFields: Block['fields'] = [
  {
    name: 'value',
    type: 'text',
    label: 'Valor',
    required: true,
  },
  {
    name: 'label',
    type: 'text',
    label: 'Descrição',
    required: true,
  },
]

const homeHeroBlock: Block = {
  slug: 'homeHero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Título (parte destacada)',
      required: true,
    },
    {
      name: 'titleRest',
      type: 'text',
      label: 'Título (continuação)',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de fundo',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      label: 'CTA Principal',
      fields: ctaFields,
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Indicadores',
      fields: statsFields,
    },
    {
      name: 'enableEventPopup',
      type: 'checkbox',
      label: 'Exibir popup de evento',
      defaultValue: true,
    },
  ],
}

const formationsGridBlock: Block = {
  slug: 'formationsGrid',
  labels: {
    singular: 'Grid de Formações',
    plural: 'Grid de Formações',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Trecho destacado do título',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'useFormacoesCollection',
      type: 'checkbox',
      label: 'Usar dados da coleção de Formações',
      defaultValue: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Formações personalizadas',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
      admin: {
        condition: (_, siblingData) => !siblingData.useFormacoesCollection,
      },
    },
  ],
}

const mentorSectionBlock: Block = {
  slug: 'mentorSection',
  labels: {
    singular: 'Seção Quem Somos',
    plural: 'Seções Quem Somos',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'titlePrefix',
      type: 'text',
      label: 'Título (prefixo)',
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Título (trecho destacado)',
    },
    {
      name: 'titleSuffix',
      type: 'text',
      label: 'Título (sufixo)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição curta',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de fundo',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Parágrafos',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Indicadores',
      fields: statsFields,
    },
  ],
}

const eventsGridBlock: Block = {
  slug: 'eventsGrid',
  labels: {
    singular: 'Grid de Eventos',
    plural: 'Grid de Eventos',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Trecho destacado do título',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Eventos',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}

const booksHighlightBlock: Block = {
  slug: 'booksHighlight',
  labels: {
    singular: 'Sessão Livros',
    plural: 'Sessões Livros',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'titlePrefix',
      type: 'text',
      label: 'Título (prefixo)',
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Título (destacado)',
    },
    {
      name: 'titleSuffix',
      type: 'text',
      label: 'Título (sufixo)',
    },
    {
      name: 'description',
      type: 'array',
      label: 'Parágrafos',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      label: 'CTA',
      fields: ctaFields,
    },
  ],
}

const transformationVideosBlock: Block = {
  slug: 'transformationVideos',
  labels: {
    singular: 'Transformação Real',
    plural: 'Transformações Reais',
  },
  fields: [
    {
      name: 'accent',
      type: 'select',
      label: 'Tema',
      options: [
        { label: 'Amarelo', value: 'yellow' },
        { label: 'Vermelho', value: 'red' },
      ],
      defaultValue: 'yellow',
    },
    {
      name: 'orientation',
      type: 'select',
      label: 'Orientação',
      options: [
        { label: 'Paisagem', value: 'landscape' },
        { label: 'Retrato', value: 'portrait' },
      ],
      defaultValue: 'landscape',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Título destacado',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'videos',
      type: 'array',
      label: 'Vídeos',
      fields: [
        {
          name: 'videoId',
          type: 'text',
          label: 'ID do vídeo (YouTube)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'person',
          type: 'text',
          label: 'Pessoa',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'chipLabel',
          type: 'text',
          label: 'Etiqueta',
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail customizada',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Cards de destaque',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Ícone',
          options: [
            { label: 'Estrela', value: 'star' },
            { label: 'Raio', value: 'zap' },
            { label: 'Cérebro', value: 'brain' },
          ],
          defaultValue: 'star',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
          required: true,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: ctaFields,
    },
  ],
}

const trainingsCtaBlock: Block = {
  slug: 'trainingsCta',
  labels: {
    singular: 'CTA Treinamentos',
    plural: 'CTAs Treinamentos',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Trecho destacado',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: ctaFields,
    },
  ],
}

const testimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Depoimentos',
    plural: 'Depoimentos',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Trecho destacado',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      label: 'Depoimentos',
      hasMany: true,
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: ctaFields,
    },
  ],
}

const contactBlock: Block = {
  slug: 'contactSection',
  labels: {
    singular: 'Contato',
    plural: 'Contato',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Texto do badge',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Trecho destacado do título',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefone',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Endereço',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'URL do mapa (iframe)',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Formulário',
    },
  ],
}

const pageBlocks: Block[] = [
  homeHeroBlock,
  formationsGridBlock,
  mentorSectionBlock,
  eventsGridBlock,
  booksHighlightBlock,
  transformationVideosBlock,
  trainingsCtaBlock,
  testimonialsBlock,
  contactBlock,
]

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
        { label: 'Página Home', value: 'home' },
        { label: 'Página de Livros', value: 'livros-page' },
        { label: 'Personalizado', value: 'custom' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      admin: {
        condition: (data) =>
          !['home', 'livros-page'].includes(data?.layout as string),
      },
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
      admin: {
        condition: (data) =>
          !['home', 'livros-page'].includes(data?.layout as string),
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Seções',
      admin: {
        condition: (data) =>
          !['home', 'livros-page'].includes(data?.layout as string),
      },
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
      name: 'pageBuilder',
      type: 'blocks',
      label: 'Seções da página',
      blocks: pageBlocks,
      admin: {
        condition: (data) => ['home', 'livros-page'].includes(data?.layout as string),
      },
    },
    {
      name: 'form',
      type: 'group',
      label: 'Formulário',
      admin: {
        condition: (data) =>
          data?.layout === 'form',
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
