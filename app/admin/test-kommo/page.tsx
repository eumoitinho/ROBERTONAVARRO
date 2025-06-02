"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

interface TestResult {
  success: boolean
  message: string
  data?: any
}

interface EnvCheck {
  name: string
  value: string | undefined
  required: boolean
  status: "ok" | "missing" | "warning"
}

export default function TestKommoPage() {
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({})
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  // Verificar variáveis de ambiente
  const envChecks: EnvCheck[] = [
    {
      name: "KOMMO_SUBDOMAIN",
      value: process.env.NEXT_PUBLIC_KOMMO_SUBDOMAIN,
      required: true,
      status: process.env.NEXT_PUBLIC_KOMMO_SUBDOMAIN ? "ok" : "missing",
    },
    {
      name: "KOMMO_ACCESS_TOKEN",
      value: process.env.NEXT_PUBLIC_KOMMO_ACCESS_TOKEN ? "***configurado***" : undefined,
      required: true,
      status: process.env.NEXT_PUBLIC_KOMMO_ACCESS_TOKEN ? "ok" : "missing",
    },
    {
      name: "KOMMO_PHONE_FIELD_ID",
      value: process.env.NEXT_PUBLIC_KOMMO_PHONE_FIELD_ID,
      required: true,
      status: process.env.NEXT_PUBLIC_KOMMO_PHONE_FIELD_ID ? "ok" : "missing",
    },
    {
      name: "KOMMO_EMAIL_FIELD_ID",
      value: process.env.NEXT_PUBLIC_KOMMO_EMAIL_FIELD_ID,
      required: true,
      status: process.env.NEXT_PUBLIC_KOMMO_EMAIL_FIELD_ID ? "ok" : "missing",
    },
    {
      name: "KOMMO_SOURCE_FIELD_ID",
      value: process.env.NEXT_PUBLIC_KOMMO_SOURCE_FIELD_ID,
      required: true,
      status: process.env.NEXT_PUBLIC_KOMMO_SOURCE_FIELD_ID ? "ok" : "missing",
    },
    {
      name: "KOMMO_LEADS_PIPELINE_ID",
      value: process.env.NEXT_PUBLIC_KOMMO_LEADS_PIPELINE_ID,
      required: true,
      status: process.env.NEXT_PUBLIC_KOMMO_LEADS_PIPELINE_ID ? "ok" : "missing",
    },
  ]

  const runTest = async (testName: string, endpoint: string) => {
    setIsLoading((prev) => ({ ...prev, [testName]: true }))

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      setTestResults((prev) => ({
        ...prev,
        [testName]: {
          success: response.ok && result.success,
          message: result.message || "Teste executado",
          data: result.data,
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [testName]: {
          success: false,
          message: error instanceof Error ? error.message : "Erro desconhecido",
        },
      }))
    } finally {
      setIsLoading((prev) => ({ ...prev, [testName]: false }))
    }
  }

  const getStatusIcon = (status: "ok" | "missing" | "warning") => {
    switch (status) {
      case "ok":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "missing":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: "ok" | "missing" | "warning") => {
    switch (status) {
      case "ok":
        return (
          <Badge variant="default" className="bg-green-500">
            OK
          </Badge>
        )
      case "missing":
        return <Badge variant="destructive">Faltando</Badge>
      case "warning":
        return <Badge variant="secondary">Atenção</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teste de Integração Kommo</h1>
          <p className="text-muted-foreground">Verifique e teste sua integração com o Kommo CRM</p>
        </div>
      </div>

      {/* Verificação de Variáveis de Ambiente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Variáveis de Ambiente
          </CardTitle>
          <CardDescription>Verificação das configurações necessárias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {envChecks.map((check) => (
              <div key={check.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <p className="font-medium">{check.name}</p>
                    <p className="text-sm text-muted-foreground">{check.value || "Não configurado"}</p>
                  </div>
                </div>
                {getStatusBadge(check.status)}
              </div>
            ))}
          </div>

          {envChecks.some((check) => check.status === "missing") && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Algumas variáveis de ambiente estão faltando. Consulte o arquivo{" "}
                <code className="bg-muted px-1 rounded">KOMMO_INTEGRATION_GUIDE.md</code> para configuração.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* URLs de Configuração */}
      <Card>
        <CardHeader>
          <CardTitle>URLs para Configurar no Kommo</CardTitle>
          <CardDescription>Use estas URLs ao criar a integração no painel do Kommo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">URL de Redirecionamento:</p>
              <code className="text-sm">{window.location.origin}/obrigado</code>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">URL do Webhook:</p>
              <code className="text-sm">{window.location.origin}/api/webhook-kommo</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testes de Integração */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Teste de Conexão */}
        <Card>
          <CardHeader>
            <CardTitle>Teste de Conexão</CardTitle>
            <CardDescription>Verifica se a conexão com o Kommo está funcionando</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => runTest("connection", "/api/kommo/test-connection")}
              disabled={isLoading.connection}
              className="w-full"
            >
              {isLoading.connection && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Testar Conexão
            </Button>

            {testResults.connection && (
              <Alert className={testResults.connection.success ? "border-green-500" : "border-red-500"}>
                {testResults.connection.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription>{testResults.connection.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Teste de Lead */}
        <Card>
          <CardHeader>
            <CardTitle>Criar Lead de Teste</CardTitle>
            <CardDescription>Cria um lead de teste no Kommo para verificar a integração</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => runTest("lead", "/api/test-kommo")} disabled={isLoading.lead} className="w-full">
              {isLoading.lead && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Criar Lead de Teste
            </Button>

            {testResults.lead && (
              <Alert className={testResults.lead.success ? "border-green-500" : "border-red-500"}>
                {testResults.lead.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription>
                  {testResults.lead.message}
                  {testResults.lead.data && (
                    <div className="mt-2">
                      <code className="text-xs bg-muted p-2 rounded block">
                        {JSON.stringify(testResults.lead.data, null, 2)}
                      </code>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Listar Campos */}
        <Card>
          <CardHeader>
            <CardTitle>Campos Personalizados</CardTitle>
            <CardDescription>Lista os campos personalizados disponíveis no Kommo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => runTest("fields", "/api/kommo/fields")}
              disabled={isLoading.fields}
              className="w-full"
            >
              {isLoading.fields && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Listar Campos
            </Button>

            {testResults.fields && (
              <Alert className={testResults.fields.success ? "border-green-500" : "border-red-500"}>
                {testResults.fields.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription>
                  {testResults.fields.message}
                  {testResults.fields.data && (
                    <div className="mt-2 max-h-40 overflow-y-auto">
                      <code className="text-xs bg-muted p-2 rounded block">
                        {JSON.stringify(testResults.fields.data, null, 2)}
                      </code>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Listar Pipelines */}
        <Card>
          <CardHeader>
            <CardTitle>Pipelines</CardTitle>
            <CardDescription>Lista os pipelines disponíveis no Kommo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => runTest("pipelines", "/api/kommo/pipelines")}
              disabled={isLoading.pipelines}
              className="w-full"
            >
              {isLoading.pipelines && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Listar Pipelines
            </Button>

            {testResults.pipelines && (
              <Alert className={testResults.pipelines.success ? "border-green-500" : "border-red-500"}>
                {testResults.pipelines.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription>
                  {testResults.pipelines.message}
                  {testResults.pipelines.data && (
                    <div className="mt-2 max-h-40 overflow-y-auto">
                      <code className="text-xs bg-muted p-2 rounded block">
                        {JSON.stringify(testResults.pipelines.data, null, 2)}
                      </code>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instruções */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>1. ✅ Configure todas as variáveis de ambiente necessárias</p>
            <p>2. ✅ Teste a conexão com o Kommo</p>
            <p>3. ✅ Crie um lead de teste para verificar se está funcionando</p>
            <p>4. ✅ Configure o webhook no painel do Kommo (opcional)</p>
            <p>5. ✅ Teste os formulários do site em produção</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
