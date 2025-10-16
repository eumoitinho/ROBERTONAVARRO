const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Configuração do cliente Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const events = [
  {
    _id: 'event-segredos-da-mente-milionaria-v1',
    _type: 'eventPage',
    title: 'Segredos da Mente Milionária',
    slug: { current: 'segredos-da-mente-milionaria', _type: 'slug' },
    hero: {
      title: 'SEGREDOS DA MENTE MILIONÁRIA',
      subtitle: 'Imersão exclusiva e transformadora',
      secondTitle: 'Em 22 de outubro alcance a liberdade financeira com uma mudança de mentalidade',
      description: 'Aprenda a despertar seu potencial milionário em 7 horas de imersão. Com Roberto e Raíssa Navarro | Alameda Araguaia, 751 - Alphaville',
      ctaText: 'QUERO DESPERTAR MINHA MENTE MILIONÁRIA',
      ctaHref: '#inscricao',
      secondaryCtaText: 'Saiba mais',
      secondaryCtaHref: '#beneficios'
    },
    benefitsSection: {
      badge: 'BENEFÍCIOS DO EVENTO',
      title: 'POR QUE PARTICIPAR DO SEGREDOS DA MENTE MILIONÁRIA',
      benefits: [
        {
          title: 'Segurança financeira',
          description: 'Descubra como criar uma base sólida, com reserva de emergência e planejamento para o futuro.',
          icon: 'wallet'
        },
        {
          title: 'Propósito de vida',
          description: 'Tenha clareza sobre seu propósito de vida e carreira e abra portas para novas oportunidades.',
          icon: 'target'
        },
        {
          title: 'Liberdade financeira',
          description: 'Aprenda a diferença entre sobreviver e viver com liberdade — sem depender de salário ou trabalho ativo.',
          icon: 'zap'
        },
        {
          title: 'Mentalidade milionária',
          description: 'Supere crenças limitantes sobre dinheiro e adote os hábitos, atitudes e estratégias dos que alcançaram a verdadeira riqueza.',
          icon: 'brain'
        },
        {
          title: 'Educação financeira',
          description: 'Por que aprender com quem já chegou lá pode acelerar (e muito!) sua jornada.',
          icon: 'graduation'
        },
        {
          title: 'Networking e inspiração',
          description: 'Conecte-se com pessoas que já transformaram suas vidas e inspire-se com histórias reais.',
          icon: 'users'
        }
      ]
    },
    learningSection: {
      badge: 'O QUE VOCÊ VAI DESCOBRIR',
      title: 'O PASSO A PASSO PARA DESPERTAR SUA MENTE MILIONÁRIA',
      items: [
        {
          title: 'Múltiplas fontes de renda',
          description: 'Entenda como combinar renda principal, extra e passiva para construir sua riqueza de forma estratégica.',
          icon: 'wallet'
        },
        {
          title: 'Ação e prosperidade',
          description: 'Como agir com intenção, propósito claro e prosperidade abundante.',
          icon: 'zap'
        },
        {
          title: 'Transformação mental',
          description: 'Supere crenças limitantes e construa uma mentalidade de riqueza.',
          icon: 'brain'
        }
      ]
    },
    newsletterSection: {
      source: 'Segredos da Mente Milionária',
      title: 'GARANTA SUA VAGA NO SEGREDOS DA MENTE MILIONÁRIA',
      description: 'Participe do evento transformador Segredos da Mente Milionária e comece a mudar sua relação com o dinheiro. Vagas limitadas!',
      ctaText: 'GARANTIR MINHA VAGA AGORA!',
      eventDate: '22 de outubro de 2025',
      eventTime: '13h às 20h',
      eventLocation: 'R. Alameda Araguaia, 751 - Alphaville, Campinas - SP'
    },
    seo: {
      title: 'Segredos da Mente Milionária - Roberto Navarro | Evento Presencial',
      description: 'Imersão exclusiva para despertar seu potencial milionário. Aprenda com Roberto Navarro como transformar sua mentalidade e alcançar a liberdade financeira.',
      keywords: ['segredos mente milionária', 'roberto navarro', 'evento presencial', 'liberdade financeira', 'mentalidade milionária', 'educação financeira']
    }
  },
  {
    _id: 'event-energia-do-dinheiro-v1',
    _type: 'eventPage',
    title: 'Energia do Dinheiro',
    slug: { current: 'energia-do-dinheiro', _type: 'slug' },
    hero: {
      title: 'ENERGIA DO DINHEIRO',
      subtitle: 'Desbloqueie a energia do dinheiro e transforme sua realidade',
      secondTitle: '07 de Outubro - Das 13h às 20h',
      description: 'Alinhe sua energia com a prosperidade e conquiste abundância real na vida e nos negócios. Este evento não entrega apenas conhecimento, mas vivências profundas que desbloqueiam crenças, dissolvem padrões limitantes e ativam a força interna da prosperidade.',
      ctaText: 'GARANTA SUA VAGA!',
      ctaHref: '#inscricao',
      secondaryCtaText: 'Saiba mais',
      secondaryCtaHref: '#beneficios'
    },
    benefitsSection: {
      badge: 'QUAIS BLOQUEIOS TE AFASTAM DA RIQUEZA',
      title: 'Descubra os sabotadores invisíveis que drenam sua energia financeira',
      benefits: [
        {
          title: 'Você trabalha muito, mas nunca sobra dinheiro?',
          description: 'Aprenda como sair do ciclo de escassez ativando a verdadeira energia da abundância.',
          icon: 'wallet'
        },
        {
          title: 'Você sente que nasceu para prosperar, mas algo te trava?',
          description: 'Descubra os sabotadores invisíveis que drenam sua energia financeira e como se libertar deles.',
          icon: 'target'
        },
        {
          title: 'Você sente culpa ou medo ao falar de dinheiro?',
          description: 'Reprograme sua relação emocional com o dinheiro e viva a leveza da prosperidade.',
          icon: 'brain'
        },
        {
          title: 'Você acredita que ganhar dinheiro exige sacrifício?',
          description: 'Entenda como alinhar prazer e propósito para que o dinheiro flua com naturalidade.',
          icon: 'zap'
        }
      ]
    },
    learningSection: {
      badge: 'DESPERTAR DE CONSCIÊNCIA',
      title: 'Mais do que uma mentoria, um despertar de consciência',
      description: 'No dia 07 de outubro, das 13h às 20h, você vai acessar um novo nível de consciência sobre dinheiro, abundância, valor próprio e energia.',
      items: [
        {
          title: 'Qual o efeito do dinheiro em sua vida',
          description: 'Entenda como o dinheiro impacta suas emoções e decisões.',
          icon: 'wallet'
        },
        {
          title: 'Como o seu estado emocional impacta diretamente sua conta bancária',
          description: 'Descubra a conexão entre emoções e prosperidade.',
          icon: 'brain'
        },
        {
          title: 'Quem está influenciando sua visão sobre dinheiro — e como retomar o controle',
          description: 'Identifique e elimine influências negativas sobre dinheiro.',
          icon: 'target'
        },
        {
          title: 'O papel da ambiência e da atmosfera na construção da riqueza',
          description: 'Como criar um ambiente propício à prosperidade.',
          icon: 'zap'
        },
        {
          title: 'Como identificar e eliminar sabotadores financeiros',
          description: 'Técnicas para reconhecer e superar bloqueios internos.',
          icon: 'brain'
        },
        {
          title: 'A conexão poderosa (e oculta) entre energia sexual e prosperidade',
          description: 'Entenda como alinhar energia criativa com abundância.',
          icon: 'zap'
        },
        {
          title: 'O protocolo da riqueza nos negócios e na vida pessoal',
          description: 'Sistema prático para implementar a prosperidade.',
          icon: 'wallet'
        },
        {
          title: 'A verdade sobre o "dinheirinho" e por que ele pode te manter preso na escassez',
          description: 'Por que pequenos valores podem limitar sua mentalidade.',
          icon: 'target'
        },
        {
          title: 'Como criar a motivação certa para que o dinheiro venha até você',
          description: 'Estratégias para desenvolver atração natural pela prosperidade.',
          icon: 'zap'
        }
      ]
    },
    newsletterSection: {
      source: 'Energia do Dinheiro',
      title: 'GARANTA SUA VAGA NO ENERGIA DO DINHEIRO',
      description: 'Preencha o formulário abaixo e fique atento ao próximo evento',
      ctaText: 'GARANTIR MINHA VAGA AGORA!',
      eventDate: '07 de outubro de 2025',
      eventTime: '13h às 20h',
      eventLocation: 'Alameda Araguaia, 751 - Alphaville, Campinas - SP'
    },
    seo: {
      title: 'Energia do Dinheiro - Roberto Navarro | Evento Presencial',
      description: 'Desbloqueie a energia do dinheiro e transforme sua realidade. Alinhe sua energia com a prosperidade e conquiste abundância real.',
      keywords: ['energia do dinheiro', 'roberto navarro', 'prosperidade', 'abundância', 'mentalidade financeira', 'evento presencial']
    }
  },
  {
    _id: 'event-crencas-da-riqueza-v1',
    _type: 'eventPage',
    title: 'Crenças da Riqueza',
    slug: { current: 'crencas-da-riqueza', _type: 'slug' },
    hero: {
      title: 'CRENÇAS DA RIQUEZA',
      subtitle: 'Transformação mental',
      secondTitle: 'A riqueza começa na mente e se materializa nas decisões',
      description: 'Desbloqueie seu potencial, supere crenças limitantes e alcance um novo patamar de liberdade financeira e realização pessoal.',
      ctaText: 'GARANTA SUA VAGA!',
      ctaHref: '#form',
      secondaryCtaText: 'Saiba mais',
      secondaryCtaHref: '#o-que-aprender',
      showCountdown: true,
      countdownTargetDate: new Date('2025-09-13T13:00:00').toISOString()
    },
    challengesSection: {
      badge: 'DESAFIOS',
      title: 'O QUE ESTÁ TE IMPEDINDO DE PROSPERAR ESTÁ DENTRO DE VOCÊ',
      description: 'Identifique os bloqueios mentais que estão limitando seu crescimento financeiro',
      challenges: [
        {
          question: 'Você trava na hora de tomar decisões financeiras importantes?',
          answer: 'Aprenda a identificar e neutralizar crenças limitantes que afetam suas escolhas.',
          icon: 'brain'
        },
        {
          question: 'Sente que está sempre correndo, mas sem sair do lugar?',
          answer: 'Direcione sua energia com foco, clareza e propósito para crescer com consistência.',
          icon: 'compass'
        },
        {
          question: 'Tem dificuldade em pensar grande e definir metas ousadas?',
          answer: 'Comece a expandir sua mentalidade e enxergar oportunidades onde antes via riscos.',
          icon: 'target'
        },
        {
          question: 'Sabe que precisa mudar, mas não consegue dar o próximo passo?',
          answer: 'Descubra o que está te bloqueando e como destravar seu potencial com técnicas práticas.',
          icon: 'move'
        },
        {
          question: 'Sente que algo te impede de alcançar a liberdade financeira?',
          answer: 'Aprenda a destravar suas crenças de escassez e ressignifique sua relação com o dinheiro.',
          icon: 'unlock'
        }
      ]
    },
    learningSection: {
      badge: 'INTELIGÊNCIAS',
      title: 'AS 4 INTELIGÊNCIAS DO SUCESSO FINANCEIRO',
      description: 'Desenvolva cada uma dessas inteligências para alcançar resultados extraordinários',
      items: [
        {
          title: 'Inteligência Emocional',
          description: 'Domine suas emoções financeiras e desenvolva autocontrole para tomar decisões racionais mesmo sob pressão.',
          icon: 'brain'
        },
        {
          title: 'Inteligência Financeira',
          description: 'Desenvolva uma mentalidade de abundância e aprenda as regras fundamentais do dinheiro.',
          icon: 'wallet'
        },
        {
          title: 'Inteligência Espiritual',
          description: 'Alinhe seus valores pessoais com seus objetivos financeiros e descubra seu propósito de vida.',
          icon: 'target'
        },
        {
          title: 'Inteligência Empresarial',
          description: 'Pense como um empreendedor de sucesso e desenvolva visão estratégica para escalar resultados.',
          icon: 'zap'
        }
      ]
    },
    highlightsSection: {
      badge: 'DESTAQUES DO EVENTO',
      title: 'Um Evento que ENTREGA O QUE A MAIORIA SÓ PROMETE',
      highlights: [
        {
          title: 'Imersão Completa',
          description: '10 horas de conteúdo transformador em um único dia',
          icon: 'zap'
        },
        {
          title: 'Material Exclusivo',
          description: 'Apostila digital e recursos para implementação imediata',
          icon: 'file-text'
        },
        {
          title: 'Networking Qualificado',
          description: 'Conexão com outros profissionais e empreendedores',
          icon: 'users'
        },
        {
          title: 'Certificado',
          description: 'Documento oficial de participação no evento',
          icon: 'award'
        }
      ]
    },
    mentorsSection: {
      badge: 'MENTORES',
      title: 'CONHEÇA SEUS MENTORES',
      description: 'Especialistas que vão guiar sua jornada de transformação',
      mentors: [
        {
          name: 'ROBERTO NAVARRO',
          title: 'Fundador do ICF',
          description: 'De lavador de vidros aos 13 anos a referência nacional em inteligência financeira.',
          achievements: [
            {
              text: 'Criador do conceito de Coach Financeiro no Brasil, Roberto já impactou mais de 130 mil pessoas com sua metodologia, que une estratégias financeiras práticas, inteligência emocional e princípios bíblicos.'
            },
            {
              text: 'Especialista em inteligência financeira, espiritual e emocional e possui vasta experiência no mundo dos negócios.'
            },
            {
              text: 'Sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.'
            }
          ]
        },
        {
          name: 'RAÍSSA NAVARRO',
          title: 'Especialista em PNL',
          description: 'Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL).',
          achievements: [
            {
              text: 'Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.'
            },
            {
              text: 'Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching no mundo.'
            },
            {
              text: 'Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação emocional, sempre com bom humor e energia elevada.'
            }
          ]
        }
      ]
    },
    registrationSection: {
      badge: 'INSCRIÇÃO',
      title: 'ESCOLHA SEU INGRESSO',
      description: 'Participe do evento transformador Crenças da Riqueza e comece a mudar sua relação com o dinheiro. Vagas limitadas!',
      eventDate: '2025-09-13T13:00:00',
      eventTime: '13h às 20h',
      eventLocation: 'Alameda Araguaia, 751, Barueri, SP'
    },
    faqSection: {
      badge: 'DÚVIDAS FREQUENTES',
      title: 'PERGUNTAS FREQUENTES',
      description: 'Respostas para as dúvidas mais comuns sobre o evento',
      faqs: [
        {
          question: 'Preciso ter conhecimento prévio sobre finanças?',
          answer: 'Não, o evento foi desenhado para pessoas em diferentes níveis de conhecimento financeiro. O foco está na transformação da mentalidade e nas crenças sobre dinheiro, não em conceitos técnicos avançados.'
        },
        {
          question: 'O que devo levar para o evento?',
          answer: 'Recomendamos que você leve um caderno para anotações, uma garrafa de água e esteja com roupas confortáveis. Todo o material didático será fornecido no evento, incluindo uma apostila digital.'
        },
        {
          question: 'Haverá certificado de participação?',
          answer: 'Sim, todos os participantes receberão um certificado digital de participação após a conclusão do evento.'
        },
        {
          question: 'Posso transferir meu ingresso para outra pessoa?',
          answer: 'Sim, você pode transferir seu ingresso para outra pessoa até 7 dias antes do evento. Para isso, entre em contato com nossa equipe de suporte informando os dados da nova pessoa.'
        },
        {
          question: 'Haverá gravação do evento?',
          answer: 'Não, o evento Crenças da Riqueza é uma experiência presencial exclusiva e não será gravado. Por isso, é fundamental garantir sua presença para aproveitar todo o conteúdo.'
        }
      ]
    },
    newsletterSection: {
      source: 'Crenças da Riqueza',
      title: 'GARANTA SUA VAGA NO CRENÇAS DA RIQUEZA',
      description: 'Preencha o formulário abaixo e fique ligado no próximo evento',
      ctaText: 'GARANTIR MINHA VAGA AGORA!',
      eventDate: '13 de Setembro de 2025',
      eventTime: '13h às 20h',
      eventLocation: 'Alameda Araguaia, 751, Barueri, SP'
    },
    seo: {
      title: 'Crenças da Riqueza - Roberto Navarro | Evento Presencial',
      description: 'Transformação mental para alcançar liberdade financeira. Desbloqueie seu potencial e supere crenças limitantes sobre dinheiro.',
      keywords: ['crenças da riqueza', 'roberto navarro', 'mentalidade financeira', 'libertade financeira', 'evento presencial', 'transformação mental']
    }
  },
  {
    _id: 'event-escalador-de-negocios-v1',
    _type: 'eventPage',
    title: 'Escalador de Negócios',
    slug: { current: 'escalador-de-negocios', _type: 'slug' },
    hero: {
      title: 'ESCALADOR DE NEGÓCIOS',
      subtitle: 'Evento Presencial Exclusivo',
      secondTitle: 'Empreendedores de sucesso não crescem por acaso',
      description: 'Saia da estagnação e aplique, de forma imediata, estratégias reais para escalar vendas, lucros e liberdade.',
      ctaText: 'GARANTA SUA VAGA!',
      ctaHref: '#inscricao',
      secondaryCtaText: 'Saiba mais',
      secondaryCtaHref: '#o-que-aprender'
    },
    challengesSection: {
      badge: 'DESAFIOS DO CRESCIMENTO',
      title: 'SE ESTÁ DIFÍCIL CRESCER, É PORQUE VOCÊ ESTÁ TENTANDO DO JEITO ERRADO',
      description: 'Você sente que:',
      challenges: [
        {
          question: 'Trabalha demais, mas o faturamento continua estagnado',
          answer: 'Aprenda a escalar sem aumentar a carga de trabalho, com um modelo de crescimento sustentável.',
          icon: 'target'
        },
        {
          question: 'Sua empresa depende de indicações ou da sorte para vender',
          answer: 'Descubra como criar um fluxo previsível de vendas com estratégia e posicionamento.',
          icon: 'zap'
        },
        {
          question: 'Já tentou várias coisas, mas nada parece funcionar',
          answer: 'Siga um método testado e validado por quem já multiplicou resultados.',
          icon: 'brain'
        },
        {
          question: 'Está preso (a) no operacional e não tem tempo para crescer',
          answer: 'Entenda como montar uma estrutura que funciona mesmo sem você por perto.',
          icon: 'wallet'
        }
      ]
    },
    learningSection: {
      badge: 'O QUE VOCÊ VAI APRENDER',
      title: 'ESTRATÉGIAS PARA ESCALAR SEU NEGÓCIO',
      items: [
        {
          title: 'Estratégias reais de escala',
          description: 'Descubra como aumentar seu faturamento com processos inteligentes, sem precisar trabalhar mais.',
          icon: 'target'
        },
        {
          title: 'Autoridade e posicionamento de marca',
          description: 'Saiba como se tornar referência em seu segmento e atrair clientes qualificados com naturalidade.',
          icon: 'zap'
        },
        {
          title: 'Multiplicação de lucros',
          description: 'Conheça os segredos dos empreendedores que saem da média e lucram de forma exponencial.',
          icon: 'wallet'
        },
        {
          title: 'Técnicas avançadas de venda',
          description: 'Aprenda formas de vender mais, fidelizar seus clientes e aumentar seu ticket médio.',
          icon: 'brain'
        },
        {
          title: 'Networking estratégico e parcerias',
          description: 'Amplie suas conexões e crie novas oportunidades com empresários que também buscam escalar.',
          icon: 'users'
        },
        {
          title: 'Plano de ação imediato',
          description: 'Saia do evento com um plano prático e personalizado para aplicar no seu negócio no dia seguinte.',
          icon: 'target'
        }
      ]
    },
    highlightsSection: {
      badge: 'DESTAQUES DO EVENTO',
      title: 'Um Evento que ENTREGA O QUE A MAIORIA SÓ PROMETE',
      highlights: [
        {
          title: 'Evento 100% gratuito',
          description: 'Acesso completo ao conteúdo sem custos',
          icon: 'check'
        },
        {
          title: 'Experiência VIP disponível para os primeiros inscritos',
          description: 'Benefícios exclusivos para quem se inscrever primeiro',
          icon: 'star'
        },
        {
          title: 'Presencial, com metodologia prática e resultados mensuráveis',
          description: 'Aprendizado hands-on com aplicação imediata',
          icon: 'target'
        }
      ]
    },
    newsletterSection: {
      source: 'Escalador de Negócios',
      title: 'FIQUE LIGADO NO PRÓXIMO ESCALADOR DE NEGÓCIOS',
      description: 'Receba novidades e dicas exclusivas para escalar seu negócio.',
      ctaText: 'GARANTIR MINHA VAGA AGORA!'
    },
    seo: {
      title: 'Escalador de Negócios - Roberto Navarro | Evento Presencial',
      description: 'Saia da estagnação e aplique estratégias reais para escalar vendas, lucros e liberdade. Evento presencial exclusivo.',
      keywords: ['escalador de negócios', 'roberto navarro', 'crescimento empresarial', 'escalar negócio', 'evento presencial', 'empreendedorismo']
    }
  },
  {
    _id: 'event-mentor-milionario-v1',
    _type: 'eventPage',
    title: 'Mentor Milionário',
    slug: { current: 'mentor-milionario', _type: 'slug' },
    hero: {
      title: 'MENTOR MILIONÁRIO',
      subtitle: 'O Evento Que Vai Transformar Conhecimento em Fortuna e Criar Múltiplas Fontes de Renda',
      secondTitle: 'De Lavador de Vidros a Multimilionário em 7 Anos...',
      description: 'Agora Roberto Navarro Revela os Segredos para Você Se Tornar um Mentor de Sucesso ou Conquistar Seu Primeiro Milhão',
      ctaText: 'QUERO MINHA VAGA NO MENTOR MILIONÁRIO',
      ctaHref: '#inscricao',
      secondaryCtaText: 'Saiba mais',
      secondaryCtaHref: '#o-que-aprender'
    },
    audienceSection: {
      badge: 'PARA QUEM É ESTE EVENTO?',
      title: 'Seu Perfil de Sucesso',
      items: [
        {
          text: 'Profissionais que querem monetizar seu conhecimento',
          icon: 'briefcase'
        },
        {
          text: 'Pessoas em busca do primeiro milhão',
          icon: 'target'
        },
        {
          text: 'Quem deseja se tornar mentor de sucesso',
          icon: 'crown'
        },
        {
          text: 'Empreendedores que querem múltiplas fontes de renda',
          icon: 'trending-up'
        },
        {
          text: 'Especialistas prontos para escalar seus resultados',
          icon: 'trophy'
        }
      ]
    },
    challengesSection: {
      badge: 'DESAFIOS',
      title: 'O Que Está Travando Sua Prosperidade?',
      challenges: [
        {
          question: 'Você tem conhecimento valioso, mas não sabe como transformá-lo em dinheiro?',
          answer: 'Aprenda estratégias comprovadas para monetizar seu expertise.',
          icon: 'brain'
        },
        {
          question: 'Quer alcançar o primeiro milhão, mas não tem uma estratégia clara?',
          answer: 'Desenvolva um plano estruturado e mensurável para atingir seus objetivos.',
          icon: 'target'
        },
        {
          question: 'Sonha em se tornar um mentor reconhecido, mas não sabe por onde começar?',
          answer: 'Descubra os passos exatos para construir autoridade e credibilidade.',
          icon: 'crown'
        },
        {
          question: 'Precisa de múltiplas fontes de renda para conquistar liberdade financeira?',
          answer: 'Implemente estratégias para criar renda escalável e sustentável.',
          icon: 'trending-up'
        }
      ]
    },
    programSection: {
      badge: 'PROGRAMA COMPLETO',
      title: '7 Horas de Transformação Intensiva',
      description: 'Um mergulho profundo nas estratégias que separam milionários de pessoas comuns',
      blocks: [
        {
          title: 'A Mentalidade do Milhão',
          subtitle: 'ABERTURA',
          icon: 'star',
          description: 'A Trajetória de Roberto Navarro',
          items: [
            { text: 'Como saiu de lavador de vidros para multimilionário em menos de 7 anos' },
            { text: 'Por que a prosperidade é uma ESCOLHA, não sorte' },
            { text: 'Os 3 pilares que sustentam qualquer fortuna' }
          ]
        },
        {
          title: 'Reprogramação Mental',
          subtitle: 'BLOCO 1',
          icon: 'brain',
          description: 'Desbloqueando Seu Potencial Financeiro',
          items: [
            { text: 'Como identificar e quebrar as crenças que limitam seu crescimento' },
            { text: 'O "reset" mental que liberta sua capacidade de gerar riqueza' },
            { text: 'Estratégias para desenvolver autoridade como especialista' }
          ]
        },
        {
          title: 'As Regras Secretas do Dinheiro',
          subtitle: 'BLOCO 2',
          icon: 'dollar-sign',
          description: 'O Código dos Milionários',
          items: [
            { text: 'As 7 regras fundamentais que todo milionário segue' },
            { text: 'Como gerar riqueza de forma sustentável e escalável' },
            { text: 'A diferença entre quem fica rico e quem fica milionário' }
          ]
        },
        {
          title: 'Múltiplas Fontes de Renda',
          subtitle: 'BLOCO 3',
          icon: 'zap',
          description: 'Duas Estratégias Poderosas de Crescimento',
          items: [
            { text: 'ESTRATÉGIA 1: Negócio Digital - Transformar conhecimento em produto lucrativo' },
            { text: 'ESTRATÉGIA 2: Investimentos - Estratégias financeiras aceleradas' }
          ]
        },
        {
          title: 'Seu Plano Milionário',
          subtitle: 'BLOCO FINAL',
          icon: 'target',
          description: 'Estruturando Sua Jornada ao Primeiro Milhão',
          items: [
            { text: 'Criação do seu plano pessoal e objetivo' },
            { text: 'Métricas e marcos para acompanhar evolução' },
            { text: 'Sistema de execução que gera resultados consistentes' }
          ]
        }
      ]
    },
    learningSection: {
      badge: 'O QUE VOCÊ VAI CONQUISTAR',
      title: 'Resultados Garantidos',
      items: [
        {
          title: 'Clareza total sobre como monetizar seu conhecimento',
          description: 'Entenda exatamente como transformar seu expertise em renda.',
          icon: 'target'
        },
        {
          title: 'Estratégia estruturada para alcançar o primeiro milhão',
          description: 'Plano detalhado e mensurável para seus objetivos.',
          icon: 'wallet'
        },
        {
          title: 'Mentalidade reprogramada para a prosperidade',
          description: 'Mude sua relação com o dinheiro e a riqueza.',
          icon: 'brain'
        },
        {
          title: 'Plano concreto com ações práticas e mensuráveis',
          description: 'Saia do evento com um roadmap claro para executar.',
          icon: 'check'
        },
        {
          title: 'Conhecimento das regras que todo milionário segue',
          description: 'Acesse os princípios que separam ricos de milionários.',
          icon: 'crown'
        },
        {
          title: 'Duas fontes de renda estruturadas para crescimento acelerado',
          description: 'Implemente estratégias comprovadas de múltipla renda.',
          icon: 'trending-up'
        }
      ]
    },
    newsletterSection: {
      source: 'Mentor Milionário',
      title: 'GARANTA SUA VAGA NO MENTOR MILIONÁRIO',
      description: 'Participe do evento Mentor Milionário e comece a mudar sua relação com o dinheiro. Vagas limitadas!',
      ctaText: 'GARANTIR MINHA VAGA AGORA!',
      eventDate: '24 de Setembro de 2025',
      eventTime: '13h às 20h',
      eventLocation: 'Alameda Araguaia, 751, Barueri, SP'
    },
    seo: {
      title: 'Mentor Milionário - Roberto Navarro | Evento Presencial',
      description: 'Transforme conhecimento em fortuna e crie múltiplas fontes de renda. Aprenda os segredos para se tornar um mentor de sucesso.',
      keywords: ['mentor milionário', 'roberto navarro', 'múltiplas fontes de renda', 'mentor de sucesso', 'primeiro milhão', 'evento presencial']
    }
  }
]

async function populateAllEvents() {
  try {
    console.log('🚀 Iniciando população de TODOS os eventos...')

    for (const event of events) {
      console.log(`📝 Populando: ${event.title}`)
      
      const result = await client.createOrReplace(event)
      console.log(`✅ ${event.title} criado/atualizado com sucesso! ID: ${result._id}`)
    }

    console.log('🎉 TODOS os eventos foram populados com sucesso!')
    console.log(`📊 Total de eventos processados: ${events.length}`)

  } catch (error) {
    console.error('❌ Erro ao popular eventos:', error)
    throw error
  }
}

// Executar o script
populateAllEvents()
  .then(() => {
    console.log('🏁 População concluída com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Falha na população:', error)
    process.exit(1)
  })
