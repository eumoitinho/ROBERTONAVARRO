export async function seedFAQs(payload: any) {
  // FAQs para Educador Financeiro
  const educadorFAQs = [
    {
      question: 'Preciso ter experiência prévia em finanças para fazer o curso?',
      answer: 'Não! O curso é estruturado para atender desde iniciantes até profissionais que já atuam na área e querem se certificar.',
      category: 'formacao',
      order: 1,
    },
    {
      question: 'Em quanto tempo verei resultados?',
      answer: 'Os primeiros resultados aparecem já nas primeiras semanas de aplicação do conteúdo. A transformação completa acontece conforme você avança nos módulos e aplica as estratégias.',
      category: 'formacao',
      order: 2,
    },
    {
      question: 'Como funciona a certificação pelo MEC?',
      answer: 'A certificação é emitida pela Roberto Navarro Academia, instituição reconhecida pelo MEC. Você recebe o certificado após completar todos os módulos e passar na avaliação final.',
      category: 'certificacao',
      order: 3,
    },
    {
      question: 'Posso trabalhar como Educador Financeiro em qualquer lugar do Brasil?',
      answer: 'Sim! Com a Licença Profissional RNA e certificação MEC, você pode atuar em todo território nacional, tanto presencialmente quanto online.',
      category: 'certificacao',
      order: 4,
    },
    {
      question: 'Terei suporte após concluir a formação?',
      answer: 'Sim! Você terá acesso vitalício à comunidade de educadores, atualizações do conteúdo e suporte contínuo da equipe.',
      category: 'geral',
      order: 5,
    },
    {
      question: 'Posso usar o conhecimento apenas para melhorar minha vida pessoal ou preciso atuar profissionalmente?',
      answer: 'Você pode usar o conhecimento da forma que preferir! Muitos alunos fazem o curso para transformar suas próprias finanças e depois decidem ajudar outras pessoas profissionalmente.',
      category: 'geral',
      order: 6,
    },
    {
      question: 'A formação tem carga horária flexível?',
      answer: 'Sim! Todo o conteúdo fica disponível 24/7 e você estuda no seu próprio ritmo. Há apenas encontros ao vivo agendados que são opcionais mas recomendados.',
      category: 'formacao',
      order: 7,
    },
    {
      question: 'Posso me tornar um Treinador Licenciado e aplicar os 3 cursos exclusivos?',
      answer: 'Sim! Após concluir a formação e obter a Licença Profissional RNA, você está autorizado a ministrar os 3 treinamentos licenciados: Livre de Dívidas, Investimentos Inteligentes e Transformação Financeira.',
      category: 'certificacao',
      order: 8,
    },
  ]

  // FAQs para Eventos (Crenças da Riqueza)
  const eventoFAQs = [
    {
      question: 'Preciso ter conhecimento prévio sobre finanças?',
      answer: 'Não, o evento foi desenhado para pessoas em diferentes níveis de conhecimento financeiro. O foco está na transformação da mentalidade e nas crenças sobre dinheiro, não em conceitos técnicos avançados.',
      category: 'evento',
      order: 1,
    },
    {
      question: 'O que devo levar para o evento?',
      answer: 'Recomendamos que você leve um caderno para anotações, uma garrafa de água e esteja com roupas confortáveis. Todo o material didático será fornecido no evento, incluindo uma apostila digital.',
      category: 'evento',
      order: 2,
    },
    {
      question: 'Haverá certificado de participação?',
      answer: 'Sim, todos os participantes receberão um certificado digital de participação após a conclusão do evento.',
      category: 'evento',
      order: 3,
    },
    {
      question: 'Posso transferir meu ingresso para outra pessoa?',
      answer: 'Sim, você pode transferir seu ingresso para outra pessoa até 7 dias antes do evento. Para isso, entre em contato com nossa equipe de suporte informando os dados da nova pessoa.',
      category: 'evento',
      order: 4,
    },
    {
      question: 'Haverá gravação do evento?',
      answer: 'Não, o evento Crenças da Riqueza é uma experiência presencial exclusiva e não será gravado. Por isso, é fundamental garantir sua presença para aproveitar todo o conteúdo.',
      category: 'evento',
      order: 5,
    },
  ]

  const createdFAQs: any[] = []

  // Criar FAQs do Educador Financeiro
  for (const faqData of educadorFAQs) {
    const existing = await payload.find({
      collection: 'faqs',
      where: {
        and: [
          { question: { equals: faqData.question } },
          { category: { equals: faqData.category } },
        ],
      },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      const faq = await payload.create({
        collection: 'faqs',
        data: {
          question: faqData.question,
          answer: [
            {
              type: 'p',
              children: [
                {
                  text: faqData.answer,
                },
              ],
            },
          ],
          category: faqData.category,
          order: faqData.order,
        },
      })
      createdFAQs.push(faq)
      console.log(`✅ FAQ criado: ${faqData.question.substring(0, 50)}...`)
    } else {
      createdFAQs.push(existing.docs[0])
    }
  }

  // Criar FAQs do Evento
  for (const faqData of eventoFAQs) {
    const existing = await payload.find({
      collection: 'faqs',
      where: {
        and: [
          { question: { equals: faqData.question } },
          { category: { equals: faqData.category } },
        ],
      },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      const faq = await payload.create({
        collection: 'faqs',
        data: {
          question: faqData.question,
          answer: [
            {
              type: 'p',
              children: [
                {
                  text: faqData.answer,
                },
              ],
            },
          ],
          category: faqData.category,
          order: faqData.order,
        },
      })
      createdFAQs.push(faq)
      console.log(`✅ FAQ criado: ${faqData.question.substring(0, 50)}...`)
    } else {
      createdFAQs.push(existing.docs[0])
    }
  }

  console.log(`✅ ${createdFAQs.length} FAQs processados`)

  return {
    educadorFAQs: createdFAQs.filter((f) => f.category === 'formacao' || f.category === 'certificacao' || f.category === 'geral'),
    eventoFAQs: createdFAQs.filter((f) => f.category === 'evento'),
    allFAQs: createdFAQs,
  }
}
