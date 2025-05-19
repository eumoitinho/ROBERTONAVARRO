"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ticketTemplates } from "@/lib/ticket-templates"
import { Loader2, Save } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do evento deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().optional(),
  location: z.string().optional(),
  event_date: z.string().optional(),
  image_url: z
    .string()
    .url({
      message: "Por favor, insira uma URL válida para a imagem.",
    })
    .optional()
    .or(z.literal("")),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Por favor, insira uma cor hexadecimal válida (ex: #FF0000).",
  }),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Por favor, insira uma cor hexadecimal válida (ex: #FF0000).",
  }),
  logo_url: z
    .string()
    .url({
      message: "Por favor, insira uma URL válida para o logo.",
    })
    .optional()
    .or(z.literal("")),
  ticket_template: z.string(),
})

interface EventSettingsFormProps {
  eventId: number
  event?: any
}

export function EventSettingsForm({ eventId, event }: EventSettingsFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name || "",
      description: event?.description || "",
      location: event?.location || "",
      event_date: event?.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : "",
      image_url: event?.image_url || "",
      primary_color: event?.primary_color || "#F59E0B", // Âmbar por padrão
      secondary_color: event?.secondary_color || "#92400E", // Âmbar escuro por padrão
      logo_url: event?.logo_url || "",
      ticket_template: event?.ticket_template || "default",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/events/${eventId}/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Falha ao atualizar as configurações do evento")
      }

      toast({
        title: "Configurações salvas",
        description: "As configurações do evento foram atualizadas com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações do evento.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="geral">Informações Gerais</TabsTrigger>
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local</FormLabel>
                  <FormControl>
                    <Input placeholder="Local do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="event_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data e Hora</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="aparencia" className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                  </FormControl>
                  <FormDescription>URL da imagem principal do evento</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Logo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/logo.png" {...field} />
                  </FormControl>
                  <FormDescription>URL do logo do evento (opcional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="primary_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor Primária</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                    </div>
                    <FormDescription>Cor principal do evento (formato hex)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondary_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor Secundária</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                    </div>
                    <FormDescription>Cor secundária do evento (formato hex)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="ticket_template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template do Ticket</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(ticketTemplates).map(([key, template]) => (
                        <SelectItem key={key} value={key}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Escolha o estilo visual dos tickets para este evento</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="mt-4">
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium mb-2">Visualização do Ticket</h3>
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white p-4 rounded-t-md">
                  <p className="font-bold text-center">{form.watch("name") || "Nome do Evento"}</p>
                </div>
                <div className="border border-t-0 rounded-b-md p-4 bg-gradient-to-b from-amber-50 to-white">
                  <div className="w-32 h-32 mx-auto bg-white border-2 border-amber-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-xs text-gray-400">QR Code</span>
                  </div>
                  <p className="text-center font-bold">Nome do Participante</p>
                  <p className="text-center text-sm text-amber-700">Código: ABC123</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
