import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Página Inicial',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Título Principal',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
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
          title: 'Vídeo de Fundo (URL)',
          type: 'url',
        },
        {
          name: 'ctaButtons',
          title: 'Botões CTA',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Texto do Botão',
                  type: 'string',
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                },
                {
                  name: 'style',
                  title: 'Estilo',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Primário', value: 'primary'},
                      {title: 'Secundário', value: 'secondary'},
                      {title: 'Outline', value: 'outline'}
                    ]
                  }
                },
                {
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
                  description: 'Nome do ícone Lucide'
                }
              ]
            }
          ]
        },
        {
          name: 'statistics',
          title: 'Estatísticas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'number',
                  title: 'Número',
                  type: 'string',
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
                }
              ]
            }
          ]
        }
      ]
    }),

    // About Section
    defineField({
      name: 'about',
      title: 'Seção Sobre',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'QUEM SOMOS'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'image',
          title: 'Imagem do Mentor',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'achievements',
          title: 'Conquistas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
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

    // Formations Section
    defineField({
      name: 'formations',
      title: 'Seção Formações',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'FORMAÇÕES'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'featuredFormations',
          title: 'Formações em Destaque',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'formation'}]
            }
          ]
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

    // Events Section
    defineField({
      name: 'events',
      title: 'Seção Eventos',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'EVENTOS'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'featuredEvents',
          title: 'Eventos em Destaque',
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
                  name: 'location',
                  title: 'Local',
                  type: 'string',
                },
                {
                  name: 'image',
                  title: 'Imagem',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                },
                {
                  name: 'buttonText',
                  title: 'Texto do Botão',
                  type: 'string',
                  initialValue: 'Saiba Mais'
                }
              ]
            }
          ]
        }
      ]
    }),

    // Books Section
    defineField({
      name: 'books',
      title: 'Seção Livros',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'LIVROS'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'featuredBooks',
          title: 'Livros em Destaque',
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
                  name: 'author',
                  title: 'Autor',
                  type: 'string',
                  initialValue: 'Roberto Navarro'
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                },
                {
                  name: 'cover',
                  title: 'Capa',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'link',
                  title: 'Link de Compra',
                  type: 'string',
                },
                {
                  name: 'price',
                  title: 'Preço',
                  type: 'string',
                }
              ]
            }
          ]
        }
      ]
    }),

    // Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Seção Depoimentos',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'DEPOIMENTOS'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'testimonialsList',
          title: 'Lista de Depoimentos',
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
                },
                {
                  name: 'videoUrl',
                  title: 'URL do Vídeo (opcional)',
                  type: 'url',
                }
              ]
            }
          ]
        }
      ]
    }),

    // Transformation Videos Section
    defineField({
      name: 'transformationVideos',
      title: 'Seção Vídeos de Transformação',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'TRANSFORMAÇÕES'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'videos',
          title: 'Vídeos',
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
                  name: 'videoUrl',
                  title: 'URL do Vídeo',
                  type: 'url',
                },
                {
                  name: 'thumbnail',
                  title: 'Thumbnail',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }
              ]
            }
          ]
        }
      ]
    }),

    // CTA Section
    defineField({
      name: 'ctaSection',
      title: 'Seção CTA Final',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Descrição',
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
          name: 'buttons',
          title: 'Botões',
          type: 'array',
          of: [
            {
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
                },
                {
                  name: 'style',
                  title: 'Estilo',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Primário', value: 'primary'},
                      {title: 'Secundário', value: 'secondary'},
                      {title: 'Outline', value: 'outline'}
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }),

    // Location Section
    defineField({
      name: 'location',
      title: 'Seção Localização',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'LOCALIZAÇÃO'
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'highlightText',
          title: 'Texto Destacado',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Endereço',
          type: 'text',
        },
        {
          name: 'mapUrl',
          title: 'URL do Google Maps',
          type: 'url',
        },
        {
          name: 'embedMap',
          title: 'Código de Incorporação do Mapa',
          type: 'text',
          description: 'Cole aqui o código iframe do Google Maps'
        }
      ]
    }),

    // SEO
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
    })
  ],

  preview: {
    select: {
      title: 'hero.headline',
      media: 'hero.backgroundImage'
    },
    prepare() {
      return {
        title: 'Página Inicial'
      }
    }
  },
})