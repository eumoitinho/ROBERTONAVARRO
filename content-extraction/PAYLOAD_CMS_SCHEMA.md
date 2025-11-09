# Guia de Implementação - Payload CMS Schema

## Estrutura de Collections Recomendada

### 1. Collection: Formacoes

```typescript
{
  slug: 'formacoes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'accentColor', 'featured', 'published'],
  },
  access: {
    read: () => true, // público
  },
  fields: [
    // Meta Information
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'URL amigável para a formação (ex: educador-financeiro)',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'accentColor',
      type: 'select',
      label: 'Cor de Destaque',
      options: [
        { label: 'Amarelo', value: 'yellow' },
        { label: 'Vermelho', value: 'red' },
        { label: 'Azul', value: 'blue' },
        { label: 'Verde', value: 'green' },
      ],
      defaultValue: 'yellow',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque',
      defaultValue: false,
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Publicado',
      defaultValue: false,
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
          type: 'text',
          label: 'Subtítulo',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'imageDesktop',
          type: 'upload',
          label: 'Imagem Desktop',
          relationTo: 'media',
        },
        {
          name: 'imageMobile',
          type: 'upload',
          label: 'Imagem Mobile',
          relationTo: 'media',
        },
        {
          name: 'primaryCTA',
          type: 'group',
          label: 'CTA Principal',
          fields: [
            { name: 'text', type: 'text', label: 'Texto' },
            { name: 'href', type: 'text', label: 'Link' },
          ],
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          label: 'CTA Secundário',
          fields: [
            { name: 'text', type: 'text', label: 'Texto' },
            { name: 'href', type: 'text', label: 'Link' },
          ],
        },
      ],
    },

    // Certifications
    {
      name: 'certifications',
      type: 'array',
      label: 'Certificações',
      fields: [
        { name: 'type', type: 'text', label: 'Tipo' },
        { name: 'title', type: 'text', label: 'Título' },
        {
          name: 'logo',
          type: 'upload',
          label: 'Logo',
          relationTo: 'media',
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefícios',
          fields: [
            { name: 'icon', type: 'text', label: 'Ícone' },
            { name: 'title', type: 'text', label: 'Título' },
            { name: 'description', type: 'textarea', label: 'Descrição' },
          ],
        },
      ],
    },

    // Content Sections
    {
      name: 'sections',
      type: 'array',
      label: 'Seções de Conteúdo',
      fields: [
        { name: 'id', type: 'text', label: 'ID' },
        {
          name: 'type',
          type: 'select',
          label: 'Tipo de Seção',
          options: [
            { label: 'Sobre', value: 'about' },
            { label: 'Benefícios', value: 'benefits' },
            { label: 'Recursos', value: 'features' },
            { label: 'Materiais', value: 'materials' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        { name: 'badge', type: 'text', label: 'Badge' },
        { name: 'title', type: 'text', label: 'Título' },
        {
          name: 'content',
          type: 'richText',
          label: 'Conteúdo',
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Imagem',
          relationTo: 'media',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Itens',
          fields: [
            { name: 'icon', type: 'text', label: 'Ícone' },
            { name: 'title', type: 'text', label: 'Título' },
            { name: 'description', type: 'textarea', label: 'Descrição' },
          ],
        },
      ],
    },

    // Modules/Curriculum
    {
      name: 'modules',
      type: 'array',
      label: 'Módulos do Curso',
      fields: [
        { name: 'number', type: 'number', label: 'Número' },
        { name: 'title', type: 'text', label: 'Título', required: true },
        { name: 'description', type: 'textarea', label: 'Descrição' },
        {
          name: 'lessons',
          type: 'array',
          label: 'Aulas',
          fields: [
            { name: 'number', type: 'number', label: 'Número' },
            { name: 'title', type: 'text', label: 'Título' },
            { name: 'duration', type: 'text', label: 'Duração' },
          ],
        },
      ],
    },

    // Bonuses
    {
      name: 'bonuses',
      type: 'array',
      label: 'Bônus',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'description', type: 'textarea', label: 'Descrição' },
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          options: [
            { label: 'Material', value: 'material' },
            { label: 'Script', value: 'script' },
            { label: 'Curso', value: 'course' },
            { label: 'Evento', value: 'event' },
            { label: 'Afiliação', value: 'affiliate' },
          ],
        },
      ],
    },

    // Mentor (Relation)
    {
      name: 'mentor',
      type: 'relationship',
      label: 'Mentor',
      relationTo: 'mentors',
    },

    // Guarantees
    {
      name: 'guarantees',
      type: 'array',
      label: 'Garantias',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          options: [
            { label: 'Legal', value: 'legal' },
            { label: 'Resultados', value: 'results' },
            { label: 'Certificação', value: 'certification' },
          ],
        },
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'description', type: 'textarea', label: 'Descrição' },
        { name: 'icon', type: 'text', label: 'Ícone' },
        { name: 'highlight', type: 'checkbox', label: 'Destacar' },
        { name: 'terms', type: 'textarea', label: 'Termos e Condições' },
      ],
    },

    // FAQs (Relation)
    {
      name: 'faqs',
      type: 'relationship',
      label: 'FAQs',
      relationTo: 'faqs',
      hasMany: true,
    },

    // Pricing
    {
      name: 'pricing',
      type: 'group',
      label: 'Preços',
      fields: [
        { name: 'originalPrice', type: 'number', label: 'Preço Original' },
        { name: 'currentPrice', type: 'number', label: 'Preço Atual' },
        { name: 'installments', type: 'number', label: 'Parcelas' },
        { name: 'paymentLink', type: 'text', label: 'Link de Pagamento' },
        { name: 'note', type: 'textarea', label: 'Nota' },
      ],
    },

    // Components Settings
    {
      name: 'components',
      type: 'group',
      label: 'Componentes',
      fields: [
        {
          name: 'transformationVideos',
          type: 'checkbox',
          label: 'Vídeos de Transformação',
        },
        {
          name: 'notableParticipants',
          type: 'checkbox',
          label: 'Participantes Notáveis',
        },
        { name: 'testimonials', type: 'checkbox', label: 'Depoimentos' },
      ],
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Título' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Descrição' },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'Imagem OG',
          relationTo: 'media',
        },
        { name: 'keywords', type: 'text', label: 'Palavras-chave' },
      ],
    },
  ],
}
```

