#!/usr/bin/env node

/**
 * 🔍 TESTAR BASEHUB COM SDK GERADO
 */

require('dotenv').config({ path: '.env.local' });
const { basehub } = require('basehub');

console.log('🔍 TESTANDO BASEHUB COM SDK GERADO');

async function testConnection() {
  try {
    console.log('📡 Conectando ao BaseHub...');

    // Teste básico de conexão
    const result = await basehub().query({
      __typename: true
    });

    console.log('✅ Conexão funcionou!');
    console.log('Tipo:', result.__typename);

    return true;
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    return false;
  }
}

async function discoverSchema() {
  try {
    console.log('🔍 Descobrindo schema...');

    // Vamos tentar descobrir o que temos disponível
    const queries = [
      // Tentar blog collection
      { name: 'blog', query: { blog: { __typename: true } } },

      // Tentar repository
      { name: 'repository', query: { repository: { _id: true, _title: true } } },

      // Tentar collections
      { name: 'collections', query: { collections: { __typename: true } } },
    ];

    for (const testQuery of queries) {
      try {
        console.log(`🔍 Testando: ${testQuery.name}`);
        const result = await basehub().query(testQuery.query);
        console.log(`✅ ${testQuery.name} funcionou!`);
        console.log(JSON.stringify(result, null, 2));
        return { success: true, query: testQuery.name, result };
      } catch (error) {
        console.log(`❌ ${testQuery.name} falhou: ${error.message}`);
      }
    }

    return { success: false };
  } catch (error) {
    console.error('❌ Erro ao descobrir schema:', error.message);
    return { success: false };
  }
}

async function main() {
  // 1. Testar conexão básica
  const connected = await testConnection();

  if (!connected) {
    console.log('\n❌ CONEXÃO FALHOU');
    console.log('Verifique se:');
    console.log('1. O token está correto no .env.local');
    console.log('2. O repositório está ativo no BaseHub');
    console.log('3. O SDK foi gerado corretamente');
    return;
  }

  // 2. Descobrir schema
  const schemaResult = await discoverSchema();

  if (schemaResult.success) {
    console.log('\n🎉 SCHEMA DESCOBERTO!');
    console.log(`Query que funcionou: ${schemaResult.query}`);
    console.log('Agora podemos importar os posts!');
  } else {
    console.log('\n⚠️ SCHEMA NÃO DESCOBERTO');
    console.log('Vamos tentar uma abordagem manual...');
  }
}

main();