import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      type: 'string',
      description: 'Nome interno para identificação (não aparece no site)',
      initialValue: 'Homepage Principal',
      validation: (Rule) => Rule.required(),
    }),
    
    // ========================================
    // HERO SECTION
    // ========================================
    defineField({
      name: 'heroSection',
      title: '🎨 Seção Hero (Topo da Página)',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Texto do Badge',
          type: 'string',
          initialValue: 'INSTITUTO COACHING FINANCEIRO',
        },
        {
          name: 'title',
          title: 'Título Principal (Parte Amarela)',
          type: 'string',
          initialValue: 'TRANSFORME SUA MENTALIDADE',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo (Parte Branca)',
          type: 'string',
          initialValue: 'E CONQUISTE UMA NOVA REALIDADE FINANCEIRA',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.',
        },
        {
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'primaryButtonText',
          title: 'Texto do Botão Principal',
          type: 'string',
          initialValue: 'CONHEÇA NOSSAS FORMAÇÕES',
        },
        {
          name: 'primaryButtonLink',
          title: 'Link do Botão Principal',
          type: 'string',
          initialValue: '#formacoes',
        },
        {
          name: 'achievementsNumber',
          title: 'Número de Conquistas',
          type: 'string',
          initialValue: '300.000+',
        },
        {
          name: 'achievementsLabel',
          title: 'Label das Conquistas',
          type: 'string',
          initialValue: 'vidas transformadas',
        },
      ],
    }),

    // ========================================
    // FORMAÇÕES SECTION
    // ========================================
    defineField({
      name: 'formacoesSection',
      title: '📚 Seção de Formações',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge da Seção',
          type: 'string',
          initialValue: 'NOSSAS FORMAÇÕES',
        },
        {
          name: 'title',
          title: 'Título Completo',
          type: 'string',
          initialValue: 'FORMAÇÕES QUE VÃO TRANSFORMAR SUA MENTALIDADE',
        },
        {
          name: 'highlightedText',
          title: 'Parte Destacada (Amarela)',
          type: 'string',
          initialValue: 'TRANSFORMAR SUA MENTALIDADE',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
          initialValue: 'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos.',
        },
        {
          name: 'formacoes',
          title: 'Lista de Formações',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'description', title: 'Descrição', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
                { name: 'link', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'buttonText', title: 'Texto do Botão', type: 'string', initialValue: 'SAIBA MAIS' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' },
              },
            }),
          ],
        },
      ],
    }),

    // ========================================
    // QUEM SOMOS / MENTOR SECTION
    // ========================================
    defineField({
      name: 'mentorSection',
      title: '👤 Seção do Mentor (Quem Somos)',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'MENTOR',
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'CONHEÇA SEU MENTOR',
        },
        {
          name: 'highlightedText',
          title: 'Parte Destacada (Amarela)',
          type: 'string',
          initialValue: 'MENTOR',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'string',
          initialValue: 'Especialista que vai guiar sua jornada de transformação',
        },
        {
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'bioParagraphs',
          title: 'Parágrafos da Biografia',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (Rule) => Rule.min(1).max(5),
        },
        {
          name: 'stats',
          title: 'Estatísticas',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'icon', title: 'Ícone', type: 'string', options: { list: [
                  { title: 'Usuários', value: 'users' },
                  { title: 'Estrela', value: 'star' },
                  { title: 'Livro', value: 'book' },
                  { title: 'Vídeo', value: 'video' },
                ]}},
                { name: 'value', title: 'Valor', type: 'string' },
                { name: 'label', title: 'Label', type: 'string' },
              ],
              preview: {
                select: { title: 'value', subtitle: 'label' },
              },
            }),
          ],
        },
      ],
    }),

    // ========================================
    // VÍDEOS DE TRANSFORMAÇÃO
    // ========================================
    defineField({
      name: 'videosSection',
      title: '🎥 Seção de Vídeos de Transformação',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'TRANSFORMAÇÃO REAL',
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'VEJA COMO NOSSOS ALUNOS TRANSFORMARAM SUAS VIDAS FINANCEIRAS',
        },
        {
          name: 'highlightedText',
          title: 'Parte Destacada (Amarela)',
          type: 'string',
          initialValue: 'ALUNOS TRANSFORMARAM',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
          initialValue: 'Histórias reais de pessoas que aplicaram os princípios das Crenças da Riqueza e mudaram completamente sua relação com o dinheiro.',
        },
        {
          name: 'videos',
          title: 'Lista de Vídeos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'youtubeId', title: 'ID do YouTube', type: 'string', description: 'Ex: sVcR5iq1BG0', validation: (Rule) => Rule.required() },
                { name: 'title', title: 'Título', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'person', title: 'Nome da Pessoa', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'description', title: 'Descrição', type: 'text', rows: 2, validation: (Rule) => Rule.required() },
                { name: 'chipLabel', title: 'Label do Chip', type: 'string', initialValue: 'História de Sucesso' },
                { name: 'thumbnail', title: 'Thumbnail Customizado (Opcional)', type: 'image' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'person' },
              },
            }),
          ],
        },
        {
          name: 'stats',
          title: 'Cards de Benefícios',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'icon', title: 'Ícone', type: 'string', options: { list: [
                  { title: 'Estrela', value: 'star' },
                  { title: 'Raio', value: 'zap' },
                  { title: 'Cérebro', value: 'brain' },
                ]}},
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descrição', type: 'text', rows: 2 },
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' },
              },
            }),
          ],
        },
        {
          name: 'ctaButtonText',
          title: 'Texto do Botão CTA',
          type: 'string',
          initialValue: 'Transformar Minha Vida Financeira!',
        },
        {
          name: 'ctaButtonLink',
          title: 'Link do Botão CTA',
          type: 'string',
          initialValue: '#inscricao',
        },
      ],
    }),

    // ========================================
    // DEPOIMENTOS SECTION
    // ========================================
    defineField({
      name: 'testimonialsSection',
      title: '💬 Seção de Depoimentos',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'DEPOIMENTOS',
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'O QUE NOSSO ALUNOS DIZEM',
        },
        {
          name: 'highlightedText',
          title: 'Parte Destacada (Amarela)',
          type: 'string',
          initialValue: 'ALUNOS DIZEM',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 2,
          initialValue: 'Conheça as histórias de transformação de pessoas que já passaram pelos nossos programas.',
        },
        {
          name: 'testimonials',
          title: 'Lista de Depoimentos',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'name', title: 'Nome', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'role', title: 'Cargo/Profissão', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'initial', title: 'Inicial do Nome', type: 'string', description: 'Uma letra para o avatar', validation: (Rule) => Rule.required().max(1) },
                { name: 'quote', title: 'Depoimento', type: 'text', rows: 4, validation: (Rule) => Rule.required() },
                { name: 'rating', title: 'Avaliação (estrelas)', type: 'number', initialValue: 5, validation: (Rule) => Rule.min(1).max(5) },
                { name: 'image', title: 'Foto (Opcional)', type: 'image', description: 'Se não informada, usa inicial' },
              ],
              preview: {
                select: { title: 'name', subtitle: 'role', media: 'image' },
              },
            }),
          ],
          validation: (Rule) => Rule.min(3),
        },
        {
          name: 'ctaText',
          title: 'Texto Antes do Botão',
          type: 'string',
          initialValue: 'Junte-se a milhares de pessoas que já transformaram suas vidas',
        },
        {
          name: 'ctaButtonText',
          title: 'Texto do Botão CTA',
          type: 'string',
          initialValue: 'COMECE SUA TRANSFORMAÇÃO',
        },
        {
          name: 'ctaButtonLink',
          title: 'Link do Botão CTA',
          type: 'string',
          initialValue: '#inscricao',
        },
      ],
    }),

    // ========================================
    // LOCALIZAÇÃO
    // ========================================
    defineField({
      name: 'locationSection',
      title: '📍 Seção de Localização',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: 'Mostrar Seção de Localização',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'address',
          title: 'Endereço',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Telefone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'mapEmbedUrl',
          title: 'URL do Mapa (Embed)',
          type: 'url',
          description: 'URL do Google Maps embed',
        },
      ],
    }),

    // ========================================
    // CONTROLES DE SEÇÕES
    // ========================================
    defineField({
      name: 'sectionControls',
      title: '⚙️ Controles de Seções',
      type: 'object',
      fields: [
        {
          name: 'showMentorSection',
          title: 'Mostrar Seção do Mentor',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showVideosSection',
          title: 'Mostrar Seção de Vídeos',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showTestimonialsSection',
          title: 'Mostrar Seção de Depoimentos',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showLocationSection',
          title: 'Mostrar Seção de Localização',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showEventPopup',
          title: 'Mostrar Popup de Evento',
          type: 'boolean',
          description: 'Popup aparece após 3 segundos',
          initialValue: false,
        },
      ],
    }),

    // ========================================
    // SEO
    // ========================================
    defineField({
      name: 'seo',
      title: '🔍 SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Título SEO',
          type: 'string',
          initialValue: 'Roberto Navarro | Transforme sua Mentalidade',
        },
        {
          name: 'metaDescription',
          title: 'Descrição SEO',
          type: 'text',
          rows: 2,
          initialValue: 'Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.',
        },
        {
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'ogImage',
          title: 'Imagem de Compartilhamento (OG Image)',
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      heroTitle: 'heroSection.title',
    },
    prepare({ title, heroTitle }) {
      return {
        title: title || 'Homepage',
        subtitle: heroTitle || 'Sem título hero',
      }
    },
  },
})

