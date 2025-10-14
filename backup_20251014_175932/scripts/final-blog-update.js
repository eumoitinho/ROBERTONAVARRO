// Script final para atualizar os últimos posts restantes com conteúdo completo
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
    // Table handling
    else if (trimmed.match(/^<table[^>]*>/) || trimmed.match(/^<\/table>/)) {
      // Skip table tags for now, just extract text content
      continue
    }
    else if (trimmed.match(/^<tr[^>]*>/) || trimmed.match(/^<\/tr>/)) {
      // Skip row tags
      continue  
    }
    else if (trimmed.match(/^<th[^>]*>(.*?)<\/th>$/)) {
      const text = trimmed.replace(/<th[^>]*>(.*?)<\/th>/, '$1').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block-${blockIndex++}`,
          style: 'normal',
          children: [{
            _type: 'span',
            _key: `span-${spanIndex++}`,
            marks: ['strong'],
            text: text
          }]
        })
      }
    }
    else if (trimmed.match(/^<td[^>]*>(.*?)<\/td>$/)) {
      const text = trimmed.replace(/<td[^>]*>(.*?)<\/td>/, '$1').trim()
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

// Final batch of posts with their existing IDs and complete content
const finalPosts = [
  {
    id: 'blogpost-guia-definitivo-investimentos',
    content: `
      <h2>Guia Definitivo dos Investimentos</h2>
      <p>Investir pode parecer complicado, mas entender as opções é o primeiro passo para a prosperidade financeira. Vamos descomplicar os tipos de investimentos e te ajudar a escolher o melhor para você.</p>
      
      <h3>Tipos de Investimento</h3>
      <h4>1. Renda Fixa – Segurança e Previsibilidade</h4>
      <ul>
        <li><strong>Tesouro Direto</strong>: Empréstimo ao governo, com garantia federal (ex.: Selic, IPCA+).</li>
        <li><strong>CDB</strong>: Empréstimo a bancos, protegido até R$ 250 mil pelo FGC.</li>
        <li><strong>LCI e LCA</strong>: Isentas de IR, protegidas pelo FGC.</li>
      </ul>
      
      <h4>2. Renda Variável – Oportunidade com Risco</h4>
      <ul>
        <li><strong>Ações</strong>: Seja sócio de empresas como Petrobras ou Vale.</li>
        <li><strong>Fundos Imobiliários (FIIs)</strong>: Ganhe aluguel sem comprar imóveis.</li>
        <li><strong>ETFs</strong>: Fundos que seguem índices como o Ibovespa.</li>
      </ul>
      
      <h4>3. Fundos de Investimento – Gestão Profissional</h4>
      <ul>
        <li><strong>Renda Fixa</strong>: Investem em títulos seguros.</li>
        <li><strong>Multimercado</strong>: Diversificam em ações, moedas e mais.</li>
        <li><strong>Ações</strong>: Focam no mercado acionário.</li>
      </ul>
      
      <h4>4. Imóveis – Segurança que Valoriza</h4>
      <ul>
        <li><strong>Compra Direta</strong>: Imóveis para aluguel ou valorização.</li>
        <li><strong>FIIs</strong>: Acesso ao mercado imobiliário com menos capital.</li>
      </ul>
      
      <h3>Qual é o Mais Seguro?</h3>
      <p>Renda fixa, como Tesouro Direto, CDB, LCI e LCA, é a mais segura, com garantias do governo ou FGC.</p>
      
      <h3>Qual Tem Maior Rentabilidade?</h3>
      <p>Renda variável (ações, fundos multimercado, FIIs) oferece maior retorno, mas com mais risco.</p>
      
      <h3>Como Escolher?</h3>
      <ul>
        <li><strong>Perfil</strong>: Conservador, moderado ou agressivo.</li>
        <li><strong>Objetivos</strong>: Curto, médio ou longo prazo.</li>
        <li><strong>Liquidez</strong>: Necessidade de resgate rápido.</li>
      </ul>
      
      <blockquote>
        <p>Não existe investimento perfeito, mas sim o ideal para seus objetivos.</p>
      </blockquote>
      
      <h3>Conclusão</h3>
      <p>Entender onde colocar seu dinheiro é essencial para construir riqueza. Escolha com base no seu perfil e objetivos, e comece a agir hoje.</p>
    `
  },
  {
    id: 'blogpost-mentalidade-milionaria-crista',
    content: `
    <h2>A Mentalidade Milionária Cristã</h2>
    <p>Nos dias de hoje, muito se fala sobre mentalidade milionária, prosperidade e como alcançar a liberdade financeira. No entanto, um ponto fundamental muitas vezes é deixado de lado: a <strong>mentalidade milionária cristã</strong>. Será que existe diferença entre um milionário cristão e um milionário que não segue princípios bíblicos?</p>
    
    <h3>O Que é a Mentalidade Milionária Cristã?</h3>
    <p>Diferente do que muitos pensam, ter dinheiro não é algo ruim ou incompatível com a fé cristã. Pelo contrário, a Bíblia ensina que a prosperidade pode ser um meio poderoso para cumprir um propósito maior.</p>
    
    <p>Na visão cristã, a mentalidade milionária é baseada em três pilares fundamentais:</p>
    <ol>
      <li><strong>Princípios e Valores:</strong> O cristão milionário guia suas decisões financeiras com base nos ensinamentos bíblicos e na ética cristã.</li>
      <li><strong>Propósito e Missão:</strong> A riqueza não é apenas para consumo próprio, mas para servir a Deus e ao próximo.</li>
      <li><strong>Responsabilidade e Diligência:</strong> A prosperidade financeira é resultado do esforço, trabalho árduo e boa administração dos recursos.</li>
    </ol>
    
    <blockquote>
      <p>Como você tem utilizado os recursos que Deus colocou em suas mãos? Eles estão sendo usados para glorificar a Ele e abençoar outras pessoas?</p>
    </blockquote>
    
    <h3>A Diferença Entre a Mentalidade Milionária Cristã e a Pagã</h3>
    <p>Muitas pessoas acreditam que o dinheiro pode ser o fim último da vida. Mas a verdade é que, sem propósito, o dinheiro se torna apenas um meio de alimentar a vaidade e o ego.</p>
    
    <ul>
      <li><strong>O Milionário Cristão:</strong> Vê o dinheiro como um instrumento para cumprir a vontade de Deus. Ele doa, investe no crescimento do Reino e busca usar seus recursos financeiros para gerar impacto positivo.</li>
      <li><strong>O Milionário Pagão:</strong> Pode ver o dinheiro como um fim em si mesmo. Sua riqueza pode estar voltada para o prazer pessoal, status ou conquistas materiais sem um propósito maior.</li>
    </ul>
    
    <p>A Bíblia ensina essa diferença claramente em <strong>Provérbios 3:9-10</strong>:</p>
    <blockquote>
      <p><em>"Honra ao Senhor com os teus bens e com as primícias de toda a tua renda. Assim, os teus celeiros se encherão abundantemente, e os teus lagares transbordarão de vinho."</em></p>
    </blockquote>
    
    <h3>A Riqueza Como Uma Missão e Não Como Uma Armadilha</h3>
    <p>A busca pela riqueza, quando feita de forma equivocada, pode se tornar uma armadilha. <strong>1 Timóteo 6:9-10</strong> alerta sobre o perigo da ganância descontrolada:</p>
    <blockquote>
      <p><em>"Os que querem ser ricos caem em tentação, em armadilhas e em muitas paixões insensatas e perniciosas, que afundam os homens na ruína e na destruição. Pois o amor ao dinheiro é a raiz de todos os males."</em></p>
    </blockquote>
    
    <h3>A Importância da Boa Administração e do Trabalho Diligente</h3>
    <p>Um dos maiores diferenciais da mentalidade milionária cristã é a diligência. A Bíblia enfatiza que o esforço e a disciplina são essenciais:</p>
    
    <ul>
      <li><strong>Provérbios 10:4:</strong> <em>"A mão preguiçosa empobrece, mas a mão diligente enriquece."</em></li>
      <li><strong>Provérbios 12:11:</strong> <em>"Quem lavra sua terra terá comida com fartura, mas quem corre atrás de fantasias não tem juízo."</em></li>
    </ul>
    
    <h3>Conclusão: A Sua Mentalidade Determina Seu Futuro Financeiro</h3>
    <p>Se você deseja alcançar uma verdadeira prosperidade financeira, precisa desenvolver uma mentalidade milionária cristã alinhada aos princípios corretos. Isso significa:</p>
    
    <ol>
      <li><strong>Ter clareza do propósito da riqueza:</strong> O dinheiro deve servir para algo maior do que apenas consumo pessoal.</li>
      <li><strong>Aplicar princípios bíblicos na administração financeira:</strong> Seja generoso, honesto e responsável com os recursos que Deus coloca em suas mãos.</li>
      <li><strong>Trabalhar com diligência e perseverança:</strong> Não existem atalhos para a verdadeira riqueza; o sucesso financeiro vem da constância e do esforço bem direcionado.</li>
    </ol>
    `
  },
  {
    id: 'blogpost-liberdade-financeira-sonhos',
    content: `
    <h2>Liberdade Financeira: Viva a Vida dos Seus Sonhos</h2>
    <p>O que significa liberdade financeira para você? Para alguns, é a possibilidade de viajar pelo mundo sem preocupações. Para outros, é poder passar mais tempo com a família, dedicar-se a um projeto pessoal ou simplesmente viver sem a pressão constante das contas. A verdadeira liberdade financeira acontece quando o dinheiro deixa de ser uma fonte de ansiedade e passa a ser uma ferramenta para a realização dos seus sonhos.</p>
    
    <blockquote>
      <p><em>"O Senhor é o meu pastor; nada me faltará."</em> — Salmos 23:1</p>
    </blockquote>
    
    <p>Nesta jornada, você vai refletir sobre o significado de liberdade financeira para sua vida e aprender como construir um caminho realista e sustentável para alcançá-la.</p>
    
    <h3>Os 4 Pilares da Liberdade Financeira</h3>
    
    <h4>1. Gastar Menos do que Ganha</h4>
    <p><strong>Objetivo:</strong> Criar uma sobra de dinheiro para investir.</p>
    <p><strong>Ação:</strong> Controle seus gastos, mantenha um orçamento, corte despesas desnecessárias e evite dívidas que atrasam seus sonhos.</p>
    
    <h4>2. Investir a Diferença</h4>
    <p><strong>Objetivo:</strong> Fazer seu dinheiro trabalhar por você.</p>
    <p><strong>Ação:</strong> Aplique a sobra mensal em ativos que geram renda passiva, como ações, imóveis, fundos imobiliários e títulos de renda fixa.</p>
    
    <h4>3. Alcançar um Capital Suficiente</h4>
    <p><strong>Objetivo:</strong> Ter um patrimônio que sustente seu estilo de vida, mesmo sem depender do trabalho ativo.</p>
    <p><strong>Ação:</strong> Calcule quanto precisa investir para que a renda passiva cubra suas despesas e permita realizar seus sonhos.</p>
    
    <h4>4. Gerar Novas Receitas</h4>
    <p><strong>Objetivo:</strong> Ampliar suas fontes de renda.</p>
    <p><strong>Ação:</strong> Explore oportunidades de novos negócios, freelances, investimentos diferenciados e formas criativas de ganhar dinheiro.</p>
    
    <h3>Exercício Prático: Definindo Sua Liberdade Financeira</h3>
    
    <ul>
      <li><strong>Reflita sobre seus sonhos:</strong><br>
      "O que eu faria se não precisasse trabalhar por dinheiro?"<br>
      "Como seria um dia ideal na minha vida?"</li>
      
      <li><strong>Calcule seu Número da Liberdade Financeira:</strong><br>
      Exemplo:<br>
      Despesas mensais desejadas: R$ 10.000<br>
      Taxa de retorno dos investimentos: 0,5% ao mês (6% ao ano)<br>
      Cálculo:<br>
      R$ 10.000 ÷ 0,005 = <strong>R$ 2.000.000</strong><br>
      <strong>Meta:</strong> Investir até atingir um patrimônio de R$ 2 milhões para gerar R$ 10 mil mensais de renda passiva.</li>
      
      <li><strong>Trace um Plano de Ação:</strong><br>
      "Quanto eu preciso economizar por mês para alcançar R$ 2.000.000 em 20 anos?"<br>
      "Quais investimentos posso fazer para acelerar esse processo?"</li>
    </ul>
    
    <h3>Reflexão Final</h3>
    <p>Agora que você entende o que é liberdade financeira e como trilhar esse caminho, reflita: o que está disposto a fazer hoje para viver a vida dos seus sonhos amanhã?</p>
    <p>Lembre-se: liberdade financeira não é um destino final, mas uma jornada — e cada passo consciente te aproxima desse objetivo.</p>
    
    <blockquote>
      <p><em>"Honre ao Senhor com todos os seus recursos e com os primeiros frutos de todas as suas plantações; os seus celeiros ficarão plenamente cheios, e os seus barris transbordarão de vinho."</em> — Provérbios 3:9-10</p>
    </blockquote>
    `
  },
  {
    id: 'blogpost-perigo-idolatria-dinheiro',
    content: `
    <h2>O Perigo da Idolatria ao Dinheiro: Como Equilibrar Prosperidade e Propósito</h2>
    <p>Em um mundo onde a busca pela riqueza é cada vez mais intensa, é fundamental entender a diferença entre prosperidade e idolatria ao dinheiro. Ter uma mentalidade financeira saudável não significa apenas ganhar dinheiro, mas saber utilizá-lo com sabedoria, propósito e responsabilidade.</p>
    
    <h3>O Dinheiro é Bom ou Ruim?</h3>
    <p>O dinheiro, em si, é uma ferramenta neutra. Ele pode ser usado para fazer o bem, gerar oportunidades e transformar vidas. No entanto, quando o dinheiro se torna o centro das nossas decisões e emoções, ele deixa de ser um recurso e passa a ser um ídolo.</p>
    
    <p>A Bíblia nos alerta sobre esse perigo em <strong>1 Timóteo 6:10</strong>:</p>
    <blockquote>
      <p><em>"Porque o amor ao dinheiro é a raiz de todos os males; e alguns, nessa cobiça, se desviaram da fé e se atormentaram com muitas dores."</em></p>
    </blockquote>
    
    <p>O problema não é ter dinheiro, mas quando ele se torna o foco principal da vida, acima de valores, princípios e da fé.</p>
    
    <p><strong>Reflexão:</strong> O que o dinheiro representa para você? Ele é um meio para alcançar seus objetivos ou um fim em si mesmo?</p>
    
    <h3>Os Sinais da Idolatria ao Dinheiro</h3>
    <p>Muitas pessoas podem estar idolatrando o dinheiro sem perceber. Aqui estão alguns sinais que indicam que a relação com as finanças pode estar se tornando prejudicial:</p>
    
    <ul>
      <li><strong>Medo excessivo de perder dinheiro:</strong> A insegurança financeira extrema pode indicar uma dependência emocional do dinheiro.</li>
      <li><strong>Obstinação por riqueza a qualquer custo:</strong> Fazer qualquer coisa por dinheiro, mesmo desconsiderando princípios éticos e morais.</li>
      <li><strong>Medir sucesso apenas pelo patrimônio:</strong> Achar que seu valor como pessoa está diretamente ligado à quantidade de dinheiro que possui.</li>
      <li><strong>Negligenciar valores e relacionamentos:</strong> Colocar o dinheiro acima de família, amizades, princípios e até da fé.</li>
      <li><strong>Dificuldade em ser generoso:</strong> A avareza e o apego excessivo ao dinheiro impedem a prática da generosidade e da doação.</li>
    </ul>
    
    <p><strong>Pergunta para reflexão:</strong> Você já se pegou priorizando o dinheiro acima de coisas que realmente importam, como sua fé, família ou saúde?</p>
    
    <h3>A Verdadeira Mentalidade Próspera</h3>
    <p>A verdadeira prosperidade vai além da conta bancária. Uma mentalidade financeira saudável envolve:</p>
    
    <ol>
      <li><strong>Propósito:</strong> O dinheiro deve servir para algo maior, como ajudar pessoas, contribuir para a comunidade e viver com dignidade.</li>
      <li><strong>Disciplina e gestão:</strong> Planejar e administrar as finanças com sabedoria, sem desperdícios ou excessos.</li>
      <li><strong>Gratidão e generosidade:</strong> Ser grato pelo que tem e estar disposto a compartilhar, entendendo que a verdadeira riqueza está na contribuição.</li>
      <li><strong>Equilíbrio entre trabalho e vida pessoal:</strong> Evitar o excesso de trabalho apenas para acumular dinheiro, mantendo uma vida equilibrada e significativa.</li>
    </ol>
    
    <p><strong>Dica prática:</strong> Faça uma lista de seus valores e prioridades. O dinheiro deve estar alinhado a eles, e não acima deles.</p>
    
    <h3>Como Proteger-se da Idolatria ao Dinheiro</h3>
    <p>Se você sente que sua relação com o dinheiro pode estar ultrapassando limites saudáveis, aqui estão algumas formas de manter o equilíbrio:</p>
    
    <ol>
      <li><strong>Reflita sobre seu propósito:</strong> Pergunte-se: <em>"Por que quero mais dinheiro? O que isso realmente significa para mim?"</em></li>
      <li><strong>Priorize valores e relacionamentos:</strong> Não sacrifique princípios e pessoas importantes apenas pelo desejo de riqueza.</li>
      <li><strong>Pratique a generosidade:</strong> A doação e o auxílio ao próximo ajudam a manter o dinheiro em seu devido lugar.</li>
      <li><strong>Busque sabedoria financeira:</strong> Entenda que prosperidade vem de boas decisões, não da obsessão pela riqueza.</li>
      <li><strong>Confie em Deus:</strong> A verdadeira segurança vem da fé e não do saldo bancário.</li>
    </ol>
    
    <p><strong>Exemplo prático:</strong> Se você recebeu um aumento ou uma bonificação, considere doar uma parte para uma causa que você acredita. Isso ajuda a manter o coração generoso e o dinheiro em perspectiva.</p>
    
    <h3>Conclusão: Equilibrando Prosperidade e Propósito</h3>
    <p>Ter dinheiro não é pecado, mas deixar que ele domine sua vida pode ser um grande erro. O segredo está no equilíbrio entre prosperidade e propósito. Use o dinheiro como uma ferramenta para criar uma vida significativa, sem que ele se torne o centro de tudo.</p>
    
    <p>A verdadeira riqueza não está apenas no que acumulamos, mas no impacto positivo que deixamos no mundo. Que seu dinheiro sirva a você, e não o contrário.</p>
    `
  },
  {
    id: 'blogpost-evento-mente-milionaria',
    content: `
    <h2>O que é o Evento Mente Milionária e Por Que Ele Pode Mudar Sua Vida</h2>
    <p>Imagine participar de um evento que vai além das palestras motivacionais comuns. Um encontro capaz de mexer com as suas crenças, te dar as ferramentas certas e conectar você a pessoas que também estão em busca de uma virada financeira e de vida. Esse é o <strong>Evento Mente Milionária</strong>: uma experiência transformadora criada para quem deseja romper de vez com a escassez e acessar, de verdade, a mentalidade e as estratégias dos que prosperam.</p>
    
    <h3>O que é o Evento Mente Milionária?</h3>
    <p>O Evento Mente Milionária não é só mais um seminário sobre dinheiro ou investimentos. Ele nasceu com um propósito muito mais profundo: provocar uma verdadeira mudança de mentalidade em quem está cansado de apenas sobreviver financeiramente, mas ainda não sabe como quebrar o ciclo. É um encontro presencial que une educação financeira, desenvolvimento pessoal, espiritualidade e um ambiente de networking de alto nível.</p>
    
    <p>O objetivo? Gerar uma experiência prática e inspiradora, onde você vai aprender não só o "como", mas, principalmente, o "porquê" de cada ação necessária para prosperar. Aqui, a meta não é só ganhar dinheiro, mas construir uma mentalidade que atrai riqueza, liberdade e realizações — mesmo que você esteja começando do zero.</p>
    
    <h3>Quem é Roberto Navarro e Por Que Confiar em Sua Experiência</h3>
    <p>Por trás desse movimento está <strong>Roberto Navarro</strong> — mentor financeiro, empresário, referência em inteligência financeira e transformação pessoal. Ao longo dos anos, Roberto já ajudou milhares de pessoas a mudarem suas histórias, unindo uma didática direta com vivência prática. Diferente de muitos "gurus", ele construiu sua reputação na base da entrega, proximidade e resultados palpáveis.</p>
    
    <p>Roberto entende, na pele, o que é lutar para vencer, recomeçar e construir riqueza de dentro para fora. Sua trajetória é marcada pela superação de crenças limitantes, desafios e, principalmente, pelo compromisso de ajudar pessoas comuns a desbloquear o que realmente impede o crescimento: a mentalidade.</p>
    
    <h3>A Proposta Única do Evento</h3>
    <p>O grande diferencial do Evento Mente Milionária está na combinação de três pilares essenciais:</p>
    
    <ul>
      <li><strong>Mentalidade & Espiritualidade:</strong> Você vai desvendar, na prática, como crenças, traumas e padrões herdados influenciam seu bolso e suas oportunidades. Mais do que fórmulas, o evento trabalha o seu interior, trazendo um olhar profundo sobre abundância e propósito, inclusive com base em princípios espirituais.</li>
      
      <li><strong>Técnicas de Riqueza Aplicáveis:</strong> Não basta só pensar diferente. Você vai aprender ferramentas, estratégias e hábitos que as pessoas prósperas usam diariamente. Tudo apresentado de maneira simples, aplicável e comprovada.</li>
      
      <li><strong>Ambiente de Networking & Transformação:</strong> O encontro reúne pessoas com a mesma sede de crescimento, gerando conexões reais, apoio mútuo e inspiração. Muitos participantes relatam que, só de estar nesse ambiente, já sentiram um salto de clareza, motivação e confiança.</li>
    </ul>
    
    <h3>Mentalidade: O Verdadeiro Divisor de Águas</h3>
    <p>Talvez você já tenha ouvido falar que "tudo começa na mente". Mas, no fundo, talvez ache que isso é papo de autoajuda. Só que basta observar quem realmente prosperou para perceber: toda mudança exterior nasce, primeiro, de uma virada interna.</p>
    
    <ul>
      <li>Quantas pessoas você conhece que ganharam dinheiro e perderam tudo porque não estavam prontas para lidar com a riqueza?</li>
      <li>E quantas outras, ao mudarem suas crenças e comportamentos, começaram a enxergar oportunidades onde antes só viam problemas?</li>
    </ul>
    
    <p>No Evento Mente Milionária, histórias assim são comuns. Pessoas que chegaram com medo, travadas, se sentindo presas em um ciclo sem fim... e saíram dali decididas, com clareza e energia para construir uma nova realidade.</p>
    
    <h3>Temas e Módulos: Um Mergulho Profundo na Prosperidade</h3>
    <p>O Evento Mente Milionária foi pensado para abordar, de forma completa e didática, os pilares que realmente constroem uma vida próspera. Entre os principais temas e módulos, estão:</p>
    
    <ul>
      <li><strong>Mentalidade de Riqueza:</strong> Como identificar e quebrar crenças limitantes que travam seu crescimento.</li>
      <li><strong>Inteligência Emocional e Espiritualidade:</strong> Prosperidade começa dentro de você.</li>
      <li><strong>Hábitos e Estratégias Financeiras:</strong> Passo a passo de como construir hábitos financeiros saudáveis.</li>
      <li><strong>Networking e Ambientes de Crescimento:</strong> Descubra como o ambiente influencia seus resultados.</li>
      <li><strong>Dinâmicas de Alta Imersão:</strong> Você não vai só ouvir, mas viver dinâmicas que despertam sua verdadeira força.</li>
    </ul>
    
    <h3>A Experiência Presencial: Energia, Conexão e Transformação Real</h3>
    <p>Quem participa do Mente Milionária logo percebe: não é um evento comum. O ambiente é cuidadosamente preparado para gerar conforto, inspiração e confiança. Durante o evento, as dinâmicas ao vivo fazem você sair da zona de conforto.</p>
    
    <h3>Depoimentos de Quem Viveu a Transformação</h3>
    <p>Nada é mais poderoso do que ouvir de quem já trilhou esse caminho:</p>
    
    <blockquote>
      <p><em>"Cheguei ao evento endividada, com vergonha de falar sobre dinheiro. Em poucos dias, entendi a raiz dos meus bloqueios e voltei pra casa decidida a mudar. Seis meses depois, consegui quitar todas as dívidas e hoje invisto com confiança. A energia desse evento foi o start que faltava na minha vida!"</em><br>
      — Patrícia Nunes, 38 anos</p>
    </blockquote>
    
    <blockquote>
      <p><em>"O que mais me marcou foi perceber que eu não estava sozinho. Encontrei pessoas que pensavam como eu, fiz amigos e saí do evento com um plano claro. O Roberto me fez enxergar possibilidades que eu nunca tinha imaginado."</em><br>
      — Júlio César, 44 anos</p>
    </blockquote>
    
    <blockquote>
      <p><em>"Eu já tinha feito cursos de finanças, mas o Mente Milionária é diferente. A metodologia do Roberto, a espiritualidade e o ambiente fizeram toda a diferença. Não é só sobre dinheiro, é sobre vida!"</em><br>
      — Luciana Prado, 29 anos</p>
    </blockquote>
    
    <h3>Como Participar e Dar o Primeiro Passo</h3>
    <p>Não espere o "momento perfeito" — o momento perfeito é aquele em que você decide que merece mais. A verdadeira prosperidade começa quando você investe em você mesmo, em sua mente, em seus sonhos.</p>
    
    <p><strong>Não deixe para depois. Garanta agora sua vaga no Evento Mente Milionária e dê o primeiro passo rumo a uma nova história.</strong></p>
    
    <blockquote>
      <p><em>"Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos."</em> — Provérbios 16:3</p>
    </blockquote>
    
    <p>Acredite: Deus honra quem tem coragem de agir. Você merece prosperar, viver com propósito e ser inspiração para sua família e para o mundo.</p>
    
    <p><strong>Venha fazer parte desse movimento. Sua nova vida começa aqui.</strong></p>
    `
  }
]

async function updateFinalPosts() {
  console.log('📝 Atualizando posts finais com conteúdo completo...')
  
  try {
    for (const post of finalPosts) {
      console.log(`🔄 Processando: ${post.id}`)
      
      // Convert HTML content to Sanity blocks
      const blocks = htmlToSanityBlocks(post.content)
      
      // Update the post in Sanity
      await client.patch(post.id).set({
        body: blocks
      }).commit()
      
      console.log(`✅ Post atualizado: ${post.id}`)
    }
    
    console.log('🎉 Todos os posts finais foram atualizados com conteúdo completo!')
    
  } catch (error) {
    console.error('❌ Erro ao atualizar posts finais:', error)
  }
}

updateFinalPosts()