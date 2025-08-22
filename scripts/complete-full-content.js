// Script para completar TODOS os posts com conteúdo HTML convertido para Sanity blocks
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

// All blog posts data with their complete content extracted from blog-data.ts
const blogPostsData = [
  {
    id: 'blogpost-cade-sua-versao-milionaria',
    slug: 'cade-sua-versao-milionaria',
    title: 'Cadê a Sua Versão Milionária? Talvez Falta Coragem, Não Planejamento',
    content: `
      <h2>Cadê a Sua Versão Milionária?</h2>
      <p>Lembra daquela versão sua que sonhava grande? Que planejava conquistar a liberdade financeira e viver com propósito? Onde ela está agora? Talvez ela não tenha desaparecido — talvez ela esteja apenas adormecida, esperando um empurrão de coragem para despertar.</p>
      
      <h3>Por Que Você Parou de Sonhar Grande?</h3>
      <p>Com o tempo, muitos de nós trocam ambição por conformismo. Chamamos medo de <strong>"realismo"</strong> e nos contentamos com metas pequenas. Mas a verdade é que você não parou por falta de tempo ou oportunidades. Algo dentro de você está te segurando — uma voz sutil que diz: <em>"Não arrisque"</em>, <em>"Não é o momento"</em> ou <em>"Você não é capaz"</em>.</p>
      
      <h3>Crenças Limitantes: O Inimigo Silencioso</h3>
      <p>Essas vozes são <strong>crenças limitantes</strong>, um sistema interno que sabota seus planos mesmo quando tudo parece favorável. Elas não surgem por acaso. São fruto de experiências, medos e inseguranças acumuladas, que te fazem priorizar a segurança em vez do crescimento.</p>
      
      <blockquote>
        <p>As crenças limitantes são como freios invisíveis que impedem você de acelerar em direção aos seus sonhos.</p>
      </blockquote>
      
      <ul>
        <li><strong>"Melhor não arriscar"</strong>: Evita o fracasso, mas também o sucesso.</li>
        <li><strong>"Agora não é o momento"</strong>: Adia seus sonhos indefinidamente.</li>
        <li><strong>"Quem sou eu pra isso?"</strong>: Mina sua autoconfiança.</li>
      </ul>
      
      <h3>O Perigo de Se Contentar com Pouco</h3>
      <p>Quando você aceita <em>"apenas pagar as contas"</em> como suficiente, sua versão milionária perde força. Cada dia conformado é um passo para trás. A boa notícia? Essa versão ainda está aí, esperando uma decisão sua para voltar à ativa.</p>
      
      <h3>Coragem: O Ingrediente que Falta</h3>
      <p>Planejar é importante, mas sem <strong>coragem</strong>, seus planos ficam no papel. Coragem é o que transforma sonhos em realidade. É o que faz você silenciar as desculpas, enfrentar o medo e agir, mesmo com incertezas.</p>
      
      <h3>Desperte Sua Mentalidade Milionária</h3>
      <p>A escolha é sua: continuar preso às desculpas ou reagir? Sua versão milionária está viva, pronta para liderar. Comece hoje, dê o primeiro passo e construa a mentalidade que te levará ao topo.</p>
    `
  },
  {
    id: 'blogpost-estabilidade-preco-alto',
    slug: 'estabilidade-preco-alto',
    title: 'Estabilidade: Segurança ou Armadilha Silenciosa?',
    content: `
    <h2>Estabilidade: Segurança ou Armadilha?</h2>
    <p>Você se sente seguro na sua zona de conforto? Talvez essa <strong>"estabilidade"</strong> que você tanto defende seja apenas medo disfarçado. Acomodar-se pode parecer seguro, mas o preço pode ser alto: sua saúde, energia e liberdade.</p>
    
    <h3>Quando a Estabilidade Vira Prisão</h3>
    <p>Quantas vezes você permaneceu em um trabalho que te esgota, só porque o desconhecido parece mais assustador? A rotina pode ser confortável, mas, aos poucos, ela rouba sua vitalidade e adia seus sonhos.</p>
    
    <blockquote>
      <p>A verdadeira segurança não vem da estabilidade externa, mas da confiança em sua capacidade de se adaptar e crescer.</p>
    </blockquote>
    
    <h3>A Verdadeira Razão da Procrastinação</h3>
    <p>Você adia decisões importantes — uma conversa, uma mudança de carreira, um novo projeto — e culpa a falta de tempo. Mas, no fundo, o que falta é <strong>coragem</strong>. Coragem para enfrentar o desconforto e dar o próximo passo.</p>
    
    <h3>Seu Escudo de Desculpas</h3>
    <p>Para se proteger, você criou um sistema de desculpas que parecem lógicas, mas só te mantêm parado:</p>
    <ul>
      <li><em>"Agora não é o momento ideal."</em></li>
      <li><em>"Primeiro, preciso quitar minhas dívidas."</em></li>
      <li><em>"Quando o trabalho estiver mais calmo."</em></li>
    </ul>
    <p>Essas justificativas são um escudo emocional, mas também uma armadilha que te impede de crescer.</p>
    
    <h3>O Preço da Falsa Segurança</h3>
    <p>A estabilidade só é valiosa quando não custa sua paz ou seu propósito. Se ela está drenando sua energia ou adiando seus projetos, é hora de questionar: <strong>vale a pena pagar esse preço?</strong></p>
    
    <h3>Quebre o Ciclo Hoje</h3>
    <p>O problema não está no mundo lá fora, mas na mentalidade que você construiu. Para reconquistar sua liberdade, comece enfrentando pequenos medos. Cada passo corajoso te aproxima da vida que você merece.</p>
    `
  },
  {
    id: 'blogpost-preparo-emocional',
    slug: 'preparo-emocional',
    title: 'O Segredo para Vencer Desafios: Preparo Emocional',
    content: `
      <h2>Por Que Sonhos Não São Suficientes?</h2>
      <p>Todo mundo tem sonhos grandes, mas poucos estão prontos para enfrentar os desafios que vêm com eles. O fracasso não acontece por falta de ambição, mas por falta de <strong>preparo emocional</strong>. Sem ele, até os melhores planos desmoronam.</p>
      
      <h3>A Lição de Davi e Golias</h3>
      <p>Você já conhece a história de Davi e Golias. Mas o que fez Davi vencer não foi só coragem ou fé — foi <strong>preparo</strong>. Antes de enfrentar o gigante, ele já havia derrotado leões e ursos, construindo uma base emocional sólida longe dos holofotes.</p>
      
      <blockquote>
        <p>O preparo emocional é como treinar um músculo: quanto mais você pratica, mais forte fica para os grandes desafios.</p>
      </blockquote>
      
      <h3>Seus Próprios Gigantes</h3>
      <p>Pense nas oportunidades que você deixou passar:</p>
      <ul>
        <li>Uma entrevista de emprego decisiva.</li>
        <li>Um negócio promissor que você hesitou em perseguir.</li>
        <li>Uma venda que travou no momento crucial.</li>
        <li>Uma mudança de carreira que você adiou.</li>
      </ul>
      <p>O que te parou não foi falta de vontade, mas a ausência de preparo emocional para lidar com a pressão.</p>
      
      <h3>Motivação Não Basta</h3>
      <p>Frases inspiradoras e vídeos motivacionais podem te animar, mas não te preparam para o peso de um grande desafio. Para vencer seus <em>"Golias"</em>, você precisa de uma estrutura emocional forte, construída com prática e autoconhecimento.</p>
      
      <h3>Construa Sua Força Emocional</h3>
      <p>Preparo emocional é como treinar um músculo. Comece enfrentando pequenos desafios, refletindo sobre suas reações e aprendendo a gerenciar o medo e a ansiedade. Com o tempo, você estará pronto para as grandes batalhas que definem sua vida.</p>
      
      <h3>Prepare-se para Grandes Vitórias</h3>
      <p>Não se contente com pequenas conquistas. Invista no seu preparo emocional e transforme desafios em oportunidades. Sua próxima grande vitória está esperando — você está pronto para buscá-la?</p>
    `
  },
  {
    id: 'blogpost-relacao-com-dinheiro',
    slug: 'relacao-com-dinheiro',
    title: 'Como Se Relacionar com o Dinheiro de Forma Consciente',
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
    id: 'blogpost-estabilidade-armadilha',
    slug: 'estabilidade-armadilha',
    title: 'Conforto: Seu Aliado ou Maior Inimigo?',
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
    id: 'blogpost-diego-hypolito-perdeu-10-milhoes',
    slug: 'diego-hypolito-perdeu-10-milhoes',
    title: 'Como Diego Hypólito Perdeu R$ 10 Milhões — E o Que Isso Ensina Sobre Dinheiro',
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
  }
]

async function updateAllBlogContent() {
  console.log('📝 Atualizando conteúdo COMPLETO de TODOS os posts...')
  
  try {
    for (const post of blogPostsData) {
      console.log(`🔄 Processando: ${post.title}`)
      
      // Convert HTML content to Sanity blocks
      const blocks = htmlToSanityBlocks(post.content)
      
      // Update the post in Sanity
      await client.patch(post.id).set({
        body: blocks
      }).commit()
      
      console.log(`✅ Post atualizado: ${post.title}`)
    }
    
    console.log('🎉 Todos os posts foram atualizados com conteúdo completo!')
    
  } catch (error) {
    console.error('❌ Erro ao atualizar posts:', error)
  }
}

updateAllBlogContent()