#!/usr/bin/env node

/**
 * 🔧 TESTAR VARIAÇÕES DO TOKEN
 */

const { basehub } = require('basehub');

// Pegar o token do .env.local
require('dotenv').config({ path: '.env.local' });

const BASEHUB_TOKEN = process.env.BASEHUB_TOKEN;

console.log('🔧 TESTANDO CONFIGURAÇÕES DO BASEHUB');
console.log(`🔑 Token: ${BASEHUB_TOKEN ? BASEHUB_TOKEN.substring(0, 20) + '...' : 'NÃO ENCONTRADO'}\n`);

async function testVariations() {
  const variations = [
    // Configuração básica
    { name: 'Básico', config: { token: BASEHUB_TOKEN } },

    // Com draft mode
    { name: 'Draft mode', config: { token: BASEHUB_TOKEN, draft: true } },

    // Sem draft mode explícito
    { name: 'Sem draft', config: { token: BASEHUB_TOKEN, draft: false } },

    // Com API endpoint específico
    { name: 'Com endpoint', config: { token: BASEHUB_TOKEN, apiUrl: 'https://api.basehub.com/graphql' } },
  ];

  for (const variation of variations) {
    try {
      console.log(`🔍 Testando: ${variation.name}`);

      const client = basehub(variation.config);

      const result = await client.query({
        __typename: true
      });

      console.log(`✅ ${variation.name} funcionou!`);
      console.log('Resposta:', JSON.stringify(result, null, 2));

      // Se funcionou, vamos tentar descobrir mais
      try {
        const moreInfo = await client.query({
          repository: {
            _id: true,
            _title: true
          }
        });
        console.log('📁 Info do repositório:', JSON.stringify(moreInfo, null, 2));
      } catch (e) {
        console.log('⚠️ Repository query falhou:', e.message);
      }

      return { success: true, config: variation.config, client };

    } catch (error) {
      console.log(`❌ ${variation.name} falhou: ${error.message}`);
    }
  }

  return { success: false };
}

async function testDirectAPI() {
  console.log('\n🌐 Tentando API REST direta...');

  try {
    const response = await fetch('https://api.basehub.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BASEHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: '{ __typename }'
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ API REST funcionou!');
      console.log('Resposta:', JSON.stringify(result, null, 2));
      return true;
    } else {
      console.log('❌ API REST falhou:', result);
      return false;
    }

  } catch (error) {
    console.log('❌ Erro na API REST:', error.message);
    return false;
  }
}

async function main() {
  if (!BASEHUB_TOKEN) {
    console.error('❌ Token não encontrado no .env.local');
    return;
  }

  // Testar variações do SDK
  const sdkResult = await testVariations();

  if (!sdkResult.success) {
    // Testar API REST direta
    const apiResult = await testDirectAPI();

    if (!apiResult) {
      console.log('\n❌ NENHUMA CONFIGURAÇÃO FUNCIONOU');
      console.log('\n🔧 POSSÍVEIS PROBLEMAS:');
      console.log('1. Token errado para esse repositório');
      console.log('2. Repositório não está publicado');
      console.log('3. Permissões insuficientes');
      console.log('4. Token expirado');

      console.log('\n📋 PRÓXIMOS PASSOS:');
      console.log('1. No BaseHub, vá em Settings → API');
      console.log('2. Gere um novo token');
      console.log('3. Verifique se o repositório está ativo');
      console.log('4. Teste novamente');
    }
  } else {
    console.log('\n🎉 ENCONTRAMOS UMA CONFIGURAÇÃO QUE FUNCIONA!');
    console.log('Agora vou criar o script de importação...');
  }
}

if (require.main === module) {
  main();
}