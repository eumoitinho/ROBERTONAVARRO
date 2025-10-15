const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skWAAvzokKB69IMln1BX1fFOlKIVEVrjpLV1T8oO8PFGAiafhJLIsAmj6lez1rciKRVZ5OZvJXANnJA6OK3XyP5BeVRiB68ji4YdW6IsaTNn7aoYLKhSxHEgK4nSy6BAdheiOMV8v29gsikB7yE4tbAeLuBuckLPbwxrz0gO7hV8Q4Mn9Sr9',
});

const formationData = {
  _type: 'formationPage',
  slug: {
    current: 'educador-financeiro'
  },
  title: 'Educador Financeiro',
  description: 'Formação completa para se tornar um educador financeiro certificado.',
  hero: {
    title: 'Educador Financeiro',
    subtitle: 'Formação completa para se tornar um educador financeiro certificado',
    description: 'Aprenda as melhores práticas de educação financeira e torne-se um profissional qualificado para ensinar sobre dinheiro.',
    ctaText: 'Começar formação',
    ctaHref: '#inscricao',
  },
  formationDetails: {
    duration: '6 meses',
    format: 'Online',
    level: 'Intermediário',
    certification: 'Certificado de Educador Financeiro',
    startDate: '2024-02-01'
  },
  modules: [
    {
      title: 'Fundamentos da Educação Financeira',
      duration: '4 semanas',
      topics: [
        'História do dinheiro',
        'Psicologia financeira',
        'Matemática financeira básica',
        'Conceitos fundamentais'
      ]
    },
    {
      title: 'Orçamento e Controle Financeiro',
      duration: '4 semanas',
      topics: [
        'Elaboração de orçamento',
        'Controle de gastos',
        'Planilhas financeiras',
        'Metodologias de controle'
      ]
    },
    {
      title: 'Investimentos e Aplicações',
      duration: '6 semanas',
      topics: [
        'Tipos de investimentos',
        'Renda fixa vs variável',
        'Análise de risco',
        'Diversificação de carteira'
      ]
    },
    {
      title: 'Didática e Metodologia',
      duration: '4 semanas',
      topics: [
        'Técnicas de ensino',
        'Planejamento de aulas',
        'Material didático',
        'Avaliação de aprendizagem'
      ]
    }
  ],
  pricing: {
    fullPrice: 2970,
    currentPrice: 1970,
    installments: 12,
    installmentValue: 164.17,
    description: 'Formação completa com certificação'
  },
  benefits: [
    'Certificação reconhecida no mercado',
    'Material didático completo',
    'Suporte durante toda a formação',
    'Acesso vitalício ao conteúdo',
    'Comunidade exclusiva de educadores',
    'Oportunidades de networking'
  ],
  testimonials: [
    {
      name: 'João Silva',
      role: 'Educador Financeiro',
      quote: 'Esta formação mudou minha vida profissional. Hoje sou um educador financeiro reconhecido.',
      rating: 5,
    },
    {
      name: 'Maria Santos',
      role: 'Coach Financeira',
      quote: 'O conteúdo é excepcional e a metodologia muito eficaz para ensinar educação financeira.',
      rating: 5,
    }
  ],
  seo: {
    metaTitle: 'Educador Financeiro - Formação completa com certificação',
    metaDescription: 'Aprenda as melhores práticas de educação financeira e torne-se um profissional qualificado para ensinar sobre dinheiro.',
    keywords: ['educador financeiro', 'educação financeira', 'curso financeiro', 'certificação'],
  }
};

async function populateFormation() {
  try {
    console.log('🚀 Populando formação "Educador Financeiro"...');
    
    const result = await client.create(formationData);
    console.log('✅ Formação criada com sucesso!');
    console.log('📄 ID:', result._id);
    console.log('🔗 Slug:', result.slug.current);
    
  } catch (error) {
    console.error('❌ Erro ao popular formação:', error);
  }
}

populateFormation();
