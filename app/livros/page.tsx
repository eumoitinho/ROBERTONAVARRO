"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowRight, ChevronRight } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"
import HeroPages from "@/components/hero-pages"

export default function LivrosPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Add keyframe animation for hover effects (same as HomePage)
    const style = document.createElement("style")
    style.innerHTML = `
      .cta-hover {
        transition: all 0.3s ease;
      }
      .cta-hover:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.3);
      }
      .cta-hover-subtle {
        transition: all 0.3s ease;
      }
      .cta-hover-subtle:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 15px -5px rgba(245, 158, 11, 0.2);
      }
    `
    document.head.appendChild(style)
  }, [])
const navigationItems = [
  { title: "Sobre", href: "#sobre" },
  { title: "Formações", href: "#formacoes" },
  { title: "Depoimentos", href: "#depoimentos" },
  { title: "Contato", href: "#contato" },
];
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
     <SiteHeader
  navigationItems={navigationItems}
  showInicio={true}
/>
     {/* Hero Section */}
      <section className="relative h-[900px] pt-32 pb-20 overflow-hidden flex flex-col justify-between">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HERO_EDUCADOR.png"
          alt="LIVROS QUE TRANSFORMAM"
          fill
          className="object-cover w-full h-full"
          style={{
            objectPosition: "center",
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/80 via-60% to-transparent md:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col h-full">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6 self-start mt-2 transition-all duration-1000`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
          <span className="text-xs md:text-sm font-medium">Livros de Roberto Navarro</span>
        </div>

        {/* Central content */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <div className={`transition-all duration-1000`}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-2 leading-tight">
              LIVROS{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                QUE TRANSFORMAM
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-4 text-zinc-300">
              SUA VIDA FINANCEIRA E ESPIRITUAL
            </p>
            <p className="text-base md:text-xl text-zinc-300 mb-6 max-w-xl whitespace-pre-line">
              Descubra as obras de Roberto Navarro que já impactaram mais de 50 mil pessoas, trazendo prosperidade,
              equilíbrio e propósito.
            </p>
          </div>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 md:gap-4 mb-0 md:mb-0 transition-all duration-1000`}
            style={{ transitionDelay: "400ms" }}
          >
            <Button
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
              asChild
            >
              <Link href="#catalogo">VER CATÁLOGO COMPLETO</Link>
            </Button>
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
            >
              <Link href="#sobre">
                Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
       
        <div className="container px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "+50 mil", label: "Vidas Impactadas" },
              { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "3", label: "Bestsellers" },
              { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "10+", label: "Países Alcançados" },
              { icon: <Star className="h-6 w-6 text-yellow-400" />, value: "130 mil", label: "Seguidores" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 transition-all duration-1000 hover:border-yellow-500/50 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-800 rounded-full p-3">{stat.icon}</div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* // Books Catalog */}
      <section id="catalogo" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CATÁLOGO DE LIVROS</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              CONHEÇA AS OBRAS QUE  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">TRANSFORMAM VIDAS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              As obras de Roberto Navarro combinam inteligência financeira, emocional e espiritual para guiá-lo rumo à
              prosperidade.
            </p>
          </div>
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-full p-1">
              <TabsTrigger
                value="todos"
                className="text-sm font-medium text-zinc-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-black rounded-full"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="financas"
                className="text-sm font-medium text-zinc-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-black rounded-full"
              >
                Finanças
              </TabsTrigger>
              <TabsTrigger
                value="mentalidade"
                className="text-sm font-medium text-zinc-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-black rounded-full"
              >
                Mentalidade
              </TabsTrigger>
            </TabsList>
            <TabsContent value="todos" className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: "A Sabedoria do Dinheiro",
        description:
          "Transforme sua mentalidade e atraia a prosperidade para sua vida. Descubra os 5 passos essenciais para alinhar sua visão financeira ao seu propósito, gastando com consciência, gerando renda passiva e mantendo a abundância no centro da sua jornada.",
        image: "/images/a-sabedoria-do-dinheiro.webp",
        badge: "Mais vendido",
        href: "/a-sabedoria-do-dinheiro",
      },
      {
        title: "Quebrando Mitos com o Dinheiro",
        description:
          "Liberte-se das crenças que limitam sua prosperidade. Identifique mitos que sabotam sua vida financeira e aprenda a substituí-los por atitudes conscientes e focadas em resultados.",
        image: "/images/quebrando-mitos-com-o-dinheiro.webp",
        badge: "Transformador",
        href: "/quebrando-mitos-com-o-dinheiro",
      },
      {
        title: "A Arte de Enriquecer",
        description:
          "Riqueza é um caminho, não um privilégio. Descubra a metodologia prática para dobrar sua renda, administrar ganhos e aproveitar como os verdadeiros ricos fazem.",
        image: "/images/a-arte-de-enriquecer.webp",
        badge: "Prático",
        href: "/a-arte-de-enriquecer",
      },
      {
        title: "Coaching Financeiro",
        description:
          "Controle emocional, clareza financeira e ação: a tríade para o sucesso. Estratégias, histórias reais e exercícios práticos para transformar sua relação com o dinheiro.",
        image: "/images/coaching-financeiro.webp",
        badge: "Equilíbrio",
        href: "/coaching-financeiro",
      },
    ].map((book, index) => (
      <Card
        key={index}
        className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image src={book.image} alt={book.title} fill className="object-cover" />
          {book.badge && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold text-sm rounded-full py-1 px-3">
              {book.badge}
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-yellow-400">{book.title}</h3>
          <p className="text-zinc-300 mb-4 line-clamp-3">{book.description}</p>
          <div className="flex items-center justify-between">
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-xl"
            >
              <Link href={book.href}>
                Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>
<TabsContent value="financas" className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: "A Sabedoria do Dinheiro",
        description:
          "Transforme sua mentalidade e atraia a prosperidade para sua vida. Descubra os 5 passos essenciais para alinhar sua visão financeira ao seu propósito.",
        image: "/images/a-sabedoria-do-dinheiro.webp",
        badge: "Mais vendido",
        href: "/a-sabedoria-do-dinheiro",
      },
      {
        title: "A Arte de Enriquecer",
        description:
          "Riqueza é um caminho, não um privilégio. Descubra a metodologia prática para dobrar sua renda, administrar ganhos e aproveitar como os verdadeiros ricos fazem.",
        image: "/images/a-arte-de-enriquecer.webp",
        badge: "Prático",
        href: "/a-arte-de-enriquecer",
      },
      {
        title: "Coaching Financeiro",
        description:
          "Controle emocional, clareza financeira e ação: a tríade para o sucesso. Estratégias, histórias reais e exercícios práticos para transformar sua relação com o dinheiro.",
        image: "/images/coaching-financeiro.webp",
        badge: "Equilíbrio",
        href: "/coaching-financeiro",
      },
    ].map((book, index) => (
      <Card
        key={index}
        className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image src={book.image} alt={book.title} fill className="object-cover" />
          {book.badge && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold text-sm rounded-full py-1 px-3">
              {book.badge}
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-yellow-400">{book.title}</h3>
          <p className="text-zinc-300 mb-4 line-clamp-3">{book.description}</p>
          <div className="flex items-center justify-between">
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-xl"
            >
              <Link href={book.href}>
                Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>
<TabsContent value="mentalidade" className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: "Quebrando Mitos com o Dinheiro",
        description:
          "Liberte-se das crenças que limitam sua prosperidade. Identifique mitos que sabotam sua vida financeira e aprenda a substituí-los por atitudes conscientes e focadas em resultados.",
        image: "/images/quebrando-mitos-com-o-dinheiro.webp",
        badge: "Transformador",
        href: "/quebrando-mitos-com-o-dinheiro",
      },
      {
        title: "A Sabedoria do Dinheiro",
        description:
          "Transforme sua mentalidade e atraia a prosperidade para sua vida. Descubra os 5 passos essenciais para alinhar sua visão financeira ao seu propósito.",
        image: "/images/a-sabedoria-do-dinheiro.webp",
        badge: "Mais vendido",
        href: "/a-sabedoria-do-dinheiro",
      },
    ].map((book, index) => (
      <Card
        key={index}
        className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image src={book.image} alt={book.title} fill className="object-cover" />
          {book.badge && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold text-sm rounded-full py-1 px-3">
              {book.badge}
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-yellow-400">{book.title}</h3>
          <p className="text-zinc-300 mb-4 line-clamp-3">{book.description}</p>
          <div className="flex items-center justify-between">
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-xl"
            >
              <Link href={book.href}>
                Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>
          </Tabs>
        </div>
      </section>

          
      {/* // Featured Book */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="relative w-full h-[450px] transform transition-all duration-500 hover:scale-105">
                  <Image
                    src="/images/a-sabedoria-do-dinheiro.webp"
                    alt="A Sabedoria do Dinheiro"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span className="text-sm font-medium text-yellow-300">DESTAQUE DO MÊS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  A SABEDORIA DO DINHEIRO
                </span>
              </h2>
              <p className="text-lg text-zinc-300 mb-4 max-w-xl">
                Transforme sua mentalidade e atraia a prosperidade para sua vida. Neste livro, Roberto Navarro revela os 5 passos essenciais para usar a ciência da riqueza a seu favor. Aprenda a gastar com propósito, gerar renda passiva, proteger o que conquistou e ampliar suas oportunidades. Mais do que técnicas, esse é um guia para alinhar sua visão financeira com o seu propósito de vida — mantendo a espiritualidade e a abundância no centro da sua jornada.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Ideal para quem deseja sair das dívidas e criar uma vida com mais controle, propósito e abundância.",
                  "Editora: Gente Editora",
                  "Ano de lançamento: 2020",
                  "Dimensões: 16x23 cm | Páginas: 224 | Idioma: Português",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-zinc-300">
                    <div className="mr-2 h-3 w-3 rounded-full bg-yellow-400"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <a
                    href="https://www.amazon.com.br/Sabedoria-Dinheiro-conquistar-espiritualidade-consciência/dp/8545203942/ref=sr_1_1?crid=1L5OOI4XUUILC&keywords=roberto+navarro"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    COMPRAR NA AMAZON
                  </a>
                </Button>
                <Button
                  asChild
                  className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="/a-sabedoria-do-dinheiro">
                    Saiba mais <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      {/* // Testimonials */}
<section id="depoimentos" className="py-20 relative">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
        <span className="text-sm font-medium">DEPOIMENTOS</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        O QUE NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">LEITORES DIZEM</span>
      </h2>
      <p className="text-zinc-300 max-w-3xl mx-auto">
        Veja o que os leitores estão dizendo sobre *A Sabedoria do Dinheiro* de Roberto Navarro.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          name: "Fernanda Costa",
          role: "Leitora",
          image: "/images/fernanda-costa.webp",
          quote: "Esse livro me abriu os olhos pra uma relação mais saudável com dinheiro. Roberto Navarro é genial!",
        },
        {
          name: "Lucas Almeida",
          role: "Leitor",
          image: "/images/lucas-almeida.webp",
          quote: "Uma leitura que mistura prosperidade e espiritualidade de um jeito único. Mudou minha visão completamente!",
        },
        {
          name: "Patrícia Mendes",
          role: "Leitora",
          image: "/images/patricia-mendes.webp",
          quote: "Nunca pensei que um livro sobre finanças pudesse ser tão inspirador. Recomendo pra todo mundo!",
        },
        {
          name: "Rafael Santos",
          role: "Leitor",
          image: "/images/rafael-santos.webp",
          quote: "É mais que um livro sobre dinheiro, é um guia pra vida. Leitura obrigatória pra quem quer crescer!",
        },
      ].map((testimonial, index) => (
        <Card
          key={index}
          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
        >
          <div className="flex items-center gap-4 mb-6">
            
            <div>
              <h3 className="font-bold">{testimonial.name}</h3>
              <p className="text-sm text-zinc-400">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-zinc-300 text-sm">{testimonial.quote}</p>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* // E-book Offer
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-sm font-medium text-green-300">E-BOOK GRÁTIS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Baixe o E-book:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  7 Passos para a Liberdade Financeira
                </span>
              </h2>
              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Inicie sua transformação financeira com este guia prático e gratuito, criado por Roberto Navarro.
              </p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Seu melhor e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <Button className="cta-hover bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-full px-8 py-6 text-base w-full">
                  Baixar E-book Grátis
                </Button>
                <p className="text-xs text-zinc-400 text-center">
                  Ao se inscrever, você concorda com nossa política de privacidade e termos de uso.
                </p>
              </form>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="relative w-full h-[400px] transform transition-all duration-500 hover:scale-105">
                  <Image
                    src="/images/ebook-7-passos.webp"
                    alt="E-book Gratuito"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* // FAQ Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              TIRE SUAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">DÚVIDAS</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Tudo o que você precisa saber sobre os livros de Roberto Navarro.
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                question: "Para quem são esses livros?",
                answer:
                  "Para qualquer pessoa que deseja melhorar sua relação com o dinheiro, desde iniciantes até empreendedores experientes.",
              },
              {
                question: "O que vou aprender com essas obras?",
                answer:
                  "Você aprenderá a desenvolver uma mentalidade rica, superar crenças limitantes e investir com inteligência para construir riqueza.",
              },
              {
                question: "Os livros estão disponíveis em formato digital?",
                answer: "Sim, todos os títulos estão disponíveis em e-book nas principais plataformas digitais.",
              },
              {
                question: "Como posso adquirir os livros?",
                answer:
                  "Os livros estão disponíveis nas principais livrarias e para compra direta pelo nosso site. Entre em contato para mais detalhes.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold mb-2 text-yellow-400">{faq.question}</h3>
                  <p className="text-zinc-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

     <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
