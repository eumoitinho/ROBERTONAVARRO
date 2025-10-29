import type { Metadata } from 'next'
import { getHomepage, type HomepageData } from '@/sanity/lib/homepage-api'
import { getSiteSettings } from '@/sanity/lib/api'
import HomePageClient from './page-client'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage()
  return {
    title: data?.seo?.metaTitle || 'Roberto Navarro | Transforme sua Mentalidade',
    description:
      data?.seo?.metaDescription ||
      'Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.',
    keywords: data?.seo?.keywords?.join(', '),
    openGraph: {
      title: data?.seo?.metaTitle || 'Roberto Navarro | Transforme sua Mentalidade',
      description: data?.seo?.metaDescription,
      images: data?.seo?.ogImage?.asset?.url ? [{ url: data.seo.ogImage.asset.url }] : [],
    },
  }
}

export default async function HomePage() {
  const [data, siteSettings] = await Promise.all([getHomepage(), getSiteSettings()])
  const fallback: HomepageData = {
    _id: 'homepage-fallback',
    title: 'Homepage Principal',
    heroSection: {
      badge: 'INSTITUTO COACHING FINANCEIRO',
      title: 'TRANSFORME SUA MENTALIDADE',
      subtitle: 'E CONQUISTE UMA NOVA REALIDADE FINANCEIRA',
      description:
        'Com métodos exclusivos e comprovados, o Instituto Coaching Financeiro (ICF) ajuda você a transformar sua mentalidade e conquistar uma nova realidade financeira.',
      achievementsNumber: '300.000+',
      achievementsLabel: 'vidas transformadas',
      primaryButtonText: 'CONHEÇA NOSSAS FORMAÇÕES',
      primaryButtonLink: '#formacoes',
    },
    formacoesSection: {
      badge: 'NOSSAS FORMAÇÕES',
      title: 'FORMAÇÕES QUE VÃO',
      highlightedText: 'TRANSFORMAR SUA MENTALIDADE',
      description:
        'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
      formacoes: [
        {
          title: 'LCF MENTORING',
          description:
            'Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.',
          link: '/formacoes/mentoria',
          buttonText: 'SAIBA MAIS',
        },
        {
          title: 'EMPREENDEDOR INTELIGENTE',
          description:
            'Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.',
          link: '/formacoes/empreendedor-inteligente',
          buttonText: 'SAIBA MAIS',
        },
        {
          title: 'EDUCADOR FINANCEIRO',
          description:
            'Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.',
          link: '/formacoes/educador-financeiro',
          buttonText: 'SAIBA MAIS',
        },
        {
          title: 'LCF MENTORING PRO',
          description:
            'Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.',
          link: '/formacoes/lcf-mentoring-pro',
          buttonText: 'SAIBA MAIS',
        },
        {
          title: 'MENTORIA DE INVESTIMENTOS',
          description:
            'Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.',
          link: '/formacoes/mentoria-de-investimentos',
          buttonText: 'SAIBA MAIS',
        },
        {
          title: 'MENTORIA INDIVIDUAL',
          description:
            'Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.',
          link: '/formacoes/mentoria-individual',
          buttonText: 'SAIBA MAIS',
        },
        {
          title: 'MÉTODO TF',
          description:
            'Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.',
          link: '/formacoes/metodo-tf',
          buttonText: 'SAIBA MAIS',
        },
        {
          title: 'MENTOR COACHING FINANCEIRO',
          description:
            'Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.',
          link: '/formacoes/mentor-coaching-financeiro',
          buttonText: 'SAIBA MAIS',
        },
      ],
    },
    sectionControls: {
      showMentorSection: true,
      showVideosSection: true,
      showTestimonialsSection: true,
      showLocationSection: true,
      showEventPopup: false,
    },
  }

  return <HomePageClient data={data || fallback} siteSettings={siteSettings ?? undefined} />
}