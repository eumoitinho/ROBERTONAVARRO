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
  console.error('[populate-lcf-mentoring] Variáveis ausentes: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

const doc = {
  _id: 'formation-lcf-mentoring-pro-v1',
  _type: 'formationPage',
  title: 'LCF Mentoring Pro',
  slug: { current: 'lcf-mentoring-pro' },
  hero: {
    title: 'LCF MENTORING PRO',
    subtitle: 'Você já tem o dinheiro. Agora, só falta o controle!',
    description: 'O LCF Mentoring PRO reúne os treinamentos mais transformadores do educador financeiro Roberto Navarro em um único programa criado para te colocar no seleto grupo de pessoas que vivem com consciência, riqueza e propósito.',
    ctaText: 'CONQUISTE SUA VAGA!',
    ctaLink: '#inscricao',
  },
  learnSection: {
    badge: 'O QUE VOCÊ VAI APRENDER',
    title: 'DOMINE SUA VIDA COM INTELEGENCIA DE ELITE',
    items: [
      { title: 'Inteligência emocional', desc: 'Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.' },
      { title: 'Inteligência financeira', desc: 'Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.' },
      { title: 'Inteligência espiritual', desc: 'Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo - é a base para prosperar com equilíbrio.' },
      { title: 'Inteligência estratégica', desc: 'Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.' },
    ],
    ctaText: 'CONQUISTE SUA VAGA!',
    ctaLink: '#inscricao',
  },
  aboutSection: {
    badge: 'SOBRE O PROGRAMA',
    heading: 'A RIQUEZA COMEÇA COM CLAREZA.',
    paragraphs: [
      'O LCF Mentoring PRO é o programa mais completo de transformação financeira, emocional e espiritual do Brasil. Idealizado por Roberto Navarro, une três treinamentos impactantes em uma jornada poderosa de evolução pessoal e profissional.',
      'Transformação Completa: O programa mais completo de transformação financeira, emocional e espiritual.',
      'Resultados Reais: Desenvolva inteligência financeira aplicada e trabalhe sua mentalidade de alta performance.',
      'Ecossistema de Suporte: Conteúdos de alto nível, encontros presenciais e suporte contínuo.',
    ],
    ctaText: 'CONQUISTE SUA VAGA!',
    ctaLink: '#inscricao',
  },
  benefits: {
    badge: 'BENEFÍCIOS',
    title: 'BENEFÍCIOS DA FORMAÇÃO',
    description: 'Resultados reais e diferenciais profissionais ao concluir a formação.',
    items: [
      { title: 'Acesso vitalício aos principais treinamentos', description: 'Tenha acesso permanente a todo o conteúdo do programa.' },
      { title: '4 imersões presenciais intensivas', description: 'Encontros presenciais para conexão e aprendizado profundo.' },
      { title: 'Mais de 100h de conteúdo prático', description: 'Conteúdo extenso e aplicável para transformação real.' },
      { title: 'Suporte direto e acompanhamento', description: 'Acompanhamento personalizado durante todo o programa.' },
      { title: 'Garantia de 6 meses', description: 'Se sua vida não mudar, devolvemos seu dinheiro.' },
    ],
  },
  pricing: {
    badge: 'INVESTIMENTO',
    title: 'Sua Vaga Limitada no LCF Mentoring PRO',
    description: 'Acesso vitalício, suporte real e garantia total para sua transformação.',
    tickets: [
      {
        name: 'LCF Mentoring PRO',
        price: 'R$ 20.000',
        description: 'Condições facilitadas e parcelamento disponíveis',
        features: [
          'Acesso vitalício aos principais treinamentos',
          '4 imersões presenciais intensivas',
          'Mais de 100h de conteúdo prático',
          'Suporte direto e acompanhamento',
          'Garantia de 6 meses',
        ],
        highlighted: true,
        ctaText: 'QUERO ENTRAR PARA O LCF PRO',
        ctaLink: '#inscricao',
      },
    ],
  },
  faq: {
    badge: 'Perguntas Frequentes',
    title: 'DÚVIDAS? NÓS RESPONDEMOS',
    description: 'Confira as respostas para as principais dúvidas sobre o LCF Mentoring PRO.',
    items: [
      {
        question: 'O LCF Mentoring PRO é só para quem quer ser coach?',
        answer: 'Não! O programa é para quem deseja transformar sua vida pessoal e profissional. Você pode aplicar os conhecimentos em sua vida ou, se quiser, transformar isso em uma carreira de impacto.'
      },
      {
        question: 'Há encontros presenciais?',
        answer: 'Sim! São 4 imersões presenciais em datas estratégicas. Momentos de conexão, aprendizado e virada de chave.'
      },
      {
        question: 'Posso parcelar o valor?',
        answer: 'Sim! Oferecemos condições facilitadas para sua entrada. Preencha o formulário e receba orientação personalizada.'
      },
      {
        question: 'Qual a diferença do PRO para outros programas?',
        answer: 'O PRO une os treinamentos mais poderosos do Navarro com acompanhamento real, experiência imersiva e aplicação prática. É a experiência mais completa para quem busca transformação de verdade.'
      },
      {
        question: 'Em quanto tempo verei resultados?',
        answer: 'Depende do seu comprometimento. Nos primeiros 30 dias você já terá clareza e ações estruturadas. Em 6 meses, os resultados serão visíveis.'
      },
    ],
  },
  newsletter: {
    title: 'INSCREVA-SE PARA TER A MUDANÇA DE VIDA',
    description: 'Obtenha mais informações sobre a LCF Mentoring Pro',
    ctaText: 'CONQUISTE SUA VAGA!'
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
    console.error('[populate-lcf-mentoring] Falha:', res.status, txt)
    process.exit(1)
  }
  const json = await res.json()
  console.log('[populate-lcf-mentoring] OK', JSON.stringify(json, null, 2))
}

main().catch((err) => {
  console.error('[populate-lcf-mentoring] Erro inesperado', err)
  process.exit(1)
})
