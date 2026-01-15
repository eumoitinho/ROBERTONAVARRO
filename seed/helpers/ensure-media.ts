import fs from 'fs/promises'
import path from 'path'

const mediaCache = new Map<string, string>()

export async function ensureMedia(
  payload: any,
  relativePath: string,
  alt?: string,
): Promise<string | undefined> {
  const filename = path.basename(relativePath)

  if (mediaCache.has(relativePath)) {
    return mediaCache.get(relativePath)
  }

  const existing = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: filename,
      },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const id = existing.docs[0].id
    mediaCache.set(relativePath, id)
    return id
  }

  const absolutePath = path.join(process.cwd(), relativePath)

  try {
    await fs.access(absolutePath)
  } catch {
    console.warn(`⚠️  Arquivo de mídia não encontrado: ${relativePath}`)
    return undefined
  }

  const created = await payload.create({
    collection: 'media',
    data: {
      alt: alt ?? filename,
    },
    filePath: absolutePath,
  })

  mediaCache.set(relativePath, created.id)
  return created.id
}
