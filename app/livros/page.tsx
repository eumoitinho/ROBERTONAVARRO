"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import { TestimonialsLivros } from "@/components/testimonials-livros"
import { ProductKitDisplay } from "@/components/product-kit-display"
import { KnowledgeBarrierSection } from "@/components/knowledge-barrier-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import ScrollAnimation from "@/components/scroll-animation"

const kitPurchaseLink = "https://sun.eduzz.com/956345"

const books = [
  {
    title: "A Sabedoria do Dinheiro",
    description:
      "Transforme sua mentalidade e atraia a prosperidade. Descubra os 5 passos essenciais para alinhar sua visão financeira ao seu propósito, mantendo a espiritualidade e a abundância no centro de sua jornada.",
    image: "/images/SABEDORIA.png",
    badge: "Essencial",
    href: kitPurchaseLink,
  },
  {
    title: "Quebrando Mitos com o Dinheiro",
    description:
      "Liberte-se das crenças que limitam sua prosperidade. Identifique os mitos que sabotam sua vida financeira e substitua-os por atitudes conscientes e focadas em resultados.",
    image: "/images/MITOS.png",
    badge: "Transformador",
    href: kitPurchaseLink,
  },
  {
    title: "A Arte de Enriquecer",
    description:
      "Riqueza é um caminho, não um privilégio. Descubra a metodologia prática para dobrar sua renda, administrar seus ganhos e aproveitar a vida como os verdadeiros ricos fazem.",
    image: "/images/ARTE.png",
    badge: "Prático",
    href: kitPurchaseLink,
  },
  {
    title: "Coaching Financeiro",
    description:
      "Controle emocional, clareza financeira e ação: a tríade para o sucesso. Estratégias, histórias reais e exercícios práticos para transformar sua relação com o dinheiro.",
    image: "/images/COACHING.png",
    badge: "Equilíbrio",
    href: kitPurchaseLink,
  },
]

const testimonialsData = [
  {
    quote:
      "Desperta para importância de se planejar financeiramente o quanto antes. Embora o autor se conduza mais como mentor, há muitas perguntas de Coaching Financeiro muito bem elaboradas que te fazem refletir sobre alguns pontos cegos no aspecto financeiro, bastante esclarecedor, escrito de modo, que parece que o autor é um amigo batendo um papo.",
    avatar: {
      src: "/images/reviewers/juliano-gorgonio.png",
      alt: "Juliano Gorgonio",
    },
    name: "Juliano Gorgonio",
    role: "Compra Verificada",
    numberOfStars: 5,
  },
  {
    quote:
      "Ótimo livro. Leitura super fácil e tudo faz muito sentido muito embora não seja um tema simples como parece considerando todos os problemas sociais do Brasil.",
    avatar: {
      src: "/images/reviewers/marta-celestino.png",
      alt: "Marta Celestino",
    },
    name: "Marta Celestino",
    role: "Compra Verificada",
    numberOfStars: 5,
  },
  {
    quote:
      '"O que enriquece o ser humano, não é o dinheiro que ele consegue, mas o processo que ele segue para obter aquilo." Não tem como ler este livro e não se sentir mais rico.',
    avatar: {
      src: "/images/reviewers/andrea-kress.png",
      alt: "Andrea Kress",
    },
    name: "Andrea Kress",
    role: "Compra Verificada",
    numberOfStars: 5,
  },
]

const productKitData = {
  breadcrumbs: [
    { url: "/", title: "Início" },
    { url: "/livros", title: "Livros" },
  ],
  heading: "Kit Exclusivo Roberto Navarro",
  images: [
    { src: "/images/SABEDORIA.png", alt: "A Sabedoria do Dinheiro" },
    { src: "/images/MITOS.png", alt: "Quebrando Mitos com o Dinheiro" },
    { src: "/images/ARTE.png", alt: "A Arte de Enriquecer" },
    { src: "/images/COACHING.png", alt: "Coaching Financeiro" },
  ],
  price: "R$ 200,00",
  rating: {
    stars: 5,
    reviewCount: 3,
  },
  description: (
    <p>
      Criador do conceito de Coaching Financeiro no país, Navarro impactou mais de 1 milhão de pessoas, desenvolvendo
      metodologias que unem estratégias práticas de finanças, inteligência emocional e princípios bíblicos. Agora, você
      terá a oportunidade de mergulhar nos pilares dessa transformação através de seus quatro livros.
    </p>
  ),
  ctaButton: {
    title: "OFERTA EXCLUSIVA: ADQUIRA SEU KIT!",
    onClick: () => window.open(kitPurchaseLink, "_blank"),
  },
  tabs: [
    {
      value: "details",
      trigger: "Descrição",
      description:
        "Mais do que um conjunto de livros, este kit é um investimento em você, na sua família e no seu futuro. Prepare-se para quebrar paradigmas, desmistificar o dinheiro e construir uma nova realidade financeira. A sua jornada para a abundância começa agora!",
    },
    {
      value: "content",
      trigger: "Conteúdo do Kit",
      description:
        "Este kit inclui 4 livros essenciais de Roberto Navarro: A Sabedoria do Dinheiro, Quebrando Mitos com o Dinheiro, A Arte de Enriquecer e Coaching Financeiro.",
    },
  ],
}

