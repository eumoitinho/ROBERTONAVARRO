import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'integrations',
  title: 'Integrações e Webhooks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Nome identificador desta configuração (ex: "Configurações de Produção")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Ativa',
      type: 'boolean',
      description: 'Se esta configuração está ativa (apenas uma pode estar ativa por vez)',
      initialValue: false,
    }),
    defineField({
      name: 'googleSheets',
      title: 'Google Sheets',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Habilitado',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'webhookUrl',
          title: 'URL do Google Apps Script',
          type: 'url',
          description: 'URL do webhook do Google Apps Script para enviar dados para a planilha',
        }),
      ],
    }),
    defineField({
      name: 'leadLovers',
      title: 'LeadLovers',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Habilitado',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'webhookUrl',
          title: 'URL do Webhook',
          type: 'url',
        }),
        defineField({
          name: 'authKey',
          title: 'Chave de Autenticação',
          type: 'string',
          description: 'Bearer token para autenticação',
        }),
        defineField({
          name: 'machineCode',
          title: 'Machine Code',
          type: 'number',
        }),
        defineField({
          name: 'sequenceCode',
          title: 'Sequence Code',
          type: 'number',
        }),
        defineField({
          name: 'levelCode',
          title: 'Level Code',
          type: 'number',
        }),
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'kommoWebhooks',
      title: 'Webhooks do Kommo por Origem',
      type: 'array',
      description: 'Configure webhooks específicos para cada página/evento',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'source',
              title: 'Origem/Source',
              type: 'string',
              description: 'Nome da página/evento (ex: "Energia do Dinheiro", "energia-do-dinheiro")',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'webhookUrl',
              title: 'URL do Webhook',
              type: 'url',
              description: 'URL do webhook do Kommo para esta origem',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
              description: 'Descrição opcional para identificar este webhook',
            }),
          ],
          preview: {
            select: {
              title: 'source',
              subtitle: 'webhookUrl',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'defaultKommoWebhook',
      title: 'Webhook Padrão do Kommo',
      type: 'url',
      description: 'URL do webhook padrão caso não exista um específico para a origem',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title,
        subtitle: isActive ? '✅ Ativa' : '⚪ Inativa',
      }
    },
  },
})
