import { normalizeNestedRelationships } from './helpers/normalize-relationships'

export async function seedPages(payload: any) {
  // Helper para criar ou atualizar página
  const createOrUpdatePage = async (slug: string, data: any) => {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    // Normalizar relacionamentos antes de salvar
    let normalizedData = normalizeNestedRelationships(data)

    // Remover campos undefined
    Object.keys(normalizedData).forEach(key => {
      if (normalizedData[key] === undefined) {
        delete normalizedData[key]
      }
    })

    if (existing.docs.length > 0) {
      console.log(`⚠️  Página "${data.title}" já existe, atualizando...`)
      try {
        return await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data: normalizedData,
        })
      } catch (error: any) {
        console.error(`❌ Erro ao atualizar página "${data.title}":`, error.message)
        throw error
      }
    } else {
      console.log(`✅ Criando página "${data.title}"...`)
      return await payload.create({
        collection: 'pages',
        data: normalizedData,
      })
    }
  }

  // Política de Privacidade
  const politicaPrivacidade = await createOrUpdatePage('politica-privacidade', {
    title: 'Política de Privacidade',
    slug: 'politica-privacidade',
    status: 'published',
    layout: 'default',
    hero: {
      title: 'Política de Privacidade',
      subtitle: 'Última atualização: 17 de junho de 2025',
    },
    content: [
      {
        type: 'h2',
        children: [{ text: '1. Introdução' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'A presente Política de Privacidade tem por finalidade demonstrar o compromisso de Roberto Navarro ("nós", "nosso") com a privacidade e proteção dos dados pessoais coletados, além de estabelecer as regras sobre a coleta, registro, armazenamento, uso, compartilhamento e eliminação dos dados pessoais coletados.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '2. Dados Coletados' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Ao preencher nossos formulários, participar de nossos eventos ou adquirir nossos produtos e serviços, podemos coletar os seguintes dados pessoais:',
          },
        ],
      },
      {
        type: 'ul',
        children: [
          { type: 'li', children: [{ text: 'Nome completo' }] },
          { type: 'li', children: [{ text: 'Endereço de e-mail' }] },
          { type: 'li', children: [{ text: 'Número de telefone' }] },
          { type: 'li', children: [{ text: 'Informações sobre navegação em nosso site (cookies)' }] },
          { type: 'li', children: [{ text: 'Informações de origem (UTM parameters)' }] },
          { type: 'li', children: [{ text: 'Dados de interação com nossos conteúdos' }] },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '3. Finalidade do Tratamento dos Dados' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Seus dados pessoais são coletados e utilizados para as seguintes finalidades:',
          },
        ],
      },
      {
        type: 'ul',
        children: [
          { type: 'li', children: [{ text: 'Fornecer nossos produtos e serviços' }] },
          { type: 'li', children: [{ text: 'Enviar comunicações sobre eventos, cursos e oportunidades' }] },
          { type: 'li', children: [{ text: 'Melhorar nossos serviços e experiência do usuário' }] },
          { type: 'li', children: [{ text: 'Cumprir obrigações legais e regulatórias' }] },
          { type: 'li', children: [{ text: 'Realizar pesquisas e análises estatísticas' }] },
          { type: 'li', children: [{ text: 'Personalizar o conteúdo e ofertas de acordo com seus interesses' }] },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '4. Compartilhamento de Dados' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Seus dados pessoais podem ser compartilhados com:',
          },
        ],
      },
      {
        type: 'ul',
        children: [
          { type: 'li', children: [{ text: 'Prestadores de serviços que nos auxiliam (plataformas de CRM, email marketing)' }] },
          { type: 'li', children: [{ text: 'Parceiros de negócios quando necessário para prestação dos serviços' }] },
          { type: 'li', children: [{ text: 'Autoridades públicas, quando exigido por lei' }] },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Todos os terceiros com quem compartilhamos seus dados estão sujeitos a obrigações de confidencialidade e só podem processar seus dados para as finalidades específicas que determinamos.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '5. Armazenamento e Segurança' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra perda acidental, uso, divulgação ou acesso não autorizado. Seus dados são armazenados em servidores seguros, com acesso restrito apenas a pessoas autorizadas.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '6. Seus Direitos' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:',
          },
        ],
      },
      {
        type: 'ul',
        children: [
          { type: 'li', children: [{ text: 'Confirmar a existência de tratamento de seus dados' }] },
          { type: 'li', children: [{ text: 'Acessar seus dados' }] },
          { type: 'li', children: [{ text: 'Corrigir dados incompletos, inexatos ou desatualizados' }] },
          { type: 'li', children: [{ text: 'Solicitar anonimização, bloqueio ou eliminação de dados desnecessários' }] },
          { type: 'li', children: [{ text: 'Solicitar a portabilidade dos dados' }] },
          { type: 'li', children: [{ text: 'Revogar seu consentimento a qualquer momento' }] },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '7. Cookies e Tecnologias Semelhantes' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, entender como nosso site é utilizado e personalizar nosso conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '8. Alterações na Política de Privacidade' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Esta política pode ser atualizada periodicamente. Recomendamos que você consulte esta página regularmente para se manter informado sobre quaisquer alterações.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: '9. Contato' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco pelo e-mail: contato@robertonavarro.com.br',
          },
        ],
      },
    ],
    seo: {
      title: 'Política de Privacidade - Roberto Navarro',
      description: 'Política de Privacidade do site Roberto Navarro. Conheça nosso compromisso com a privacidade e proteção dos seus dados pessoais.',
      keywords: 'política de privacidade, lgpd, proteção de dados',
    },
  })

  // Trabalhe Conosco
  const trabalheConosco = await createOrUpdatePage('trabalhe-conosco', {
    title: 'Trabalhe Conosco',
    slug: 'trabalhe-conosco',
    status: 'published',
    layout: 'form',
    hero: {
      title: 'FAÇA PARTE DO NOSSO TIME',
      subtitle: 'Estamos sempre em busca de talentos que compartilham nossa missão de transformar vidas financeiras. Envie seu currículo e faça parte dessa jornada.',
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Estamos sempre em busca de talentos que compartilham nossa missão de transformar vidas financeiras. Envie seu currículo e faça parte dessa jornada.',
          },
        ],
      },
    ],
    form: {
      formId: 'trabalhe-conosco',
      submitText: 'Enviar Currículo',
      successMessage: 'Obrigado! Recebemos sua candidatura e entraremos em contato em breve.',
    },
    seo: {
      title: 'Trabalhe Conosco | Roberto Navarro',
      description: 'Junte-se ao nosso time e faça parte da transformação financeira de milhões de pessoas.',
      keywords: 'trabalhe conosco, vagas, carreiras, roberto navarro',
    },
  })

  // Obrigado
  const obrigado = await createOrUpdatePage('obrigado', {
    title: 'Obrigado',
    slug: 'obrigado',
    status: 'published',
    layout: 'default',
    hero: {
      title: 'Obrigado pela sua compra!',
      subtitle: 'Seu pagamento está sendo processado',
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Você receberá um email de confirmação em breve com todos os detalhes de acesso.',
          },
        ],
      },
    ],
    seo: {
      title: 'Obrigado | Roberto Navarro',
      description: 'Página de confirmação de compra',
      keywords: 'obrigado, confirmação',
    },
  })

  // Mês da Independência
  const mesDaIndependencia = await createOrUpdatePage('mes-da-independencia', {
    title: 'Mês da Independência',
    slug: 'mes-da-independencia',
    status: 'published',
    layout: 'default',
    hero: {
      title: 'DECLARE HOJE SUA INDEPENDÊNCIA FINANCEIRA',
      subtitle: 'Invista em uma formação com Roberto Navarro e ganhe outra totalmente grátis!',
    },
    content: [
      {
        type: 'h2',
        children: [{ text: 'OPORTUNIDADE LIMITADA!' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Promoção válida até 30 de setembro',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'O QUE IMPEDE SEU GRITO DE INDEPENDÊNCIA?' }],
      },
      {
        type: 'h3',
        children: [{ text: 'Negócio estagnado?' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Ensinamos estratégias práticas para escalar seu faturamento e transformar sua empresa em uma verdadeira máquina de crescimento.',
          },
        ],
      },
      {
        type: 'h3',
        children: [{ text: 'Medo de investir?' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Mostramos o caminho seguro para investir com confiança, desmistificando o mercado financeiro e revelando como multiplicar seu patrimônio.',
          },
        ],
      },
      {
        type: 'h3',
        children: [{ text: 'Mentalidade limitante?' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Ajudamos você a reprogramar crenças limitantes sobre dinheiro e sucesso, destravando seu verdadeiro potencial de riqueza.',
          },
        ],
      },
      {
        type: 'h3',
        children: [{ text: 'Futuro incerto?' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Estruturamos um plano concreto para você construir sua independência financeira e garantir um legado próspero para si e sua família.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'INDEPENDÊNCIA OU SORTE?' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Não dependa do acaso para alcançar o sucesso! Conquistar a liberdade financeira não é uma simples questão de sorte. Exige estratégia, conhecimento e preparo.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Para comemorar o Mês da Independência, o Instituto Coaching Financeiro (ICF) lançou uma campanha especial para você dar o próximo passo rumo ao sucesso:',
          },
        ],
      },
      {
        type: 'ul',
        children: [
          { type: 'li', children: [{ text: 'Na compra de uma formação, você ganha a segunda totalmente grátis.' }] },
          { type: 'li', children: [{ text: 'Na compra de duas formações, a terceira também fica por nossa conta.' }] },
        ],
      },
    ],
    seo: {
      title: 'Campanha Mês da Independência - Instituto Coaching Financeiro',
      description: 'Declare hoje sua independência financeira. Invista em uma formação com Roberto Navarro e ganhe outra totalmente grátis! Promoção válida até 30 de setembro.',
      keywords: 'independência financeira, campanha, promoção, roberto navarro',
    },
  })

  // Lives
  const lives = await createOrUpdatePage('lives', {
    title: 'Lives',
    slug: 'lives',
    status: 'published',
    layout: 'default',
    hero: {
      title: 'Lives',
      subtitle: 'Acompanhe nossas transmissões ao vivo',
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Fique por dentro das nossas lives sobre educação financeira, investimentos e muito mais!',
          },
        ],
      },
    ],
    seo: {
      title: 'Lives | Roberto Navarro',
      description: 'Acompanhe nossas transmissões ao vivo sobre educação financeira.',
      keywords: 'lives, transmissão ao vivo, educação financeira',
    },
  })

  // Sobre
  const sobre = await createOrUpdatePage('sobre', {
    title: 'Sobre Nós',
    slug: 'sobre',
    status: 'published',
    layout: 'default',
    hero: {
      title: 'SOBRE O INSTITUTO COACHING FINANCEIRO',
      subtitle: 'Transformando vidas através da educação financeira',
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'O Instituto Coaching Financeiro (ICF) foi fundado por Roberto Navarro com a missão de transformar a relação das pessoas com o dinheiro através da educação financeira, coaching e desenvolvimento pessoal.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Nossa Missão' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Democratizar o acesso à educação financeira de qualidade, oferecendo metodologias exclusivas e comprovadas que ajudam pessoas a conquistarem sua independência financeira e realizarem seus sonhos.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Nossos Números' }],
      },
      {
        type: 'ul',
        children: [
          { type: 'li', children: [{ text: '+1,5 milhões de vidas transformadas' }] },
          { type: 'li', children: [{ text: '+1280 técnicas exclusivas desenvolvidas' }] },
          { type: 'li', children: [{ text: '5 livros publicados' }] },
          { type: 'li', children: [{ text: '100+ vídeos educativos' }] },
        ],
      },
    ],
    seo: {
      title: 'Sobre Nós - Instituto Coaching Financeiro',
      description: 'Conheça o Instituto Coaching Financeiro e nossa missão de transformar vidas através da educação financeira.',
      keywords: 'sobre, instituto coaching financeiro, roberto navarro, educação financeira',
    },
  })

  // Contato
  const contato = await createOrUpdatePage('contato', {
    title: 'Contato',
    slug: 'contato',
    status: 'published',
    layout: 'form',
    hero: {
      title: 'ENTRE EM CONTATO',
      subtitle: 'Estamos aqui para ajudar você a transformar sua vida financeira',
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Tem dúvidas sobre nossos cursos, formações ou mentorias? Entre em contato conosco! Nossa equipe está pronta para ajudar você a dar o próximo passo rumo à sua liberdade financeira.',
          },
        ],
      },
    ],
    form: {
      formId: 'contato',
      submitText: 'Enviar Mensagem',
      successMessage: 'Obrigado! Recebemos sua mensagem e entraremos em contato em breve.',
    },
    seo: {
      title: 'Contato - Roberto Navarro',
      description: 'Entre em contato com o Instituto Coaching Financeiro. Estamos prontos para ajudar você.',
      keywords: 'contato, fale conosco, suporte, roberto navarro',
    },
  })

  console.log('✅ Páginas processadas')

  return {
    politicaPrivacidade,
    trabalheConosco,
    obrigado,
    mesDaIndependencia,
    lives,
    sobre,
    contato,
  }
}
