import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

const ensurePage = async (payload: any, slug: string, data: any) => {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data,
    })
    console.log(`✅ Página "${slug}" atualizada`)
  } else {
    await payload.create({
      collection: 'pages',
      data,
    })
    console.log(`✅ Página "${slug}" criada`)
  }
}

const ensureTestimonial = async (
  payload: any,
  testimonial: { name: string; role: string; testimonial: string; rating?: number; category?: string }
) => {
  const existing = await payload.find({
    collection: 'testimonials',
    where: { name: { equals: testimonial.name } },
    limit: 1,
  })

  if (existing.docs.length === 0) {
    await payload.create({
      collection: 'testimonials',
      data: {
        ...testimonial,
        featured: false,
      },
    })
    console.log(`   • Depoimento "${testimonial.name}" criado`)
  } else {
    console.log(`   • Depoimento "${testimonial.name}" já existia`)
  }
}

const ensureForm = async (
  payload: any,
  slug: string,
  data: any,
) => {
  const existing = await payload.find({
    collection: 'forms',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const updated = await payload.update({
      collection: 'forms',
      id: existing.docs[0].id,
      data,
    })
    console.log(`✅ Formulário "${slug}" atualizado`)
    return updated
  }

  const created = await payload.create({
    collection: 'forms',
    data,
  })
  console.log(`✅ Formulário "${slug}" criado`)
  return created
}

const livrosDefaults = {
  hero: {
    title: 'Desvende os segredos da liberdade financeira com os ensinamentos de Roberto Navarro',
    subtitle: 'Kit Exclusivo Roberto Navarro',
    secondTitle: '',
    description:
      'O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil traz para você um kit exclusivo de livros que serão seu guia definitivo para a tão sonhada liberdade financeira.',
    image: null,
    ctaText: 'OFERTA EXCLUSIVA: ADQUIRA SEU KIT!',
    ctaHref: 'https://sun.eduzz.com/956345',
    ctaNewTab: true,
  },
  productKit: {
    breadcrumbs: [
      { title: 'Início', url: '/' },
      { title: 'Livros', url: '/livros' },
    ],
    heading: 'Kit Exclusivo Roberto Navarro',
    images: [
      { src: '/images/SABEDORIA.png', alt: 'A Sabedoria do Dinheiro' },
      { src: '/images/MITOS.png', alt: 'Quebrando Mitos com o Dinheiro' },
      { src: '/images/ARTE.png', alt: 'A Arte de Enriquecer' },
      { src: '/images/COACHING.png', alt: 'Coaching Financeiro' },
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
  catalog: {
    badgeText: 'CONHEÇA OS LIVROS',
    title: 'Um kit que vai transformar sua vida',
    description:
      'As obras de Roberto Navarro combinam inteligência financeira, emocional e espiritual para guiá-lo rumo à prosperidade.',
  },
  knowledge: {
    heading: 'A falta de conhecimento é a maior barreira para a prosperidade',
    description:
      'Pense no valor de ter à sua disposição o conhecimento de um dos maiores especialistas em finanças do Brasil. Roberto Navarro não é apenas um autor; ele é um mentor que já transformou a vida de centenas de milhares de pessoas. Sua metodologia, testada e comprovada, vai além dos números, tocando na essência da sua relação com o dinheiro.',
    button: {
      label: 'GARANTA SEU KIT!',
      href: 'https://sun.eduzz.com/956345',
      newTab: true,
    },
  },
  finalCta: {
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
  },
}

const formacoesDefaults = {
  hero: {
    badgeText: 'FORMAÇÕES',
    title: 'FORMAÇÕES QUE VÃO',
    highlightedText: 'TRANSFORMAR SUA MENTALIDADE',
    description:
      'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
    accent: 'red' as const,
  },
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: await configPromise })

    console.log('🌱 Iniciando seed do Payload CMS...')

    // Criar usuário admin se não existir
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length === 0) {
      console.log('👤 Criando usuário admin...')
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@robertonavarro.com',
          password: 'admin123',
          name: 'Administrador',
          role: 'admin',
        },
      })
      console.log('✅ Usuário admin criado')
    }

    // Seed Mentores
    console.log('\n📚 Populando Mentores...')
    const robertoNavarro = await payload.create({
      collection: 'mentores',
      data: {
        name: 'Roberto Navarro',
        slug: 'roberto-navarro',
        role: 'Fundador e CEO',
        shortBio: 'Especialista em educação financeira com mais de 20 anos de experiência.',
        bio: [
          {
            type: 'p',
            children: [
              {
                text: 'Roberto Navarro é um dos maiores especialistas em educação financeira do Brasil.',
              },
            ],
          },
        ],
        achievements: [
          { text: 'Mais de 1.5 milhão de alunos transformados' },
          { text: 'Autor de 4 livros best-sellers' },
          { text: '20+ anos de experiência em educação financeira' },
        ],
        stats: [
          { label: 'Alunos', value: '1.5M+' },
          { label: 'Anos de experiência', value: '20+' },
        ],
        featured: true,
        order: 1,
      },
    })

    // Seed Testimonials
    console.log('\n💬 Populando Depoimentos...')
    const testimonialsToEnsure = [
      {
        name: 'Ana Souza',
        role: 'Empresária',
        testimonial:
          'Eu estava completamente endividada, sem esperança de sair do vermelho. O método do Roberto me ajudou a organizar minhas finanças, quitar dívidas e voltar a sonhar. Hoje tenho controle e paz financeira!',
        rating: 5,
        category: 'geral',
      },
      {
        name: 'José Lima',
        role: 'Professor',
        testimonial:
          'Sempre achei impossível sair das dívidas do cartão. Com as orientações do Roberto, consegui renegociar tudo, criar uma reserva e até investir. Minha vida mudou completamente.',
        rating: 5,
        category: 'geral',
      },
      {
        name: 'Patrícia Gomes',
        role: 'Autônoma',
        testimonial:
          'O Roberto me mostrou que é possível recomeçar. Saí do sufoco das dívidas, aprendi a gastar com consciência e hoje ajudo minha família a ter uma vida mais tranquila.',
        rating: 5,
        category: 'geral',
      },
      {
        name: 'Juliano Gorgonio',
        role: 'Compra Verificada',
        testimonial:
          'Desperta para importância de se planejar financeiramente o quanto antes. Embora o autor se conduza mais como mentor, há muitas perguntas de Coaching Financeiro muito bem elaboradas que te fazem refletir sobre alguns pontos cegos no aspecto financeiro, bastante esclarecedor, escrito de modo, que parece que o autor é um amigo batendo um papo.',
        rating: 5,
        category: 'livro',
      },
      {
        name: 'Marta Celestino',
        role: 'Compra Verificada',
        testimonial:
          'Ótimo livro. Leitura super fácil e tudo faz muito sentido muito embora não seja um tema simples como parece considerando todos os problemas sociais do Brasil.',
        rating: 5,
        category: 'livro',
      },
      {
        name: 'Andrea Kress',
        role: 'Compra Verificada',
        testimonial:
          '"O que enriquece o ser humano, não é o dinheiro que ele consegue, mas o processo que ele segue para obter aquilo." Não tem como ler este livro e não se sentir mais rico.',
        rating: 5,
        category: 'livro',
      },
    ]

    for (const t of testimonialsToEnsure) {
      await ensureTestimonial(payload, t)
    }

    console.log('\n📝 Populando Formulários...')
    const contactForm = await ensureForm(payload, 'contato', {
      name: 'Formulário de Contato',
      slug: 'contato',
      description: 'Formulário exibido na seção de contato do site.',
      fields: [
        {
          name: 'nome',
          label: 'Nome',
          type: 'text',
          required: true,
          placeholder: 'Seu nome completo',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'seuemail@exemplo.com',
        },
        {
          name: 'telefone',
          label: 'Telefone',
          type: 'tel',
          required: false,
          placeholder: '(XX) 99999-9999',
        },
        {
          name: 'mensagem',
          label: 'Mensagem',
          type: 'textarea',
          required: true,
          placeholder: 'Como podemos ajudar?',
          validation: {
            minLength: 10,
          },
        },
      ],
      settings: {
        submitText: 'ENVIAR MENSAGEM',
        successMessage: 'Obrigado! Recebemos sua mensagem e retornaremos em breve.',
        emailNotifications: {
          enabled: true,
          to: 'contato@robertonavarrooficial.com.br',
          subject: 'Novo contato através do site',
        },
        webhook: {
          enabled: true,
          url: 'https://api.robertonavarro.com/webhooks/forms/contato',
          method: 'POST',
          headers: [
            { key: 'X-Webhook-Source', value: 'website' },
          ],
          timeout: 10,
        },
      },
    })

    const mentoriaForm = await ensureForm(payload, 'mentoria', {
      name: 'Formulário de Interesse em Mentoria',
      slug: 'mentoria',
      description: 'Formulário para interessados nas formações e mentorias.',
      fields: [
        {
          name: 'nome',
          label: 'Nome completo',
          type: 'text',
          required: true,
          placeholder: 'Digite seu nome completo',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'seuemail@exemplo.com',
        },
        {
          name: 'telefone',
          label: 'Telefone/WhatsApp',
          type: 'tel',
          required: true,
          placeholder: '(XX) 99999-9999',
        },
        {
          name: 'empresa',
          label: 'Empresa / Profissão',
          type: 'text',
          required: false,
          placeholder: 'Conte-nos mais sobre você',
        },
        {
          name: 'mensagem',
          label: 'Mensagem',
          type: 'textarea',
          required: false,
          placeholder: 'Qual é o seu objetivo com a mentoria?',
        },
      ],
      settings: {
        submitText: 'QUERO TRANSFORMAR MINHA VIDA',
        successMessage: 'Recebemos seus dados! Nossa equipe entrará em contato em breve.',
        emailNotifications: {
          enabled: true,
          to: 'inscricoes@robertonavarrooficial.com.br',
          subject: 'Novo interesse em mentoria/formação',
        },
        webhook: {
          enabled: true,
          url: 'https://api.robertonavarro.com/webhooks/forms/mentoria',
          method: 'POST',
          headers: [
            { key: 'X-Webhook-Source', value: 'website' },
            { key: 'X-Form-Slug', value: 'mentoria' },
          ],
          timeout: 10,
        },
      },
    })

    // Seed FAQs
    console.log('\n❓ Populando FAQs...')
    await payload.create({
      collection: 'faqs',
      data: {
        question: 'A certificação é reconhecida pelo MEC?',
        answer: [
          {
            type: 'p',
            children: [
              {
                text: 'Sim! Nossa certificação de Educador Financeiro é reconhecida pelo MEC.',
              },
            ],
          },
        ],
        category: 'certificacao',
        order: 1,
      },
    })

    await payload.create({
      collection: 'faqs',
      data: {
        question: 'Tem garantia?',
        answer: [
          {
            type: 'p',
            children: [
              {
                text: 'Sim! Oferecemos garantia incondicional de 7 dias.',
              },
            ],
          },
        ],
        category: 'geral',
        order: 2,
      },
    })

    // Seed Formação Educador Financeiro
    console.log('\n🎓 Populando Formações...')
    await payload.create({
      collection: 'formacoes',
      data: {
        title: 'Educador Financeiro',
        slug: 'educador-financeiro',
        status: 'published',
        accentColor: '#FFD700',
        hero: {
          badge: 'CERTIFICAÇÃO RECONHECIDA PELO MEC',
          title: 'EDUCADOR FINANCEIRO',
          subtitle: 'Transforme vidas através da educação financeira',
          ctaText: 'Quero me tornar um Educador Financeiro',
          ctaLink: 'https://pay.eduzz.com/educador-financeiro',
        },
        challenges: [
          { text: 'Você quer ajudar pessoas a conquistarem sua independência financeira?' },
          { text: 'Deseja construir uma carreira com propósito e alto potencial de ganhos?' },
        ],
        benefits: [
          {
            title: 'Certificação MEC',
            description: 'Certificado reconhecido pelo Ministério da Educação',
            icon: 'Award',
          },
        ],
        pricing: {
          price: 2997,
          installments: 12,
          installmentValue: 297,
          link: 'https://pay.eduzz.com/educador-financeiro',
        },
        seo: {
          title: 'Educador Financeiro - Certificação Reconhecida pelo MEC | Roberto Navarro',
          description: 'Torne-se um Educador Financeiro certificado.',
          keywords: 'educador financeiro, certificação mec',
        },
        form: mentoriaForm.id,
      },
    })

    // Seed Evento
    console.log('\n🎉 Populando Eventos...')
    await payload.create({
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
          city: 'São Paulo',
          state: 'SP',
        },
        hero: {
          badge: 'EVENTO PRESENCIAL',
          title: 'CRENÇAS DA RIQUEZA',
          subtitle: 'Transforme suas crenças sobre dinheiro',
        },
        seo: {
          title: 'Crenças da Riqueza - Evento Presencial | Roberto Navarro',
          description: 'Transforme suas crenças sobre dinheiro.',
        },
      },
    })

    // Seed Livro
    console.log('\n📖 Populando Livros...')
    await payload.create({
      collection: 'livros',
      data: {
        title: 'A Arte de Enriquecer',
        slug: 'arte-de-enriquecer',
        author: 'Roberto Navarro',
        subtitle: 'Os princípios atemporais da riqueza',
        description: [
          {
            type: 'p',
            children: [
              {
                text: 'Descubra os segredos milenares que transformam pessoas comuns em milionárias.',
              },
            ],
          },
        ],
        price: 49.90,
        seo: {
          title: 'A Arte de Enriquecer - Livro | Roberto Navarro',
          description: 'Descubra os princípios atemporais da riqueza.',
        },
      },
    })

    // Seed Páginas padrões
    console.log('\n📄 Populando Páginas institucionais...')
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Política de Privacidade',
        slug: 'politica-privacidade',
        status: 'published',
        layout: 'default',
        hero: {
          title: 'Política de Privacidade',
          subtitle: 'Última atualização: Janeiro de 2025',
        },
        seo: {
          title: 'Política de Privacidade | Roberto Navarro',
          description: 'Conheça nossa política de privacidade.',
        },
      },
    })

    console.log('\n🏠 Populando página Home...')
    await ensurePage(payload, 'home', {
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
          primaryCTA: {
            label: 'CONHEÇA NOSSAS FORMAÇÕES',
            href: '#formacoes',
            newTab: false,
          },
          stats: [{ value: '300.000+', label: 'vidas transformadas' }],
          enableEventPopup: true,
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
        },
        {
          blockType: 'mentorSection',
          badgeText: 'QUEM SOMOS',
          titlePrefix: 'MAIS DE',
          titleHighlight: '30 ANOS',
          titleSuffix: 'IMPACTANDO VIDAS COM INTELIGÊNCIA E PROPÓSITO',
          description: 'Te guiamos na jornada de transformação financeira, emocional e espiritual.',
          paragraphs: [
            { text: 'Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente, trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.' },
            { text: 'A virada em sua vida veio quando Roberto percebeu que havia um “vilão invisível” bloqueando sua prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.' },
            { text: 'Hoje, Roberto Navarro é reconhecido como o criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e emocional. Sua missão é transformar a vida financeira de 10 milhões de brasileiros e contribuir para a construção de um país rico e próspero.' },
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
              description: 'Descubra os princípios fundamentais que separam os ricos dos pobres e transforme sua vida financeira.',
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
            { text: 'Conheça os best-sellers de Roberto Navarro, que já impactaram milhares de leitores com estratégias práticas e transformadoras.' },
            { text: 'Cada página traz ensinamentos que moldaram a jornada de um multimilionário, agora disponíveis para você.' },
          ],
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
            { videoId: 'sVcR5iq1BG0', title: 'Estudo de Caso Fabio Santos - ICF', person: 'Fabio Santos', description: 'Relato de transformação financeira com o Instituto Coaching Financeiro.' },
            { videoId: 'AyjH3rNe37M', title: 'Estudo de Caso Clelio - ICF', person: 'Clelio', description: 'História de superação e sucesso com o Instituto Coaching Financeiro.' },
            { videoId: 'pmbpDqpkK78', title: 'Estudo de Caso Wagner Jovino - ICF', person: 'Wagner Jovino', description: 'Transformação financeira e pessoal com o Instituto Coaching Financeiro.' },
            { videoId: '7N97LDt9F5Y', title: 'Estudo de Caso Rodrigo - ICF', person: 'Rodrigo', description: 'Como Rodrigo transformou sua vida financeira com o ICF.' },
          ],
          stats: [
            { icon: 'star', title: 'Resultados Comprovados', description: 'Mais de 130 mil pessoas já passaram pelos nossos programas.' },
            { icon: 'zap', title: 'Metodologia Exclusiva', description: 'Uma abordagem única que integra inteligência financeira, emocional e espiritual.' },
            { icon: 'brain', title: 'Transformação Mental', description: 'Reprogramação de crenças limitantes e desenvolvimento de uma mentalidade de prosperidade.' },
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
          testimonials: (
            await payload.find({
              collection: 'testimonials',
              where: { name: { in: ['Ana Souza', 'José Lima', 'Patrícia Gomes'] } },
            })
          ).docs.map((doc: any) => doc.id),
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
          form: contactForm.id,
        },
      ],
    })

    console.log('\n📚 Populando página Livros...')
    const livrosTestimonials = (
      await payload.find({
        collection: 'testimonials',
        where: { name: { in: ['Juliano Gorgonio', 'Marta Celestino', 'Andrea Kress'] } },
      })
    ).docs.map((doc: any) => ({
      quote: doc.testimonial,
      name: doc.name,
      role: doc.role,
      numberOfStars: doc.rating ?? 5,
    }))

    await ensurePage(payload, 'livros', {
      title: 'Livros',
      slug: 'livros',
      status: 'published',
      layout: 'livros-page',
      pageBuilder: [
        {
          blockType: 'booksHero',
          title: livrosDefaults.hero.title,
          subtitle: livrosDefaults.hero.subtitle,
          secondTitle: livrosDefaults.hero.secondTitle,
          description: livrosDefaults.hero.description,
          image: undefined,
          ctaText: livrosDefaults.hero.ctaText,
          ctaHref: livrosDefaults.hero.ctaHref,
          ctaNewTab: livrosDefaults.hero.ctaNewTab,
        },
        {
          blockType: 'productKit',
          breadcrumbs: livrosDefaults.productKit.breadcrumbs,
          heading: livrosDefaults.productKit.heading,
          images: livrosDefaults.productKit.images.map((image) => ({ alt: image.alt })),
          price: livrosDefaults.productKit.price,
          rating: livrosDefaults.productKit.rating,
          description: livrosDefaults.productKit.description,
          cta: livrosDefaults.productKit.cta,
          tabs: livrosDefaults.productKit.tabs,
        },
        {
          blockType: 'booksCatalog',
          badgeText: livrosDefaults.catalog.badgeText,
          title: livrosDefaults.catalog.title,
          description: livrosDefaults.catalog.description,
          useLivrosCollection: true,
        },
        {
          blockType: 'knowledgeBarrier',
          heading: livrosDefaults.knowledge.heading,
          description: livrosDefaults.knowledge.description,
          button: livrosDefaults.knowledge.button,
        },
        {
          blockType: 'booksTestimonials',
          badgeText: 'DEPOIMENTOS',
          heading: 'O que nossos leitores dizem',
          description: 'Veja o que os leitores estão dizendo sobre os livros de Roberto Navarro.',
          testimonials: livrosTestimonials.length ? livrosTestimonials : undefined,
        },
        {
          blockType: 'booksFinalCta',
          heading: livrosDefaults.finalCta.heading,
          description: livrosDefaults.finalCta.description,
          offerText: livrosDefaults.finalCta.offerText,
          price: livrosDefaults.finalCta.price,
          paymentInfo: livrosDefaults.finalCta.paymentInfo,
          button: livrosDefaults.finalCta.button,
        },
      ],
    })

    console.log('\n🎓 Populando página Formações...')
    await ensurePage(payload, 'formacoes', {
      title: 'Formações',
      slug: 'formacoes',
      status: 'published',
      layout: 'formacoes-page',
      pageBuilder: [
        {
          blockType: 'formacoesHero',
          badgeText: formacoesDefaults.hero.badgeText,
          title: formacoesDefaults.hero.title,
          highlightedText: formacoesDefaults.hero.highlightedText,
          description: formacoesDefaults.hero.description,
          accent: formacoesDefaults.hero.accent,
        },
        {
          blockType: 'formationsGrid',
          badgeText: formacoesDefaults.hero.badgeText,
          title: formacoesDefaults.hero.title,
          highlightedText: formacoesDefaults.hero.highlightedText,
          description: formacoesDefaults.hero.description,
          accent: formacoesDefaults.hero.accent,
          useFormacoesCollection: true,
        },
      ],
    })

    console.log('\n✅ Seed completo!')
    console.log('\n🎉 Todos os dados foram importados com sucesso!')

    return NextResponse.json({
      success: true,
      message: 'Seed executado com sucesso!',
    })
  } catch (error: any) {
    console.error('❌ Erro no seed:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    )
  }
}
