import type { CollectionConfig } from 'payload'

const Webhooks: CollectionConfig = {
  slug: 'webhooks',
  admin: {
    useAsTitle: 'name',
    group: 'Configurações',
    defaultColumns: ['name', 'url', 'collection', 'events', 'enabled', 'updatedAt'],
    description: 'Configure webhooks para receber notificações quando documentos são criados, atualizados ou deletados.',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome do Webhook',
      required: true,
      admin: {
        description: 'Nome descritivo para identificar este webhook',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Habilitado',
      defaultValue: true,
      admin: {
        description: 'Ativar ou desativar este webhook',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL do Webhook',
      required: true,
      admin: {
        description: 'URL completa que receberá as notificações (ex: https://api.exemplo.com/webhook)',
      },
      validate: (value: string | null | undefined) => {
        if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
          return 'A URL deve começar com http:// ou https://'
        }
        return true
      },
    },
    {
      name: 'collection',
      type: 'select',
      label: 'Collection',
      required: true,
      options: [
        { label: 'Formações', value: 'formacoes' },
        { label: 'Eventos', value: 'eventos' },
        { label: 'Livros', value: 'livros' },
        { label: 'Blog', value: 'blog' },
        { label: 'Páginas', value: 'pages' },
        { label: 'Mentores', value: 'mentores' },
        { label: 'Depoimentos', value: 'testimonials' },
        { label: 'FAQs', value: 'faqs' },
        { label: 'Formulários', value: 'forms' },
        { label: 'Mídia', value: 'media' },
      ],
      admin: {
        description: 'Collection que será monitorada',
      },
    },
    {
      name: 'events',
      type: 'select',
      label: 'Eventos',
      required: true,
      hasMany: true,
      options: [
        { label: 'Criar (create)', value: 'create' },
        { label: 'Atualizar (update)', value: 'update' },
        { label: 'Deletar (delete)', value: 'delete' },
        { label: 'Depois de Mudança (afterChange)', value: 'afterChange' },
        { label: 'Depois de Criar (afterCreate)', value: 'afterCreate' },
        { label: 'Depois de Atualizar (afterUpdate)', value: 'afterUpdate' },
        { label: 'Depois de Deletar (afterDelete)', value: 'afterDelete' },
      ],
      defaultValue: ['afterChange'],
      admin: {
        description: 'Selecione quais eventos devem disparar este webhook',
      },
    },
    {
      name: 'method',
      type: 'select',
      label: 'Método HTTP',
      defaultValue: 'POST',
      options: [
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' },
      ],
    },
    {
      name: 'headers',
      type: 'array',
      label: 'Headers Customizados',
      admin: {
        description: 'Headers adicionais para enviar com o webhook (ex: Authorization, X-API-Key)',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          label: 'Chave',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Valor',
          required: true,
        },
      ],
    },
    {
      name: 'secret',
      type: 'text',
      label: 'Secret (Opcional)',
      admin: {
        description: 'Secret para assinar o payload do webhook (será enviado no header X-Webhook-Signature)',
      },
    },
    {
      name: 'timeout',
      type: 'number',
      label: 'Timeout (segundos)',
      defaultValue: 10,
      admin: {
        description: 'Tempo máximo de espera pela resposta do webhook',
      },
    },
    {
      name: 'retryOnFailure',
      type: 'checkbox',
      label: 'Tentar Novamente em Caso de Falha',
      defaultValue: false,
      admin: {
        description: 'Se habilitado, tentará reenviar o webhook em caso de falha',
      },
    },
    {
      name: 'maxRetries',
      type: 'number',
      label: 'Máximo de Tentativas',
      defaultValue: 3,
      admin: {
        condition: (data) => data?.retryOnFailure === true,
        description: 'Número máximo de tentativas em caso de falha',
      },
    },
    {
      name: 'lastTriggered',
      type: 'date',
      label: 'Última Execução',
      admin: {
        readOnly: true,
        description: 'Data e hora da última execução do webhook',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      access: {
        update: () => false, // Não permitir edição manual
      },
    },
    {
      name: 'lastStatus',
      type: 'select',
      label: 'Último Status',
      admin: {
        readOnly: true,
        description: 'Status da última execução',
      },
      options: [
        { label: 'Sucesso', value: 'success' },
        { label: 'Erro', value: 'error' },
        { label: 'Timeout', value: 'timeout' },
        { label: 'Nunca executado', value: 'never' },
      ],
      defaultValue: 'never',
      access: {
        update: () => false, // Não permitir edição manual
      },
    },
    {
      name: 'lastResponse',
      type: 'textarea',
      label: 'Última Resposta',
      admin: {
        readOnly: true,
        description: 'Resposta da última execução do webhook',
      },
      access: {
        update: () => false, // Não permitir edição manual
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Não disparar webhook quando o próprio webhook é criado/atualizado
        // para evitar loops infinitos
        return
      },
    ],
  },
}

export default Webhooks