---

### 2. Collection: Eventos

```typescript
{
  slug: 'eventos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location', 'published'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Meta Information
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
    },
    {
      name: 'secondTitle',
      type: 'text',
      label: 'Segundo Título',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'accentColor',
      type: 'select',
      label: 'Cor de Destaque',
      options: [
        { label: 'Amarelo', value: 'yellow' },
        { label: 'Vermelho', value: 'red' },
        { label: 'Azul', value: 'blue' },
      ],
      defaultValue: 'yellow',
    },

    // Event Details
    {
      name: 'eventDate',
      type: 'date',
      label: 'Data do Evento',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duração',
      admin: {
        placeholder: 'Ex: 10 horas, 13h às 20h',
      },
    },
    {
      name: 'location',
      type: 'group',
      label: 'Local',
      fields: [
        { name: 'venue', type: 'text', label: 'Nome do Local' },
        { name: 'address', type: 'text', label: 'Endereço' },
        { name: 'city', type: 'text', label: 'Cidade' },
        { name: 'state', type: 'text', label: 'Estado' },
        { name: 'formatted', type: 'text', label: 'Endereço Formatado' },
      ],
    },
    {
      name: 'format',
      type: 'select',
      label: 'Formato',
      options: [
        { label: 'Presencial', value: 'presencial' },
        { label: 'Online', value: 'online' },
        { label: 'Híbrido', value: 'hibrido' },
      ],
      defaultValue: 'presencial',
    },

    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'badge', type: 'text', label: 'Badge' },
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'subtitle', type: 'text', label: 'Subtítulo' },
        { name: 'description', type: 'textarea', label: 'Descrição' },
        {
          name: 'imageDesktop',
          type: 'upload',
          label: 'Imagem Desktop',
          relationTo: 'media',
        },
        {
          name: 'showCountdown',
          type: 'checkbox',
          label: 'Mostrar Countdown',
          defaultValue: false,
        },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', label: 'Texto' },
            { name: 'href', type: 'text', label: 'Link' },
          ],
        },
      ],
    },

    // Challenges/Para Quem É
    {
      name: 'challenges',
      type: 'array',
      label: 'Desafios / Para Quem É',
      fields: [
        { name: 'icon', type: 'text', label: 'Ícone' },
        { name: 'question', type: 'text', label: 'Pergunta' },
        { name: 'answer', type: 'textarea', label: 'Resposta' },
      ],
    },

    // O Que Você Vai Aprender
    {
      name: 'learnings',
      type: 'array',
      label: 'O Que Você Vai Aprender',
      fields: [
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'description', type: 'textarea', label: 'Descrição' },
        { name: 'icon', type: 'text', label: 'Ícone' },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefícios',
          fields: [{ name: 'benefit', type: 'text', label: 'Benefício' }],
        },
      ],
    },

    // Event Highlights
    {
      name: 'highlights',
      type: 'array',
      label: 'Destaques do Evento',
      fields: [
        { name: 'icon', type: 'text', label: 'Ícone' },
        { name: 'title', type: 'text', label: 'Título' },
        { name: 'description', type: 'textarea', label: 'Descrição' },
      ],
    },

    // Mentores
    {
      name: 'mentors',
      type: 'relationship',
      label: 'Mentores',
      relationTo: 'mentors',
      hasMany: true,
    },

    // Tickets
    {
      name: 'tickets',
      type: 'relationship',
      label: 'Ingressos',
      relationTo: 'tickets',
      hasMany: true,
    },

    // Registration
    {
      name: 'registration',
      type: 'group',
      label: 'Inscrição',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Plataforma',
          options: [
            { label: 'Blinket', value: 'blinket' },
            { label: 'Eduzz', value: 'eduzz' },
            { label: 'Hotmart', value: 'hotmart' },
          ],
        },
        { name: 'url', type: 'text', label: 'URL de Inscrição' },
        { name: 'buttonText', type: 'text', label: 'Texto do Botão' },
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

    // Components
    {
      name: 'components',
      type: 'group',
      label: 'Componentes',
      fields: [
        {
          name: 'transformationVideos',
          type: 'checkbox',
          label: 'Vídeos de Transformação',
        },
        {
          name: 'notableParticipants',
          type: 'checkbox',
          label: 'Participantes Notáveis',
        },
        { name: 'testimonials', type: 'checkbox', label: 'Depoimentos' },
      ],
    },

    // Published
    {
      name: 'published',
      type: 'checkbox',
      label: 'Publicado',
      defaultValue: false,
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Título' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Descrição' },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'Imagem OG',
          relationTo: 'media',
        },
      ],
    },
  ],
}
```

