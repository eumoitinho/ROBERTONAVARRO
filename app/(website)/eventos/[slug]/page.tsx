import { notFound } from 'next/navigation'
import { getEventoBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import CrencasDaRiquezaTemplate from '@/components/evento-templates/crencas-da-riqueza-template'
import EnergiaDoDinheiroTemplate from '@/components/evento-templates/energia-do-dinheiro-template'
import SegredosDaMenteMilionariaTemplate from '@/components/evento-templates/segredos-da-mente-milionaria-template'
import EscaladorDeNegociosTemplate from '@/components/evento-templates/escalador-de-negocios-template'
import MentorMilionarioTemplate from '@/components/evento-templates/mentor-milionario-template'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HeroPages from '@/components/hero-pages'
import { TicketPricingCards } from '@/components/ticket-pricing-cards'
import { TestimonialsSection } from '@/components/testimonials-section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

// Helper para serializar evento (remover funções e dados não serializáveis)
// Isso garante que apenas dados serializáveis sejam passados para Client Components
function serializeEvento(evento: any): any {
  try {
    // Converter para JSON e de volta para remover funções, métodos e referências circulares
    const serialized = JSON.parse(JSON.stringify(evento, (key, value) => {
      // Remover funções
      if (typeof value === 'function') {
        return undefined
      }
      // Manter outros valores
      return value
    }))
    return serialized
  } catch (error) {
    // Se houver erro na serialização, retornar objeto vazio
    console.error('Erro ao serializar evento:', error)
    return {}
  }
}

// Helper para renderizar rich text
const renderRichText = (content: any) => {
  if (!content) return null
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content.map((block: any, idx: number) => {
      if (block.type === 'p') {
        return (
          <p key={idx} className="mb-4">
            {block.children?.map((child: any, cIdx: number) => child.text || '').join('')}
          </p>
        )
      }
      return null
    })
  }
  return String(content)
}

