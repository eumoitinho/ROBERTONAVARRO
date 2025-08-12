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
      name: 'description',
      title: 'Descrição do Site',
      type: 'text',
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
    
    // WhatsApp Configuration
    defineField({
      name: 'whatsapp',
      title: 'Configurações do WhatsApp',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Ativo',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'number',
          title: 'Número (com código do país)',
          type: 'string',
          description: 'Ex: 5511999999999'
        },
        {
          name: 'message',
          title: 'Mensagem Padrão',
          type: 'text',
          description: 'Mensagem pré-preenchida ao abrir o WhatsApp'
        },
        {
          name: 'showDelay',
          title: 'Delay para Exibir (segundos)',
          type: 'number',
          initialValue: 3
        },
        {
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'Fale Conosco'
        },
        {
          name: 'position',
          title: 'Posição',
          type: 'string',
          options: {
            list: [
              {title: 'Inferior Direito', value: 'bottom-right'},
              {title: 'Inferior Esquerdo', value: 'bottom-left'},
            ]
          },
          initialValue: 'bottom-right'
        }
      ]
    }),

    // Event Popup Configuration
    defineField({
      name: 'eventPopup',
      title: 'Popup de Evento',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Ativo',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'showDelay',
          title: 'Delay para Exibir (segundos)',
          type: 'number',
          initialValue: 3
        },
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'PRÓXIMO EVENTO'
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
          type: 'text',
        },
        {
          name: 'date',
          title: 'Data do Evento',
          type: 'datetime',
        },
        {
          name: 'location',
          title: 'Local',
          type: 'string',
        },
        {
          name: 'time',
          title: 'Horário',
          type: 'string',
        },
        {
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'GARANTIR MINHA VAGA'
        },
        {
          name: 'buttonLink',
          title: 'Link do Botão',
          type: 'url',
        },
        {
          name: 'image',
          title: 'Imagem (opcional)',
          type: 'image',
          options: {
            hotspot: true,
          },
        }
      ]
    }),

    // Lead Capture Popup
    defineField({
      name: 'leadPopup',
      title: 'Popup de Captura de Leads',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Ativo',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'showDelay',
          title: 'Delay para Exibir (segundos)',
          type: 'number',
          initialValue: 30
        },
        {
          name: 'showOnExitIntent',
          title: 'Exibir na Intenção de Saída',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: '🔥 Não Perca Esta Oportunidade!'
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
        },
        {
          name: 'fields',
          title: 'Campos do Formulário',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  {title: 'Nome', value: 'name'},
                  {title: 'E-mail', value: 'email'},
                  {title: 'Telefone', value: 'phone'},
                  {title: 'Empresa', value: 'company'},
                  {title: 'Cargo', value: 'role'},
                ]
              }
            }
          ],
          initialValue: ['name', 'email', 'phone']
        },
        {
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'QUERO RECEBER'
        },
        {
          name: 'successMessage',
          title: 'Mensagem de Sucesso',
          type: 'text',
          initialValue: 'Obrigado! Em breve entraremos em contato.'
        },
        {
          name: 'image',
          title: 'Imagem (opcional)',
          type: 'image',
          options: {
            hotspot: true,
          },
        }
      ]
    }),

    // Navigation Menu
    defineField({
      name: 'navigation',
      title: 'Menu de Navegação',
      type: 'object',
      fields: [
        {
          name: 'mainMenu',
          title: 'Menu Principal',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                },
                {
                  name: 'isButton',
                  title: 'É Botão CTA?',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'openInNewTab',
                  title: 'Abrir em Nova Aba?',
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
                          name: 'description',
                          title: 'Descrição',
                          type: 'string',
                        },
                        {
                          name: 'icon',
                          title: 'Ícone',
                          type: 'string',
                          description: 'Nome do ícone Lucide (ex: Users, BookOpen, etc)'
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
          title: 'Botão CTA do Header',
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
    }),

    // Footer Configuration
    defineField({
      name: 'footer',
      title: 'Rodapé',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Descrição da Empresa',
          type: 'text',
        },
        {
          name: 'columns',
          title: 'Colunas do Footer',
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
                          name: 'openInNewTab',
                          title: 'Abrir em Nova Aba?',
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
          name: 'newsletter',
          title: 'Newsletter',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Ativo',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              initialValue: 'Receba nossos conteúdos'
            },
            {
              name: 'subtitle',
              title: 'Subtítulo',
              type: 'string',
            },
            {
              name: 'placeholder',
              title: 'Placeholder do E-mail',
              type: 'string',
              initialValue: 'Seu melhor e-mail'
            },
            {
              name: 'buttonText',
              title: 'Texto do Botão',
              type: 'string',
              initialValue: 'Inscrever-se'
            }
          ]
        },
        {
          name: 'copyright',
          title: 'Copyright',
          type: 'string',
        },
        {
          name: 'showReclameAqui',
          title: 'Mostrar Selo Reclame Aqui',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),

    // Social Media
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
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp Link',
          type: 'string',
        }
      ]
    }),

    // Contact Information
    defineField({
      name: 'contact',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'E-mail Principal',
          type: 'string',
        },
        {
          name: 'supportEmail',
          title: 'E-mail de Suporte',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Telefone',
          type: 'string',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Endereço',
          type: 'text',
        },
        {
          name: 'mapUrl',
          title: 'Link do Google Maps',
          type: 'url',
        }
      ]
    }),

    // Analytics & Scripts
    defineField({
      name: 'analytics',
      title: 'Analytics e Scripts',
      type: 'object',
      fields: [
        {
          name: 'googleAnalytics',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'GA4 Measurement ID (ex: G-XXXXXXXXXX)'
        },
        {
          name: 'googleTagManager',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'GTM ID (ex: GTM-XXXXXXX)'
        },
        {
          name: 'facebookPixel',
          title: 'Facebook Pixel ID',
          type: 'string',
        },
        {
          name: 'hotjar',
          title: 'Hotjar ID',
          type: 'string',
        },
        {
          name: 'clarity',
          title: 'Microsoft Clarity ID',
          type: 'string',
        },
        {
          name: 'customHeadScripts',
          title: 'Scripts Customizados (Head)',
          type: 'text',
          description: 'Scripts para adicionar no <head>'
        },
        {
          name: 'customBodyScripts',
          title: 'Scripts Customizados (Body)',
          type: 'text',
          description: 'Scripts para adicionar antes do </body>'
        }
      ]
    }),

    // SEO Defaults
    defineField({
      name: 'defaultSeo',
      title: 'SEO Padrão',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Título Padrão',
          type: 'string',
        },
        {
          name: 'titleTemplate',
          title: 'Template do Título',
          type: 'string',
          description: 'Ex: %s | Roberto Navarro',
          initialValue: '%s | Roberto Navarro'
        },
        {
          name: 'metaDescription',
          title: 'Descrição Padrão',
          type: 'text',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Palavras-chave Padrão',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'ogImage',
          title: 'Imagem Open Graph Padrão',
          type: 'image',
        },
        {
          name: 'twitterCard',
          title: 'Twitter Card Type',
          type: 'string',
          options: {
            list: [
              {title: 'Summary', value: 'summary'},
              {title: 'Summary Large Image', value: 'summary_large_image'},
            ]
          },
          initialValue: 'summary_large_image'
        }
      ]
    }),

    // Theme Settings
    defineField({
      name: 'theme',
      title: 'Configurações do Tema',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Cor Primária',
          type: 'string',
          description: 'Hex color (ex: #F59E0B)',
          initialValue: '#F59E0B'
        },
        {
          name: 'secondaryColor',
          title: 'Cor Secundária',
          type: 'string',
          description: 'Hex color',
          initialValue: '#D97706'
        },
        {
          name: 'fontFamily',
          title: 'Fonte Principal',
          type: 'string',
          options: {
            list: [
              {title: 'Sans Serif', value: 'sans-serif'},
              {title: 'Serif', value: 'serif'},
              {title: 'Monospace', value: 'monospace'},
              {title: 'Inter', value: 'Inter'},
              {title: 'Poppins', value: 'Poppins'},
              {title: 'Roboto', value: 'Roboto'},
            ]
          }
        },
        {
          name: 'darkMode',
          title: 'Modo Escuro Padrão',
          type: 'boolean',
          initialValue: true
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Configurações do Site'
      }
    }
  },
})