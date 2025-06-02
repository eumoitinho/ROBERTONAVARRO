"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, CheckCircle, XCircle, Calendar, Database, RefreshCw, Activity } from "lucide-react"

interface DashboardData {
  stats: {
    total_leads: number
    sent_to_kommo: number
    failed_to_send: number
    today_leads: number
    week_leads: number
    month_leads: number
  }
  recentLeads: Array<{
    id: number
    name: string
    email: string
    source: string
    sent_to_kommo: boolean
    created_at: string
    kommo_lead_id?: number
  }>
  recentLogs: Array<{
    id: number
    action: string
    entity_type: string
    success: boolean
    error_message?: string
    created_at: string
  }>
}

export default function KommoDashboardPage() {
  const [data, setData] = useState<DashboardData>({
    stats: {
      total_leads: 0,
      sent_to_kommo: 0,
      failed_to_send: 0,
      today_leads: 0,
      week_leads: 0,
      month_leads: 0,
    },
    recentLeads: [],
    recentLogs: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isTestingIntegration, setIsTestingIntegration] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)

  const testIntegration = async () => {
    setIsTestingIntegration(true)
    setTestResult(null)

    try {
      // Teste de conexão
      const connectionResponse = await fetch("/api/kommo/test-connection")
      const connectionResult = await connectionResponse.json()

      if (!connectionResult.success) {
        setTestResult(`Erro de conexão: ${connectionResult.message}`)
        return
      }

      // Teste de criação de lead
      const testLeadData = {
        name: "Teste Dashboard",
        email: `teste-${Date.now()}@exemplo.com`,
        phone: "(11) 99999-9999",
        source: "Dashboard Teste",
        utmData: {
          utm_source: "dashboard",
          utm_medium: "teste",
          utm_campaign: "integracao",
        },
      }

      const leadResponse = await fetch("/api/kommo/test-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testLeadData),
      })

      const leadResult = await leadResponse.json()

      if (leadResult.success) {
        setTestResult("✅ Integração funcionando perfeitamente! Lead de teste criado com sucesso.")
        // Atualizar dados após teste bem-sucedido
        setTimeout(() => fetchData(), 1000)
      } else {
        setTestResult(`❌ Erro ao criar lead de teste: ${leadResult.message}`)
      }
    } catch (error) {
      setTestResult(`❌ Erro de conexão: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
    } finally {
      setIsTestingIntegration(false)
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/kommo/dashboard")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.message || "Erro ao carregar dados")
      }
    } catch (err) {
      setError("Erro de conexão")
      console.error("Erro ao buscar dados:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Carregando dados...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>Nenhum dado encontrado</AlertDescription>
        </Alert>
      </div>
    )
  }

  const successRate =
    data.stats.total_leads > 0 ? ((data.stats.sent_to_kommo / data.stats.total_leads) * 100).toFixed(1) : "0"

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Kommo</h1>
          <p className="text-muted-foreground">Monitoramento da integração com CRM</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={testIntegration} variant="secondary" disabled={isTestingIntegration}>
            {isTestingIntegration ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Testar Integração
          </Button>
          <Button onClick={fetchData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.total_leads}</div>
            <p className="text-xs text-muted-foreground">Todos os leads capturados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enviados para Kommo</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{data.stats.sent_to_kommo}</div>
            <p className="text-xs text-muted-foreground">Taxa de sucesso: {successRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Falhas de Envio</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{data.stats.failed_to_send}</div>
            <p className="text-xs text-muted-foreground">Leads com erro de sincronização</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.today_leads}</div>
            <p className="text-xs text-muted-foreground">Leads capturados hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Resultado do Teste */}
      {testResult && (
        <Alert className={testResult.includes("✅") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          <AlertDescription className={testResult.includes("✅") ? "text-green-800" : "text-red-800"}>
            {testResult}
          </AlertDescription>
        </Alert>
      )}

      {/* Estatísticas de Período */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Últimos 7 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{data.stats.week_leads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Últimos 30 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{data.stats.month_leads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{successRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Leads Recentes
          </CardTitle>
          <CardDescription>Últimos 10 leads capturados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.isArray(data.recentLeads) && data.recentLeads.length > 0 ? (
              data.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                    <div className="text-xs text-muted-foreground">{lead.source}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.sent_to_kommo ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enviado
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Falha
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">Nenhum lead encontrado</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Logs de Sincronização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Logs de Sincronização
          </CardTitle>
          <CardDescription>Últimas 20 operações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.isArray(data.recentLogs) && data.recentLogs.length > 0 ? (
              data.recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-2 text-sm border-b">
                  <div className="flex items-center gap-2">
                    {log.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium">{log.action}</span>
                    <span className="text-muted-foreground">({log.entity_type})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {log.error_message && (
                      <span className="text-xs text-red-600 max-w-xs truncate">{log.error_message}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">Nenhum log encontrado</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