export default async function EventoPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  // Buscar evento do Payload
  const evento = await getEventoBySlug(slug, isPreview)

  if (!evento) {
    notFound()
  }

  // Se não estiver em preview, só mostrar publicados
  if (!isPreview && evento.status !== 'published') {
    notFound()
  }

  // Serializar evento para remover qualquer função ou dado não serializável
  // Isso é necessário no Next.js 15 para passar dados de Server Components para Client Components
  const eventoData = serializeEvento(evento)
  
  // Garantir que eventoData não seja undefined ou null
  if (!eventoData || !eventoData.id) {
    console.error('Erro: eventoData não foi serializado corretamente')
    notFound()
  }

  // Renderizar template específico se definido
  const template = eventoData.template || 'default'

  if (template === 'crencas-da-riqueza') {
    return (
      <>
        <LivePreview />
        <CrencasDaRiquezaTemplate evento={eventoData} />
      </>
    )
  }

  if (template === 'energia-do-dinheiro') {
    return (
      <>
        <LivePreview />
        <EnergiaDoDinheiroTemplate evento={eventoData} />
      </>
    )
  }

  if (template === 'segredos-da-mente-milionaria') {
    return (
      <>
        <LivePreview />
        <SegredosDaMenteMilionariaTemplate evento={eventoData} />
      </>
    )
  }

  if (template === 'escalador-de-negocios') {
    return (
      <>
        <LivePreview />
        <EscaladorDeNegociosTemplate evento={eventoData} />
      </>
    )
  }

  if (template === 'mentor-milionario') {
    return (
      <>
        <LivePreview />
        <MentorMilionarioTemplate evento={eventoData} />
      </>
    )
  }

  // Template padrão (genérico)
  const navigationItems = [
    { title: 'Início', href: '/' },
    { title: 'Sobre o Evento', href: '#sobre' },
    { title: 'Programação', href: '#programacao' },
    { title: 'Ingressos', href: '#ingressos', isButton: true },
  ]

  // Preparar dados dos tickets
  const ticketTypes = eventoData.tickets?.map((ticket: any) => ({
    id: ticket.id || Math.random(),
    name: ticket.name || 'Ingresso',
    price: ticket.price || 0,
    originalPrice: ticket.originalPrice || null,
    description: ticket.description || '',
    benefits: ticket.benefits?.map((b: any) => b.text || b) || [],
    link: ticket.link || '',
    available: ticket.available !== false,
  })) || []

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-zinc-950 text-white">
        {isPreview && (
          <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm font-medium">
              🔴 Modo Preview - Você está visualizando uma versão não publicada
            </p>
          </div>
        )}

        <SiteHeader navigationItems={navigationItems} showInicio={true} />

               {/* Hero Section */}
               <HeroPages
                 title={eventoData.hero?.title || eventoData.title}
                 subtitle={typeof eventoData.hero?.subtitle === 'string' ? eventoData.hero.subtitle : ''}
                 secondtitle={eventoData.hero?.badge || 'EVENTO EXCLUSIVO'}
                 image={
                   typeof eventoData.hero?.backgroundImage === 'object' && eventoData.hero?.backgroundImage?.url
                     ? eventoData.hero.backgroundImage.url
                     : '/images/hero-default.jpg'
                 }
                 ctaText="GARANTIR MINHA VAGA"
                 ctaHref="#ingressos"
               />

               {/* Event Info Section */}
               <section className="py-16 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
                 <div className="container mx-auto px-4 relative z-10">
                   <div className="max-w-5xl mx-auto">
                     <div className="grid md:grid-cols-3 gap-8">
                       {eventoData.date && (
                         <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center">
                           <Calendar className="h-8 w-8 text-red-400 mx-auto mb-4" />
                           <h3 className="text-lg font-bold mb-2">Data</h3>
                           <p className="text-zinc-300">
                             {new Date(eventoData.date).toLocaleDateString('pt-BR', {
                               day: 'numeric',
                               month: 'long',
                               year: 'numeric',
                             })}
                           </p>
                           {eventoData.duration && (
                             <p className="text-sm text-zinc-400 mt-2">{eventoData.duration}</p>
                           )}
                         </div>
                       )}

                       {eventoData.location && (
                         <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center">
                           <MapPin className="h-8 w-8 text-red-400 mx-auto mb-4" />
                           <h3 className="text-lg font-bold mb-2">Local</h3>
                           <p className="text-zinc-300">
                             {eventoData.location.type === 'online' ? 'Online' : eventoData.location.venue || 'A definir'}
                           </p>
                           {eventoData.location.address && (
                             <p className="text-sm text-zinc-400 mt-2">{eventoData.location.address}</p>
                           )}
                         </div>
                       )}

                       {eventoData.mentors && Array.isArray(eventoData.mentors) && eventoData.mentors.length > 0 && (
                         <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center">
                           <Users className="h-8 w-8 text-red-400 mx-auto mb-4" />
                           <h3 className="text-lg font-bold mb-2">Mentores</h3>
                           <p className="text-zinc-300">{eventoData.mentors.length} mentor(es)</p>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               </section>

               {/* Highlights Section */}
               {eventoData.highlights && eventoData.highlights.length > 0 && (
                 <section id="sobre" className="py-20 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
                   <div className="container mx-auto px-4 relative z-10">
                     <div className="text-center mb-16">
                       <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                         <span className="text-sm font-medium">DESTAQUES</span>
                       </div>
                       <h2 className="text-3xl md:text-4xl font-bold mb-4">
                         POR QUE PARTICIPAR DESTE <span className="text-red-400">EVENTO</span>
                       </h2>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                       {eventoData.highlights.map((highlight: any, index: number) => (
                         <div
                           key={index}
                           className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300"
                         >
                           <h3 className="text-xl font-bold mb-2 text-red-400">{highlight.title}</h3>
                           <p className="text-zinc-300">{highlight.description}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                 </section>
               )}

               {/* Schedule Section */}
               {eventoData.schedule && eventoData.schedule.length > 0 && (
                 <section id="programacao" className="py-20 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
                   <div className="container mx-auto px-4 relative z-10">
                     <div className="text-center mb-16">
                       <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                         <span className="text-sm font-medium">PROGRAMAÇÃO</span>
                       </div>
                       <h2 className="text-3xl md:text-4xl font-bold mb-4">
                         O QUE VOCÊ VAI <span className="text-red-400">VIVER</span>
                       </h2>
                     </div>

                     <div className="max-w-3xl mx-auto space-y-4">
                       {eventoData.schedule.map((item: any, index: number) => (
                         <div
                           key={index}
                           className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6"
                         >
                           <div className="flex items-start gap-4">
                             <div className="bg-red-500/20 rounded-lg p-3 min-w-[80px] text-center">
                               <p className="text-red-400 font-bold text-sm">{item.time || 'A definir'}</p>
                             </div>
                             <div className="flex-1">
                               <h3 className="text-xl font-bold mb-2 text-red-400">{item.title}</h3>
                               <p className="text-zinc-300">{item.description}</p>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </section>
               )}

               {/* Tickets Section */}
               {ticketTypes.length > 0 && (
                 <section id="ingressos" className="py-20 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
                   <div className="container mx-auto px-4 relative z-10">
                     <div className="text-center mb-16">
                       <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                         <span className="text-sm font-medium">INGRESSOS</span>
                       </div>
                       <h2 className="text-3xl md:text-4xl font-bold mb-4">
                         GARANTA SUA <span className="text-red-400">VAGA</span>
                       </h2>
                     </div>

                     <TicketPricingCards
                       eventId={eventoData.id}
                       eventName={eventoData.title}
                       ticketTypes={ticketTypes}
                     />
                   </div>
                 </section>
               )}

               {/* Testimonials */}
               {eventoData.testimonials && Array.isArray(eventoData.testimonials) && eventoData.testimonials.length > 0 && (
                 <TestimonialsSection />
               )}

               {/* FAQs */}
               {eventoData.faqs && Array.isArray(eventoData.faqs) && eventoData.faqs.length > 0 && (
                 <section className="py-20 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
                   <div className="container mx-auto px-4 relative z-10">
                     <div className="text-center mb-16">
                       <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-4">
                         <span className="text-sm font-medium">PERGUNTAS FREQUENTES</span>
                       </div>
                       <h2 className="text-2xl md:text-3xl font-bold mb-4">
                         DÚVIDAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">COMUNS</span>
                       </h2>
                     </div>

                     <div className="max-w-3xl mx-auto">
                       <Accordion type="single" collapsible className="space-y-4">
                         {eventoData.faqs.map((faq: any, index: number) => (
                           <AccordionItem
                             key={index}
                             value={`item-${index}`}
                             className="border border-zinc-800 rounded-xl overflow-hidden"
                           >
                             <AccordionTrigger className="px-6 py-4 hover:bg-zinc-800/50 text-left font-medium">
                               {typeof faq === 'object' ? (faq.question || faq.title) : 'Pergunta'}
                             </AccordionTrigger>
                             <AccordionContent className="px-6 py-4 bg-zinc-900/50 text-zinc-300">
                               {typeof faq === 'object' ? (
                                 Array.isArray(faq.answer) ? (
                                   <div className="prose prose-invert max-w-none">
                                     {faq.answer.map((block: any, bIdx: number) => (
                                       <p key={bIdx}>{block.text || String(block)}</p>
                                     ))}
                                   </div>
                                 ) : (
                                   String(faq.answer || faq.description || '')
                                 )
                               ) : (
                                 'Resposta'
                               )}
                             </AccordionContent>
                           </AccordionItem>
                         ))}
                       </Accordion>
                     </div>
                   </div>
                 </section>
               )}

               <Footer accent="red" />
               <WhatsAppButton source={eventoData.title} />
      </div>
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const evento = await getEventoBySlug(slug)

  if (!evento) {
    return {
      title: 'Evento não encontrado',
    }
  }

  // Serializar para metadata também
  const eventoData = serializeEvento(evento)

  return {
    title: eventoData.seo?.title || eventoData.title,
    description: eventoData.seo?.description || '',
    keywords: eventoData.seo?.keywords || '',
  }
}

