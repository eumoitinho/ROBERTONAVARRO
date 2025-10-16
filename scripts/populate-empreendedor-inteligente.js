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
  console.error('[populate-empreendedor] Variáveis ausentes: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

const doc = {
  _id: 'formation-empreendedor-inteligente-v1',
  _type: 'formationPage',
  title: 'Empreendedor Inteligente',
  slug: { current: 'empreendedor-inteligente' },
  hero: {
    title: 'EMPREENDEDOR INTELIGENTE',
    subtitle: 'Formação exclusiva para empresários',
    description: 'Formação exclusiva para empresários que querem escalar resultados, atrair investidores, otimizar a gestão e parar de apagar incêndios na própria empresa.',
    ctaText: 'GARANTA SUA VAGA!',
    ctaLink: '#inscricao',
  },
  challengesSection: {
    badge: 'DESAFIOS',
    title: 'POR QUE SUA EMPRESA NÃO DECOLA?',
    description: 'A diferença entre empresários que prosperam e os que lutam para sobreviver está no conhecimento certo e no acesso às pessoas certas.',
    items: [
      { title: 'Você fatura, mas não lucra?', desc: 'Aprenda a formar caixa, controlar gastos invisíveis e parar de pagar juros desnecessários.' },
      { title: 'Quer crescer, mas está preso à operação?', desc: 'Crie um modelo de gestão inteligente para ter mais tempo e liberdade sem comprometer os resultados.' },
      { title: 'Dificuldade para contratar pessoas?', desc: 'Descubra como atrair, treinar e reter talentos que realmente vestem a camisa da sua empresa.' },
      { title: 'Sente que ninguém entende seus desafios?', desc: 'Participe de uma imersão com networking de alto nível e troque com empresários como você.' },
    ],
  },
  valueSection: {
    badge: 'VALOR DO PROGRAMA',
    title: 'O QUE OS GRANDES EMPRESÁRIOS SABEM QUE VOCÊ AINDA NÃO SABE',
    paragraphs: [
      'O programa Empreendedor Inteligente é destinado a empresários que desejam parar de sobreviver e começar a crescer com consistência. Em 3 dias, você vai aprender as estratégias usadas pelos empresários mais bem-sucedidos do Brasil para escalar faturamento, otimizar gestão, organizar finanças e atrair parceiros estratégicos.',
      'Você também terá acesso a uma rede de empresários que compartilham experiências reais, além de métodos práticos que você pode aplicar imediatamente no seu negócio. Não é sobre motivação: é sobre transformação empresarial com técnica, visão e resultado.',
    ],
    ctaText: 'GARANTA SUA VAGA AGORA!',
    ctaLink: '#inscricao',
  },
  learnSection: {
    badge: 'CONTEÚDO',
    title: 'O QUE VOCÊ VAI APRENDER PARA DESTRAVAR O CRESCIMENTO DA SUA EMPRESA',
    items: [
      { title: 'Crédito inteligente', desc: 'Pare de ser refém de bancos e aprenda a acessar capital de giro sem taxas abusivas.' },
      { title: 'Contabilidade estratégica', desc: 'Use a contabilidade como aliada do lucro e da tomada de decisão.' },
      { title: 'Sócios e investidores', desc: 'Estruture sua empresa para atrair investimentos sem abrir mão do controle.' },
      { title: 'Time comprometido', desc: 'Monte um time que entrega resultado, mesmo quando você não está por perto.' },
      { title: 'Modelo de vendas lucrativo', desc: 'Construa seu próprio sistema de vendas e pare de depender de fórmulas genéricas.' },
      { title: 'Marketing digital de verdade', desc: 'Invista com inteligência e escale sua presença digital sem desperdiçar recursos.' },
      { title: 'Formação de caixa e capital de giro', desc: 'Crie uma base financeira sólida para crescer com segurança e consistência.' },
      { title: 'Diversificação de rendas', desc: 'Descubra como criar novas fontes de receita e blindar seu negócio contra imprevistos.' },
      { title: 'Plano de aposentadoria', desc: 'Aprenda a construir sua liberdade financeira e garantir um futuro tranquilo, mesmo fora da operação.' },
      { title: 'Networking de alto nível', desc: 'Conecte-se com empresários que podem abrir portas e transformar seu negócio.' },
    ],
    ctaText: 'GARANTA SUA VAGA AGORA!',
    ctaLink: '#inscricao',
  },
  methodologySection: {
    badge: 'METODOLOGIA',
    title: 'METODOLOGIA LEAN PARA CRESCIMENTO EFICIENTE',
    description: 'Empresas que crescem de forma consistente mesmo em tempos difíceis têm algo em comum: uma gestão enxuta, inteligente e focada em resultados.',
    items: [
      { title: 'Crescimento x Escala', desc: 'Entenda a diferença entre crescer e escalar — e como se preparar para isso com segurança e previsibilidade.' },
      { title: 'Capital de Giro', desc: 'Organize seu fluxo de caixa, equilibre entradas e saídas e mantenha seu negócio financeiramente saudável.' },
      { title: 'Modelo de Trabalho ABC', desc: 'Implante um modelo de operação eficiente, com prioridades bem definidas e foco no que gera valor.' },
      { title: 'Marketing Digital', desc: 'Use a comunicação digital para fortalecer sua presença online, atraindo e fidelizando clientes.' },
      { title: 'Valuation', desc: 'Saiba quanto vale sua empresa e como aumentar esse valor, preparando-se para investidores.' },
    ],
    ctaText: 'GARANTA SUA VAGA AGORA!',
    ctaLink: '#inscricao',
  },
  audienceSection: {
    badge: 'PÚBLICO-ALVO',
    title: 'PARA QUEM É O EMPREENDEDOR INTELIGENTE?',
    intro: 'O treinamento é indicado para empresários e empreendedores que enfrentam desafios como falta de clientes ou dificuldades para fazer o negócio prosperar. Aqui, você pode:',
    bullets: [
      { title: 'Construir um planejamento eficiente', desc: 'Atinga seu primeiro milhão com um plano claro e prático.' },
      { title: 'Criar objetivos práticos', desc: 'Desenvolva uma empresa rica e próspera com metas bem definidas.' },
      { title: 'Elaborar estratégias inteligentes', desc: 'Torne seu negócio o número 1 do seu segmento com abordagens eficazes.' },
    ],
    ctaText: 'GARANTA SUA VAGA AGORA!',
    ctaLink: '#inscricao',
  },
  newsletter: {
    title: 'INSCREVA-SE AGORA E SAIA DO MODO SOBREVIVÊNCIA',
    description: 'Preencha seus dados e entre para um grupo seleto de empresários prontos para escalar resultados com estratégia.',
    ctaText: 'GARANTA SUA VAGA AGORA!'
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
    console.error('[populate-empreendedor] Falha:', res.status, txt)
    process.exit(1)
  }
  const json = await res.json()
  console.log('[populate-empreendedor] OK', JSON.stringify(json, null, 2))
}

main().catch((err) => {
  console.error('[populate-empreendedor] Erro inesperado', err)
  process.exit(1)
})


