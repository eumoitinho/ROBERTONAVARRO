import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Rodapé',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
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
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'columns',
      title: 'Colunas do Rodapé',
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
                      name: 'text',
                      title: 'Texto',
                      type: 'string',
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                    },
                    {
                      name: 'target',
                      title: 'Abrir em',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Mesma Aba', value: '_self'},
                          {title: 'Nova Aba', value: '_blank'}
                        ]
                      },
                      initialValue: '_self'
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
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'Siga-nos'
        },
        {
          name: 'links',
          title: 'Links Sociais',
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
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'Twitter/X', value: 'twitter'},
                      {title: 'LinkedIn', value: 'linkedin'},
                      {title: 'YouTube', value: 'youtube'},
                      {title: 'TikTok', value: 'tiktok'},
                      {title: 'WhatsApp', value: 'whatsapp'},
                      {title: 'Telegram', value: 'telegram'},
                      {title: 'Pinterest', value: 'pinterest'},
                      {title: 'Threads', value: 'threads'},
                      {title: 'Discord', value: 'discord'},
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
                  name: 'icon',
                  title: 'Ícone Customizado',
                  type: 'string',
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }
              ]
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
          initialValue: 'Receba nossas novidades'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
        },
        {
          name: 'placeholder',
          title: 'Placeholder do Email',
          type: 'string',
          initialValue: 'Seu melhor e-mail'
        },
        {
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'Inscrever-se'
        },
        {
          name: 'successMessage',
          title: 'Mensagem de Sucesso',
          type: 'string',
        },
        {
          name: 'errorMessage',
          title: 'Mensagem de Erro',
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
          name: 'enabled',
          title: 'Exibir Contato',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Contato'
        },
        {
          name: 'email',
          title: 'Email',
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
          name: 'workingHours',
          title: 'Horário de Funcionamento',
          type: 'text',
        }
      ]
    }),
    defineField({
      name: 'payments',
      title: 'Formas de Pagamento',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Exibir Formas de Pagamento',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Formas de Pagamento'
        },
        {
          name: 'methods',
          title: 'Métodos',
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
                  name: 'icon',
                  title: 'Ícone/Imagem',
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
    defineField({
      name: 'certifications',
      title: 'Certificações e Selos',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Exibir Certificações',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Certificações'
        },
        {
          name: 'items',
          title: 'Certificações',
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
                  type: 'url',
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'bottomBar',
      title: 'Barra Inferior',
      type: 'object',
      fields: [
        {
          name: 'copyright',
          title: 'Copyright',
          type: 'string',
          initialValue: '© 2024 Roberto Navarro. Todos os direitos reservados.'
        },
        {
          name: 'links',
          title: 'Links Legais',
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
                  name: 'href',
                  title: 'Link',
                  type: 'string',
                }
              ]
            }
          ]
        },
        {
          name: 'developedBy',
          title: 'Desenvolvido por',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Exibir',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'text',
              title: 'Texto',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'floatingButtons',
      title: 'Botões Flutuantes',
      type: 'object',
      fields: [
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Habilitar',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'number',
              title: 'Número',
              type: 'string',
            },
            {
              name: 'message',
              title: 'Mensagem Padrão',
              type: 'text',
            },
            {
              name: 'position',
              title: 'Posição',
              type: 'string',
              options: {
                list: [
                  {title: 'Inferior Direito', value: 'bottom-right'},
                  {title: 'Inferior Esquerdo', value: 'bottom-left'}
                ]
              },
              initialValue: 'bottom-right'
            }
          ]
        },
        {
          name: 'backToTop',
          title: 'Voltar ao Topo',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Habilitar',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'showAfter',
              title: 'Mostrar Após (px)',
              type: 'number',
              initialValue: 300
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'scripts',
      title: 'Scripts Customizados',
      type: 'object',
      fields: [
        {
          name: 'head',
          title: 'Scripts no Head',
          type: 'text',
          description: 'Scripts para adicionar no <head>'
        },
        {
          name: 'bodyEnd',
          title: 'Scripts no Final do Body',
          type: 'text',
          description: 'Scripts para adicionar antes do </body>'
        }
      ]
    }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active'
    },
    prepare(selection) {
      const {title, active} = selection
      return {
        title,
        subtitle: active ? 'Ativo' : 'Inativo'
      }
    }
  }
})