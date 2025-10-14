#!/usr/bin/env node

/**
 * 🔍 DESCOBRIR SCHEMA REAL DO BASEHUB
 *
 * Vamos descobrir a estrutura real do seu repositório
 */

const { basehub } = require('basehub');

const BASEHUB_TOKEN = process.env.BASEHUB_TOKEN || 'bshb_pk_dd0cdolehu4d1p0429w0th2vec5radc7hjdam1nxdezescwjyjbj8c3xa6agcxm5';

console.log('🔍 DESCOBRINDO SCHEMA REAL DO SEU BASEHUB');
console.log('🌐 Repositório: https://basehub.com/clientes/blog/explore/main/26c1e1c4a4614e907dbf5\n');

async function discoverSchema() {
  const client = basehub({
    token: BASEHUB_TOKEN,
  });

  try {
    console.log('📡 Fazendo introspection query...');

    // Query de introspecção para descobrir o schema
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          queryType {
            name
            fields {
              name
              type {
                name
                kind
                fields {
                  name
                  type {
                    name
                    kind
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await client.query({
      __schema: {
        queryType: {
          name: true,
          fields: {
            name: true,
            type: {
              name: true,
              kind: true,
              fields: {
                name: true,
                type: {
                  name: true,
                  kind: true
                }
              }
            }
          }
        }
      }
    });

    console.log('✅ Schema descoberto!');
    console.log(JSON.stringify(result, null, 2));

    return result;

  } catch (error) {
    console.log('⚠️ Introspection falhou, tentando queries específicas...');

    // Vamos tentar algumas queries comuns do BaseHub
    const commonQueries = [
      // Tenta acessar collections comuns
      { name: 'repository', query: { repository: { _id: true, _title: true } } },
      { name: 'collections', query: { collections: { _id: true, _title: true } } },
      { name: 'blocks', query: { blocks: { _id: true, _title: true } } },
      { name: 'posts', query: { posts: { _id: true, _title: true } } },
      { name: 'blog', query: { blog: { _id: true, _title: true } } },
    ];

    for (const queryTest of commonQueries) {
      try {
        console.log(`🔍 Testando query: ${queryTest.name}`);
        const result = await client.query(queryTest.query);
        console.log(`✅ ${queryTest.name} funcionou!`);
        console.log(JSON.stringify(result, null, 2));
        return result;
      } catch (queryError) {
        console.log(`❌ ${queryTest.name} falhou: ${queryError.message}`);
      }
    }

    throw new Error('Não consegui descobrir o schema');
  }
}

async function testBasicConnection() {
  const client = basehub({
    token: BASEHUB_TOKEN,
  });

  try {
    console.log('🔌 Testando conexão básica...');

    const result = await client.query({
      __typename: true
    });

    console.log('✅ Conexão OK:', result);
    return true;
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    return false;
  }
}

async function main() {
  try {
    // 1. Testar conexão
    const connected = await testBasicConnection();
    if (!connected) {
      console.log('❌ Não consegui conectar. Verifique o token.');
      return;
    }

    // 2. Descobrir schema
    await discoverSchema();

    console.log('\n🎯 PRÓXIMO PASSO:');
    console.log('Com o schema descoberto, vou criar o script de importação correto');

  } catch (error) {
    console.error('❌ Erro:', error.message);

    console.log('\n🔧 PLANO B:');
    console.log('1. No seu BaseHub, clique em "Add New" na seção posts');
    console.log('2. Veja que campos aparecem');
    console.log('3. Me diga os nomes dos campos');
    console.log('4. Aí eu faço o script certo');
  }
}

if (require.main === module) {
  main();
}