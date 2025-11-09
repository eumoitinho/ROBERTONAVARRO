#!/usr/bin/env tsx
import dotenv from 'dotenv'
import path from 'path'
import Module from 'module'

// Carregar .env
dotenv.config({ path: path.resolve(__dirname, '../.env') })

// Stub para SCSS/CSS ANTES de qualquer require do Payload
const extensions = (Module as any)._extensions
if (!extensions['.scss']) {
  extensions['.scss'] = (module: any) => {
    module.exports = {}
  }
}
if (!extensions['.css']) {
  extensions['.css'] = (module: any) => {
    module.exports = {}
  }
}

// Desabilitar admin para seed
process.env.DISABLE_PAYLOAD_ADMIN = 'true'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const payload = require('payload')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { slateEditor } = require('@payloadcms/richtext-slate')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

async function seed() {
  try {
    console.log('🌱 Iniciando seed do Payload CMS...')

    // Importar collections diretamente
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Users = require('../payload/collections/Users').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Formacoes = require('../payload/collections/Formacoes').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Eventos = require('../payload/collections/Eventos').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Livros = require('../payload/collections/Livros').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Mentores = require('../payload/collections/Mentores').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Testimonials = require('../payload/collections/Testimonials').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FAQs = require('../payload/collections/FAQs').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Pages = require('../payload/collections/Pages').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Media = require('../payload/collections/Media').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { mongooseAdapter } = require('@payloadcms/db-mongodb')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { buildConfig } = require('payload/config')
    const path = require('path')

    // Construir config manualmente
    const configBuilder = buildConfig({
      serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
      admin: {
        user: 'users',
        meta: {
          titleSuffix: '- Roberto Navarro CMS',
        },
        disable: true,
      },
      editor: slateEditor({}),
      collections: [
        Users,
        Formacoes,
        Eventos,
        Livros,
        Mentores,
        Testimonials,
        FAQs,
        Pages,
        Media,
      ],
      typescript: {
        outputFile: path.resolve(__dirname, '../payload-types.ts'),
      },
      db: mongooseAdapter({
        url: process.env.MONGODB_URI || '',
      }),
    })

    // Criar app Express mínimo para o Payload
    const app = express()

    // Inicializar Payload - buildConfig retorna uma função que o Payload chama internamente
    await payload.init({
      config: configBuilder,
      secret: process.env.PAYLOAD_SECRET || '',
      express: app, // Passar app Express para evitar erro
    })

    const payloadInstance = payload

    // Criar usuário admin se não existir
    const users = await payloadInstance.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      console.log('👤 Criando usuário admin...')
      await payloadInstance.create({
        collection: 'users',
        data: {
          email: 'admin@robertonavarro.com',
          password: 'admin123',
          name: 'Administrador',
          role: 'admin',
        },
      })
      console.log('✅ Usuário admin criado')
    }

    // Seed Mentores
    console.log('\n📚 Populando Mentores...')
    
    // Verificar se já existe
    const existingMentor = await payloadInstance.find({
      collection: 'mentores',
      where: {
        slug: {
          equals: 'roberto-navarro',
        },
      },
      limit: 1,
    })

    if (existingMentor.docs.length === 0) {
      // Buscar ou criar uma mídia placeholder primeiro para o photo
      let photoId
      try {
        // Tentar encontrar uma mídia existente
        const existingMedia = await payloadInstance.find({
          collection: 'media',
          limit: 1,
        })
        
        if (existingMedia.docs.length > 0) {
          photoId = existingMedia.docs[0].id
          console.log('📷 Usando mídia existente para foto do mentor')
        } else {
          // Criar uma mídia placeholder mínima
          const placeholderMedia = await payloadInstance.create({
            collection: 'media',
            data: {
              alt: 'Roberto Navarro - Placeholder',
              // Se houver outros campos obrigatórios, adicionar aqui
            },
          })
          photoId = placeholderMedia.id
          console.log('📷 Mídia placeholder criada para foto do mentor')
        }
      } catch (e: any) {
        console.error('❌ Erro ao criar/buscar mídia:', e.message)
        console.log('⚠️  Pulando criação do mentor (photo é obrigatório e precisa de arquivo real)')
        console.log('💡 Dica: Crie uma mídia via admin primeiro, depois rode o seed novamente')
        // Pular criação do mentor se não conseguir criar/buscar mídia, mas continuar o seed
        photoId = null
      }

      if (!photoId) {
        console.log('⚠️  Não foi possível obter photoId, pulando criação do mentor')
        console.log('💡 Você pode criar o mentor manualmente via admin depois de fazer upload de uma foto')
      } else {
        const robertoNavarro = await payloadInstance.create({
        collection: 'mentores',
        data: {
          name: 'Roberto Navarro',
          slug: 'roberto-navarro',
          role: 'Fundador e CEO',
          shortBio: 'Especialista em educação financeira com mais de 20 anos de experiência.',
          bio: [
            {
              children: [
                {
                  text: 'Roberto Navarro é um dos maiores especialistas em educação financeira do Brasil.',
                },
              ],
            },
          ],
          achievements: [
            { text: 'Mais de 1.5 milhão de alunos transformados' },
            { text: 'Autor de 4 livros best-sellers' },
            { text: '20+ anos de experiência em educação financeira' },
          ],
          stats: [
            { label: 'Alunos', value: '1.5M+' },
            { label: 'Anos de experiência', value: '20+' },
          ],
          featured: true,
          order: 1,
          photo: photoId,
        },
        })
        console.log('✅ Mentor criado')
      }
    } else {
      console.log('⚠️  Mentor já existe, pulando...')
    }

    // Seed Testimonials
    console.log('\n💬 Populando Depoimentos...')
    const existingTestimonial = await payloadInstance.find({
      collection: 'testimonials',
      where: {
        name: {
          equals: 'Maria Silva',
        },
      },
      limit: 1,
    })
    if (existingTestimonial.docs.length === 0) {
      await payloadInstance.create({
        collection: 'testimonials',
        data: {
          name: 'Maria Silva',
          role: 'Empresária',
          company: 'Silva Consultoria',
          testimonial: 'A formação de Educador Financeiro mudou minha vida completamente.',
          rating: 5,
          featured: true,
          category: 'formacao',
          order: 1,
        },
      })
      console.log('✅ Depoimento criado')
    } else {
      console.log('⚠️  Depoimento já existe, pulando...')
    }

    // Seed FAQs
    console.log('\n❓ Populando FAQs...')
    const existingFAQ1 = await payloadInstance.find({
      collection: 'faqs',
      where: {
        question: {
          equals: 'A certificação é reconhecida pelo MEC?',
        },
      },
      limit: 1,
    })
    if (existingFAQ1.docs.length === 0) {
      await payloadInstance.create({
        collection: 'faqs',
        data: {
          question: 'A certificação é reconhecida pelo MEC?',
          answer: 'Sim! Nossa certificação de Educador Financeiro é reconhecida pelo MEC.',
          category: 'certificacao',
          order: 1,
        },
      })
      console.log('✅ FAQ 1 criado')
    } else {
      console.log('⚠️  FAQ 1 já existe, pulando...')
    }

    const existingFAQ2 = await payloadInstance.find({
      collection: 'faqs',
      where: {
        question: {
          equals: 'Tem garantia?',
        },
      },
      limit: 1,
    })
    if (existingFAQ2.docs.length === 0) {
      await payloadInstance.create({
        collection: 'faqs',
        data: {
          question: 'Tem garantia?',
          answer: 'Sim! Oferecemos garantia incondicional de 7 dias.',
          category: 'geral',
          order: 2,
        },
      })
      console.log('✅ FAQ 2 criado')
    } else {
      console.log('⚠️  FAQ 2 já existe, pulando...')
    }

    // Seed Formação Educador Financeiro
    console.log('\n🎓 Populando Formações...')
    const existingFormacao = await payloadInstance.find({
      collection: 'formacoes',
      where: {
        slug: {
          equals: 'educador-financeiro',
        },
      },
      limit: 1,
    })
    if (existingFormacao.docs.length === 0) {
      await payloadInstance.create({
        collection: 'formacoes',
      data: {
        title: 'Educador Financeiro',
        slug: 'educador-financeiro',
        status: 'published',
        accentColor: '#FFD700',
        hero: {
          badge: 'CERTIFICAÇÃO RECONHECIDA PELO MEC',
          title: 'EDUCADOR FINANCEIRO',
          subtitle: 'Transforme vidas através da educação financeira',
          ctaText: 'Quero me tornar um Educador Financeiro',
          ctaLink: 'https://pay.eduzz.com/educador-financeiro',
        },
        challenges: [
          { text: 'Você quer ajudar pessoas a conquistarem sua independência financeira?' },
          { text: 'Deseja construir uma carreira com propósito e alto potencial de ganhos?' },
        ],
        benefits: [
          {
            title: 'Certificação MEC',
            description: 'Certificado reconhecido pelo Ministério da Educação',
            icon: 'Award',
          },
        ],
        pricing: {
          price: 2997,
          installments: 12,
          installmentValue: 297,
          link: 'https://pay.eduzz.com/educador-financeiro',
        },
        seo: {
          title: 'Educador Financeiro - Certificação Reconhecida pelo MEC | Roberto Navarro',
          description: 'Torne-se um Educador Financeiro certificado.',
          keywords: 'educador financeiro, certificação mec',
        },
      },
      })
      console.log('✅ Formação criada')
    } else {
      console.log('⚠️  Formação já existe, pulando...')
    }

    // Seed Evento
    console.log('\n🎉 Populando Eventos...')
    const existingEvento = await payloadInstance.find({
      collection: 'eventos',
      where: {
        slug: {
          equals: 'crencas-da-riqueza',
        },
      },
      limit: 1,
    })
    if (existingEvento.docs.length === 0) {
      await payloadInstance.create({
        collection: 'eventos',
      data: {
        title: 'Crenças da Riqueza',
        slug: 'crencas-da-riqueza',
        status: 'published',
        accentColor: '#FFD700',
        date: '2025-09-13T10:00:00.000Z',
        duration: '7 horas intensivas',
        location: {
          type: 'presencial',
          venue: 'Hotel Maksoud Plaza',
          city: 'São Paulo',
          state: 'SP',
        },
        hero: {
          badge: 'EVENTO PRESENCIAL',
          title: 'CRENÇAS DA RIQUEZA',
          subtitle: 'Transforme suas crenças sobre dinheiro',
        },
        seo: {
          title: 'Crenças da Riqueza - Evento Presencial | Roberto Navarro',
          description: 'Transforme suas crenças sobre dinheiro.',
        },
      },
      })
      console.log('✅ Evento criado')
    } else {
      console.log('⚠️  Evento já existe, pulando...')
    }

    // Seed Livro
    console.log('\n📖 Populando Livros...')
    
    // Verificar se já existe
    const existingLivro = await payloadInstance.find({
      collection: 'livros',
      where: {
        slug: {
          equals: 'arte-de-enriquecer',
        },
      },
      limit: 1,
    })

    if (existingLivro.docs.length === 0) {
      // Buscar mídia existente para coverImage
      let coverImageId
      try {
        const existingMedia = await payloadInstance.find({
          collection: 'media',
          limit: 1,
        })
        
        if (existingMedia.docs.length > 0) {
          coverImageId = existingMedia.docs[0].id
          console.log('📷 Usando mídia existente para capa do livro')
        } else {
          coverImageId = null
        }
      } catch (e: any) {
        console.error('❌ Erro ao buscar mídia:', e.message)
        coverImageId = null
      }

      if (!coverImageId) {
        console.log('⚠️  Não foi possível obter coverImageId, pulando criação do livro')
        console.log('💡 Você pode criar o livro manualmente via admin depois de fazer upload de uma capa')
      } else {
        await payloadInstance.create({
          collection: 'livros',
          data: {
            title: 'A Arte de Enriquecer',
            slug: 'arte-de-enriquecer',
            author: 'Roberto Navarro',
            subtitle: 'Os princípios atemporais da riqueza',
            description: [
              {
                children: [
                  {
                    text: 'Descubra os segredos milenares que transformam pessoas comuns em milionárias.',
                  },
                ],
              },
            ],
            price: 49.90,
            coverImage: coverImageId,
            seo: {
              title: 'A Arte de Enriquecer - Livro | Roberto Navarro',
              description: 'Descubra os princípios atemporais da riqueza.',
            },
          },
        })
        console.log('✅ Livro criado')
      }
    } else {
      console.log('⚠️  Livro já existe, pulando...')
    }

    // Seed Páginas
    console.log('\n📄 Populando Páginas...')
    const existingPage = await payloadInstance.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'politica-privacidade',
        },
      },
      limit: 1,
    })
    if (existingPage.docs.length === 0) {
      await payloadInstance.create({
        collection: 'pages',
        data: {
          title: 'Política de Privacidade',
          slug: 'politica-privacidade',
          status: 'published',
          layout: 'default',
          hero: {
            title: 'Política de Privacidade',
            subtitle: 'Última atualização: Janeiro de 2025',
          },
          seo: {
            title: 'Política de Privacidade | Roberto Navarro',
            description: 'Conheça nossa política de privacidade.',
          },
        },
      })
      console.log('✅ Página criada')
    } else {
      console.log('⚠️  Página já existe, pulando...')
    }

    console.log('\n✅ Seed completo!')
    console.log('\n🎉 Todos os dados foram importados com sucesso!')
    
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Erro no seed:', error)
    process.exit(1)
  }
}

seed()

