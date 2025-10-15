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
    current: 'escalador-de-negocios'
  },
  title: 'Escalador de Negócios',
  description: 'Transforme seu negócio em uma máquina de crescimento e lucratividade.',
  hero: {
    title: 'Escalador de Negócios',
    subtitle: 'Transforme seu negócio em uma máquina de crescimento e lucratividade',
    description: 'Aprenda as estratégias mais eficazes para escalar seu negócio de forma sustentável e lucrativa.',
    ctaText: 'Garanta sua vaga',
    ctaHref: '#tickets',
  },
  eventDetails: {
    date: '2024-03-15',
    time: '19:00',
    duration: '3 horas',
    location: 'São Paulo - SP',
    format: 'Presencial'
  },
  agenda: [
    {
      time: '19:00',
      title: 'Credenciamento e Welcome Coffee',
      description: 'Recepção dos participantes'
    },
    {
      time: '19:30',
      title: 'Abertura: O que é escalar um negócio?',
      description: 'Conceitos fundamentais e mindset do escalador'
    },
    {
      time: '20:00',
      title: 'Pilares da Escalabilidade',
      description: 'Os 5 pilares essenciais para crescer de forma sustentável'
    },
    {
      time: '20:30',
      title: 'Intervalo',
      description: 'Coffee break e networking'
    },
    {
      time: '20:45',
      title: 'Estratégias de Crescimento',
      description: 'Táticas práticas para acelerar o crescimento'
    },
    {
      time: '21:30',
      title: 'Sistemas e Processos',
      description: 'Como criar sistemas que funcionam sem você'
    },
    {
      time: '22:00',
      title: 'Encerramento e Próximos Passos',
      description: 'Plano de ação para implementar no seu negócio'
    }
  ],
  methodology: {
    title: 'Metodologia Escalador de Negócios',
    description: 'Uma abordagem sistemática para escalar qualquer negócio',
    steps: [
      {
        title: 'Diagnóstico Completo',
        description: 'Análise profunda do seu negócio atual'
      },
      {
        title: 'Estratégia de Crescimento',
        description: 'Definição do caminho ideal para escalar'
      },
      {
        title: 'Implementação Prática',
        description: 'Execução das estratégias com acompanhamento'
      },
      {
        title: 'Otimização Contínua',
        description: 'Melhoria constante dos resultados'
      }
    ]
  },
  tickets: [
    {
      name: 'Ingresso Individual',
      price: 197,
      originalPrice: 297,
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
      name: 'Pacote Empresarial',
      price: 497,
      originalPrice: 697,
      description: 'Para equipes de até 5 pessoas',
      features: [
        '5 ingressos para o evento',
        'Material digital exclusivo',
        'Coffee break para toda equipe',
        'Sessão de networking exclusiva',
        'Consultoria de 30 minutos'
      ],
      isPopular: true
    }
  ],
  testimonials: [
    {
      name: 'Carlos Silva',
      role: 'CEO, TechCorp',
      quote: 'As estratégias apresentadas transformaram completamente minha visão sobre escalabilidade.',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      role: 'Empreendedora',
      quote: 'Implementei as técnicas e meu negócio cresceu 300% em 6 meses.',
      rating: 5,
    }
  ],
  seo: {
    metaTitle: 'Escalador de Negócios - Transforme seu negócio em uma máquina de crescimento',
    metaDescription: 'Aprenda as estratégias mais eficazes para escalar seu negócio de forma sustentável e lucrativa.',
    keywords: ['escalar negócio', 'crescimento empresarial', 'estratégias de negócio', 'empreendedorismo'],
  }
};

async function populateEvent() {
  try {
    console.log('🚀 Populando evento "Escalador de Negócios"...');
    
    const result = await client.create(eventData);
    console.log('✅ Evento criado com sucesso!');
    console.log('📄 ID:', result._id);
    console.log('🔗 Slug:', result.slug.current);
    
  } catch (error) {
    console.error('❌ Erro ao popular evento:', error);
  }
}

populateEvent();
