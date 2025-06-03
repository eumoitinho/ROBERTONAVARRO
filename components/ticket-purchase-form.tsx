"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CreditCard, Landmark, QrCode, Check } from "lucide-react"

// Interface para os tipos de ingressos
interface TicketType {
  id: number
  name: string
  price: number
  benefits: string[]
}

// Definindo os tipos de ingressos
const ticketTypes: TicketType[] = [
  {
    id: 2745132,
    name: "Ingresso Especial",
    price: 9.9,
    benefits: ["Experiência completa", "Material digital", "Certificado de participação"],
  },
  {
    id: 2745133,
    name: "Ingresso VIP",
    price: 49.9,
    benefits: [
      "Perguntas e respostas com Roberto Navarro",
      "Assentos mais próximos ao palco",
      "Experiência premium",
      "Compre 1, leve 2",
    ],
  },
]

// Esquema do formulário
const formSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string().min(10, { message: "O telefone deve ter pelo menos 10 dígitos." }),
  document: z.string().optional(),
  paymentMethod: z.enum(["credit_card", "boleto", "pix"]),
  ticketType: z.enum(["2745132", "2745133"]), // IDs como strings
})

interface TicketPurchaseFormProps {
  eventId: number
  eventName: string
}

export function TicketPurchaseForm({ eventId, eventName }: TicketPurchaseFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<TicketType>(ticketTypes[0])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      document: "",
      paymentMethod: "credit_card",
      ticketType: "2745132", // Padrão: Ingresso Especial
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const requestData = {
        eventId,
        productId: Number.parseInt(values.ticketType),
        customer: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          document: values.document || undefined,
        },
        paymentMethod: values.paymentMethod,
      }

      let response = await fetch("/api/tickets/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        response = await fetch("/api/register-ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        })
      }

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = "Erro ao processar compra"
        try {
          if (errorText) {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.error || errorData.message || errorMessage
          }
        } catch {
          errorMessage = errorText || `Erro: ${response.status}`
        }
        throw new Error(errorMessage)
      }

      const responseText = await response.text()
      if (!responseText) {
        setSuccessMessage("Inscrição realizada com sucesso!")
        setTimeout(() => router.push(`/inscricao/confirmacao`), 2000)
        return
      }

      const data = JSON.parse(responseText)
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl)
      } else if (data.ticketCode) {
        setSuccessMessage(`Inscrição realizada com sucesso! Seu código de ingresso é: ${data.ticketCode}`)
        setTimeout(() => router.push(`/inscricao/confirmacao?ticket=${data.ticketCode}`), 2000)
      } else if (data.success) {
        setSuccessMessage("Inscrição realizada com sucesso!")
        setTimeout(() => router.push(`/inscricao/confirmacao`), 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar sua compra")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (successMessage) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 shadow-lg border-yellow-500/30 bg-zinc-900/80">
        <CardHeader>
          <CardTitle className="text-green-500">Sucesso!</CardTitle>
          <CardDescription className="text-zinc-400">{successMessage}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-500/10 border-green-500/50">
            <AlertTitle>Redirecionando...</AlertTitle>
            <AlertDescription>Você será redirecionado em instantes.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (paymentUrl) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 shadow-lg border-yellow-500/30 bg-zinc-900/80">
        <CardHeader>
          <CardTitle className="text-yellow-500">Finalizar Pagamento</CardTitle>
          <CardDescription className="text-zinc-400">Conclua sua compra abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden rounded-lg border border-zinc-700">
            <iframe
              src={paymentUrl}
              title="Finalizar Pagamento"
              width="100%"
              height="500px"
              frameBorder="0"
              allow="payment"
              className="bg-white"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => setPaymentUrl(null)}
            className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
          >
            Voltar
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-yellow-500/30 bg-zinc-900/80 backdrop-blur-sm">
      <CardHeader className="bg-yellow-50/10 rounded-t-xl p-6">
        <CardTitle className="text-2xl font-bold text-yellow-500">Comprar Ingresso</CardTitle>
        <CardDescription className="text-zinc-400">{eventName}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Seleção de Tipo de Ingresso */}
            <FormField
              control={form.control}
              name="ticketType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-white">Escolha seu Ingresso</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        const selected = ticketTypes.find((t) => t.id.toString() === value)
                        if (selected) setSelectedTicket(selected)
                      }}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {ticketTypes.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`bg-zinc-800/50 border rounded-xl p-4 cursor-pointer hover:border-yellow-500/50 transition-all duration-300 ${
                            field.value === ticket.id.toString() ? "border-yellow-500/50 shadow-lg" : "border-zinc-700/50"
                          }`}
                        >
                          <RadioGroupItem value={ticket.id.toString()} id={ticket.id.toString()} className="hidden" />
                          <label htmlFor={ticket.id.toString()} className="cursor-pointer block">
                            <h3 className="text-lg font-bold text-yellow-400">{ticket.name}</h3>
                            <p className="text-zinc-400 text-xl">R$ {ticket.price.toFixed(2)}</p>
                            <ul className="mt-2 space-y-1">
                              {ticket.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center text-zinc-300 text-sm">
                                  <Check className="h-4 w-4 text-yellow-400 mr-2" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Informações do Cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder-zinc-400 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder-zinc-400 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-400">Confirmação será enviada para este email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Telefone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder-zinc-400 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      CPF <span className="text-xs text-zinc-400">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000.000.000-00"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder-zinc-400 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Método de Pagamento */}
            <Card className="bg-zinc-800/50 border-zinc-700/50">
              <CardHeader>
                <CardTitle className="text-base text-yellow-500">Forma de Pagamento</CardTitle>
                <CardDescription className="text-zinc-400">Escolha como deseja pagar</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          {[
                            { value: "credit_card", label: "Cartão de Crédito", icon: CreditCard },
                            { value: "boleto", label: "Boleto Bancário", icon: Landmark },
                            { value: "pix", label: "PIX", icon: QrCode },
                          ].map((method) => (
                            <div
                              key={method.value}
                              className={`bg-zinc-900/50 border rounded-xl p-4 cursor-pointer hover:border-yellow-500/50 transition-all duration-300 ${
                                field.value === method.value ? "border-yellow-500/50" : "border-zinc-800/50"
                              }`}
                            >
                              <RadioGroupItem value={method.value} id={method.value} className="hidden" />
                              <label htmlFor={method.value} className="cursor-pointer flex flex-col items-center">
                                <method.icon className="h-8 w-8 text-yellow-500 mb-2" />
                                <span className="text-zinc-300">{method.label}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col md:flex-row md:justify-between items-center border-t border-zinc-700/50 pt-4 gap-4">
                <div className="w-full md:w-auto text-center md:text-left">
                  <p className="text-sm text-zinc-400">Valor Total:</p>
                  <p className="text-2xl font-bold text-yellow-500">R$ {selectedTicket.price.toFixed(2)}</p>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-8 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Finalizar Compra"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}