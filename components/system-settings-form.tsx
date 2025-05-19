"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"

const formSchema = z.object({
  siteName: z.string().min(2, {
    message: "O nome do site deve ter pelo menos 2 caracteres.",
  }),
  siteDescription: z.string().optional(),
  emailSender: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  emailSmtp: z.string().min(1, {
    message: "Por favor, insira o servidor SMTP.",
  }),
  emailPort: z.string().refine((val) => !isNaN(Number(val)), {
    message: "A porta deve ser um número.",
  }),
  emailUsername: z.string().min(1, {
    message: "Por favor, insira o nome de usuário SMTP.",
  }),
  emailPassword: z.string().min(1, {
    message: "Por favor, insira a senha SMTP.",
  }),
  enableEmailNotifications: z.boolean().default(false),
  enableSmsNotifications: z.boolean().default(false),
})

export function SystemSettingsForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "Sistema de Eventos",
      siteDescription: "Plataforma para gerenciamento de eventos e inscrições",
      emailSender: "eventos@exemplo.com",
      emailSmtp: "smtp.exemplo.com",
      emailPort: "587",
      emailUsername: "usuario@exemplo.com",
      emailPassword: "",
      enableEmailNotifications: true,
      enableSmsNotifications: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulação de envio - em um ambiente real, isso seria uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Configurações salvas",
        description: "As configurações do sistema foram atualizadas com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações do sistema.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Configurações Gerais</h3>

          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Site</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do site" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do Site</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descrição do site" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Configurações de Email</h3>

            <FormField
              control={form.control}
              name="enableEmailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mb-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Notificações por Email</FormLabel>
                    <FormDescription>Ativar envio de emails para confirmações e lembretes</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("enableEmailNotifications") && (
              <>
                <FormField
                  control={form.control}
                  name="emailSender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email de Envio</FormLabel>
                      <FormControl>
                        <Input placeholder="noreply@seudominio.com" {...field} />
                      </FormControl>
                      <FormDescription>Email que aparecerá como remetente</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailSmtp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servidor SMTP</FormLabel>
                      <FormControl>
                        <Input placeholder="smtp.seudominio.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emailPort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porta SMTP</FormLabel>
                        <FormControl>
                          <Input placeholder="587" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emailUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuário SMTP</FormLabel>
                        <FormControl>
                          <Input placeholder="usuario@seudominio.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="emailPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha SMTP</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Outras Notificações</h3>

            <FormField
              control={form.control}
              name="enableSmsNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Notificações por SMS</FormLabel>
                    <FormDescription>Ativar envio de SMS para confirmações e lembretes</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

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
