"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, TestTube, Zap } from "lucide-react"

interface TestResult {
  success: boolean
  message: string
  account?: {
    name: string
    subdomain: string
    country: string
  }
  lead?: any
  error?: string
}

export default function KommoSimplesPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testType, setTestType] = useState<"connection" | "lead" | null>(null)

  const testConnection = async () => {
    setIsLoading(true)
    setTestType("connection")
    setTestResult(null)

    try {
      const response = await fetch("/api/kommo/test-simple")
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: "Erro ao testar conexão",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setIsLoading(false)
      setTestType(null)
    }
  }

  const testCreateLead = async () => {
    setIsLoading(true)
    setTestType("lead")
    setTestResult(null)

    try {
      const response = await fetch("/api/kommo/test-simple", {
        method: "POST",
      })
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: "Erro ao criar lead de teste",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setIsLoading(false)
      setTestType(null)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Kommo - Integração Simples</h1>
          <p className="text-muted-foreground">Teste sua integração com Token de Longa Duração</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Configurações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Configuração Atual
            </CardTitle>
            <CardDescription>Dados da sua integração no Kommo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Subdomínio:</span>
                <Badge variant="outline">financeirocoachfinanceirocom</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">ID da Integração:</span>
                <Badge variant="outline">a9660545-00df-44ad-a2b5-cf20eada5105</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pipeline Principal:</span>
                <Badge variant="outline">10749175</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pipeline Eventos:</span>
                <Badge variant="outline">10756363</Badge>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Tudo configurado!</strong> Você só precisa gerar o Token de Longa Duração no Kommo e adicionar
                na variável de ambiente.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Testes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-blue-600" />
              Testes da Integração
            </CardTitle>
            <CardDescription>Verifique se tudo está funcionando</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button onClick={testConnection} disabled={isLoading} variant="outline" className="w-full justify-start">
                {isLoading && testType === "connection" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Testar Conexão
              </Button>

              <Button onClick={testCreateLead} disabled={isLoading} variant="outline" className="w-full justify-start">
                {isLoading && testType === "lead" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 h-4 w-4" />
                )}
                Criar Lead de Teste
              </Button>
            </div>

            {testResult && (
              <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                {testResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium">{testResult.message}</p>
                    {testResult.account && (
                      <div className="text-sm">
                        <p>
                          <strong>Conta:</strong> {testResult.account.name}
                        </p>
                        <p>
                          <strong>País:</strong> {testResult.account.country}
                        </p>
                      </div>
                    )}
                    {testResult.lead && (
                      <div className="text-sm">
                        <p>
                          <strong>Lead ID:</strong> {testResult.lead.id}
                        </p>
                        <p>
                          <strong>Nome:</strong> {testResult.lead.name}
                        </p>
                      </div>
                    )}
                    {testResult.error && (
                      <div className="text-sm text-red-600">
                        <p>
                          <strong>Erro:</strong> {testResult.error}
                        </p>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instruções */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Como Configurar</CardTitle>
          <CardDescription>Passos simples para finalizar a integração</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Gerar Token de Longa Duração</h4>
              <p className="text-sm text-muted-foreground">
                No Kommo, clique em <strong>"Gerar token de longa duração"</strong> na sua integração.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Adicionar ao .env.local</h4>
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                KOMMO_LONG_LIVED_TOKEN="seu_token_aqui"
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Testar</h4>
              <p className="text-sm text-muted-foreground">
                Use os botões acima para testar a conexão e criar um lead de teste.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">4. Pronto! 🎉</h4>
              <p className="text-sm text-muted-foreground">
                Todos os formulários do site já estão configurados para enviar leads para o Kommo automaticamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
