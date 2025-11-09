import configPromise from '@/payload.config'
import { getPayload as getPayloadInstance } from 'payload'

let cachedPayload: any = null

export const getPayloadClient = async () => {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayloadInstance({
    config: await configPromise,
  })

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
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
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
