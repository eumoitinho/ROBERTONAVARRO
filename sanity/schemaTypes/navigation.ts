import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navegação',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Identificador',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Itens do Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'isButton',
              title: 'É Botão?',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'buttonStyle',
              title: 'Estilo do Botão',
              type: 'string',
              options: {
                list: [
                  {title: 'Primário', value: 'primary'},
                  {title: 'Secundário', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                  {title: 'Ghost', value: 'ghost'}
                ]
              },
              hidden: ({parent}) => !parent?.isButton
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
              name: 'items',
              title: 'Subitens',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Título',
                      type: 'string',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      validation: Rule => Rule.required()
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
                      description: 'Nome do ícone Lucide'
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
      name: 'ctaButton',
      title: 'Botão CTA Principal',
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
          name: 'style',
          title: 'Estilo',
          type: 'string',
          options: {
            list: [
              {title: 'Primário', value: 'primary'},
              {title: 'Secundário', value: 'secondary'},
              {title: 'Gradient', value: 'gradient'}
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'mobileMenu',
      title: 'Configurações Mobile',
      type: 'object',
      fields: [
        {
          name: 'showLogo',
          title: 'Mostrar Logo',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showSearch',
          title: 'Mostrar Busca',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'showSocial',
          title: 'Mostrar Redes Sociais',
          type: 'boolean',
          initialValue: true
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