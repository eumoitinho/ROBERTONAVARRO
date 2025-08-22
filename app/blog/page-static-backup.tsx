"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar, Tag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WhatsAppButton from "@/components/whatsapp-button";
import Footer from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { ptBlogPosts, ptCategories, BlogPost } from "@/lib/blog-data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtrar posts por categoria e termo de busca
  const filteredPosts: BlogPost[] = ptBlogPosts.filter((post: BlogPost) => {
    const matchesCategory = selectedCategory === "Todas" || post.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Calcular tempo de leitura estimado
  const getReadingTime = (content: string) => {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / 200); // 200 palavras por minuto
  };

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Empreendedor Inteligente", href: "/empreendedor-inteligente" },
    { title: "Blog", href: "/blog", isActive: true },
    { title: "Newsletter", href: "#newsletter", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      {/* Blog Hero */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-3 px-6 mb-6">
              <Tag size={18} />
              <span className="text-sm font-medium">BLOG</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              INSIGHTS PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">TRANSFORMAR SUA MENTE E NEGÓCIOS</span>
            </h1>
            <p className="text-zinc-300 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed">
              Explore artigos que vão ajudar você a superar crenças limitantes, desenvolver inteligência emocional e transformar sua relação com o dinheiro.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 bg-zinc-900/50 border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:border-yellow-400 focus:ring-yellow-400/20 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {ptCategories.map((category: string) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg transform scale-105"
                    : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/50 hover:border-yellow-400/50 hover:text-yellow-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Counter */}
          <div className="text-center mb-8">
            <p className="text-zinc-400">
              {filteredPosts.length === 0 
                ? "Nenhum artigo encontrado" 
                : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}`
              }
            </p>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: BlogPost) => (
                <article
                  key={post.id}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-semibold">
                        <Tag size={12} />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-zinc-300 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{getReadingTime(post.content)} min</span>
                      </div>
                    </div>
                    
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Leia Mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-300 mb-2">Nenhum artigo encontrado</h3>
              <p className="text-zinc-400 mb-6">
                Tente ajustar sua busca ou escolher uma categoria diferente.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todas");
                }}
                variant="outline"
                className="border-zinc-600 hover:border-yellow-400 hover:bg-yellow-400/10 text-zinc-300 hover:text-yellow-400"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Article Section */}
      {filteredPosts.length > 0 && selectedCategory === "Todas" && searchTerm === "" && (
        <section className="py-20 bg-zinc-900/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ARTIGO EM DESTAQUE</span>
              </h2>
              <p className="text-zinc-300 max-w-2xl mx-auto">
                Nosso artigo mais popular sobre transformação pessoal e profissional.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 rounded-3xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="relative">
                    <Image
                      src={ptBlogPosts[0].image}
                      alt={ptBlogPosts[0].title}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full py-2 px-4 mb-4 w-fit">
                      <Tag size={14} />
                      <span className="text-sm font-medium text-yellow-400">{ptBlogPosts[0].category}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      {ptBlogPosts[0].title}
                    </h3>
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                      {ptBlogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
                      <span>{ptBlogPosts[0].date}</span>
                      <span>•</span>
                      <span>{ptBlogPosts[0].author}</span>
                      <span>•</span>
                      <span>{getReadingTime(ptBlogPosts[0].content)} min de leitura</span>
                    </div>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 w-fit"
                    >
                      <Link href={`/blog/${ptBlogPosts[0].slug}`}>
                        Leia o Artigo Completo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              RECEBA NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">MELHORES INSIGHTS</span>
            </h2>
            <p className="text-zinc-300 mb-8 text-lg leading-relaxed">
              Cadastre-se para receber semanalmente artigos exclusivos sobre empreendedorismo, mentalidade e crescimento pessoal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 bg-zinc-900/50 border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:border-yellow-400 focus:ring-yellow-400/20"
              />
              <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl px-8">
                Inscrever-se
              </Button>
            </div>
            <p className="text-xs text-zinc-400 mt-4">
              Sem spam. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-24 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            PRONTO PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">TRANSFORMAR SEU NEGÓCIO?</span>
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto mb-12 text-xl leading-relaxed">
            Junte-se ao programa Empreendedor Inteligente e aprenda as estratégias dos maiores empresários para escalar resultados com inteligência e liberdade.
          </p>
          <Button
            asChild
            className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-12 py-6 text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <Link href="/empreendedor-inteligente#inscricao">
              GARANTA SUA VAGA AGORA! <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section> */}

      <Footer />
      <WhatsAppButton source="Blog" className="custom-class" />
    </div>
  );
}
