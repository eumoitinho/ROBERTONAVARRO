import { normalizeNestedRelationships } from './helpers/normalize-relationships'
import { ensureMedia } from './helpers/ensure-media'

export async function seedLivros(payload: any) {
  console.log('📖 Populando Livros...')

  const createOrUpdateLivro = async (slug: string, data: any) => {
    const existing = await payload.find({
      collection: 'livros',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    let normalizedData = normalizeNestedRelationships(data)

    Object.keys(normalizedData).forEach(key => {
      if (normalizedData[key] === undefined) {
        delete normalizedData[key]
      }
    })

    if (existing.docs.length > 0) {
      console.log(`⚠️  Livro "${data.title}" já existe, atualizando...`)
      try {
        return await payload.update({
          collection: 'livros',
          id: existing.docs[0].id,
          data: normalizedData,
        })
      } catch (error: any) {
        console.error(`❌ Erro ao atualizar livro "${data.title}":`, error.message)
        throw error
      }
    } else {
      console.log(`✅ Criando livro "${data.title}"...`)
      return await payload.create({
        collection: 'livros',
        data: normalizedData,
      })
    }
  }

  const sabedoriaImageId = await ensureMedia(payload, 'public/images/SABEDORIA.png', 'A Sabedoria do Dinheiro')
  const mitosImageId = await ensureMedia(payload, 'public/images/MITOS.png', 'Quebrando Mitos com o Dinheiro')
  const arteImageId = await ensureMedia(payload, 'public/images/ARTE.png', 'A Arte de Enriquecer')
  const coachingImageId = await ensureMedia(payload, 'public/images/COACHING.png', 'Coaching Financeiro')
  const authorImageId = await ensureMedia(payload, 'public/images/ROBERTO_17.jpg', 'Roberto Navarro')

  // 1. COACHING FINANCEIRO
  await createOrUpdateLivro('coaching-financeiro', {
    title: 'Coaching Financeiro',
    slug: 'coaching-financeiro',
    status: 'published',
    bookTag: 'LIVRO EQUILIBRADOR',
    accentColor: 'blue',
    author: 'Roberto Navarro',
    ...(authorImageId ? { authorImage: authorImageId } : {}),
    authorBio: [
      {
        type: 'p',
        children: [
          {
            text: 'Pioneiro e criador do conceito de Coaching Financeiro no Brasil, Roberto Navarro revolucionou a forma como milhares de pessoas lidam com suas finanças.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Sua abordagem única integra técnicas avançadas de coaching com educação financeira prática, criando resultados extraordinários na vida de seus alunos.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Este livro é a síntese de anos de experiência transformando vidas através do equilíbrio entre mente, emoções e finanças.',
          },
        ],
      },
    ],
    subtitle: 'Estratégias e soluções para o seu sucesso financeiro',
    ...(coachingImageId ? { coverImage: coachingImageId } : {}),
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Você busca mais do que apenas técnicas financeiras? Em "Coaching Financeiro", Roberto Navarro vai além dos números, mergulhando na tríade essencial para o sucesso: controle emocional, clareza financeira e ação.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Este livro é um convite para transformar sua relação com o dinheiro de forma profunda e duradoura.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Se você quer tomar decisões conscientes e viver com mais equilíbrio, clareza e prosperidade, este é o seu guia.',
          },
        ],
      },
    ],
    price: 50.00,
    ctaText: 'TRANSFORME SUAS FINANÇAS',
    purchaseLink: 'https://sun.eduzz.com/956345',
    technicalSpecs: {
      publisher: 'Momentum',
      year: 2014,
      dimensions: '16x23 cm',
      language: 'Português',
    },
    pages: 126,
    rating: {
      score: 4.9,
      count: 356,
    },
    whatYouWillLearn: [
      {
        title: 'Controle emocional e financeiro',
        description: 'Descubra como suas emoções impactam suas decisões financeiras e aprenda a dominá-las para alcançar seus objetivos.',
        icon: 'brain',
      },
      {
        title: 'Clareza financeira',
        description: 'Obtenha uma visão clara de suas finanças, identificando onde você está e para onde quer ir, com estratégias práticas para chegar lá.',
        icon: 'target',
      },
      {
        title: 'Ação e progresso',
        description: 'Aprenda a usar o "giro financeiro" para impulsionar seu autocontrole e progresso, com exercícios práticos e histórias reais de sucesso e fracasso que inspiram e ensinam.',
        icon: 'rocket',
      },
    ],
    whyEssential: [
      {
        title: 'Autoconhecimento',
        description: 'Descubra seus padrões financeiros e como transformá-los',
        icon: 'user',
      },
      {
        title: 'Equilíbrio Emocional',
        description: 'Neutralize gatilhos emocionais que sabotam suas finanças',
        icon: 'scale',
      },
      {
        title: 'Foco em Resultados',
        description: 'Desenvolva disciplina para alcançar suas metas financeiras',
        icon: 'target',
      },
      {
        title: 'Relacionamentos',
        description: 'Melhore sua relação com dinheiro, família e sociedade',
        icon: 'users',
      },
    ],
    transformationSection: {
      enabled: true,
      title: 'Mais que um livro, uma ferramenta de transformação',
      benefits: [
        { text: 'Exercícios práticos de coaching' },
        { text: 'Casos reais de transformação' },
        { text: 'Ferramentas de autoavaliação' },
        { text: 'Plano de ação personalizado' },
      ],
    },
    seo: {
      title: 'Coaching Financeiro - Livro | Roberto Navarro',
      description: 'Estratégias e soluções para o seu sucesso financeiro. Descubra a tríade essencial: controle emocional, clareza financeira e ação.',
      keywords: 'coaching financeiro, livro, roberto navarro, educação financeira, controle emocional',
    },
  })

  // 2. A ARTE DE ENRIQUECER
  await createOrUpdateLivro('arte-de-enriquecer', {
    title: 'A Arte de Enriquecer',
    slug: 'arte-de-enriquecer',
    status: 'published',
    bookTag: 'LIVRO PRÁTICO',
    accentColor: 'green',
    author: 'Roberto Navarro',
    ...(authorImageId ? { authorImage: authorImageId } : {}),
    authorBio: [
      {
        type: 'p',
        children: [
          {
            text: 'De lavador de carros a multimilionário em menos de 7 anos, Roberto Navarro é a prova viva de que a arte de enriquecer pode ser aprendida.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Sua experiência prática e metodologia comprovada já transformaram a vida financeira de centenas de milhares de pessoas em todo o Brasil.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Neste livro, ele compartilha os segredos que aprendeu em sua jornada e nas vidas dos grandes milionários que estudou.',
          },
        ],
      },
    ],
    subtitle: 'Riqueza é um caminho, não um privilégio',
    ...(arteImageId ? { coverImage: arteImageId } : {}),
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Você acredita que enriquecer é um privilégio para poucos? Roberto Navarro, em "A Arte de Enriquecer", desmistifica essa ideia e revela a metodologia prática que pode transformar sua vida financeira.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Com uma linguagem acessível e conteúdo direto, o autor mostra que a riqueza é um caminho que qualquer pessoa pode trilhar com disciplina e visão.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Se você busca um guia direto, prático e inspirador sobre como construir riqueza de verdade, "A Arte de Enriquecer" é o livro certo.',
          },
        ],
      },
    ],
    price: 50.00,
    ctaText: 'DOMINAR A ARTE AGORA',
    purchaseLink: 'https://sun.eduzz.com/956345',
    technicalSpecs: {
      publisher: 'Semente Livros',
      year: 2018,
      dimensions: '16x23 cm',
      language: 'Português',
    },
    pages: 90,
    rating: {
      score: 5.0,
      count: 412,
    },
    whatYouWillLearn: [
      {
        title: 'Os degraus da liberdade financeira',
        description: 'Descubra o passo a passo para dobrar sua renda, administrar seus ganhos de forma eficiente e aproveitar a vida como os verdadeiros ricos fazem.',
        icon: 'stairs',
      },
      {
        title: 'Enriquecer é uma ciência',
        description: 'Entenda que a prosperidade não é obra do acaso, mas sim o resultado da aplicação de princípios e estratégias comprovadas.',
        icon: 'atom',
      },
      {
        title: 'Aplicação prática do conhecimento',
        description: 'Navarro oferece um guia claro e objetivo para que você possa aplicar imediatamente o que aprender e ver resultados reais em suas finanças.',
        icon: 'gear',
      },
    ],
    whyEssential: [
      {
        title: 'Aumento de Renda',
        description: 'Metodologia para multiplicar seus ganhos de forma consistente',
        icon: 'dollar',
      },
      {
        title: 'Gestão Eficiente',
        description: 'Domine a arte de administrar e fazer crescer seu patrimônio',
        icon: 'chart',
      },
      {
        title: 'Vida Abundante',
        description: 'Aprenda a desfrutar da vida enquanto enriquece',
        icon: 'heart',
      },
      {
        title: 'Crescimento Contínuo',
        description: 'Estratégias para manter o crescimento financeiro constante',
        icon: 'trending',
      },
    ],
    transformationSection: {
      enabled: false,
    },
    seo: {
      title: 'A Arte de Enriquecer - Livro | Roberto Navarro',
      description: 'Riqueza é um caminho, não um privilégio. Descubra a metodologia prática para dobrar sua renda e construir riqueza de verdade.',
      keywords: 'arte de enriquecer, livro, roberto navarro, riqueza, metodologia financeira',
    },
  })

  // 3. QUEBRANDO MITOS COM O DINHEIRO
  await createOrUpdateLivro('quebrando-mitos-com-o-dinheiro', {
    title: 'Quebrando Mitos com o Dinheiro',
    slug: 'quebrando-mitos-com-o-dinheiro',
    status: 'published',
    bookTag: 'LIVRO TRANSFORMADOR',
    accentColor: 'orange',
    author: 'Roberto Navarro',
    ...(authorImageId ? { authorImage: authorImageId } : {}),
    authorBio: [
      {
        type: 'p',
        children: [
          {
            text: 'Especialista em quebrar paradigmas financeiros, Roberto Navarro já ajudou milhares de pessoas a identificar e superar suas crenças limitantes sobre dinheiro.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Sua abordagem direta e prática tem o poder de transformar completamente a forma como você pensa e age em relação às finanças.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Com mais de 20 anos de experiência, ele desenvolveu técnicas exclusivas para reprogramar a mente para a prosperidade.',
          },
        ],
      },
    ],
    subtitle: 'Liberte-se das crenças que limitam sua prosperidade',
    ...(mitosImageId ? { coverImage: mitosImageId } : {}),
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Você se sente preso a padrões financeiros que parecem impossíveis de quebrar? Em "Quebrando Mitos com o Dinheiro", Roberto Navarro apresenta um manual direto e transformador para desmistificar tudo aquilo que aprendemos errado sobre o dinheiro.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Prepare-se para identificar as crenças limitantes que sabotam sua vida financeira e substituí-las por atitudes conscientes e focadas em resultados.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Este livro é perfeito para quem quer dar o primeiro passo rumo à autonomia financeira, quebrando padrões que aprisionam.',
          },
        ],
      },
    ],
    price: 50.00,
    ctaText: 'QUEBRE SEUS MITOS AGORA',
    purchaseLink: 'https://sun.eduzz.com/956345',
    technicalSpecs: {
      publisher: 'Momentum',
      year: 2014,
      dimensions: '16x23 cm',
      language: 'Português',
    },
    pages: 152,
    rating: {
      score: 4.8,
      count: 289,
    },
    whatYouWillLearn: [
      {
        title: 'Identificar mitos financeiros',
        description: 'Descubra as verdades por trás das falsas crenças que impedem seu crescimento financeiro.',
        icon: 'target',
      },
      {
        title: 'Substituir padrões negativos',
        description: 'Aprenda a reprogramar sua mente para adotar hábitos e pensamentos que impulsionam a prosperidade.',
        icon: 'brain',
      },
      {
        title: 'Educação financeira como ferramenta',
        description: 'Entenda que a educação financeira não é um luxo, mas uma necessidade para transformar realidades pessoais, familiares e até comunitárias.',
        icon: 'book',
      },
    ],
    whyEssential: [
      {
        title: 'Identificação de Crenças',
        description: 'Reconheça os mitos que sabotam sua prosperidade',
        icon: 'search',
      },
      {
        title: 'Nova Mentalidade',
        description: 'Substitua crenças limitantes por pensamentos prósperos',
        icon: 'brain',
      },
      {
        title: 'Ações Práticas',
        description: 'Implemente estratégias concretas para crescer financeiramente',
        icon: 'check',
      },
      {
        title: 'Proteção Mental',
        description: 'Blinde-se contra influências negativas sobre dinheiro',
        icon: 'shield',
      },
    ],
    transformationSection: {
      enabled: false,
    },
    seo: {
      title: 'Quebrando Mitos com o Dinheiro - Livro | Roberto Navarro',
      description: 'Liberte-se das crenças que limitam sua prosperidade. Identifique os mitos que sabotam sua vida financeira.',
      keywords: 'quebrando mitos, livro, crenças limitantes, prosperidade, roberto navarro',
    },
  })

  // 4. A SABEDORIA DO DINHEIRO
  await createOrUpdateLivro('sabedoria-do-dinheiro', {
    title: 'A Sabedoria do Dinheiro',
    slug: 'sabedoria-do-dinheiro',
    status: 'published',
    bookTag: 'LIVRO ESSENCIAL',
    accentColor: 'gold',
    author: 'Roberto Navarro',
    ...(authorImageId ? { authorImage: authorImageId } : {}),
    authorBio: [
      {
        type: 'p',
        children: [
          {
            text: 'Maior educador financeiro do Brasil, com mais de 1,5 milhão de alunos impactados em todo o mundo.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Criador do conceito de Coaching Financeiro no país, Roberto Navarro desenvolveu uma metodologia única que une finanças, inteligência emocional e espiritualidade.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Com 5 livros publicados e centenas de vídeos educativos, sua missão é democratizar o acesso à educação financeira de qualidade.',
          },
        ],
      },
    ],
    subtitle: 'Transforme sua mentalidade e atraia a prosperidade para sua vida',
    ...(sabedoriaImageId ? { coverImage: sabedoriaImageId } : {}),
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Você está pronto para desvendar os segredos da riqueza e atrair a prosperidade que sempre desejou? Em "A Sabedoria do Dinheiro", Roberto Navarro revela os 5 passos essenciais para usar a ciência da riqueza a seu favor.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Este não é apenas um livro sobre finanças; é um guia para alinhar sua visão financeira com o seu propósito de vida, mantendo a espiritualidade e a abundância no centro de sua jornada.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Se você deseja sair das dívidas, criar uma vida com mais controle, propósito e abundância, este livro é o seu ponto de partida.',
          },
        ],
      },
    ],
    price: 50.00,
    ctaText: 'ADQUIRA SEU EXEMPLAR',
    purchaseLink: 'https://sun.eduzz.com/956345',
    technicalSpecs: {
      publisher: 'Gente Editora',
      year: 2020,
      dimensions: '16x23 cm',
      language: 'Português',
    },
    pages: 224,
    rating: {
      score: 4.9,
      count: 327,
    },
    whatYouWillLearn: [
      {
        title: 'Gastar com propósito',
        description: 'Descubra como suas despesas podem se tornar ferramentas para construir a vida que você sonha, em vez de um fardo.',
        icon: 'target',
      },
      {
        title: 'Gerar renda passiva',
        description: 'Aprenda estratégias comprovadas para fazer seu dinheiro trabalhar para você, criando múltiplas fontes de renda que garantem sua tranquilidade.',
        icon: 'rocket',
      },
      {
        title: 'Proteger seu capital',
        description: 'Conheça os métodos para salvaguardar seu patrimônio e garantir a segurança financeira da sua família.',
        icon: 'shield',
      },
      {
        title: 'Ampliar suas oportunidades',
        description: 'Abra-se para um mundo de possibilidades financeiras que você nunca imaginou, transformando desafios em degraus para o sucesso.',
        icon: 'stairs',
      },
    ],
    whyEssential: [
      {
        title: 'Transformação Mental',
        description: 'Reprograme sua mente para atrair e manter a prosperidade',
        icon: 'brain',
      },
      {
        title: 'Clareza de Propósito',
        description: 'Alinhe suas finanças com seu propósito de vida',
        icon: 'target',
      },
      {
        title: 'Equilíbrio Espiritual',
        description: 'Mantenha a espiritualidade no centro de sua jornada financeira',
        icon: 'scale',
      },
      {
        title: 'Abundância Real',
        description: 'Aprenda a viver em abundância em todas as áreas da vida',
        icon: 'heart',
      },
    ],
    transformationSection: {
      enabled: false,
    },
    seo: {
      title: 'A Sabedoria do Dinheiro - Livro | Roberto Navarro',
      description: 'Transforme sua mentalidade e atraia a prosperidade. Descubra os 5 passos essenciais para usar a ciência da riqueza a seu favor.',
      keywords: 'sabedoria do dinheiro, livro, prosperidade, espiritualidade, roberto navarro',
    },
  })

  console.log('✅ Todos os livros foram populados com sucesso!')

  return {
    coachingFinanceiro: true,
    arteDeEnriquecer: true,
    quebrandoMitos: true,
    sabedoriaDoDinheiro: true,
  }
}
