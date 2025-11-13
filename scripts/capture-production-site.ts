import { chromium, type Browser, type Page } from 'playwright'
import * as fs from 'fs/promises'
import * as path from 'path'

// URL do site em produção
// Pode ser configurada via variável de ambiente: PRODUCTION_URL
// Exemplo: PRODUCTION_URL=https://www.robertonavarroficial.com.br pnpm capture:production
const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://robertonavarrooficial.com.br'

if (!PRODUCTION_URL) {
  console.error('❌ PRODUCTION_URL não está definida!')
  console.error('Defina via variável de ambiente: PRODUCTION_URL=https://seu-site.com.br pnpm capture:production')
  process.exit(1)
}

// Lista de todas as páginas para capturar
const PAGES_TO_CAPTURE = [
  // Home
  { url: '/', name: 'home' },
  
  // Formações
  { url: '/formacoes', name: 'formacoes-list' },
  { url: '/formacoes/educador-financeiro', name: 'educador-financeiro' },
  { url: '/formacoes/empreendedor-inteligente', name: 'empreendedor-inteligente' },
  { url: '/formacoes/metodo-tf', name: 'metodo-tf' },
  { url: '/formacoes/mentor-coaching-financeiro', name: 'mentor-coaching-financeiro' },
  { url: '/formacoes/mentoria', name: 'mentoria' },
  { url: '/formacoes/mentoria-de-investimentos', name: 'mentoria-investimentos' },
  { url: '/formacoes/mentoria-individual', name: 'mentoria-individual' },
  { url: '/formacoes/lcf-mentoring-pro', name: 'lcf-mentoring-pro' },
  { url: '/formacoes/rota-mind', name: 'rota-mind' },
  
  // Eventos
  { url: '/eventos', name: 'eventos-list' },
  { url: '/eventos/segredos-da-mente-milionaria', name: 'segredos-da-mente-milionaria' },
  { url: '/eventos/escalador-de-negocios', name: 'escalador-de-negocios' },
  { url: '/eventos/energia-do-dinheiro', name: 'energia-do-dinheiro' },
  { url: '/eventos/crencas-da-riqueza', name: 'crencas-da-riqueza' },
  { url: '/eventos/mentor-milionario', name: 'mentor-milionario' },
  
  // Livros
  { url: '/livros', name: 'livros-list' },
  { url: '/livros/sabedoria-do-dinheiro', name: 'sabedoria-do-dinheiro' },
  { url: '/livros/quebrando-mitos', name: 'quebrando-mitos' },
  { url: '/livros/arte-de-enriquecer', name: 'arte-de-enriquecer' },
  { url: '/livros/coaching-financeiro', name: 'coaching-financeiro' },
  
  // Conteúdo
  { url: '/conteudo', name: 'conteudo' },
  { url: '/lives', name: 'lives' },
  
  // Blog
  { url: '/blog', name: 'blog-list' },
  
  // Páginas estáticas
  { url: '/sobre', name: 'sobre' },
  { url: '/contato', name: 'contato' },
  { url: '/trabalhe-conosco', name: 'trabalhe-conosco' },
  { url: '/politica-privacidade', name: 'politica-privacidade' },
]

interface PageCapture {
  url: string
  name: string
  title: string
  html: string
  text: string
  sections: SectionData[]
  metadata: {
    description?: string
    ogTitle?: string
    ogDescription?: string
    canonical?: string
  }
  screenshots: {
    full?: string
    viewport?: string
  }
}

interface SectionData {
  tag: string
  id?: string
  className?: string
  text: string
  html: string
  children?: SectionData[]
}

