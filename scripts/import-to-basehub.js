#!/usr/bin/env node

/**
 * 🚀 SCRIPT DE IMPORTAÇÃO AUTOMÁTICA PARA BASEHUB
 *
 * Este script importa automaticamente todos os 26 posts para o BaseHub
 */

const fs = require('fs');
const path = require('path');

// Configuração
const BASEHUB_TOKEN = process.env.BASEHUB_TOKEN || 'bshb_pk_dd0cdolehu4d1p0429w0th2vec5radc7hjdam1nxdezescwjyjbj8c3xa6agcxm5';
const BASEHUB_API = 'https://api.basehub.com/graphql';

console.log('🚀 INICIANDO IMPORTAÇÃO AUTOMÁTICA PARA BASEHUB...\n');

if (!BASEHUB_TOKEN) {
  console.error('❌ Token do BaseHub não encontrado!');
  console.log('💡 Configure a variável BASEHUB_TOKEN no .env.local');
  process.exit(1);
}

// Lê os posts convertidos
const fallbackDataPath = path.join(__dirname, '../lib/basehub/fallback-data.ts');

if (!fs.existsSync(fallbackDataPath)) {
  console.error('❌ Arquivo de posts não encontrado!');
  process.exit(1);
}

const fileContent = fs.readFileSync(fallbackDataPath, 'utf8');
const arrayMatch = fileContent.match(/export const fallbackBlogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);

if (!arrayMatch) {
  console.error('❌ Não foi possível extrair os posts!');
  process.exit(1);
}

const posts = JSON.parse(arrayMatch[1]);
console.log(`📝 Encontrados ${posts.length} posts para importar\n`);

// Função para fazer requisição GraphQL ao BaseHub
async function makeGraphQLRequest(query, variables = {}) {
  try {
    const response = await fetch(BASEHUB_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BASEHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(JSON.stringify(result.errors, null, 2));
    }

    return result.data;
  } catch (error) {
    console.error('❌ Erro na requisição GraphQL:', error.message);
    throw error;
  }
}

// Função para verificar se o repositório e coleção existem
async function checkRepository() {
  console.log('🔍 Verificando repositório BaseHub...');

  const query = `
    query {
      repository {
        _id
        _title
        blocks {
          _id
          _title
          __typename
        }
      }
    }
  `;

  try {
    const data = await makeGraphQLRequest(query);
    console.log(`✅ Repositório encontrado: ${data.repository._title}`);

    // Verifica se existe coleção 'blog'
    const blogCollection = data.repository.blocks.find(block =>
      block._title.toLowerCase() === 'blog' && block.__typename === 'Collection'
    );

    if (blogCollection) {
      console.log(`✅ Coleção 'blog' encontrada: ${blogCollection._id}`);
      return blogCollection._id;
    } else {
      console.log('⚠️  Coleção "blog" não encontrada');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao verificar repositório:', error.message);
    throw error;
  }
}

// Função para criar a coleção blog se não existir
async function createBlogCollection() {
  console.log('🔧 Criando coleção "blog"...');

  const mutation = `
    mutation CreateBlogCollection {
      createBlock(
        data: {
          _title: "blog"
          __typename: "Collection"
          fields: [
            { _title: "_title", __typename: "TextField", required: true }
            { _title: "slug", __typename: "TextField", required: true, unique: true }
            { _title: "excerpt", __typename: "TextField", required: true }
            { _title: "content", __typename: "RichTextField", required: true }
            { _title: "coverImage", __typename: "ImageField", required: false }
            { _title: "publishedAt", __typename: "DateField", required: true }
            { _title: "author", __typename: "TextField", required: true }
            { _title: "category", __typename: "TextField", required: true }
            { _title: "readingTime", __typename: "NumberField", required: false }
          ]
        }
      ) {
        _id
        _title
      }
    }
  `;

  try {
    const data = await makeGraphQLRequest(mutation);
    console.log(`✅ Coleção criada: ${data.createBlock._title} (${data.createBlock._id})`);
    return data.createBlock._id;
  } catch (error) {
    console.error('❌ Erro ao criar coleção:', error.message);
    throw error;
  }
}

// Função para importar um post
async function importPost(post, collectionId, index, total) {
  console.log(`📝 Importando post ${index + 1}/${total}: "${post._title}"`);

  const mutation = `
    mutation CreateBlogPost($data: JSON!) {
      createItem(
        collectionId: "${collectionId}"
        data: $data
      ) {
        _id
        _title
      }
    }
  `;

  const postData = {
    _title: post._title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content.html,
    publishedAt: post.publishedAt,
    author: post.author,
    category: post.category,
    readingTime: post.readingTime,
    // coverImage será tratado separadamente se necessário
  };

  try {
    const data = await makeGraphQLRequest(mutation, { data: postData });
    console.log(`✅ Post importado: ${data.createItem._title} (${data.createItem._id})`);
    return data.createItem._id;
  } catch (error) {
    console.error(`❌ Erro ao importar post "${post._title}":`, error.message);
    return null;
  }
}

// Função principal
async function main() {
  try {
    // 1. Verificar repositório
    let collectionId = await checkRepository();

    // 2. Criar coleção se necessário
    if (!collectionId) {
      collectionId = await createBlogCollection();
    }

    console.log('\n🚀 Iniciando importação dos posts...\n');

    // 3. Importar posts
    const imported = [];
    const failed = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postId = await importPost(post, collectionId, i, posts.length);

      if (postId) {
        imported.push({ title: post._title, id: postId });
      } else {
        failed.push(post._title);
      }

      // Pequena pausa entre imports para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 4. Relatório final
    console.log('\n🎉 IMPORTAÇÃO CONCLUÍDA!\n');
    console.log(`✅ Posts importados com sucesso: ${imported.length}`);

    if (failed.length > 0) {
      console.log(`❌ Posts que falharam: ${failed.length}`);
      console.log('Posts com falha:', failed.join(', '));
    }

    console.log('\n📊 RESUMO POR CATEGORIA:');
    const categories = {};
    posts.forEach(post => {
      categories[post.category] = (categories[post.category] || 0) + 1;
    });

    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} posts`);
    });

    console.log('\n🎯 PRÓXIMOS PASSOS:');
    console.log('1. Acesse seu BaseHub para verificar os posts');
    console.log('2. Teste o blog: npm run dev');
    console.log('3. Verifique se os posts aparecem em /blog');
    console.log('\n💫 Seu blog BaseHub está pronto! 🚀');

  } catch (error) {
    console.error('❌ Erro durante a importação:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}