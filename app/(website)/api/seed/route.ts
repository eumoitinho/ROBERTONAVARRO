import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: await configPromise })

    console.log('🌱 Iniciando seed do Payload CMS...')

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

    // Seed Mentores
    console.log('\n📚 Populando Mentores...')
    const robertoNavarro = await payload.create({
      collection: 'mentores',
      data: {
        name: 'Roberto Navarro',
        slug: 'roberto-navarro',
        role: 'Fundador e CEO',
        shortBio: 'Especialista em educação financeira com mais de 20 anos de experiência.',
        bio: [
          {
            type: 'p',
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
      },
    })

    // Seed Testimonials
    console.log('\n💬 Populando Depoimentos...')
    await payload.create({
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

    // Seed FAQs
    console.log('\n❓ Populando FAQs...')
    await payload.create({
      collection: 'faqs',
      data: {
        question: 'A certificação é reconhecida pelo MEC?',
        answer: [
          {
            type: 'p',
            children: [
              {
                text: 'Sim! Nossa certificação de Educador Financeiro é reconhecida pelo MEC.',
              },
            ],
          },
        ],
        category: 'certificacao',
        order: 1,
      },
    })

    await payload.create({
      collection: 'faqs',
      data: {
        question: 'Tem garantia?',
        answer: [
          {
            type: 'p',
            children: [
              {
                text: 'Sim! Oferecemos garantia incondicional de 7 dias.',
              },
            ],
          },
        ],
        category: 'geral',
        order: 2,
      },
    })

    // Seed Formação Educador Financeiro
    console.log('\n🎓 Populando Formações...')
    await payload.create({
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

    // Seed Evento
    console.log('\n🎉 Populando Eventos...')
    await payload.create({
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

    // Seed Livro
    console.log('\n📖 Populando Livros...')
    await payload.create({
      collection: 'livros',
      data: {
        title: 'A Arte de Enriquecer',
        slug: 'arte-de-enriquecer',
        author: 'Roberto Navarro',
        subtitle: 'Os princípios atemporais da riqueza',
        description: [
          {
            type: 'p',
            children: [
              {
                text: 'Descubra os segredos milenares que transformam pessoas comuns em milionárias.',
              },
            ],
          },
        ],
        price: 49.90,
        seo: {
          title: 'A Arte de Enriquecer - Livro | Roberto Navarro',
          description: 'Descubra os princípios atemporais da riqueza.',
        },
      },
    })

    // Seed Páginas
    console.log('\n📄 Populando Páginas...')
    await payload.create({
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

    console.log('\n✅ Seed completo!')
    console.log('\n🎉 Todos os dados foram importados com sucesso!')

    return NextResponse.json({
      success: true,
      message: 'Seed executado com sucesso!',
    })
  } catch (error: any) {
    console.error('❌ Erro no seed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    )
  }
}
