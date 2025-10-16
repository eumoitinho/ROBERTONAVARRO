const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Configuração do cliente Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Função para popular um evento específico
async function populateEvent(eventData) {
  try {
    console.log(`📝 Populando: ${eventData.title}`)
    
    // Tentar criar primeiro
    const result = await client.create(eventData)
    console.log(`✅ ${eventData.title} criado com sucesso! ID: ${result._id}`)
    return result
  } catch (error) {
    if (error.message.includes('already exists')) {
      try {
        // Se já existe, tentar atualizar
        const result = await client.createOrReplace(eventData)
        console.log(`🔄 ${eventData.title} atualizado com sucesso! ID: ${result._id}`)
        return result
      } catch (updateError) {
        console.log(`⚠️ Erro ao atualizar ${eventData.title}:`, updateError.message)
        throw updateError
      }
    } else {
      console.log(`❌ Erro ao criar ${eventData.title}:`, error.message)
      throw error
    }
  }
}

async function populateAllEvents() {
  try {
    console.log('🚀 Iniciando população DIRETA de TODOS os eventos...')

    // SEGREDOS DA MENTE MILIONÁRIA - CONTEÚDO ORIGINAL COMPLETO
    await populateEvent({
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
        ctaText: 'QUERO DESPERTAR MINHA MENTE MILIONÁRIA',
        ctaHref: '#inscricao',
        secondaryCtaText: 'Saiba mais',
        secondaryCtaHref: '#beneficios'
      },
      benefitsSection: {
        badge: 'BENEFÍCIOS DO EVENTO',
        title: 'POR QUE PARTICIPAR DO SEGREDOS DA MENTE MILIONÁRIA',
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
    })

    // ENERGIA DO DINHEIRO - CONTEÚDO ORIGINAL COMPLETO
    await populateEvent({
      _id: 'event-energia-do-dinheiro-v1',
      _type: 'eventPage',
      title: 'Energia do Dinheiro',
      slug: {
        current: 'energia-do-dinheiro',
        _type: 'slug'
      },
      hero: {
        title: 'ENERGIA DO DINHEIRO',
        subtitle: 'Desbloqueie a energia do dinheiro e transforme sua realidade',
        secondTitle: '07 de Outubro - Das 13h às 20h',
        description: 'Alinhe sua energia com a prosperidade e conquiste abundância real na vida e nos negócios. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade.',
        ctaText: 'GARANTA SUA VAGA!',
        ctaHref: '#inscricao',
        secondaryCtaText: 'Saiba mais',
        secondaryCtaHref: '#beneficios'
      },
      benefitsSection: {
        badge: 'QUAIS BLOQUEIOS TE AFASTAM DA RIQUEZA',
        title: 'Descubra os sabotadores invisíveis que drenam sua energia financeira',
        benefits: [
          {
            title: 'Você trabalha muito, mas nunca sobra dinheiro?',
            description: 'Aprenda como sair do ciclo de escassez ativando a verdadeira energia da abundância.',
            icon: 'wallet'
          },
          {
            title: 'Você sente que nasceu para prosperar, mas algo te trava?',
            description: 'Descubra os sabotadores invisíveis que drenam sua energia financeira e como se libertar deles.',
            icon: 'target'
          },
          {
            title: 'Você sente culpa ou medo ao falar de dinheiro?',
            description: 'Reprograme sua relação emocional com o dinheiro e viva a leveza da prosperidade.',
            icon: 'brain'
          },
          {
            title: 'Você acredita que ganhar dinheiro exige sacrifício?',
            description: 'Entenda como alinhar prazer e propósito para que o dinheiro flua com naturalidade.',
            icon: 'zap'
          }
        ]
      },
      learningSection: {
        badge: 'DESPERTAR DE CONSCIÊNCIA',
        title: 'Mais do que uma mentoria, um despertar de consciência',
        description: 'No dia 07 de outubro, das 13h às 20h, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia.',
        items: [
          {
            title: 'Qual o efeito do dinheiro em sua vida',
            description: 'Entenda como o dinheiro impacta suas emoções e decisões.',
            icon: 'wallet'
          },
          {
            title: 'Como o seu estado emocional impacta diretamente sua conta bancária',
            description: 'Descubra a conexão entre emoções e prosperidade.',
            icon: 'brain'
          },
          {
            title: 'Quem está influenciando sua visão sobre dinheiro — e como retomar o controle',
            description: 'Identifique e elimine influências negativas sobre dinheiro.',
            icon: 'target'
          },
          {
            title: 'O papel da ambiência e da atmosfera na construção da riqueza',
            description: 'Como criar um ambiente propício à prosperidade.',
            icon: 'zap'
          },
          {
            title: 'Como identificar e eliminar sabotadores financeiros',
            description: 'Técnicas para reconhecer e superar bloqueios internos.',
            icon: 'brain'
          },
          {
            title: 'A conexão poderosa (e oculta) entre energia sexual e prosperidade',
            description: 'Entenda como alinhar energia criativa com abundância.',
            icon: 'zap'
          },
          {
            title: 'O protocolo da riqueza nos negócios e na vida pessoal',
            description: 'Sistema prático para implementar a prosperidade.',
            icon: 'wallet'
          },
          {
            title: 'A verdade sobre o "dinheirinho" e por que ele pode te manter preso na escassez',
            description: 'Por que pequenos valores podem limitar sua mentalidade.',
            icon: 'target'
          },
          {
            title: 'Como criar a motivação certa para que o dinheiro venha até você',
            description: 'Estratégias para desenvolver atração natural pela prosperidade.',
            icon: 'zap'
          }
        ]
      },
      newsletterSection: {
        source: 'Energia do Dinheiro',
        title: 'GARANTA SUA VAGA NO ENERGIA DO DINHEIRO',
        description: 'Preencha o formulário abaixo e fique atento ao próximo evento',
        ctaText: 'GARANTIR MINHA VAGA AGORA!',
        eventDate: '07 de outubro de 2025',
        eventTime: '13h às 20h',
        eventLocation: 'Alameda Araguaia, 751 - Alphaville, Campinas - SP'
      },
      seo: {
        title: 'Energia do Dinheiro - Roberto Navarro | Evento Presencial',
        description: 'Desbloqueie a energia do dinheiro e transforme sua realidade. Alinhe sua energia com a prosperidade e conquiste abundância real.',
        keywords: ['energia do dinheiro', 'roberto navarro', 'prosperidade', 'abundância', 'mentalidade financeira', 'evento presencial']
      }
    })

    console.log('🎉 TODOS os eventos foram populados com sucesso!')

  } catch (error) {
    console.error('❌ Erro ao popular eventos:', error)
    throw error
  }
}

// Executar o script
populateAllEvents()
  .then(() => {
    console.log('🏁 População concluída com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Falha na população:', error)
    process.exit(1)
  })
