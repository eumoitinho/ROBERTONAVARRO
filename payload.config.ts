import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Collections
import Formacoes from './collections/Formacoes'
import Eventos from './collections/Eventos'
import Livros from './collections/Livros'
import Blog from './collections/Blog'
import Mentores from './collections/Mentores'
import Testimonials from './collections/Testimonials'
import FAQs from './collections/FAQs'
import Pages from './collections/Pages'
import Media from './collections/Media'
import Users from './collections/Users'
import Forms from './collections/Forms'
import Webhooks from './collections/Webhooks'
import Navigation from './globals/Navigation'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'skWAAvzokKB69IMln1BX1fFOlKIVEVrjpLV1T8oO8PFGAiafhJLIsAmj6lez1rciKRVZ5OZvJXANnJA6O',
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Roberto Navarro CMS',
    },
    disable: false,
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
        
        if (!collectionConfig) return baseUrl
        
        // Configurar preview para diferentes collections
        if (collectionConfig.slug === 'pages') {
          // Páginas especiais com rotas customizadas
          const specialPages: Record<string, string> = {
            'trabalhe-conosco': '/trabalhe-conosco',
            'politica-privacidade': '/politica-privacidade',
            'lives': '/lives',
            'obrigado': '/obrigado',
            'mes-da-independencia': '/lp/mes-da-independencia',
          }
          
          const slug = data?.slug || ''
          const specialRoute = specialPages[slug]
          
          if (specialRoute) {
            return `${baseUrl}${specialRoute}?preview=true`
          }
          
          // Páginas genéricas
          return `${baseUrl}/${slug}?preview=true`
        }
        if (collectionConfig.slug === 'formacoes') {
          return `${baseUrl}/formacoes/${data?.slug || ''}?preview=true`
        }
        if (collectionConfig.slug === 'eventos') {
          return `${baseUrl}/eventos/${data?.slug || ''}?preview=true`
        }
        if (collectionConfig.slug === 'livros') {
          return `${baseUrl}/livros/${data?.slug || ''}?preview=true`
        }
        if (collectionConfig.slug === 'blog') {
          return `${baseUrl}/blog/${data?.slug || ''}?preview=true`
        }
        
        return baseUrl
      },
      collections: ['pages', 'formacoes', 'eventos', 'livros', 'blog'],
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Formacoes,
    Eventos,
    Livros,
    Blog,
    Mentores,
    Testimonials,
    FAQs,
    Pages,
    Media,
    Forms,
    Webhooks,
  ],
  globals: [Navigation],
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    // MongoDB Cloud URI - deve ser definida no arquivo .env.local como MONGODB_URI
    // IMPORTANTE: Sempre usar a URI do MongoDB Cloud (nuvem), não MongoDB local
    // A URI deve estar no arquivo .env.local na variável MONGODB_URI
    url: process.env.MONGODB_URI || 'mongodb://root:oq2USL4FuKx1GRchE7n26Do1llPbDBUK97H5j2jXibkaftFSlLAMZ33VRb2ZWHt9@162.240.99.119:5565/?directConnection=true',
    connectOptions: {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  }),
  sharp,
})
