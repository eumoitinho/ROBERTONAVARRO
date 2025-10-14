#!/usr/bin/env node

/**
 * 🔍 TESTE DE CONEXÃO COM BASEHUB
 *
 * Este script testa se conseguimos conectar com o BaseHub
 */

const BASEHUB_TOKEN = process.env.BASEHUB_TOKEN || 'bshb_pk_dd0cdolehu4d1p0429w0th2vec5radc7hjdam1nxdezescwjyjbj8c3xa6agcxm5';

console.log('🔍 TESTANDO CONEXÃO COM BASEHUB...\n');

// Função para testar conexão básica
async function testConnection() {
  try {
    // Primeiro, vamos tentar usar o SDK do BaseHub
    const { basehub } = require('basehub');

    const client = basehub({
      token: BASEHUB_TOKEN,
    });

    console.log('✅ Cliente BaseHub criado com sucesso');

    // Testar uma query simples
    try {
      console.log('🔍 Testando query básica...');

      // Query mínima para testar
      const result = await client.query({
        __typename: true
      });

      console.log('✅ Conexão com BaseHub funcionando!');
      console.log('📄 Resposta:', JSON.stringify(result, null, 2));

      return true;
    } catch (queryError) {
      console.log('⚠️  Query falhou, mas cliente criado. Detalhes:');
      console.log('Erro:', queryError.message);

      // Isso pode ser normal se não temos um repositório configurado ainda
      if (queryError.message.includes('No repository')) {
        console.log('\n💡 PRÓXIMO PASSO: Você precisa criar um repositório no BaseHub');
        console.log('1. Acesse: https://basehub.com');
        console.log('2. Crie um novo repositório');
        console.log('3. Volte aqui e rode o script de importação');
        return 'no_repo';
      }

      return false;
    }

  } catch (error) {
    console.error('❌ Erro ao conectar com BaseHub:', error.message);

    if (error.message.includes('Invalid token')) {
      console.log('\n💡 PROBLEMA: Token inválido');
      console.log('1. Verifique se o token está correto no .env.local');
      console.log('2. Gere um novo token no BaseHub se necessário');
    }

    return false;
  }
}

// Função principal
async function main() {
  const result = await testConnection();

  if (result === true) {
    console.log('\n🎉 TUDO PRONTO! Você pode rodar o script de importação:');
    console.log('npm run basehub:import');
  } else if (result === 'no_repo') {
    console.log('\n📋 INSTRUÇÕES:');
    console.log('1. Acesse https://basehub.com');
    console.log('2. Faça login com sua conta');
    console.log('3. Clique em "New Repository"');
    console.log('4. Nome: "roberto-navarro-blog"');
    console.log('5. Volte aqui e rode: node scripts/import-to-basehub.js');
  } else {
    console.log('\n❌ Conexão falhou. Verifique:');
    console.log('1. Token do BaseHub no .env.local');
    console.log('2. Conexão com internet');
    console.log('3. Se a conta BaseHub está ativa');
  }
}

if (require.main === module) {
  main();
}