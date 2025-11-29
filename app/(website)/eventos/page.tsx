import { getEventos } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type AccentKey = 'red' | 'yellow'

const accentStyles: Record<AccentKey, {
  badgeDot: string
  highlight: string
  gradientBar: string
  button: string
  buttonText: string
  cardText: string
  cardHover: string
}> = {
  red: {
    badgeDot: 'bg-red-400',
    highlight: 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600',
    gradientBar: 'from-red-500 to-red-600',
    button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    buttonText: 'text-white',
    cardText: 'text-red-400',
    cardHover: 'hover:border-red-500/50 hover:shadow-red-500/10',
  },
  yellow: {
    badgeDot: 'bg-yellow-400',
    highlight: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600',
    gradientBar: 'from-yellow-500 to-amber-600',
    button: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700',
    buttonText: 'text-black',
    cardText: 'text-yellow-400',
    cardHover: 'hover:border-yellow-500/50 hover:shadow-yellow-500/10',
  },
}

const getMediaUrl = (media: any, fallback?: string): string => {
  if (!media) return fallback ?? ''
  if (typeof media === 'string') return media
  if (media?.url) return media.url
  if (media?.value?.url) return media.value.url
  return fallback ?? ''
}

export default async function EventosPage() {
  const eventos = await getEventos().catch((error) => {
    console.error('Erro ao buscar eventos:', error?.message || error)
    return []
  })

  const accent = accentStyles.red

  return (
    <>
      <LivePreview />
      <div className="min-h-screen bg-zinc-950 text-white">
        <SiteHeader showInicio={true} />

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full py-2 px-4 mb-6">
                <span className={`flex h-2 w-2 rounded-full ${accent.badgeDot}`}></span>
                <span className="text-sm font-medium">EVENTOS</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                EVENTOS QUE VÃO{' '}
                <span className={accent.highlight}>TRANSFORMAR SUA VIDA</span>
              </h1>
              <p className="text-xl text-zinc-300 mb-8">
                Participe de experiências únicas com Roberto Navarro e transforme sua mentalidade financeira. Escolha o evento que mais combina com você.
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            {eventos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventos.map((evento: any, index: number) => (
                  <Card
                    key={evento.id}
                    className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${accent.cardHover} group flex flex-col`}
                  >
                    {/* Image */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      {evento.hero?.backgroundImage && typeof evento.hero.backgroundImage === 'object' && evento.hero.backgroundImage.url ? (
                        <Image
                          src={evento.hero.backgroundImage.url}
                          alt={evento.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-red-400/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className={`h-1 w-full bg-gradient-to-r ${accent.gradientBar} mb-4 -mt-2`}></div>

                      {/* Date & Location */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-zinc-400">
                        {evento.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-red-400" />
                            <span>
                              {new Date(evento.date).toLocaleDateString('pt-BR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        {evento.location?.city && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-red-400" />
                            <span>
                              {evento.location.type === 'online' ? 'Online' : evento.location.city}
                            </span>
                          </div>
                        )}
                      </div>

                      <h3
                        className={`text-xl font-bold mb-3 ${
                          index === 0 ? accent.highlight : accent.cardText
                        }`}
                      >
                        {evento.title}
                      </h3>

                      {evento.hero?.subtitle && (
                        <p className="text-zinc-300 mb-6 flex-1 line-clamp-3">
                          {typeof evento.hero.subtitle === 'string' ? evento.hero.subtitle : ''}
                        </p>
                      )}

                      <div className="mt-auto">
                        <Button
                          asChild
                          className={`cta-hover ${accent.button} ${accent.buttonText} font-semibold rounded-xl w-full`}
                        >
                          <Link href={`/eventos/${evento.slug}`}>
                            VER DETALHES <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Calendar className="h-16 w-16 text-zinc-600 mx-auto mb-6" />
                <p className="text-zinc-400 text-lg">Nenhum evento disponível no momento.</p>
                <p className="text-zinc-500 text-sm mt-2">Adicione eventos no Payload CMS para que eles apareçam aqui.</p>
              </div>
            )}
          </div>
        </section>

        <Footer accent="red" />
        <WhatsAppButton source="Eventos" />
      </div>
    </>
  )
}

export async function generateMetadata() {
  return {
    title: 'Eventos | Roberto Navarro',
    description:
      'Participe de eventos transformadores com Roberto Navarro. Workshops, palestras e imersões em educação financeira.',
    keywords: 'eventos, workshops, palestras, educação financeira, Roberto Navarro',
  }
}
