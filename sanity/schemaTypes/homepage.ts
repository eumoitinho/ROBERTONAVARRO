import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Hero
    defineField({
      name: 'heroSection',
      title: 'Seção Hero',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'achievementsNumber', title: 'Número de Conquistas', type: 'string' }),
        defineField({ name: 'achievementsLabel', title: 'Rótulo de Conquistas', type: 'string' }),
        defineField({ name: 'primaryButtonText', title: 'Texto Botão Primário', type: 'string' }),
        defineField({ name: 'primaryButtonLink', title: 'Link Botão Primário', type: 'string' }),
        defineField({
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    // Formações
    defineField({
      name: 'formacoesSection',
      title: 'Seção Formações',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'highlightedText', title: 'Texto em Destaque', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({
          name: 'formacoes',
          title: 'Formações',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Título', type: 'string' }),
                defineField({ name: 'description', title: 'Descrição', type: 'text' }),
                defineField({ name: 'link', title: 'Link', type: 'string' }),
                defineField({ name: 'buttonText', title: 'Texto do Botão', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // Mentor
    defineField({
      name: 'mentorSection',
      title: 'Seção Mentor',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'highlightedText', title: 'Texto em Destaque', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
        defineField({
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'bioParagraphs',
          title: 'Parágrafos da Bio',
          type: 'array',
          of: [{ type: 'text' }],
        }),
        defineField({
          name: 'stats',
          title: 'Estatísticas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Ícone', type: 'string' }),
                defineField({ name: 'value', title: 'Valor', type: 'string' }),
                defineField({ name: 'label', title: 'Rótulo', type: 'string' }),
              ],
            },
          ],
        }),
      ],
    }),

    // Vídeos
    defineField({
      name: 'videosSection',
      title: 'Seção Vídeos',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'highlightedText', title: 'Texto em Destaque', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({
          name: 'videos',
          title: 'Vídeos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'youtubeId', title: 'YouTube ID', type: 'string' }),
                defineField({ name: 'title', title: 'Título', type: 'string' }),
                defineField({ name: 'person', title: 'Pessoa', type: 'string' }),
                defineField({ name: 'description', title: 'Descrição', type: 'text' }),
                defineField({ name: 'chipLabel', title: 'Rótulo do Selo', type: 'string' }),
                defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image' }),
              ],
            },
          ],
        }),
        defineField({
          name: 'stats',
          title: 'Destaques',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Ícone', type: 'string' }),
                defineField({ name: 'title', title: 'Título', type: 'string' }),
                defineField({ name: 'description', title: 'Descrição', type: 'text' }),
              ],
            },
          ],
        }),
        defineField({ name: 'ctaButtonText', title: 'Texto do Botão CTA', type: 'string' }),
        defineField({ name: 'ctaButtonLink', title: 'Link do Botão CTA', type: 'string' }),
      ],
    }),

    // Depoimentos
    defineField({
      name: 'testimonialsSection',
      title: 'Seção Depoimentos',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'highlightedText', title: 'Texto em Destaque', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({
          name: 'testimonials',
          title: 'Depoimentos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Nome', type: 'string' }),
                defineField({ name: 'role', title: 'Cargo', type: 'string' }),
                defineField({ name: 'initial', title: 'Inicial', type: 'string' }),
                defineField({ name: 'quote', title: 'Depoimento', type: 'text' }),
                defineField({ name: 'rating', title: 'Avaliação (1-5)', type: 'number' }),
                defineField({ name: 'image', title: 'Imagem', type: 'image' }),
              ],
            },
          ],
        }),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
        defineField({ name: 'ctaButtonText', title: 'Texto do Botão CTA', type: 'string' }),
        defineField({ name: 'ctaButtonLink', title: 'Link do Botão CTA', type: 'string' }),
      ],
    }),

    // Localização
    defineField({
      name: 'locationSection',
      title: 'Seção Localização',
      type: 'object',
      fields: [
        defineField({ name: 'show', title: 'Mostrar Seção', type: 'boolean', initialValue: true }),
        defineField({ name: 'mapEmbedUrl', title: 'URL do Google Maps Embed', type: 'url' }),
        defineField({ name: 'address', title: 'Endereço', type: 'string' }),
        defineField({ name: 'phone', title: 'Telefone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
      ],
    }),

    // Controles de Seção
    defineField({
      name: 'sectionControls',
      title: 'Controles de Seção',
      type: 'object',
      fields: [
        defineField({ name: 'showMentorSection', title: 'Mostrar Mentor', type: 'boolean', initialValue: true }),
        defineField({ name: 'showVideosSection', title: 'Mostrar Vídeos', type: 'boolean', initialValue: true }),
        defineField({ name: 'showTestimonialsSection', title: 'Mostrar Depoimentos', type: 'boolean', initialValue: true }),
        defineField({ name: 'showLocationSection', title: 'Mostrar Localização', type: 'boolean', initialValue: true }),
        defineField({ name: 'showEventPopup', title: 'Mostrar Popup de Evento', type: 'boolean', initialValue: false }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
        defineField({ name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
      ],
    }),
  ],
})


