import { getFormacoes } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Award, BookOpen, Users, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Desabilitar cache para garantir que mudanças do Payload apareçam imediatamente
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function FormacoesPage() {
  const formacoes = await getFormacoes()

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
                <span className="flex h-2 w-2 rounded-full bg-red-400"></span>
                <span className="text-sm font-medium">FORMAÇÕES</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                FORMAÇÕES QUE VÃO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">TRANSFORMAR SUA MENTALIDADE</span>
              </h1>
              <p className="text-xl text-zinc-300 mb-8">
                Com metodologias exclusivas e resultados comprovados, nossos programas foram desenvolvidos para atender diferentes perfis e objetivos. Escolha o que faz sentido para você e dê o primeiro passo rumo à sua liberdade financeira.
              </p>
            </div>
          </div>
        </section>

        {/* Formations Grid */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            {formacoes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {formacoes.map((formacao: any, index: number) => (
                  <Card
                    key={formacao.id || index}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/10 group p-6 flex flex-col"
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-600 mb-4"></div>
                    <CardContent className="p-0 flex flex-col h-full">
                      <h3 className={`text-xl font-bold mb-3 ${index === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600' : 'text-red-400'}`}>
                        {formacao.title}
                      </h3>
                      <p className="text-zinc-300 mb-6 flex-1">
                        {formacao.hero?.subtitle || formacao.hero?.description || 'Descrição da formação'}
                      </p>
                      <div className="mt-auto">
                        <Button
                          asChild
                          className="cta-hover bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl w-full"
                        >
                          <Link href={`/formacoes/${formacao.slug}`}>
                            SAIBA MAIS <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-zinc-400 text-lg">Nenhuma formação encontrada.</p>
                <p className="text-zinc-500 text-sm mt-2">Adicione formações no Payload CMS para que elas apareçam aqui.</p>
              </div>
            )}
          </div>
        </section>

        <Footer accent="red" />
        <WhatsAppButton source="Formações" />
      </div>
    </>
  )
}

export async function generateMetadata() {
  return {
    title: 'Formações | Roberto Navarro',
    description: 'Conheça nossas formações exclusivas em educação financeira e coaching. Transforme sua mentalidade e alcance a liberdade financeira.',
    keywords: 'formações, educação financeira, coaching financeiro, cursos, Roberto Navarro',
  }
}

