"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

// Atualizar a interface para tornar stats opcional e adicionar verificação para evitar o erro
interface DashboardChartProps {
  stats?: any[]
}

export function DashboardChart({ stats = [] }: DashboardChartProps) {
  // Preparar dados para o gráfico
  const chartData = stats.map((event) => ({
    name: event.event_name,
    inscritos: Number(event.total_registrations),
    presentes: Number(event.total_attended),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscrições por Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              tickFormatter={(value) => (value.length > 15 ? `${value.substring(0, 15)}...` : value)}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="inscritos" name="Inscritos" fill="#4f46e5" />
            <Bar dataKey="presentes" name="Presentes" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
