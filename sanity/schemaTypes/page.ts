import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  fields: [
    // Informações Básicas
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Nome interno da página (não aparece no site)',
    }),
    defineField({
      name: 'slug',
      title: 'URL da Página',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL única da página (ex: /eventos/mentor-milionario)',
    }),
    defineField({
      name: 'isActive',
      title: 'Página Ativa?',
      type: 'boolean',
      initialValue: true,
      description: 'Desative para remover a página do site',
    }),

    // Hero Section (Seção Principal)
    defineField({
      name: 'heroSection',
      title: 'Seção Hero (Topo da Página)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'Título grande exibido no topo da página (hero). Mantenha curto e impactante.',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
          rows: 3,
          description: 'Linha menor abaixo do título para complementar a mensagem principal.',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 4,
          description: 'Parágrafo curto explicando o conteúdo do topo da página; usado em SEO e social thumb quando aplicável.',
        },
        {
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
              description: 'Texto alternativo (alt) para leitores de tela — descreva a imagem brevemente.',
            },
          ],
        },
        {
          name: 'backgroundColor',
          title: 'Cor de Fundo (se não usar imagem)',
          type: 'string',
          options: {
            list: [
              { title: 'Preto/Cinza Escuro', value: 'bg-zinc-950' },
              { title: 'Gradiente Dourado', value: 'bg-gradient-to-r from-yellow-500 to-amber-600' },
              { title: 'Gradiente Escuro', value: 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900' },
              { title: 'Transparente', value: 'bg-transparent' },
            ],
          },
          initialValue: 'bg-zinc-950',
        },
        {
          name: 'textColor',
          title: 'Cor do Texto',
          type: 'string',
          options: {
            list: [
              { title: 'Branco', value: 'text-white' },
              { title: 'Preto', value: 'text-black' },
              { title: 'Dourado', value: 'text-yellow-500' },
            ],
          },
          initialValue: 'text-white',
        },
        {
          name: 'primaryButton',
          title: 'Botão Principal',
          type: 'object',
          fields: [
            { name: 'text', title: 'Texto do Botão', type: 'string', description: 'Texto curto do botão (ex: Inscreva-se, Saiba Mais).' },
            { name: 'link', title: 'Link', type: 'string', description: 'URL interna ou externa que o botão deve abrir.' },
            { name: 'openInNewTab', title: 'Abrir em Nova Aba?', type: 'boolean', initialValue: false, description: 'Marque se o link deve abrir em nova aba.' },
          ],
        },
        {
          name: 'secondaryButton',
          title: 'Botão Secundário (Opcional)',
          type: 'object',
          fields: [
            { name: 'text', title: 'Texto do Botão', type: 'string', description: 'Texto curto do botão secundário.' },
            { name: 'link', title: 'Link', type: 'string', description: 'URL para o botão secundário.' },
            { name: 'openInNewTab', title: 'Abrir em Nova Aba?', type: 'boolean', initialValue: false, description: 'Marque para abrir em nova aba.' },
          ],
        },
      ],
    }),

    // Conteúdo Principal
    defineField({
      name: 'mainContent',
      title: 'Conteúdo Principal',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Citação', value: 'blockquote' },
          ],
          lists: [
            { title: 'Lista com marcadores', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
              { title: 'Sublinhado', value: 'underline' },
              { title: 'Destaque Dourado', value: 'highlight' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Abrir em nova aba?',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
            },
          ],
        },
      ],
    }),

    // Seções de Conteúdo (Blocos Reutilizáveis)
    defineField({
      name: 'contentSections',
      title: 'Seções de Conteúdo',
      type: 'array',
      of: [
        {
          name: 'textSection',
          title: 'Seção de Texto',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'subtitle', title: 'Subtítulo', type: 'string' },
            { name: 'content', title: 'Conteúdo', type: 'text', rows: 8 },
            {
              name: 'backgroundColor',
              title: 'Cor de Fundo',
              type: 'string',
              options: {
                list: [
                  { title: 'Transparente', value: 'bg-transparent' },
                  { title: 'Cinza Escuro', value: 'bg-zinc-900' },
                  { title: 'Dourado', value: 'bg-gradient-to-r from-yellow-500 to-amber-600' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
            },
          },
        },
        {
          name: 'imageSection',
          title: 'Seção com Imagem',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            {
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Texto Alternativo' }],
            },
            { name: 'caption', title: 'Legenda', type: 'string' },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Imagem à Esquerda', value: 'left' },
                  { title: 'Imagem à Direita', value: 'right' },
                  { title: 'Imagem no Centro', value: 'center' },
                  { title: 'Imagem em Tela Cheia', value: 'full' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
        {
          name: 'ctaSection',
          title: 'Seção de Call-to-Action',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descrição', type: 'text' },
            { name: 'buttonText', title: 'Texto do Botão', type: 'string' },
            { name: 'buttonLink', title: 'Link do Botão', type: 'string' },
            {
              name: 'style',
              title: 'Estilo',
              type: 'string',
              options: {
                list: [
                  { title: 'Dourado', value: 'gold' },
                  { title: 'Preto', value: 'dark' },
                  { title: 'Branco', value: 'light' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'buttonText',
            },
          },
        },
        {
          name: 'featuresSection',
          title: 'Seção de Benefícios/Características',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título da Seção', type: 'string' },
            {
              name: 'features',
              title: 'Benefícios',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'icon', title: 'Ícone (emoji ou texto)', type: 'string' },
                    { name: 'title', title: 'Título', type: 'string' },
                    { name: 'description', title: 'Descrição', type: 'text' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
        {
          name: 'videoSection',
          title: 'Seção de Vídeo',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'videoUrl', title: 'URL do Vídeo (YouTube/Vimeo)', type: 'url' },
            { name: 'description', title: 'Descrição', type: 'text' },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
    }),

    // Galeria de Imagens
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
            },
          ],
        },
      ],
    }),

    // Depoimentos
    defineField({
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nome', type: 'string' },
            { name: 'role', title: 'Cargo/Função', type: 'string' },
            { name: 'content', title: 'Depoimento', type: 'text', rows: 4 },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
            },
            { name: 'rating', title: 'Avaliação (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
    }),

    // FAQ
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Pergunta', type: 'string' },
            { name: 'answer', title: 'Resposta', type: 'text', rows: 4 },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO & Metadados',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Título SEO',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'Título que aparece nos resultados de busca (máx. 60 caracteres)',
        },
        {
          name: 'metaDescription',
          title: 'Descrição SEO',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: 'Descrição que aparece nos resultados de busca (máx. 160 caracteres)',
        },
        {
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'ogImage',
          title: 'Imagem de Compartilhamento (Open Graph)',
          type: 'image',
          description: 'Imagem que aparece quando a página é compartilhada em redes sociais (1200x630px recomendado)',
        },
        {
          name: 'noIndex',
          title: 'Não indexar esta página?',
          type: 'boolean',
          initialValue: false,
          description: 'Impede que a página apareça nos resultados de busca',
        },
      ],
    }),

    // Configurações Avançadas
    defineField({
      name: 'settings',
      title: 'Configurações da Página',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'showHeader',
          title: 'Mostrar Cabeçalho?',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showFooter',
          title: 'Mostrar Rodapé?',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showWhatsAppButton',
          title: 'Mostrar Botão do WhatsApp?',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'customCSS',
          title: 'CSS Customizado',
          type: 'text',
          rows: 5,
          description: 'CSS personalizado para esta página específica',
        },
      ],
    }),

    // Metadados de Sistema
    defineField({
      name: 'pageType',
      title: 'Tipo de Página',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Evento', value: 'event' },
          { title: 'Formação', value: 'formation' },
          { title: 'Livro', value: 'book' },
          { title: 'Landing Page', value: 'landing' },
          { title: 'Institucional', value: 'institutional' },
          { title: 'Blog', value: 'blog' },
          { title: 'Outra', value: 'other' },
        ],
      },
      initialValue: 'other',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Ordem de exibição no menu (menor número aparece primeiro)',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isActive: 'isActive',
      pageType: 'pageType',
    },
    prepare({ title, slug, isActive, pageType }) {
      return {
        title: title,
        subtitle: `/${slug} ${isActive ? '✅' : '❌'} [${pageType}]`,
      };
    },
  },
});
