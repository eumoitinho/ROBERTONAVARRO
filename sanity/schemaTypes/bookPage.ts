import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bookPage',
  title: 'Book Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'coverImagePath',
          title: 'Cover Image Path',
          type: 'string',
          description: 'Caminho da imagem da capa (ex: /LIVROS-ROBERTO-NAVARRO-CF-2.png)'
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'purchaseLink',
          title: 'Purchase Link',
          type: 'url',
          description: 'Link para compra do livro (Eduzz ou outro)'
        }),
        defineField({
          name: 'rating',
          title: 'Rating',
          type: 'number',
          validation: Rule => Rule.min(0).max(5)
        }),
        defineField({
          name: 'totalReviews',
          title: 'Total Reviews',
          type: 'number',
        }),
        defineField({
          name: 'gradientFrom',
          title: 'Gradient From Color',
          type: 'string',
          description: 'Cor inicial do gradiente (ex: blue-500, emerald-500)'
        }),
        defineField({
          name: 'gradientTo',
          title: 'Gradient To Color',
          type: 'string',
          description: 'Cor final do gradiente (ex: cyan-600, teal-600)'
        }),
      ],
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [{ type: 'text' }],
        }),
        defineField({
          name: 'highlightText',
          title: 'Highlight Text',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'pillarsSection',
      title: 'Pillars/Strategies Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'benefitsSection',
      title: 'Benefits/Transformations Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'chaptersSection',
      title: 'Chapters Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'chapters',
          title: 'Chapters',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'authorSection',
      title: 'Author Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'bio',
          title: 'Bio',
          type: 'array',
          of: [{ type: 'text' }],
        }),
        defineField({
          name: 'image',
          title: 'Author Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'imagePath',
          title: 'Image Path',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'price',
          title: 'Price',
          type: 'string',
        }),
        defineField({
          name: 'originalPrice',
          title: 'Original Price',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'text',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'hero.subtitle',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Untitled Book',
        subtitle: subtitle || 'No subtitle',
      }
    },
  },
})
