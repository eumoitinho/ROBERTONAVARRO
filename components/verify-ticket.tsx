"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2, Home, RefreshCcw } from "lucide-react"
import type { Registration } from "@/lib/db"

interface VerifyTicketProps {
  code: string
  registration: Registration | null
  error?: string
}

export function VerifyTicket({ code, registration, error }: VerifyTicketProps) {
  const [checking, setChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleCheckIn = async () => {
    if (!registration) return

    setChecking(true)
    setCheckResult(null)

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketCode: code }),
      })

      const data = await response.json()

      if (response.ok) {
        setCheckResult({
          success: true,
          message: "Check-in realizado com sucesso!",
        })
      } else {
        setCheckResult({
          success: false,
          message: data.error || "Erro ao realizar check-in",
        })
      }
    } catch (error) {
      setCheckResult({
        success: false,
        message: "Erro ao processar a solicitação",
      })
    } finally {
      setChecking(false)
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Verificação de Ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {registration ? (
          <>
            <div className="space-y-2">
              <p>
                <strong>Código:</strong> {registration.ticket_code}
              </p>
              <p>
                <strong>Nome:</strong> {registration.name}
              </p>
              <p>
                <strong>Email:</strong> {registration.email}
              </p>
              <p>
                <strong>Evento:</strong> {registration.event_name || "N/A"}
              </p>
              {registration.event_date && (
                <p>
                  <strong>Data do evento:</strong> {new Date(registration.event_date).toLocaleDateString("pt-BR")}
                </p>
              )}
              <p>
                <strong>Status:</strong> {registration.attended ? "Já realizou check-in" : "Pendente de check-in"}
              </p>
              {registration.attended_at && (
                <p>
                  <strong>Data do check-in:</strong> {new Date(registration.attended_at).toLocaleString("pt-BR")}
                </p>
              )}
            </div>

            {!registration.attended && (
              <Button className="w-full" onClick={handleCheckIn} disabled={checking}>
                {checking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Realizar Check-in"
                )}
              </Button>
            )}

            {checkResult && (
              <Alert
                variant={checkResult.success ? "default" : "destructive"}
                className={checkResult.success ? "bg-green-50 border-green-200" : ""}
              >
                {checkResult.success ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>{checkResult.success ? "Sucesso!" : "Erro"}</AlertTitle>
                <AlertDescription>{checkResult.message}</AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Informações de ticket inválidas</AlertTitle>
              <AlertDescription>
                Não foi possível encontrar as informações do seu ticket.
                {error && <div className="mt-2 text-sm opacity-80">Detalhes: {error}</div>}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2 mt-4">
              <Button onClick={handleRefresh} variant="outline" disabled={isRefreshing}>
                {isRefreshing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Tentar novamente
                  </>
                )}
              </Button>

              <Button asChild variant="default" className="mt-2">
                <Link href="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para a página inicial
                </Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
