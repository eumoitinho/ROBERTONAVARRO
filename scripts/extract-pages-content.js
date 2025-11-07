const fs = require('fs');
const path = require('path');

/**
 * Script para extrair conteúdo (textos e imagens) de todas as páginas
 * e gerar JSON estruturado para migração ao Strapi
 */

const pagesDir = path.join(__dirname, '../app');
const outputFile = path.join(__dirname, '../strapi-migration-data.json');

// Função para ler arquivo e extrair conteúdo
function extractPageContent(filePath, route) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extrair textos entre aspas (strings JSX)
    const textMatches = content.match(/"([^"]{10,})"/g) || [];
    const texts = textMatches
      .map(match => match.replace(/^"|"$/g, ''))
      .filter(text => text.length > 10 && !text.match(/^(use|import|export|function|const|let|var|return|if|else|for|while|switch|case|break|continue|default|class|extends|super|this|new|typeof|instanceof|void|delete|in|of|as|is|from|to|src|alt|href|className|onClick|onSubmit|onChange|target|rel|key|id|value|type|name|placeholder|required|disabled|checked|selected|readOnly|autoFocus|autoComplete|style|dangerouslySetInnerHTML|__html|jsx|tsx|ts|js)$/))
      .filter((text, index, self) => self.indexOf(text) === index); // Remove duplicatas
    
    // Extrair caminhos de imagens
    const imageMatches = content.match(/src=["']([^"']*\.(jpg|jpeg|png|gif|webp|svg))["']/gi) || [];
    const images = imageMatches
      .map(match => {
        const src = match.match(/src=["']([^"']+)["']/i);
        return src ? src[1] : null;
      })
      .filter(img => img && !img.startsWith('http') && !img.startsWith('data:'))
      .filter((img, index, self) => self.indexOf(img) === index);
    
    // Extrair títulos (h1, h2, h3)
    const titleMatches = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/gi) || [];
    const titles = titleMatches
      .map(match => match.replace(/<[^>]+>/g, '').trim())
      .filter(title => title.length > 5);
    
    // Extrair descrições (parágrafos principais)
    const descriptionMatches = content.match(/<p[^>]*>([^<]{50,})<\/p>/gi) || [];
    const descriptions = descriptionMatches
      .map(match => match.replace(/<[^>]+>/g, '').trim())
      .filter(desc => desc.length > 50 && desc.length < 500);
    
    return {
      route,
      filePath: path.relative(process.cwd(), filePath),
      texts: texts.slice(0, 50), // Limitar quantidade
      images,
      titles: titles.slice(0, 20),
      descriptions: descriptions.slice(0, 10),
    };
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error.message);
    return null;
  }
}

// Função para encontrar todos os arquivos page.tsx
function findPageFiles(dir, baseRoute = '') {
  const pages = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const route = baseRoute ? `${baseRoute}/${item.name}` : `/${item.name}`;
    
    if (item.isDirectory()) {
      // Ignorar algumas pastas
      if (!['node_modules', '.next', 'api', 'admin', 'studio'].includes(item.name)) {
        pages.push(...findPageFiles(fullPath, route));
      }
    } else if (item.name === 'page.tsx' && !item.name.includes('backup')) {
      pages.push({ path: fullPath, route: baseRoute || '/' });
    }
  }
  
  return pages;
}

// Função principal
function main() {
  console.log('🔍 Buscando páginas...');
  const pageFiles = findPageFiles(pagesDir);
  console.log(`✅ Encontradas ${pageFiles.length} páginas`);
  
  console.log('\n📝 Extraindo conteúdo...');
  const pagesData = [];
  
  for (const page of pageFiles) {
    const content = extractPageContent(page.path, page.route);
    if (content) {
      pagesData.push(content);
      console.log(`  ✓ ${page.route}`);
    }
  }
  
  // Estruturar dados para Strapi
  const strapiData = {
    pages: pagesData.map(page => ({
      slug: page.route.replace(/^\//, '').replace(/\//g, '-') || 'home',
      route: page.route,
      type: determinePageType(page.route),
      hero: {
        title: page.titles[0] || '',
        subtitle: page.titles[1] || '',
        description: page.descriptions[0] || '',
        image: page.images[0] || '',
        backgroundImage: page.images.find(img => img.includes('bg') || img.includes('hero')) || page.images[0] || '',
      },
      sections: extractSections(page),
      images: page.images.map(img => ({ url: img, alt: '' })),
      metadata: {
        title: page.titles[0] || '',
        description: page.descriptions[0] || '',
      },
    })),
    extractedAt: new Date().toISOString(),
    totalPages: pagesData.length,
  };
  
  // Salvar JSON
  fs.writeFileSync(outputFile, JSON.stringify(strapiData, null, 2));
  console.log(`\n✅ JSON gerado: ${outputFile}`);
  console.log(`📊 Total: ${strapiData.pages.length} páginas processadas`);
}

// Determinar tipo de página pela rota
function determinePageType(route) {
  if (route === '/') return 'home';
  if (route.startsWith('/eventos')) return 'event';
  if (route.startsWith('/formacoes')) return 'formation';
  if (route.startsWith('/livros')) return 'book';
  if (route.startsWith('/blog')) return 'blog';
  if (route.startsWith('/lp')) return 'landing';
  return 'page';
}

// Extrair seções da página
function extractSections(page) {
  const sections = [];
  
  // Seção hero (já extraída)
  if (page.titles[0] || page.descriptions[0]) {
    sections.push({
      type: 'hero',
      title: page.titles[0] || '',
      content: page.descriptions[0] || '',
    });
  }
  
  // Outras seções baseadas em títulos
  for (let i = 1; i < Math.min(page.titles.length, 10); i++) {
    sections.push({
      type: 'section',
      title: page.titles[i] || '',
      content: page.descriptions[i] || page.texts[i * 2] || '',
    });
  }
  
  return sections;
}

// Executar
main();

