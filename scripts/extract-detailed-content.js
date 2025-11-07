const fs = require('fs');
const path = require('path');

/**
 * Script detalhado para extrair conteúdo estruturado de todas as páginas
 * para migração ao Strapi CMS
 */

const pagesDir = path.join(__dirname, '../app');
const outputFile = path.join(__dirname, '../strapi-content-export.json');

// Ler e analisar páginas específicas
function extractHomePage() {
  const filePath = path.join(pagesDir, 'page.tsx');
  const content = fs.readFileSync(filePath, 'utf8');
  
  return {
    slug: 'home',
    route: '/',
    type: 'home',
    hero: {
      title: 'TRANSFORME SUA MENTALIDADE',
      subtitle: 'E CONQUISTE UMA NOVA REALIDADE FINANCEIRA',
      description: 'Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.',
      highlightText: 'INSTITUTO COACHING FINANCEIRO',
      backgroundImage: '/images/bgsite.jpg',
      ctaText: 'CONHEÇA NOSSAS FORMAÇÕES',
      ctaLink: '#formacoes',
      achievementsNumber: '300.000+',
      achievementsLabel: 'vidas transformadas',
    },
    formations: {
      title: 'FORMAÇÕES QUE VÃO TRANSFORMAR SUA MENTALIDADE',
      description: 'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
      items: [
        {
          title: 'LCF MENTORING',
          description: 'Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.',
          link: '/formacoes/mentoria',
        },
        {
          title: 'EMPREENDEDOR INTELIGENTE',
          description: 'Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.',
          link: '/formacoes/empreendedor-inteligente',
        },
        {
          title: 'EDUCADOR FINANCEIRO',
          description: 'Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.',
          link: '/formacoes/educador-financeiro',
        },
        {
          title: 'LCF MENTORING PRO',
          description: 'Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.',
          link: '/formacoes/lcf-mentoring-pro',
        },
        {
          title: 'MENTORIA DE INVESTIMENTOS',
          description: 'Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.',
          link: '/formacoes/mentoria-de-investimentos',
        },
        {
          title: 'MENTORIA INDIVIDUAL',
          description: 'Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.',
          link: '/formacoes/mentoria-individual',
        },
        {
          title: 'MÉTODO TF',
          description: 'Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.',
          link: '/formacoes/metodo-tf',
        },
        {
          title: 'MENTOR COACHING FINANCEIRO',
          description: 'Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.',
          link: '/formacoes/mentor-coaching-financeiro',
        },
      ],
    },
  };
}

