import configPromise from '@/payload.config'
import { getPayload as getPayloadInstance } from 'payload'

let cachedPayload: any = null
let isInitializing = false
let initPromise: Promise<any> | null = null

export const getPayloadClient = async () => {
  // Se já temos uma instância cacheada, retornar
  if (cachedPayload) {
    return cachedPayload
  }

  // Se já está inicializando, aguardar a promise existente
  if (isInitializing && initPromise) {
    return initPromise
  }

  // Iniciar inicialização
  isInitializing = true
  initPromise = (async () => {
    try {
      const config = await configPromise
      cachedPayload = await getPayloadInstance({
        config,
      })
      isInitializing = false
      return cachedPayload
    } catch (error) {
      isInitializing = false
      initPromise = null
      console.error('❌ Erro ao inicializar Payload:', error)
      throw error
    }
  })()

  return initPromise
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

export async function getFormacaoBySlug(slug: string, preview?: boolean) {
  const payload = await getPayloadClient()
  const where: any = {
    slug: {
      equals: slug,
    },
  }
  
  // Se não estiver em preview, só buscar formações publicadas
  if (!preview) {
    where.status = {
      equals: 'published',
    }
  }

  const result = await payload.find({
    collection: 'formacoes',
    where,
    limit: 1,
    depth: 2, // Incluir relacionamentos (form, faqs, testimonials, etc)
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

export async function getEventoBySlug(slug: string, preview?: boolean) {
  const payload = await getPayloadClient()
  const where: any = {
    slug: {
      equals: slug,
    },
  }
  
  // Se não estiver em preview, só buscar eventos publicados
  if (!preview) {
    where.status = {
      equals: 'published',
    }
  }

  const result = await payload.find({
    collection: 'eventos',
    where,
    limit: 1,
    depth: 2, // Incluir relacionamentos (mentors, testimonials, faqs, etc)
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

export async function getLivroBySlug(slug: string, preview?: boolean) {
  const payload = await getPayloadClient()
  const where: any = {
    slug: {
      equals: slug,
    },
  }
  
  // Se não estiver em preview, só buscar livros publicados
  if (!preview) {
    where.status = {
      equals: 'published',
    }
  }

  const result = await payload.find({
    collection: 'livros',
    where,
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getPageBySlug(slug: string, preview?: boolean) {
  const payload = await getPayloadClient()
  const where: any = {
    slug: {
      equals: slug,
    },
  }
  
  // Se não estiver em preview, só buscar páginas publicadas
  if (!preview) {
    where.status = {
      equals: 'published',
    }
  }

  const result = await payload.find({
    collection: 'pages',
    where,
    limit: 1,
  })
  return result.docs[0] || null
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

export async function getFormBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'forms',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return result.docs[0] || null
}

export async function getBlogPosts() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })
  return result.docs
}

export async function getBlogPostBySlug(slug: string, preview?: boolean) {
  const payload = await getPayloadClient()
  const where: any = {
    slug: {
      equals: slug,
    },
  }
  
  // Se não estiver em preview, só buscar posts publicados
  if (!preview) {
    where.status = {
      equals: 'published',
    }
  }

  const result = await payload.find({
    collection: 'blog',
    where,
    limit: 1,
  })
  return result.docs[0] || null
}
