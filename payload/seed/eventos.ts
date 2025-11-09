export async function seedEventos(payload: any) {
  const crencasDaRiqueza = await payload.create({
    collection: 'eventos',
    data: {
      title: 'Crenças da Riqueza',
      slug: 'crencas-da-riqueza',
      status: 'published',
      accentColor: '#FFD700',
      date: '2025-09-13T10:00:00.000Z',
      duration: '7 horas intensivas',
      location: {
        type: 'presencial',
        venue: 'Hotel Maksoud Plaza',
        address: 'Alameda Campinas, 150',
        city: 'São Paulo',
        state: 'SP',
      },
      hero: {
        badge: 'EVENTO PRESENCIAL',
        title: 'CRENÇAS DA RIQUEZA',
        subtitle: 'Transforme suas crenças sobre dinheiro e desb loqueie seu potencial de riqueza',
      },
      countdown: {
        enabled: true,
        targetDate: '2025-09-13T10:00:00.000Z',
      },
      learnings: [
        { text: 'Como identificar e transformar crenças limitantes sobre dinheiro' },
        { text: 'Os 7 pilares da mentalidade de riqueza' },
        { text: 'Técnicas de reprogramação mental para abundância' },
        { text: 'Como atrair e manter a riqueza em sua vida' },
      ],
      tickets: [
        {
          name: 'Ingresso Gratuito',
          type: 'free',
          price: 0,
          description: 'Acesso ao evento presencial',
          benefits: [
            { text: 'Participação no evento de 7 horas' },
            { text: 'Material de apoio digital' },
            { text: 'Certificado de participação' },
          ],
          link: 'https://pay.eduzz.com/crencas-da-riqueza-free',
          available: true,
        },
        {
          name: 'VIP Experience',
          type: 'vip',
          price: 497,
          originalPrice: 997,
          description: 'Experiência completa com benefícios exclusivos',
          benefits: [
            { text: 'Tudo do ingresso gratuito' },
            { text: 'Assentos nas primeiras filas' },
            { text: 'Coffee break premium' },
            { text: 'Kit de boas-vindas exclusivo' },
            { text: 'Acesso a networking VIP' },
            { text: 'Mentoria em grupo pós-evento' },
          ],
          link: 'https://pay.eduzz.com/crencas-da-riqueza-vip',
          available: true,
        },
      ],
      seo: {
        title: 'Crenças da Riqueza - Evento Presencial | Roberto Navarro',
        description: 'Transforme suas crenças sobre dinheiro em um evento presencial de 7 horas. Vagas limitadas!',
        keywords: 'crenças da riqueza, mentalidade de riqueza, evento financeiro, roberto navarro',
      },
    },
  })

  console.log('✅ Evento Crenças da Riqueza criado')

  const energiaDoDinheiro = await payload.create({
    collection: 'eventos',
    data: {
      title: 'Energia do Dinheiro',
      slug: 'energia-do-dinheiro',
      status: 'published',
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
        subtitle: 'Desbloqueie sua energia financeira e atraia prosperidade',
      },
      learnings: [
        { text: 'Como sua energia influencia sua relação com o dinheiro' },
        { text: 'Técnicas de alinhamento energético para abundância' },
        { text: 'Bloqueios financeiros e como superá-los' },
        { text: 'Rituais e práticas para manter a energia da prosperidade' },
      ],
      pricing: {
        price: 197,
        link: 'https://pay.eduzz.com/energia-do-dinheiro',
      },
      seo: {
        title: 'Energia do Dinheiro - Workshop Intensivo | Roberto Navarro',
        description: 'Desbloqueie sua energia financeira e atraia prosperidade em um workshop de 7 horas.',
        keywords: 'energia do dinheiro, prosperidade, abundância financeira',
      },
    },
  })

  console.log('✅ Evento Energia do Dinheiro criado')

  return {
    crencasDaRiqueza,
    energiaDoDinheiro,
  }
}
