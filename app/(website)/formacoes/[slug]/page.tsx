import { notFound } from 'next/navigation'
import { getFormacaoBySlug } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import EmpreendedorInteligenteTemplate from '@/components/formacao-templates/empreendedor-inteligente-template'
import LCFMentoringProTemplate from '@/components/formacao-templates/lcf-mentoring-pro-template'
import MentoriaIndividualTemplate from '@/components/formacao-templates/mentoria-individual-template'
import MentoriaInvestimentosTemplate from '@/components/formacao-templates/mentoria-investimentos-template'
import MetodoTFTemplate from '@/components/formacao-templates/metodo-tf-template'
import RotaMindTemplate from '@/components/formacao-templates/rota-mind-template'
import MentorCoachingFinanceiroTemplate from '@/components/formacao-templates/mentor-coaching-financeiro-template'
import MentoriaTemplate from '@/components/formacao-templates/mentoria-template'
import EducadorFinanceiroTemplate from '@/components/formacao-templates/educador-financeiro-template'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

// Desabilitar cache para garantir que mudanças do Payload apareçam imediatamente
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function FormacaoPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  // Buscar formação do Payload
  const formacao = await getFormacaoBySlug(slug, isPreview)

  if (!formacao) {
    notFound()
  }

  // Se não estiver em preview, só mostrar publicadas
  if (!isPreview && formacao.status !== 'published') {
    notFound()
  }

  // Renderizar template específico baseado no campo template
  const template = formacao.template || 'default'
  
  // Renderizar templates específicos
  if (template === 'empreendedor-inteligente') {
    return (
      <>
        <LivePreview />
        <EmpreendedorInteligenteTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'lcf-mentoring-pro') {
    return (
      <>
        <LivePreview />
        <LCFMentoringProTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentoria-individual') {
    return (
      <>
        <LivePreview />
        <MentoriaIndividualTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentoria-investimentos') {
    return (
      <>
        <LivePreview />
        <MentoriaInvestimentosTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'metodo-tf') {
    return (
      <>
        <LivePreview />
        <MetodoTFTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'rota-mind') {
    return (
      <>
        <LivePreview />
        <RotaMindTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentor-coaching-financeiro') {
    return (
      <>
        <LivePreview />
        <MentorCoachingFinanceiroTemplate formacao={formacao} />
      </>
    )
  }

  if (template === 'mentoria') {
    return (
      <>
        <LivePreview />
        <MentoriaTemplate formacao={formacao} />
      </>
    )
  }

  return (
    <>
      <LivePreview />
      {isPreview && (
        <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <p className="text-yellow-400 text-sm font-medium">
            🔴 Modo Preview - Você está visualizando uma versão não publicada
          </p>
        </div>
      )}
      <EducadorFinanceiroTemplate formacao={formacao} />
    </>
  )
}
