import { sanityClient } from './client';
import { homepageQuery } from './homepage-queries';

// ========================================
// INTERFACES TYPESCRIPT COMPLETAS
// ========================================

export interface HomepageHeroSection {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: {
    asset: any;
    hotspot?: any;
    crop?: any;
  };
  primaryButtonText: string;
  primaryButtonLink: string;
  achievementsNumber: string;
  achievementsLabel: string;
}

export interface FormacaoCard {
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

export interface FormacoesSection {
  badge: string;
  title: string;
  highlightedText: string;
  description: string;
  formacoes: FormacaoCard[];
}

export interface MentorStat {
  icon: 'users' | 'star' | 'book' | 'video';
  value: string;
  label: string;
}

export interface MentorSection {
  badge: string;
  title: string;
  highlightedText: string;
  subtitle: string;
  backgroundImage?: {
    asset: any;
  };
  bioParagraphs: string[];
  stats: MentorStat[];
}

export interface TransformationVideo {
  youtubeId: string;
  title: string;
  person: string;
  description: string;
  chipLabel: string;
  thumbnail?: {
    asset: any;
  };
}

export interface VideoStat {
  icon: 'star' | 'zap' | 'brain';
  title: string;
  description: string;
}

export interface VideosSection {
  badge: string;
  title: string;
  highlightedText: string;
  description: string;
  videos: TransformationVideo[];
  stats: VideoStat[];
  ctaButtonText: string;
  ctaButtonLink: string;
}

export interface Testimonial {
  name: string;
  role: string;
  initial: string;
  quote: string;
  rating: number;
  image?: {
    asset: any;
  };
}

export interface TestimonialsSection {
  badge: string;
  title: string;
  highlightedText: string;
  description: string;
  testimonials: Testimonial[];
  ctaText: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

export interface LocationSection {
  show: boolean;
  address?: string;
  phone?: string;
  email?: string;
  mapEmbedUrl?: string;
}

export interface SectionControls {
  showMentorSection: boolean;
  showVideosSection: boolean;
  showTestimonialsSection: boolean;
  showLocationSection: boolean;
  showEventPopup: boolean;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: {
    asset: any;
  };
}

export interface HomepageData {
  _id: string;
  _type: 'homepage';
  title: string;
  heroSection: HomepageHeroSection;
  formacoesSection: FormacoesSection;
  mentorSection: MentorSection;
  videosSection: VideosSection;
  testimonialsSection: TestimonialsSection;
  locationSection: LocationSection;
  sectionControls: SectionControls;
  seo?: SEO;
}

// ========================================
// FALLBACK DATA COMPLETO
// ========================================

export const fallbackHomepageData: HomepageData = {
  _id: 'homepage-fallback',
  _type: 'homepage',
  title: 'Homepage Principal',
  
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
  
  testimonialsSection: {
    badge: 'DEPOIMENTOS',
    title: 'O QUE NOSSO ALUNOS DIZEM',
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
  
  locationSection: {
    show: true,
  },
  
  sectionControls: {
    showMentorSection: true,
    showVideosSection: true,
    showTestimonialsSection: true,
    showLocationSection: true,
    showEventPopup: false,
  },
  
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

// ========================================
// API FUNCTION
// ========================================

export async function getHomepage(): Promise<HomepageData> {
  try {
    const homepage = await sanityClient.fetch<HomepageData>(homepageQuery);
    
    if (!homepage) {
      console.log('[Homepage] Usando fallback data (Sanity não configurado)');
      return fallbackHomepageData;
    }
    
    // Garantir que todos os campos obrigatórios existam (merge com fallback)
    return {
      ...fallbackHomepageData,
      ...homepage,
      heroSection: { ...fallbackHomepageData.heroSection, ...homepage.heroSection },
      formacoesSection: { 
        ...fallbackHomepageData.formacoesSection, 
        ...homepage.formacoesSection,
        formacoes: homepage.formacoesSection?.formacoes || fallbackHomepageData.formacoesSection.formacoes,
      },
      mentorSection: { 
        ...fallbackHomepageData.mentorSection, 
        ...homepage.mentorSection,
        bioParagraphs: homepage.mentorSection?.bioParagraphs || fallbackHomepageData.mentorSection.bioParagraphs,
        stats: homepage.mentorSection?.stats || fallbackHomepageData.mentorSection.stats,
      },
      videosSection: { 
        ...fallbackHomepageData.videosSection, 
        ...homepage.videosSection,
        videos: homepage.videosSection?.videos || fallbackHomepageData.videosSection.videos,
        stats: homepage.videosSection?.stats || fallbackHomepageData.videosSection.stats,
      },
      testimonialsSection: { 
        ...fallbackHomepageData.testimonialsSection, 
        ...homepage.testimonialsSection,
        testimonials: homepage.testimonialsSection?.testimonials || fallbackHomepageData.testimonialsSection.testimonials,
      },
      locationSection: { ...fallbackHomepageData.locationSection, ...homepage.locationSection },
      sectionControls: { ...fallbackHomepageData.sectionControls, ...homepage.sectionControls },
      seo: { ...fallbackHomepageData.seo, ...homepage.seo },
    };
  } catch (error) {
    console.error('[Homepage] Erro ao buscar do Sanity:', error);
    return fallbackHomepageData;
  }
}

