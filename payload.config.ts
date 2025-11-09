import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
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

const adminEnv = process.env.DISABLE_PAYLOAD_ADMIN
const disableAdmin = adminEnv ? adminEnv === 'true' : true

// Carregar o editor AGORA, com stub de SCSS já ativo
let editor: any
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { slateEditor } = require('@payloadcms/richtext-slate')
  editor = slateEditor({})
} catch (e) {
  // Se falhar, será undefined (mas não deve acontecer com stub ativo)
  editor = undefined as any
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3002',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Roberto Navarro CMS',
    },
    disable: disableAdmin,
  },
  editor, // Editor carregado ANTES do buildConfig
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
    url: process.env.MONGODB_URI || 'mongodb://root:oq2USL4FuKx1GRchE7n26Do1llPbDBUK97H5j2jXibkaftFSlLAMZ33VRb2ZWHt9@162.240.99.119:5565/?directConnection=true',
  }),
})
