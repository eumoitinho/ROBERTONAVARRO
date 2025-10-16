const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Configuração do cliente Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function populateSegredosDaMenteMilionaria() {
  try {
    console.log('🚀 Iniciando população do evento Segredos da Mente Milionária...')

    const doc = {
      _id: 'event-segredos-da-mente-milionaria-v1',
      _type: 'eventPage',
      title: 'Segredos da Mente Milionária',
      slug: {
        current: 'segredos-da-mente-milionaria',
        _type: 'slug'
      },
      hero: {
        title: 'SEGREDOS DA MENTE MILIONÁRIA',
        subtitle: 'Imersão exclusiva e transformadora',
        secondTitle: 'Em 22 de outubro alcance a liberdade financeira com uma mudança de mentalidade',
        description: 'Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Alameda Araguaia, 751 - Alphaville',
        image: {
          asset: {
            _type: 'reference',
            _ref: 'image-hero-segredos'
          },
          alt: 'Segredos da Mente Milionária - Roberto Navarro'
        },
        ctaText: 'QUERO DESPERTAR MINHA MENTE MILIONÁRIA',
        ctaHref: '#inscricao',
        secondaryCtaText: 'Saiba mais',
        secondaryCtaHref: '#beneficios'
      },
      benefitsSection: {
        badge: 'BENEFÍCIOS DO EVENTO',
        title: 'POR QUE PARTICIPAR DO SEGREDOS DA MENTE MILIONÁRIA',
        description: 'Descubra os benefícios transformadores deste evento exclusivo',
        benefits: [
          {
            title: 'Segurança financeira',
            description: 'Descubra como criar uma base sólida, com reserva de emergência e planejamento para o futuro.',
            icon: 'wallet'
          },
          {
            title: 'Propósito de vida',
            description: 'Tenha clareza sobre seu propósito de vida e carreira e abra portas para novas oportunidades.',
            icon: 'target'
          },
          {
            title: 'Liberdade financeira',
            description: 'Aprenda a diferença entre sobreviver e viver com liberdade — sem depender de salário ou trabalho ativo.',
            icon: 'zap'
          },
          {
            title: 'Mentalidade milionária',
            description: 'Supere crenças limitantes sobre dinheiro e adote os hábitos, atitudes e estratégias dos que alcançaram a verdadeira riqueza.',
            icon: 'brain'
          },
          {
            title: 'Educação financeira',
            description: 'Por que aprender com quem já chegou lá pode acelerar (e muito!) sua jornada.',
            icon: 'graduation'
          },
          {
            title: 'Networking e inspiração',
            description: 'Conecte-se com pessoas que já transformaram suas vidas e inspire-se com histórias reais.',
            icon: 'users'
          }
        ]
      },
      learningSection: {
        badge: 'O QUE VOCÊ VAI DESCOBRIR',
        title: 'O PASSO A PASSO PARA DESPERTAR SUA MENTE MILIONÁRIA',
        description: 'Aprenda as estratégias essenciais para transformar sua mentalidade',
        items: [
          {
            title: 'Múltiplas fontes de renda',
            description: 'Entenda como combinar renda principal, extra e passiva para construir sua riqueza de forma estratégica.',
            icon: 'wallet'
          },
          {
            title: 'Ação e prosperidade',
            description: 'Como agir com intenção, propósito claro e prosperidade abundante.',
            icon: 'zap'
          },
          {
            title: 'Transformação mental',
            description: 'Supere crenças limitantes e construa uma mentalidade de riqueza.',
            icon: 'brain'
          }
        ]
      },
      newsletterSection: {
        source: 'Segredos da Mente Milionária',
        title: 'GARANTA SUA VAGA NO SEGREDOS DA MENTE MILIONÁRIA',
        description: 'Participe do evento transformador Segredos da Mente Milionária e comece a mudar sua relação com o dinheiro. Vagas limitadas!',
        ctaText: 'GARANTIR MINHA VAGA AGORA!',
        eventDate: '22 de outubro de 2025',
        eventTime: '13h às 20h',
        eventLocation: 'R. Alameda Araguaia, 751 - Alphaville, Campinas - SP'
      },
      seo: {
        title: 'Segredos da Mente Milionária - Roberto Navarro | Evento Presencial',
        description: 'Imersão exclusiva para despertar seu potencial milionário. Aprenda com Roberto Navarro como transformar sua mentalidade e alcançar a liberdade financeira.',
        keywords: ['segredos mente milionária', 'roberto navarro', 'evento presencial', 'liberdade financeira', 'mentalidade milionária', 'educação financeira']
      }
    }

    // Criar ou atualizar o documento
    const result = await client.createOrReplace(doc)
    console.log('✅ Evento Segredos da Mente Milionária criado/atualizado com sucesso!')
    console.log('📄 ID:', result._id)

  } catch (error) {
    console.error('❌ Erro ao popular evento Segredos da Mente Milionária:', error)
    throw error
  }
}

// Executar o script
populateSegredosDaMenteMilionaria()
  .then(() => {
    console.log('🎉 População concluída com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Falha na população:', error)
    process.exit(1)
  })
