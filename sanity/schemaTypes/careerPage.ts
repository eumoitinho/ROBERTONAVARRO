import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'careerPage',
  title: 'Página Trabalhe Conosco',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
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
          name: 'backgroundImage',
          title: 'Imagem de Fundo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ctaButton',
          title: 'Botão CTA',
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
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'culture',
      title: 'Cultura da Empresa',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'values',
          title: 'Valores',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
                },
                {
                  name: 'title',
                  title: 'Título',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                }
              ]
            }
          ]
        },
        {
          name: 'images',
          title: 'Imagens',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'benefits',
      title: 'Benefícios',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
        },
        {
          name: 'list',
          title: 'Lista de Benefícios',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
                },
                {
                  name: 'title',
                  title: 'Título',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'jobOpenings',
      title: 'Vagas Abertas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título da Vaga',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'department',
              title: 'Departamento',
              type: 'string',
            },
            {
              name: 'location',
              title: 'Localização',
              type: 'string',
            },
            {
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  {title: 'CLT', value: 'clt'},
                  {title: 'PJ', value: 'pj'},
                  {title: 'Estágio', value: 'internship'},
                  {title: 'Freelancer', value: 'freelancer'},
                  {title: 'Temporário', value: 'temporary'}
                ]
              }
            },
            {
              name: 'workModel',
              title: 'Modelo de Trabalho',
              type: 'string',
              options: {
                list: [
                  {title: 'Presencial', value: 'onsite'},
                  {title: 'Remoto', value: 'remote'},
                  {title: 'Híbrido', value: 'hybrid'}
                ]
              }
            },
            {
              name: 'level',
              title: 'Nível',
              type: 'string',
              options: {
                list: [
                  {title: 'Júnior', value: 'junior'},
                  {title: 'Pleno', value: 'mid'},
                  {title: 'Sênior', value: 'senior'},
                  {title: 'Especialista', value: 'specialist'},
                  {title: 'Coordenador', value: 'coordinator'},
                  {title: 'Gerente', value: 'manager'}
                ]
              }
            },
            {
              name: 'summary',
              title: 'Resumo',
              type: 'text',
            },
            {
              name: 'description',
              title: 'Descrição Completa',
              type: 'array',
              of: [{type: 'block'}]
            },
            {
              name: 'requirements',
              title: 'Requisitos',
              type: 'array',
              of: [{type: 'string'}]
            },
            {
              name: 'desirable',
              title: 'Desejável',
              type: 'array',
              of: [{type: 'string'}]
            },
            {
              name: 'responsibilities',
              title: 'Responsabilidades',
              type: 'array',
              of: [{type: 'string'}]
            },
            {
              name: 'salary',
              title: 'Salário',
              type: 'object',
              fields: [
                {
                  name: 'display',
                  title: 'Exibir Salário',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'min',
                  title: 'Mínimo',
                  type: 'number',
                },
                {
                  name: 'max',
                  title: 'Máximo',
                  type: 'number',
                },
                {
                  name: 'currency',
                  title: 'Moeda',
                  type: 'string',
                  initialValue: 'BRL'
                },
                {
                  name: 'negotiable',
                  title: 'A Combinar',
                  type: 'boolean',
                  initialValue: true
                }
              ]
            },
            {
              name: 'applicationLink',
              title: 'Link de Aplicação',
              type: 'string',
            },
            {
              name: 'applicationEmail',
              title: 'Email para Aplicação',
              type: 'string',
            },
            {
              name: 'deadline',
              title: 'Prazo para Aplicação',
              type: 'datetime',
            },
            {
              name: 'publishedAt',
              title: 'Data de Publicação',
              type: 'datetime',
            },
            {
              name: 'active',
              title: 'Vaga Ativa',
              type: 'boolean',
              initialValue: true
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'applicationProcess',
      title: 'Processo Seletivo',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
        },
        {
          name: 'steps',
          title: 'Etapas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'number',
                  title: 'Número',
                  type: 'number',
                },
                {
                  name: 'title',
                  title: 'Título',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                },
                {
                  name: 'icon',
                  title: 'Ícone',
                  type: 'string',
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Depoimentos de Colaboradores',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Cargo',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Depoimento',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true,
              },
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'talentBank',
      title: 'Banco de Talentos',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Habilitar',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
        },
        {
          name: 'formLink',
          title: 'Link do Formulário',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Pergunta',
              type: 'string',
            },
            {
              name: 'answer',
              title: 'Resposta',
              type: 'text',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Título',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Descrição',
          type: 'text',
        },
        {
          name: 'keywords',
          title: 'Palavras-chave',
          type: 'array',
          of: [{type: 'string'}]
        },
        {
          name: 'ogImage',
          title: 'Imagem Open Graph',
          type: 'image',
        }
      ]
    })
  ]
})