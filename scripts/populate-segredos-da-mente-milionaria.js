const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skWAAvzokKB69IMln1BX1fFOlKIVEVrjpLV1T8oO8PFGAiafhJLIsAmj6lez1rciKRVZ5OZvJXANnJA6OK3XyP5BeVRiB68ji4YdW6IsaTNn7aoYLKhSxHEgK4nSy6BAdheiOMV8v29gsikB7yE4tbAeLuBuckLPbwxrz0gO7hV8Q4Mn9Sr9',
});

const eventData = {
  _type: 'eventPage',
  slug: {
    current: 'segredos-da-mente-milionaria'
  },
  title: 'Segredos da Mente Milionária',
  description: 'Desvende os padrões mentais que separam os milionários dos demais.',
  hero: {
    title: 'Segredos da Mente Milionária',
    subtitle: 'Desvende os padrões mentais que separam os milionários dos demais',
    description: 'Descubra como reprogramar sua mente para pensar como um milionário e criar a riqueza que você deseja.',
    ctaText: 'Garanta sua vaga',
    ctaHref: '#tickets',
  },
  eventDetails: {
    date: '2024-05-10',
    time: '19:00',
    duration: '3 horas',
    location: 'Brasília - DF',
    format: 'Presencial'
  },
  agenda: [
    {
      time: '19:00',
      title: 'Credenciamento',
      description: 'Recepção dos participantes'
    },
    {
      time: '19:30',
      title: 'Abertura: A Psicologia do Dinheiro',
      description: 'Como sua mente influencia sua relação com o dinheiro'
    },
    {
      time: '20:00',
      title: 'Padrões Mentais dos Milionários',
      description: 'Os 7 padrões mentais que fazem a diferença'
    },
    {
      time: '20:30',
      title: 'Intervalo',
      description: 'Coffee break e networking'
    },
    {
      time: '20:45',
      title: 'Reprogramação Mental',
      description: 'Técnicas para mudar sua mentalidade sobre dinheiro'
    },
    {
      time: '21:30',
      title: 'Visualização e Manifestação',
      description: 'Como usar o poder da mente para criar riqueza'
    },
    {
      time: '22:00',
      title: 'Encerramento',
      description: 'Próximos passos para sua transformação mental'
    }
  ],
  methodology: {
    title: 'Metodologia Mente Milionária',
    description: 'Sistema completo de reprogramação mental para riqueza',
    steps: [
      {
        title: 'Identificação de Limitações',
        description: 'Descubra seus bloqueios mentais sobre dinheiro'
      },
      {
        title: 'Reprogramação de Crenças',
        description: 'Substitua crenças limitantes por mentalidade milionária'
      },
      {
        title: 'Técnicas de Visualização',
        description: 'Use o poder da mente para manifestar riqueza'
      },
      {
        title: 'Manutenção do Mindset',
        description: 'Como manter a mentalidade milionária no dia a dia'
      }
    ]
  },
  tickets: [
    {
      name: 'Ingresso Individual',
      price: 247,
      originalPrice: 347,
      description: 'Acesso completo ao evento',
      features: [
        'Participação no evento completo',
        'Material digital exclusivo',
        'Coffee break',
        'Certificado de participação'
      ],
      isPopular: false
    },
    {
      name: 'Transformação Completa',
      price: 547,
      originalPrice: 747,
      description: 'Pacote completo de transformação mental',
      features: [
        'Acesso ao evento',
        'Sessão de coaching individual',
        'Material digital premium',
        'Acompanhamento por 30 dias',
        'Grupo VIP no WhatsApp'
      ],
      isPopular: true
    }
  ],
  testimonials: [
    {
      name: 'Pedro Oliveira',
      role: 'Coach Financeiro',
      quote: 'Este evento mudou completamente minha relação com o dinheiro.',
      rating: 5,
    },
    {
      name: 'Lucia Fernandes',
      role: 'Empresária',
      quote: 'As técnicas de reprogramação mental transformaram minha vida financeira.',
      rating: 5,
    }
  ],
  seo: {
    metaTitle: 'Segredos da Mente Milionária - Reprograme sua mente para a riqueza',
    metaDescription: 'Descubra como reprogramar sua mente para pensar como um milionário e criar a riqueza que você deseja.',
    keywords: ['mente milionária', 'psicologia do dinheiro', 'reprogramação mental', 'mentalidade rica'],
  }
};

async function populateEvent() {
  try {
    console.log('🚀 Populando evento "Segredos da Mente Milionária"...');
    
    const result = await client.create(eventData);
    console.log('✅ Evento criado com sucesso!');
    console.log('📄 ID:', result._id);
    console.log('🔗 Slug:', result.slug.current);
    
  } catch (error) {
    console.error('❌ Erro ao popular evento:', error);
  }
}

populateEvent();
