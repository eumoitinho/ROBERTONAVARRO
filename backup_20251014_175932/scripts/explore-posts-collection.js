#!/usr/bin/env node

/**
 * 🔍 EXPLORAR COLEÇÃO DE POSTS
 */

require('dotenv').config({ path: '.env.local' });
const { basehub } = require('basehub');

console.log('🔍 EXPLORANDO COLEÇÃO DE POSTS');

async function explorePostsCollection() {
  try {
    console.log('📝 Explorando posts collection...');

    // Vamos tentar ver se há items na collection de posts
    const postsQuery = await basehub().query({
      blog: {
        posts: {
          items: {
            _id: true,
            _title: true,
            __typename: true,
          }
        }
      }
    });

    console.log('📋 Posts items:');
    console.log(JSON.stringify(postsQuery, null, 2));

    if (postsQuery.blog.posts.items && postsQuery.blog.posts.items.length > 0) {
      console.log(`🎉 Encontrados ${postsQuery.blog.posts.items.length} posts!`);

      // Vamos explorar o primeiro post para ver os campos disponíveis
      const firstPostId = postsQuery.blog.posts.items[0]._id;

      try {
        const detailedPost = await basehub().query({
          blog: {
            posts: {
              items: {
                _id: true,
                _title: true,
                _slug: true,
                // Vamos tentar campos comuns de blog posts
                content: true,
                excerpt: true,
                publishedAt: true,
                author: true,
                category: true,
              }
            }
          }
        });

        console.log('📖 Post detalhado:');
        console.log(JSON.stringify(detailedPost, null, 2));
      } catch (detailError) {
        console.log('⚠️ Erro ao buscar detalhes do post:', detailError.message);

        // Vamos tentar campos um por um para descobrir quais existem
        const fields = ['content', 'excerpt', 'publishedAt', 'author', 'category', 'slug', 'readingTime'];

        for (const field of fields) {
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

            // Adicionar o campo sendo testado
            query.blog.posts.items[field] = true;

            await basehub().query(query);
            console.log(`✅ Campo '${field}' existe`);
          } catch (fieldError) {
            console.log(`❌ Campo '${field}' não existe`);
          }
        }
      }
    } else {
      console.log('📭 Nenhum post encontrado na collection');
      console.log('💡 A collection está vazia - pronta para importação!');
    }

    return postsQuery;
  } catch (error) {
    console.error('❌ Erro ao explorar posts:', error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Iniciando exploração dos posts...\n');

  const posts = await explorePostsCollection();

  if (!posts) {
    console.log('❌ Não consegui explorar os posts');
    return;
  }

  console.log('\n📋 RESUMO DA EXPLORAÇÃO:');
  console.log('✅ Posts collection encontrada');
  console.log('📝 Structure: blog.posts.items[]');

  console.log('\n🎯 PRÓXIMO PASSO:');
  console.log('1. Agora sabemos a estrutura correta');
  console.log('2. Vamos criar um script para formatar os dados');
  console.log('3. E preparar a importação manual via interface BaseHub');
}

main();