import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'formationPage',
  title: 'Formação',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'backgroundImage', title: 'Imagem de Fundo', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Link CTA', type: 'string' }),
      ],
    }),

    defineField({
      name: 'controls',
      title: 'Controles de Seções',
      type: 'object',
      fields: [
        defineField({ name: 'showBenefits', title: 'Mostrar Benefícios', type: 'boolean', initialValue: true }),
        defineField({ name: 'showMainContent', title: 'Mostrar Conteúdo Principal', type: 'boolean', initialValue: true }),
        defineField({ name: 'showHighlights', title: 'Mostrar Destaques', type: 'boolean', initialValue: true }),
        defineField({ name: 'showBonuses', title: 'Mostrar Bônus', type: 'boolean', initialValue: true }),
        defineField({ name: 'showPricing', title: 'Mostrar Preços/Ingressos', type: 'boolean', initialValue: true }),
        defineField({ name: 'showTestimonials', title: 'Mostrar Depoimentos', type: 'boolean', initialValue: true }),
        defineField({ name: 'showFaq', title: 'Mostrar FAQ', type: 'boolean', initialValue: true }),
      ],
    }),

    defineField({
      name: 'mainContent',
      title: 'Conteúdo Principal',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({
          name: 'items',
          title: 'Itens',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Título', type: 'string' }),
              defineField({ name: 'description', title: 'Descrição', type: 'text' }),
              defineField({ name: 'benefits', title: 'Benefícios', type: 'array', of: [{ type: 'string' }] }),
            ],
          }],
        }),
      ],
    }),

    defineField({
      name: 'benefits',
      title: 'Benefícios',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        ] }]}),
      ],
    }),

    defineField({
      name: 'highlights',
      title: 'Destaques',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'items', title: 'Cartas', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'description', title: 'Descrição', type: 'text' }),
          defineField({ name: 'image', title: 'Imagem', type: 'image' }),
        ] }]}),
      ],
    }),

    defineField({
      name: 'bonuses',
      title: 'Bônus',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'value', title: 'Valor/Label', type: 'string' }),
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        ] }]}),
      ],
    }),

    defineField({
      name: 'pricing',
      title: 'Ingressos/Planos',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'tickets', title: 'Ingressos', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'name', title: 'Nome', type: 'string' }),
          defineField({ name: 'price', title: 'Preço', type: 'string' }),
          defineField({ name: 'description', title: 'Descrição', type: 'text' }),
          defineField({ name: 'features', title: 'Diferenciais', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'highlighted', title: 'Destaque', type: 'boolean' }),
          defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
          defineField({ name: 'ctaLink', title: 'Link CTA', type: 'string' }),
        ] }]}),
      ],
    }),

    defineField({
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'name', title: 'Nome', type: 'string' }),
          defineField({ name: 'role', title: 'Cargo', type: 'string' }),
          defineField({ name: 'quote', title: 'Depoimento', type: 'text' }),
          defineField({ name: 'rating', title: 'Nota (1-5)', type: 'number' }),
        ] }]}),
      ],
    }),

    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'items', title: 'Perguntas', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'question', title: 'Pergunta', type: 'string' }),
          defineField({ name: 'answer', title: 'Resposta', type: 'text' }),
        ] }]}),
      ],
    }),

    defineField({
      name: 'finalCta',
      title: 'CTA Final',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'buttonText', title: 'Texto Botão', type: 'string' }),
        defineField({ name: 'buttonLink', title: 'Link Botão', type: 'string' }),
      ],
    }),
  ],
})


