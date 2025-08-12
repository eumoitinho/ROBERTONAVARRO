import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'book',
  title: 'Livro',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Livro',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      initialValue: 'Roberto Navarro'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'longDescription',
      title: 'Descrição Completa',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'coverImage',
      title: 'Capa do Livro',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'backCoverImage',
      title: 'Contracapa',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
    }),
    defineField({
      name: 'publisher',
      title: 'Editora',
      type: 'string',
    }),
    defineField({
      name: 'publishDate',
      title: 'Data de Publicação',
      type: 'date',
    }),
    defineField({
      name: 'pages',
      title: 'Número de Páginas',
      type: 'number',
    }),
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      initialValue: 'Português'
    }),
    defineField({
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'pricing',
      title: 'Preços',
      type: 'object',
      fields: [
        {
          name: 'regularPrice',
          title: 'Preço Regular',
          type: 'number',
        },
        {
          name: 'salePrice',
          title: 'Preço Promocional',
          type: 'number',
        },
        {
          name: 'currency',
          title: 'Moeda',
          type: 'string',
          initialValue: 'BRL'
        }
      ]
    }),
    defineField({
      name: 'purchaseLinks',
      title: 'Links de Compra',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  {title: 'Amazon', value: 'amazon'},
                  {title: 'Hotmart', value: 'hotmart'},
                  {title: 'Eduzz', value: 'eduzz'},
                  {title: 'Monetizze', value: 'monetizze'},
                  {title: 'Site Oficial', value: 'official'},
                  {title: 'Mercado Livre', value: 'mercadolivre'},
                  {title: 'Outro', value: 'other'}
                ]
              }
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'buttonText',
              title: 'Texto do Botão',
              type: 'string',
              initialValue: 'Comprar Agora'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'formats',
      title: 'Formatos Disponíveis',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Livro Físico', value: 'physical'},
          {title: 'E-book', value: 'ebook'},
          {title: 'Audiobook', value: 'audiobook'},
          {title: 'PDF', value: 'pdf'}
        ]
      }
    }),
    defineField({
      name: 'highlights',
      title: 'Destaques do Livro',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              description: 'Nome do ícone Lucide'
            },
            {
              name: 'title',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'chapters',
      title: 'Capítulos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Número',
              type: 'number',
            },
            {
              name: 'title',
              title: 'Título do Capítulo',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Depoimentos sobre o Livro',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Cargo/Função',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Depoimento',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'rating',
              title: 'Avaliação',
              type: 'number',
              validation: Rule => Rule.min(1).max(5)
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'preview',
      title: 'Preview do Livro',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Habilitar Preview',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'pdfUrl',
          title: 'URL do PDF de Preview',
          type: 'url',
        },
        {
          name: 'pages',
          title: 'Páginas de Preview',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'bonus',
      title: 'Bônus',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título do Bônus',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Pergunta',
              type: 'string',
            },
            {
              name: 'answer',
              title: 'Resposta',
              type: 'text',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Título',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Descrição',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'ogImage',
          title: 'Imagem Open Graph',
          type: 'image',
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
      description: 'Marcar como destaque na página de livros'
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0
    })
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'coverImage'
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `por ${author}`}
    },
  },
})