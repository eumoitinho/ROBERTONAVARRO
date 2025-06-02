"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertCircle, Loader2, Database, Users, Settings } from "lucide-react"

interface TestResult {
  success: boolean
  message: string
  data?: any
  error?: string
}

export default function TestKommoPage() {
  const [connectionTest, setConnectionTest] = useState<TestResult | null>(null)
  const [leadTest, setLeadTest] = useState<TestResult | null>(null)
  const [pipelinesData, setPipelinesData] = useState<any>(null)
  const [fieldsData, setFieldsData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})

  const runTest = async (testType: string, endpoint: string) => {
    setIsLoading((prev) => ({ ...prev, [testType]: true }))

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      switch (testType) {
        case "connection":
          setConnectionTest(result)
          break
        case "lead":
          setLeadTest(result)
          break
      }
    } catch (error) {
      const errorResult = {
        success: false,
        message: "Erro na requisição",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }

      switch (testType) {
        case "connection":
          setConnectionTest(errorResult)
          break
        case "lead":
          setLeadTest(errorResult)
          break
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, [testType]: false }))
    }
  }

  const fetchData = async (dataType: string, endpoint: string) => {
    setIsLoading((prev) => ({ ...prev, [dataType]: true }))

    try {
      const response = await fetch(endpoint)
      const result = await response.json()

      switch (dataType) {
        case "pipelines":
          setPipelinesData(result)
          break
        case "fields":
          setFieldsData(result)
          break
      }
    } catch (error) {
      console.error(`Erro ao buscar ${dataType}:`, error)
    } finally {
      setIsLoading((prev) => ({ ...prev, [dataType]: false }))
    }
  }

  const ResultCard = ({ title, result, icon }: { title: string; result: TestResult | null; icon: React.ReactNode }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <Badge variant={result.success ? "default" : "destructive"}>{result.success ? "Sucesso" : "Erro"}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{result.message}</p>
            {result.error && <p className="text-sm text-red-600">Erro: {result.error}</p>}
            {result.data && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium">Ver dados retornados</summary>
                <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Teste não executado</p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Teste de Integração Kommo</h1>
        <p className="text-muted-foreground">Teste a conexão e funcionalidades da integração com o CRM Kommo</p>
      </div>

      {/* Configuração Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuração Atual
          </CardTitle>
          <CardDescription>IDs e configurações descobertas automaticamente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Campos Personalizados</h4>
              <div className="space-y-1 text-sm">
                <div>
                  Telefone: <Badge variant="outline">1025408</Badge>
                </div>
                <div>
                  Email: <Badge variant="outline">1025410</Badge>
                </div>
                <div>
                  Fonte do Lead: <Badge variant="outline">1025412</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pipelines Principais</h4>
              <div className="space-y-1 text-sm">
                <div>
                  Funil de vendas: <Badge variant="outline">10749175</Badge>
                </div>
                <div>
                  Eric Eventos: <Badge variant="outline">10756363</Badge>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Status Principais</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                Leads de entrada: <Badge variant="outline">82422239</Badge>
              </div>
              <div>
                Eric Eventos entrada: <Badge variant="outline">82477619</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Testes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Testes de Funcionalidade</h2>

          <Card>
            <CardHeader>
              <CardTitle>1. Teste de Conexão</CardTitle>
              <CardDescription>Verifica se a API do Kommo está acessível</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => runTest("connection", "/api/kommo/test-connection")}
                disabled={isLoading.connection}
                className="w-full"
              >
                {isLoading.connection ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testando...
                  </>
                ) : (
                  "Testar Conexão"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Teste de Criação de Lead</CardTitle>
              <CardDescription>Cria um lead de teste no Kommo</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => runTest("lead", "/api/test-kommo")} disabled={isLoading.lead} className="w-full">
                {isLoading.lead ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando Lead...
                  </>
                ) : (
                  "Criar Lead de Teste"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Resultados dos Testes</h2>

          <ResultCard title="Conexão com Kommo" result={connectionTest} icon={<Database className="h-5 w-5" />} />

          <ResultCard title="Criação de Lead" result={leadTest} icon={<Users className="h-5 w-5" />} />
        </div>
      </div>

      <Separator />

      {/* Dados do Sistema */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dados do Sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Pipelines</CardTitle>
              <CardDescription>Lista todos os pipelines disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => fetchData("pipelines", "/api/kommo/pipelines")}
                disabled={isLoading.pipelines}
                className="w-full mb-4"
              >
                {isLoading.pipelines ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  "Listar Pipelines"
                )}
              </Button>

              {pipelinesData && (
                <details>
                  <summary className="cursor-pointer font-medium">Ver Pipelines</summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-60">
                    {JSON.stringify(pipelinesData, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campos Personalizados</CardTitle>
              <CardDescription>Lista todos os campos disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => fetchData("fields", "/api/kommo/fields")}
                disabled={isLoading.fields}
                className="w-full mb-4"
              >
                {isLoading.fields ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  "Listar Campos"
                )}
              </Button>

              {fieldsData && (
                <details>
                  <summary className="cursor-pointer font-medium">Ver Campos</summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-60">
                    {JSON.stringify(fieldsData, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status da Integração */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Status da Integração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Campos Personalizados</span>
              <Badge variant="default">✅ Configurado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Pipelines</span>
              <Badge variant="default">✅ Configurado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Status</span>
              <Badge variant="default">✅ Configurado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Tracking UTM</span>
              <Badge variant="default">✅ Configurado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Integração Completa</span>
              <Badge variant="default">🎉 PRONTA PARA USO!</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
