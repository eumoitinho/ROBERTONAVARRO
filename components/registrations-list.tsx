"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, RefreshCw, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import type { Event } from "@/lib/db"
import { formatDate } from "@/lib/utils"

interface RegistrationsListProps {
  events?: Event[]
}

export function RegistrationsList({ events = [] }: RegistrationsListProps) {
  const { toast } = useToast()
  const [selectedEvent, setSelectedEvent] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingEvents, setLoadingEvents] = useState<boolean>(events.length === 0)
  const [localEvents, setLocalEvents] = useState<Event[]>(events)

  useEffect(() => {
    if (events.length > 0) {
      setLocalEvents(events)
      setLoadingEvents(false)
    } else {
      fetchEvents()
    }
  }, [events])

  useEffect(() => {
    if (selectedEvent) {
      fetchRegistrations(Number.parseInt(selectedEvent))
    }
  }, [selectedEvent])

  const fetchEvents = async () => {
    setLoadingEvents(true)
    try {
      const response = await fetch("/api/events")
      if (!response.ok) {
        throw new Error("Falha ao carregar eventos")
      }
      const data = await response.json()
      setLocalEvents(data)
    } catch (error) {
      console.error("Erro ao buscar eventos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de eventos",
        variant: "destructive",
      })
    } finally {
      setLoadingEvents(false)
    }
  }

  const fetchRegistrations = async (eventId: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/events/${eventId}/registrations`)
      if (!response.ok) {
        throw new Error("Falha ao carregar inscrições")
      }
      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      console.error("Erro ao buscar inscrições:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as inscrições",
        variant: "destructive",
      })
      setRegistrations([])
    } finally {
      setLoading(false)
    }
  }

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.phone && reg.phone.includes(searchTerm)),
  )

  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) return

    const headers = ["Nome", "Email", "Telefone", "Código do Ticket", "Status", "Data de Inscrição"]
    const csvData = filteredRegistrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phone || "",
      reg.ticket_code,
      reg.attended ? "Compareceu" : "Não compareceu",
      new Date(reg.created_at).toLocaleString("pt-BR"),
    ])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `inscricoes-evento-${selectedEvent}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const refreshRegistrations = () => {
    if (selectedEvent) {
      fetchRegistrations(Number.parseInt(selectedEvent))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Inscrições</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {loadingEvents ? (
              <div className="w-full sm:w-[200px] h-10 bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Selecione um evento" />
                </SelectTrigger>
                <SelectContent>
                  {localEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome, email ou telefone..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button variant="outline" onClick={refreshRegistrations} disabled={!selectedEvent}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </Button>

            <Button variant="outline" onClick={exportToCSV} disabled={filteredRegistrations.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>

          {selectedEvent ? (
            loading ? (
              <div className="space-y-4">
                <div className="h-10 bg-gray-100 animate-pulse rounded-md"></div>
                <div className="h-10 bg-gray-100 animate-pulse rounded-md"></div>
                <div className="h-10 bg-gray-100 animate-pulse rounded-md"></div>
              </div>
            ) : filteredRegistrations.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">{reg.name}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone || "-"}</TableCell>
                        <TableCell>{reg.ticket_code}</TableCell>
                        <TableCell>
                          {reg.attended ? (
                            <Badge className="bg-green-500">Compareceu</Badge>
                          ) : (
                            <Badge variant="outline">Pendente</Badge>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(new Date(reg.created_at))}</TableCell>
                        <TableCell>
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/ticket/${reg.ticket_code}`} target="_blank">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md">
                <p className="text-muted-foreground">Nenhuma inscrição encontrada</p>
              </div>
            )
          ) : (
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">Selecione um evento para ver as inscrições</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
