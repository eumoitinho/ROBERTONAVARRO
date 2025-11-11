import type { CollectionConfig } from 'payload'

const Mentores: CollectionConfig = {
  slug: 'mentores',
  admin: {
    useAsTitle: 'name',
    group: 'Conteúdo',
    defaultColumns: ['name', 'role', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Cargo/Função',
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Foto',
      relationTo: 'media',
      required: false, // Temporariamente opcional para permitir seed
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biografia',
    },
    {
      name: 'shortBio',
      type: 'textarea',
      label: 'Biografia Curta',
    },
    {
      name: 'achievements',
      type: 'array',
      label: 'Conquistas',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Estatísticas',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Valor',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Redes Sociais',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem',
      admin: {
        description: 'Ordem de exibição (menor = primeiro)',
      },
    },
  ],
}

export default Mentores
