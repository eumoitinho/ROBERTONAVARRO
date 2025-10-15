import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'formationPage',
  title: 'Páginas de Formações',
  type: 'document',
  fields: [
    // Identificação
    defineField({
      name: 'slug',
      title: 'Slug da Formação',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título da Formação',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
      },
      initialValue: 'draft',
    }),

    // Hero Section
    defineField({
      name: 'hero',
      title: 'Seção Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título Principal',
          type: 'string',
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
          rows: 3,
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'duration',
          title: 'Duração',
          type: 'string',
        }),
        defineField({
          name: 'format',
          title: 'Formato',
          type: 'string',
        }),
        defineField({
          name: 'ctaText',
          title: 'Texto do Botão',
          type: 'string',
        }),
        defineField({
          name: 'ctaLink',
          title: 'Link do Botão',
          type: 'string',
        }),
      ],
    }),

    // Benefícios
    defineField({
      name: 'benefits',
      title: 'Seção de Benefícios',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'items',
          title: 'Benefícios',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Ícone (Lucide)',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Título do Benefício',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 2,
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Conteúdo Principal
    defineField({
      name: 'mainContent',
      title: 'Conteúdo Principal',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'items',
          title: 'Módulos/Conteúdos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Título do Módulo',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'benefits',
                  title: 'Benefícios',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({
                  name: 'duration',
                  title: 'Duração',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Metodologia
    defineField({
      name: 'methodology',
      title: 'Metodologia',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'steps',
          title: 'Passos da Metodologia',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'number',
                  title: 'Número',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Título',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 2,
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Diferenciais
    defineField({
      name: 'highlights',
      title: 'Diferenciais',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Diferenciais',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Título',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Inclui
    defineField({
      name: 'includes',
      title: 'O Que Está Incluído',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Itens Incluídos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Título',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'value',
                  title: 'Valor',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Preços
    defineField({
      name: 'pricing',
      title: 'Seção de Preços',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'plans',
          title: 'Planos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Nome do Plano',
                  type: 'string',
                }),
                defineField({
                  name: 'price',
                  title: 'Preço',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'highlighted',
                  title: 'Destacado',
                  type: 'boolean',
                }),
                defineField({
                  name: 'features',
                  title: 'Recursos',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({
                  name: 'ctaText',
                  title: 'Texto do Botão',
                  type: 'string',
                }),
                defineField({
                  name: 'ctaLink',
                  title: 'Link do Botão',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Depoimentos
    defineField({
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'items',
          title: 'Depoimentos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Nome',
                  type: 'string',
                }),
                defineField({
                  name: 'role',
                  title: 'Cargo/Profissão',
                  type: 'string',
                }),
                defineField({
                  name: 'quote',
                  title: 'Depoimento',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'rating',
                  title: 'Avaliação (1-5)',
                  type: 'number',
                  validation: Rule => Rule.min(1).max(5),
                }),
                defineField({
                  name: 'image',
                  title: 'Foto',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // FAQ
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Perguntas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Pergunta',
                  type: 'string',
                }),
                defineField({
                  name: 'answer',
                  title: 'Resposta',
                  type: 'text',
                  rows: 3,
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // CTA Final
    defineField({
      name: 'finalCta',
      title: 'CTA Final',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Link do Botão',
          type: 'string',
        }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),

    // Controles de Seção
    defineField({
      name: 'controls',
      title: 'Controles de Seção',
      type: 'object',
      fields: [
        defineField({
          name: 'showBenefits',
          title: 'Mostrar Benefícios',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showMainContent',
          title: 'Mostrar Conteúdo Principal',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showMethodology',
          title: 'Mostrar Metodologia',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showHighlights',
          title: 'Mostrar Diferenciais',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showIncludes',
          title: 'Mostrar O Que Está Incluído',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showPricing',
          title: 'Mostrar Preços',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showTestimonials',
          title: 'Mostrar Depoimentos',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showFaq',
          title: 'Mostrar FAQ',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'hero.backgroundImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Formação sem título',
        subtitle: subtitle ? `/formacoes/${subtitle}` : 'Sem slug',
      }
    },
  },
})
