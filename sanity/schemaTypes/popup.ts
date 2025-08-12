import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'popup',
  title: 'Pop-up',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Pop-up',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Identificador',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Tipo de Pop-up',
      type: 'string',
      options: {
        list: [
          {title: 'Lead Capture', value: 'lead'},
          {title: 'Anúncio', value: 'announcement'},
          {title: 'Oferta', value: 'offer'},
          {title: 'Newsletter', value: 'newsletter'},
          {title: 'Exit Intent', value: 'exit'},
          {title: 'Tempo na Página', value: 'time'},
          {title: 'Scroll', value: 'scroll'},
          {title: 'Cookie Consent', value: 'cookie'},
          {title: 'Promoção', value: 'promotion'},
          {title: 'Vídeo', value: 'video'},
          {title: 'Formulário', value: 'form'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Título Principal',
          type: 'string',
        },
        {
          name: 'subheadline',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'body',
          title: 'Corpo do Texto',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'image',
          title: 'Imagem',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'videoUrl',
          title: 'URL do Vídeo',
          type: 'url',
        }
      ]
    }),
    defineField({
      name: 'form',
      title: 'Formulário',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Habilitar Formulário',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'fields',
          title: 'Campos do Formulário',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Nome do Campo',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'type',
                  title: 'Tipo',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Texto', value: 'text'},
                      {title: 'Email', value: 'email'},
                      {title: 'Telefone', value: 'tel'},
                      {title: 'Número', value: 'number'},
                      {title: 'Área de Texto', value: 'textarea'},
                      {title: 'Select', value: 'select'},
                      {title: 'Checkbox', value: 'checkbox'},
                      {title: 'Radio', value: 'radio'},
                      {title: 'Data', value: 'date'},
                      {title: 'Arquivo', value: 'file'}
                    ]
                  }
                },
                {
                  name: 'placeholder',
                  title: 'Placeholder',
                  type: 'string',
                },
                {
                  name: 'required',
                  title: 'Obrigatório',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'options',
                  title: 'Opções (para select/radio)',
                  type: 'array',
                  of: [{type: 'string'}]
                },
                {
                  name: 'validation',
                  title: 'Validação',
                  type: 'string',
                  description: 'Regex de validação'
                }
              ]
            }
          ]
        },
        {
          name: 'submitButton',
          title: 'Botão de Envio',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto',
              type: 'string',
              initialValue: 'Enviar'
            },
            {
              name: 'loadingText',
              title: 'Texto Carregando',
              type: 'string',
              initialValue: 'Enviando...'
            }
          ]
        },
        {
          name: 'successMessage',
          title: 'Mensagem de Sucesso',
          type: 'text',
        },
        {
          name: 'errorMessage',
          title: 'Mensagem de Erro',
          type: 'text',
        },
        {
          name: 'redirectUrl',
          title: 'URL de Redirecionamento',
          type: 'string',
          description: 'Redirecionar após sucesso'
        },
        {
          name: 'integration',
          title: 'Integração',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Tipo de Integração',
              type: 'string',
              options: {
                list: [
                  {title: 'Webhook', value: 'webhook'},
                  {title: 'Email', value: 'email'},
                  {title: 'ActiveCampaign', value: 'activecampaign'},
                  {title: 'Mailchimp', value: 'mailchimp'},
                  {title: 'HubSpot', value: 'hubspot'},
                  {title: 'RD Station', value: 'rdstation'},
                  {title: 'Leadlovers', value: 'leadlovers'},
                  {title: 'API Custom', value: 'custom'}
                ]
              }
            },
            {
              name: 'endpoint',
              title: 'Endpoint/URL',
              type: 'string',
            },
            {
              name: 'apiKey',
              title: 'API Key',
              type: 'string',
            },
            {
              name: 'listId',
              title: 'ID da Lista',
              type: 'string',
            },
            {
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{type: 'string'}]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'buttons',
      title: 'Botões de Ação',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
            {
              name: 'style',
              title: 'Estilo',
              type: 'string',
              options: {
                list: [
                  {title: 'Primário', value: 'primary'},
                  {title: 'Secundário', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                  {title: 'Ghost', value: 'ghost'},
                  {title: 'Link', value: 'link'}
                ]
              }
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
            },
            {
              name: 'action',
              title: 'Ação',
              type: 'string',
              options: {
                list: [
                  {title: 'Link', value: 'link'},
                  {title: 'Fechar', value: 'close'},
                  {title: 'Submit', value: 'submit'},
                  {title: 'Download', value: 'download'},
                  {title: 'WhatsApp', value: 'whatsapp'},
                  {title: 'Email', value: 'email'},
                  {title: 'Phone', value: 'phone'}
                ]
              }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'trigger',
      title: 'Gatilho de Exibição',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Tipo de Gatilho',
          type: 'string',
          options: {
            list: [
              {title: 'Imediato', value: 'immediate'},
              {title: 'Tempo na Página', value: 'time'},
              {title: 'Scroll', value: 'scroll'},
              {title: 'Exit Intent', value: 'exit'},
              {title: 'Click', value: 'click'},
              {title: 'Inatividade', value: 'inactivity'}
            ]
          },
          validation: Rule => Rule.required()
        },
        {
          name: 'delay',
          title: 'Atraso (segundos)',
          type: 'number',
          hidden: ({parent}) => parent?.type !== 'time' && parent?.type !== 'inactivity'
        },
        {
          name: 'scrollPercentage',
          title: 'Porcentagem de Scroll',
          type: 'number',
          validation: Rule => Rule.min(0).max(100),
          hidden: ({parent}) => parent?.type !== 'scroll'
        },
        {
          name: 'selector',
          title: 'Seletor CSS',
          type: 'string',
          hidden: ({parent}) => parent?.type !== 'click'
        }
      ]
    }),
    defineField({
      name: 'display',
      title: 'Configurações de Exibição',
      type: 'object',
      fields: [
        {
          name: 'position',
          title: 'Posição',
          type: 'string',
          options: {
            list: [
              {title: 'Centro', value: 'center'},
              {title: 'Topo', value: 'top'},
              {title: 'Fundo', value: 'bottom'},
              {title: 'Canto Superior Direito', value: 'top-right'},
              {title: 'Canto Superior Esquerdo', value: 'top-left'},
              {title: 'Canto Inferior Direito', value: 'bottom-right'},
              {title: 'Canto Inferior Esquerdo', value: 'bottom-left'},
              {title: 'Tela Cheia', value: 'fullscreen'},
              {title: 'Slide Lateral', value: 'slide'}
            ]
          },
          initialValue: 'center'
        },
        {
          name: 'size',
          title: 'Tamanho',
          type: 'string',
          options: {
            list: [
              {title: 'Pequeno', value: 'small'},
              {title: 'Médio', value: 'medium'},
              {title: 'Grande', value: 'large'},
              {title: 'Extra Grande', value: 'xlarge'},
              {title: 'Tela Cheia', value: 'fullscreen'},
              {title: 'Customizado', value: 'custom'}
            ]
          },
          initialValue: 'medium'
        },
        {
          name: 'customSize',
          title: 'Tamanho Customizado',
          type: 'object',
          fields: [
            {
              name: 'width',
              title: 'Largura',
              type: 'string',
            },
            {
              name: 'height',
              title: 'Altura',
              type: 'string',
            },
            {
              name: 'maxWidth',
              title: 'Largura Máxima',
              type: 'string',
            },
            {
              name: 'maxHeight',
              title: 'Altura Máxima',
              type: 'string',
            }
          ],
          hidden: ({parent}) => parent?.size !== 'custom'
        },
        {
          name: 'animation',
          title: 'Animação',
          type: 'string',
          options: {
            list: [
              {title: 'Fade', value: 'fade'},
              {title: 'Slide', value: 'slide'},
              {title: 'Zoom', value: 'zoom'},
              {title: 'Bounce', value: 'bounce'},
              {title: 'Flip', value: 'flip'},
              {title: 'Rotate', value: 'rotate'}
            ]
          },
          initialValue: 'fade'
        },
        {
          name: 'overlay',
          title: 'Overlay',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'overlayColor',
          title: 'Cor do Overlay',
          type: 'string',
          initialValue: 'rgba(0,0,0,0.5)'
        },
        {
          name: 'closeButton',
          title: 'Botão Fechar',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'closeOnOverlay',
          title: 'Fechar ao Clicar no Overlay',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'closeOnEsc',
          title: 'Fechar com ESC',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'targeting',
      title: 'Segmentação',
      type: 'object',
      fields: [
        {
          name: 'pages',
          title: 'Páginas',
          type: 'array',
          of: [{type: 'string'}],
          description: 'URLs ou padrões de página onde exibir'
        },
        {
          name: 'excludePages',
          title: 'Excluir Páginas',
          type: 'array',
          of: [{type: 'string'}],
          description: 'URLs ou padrões de página onde NÃO exibir'
        },
        {
          name: 'devices',
          title: 'Dispositivos',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            list: [
              {title: 'Desktop', value: 'desktop'},
              {title: 'Tablet', value: 'tablet'},
              {title: 'Mobile', value: 'mobile'}
            ]
          }
        },
        {
          name: 'userStatus',
          title: 'Status do Usuário',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            list: [
              {title: 'Novo Visitante', value: 'new'},
              {title: 'Visitante Recorrente', value: 'returning'},
              {title: 'Logado', value: 'logged'},
              {title: 'Não Logado', value: 'guest'}
            ]
          }
        },
        {
          name: 'utmParameters',
          title: 'Parâmetros UTM',
          type: 'object',
          fields: [
            {
              name: 'source',
              title: 'UTM Source',
              type: 'string',
            },
            {
              name: 'medium',
              title: 'UTM Medium',
              type: 'string',
            },
            {
              name: 'campaign',
              title: 'UTM Campaign',
              type: 'string',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'frequency',
      title: 'Frequência de Exibição',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Tipo',
          type: 'string',
          options: {
            list: [
              {title: 'Sempre', value: 'always'},
              {title: 'Uma vez por Sessão', value: 'session'},
              {title: 'Uma vez por Dia', value: 'daily'},
              {title: 'Uma vez por Semana', value: 'weekly'},
              {title: 'Uma vez por Mês', value: 'monthly'},
              {title: 'Uma vez Total', value: 'once'}
            ]
          },
          initialValue: 'session'
        },
        {
          name: 'maxImpressions',
          title: 'Máximo de Impressões',
          type: 'number',
        },
        {
          name: 'cookieName',
          title: 'Nome do Cookie',
          type: 'string',
        },
        {
          name: 'cookieDuration',
          title: 'Duração do Cookie (dias)',
          type: 'number',
          initialValue: 30
        }
      ]
    }),
    defineField({
      name: 'styling',
      title: 'Estilização',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Cor de Fundo',
          type: 'string',
        },
        {
          name: 'textColor',
          title: 'Cor do Texto',
          type: 'string',
        },
        {
          name: 'borderRadius',
          title: 'Bordas Arredondadas',
          type: 'string',
        },
        {
          name: 'padding',
          title: 'Espaçamento Interno',
          type: 'string',
        },
        {
          name: 'customCSS',
          title: 'CSS Customizado',
          type: 'text',
        }
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'trackViews',
          title: 'Rastrear Visualizações',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'trackClicks',
          title: 'Rastrear Cliques',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'trackConversions',
          title: 'Rastrear Conversões',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'conversionGoal',
          title: 'Meta de Conversão',
          type: 'string',
        },
        {
          name: 'gaEvent',
          title: 'Evento Google Analytics',
          type: 'string',
        },
        {
          name: 'fbPixelEvent',
          title: 'Evento Facebook Pixel',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'schedule',
      title: 'Agendamento',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Data de Início',
          type: 'datetime',
        },
        {
          name: 'endDate',
          title: 'Data de Término',
          type: 'datetime',
        },
        {
          name: 'timezone',
          title: 'Fuso Horário',
          type: 'string',
          initialValue: 'America/Sao_Paulo'
        },
        {
          name: 'showOnDays',
          title: 'Dias da Semana',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            list: [
              {title: 'Segunda', value: 'monday'},
              {title: 'Terça', value: 'tuesday'},
              {title: 'Quarta', value: 'wednesday'},
              {title: 'Quinta', value: 'thursday'},
              {title: 'Sexta', value: 'friday'},
              {title: 'Sábado', value: 'saturday'},
              {title: 'Domingo', value: 'sunday'}
            ]
          }
        },
        {
          name: 'showOnHours',
          title: 'Horários',
          type: 'object',
          fields: [
            {
              name: 'start',
              title: 'Hora Início',
              type: 'string',
            },
            {
              name: 'end',
              title: 'Hora Fim',
              type: 'string',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'priority',
      title: 'Prioridade',
      type: 'number',
      initialValue: 0,
      description: 'Popups com maior prioridade são exibidos primeiro'
    }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'testMode',
      title: 'Modo Teste',
      type: 'boolean',
      initialValue: false,
      description: 'Exibir apenas para administradores'
    })
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      active: 'active'
    },
    prepare(selection) {
      const {title, type, active} = selection
      return {
        title,
        subtitle: `${type} - ${active ? 'Ativo' : 'Inativo'}`
      }
    }
  }
})