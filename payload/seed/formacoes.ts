export async function seedFormacoes(payload: any) {
  // Educador Financeiro
  const educadorFinanceiro = await payload.create({
    collection: 'formacoes',
    data: {
      title: 'Educador Financeiro',
      slug: 'educador-financeiro',
      status: 'published',
      accentColor: '#FFD700',
      hero: {
        badge: 'CERTIFICAÇÃO RECONHECIDA PELO MEC',
        title: 'EDUCADOR FINANCEIRO',
        subtitle: 'Transforme vidas através da educação financeira e construa uma carreira de impacto',
        description: 'A única formação de Educador Financeiro com certificação reconhecida pelo MEC. Torne-se um profissional capacitado para ensinar educação financeira e transformar vidas.',
        ctaText: 'Quero me tornar um Educador Financeiro',
        ctaLink: 'https://pay.eduzz.com/educador-financeiro',
      },
      challenges: [
        { text: 'Você quer ajudar pessoas a conquistarem sua independência financeira?' },
        { text: 'Deseja construir uma carreira com propósito e alto potencial de ganhos?' },
        { text: 'Busca uma certificação reconhecida nacionalmente?' },
        { text: 'Quer dominar as metodologias mais eficazes de ensino financeiro?' },
      ],
      benefits: [
        {
          title: 'Certificação MEC',
          description: 'Certificado reconhecido pelo Ministério da Educação',
          icon: 'Award',
        },
        {
          title: 'Metodologia Validada',
          description: 'Aprenda técnicas comprovadas de ensino',
          icon: 'BookOpen',
        },
        {
          title: 'Mercado Aquecido',
          description: 'Alta demanda por educadores financeiros',
          icon: 'TrendingUp',
        },
        {
          title: 'Mentoria Especializada',
          description: 'Acompanhamento de profissionais experientes',
          icon: 'Users',
        },
      ],
      learnings: [
        { text: 'Fundamentos da educação financeira e psicologia do dinheiro' },
        { text: 'Metodologias ativas de ensino e aprendizagem' },
        { text: 'Como estruturar e ministrar cursos e palestras' },
        { text: 'Gestão de finanças pessoais e empresariais' },
        { text: 'Investimentos e planejamento financeiro' },
        { text: 'Como criar seu próprio negócio como educador' },
        { text: 'Marketing pessoal e posicionamento profissional' },
        { text: 'Certificação e regulamentação da profissão' },
      ],
      modules: [
        {
          title: 'Módulo 1: Fundamentos da Educação Financeira',
          description: 'Base teórica e prática da educação financeira',
          topics: [
            { text: 'História e importância da educação financeira' },
            { text: 'Psicologia do dinheiro e crenças limitantes' },
            { text: 'Princípios de finanças pessoais' },
            { text: 'Orçamento e planejamento financeiro' },
          ],
        },
        {
          title: 'Módulo 2: Metodologias de Ensino',
          description: 'Técnicas e estratégias para ensinar educação financeira',
          topics: [
            { text: 'Metodologias ativas de ensino' },
            { text: 'Como adaptar o conteúdo para diferentes públicos' },
            { text: 'Dinâmicas e jogos educativos' },
            { text: 'Avaliação e feedback' },
          ],
        },
        {
          title: 'Módulo 3: Investimentos',
          description: 'Conhecimento sobre investimentos e mercado financeiro',
          topics: [
            { text: 'Renda fixa e renda variável' },
            { text: 'Fundos de investimento' },
            { text: 'Ações e mercado de capitais' },
            { text: 'Planejamento de aposentadoria' },
          ],
        },
        {
          title: 'Módulo 4: Carreira como Educador',
          description: 'Como construir e monetizar sua carreira',
          topics: [
            { text: 'Posicionamento profissional' },
            { text: 'Marketing pessoal e redes sociais' },
            { text: 'Como precificar seus serviços' },
            { text: 'Modelos de negócio para educadores' },
          ],
        },
      ],
      bonuses: [
        {
          title: 'Material Didático Completo',
          description: 'Apostilas, slides e recursos para suas aulas',
          value: 'R$ 997',
        },
        {
          title: 'Acesso a Comunidade Exclusiva',
          description: 'Network com outros educadores financeiros',
          value: 'R$ 497',
        },
        {
          title: 'Mentoria em Grupo',
          description: '12 encontros ao vivo com especialistas',
          value: 'R$ 1.997',
        },
      ],
      video: {
        type: 'youtube',
        youtubeId: 'dQw4w9WgXcQ',
      },
      pricing: {
        price: 2997,
        installments: 12,
        installmentValue: 297,
        link: 'https://pay.eduzz.com/educador-financeiro',
      },
      guarantee: {
        days: 7,
        description: 'Garantia incondicional de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu investimento.',
      },
      certification: {
        hasCertification: true,
        certificationText: 'Certificado reconhecido pelo MEC através de parceria com instituição de ensino credenciada. Válido em todo território nacional.',
      },
      seo: {
        title: 'Educador Financeiro - Certificação Reconhecida pelo MEC | Roberto Navarro',
        description: 'Torne-se um Educador Financeiro certificado e transforme vidas através da educação financeira. Certificação reconhecida pelo MEC.',
        keywords: 'educador financeiro, certificação mec, educação financeira, curso educador financeiro',
      },
    },
  })

  console.log('✅ Formação Educador Financeiro criada')

  // Empreendedor Inteligente
  const empreendedorInteligente = await payload.create({
    collection: 'formacoes',
    data: {
      title: 'Empreendedor Inteligente',
      slug: 'empreendedor-inteligente',
      status: 'published',
      accentColor: '#FF6B00',
      hero: {
        badge: 'IMERSÃO DE 3 DIAS',
        title: 'EMPREENDEDOR INTELIGENTE',
        subtitle: 'Descubra os segredos para empreender com inteligência financeira',
        description: 'Uma imersão intensiva de 3 dias que vai revolucionar sua forma de empreender e gerenciar seu negócio.',
        ctaText: 'Quero participar da imersão',
        ctaLink: 'https://pay.eduzz.com/empreendedor-inteligente',
      },
      challenges: [
        { text: 'Seu negócio não está dando o lucro esperado?' },
        { text: 'Você trabalha muito mas não vê o dinheiro entrar?' },
        { text: 'Tem dificuldade em precificar seus produtos/serviços?' },
        { text: 'Não sabe como escalar seu negócio?' },
      ],
      learnings: [
        { text: 'Gestão financeira empresarial estratégica' },
        { text: 'Precificação inteligente e lucrativa' },
        { text: 'Fluxo de caixa e controle financeiro' },
        { text: 'Estratégias de crescimento e escalabilidade' },
        { text: 'Mindset empreendedor de alta performance' },
      ],
      pricing: {
        price: 1997,
        installments: 10,
        installmentValue: 197,
        link: 'https://pay.eduzz.com/empreendedor-inteligente',
      },
      seo: {
        title: 'Empreendedor Inteligente - Imersão de 3 Dias | Roberto Navarro',
        description: 'Aprenda a empreender com inteligência financeira em uma imersão intensiva de 3 dias.',
        keywords: 'empreendedor inteligente, gestão financeira empresarial, imersão empreendedorismo',
      },
    },
  })

  console.log('✅ Formação Empreendedor Inteligente criada')

  // Outras formações podem ser adicionadas aqui...

  return {
    educadorFinanceiro,
    empreendedorInteligente,
  }
}
