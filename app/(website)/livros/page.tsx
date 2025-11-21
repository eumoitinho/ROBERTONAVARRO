import { getLivros } from '@/lib/payload/client'
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

export default async function LivrosPage() {
  const livros = await getLivros()

  // Dados do kit original
  const kitImages = [
    { src: '/images/SABEDORIA.png', alt: 'A Sabedoria do Dinheiro' },
    { src: '/images/MITOS.png', alt: 'Quebrando Mitos com o Dinheiro' },
    { src: '/images/ARTE.png', alt: 'A Arte de Enriquecer' },
    { src: '/images/COACHING.png', alt: 'Coaching Financeiro' },
  ]

  const testimonials = [
    {
      quote: 'Desperta para importância de se planejar financeiramente o quanto antes. Embora o autor se conduza mais como mentor, há muitas perguntas de Coaching Financeiro muito bem elaboradas que te fazem refletir sobre alguns pontos cegos no aspecto financeiro, bastante esclarecedor, escrito de modo, que parece que o autor é um amigo batendo um papo.',
      name: 'Juliano Gorgonio',
      role: 'Compra Verificada',
      numberOfStars: 5,
      avatar: { src: '/images/reviewers/juliano-gorgonio.png', alt: 'Juliano Gorgonio' },
    },
    {
      quote: 'Ótimo livro. Leitura super fácil e tudo faz muito sentido muito embora não seja um tema simples como parece considerando todos os problemas sociais do Brasil.',
      name: 'Marta Celestino',
      role: 'Compra Verificada',
      numberOfStars: 5,
      avatar: { src: '/images/reviewers/marta-celestino.png', alt: 'Marta Celestino' },
    },
    {
      quote: '"O que enriquece o ser humano, não é o dinheiro que ele consegue, mas o processo que ele segue para obter aquilo." Não tem como ler este livro e não se sentir mais rico.',
      name: 'Andrea Kress',
      role: 'Compra Verificada',
      numberOfStars: 5,
      avatar: { src: '/images/reviewers/andrea-kress.png', alt: 'Andrea Kress' },
    },
  ]

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-zinc-950 text-white">
        <SiteHeader showInicio={true} />

        {/* Hero Section Original */}
        <HeroPages
          title="Desvende os segredos da liberdade financeira com os ensinamentos de Roberto Navarro"
          subtitle="Kit Exclusivo Roberto Navarro"
          secondtitle=""
          description="O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil traz para você um kit exclusivo de livros que serão seu guia definitivo para a tão sonhada liberdade financeira."
          image="/images/HERO_EDUCADOR.png"
          ctaText="OFERTA EXCLUSIVA: ADQUIRA SEU KIT!"
          ctaHref="https://sun.eduzz.com/956345"
        />

        {/* Product Kit Display */}
        <ProductKitDisplayClient
          breadcrumbs={[
            { url: '/', title: 'Início' },
            { url: '/livros', title: 'Livros' },
          ]}
          heading="Kit Exclusivo Roberto Navarro"
          images={kitImages}
          price="R$ 200,00"
          rating={{ stars: 5, reviewCount: 3 }}
          description={
            <p>
              Criador do conceito de Coaching Financeiro no país, Navarro impactou mais de 1 milhão de pessoas, desenvolvendo metodologias que unem estratégias práticas de finanças, inteligência emocional e princípios bíblicos. Agora, você terá a oportunidade de mergulhar nos pilares dessa transformação através de seus quatro livros.
            </p>
          }
          ctaButton={{
            title: 'OFERTA EXCLUSIVA: ADQUIRA SEU KIT!',
            href: 'https://sun.eduzz.com/956345',
            target: '_blank',
          }}
          tabs={[
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
          ]}
        />

        {/* Catálogo de Livros */}
        <section className="py-20 relative overflow-hidden bg-zinc-900">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                <span className="text-sm font-medium">CONHEÇA OS LIVROS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Um kit que vai transformar sua vida
              </h2>
              <p className="text-zinc-300 max-w-3xl mx-auto">
                As obras de Roberto Navarro combinam inteligência financeira, emocional e espiritual para guiá-lo rumo à prosperidade.
              </p>
            </div>

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
          </div>
        </section>

        {/* Knowledge Barrier Section */}
        <KnowledgeBarrierSection
          heading="A falta de conhecimento é a maior barreira para a prosperidade"
          description="Pense no valor de ter à sua disposição o conhecimento de um dos maiores especialistas em finanças do Brasil. Roberto Navarro não é apenas um autor; ele é um mentor que já transformou a vida de centenas de milhares de pessoas. Sua metodologia, testada e comprovada, vai além dos números, tocando na essência da sua relação com o dinheiro."
          button={{ title: 'GARANTA SEU KIT!', href: 'https://sun.eduzz.com/956345' }}
          firstImage={{ src: '/images/livro2.png', alt: 'Quebrando Mitos com o Dinheiro' }}
          secondImage={{ src: '/images/LIVRO_MOCKUP.png', alt: 'Mockup do Kit de Livros' }}
        />

        {/* Testimonials */}
        <TestimonialsLivros
          heading="O que nossos leitores dizem"
          description="Veja o que os leitores estão dizendo sobre os livros de Roberto Navarro."
          testimonials={testimonials}
        />

        {/* Final CTA */}
        <FinalCtaSection
          heading="Tenha as ferramentas para construir a vida que você merece"
          description="O conhecimento é o único investimento que ninguém pode tirar de você. Invista em si mesmo e colha os frutos de uma vida próspera e abundante."
          offerText="Oferta Exclusiva"
          price="10x de R$ 20,00"
          paymentInfo="ou R$ 200,00 à vista"
          button={{ title: 'QUERO MEU KIT E MINHA LIBERDADE FINANCEIRA!', href: 'https://sun.eduzz.com/956345' }}
          image={{ src: '/images/livro3.png', alt: 'Kit de Livros Roberto Navarro' }}
        />

        <Footer accent="yellow" />
        <WhatsAppButton source="Livros" />
      </div>
    </>
  )
}
