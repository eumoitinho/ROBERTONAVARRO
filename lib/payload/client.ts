import Module from 'module'

// Stub para SCSS/CSS ANTES de qualquer require do Payload
const extensions = (Module as any)._extensions
if (!extensions['.scss']) {
  extensions['.scss'] = (module: any) => {
    module.exports = {}
  }
}
if (!extensions['.css']) {
  extensions['.css'] = (module: any) => {
    module.exports = {}
  }
}

let cachedPayload: any = null
let configPromise: Promise<any> | null = null

const loadConfig = async () => {
  if (!configPromise) {
    // Carregar o editor ANTES de importar o config para evitar validação sem editor
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { slateEditor } = require('@payloadcms/richtext-slate')
    const editorInstance = slateEditor({})
    
    // Importar o config base
    const baseConfig = await import('@/payload.config').then((module) => module.default)
    
    // Garantir que o editor está presente no config
    return {
      ...baseConfig,
      editor: editorInstance,
    }
  }
  return configPromise
}

export const getPayloadClient = async () => {
  if (cachedPayload) {
    return cachedPayload
  }

  // Desabilitar o admin ao usar Payload dentro das rotas/API do Next.js
  process.env.DISABLE_PAYLOAD_ADMIN = 'true'

  try {
    // Carregar o editor ANTES de importar o config
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { slateEditor } = require('@payloadcms/richtext-slate')
    const editorInstance = slateEditor({})

    // Importar o config base (buildConfig retorna um objeto SanitizedConfig)
    const baseConfig = await import('@/payload.config').then((module) => module.default)

    // Criar config modificado com editor e admin desabilitado
    // Remover bundler ao invés de definir como undefined
    const { bundler, ...adminWithoutBundler } = baseConfig.admin || {}
    const config = {
      ...baseConfig,
      editor: editorInstance,
      admin: {
        ...adminWithoutBundler,
        disable: true,
      },
    } as any

    // getPayload está disponível em payload/dist/payload (não no export principal)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getPayload } = require('payload/dist/payload')
    
    if (!getPayload || typeof getPayload !== 'function') {
      throw new Error('getPayload não foi encontrado. Verifique a instalação do Payload CMS.')
    }
    
    // getPayload aceita config como Promise<SanitizedConfig>
    cachedPayload = await getPayload({
      config: Promise.resolve(config),
      secret: process.env.PAYLOAD_SECRET || '',
    })
  } catch (error) {
    console.error('Error initializing Payload:', error)
    throw error
  }

  return cachedPayload
}

// Helper functions para buscar dados
export async function getFormacoes() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'formacoes',
    where: {
      status: {
        equals: 'published',
      },
    },
  })
  return result.docs
}

export async function getFormacaoBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'formacoes',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getEventos() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'eventos',
    where: {
      status: {
        equals: 'published',
      },
    },
  })
  return result.docs
}

export async function getEventoBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'eventos',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getLivros() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'livros',
  })
  return result.docs
}

export async function getLivroBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'livros',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getPageBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    
    // Primeiro, buscar SEM filtro de status para ver se existe
    const allPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    
    if (allPages.docs.length === 0) {
      console.log(`[getPageBySlug] Nenhuma página encontrada com slug: ${slug}`)
      return null
    }
    
    const page = allPages.docs[0]
    
    // Se não estiver publicado, logar mas retornar mesmo assim para debug
    if (page.status !== 'published') {
      console.log(`[getPageBySlug] Página encontrada mas com status: ${page.status} (retornando mesmo assim para debug)`)
    }
    
    return page
  } catch (error: any) {
    console.error(`[getPageBySlug] Erro ao buscar página com slug ${slug}:`, error?.message || error)
    return null
  }
}

export async function getMentores() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'mentores',
    sort: 'order',
  })
  return result.docs
}

export async function getTestimonials(category?: string) {
  const payload = await getPayloadClient()
  const where: any = {}

  if (category) {
    where.category = { equals: category }
  }

  const result = await payload.find({
    collection: 'testimonials',
    where,
    sort: 'order',
  })
  return result.docs
}

export async function getFAQs(category?: string) {
  const payload = await getPayloadClient()
  const where: any = {}

  if (category) {
    where.category = { equals: category }
  }

  const result = await payload.find({
    collection: 'faqs',
    where,
    sort: 'order',
  })
  return result.docs
}
