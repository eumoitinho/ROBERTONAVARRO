import { DashboardStats } from "@/components/admin/dashboard-stats"
import { DashboardChart } from "@/components/admin/dashboard-chart"
import { getUserFromSession } from "@/lib/services/auth"
import { redirect } from "next/navigation"
import { getEventStats } from "@/lib/database/db"

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