---

### 3. Collection: Mentors

```typescript
{
  slug: 'mentors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Cargo/Função',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        description: 'Ex: Fundador do ICF, Especialista em PNL',
      },
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      admin: {
        description: 'Breve descrição em uma linha',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'array',
      label: 'Biografia',
      fields: [
        { name: 'icon', type: 'text', label: 'Ícone' },
        { name: 'text', type: 'textarea', label: 'Texto' },
      ],
    },
    {
      name: 'achievements',
      type: 'array',
      label: 'Conquistas',
      fields: [{ name: 'achievement', type: 'text', label: 'Conquista' }],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Redes Sociais',
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn' },
        { name: 'youtube', type: 'text', label: 'YouTube' },
        { name: 'facebook', type: 'text', label: 'Facebook' },
      ],
    },
  ],
}
```

---

### 4. Collection: Tickets

```typescript
{
  slug: 'tickets',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Preço',
      admin: {
        step: 0.01,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefícios',
      fields: [{ name: 'benefit', type: 'text', label: 'Benefício' }],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque',
      defaultValue: false,
    },
    {
      name: 'eduzzContentId',
      type: 'text',
      label: 'Eduzz Content ID',
    },
    {
      name: 'eduzzUrl',
      type: 'text',
      label: 'URL Eduzz',
    },
    {
      name: 'available',
      type: 'checkbox',
      label: 'Disponível',
      defaultValue: true,
    },
    {
      name: 'quantity',
      type: 'number',
      label: 'Quantidade Disponível',
      admin: {
        description: 'Deixe em branco para ilimitado',
      },
    },
  ],
}
```

---

### 5. Collection: FAQs

```typescript
{
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Pergunta',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Resposta',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Geral', value: 'geral' },
        { label: 'Formações', value: 'formacoes' },
        { label: 'Eventos', value: 'eventos' },
        { label: 'Pagamento', value: 'pagamento' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem',
      admin: {
        description: 'Ordem de exibição (menor número aparece primeiro)',
      },
    },
  ],
}
```

---

### 6. Collection: Testimonials

