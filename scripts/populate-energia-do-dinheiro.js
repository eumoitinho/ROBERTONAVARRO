const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function populateEnergiaDoDinheiro() {
  try {
    console.log('🚀 Iniciando população do evento "Energia do Dinheiro"...\n');

    // Dados do evento "Energia do Dinheiro"
    const eventData = {
      _type: 'eventPage',
      _id: 'event-energia-do-dinheiro',
      slug: {
        _type: 'slug',
        current: 'energia-do-dinheiro'
      },
      title: 'Energia do Dinheiro',
      status: 'published',
      
      // Hero Section
      hero: {
        title: 'ENERGIA DO DINHEIRO',
        subtitle: 'Desbloqueie a energia do dinheiro e transforme sua realidade',
        description: 'Alinhe sua energia com a prosperidade e conquiste abundância real na vida e nos negócios. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade.',
        backgroundImage: '/images/HERO_ENERGIA.png',
        date: '07 de Outubro - Das 13h às 20h',
        location: 'São Paulo - SP',
        duration: '7 horas',
        ctaText: 'GARANTA SUA VAGA!',
        ctaLink: '#inscricao'
      },

      // Desafios
      challenges: {
        badge: 'QUAIS BLOQUEIOS TE AFASTAM DA RIQUEZA',
        title: 'Descubra os sabotadores invisíveis que drenam sua energia financeira',
        description: 'Aprenda a identificar e eliminar os bloqueios que impedem o fluxo de abundância em sua vida.',
        items: [
          {
            question: 'Você trabalha muito, mas nunca sobra dinheiro?',
            answer: 'Aprenda como sair do ciclo de escassez ativando a verdadeira energia da abundância.'
          },
          {
            question: 'Você sente que nasceu para prosperar, mas algo te trava?',
            answer: 'Descubra os sabotadores invisíveis que drenam sua energia financeira e como se libertar deles.'
          },
          {
            question: 'Você sente culpa ou medo ao falar de dinheiro?',
            answer: 'Reprograme sua relação emocional com o dinheiro e viva a leveza da prosperidade.'
          },
          {
            question: 'Você acredita que ganhar dinheiro exige sacrifício?',
            answer: 'Entenda como alinhar prazer e propósito para que o dinheiro flua com naturalidade.'
          }
        ]
      },

      // Conteúdo Principal
      mainContent: {
        badge: 'DESPERTAR DE CONSCIÊNCIA',
        title: 'Mais do que uma mentoria, um despertar de consciência',
        description: 'No dia 07 de outubro, das 13h às 20h, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia.',
        items: [
          {
            title: 'Qual o efeito do dinheiro em sua vida',
            description: 'Entenda como o dinheiro impacta sua energia, relacionamentos e bem-estar geral.',
            benefits: [
              'Identifique padrões comportamentais',
              'Reconheça crenças limitantes',
              'Desenvolva consciência financeira'
            ]
          },
          {
            title: 'Como o seu estado emocional impacta sua conta bancária',
            description: 'Descubra a conexão direta entre suas emoções e sua realidade financeira.',
            benefits: [
              'Controle emocional financeiro',
              'Equilíbrio mental e prosperidade',
              'Estabilidade emocional nos negócios'
            ]
          },
          {
            title: 'Quem está influenciando sua visão sobre dinheiro',
            description: 'Aprenda a identificar influências externas e retome o controle da sua mentalidade financeira.',
            benefits: [
              'Autonomia financeira',
              'Decisões conscientes',
              'Liberdade de pensamento'
            ]
          },
          {
            title: 'O papel da ambiência na construção da riqueza',
            description: 'Entenda como criar o ambiente ideal para manifestar abundância e prosperidade.',
            benefits: [
              'Ambiente propício ao sucesso',
              'Energia positiva nos negócios',
              'Atmosfera de prosperidade'
            ]
          }
        ]
      },

      // Destaques
      highlights: {
        badge: 'DIFERENCIAIS DO EVENTO',
        title: 'O que torna este evento único',
        items: [
          {
            title: 'Vivências Profundas',
            description: 'Não apenas teoria, mas experiências transformadoras'
          },
          {
            title: 'Desbloqueio de Crenças',
            description: 'Identifique e elimine padrões limitantes'
          },
          {
            title: 'Ativação da Prosperidade',
            description: 'Ative sua força interna para atrair abundância'
          },
          {
            title: 'Energia Sexual e Prosperidade',
            description: 'Descubra a conexão oculta entre energia e riqueza'
          }
        ]
      },

      // Metodologia
      methodology: {
        badge: 'METODOLOGIA',
        title: 'Como funciona o evento',
        description: 'Uma jornada estruturada de transformação e despertar.',
        steps: [
          {
            step: 1,
            title: 'Diagnóstico Energético',
            description: 'Identifique seus bloqueios e padrões limitantes'
          },
          {
            step: 2,
            title: 'Desprogramação',
            description: 'Elimine crenças sabotadoras sobre dinheiro'
          },
          {
            step: 3,
            title: 'Reprogramação',
            description: 'Instale novas crenças de abundância e prosperidade'
          },
          {
            step: 4,
            title: 'Ativação',
            description: 'Ative sua energia interna para manifestar riqueza'
          }
        ]
      },

      // Bônus
      bonuses: {
        badge: 'BÔNUS EXCLUSIVOS',
        title: 'Valor adicional que você recebe',
        items: [
          {
            title: 'Acesso ao Grupo VIP',
            value: 'R$ 497',
            description: 'Comunidade exclusiva com suporte contínuo'
          },
          {
            title: 'Meditação da Prosperidade',
            value: 'R$ 297',
            description: 'Áudio guiado para ativar energia da abundância'
          },
          {
            title: 'Planilha de Diagnóstico',
            value: 'R$ 197',
            description: 'Ferramenta para identificar bloqueios financeiros'
          },
          {
            title: 'Sessão de Follow-up',
            value: 'R$ 697',
            description: 'Acompanhamento individual pós-evento'
          }
        ]
      },

      // Ingressos
      pricing: {
        badge: 'INGRESSOS',
        title: 'Escolha sua modalidade',
        description: 'Valores especiais para participantes do evento.',
        tickets: [
          {
            name: 'Presencial',
            price: 'R$ 497',
            description: 'Acesso completo ao evento presencial',
            highlighted: true,
            features: [
              'Acesso completo ao evento',
              'Material exclusivo',
              'Coffee break incluso',
              'Certificado digital',
              'Acesso ao grupo VIP',
              'Todos os bônus'
            ],
            ctaText: 'GARANTIR VAGA',
            ctaLink: '#inscricao'
          },
          {
            name: 'Online',
            price: 'R$ 297',
            description: 'Transmissão ao vivo do evento',
            highlighted: false,
            features: [
              'Transmissão ao vivo',
              'Material exclusivo',
              'Certificado digital',
              'Acesso ao grupo VIP',
              'Todos os bônus'
            ],
            ctaText: 'ASSISTIR ONLINE',
            ctaLink: '#inscricao'
          },
          {
            name: 'VIP',
            price: 'R$ 997',
            description: 'Experiência premium completa',
            highlighted: false,
            features: [
              'Acesso presencial premium',
              'Material exclusivo físico',
              'Coffee break premium',
              'Certificado físico',
              'Acesso ao grupo VIP',
              'Sessão individual com Roberto',
              'Todos os bônus',
              'Kit exclusivo'
            ],
            ctaText: 'EXPERIÊNCIA VIP',
            ctaLink: '#inscricao'
          }
        ]
      },

      // Depoimentos
      testimonials: {
        badge: 'DEPOIMENTOS',
        title: 'O que dizem quem já participou',
        description: 'Transformações reais de pessoas reais.',
        items: [
          {
            name: 'Maria Silva',
            role: 'Empreendedora',
            quote: 'O evento mudou completamente minha relação com o dinheiro. Agora sinto que a abundância flui naturalmente em minha vida.',
            rating: 5,
            image: null
          },
          {
            name: 'João Santos',
            role: 'Executivo',
            quote: 'Descobri bloqueios que nem sabia que tinha. A metodologia é incrível e os resultados são imediatos.',
            rating: 5,
            image: null
          },
          {
            name: 'Ana Costa',
            role: 'Coach',
            quote: 'A conexão entre energia e prosperidade ficou clara para mim. Recomendo para todos que querem prosperar.',
            rating: 5,
            image: null
          }
        ]
      },

      // FAQ
      faq: {
        badge: 'PERGUNTAS FREQUENTES',
        title: 'Tire suas dúvidas',
        items: [
          {
            question: 'O evento é presencial ou online?',
            answer: 'Oferecemos ambas as modalidades: presencial em São Paulo e transmissão online ao vivo.'
          },
          {
            question: 'Preciso ter conhecimento prévio?',
            answer: 'Não! O evento é adequado para todos os níveis, desde iniciantes até pessoas experientes.'
          },
          {
            question: 'Há material de apoio?',
            answer: 'Sim! Todos os participantes recebem material exclusivo e acesso ao grupo VIP.'
          },
          {
            question: 'Posso cancelar minha inscrição?',
            answer: 'Sim, você tem 7 dias para cancelar após a compra com reembolso total.'
          },
          {
            question: 'O evento é certificado?',
            answer: 'Sim! Todos os participantes recebem certificado digital de participação.'
          },
          {
            question: 'Há coffee break incluso?',
            answer: 'Sim, para participantes presenciais. O coffee break está incluso no valor.'
          }
        ]
      },

      // Localização
      location: {
        title: 'Local do Evento',
        address: 'São Paulo - SP',
        description: 'Local a ser confirmado via e-mail após inscrição.',
        mapEmbed: null
      },

      // CTA Final
      finalCta: {
        title: 'GARANTA SUA VAGA NO ENERGIA DO DINHEIRO',
        description: 'Não perca esta oportunidade única de transformar sua relação com o dinheiro e desbloquear sua energia da prosperidade.',
        buttonText: 'GARANTIR MINHA VAGA AGORA!',
        buttonLink: '#inscricao'
      },

      // SEO
      seo: {
        metaTitle: 'Energia do Dinheiro - Evento com Roberto Navarro | Desbloqueie sua Prosperidade',
        metaDescription: 'Participe do evento Energia do Dinheiro e aprenda a desbloquear sua energia da prosperidade. Transforme sua relação com o dinheiro e conquiste abundância real.',
        keywords: ['energia do dinheiro', 'prosperidade', 'roberto navarro', 'abundância', 'evento financeiro', 'mentalidade financeira']
      },

      // Controles de Seção
      controls: {
        showChallenges: true,
        showMainContent: true,
        showHighlights: true,
        showMethodology: true,
        showBonuses: true,
        showPricing: true,
        showTestimonials: true,
        showFaq: true,
        showLocation: true
      }
    };

    // Criar o documento
    const result = await client.createOrReplace(eventData);
    
    console.log('✅ Evento "Energia do Dinheiro" criado/atualizado com sucesso!');
    console.log(`📄 Document ID: ${result._id}`);
    console.log(`🔗 Slug: ${result.slug?.current}`);
    console.log(`📊 Status: ${result.status}`);
    console.log('\n🎯 Próximos passos:');
    console.log('1. Acesse o Sanity Studio: npm run studio');
    console.log('2. Vá em "Páginas de Eventos"');
    console.log('3. Edite o evento "Energia do Dinheiro"');
    console.log('4. Publish as mudanças');
    console.log('\n🌐 Acesse o evento em: /eventos/energia-do-dinheiro');

  } catch (error) {
    console.error('❌ Erro ao popular evento:', error.message);
    if (error.response) {
      console.error('📄 Detalhes:', error.response.body);
    }
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  populateEnergiaDoDinheiro();
}

module.exports = populateEnergiaDoDinheiro;
