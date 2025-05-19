"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RegistrationsList } from "@/components/registrations-list"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

export default function InscricoesPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState<any[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string>("")
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Inscrições</CardTitle>
            <CardDescription>Visualize e gerencie as inscrições para seus eventos</CardDescription>
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
              <RegistrationsList eventId={Number.parseInt(selectedEventId)} events={events} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                {events.length > 0 ? "Selecione um evento para ver as inscrições" : "Nenhum evento encontrado"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
