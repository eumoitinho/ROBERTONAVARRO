import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'eventPage',
  title: 'Páginas de Eventos',
  type: 'document',
  fields: [
    // Informações Básicas
    defineField({
      name: 'title',
      title: 'Título do Evento',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Ex: crencas-da-riqueza',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Publicado', value: 'published' },
          { title: 'Rascunho', value: 'draft' },
          { title: 'Encerrado', value: 'closed' },
        ],
      },
      initialValue: 'published',
    }),

    // Hero Section
    defineField({
      name: 'hero',
      title: '🎨 Seção Hero (Topo)',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string', initialValue: 'EVENTO PRESENCIAL' },
        { name: 'title', title: 'Título Principal', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 2 },
        { name: 'description', title: 'Descrição', type: 'text', rows: 3 },
        { name: 'backgroundImage', title: 'Imagem de Fundo', type: 'image', options: { hotspot: true } },
        { name: 'ctaText', title: 'Texto do Botão', type: 'string', initialValue: 'QUERO PARTICIPAR' },
        { name: 'ctaLink', title: 'Link do Botão', type: 'string', initialValue: '#inscricao' },
        { 
          name: 'eventInfo', 
          title: 'Informações do Evento', 
          type: 'object',
          fields: [
            { name: 'date', title: 'Data', type: 'string' },
            { name: 'location', title: 'Local', type: 'string' },
            { name: 'duration', title: 'Duração', type: 'string' },
          ],
        },
      ],
    }),

    // Desafios / Problemas
    defineField({
      name: 'challenges',
      title: '💭 Desafios / Problemas',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
        {
          name: 'items',
          title: 'Lista de Desafios',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'question', title: 'Pergunta', type: 'text', rows: 2 },
                { name: 'answer', title: 'Resposta', type: 'text', rows: 2 },
                { 
                  name: 'icon', 
                  title: 'Ícone', 
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Cérebro', value: 'brain' },
                      { title: 'Bússola', value: 'compass' },
                      { title: 'Alvo', value: 'target' },
                      { title: 'Mover', value: 'move' },
                      { title: 'Desbloquear', value: 'unlock' },
                      { title: 'Estrela', value: 'star' },
                      { title: 'Raio', value: 'zap' },
                    ],
                  },
                },
              ],
              preview: {
                select: { title: 'question' },
              },
            }),
          ],
        },
      ],
    }),

    // Inteligências / Pilares / Conteúdo Principal
    defineField({
      name: 'mainContent',
      title: '🧠 Conteúdo Principal (4 Pilares/Inteligências)',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
        {
          name: 'items',
          title: 'Lista de Itens',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descrição', type: 'text', rows: 3 },
                { name: 'icon', title: 'Ícone/Imagem', type: 'image' },
                {
                  name: 'benefits',
                  title: 'Lista de Benefícios',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
              preview: {
                select: { title: 'title', media: 'icon' },
              },
            }),
          ],
        },
      ],
    }),

    // Destaques do Evento
    defineField({
      name: 'highlights',
      title: '✨ Destaques do Evento',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        {
          name: 'items',
          title: 'Lista de Destaques',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
                { name: 'icon', title: 'Ícone', type: 'string' },
              ],
              preview: {
                select: { title: 'title' },
              },
            }),
          ],
        },
      ],
    }),

    // Metodologia / Como Funciona
    defineField({
      name: 'methodology',
      title: '📚 Metodologia',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
        {
          name: 'steps',
          title: 'Passos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'number', title: 'Número', type: 'string' },
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
              ],
              preview: {
                select: { title: 'title', subtitle: 'number' },
              },
            }),
          ],
        },
      ],
    }),

    // Bônus / O que você vai receber
    defineField({
      name: 'bonuses',
      title: '🎁 Bônus',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        {
          name: 'items',
          title: 'Lista de Bônus',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
                { name: 'value', title: 'Valor', type: 'string' },
                { name: 'icon', title: 'Ícone', type: 'string' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'value' },
              },
            }),
          ],
        },
      ],
    }),

    // Ingressos / Preços
    defineField({
      name: 'pricing',
      title: '💰 Ingressos',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
        {
          name: 'tickets',
          title: 'Tipos de Ingresso',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'name', title: 'Nome', type: 'string' },
                { name: 'price', title: 'Preço', type: 'string' },
                { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
                { name: 'features', title: 'Recursos Inclusos', type: 'array', of: [{ type: 'string' }] },
                { name: 'highlighted', title: 'Destacar', type: 'boolean', initialValue: false },
                { name: 'ctaText', title: 'Texto do Botão', type: 'string' },
                { name: 'ctaLink', title: 'Link do Botão', type: 'string' },
              ],
              preview: {
                select: { title: 'name', subtitle: 'price' },
              },
            }),
          ],
        },
      ],
    }),

    // Depoimentos
    defineField({
      name: 'testimonials',
      title: '💬 Depoimentos',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
        {
          name: 'items',
          title: 'Lista de Depoimentos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'name', title: 'Nome', type: 'string' },
                { name: 'role', title: 'Cargo/Profissão', type: 'string' },
                { name: 'quote', title: 'Depoimento', type: 'text', rows: 3 },
                { name: 'image', title: 'Foto', type: 'image' },
                { name: 'rating', title: 'Avaliação (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5), initialValue: 5 },
              ],
              preview: {
                select: { title: 'name', subtitle: 'role', media: 'image' },
              },
            }),
          ],
        },
      ],
    }),

    // FAQ
    defineField({
      name: 'faq',
      title: '❓ Perguntas Frequentes',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        {
          name: 'items',
          title: 'Lista de Perguntas',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'question', title: 'Pergunta', type: 'string' },
                { name: 'answer', title: 'Resposta', type: 'text', rows: 3 },
              ],
              preview: {
                select: { title: 'question' },
              },
            }),
          ],
        },
      ],
    }),

    // Localização
    defineField({
      name: 'location',
      title: '📍 Localização',
      type: 'object',
      fields: [
        { name: 'show', title: 'Mostrar Seção', type: 'boolean', initialValue: true },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'address', title: 'Endereço', type: 'text', rows: 2 },
        { name: 'city', title: 'Cidade', type: 'string' },
        { name: 'state', title: 'Estado', type: 'string' },
        { name: 'mapEmbedUrl', title: 'URL do Mapa (Embed)', type: 'url' },
      ],
    }),

    // CTA Final
    defineField({
      name: 'finalCta',
      title: '🚀 CTA Final',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
        { name: 'buttonText', title: 'Texto do Botão', type: 'string' },
        { name: 'buttonLink', title: 'Link do Botão', type: 'string' },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: '🔍 SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Título', type: 'string' },
        { name: 'metaDescription', title: 'Meta Descrição', type: 'text', rows: 2 },
        { name: 'keywords', title: 'Palavras-chave', type: 'array', of: [{ type: 'string' }] },
        { name: 'ogImage', title: 'Imagem OG', type: 'image' },
      ],
    }),

    // Controles
    defineField({
      name: 'controls',
      title: '⚙️ Controles de Seção',
      type: 'object',
      fields: [
        { name: 'showChallenges', title: 'Mostrar Desafios', type: 'boolean', initialValue: true },
        { name: 'showMainContent', title: 'Mostrar Conteúdo Principal', type: 'boolean', initialValue: true },
        { name: 'showHighlights', title: 'Mostrar Destaques', type: 'boolean', initialValue: true },
        { name: 'showMethodology', title: 'Mostrar Metodologia', type: 'boolean', initialValue: true },
        { name: 'showBonuses', title: 'Mostrar Bônus', type: 'boolean', initialValue: true },
        { name: 'showPricing', title: 'Mostrar Ingressos', type: 'boolean', initialValue: true },
        { name: 'showTestimonials', title: 'Mostrar Depoimentos', type: 'boolean', initialValue: true },
        { name: 'showFaq', title: 'Mostrar FAQ', type: 'boolean', initialValue: true },
        { name: 'showLocation', title: 'Mostrar Localização', type: 'boolean', initialValue: true },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'Sem título',
        subtitle: `/${subtitle} • ${status}`,
      };
    },
  },
});

