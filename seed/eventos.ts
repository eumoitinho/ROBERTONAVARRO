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
        duration: '10 horas',
      location: {
        type: 'presencial',
          venue: 'Centro de Eventos Alphaville',
          address: 'Alameda Araguaia, 751',
          city: 'Barueri',
        state: 'SP',
      },
      hero: {
        badge: 'TRANSFORMAÇÃO MENTAL',
        title: 'CRENÇAS DA RIQUEZA',
        subtitle: 'A riqueza começa na mente e se materializa nas decisões. Desbloqueie seu potencial, supere crenças limitantes e alcance um novo patamar de liberdade financeira e realização pessoal.',
      },
      countdown: {
        enabled: true,
        targetDate: '2025-09-13T13:00:00.000Z',
      },
    challenges: [
      {
        question: 'Você trava na hora de tomar decisões financeiras importantes?',
        answer: 'Aprenda a identificar e neutralizar crenças limitantes que afetam suas escolhas.',
        icon: 'brain',
      },
      {
        question: 'Sente que está sempre correndo, mas sem sair do lugar?',
        answer: 'Direcione sua energia com foco, clareza e propósito para crescer com consistência.',
        icon: 'compass',
      },
      {
        question: 'Tem dificuldade em pensar grande e definir metas ousadas?',
        answer: 'Comece a expandir sua mentalidade e enxergar oportunidades onde antes via riscos.',
        icon: 'target',
      },
      {
        question: 'Sabe que precisa mudar, mas não consegue dar o próximo passo?',
        answer: 'Descubra o que está te bloqueando e como destravar seu potencial com técnicas práticas.',
        icon: 'move',
      },
      {
        question: 'Sente que algo te impede de alcançar a liberdade financeira?',
        answer: 'Aprenda a destravar suas crenças de escassez e ressignifique sua relação com o dinheiro.',
        icon: 'unlock',
      },
    ],
    intelligenceTypes: [
      {
        title: 'Inteligência Emocional',
        description:
          'Domine suas emoções financeiras e desenvolva autocontrole para tomar decisões racionais mesmo sob pressão. Aprenda a transformar medo em coragem e ansiedade em ação estratégica.',
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
          'Desenvolva uma mentalidade de abundância e aprenda as regras fundamentais do dinheiro. Desde o controle de gastos até estratégias de multiplicação de patrimônio.',
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
          'Alinhe seus valores pessoais com seus objetivos financeiros. Descubra seu propósito de vida e como a prosperidade pode servir a algo maior que você mesmo.',
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
          'Pense como um empreendedor de sucesso. Desenvolva visão estratégica, capacidade de identificar oportunidades e habilidades de liderança para escalar seus resultados.',
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
      learnings: [
        { text: 'Como identificar e transformar crenças limitantes sobre dinheiro' },
      { text: 'Domine suas emoções financeiras e desenvolva autocontrole para tomar decisões racionais mesmo sob pressão' },
      { text: 'Desenvolva uma mentalidade de abundância e aprenda as regras fundamentais do dinheiro' },
      { text: 'Alinhe seus valores pessoais com seus objetivos financeiros' },
      { text: 'Pense como um empreendedor de sucesso com visão estratégica' },
      ],
      highlights: [
          {
            title: 'Imersão Completa',
            description: '10 horas de conteúdo transformador em um único dia',
            icon: 'Zap',
          },
          {
            title: 'Material Exclusivo',
            description: 'Apostila digital e recursos para implementação imediata',
            icon: 'FileText',
          },
          {
            title: 'Networking Qualificado',
            description: 'Conexão com outros profissionais e empreendedores',
            icon: 'Users',
          },
          {
            title: 'Certificado',
            description: 'Documento oficial de participação no evento',
            icon: 'Award',
          },
        ],
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
    duration: '7 horas',
    location: {
      type: 'presencial',
      venue: 'Centro de Convenções',
      city: 'São Paulo',
      state: 'SP',
    },
    hero: {
      badge: 'WORKSHOP INTENSIVO',
      title: 'ENERGIA DO DINHEIRO',
      subtitle: 'Desbloqueie a energia do dinheiro e transforme sua realidade. Alinhe sua energia com a prosperidade.',
    },
    challenges: [
      {
        question: 'Você trabalha muito mas nunca sobra dinheiro?',
        answer: 'Descubra como alinhar sua energia para atrair prosperidade e transformar sua relação com o dinheiro.',
      },
      {
        question: 'Sente que nasceu para prosperar mas algo te trava?',
        answer: 'Identifique e remova os bloqueios energéticos que impedem sua prosperidade.',
      },
      {
        question: 'Sente culpa ou medo ao falar de dinheiro?',
        answer: 'Transforme essas emoções limitantes em energia positiva para atrair riqueza.',
      },
      {
        question: 'Acredita que ganhar dinheiro exige sacrifício?',
        answer: 'Descubra como a energia da prosperidade pode fluir naturalmente em sua vida.',
      },
    ],
    learnings: [
      { text: 'Qual o efeito do dinheiro em sua vida' },
      { text: 'Como o estado emocional impacta sua conta bancária' },
      { text: 'Quem influencia sua visão sobre dinheiro' },
      { text: 'O papel da ambiência na construção da riqueza' },
      { text: 'Como identificar sabotadores financeiros' },
      { text: 'Conexão entre energia sexual e prosperidade' },
      { text: 'O protocolo da riqueza nos negócios' },
      { text: 'A verdade sobre o "dinheirinho" limitante' },
      { text: 'Como criar motivação para atrair dinheiro' },
    ],
    highlights: [
      {
        title: 'Workshop Intensivo',
        description: '7 horas de transformação energética',
        icon: 'Zap',
      },
      {
        title: 'Práticas Exclusivas',
        description: 'Rituais e técnicas para alinhamento energético',
        icon: 'Sparkles',
      },
      {
        title: 'Material de Apoio',
        description: 'Recursos para manter a energia da prosperidade',
        icon: 'FileText',
      },
    ],
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
    duration: '7 horas',
    location: {
      type: 'presencial',
      venue: 'Hotel Nacional Inn',
      address: 'Av. Benedicto Campos, 35 - Jardim do Trevo',
      city: 'Campinas',
      state: 'SP',
    },
    hero: {
      badge: 'IMERSÃO EXCLUSIVA',
      title: 'SEGREDOS DA MENTE MILIONÁRIA',
      subtitle: 'Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro.',
    },
    learnings: [
      { text: 'Múltiplas fontes de renda e como criá-las' },
      { text: 'Ação e prosperidade: transforme conhecimento em riqueza' },
      { text: 'Transformação mental para mentalidade milionária' },
      { text: 'Segurança financeira com reserva de emergência' },
      { text: 'Propósito de vida claro e definido' },
      { text: 'Liberdade financeira sem dependência de salário' },
      { text: 'Mentalidade milionária desenvolvida' },
      { text: 'Educação financeira completa' },
      { text: 'Networking e inspiração com pessoas transformadas' },
    ],
    highlights: [
      {
        title: 'Segurança Financeira',
        description: 'Aprenda a criar reserva de emergência e proteger seu patrimônio',
        icon: 'Shield',
      },
      {
        title: 'Propósito de Vida',
        description: 'Defina seu propósito e alinhe com prosperidade e realização pessoal',
        icon: 'Target',
      },
      {
        title: 'Liberdade Financeira',
        description: 'Conquiste independência sem depender de salário ou trabalho',
        icon: 'Zap',
      },
      {
        title: 'Mentalidade Milionária',
        description: 'Desenvolva o mindset dos milionários e pense como eles',
        icon: 'Brain',
      },
      {
        title: 'Educação Financeira',
        description: 'Conhecimento completo sobre dinheiro, investimentos e riqueza',
        icon: 'GraduationCap',
      },
      {
        title: 'Networking',
        description: 'Conecte-se com pessoas transformadas e construa relacionamentos valiosos',
        icon: 'Users',
      },
    ],
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
      badge: 'EVENTO PRESENCIAL EXCLUSIVO',
      title: 'ESCALADOR DE NEGÓCIOS',
      subtitle: 'Empreendedores de sucesso não crescem por acaso. Saia da estagnação e aplique, de forma imediata, estratégias reais para escalar vendas, lucros e liberdade.',
    },
    challenges: [
      {
        question: 'Trabalha demais, mas o faturamento está estagnado?',
        answer: 'Aprenda estratégias reais de escala sem trabalhar mais.',
        icon: 'briefcase',
      },
      {
        question: 'Sua empresa depende apenas de indicações ou sorte?',
        answer: 'Desenvolva autoridade e posicionamento de marca.',
        icon: 'trending-up',
      },
      {
        question: 'Já tentou várias coisas sem sucesso?',
        answer: 'Aplique técnicas avançadas de venda e fidelização.',
        icon: 'lightbulb',
      },
      {
        question: 'Está preso no operacional?',
        answer: 'Crie um plano de ação imediato para implementar.',
        icon: 'settings',
      },
    ],
    learnings: [
      { text: 'Estratégias reais de escala sem trabalhar mais' },
      { text: 'Autoridade e posicionamento de marca' },
      { text: 'Multiplicação de lucros exponencial' },
      { text: 'Técnicas avançadas de venda e fidelização' },
      { text: 'Networking estratégico e parcerias' },
      { text: 'Plano de ação imediato para implementar' },
    ],
    highlights: [
      {
        title: 'Evento 100% Gratuito',
        description: 'Acesso completo sem custo',
        icon: 'Gift',
      },
      {
        title: 'Experiência VIP',
        description: 'Opção premium disponível',
        icon: 'Crown',
      },
      {
        title: 'Metodologia Prática',
        description: 'Estratégias aplicáveis imediatamente',
        icon: 'CheckCircle',
      },
    ],
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
    duration: '7 horas',
    location: {
      type: 'presencial',
      venue: 'Centro de Eventos Alphaville',
      address: 'Alameda Araguaia, 751',
      city: 'Barueri',
      state: 'SP',
    },
    hero: {
      badge: 'O EVENTO QUE VAI TRANSFORMAR CONHECIMENTO EM FORTUNA',
      title: 'MENTOR MILIONÁRIO',
      subtitle: 'De Lavador de Vidros a Multimilionário em 7 Anos. Transforme conhecimento em fortuna e conquiste seu primeiro milhão.',
    },
    challenges: [
      {
        question: 'Você tem conhecimento valioso, mas não sabe como monetizá-lo?',
        answer: 'Aprenda a transformar sua expertise em um negócio lucrativo e escalável.',
        icon: 'lightbulb',
      },
      {
        question: 'Sonha em alcançar o primeiro milhão, mas não sabe por onde começar?',
        answer: 'Receba um plano de ação claro e comprovado para construir sua fortuna.',
        icon: 'dollar-sign',
      },
      {
        question: 'Deseja se tornar um mentor de sucesso, mas falta método e posicionamento?',
        answer: 'Desenvolva sua autoridade e atraia clientes de alto valor.',
        icon: 'users',
      },
      {
        question: 'Quer criar múltiplas fontes de renda, mas não sabe quais são as melhores estratégias?',
        answer: 'Descubra como diversificar seus ganhos e acelerar sua liberdade financeira.',
        icon: 'trending-up',
      },
    ],
    schedule: [
      {
        time: '13:00',
        title: 'ABERTURA: A Mentalidade do Milhão',
        description: 'Reprogramação de crenças e mindset de prosperidade. Como pensar como um milionário.',
      },
      {
        time: '14:00',
        title: 'BLOCO 1: Reprogramação Mental',
        description: 'Técnicas avançadas para superar bloqueios mentais e desenvolver mentalidade de abundância.',
      },
      {
        time: '15:30',
        title: 'BLOCO 2: As Regras Secretas do Dinheiro',
        description: 'Desvende os princípios que regem a riqueza. O que os ricos fazem que os outros não fazem.',
      },
      {
        time: '17:00',
        title: 'BLOCO 3: Múltiplas Fontes de Renda',
        description: 'Estratégias práticas para diversificar seus ganhos. Como criar e escalar múltiplas fontes de renda.',
      },
      {
        time: '18:30',
        title: 'BLOCO FINAL: Seu Plano Milionário',
        description: 'Construção de um plano de ação detalhado para o primeiro milhão. Passo a passo concreto.',
      },
      {
        time: '19:30',
        title: 'Sessão de Perguntas e Respostas',
        description: 'Interação direta com Roberto Navarro. Tire suas dúvidas e receba orientações personalizadas.',
      },
      {
        time: '20:00',
        title: 'Encerramento',
        description: 'Conclusão do evento e próximos passos. Recursos e ferramentas para continuar sua jornada.',
      },
    ],
    highlights: [
      {
        title: 'Clareza sobre Monetização',
        description: 'Aprenda como transformar conhecimento em dinheiro de forma prática e escalável',
        icon: 'dollar-sign',
      },
      {
        title: 'Estratégia para Primeiro Milhão',
        description: 'Plano concreto e aplicável para alcançar seu primeiro milhão',
        icon: 'target',
      },
      {
        title: 'Mentalidade Reprogramada',
        description: 'Desenvolva o mindset milionário e supere crenças limitantes',
        icon: 'brain',
      },
      {
        title: 'Plano Concreto com Ações',
        description: 'Ações práticas e imediatas para implementar após o evento',
        icon: 'check-circle',
      },
      {
        title: 'Conhecimento das Regras',
        description: 'As regras secretas do dinheiro que os milionários conhecem',
        icon: 'book',
      },
      {
        title: 'Múltiplas Fontes de Renda',
        description: 'Estruture duas fontes de renda estruturadas e escaláveis',
        icon: 'trending-up',
      },
    ],
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
