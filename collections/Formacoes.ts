import type { CollectionConfig } from 'payload'
import { createWebhookAfterChangeHook, createWebhookAfterDeleteHook } from '../lib/webhook-hooks'

const Formacoes: CollectionConfig = {
  slug: 'formacoes',
  admin: {
    useAsTitle: 'title',
    group: 'Conteúdo',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL amigável (ex: educador-financeiro)',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Arquivado', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'accentColor',
      type: 'text',
      label: 'Cor de Destaque',
      admin: {
        description: 'Código hexadecimal (ex: #FFD700)',
      },
    },
    {
      name: 'template',
      type: 'select',
      label: 'Template de Página',
      options: [
        { label: 'Padrão (Educador Financeiro - Vermelho)', value: 'default' },
        { label: 'Empreendedor Inteligente (Amarelo)', value: 'empreendedor-inteligente' },
        { label: 'LCF Mentoring Pro', value: 'lcf-mentoring-pro' },
        { label: 'Mentoria Individual', value: 'mentoria-individual' },
        { label: 'Mentoria de Investimentos', value: 'mentoria-investimentos' },
        { label: 'Método TF', value: 'metodo-tf' },
        { label: 'Rota Mind (Azul)', value: 'rota-mind' },
        { label: 'Mentor Coaching Financeiro (Amarelo)', value: 'mentor-coaching-financeiro' },
        { label: 'Mentoria/LCF Mentoring (Amarelo)', value: 'mentoria' },
        { label: 'Customizado (HTML/CSS)', value: 'custom' },
      ],
      defaultValue: 'default',
      admin: {
        description: 'Escolha o template de design para esta formação. Cada template mantém o design original da página.',
      },
    },
    // Formulário de Inscrição
    {
      name: 'form',
      type: 'relationship',
      label: 'Formulário de Inscrição',
      relationTo: 'forms',
      required: false,
      admin: {
        description: 'Selecione o formulário que será exibido na seção de inscrição. Crie formulários em "Forms" primeiro.',
      },
    },
    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtítulo',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descrição',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          label: 'Imagem de Fundo',
          relationTo: 'media',
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto do CTA',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'Link do CTA',
        },
      ],
    },
    // Desafios
    {
      name: 'challenges',
      type: 'array',
      label: 'Desafios/Problemas',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    // Benefícios
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefícios',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Ícone',
          admin: {
            description: 'Nome do ícone Lucide (ex: Trophy, Target)',
          },
        },
      ],
    },
    // O que você vai aprender
    {
      name: 'learnings',
      type: 'array',
      label: 'O que você vai aprender',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    // Público-Alvo (para Mentor Coaching Financeiro)
    {
      name: 'targetAudience',
      type: 'array',
      label: 'Público-Alvo',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    // Resultados (para Mentor Coaching Financeiro)
    {
      name: 'results',
      type: 'array',
      label: 'Resultados / O que esperar após o treinamento',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    // Garantia Especial (para Mentor Coaching Financeiro)
    {
      name: 'specialGuarantee',
      type: 'group',
      label: 'Garantia Especial',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Garantia Especial',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: '6 meses para experimentar uma mudança real',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descrição',
        },
      ],
    },
    // Caminhos de Decisão (para Mentor Coaching Financeiro)
    {
      name: 'decisionPaths',
      type: 'array',
      label: 'Caminhos de Decisão (3 Caminhos)',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    {
      name: 'decisionPathsNote',
      type: 'textarea',
      label: 'Nota sobre os Caminhos',
      admin: {
        description: 'Texto adicional após os 3 caminhos (ex: "Quanto vale ter a tranquilidade...")',
      },
    },
    // Metodologia (para Mentor Coaching Financeiro)
    {
      name: 'methodology',
      type: 'group',
      label: 'Metodologia',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'A metodologia que vai reprogramar sua relação com o dinheiro',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descrição',
        },
        {
          name: 'highlight',
          type: 'richText',
          label: 'Destaque',
          admin: {
            description: 'Texto em destaque (ex: "Este é um processo de transformação profunda...")',
          },
        },
      ],
    },
    // Módulos
    {
      name: 'modules',
      type: 'array',
      label: 'Módulos',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'topics',
          type: 'array',
          label: 'Tópicos',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
            },
          ],
        },
      ],
    },
    // Bônus
    {
      name: 'bonuses',
      type: 'array',
      label: 'Bônus',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Valor',
        },
      ],
    },
    // Vídeo
    {
      name: 'video',
      type: 'group',
      label: 'Vídeo',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          options: [
            { label: 'YouTube', value: 'youtube' },
            { label: 'Upload', value: 'upload' },
          ],
        },
        {
          name: 'youtubeId',
          type: 'text',
          label: 'YouTube ID',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'youtube',
          },
        },
        {
          name: 'file',
          type: 'upload',
          label: 'Arquivo de Vídeo',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'upload',
          },
        },
      ],
    },
    // Pricing
    {
      name: 'pricing',
      type: 'group',
      label: 'Preço',
      fields: [
        {
          name: 'price',
          type: 'number',
          label: 'Preço',
        },
        {
          name: 'installments',
          type: 'number',
          label: 'Parcelas',
        },
        {
          name: 'installmentValue',
          type: 'number',
          label: 'Valor da Parcela',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link de Compra',
        },
      ],
    },
    // Garantia
    {
      name: 'guarantee',
      type: 'group',
      label: 'Garantia',
      fields: [
        {
          name: 'days',
          type: 'number',
          label: 'Dias de Garantia',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descrição',
        },
      ],
    },
    // FAQs
    {
      name: 'faqs',
      type: 'relationship',
      label: 'FAQs',
      relationTo: 'faqs',
      hasMany: true,
    },
    // Depoimentos
    {
      name: 'testimonials',
      type: 'relationship',
      label: 'Depoimentos',
      relationTo: 'testimonials',
      hasMany: true,
    },
    // Mentores
    {
      name: 'mentors',
      type: 'relationship',
      label: 'Mentores',
      relationTo: 'mentores',
      hasMany: true,
    },
    // Certificação
    {
      name: 'certification',
      type: 'group',
      label: 'Certificação',
      fields: [
        {
          name: 'hasCertification',
          type: 'checkbox',
          label: 'Possui Certificação',
        },
        {
          name: 'certificationText',
          type: 'richText',
          label: 'Texto da Certificação',
        },
        {
          name: 'certificationImage',
          type: 'upload',
          label: 'Imagem da Certificação',
          relationTo: 'media',
        },
      ],
    },
    // Materiais Exclusivos
    {
      name: 'exclusiveMaterials',
      type: 'group',
      label: 'Materiais Exclusivos',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Seção de Materiais Exclusivos',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'EXPERIMENTE A IMERSÃO DO EDUCADOR FINANCEIRO',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
          defaultValue: 'Tenha uma prévia da jornada com materiais oficiais, bastidores e um vídeo de apresentação conduzido pelo time da RNA. Explore o ritmo da formação antes de garantir sua vaga definitiva.',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Itens de Materiais',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Ícone',
              admin: {
                description: 'Nome do ícone Lucide (ex: Target, FileText)',
              },
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto do CTA',
          defaultValue: 'ACESSAR PRÉVIA EXCLUSIVA',
        },
      ],
    },
    // Recursos
    {
      name: 'resources',
      type: 'group',
      label: 'Recursos',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Seção de Recursos',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'TUDO O QUE VOCÊ PRECISA PARA TRANSFORMAR SUA CARREIRA',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Itens de Recursos',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descrição',
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Ícone',
              admin: {
                description: 'Nome do ícone Lucide (ex: Award, Target, Users)',
              },
            },
          ],
        },
      ],
    },
    // Oportunidade Exclusiva (Treinador Licenciado)
    {
      name: 'exclusiveOpportunity',
      type: 'group',
      label: 'Oportunidade Exclusiva',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Seção de Oportunidade Exclusiva',
          defaultValue: false,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          defaultValue: 'OPORTUNIDADE EXCLUSIVA',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'SEJA UM TREINADOR LICENCIADO DO INSTITUTO COACHING FINANCEIRO',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
          defaultValue: 'Além de se formar como Educador Financeiro, você poderá atuar como treinador licenciado dos cursos oficiais do Instituto Coaching Financeiro (ICF).',
        },
        {
          name: 'subDescription',
          type: 'textarea',
          label: 'Descrição Secundária',
          defaultValue: 'Ao concluir a formação, você estará apto a revender treinamentos selecionados do ICF, utilizando o material didático oficial e emitindo certificados com a sua assinatura, reconhecidos diretamente pelo instituto. Ou seja: você já sai com um modelo de negócio pronto para gerar renda.',
        },
        {
          name: 'trainings',
          type: 'array',
          label: 'Treinamentos Disponíveis',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descrição',
            },
          ],
        },
      ],
    },
    // Seção do Mentor
    {
      name: 'mentorSection',
      type: 'group',
      label: 'Seção do Mentor',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Seção do Mentor',
          defaultValue: false,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          defaultValue: 'SEU MENTOR',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'APRENDA COM O MENTOR DOS MENTORES',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtítulo',
          defaultValue: 'O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!',
        },
        {
          name: 'mentorName',
          type: 'text',
          label: 'Nome do Mentor',
          defaultValue: 'Roberto Navarro',
        },
        {
          name: 'bio',
          type: 'richText',
          label: 'Biografia',
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Imagem do Mentor',
          relationTo: 'media',
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto do CTA',
          defaultValue: 'QUERO SER UM EDUCADOR FINANCEIRO!',
        },
      ],
    },
    // Licença Profissional
    {
      name: 'professionalLicense',
      type: 'group',
      label: 'Licença Profissional',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Seção de Licença Profissional',
          defaultValue: false,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          defaultValue: 'DIFERENCIAL EXCLUSIVO',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'SUA LICENÇA PROFISSIONAL PARA ATUAR COMO EDUCADOR FINANCEIRO',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
          defaultValue: 'Esta é a ÚNICA formação do mercado que te concede uma Licença Profissional chancelada pela Roberto Navarro Academia (RNA)',
        },
        {
          name: 'transformationTitle',
          type: 'text',
          label: 'Título da Transformação',
          defaultValue: 'Essa será sua transformação:',
        },
        {
          name: 'transformations',
          type: 'array',
          label: 'Itens de Transformação',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
            },
          ],
        },
        {
          name: 'benefitsTitle',
          type: 'text',
          label: 'Título dos Benefícios',
          defaultValue: 'Benefícios da Licença:',
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefícios da Licença',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
            },
          ],
        },
        {
          name: 'shieldMessage',
          type: 'textarea',
          label: 'Mensagem do Shield',
          defaultValue: 'Em breve irão sobreviver no mercado apenas quem tiver respeitada Licença Profissional!',
        },
        {
          name: 'shieldDescription',
          type: 'textarea',
          label: 'Descrição do Shield',
          defaultValue: 'Roberto Navarro criou essa Licença para separar os Profissionais dos amadores. Garanta sua posição no mercado com a credibilidade de quem é referência nacional em educação financeira.',
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto do CTA',
          defaultValue: 'GARANTIR MINHA LICENÇA PROFISSIONAL',
        },
      ],
    },
    // Múltiplos Mentores (para Mentoria/LCF Mentoring)
    {
      name: 'multipleMentors',
      type: 'group',
      label: 'Múltiplos Mentores',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Seção de Múltiplos Mentores',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'CONHEÇA SEUS MENTORES',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Subtítulo',
          defaultValue: 'Por trás do LCF Mentoring, duas trajetórias que unem conhecimento, superação e propósito.',
        },
        {
          name: 'mentors',
          type: 'array',
          label: 'Mentores',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nome',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Título/Subtítulo',
            },
            {
              name: 'bio',
              type: 'richText',
              label: 'Biografia',
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Imagem',
              relationTo: 'media',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'Texto do CTA',
              defaultValue: 'GARANTA SUA VAGA!',
            },
          ],
        },
      ],
    },
    // Módulos Específicos da Mentoria (estrutura diferente)
    {
      name: 'mentoriaModules',
      type: 'group',
      label: 'Módulos da Mentoria',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Exibir Seção de Módulos da Mentoria',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'MÓDULOS DA MENTORIA',
        },
        {
          name: 'modules',
          type: 'array',
          label: 'Módulos',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título do Módulo',
            },
            {
              name: 'duration',
              type: 'text',
              label: 'Duração',
              admin: {
                description: 'Ex: "4 dias", "3 dias"',
              },
            },
            {
              name: 'sections',
              type: 'array',
              label: 'Seções do Módulo',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título da Seção',
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Itens',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      label: 'Texto',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título SEO',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição SEO',
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Palavras-chave',
        },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'Imagem OG',
          relationTo: 'media',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createWebhookAfterChangeHook('formacoes')],
    afterDelete: [createWebhookAfterDeleteHook('formacoes')],
  },
}

export default Formacoes
