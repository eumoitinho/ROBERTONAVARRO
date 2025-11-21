import { getLivros, getPageBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { ProductKitDisplayClient } from '@/components/product-kit-display-client'
import { KnowledgeBarrierSection } from '@/components/knowledge-barrier-section'
import { FinalCtaSection } from '@/components/final-cta-section'
import { TestimonialsLivros } from '@/components/testimonials-livros'
import HeroPages from '@/components/hero-pages'
import Image from 'next/image'
import Link from 'next/link'

const defaultHero = {
  title: 'Desvende os segredos da liberdade financeira com os ensinamentos de Roberto Navarro',
  subtitle: 'Kit Exclusivo Roberto Navarro',
  secondTitle: '',
  description:
    'O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil traz para você um kit exclusivo de livros que serão seu guia definitivo para a tão sonhada liberdade financeira.',
  image: '/images/HERO_EDUCADOR.png',
  ctaText: 'OFERTA EXCLUSIVA: ADQUIRA SEU KIT!',
  ctaHref: 'https://sun.eduzz.com/956345',
  ctaNewTab: true,
}

const defaultProductKit = {
  breadcrumbs: [
    { title: 'Início', url: '/' },
    { title: 'Livros', url: '/livros' },
  ],
  heading: 'Kit Exclusivo Roberto Navarro',
  images: [
    { src: '/images/SABEDORIA.png', alt: 'A Sabedoria do Dinheiro' },
    { src: '/images/MITOS.png', alt: 'Quebrando Mitos com o Dinheiro' },
    { src: '/images/ARTE.png', alt: 'A Arte de Enriquecer' },
    { src: '/images/COACHING.png', alt: 'Coaching Financeiro' },
  ],
  price: 'R$ 200,00',
  rating: { stars: 5, reviewCount: 3 },
  description:
    'Criador do conceito de Coaching Financeiro no país, Navarro impactou mais de 1 milhão de pessoas, desenvolvendo metodologias que unem estratégias práticas de finanças, inteligência emocional e princípios bíblicos. Agora, você terá a oportunidade de mergulhar nos pilares dessa transformação através de seus quatro livros.',
  cta: {
    label: 'OFERTA EXCLUSIVA: ADQUIRA SEU KIT!',
    href: 'https://sun.eduzz.com/956345',
    newTab: true,
  },
  tabs: [
    {
      value: 'details',
      trigger: 'Descrição',
      description:
        'Mais do que um conjunto de livros, este kit é um investimento em você, na sua família e no seu futuro. Prepare-se para quebrar paradigmas, desmistificar o dinheiro e construir uma nova realidade financeira. A sua jornada para a abundância começa agora!',
    },
    {
      value: 'content',
      trigger: 'Conteúdo do Kit',
      description:
        'Este kit inclui 4 livros essenciais de Roberto Navarro: A Sabedoria do Dinheiro, Quebrando Mitos com o Dinheiro, A Arte de Enriquecer e Coaching Financeiro.',
    },
  ],
}

const defaultCatalog = {
  badgeText: 'CONHEÇA OS LIVROS',
  title: 'Um kit que vai transformar sua vida',
  description:
    'As obras de Roberto Navarro combinam inteligência financeira, emocional e espiritual para guiá-lo rumo à prosperidade.',
}

const defaultKnowledge = {
  heading: 'A falta de conhecimento é a maior barreira para a prosperidade',
  description:
    'Pense no valor de ter à sua disposição o conhecimento de um dos maiores especialistas em finanças do Brasil. Roberto Navarro não é apenas um autor; ele é um mentor que já transformou a vida de centenas de milhares de pessoas. Sua metodologia, testada e comprovada, vai além dos números, tocando na essência da sua relação com o dinheiro.',
  button: {
    label: 'GARANTA SEU KIT!',
    href: 'https://sun.eduzz.com/956345',
    newTab: true,
  },
  firstImage: { src: '/images/livro2.png', alt: 'Quebrando Mitos com o Dinheiro' },
  secondImage: { src: '/images/LIVRO_MOCKUP.png', alt: 'Mockup do Kit de Livros' },
}

const defaultTestimonials = [
  {
    quote:
      'Desperta para importância de se planejar financeiramente o quanto antes. Embora o autor se conduza mais como mentor, há muitas perguntas de Coaching Financeiro muito bem elaboradas que te fazem refletir sobre alguns pontos cegos no aspecto financeiro, bastante esclarecedor, escrito de modo, que parece que o autor é um amigo batendo um papo.',
    name: 'Juliano Gorgonio',
    role: 'Compra Verificada',
    numberOfStars: 5,
    avatar: { src: '/images/reviewers/juliano-gorgonio.png', alt: 'Juliano Gorgonio' },
  },
  {
    quote:
      'Ótimo livro. Leitura super fácil e tudo faz muito sentido muito embora não seja um tema simples como parece considerando todos os problemas sociais do Brasil.',
    name: 'Marta Celestino',
    role: 'Compra Verificada',
    numberOfStars: 5,
    avatar: { src: '/images/reviewers/marta-celestino.png', alt: 'Marta Celestino' },
  },
  {
    quote:
      '"O que enriquece o ser humano, não é o dinheiro que ele consegue, mas o processo que ele segue para obter aquilo." Não tem como ler este livro e não se sentir mais rico.',
    name: 'Andrea Kress',
    role: 'Compra Verificada',
    numberOfStars: 5,
    avatar: { src: '/images/reviewers/andrea-kress.png', alt: 'Andrea Kress' },
  },
]

const defaultFinalCta = {
  heading: 'Tenha as ferramentas para construir a vida que você merece',
  description:
    'O conhecimento é o único investimento que ninguém pode tirar de você. Invista em si mesmo e colha os frutos de uma vida próspera e abundante.',
  offerText: 'Oferta Exclusiva',
  price: '10x de R$ 20,00',
  paymentInfo: 'ou R$ 200,00 à vista',
  button: {
    label: 'QUERO MEU KIT E MINHA LIBERDADE FINANCEIRA!',
    href: 'https://sun.eduzz.com/956345',
    newTab: true,
  },
  cardImage: { src: '/images/mockuplivro.png', alt: 'Kit de Livros Roberto Navarro' },
  image: { src: '/images/livro3.png', alt: 'Kit de Livros Roberto Navarro' },
}

const getMediaUrl = (media: any, fallback?: string): string => {
  if (!media) return fallback ?? ''
  if (typeof media === 'string') return media
  if (media?.url) return media.url
  if (media?.value?.url) return media.value.url
  if (media?.sizes?.card?.url) return media.sizes.card.url
  return fallback ?? ''
}

const mapBreadcrumbs = (items: any[], fallback = defaultProductKit.breadcrumbs) => {
  if (!Array.isArray(items) || !items.length) return fallback
  const mapped = items
    .map((item) => ({
      title: (item?.title ?? '').trim(),
      url: (item?.url ?? '').trim() || '#',
    }))
    .filter((item) => item.title && item.url)
  return mapped.length ? mapped : fallback
}

const slugify = (value: string, fallback: string) => {
  const base = value
    ?.toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return base || fallback
}

const mapTabs = (items: any[], fallback = defaultProductKit.tabs) => {
  if (!Array.isArray(items) || !items.length) return fallback
  const mapped = items
    .map((tab: any, index: number) => {
      const trigger = (tab?.trigger ?? '').trim() || `Aba ${index + 1}`
      return {
        value: (tab?.value ?? '').trim() || `${slugify(trigger, 'aba')}-${index}`,
        trigger,
        description: tab?.description ?? '',
      }
    })
    .filter((tab) => tab.value && tab.trigger)
  return mapped.length ? mapped : fallback
}

const mapImages = (items: any[], fallback = defaultProductKit.images) => {
  if (!Array.isArray(items) || !items.length) return fallback
  const mapped = items
    .map((item: any) => {
      const src = getMediaUrl(item?.image)
      if (!src) return null
      return {
        src,
        alt: item?.alt || 'Imagem do kit',
      }
    })
    .filter(Boolean) as { src: string; alt: string }[]
  return mapped.length ? mapped : fallback
}

const mapBookTestimonials = (items: any[], fallback = defaultTestimonials) => {
  if (!Array.isArray(items) || !items.length) return fallback
  const mapped = items
    .map((item: any) => {
      const quote = (item?.quote ?? '').trim()
      const name = (item?.name ?? '').trim()
      if (!quote || !name) return null
      return {
        quote,
        name,
        role: item?.role ?? '',
        numberOfStars: item?.numberOfStars ?? 5,
        avatar: {
          src: getMediaUrl(item?.avatar) || '/placeholder.svg',
          alt: item?.name ?? 'Leitor',
        },
      }
    })
    .filter(Boolean) as typeof fallback
  return mapped.length ? mapped : fallback
}

const mapButton = (cta: any, fallback: { label: string; href: string; newTab?: boolean }) => ({
  label: cta?.label ?? cta?.title ?? fallback.label,
  href: cta?.href ?? fallback.href,
  newTab: typeof cta?.newTab === 'boolean' ? cta.newTab : fallback.newTab ?? false,
})

export default async function LivrosPage() {
  const [livrosRaw, livrosPage] = await Promise.all([
    getLivros().catch((error) => {
      console.error('❌ Erro ao buscar livros:', error?.message || error)
      return []
    }),
    getPageBySlug('livros').catch((error) => {
      console.error('❌ Erro ao buscar página de livros no Payload:', error?.message || error)
      return null
    }),
  ])

  const livros = Array.isArray(livrosRaw) ? livrosRaw : []
  const blocks = livrosPage?.pageBuilder ?? []
  const findBlock = (type: string) => blocks.find((block: any) => block?.blockType === type) ?? null

  const heroBlock = findBlock('booksHero')
  const heroData = {
    title: heroBlock?.title ?? defaultHero.title,
    subtitle: heroBlock?.subtitle ?? defaultHero.subtitle,
    secondTitle: heroBlock?.secondTitle ?? defaultHero.secondTitle,
    description: heroBlock?.description ?? defaultHero.description,
    image: getMediaUrl(heroBlock?.image, defaultHero.image),
    ctaText: heroBlock?.ctaText ?? defaultHero.ctaText,
    ctaHref: heroBlock?.ctaHref ?? defaultHero.ctaHref,
    ctaNewTab: typeof heroBlock?.ctaNewTab === 'boolean' ? heroBlock.ctaNewTab : defaultHero.ctaNewTab,
  }

  const productKitBlock = findBlock('productKit')
  const productKit = {
    breadcrumbs: mapBreadcrumbs(productKitBlock?.breadcrumbs),
    heading: productKitBlock?.heading ?? defaultProductKit.heading,
    images: mapImages(productKitBlock?.images),
    price: productKitBlock?.price ?? defaultProductKit.price,
    rating: {
      stars: productKitBlock?.rating?.stars ?? defaultProductKit.rating.stars,
      reviewCount: productKitBlock?.rating?.reviewCount ?? defaultProductKit.rating.reviewCount,
    },
    description: productKitBlock?.description ?? defaultProductKit.description,
    cta: mapButton(productKitBlock?.cta, defaultProductKit.cta),
    tabs: mapTabs(productKitBlock?.tabs),
  }

  const catalogBlock = findBlock('booksCatalog')
  const catalog = {
    badgeText: catalogBlock?.badgeText ?? defaultCatalog.badgeText,
    title: catalogBlock?.title ?? defaultCatalog.title,
    description: catalogBlock?.description ?? defaultCatalog.description,
    useCollection:
      typeof catalogBlock?.useLivrosCollection === 'boolean'
        ? catalogBlock.useLivrosCollection
        : true,
  }

  const knowledgeBlock = findBlock('knowledgeBarrier')
  const knowledgeSection = {
    heading: knowledgeBlock?.heading ?? defaultKnowledge.heading,
    description: knowledgeBlock?.description ?? defaultKnowledge.description,
    button: mapButton(knowledgeBlock?.button, defaultKnowledge.button),
    firstImage: {
      src: getMediaUrl(knowledgeBlock?.firstImage, defaultKnowledge.firstImage.src),
      alt: knowledgeBlock?.firstImage?.alt ?? defaultKnowledge.firstImage.alt,
    },
    secondImage: knowledgeBlock?.secondImage
      ? {
          src: getMediaUrl(knowledgeBlock.secondImage, defaultKnowledge.secondImage.src),
          alt: knowledgeBlock?.secondImage?.alt ?? defaultKnowledge.secondImage.alt,
        }
      : defaultKnowledge.secondImage,
  }

  const testimonialsBlock = findBlock('booksTestimonials')
  const testimonialsSection = {
    badgeText: testimonialsBlock?.badgeText ?? 'DEPOIMENTOS',
    heading: testimonialsBlock?.heading ?? defaultTestimonials.heading,
    description: testimonialsBlock?.description ?? defaultTestimonials.description,
    testimonials: mapBookTestimonials(testimonialsBlock?.testimonials),
  }

  const finalCtaBlock = findBlock('booksFinalCta')
  const finalCtaSection = {
    heading: finalCtaBlock?.heading ?? defaultFinalCta.heading,
    description: finalCtaBlock?.description ?? defaultFinalCta.description,
    offerText: finalCtaBlock?.offerText ?? defaultFinalCta.offerText,
    price: finalCtaBlock?.price ?? defaultFinalCta.price,
    paymentInfo: finalCtaBlock?.paymentInfo ?? defaultFinalCta.paymentInfo,
    button: mapButton(finalCtaBlock?.button, defaultFinalCta.button),
    cardImage: finalCtaBlock?.cardImage
      ? {
          src: getMediaUrl(finalCtaBlock.cardImage, defaultFinalCta.cardImage.src),
          alt: finalCtaBlock?.cardImageAlt ?? finalCtaBlock?.cardImage?.alt ?? defaultFinalCta.cardImage.alt,
        }
      : defaultFinalCta.cardImage,
    image: finalCtaBlock?.image
      ? {
          src: getMediaUrl(finalCtaBlock.image, defaultFinalCta.image.src),
          alt: finalCtaBlock?.image?.alt ?? defaultFinalCta.image.alt,
        }
      : defaultFinalCta.image,
  }

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-zinc-950 text-white">
        <SiteHeader showInicio={true} />

        <HeroPages
          title={heroData.title}
          subtitle={heroData.subtitle}
          secondtitle={heroData.secondTitle}
          description={heroData.description}
          image={heroData.image}
          ctaText={heroData.ctaText}
          ctaHref={heroData.ctaHref}
        />

        <ProductKitDisplayClient
          breadcrumbs={productKit.breadcrumbs}
          heading={productKit.heading}
          images={productKit.images}
          price={productKit.price}
          rating={productKit.rating}
          description={<p>{productKit.description}</p>}
          ctaButton={{
            title: productKit.cta.label,
            href: productKit.cta.href,
            target: productKit.cta.newTab ? '_blank' : undefined,
          }}
          tabs={productKit.tabs}
        />

        <section className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              {catalog.badgeText && (
                <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                  <span className="text-sm font-medium">{catalog.badgeText}</span>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{catalog.title}</h2>
              <p className="text-zinc-300 max-w-3xl mx-auto">{catalog.description}</p>
            </div>

            {catalog.useCollection && livros.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {livros.map((livro: any) => (
                  <Link key={livro.id} href={`/livros/${livro.slug}`}>
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        {typeof livro.coverImage === 'object' && livro.coverImage?.url ? (
                          <Image
                            src={livro.coverImage.url}
                            alt={livro.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <span className="text-zinc-600 text-4xl">📚</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-yellow-400">{livro.title}</h3>
                        {livro.subtitle && (
                          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{livro.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-zinc-400">Nenhum livro encontrado. Cadastre itens na coleção "livros" no Payload.</p>
            )}
          </div>
        </section>

        <KnowledgeBarrierSection
          heading={knowledgeSection.heading}
          description={knowledgeSection.description}
          button={{
            title: knowledgeSection.button.label,
            href: knowledgeSection.button.href,
            newTab: knowledgeSection.button.newTab,
          }}
          firstImage={knowledgeSection.firstImage}
          secondImage={knowledgeSection.secondImage}
        />

        <TestimonialsLivros
          badgeText={testimonialsSection.badgeText}
          heading={testimonialsSection.heading}
          description={testimonialsSection.description}
          testimonials={testimonialsSection.testimonials}
        />

        <FinalCtaSection
          heading={finalCtaSection.heading}
          description={finalCtaSection.description}
          offerText={finalCtaSection.offerText}
          price={finalCtaSection.price}
          paymentInfo={finalCtaSection.paymentInfo}
          button={{
            label: finalCtaSection.button.label,
            href: finalCtaSection.button.href,
            newTab: finalCtaSection.button.newTab,
          }}
          cardImage={finalCtaSection.cardImage}
          image={finalCtaSection.image}
        />

        <Footer accent="yellow" />
        <WhatsAppButton source="Livros" />
      </div>
    </>
  )
}
