const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const crencasDaRiquezaData = {
  _type: 'eventPage',
  _id: 'event-crencas-da-riqueza',
  title: 'Crenças da Riqueza',
  slug: {
    _type: 'slug',
    current: 'crencas-da-riqueza',
  },
  status: 'published',

  // Hero Section
  hero: {
    badge: 'EVENTO PRESENCIAL',
    title: 'CRENÇAS DA RIQUEZA',
    subtitle: 'DESCUBRA OS 4 PILARES QUE VÃO TRANSFORMAR SUA MENTALIDADE FINANCEIRA',
    description: 'Um dia inteiro de imersão profunda nas 4 inteligências que separam quem sonha de quem conquista: Emocional, Financeira, Espiritual e Empresarial.',
    ctaText: 'QUERO PARTICIPAR',
    ctaLink: '#inscricao',
    eventInfo: {
      date: '10 de Setembro de 2025',
      location: 'Belo Horizonte - MG',
      duration: '10 horas de imersão',
    },
  },

  // Desafios
  challenges: {
    badge: 'VOCÊ SE IDENTIFICA?',
    title: 'Identifique os Bloqueios que Impedem seu Crescimento',
    description: 'Se você se reconhece em pelo menos um desses desafios, este evento foi feito para você.',
    items: [
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
  },

  // Conteúdo Principal - 4 Inteligências
  mainContent: {
    badge: 'O QUE VOCÊ VAI APRENDER',
    title: 'As 4 Inteligências que Definem sua Prosperidade',
    description: 'Cada pilar representa uma área crucial do seu desenvolvimento. Dominar os 4 é o segredo para resultados extraordinários.',
    items: [
      {
        title: 'Inteligência Emocional',
        description: 'Domine suas emoções financeiras e desenvolva autocontrole para tomar decisões racionais mesmo sob pressão. Aprenda a transformar medo em coragem e ansiedade em ação estratégica.',
        benefits: [
          'Controle emocional em decisões financeiras',
          'Técnicas para vencer o medo de investir',
          'Autoconfiança para negociar e empreender',
          'Resiliência diante de perdas e fracassos',
          'Disciplina para manter o foco nos objetivos',
        ],
      },
      {
        title: 'Inteligência Financeira',
        description: 'Desenvolva uma mentalidade de abundância e aprenda as regras fundamentais do dinheiro. Desde o controle de gastos até estratégias de multiplicação de patrimônio.',
        benefits: [
          'Planejamento financeiro pessoal eficiente',
          'Estratégias de investimento para iniciantes',
          'Como criar múltiplas fontes de renda',
          'Gestão inteligente de dívidas e crédito',
          'Mentalidade de abundância vs escassez',
        ],
      },
      {
        title: 'Inteligência Espiritual',
        description: 'Alinhe seus valores pessoais com seus objetivos financeiros. Descubra seu propósito de vida e como a prosperidade pode servir a algo maior que você mesmo.',
        benefits: [
          'Conexão entre propósito e prosperidade',
          'Valores que sustentam o sucesso duradouro',
          'Equilíbrio entre ter e ser',
          'Generosidade como ferramenta de crescimento',
          'Paz interior independente das circunstâncias',
        ],
      },
      {
        title: 'Inteligência Empresarial',
        description: 'Pense como um empreendedor de sucesso. Desenvolva visão estratégica, capacidade de identificar oportunidades e habilidades de liderança para escalar seus resultados.',
        benefits: [
          'Mindset empreendedor e visão de oportunidades',
          'Estratégias para escalar negócios',
          'Liderança e formação de equipes',
          'Networking estratégico e parcerias',
          'Inovação e adaptação a mudanças',
        ],
      },
    ],
  },

  // Destaques do Evento
  highlights: {
    badge: 'DIFERENCIAIS',
    title: 'Por Que Este Evento é Diferente',
    items: [
      {
        title: 'Imersão Completa',
        description: '10 horas de conteúdo transformador em um único dia',
        icon: 'zap',
      },
      {
        title: 'Material Exclusivo',
        description: 'Apostila digital e recursos para implementação imediata',
        icon: 'file-text',
      },
      {
        title: 'Networking Qualificado',
        description: 'Conexão com outros profissionais e empreendedores',
        icon: 'users',
      },
      {
        title: 'Certificado',
        description: 'Documento oficial de participação no evento',
        icon: 'award',
      },
    ],
  },

  // Metodologia
  methodology: {
    badge: 'METODOLOGIA',
    title: 'Como Funciona o Evento',
    description: 'Um processo estruturado para garantir sua transformação',
    steps: [
      {
        number: '01',
        title: 'Diagnóstico',
        description: 'Identificação das crenças limitantes que bloqueiam seu crescimento',
      },
      {
        number: '02',
        title: 'Reprogramação',
        description: 'Técnicas práticas para substituir crenças limitantes por empoderadoras',
      },
      {
        number: '03',
        title: 'Estratégia',
        description: 'Plano de ação personalizado para aplicar no seu contexto',
      },
      {
        number: '04',
        title: 'Implementação',
        description: 'Ferramentas e recursos para colocar em prática imediatamente',
      },
    ],
  },

  // Bônus
  bonuses: {
    badge: 'BÔNUS EXCLUSIVOS',
    title: 'O Que Você Vai Receber',
    items: [
      {
        title: 'Apostila Digital Completa',
        description: 'Material de apoio com exercícios práticos e ferramentas',
        value: 'R$ 497',
        icon: 'book',
      },
      {
        title: 'Grupo VIP no WhatsApp',
        description: 'Acesso a comunidade exclusiva de participantes',
        value: 'R$ 297',
        icon: 'users',
      },
      {
        title: 'Certificado de Participação',
        description: 'Documento oficial reconhecendo sua presença',
        value: 'R$ 197',
        icon: 'award',
      },
      {
        title: 'Planilha de Planejamento Financeiro',
        description: 'Ferramenta Excel completa para organizar suas finanças',
        value: 'R$ 197',
        icon: 'file-text',
      },
    ],
  },

  // Ingressos
  pricing: {
    badge: 'INGRESSOS',
    title: 'Escolha seu Ingresso',
    description: 'Vagas limitadas para garantir a qualidade da experiência',
    tickets: [
      {
        name: 'INDIVIDUAL',
        price: 'R$ 497',
        description: 'Perfeito para quem quer investir em si mesmo',
        features: [
          'Acesso ao evento completo',
          'Material didático digital',
          'Certificado de participação',
          'Coffee break incluído',
          'Grupo VIP WhatsApp',
        ],
        highlighted: false,
        ctaText: 'GARANTIR VAGA',
        ctaLink: '#inscricao',
      },
      {
        name: 'PREMIUM',
        price: 'R$ 797',
        description: 'Experiência completa + mentoria exclusiva',
        features: [
          'Tudo do plano Individual',
          '1 sessão de mentoria individual (1h)',
          'Acesso antecipado ao material',
          'Kit de boas-vindas físico',
          'Assento preferencial',
        ],
        highlighted: true,
        ctaText: 'QUERO PREMIUM',
        ctaLink: '#inscricao',
      },
      {
        name: 'EMPRESAS',
        price: 'Sob Consulta',
        description: 'Para equipes e empresas (mínimo 5 pessoas)',
        features: [
          'Desconto progressivo por pessoa',
          'Treinamento in-company disponível',
          'Material personalizado',
          'Certificados corporativos',
          'Consultoria pós-evento',
        ],
        highlighted: false,
        ctaText: 'FALAR COM CONSULTOR',
        ctaLink: '#contato',
      },
    ],
  },

  // Depoimentos
  testimonials: {
    badge: 'DEPOIMENTOS',
    title: 'O Que Dizem Nossos Participantes',
    description: 'Histórias reais de transformação de quem já participou',
    items: [
      {
        name: 'Ana Souza',
        role: 'Empresária',
        quote: 'Eu estava completamente endividada, sem esperança de sair do vermelho. O método do Roberto me ajudou a organizar minhas finanças, quitar dívidas e voltar a sonhar. Hoje tenho controle e paz financeira!',
        rating: 5,
      },
      {
        name: 'José Lima',
        role: 'Professor',
        quote: 'Sempre achei impossível sair das dívidas do cartão. Com as orientações do Roberto, consegui renegociar tudo, criar uma reserva e até investir. Minha vida mudou completamente.',
        rating: 5,
      },
      {
        name: 'Patrícia Gomes',
        role: 'Autônoma',
        quote: 'O Roberto me mostrou que é possível recomeçar. Saí do sufoco das dívidas, aprendi a gastar com consciência e hoje ajudo minha família a ter uma vida mais tranquila.',
        rating: 5,
      },
    ],
  },

  // FAQ
  faq: {
    badge: 'DÚVIDAS FREQUENTES',
    title: 'Perguntas e Respostas',
    items: [
      {
        question: 'Qual é a duração do evento?',
        answer: 'O evento tem duração de 10 horas, das 8h às 18h, com intervalos para coffee break e almoço.',
      },
      {
        question: 'Preciso ter conhecimento prévio?',
        answer: 'Não! O evento foi desenhado para pessoas de todos os níveis, desde iniciantes até quem já tem experiência.',
      },
      {
        question: 'O evento é online ou presencial?',
        answer: 'Este é um evento 100% presencial em Belo Horizonte - MG, para garantir a melhor experiência de aprendizado.',
      },
      {
        question: 'Posso levar acompanhante?',
        answer: 'Cada participante precisa de um ingresso individual. Oferecemos desconto para grupos a partir de 3 pessoas.',
      },
      {
        question: 'Tem certificado?',
        answer: 'Sim! Todos os participantes recebem certificado digital de participação ao final do evento.',
      },
      {
        question: 'Tem estacionamento no local?',
        answer: 'Sim, o local conta com estacionamento próprio para os participantes.',
      },
    ],
  },

  // Localização
  location: {
    show: true,
    title: 'Onde Será o Evento',
    address: 'Rua da Bahia, 1148 - Centro',
    city: 'Belo Horizonte',
    state: 'MG',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.733889379698!2d-43.95082732447524!3d-19.939468681437743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699f5d3d0a00d%3A0x7dcfd6e5ed69c5e6!2sRua%20da%20Bahia%2C%201148%20-%20Centro%2C%20Belo%20Horizonte%20-%20MG!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr',
  },

  // CTA Final
  finalCta: {
    title: 'Está Pronto para Transformar sua Mentalidade?',
    description: 'Não deixe para depois. As vagas são limitadas e este pode ser o primeiro passo para a vida financeira que você sempre sonhou.',
    buttonText: 'GARANTIR MINHA VAGA AGORA',
    buttonLink: '#inscricao',
  },

  // SEO
  seo: {
    metaTitle: 'Crenças da Riqueza - Evento Presencial | Roberto Navarro',
    metaDescription: 'Descubra as 4 inteligências que transformam mentalidade financeira: Emocional, Financeira, Espiritual e Empresarial. 10 horas de imersão em BH.',
    keywords: [
      'crenças da riqueza',
      'evento presencial bh',
      'roberto navarro',
      'mentalidade financeira',
      'inteligência emocional',
      'inteligência financeira',
      'desenvolvimento pessoal',
      'educação financeira',
    ],
  },

  // Controles
  controls: {
    showChallenges: true,
    showMainContent: true,
    showHighlights: true,
    showMethodology: true,
    showBonuses: true,
    showPricing: true,
    showTestimonials: true,
    showFaq: true,
    showLocation: true,
  },
};

async function populateCrencasDaRiqueza() {
  try {
    console.log('🚀 Populando "Crenças da Riqueza" no Sanity...\n');

    // Verificar se já existe
    const existing = await client.fetch(`*[_type == "eventPage" && slug.current == "crencas-da-riqueza"][0]`);

    if (existing) {
      console.log('⚠️  Evento já existe!');
      console.log(`   ID: ${existing._id}`);
      console.log(`   Título: ${existing.title}\n`);
      console.log('💾 Atualizando...\n');

      const result = await client
        .patch(existing._id)
        .set(crencasDaRiquezaData)
        .commit();

      console.log('✅ Evento atualizado com sucesso!');
      console.log(`   ID: ${result._id}\n`);
    } else {
      console.log('💾 Criando novo evento...\n');

      const result = await client.create(crencasDaRiquezaData);

      console.log('✅ Evento criado com sucesso!');
      console.log(`   ID: ${result._id}\n`);
    }

    console.log('📊 Estatísticas:');
    console.log(`   - Hero: ✅`);
    console.log(`   - ${crencasDaRiquezaData.challenges.items.length} Desafios: ✅`);
    console.log(`   - ${crencasDaRiquezaData.mainContent.items.length} Inteligências: ✅`);
    console.log(`   - ${crencasDaRiquezaData.highlights.items.length} Destaques: ✅`);
    console.log(`   - ${crencasDaRiquezaData.methodology.steps.length} Passos da Metodologia: ✅`);
    console.log(`   - ${crencasDaRiquezaData.bonuses.items.length} Bônus: ✅`);
    console.log(`   - ${crencasDaRiquezaData.pricing.tickets.length} Tipos de Ingresso: ✅`);
    console.log(`   - ${crencasDaRiquezaData.testimonials.items.length} Depoimentos: ✅`);
    console.log(`   - ${crencasDaRiquezaData.faq.items.length} Perguntas FAQ: ✅`);
    console.log(`   - Localização: ✅`);
    console.log(`   - SEO: ✅\n`);

    console.log('🎉 Pronto! Acesse o Studio para ver:');
    console.log('   http://localhost:3000/studio\n');
    console.log('📄 Ou acesse a página:');
    console.log('   http://localhost:3000/eventos/crencas-da-riqueza\n');

  } catch (error) {
    console.error('\n❌ Erro ao popular evento:');
    console.error(error.message);
    process.exit(1);
  }
}

populateCrencasDaRiqueza();

