"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ArrowRight, Clock, User, Calendar, Tag, ArrowUp, List, ChevronRight, Share2, Twitter, Facebook, Linkedin, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/whatsapp-button";
import Footer from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { ptBlogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

// Componente para barra de progresso de leitura
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-yellow-500 to-amber-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Componente para índice do artigo
const TableOfContents = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Extrair títulos do HTML
  const headings = content.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g)?.map((heading, index) => {
    const level = parseInt(heading.match(/<h([2-3])/)?.[1] || '2');
    const text = heading.replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id, text, level };
  }) || [];

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean);

      const currentHeading = headingElements.find(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentHeading) {
        setActiveSection(currentHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-yellow-400 font-semibold mb-3 w-full hover:text-yellow-300 transition-colors"
        >
          <List size={20} />
          <span>Índice do Artigo</span>
          <ChevronRight 
            size={16} 
            className={`ml-auto transition-transform ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>
        
        {isOpen && (
          <nav className="space-y-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToSection(heading.id)}
                className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                  activeSection === heading.id
                    ? 'bg-yellow-500/20 text-yellow-300 border-l-2 border-yellow-400'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                } ${heading.level === 3 ? 'ml-4' : ''}`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

// Componente para botões de compartilhamento
const ShareButtons = ({ title, url }: { title: string; url?: string }) => {
  const shareData = {
    title: title,
    url: url || (typeof window !== 'undefined' ? window.location.href : ''),
    text: `Confira este artigo: ${title}`
  };

  const handleShare = async (platform: string) => {
    const encodedTitle = encodeURIComponent(shareData.title);
    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedText = encodeURIComponent(shareData.text);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    };

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Compartilhamento cancelado');
      }
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        console.error('Erro ao copiar link');
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4">
      <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
        <Share2 size={18} />
        Compartilhar Artigo
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="border-zinc-600 hover:border-blue-400 hover:bg-blue-400/10 text-zinc-300 hover:text-blue-400"
        >
          <Twitter size={16} className="mr-2" />
          Twitter
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="border-zinc-600 hover:border-blue-600 hover:bg-blue-600/10 text-zinc-300 hover:text-blue-600"
        >
          <Facebook size={16} className="mr-2" />
          Facebook
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin')}
          className="border-zinc-600 hover:border-blue-500 hover:bg-blue-500/10 text-zinc-300 hover:text-blue-500"
        >
          <Linkedin size={16} className="mr-2" />
          LinkedIn
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('copy')}
          className="border-zinc-600 hover:border-yellow-400 hover:bg-yellow-400/10 text-zinc-300 hover:text-yellow-400"
        >
          <LinkIcon size={16} className="mr-2" />
          Copiar
        </Button>
      </div>
      
      {typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('native')}
          className="w-full mt-2 border-zinc-600 hover:border-yellow-400 hover:bg-yellow-400/10 text-zinc-300 hover:text-yellow-400"
        >
          <Share2 size={16} className="mr-2" />
          Compartilhar
        </Button>
      )}
    </div>
  );
};

// Componente para renderizar conteúdo melhorado
const EnhancedArticleContent = ({ content }: { content: string }) => {
  // Adicionar IDs aos títulos para navegação
  const enhancedContent = content.replace(
    /<h([2-3])([^>]*)>(.*?)<\/h[2-3]>/g,
    (match, level, attrs, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    }
  );

  return (
    <article
      className="prose prose-zinc prose-invert max-w-none prose-lg md:prose-xl 
                 prose-headings:font-bold prose-headings:text-yellow-400 
                 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
                 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-yellow-300
                 prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                 prose-a:text-yellow-400 prose-a:font-medium prose-a:underline-offset-4 
                 hover:prose-a:underline prose-a:transition-colors
                 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:text-zinc-300
                 prose-li:text-lg prose-li:leading-relaxed
                 prose-strong:text-yellow-300 prose-strong:font-semibold
                 prose-blockquote:border-l-4 prose-blockquote:border-yellow-400 
                 prose-blockquote:bg-zinc-800/30 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                 prose-code:bg-zinc-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                 prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700"
      style={{ minHeight: 400 }}
      dangerouslySetInnerHTML={{ __html: enhancedContent }}
    />
  );
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const post = ptBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
    return null;
  }

  // Calcular tempo de leitura estimado
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 palavras por minuto

  // Encontrar artigos relacionados
  const relatedPosts = ptBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationItems = [
    { title: "Início", href: "/" },
    { title: "Empreendedor Inteligente", href: "/empreendedor-inteligente" },
    { title: "Blog", href: "/blog", isActive: true },
    { title: "Inscrição", href: "/empreendedor-inteligente#inscricao", isButton: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <ReadingProgress />
      
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
          <div className="max-w-6xl mx-auto">
            {/* Article Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <Tag size={16} />
                <span className="text-sm font-medium text-yellow-400">{post.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-white leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{readingTime} min de leitura</span>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-8 max-w-4xl">
                {post.excerpt}
              </p>
            </div>

            {/* Featured Image */}
            <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.image}
                alt={`Imagem ilustrativa para o artigo ${post.title}`}
                width={1200}
                height={600}
                className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
            </div>

            {/* Article Content */}
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <EnhancedArticleContent content={post.content} />
                
                {/* Article Footer */}
                <footer className="mt-16 pt-8 border-t border-zinc-800">
                  <div className="bg-gradient-to-r from-yellow-500/10 to-amber-600/10 border border-yellow-500/20 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                      Gostou do artigo?
                    </h3>
                    <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
                      Transforme sua mentalidade e seus resultados com o programa Empreendedor Inteligente. 
                      Aprenda as estratégias dos maiores empresários para escalar resultados com inteligência e liberdade.
                    </p>
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href="/empreendedor-inteligente#inscricao">
                        Saiba Mais Sobre o Programa
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </footer>
              </div>

              {/* Enhanced Sidebar */}
              <aside className="lg:col-span-4 space-y-8">
                <TableOfContents content={post.content} />
                <ShareButtons title={post.title} />
                
                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6">
                    <h3 className="text-yellow-400 font-semibold mb-4 text-lg">Artigos Relacionados</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block p-4 rounded-lg hover:bg-zinc-800/50 transition-colors group"
                        >
                          <h4 className="text-sm font-medium text-zinc-200 mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-zinc-400">
                            {relatedPost.category} • {relatedPost.date}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Info */}
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-semibold mb-3">Sobre o Autor</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                      <User size={20} className="text-black" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">{post.author}</p>
                      <p className="text-xs text-zinc-400">Especialista em Empreendedorismo</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300 mb-4">
                    Mentor e consultor empresarial com mais de 15 anos de experiência ajudando empreendedores a transformar suas vidas e negócios.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-zinc-600 hover:border-yellow-400 hover:bg-yellow-400/10 text-zinc-300 hover:text-yellow-400"
                  >
                    <Link href="/blog">Ver Todos os Artigos</Link>
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
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
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-black p-4 rounded-full shadow-2xl z-50 transition-all duration-300 transform hover:scale-110"
          size="sm"
        >
          <ArrowUp size={24} />
        </Button>
      )}

      <Footer />
      <WhatsAppButton source="Blog Post" className="custom-class" />
    </div>
  );
}

