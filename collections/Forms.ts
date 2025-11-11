import { CollectionConfig } from 'payload/types'

const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'name',
    group: 'Conteúdo',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome do Formulário',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'Identificador único do formulário (ex: contato, newsletter). Será gerado automaticamente se não preenchido.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      admin: {
        description: 'Descrição do propósito do formulário',
      },
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Campos do Formulário',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nome do Campo',
          required: true,
          admin: {
            description: 'Nome técnico do campo (ex: email, nome)',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            description: 'Texto exibido ao usuário',
          },
        },
        {
          name: 'type',
          type: 'select',
          label: 'Tipo de Campo',
          required: true,
          options: [
            { label: 'Texto', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Telefone', value: 'tel' },
            { label: 'Número', value: 'number' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Radio', value: 'radio' },
            { label: 'Data', value: 'date' },
            { label: 'Arquivo', value: 'file' },
          ],
          defaultValue: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Obrigatório',
          defaultValue: false,
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder',
        },
        {
          name: 'options',
          type: 'array',
          label: 'Opções (para select/radio)',
          admin: {
            condition: (_data, siblingData) => 
              siblingData?.type === 'select' || siblingData?.type === 'radio',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
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
          name: 'validation',
          type: 'group',
          label: 'Validação',
          fields: [
            {
              name: 'minLength',
              type: 'number',
              label: 'Tamanho Mínimo',
            },
            {
              name: 'maxLength',
              type: 'number',
              label: 'Tamanho Máximo',
            },
            {
              name: 'pattern',
              type: 'text',
              label: 'Padrão Regex',
              admin: {
                description: 'Expressão regular para validação',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Configurações',
      fields: [
        {
          name: 'submitText',
          type: 'text',
          label: 'Texto do Botão de Envio',
          defaultValue: 'Enviar',
        },
        {
          name: 'successMessage',
          type: 'textarea',
          label: 'Mensagem de Sucesso',
          defaultValue: 'Obrigado! Seu formulário foi enviado com sucesso.',
        },
        {
          name: 'redirectUrl',
          type: 'text',
          label: 'URL de Redirecionamento',
          admin: {
            description: 'URL para redirecionar após envio (opcional)',
          },
        },
        {
          name: 'emailNotifications',
          type: 'group',
          label: 'Notificações por Email',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Habilitar Notificações',
              defaultValue: false,
            },
            {
              name: 'to',
              type: 'text',
              label: 'Email Destinatário',
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa
                  return data?.settings?.emailNotifications?.enabled === true
                },
              },
            },
            {
              name: 'subject',
              type: 'text',
              label: 'Assunto do Email',
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa
                  return data?.settings?.emailNotifications?.enabled === true
                },
              },
            },
          ],
        },
        {
          name: 'googleSheets',
          type: 'group',
          label: 'Google Sheets',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Enviar para Google Sheets',
              defaultValue: false,
              admin: {
                description: 'Enviar dados do formulário para uma planilha do Google Sheets',
              },
            },
            {
              name: 'scriptUrl',
              type: 'text',
              label: 'URL do Google Apps Script',
              required: false,
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa
                  return data?.settings?.googleSheets?.enabled === true
                },
                description: 'URL do Google Apps Script que adiciona dados à planilha. Ex: https://script.google.com/macros/s/SEU_SCRIPT_ID/exec',
              },
            },
            {
              name: 'sheetName',
              type: 'text',
              label: 'Nome da Planilha (Opcional)',
              required: false,
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa
                  return data?.settings?.googleSheets?.enabled === true
                },
                description: 'Nome da aba da planilha (opcional, deixa em branco para usar a primeira aba)',
              },
            },
          ],
        },
        {
          name: 'webhook',
          type: 'group',
          label: 'Webhook',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Habilitar Webhook',
              defaultValue: false,
              admin: {
                description: 'Enviar dados do formulário para uma URL externa',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL do Webhook',
              required: false,
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa (para casos de carregamento)
                  return data?.settings?.webhook?.enabled === true
                },
                description: 'URL completa do webhook (ex: https://api.exemplo.com/webhook ou URL do Google Apps Script)',
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
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa
                  return data?.settings?.webhook?.enabled === true
                },
              },
            },
            {
              name: 'headers',
              type: 'array',
              label: 'Headers Customizados',
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa
                  return data?.settings?.webhook?.enabled === true
                },
                description: 'Headers adicionais para enviar com o webhook (ex: Authorization)',
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
              name: 'timeout',
              type: 'number',
              label: 'Timeout (segundos)',
              defaultValue: 10,
              admin: {
                condition: (data, siblingData) => {
                  // Verificar no siblingData (mesmo grupo) primeiro
                  if (siblingData && typeof siblingData.enabled === 'boolean') {
                    return siblingData.enabled === true
                  }
                  // Fallback para data completa
                  return data?.settings?.webhook?.enabled === true
                },
                description: 'Tempo máximo de espera pela resposta do webhook',
              },
            },
          ],
        },
      ],
    },
    // Submissões serão gerenciadas via API, não diretamente no admin
    // Para ver submissões, use a rota /api/forms/[slug]/submissions
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-gerar slug se não fornecido
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        
        // Garantir que fields seja um array válido
        if (!Array.isArray(data.fields)) {
          data.fields = []
        }
        
        // Garantir que settings exista com valores padrão
        if (!data.settings) {
          data.settings = {}
        }
        if (!data.settings.submitText) {
          data.settings.submitText = 'Enviar'
        }
        if (!data.settings.successMessage) {
          data.settings.successMessage = 'Obrigado! Seu formulário foi enviado com sucesso.'
        }
        
        return data
      },
    ],
  },
}

export default Forms

