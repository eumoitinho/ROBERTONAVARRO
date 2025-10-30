import { notFound } from "next/navigation"
import type { Metadata } from "next"
import MentoriaDeInvestimentosClient from "./page-client"
import { getFormationBySlug } from "@/sanity/lib/formations-api"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug("mentoria-de-investimentos")
  if (!data) return { title: "Mentoria de Investimentos" }
  const d: any = data
  return {
    title: d.hero?.title || d.title || "Mentoria de Investimentos",
    description: d.hero?.description || d.mainContent?.description || null,
  }
}

export default async function Page() {
  const data = await getFormationBySlug("mentoria-de-investimentos")
  if (!data) notFound()
  return <MentoriaDeInvestimentosClient data={data} />
}
