import { normalizeNestedRelationships } from './helpers/normalize-relationships'
import { ensureMedia } from './helpers/ensure-media'

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

    if (data.form && typeof data.form === 'object' && !Array.isArray(data.form)) {
      normalizedData.form = data.form
    }

    // Remover campos undefined
    Object.keys(normalizedData).forEach((key) => {
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
    }

    console.log(`✅ Criando página "${data.title}"...`)
    return await payload.create({
      collection: 'pages',
      data: normalizedData,
    })
  }

  const defaultFormationItems = [
    {
      title: 'LCF MENTORING',
      description:
        'Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.',
      link: '/formacoes/mentoria',
    },
    {
      title: 'EMPREENDEDOR INTELIGENTE',
      description:
        'Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.',
      link: '/formacoes/empreendedor-inteligente',
    },
    {
      title: 'EDUCADOR FINANCEIRO',
      description:
        'Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.',
      link: '/formacoes/educador-financeiro',
    },
    {
      title: 'LCF MENTORING PRO',
      description:
        'Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.',
      link: '/formacoes/lcf-mentoring-pro',
    },
    {
      title: 'MENTORIA DE INVESTIMENTOS',
      description:
        'Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.',
      link: '/formacoes/mentoria-de-investimentos',
    },
    {
      title: 'MENTORIA INDIVIDUAL',
      description:
        'Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.',
      link: '/formacoes/mentoria-individual',
    },
    {
      title: 'MÉTODO TF',
      description:
        'Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.',
      link: '/formacoes/metodo-tf',
    },
    {
      title: 'MENTOR COACHING FINANCEIRO',
      description:
        'Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.',
      link: '/formacoes/mentor-coaching-financeiro',
    },
  ]

  const homeHeroImageId = await ensureMedia(payload, 'public/images/bgsite.jpg', 'Roberto Navarro')
  const mentorImageId = await ensureMedia(payload, 'public/images/ROBERTO_17.jpg', 'Roberto Navarro')
  const booksHighlightImageId = await ensureMedia(payload, 'public/images/LIVRO_MOCKUP.png', 'Mockup do Kit de Livros')
  const booksHeroImageId = await ensureMedia(payload, 'public/images/HERO_EDUCADOR.png', 'Roberto Navarro')
  const livroMockupImageId = await ensureMedia(payload, 'public/images/LIVRO_MOCKUP.png', 'Mockup do Kit de Livros')
  const livro2ImageId = await ensureMedia(payload, 'public/images/livro2.png', 'Quebrando Mitos com o Dinheiro')
  const finalCardImageId = await ensureMedia(payload, 'public/images/mockuplivro.png', 'Kit de Livros Roberto Navarro')
  const finalImageId = await ensureMedia(payload, 'public/images/livro3.png', 'Kit de Livros Roberto Navarro')
  const sabedoriaImageId = await ensureMedia(payload, 'public/images/SABEDORIA.png', 'A Sabedoria do Dinheiro')
  const mitosImageId = await ensureMedia(payload, 'public/images/MITOS.png', 'Quebrando Mitos com o Dinheiro')
  const arteImageId = await ensureMedia(payload, 'public/images/ARTE.png', 'A Arte de Enriquecer')
  const coachingImageId = await ensureMedia(payload, 'public/images/COACHING.png', 'Coaching Financeiro')
  const livesHeroImageId = await ensureMedia(payload, 'public/images/roberto-palestra.jpeg', 'Roberto Navarro palestrando')
  const independenciaHeroImageId = await ensureMedia(payload, 'public/Prancheta 1.png', 'Independência Financeira')

  const home = await createOrUpdatePage('home', {
    title: 'Home',
    slug: 'home',
    status: 'published',
    layout: 'home',
    pageBuilder: [
      {
        blockType: 'homeHero',
        badgeText: 'INSTITUTO COACHING FINANCEIRO',
        titleHighlight: 'TRANSFORME SUA MENTALIDADE',
        titleRest: 'E CONQUISTE UMA NOVA REALIDADE FINANCEIRA',
        description:
          'Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.',
        ...(homeHeroImageId ? { backgroundImage: homeHeroImageId } : {}),
        primaryCTA: {
          label: 'CONHEÇA NOSSAS FORMAÇÕES',
          href: '#formacoes',
          newTab: false,
        },
        stats: [{ value: '300.000+', label: 'vidas transformadas' }],
        enableEventPopup: false,
      },
      {
        blockType: 'formationsGrid',
        badgeText: 'NOSSAS FORMAÇÕES',
        title: 'FORMAÇÕES QUE VÃO',
        highlightedText: 'TRANSFORMAR SUA MENTALIDADE',
        description:
          'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
        accent: 'yellow',
        useFormacoesCollection: true,
        items: defaultFormationItems,
      },
      {
        blockType: 'mentorSection',
        badgeText: 'QUEM SOMOS',
        titlePrefix: 'MAIS DE',
        titleHighlight: '30 ANOS',
        titleSuffix: 'IMPACTANDO VIDAS COM INTELIGÊNCIA E PROPÓSITO',
        description: 'Te guiamos na jornada de transformação financeira, emocional e espiritual.',
        ...(mentorImageId ? { backgroundImage: mentorImageId } : {}),
        paragraphs: [
          {
            text: 'Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente, trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.',
          },
          {
            text: 'A virada em sua vida veio quando Roberto percebeu que havia um "vilão invisível" bloqueando sua prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.',
          },
          {
            text: 'Hoje, Roberto Navarro é reconhecido como o criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e emocional. Sua missão é transformar a vida financeira de 10 milhões de brasileiros e contribuir para a construção de um país rico e próspero.',
          },
        ],
        stats: [
          { value: '+1,5 Milhões', label: 'Alunos' },
          { value: '1280', label: 'Técnicas Exclusivas' },
          { value: '5', label: 'Livros Publicados' },
          { value: '100+', label: 'Vídeos Inspiradores' },
        ],
      },
      {
        blockType: 'eventsGrid',
        badgeText: 'EVENTOS PRESENCIAIS',
        title: 'EVENTOS PRESENCIAIS QUE GERAM',
        highlightedText: 'MUDANÇAS REAIS',
        description:
          'Nossos eventos são imersões poderosas criadas para desbloquear crenças, despertar seu potencial e colocar você no caminho da liberdade e abundância.',
        items: [
          {
            title: 'CRENÇAS DA RIQUEZA',
            description: 'Supere bloqueios mentais e eleve seu padrão financeiro e pessoal.',
            link: '/eventos/crencas-da-riqueza',
          },
          {
            title: 'SEGREDOS DA MENTE MILIONÁRIA',
            description:
              'Descubra os princípios fundamentais que separam os ricos dos pobres e transforme sua vida financeira.',
            link: '/eventos/segredos-da-mente-milionaria',
          },
          {
            title: 'ESCALADOR DE NEGÓCIOS',
            description: 'Aplique estratégias para escalar vendas, lucros e conquistar liberdade empresarial.',
            link: '/eventos/escalador-de-negocios',
          },
          {
            title: 'ENERGIA DO DINHEIRO',
            description: 'Descubra como alinhar sua energia com a frequência da prosperidade.',
            link: '/eventos/energia-do-dinheiro',
          },
        ],
      },
      {
        blockType: 'booksHighlight',
        badgeText: 'LIVROS',
        titleHighlight: 'LIVROS PARA QUEM QUER',
        titleSuffix: 'PROSPERAR DE VERDADE',
        description: [
          {
            text: 'Conheça os best-sellers de Roberto Navarro, que já impactaram milhares de leitores com estratégias práticas e transformadoras.',
          },
          {
            text: 'Cada página traz ensinamentos que moldaram a jornada de um multimilionário, agora disponíveis para você.',
          },
        ],
        ...(booksHighlightImageId ? { image: booksHighlightImageId } : {}),
        primaryCTA: { label: 'COMPRE SEU LIVRO AGORA!', href: '/livros', newTab: false },
      },
      {
        blockType: 'transformationVideos',
        accent: 'yellow',
        orientation: 'landscape',
        title: 'VEJA COMO NOSSOS',
        highlightedText: 'ALUNOS TRANSFORMARAM',
        description:
          'Histórias reais de pessoas que aplicaram os princípios das Crenças da Riqueza e mudaram completamente sua relação com o dinheiro.',
        videos: [
          {
            videoId: 'sVcR5iq1BG0',
            title: 'Estudo de Caso Fabio Santos - ICF',
            person: 'Fabio Santos',
            description: 'Relato de transformação financeira com o Instituto Coaching Financeiro.',
          },
          {
            videoId: 'AyjH3rNe37M',
            title: 'Estudo de Caso Clelio - ICF',
            person: 'Clelio',
            description: 'História de superação e sucesso com o Instituto Coaching Financeiro.',
          },
          {
            videoId: 'pmbpDqpkK78',
            title: 'Estudo de Caso Wagner Jovino - ICF',
            person: 'Wagner Jovino',
            description: 'Transformação financeira e pessoal com o Instituto Coaching Financeiro.',
          },
          {
            videoId: '7N97LDt9F5Y',
            title: 'Estudo de Caso Rodrigo - ICF',
            person: 'Rodrigo',
            description: 'Como Rodrigo transformou sua vida financeira com o ICF.',
          },
        ],
        stats: [
          {
            icon: 'star',
            title: 'Resultados Comprovados',
            description: 'Mais de 130 mil pessoas já passaram pelos nossos programas.',
          },
          {
            icon: 'zap',
            title: 'Metodologia Exclusiva',
            description: 'Uma abordagem única que integra inteligência financeira, emocional e espiritual.',
          },
          {
            icon: 'brain',
            title: 'Transformação Mental',
            description: 'Reprogramação de crenças limitantes e desenvolvimento de uma mentalidade de prosperidade.',
          },
        ],
        cta: { label: 'Transformar Minha Vida Financeira!', href: '#inscricao', newTab: false },
      },
      {
        blockType: 'trainingsCta',
        badgeText: 'TREINAMENTOS DIGITAIS',
        title: 'APRENDA NO SEU TEMPO COM NOSSOS',
        highlightedText: 'TREINAMENTOS DIGITAIS',
        description:
          'Conheça nossos cursos gravados e descubra como eliminar dívidas, organizar sua vida financeira e construir seu primeiro milhão com estratégia e propósito.',
        cta: { label: 'ADQUIRA SEU TREINAMENTO!', href: '#', newTab: false },
      },
      {
        blockType: 'testimonials',
        badgeText: 'DEPOIMENTOS',
        title: 'O QUE NOSSO',
        highlightedText: 'ALUNOS DIZEM',
        description: 'Conheça as histórias de transformação de pessoas que já passaram pelos nossos programas.',
        cta: { label: 'COMECE SUA TRANSFORMAÇÃO', href: '#inscricao', newTab: false },
      },
      {
        blockType: 'contactSection',
        badgeText: 'CONTATO',
        title: 'ENTRE EM',
        highlightedText: 'CONTATO',
        description:
          'Estamos à disposição para ajudar você a transformar sua vida financeira. Entre em contato conosco e comece sua jornada rumo à liberdade financeira.',
        email: 'contato@robertonavarrooficial.com.br',
        phone: '(12) 99765-9057',
        address: 'Alameda Araguaia 751, Alphaville – SP',
      },
    ],
    seo: {
      title: 'Instituto Coaching Financeiro - Transforme sua mentalidade e conquiste uma nova realidade financeira',
      description:
        'Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.',
      keywords: 'coaching financeiro, roberto navarro, mentalidade financeira, empreendedorismo, prosperidade',
    },
  })

  const formacoes = await createOrUpdatePage('formacoes', {
    title: 'Formações',
    slug: 'formacoes',
    status: 'published',
    layout: 'custom',
    pageBuilder: [
      {
        blockType: 'formacoesHero',
        badgeText: 'FORMAÇÕES',
        title: 'FORMAÇÕES QUE VÃO',
        highlightedText: 'TRANSFORMAR SUA MENTALIDADE',
        description:
          'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
        accent: 'red',
      },
      {
        blockType: 'formationsGrid',
        badgeText: 'FORMAÇÕES',
        title: 'FORMAÇÕES QUE VÃO',
        highlightedText: 'TRANSFORMAR SUA MENTALIDADE',
        description:
          'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
        accent: 'red',
        useFormacoesCollection: true,
        items: defaultFormationItems,
      },
    ],
    seo: {
      title: 'Formações | Roberto Navarro',
      description:
        'Conheça nossas formações, mentorias e programas que ajudam a transformar sua mentalidade financeira.',
      keywords: 'formações, cursos, mentorias, roberto navarro',
    },
  })

  const livros = await createOrUpdatePage('livros', {
    title: 'Livros',
    slug: 'livros',
    status: 'published',
    layout: 'livros-page',
    pageBuilder: [
      {
        blockType: 'booksHero',
        title: 'Desvende os segredos da liberdade financeira com os ensinamentos de Roberto Navarro',
        subtitle: 'Kit Exclusivo Roberto Navarro',
        secondTitle: '',
        description:
          'O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil traz para você um kit exclusivo de livros que serão seu guia definitivo para a tão sonhada liberdade financeira.',
        ...(booksHeroImageId ? { image: booksHeroImageId } : {}),
        ctaText: 'OFERTA EXCLUSIVA: ADQUIRA SEU KIT!',
        ctaHref: 'https://sun.eduzz.com/956345',
        ctaNewTab: true,
      },
      {
        blockType: 'productKit',
        breadcrumbs: [
          { title: 'Início', url: '/' },
          { title: 'Livros', url: '/livros' },
        ],
        heading: 'Kit Exclusivo Roberto Navarro',
        images: [
          ...(sabedoriaImageId ? [{ image: sabedoriaImageId, alt: 'A Sabedoria do Dinheiro' }] : []),
          ...(mitosImageId ? [{ image: mitosImageId, alt: 'Quebrando Mitos com o Dinheiro' }] : []),
          ...(arteImageId ? [{ image: arteImageId, alt: 'A Arte de Enriquecer' }] : []),
          ...(coachingImageId ? [{ image: coachingImageId, alt: 'Coaching Financeiro' }] : []),
        ],
        price: 'R$ 200,00',
        rating: { stars: 5, reviewCount: 3 },
        description:
          'Criador do conceito de Coaching Financeiro no país, Navarro impactou mais de 1 milhão de pessoas, desenvolvendo metodologias que unem estratégias práticas de finanças, inteligência emocional e princípios bíblicos. Agora, você terá a oportunidade de mergulhar nos pilares dessa transformação através de seus quatro livros.',
        cta: {
          label: 'OFERTA EXCLUSIVA: ADQUIRA SEU KIT!',
          href: 'https://sun.eduzz.com/956345',
          newTab: true,
        },
        tabs: [
          {
            value: 'details',
            trigger: 'Descrição',
            description:
              'Mais do que um conjunto de livros, este kit é um investimento em você, na sua família e no seu futuro. Prepare-se para quebrar paradigmas, desmistificar o dinheiro e construir uma nova realidade financeira. A sua jornada para a abundância começa agora!',
          },
          {
            value: 'content',
            trigger: 'Conteúdo do Kit',
            description:
              'Este kit inclui 4 livros essenciais de Roberto Navarro: A Sabedoria do Dinheiro, Quebrando Mitos com o Dinheiro, A Arte de Enriquecer e Coaching Financeiro.',
          },
        ],
      },
      {
        blockType: 'booksCatalog',
        badgeText: 'CONHEÇA OS LIVROS',
        title: 'Um kit que vai transformar sua vida',
        description:
          'As obras de Roberto Navarro combinam inteligência financeira, emocional e espiritual para guiá-lo rumo à prosperidade.',
        useLivrosCollection: true,
      },
      {
        blockType: 'knowledgeBarrier',
        heading: 'A falta de conhecimento é a maior barreira para a prosperidade',
        description:
          'Pense no valor de ter à sua disposição o conhecimento de um dos maiores especialistas em finanças do Brasil. Roberto Navarro não é apenas um autor; ele é um mentor que já transformou a vida de centenas de milhares de pessoas. Sua metodologia, testada e comprovada, vai além dos números, tocando na essência da sua relação com o dinheiro.',
        button: {
          label: 'GARANTA SEU KIT!',
          href: 'https://sun.eduzz.com/956345',
          newTab: true,
        },
        ...(livro2ImageId ? { firstImage: livro2ImageId } : {}),
        ...(livroMockupImageId ? { secondImage: livroMockupImageId } : {}),
      },
      {
        blockType: 'booksTestimonials',
        badgeText: 'DEPOIMENTOS',
        heading: 'O que nossos leitores dizem',
        description: 'Veja o que os leitores estão dizendo sobre os livros de Roberto Navarro.',
        testimonials: [
          {
            quote:
              'Desperta para importância de se planejar financeiramente o quanto antes. Embora o autor se conduza mais como mentor, há muitas perguntas de Coaching Financeiro muito bem elaboradas que te fazem refletir sobre alguns pontos cegos no aspecto financeiro, bastante esclarecedor, escrito de modo, que parece que o autor é um amigo batendo um papo.',
            name: 'Juliano Gorgonio',
            role: 'Compra Verificada',
            numberOfStars: 5,
          },
          {
            quote:
              'Ótimo livro. Leitura super fácil e tudo faz muito sentido muito embora não seja um tema simples como parece considerando todos os problemas sociais do Brasil.',
            name: 'Marta Celestino',
            role: 'Compra Verificada',
            numberOfStars: 5,
          },
          {
            quote:
              '"O que enriquece o ser humano, não é o dinheiro que ele consegue, mas o processo que ele segue para obter aquilo." Não tem como ler este livro e não se sentir mais rico.',
            name: 'Andrea Kress',
            role: 'Compra Verificada',
            numberOfStars: 5,
          },
        ],
      },
      {
        blockType: 'booksFinalCta',
        heading: 'Tenha as ferramentas para construir a vida que você merece',
        description:
          'O conhecimento é o único investimento que ninguém pode tirar de você. Invista em si mesmo e colha os frutos de uma vida próspera e abundante.',
        offerText: 'Oferta Exclusiva',
        price: '10x de R$ 20,00',
        paymentInfo: 'ou R$ 200,00 à vista',
        button: {
          label: 'QUERO MEU KIT E MINHA LIBERDADE FINANCEIRA!',
          href: 'https://sun.eduzz.com/956345',
          newTab: true,
        },
        ...(finalCardImageId ? { cardImage: finalCardImageId } : {}),
        ...(finalImageId ? { image: finalImageId } : {}),
      },
    ],
    seo: {
      title: 'Kit Exclusivo Roberto Navarro - Livros de Educação Financeira',
      description:
        'Desvende os segredos da liberdade financeira com os ensinamentos de Roberto Navarro. Kit exclusivo de livros que serão seu guia definitivo para a tão sonhada liberdade financeira.',
      keywords: 'livros, kit de livros, roberto navarro, educação financeira',
    },
  })

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
      {
        type: 'p',
        children: [{ text: 'Última atualização: 17 de junho de 2025.' }],
      },
    ],
    seo: {
      title: 'Política de Privacidade - Roberto Navarro',
      description:
        'Política de Privacidade do site Roberto Navarro. Conheça nosso compromisso com a privacidade e proteção dos seus dados pessoais.',
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
      subtitle:
        'Estamos sempre em busca de talentos que compartilham nossa missão de transformar vidas financeiras. Envie seu currículo e faça parte dessa jornada.',
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
      title: 'Obrigado!',
      subtitle: 'Sua inscrição foi recebida com sucesso',
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Se você concluiu uma compra, em breve você receberá um e-mail com o seu ingresso e mais informações sobre o evento.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Se você apenas enviou seus dados, nossa equipe entrará em contato em breve para orientar os próximos passos.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Precisa de ajuda? Fale com a nossa equipe pelo WhatsApp: (12) 99765-9057.',
          },
        ],
      },
    ],
    seo: {
      title: 'Obrigado | Roberto Navarro',
      description: 'Página de confirmação de compra e inscrição',
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
      ...(independenciaHeroImageId ? { backgroundImage: independenciaHeroImageId } : {}),
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Conquiste a liberdade de construir o futuro que você sempre quis. Invista em você e dobre suas chances de evoluir e prosperar!',
          },
        ],
      },
    ],
    sections: [
      {
        type: 'cta',
        content: [
          { type: 'h2', children: [{ text: 'OPORTUNIDADE LIMITADA!' }] },
          { type: 'p', children: [{ text: 'Promoção válida até 30 de setembro.' }] },
        ],
      },
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'O QUE IMPEDE SEU GRITO DE INDEPENDÊNCIA?' }] },
          { type: 'h3', children: [{ text: 'Negócio estagnado?' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Ensinamos estratégias práticas para escalar seu faturamento e transformar sua empresa em uma verdadeira máquina de crescimento.',
              },
            ],
          },
          { type: 'h3', children: [{ text: 'Medo de investir?' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Mostramos o caminho seguro para investir com confiança, desmistificando o mercado financeiro e revelando como multiplicar seu patrimônio.',
              },
            ],
          },
          { type: 'h3', children: [{ text: 'Mentalidade limitante?' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Ajudamos você a reprogramar crenças limitantes sobre dinheiro e sucesso, destravando seu verdadeiro potencial de riqueza.',
              },
            ],
          },
          { type: 'h3', children: [{ text: 'Futuro incerto?' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Estruturamos um plano concreto para você construir sua independência financeira e garantir um legado próspero para si e sua família.',
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'INDEPENDÊNCIA OU SORTE?' }] },
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
      },
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'NOSSOS NÚMEROS' }] },
          {
            type: 'ul',
            children: [
              { type: 'li', children: [{ text: '+1,5 milhões de alunos' }] },
              { type: 'li', children: [{ text: '+1280 técnicas exclusivas' }] },
              { type: 'li', children: [{ text: '+5 livros publicados' }] },
            ],
          },
        ],
      },
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'OPORTUNIDADES DISPONÍVEIS' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Confira todas as combinações disponíveis e escolha aquela que mais conecta com sua realidade atual.',
              },
            ],
          },
          { type: 'h3', children: [{ text: 'EDUCADOR FINANCEIRO + MAKE MONEY (GRÁTIS)' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Seja reconhecido como profissional licenciado e transforme vidas através da educação financeira. Com certificação do MEC, a formação de Educador Financeiro te possibilita construir uma carreira sólida e rentável, realizando consultorias, palestras e treinamentos pagos. Além disso, você recebe sem custo adicional o curso Make Money, um método direto e comprovado para acelerar seus ganhos e transformar sua vida financeira em poucos meses.',
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'De R$ 4.994 por R$ 2.497 (economia de R$ 2.497).' }],
          },
          { type: 'h3', children: [{ text: 'LCF MENTORING + EDUCADOR FINANCEIRO (GRÁTIS)' }] },
          {
            type: 'p',
            children: [
              {
                text: 'O Life Coaching Financeiro Mentoring (LCF) é uma imersão única de 7 dias, onde você mergulha em técnicas de PNL, inteligência emocional, produtividade e coaching financeiro para transformar sua vida em todos os aspectos. Além do curso, você recebe gratuitamente a formação Educador Financeiro, que lhe permite atuar como mentor e expandir suas competências sobre finanças e desenvolvimento humano.',
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'De R$ 13.994 por R$ 6.997 (economia de R$ 6.997).' }],
          },
          { type: 'h3', children: [{ text: 'EMPREENDEDOR INTELIGENTE + MENTORIA DE INVESTIMENTOS (GRÁTIS)' }] },
          {
            type: 'p',
            children: [
              {
                text: 'O Empreendedor Inteligente é um programa de 3 dias para empresários e empreendedores que estão cansados de viver apagando incêndios e buscam meios de escalar o faturamento, atrair investidores e otimizar processos. Como bônus, você leva a Mentoria de Investimentos, formação que revela as estratégias práticas de quem realmente investe com segurança e resultado.',
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'De R$ 13.994 por R$ 6.997 (economia de R$ 6.997).' }],
          },
          { type: 'h3', children: [{ text: 'MENTORIA DE INVESTIMENTOS + EDUCADOR FINANCEIRO (GRÁTIS)' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Na Mentoria de Investimentos, você vai descobrir os meios mais seguros de como multiplicar seu patrimônio. O programa te mostra como estruturar um plano de investimentos adaptado ao seu perfil e aos seus objetivos. De presente, você leva a formação Educador Financeiro e descobre como ampliar suas oportunidades profissionais e como desenvolver habilidades pedagógicas e de comunicação.',
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'De R$ 9.994 por R$ 4.997 (economia de R$ 4.997).' }],
          },
          { type: 'h3', children: [{ text: 'LCF PRO + MENTORIA DE SUA ESCOLHA (GRÁTIS)' }] },
          {
            type: 'p',
            children: [
              {
                text: 'O LCF PRO é o programa mais completo de transformação financeira e pessoal do Brasil. É um mergulho profundo em mentalidade, negócios e finanças, que vai levar você de onde está hoje até a vida que realmente merece viver, com clareza de propósito, liberdade e patrimônio sólido. Como bônus, você pode escolher uma outra mentoria para tornar sua formação ainda mais completa e personalizada.',
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'De R$ 32.000 por R$ 16.000 (economia de R$ 16.000).' }],
          },
          { type: 'h3', children: [{ text: '2 MENTORIAS + 3ª MENTORIA DE SUA ESCOLHA (GRÁTIS)' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Quer acelerar sua evolução em todas as áreas? Ao adquirir duas mentorias, você ganha a terceira sem custo adicional. Isso significa que você pode economizar e construir uma trilha de conhecimento que une carreira, negócios e investimentos. É a oportunidade perfeita para quem deseja abrir várias frentes de crescimento, com a segurança de estar aprendendo diretamente com um dos maiores especialistas em finanças do Brasil.',
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'De R$ 36.000 por R$ 18.000 (economia de R$ 18.000).' }],
          },
        ],
      },
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'BENEFÍCIOS' }] },
          {
            type: 'ul',
            children: [
              {
                type: 'li',
                children: [
                  {
                    text: 'Metodologia validada: aprenda com quem já impactou mais de 1 milhão de pessoas e criou o conceito de Coach Financeiro no Brasil.',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Conhecimento em dobro: invista em uma formação de alto nível e duplique suas oportunidades de crescimento, ganhando outro curso totalmente grátis.',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Licença profissional: torne-se um educador financeiro com certificação reconhecida pelo MEC e chancela do Instituto Coaching Financeiro (ICF).',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Resultados rápidos: descubra estratégias rápidas de aplicar seu dinheiro e gere transformações concretas em sua vida dentro de poucos dias.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'cta',
        content: [
          { type: 'h2', children: [{ text: 'PROCLAME SUA INDEPENDÊNCIA FINANCEIRA AGORA!' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Preencha o formulário e um de nossos consultores entrará em contato para entender seu momento e te guiar para a melhor oferta da campanha Independência Financeira. As vagas com bônus em dobro são limitadas!',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'Fale com um especialista: (12) 99765-9057.',
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: 'Campanha Mês da Independência - Instituto Coaching Financeiro',
      description:
        'Declare hoje sua independência financeira. Invista em uma formação com Roberto Navarro e ganhe outra totalmente grátis! Promoção válida até 30 de setembro.',
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
      title: 'LIVES DIÁRIAS',
      subtitle: 'Conhecimento transformador todos os dias',
      ...(livesHeroImageId ? { backgroundImage: livesHeroImageId } : {}),
    },
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Acompanhe as lives diárias de Roberto Navarro no YouTube e transforme sua mentalidade e suas finanças com conteúdo prático e de alta qualidade.',
          },
        ],
      },
    ],
    sections: [
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'PROGRAMAÇÃO SEMANAL' }] },
          { type: 'h3', children: [{ text: 'ACOMPANHE NOSSAS LIVES DIÁRIAS' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Todos os dias às 19h, Roberto Navarro traz conteúdo exclusivo e gratuito no YouTube para transformar sua mentalidade e suas finanças.',
              },
            ],
          },
          {
            type: 'ul',
            children: [
              {
                type: 'li',
                children: [
                  {
                    text: 'Segunda-feira, 19:00 - Finanças Pessoais: Dicas práticas para organizar suas finanças e eliminar dívidas.',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Terça-feira, 19:00 - Investimentos: Estratégias de investimento para iniciantes e avançados.',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Quarta-feira, 19:00 - Empreendedorismo: Como iniciar e escalar seu negócio com inteligência.',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Quinta-feira, 19:00 - Mentalidade: Desenvolvendo uma mentalidade de prosperidade e abundância.',
                  },
                ],
              },
              {
                type: 'li',
                children: [
                  {
                    text: 'Sexta-feira, 19:00 - Perguntas e Respostas: Roberto responde às principais dúvidas da semana.',
                  },
                ],
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'Siga no YouTube: https://www.youtube.com/@RobertoNavarroOficial' }],
          },
        ],
      },
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'ASSISTA AO VIVO' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Acompanhe-nos agora pelo YouTube e participe ao vivo.',
              },
            ],
          },
          {
            type: 'p',
            children: [{ text: 'https://www.youtube.com/@RobertoNavarroOficial' }],
          },
        ],
      },
      {
        type: 'text',
        content: [
          { type: 'h2', children: [{ text: 'LIVES ANTERIORES' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Não conseguiu assistir ao vivo? Confira as gravações das lives anteriores e não perca nenhum conteúdo.',
              },
            ],
          },
          {
            type: 'ul',
            children: [
              {
                type: 'li',
                children: [{ text: 'Como criar múltiplas fontes de renda (15/05/2023 • 12.5k visualizações)' }],
              },
              {
                type: 'li',
                children: [{ text: 'Investimentos para iniciantes (10/05/2023 • 8.7k visualizações)' }],
              },
              {
                type: 'li',
                children: [{ text: 'Mentalidade milionária na prática (05/05/2023 • 15.3k visualizações)' }],
              },
              {
                type: 'li',
                children: [{ text: 'Como sair das dívidas em 90 dias (01/05/2023 • 20.1k visualizações)' }],
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'Ver todas as lives: https://www.youtube.com/@RobertoNavarroOficial/streams',
              },
            ],
          },
        ],
      },
      {
        type: 'cta',
        content: [
          { type: 'h2', children: [{ text: 'NÃO PERCA NENHUMA LIVE!' }] },
          {
            type: 'p',
            children: [
              {
                text: 'Ative as notificações no YouTube e seja avisado sempre que uma nova live começar.',
              },
            ],
          },
          {
            type: 'p',
            children: [
              {
                text: 'Siga e ative as notificações: https://www.youtube.com/@RobertoNavarroOficial',
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: 'Lives Diárias - Roberto Navarro',
      description:
        'Acompanhe as lives diárias de Roberto Navarro no YouTube e transforme sua mentalidade e suas finanças com conteúdo prático e de alta qualidade.',
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
    home,
    formacoes,
    livros,
    politicaPrivacidade,
    trabalheConosco,
    obrigado,
    mesDaIndependencia,
    lives,
    sobre,
    contato,
  }
}