```typescript
{
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Cargo/Função',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Depoimento',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL do Vídeo',
      admin: {
        description: 'YouTube URL para vídeo depoimento',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque',
      defaultValue: false,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Avaliação',
      min: 1,
      max: 5,
    },
    {
      name: 'relatedTo',
      type: 'relationship',
      label: 'Relacionado a',
      relationTo: ['formacoes', 'eventos'],
      hasMany: true,
    },
  ],
}
```

---

### 7. Collection: Media

```typescript
{
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Legenda',
    },
  ],
}
```

---

## Exemplo de Fetch no Next.js

### Server Component

```typescript
// app/formacoes/[slug]/page.tsx
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export default async function FormacaoPage({
  params,
}: {
  params: { slug: string }
}) {
  const payload = await getPayloadHMR({ config: configPromise })

  const formacao = await payload.find({
    collection: 'formacoes',
    where: {
      slug: {
        equals: params.slug,
      },
      published: {
        equals: true,
      },
    },
    depth: 2, // Para buscar relations
  })

  if (!formacao.docs.length) {
    notFound()
  }

  const data = formacao.docs[0]

  return (
    <div>
      <HeroSection
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        image={data.hero.imageDesktop}
        cta={data.hero.primaryCTA}
      />

      {data.sections?.map((section) => (
        <Section key={section.id} {...section} />
      ))}

      {data.modules && (
        <ModulesSection modules={data.modules} />
      )}

      {data.mentor && (
        <MentorSection mentor={data.mentor} />
      )}

      {data.faqs && (
        <FAQSection faqs={data.faqs} />
      )}
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })

  const formacoes = await payload.find({
    collection: 'formacoes',
    where: {
      published: {
        equals: true,
      },
    },
    limit: 1000,
  })

  return formacoes.docs.map((doc) => ({
    slug: doc.slug,
  }))
}
```

---

## Hooks Úteis

### beforeChange Hook - Auto-generate Slug

```typescript
{
  slug: 'formacoes',
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        }
        return data
      },
    ],
  },
}
```

### afterChange Hook - Clear Cache

```typescript
{
  slug: 'formacoes',
  hooks: {
    afterChange: [
      ({ doc, operation }) => {
        if (operation === 'update') {
          // Revalidate Next.js page
          fetch(`${process.env.NEXT_PUBLIC_URL}/api/revalidate?path=/formacoes/${doc.slug}`)
        }
      },
    ],
  },
}
```

---

## Access Control

### Example: Admin-only edits, public reads

```typescript
{
  slug: 'formacoes',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
}
```

---

## Plugins Recomendados

```typescript
import { buildConfig } from 'payload/config'
import { slateEditor } from '@payloadcms/richtext-slate'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'

export default buildConfig({
  plugins: [
    seoPlugin({
      collections: ['formacoes', 'eventos'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | Roberto Navarro`,
      generateDescription: ({ doc }) => doc.description,
    }),
    cloudStorage({
      collections: {
        media: {
          adapter: 's3Adapter', // ou outro adapter
        },
      },
    }),
  ],
  editor: slateEditor({}),
})
```

---

## Next Steps

1. **Instalar Payload:**
   ```bash
   npx create-payload-app@latest
   ```

2. **Configurar Collections** conforme schemas acima

3. **Migrar dados** dos JSONs para o Payload Admin

4. **Refatorar pages** para consumir Payload API

5. **Setup Media** e otimização de imagens

6. **Implementar SEO** plugin e metadata

7. **Deploy** Payload CMS (Vercel, Railway, etc)

---

## Estrutura de Diretórios Recomendada

```
/
├── src/
│   ├── app/
│   │   ├── (payload)/
│   │   │   └── admin/
│   │   ├── formacoes/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── eventos/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── api/
│   │       └── revalidate/
│   ├── payload/
│   │   ├── collections/
│   │   │   ├── Formacoes.ts
│   │   │   ├── Eventos.ts
│   │   │   ├── Mentors.ts
│   │   │   ├── Tickets.ts
│   │   │   ├── FAQs.ts
│   │   │   ├── Testimonials.ts
│   │   │   └── Media.ts
│   │   └── payload.config.ts
│   └── components/
│       ├── hero-pages.tsx
│       ├── section-badge.tsx
│       └── ...
├── public/
│   └── media/
└── package.json
```

---

**FIM DO GUIA DE IMPLEMENTAÇÃO PAYLOAD CMS**
