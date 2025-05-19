"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QRCodeScanner } from "@/components/qrcode-scanner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, QrCode } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckInPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState<any[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string>("")
  const [ticketCode, setTicketCode] = useState("")
  const [loading, setLoading] = useState(true)
  const [checkingIn, setCheckingIn] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) {
          throw new Error("Falha ao carregar eventos")
        }
        const data = await response.json()
        setEvents(data)

        // Selecionar o primeiro evento por padrão se existir
        if (data.length > 0) {
          setSelectedEventId(data[0].id.toString())
        }

        setLoading(false)
      } catch (error) {
        console.error("Erro ao buscar eventos:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de eventos.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchEvents()
  }, [toast])

  const handleEventChange = (value: string) => {
    setSelectedEventId(value)
  }

  const handleManualCheckIn = async () => {
    if (!ticketCode.trim()) {
      toast({
        title: "Código vazio",
        description: "Por favor, insira um código de ticket válido.",
        variant: "destructive",
      })
      return
    }

    setCheckingIn(true)

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketCode: ticketCode.trim(),
          eventId: selectedEventId ? Number.parseInt(selectedEventId) : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer check-in")
      }

      toast({
        title: "Check-in realizado com sucesso!",
        description: `${data.name} para o evento ${data.event_name}`,
      })

      setTicketCode("")
    } catch (error) {
      console.error("Erro ao fazer check-in:", error)
      toast({
        title: "Erro no check-in",
        description: error instanceof Error ? error.message : "Erro desconhecido ao processar check-in",
        variant: "destructive",
      })
    } finally {
      setCheckingIn(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Check-in de Participantes</CardTitle>
            <CardDescription>
              Faça o check-in dos participantes usando o código do ticket ou escaneando o QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Selecione um evento</label>
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={selectedEventId} onValueChange={handleEventChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {selectedEventId ? (
              <Tabs defaultValue="scanner" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scanner">
                    <QrCode className="mr-2 h-4 w-4" />
                    Scanner QR Code
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    <Search className="mr-2 h-4 w-4" />
                    Busca Manual
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="scanner" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Aponte a câmera para o QR code do ticket para fazer o check-in automaticamente.
                    </p>
                    <QRCodeScanner
                      onScan={(code) => {
                        // O componente QRCodeScanner já faz o check-in
                      }}
                      eventId={Number.parseInt(selectedEventId)}
                      events={events}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="manual" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Digite o código do ticket para fazer o check-in manualmente.
                    </p>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Digite o código do ticket"
                        value={ticketCode}
                        onChange={(e) => setTicketCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleManualCheckIn}
                        disabled={checkingIn || !ticketCode.trim()}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        {checkingIn ? "Processando..." : "Check-in"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {events.length > 0 ? "Selecione um evento para fazer check-in" : "Nenhum evento encontrado"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
