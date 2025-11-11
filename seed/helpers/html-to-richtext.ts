// Helper para converter HTML para richText do Payload (Slate format)
// Versão simplificada que converte HTML básico para blocos de texto

export function htmlToRichText(html: string): any[] {
  if (!html || typeof html !== 'string') {
    return []
  }

  // Limpar HTML
  let cleanHtml = html.trim()
  if (!cleanHtml) {
    return []
  }

  const blocks: any[] = []
  
  // Dividir por tags de bloco principais
  const blockRegex = /<(h[1-6]|p|blockquote|ul|ol|li)([^>]*)>(.*?)<\/\1>/gis
  let lastIndex = 0
  let match

  while ((match = blockRegex.exec(cleanHtml)) !== null) {
    const [fullMatch, tagName, attributes, content] = match
    const beforeTag = cleanHtml.substring(lastIndex, match.index).trim()
    
    // Adicionar texto antes da tag como parágrafo
    if (beforeTag) {
      const textOnly = beforeTag.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      if (textOnly) {
        blocks.push({
          type: 'p',
          children: [{ text: textOnly }],
        })
      }
    }

    // Processar conteúdo da tag
    const processedContent = processInlineTags(content)
    
    if (tagName.startsWith('h')) {
      const level = tagName.charAt(1)
      blocks.push({
        type: `h${level}`,
        children: processedContent,
      })
    } else if (tagName === 'p') {
      blocks.push({
        type: 'p',
        children: processedContent,
      })
    } else if (tagName === 'blockquote') {
      blocks.push({
        type: 'quote',
        children: processedContent,
      })
    } else if (tagName === 'li') {
      blocks.push({
        type: 'li',
        children: processedContent,
      })
    } else if (tagName === 'ul' || tagName === 'ol') {
      // Processar lista - extrair todos os <li>
      const liRegex = /<li[^>]*>(.*?)<\/li>/gis
      const listItems: any[] = []
      let liMatch
      while ((liMatch = liRegex.exec(content)) !== null) {
        listItems.push({
          type: 'li',
          children: processInlineTags(liMatch[1]),
        })
      }
      if (listItems.length > 0) {
        blocks.push({
          type: tagName === 'ul' ? 'ul' : 'ol',
          children: listItems,
        })
      }
    }

    lastIndex = match.index + fullMatch.length
  }

  // Adicionar texto restante
  const remainingText = cleanHtml.substring(lastIndex).trim()
  if (remainingText) {
    const textOnly = remainingText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    if (textOnly) {
      blocks.push({
        type: 'p',
        children: [{ text: textOnly }],
      })
    }
  }

  // Se não houver blocos, criar um parágrafo com todo o texto
  if (blocks.length === 0) {
    const textOnly = cleanHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    if (textOnly) {
      blocks.push({
        type: 'p',
        children: [{ text: textOnly }],
      })
    }
  }

  return blocks
}

// Processar tags inline (strong, em, etc.)
function processInlineTags(html: string): any[] {
  if (!html) return [{ text: '' }]
  
  // Remover tags de bloco aninhadas e processar inline
  let text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  
  if (!text) return [{ text: '' }]
  
  return [{ text }]
}

