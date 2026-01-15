import type { GlobalConfig } from 'payload'
import { navigationItemsDefault } from '../lib/navigation-default'

const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navegação',
  admin: {
    group: 'Configurações',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headerItems',
      type: 'array',
      label: 'Itens do Menu',
      defaultValue: navigationItemsDefault,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'isButton',
          type: 'checkbox',
          label: 'Botão (CTA)',
          defaultValue: false,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Subitens',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Link',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Descrição',
            },
          ],
        },
      ],
    },
  ],
}

export default Navigation
