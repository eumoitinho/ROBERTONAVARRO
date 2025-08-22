// Script para atualizar os posts restantes com conteúdo completo
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sku3NuSJsrRD4behyaUUkiddYZeUT37ei1qVx0arD76Qqu9yIYPHvNqlU79xvbsssQogmBKz4mvNZbAUIJZ5bDVls2PRWltMs6K3gzh1iD9mS5s71rusuacKm8EPZwo85XfP1ALeZ0BPbKk1J3H5nLNAWhA4fYh40md9Cf5mWFUALqu6gFIY',
  useCdn: false
})

// Function to convert HTML content to Sanity blocks
function htmlToSanityBlocks(htmlContent) {
  const blocks = []
  let blockIndex = 0
  let spanIndex = 0

  // Remove extra whitespace and split by HTML tags
  const lines = htmlContent
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?=<[^\/])|(?<=>[^<]*<\/)/)
    .filter(line => line.trim() && !line.match(/^\s*$/))

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // H2 heading
    if (trimmed.match(/^<h2[^>]*>(.*?)<\/h2>$/)) {
      const text = trimmed.replace(/<h2[^>]*>(.*?)<\/h2>/, '$1').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'h2',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            text: text
          }]
        })
      }
    }
    // H3 heading
    else if (trimmed.match(/^<h3[^>]*>(.*?)<\/h3>$/)) {
      const text = trimmed.replace(/<h3[^>]*>(.*?)<\/h3>/, '$1').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'h3',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            text: text
          }]
        })
      }
    }
    // H4 heading
    else if (trimmed.match(/^<h4[^>]*>(.*?)<\/h4>$/)) {
      const text = trimmed.replace(/<h4[^>]*>(.*?)<\/h4>/, '$1').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'h4',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            text: text
          }]
        })
      }
    }
    // Blockquote
    else if (trimmed.match(/^<blockquote[^>]*>(.*?)<\/blockquote>$/s)) {
      const text = trimmed
        .replace(/<blockquote[^>]*>/, '')
        .replace(/<\/blockquote>/, '')
        .replace(/<p[^>]*>/g, '')
        .replace(/<\/p>/g, '')
        .trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'blockquote',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            text: text
          }]
        })
      }
    }
    // Ordered list item
    else if (trimmed.match(/^<ol[^>]*>/) || trimmed.match(/^<li[^>]*>.*<\/li>$/s)) {
      const text = trimmed
        .replace(/<li[^>]*>/g, '')
        .replace(/<\/li>/g, '')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(/<em>/g, '')
        .replace(/<\/em>/g, '')
        .trim()
      if (text && !text.match(/^<ol/) && !text.match(/^<\/ol/)) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'normal',
          listItem: 'number',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            text: text
          }]
        })
      }
    }
    // Unordered list item
    else if (trimmed.match(/^<ul[^>]*>/) || (trimmed.match(/^<li[^>]*>.*<\/li>$/s) && blocks.length > 0 && !blocks[blocks.length-1].listItem)) {
      const text = trimmed
        .replace(/<li[^>]*>/g, '')
        .replace(/<\/li>/g, '')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(/<em>/g, '')
        .replace(/<\/em>/g, '')
        .trim()
      if (text && !text.match(/^<ul/) && !text.match(/^<\/ul/)) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'normal',
          listItem: 'bullet',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            text: text
          }]
        })
      }
    }
    // Paragraph with mixed formatting
    else if (trimmed.match(/^<p[^>]*>.*<\/p>$/s)) {
      const content = trimmed.replace(/<p[^>]*>/, '').replace(/<\/p>/, '').trim()
      if (content) {
        const children = []
        let currentSpanIndex = spanIndex

        // Split by formatting tags and process
        const parts = content.split(/(<\/?(?:strong|em|b|i)>)/).filter(part => part.trim())
        let currentMarks = []
        
        for (const part of parts) {
          if (part === '<strong>' || part === '<b>') {
            currentMarks.push('strong')
          } else if (part === '</strong>' || part === '</b>') {
            currentMarks = currentMarks.filter(mark => mark !== 'strong')
          } else if (part === '<em>' || part === '<i>') {
            currentMarks.push('em')
          } else if (part === '</em>' || part === '</i>') {
            currentMarks = currentMarks.filter(mark => mark !== 'em')
          } else if (part.trim() && !part.match(/^<\/?[^>]+>$/)) {
            const span = {
              _type: 'span',
              _key: `span-${currentSpanIndex++}`,
              text: part.trim()
            }
            if (currentMarks.length > 0) {
              span.marks = [...currentMarks]
            }
            children.push(span)
          }
        }

        if (children.length > 0) {
          blocks.push({
            _type: 'block',
            _key: `block-${blockIndex++}`,
            style: 'normal',
            children: children
          })
          spanIndex = currentSpanIndex
        }
      }
    }
    // Plain text paragraphs (fallback)
    else if (trimmed && !trimmed.match(/^<[^>]+>$/) && !trimmed.match(/^<\/[^>]+>$/)) {
      const text = trimmed.replace(/<[^>]*>/g, '').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'normal',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            text: text
          }]
        })
      }
    }
  }

  return blocks
}

