import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'formation',
  title: 'Formação',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Formação',
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
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'object',
      fields: [
        {
          name: 'value',
          title: 'Valor',
          type: 'number',
        },
        {
          name: 'discount',
          title: 'Desconto (%)',
          type: 'number',
        },
        {
          name: 'installments',
          title: 'Parcelas',
          type: 'number',
        }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'modules',
      title: 'Módulos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título do Módulo',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
            },
            {
              name: 'lessons',
              title: 'Aulas',
              type: 'array',
              of: [{type: 'string'}]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'benefits',
      title: 'Benefícios',
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
      name: 'guarantee',
      title: 'Garantia',
      type: 'object',
      fields: [
        {
          name: 'days',
          title: 'Dias de Garantia',
          type: 'number',
        },
        {
          name: 'description',
          title: 'Descrição da Garantia',
          type: 'text',
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
      media: 'heroImage',
      price: 'price.value'
    },
    prepare(selection) {
      const {title, price} = selection
      return {
        ...selection,
        subtitle: price ? `R$ ${price}` : 'Sem preço definido'
      }
    },
  },
})