import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Site',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: [
        {
          name: 'menuItems',
          title: 'Itens do Menu',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                },
                {
                  name: 'isExternal',
                  title: 'Link Externo?',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'submenu',
                  title: 'Submenu',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                        },
                        {
                          name: 'link',
                          title: 'Link',
                          type: 'string',
                        },
                        {
                          name: 'isExternal',
                          title: 'Link Externo?',
                          type: 'boolean',
                          initialValue: false
                        }
                      ]
                    }
                  ]
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
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
        },
        {
          name: 'columns',
          title: 'Colunas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Título da Coluna',
                  type: 'string',
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                        },
                        {
                          name: 'link',
                          title: 'Link',
                          type: 'string',
                        },
                        {
                          name: 'isExternal',
                          title: 'Link Externo?',
                          type: 'boolean',
                          initialValue: false
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'copyright',
          title: 'Copyright',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'contact',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'E-mail',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Telefone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Endereço',
          type: 'text',
        }
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalytics',
          title: 'Google Analytics ID',
          type: 'string',
        },
        {
          name: 'facebookPixel',
          title: 'Facebook Pixel ID',
          type: 'string',
        },
        {
          name: 'googleTagManager',
          title: 'Google Tag Manager ID',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'defaultSeo',
      title: 'SEO Padrão',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Título Padrão',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Descrição Padrão',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'Imagem Open Graph Padrão',
          type: 'image',
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})