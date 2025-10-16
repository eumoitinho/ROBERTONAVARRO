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
  console.error('[populate-blog] Variáveis ausentes: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN')
  process.exit(1)
}

const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

// Blog posts data extracted from blog-data.ts
const ptBlogPosts = [
  {
    id: 1,
    title: "Cadê a Sua Versão Milionária? Talvez Falta Coragem, Não Planejamento",
    excerpt: "Descubra como crenças limitantes sabotam seus sonhos e aprenda a despertar sua mentalidade milionária com coragem e ação.",
    image: "/blog/notopo.jpg",
    date: "2025-06-01T10:00:00Z",
    author: "Roberto Navarro",
    category: "Mentalidade",
    slug: "cade-sua-versao-milionaria",
    content: `<h2>Cadê a Sua Versão Milionária?</h2>
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
<p>A escolha é sua: continuar preso às desculpas ou reagir? Sua versão milionária está viva, pronta para liderar. Comece hoje, dê o primeiro passo e construa a mentalidade que te levará ao topo.</p>`
  },
  {
    id: 2,
    title: "Estabilidade: Segurança ou Armadilha Silenciosa?",
    excerpt: "Entenda como a busca por estabilidade pode estar custando sua liberdade e descubra como recuperar sua coragem para viver plenamente.",
    image: "/blog/marionete.jpg",
    date: "2025-06-01T10:00:00Z",
    author: "Roberto Navarro",
    category: "Coragem",
    slug: "estabilidade-preco-alto",
    content: `<h2>Estabilidade: Segurança ou Armadilha?</h2>
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
<p>O problema não está no mundo lá fora, mas na mentalidade que você construiu. Para reconquistar sua liberdade, comece enfrentando pequenos medos. Cada passo corajoso te aproxima da vida que você merece.</p>`
  },
  {
    id: 3,
    title: "O Segredo para Vencer Desafios: Preparo Emocional",
    excerpt: "Sonhos não bastam. Descubra por que o preparo emocional é a chave para superar desafios e alcançar grandes vitórias.",
    image: "/blog/golias.webp",
    date: "2025-06-01T10:00:00Z",
    author: "Roberto Navarro",
    category: "Inteligência Emocional",
    slug: "preparo-emocional",
    content: `<h2>Por Que Sonhos Não São Suficientes?</h2>
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
<p>Não se contente com pequenas conquistas. Invista no seu preparo emocional e transforme desafios em oportunidades. Sua próxima grande vitória está esperando — você está pronto para buscá-la?</p>`
  },
  {
    id: 4,
    title: "Como Se Relacionar com o Dinheiro de Forma Consciente",
    excerpt: "Suas decisões financeiras são mais emocionais do que racionais. Aprenda a mudar esse padrão e transforme sua relação com o dinheiro.",
    image: "/blog/segurandodin.jpg",
    date: "2025-06-01T10:00:00Z",
    author: "Roberto Navarro",
    category: "Decisões Financeiras",
    slug: "relacao-com-dinheiro",
    content: `<h2>O Dinheiro e Suas Emoções</h2>
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
<p>Ignorar as emoções por trás do dinheiro custa caro — noites mal dormidas, discussões e sonhos adiados. Comece hoje a construir uma relação consciente e saudável com suas finanças.</p>`
  }
]

// Convert blog-data format to Sanity format
const blogPosts = ptBlogPosts.map(post => ({
  _id: `blogpost-${post.id}`,
  _title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  publishedAt: post.date,
  author: post.author,
  category: post.category,
  coverImage: {
    url: post.image,
    alt: post.title
  },
  content: {
    html: post.content
  },
  readingTime: Math.ceil(post.content.split(' ').length / 200)
}))

// Convert HTML content to simple text for Sanity
function htmlToText(html) {
  if (!html) return ''
  
  // Remove HTML tags and clean up the text
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
}

async function main() {
  console.log(`[populate-blog] Populando ${blogPosts.length} posts do blog...`)
  
  const mutations = blogPosts.map(post => ({
    createOrReplace: {
      _id: `blogpost-${post.slug}`,
      _type: 'blogPost',
      title: post._title,
      slug: {
        _type: 'slug',
        current: post.slug
      },
      excerpt: post.excerpt,
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: htmlToText(post.content?.html)
          }]
        }
      ],
      // coverImage: post.coverImage ? {
      //   _type: 'image',
      //   asset: {
      //     _type: 'reference',
      //     _ref: 'image-' + post._id // We'll need to upload images separately
      //   },
      //   alt: post.coverImage.alt
      // } : undefined,
      author: post.author || 'Roberto Navarro',
      category: post.category,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime || 5,
      featured: false
    }
  }))
  
  console.log(`[populate-blog] Criando ${mutations.length} posts...`)
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 10
  for (let i = 0; i < mutations.length; i += batchSize) {
    const batch = mutations.slice(i, i + batchSize)
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${TOKEN}` 
      },
      body: JSON.stringify({ mutations: batch }),
    })
    
    if (!res.ok) {
      const txt = await res.text()
      console.error(`[populate-blog] Falha no batch ${i}-${i + batchSize}:`, res.status, txt)
      continue
    }
    
    const json = await res.json()
    console.log(`[populate-blog] Batch ${i}-${i + batchSize} criado:`, json.results?.length || 0, 'posts')
    
    // Small delay between batches
    if (i + batchSize < mutations.length) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  console.log('[populate-blog] ✅ Todos os posts foram populados com sucesso!')
}

main().catch((err) => {
  console.error('[populate-blog] Erro inesperado', err)
  process.exit(1)
})