const knowledgeBarrierData = {
  heading: (
    <>
      A falta de conhecimento é a maior barreira para a{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">prosperidade</span>
    </>
  ),
  description:
    "Pense no valor de ter à sua disposição o conhecimento de um dos maiores especialistas em finanças do Brasil. Roberto Navarro não é apenas um autor; ele é um mentor que já transformou a vida de centenas de milhares de pessoas. Sua metodologia, testada e comprovada, vai além dos números, tocando na essência da sua relação com o dinheiro.",
  button: {
    title: "GARANTA SEU KIT!",
    href: kitPurchaseLink,
  },
  firstImage: {
    src: "/images/livro2.png",
    alt: "Livro Quebrando Mitos com o Dinheiro",
  },
  secondImage: {
    src: "/images/LIVRO_MOCKUP.png",
    alt: "Mockup do Kit de Livros",
  },
}

const finalCtaData = {
  heading: "Tenha as ferramentas para construir a vida que você merece",
  description:
    "O conhecimento é o único investimento que ninguém pode tirar de você. Invista em si mesmo e colha os frutos de uma vida próspera e abundante.",
  offerText: "Oferta Exclusiva",
  price: "10x de R$ 20,00",
  paymentInfo: "ou R$ 200,00 à vista",
  button: {
    title: "QUERO MEU KIT E MINHA LIBERDADE FINANCEIRA!",
    href: kitPurchaseLink,
  },
  image: {
    src: "/images/livro3.png",
    alt: "Kit de Livros Roberto Navarro",
  },
}

export default function LivrosPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader showInicio={true} />

      {/* [Bloco 1] Hero Section */}
      <section className="relative h-[700px] pt-32 pb-20 overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/HERO_EDUCADOR.png"
            alt="Roberto Navarro"
            fill
            className="object-cover w-full h-full opacity-20"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-10% via-black/80 via-50% to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full">
          <ScrollAnimation animation="fadeInUp" className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6 self-start">
              <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
              <span className="text-xs md:text-sm font-medium">Kit Exclusivo Roberto Navarro</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Desvende os segredos da{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                liberdade financeira
              </span>{" "}
              com os ensinamentos de Roberto Navarro
            </h1>
            <p className="text-base md:text-xl text-zinc-300 mb-8 max-w-2xl">
              O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil traz para você
              um kit exclusivo de livros que serão seu guia definitivo para a tão sonhada liberdade financeira.
            </p>

            <Button
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
              asChild
            >
              <a href={kitPurchaseLink} target="_blank" rel="noopener noreferrer">
                OFERTA EXCLUSIVA: ADQUIRA SEU KIT!
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* [Bloco 2] Product Display */}
      <ScrollAnimation animation="fadeIn">
        <ProductKitDisplay {...productKitData} />
      </ScrollAnimation>

      {/* [Bloco 3-6] Books Catalog */}
      <section id="catalogo" className="py-20 relative bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CONHEÇA OS LIVROS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Um kit que vai{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                transformar sua vida
              </span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              As obras de Roberto Navarro combinam inteligência financeira, emocional e espiritual para guiá-lo rumo à
              prosperidade.
            </p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" animationDelay={`${index * 150}ms`}>
                <Card className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 h-full flex flex-col">
                  <div className="relative aspect-[3/4] w-full">
                    <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    {book.badge && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold text-sm rounded-full py-1 px-3">
                        {book.badge}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{book.title}</h3>
                    <p className="text-zinc-300 mb-4 line-clamp-4 flex-grow">{book.description}</p>
                    <Button
                      asChild
                      className="w-full mt-auto bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl"
                    >
                      <a href={book.href} target="_blank" rel="noopener noreferrer">
                        Adquirir no Kit <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* [Bloco 7] A Falta de Conhecimento */}
      <ScrollAnimation animation="fadeIn">
        <KnowledgeBarrierSection {...knowledgeBarrierData} />
      </ScrollAnimation>


      {/* New Testimonials Section */}
      <ScrollAnimation animation="fadeIn">
        <TestimonialsLivros
          heading="O que nossos leitores dizem"
          description="Veja o que os leitores estão dizendo sobre os livros de Roberto Navarro."
          testimonials={testimonialsData}
        />
      </ScrollAnimation>



      {/* [Bloco 8] Pricing/Final CTA Section */}
      <ScrollAnimation animation="fadeInUp">
        <FinalCtaSection {...finalCtaData} />
      </ScrollAnimation>

      <Footer />
      <WhatsAppButton source="Kit Livros" className="custom-class" />
    </div>
  )
}
