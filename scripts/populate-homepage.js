const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const homepageData = {
  _type: 'homepage',
  _id: 'homepage-main',
  title: 'Homepage Principal',
  
  // Hero Section
  heroSection: {
    badge: 'INSTITUTO COACHING FINANCEIRO',
    title: 'TRANSFORME SUA MENTALIDADE',
    subtitle: 'E CONQUISTE UMA NOVA REALIDADE FINANCEIRA',
    description: 'Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.',
    primaryButtonText: 'CONHEÇA NOSSAS FORMAÇÕES',
    primaryButtonLink: '#formacoes',
    achievementsNumber: '300.000+',
    achievementsLabel: 'vidas transformadas',
  },
  
  // Formações Section
  formacoesSection: {
    badge: 'NOSSAS FORMAÇÕES',
    title: 'FORMAÇÕES QUE VÃO TRANSFORMAR SUA MENTALIDADE',
    highlightedText: 'TRANSFORMAR SUA MENTALIDADE',
    description: 'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
    formacoes: [
      {
        title: 'LCF MENTORING',
        description: 'Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.',
        link: '/formacoes/mentoria',
        buttonText: 'SAIBA MAIS',
      },
      {
        title: 'EMPREENDEDOR INTELIGENTE',
        description: 'Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.',
        link: '/formacoes/empreendedor-inteligente',
        buttonText: 'SAIBA MAIS',
      },
      {
        title: 'EDUCADOR FINANCEIRO',
        description: 'Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.',
        link: '/formacoes/educador-financeiro',
        buttonText: 'SAIBA MAIS',
      },
      {
        title: 'LCF MENTORING PRO',
        description: 'Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.',
        link: '/formacoes/lcf-mentoring-pro',
        buttonText: 'SAIBA MAIS',
      },
      {
        title: 'MENTORIA DE INVESTIMENTOS',
        description: 'Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.',
        link: '/formacoes/mentoria-de-investimentos',
        buttonText: 'SAIBA MAIS',
      },
      {
        title: 'MENTORIA INDIVIDUAL',
        description: 'Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.',
        link: '/formacoes/mentoria-individual',
        buttonText: 'SAIBA MAIS',
      },
      {
        title: 'MÉTODO TF',
        description: 'Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.',
        link: '/formacoes/metodo-tf',
        buttonText: 'SAIBA MAIS',
      },
      {
        title: 'MENTOR COACHING FINANCEIRO',
        description: 'Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.',
        link: '/formacoes/mentor-coaching-financeiro',
        buttonText: 'SAIBA MAIS',
      },
    ],
  },
  
  // Mentor Section
  mentorSection: {
    badge: 'MENTOR',
    title: 'CONHEÇA SEU MENTOR',
    highlightedText: 'MENTOR',
    subtitle: 'Especialista que vai guiar sua jornada de transformação',
    bioParagraphs: [
      'Roberto Navarro é um exemplo vivo de superação e sucesso. Sua trajetória começou humildemente, trabalhando como lavador de vidros de carros aos 13 anos de idade. Desde cedo, ele compreendeu que enfrentaria desafios significativos para alcançar seus objetivos e prosperar na vida.',
      'A virada em sua vida veio quando Roberto percebeu que havia um "vilão invisível" bloqueando sua prosperidade e a de sua família. Com determinação e uma abordagem única, ele transformou essa adversidade em oportunidade e se tornou um multimilionário em menos de 7 anos.',
      'Hoje, Roberto Navarro é reconhecido como o criador do Coach Financeiro no Brasil e especialista em inteligência financeira, espiritual e emocional. Sua missão é transformar a vida financeira de 10 milhões de brasileiros e contribuir para a construção de um país rico e próspero.',
    ],
    stats: [
      { icon: 'users', value: '+1,5 Milhões', label: 'de Alunos' },
      { icon: 'star', value: '1280', label: 'Técnicas Exclusivas' },
      { icon: 'book', value: '5', label: 'Livros Publicados' },
      { icon: 'video', value: '100+', label: 'Vídeos Inspiradores' },
    ],
  },
  
  // Videos Section
  videosSection: {
    badge: 'TRANSFORMAÇÃO REAL',
    title: 'VEJA COMO NOSSOS ALUNOS TRANSFORMARAM SUAS VIDAS FINANCEIRAS',
    highlightedText: 'ALUNOS TRANSFORMARAM',
    description: 'Histórias reais de pessoas que aplicaram os princípios das Crenças da Riqueza e mudaram completamente sua relação com o dinheiro.',
    videos: [
      { youtubeId: 'sVcR5iq1BG0', title: 'Estudo de Caso Fabio Santos - ICF', person: 'Fabio Santos', description: 'Relato de transformação financeira com o Instituto Coaching Financeiro.', chipLabel: 'História de Sucesso' },
      { youtubeId: 'AyjH3rNe37M', title: 'Estudo de Caso Clelio - ICF', person: 'Clelio', description: 'História de superação e sucesso com o Instituto Coaching Financeiro.', chipLabel: 'História de Sucesso' },
      { youtubeId: 'pmbpDqpkK78', title: 'Estudo de Caso Wagner Jovino - ICF', person: 'Wagner Jovino', description: 'Transformação financeira e pessoal com o Instituto Coaching Financeiro.', chipLabel: 'História de Sucesso' },
      { youtubeId: '7N97LDt9F5Y', title: 'Estudo de Caso Rodrigo - ICF', person: 'Rodrigo', description: 'Como Rodrigo transformou sua vida financeira com o ICF.', chipLabel: 'História de Sucesso' },
      { youtubeId: 'FUkJWtmjGtM', title: 'Depoimento João Leles - ICF', person: 'João Leles', description: 'Depoimento sobre a experiência com o Instituto Coaching Financeiro.', chipLabel: 'História de Sucesso' },
      { youtubeId: 'Jyokxvo-WOo', title: 'Depoimento Ricardo - ICF', person: 'Ricardo', description: 'Relato de transformação financeira com o Instituto Coaching Financeiro.', chipLabel: 'História de Sucesso' },
      { youtubeId: 'GQVv0wnK4So', title: 'Como Roosevelt transformou sua vida financeira - ICF', person: 'Roosevelt', description: 'História de sucesso com o Instituto Coaching Financeiro.', chipLabel: 'História de Sucesso' },
      { youtubeId: 'kfZ-hck8bJI', title: 'Depoimentos - Instituto Coaching Financeiro - ICF', person: 'Vários Participantes', description: 'Compilado de depoimentos sobre o impacto do Instituto Coaching Financeiro.', chipLabel: 'História de Sucesso' },
      { youtubeId: '4aYDKJQBnRw', title: 'Como superei minhas dívidas em 6 meses', person: 'Carlos Eduardo Silva', description: 'De R$45 mil em dívidas a investidor em apenas 6 meses aplicando os princípios das Crenças da Riqueza.', chipLabel: 'Transformação Real' },
      { youtubeId: 'yTELcwYTsnU', title: 'Minha jornada de funcionário a empresário', person: 'João Gabriel Pereira', description: 'Abandonei o medo e a zona de conforto para empreender e hoje tenho liberdade financeira e geográfica.', chipLabel: 'Transformação Real' },
      { youtubeId: 'W6rBTJKeJ4w', title: 'Como multipliquei meu patrimônio', person: 'Roberto Ferreira Mendes', description: 'Aprendi a fazer o dinheiro trabalhar para mim e multipliquei meu patrimônio em 3x em apenas 18 meses.', chipLabel: 'Transformação Real' },
    ],
    stats: [
      { icon: 'star', title: 'Resultados Comprovados', description: 'Mais de 130 mil pessoas já passaram por nossas formações e transformaram sua relação com o dinheiro.' },
      { icon: 'zap', title: 'Metodologia Exclusiva', description: 'Uma abordagem única que integra inteligência financeira, emocional, espiritual e empresarial.' },
      { icon: 'brain', title: 'Transformação Mental', description: 'Reprogramação de crenças limitantes e desenvolvimento de uma mentalidade de prosperidade.' },
    ],
    ctaButtonText: 'Transformar Minha Vida Financeira!',
    ctaButtonLink: '#inscricao',
  },
  
  // Testimonials Section
  testimonialsSection: {
    badge: 'DEPOIMENTOS',
    title: 'O QUE NOSSOS ALUNOS DIZEM',
    highlightedText: 'ALUNOS DIZEM',
    description: 'Conheça as histórias de transformação de pessoas que já passaram pelos nossos programas.',
    testimonials: [
      {
        name: 'Ana Souza',
        role: 'Empresária',
        initial: 'A',
        quote: 'Eu estava completamente endividada, sem esperança de sair do vermelho. O método do Roberto me ajudou a organizar minhas finanças, quitar dívidas e voltar a sonhar. Hoje tenho controle e paz financeira!',
        rating: 5,
      },
      {
        name: 'José Lima',
        role: 'Professor',
        initial: 'J',
        quote: 'Sempre achei impossível sair das dívidas do cartão. Com as orientações do Roberto, consegui renegociar tudo, criar uma reserva e até investir. Minha vida mudou completamente.',
        rating: 5,
      },
      {
        name: 'Patrícia Gomes',
        role: 'Autônoma',
        initial: 'P',
        quote: 'O Roberto me mostrou que é possível recomeçar. Saí do sufoco das dívidas, aprendi a gastar com consciência e hoje ajudo minha família a ter uma vida mais tranquila.',
        rating: 5,
      },
    ],
    ctaText: 'Junte-se a milhares de pessoas que já transformaram suas vidas',
    ctaButtonText: 'COMECE SUA TRANSFORMAÇÃO',
    ctaButtonLink: '#inscricao',
  },
  
  // Location Section
  locationSection: {
    show: true,
    address: 'Av. Contorno, 8395 - sala 403, Lourdes, Belo Horizonte - MG, 30110-130',
    phone: '+55 (31) 3515-3920',
    email: 'contato@robertonavarro.com.br',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.733889379698!2d-43.95082732447524!3d-19.939468681437743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699f5d3d0a00d%3A0x7dcfd6e5ed69c5e6!2sAv.%20do%20Contorno%2C%208395%20-%20Santo%20Agostinho%2C%20Belo%20Horizonte%20-%20MG%2C%2030110-130!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr',
  },
  
  // Section Controls
  sectionControls: {
    showMentorSection: true,
    showVideosSection: true,
    showTestimonialsSection: true,
    showLocationSection: true,
    showEventPopup: false,
  },
  
  // SEO
  seo: {
    metaTitle: 'Roberto Navarro | Transforme sua Mentalidade',
    metaDescription: 'Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.',
    keywords: [
      'Roberto Navarro',
      'Coaching Financeiro',
      'Mentalidade',
      'Transformação Financeira',
      'Educação Financeira',
      'Mentor Financeiro',
    ],
  },
};

