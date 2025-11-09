export async function seedFAQs(payload: any) {
  const faq1 = await payload.create({
    collection: 'faqs',
    data: {
      question: 'A certificação é reconhecida pelo MEC?',
      answer: 'Sim! Nossa certificação de Educador Financeiro é reconhecida pelo MEC através de parceria com instituição de ensino credenciada, sendo válida em todo território nacional.',
      category: 'certificacao',
      order: 1,
    },
  })

  const faq2 = await payload.create({
    collection: 'faqs',
    data: {
      question: 'Quanto tempo dura a formação?',
      answer: 'A formação tem duração de 6 meses, com aulas ao vivo semanais e conteúdo em plataforma EAD disponível 24/7.',
      category: 'formacao',
      order: 2,
    },
  })

  const faq3 = await payload.create({
    collection: 'faqs',
    data: {
      question: 'Posso parcelar o investimento?',
      answer: 'Sim! Oferecemos parcelamento em até 12x no cartão de crédito, com condições especiais para pagamento à vista.',
      category: 'pagamento',
      order: 3,
    },
  })

  const faq4 = await payload.create({
    collection: 'faqs',
    data: {
      question: 'Tem garantia?',
      answer: 'Sim! Oferecemos garantia incondicional de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu investimento.',
      category: 'geral',
      order: 4,
    },
  })

  const faq5 = await payload.create({
    collection: 'faqs',
    data: {
      question: 'Preciso de experiência prévia?',
      answer: 'Não! Nossa formação foi desenvolvida para atender tanto iniciantes quanto profissionais que já atuam na área e querem se especializar.',
      category: 'formacao',
      order: 5,
    },
  })

  console.log('✅ FAQs criados')

  return {
    faq1,
    faq2,
    faq3,
    faq4,
    faq5,
  }
}
