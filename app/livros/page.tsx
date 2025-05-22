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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="h-10 w-auto" />
          <nav className="hidden md:flex space-x-8">
            <Link href="#sobre" className="text-sm hover:text-yellow-400 transition-colors">
              Sobre
            </Link>
            <Link href="#formacoes" className="text-sm hover:text-yellow-400 transition-colors">
              Formações
            </Link>
            <Link href="#depoimentos" className="text-sm hover:text-yellow-400 transition-colors">
              Depoimentos
            </Link>
            <Link href="#contato" className="text-sm hover:text-yellow-400 transition-colors">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="cta-hover-subtle bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white font-medium text-sm rounded-full px-6"
            >
              <Link href="#contato">Contato</Link>
            </Button>
            <Button
              asChild
              className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-sm rounded-full px-6"
            >
              <Link href="#formacoes">Formações</Link>
            </Button>
            <MobileMenu
              links={[
                { href: "#sobre", label: "Sobre" },
                { href: "#formacoes", label: "Formações" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#contato", label: "Contato" },
              ]}
            />
          </div>
        </div>
      </header>

      {/* // Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bgsite.jpg"
            alt="Livros de Roberto Navarro"
            fill
            className="object-cover mt-24"
            style={{ objectPosition: "center" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/70 via-60% to-transparent"></div>
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-600/10 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium">Livros de Roberto Navarro</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Livros que Transformam
                </span>{" "}
                sua Vida Financeira e Espiritual
              </h1>
              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Descubra as obras de Roberto Navarro que já impactaram mais de 50 mil pessoas, trazendo prosperidade,
                equilíbrio e propósito.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
                >
                  <Link href="#catalogo">VER CATÁLOGO COMPLETO</Link>
                </Button>
              </div>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl -z-10"></div>
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="relative w-full h-[400px] aspect-[4/5]">
                  <Image
                    src="/images/segredos-da-mente-milionaria.webp"
                    alt="Segredos da Mente Milionária"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
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
      </section>

      {/* // Books Catalog */}
      <section id="catalogo" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">CATÁLOGO DE LIVROS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conheça as Obras que <span className="text-yellow-400">Transformam Vidas</span>
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
                    title: "Segredos da Mente Milionária",
                    description:
                      "Aprenda os princípios que diferenciam a mentalidade dos ricos e como aplicá-los para transformar sua relação com o dinheiro.",
                    image: "/images/segredos-da-mente-milionaria.webp",
                    badge: "Bestseller",
                    href: "/segredos-da-mente-milionaria",
                  },
                  {
                    title: "Crenças da Riqueza",
                    description:
                      "Descubra como identificar e superar crenças limitantes que bloqueiam sua prosperidade financeira e pessoal.",
                    image: "/images/crencas-da-riqueza.webp",
                    badge: "Novo",
                    href: "/crencas-da-riqueza",
                  },
                  {
                    title: "O Investidor Inteligente",
                    description:
                      "Um guia prático para investir com sabedoria, construir patrimônio e alcançar liberdade financeira.",
                    image: "/images/investidor-inteligente.webp",
                    href: "/investidor-inteligente",
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
                <Card className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/investidor-inteligente.webp"
                      alt="O Investidor Inteligente"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">O Investidor Inteligente</h3>
                    <p className="text-zinc-300 mb-4 line-clamp-3">
                      Um guia prático para investir com sabedoria, construir patrimônio e alcançar liberdade financeira.
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        asChild
                        className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-xl"
                      >
                        <Link href="/investidor-inteligente">
                          Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="mentalidade" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Segredos da Mente Milionária",
                    description:
                      "Aprenda os princípios que diferenciam a mentalidade dos ricos e como aplicá-los para transformar sua relação com o dinheiro.",
                    image: "/images/segredos-da-mente-milionaria.webp",
                    badge: "Bestseller",
                    href: "/segredos-da-mente-milionaria",
                  },
                  {
                    title: "Crenças da Riqueza",
                    description:
                      "Descubra como identificar e superar crenças limitantes que bloqueiam sua prosperidade financeira e pessoal.",
                    image: "/images/crencas-da-riqueza.webp",
                    badge: "Novo",
                    href: "/crencas-da-riqueza",
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
                    src="/images/segredos-da-mente-milionaria.webp"
                    alt="Segredos da Mente Milionária"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                  Segredos da Mente Milionária
                </span>
              </h2>
              <p className="text-lg text-zinc-300 mb-8 max-w-xl">
                Um divisor de águas para quem busca riqueza com propósito. Este livro revela como a mentalidade dos
                ricos funciona e como você pode aplicá-la na sua vida.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Identifique crenças limitantes sobre dinheiro",
                  "Adote os 17 arquivos de riqueza",
                  "Desenvolva uma mentalidade de prosperidade",
                  "Crie hábitos financeiros sustentáveis",
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
                  <Link href="/segredos-da-mente-milionaria">COMPRAR AGORA</Link>
                </Button>
                <Button
                  asChild
                  className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
                >
                  <Link href="/segredos-da-mente-milionaria">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que Nossos <span className="text-yellow-400">Leitores Dizem</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Conheça as personalidades que já foram impactadas pelas obras de Roberto Navarro.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alfredo Soares",
                role: "Autoridade em vendas e autor best-seller",
                image: "/images/alfredo-soares.webp",
              },
              {
                name: "Tiago Brunet",
                role: "Referência em treinamento de líderes e espiritualidade",
                image: "/images/tiago-brunet.webp",
              },
              {
                name: "Flávio Prado",
                role: "Jornalista esportivo que já cobriu 10 Copas do Mundo",
                image: "/images/flavio-prado.webp",
              },
              {
                name: "Pyong Lee",
                role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
                image: "/images/pyong-lee.webp",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder-0vud2.png"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* // E-book Offer */}
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
      </section>

      {/* // FAQ Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tire Suas <span className="text-yellow-400">Dúvidas</span>
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

      {/* // CTA Section */}
      <section className="py-20 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comece Sua Jornada com <span className="text-yellow-400">Conhecimento</span>
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl">
              Escolha sua próxima leitura e dê o primeiro passo para uma vida de prosperidade e propósito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-6 text-base"
              >
                <Link href="#catalogo">VER CATÁLOGO COMPLETO</Link>
              </Button>
              <WhatsAppButton
                message="Olá, quero saber mais sobre os livros de Roberto Navarro."
                className="cta-hover-subtle bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-white font-medium rounded-full px-8 py-6 text-base"
              >
                Falar com Consultor <ChevronRight className="h-4 w-4 ml-1" />
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

     <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
