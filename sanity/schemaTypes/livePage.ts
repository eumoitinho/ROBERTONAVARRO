import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'livePage',
  title: 'Página de Lives',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Título Principal',
          type: 'string',
        },
        {
          name: 'subheadline',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'backgroundVideo',
          title: 'Vídeo de Fundo',
          type: 'url',
        },
        {
          name: 'ctaButton',
          title: 'Botão CTA',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'currentLive',
      title: 'Live Atual/Próxima',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
        },
        {
          name: 'date',
          title: 'Data e Hora',
          type: 'datetime',
        },
        {
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'youtubeUrl',
          title: 'URL do YouTube',
          type: 'url',
        },
        {
          name: 'instagramUrl',
          title: 'URL do Instagram',
          type: 'url',
        },
        {
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              {title: 'Ao Vivo', value: 'live'},
              {title: 'Agendada', value: 'scheduled'},
              {title: 'Encerrada', value: 'ended'}
            ]
          }
        },
        {
          name: 'registrationForm',
          title: 'Formulário de Inscrição',
          type: 'reference',
          to: [{type: 'popup'}]
        }
      ]
    }),
    defineField({
      name: 'upcomingLives',
      title: 'Próximas Lives',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            },
            {
              name: 'date',
              title: 'Data e Hora',
              type: 'datetime',
            },
            {
              name: 'thumbnail',
              title: 'Thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'speaker',
              title: 'Palestrante',
              type: 'string',
            },
            {
              name: 'topic',
              title: 'Tópico',
              type: 'string',
            },
            {
              name: 'registrationLink',
              title: 'Link de Inscrição',
              type: 'string',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'pastLives',
      title: 'Lives Passadas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            },
            {
              name: 'date',
              title: 'Data',
              type: 'datetime',
            },
            {
              name: 'thumbnail',
              title: 'Thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'videoUrl',
              title: 'URL do Vídeo',
              type: 'url',
            },
            {
              name: 'duration',
              title: 'Duração',
              type: 'string',
            },
            {
              name: 'views',
              title: 'Visualizações',
              type: 'number',
            },
            {
              name: 'highlights',
              title: 'Destaques',
              type: 'array',
              of: [{type: 'string'}]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categorias de Lives',
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
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'name'
              }
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
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Habilitar',
          type: 'boolean',
          initialValue: true
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
        },
        {
          name: 'benefits',
          title: 'Benefícios',
          type: 'array',
          of: [{type: 'string'}]
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
        },
        {
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{type: 'string'}]
        },
        {
          name: 'ogImage',
          title: 'Imagem Open Graph',
          type: 'image',
        }
      ]
    })
  ]
})