async function populateHomepage() {
  try {
    console.log('🚀 Iniciando população da homepage no Sanity...\n');
    
    console.log('📊 Configuração:');
    console.log(`   Project ID: ${client.config().projectId}`);
    console.log(`   Dataset: ${client.config().dataset}\n`);
    
    // Verificar se já existe
    console.log('🔍 Verificando se já existe uma homepage...');
    const existing = await client.fetch(`*[_type == "homepage"][0]`);
    
    if (existing) {
      console.log('⚠️  Homepage já existe!');
      console.log(`   ID: ${existing._id}`);
      console.log(`   Título: ${existing.title}\n`);
      
      console.log('❓ Deseja sobrescrever? (O script vai criar um novo documento)');
      console.log('   Para deletar o existente, use: npm run sanity-delete\n');
      
      // Criar com ID diferente para não sobrescrever
      homepageData._id = `homepage-${Date.now()}`;
      console.log(`📝 Criando nova homepage com ID: ${homepageData._id}\n`);
    }
    
    console.log('💾 Criando documento no Sanity...');
    const result = await client.create(homepageData);
    
    console.log('\n✅ Homepage populada com sucesso!');
    console.log(`   ID: ${result._id}`);
    console.log(`   Rev: ${result._rev}\n`);
    
    console.log('📊 Estatísticas:');
    console.log(`   - Hero Section: ✅`);
    console.log(`   - ${homepageData.formacoesSection.formacoes.length} Formações: ✅`);
    console.log(`   - ${homepageData.mentorSection.bioParagraphs.length} Parágrafos Mentor: ✅`);
    console.log(`   - ${homepageData.videosSection.videos.length} Vídeos: ✅`);
    console.log(`   - ${homepageData.testimonialsSection.testimonials.length} Depoimentos: ✅`);
    console.log(`   - Localização: ✅`);
    console.log(`   - Controles: ✅`);
    console.log(`   - SEO: ✅\n`);
    
    console.log('🎉 Pronto! Acesse o Studio para ver o conteúdo:');
    console.log('   http://localhost:3000/studio\n');
    
  } catch (error) {
    console.error('\n❌ Erro ao popular homepage:');
    console.error(error.message);
    
    if (error.message.includes('projectId')) {
      console.log('\n💡 Dica: Verifique se as variáveis de ambiente estão configuradas em .env.local');
      console.log('   - NEXT_PUBLIC_SANITY_PROJECT_ID');
      console.log('   - NEXT_PUBLIC_SANITY_DATASET');
      console.log('   - SANITY_API_TOKEN\n');
    }
    
    process.exit(1);
  }
}

populateHomepage();

