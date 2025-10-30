import { notFound } from "next/navigation"
import type { Metadata } from "next"
import MentoriaClient from "./page-client"
import { getFormationBySlug } from "@/sanity/lib/formations-api"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug("mentoria")
  if (!data) return { title: "Mentoria" }
  const d: any = data
  return {
    title: d.seo?.title || d.hero?.title || "Mentoria",
    description: d.seo?.description || d.hero?.description || null,
  }
}

export default async function Page() {
  const data = await getFormationBySlug("mentoria")
  if (!data) notFound()
  return <MentoriaClient data={data} />
}
