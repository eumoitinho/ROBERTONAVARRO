import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
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
      name: 'pageType',
      title: 'Tipo de Página',
      type: 'string',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'Sobre', value: 'about'},
          {title: 'Formação', value: 'formation'},
          {title: 'Mentoria', value: 'mentoring'},
          {title: 'Contato', value: 'contact'},
          {title: 'Landing Page', value: 'landing'},
          {title: 'Personalizada', value: 'custom'}
        ],
      },
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
          name: 'ctaButton',
          title: 'Botão CTA',
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
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'sections',
      title: 'Seções',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Seção de Texto',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Conteúdo',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H2', value: 'h2'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'}
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url',
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          type: 'object',
          name: 'imageSection',
          title: 'Seção com Imagem',
          fields: [
            {
              name: 'title',
              title: 'Título',
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
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string',
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Imagem à Esquerda', value: 'imageLeft'},
                  {title: 'Imagem à Direita', value: 'imageRight'},
                  {title: 'Imagem Centralizada', value: 'imageCenter'},
                  {title: 'Imagem Full Width', value: 'imageFull'}
                ]
              }
            },
            {
              name: 'content',
              title: 'Conteúdo',
              type: 'array',
              of: [{type: 'block'}]
            }
          ]
        },
        {
          type: 'object',
          name: 'videoSection',
          title: 'Seção de Vídeo',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'videoUrl',
              title: 'URL do Vídeo (YouTube/Vimeo)',
              type: 'url',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            }
          ]
        },
        {
          type: 'object',
          name: 'testimonialSection',
          title: 'Seção de Depoimentos',
          fields: [
            {
              name: 'title',
              title: 'Título da Seção',
              type: 'string',
            },
            {
              name: 'testimonials',
              title: 'Depoimentos',
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
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'Seção CTA',
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
              name: 'buttons',
              title: 'Botões',
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
                    }
                  ]
                }
              ]
            },
            {
              name: 'backgroundImage',
              title: 'Imagem de Fundo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }
          ]
        },
        {
          type: 'object',
          name: 'faqSection',
          title: 'Seção FAQ',
          fields: [
            {
              name: 'title',
              title: 'Título da Seção',
              type: 'string',
            },
            {
              name: 'questions',
              title: 'Perguntas e Respostas',
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
      pageType: 'pageType'
    },
    prepare(selection) {
      const {title, pageType} = selection
      return {
        title,
        subtitle: `Tipo: ${pageType}`
      }
    },
  },
})