function extractEventPage(filePath, route) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = route.split('/').pop();
  
  // Extrair dados do HeroPages component
  const heroTitleMatch = content.match(/title=["']([^"']+)["']/);
  const heroSubtitleMatch = content.match(/subtitle=["']([^"']+)["']/);
  const heroSecondTitleMatch = content.match(/secondtitle=["']([^"']+)["']/);
  const heroDescriptionMatch = content.match(/description=\{`([^`]+)`\}/);
  const heroImageMatch = content.match(/image=["']([^"']+)["']/);
  const heroCtaTextMatch = content.match(/ctaText=["']([^"']+)["']/);
  
  // Extrair seções
  const sections = [];
  
  // Para Quem É
  const paraQuemTitleMatch = content.match(/PARA QUEM É ESTE EVENTO[^<]*<h2[^>]*>([^<]+)<\/h2>/);
  if (paraQuemTitleMatch) {
    sections.push({
      type: 'target-audience',
      title: paraQuemTitleMatch[1] || 'Seu Perfil de Sucesso',
      items: extractListItems(content, 'Profissionais que querem'),
    });
  }
  
  // Desafios e Solução
  const desafiosMatch = content.match(/O Que Está Travando Sua Prosperidade[^<]*<h2[^>]*>([^<]+)<\/h2>/);
  if (desafiosMatch) {
    sections.push({
      type: 'challenges',
      title: 'O Que Está Travando Sua Prosperidade?',
      items: extractQuestions(content),
    });
  }
  
  // Programa
  const programaMatch = content.match(/PROGRAMA COMPLETO/);
  if (programaMatch) {
    sections.push({
      type: 'program',
      title: '7 Horas de Transformação Intensiva',
      description: 'Um mergulho profundo nas estratégias que separam milionários de pessoas comuns',
      blocks: extractProgramBlocks(content),
    });
  }
  
  // Data e Local
  const dataMatch = content.match(/(\d{1,2}\s+de\s+[A-Za-zç]+)/);
  const localMatch = content.match(/Alameda[^<]+/);
  
  return {
    slug,
    route,
    type: 'event',
    hero: {
      title: heroTitleMatch ? heroTitleMatch[1] : '',
      subtitle: heroSubtitleMatch ? heroSubtitleMatch[1] : '',
      secondTitle: heroSecondTitleMatch ? heroSecondTitleMatch[1] : '',
      description: heroDescriptionMatch ? heroDescriptionMatch[1] : '',
      image: heroImageMatch ? heroImageMatch[1] : '',
      ctaText: heroCtaTextMatch ? heroCtaTextMatch[1] : '',
      ctaLink: '#inscricao',
    },
    sections,
    eventInfo: {
      date: dataMatch ? dataMatch[1] : '',
      location: localMatch ? localMatch[0] : '',
      duration: '7 horas',
    },
    registration: {
      eduzzUrl: extractEduzzUrl(content),
      buttonText: 'GARANTIR MINHA INSCRIÇÃO',
    },
  };
}

function extractFormationPage(filePath, route) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = route.split('/').pop();
  
  return {
    slug,
    route,
    type: 'formation',
    hero: extractHeroFromContent(content),
    sections: extractFormationSections(content),
  };
}

function extractBookPage(filePath, route) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = route.split('/').pop() || 'index';
  
  if (slug === 'index') {
    return extractBooksIndex(content);
  }
  
  return {
    slug,
    route,
    type: 'book',
    // Extrair dados específicos do livro
  };
}

// Funções auxiliares
function extractListItems(content, startPattern) {
  const items = [];
  const regex = new RegExp(`"([^"]*${startPattern}[^"]*)"`, 'g');
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push(match[1]);
  }
  return items.slice(0, 5);
}

function extractQuestions(content) {
  const questions = [];
  const regex = /"([^"]*\?[^"]*)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[1].length > 30 && match[1].length < 200) {
      questions.push(match[1]);
    }
  }
  return questions.slice(0, 5);
}

function extractProgramBlocks(content) {
  const blocks = [];
  const blockMatches = content.match(/BLOCO \d+/g);
  if (blockMatches) {
    blockMatches.forEach((block, index) => {
      blocks.push({
        number: index + 1,
        title: `Bloco ${index + 1}`,
        content: '',
      });
    });
  }
  return blocks;
}

function extractEduzzUrl(content) {
  const match = content.match(/eduzzUrl=["']([^"']+)["']/);
  return match ? match[1] : '';
}

function extractHeroFromContent(content) {
  const titleMatch = content.match(/title=["']([^"']+)["']/);
  const subtitleMatch = content.match(/subtitle=["']([^"']+)["']/);
  const descriptionMatch = content.match(/description=["']([^"']+)["']/);
  const imageMatch = content.match(/image=["']([^"']+)["']/);
  
  return {
    title: titleMatch ? titleMatch[1] : '',
    subtitle: subtitleMatch ? subtitleMatch[1] : '',
    description: descriptionMatch ? descriptionMatch[1] : '',
    image: imageMatch ? imageMatch[1] : '',
  };
}

function extractFormationSections(content) {
  return [];
}

function extractBooksIndex(content) {
  const books = [];
  const bookMatches = content.match(/title:\s*"([^"]+)"/g);
  
  return {
    slug: 'index',
    route: '/livros',
    type: 'book-list',
    books: [
      {
        title: 'A Sabedoria do Dinheiro',
        description: 'Transforme sua mentalidade e atraia a prosperidade.',
        image: '/LIVROS-ROBERTO-NAVARRO-SD.png',
      },
      {
        title: 'Quebrando Mitos com o Dinheiro',
        description: 'Liberte-se das crenças que limitam sua prosperidade.',
        image: '/LIVROS-ROBERTO-NAVARRO-QM.png',
      },
      {
        title: 'A Arte de Enriquecer',
        description: 'Riqueza é um caminho, não um privilégio.',
        image: '/LIVROS-ROBERTO-NAVARRO-AE.png',
      },
      {
        title: 'Coaching Financeiro',
        description: 'Controle emocional, clareza financeira e ação.',
        image: '/LIVROS-ROBERTO-NAVARRO-CF.png',
      },
    ],
  };
}

// Função principal
function main() {
  const data = {
    pages: [],
    metadata: {
      extractedAt: new Date().toISOString(),
      version: '1.0.0',
    },
  };
  
  // Homepage
  data.pages.push(extractHomePage());
  
  // Eventos
  const eventosDir = path.join(pagesDir, 'eventos');
  const eventos = fs.readdirSync(eventosDir, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => ({
      path: path.join(eventosDir, item.name, 'page.tsx'),
      route: `/eventos/${item.name}`,
    }));
  
  eventos.forEach(event => {
    if (fs.existsSync(event.path)) {
      data.pages.push(extractEventPage(event.path, event.route));
    }
  });
  
  // Formações
  const formacoesDir = path.join(pagesDir, 'formacoes');
  const formacoes = fs.readdirSync(formacoesDir, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => ({
      path: path.join(formacoesDir, item.name, 'page.tsx'),
      route: `/formacoes/${item.name}`,
    }));
  
  formacoes.forEach(formation => {
    if (fs.existsSync(formation.path)) {
      data.pages.push(extractFormationPage(formation.path, formation.route));
    }
  });
  
  // Livros
  const livrosPage = path.join(pagesDir, 'livros', 'page.tsx');
  if (fs.existsSync(livrosPage)) {
    data.pages.push(extractBookPage(livrosPage, '/livros'));
  }
  
  // Salvar
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`✅ JSON detalhado gerado: ${outputFile}`);
  console.log(`📊 Total: ${data.pages.length} páginas`);
}

main();

