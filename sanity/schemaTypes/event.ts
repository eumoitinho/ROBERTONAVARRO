import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Evento',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Evento',
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
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição Curta',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'longDescription',
      title: 'Descrição Completa',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'eventType',
      title: 'Tipo de Evento',
      type: 'string',
      options: {
        list: [
          {title: 'Presencial', value: 'presencial'},
          {title: 'Online', value: 'online'},
          {title: 'Híbrido', value: 'hybrid'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Data do Evento',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'Data de Término',
      type: 'datetime',
      description: 'Para eventos de múltiplos dias'
    }),
    defineField({
      name: 'time',
      title: 'Horário',
      type: 'object',
      fields: [
        {
          name: 'start',
          title: 'Início',
          type: 'string',
        },
        {
          name: 'end',
          title: 'Término',
          type: 'string',
        },
        {
          name: 'timezone',
          title: 'Fuso Horário',
          type: 'string',
          initialValue: 'America/Sao_Paulo'
        }
      ]
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'object',
      fields: [
        {
          name: 'venue',
          title: 'Local/Espaço',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Endereço Completo',
          type: 'text',
        },
        {
          name: 'city',
          title: 'Cidade',
          type: 'string',
        },
        {
          name: 'state',
          title: 'Estado',
          type: 'string',
        },
        {
          name: 'country',
          title: 'País',
          type: 'string',
          initialValue: 'Brasil'
        },
        {
          name: 'mapUrl',
          title: 'Link do Google Maps',
          type: 'url',
        },
        {
          name: 'onlineUrl',
          title: 'Link do Evento Online',
          type: 'url',
          description: 'Para eventos online ou híbridos'
        }
      ]
    }),
    defineField({
      name: 'pricing',
      title: 'Ingressos e Preços',
      type: 'object',
      fields: [
        {
          name: 'isFree',
          title: 'Evento Gratuito',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'tickets',
          title: 'Tipos de Ingresso',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Nome do Ingresso',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                },
                {
                  name: 'price',
                  title: 'Preço',
                  type: 'number',
                },
                {
                  name: 'earlyBirdPrice',
                  title: 'Preço Early Bird',
                  type: 'number',
                },
                {
                  name: 'quantity',
                  title: 'Quantidade Disponível',
                  type: 'number',
                },
                {
                  name: 'benefits',
                  title: 'Benefícios',
                  type: 'array',
                  of: [{type: 'string'}]
                }
              ]
            }
          ]
        },
        {
          name: 'purchaseLink',
          title: 'Link de Compra',
          type: 'url',
        },
        {
          name: 'purchaseButtonText',
          title: 'Texto do Botão de Compra',
          type: 'string',
          initialValue: 'GARANTIR MINHA VAGA'
        }
      ]
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidade',
      type: 'object',
      fields: [
        {
          name: 'total',
          title: 'Capacidade Total',
          type: 'number',
        },
        {
          name: 'available',
          title: 'Vagas Disponíveis',
          type: 'number',
        },
        {
          name: 'showAvailability',
          title: 'Mostrar Disponibilidade',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'speakers',
      title: 'Palestrantes',
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
              name: 'bio',
              title: 'Mini Bio',
              type: 'text',
            },
            {
              name: 'photo',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'social',
              title: 'Redes Sociais',
              type: 'object',
              fields: [
                {
                  name: 'instagram',
                  title: 'Instagram',
                  type: 'url',
                },
                {
                  name: 'linkedin',
                  title: 'LinkedIn',
                  type: 'url',
                },
                {
                  name: 'website',
                  title: 'Website',
                  type: 'url',
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'schedule',
      title: 'Programação',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Horário',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Título da Atividade',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            },
            {
              name: 'speaker',
              title: 'Palestrante/Responsável',
              type: 'string',
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
    }),
    defineField({
      name: 'benefits',
      title: 'O que você vai aprender',
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
    }),
    defineField({
      name: 'targetAudience',
      title: 'Público-alvo',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'Para quem é este evento?'
        },
        {
          name: 'personas',
          title: 'Personas',
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
        }
      ]
    }),
    defineField({
      name: 'partners',
      title: 'Parceiros e Patrocinadores',
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
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  {title: 'Patrocinador', value: 'sponsor'},
                  {title: 'Apoiador', value: 'supporter'},
                  {title: 'Parceiro', value: 'partner'},
                  {title: 'Realização', value: 'organizer'}
                ]
              }
            },
            {
              name: 'website',
              title: 'Website',
              type: 'url',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Depoimentos de Edições Anteriores',
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
      name: 'gallery',
      title: 'Galeria de Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string',
            }
          ]
        }
      ]
    }),
    defineField({
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
              name: 'url',
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
      name: 'cta',
      title: 'Call to Action',
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
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
        },
        {
          name: 'buttonLink',
          title: 'Link do Botão',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'status',
      title: 'Status do Evento',
      type: 'string',
      options: {
        list: [
          {title: 'Próximo', value: 'upcoming'},
          {title: 'Em Andamento', value: 'ongoing'},
          {title: 'Encerrado', value: 'finished'},
          {title: 'Cancelado', value: 'cancelled'},
          {title: 'Adiado', value: 'postponed'}
        ]
      },
      initialValue: 'upcoming'
    }),
    defineField({
      name: 'featured',
      title: 'Evento em Destaque',
      type: 'boolean',
      initialValue: false
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
    })
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'heroImage',
      status: 'status'
    },
    prepare(selection) {
      const {title, date, status} = selection
      return {
        ...selection,
        subtitle: `${new Date(date).toLocaleDateString('pt-BR')} - ${status}`
      }
    },
  },
})