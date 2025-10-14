import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    // Informações Básicas
    defineField({
      name: 'siteName',
      title: 'Nome do Site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL do Site',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
    }),

    // Informações de Contato
    defineField({
      name: 'contact',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        { name: 'email', title: 'E-mail', type: 'string' },
        { name: 'phone', title: 'Telefone', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
        { name: 'address', title: 'Endereço', type: 'text', rows: 3 },
      ],
    }),

    // Redes Sociais
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
      ],
    }),

    // Navegação Principal
    defineField({
      name: 'mainNavigation',
      title: 'Menu de Navegação Principal',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
            { name: 'isButton', title: 'Exibir como Botão?', type: 'boolean', initialValue: false },
            { name: 'openInNewTab', title: 'Abrir em Nova Aba?', type: 'boolean', initialValue: false },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'href',
            },
          },
        },
      ],
    }),

    // Rodapé
    defineField({
      name: 'footer',
      title: 'Configurações do Rodapé',
      type: 'object',
      fields: [
        { name: 'copyrightText', title: 'Texto de Copyright', type: 'string' },
        {
          name: 'footerLinks',
          title: 'Links do Rodapé',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
              ],
            },
          ],
        },
        { name: 'showSocialMedia', title: 'Mostrar Redes Sociais?', type: 'boolean', initialValue: true },
      ],
    }),

    // SEO Global
    defineField({
      name: 'seo',
      title: 'SEO Padrão',
      type: 'object',
      fields: [
        { name: 'defaultMetaTitle', title: 'Título SEO Padrão', type: 'string' },
        { name: 'defaultMetaDescription', title: 'Descrição SEO Padrão', type: 'text', rows: 3 },
        { name: 'defaultOgImage', title: 'Imagem OG Padrão', type: 'image' },
        { name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string' },
        { name: 'facebookPixelId', title: 'Facebook Pixel ID', type: 'string' },
      ],
    }),

    // Scripts e Integrações
    defineField({
      name: 'scripts',
      title: 'Scripts e Integrações',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        { name: 'headerScripts', title: 'Scripts no <head>', type: 'text', rows: 5 },
        { name: 'bodyScripts', title: 'Scripts no <body>', type: 'text', rows: 5 },
        { name: 'customCSS', title: 'CSS Global Customizado', type: 'text', rows: 5 },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'siteName',
    },
  },
});
