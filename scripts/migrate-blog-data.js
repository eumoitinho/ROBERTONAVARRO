const fs = require('fs');
const path = require('path');

// Lê o arquivo blog-data.ts original
const originalDataPath = path.join(__dirname, '../lib/blog-data.ts');
const originalData = fs.readFileSync(originalDataPath, 'utf8');

// Extrai o array ptBlogPosts usando regex
const blogPostsMatch = originalData.match(/export const ptBlogPosts = \[([\s\S]*)\];/);
if (!blogPostsMatch) {
  console.error('Could not find ptBlogPosts array');
  process.exit(1);
}

// Avalia o código JavaScript do array (método simples)
const ptBlogPosts = eval(`[${blogPostsMatch[1]}]`);

// Função para converter data do formato brasileiro para ISO
function convertDate(brazilianDate) {
  const months = {
    'Janeiro': '01', 'Fevereiro': '02', 'Março': '03', 'Abril': '04',
    'Maio': '05', 'Junho': '06', 'Julho': '07', 'Agosto': '08',
    'Setembro': '09', 'Outubro': '10', 'Novembro': '11', 'Dezembro': '12'
  };

  // Formato: "20 de Junho, 2025"
  const match = brazilianDate.match(/(\d+) de (\w+), (\d+)/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = months[match[2]] || '01';
    const year = match[3];
    return `${year}-${month}-${day}T10:00:00Z`;
  }

  return new Date().toISOString();
}

// Função para calcular tempo de leitura
function calculateReadingTime(content) {
  const wordCount = content.replace(/<[^>]*>/g, '').split(' ').length;
  return Math.ceil(wordCount / 200); // 200 palavras por minuto
}

// Converte para o formato BaseHub
const convertedPosts = ptBlogPosts.map(post => ({
  _id: post.id.toString(),
  _title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: {
    raw: post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
    html: post.content
  },
  coverImage: post.image ? {
    url: post.image,
    alt: post.title
  } : undefined,
  publishedAt: convertDate(post.date),
  author: post.author || 'Roberto Navarro',
  category: post.category,
  readingTime: calculateReadingTime(post.content)
}));

// Gera o arquivo TypeScript de fallback
const fallbackContent = `import type { BlogPost } from './client';

export const fallbackBlogPosts: BlogPost[] = ${JSON.stringify(convertedPosts, null, 2)};`;

// Escreve o arquivo
const outputPath = path.join(__dirname, '../lib/basehub/fallback-data.ts');
fs.writeFileSync(outputPath, fallbackContent);

console.log(`✅ Successfully migrated ${convertedPosts.length} blog posts to BaseHub format`);
console.log(`📝 Generated file: ${outputPath}`);

// Mostra estatísticas por categoria
const categoryStats = convertedPosts.reduce((acc, post) => {
  acc[post.category] = (acc[post.category] || 0) + 1;
  return acc;
}, {});

console.log('\n📊 Posts by category:');
Object.entries(categoryStats).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} posts`);
});