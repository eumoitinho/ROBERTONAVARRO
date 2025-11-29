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
      name: 'bookTag',
      type: 'text',
      label: 'Tag do Livro',
      admin: {
        description: 'Ex: LIVRO EQUILIBRADOR, LIVRO IMPRESSO, LIVRO TRANSFORMADOR',
      },
    },
    {
      name: 'accentColor',
      type: 'select',
      label: 'Cor de Destaque',
      options: [
        { label: 'Dourado (Padrão)', value: 'gold' },
        { label: 'Vermelho', value: 'red' },
        { label: 'Verde', value: 'green' },
        { label: 'Laranja', value: 'orange' },
        { label: 'Azul', value: 'blue' },
      ],
      defaultValue: 'gold',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Autor',
      defaultValue: 'Roberto Navarro',
    },
    {
      name: 'authorBio',
      type: 'richText',
      label: 'Biografia do Autor',
      admin: {
        description: 'Texto sobre o autor que aparecerá na seção do autor',
      },
    },
    {
      name: 'authorImage',
      type: 'upload',
      label: 'Foto do Autor',
      relationTo: 'media',
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
      required: false,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Preço',
    },
    {
      name: 'originalPrice',
      type: 'number',
      label: 'Preço Original (Riscado)',
      admin: {
        description: 'Se preenchido, mostrará o preço original riscado com desconto',
      },
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
      name: 'ctaText',
      type: 'text',
      label: 'Texto do Botão CTA',
      defaultValue: 'COMPRAR AGORA',
    },
    // Ficha Técnica
    {
      name: 'technicalSpecs',
      type: 'group',
      label: 'Ficha Técnica',
      fields: [
        {
          name: 'publisher',
          type: 'text',
          label: 'Editora',
        },
        {
          name: 'year',
          type: 'number',
          label: 'Ano de Lançamento',
        },
        {
          name: 'dimensions',
          type: 'text',
          label: 'Dimensões',
          admin: {
            description: 'Ex: 16x23 cm',
          },
        },
        {
          name: 'language',
          type: 'text',
          label: 'Idioma',
          defaultValue: 'Português',
        },
      ],
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
    // O que você vai aprender
    {
      name: 'whatYouWillLearn',
      type: 'array',
      label: 'O que você vai aprender',
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
          type: 'select',
          label: 'Ícone',
          options: [
            { label: 'Cérebro', value: 'brain' },
            { label: 'Alvo', value: 'target' },
            { label: 'Foguete', value: 'rocket' },
            { label: 'Escada', value: 'stairs' },
            { label: 'Átomo', value: 'atom' },
            { label: 'Engrenagem', value: 'gear' },
            { label: 'Coração', value: 'heart' },
            { label: 'Estrela', value: 'star' },
            { label: 'Escudo', value: 'shield' },
            { label: 'Livro', value: 'book' },
          ],
          defaultValue: 'book',
        },
      ],
    },
    // Por que este livro é essencial
    {
      name: 'whyEssential',
      type: 'array',
      label: 'Por que este livro é essencial',
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
          type: 'select',
          label: 'Ícone',
          options: [
            { label: 'Autoconhecimento', value: 'user' },
            { label: 'Equilíbrio', value: 'scale' },
            { label: 'Foco', value: 'target' },
            { label: 'Relacionamentos', value: 'users' },
            { label: 'Dinheiro', value: 'dollar' },
            { label: 'Gráfico', value: 'chart' },
            { label: 'Coração', value: 'heart' },
            { label: 'Seta para Cima', value: 'trending' },
            { label: 'Lupa', value: 'search' },
            { label: 'Cérebro', value: 'brain' },
            { label: 'Check', value: 'check' },
            { label: 'Escudo', value: 'shield' },
          ],
          defaultValue: 'check',
        },
      ],
    },
    // Destaques antigo (mantido para compatibilidade)
    {
      name: 'highlights',
      type: 'array',
      label: 'Destaques (Legado)',
      admin: {
        description: 'Campo legado - use "Por que este livro é essencial" para novos livros',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    // Seção de transformação
    {
      name: 'transformationSection',
      type: 'group',
      label: 'Seção de Transformação',
      admin: {
        description: 'Seção "Mais que um livro, uma ferramenta de transformação"',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Ativar Seção',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'Mais que um livro, uma ferramenta de transformação',
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
    {
      name: 'testimonials',
      type: 'relationship',
      label: 'Depoimentos',
      relationTo: 'testimonials',
      hasMany: true,
    },
    // Configurações de Rating
    {
      name: 'rating',
      type: 'group',
      label: 'Avaliações',
      fields: [
        {
          name: 'score',
          type: 'number',
          label: 'Nota',
          min: 0,
          max: 5,
          admin: {
            description: 'Nota de 0 a 5 (ex: 4.95)',
            step: 0.01,
          },
        },
        {
          name: 'count',
          type: 'number',
          label: 'Quantidade de Avaliações',
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
      ],
    },
  ],
}

export default Livros
