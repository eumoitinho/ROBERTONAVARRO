import { getFormacoes, getPageBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type FormationItem = {
  title: string
  description: string
  link: string
}

type AccentKey = 'red' | 'yellow'

type HeroData = {
  badgeText: string
  title: string
  highlightedText: string
  description: string
  accent: AccentKey
}

type GridHeading = {
  badgeText?: string
  title: string
  highlightedText?: string
  description?: string
  accent: AccentKey
  useCollection: boolean
  manualItems?: FormationItem[]
}

const defaultHero: HeroData = {
  badgeText: 'FORMAÇÕES',
  title: 'FORMAÇÕES QUE VÃO',
  highlightedText: 'TRANSFORMAR SUA MENTALIDADE',
  description:
    'Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.',
  accent: 'red',
}

const defaultManualItems: FormationItem[] = [
  {
    title: 'LCF MENTORING',
    description:
      'Imersão intensa em finanças, coaching de vida e estratégias práticas para você assumir o controle da sua vida financeira.',
    link: '/formacoes/mentoria',
  },
  {
    title: 'EMPREENDEDOR INTELIGENTE',
    description:
      'Formação exclusiva para empresários que querem escalar resultados, atrair investidores e gerir seus negócios com segurança.',
    link: '/formacoes/empreendedor-inteligente',
  },
  {
    title: 'EDUCADOR FINANCEIRO',
    description:
      'Transforme sua experiência em uma carreira lucrativa em apenas 90 dias e torne-se referência no ensino de finanças.',
    link: '/formacoes/educador-financeiro',
  },
  {
    title: 'LCF MENTORING PRO',
    description:
      'Transforme sua mentalidade e descubra seu propósito de vida com o programa mais completo de evolução pessoal e profissional do Brasil.',
    link: '/formacoes/lcf-mentoring-pro',
  },
  {
    title: 'MENTORIA DE INVESTIMENTOS',
    description:
      'Programa exclusivo para quem quer investir com inteligência, proteger seu capital e alcançar a liberdade financeira.',
    link: '/formacoes/mentoria-de-investimentos',
  },
  {
    title: 'MENTORIA INDIVIDUAL',
    description:
      'Destrave seu potencial e alcance sua liberdade financeira com um acompanhamento 100% personalizado.',
    link: '/formacoes/mentoria-individual',
  },
  {
    title: 'MÉTODO TF',
    description:
      'Desbloqueie a riqueza em sua vida com estratégias comprovadas para superar bloqueios financeiros e alcançar a prosperidade.',
    link: '/formacoes/metodo-tf',
  },
  {
    title: 'MENTOR COACHING FINANCEIRO',
    description:
      'Transforme-se em um verdadeiro gerador de riqueza com a metodologia que reprograma sua relação com o dinheiro.',
    link: '/formacoes/mentor-coaching-financeiro',
  },
]

const accentStyles: Record<AccentKey, {
  badgeDot: string
  highlight: string
  gradientBar: string
  button: string
  buttonText: string
  cardText: string
  cardHover: string
}> = {
  red: {
    badgeDot: 'bg-red-400',
    highlight: 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600',
    gradientBar: 'from-red-500 to-red-600',
    button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    buttonText: 'text-white',
    cardText: 'text-red-400',
    cardHover: 'hover:border-red-500/50 hover:shadow-red-500/10',
  },
  yellow: {
    badgeDot: 'bg-yellow-400',
    highlight: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600',
    gradientBar: 'from-yellow-500 to-amber-600',
    button: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700',
    buttonText: 'text-black',
    cardText: 'text-yellow-400',
    cardHover: 'hover:border-yellow-500/50 hover:shadow-yellow-500/10',
  },
}

const getMediaUrl = (media: any, fallback?: string): string => {
  if (!media) return fallback ?? ''
  if (typeof media === 'string') return media
  if (media?.url) return media.url
  if (media?.value?.url) return media.value.url
  return fallback ?? ''
}

const mapManualItems = (items?: any[]): FormationItem[] | undefined => {
  if (!Array.isArray(items)) return undefined
  const mapped = items
    .map((item: any) => ({
      title: (item?.title ?? '').trim(),
      description: (item?.description ?? '').trim(),
      link: (item?.link ?? '').trim() || '#',
    }))
    .filter((item) => item.title)
  return mapped.length ? mapped : undefined
}

const mapCollectionFormations = (collection: any[]): FormationItem[] =>
  collection.map((formacao: any) => ({
    title: formacao.title,
    description: formacao.hero?.subtitle || formacao.hero?.description || 'Descrição da formação',
    link: `/formacoes/${formacao.slug}`,
  }))

type BlockFinder = (type: string) => any | null

const getHeroData = (finder: BlockFinder): HeroData => {
  const block = finder('formacoesHero')
  if (!block) return defaultHero
  return {
    badgeText: block.badgeText ?? defaultHero.badgeText,
    title: block.title ?? defaultHero.title,
    highlightedText: block.highlightedText ?? defaultHero.highlightedText,
    description: block.description ?? defaultHero.description,
    accent: (block.accent as AccentKey) ?? defaultHero.accent,
  }
}

const getGridHeading = (finder: BlockFinder): GridHeading => {
  const block = finder('formationsGrid')
  return {
    badgeText: block?.badgeText ?? 'FORMAÇÕES',
    title: block?.title ?? defaultHero.title,
    highlightedText: block?.highlightedText ?? defaultHero.highlightedText,
    description: block?.description ?? defaultHero.description,
    accent: (block?.accent as AccentKey) ?? 'red',
    useCollection:
      typeof block?.useFormacoesCollection === 'boolean'
        ? block.useFormacoesCollection
        : true,
    manualItems: mapManualItems(block?.items),
  }
}

export default async function FormacoesPage() {
  const [formacoes, pageData] = await Promise.all([
    getFormacoes().catch((error) => {
      console.error('❌ Erro ao buscar formações:', error?.message || error)
      return []
    }),
    getPageBySlug('formacoes').catch((error) => {
      console.error('❌ Erro ao buscar página de formações no Payload:', error?.message || error)
      return null
    }),
  ])

  const blocks = pageData?.pageBuilder ?? []
  const findBlock = (type: string) => blocks.find((block: any) => block?.blockType === type) ?? null

  const hero = getHeroData(findBlock)
  const gridHeading = getGridHeading(findBlock)

  const accentKey = (gridHeading.accent || hero.accent) as AccentKey
  const accent = accentStyles[accentKey] ?? accentStyles.red

  const formationItems = gridHeading.useCollection
    ? formacoes.length
      ? mapCollectionFormations(formacoes)
      : defaultManualItems
    : gridHeading.manualItems ?? defaultManualItems

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-zinc-950 text-white">
        <SiteHeader showInicio={true} />

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {hero.badgeText && (
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                  <span className={`flex h-2 w-2 rounded-full ${accent.badgeDot}`}></span>
                  <span className="text-sm font-medium">{hero.badgeText}</span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {hero.title}{' '}
                <span className={accent.highlight}>{hero.highlightedText}</span>
              </h1>
              <p className="text-xl text-zinc-300 mb-8">{hero.description}</p>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            {formationItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {formationItems.map((formation, index) => (
                  <Card
                    key={`${formation.title}-${index}`}
                    className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${accent.cardHover} group p-6 flex flex-col`}
                  >
                    <div className={`h-1 w-full bg-gradient-to-r ${accent.gradientBar} mb-4`}></div>
                    <CardContent className="p-0 flex flex-col h-full">
                      <h3
                        className={`text-xl font-bold mb-3 ${
                          index === 0 ? accent.highlight : accent.cardText
                        }`}
                      >
                        {formation.title}
                      </h3>
                      <p className="text-zinc-300 mb-6 flex-1">{formation.description}</p>
                      <div className="mt-auto">
                        <Button
                          asChild
                          className={`cta-hover ${accent.button} ${accent.buttonText} font-semibold rounded-xl w-full`}
                        >
                          <Link href={formation.link || '#'}>
                            SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-zinc-400 text-lg">Nenhuma formação encontrada.</p>
                <p className="text-zinc-500 text-sm mt-2">Adicione formações no Payload CMS para que elas apareçam aqui.</p>
              </div>
            )}
          </div>
        </section>

        <Footer accent={accentKey === 'red' ? 'red' : 'yellow'} />
        <WhatsAppButton source="Formações" />
      </div>
    </>
  )
}

export async function generateMetadata() {
  return {
    title: 'Formações | Roberto Navarro',
    description:
      'Conheça nossas formações exclusivas em educação financeira e coaching. Transforme sua mentalidade e alcance a liberdade financeira.',
    keywords: 'formações, educação financeira, coaching financeiro, cursos, Roberto Navarro',
  }
}