async function capturePage(browser: Browser, pageUrl: string, pageName: string): Promise<PageCapture> {
  console.log(`📸 Capturando: ${pageName} (${pageUrl})`)
  
  const page = await browser.newPage()
  
  try {
    // Configurar viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    
    // Navegar para a página
    const fullUrl = `${PRODUCTION_URL}${pageUrl}`
    
    // Tentar com diferentes estratégias de wait
    try {
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 60000 })
    } catch (error) {
      // Se falhar, tentar com load
      try {
        await page.goto(fullUrl, { waitUntil: 'load', timeout: 60000 })
      } catch (error2) {
        // Se ainda falhar, tentar sem wait específico
        await page.goto(fullUrl, { timeout: 60000 })
      }
    }
    
    // Aguardar um pouco para garantir que tudo carregou
    await page.waitForTimeout(2000)
    
    // Capturar dados básicos
    const title = await page.title()
    const html = await page.content()
    
    // Capturar texto visível
    const text = await page.evaluate(() => {
      // Remover scripts e styles
      const scripts = document.querySelectorAll('script, style, noscript')
      scripts.forEach(el => el.remove())
      
      return document.body.innerText || ''
    })
    
    // Capturar seções estruturadas
    const sections = await page.evaluate(() => {
      const result: any[] = []
      
      // Capturar elementos principais (sections, articles, main, divs com IDs/classes significativas)
      const mainElements = document.body.querySelectorAll('section, article, main, [id], [class*="section"], [class*="hero"], [class*="content"]')
      
      mainElements.forEach((el: Element) => {
        const id = el.id || undefined
        const className = (el as HTMLElement).className?.toString() || undefined
        const tag = el.tagName.toLowerCase()
        const text = el.textContent?.trim() || ''
        const html = el.outerHTML.substring(0, 5000) // Limitar tamanho
        
        // Só adicionar se tiver conteúdo significativo
        if (text.length > 20 || id || (className && className.length > 0)) {
          result.push({
            tag,
            id,
            className,
            text: text.substring(0, 2000), // Limitar tamanho
            html,
          })
        }
      })
      
      return result
    })
    
    // Capturar metadata
    const metadata = await page.evaluate(() => {
      return {
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || undefined,
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || undefined,
        ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || undefined,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || undefined,
      }
    })
    
    // Capturar screenshots
    const screenshotsDir = path.join(process.cwd(), 'captures', 'screenshots')
    await fs.mkdir(screenshotsDir, { recursive: true })
    
    const fullScreenshot = path.join(screenshotsDir, `${pageName}-full.png`)
    await page.screenshot({ path: fullScreenshot, fullPage: true })
    
    const viewportScreenshot = path.join(screenshotsDir, `${pageName}-viewport.png`)
    await page.screenshot({ path: viewportScreenshot, fullPage: false })
    
    return {
      url: pageUrl,
      name: pageName,
      title,
      html,
      text,
      sections,
      metadata,
      screenshots: {
        full: fullScreenshot,
        viewport: viewportScreenshot,
      },
    }
  } finally {
    await page.close()
  }
}

async function main() {
  console.log('🚀 Iniciando captura do site em produção...')
  console.log(`📍 URL base: ${PRODUCTION_URL}`)
  console.log(`📄 Total de páginas: ${PAGES_TO_CAPTURE.length}\n`)
  
  // Criar diretório de capturas
  const capturesDir = path.join(process.cwd(), 'captures')
  await fs.mkdir(capturesDir, { recursive: true })
  
  const browser = await chromium.launch({ headless: true })
  
  try {
    const results: PageCapture[] = []
    
    for (const pageConfig of PAGES_TO_CAPTURE) {
      try {
        const capture = await capturePage(browser, pageConfig.url, pageConfig.name)
        results.push(capture)
        
        // Salvar captura individual
        const captureFile = path.join(capturesDir, `${pageConfig.name}.json`)
        await fs.writeFile(captureFile, JSON.stringify(capture, null, 2), 'utf-8')
        
        // Salvar HTML separado
        const htmlFile = path.join(capturesDir, `${pageConfig.name}.html`)
        await fs.writeFile(htmlFile, capture.html, 'utf-8')
        
        // Salvar texto puro
        const textFile = path.join(capturesDir, `${pageConfig.name}.txt`)
        await fs.writeFile(textFile, capture.text, 'utf-8')
        
        console.log(`✅ ${pageConfig.name} capturado\n`)
      } catch (error) {
        console.error(`❌ Erro ao capturar ${pageConfig.name}:`, error)
      }
    }
    
    // Salvar resumo geral
    const summary = {
      productionUrl: PRODUCTION_URL,
      capturedAt: new Date().toISOString(),
      totalPages: results.length,
      pages: results.map(r => ({
        name: r.name,
        url: r.url,
        title: r.title,
        sectionsCount: r.sections.length,
      })),
    }
    
    const summaryFile = path.join(capturesDir, 'summary.json')
    await fs.writeFile(summaryFile, JSON.stringify(summary, null, 2), 'utf-8')
    
    console.log('\n✅ Captura concluída!')
    console.log(`📁 Arquivos salvos em: ${capturesDir}`)
    console.log(`📊 Total capturado: ${results.length} páginas`)
    
  } finally {
    await browser.close()
  }
}

main().catch(console.error)

