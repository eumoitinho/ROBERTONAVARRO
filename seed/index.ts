import { getPayloadClient } from '@/lib/payload/client'
import { seedFormacoes } from './formacoes'
import { seedEventos } from './eventos'
import { seedLivros } from './livros'
import { seedBlog } from './blog'
import { seedPages } from './pages'
import { seedMentores } from './mentores'
import { seedTestimonials } from './testimonials'
import { seedFAQs } from './faqs'

export async function seedAll() {
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
    const { robertoNavarro, raissaNavarro } = await seedMentores(payload)

    console.log('\n💬 Populando Depoimentos...')
    await seedTestimonials(payload)

    console.log('\n❓ Populando FAQs...')
    const { educadorFAQs, eventoFAQs } = await seedFAQs(payload)

    console.log('\n🎓 Populando Formações...')
    await seedFormacoes(payload, educadorFAQs)

    console.log('\n🎉 Populando Eventos...')
    await seedEventos(payload, eventoFAQs, { robertoNavarro, raissaNavarro })

    console.log('\n📖 Populando Livros...')
    await seedLivros(payload)

    console.log('\n📝 Populando Blog...')
    await seedBlog(payload)

    console.log('\n📄 Populando Páginas...')
    await seedPages(payload)

    console.log('\n✅ Seed completo!')
    console.log('\n🎉 Todos os dados foram importados com sucesso!')

  } catch (error) {
    console.error('❌ Erro no seed:', error)
    throw error
  }
}

// Exportado para uso em scripts
