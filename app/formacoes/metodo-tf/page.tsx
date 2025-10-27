import type { Metadata } from 'next'
import { getFormationBySlug } from '@/sanity/lib/formations-api'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug('metodo-tf')
  
  if (!data) {
    return {
      title: 'Método TF - Instituto Coaching Financeiro',
      description: 'Desbloqueie a riqueza em sua vida',
    }
  }

  return {
    title: data.hero?.title || 'Método TF',
    description: data.hero?.description,
  }
}

export default async function MetodoTFPage() {
  const data = await getFormationBySlug('metodo-tf')
  
  if (!data) {
    notFound()
  }

  // Temporariamente retornar um fallback até termos o page-client
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Método TF</h1>
        <p className="text-zinc-400">Página em construção - Dados estão no Sanity</p>
        <p className="text-sm text-zinc-500 mt-4">Slug: metodo-tf</p>
      </div>
    </div>
  )
}
