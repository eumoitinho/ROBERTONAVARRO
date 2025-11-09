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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { slateEditor } = require('@payloadcms/richtext-slate')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { webpackBundler } = require('@payloadcms/bundler-webpack')

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3002',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Roberto Navarro CMS',
    },
    disable: false,
    bundler: webpackBundler({
      webpackConfig: (webpackConfig: any) => {
        const webpack = require('webpack')
        const fs = require('fs')
        
        // Caminho absoluto para o wrapper
        const wrapperPath = path.resolve(__dirname, 'payload-admin-router-fix.js')
        const payloadRouterPath = path.resolve(
          __dirname,
          'node_modules/payload/node_modules/react-router-dom'
        )
        
        if (fs.existsSync(payloadRouterPath)) {
          console.log('🔧 Configurando react-router-dom para usar versão do Payload (v5.3.4)')
          
          webpackConfig.resolve = webpackConfig.resolve || {}
          webpackConfig.plugins = webpackConfig.plugins || []
          
          // FORÇAR alias para o wrapper (que usa a versão do Payload)
          webpackConfig.resolve.alias = {
            ...webpackConfig.resolve.alias,
            'react-router-dom': wrapperPath,
            'react-router-dom$': wrapperPath,
          }
          
          // NormalModuleReplacementPlugin com regex mais agressivo
          webpackConfig.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
              /^react-router-dom$/,
              wrapperPath
            )
          )
          
          // Priorizar node_modules do Payload
          const existingModules = webpackConfig.resolve.modules || ['node_modules']
          webpackConfig.resolve.modules = [
            path.resolve(__dirname, 'node_modules/payload/node_modules'),
            ...existingModules.filter((m: string) => !m.includes('payload') && !m.includes('node_modules')),
            'node_modules',
          ]
          
          console.log('✅ Alias configurado:', wrapperPath)
        } else {
          console.error('❌ react-router-dom do Payload não encontrado em:', payloadRouterPath)
        }
        
        return webpackConfig
      },
    }),
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
    url: process.env.MONGODB_URI || 'mongodb://root:oq2USL4FuKx1GRchE7n26Do1llPbDBUK97H5j2jXibkaftFSlLAMZ33VRb2ZWHt9@162.240.99.119:5565/?directConnection=true',
  }),
})
