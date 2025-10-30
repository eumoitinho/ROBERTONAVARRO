import { notFound } from "next/navigation"
import type { Metadata } from "next"
import MentoriaIndividualClient from "./page-client"
import { getFormationBySlug } from "@/sanity/lib/formations-api"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug("mentoria-individual")
  if (!data) return { title: "Mentoria Individual" }
  const d: any = data
  return {
    title: d.hero?.title || d.title || "Mentoria Individual",
    description: d.hero?.description || d.mainContent?.description || null,
  }
}

export default async function Page() {
  const data = await getFormationBySlug("mentoria-individual")
  if (!data) notFound()
  return <MentoriaIndividualClient data={data} />
}
