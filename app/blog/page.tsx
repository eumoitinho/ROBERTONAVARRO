
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/whatsapp-button";
import Footer from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { ptBlogPosts, ptCategories, BlogPost } from "@/lib/blog-data"; // Adjust path to your data file

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const filteredPosts: BlogPost[] = selectedCategory === "Todas"
    ? ptBlogPosts
    : ptBlogPosts.filter((post: BlogPost) => post.category === selectedCategory);

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Empreendedor Inteligente", href: "/empreendedor-inteligente" },
    { title: "Blog", href: "/blog", isActive: true },
    { title: "Inscrição", href: "/empreendedor-inteligente#inscricao", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <SiteHeader
        navigationItems={navigationItems}
        showInicio={true}
      />

      {/* Blog Hero */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
              <span className="text-sm font-medium">BLOG</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              INSIGHTS PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">TRANSFORMAR SUA MENTE E NEGÓCIOS</span>
            </h1>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Explore artigos que vão ajudar você a superar crenças limitantes, desenvolver inteligência emocional e transformar sua relação com o dinheiro.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ptCategories.map((category: string) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black"
                    : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPost) => (
              <div
                key={post.id}
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 cta-hover-subtle hover:border-yellow-400 transition-all duration-300"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="rounded-lg mb-4 object-cover"
                />
                <h2 className="text-xl font-bold mb-2 text-yellow-400">{post.title}</h2>
                <p className="text-zinc-300 mb-4">{post.excerpt}</p>
                <div className="text-sm text-zinc-400 mb-4">
                  <span>{post.date}</span> | <span>{post.author}</span> | <span>{post.category}</span>
                </div>
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-6 py-2"
                >
                  <Link href={`/blog/${post.slug}`}>Leia Mais</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            PRONTO PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">TRANSFORMAR SEU NEGÓCIO?</span>
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto mb-8">
            Junte-se ao programa Empreendedor Inteligente e aprenda as estratégias dos maiores empresários para escalar resultados com inteligência e liberdade.
          </p>
          <Button
            asChild
            className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-base"
          >
            <Link href="/empreendedor-inteligente#inscricao">
              GARANTA SUA VAGA AGORA! <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Blog" className="custom-class" />
    </div>
  )
};
