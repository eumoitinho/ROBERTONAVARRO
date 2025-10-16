#!/usr/bin/env node
try {
  const { config } = require('dotenv')
  config({ path: '.env.local' })
  config()
} catch (_) {}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET
const TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-10-01'

if (!PROJECT_ID || !DATASET || !TOKEN) {
  console.error('[populate-educador] Variáveis ausentes: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

const doc = {
  _id: 'formation-educador-financeiro-v1',
  _type: 'formationPage',
  title: 'Educador Financeiro',
  slug: { current: 'educador-financeiro' },
  hero: {
    title: 'EDUCADOR FINANCEIRO',
    subtitle: 'A única formação do mercado com LICENÇA PROFISSIONAL chancelada pela Roberto Navarro Academia - RNA',
    description: 'Torne-se um Educador Financeiro licenciado com certificação reconhecida. Transforme vidas enquanto constrói sua própria prosperidade com respaldo profissional e metodologia validada.',
    ctaText: 'QUERO MINHA LICENÇA PROFISSIONAL!',
    ctaLink: '#inscricao',
  },
  controls: {
    showBenefits: true,
    showMainContent: true,
    showHighlights: true,
    showBonuses: true,
    showPricing: false,
    showTestimonials: true,
    showFaq: true,
  },
  benefits: {
    badge: 'BENEFÍCIOS',
    title: 'BENEFÍCIOS DA FORMAÇÃO',
    description: 'Resultados reais e diferenciais profissionais ao concluir a formação.',
    items: [
      { title: 'Independência financeira', description: 'Aplique os conceitos e alcance estabilidade e liberdade financeira.' },
      { title: 'Reconhecimento profissional', description: 'Torne-se referência no ensino de finanças com autoridade.' },
      { title: 'Realização de sonhos', description: 'Alcance objetivos pessoais e inspire outros a fazerem o mesmo.' },
      { title: 'Alta rentabilidade', description: 'Transforme educação financeira em fonte de renda escalável.' },
    ],
  },
  mecSection: {
    heading: 'EXCELÊNCIA RECONHECIDA PELO MINISTÉRIO DA EDUCAÇÃO',
    description: 'Formação com certificação oficial que valida suas competências e abre portas no mercado.',
    points: ['Reconhecimento nacional', 'Validação profissional', 'Credibilidade garantida']
  },
  licenseSection: {
    transformationsTitle: 'Essa será sua transformação:',
    transformations: [
      'Licença para atuar como Educador Financeiro',
      'Respeito profissional no mercado',
      'Mais valorização do seu serviço',
      'Respaldo do ICF para ensinar sobre geração de riqueza',
      'Ampliar o número de clientes ativos',
      'Consolidar uma carreira próspera e segura'
    ],
    benefitsTitle: 'Benefícios da Licença:',
    benefits: [
      'Mais poder nas suas negociações',
      'Mais otimismo na sua carreira',
      'Mais admiração no seu círculo social',
      'Licença chancelada pela RNA',
      'Respaldo profissional que reduz a concorrência',
      'Ganhos maiores que os demais profissionais'
    ],
    statement: 'Em breve irão sobreviver no mercado apenas quem tiver respeitada Licença Profissional!'
  },
  exclusiveMaterials: {
    badge: 'MATERIAIS EXCLUSIVOS',
    heading: 'EXPERIMENTE A IMERSÃO DO EDUCADOR FINANCEIRO',
    description: 'Prévia da jornada com materiais oficiais e vídeo de apresentação.',
    chips: [
      'Download de apostilas e exercícios selecionados',
      'Bastidores da metodologia com orientações do time',
      'Vídeo introdutório guiado pela equipe oficial RNA',
      'Checklist para acelerar seus primeiros atendimentos'
    ],
    videoSrc: 'https://example.com/video.mp4',
    ctaText: 'ACESSAR PRÉVIA EXCLUSIVA'
  },
  aboutSection: {
    badge: 'SOBRE O CURSO',
    heading: 'SEJA UM AGENTE DA MUDANÇA E ENSINE O CAMINHO PARA A PROSPERIDADE',
    paragraphs: [
      'Com certificação reconhecida pelo MEC, a formação de Educador Financeiro é o seu passaporte para uma nova realidade de propósito e prosperidade.',
      'Em poucos dias, você verá resultados concretos em sua vida e aprenderá como dominar os fundamentos da educação financeira e aplicar os conhecimentos na prática.',
      'Você desenvolverá habilidades pedagógicas e de comunicação para atuar em consultorias, palestras ou cursos.',
      'A formação abre portas para novas fontes de renda e permite construir um negócio sólido no campo da educação financeira.',
    ],
    ctaText: 'QUERO SER UM EDUCADOR FINANCEIRO!',
    ctaLink: '#inscricao'
  },
  features: {
    badge: 'RECURSOS',
    title: 'TUDO O QUE VOCÊ PRECISA PARA TRANSFORMAR SUA CARREIRA',
    items: [
      { icon: 'book', title: 'Conhecimento abrangente', description: 'Do básico ao avançado em finanças.' },
      { icon: 'briefcase', title: 'Ferramentas práticas', description: 'Planilhas e templates prontos.' },
      { icon: 'users', title: 'Mentoria personalizada', description: 'Orientação direta de especialistas.' },
    ]
  },
  trainerSection: {
    badge: 'OPORTUNIDADE EXCLUSIVA',
    title: 'SEJA UM TREINADOR LICENCIADO',
    description: 'Atue como treinador dos cursos oficiais do ICF.',
    courses: [
      { title: 'LIVRE DE DÍVIDAS', description: 'Estratégias práticas para negociação de dívidas.', },
      { title: 'INVESTIMENTOS INTELIGENTES', description: 'Curso prático sobre bolsa e renda fixa.' },
      { title: 'TRANSFORMAÇÃO FINANCEIRA', description: 'Propósito, liberdade e múltiplas rendas.' },
    ]
  },
  mentorSection: {
    badge: 'SEU MENTOR',
    title: 'APRENDA COM O MENTOR DOS MENTORES',
    paragraphs: [
      'Roberto Navarro é um exemplo de superação e transformação.',
      'Reconhecido como o maior Educador Financeiro do Brasil.',
      'Missão: ajudar 10 milhões de brasileiros a prosperar.'
    ]
  },
  guarantees: {
    badge: 'GARANTIAS',
    title: 'INVESTIMENTO SEGURO',
    items: [
      { title: 'Garantia legal de 7 dias', description: 'Reembolso integral em 7 dias.' },
      { title: 'Garantia de resultados', description: 'Compromisso com seu progresso e resultados.' },
      { title: 'Certificação reconhecida', description: 'Comprova suas habilidades e credibilidade.' }
    ]
  },
  newsletter: {
    title: 'ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR',
    description: 'Participe da formação que já mudou milhares de vidas.',
    ctaText: 'QUERO SER UM EDUCADOR FINANCEIRO!'
  },
  mainContent: {
    badge: 'SOBRE O CURSO',
    title: 'FORMAÇÃO COMPLETA PARA TRANSFORMAR CARREIRAS',
    description: 'Fundamentos de educação financeira aplicados com metodologia clara e eficaz.',
    items: [
      { title: 'Certificação reconhecida', description: 'Formação com credibilidade e chancela institucional.', benefits: ['Respaldo profissional','Valorização no mercado','Base sólida de atuação'] },
      { title: 'Atuação prática', description: 'Preparação para consultorias, palestras e cursos.', benefits: ['Método validado','Comunicação efetiva','Ferramentas prontas'] },
    ],
  },
  testimonials: {
    badge: 'DEPOIMENTOS',
    title: 'O QUE NOSSOS ALUNOS DIZEM',
    description: 'Histórias de transformação real com nosso método.',
    items: [
      { name: 'Ana Souza', role: 'Empresária', quote: 'Organizei minhas finanças e voltei a sonhar. Hoje tenho paz financeira!', rating: 5 },
      { name: 'José Lima', role: 'Professor', quote: 'Renegociei dívidas, criei reserva e comecei a investir. Mudou minha vida.', rating: 5 },
      { name: 'Patrícia Gomes', role: 'Autônoma', quote: 'Recomecei com consciência financeira e hoje tenho uma vida mais tranquila.', rating: 5 },
    ],
  },
  finalCta: {
    title: 'ÚLTIMAS VAGAS: VOCÊ NASCEU PARA PROSPERAR',
    description: 'Participe da formação que já mudou milhares de vidas e pode mudar a sua. Preencha seus dados e dê o primeiro passo.',
    buttonText: 'QUERO SER UM EDUCADOR FINANCEIRO!',
    buttonLink: '#inscricao',
  },
}

async function main() {
  const mutations = [{ createOrReplace: doc }]
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  })
  if (!res.ok) {
    const txt = await res.text()
    console.error('[populate-educador] Falha:', res.status, txt)
    process.exit(1)
  }
  const json = await res.json()
  console.log('[populate-educador] OK', JSON.stringify(json, null, 2))
}

main().catch((err) => {
  console.error('[populate-educador] Erro inesperado', err)
  process.exit(1)
})


