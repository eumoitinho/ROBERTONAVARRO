import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'policies',
  title: 'Políticas e Termos',
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
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Política de Privacidade', value: 'privacy'},
          {title: 'Termos de Uso', value: 'terms'},
          {title: 'Política de Cookies', value: 'cookies'},
          {title: 'Política de Reembolso', value: 'refund'},
          {title: 'LGPD', value: 'lgpd'},
          {title: 'Aviso Legal', value: 'legal'},
          {title: 'Outro', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
              {title: 'Code', value: 'code'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
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
          fields: [
            {
              name: 'title',
              title: 'Título da Seção',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Conteúdo',
              type: 'array',
              of: [{type: 'block'}]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Última Atualização',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Data de Vigência',
      type: 'datetime',
    }),
    defineField({
      name: 'version',
      title: 'Versão',
      type: 'string',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
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
          name: 'address',
          title: 'Endereço',
          type: 'text',
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
      type: 'type',
      active: 'active'
    },
    prepare(selection) {
      const {title, type, active} = selection
      return {
        title,
        subtitle: `${type} - ${active ? 'Ativo' : 'Inativo'}`
      }
    }
  }
})