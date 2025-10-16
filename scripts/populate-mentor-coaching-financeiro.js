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
  console.error('[populate-mentor-coaching] Variáveis ausentes: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

const doc = {
  _id: 'formation-mentor-coaching-financeiro-v1',
  _type: 'formationPage',
  title: 'Mentor Coaching Financeiro',
  slug: { current: 'mentor-coaching-financeiro' },
  hero: {
    title: 'Transformamos profissionais em verdadeiros geradores da riqueza',
    subtitle: 'MENTOR COACHING FINANCEIRO',
    description: 'Aprenda a instalar a inteligência financeira na sua vida e aumentar sua renda, com estratégias comprovadas.',
    ctaText: 'ESTOU PRONTO PARA MUDAR MINHA VIDA!',
    ctaLink: '#inscricao',
  },
  mentorSection: {
    badge: 'TRANSFORME SUA VIDA',
    title: 'De profissional bem-sucedido a gerador de riqueza',
    paragraphs: [
      'Você já conquistou muito, mas sente que pode ir além? O Mentor Coaching Financeiro foi criado para profissionais como você, que desejam quebrar o teto de vidro financeiro e alcançar um novo patamar de prosperidade.',
      'Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, se tornou multimilionário em menos de sete anos.',
      'Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos.',
      'Ao longo de sua trajetória, já impactou mais de 1,5 milhão de alunos no Brasil e no mundo.',
    ],
  },
  aboutSection: {
    badge: 'MENTOR COACHING FINANCEIRO',
    heading: 'A metodologia que vai reprogramar sua relação com o dinheiro',
    paragraphs: [
      'O Mentor Coaching Financeiro é resultado de mais de uma década de pesquisa e aplicação prática com milhares de alunos. É a síntese de tudo que Roberto Navarro descobriu sobre como pessoas realmente bem-sucedidas pensam, sentem e agem em relação ao dinheiro.',
      'Esta não é mais uma formação sobre "como investir" ou "como controlar gastos".',
      'Este é um processo de transformação profunda que ataca a raiz do problema: sua programação inconsciente sobre dinheiro, sucesso e merecimento.',
    ],
  },
  learnSection: {
    badge: 'CONTEÚDO',
    title: 'O QUE VOCÊ APRENDERÁ?',
    items: [
      { title: 'Anamnese financeira profunda', desc: 'Faça uma análise cirúrgica de sua relação com o dinheiro, identificando crenças limitantes profundamente enraizadas que sabotam seu crescimento financeiro.' },
      { title: 'Inteligência financeira automática', desc: 'Desenvolva a capacidade de tomar decisões financeiras com a clareza de um investidor profissional e construa um senso financeiro aguçado que guiará suas decisões.' },
      { title: 'Ampliação de seu potencial financeiro', desc: 'Mude literalmente sua identidade financeira, permitindo que níveis superiores de riqueza se manifestem naturalmente em sua vida.' },
      { title: 'Potes da Riqueza', desc: 'Descubra como estruturar suas finanças para que o dinheiro trabalhe para você, criando múltiplas fontes de renda passiva e ativa.' },
      { title: 'Blindagem contra o consumo desnecessário', desc: 'Aprenda a identificar e neutralizar os gatilhos psicológicos que levam ao consumo impulsivo e ao desperdício de recursos.' },
      { title: 'Estratégias de multiplicação de renda', desc: 'Descubra como aumentar sua capacidade de geração de renda, criando novas oportunidades de renda e expandindo suas possibilidades financeiras.' },
    ],
  },
  audienceSection: {
    badge: 'PÚBLICO-ALVO',
    title: 'PARA QUEM É O TREINAMENTO?',
    intro: 'Este treinamento foi desenvolvido especificamente para:',
    bullets: [
      { title: 'Empresários e empreendedores de sucesso', desc: 'Que já construíram negócios rentáveis, mas sentem que poderiam otimizar muito melhor seus recursos e criar riqueza real a partir dos resultados do negócio.' },
      { title: 'Executivos e profissionais liberais', desc: 'Médicos, advogados, consultores, engenheiros e outros profissionais que querem transformar sua renda em patrimônio sólido e liberdade financeira.' },
      { title: 'Investidores e gestores de patrimônio', desc: 'Que já possuem conhecimento técnico sobre investimentos, mas querem desenvolver a mentalidade dos verdadeiros criadores de riqueza.' },
      { title: 'Servidores públicos', desc: 'Que possuem estabilidade e renda consistente e querem maximizar seu potencial de construção de patrimônio.' },
      { title: 'Profissionais de marketing e consultoria', desc: 'Que já dominam as técnicas de geração de renda online mas querem estruturar sua vida financeira como verdadeiros empresários.' },
    ],
  },
  benefits: {
    badge: 'RESULTADOS',
    title: 'O QUE ESPERAR APÓS O TREINAMENTO?',
    description: 'Resultados reais e diferenciais profissionais ao concluir a formação.',
    items: [
      { title: 'Clareza total', description: 'Você saberá exatamente onde quer chegar financeiramente e terá um plano claro para isso.' },
      { title: 'Inteligência financeira automática', description: 'Suas decisões financeiras se tornarão naturalmente mais inteligentes e estratégicas.' },
      { title: 'Múltiplas fontes de renda', description: 'Você desenvolverá a capacidade de identificar e criar novas oportunidades de renda.' },
      { title: 'Proteção contra crises', description: 'Sua estrutura financeira será blindada contra oscilações econômicas e crises setoriais.' },
      { title: 'Legado familiar', description: 'Você construirá não apenas riqueza para si, mas um patrimônio que beneficiará as próximas gerações.' },
      { title: 'Liberdade real', description: 'Tenha mais opções e não dependa mais de uma única fonte de renda para manter seu padrão de vida.' },
    ],
  },
  guarantees: {
    badge: 'GARANTIAS',
    title: 'SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA',
    description: '6 meses para experimentar uma mudança real',
    items: [
      { title: 'Garantia de 6 meses', description: 'Ao se inscrever no Mentor Coaching Financeiro, você conta com uma garantia incondicional de 6 meses. Aplique o método, veja resultados reais na sua vida financeira ou receba o dobro do seu dinheiro de volta!' },
      { title: 'Garantia incondicional', description: 'Isso mesmo: se em até 6 meses você sentir que não teve nenhum avanço, nós devolvemos duas vezes o valor pago, sem letras miúdas.' },
      { title: 'Compromisso com resultados', description: 'Essa não é só uma garantia. É a nossa forma de mostrar que acreditamos profundamente no que fazemos – e no seu potencial de mudança.' },
    ],
  },
  faq: {
    badge: 'FAQ',
    title: 'Perguntas frequentes',
    description: 'Confira as respostas para as principais dúvidas sobre o Mentor Coaching Financeiro.',
    items: [
      {
        question: 'Para quem é esta formação?',
        answer: 'O Mentor Coaching Financeiro é desenvolvido para profissionais que já possuem uma renda considerável mas sentem que poderiam otimizar muito melhor seus recursos financeiros. É ideal para empresários, executivos, profissionais liberais, investidores e qualquer pessoa que queira quebrar barreiras internas para alcançar um novo patamar de riqueza.'
      },
      {
        question: 'O que eu vou aprender no treinamento?',
        answer: 'Você aprenderá a identificar e modificar padrões inconscientes que limitam seu crescimento financeiro, desenvolverá inteligência financeira automatizada, criará múltiplas fontes de renda, construirá proteção contra o consumo desnecessário e estabelecerá um sistema pessoal de criação de riqueza.'
      },
      {
        question: 'O que acontece depois do treinamento?',
        answer: 'Após concluir o treinamento, você terá acesso a uma comunidade exclusiva de ex-alunos, atualizações periódicas da metodologia e suporte contínuo para garantir que você mantenha e expanda os resultados conquistados.'
      },
      {
        question: 'Como este treinamento pode transformar minha vida e meu negócio?',
        answer: 'O Mentor Coaching Financeiro trabalha na raiz das limitações financeiras - sua programação mental e emocional sobre dinheiro. Ao transformar esta base, você naturalmente toma melhores decisões, identifica mais oportunidades, constrói riqueza mais rapidamente e desenvolve uma relação saudável e próspera com o dinheiro.'
      },
    ],
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
    console.error('[populate-mentor-coaching] Falha:', res.status, txt)
    process.exit(1)
  }
  const json = await res.json()
  console.log('[populate-mentor-coaching] OK', JSON.stringify(json, null, 2))
}

main().catch((err) => {
  console.error('[populate-mentor-coaching] Erro inesperado', err)
  process.exit(1)
})
