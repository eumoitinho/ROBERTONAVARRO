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
    current: 'mentor-milionario'
  },
  title: 'Mentor Milionário',
  description: 'Descubra os segredos dos milionários e aprenda a construir riqueza duradoura.',
  hero: {
    title: 'Mentor Milionário',
    subtitle: 'Descubra os segredos dos milionários e aprenda a construir riqueza duradoura',
    description: 'Um evento exclusivo onde você aprenderá as estratégias reais usadas pelos milionários para construir e manter sua riqueza.',
    ctaText: 'Garanta sua vaga',
    ctaHref: '#tickets',
  },
  eventDetails: {
    date: '2024-04-20',
    time: '19:00',
    duration: '4 horas',
    location: 'Rio de Janeiro - RJ',
    format: 'Presencial'
  },
  agenda: [
    {
      time: '19:00',
      title: 'Credenciamento',
      description: 'Recepção e welcome coffee'
    },
    {
      time: '19:30',
      title: 'Abertura: O Mindset Milionário',
      description: 'Como pensam e agem os milionários'
    },
    {
      time: '20:00',
      title: 'Construindo Riqueza Passiva',
      description: 'Estratégias para gerar renda sem trabalhar'
    },
    {
      time: '20:30',
      title: 'Intervalo',
      description: 'Networking e coffee break'
    },
    {
      time: '20:45',
      title: 'Investimentos dos Ricos',
      description: 'Onde e como os milionários investem'
    },
    {
      time: '21:30',
      title: 'Proteção de Patrimônio',
      description: 'Como preservar e proteger sua riqueza'
    },
    {
      time: '22:15',
      title: 'Encerramento',
      description: 'Plano de ação para sua jornada milionária'
    }
  ],
  methodology: {
    title: 'Metodologia Mentor Milionário',
    description: 'O sistema completo para construir riqueza duradoura',
    steps: [
      {
        title: 'Mindset Milionário',
        description: 'Transforme sua mentalidade sobre dinheiro'
      },
      {
        title: 'Estratégias de Acumulação',
        description: 'Como acumular riqueza de forma eficiente'
      },
      {
        title: 'Renda Passiva',
        description: 'Construa fontes de renda que trabalham para você'
      },
      {
        title: 'Preservação de Patrimônio',
        description: 'Proteja e multiplique sua riqueza'
      }
    ]
  },
  tickets: [
    {
      name: 'Ingresso Individual',
      price: 297,
      originalPrice: 397,
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
      name: 'VIP Experience',
      price: 697,
      originalPrice: 897,
      description: 'Experiência VIP com mentoria exclusiva',
      features: [
        'Acesso VIP ao evento',
        'Mentoria individual de 1 hora',
        'Material digital premium',
        'Jantar exclusivo com o mentor',
        'Acesso vitalício ao grupo VIP'
      ],
      isPopular: true
    }
  ],
  testimonials: [
    {
      name: 'Roberto Santos',
      role: 'Investidor',
      quote: 'Depois deste evento, mudei completamente minha estratégia de investimentos.',
      rating: 5,
    },
    {
      name: 'Mariana Lima',
      role: 'Empresária',
      quote: 'As estratégias apresentadas me ajudaram a construir minha primeira renda passiva.',
      rating: 5,
    }
  ],
  seo: {
    metaTitle: 'Mentor Milionário - Descubra os segredos dos milionários',
    metaDescription: 'Aprenda as estratégias reais usadas pelos milionários para construir e manter riqueza duradoura.',
    keywords: ['mentor milionário', 'riqueza', 'investimentos', 'renda passiva', 'patrimônio'],
  }
};

async function populateEvent() {
  try {
    console.log('🚀 Populando evento "Mentor Milionário"...');
    
    const result = await client.create(eventData);
    console.log('✅ Evento criado com sucesso!');
    console.log('📄 ID:', result._id);
    console.log('🔗 Slug:', result.slug.current);
    
  } catch (error) {
    console.error('❌ Erro ao popular evento:', error);
  }
}

populateEvent();
