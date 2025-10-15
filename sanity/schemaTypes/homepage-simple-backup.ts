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
    }),
    
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Seção Hero (Topo da Página)',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Texto do Badge',
          type: 'string',
          description: 'Texto pequeno acima do título principal',
          initialValue: 'INSTITUTO COACHING FINANCEIRO',
        },
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          description: 'Primeira parte do título (em amarelo)',
          initialValue: 'TRANSFORME SUA MENTALIDADE',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'string',
          description: 'Segunda parte do título (em branco)',
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
          description: 'Imagem de fundo da seção hero',
          options: {
            hotspot: true,
          },
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
          description: 'Ex: 300.000+',
          initialValue: '300.000+',
        },
        {
          name: 'achievementsLabel',
          title: 'Label das Conquistas',
          type: 'string',
          description: 'Ex: vidas transformadas',
          initialValue: 'vidas transformadas',
        },
      ],
    }),

    // Formações Section
    defineField({
      name: 'formacoesSection',
      title: 'Seção de Formações',
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
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'FORMAÇÕES QUE VÃO TRANSFORMAR SUA MENTALIDADE',
        },
        {
          name: 'highlightedText',
          title: 'Parte Destacada do Título',
          type: 'string',
          description: 'Parte do título que aparece em amarelo',
          initialValue: 'TRANSFORMAR SUA MENTALIDADE',
        },
        {
          name: 'description',
          title: 'Descrição da Seção',
          type: 'text',
          rows: 3,
          initialValue: 'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
        },
        {
          name: 'formacoes',
          title: 'Lista de Formações',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Título da Formação',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'link',
                  title: 'Link da Página',
                  type: 'string',
                  description: 'Ex: /formacoes/mentoria',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'buttonText',
                  title: 'Texto do Botão',
                  type: 'string',
                  initialValue: 'SAIBA MAIS',
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
              },
            }),
          ],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    }),

    // Seções Adicionais
    defineField({
      name: 'showQuemSomosSection',
      title: 'Mostrar Seção "Quem Somos"',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showTransformationVideos',
      title: 'Mostrar Seção de Vídeos de Transformação',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showTestimonials',
      title: 'Mostrar Seção de Depoimentos',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showLocationMap',
      title: 'Mostrar Mapa de Localização',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showEventPopup',
      title: 'Mostrar Popup de Evento',
      type: 'boolean',
      description: 'Mostrar popup automático após 3 segundos',
      initialValue: false,
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
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

