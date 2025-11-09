import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

// Collections
import Formacoes from './payload/collections/Formacoes'
import Eventos from './payload/collections/Eventos'
import Livros from './payload/collections/Livros'
import Mentores from './payload/collections/Mentores'
import Testimonials from './payload/collections/Testimonials'
import FAQs from './payload/collections/FAQs'
import Pages from './payload/collections/Pages'
import Media from './payload/collections/Media'
import Users from './payload/collections/Users'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Roberto Navarro CMS',
    },
    disable: false,
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Formacoes,
    Eventos,
    Livros,
    Mentores,
    Testimonials,
    FAQs,
    Pages,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
})
