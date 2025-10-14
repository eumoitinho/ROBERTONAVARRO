#!/usr/bin/env node

/**
 * 🎯 IMPORTAÇÃO REAL PARA BASEHUB
 *
 * Baseado na estrutura real do BaseHub que você mostrou
 */

const fs = require('fs');
const path = require('path');
const { basehub } = require('basehub');

const BASEHUB_TOKEN = process.env.BASEHUB_TOKEN || 'bshb_pk_dd0cdolehu4d1p0429w0th2vec5radc7hjdam1nxdezescwjyjbj8c3xa6agcxm5';

console.log('🎯 IMPORTAÇÃO REAL PARA BASEHUB');
console.log('📁 Analisando estrutura existente...\n');

// Função para investigar a estrutura real
async function investigateStructure() {
  const client = basehub({
    token: BASEHUB_TOKEN,
  });

  try {
    console.log('🔍 Investigando estrutura do seu BaseHub...');

    // Vamos tentar uma query mais específica baseada no que vimos na tela
    const result = await client.query({
      blog: {
        posts: {
          items: {
            _id: true,
            _title: true,
            __typename: true,
          }
        },
        authors: {
          items: {
            _id: true,
            _title: true,
            __typename: true,
          }
        }
      }
    });

    console.log('✅ Estrutura encontrada:');
    console.log(JSON.stringify(result, null, 2));

    return result;

  } catch (error) {
    console.log('⚠️ Primeira tentativa falhou, tentando query mais simples...');

    try {
      // Query mais simples
      const simpleResult = await client.query({
        __typename: true,
      });

      console.log('📄 Resposta simples:', JSON.stringify(simpleResult, null, 2));

      // Agora vamos tentar ver o que tem no blog
      const blogResult = await client.query({
        blog: {
          __typename: true,
        }
      });

      console.log('📝 Blog structure:', JSON.stringify(blogResult, null, 2));

      return blogResult;

    } catch (innerError) {
      console.error('❌ Erro ao investigar:', innerError.message);
      throw innerError;
    }
  }
}

// Função para criar um autor primeiro (se necessário)
async function createAuthor() {
  const client = basehub({
    token: BASEHUB_TOKEN,
  });

  try {
    console.log('👤 Criando autor Roberto Navarro...');

    // Tentar criar um autor
    const authorData = {
      _title: "Roberto Navarro",
      name: "Roberto Navarro",
      bio: "Educador Financeiro e Coach",
      email: "contato@robertonavarro.com"
    };

    console.log('📝 Dados do autor:', authorData);

    // Por enquanto, só vamos logar o que faríamos
    console.log('✅ Autor (simulado) criado para Roberto Navarro');

    return "roberto-navarro-id";

  } catch (error) {
    console.error('❌ Erro ao criar autor:', error.message);
    return null;
  }
}

// Função para criar um post de teste
async function createTestPost() {
  const client = basehub({
    token: BASEHUB_TOKEN,
  });

  try {
    console.log('📝 Criando post de teste...');

    // Dados do primeiro post
    const testPost = {
      _title: "Teste - Primeiro Post BaseHub",
      slug: "teste-primeiro-post",
      excerpt: "Este é um post de teste para verificar a integração com BaseHub",
      content: "<h2>Funcionou!</h2><p>Se você está vendo isso, a integração está funcionando.</p>",
      publishedAt: "2024-12-01",
      author: "Roberto Navarro",
      category: "Teste"
    };

    console.log('📄 Dados do post:', testPost);
    console.log('✅ Post de teste (simulado) criado');

    return testPost;

  } catch (error) {
    console.error('❌ Erro ao criar post:', error.message);
    return null;
  }
}

// Função principal
async function main() {
  try {
    console.log('🚀 Iniciando análise da estrutura real...\n');

    // 1. Investigar estrutura
    const structure = await investigateStructure();

    // 2. Criar autor se necessário
    const authorId = await createAuthor();

    // 3. Criar post de teste
    const testPost = await createTestPost();

    console.log('\n🎯 PRÓXIMOS PASSOS REAIS:');
    console.log('1. Analisando a estrutura que você já tem');
    console.log('2. Vou ajustar o script para funcionar com SUA estrutura');
    console.log('3. Depois importamos os 26 posts corretamente');

    console.log('\n💡 BASEADO NO QUE VI NA SUA TELA:');
    console.log('- Você tem authors e posts separados');
    console.log('- Interface é diferente do que eu imaginava');
    console.log('- Vou criar script específico para sua estrutura');

  } catch (error) {
    console.error('❌ Erro:', error.message);

    console.log('\n🔧 VAMOS TENTAR ABORDAGEM MANUAL:');
    console.log('1. Na sua interface BaseHub');
    console.log('2. Clique em "Add New" na seção posts');
    console.log('3. Vamos ver que campos aparecem');
    console.log('4. Aí eu ajusto o script para os campos corretos');
  }
}

if (require.main === module) {
  main();
}