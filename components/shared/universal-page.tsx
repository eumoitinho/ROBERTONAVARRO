'use client';

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/shared/whatsapp-button';
import { urlForImage } from '@/sanity/lib/image';
import type { Page, SiteSettings } from '@/sanity/types';
import { Star, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface UniversalPageProps {
  page: Page;
  siteSettings?: SiteSettings | null;
}

export default function UniversalPage({ page, siteSettings }: UniversalPageProps) {
  const showHeader = page.settings?.showHeader !== false;
  const showFooter = page.settings?.showFooter !== false;
  const showWhatsApp = page.settings?.showWhatsAppButton !== false;

  // Componentes customizados para Portable Text
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset) return null;
        const imageUrl = urlForImage(value);
        return (
          <div className="my-8">
            <Image
              src={imageUrl || ''}
              alt={value.alt || ''}
              width={1200}
              height={675}
              className="rounded-xl"
            />
            {value.caption && (
              <p className="text-sm text-zinc-400 mt-2 text-center">{value.caption}</p>
            )}
          </div>
        );
      },
    },
    marks: {
      link: ({ children, value }: any) => {
        const target = value?.blank ? '_blank' : undefined;
        const rel = value?.blank ? 'noopener noreferrer' : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={rel}
            className="text-yellow-500 hover:text-yellow-400 underline"
          >
            {children}
          </a>
        );
      },
      highlight: ({ children }: any) => (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
          {children}
        </span>
      ),
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-12">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-10">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl md:text-3xl font-bold mb-3 mt-8">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl md:text-2xl font-bold mb-2 mt-6">{children}</h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-yellow-500 pl-6 py-2 my-6 italic text-zinc-300">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside space-y-2 my-4 text-zinc-300">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-2 my-4 text-zinc-300">{children}</ol>
      ),
    },
  };

  // Renderizar Hero Section
  const renderHeroSection = () => {
    if (!page.heroSection) return null;

    const hero = page.heroSection;
    const backgroundImageUrl = hero.backgroundImage ? urlForImage(hero.backgroundImage) : null;

    return (
      <section className="relative min-h-[60vh] flex items-center justify-center py-24 overflow-hidden">
        {/* Background */}
        {backgroundImageUrl ? (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={backgroundImageUrl}
                alt={hero.backgroundImage?.alt || hero.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/60 z-10" />
          </>
        ) : (
          <div className={`absolute inset-0 ${hero.backgroundColor || 'bg-zinc-950'} z-0`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950" />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
                hero.textColor || 'text-white'
              }`}
            >
              {hero.title.split(' ').map((word, i) => {
                // Destaque palavras em MAIÚSCULAS
                if (word === word.toUpperCase() && word.length > 2) {
                  return (
                    <span
                      key={i}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"
                    >
                      {word}{' '}
                    </span>
                  );
                }
                return <span key={i}>{word} </span>;
              })}
            </h1>

            {hero.subtitle && (
              <p className="text-xl md:text-2xl text-zinc-300 mb-6 leading-relaxed">
                {hero.subtitle}
              </p>
            )}

            {hero.description && (
              <p className="text-lg text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                {hero.description}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {hero.primaryButton?.text && (
                <Link
                  href={hero.primaryButton.link || '#'}
                  target={hero.primaryButton.openInNewTab ? '_blank' : undefined}
                  rel={hero.primaryButton.openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold px-8 py-6 text-lg rounded-xl">
                    {hero.primaryButton.text}
                  </Button>
                </Link>
              )}

              {hero.secondaryButton?.text && (
                <Link
                  href={hero.secondaryButton.link || '#'}
                  target={hero.secondaryButton.openInNewTab ? '_blank' : undefined}
                  rel={hero.secondaryButton.openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  <Button
                    variant="outline"
                    className="border-2 border-zinc-700 hover:border-yellow-500 px-8 py-6 text-lg rounded-xl"
                  >
                    {hero.secondaryButton.text}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Renderizar Content Sections
  const renderContentSections = () => {
    if (!page.contentSections || page.contentSections.length === 0) return null;

    return (
      <div className="space-y-16">
        {page.contentSections.map((section) => {
          switch (section._type) {
            case 'textSection':
              return (
                <section
                  key={section._key}
                  className={`py-16 ${section.backgroundColor || 'bg-transparent'}`}
                >
                  <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
                      )}
                      {section.subtitle && (
                        <p className="text-xl text-zinc-300 mb-6">{section.subtitle}</p>
                      )}
                      {section.content && (
                        <div className="prose prose-lg prose-invert max-w-none">
                          <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                            {section.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              );

            case 'imageSection':
              const imageUrl = section.image ? urlForImage(section.image) : null;
              if (!imageUrl) return null;

              return (
                <section key={section._key} className="py-16">
                  <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                          {section.title}
                        </h2>
                      )}
                      <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={section.image?.alt || section.title || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {section.caption && (
                        <p className="text-center text-zinc-400 mt-4">{section.caption}</p>
                      )}
                    </div>
                  </div>
                </section>
              );

            case 'ctaSection':
              return (
                <section key={section._key} className="py-16">
                  <div className="container mx-auto px-4">
                    <div
                      className={`max-w-4xl mx-auto rounded-3xl p-12 text-center ${
                        section.style === 'gold'
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black'
                          : section.style === 'light'
                          ? 'bg-white text-black'
                          : 'bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white border border-zinc-700'
                      }`}
                    >
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
                      )}
                      {section.description && (
                        <p className="text-lg mb-8 opacity-90">{section.description}</p>
                      )}
                      {section.buttonText && (
                        <Link href={section.buttonLink || '#'}>
                          <Button
                            className={`${
                              section.style === 'gold'
                                ? 'bg-black text-white hover:bg-zinc-900'
                                : 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black'
                            } font-bold px-8 py-6 text-lg rounded-xl`}
                          >
                            {section.buttonText}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </section>
              );

            case 'featuresSection':
              return (
                <section key={section._key} className="py-16">
                  <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                          {section.title}
                        </h2>
                      )}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {section.features?.map((feature) => (
                          <div
                            key={feature._key}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500 transition-colors"
                          >
                            {feature.icon && (
                              <div className="text-4xl mb-4">{feature.icon}</div>
                            )}
                            {feature.title && (
                              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            )}
                            {feature.description && (
                              <p className="text-zinc-400">{feature.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );

            case 'videoSection':
              if (!section.videoUrl) return null;

              // Extrair ID do vídeo do YouTube
              const getYouTubeEmbedUrl = (url: string) => {
                const regExp =
                  /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                const match = url.match(regExp);
                const videoId = match && match[7].length === 11 ? match[7] : null;
                return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
              };

              return (
                <section key={section._key} className="py-16">
                  <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                      {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                          {section.title}
                        </h2>
                      )}
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
                        <iframe
                          src={getYouTubeEmbedUrl(section.videoUrl)}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                      {section.description && (
                        <p className="text-zinc-300 mt-6 text-center">{section.description}</p>
                      )}
                    </div>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    );
  };

  // Renderizar Main Content (Portable Text)
  const renderMainContent = () => {
    if (!page.mainContent || page.mainContent.length === 0) return null;

    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-invert">
            <PortableText value={page.mainContent} components={portableTextComponents} />
          </div>
        </div>
      </section>
    );
  };

  // Renderizar Testimonials
  const renderTestimonials = () => {
    if (!page.testimonials || page.testimonials.length === 0) return null;

    return (
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Depoimentos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {page.testimonials.map((testimonial) => {
              const imageUrl = testimonial.image ? urlForImage(testimonial.image) : null;

              return (
                <div
                  key={testimonial._key}
                  className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {imageUrl && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image src={imageUrl} alt={testimonial.name || ''} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      {testimonial.name && (
                        <p className="font-bold">{testimonial.name}</p>
                      )}
                      {testimonial.role && (
                        <p className="text-sm text-zinc-400">{testimonial.role}</p>
                      )}
                    </div>
                  </div>

                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < testimonial.rating!
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-zinc-600'
                          }
                        />
                      ))}
                    </div>
                  )}

                  {testimonial.content && (
                    <p className="text-zinc-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Renderizar FAQ
  const renderFAQ = () => {
    if (!page.faq || page.faq.length === 0) return null;

    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {page.faq.map((item) => (
                <AccordionItem
                  key={item._key}
                  value={item._key}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left hover:text-yellow-500">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  };

  // Renderizar Gallery
  const renderGallery = () => {
    if (!page.gallery || page.gallery.length === 0) return null;

    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Galeria</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {page.gallery.map((image, index) => {
              const imageUrl = urlForImage(image);
              if (!imageUrl) return null;

              return (
                <div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={imageUrl}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <p className="text-white text-center">{image.caption}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Custom CSS */}
      {page.settings?.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: page.settings.customCSS }} />
      )}

      {/* Header */}
      {showHeader && siteSettings && (
        <SiteHeader
          navigationItems={
            siteSettings.mainNavigation?.map((item) => ({
              title: item.title || '',
              href: item.href || '#',
              isButton: item.isButton,
            })) || []
          }
          showInicio={true}
        />
      )}

      {/* Hero Section */}
      {renderHeroSection()}

      {/* Main Content */}
      <main>
        {renderMainContent()}
        {renderContentSections()}
        {renderGallery()}
        {renderTestimonials()}
        {renderFAQ()}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* WhatsApp Button */}
      {showWhatsApp && <WhatsAppButton />}
    </div>
  );
}
