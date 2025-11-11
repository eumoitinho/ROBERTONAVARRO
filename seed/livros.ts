import { normalizeNestedRelationships } from './helpers/normalize-relationships'

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

  // 1. A SABEDORIA DO DINHEIRO
  await createOrUpdateLivro('sabedoria-do-dinheiro', {
    title: 'A Sabedoria do Dinheiro',
    slug: 'sabedoria-do-dinheiro',
    author: 'Roberto Navarro',
    subtitle: 'Transforme sua mentalidade e atraia a prosperidade',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Transforme sua mentalidade e atraia a prosperidade. Descubra os 5 passos essenciais para alinhar sua visão financeira ao seu propósito, mantendo a espiritualidade e a abundância no centro de sua jornada.',
          },
        ],
      },
    ],
    price: 49.90,
    purchaseLink: 'https://sun.eduzz.com/956345',
    pages: 280,
    highlights: [
      { text: 'Os 5 passos essenciais para alinhar sua visão financeira ao seu propósito' },
      { text: 'Como manter a espiritualidade e a abundância no centro de sua jornada' },
      { text: 'Transformação de mentalidade para atrair prosperidade' },
      { text: 'Princípios milenares de prosperidade aplicados ao mundo moderno' },
    ],
    whatYouWillLearn: [
      { text: 'A origem da riqueza na mente' },
      { text: 'Princípios universais da prosperidade' },
      { text: 'O poder da gratidão financeira' },
      { text: 'Investindo com sabedoria ancestral' },
    ],
    seo: {
      title: 'A Sabedoria do Dinheiro - Livro | Roberto Navarro',
      description: 'Transforme sua mentalidade e atraia a prosperidade com os ensinamentos de Roberto Navarro. Descubra os 5 passos essenciais para alinhar sua visão financeira ao seu propósito.',
      keywords: 'sabedoria do dinheiro, livro, prosperidade, espiritualidade, roberto navarro',
    },
  })

  // 2. QUEBRANDO MITOS COM O DINHEIRO
  await createOrUpdateLivro('quebrando-mitos-com-o-dinheiro', {
    title: 'Quebrando Mitos com o Dinheiro',
    slug: 'quebrando-mitos-com-o-dinheiro',
    author: 'Roberto Navarro',
    subtitle: 'Liberte-se das crenças que limitam sua prosperidade',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Liberte-se das crenças que limitam sua prosperidade. Identifique os mitos que sabotam sua vida financeira e substitua-os por atitudes conscientes e focadas em resultados.',
          },
        ],
      },
    ],
    price: 49.90,
    purchaseLink: 'https://sun.eduzz.com/956345',
    pages: 268,
    highlights: [
      { text: 'Identifique os mitos que sabotam sua vida financeira' },
      { text: 'Substitua crenças limitantes por atitudes conscientes' },
      { text: 'Foco em resultados práticos e transformadores' },
      { text: 'Os 10 maiores mitos sobre dinheiro desmistificados' },
    ],
    whatYouWillLearn: [
      { text: 'Os 10 maiores mitos sobre dinheiro' },
      { text: 'Por que dinheiro não é a raiz de todos os males' },
      { text: 'A verdade sobre investimentos' },
      { text: 'Como reprogramar suas crenças financeiras' },
    ],
    seo: {
      title: 'Quebrando Mitos com o Dinheiro - Livro | Roberto Navarro',
      description: 'Liberte-se das crenças que limitam sua prosperidade. Identifique os mitos que sabotam sua vida financeira.',
      keywords: 'quebrando mitos, livro, crenças limitantes, prosperidade, roberto navarro',
    },
  })

  // 3. A ARTE DE ENRIQUECER
  await createOrUpdateLivro('arte-de-enriquecer', {
    title: 'A Arte de Enriquecer',
    slug: 'arte-de-enriquecer',
    author: 'Roberto Navarro',
    subtitle: 'Os princípios atemporais da riqueza',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Riqueza é um caminho, não um privilégio. Descubra a metodologia prática para dobrar sua renda, administrar seus ganhos e aproveitar a vida como os verdadeiros ricos fazem.',
          },
        ],
      },
    ],
    price: 49.90,
    purchaseLink: 'https://sun.eduzz.com/956345',
    amazonLink: 'https://amazon.com.br/arte-enriquecer',
    pages: 256,
    highlights: [
      { text: 'Os 12 princípios fundamentais da riqueza' },
      { text: 'Como desenvolver o mindset de abundância' },
      { text: 'Estratégias práticas para multiplicar seu patrimônio' },
      { text: 'Cases reais de transformação financeira' },
    ],
    whatYouWillLearn: [
      { text: 'As leis universais da prosperidade' },
      { text: 'Como criar múltiplas fontes de renda' },
      { text: 'A psicologia dos milionários' },
      { text: 'Planejamento financeiro de longo prazo' },
    ],
    seo: {
      title: 'A Arte de Enriquecer - Livro | Roberto Navarro',
      description: 'Descubra os princípios atemporais da riqueza no novo livro de Roberto Navarro. Metodologia prática para dobrar sua renda e multiplicar seu patrimônio.',
      keywords: 'arte de enriquecer, livro riqueza, roberto navarro livro, prosperidade financeira',
    },
  })

  // 4. COACHING FINANCEIRO
  await createOrUpdateLivro('coaching-financeiro', {
    title: 'Coaching Financeiro',
    slug: 'coaching-financeiro',
    author: 'Roberto Navarro',
    subtitle: 'O método que transforma vidas através do dinheiro',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Controle emocional, clareza financeira e ação: a tríade para o sucesso. Estratégias, histórias reais e exercícios práticos para transformar sua relação com o dinheiro.',
          },
        ],
      },
    ],
    price: 59.90,
    purchaseLink: 'https://sun.eduzz.com/956345',
    amazonLink: 'https://amazon.com.br/coaching-financeiro',
    pages: 312,
    highlights: [
      { text: 'Metodologia completa de coaching financeiro' },
      { text: 'Ferramentas práticas para coaches' },
      { text: 'Como estruturar sessões eficazes' },
      { text: 'Casos de sucesso e estudos de caso' },
      { text: 'Perguntas de Coaching Financeiro muito bem elaboradas' },
    ],
    whatYouWillLearn: [
      { text: 'Como estruturar sessões de coaching financeiro' },
      { text: 'Ferramentas práticas para transformar vidas' },
      { text: 'Técnicas de controle emocional financeiro' },
      { text: 'Exercícios práticos para aplicar imediatamente' },
    ],
    seo: {
      title: 'Coaching Financeiro - Livro | Roberto Navarro',
      description: 'Aprenda o método que transforma vidas através do coaching financeiro. Estratégias, histórias reais e exercícios práticos.',
      keywords: 'coaching financeiro, livro coaching, métodos financeiros, roberto navarro',
    },
  })

  console.log('✅ Todos os livros foram populados com sucesso!')

  return {
    sabedoriaDoDinheiro: true,
    quebrandoMitos: true,
    arteDeEnriquecer: true,
    coachingFinanceiro: true,
  }
}
