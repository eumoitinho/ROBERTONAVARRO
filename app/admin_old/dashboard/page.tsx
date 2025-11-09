import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardChart } from "@/components/dashboard-chart"
import { getUserFromSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getEventStats } from "@/lib/db"

export default async function DashboardPage() {
  const user = await getUserFromSession()

  if (!user) {
    redirect("/admin/login")
  }

  // Buscar estatísticas dos eventos
  const stats = await getEventStats()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardStats stats={stats} />
      <DashboardChart stats={stats} />
    </div>
  )
}
