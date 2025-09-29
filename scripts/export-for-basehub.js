#!/usr/bin/env node

/**
 * 🚀 SCRIPT DE EXPORTAÇÃO PARA BASEHUB
 *
 * Este script converte seus posts para um formato que você pode
 * copiar e colar facilmente no BaseHub.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 EXPORTANDO POSTS PARA BASEHUB...\n');

// Lê o arquivo de fallback data
const fallbackDataPath = path.join(__dirname, '../lib/basehub/fallback-data.ts');

if (!fs.existsSync(fallbackDataPath)) {
  console.error('❌ Arquivo fallback-data.ts não encontrado!');
  process.exit(1);
}

const fileContent = fs.readFileSync(fallbackDataPath, 'utf8');

// Extrai o array de posts
const arrayMatch = fileContent.match(/export const fallbackBlogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);

if (!arrayMatch) {
  console.error('❌ Não foi possível encontrar o array de posts!');
  process.exit(1);
}

const posts = JSON.parse(arrayMatch[1]);

console.log(`📝 ENCONTRADOS ${posts.length} POSTS PARA EXPORTAR\n`);

// Agrupa por categoria
const categories = {};
posts.forEach(post => {
  const category = post.category || 'Sem Categoria';
  if (!categories[category]) {
    categories[category] = [];
  }
  categories[category].push(post);
});

// Cria pasta de exports se não existir
const exportDir = path.join(__dirname, '../exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir);
}

// Cria um arquivo por categoria
Object.entries(categories).forEach(([category, categoryPosts]) => {
  const fileName = `${category.toLowerCase().replace(/\s+/g, '-')}.json`;
  const filePath = path.join(exportDir, fileName);

  const exportData = {
    category,
    count: categoryPosts.length,
    posts: categoryPosts.map(post => ({
      _title: post._title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content.html,
      coverImage: post.coverImage?.url || '',
      publishedAt: post.publishedAt,
      author: post.author,
      category: post.category,
      readingTime: post.readingTime
    }))
  };

  fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2));
  console.log(`✅ ${category}: ${categoryPosts.length} posts → exports/${fileName}`);
});

// Cria um arquivo master com todos os posts
const masterFile = path.join(exportDir, 'todos-os-posts.json');
fs.writeFileSync(masterFile, JSON.stringify(posts.map(post => ({
  _title: post._title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content.html,
  coverImage: post.coverImage?.url || '',
  publishedAt: post.publishedAt,
  author: post.author,
  category: post.category,
  readingTime: post.readingTime
})), null, 2));

console.log(`✅ Arquivo mestre → exports/todos-os-posts.json`);

console.log('\n🎯 INSTRUÇÕES DE IMPORTAÇÃO:');
console.log('1. Acesse seu BaseHub');
console.log('2. Crie a coleção "blog" com os campos necessários');
console.log('3. Para cada post nos arquivos JSON:');
console.log('   - Copie os dados');
console.log('   - Cole no BaseHub');
console.log('   - Salve e publique');

console.log('\n📊 RESUMO:');
Object.entries(categories).forEach(([category, posts]) => {
  console.log(`   ${category}: ${posts.length} posts`);
});

console.log(`\n🚀 TOTAL: ${posts.length} posts prontos para importar!`);
console.log('\n💡 DICA: Comece importando 2-3 posts para testar, depois importe o resto.');