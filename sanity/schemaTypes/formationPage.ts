import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'formationPage',
  title: 'Formação',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'create', 'delete'], // Prevent deleting
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

    // Seção Sobre o Curso
    defineField({
      name: 'aboutSection',
      title: 'Seção Sobre o Curso',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'heading', title: 'Título', type: 'string' }),
        defineField({ name: 'paragraphs', title: 'Parágrafos', type: 'array', of: [{ type: 'text' }] }),
        defineField({ name: 'image', title: 'Imagem', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Link CTA', type: 'string' }),
      ],
    }),

    // Seção MEC (certificação)
    defineField({
      name: 'mecSection',
      title: 'Seção MEC',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'image', title: 'Imagem', type: 'image' }),
        defineField({ name: 'points', title: 'Pontos', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),

    // Seção Licença Profissional
    defineField({
      name: 'licenseSection',
      title: 'Seção Licença Profissional',
      type: 'object',
      fields: [
        defineField({ name: 'transformationsTitle', title: 'Título Transformações', type: 'string' }),
        defineField({ name: 'transformations', title: 'Transformações', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'benefitsTitle', title: 'Título Benefícios', type: 'string' }),
        defineField({ name: 'benefits', title: 'Benefícios', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'statement', title: 'Frase Central', type: 'string' }),
      ],
    }),

    // Materiais exclusivos
    defineField({
      name: 'exclusiveMaterials',
      title: 'Materiais Exclusivos',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'heading', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'chips', title: 'Chips/Itens', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'videoSrc', title: 'Vídeo (URL)', type: 'url' }),
        defineField({ name: 'videoPoster', title: 'Poster do Vídeo', type: 'image' }),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
      ],
    }),

    // Recursos/Features
    defineField({
      name: 'features',
      title: 'Recursos',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'icon', title: 'Ícone (nome)', type: 'string' }),
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        ] }] }),
      ],
    }),

    // Treinador licenciado
    defineField({
      name: 'trainerSection',
      title: 'Seção Treinador Licenciado',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'courses', title: 'Cursos', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'description', title: 'Descrição', type: 'text' }),
          defineField({ name: 'image', title: 'Imagem', type: 'image' }),
        ] }]}),
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
        defineField({ name: 'image', title: 'Imagem', type: 'image' }),
        defineField({ name: 'paragraphs', title: 'Parágrafos', type: 'array', of: [{ type: 'text' }] }),
      ],
    }),

    // Garantias
    defineField({
      name: 'guarantees',
      title: 'Garantias',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        ] }]}),
      ],
    }),

    // Newsletter/CTA
    defineField({
      name: 'newsletter',
      title: 'Newsletter/CTA',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
      ],
    }),

    // Seções específicas (Empreendedor Inteligente)
    defineField({
      name: 'challengesSection',
      title: 'Seção Desafios',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'desc', title: 'Descrição', type: 'text' }),
        ] }]}),
      ],
    }),

    defineField({
      name: 'valueSection',
      title: 'Seção Valor do Programa',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'paragraphs', title: 'Parágrafos', type: 'array', of: [{ type: 'text' }] }),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Link CTA', type: 'string' }),
      ],
    }),

    defineField({
      name: 'learnSection',
      title: 'Seção O que vai aprender',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'desc', title: 'Descrição', type: 'text' }),
          defineField({ name: 'icon', title: 'Ícone (nome)', type: 'string' }),
        ] }]}),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Link CTA', type: 'string' }),
      ],
    }),

    defineField({
      name: 'methodologySection',
      title: 'Seção Metodologia Lean',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text' }),
        defineField({ name: 'items', title: 'Itens', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'desc', title: 'Descrição', type: 'text' }),
          defineField({ name: 'icon', title: 'Ícone (nome)', type: 'string' }),
        ] }]}),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Link CTA', type: 'string' }),
      ],
    }),

    defineField({
      name: 'audienceSection',
      title: 'Seção Público-Alvo',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'intro', title: 'Introdução', type: 'text' }),
        defineField({ name: 'bullets', title: 'Tópicos', type: 'array', of: [{ type: 'object', fields: [
          defineField({ name: 'title', title: 'Título', type: 'string' }),
          defineField({ name: 'desc', title: 'Descrição', type: 'text' }),
        ] }]}),
        defineField({ name: 'ctaText', title: 'Texto CTA', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'Link CTA', type: 'string' }),
      ],
    }),

    defineField({
      name: 'faqSection',
      title: 'Seção FAQ',
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


