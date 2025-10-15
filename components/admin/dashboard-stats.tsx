import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, CheckSquare, TrendingUp } from "lucide-react"

// Modificar a interface DashboardStatsProps para tornar stats opcional com valor padrão
interface DashboardStatsProps {
  stats?: any[]
}

// Atualizar a função para usar um valor padrão para stats
export function DashboardStats({ stats = [] }: DashboardStatsProps) {
  // Calcular estatísticas gerais
  const totalEvents = stats.length
  const totalRegistrations = stats.reduce((acc, event) => acc + Number(event.total_registrations), 0)
  const totalAttended = stats.reduce((acc, event) => acc + Number(event.total_attended), 0)
  const attendanceRate = totalRegistrations > 0 ? Math.round((totalAttended / totalRegistrations) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEvents}</div>
          <p className="text-xs text-muted-foreground">Eventos ativos no sistema</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Inscrições</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRegistrations}</div>
          <p className="text-xs text-muted-foreground">Pessoas inscritas em todos os eventos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Check-ins Realizados</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAttended}</div>
          <p className="text-xs text-muted-foreground">Participantes que compareceram</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Comparecimento</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{attendanceRate}%</div>
          <p className="text-xs text-muted-foreground">Percentual de inscritos que compareceram</p>
        </CardContent>
      </Card>
    </div>
  )
}
