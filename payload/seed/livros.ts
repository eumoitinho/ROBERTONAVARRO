export async function seedLivros(payload: any) {
  const arteDeEnriquecer = await payload.create({
    collection: 'livros',
    data: {
      title: 'A Arte de Enriquecer',
      slug: 'arte-de-enriquecer',
      author: 'Roberto Navarro',
      subtitle: 'Os princípios atemporais da riqueza',
      description: 'Descubra os segredos milenares que transformam pessoas comuns em milionárias. Um guia prático e profundo sobre como construir riqueza verdadeira e duradoura.',
      price: 49.90,
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
        description: 'Descubra os princípios atemporais da riqueza no novo livro de Roberto Navarro.',
        keywords: 'arte de enriquecer, livro riqueza, roberto navarro livro',
      },
    },
  })

  const coachingFinanceiro = await payload.create({
    collection: 'livros',
    data: {
      title: 'Coaching Financeiro',
      slug: 'coaching-financeiro',
      author: 'Roberto Navarro',
      subtitle: 'O método que transforma vidas através do dinheiro',
      description: 'O guia definitivo para quem quer ajudar outras pessoas a alcançarem a liberdade financeira através do coaching.',
      price: 59.90,
      amazonLink: 'https://amazon.com.br/coaching-financeiro',
      pages: 312,
      highlights: [
        { text: 'Metodologia completa de coaching financeiro' },
        { text: 'Ferramentas práticas para coaches' },
        { text: 'Como estruturar sessões eficazes' },
        { text: 'Casos de sucesso e estudos de caso' },
      ],
      seo: {
        title: 'Coaching Financeiro - Livro | Roberto Navarro',
        description: 'Aprenda o método que transforma vidas através do coaching financeiro.',
        keywords: 'coaching financeiro, livro coaching, métodos financeiros',
      },
    },
  })

  console.log('✅ Livros criados')

  return {
    arteDeEnriquecer,
    coachingFinanceiro,
  }
}
