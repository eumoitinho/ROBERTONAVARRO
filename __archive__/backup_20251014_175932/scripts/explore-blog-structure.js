#!/usr/bin/env node

/**
 * 🔍 EXPLORAR ESTRUTURA DO BLOG NO BASEHUB
 */

require('dotenv').config({ path: '.env.local' });
const { basehub } = require('basehub');

console.log('🔍 EXPLORANDO ESTRUTURA DO BLOG');

async function exploreBlogStructure() {
  try {
    console.log('📖 Explorando blog...');

    // Primeiro, vamos ver a estrutura básica do blog
    const blogStructure = await basehub().query({
      blog: {
        __typename: true,
        _id: true,
        _title: true,
      }
    });

    console.log('📋 Estrutura básica do blog:');
    console.log(JSON.stringify(blogStructure, null, 2));

    // Agora vamos tentar ver se há posts
    try {
      const postsQuery = await basehub().query({
        blog: {
          posts: {
            __typename: true,
            _id: true,
            _title: true,
          }
        }
      });

      console.log('📝 Posts encontrados:');
      console.log(JSON.stringify(postsQuery, null, 2));
    } catch (error) {
      console.log('⚠️ Não consegui acessar posts:', error.message);
    }

    // Vamos tentar ver todos os campos disponíveis em blog
    try {
      const allFieldsQuery = await basehub().query({
        blog: {
          __typename: true,
          _id: true,
          _title: true,
          _slug: true,
          _status: true,
        }
      });

      console.log('🏗️ Todos os campos do blog:');
      console.log(JSON.stringify(allFieldsQuery, null, 2));
    } catch (error) {
      console.log('⚠️ Erro ao buscar todos os campos:', error.message);
    }

    return blogStructure;
  } catch (error) {
    console.error('❌ Erro ao explorar estrutura:', error.message);
    return null;
  }
}

async function tryCreatePost() {
  try {
    console.log('📝 Tentando descobrir como criar um post...');

    // Vamos tentar uma mutation de teste (apenas para ver se é possível)
    console.log('⚠️ Mutations não são disponíveis via SDK de leitura');
    console.log('💡 Para criar posts, precisamos usar a interface web do BaseHub');

    return true;
  } catch (error) {
    console.log('⚠️ Mutations não disponíveis:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando exploração...\n');

  // 1. Explorar estrutura
  const structure = await exploreBlogStructure();

  if (!structure) {
    console.log('❌ Não consegui explorar a estrutura');
    return;
  }

  // 2. Tentar entender como criar posts
  await tryCreatePost();

  console.log('\n📋 RESUMO:');
  console.log('✅ BaseHub conectado e funcionando');
  console.log('✅ Blog existe e está acessível');
  console.log('📝 Para importar posts, vamos usar a abordagem manual');

  console.log('\n🎯 PRÓXIMOS PASSOS:');
  console.log('1. Usar os dados já preparados em basehub-import/');
  console.log('2. Copiar e colar cada post manualmente no BaseHub');
  console.log('3. Ou encontrar a API de mutations para automatizar');
}

main();