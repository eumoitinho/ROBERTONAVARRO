"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/whatsapp-button";
import Footer from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { ptBlogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = ptBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
    return null; // Ensure function returns after notFound
  }

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Empreendedor Inteligente", href: "/empreendedor-inteligente" },
    { title: "Blog", href: "/blog", isActive: true },
    { title: "Inscrição", href: "/empreendedor-inteligente#inscricao", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Head>
        <title>{post.title} | Blog - Empreendedor Inteligente</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category.toLowerCase()}, empreendedorismo, inteligência emocional, finanças, coragem`} />
        <meta name="author" content={post.author} />
      </Head>

      {/* Header */}
      <SiteHeader navigationItems={navigationItems} showInicio={true} />

      {/* Blog Post Content */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-1 px-3 mb-4 text-sm font-medium text-zinc-300">
                {post.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-yellow-400 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.image}
                alt={`Imagem ilustrativa para o artigo ${post.title}`}
                width={896}
                height={448}
                className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <article
                  className="prose prose-zinc prose-invert max-w-none prose-lg md:prose-xl prose-headings:font-bold prose-headings:text-yellow-400 prose-a:text-yellow-400 prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:underline prose-ul:list-disc prose-ul:pl-6 prose-p:leading-relaxed prose-p:mb-6 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3"
                  style={{ minHeight: 400 }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
              <div className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-24 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-yellow-400">Sobre o Artigo</h3>
                  <p className="text-zinc-300 text-sm mb-4">{post.excerpt}</p>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full py-2 transition-all duration-300"
                  >
                    <Link href="/blog">Explorar Mais Artigos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            PRONTO PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">TRANSFORMAR SEU NEGÓCIO?</span>
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto mb-8 text-lg">
            Junte-se ao programa Empreendedor Inteligente e aprenda as estratégias dos maiores empresários para escalar resultados com inteligência e liberdade.
          </p>
          <Button
            asChild
            className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-full px-8 py-4 text-lg transition-all duration-300"
          >
            <Link href="/empreendedor-inteligente#inscricao">
              GARANTA SUA VAGA AGORA! <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton source="Blog Post" className="custom-class" />
    </div>
  );
}