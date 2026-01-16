import { normalizeNestedRelationships } from './helpers/normalize-relationships'

export async function seedEventos(payload: any, eventoFAQs: any[] = [], mentors: any = {}) {
  // Obter IDs dos FAQs do Evento (apenas IDs válidos)
  const eventoFaqIds = eventoFAQs
    .filter((f: any) => f && f.id && typeof f.id === 'string' && f.id.length === 24)
    .map((f: any) => f.id)

  // Obter IDs dos mentores
  const mentorIds: string[] = []
  if (mentors.robertoNavarro && mentors.robertoNavarro.id) {
    mentorIds.push(mentors.robertoNavarro.id)
  }
  if (mentors.raissaNavarro && mentors.raissaNavarro.id) {
    mentorIds.push(mentors.raissaNavarro.id)
  }

  const createOrUpdateEvento = async (slug: string, data: any) => {
    const existing = await payload.find({
    collection: 'eventos',
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
      console.log(`⚠️  Evento "${data.title}" já existe, atualizando...`)
      try {
        return await payload.update({
          collection: 'eventos',
          id: existing.docs[0].id,
          data: normalizedData,
        })
      } catch (error: any) {
        console.error(`❌ Erro ao atualizar evento "${data.title}":`, error.message)
        throw error
      }
  } else {
      console.log(`✅ Criando evento "${data.title}"...`)
      return await payload.create({
      collection: 'eventos',
        data: normalizedData,
      })
    }
  }

  // 1. CRENÇAS DA RIQUEZA
  await createOrUpdateEvento('crencas-da-riqueza', {
      title: 'Crenças da Riqueza',
      slug: 'crencas-da-riqueza',
      status: 'published',
    template: 'crencas-da-riqueza',
      accentColor: '#FFD700',
        date: '2025-09-13T13:00:00.000Z',
        endDate: '2025-09-13T20:00:00.000Z',
        duration: '13 h às 20 h',
      location: {
        type: 'presencial',
          venue: 'Alameda Araguaia, 751',
          address: 'Alphaville',
          city: 'Barueri',
        state: 'SP',
      },
      hero: {
        badge: 'A riqueza começa na mente e se materializa nas decisões',
        title: 'CRENÇAS DA RIQUEZA',
        subtitle: 'TRANSFORMAÇÃO MENTAL',
        description: 'Desbloqueie seu potencial, supere crenças limitantes e alcance um novo patamar de liberdade financeira e realização pessoal.\nReserve agora e garanta seu lugar antes que esgote.',
        ctaText: 'GARANTA SUA VAGA!',
        ctaLink: '#form',
      },
      countdown: {
        enabled: true,
        targetDate: '2025-09-13T13:00:00.000Z',
      },
    challenges: [
      {
        question: 'Você trava na hora de tomar decisões financeiras importantes?',
        answer: 'Identifique e neutralize crenças limitantes que travam suas escolhas.',
        icon: 'brain',
      },
      {
        question: 'Sente que está sempre correndo, mas sem sair do lugar?',
        answer: 'Direcione sua energia com foco, clareza e propósito para sair da estagnação.',
        icon: 'compass',
      },
      {
        question: 'Tem dificuldade em pensar grande e definir metas ousadas?',
        answer: 'Expanda sua mentalidade e defina metas ousadas com estratégia.',
        icon: 'target',
      },
      {
        question: 'Sabe que precisa mudar, mas não consegue dar o próximo passo?',
        answer: 'Descubra o que está te bloqueando e destrave seu potencial com técnicas práticas.',
        icon: 'move',
      },
      {
        question: 'Sente que algo te impede de alcançar a liberdade financeira?',
        answer: 'Supere crenças limitantes e abra espaço para prosperar com liberdade.',
        icon: 'unlock',
      },
    ],
    intelligenceTypes: [
      {
        title: 'Inteligência Emocional',
        description:
          'Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.',
        icon: '/emotional-intelligence-icon.png',
        benefits: [
          { text: 'Controle emocional em decisões financeiras' },
          { text: 'Técnicas para vencer o medo de investir' },
          { text: 'Autoconfiança para negociar e empreender' },
          { text: 'Resiliência diante de perdas e fracassos' },
          { text: 'Disciplina para manter o foco nos objetivos' },
        ],
      },
      {
        title: 'Inteligência Financeira',
        description:
          'Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.',
        icon: '/financial-intelligence-icon.png',
        benefits: [
          { text: 'Planejamento financeiro pessoal eficiente' },
          { text: 'Estratégias de investimento para iniciantes' },
          { text: 'Como criar múltiplas fontes de renda' },
          { text: 'Gestão inteligente de dívidas e crédito' },
          { text: 'Mentalidade de abundância vs escassez' },
        ],
      },
      {
        title: 'Inteligência Espiritual',
        description:
          'Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo — é a base para prosperar com equilíbrio.',
        icon: '/spiritual-intelligence-icon.png',
        benefits: [
          { text: 'Conexão entre propósito e prosperidade' },
          { text: 'Valores que sustentam o sucesso duradouro' },
          { text: 'Equilíbrio entre ter e ser' },
          { text: 'Generosidade como ferramenta de crescimento' },
          { text: 'Paz interior independente das circunstâncias' },
        ],
      },
      {
        title: 'Inteligência Empresarial',
        description:
          'Pense como um empreendedor de sucesso, desenvolvendo visão estratégica, capacidade de identificar oportunidades e liderança para escalar resultados.',
        icon: '/business-intelligence-icon.png',
        benefits: [
          { text: 'Mindset empreendedor e visão de oportunidades' },
          { text: 'Estratégias para escalar negócios' },
          { text: 'Liderança e formação de equipes' },
          { text: 'Networking estratégico e parcerias' },
          { text: 'Inovação e adaptação a mudanças' },
        ],
      },
    ],
      learnings: {
        sectionTitle: 'O QUE VOCÊ VAI APRENDER',
        sectionDescription: 'Durante esta imersão exclusiva, você vai aprender as estratégias e mentalidades que os milionários usam para construir riqueza.',
        items: [
        { text: 'Como identificar e transformar crenças limitantes sobre dinheiro' },
          { text: 'Domine suas emoções financeiras e desenvolva autocontrole para tomar decisões racionais mesmo sob pressão' },
          { text: 'Desenvolva uma mentalidade de abundância e aprenda as regras fundamentais do dinheiro' },
          { text: 'Alinhe seus valores pessoais com seus objetivos financeiros' },
          { text: 'Pense como um empreendedor de sucesso com visão estratégica' },
        ],
      },
      highlights: {
        sectionTitle: 'RESULTADOS COMPROVADOS E TRANSFORMAÇÃO MENTAL',
        sectionDescription: 'Durante a imersão: 10 h de conteúdo intensivo, 4 inteligências desenvolvidas, 100 % metodologia prática e 1 dia que muda sua vida.',
        items: [
          {
            title: 'Imersão Completa',
            description: '10 h de conteúdo intensivo em um único dia',
            icon: 'Zap',
          },
          {
            title: '4 Inteligências',
            description: 'Mente, emoções, propósito e estratégia alinhados',
            icon: 'Target',
          },
          {
            title: 'Metodologia 100% Prática',
            description: 'Aplicação imediata com técnicas comprovadas',
            icon: 'CheckCircle',
          },
          {
            title: 'Material Exclusivo',
            description: 'Conteúdos de apoio para acelerar sua evolução',
            icon: 'FileText',
          },
          {
            title: 'Networking Qualificado',
            description: 'Conexões estratégicas com pessoas em transformação',
            icon: 'Users',
          },
          {
            title: 'Certificado',
            description: 'Certificado de participação na imersão',
            icon: 'Award',
          },
        ],
      },
        tickets: [
          {
            name: 'Ingresso Especial',
            type: 'paid',
            price: 9.90,
            description: 'Acesso completo ao evento presencial',
            benefits: [
              { text: 'Experiência completa de 10 horas' },
              { text: 'Material digital exclusivo' },
              { text: 'Certificado de participação' },
              { text: 'Networking com participantes' },
            ],
            link: 'https://evento.blinket.com.br/crencas-da-riqueza',
            available: true,
          },
          {
            name: 'Ingresso VIP',
            type: 'vip',
            price: 49.90,
            description: 'Experiência premium com benefícios exclusivos',
            benefits: [
              { text: 'Tudo do Ingresso Especial' },
              { text: 'Assentos nas primeiras fileiras' },
              { text: 'Perguntas e respostas com Roberto Navarro' },
              { text: 'Compre 1, leve 2 (traga um acompanhante)' },
              { text: 'Acesso antecipado ao evento' },
            ],
            link: 'https://evento.blinket.com.br/crencas-da-riqueza-vip',
            available: true,
          },
        ],
    mentors: mentorIds.length > 0 ? mentorIds : undefined,
        faqs: eventoFaqIds.length > 0 ? eventoFaqIds : undefined,
        seo: {
          title: 'Crenças da Riqueza - Evento Presencial | Roberto Navarro',
          description: 'Transforme suas crenças sobre dinheiro em um evento presencial de 10 horas. Desbloqueie seu potencial e alcance um novo patamar de liberdade financeira. Vagas limitadas!',
          keywords: 'crenças da riqueza, mentalidade de riqueza, evento financeiro, roberto navarro, transformação mental',
        },
  })

  // 2. ENERGIA DO DINHEIRO
  await createOrUpdateEvento('energia-do-dinheiro', {
      title: 'Energia do Dinheiro',
      slug: 'energia-do-dinheiro',
      status: 'published',
    template: 'energia-do-dinheiro',
      accentColor: '#00C853',
      date: '2025-10-07T13:00:00.000Z',
      endDate: '2025-10-07T20:00:00.000Z',
      duration: '13 h às 20 h',
      location: {
        type: 'presencial',
        venue: 'Centro de Convenções',
        city: 'São Paulo',
        state: 'SP',
      },
      hero: {
        badge: 'Desbloqueie a energia do dinheiro e transforme sua realidade',
        title: 'ENERGIA DO DINHEIRO',
        subtitle: '07 de outubro – das 13 h às 20 h',
        description:
          'Alinhe sua energia com a prosperidade e conquiste abundância real na vida e nos negócios. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade.',
        ctaText: 'GARANTA SUA VAGA!',
        ctaLink: '#form',
      },
    challenges: [
      {
        question: 'Você trabalha muito, mas nunca sobra dinheiro?',
        answer: 'Saia do ciclo de escassez ativando a verdadeira energia da abundância.',
      },
      {
        question: 'Você sente que nasceu para prosperar, mas algo te trava?',
        answer: 'Descubra os sabotadores invisíveis e como se libertar deles.',
      },
      {
        question: 'Sente culpa ou medo ao falar de dinheiro?',
        answer: 'Reprograme sua relação emocional com o dinheiro.',
      },
      {
        question: 'Acredita que ganhar dinheiro exige sacrifício?',
        answer: 'Alinhe prazer e propósito para que o dinheiro flua com naturalidade.',
      },
    ],
      learnings: {
        sectionTitle: 'DESPERTAR DE CONSCIÊNCIA',
        sectionDescription:
          'No dia 07 de outubro, das 13 h às 20 h, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia.',
        items: [
          { text: 'Qual o efeito do dinheiro em sua vida.' },
          { text: 'Como o seu estado emocional impacta diretamente sua conta bancária.' },
          { text: 'Quem está influenciando sua visão sobre dinheiro — e como retomar o controle.' },
          { text: 'O papel da ambiência e da atmosfera na construção da riqueza.' },
          { text: 'Como identificar e eliminar sabotadores financeiros.' },
          { text: 'A conexão poderosa (e oculta) entre energia sexual e prosperidade.' },
          { text: 'O protocolo da riqueza nos negócios e na vida pessoal.' },
          { text: 'A verdade sobre o “dinheirinho” e por que ele pode te manter preso na escassez.' },
          { text: 'Como criar a motivação certa para que o dinheiro venha até você.' },
        ],
      },
      highlights: {
        sectionTitle: 'TRANSFORMAÇÃO REAL, RESULTADOS E METODOLOGIA',
        sectionDescription:
          'Resultados comprovados: mais de 130 mil pessoas passaram pelas formações e transformaram sua relação com o dinheiro.',
        items: [
          {
            title: 'Transformação Mental',
            description: 'Reprogramação de crenças limitantes e mentalidade de prosperidade',
            icon: 'Zap',
          },
          {
            title: 'Metodologia Exclusiva',
            description: 'Integra inteligência financeira, emocional, espiritual e empresarial',
            icon: 'Sparkles',
          },
          {
            title: 'Histórias Reais',
            description: 'Depoimentos e estudos de caso de alunos transformados',
            icon: 'FileText',
          },
        ],
      },
    mentors: mentorIds.length > 0 ? mentorIds : undefined,
      seo: {
        title: 'Energia do Dinheiro - Workshop Intensivo | Roberto Navarro',
      description: 'Desbloqueie sua energia financeira e atraia prosperidade em um workshop de 7 horas. Mais do que uma mentoria, um despertar de consciência.',
      keywords: 'energia do dinheiro, prosperidade, abundância financeira, alinhamento energético',
    },
  })

  // 3. SEGREDOS DA MENTE MILIONÁRIA
  await createOrUpdateEvento('segredos-da-mente-milionaria', {
    title: 'Segredos da Mente Milionária',
    slug: 'segredos-da-mente-milionaria',
    status: 'published',
    template: 'segredos-da-mente-milionaria',
    accentColor: '#FFD700',
    date: '2025-10-22T13:00:00.000Z',
    endDate: '2025-10-22T20:00:00.000Z',
    duration: '13 h às 20 h',
    location: {
      type: 'presencial',
      venue: 'Alameda Araguaia, 751',
      address: 'Alphaville',
      city: 'Barueri',
      state: 'SP',
    },
    hero: {
      badge: 'Em 22 de outubro alcance a liberdade financeira com uma mudança de mentalidade',
      title: 'SEGREDOS DA MENTE MILIONÁRIA',
      subtitle: 'Imersão exclusiva e transformadora',
      description:
        'Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Alameda Araguaia, 751 - Alphaville',
      ctaText: 'QUERO DESPERTAR MINHA MENTE MILIONÁRIA',
      ctaLink: '#newsletter',
    },
    learnings: {
      sectionTitle: 'O QUE VOCÊ VAI DESCOBRIR',
      sectionDescription: 'O passo a passo para despertar sua mente milionária.',
      items: [
        {
          text: 'Múltiplas fontes de renda – Entenda como combinar renda principal, extra e passiva para construir sua riqueza de forma estratégica.',
        },
        { text: 'Ação e prosperidade – Como agir com intenção, propósito claro e prosperidade abundante.' },
        { text: 'Transformação mental – Supere crenças limitantes e construa uma mentalidade de riqueza.' },
      ],
    },
    highlights: {
      sectionTitle: 'BENEFÍCIOS DO EVENTO — POR QUE PARTICIPAR DO SEGREDOS DA MENTE MILIONÁRIA',
      items: [
        {
          title: 'Segurança financeira',
          description: 'Descubra como criar uma base sólida, com reserva de emergência e planejamento para o futuro.',
          icon: 'Shield',
        },
        {
          title: 'Propósito de vida',
          description: 'Tenha clareza sobre seu propósito de vida e carreira e abra portas para novas oportunidades.',
          icon: 'Target',
        },
        {
          title: 'Liberdade financeira',
          description: 'Aprenda a diferença entre sobreviver e viver com liberdade — sem depender de salário ou trabalho ativo.',
          icon: 'Zap',
        },
        {
          title: 'Mentalidade milionária',
          description:
            'Supere crenças limitantes sobre dinheiro e adote os hábitos, atitudes e estratégias dos que alcançaram a verdadeira riqueza.',
          icon: 'Brain',
        },
        {
          title: 'Educação financeira',
          description: 'Aprender com quem já chegou lá pode acelerar (e muito!) sua jornada.',
          icon: 'GraduationCap',
        },
        {
          title: 'Networking e inspiração',
          description: 'Conecte-se com pessoas que já transformaram suas vidas e inspire-se com histórias reais.',
          icon: 'Users',
        },
      ],
    },
    tickets: [
      {
        name: 'Ingresso Especial',
        type: 'paid',
        price: 9.90,
        originalPrice: 597,
        description: 'Acesso completo ao evento presencial',
        benefits: [
          { text: 'Experiência completa de 7 horas' },
          { text: 'Material digital exclusivo' },
          { text: 'Certificado de participação' },
          { text: 'Networking com participantes' },
        ],
        link: 'https://evento.blinket.com.br/segredos-da-mente-milionaria-26-agosto',
        available: true,
      },
      {
        name: 'Ingresso VIP',
        type: 'vip',
        price: 49.90,
        originalPrice: 997,
        description: 'Experiência premium com benefícios exclusivos',
        benefits: [
          { text: 'Tudo do Ingresso Especial' },
          { text: 'Assentos nas primeiras fileiras' },
          { text: 'Perguntas e respostas com Roberto Navarro' },
          { text: 'Compre 1, leve 2 (traga um acompanhante)' },
          { text: 'Acesso antecipado ao evento' },
        ],
        link: 'https://evento.blinket.com.br/segredos-da-mente-milionaria-vip',
        available: true,
      },
    ],
    mentors: mentorIds.length > 0 ? mentorIds : undefined,
    seo: {
      title: 'Segredos da Mente Milionária - Imersão Transformadora | Roberto Navarro',
      description: 'Aprenda a despertar seu potencial milionário em 7 horas de imersão exclusiva com Roberto e Raíssa Navarro.',
      keywords: 'segredos mente milionária, mentalidade milionária, roberto navarro, transformação financeira',
    },
  })

  // 4. ESCALADOR DE NEGÓCIOS
  await createOrUpdateEvento('escalador-de-negocios', {
    title: 'Escalador de Negócios',
    slug: 'escalador-de-negocios',
    status: 'published',
    template: 'escalador-de-negocios',
    accentColor: '#EF4444',
    date: '2025-12-15T09:00:00.000Z',
    endDate: '2025-12-15T18:00:00.000Z',
    duration: '9 horas',
    location: {
      type: 'presencial',
      venue: 'Centro de Convenções',
      city: 'São Paulo',
      state: 'SP',
    },
    hero: {
      badge: 'Empreendedores de sucesso não crescem por acaso',
      title: 'ESCALADOR DE NEGÓCIOS',
      subtitle: 'EVENTO PRESENCIAL EXCLUSIVO',
      description:
        'Saia da estagnação e aplique, de forma imediata, estratégias reais para escalar vendas, lucros e liberdade.',
      ctaText: 'GARANTA SUA VAGA!',
      ctaLink: '#newsletter',
    },
    challenges: [
      {
        question: 'Trabalha demais, mas o faturamento continua estagnado?',
        answer: 'Aprenda a escalar sem aumentar a carga de trabalho, com um modelo de crescimento sustentável.',
        icon: 'briefcase',
      },
      {
        question: 'Sua empresa depende de indicações ou da sorte para vender?',
        answer: 'Crie um fluxo previsível de vendas com estratégia e posicionamento.',
        icon: 'trending-up',
      },
      {
        question: 'Já tentou várias coisas, mas nada parece funcionar?',
        answer: 'Siga um método testado e validado por quem já multiplicou resultados.',
        icon: 'lightbulb',
      },
      {
        question: 'Está preso(a) no operacional e não tem tempo para crescer?',
        answer: 'Monte uma estrutura que funciona mesmo sem você por perto.',
        icon: 'settings',
      },
    ],
    learnings: {
      sectionTitle: 'O QUE VOCÊ VAI APRENDER',
      sectionDescription: 'Estratégias para escalar seu negócio.',
      items: [
        { text: 'Estratégias reais de escala – aumente seu faturamento com processos inteligentes, sem precisar trabalhar mais.' },
        { text: 'Autoridade e posicionamento de marca – torne-se referência em seu segmento e atraia clientes qualificados.' },
        { text: 'Multiplicação de lucros – segredos dos empreendedores que saem da média.' },
        { text: 'Técnicas avançadas de venda – venda mais, fidelize clientes e aumente seu ticket médio.' },
        { text: 'Networking estratégico e parcerias – amplie conexões e crie novas oportunidades.' },
        { text: 'Plano de ação imediato – saia do evento com um plano prático para aplicar no dia seguinte.' },
      ],
    },
    highlights: {
      sectionTitle: 'DESTAQUES DO EVENTO',
      items: [
        {
          title: 'Evento 100 % gratuito',
          description: 'Participe sem investir em ingresso.',
          icon: 'Gift',
        },
        {
          title: 'Experiência VIP',
          description: 'Disponível para os primeiros inscritos.',
          icon: 'Crown',
        },
        {
          title: 'Presencial e prático',
          description: 'Metodologia prática e resultados mensuráveis.',
          icon: 'CheckCircle',
        },
      ],
    },
    mentors: mentorIds.length > 0 ? [mentors.robertoNavarro.id] : undefined,
    seo: {
      title: 'Escalador de Negócios - Evento Presencial | Roberto Navarro',
      description: 'Saia da estagnação e aplique estratégias reais para escalar vendas, lucros e liberdade. Evento presencial exclusivo.',
      keywords: 'escalador de negócios, escalar empresa, estratégias de crescimento, roberto navarro',
    },
  })

  // 5. MENTOR MILIONÁRIO
  await createOrUpdateEvento('mentor-milionario', {
    title: 'Mentor Milionário',
    slug: 'mentor-milionario',
    status: 'published',
    template: 'mentor-milionario',
    accentColor: '#FFD700',
    date: '2025-09-24T13:00:00.000Z',
    endDate: '2025-09-24T20:00:00.000Z',
    duration: '13 h às 20 h',
    location: {
      type: 'presencial',
      venue: 'Alameda Araguaia, 751',
      address: 'Alphaville',
      city: 'Barueri',
      state: 'SP',
    },
    hero: {
      badge: 'O evento que vai transformar conhecimento em fortuna e criar múltiplas fontes de renda',
      title: 'MENTOR MILIONÁRIO',
      subtitle: 'O EVENTO QUE VAI TRANSFORMAR CONHECIMENTO EM FORTUNA',
      description:
        'De lavador de vidros a multimilionário em 7 anos... agora Roberto Navarro revela os segredos para você se tornar um mentor de sucesso ou conquistar seu primeiro milhão.',
      ctaText: 'QUERO MINHA VAGA NO MENTOR MILIONÁRIO',
      ctaLink: '#inscricao',
    },
    challenges: [
      {
        question: 'Você tem conhecimento valioso, mas não sabe como transformá-lo em dinheiro?',
        answer: 'Aprenda a transformar seu conhecimento em produto lucrativo.',
        icon: 'lightbulb',
      },
      {
        question: 'Quer alcançar o primeiro milhão, mas não tem uma estratégia clara?',
        answer: 'Receba um plano de ação claro para construir sua fortuna.',
        icon: 'dollar-sign',
      },
      {
        question: 'Sonha em se tornar um mentor reconhecido, mas não sabe por onde começar?',
        answer: 'Desenvolva autoridade como especialista e atraia clientes de alto valor.',
        icon: 'users',
      },
      {
        question: 'Precisa de múltiplas fontes de renda para conquistar liberdade financeira?',
        answer: 'Descubra as melhores estratégias para diversificar seus ganhos.',
        icon: 'trending-up',
      },
    ],
    schedule: [
      {
        time: 'Abertura',
        title: 'A Mentalidade do Milhão',
        description:
          'A trajetória de Roberto Navarro, por que a prosperidade é uma escolha e os 3 pilares que sustentam qualquer fortuna.',
      },
      {
        time: 'Bloco 1',
        title: 'Reprogramação Mental: Desbloqueando seu potencial financeiro',
        description:
          'Identificar e quebrar crenças que limitam seu crescimento, o “reset” mental que liberta sua capacidade de gerar riqueza e estratégias para desenvolver autoridade como especialista.',
      },
      {
        time: 'Bloco 2',
        title: 'As Regras Secretas do Dinheiro: O Código dos Milionários',
        description:
          'As 7 regras fundamentais que todo milionário segue, como gerar riqueza de forma sustentável e a diferença entre quem fica rico e quem fica milionário.',
      },
      {
        time: 'Bloco 3',
        title: 'Múltiplas Fontes de Renda',
        description:
          'Estratégia 1 – Negócio Digital: transformar conhecimento em produto lucrativo e posicionamento como autoridade. Estratégia 2 – Investimentos: como fazer o dinheiro trabalhar e multiplicar patrimônio.',
      },
      {
        time: 'Bloco Final',
        title: 'Seu Plano Milionário',
        description:
          'Estruturando a jornada ao primeiro milhão: criação do plano pessoal, objetivos, métricas e marcos para acompanhar evolução.',
      },
    ],
    highlights: {
      sectionTitle: 'O QUE VOCÊ VAI CONQUISTAR',
      sectionDescription:
        'Clareza total, mentalidade reprogramada e um plano concreto para conquistar seu primeiro milhão.',
      items: [
        {
          title: 'Clareza total sobre monetização',
          description: 'Transforme conhecimento em dinheiro de forma prática e escalável.',
          icon: 'dollar-sign',
        },
        {
          title: 'Estratégia para o primeiro milhão',
          description: 'Plano estruturado para alcançar seu primeiro milhão.',
          icon: 'target',
        },
        {
          title: 'Mentalidade reprogramada',
          description: 'Desenvolva a mentalidade da prosperidade e supere crenças limitantes.',
          icon: 'brain',
        },
        {
          title: 'Plano concreto com ações',
          description: 'Ações práticas e mensuráveis para aplicar imediatamente.',
          icon: 'check-circle',
        },
        {
          title: 'Regras que todo milionário segue',
          description: 'Conheça o código dos milionários para crescer com consistência.',
          icon: 'book',
        },
        {
          title: 'Múltiplas fontes de renda',
          description: 'Duas estratégias poderosas para crescimento acelerado.',
          icon: 'trending-up',
        },
      ],
    },
    tickets: [
      {
        name: 'Ingresso Padrão',
        type: 'paid',
        price: 197.0,
        description: 'Acesso completo ao evento presencial',
        benefits: [
          { text: 'Experiência completa de 7 horas' },
          { text: 'Material digital exclusivo' },
          { text: 'Certificado de participação' },
        ],
        link: 'https://evento.blinket.com.br/mentor-milionario',
        available: true,
      },
      {
        name: 'Ingresso VIP',
        type: 'vip',
        price: 497.0,
        description: 'Experiência premium com benefícios exclusivos',
        benefits: [
          { text: 'Tudo do Ingresso Padrão' },
          { text: 'Assentos nas primeiras fileiras' },
          { text: 'Sessão de mentoria em grupo exclusiva' },
          { text: 'Acesso a gravação do evento por 30 dias' },
        ],
        link: 'https://evento.blinket.com.br/mentor-milionario-vip',
        available: true,
      },
    ],
    mentors: mentorIds.length > 0 ? [mentors.robertoNavarro.id] : undefined,
    seo: {
      title: 'Mentor Milionário - Transforme Conhecimento em Fortuna | Roberto Navarro',
      description: 'De Lavador de Vidros a Multimilionário em 7 Anos. Aprenda a transformar conhecimento em fortuna e conquiste seu primeiro milhão.',
      keywords: 'mentor milionário, transformar conhecimento em fortuna, primeiro milhão, roberto navarro',
    },
  })

  console.log('✅ Todos os eventos foram populados com sucesso!')

  return {
    crencasDaRiqueza: true,
    energiaDoDinheiro: true,
    segredosDaMenteMilionaria: true,
    escaladorDeNegocios: true,
    mentorMilionario: true,
  }
}
