import { getFormacoes, getPageBySlug } from '@/lib/payload/client'
import HomePageClient from './page-client'

// Desabilitar cache para garantir que mudanças do Payload apareçam imediatamente
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  let formacoes: any[] = []
  let homePage: any = null

  try {
    formacoes = await getFormacoes()
  } catch (error: any) {
    if (error?.name === 'MongoTopologyClosedError') {
      console.warn('⚠️ MongoDB não está conectado. Usando dados de fallback.')
    } else {
      console.error('❌ Erro ao buscar formações do Payload:', error?.message || error)
    }
    formacoes = []
  }

  try {
    homePage = await getPageBySlug('home')
  } catch (error: any) {
    console.error('❌ Erro ao buscar página home no Payload:', error?.message || error)
    homePage = null
  }

  const formationsItems = formacoes.length > 0
    ? formacoes.map((formacao: any) => ({
        title: formacao.title,
        description: formacao.hero?.subtitle || formacao.hero?.description || 'Descrição da formação',
        link: `/formacoes/${formacao.slug}`,
      }))
    : [
        // Fallback - manter dados originais se não houver formações no Payload
        {
          title: "LCF MENTORING",
          description: "Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.",
          link: "/formacoes/mentoria"
        },
        {
          title: "EMPREENDEDOR INTELIGENTE",
          description: "Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.",
          link: "/formacoes/empreendedor-inteligente"
        },
        {
          title: "EDUCADOR FINANCEIRO",
          description: "Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.",
          link: "/formacoes/educador-financeiro"
        },
        {
          title: "LCF MENTORING PRO",
          description: "Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.",
          link: "/formacoes/lcf-mentoring-pro"
        },
        {
          title: "MENTORIA DE INVESTIMENTOS",
          description: "Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.",
          link: "/formacoes/mentoria-de-investimentos"
        },
        {
          title: "MENTORIA INDIVIDUAL",
          description: "Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.",
          link: "/formacoes/mentoria-individual"
        },
        {
          title: "MÉTODO TF",
          description: "Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.",
          link: "/formacoes/metodo-tf"
        },
        {
          title: "MENTOR COACHING FINANCEIRO",
          description: "Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.",
          link: "/formacoes/mentor-coaching-financeiro"
        }
      ]

  return <HomePageClient formationsItems={formationsItems} pageData={homePage} />
}

