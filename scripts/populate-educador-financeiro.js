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


