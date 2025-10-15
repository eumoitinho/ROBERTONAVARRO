import { sanityClient } from './client';
import { homepageQuery } from './homepage-queries';

// Tipo da Homepage
export interface HomepageData {
  _id: string;
  _type: 'homepage';
  title: string;
  heroSection: {
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
  };
  formacoesSection: {
    badge: string;
    title: string;
    highlightedText: string;
    description: string;
    formacoes: Array<{
      title: string;
      description: string;
      link: string;
      buttonText: string;
    }>;
  };
  showQuemSomosSection: boolean;
  showTransformationVideos: boolean;
  showTestimonials: boolean;
  showLocationMap: boolean;
  showEventPopup: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: {
      asset: any;
    };
  };
}

// Fallback data caso Sanity não esteja configurado
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
  showQuemSomosSection: true,
  showTransformationVideos: true,
  showTestimonials: true,
  showLocationMap: true,
  showEventPopup: false,
  seo: {
    metaTitle: 'Roberto Navarro | Transforme sua Mentalidade',
    metaDescription: 'Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.',
  },
};

// Fetch homepage data
export async function getHomepage(): Promise<HomepageData> {
  try {
    const homepage = await sanityClient.fetch<HomepageData>(homepageQuery);
    
    // Se não encontrar no Sanity, usa fallback
    if (!homepage) {
      console.log('[Homepage] Usando fallback data (Sanity não configurado)');
      return fallbackHomepageData;
    }
    
    return homepage;
  } catch (error) {
    console.error('[Homepage] Erro ao buscar do Sanity:', error);
    return fallbackHomepageData;
  }
}

