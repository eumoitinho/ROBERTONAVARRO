#!/usr/bin/env node

/**
 * 🔍 DESCOBRIR CAMPOS REAIS DOS POSTS
 */

require('dotenv').config({ path: '.env.local' });
const { basehub } = require('basehub');

console.log('🔍 DESCOBRINDO CAMPOS REAIS DOS POSTS');

async function discoverPostFields() {
  try {
    console.log('📝 Analisando post existente...');

    // Primeiro, vamos pegar o primeiro post
    const basicPost = await basehub().query({
      blog: {
        posts: {
          items: {
            _id: true,
            _title: true,
            _slug: true,
            __typename: true,
            excerpt: true, // Sabemos que esse existe
          }
        }
      }
    });

    console.log('📋 Post básico:');
    console.log(JSON.stringify(basicPost, null, 2));

    // Agora vamos tentar campos relacionais como author
    try {
      const postWithAuthor = await basehub().query({
        blog: {
          posts: {
            items: {
              _id: true,
              _title: true,
              author: {
                _id: true,
                _title: true,
              }
            }
          }
        }
      });

      console.log('👤 Post com autor:');
      console.log(JSON.stringify(postWithAuthor, null, 2));
    } catch (authorError) {
      console.log('⚠️ Erro com campo author:', authorError.message);
    }

    // Vamos tentar outros campos possíveis
    const possibleFields = [
      'body',
      'description',
      'summary',
      'text',
      'date',
      'createdAt',
      'updatedAt',
      'tags',
      'categories',
      'image',
      'coverImage',
      'featured',
      'published',
    ];

    console.log('\n🔍 Testando campos possíveis...');

    for (const field of possibleFields) {
      try {
        const query = {
          blog: {
            posts: {
              items: {
                _id: true,
                _title: true,
              }
            }
          }
        };

        query.blog.posts.items[field] = true;

        const result = await basehub().query(query);
        console.log(`✅ Campo '${field}' existe`);

        // Se o campo existe, vamos ver o que tem nele
        if (result.blog.posts.items[0] && result.blog.posts.items[0][field] !== undefined) {
          console.log(`   Valor: ${JSON.stringify(result.blog.posts.items[0][field])}`);
        }
      } catch (fieldError) {
        // Campo não existe, mas não vamos logar para não poluir
      }
    }

    return basicPost;
  } catch (error) {
    console.error('❌ Erro ao descobrir campos:', error.message);
    return null;
  }
}

async function exploreAuthors() {
  try {
    console.log('\n👤 Explorando authors...');

    const authors = await basehub().query({
      blog: {
        authors: {
          items: {
            _id: true,
            _title: true,
            __typename: true,
          }
        }
      }
    });

    console.log('📋 Authors encontrados:');
    console.log(JSON.stringify(authors, null, 2));

    return authors;
  } catch (error) {
    console.log('⚠️ Erro ao explorar authors:', error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Iniciando descoberta de campos...\n');

  // 1. Descobrir campos dos posts
  const posts = await discoverPostFields();

  // 2. Explorar authors
  const authors = await exploreAuthors();

  console.log('\n📋 RESUMO:');
  console.log('✅ 3 posts já existem no BaseHub');
  console.log('✅ Estrutura: blog.posts.items[]');
  console.log('✅ Campos básicos: _id, _title, _slug, excerpt');

  console.log('\n🎯 PRÓXIMO PASSO:');
  console.log('1. Usar a interface web do BaseHub para ver todos os campos');
  console.log('2. Criar um post de teste para entender a estrutura');
  console.log('3. Adaptar nossos 26 posts para essa estrutura');
}

main();