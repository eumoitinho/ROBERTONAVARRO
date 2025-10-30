import { notFound } from "next/navigation"
import type { Metadata } from "next"
import RotaMindClient from "./page-client"
import { getFormationBySlug } from "@/sanity/lib/formations-api"

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await getFormationBySlug("rota-mind")
  if (!data) return { title: "Rota Mind" }
  const d: any = data
  return {
    title: d.hero?.title || d.title || "Rota Mind",
    description: d.hero?.description || d.aboutSection?.description || null,
  }
}

export default async function Page() {
  const data = await getFormationBySlug("rota-mind")
  if (!data) notFound()
  return <RotaMindClient data={data} />
}
