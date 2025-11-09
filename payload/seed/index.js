const { getPayloadClient } = require('../lib/payload/client')
const { seedFormacoes } = require('./formacoes')
const { seedEventos } = require('./eventos')
const { seedLivros } = require('./livros')
const { seedPages } = require('./pages')
const { seedMentores } = require('./mentores')
const { seedTestimonials } = require('./testimonials')
const { seedFAQs } = require('./faqs')

async function seedAll() {
  console.log('🌱 Iniciando seed do Payload CMS...')

  try {
    const payload = await getPayloadClient()

    // Criar usuário admin se não existir
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      console.log('👤 Criando usuário admin...')
      await payload.create({
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

    // Seed de cada collection
    console.log('\n📚 Populando Mentores...')
    await seedMentores(payload)

    console.log('\n💬 Populando Depoimentos...')
    await seedTestimonials(payload)

    console.log('\n❓ Populando FAQs...')
    await seedFAQs(payload)

    console.log('\n🎓 Populando Formações...')
    await seedFormacoes(payload)

    console.log('\n🎉 Populando Eventos...')
    await seedEventos(payload)

    console.log('\n📖 Populando Livros...')
    await seedLivros(payload)

    console.log('\n📄 Populando Páginas...')
    await seedPages(payload)

    console.log('\n✅ Seed completo!')
    console.log('\n🎉 Todos os dados foram importados com sucesso!')

  } catch (error) {
    console.error('❌ Erro no seed:', error)
    throw error
  }
}

// Executar
seedAll()
  .then(() => {
    console.log('Seed concluído!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Erro:', error)
    process.exit(1)
  })

module.exports = { seedAll }
