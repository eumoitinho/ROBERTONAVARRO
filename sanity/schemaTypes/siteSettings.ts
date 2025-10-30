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
      description: 'Nome do site usado em títulos e no painel do Studio.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL do Site',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'URL principal do site (ex: https://www.seudominio.com). Usado para construir links absolutos.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Imagem do logotipo usada no cabeçalho e rodapé. Upload PNG/SVG preferido; inclua texto alternativo no campo `alt`.',
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
      description: 'Pequena frase exibida no rodapé ou em áreas promocionais.',
    }),

    // Informações de Contato
    defineField({
      name: 'contact',
      title: 'Informações de Contato',
      type: 'object',
      description: 'Informações globais de contato exibidas no rodapé e páginas de contato.',
      fields: [
        { name: 'email', title: 'E-mail', type: 'string', description: 'E-mail de contato público.' },
        { name: 'phone', title: 'Telefone', type: 'string', description: 'Telefone principal de contato.' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'string', description: 'Número de WhatsApp para contato rápido (formatar com código do país).'},
        { name: 'address', title: 'Endereço', type: 'text', rows: 3, description: 'Endereço físico exibido na seção de contato.' },
      ],
    }),

    // Redes Sociais
    defineField({
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      description: 'URLs das redes sociais oficiais. Deixe em branco para não exibir o ícone/link.',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url', description: 'URL da página do Facebook.' },
        { name: 'instagram', title: 'Instagram', type: 'url', description: 'URL do Instagram.' },
        { name: 'twitter', title: 'Twitter/X', type: 'url', description: 'URL do perfil no X/Twitter.' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url', description: 'URL do perfil ou página no LinkedIn.' },
        { name: 'youtube', title: 'YouTube', type: 'url', description: 'URL do canal do YouTube.' },
        { name: 'tiktok', title: 'TikTok', type: 'url', description: 'URL do perfil do TikTok.' },
      ],
    }),

    // Navegação Principal
    defineField({
      name: 'mainNavigation',
      title: 'Menu de Navegação Principal',
      type: 'array',
      description: 'Itens do menu principal. Use o campo `isButton` para marcar o item que deve aparecer como botão no cabeçalho.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string', description: 'Rótulo exibido no menu.' },
            { name: 'href', title: 'Link', type: 'string', description: 'URL ou âncora (ex: /formacoes ou #formacoes).' },
            { name: 'isButton', title: 'Exibir como Botão?', type: 'boolean', initialValue: false, description: 'Se true, o item será renderizado com estilo de botão.' },
            { name: 'openInNewTab', title: 'Abrir em Nova Aba?', type: 'boolean', initialValue: false, description: 'Abrir link em nova aba (target="_blank").' },
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
      description: 'Configurações exibidas no rodapé do site: texto, links e controle de redes sociais.',
      fields: [
        { name: 'copyrightText', title: 'Texto de Copyright', type: 'string', description: 'Texto de copyright exibido no rodapé. Se vazio, será usado o padrão.' },
        {
          name: 'footerLinks',
          title: 'Links do Rodapé',
          type: 'array',
          description: 'Se fornecido, substituirá a lista padrão de links do rodapé.',
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
        { name: 'showSocialMedia', title: 'Mostrar Redes Sociais?', type: 'boolean', initialValue: true, description: 'Habilitar/Desabilitar ícones de redes sociais no rodapé.' },
      ],
    }),

    // SEO Global
    defineField({
      name: 'seo',
      title: 'SEO Padrão',
      type: 'object',
      description: 'Valores padrão de SEO aplicados quando a página não fornece metadados específicos.',
      fields: [
        { name: 'defaultMetaTitle', title: 'Título SEO Padrão', type: 'string', description: 'Título padrão utilizado no meta title.' },
        { name: 'defaultMetaDescription', title: 'Descrição SEO Padrão', type: 'text', rows: 3, description: 'Descrição padrão para meta description.' },
        { name: 'defaultOgImage', title: 'Imagem OG Padrão', type: 'image', description: 'Imagem padrão para Open Graph (1200x630 recomendado).' },
        { name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string', description: 'ID do Google Analytics (UA/GA4).'},
        { name: 'facebookPixelId', title: 'Facebook Pixel ID', type: 'string', description: 'ID do pixel do Facebook, se aplicável.' },
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
      description: 'Campos para adicionar scripts de integração e CSS global (use com cautela).',
      fields: [
        { name: 'headerScripts', title: 'Scripts no <head>', type: 'text', rows: 5, description: 'Scripts a serem inseridos no head (ex: tags de verificação).'} ,
        { name: 'bodyScripts', title: 'Scripts no <body>', type: 'text', rows: 5, description: 'Scripts a serem inseridos no final do body (ex: pixels, custom tracking).'},
        { name: 'customCSS', title: 'CSS Global Customizado', type: 'text', rows: 5, description: 'CSS global que será aplicado ao site; consulte o time de frontend antes de usar.'},
      ],
    }),
  ],

  preview: {
    select: {
      title: 'siteName',
    },
  },
});
