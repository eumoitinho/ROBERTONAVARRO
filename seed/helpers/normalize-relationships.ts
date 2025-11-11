// Helper para normalizar IDs de relacionamentos
export const normalizeRelationshipId = (id: any): string | null => {
  if (!id) return null
  
  // Se já é string válida
  if (typeof id === 'string') {
    if (/^[0-9a-fA-F]{24}$/.test(id.trim())) {
      return id.trim()
    }
    return null
  }
  
  // Se é objeto (ObjectId)
  if (typeof id === 'object') {
    if (id.toString) {
      const str = id.toString()
      if (/^[0-9a-fA-F]{24}$/.test(str)) {
        return str
      }
    }
    if (id.toHexString) {
      const str = id.toHexString()
      if (/^[0-9a-fA-F]{24}$/.test(str)) {
        return str
      }
    }
  }
  
  return null
}

// Helper para normalizar arrays de relacionamentos
export const normalizeRelationshipArray = (arr: any[]): string[] => {
  if (!Array.isArray(arr)) return []
  return arr
    .map(normalizeRelationshipId)
    .filter((id): id is string => id !== null)
}

// Função recursiva para normalizar relacionamentos em objetos aninhados
export const normalizeNestedRelationships = (obj: any, path: string = ''): any => {
  if (!obj || typeof obj !== 'object') return obj
  
  // Se for array, processar cada item
  if (Array.isArray(obj)) {
    return obj.map((item, index) => normalizeNestedRelationships(item, `${path}[${index}]`))
  }
  
  const normalized: any = {}
  
  for (const key in obj) {
    const value = obj[key]
    const currentPath = path ? `${path}.${key}` : key
    
    // Campos conhecidos de relacionamento (upload)
    if (key === 'backgroundImage' || key === 'certificationImage' || key === 'ogImage' || key === 'photo' || key === 'coverImage') {
      // Upload fields - só aceitar se for um ID válido, não strings de caminho
      if (typeof value === 'string' && value.startsWith('/')) {
        // É um caminho de arquivo, não um ID - remover
        // Não incluir
      } else {
        const normalizedId = normalizeRelationshipId(value)
        if (normalizedId) {
          normalized[key] = normalizedId
        }
        // Se inválido, não incluir
      }
    } else if (key === 'faqs' || key === 'testimonials' || key === 'mentors' || key === 'form' || key === 'testimonials') {
      // Relationship fields
      if (Array.isArray(value)) {
        const normalizedArray = normalizeRelationshipArray(value)
        if (normalizedArray.length > 0) {
          normalized[key] = normalizedArray
        }
      } else if (value) {
        const normalizedId = normalizeRelationshipId(value)
        if (normalizedId) {
          normalized[key] = normalizedId
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursivamente normalizar objetos aninhados
      normalized[key] = normalizeNestedRelationships(value, currentPath)
    } else {
      // Manter outros valores como estão
      normalized[key] = value
    }
  }
  
  return normalized
}