// Remaining blog posts with their existing IDs and content
const remainingPosts = [
  {
    id: 'blogpost-relacionar-dinheiro-consciente',
    content: `
      <h2>O Dinheiro e Suas Emoções</h2>
      <p>Você sabe ganhar dinheiro, mas já parou para pensar como se relaciona com ele? A escola te ensinou a fazer contas, mas ninguém te preparou para lidar com o medo, a ansiedade ou os impulsos que influenciam suas decisões financeiras.</p>
      
      <h3>O Problema Não É a Planilha</h3>
      <p>Você conhece as regras básicas de finanças, mas ainda gasta com coisas desnecessárias e deixa de investir no que importa. O problema não está na matemática — está nos <strong>padrões emocionais</strong> que guiam suas escolhas.</p>
      
      <h3>Decisões Financeiras São Emocionais</h3>
      <p>Estudos mostram que mais de <strong>70% das decisões financeiras</strong> têm raízes emocionais. Compras por impulso, medo de checar o extrato ou hesitação em investir não são apenas hábitos — são reflexos de emoções não processadas.</p>
      
      <blockquote>
        <p>Sua relação com o dinheiro é um reflexo da sua relação consigo mesmo. Transforme uma, e a outra seguirá.</p>
      </blockquote>
      
      <ul>
        <li><strong>Compra impulsiva</strong>: Uma tentativa de aliviar uma dor emocional.</li>
        <li><strong>Medo do extrato</strong>: Resultado de decisões no piloto automático.</li>
        <li><strong>Culpa após gastos</strong>: Sinal de desconexão com seus valores.</li>
      </ul>
      
      <h3>Quebre o Ciclo Financeiro</h3>
      <p>Muitos caem no mesmo padrão: ganham, gastam, sentem culpa e terminam com pouco ou nenhum patrimônio. Para mudar isso, você precisa trazer <strong>consciência</strong> às suas escolhas financeiras, entendendo as emoções por trás de cada decisão.</p>
      
      <h3>Construa uma Nova Relação com o Dinheiro</h3>
      <p>Comece pequeno: pergunte-se por que você gasta, evita ou investe de certas formas. Alinhe suas decisões financeiras aos seus objetivos de longo prazo. Com consciência e prática, você pode transformar sua relação com o dinheiro em uma ferramenta de liberdade.</p>
      
      <h3>Dê o Primeiro Passo</h3>
      <p>Ignorar as emoções por trás do dinheiro custa caro — noites mal dormidas, discussões e sonhos adiados. Comece hoje a construir uma relação consciente e saudável com suas finanças.</p>
    `
  },
  {
    id: 'blogpost-conforto-aliado-inimigo',
    content: `
      <h2>Estabilidade ou Medo Disfarçado?</h2>
      <p>Você chama de estabilidade, mas e se for apenas acomodação? A zona de conforto pode parecer segura, mas muitas vezes custa sua saúde, energia e liberdade. Está na hora de questionar o que te mantém parado.</p>
      
      <h3>Conforto que Drena</h3>
      <p>Quantos continuam em empregos que esgotam, só porque o desconhecido parece mais arriscado? Aceitar a exaustão como rotina é um sinal de que sua <em>"estabilidade"</em> pode estar te aprisionando.</p>
      
      <blockquote>
        <p>O maior risco não é falhar tentando algo novo, mas ter sucesso fazendo algo que não te realiza.</p>
      </blockquote>
      
      <h3>Por Que Você Adia Mudanças?</h3>
      <p>Decisões importantes — como mudar de carreira ou iniciar um projeto — são adiadas com desculpas como <em>"falta de tempo"</em>. Mas a verdadeira barreira é o medo de sair da zona de conforto.</p>
      
      <h3>Suas Desculpas São Armadilhas</h3>
      <p>Você criou um sistema de proteção com justificativas que parecem razoáveis:</p>
      <ul>
        <li><em>"Não é o momento certo."</em></li>
        <li><em>"Preciso resolver minhas dívidas primeiro."</em></li>
        <li><em>"Quando o trabalho estiver mais tranquilo."</em></li>
      </ul>
      <p>Essas desculpas te mantêm seguro, mas também estagnado.</p>
      
      <h3>O Verdadeiro Custo da Estabilidade</h3>
      <p>Estabilidade é boa apenas quando não sacrifica sua paz ou seus sonhos. Se ela está custando sua saúde mental ou adiando sua felicidade, é hora de repensar suas prioridades.</p>
      
      <h3>Reconquiste Sua Coragem</h3>
      <p>A mudança começa com pequenos atos de coragem. Enfrente um medo, tome uma decisão adiada, dê o primeiro passo. Cada ação te aproxima de uma vida mais plena e alinhada com seus propósitos.</p>
    `
  },
  {
    id: 'blogpost-diego-hypolito-10-milhoes',
    content: `
      <h2>Como Diego Hypólito Perdeu R$ 10 Milhões</h2>
      <p>Hoje quero falar sobre uma história que chocou o Brasil: Diego Hypólito, ex-ginasta olímpico, revelou que perdeu cerca de R$ 10 milhões conquistados em sua carreira. Um dos maiores nomes da ginástica brasileira, com títulos, medalhas e contratos milionários, hoje enfrenta a falência. O mais doloroso? Ele não perdeu por má fé, mas por falta de educação financeira.</p>
      
      <h3>O Que Levou à Perda?</h3>
      <p>Vamos entender os principais motivos:</p>
      <ul>
        <li><strong>Falta de Educação Financeira</strong>: Diego admitiu que "não sabia lidar com dinheiro". Ganhar muito não adianta se você não sabe administrar.</li>
        <li><strong>Confiança em Pessoas Erradas</strong>: Outros se aproveitaram da confiança dele, um erro comum quando não se entende o próprio patrimônio.</li>
        <li><strong>Investimentos Sem Estudo</strong>: Negócios mal planejados e sem retorno, misturando vida pessoal com empresa.</li>
        <li><strong>Falta de Planejamento</strong>: Sem reserva ou metas, qualquer problema vira uma tempestade.</li>
      </ul>
      
      <h3>Lições Para Você</h3>
      <p>Essa história é um alerta para todos nós:</p>
      <ul>
        <li><strong>Ganhar Muito Não Garante Nada</strong>: O que importa é proteger, investir com sabedoria e fazer render.</li>
        <li><strong>Educação Financeira é Prioridade</strong>: Saber montar um orçamento, fazer reservas e investir consciente é essencial.</li>
        <li><strong>Conselho Profissional, Não Palpite</strong>: Confie em planejadores financeiros, mas sempre fiscalize.</li>
        <li><strong>Delegar Não é Abandonar</strong>: Entenda o que está sendo feito com seu dinheiro.</li>
      </ul>
      
      <h3>Não é Só com Atletas</h3>
      <p>Outros nomes famosos, como Mike Tyson, Ronaldinho e Anderson Silva, também enfrentaram problemas financeiros. Isso não é exclusivo de atletas — empresários, médicos, artistas e até você podem cair nessa se não se prepararem.</p>
      
      <blockquote>
        <p>Educação financeira é o que separa quem constrói patrimônio de quem perde tudo.</p>
      </blockquote>
      
      <h3>Comece Hoje</h3>
      <p>A história de Diego é triste, mas pode ser o empurrão que você precisava. Se você ganha bem, cuide do seu dinheiro com responsabilidade. Se ainda não chegou lá, prepare-se para quando o dinheiro vier.</p>
    `
  },
  {
    id: 'blogpost-luxo-armadilha-atletas',
    content: `
      <h2>Quando o Luxo Vira Armadilha</h2>
      <p>O sucesso pode ser incrível, mas sem preparo financeiro, é uma armadilha. Atletas que ganham milhões jovens, sem orientação, muitas vezes quebram. Vamos ver casos reais e cinco dicas para você nunca cair nessa.</p>
      
      <h3>Por Que Atletas Quebram?</h3>
      <p>Ganhar muito sem preparo é como dirigir sem freio. Jovens, eles enfrentam amigos interesseiros, ostentação e investimentos ruins. Um estudo da <em>Sports Illustrated</em> mostra que 78% dos jogadores da NFL têm problemas financeiros dois anos após a aposentadoria, e 60% da NBA quebram em cinco anos.</p>
      
      <h3>Casos Reais</h3>
      <ul>
        <li><strong>Mike Tyson</strong>: Ganhou US$ 300 milhões, mas faliu com US$ 23 milhões em dívidas.</li>
        <li><strong>Ronaldinho</strong>: Conta bloqueada com apenas R$ 24, devido a gastos e processos.</li>
        <li><strong>Diego Maradona</strong>: Dívida de 40 milhões de euros com o fisco italiano.</li>
        <li><strong>Adriano Imperador</strong>: Perdeu muito com festas e excessos.</li>
        <li><strong>Antoine Walker</strong>: Ganhou US$ 100 milhões na NBA e quebrou.</li>
      </ul>
      
      <h3>Os 5 Mandamentos para Proteger Sua Grana</h3>
      <ol>
        <li><strong>Dinheiro sem direção é perdido</strong>: Tenha metas claras e controle de gastos.</li>
        <li><strong>Não terceirize totalmente</strong>: Saiba o mínimo sobre seu dinheiro.</li>
        <li><strong>Não ostente para impressionar</strong>: Viva com propósito, não aparência.</li>
        <li><strong>Invista no que entende</strong>: Estude antes de colocar seu dinheiro.</li>
        <li><strong>Pense como rico</strong>: Planeje o longo prazo com reservas e patrimônio.</li>
      </ol>
      
      <blockquote>
        <p>Educação financeira é o que separa quem brilha por um momento de quem constrói para sempre.</p>
      </blockquote>
      
      <h3>Conclusão</h3>
      <p>Esses atletas brilharam, mas caíram por falta de gestão. Você pode escolher diferente. Comece hoje a construir uma relação saudável com seu dinheiro.</p>
    `
  },
  {
    id: 'blogpost-proteger-dinheiro-investir',
    content: `
      <h2>Como Proteger Seu Dinheiro</h2>
      <p>Investir é essencial para construir riqueza, mas todo investimento tem risco. A diferença entre quem prospera e quem perde está no conhecimento. Vamos entender como avaliar riscos e proteger seu patrimônio.</p>
      
      <h3>Como Avaliar o Risco</h3>
      <ol>
        <li><strong>Volatilidade</strong>: Ativos como ações e criptos oscilam muito. Tesouro Direto é mais estável.</li>
        <li><strong>Liquidez</strong>: Imóveis podem demorar a vender. Escolha com base na sua necessidade de resgate.</li>
        <li><strong>Prazo</strong>: Longo prazo aumenta exposição a crises. Planeje bem.</li>
        <li><strong>Risco de Crédito</strong>: Verifique se há FGC ou outras garantias.</li>
        <li><strong>Falta de Diversificação</strong>: Não coloque tudo em um só lugar.</li>
      </ol>
      
      <h3>Investimentos com Garantia</h3>
      <ul>
        <li><strong>FGC</strong>: Protege até R$ 250 mil em CDB, LCI, LCA e poupança.</li>
        <li><strong>Tesouro Direto</strong>: Garantia do Governo Federal.</li>
        <li><strong>Fundos de Investimento</strong>: Seguem regras da CVM, com patrimônio separado.</li>
        <li><strong>Previdência Privada</strong>: Fiscalizada, boa para longo prazo.</li>
      </ul>
      
      <h3>Como Perder Tudo?</h3>
      <ul>
        <li><strong>Ações de Empresas Falidas</strong>: Podem virar pó.</li>
        <li><strong>Cripto sem Projeto</strong>: Moedas podem zerar rápido.</li>
        <li><strong>Pirâmides Financeiras</strong>: Promessas de retorno garantido são golpes.</li>
        <li><strong>Investimentos sem Regulamentação</strong>: Corretoras falsas e "consultores" são riscos.</li>
      </ul>
      
      <h3>Como Reduzir o Risco</h3>
      <ul>
        <li>Diversifique seus investimentos.</li>
        <li>Conheça seu perfil (conservador, moderado, agressivo).</li>
        <li>Estude antes de investir.</li>
        <li>Busque apoio de consultores financeiros.</li>
        <li>Desconfie de promessas milagrosas.</li>
      </ul>
      
      <blockquote>
        <p>Investir com inteligência é entender o risco, não evitá-lo.</p>
      </blockquote>
      
      <h3>Conclusão</h3>
      <p>Quem perde dinheiro no mercado vai na emoção ou na dica quente. Construa riqueza com conhecimento e estratégia.</p>
    `
  }
]

async function updateRemainingPosts() {
  console.log('📝 Atualizando posts restantes com conteúdo completo...')
  
  try {
    for (const post of remainingPosts) {
      console.log(`🔄 Processando: ${post.id}`)
      
      // Convert HTML content to Sanity blocks
      const blocks = htmlToSanityBlocks(post.content)
      
      // Update the post in Sanity
      await client.patch(post.id).set({
        body: blocks
      }).commit()
      
      console.log(`✅ Post atualizado: ${post.id}`)
    }
    
    console.log('🎉 Todos os posts restantes foram atualizados com conteúdo completo!')
    
  } catch (error) {
    console.error('❌ Erro ao atualizar posts:', error)
  }
}

updateRemainingPosts()