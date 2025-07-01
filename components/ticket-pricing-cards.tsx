"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, CreditCard, Landmark, QrCode, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

// Interface for the ticket types
interface TicketType {
  id: number
  name: string
  price: number
  description: string
  benefits: string[]
  featured?: boolean
}

// Esquema do formulário
const formSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string().min(10, { message: "O telefone deve ter pelo menos 10 dígitos." }),
  document: z.string().optional(),
  paymentMethod: z.enum(["credit_card", "boleto", "pix"]),
})

interface TicketPricingCardsProps {
  eventId: number
  eventName: string
  ticketTypes: TicketType[]
}

export function TicketPricingCards({ eventId, eventName, ticketTypes }: TicketPricingCardsProps) {
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const checkoutPanelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      document: "",
      paymentMethod: "credit_card",
    },
  })

  const handleSelectTicket = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const handleCloseCheckout = () => {
    setSelectedTicket(null)
    // Restore body scroll
    document.body.style.overflow = "unset"
  }

  // Handle clicks outside the checkout panel to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && event.target === overlayRef.current) {
        handleCloseCheckout()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseCheckout()
      }
    }

    if (selectedTicket) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      // Cleanup: restore body scroll if component unmounts
      document.body.style.overflow = "unset"
    }
  }, [selectedTicket])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedTicket) return

    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const requestData = {
        eventId,
        productId: selectedTicket.id,
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
      <Card className="w-full max-w-md mx-auto mt-8 shadow-lg border-yellow-500/30 bg-zinc-900/80 backdrop-blur-md rounded-3xl">
        <CardContent className="p-6">
          <Alert className="bg-green-500/10 border-green-500/50 rounded-2xl">
            <AlertTitle className="text-green-500">Sucesso!</AlertTitle>
            <AlertDescription className="text-zinc-300">{successMessage}</AlertDescription>
          </Alert>
          <p className="text-center text-zinc-400 mt-4">Redirecionando...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative">
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {ticketTypes.map((ticket) => (
          <Card
            key={ticket.id}
            className={`bg-zinc-900/30 backdrop-blur-lg border-zinc-700/30 hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden rounded-3xl cursor-pointer group h-full flex flex-col ${
              ticket.featured ? "border-yellow-400/40 shadow-2xl shadow-yellow-500/10 scale-105" : ""
            }`}
            onClick={() => handleSelectTicket(ticket)}
          >
            {ticket.featured && (
              <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                ⭐ Mais Popular
              </div>
            )}
            <CardContent className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{ticket.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{ticket.description}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">R$ {ticket.price.toFixed(2)}</span>
                  <span className="text-sm text-zinc-400 font-normal">/ingresso</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {ticket.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-yellow-400/20 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-yellow-400" />
                    </div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-0">
              <Button
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold rounded-2xl py-4 text-base transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-400/25"
                onClick={() => handleSelectTicket(ticket)}
              >
                Selecionar Ingresso
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Side Checkout Panel */}
      <AnimatePresence>
        {selectedTicket && (
          <>
            <motion.div
              ref={overlayRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
              style={{ zIndex: 9998 }}
            />
            <motion.div
              ref={checkoutPanelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-zinc-900/95 backdrop-blur-xl border-l border-zinc-700/50 overflow-y-auto rounded-l-3xl shadow-2xl"
              style={{ zIndex: 9999 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">Finalizar Compra</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full w-10 h-10"
                    onClick={handleCloseCheckout}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Fechar</span>
                  </Button>
                </div>

                <div className="bg-zinc-800/40 backdrop-blur-md rounded-3xl p-6 mb-8 border border-zinc-700/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-yellow-400">{selectedTicket.name}</h3>
                  </div>
                  <p className="text-zinc-300 mb-4 leading-relaxed">{selectedTicket.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">R$ {selectedTicket.price.toFixed(2)}</span>
                    <span className="text-sm text-zinc-400">por ingresso</span>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/50 rounded-2xl">
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {paymentUrl ? (
                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    <iframe
                      src={paymentUrl}
                      title="Finalizar Pagamento"
                      width="100%"
                      height="500px"
                      frameBorder="0"
                      allow="payment"
                    />
                    <div className="p-4 bg-zinc-800">
                      <Button
                        variant="outline"
                        onClick={() => setPaymentUrl(null)}
                        className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 rounded-xl"
                      >
                        Voltar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Nome completo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Seu nome completo"
                                {...field}
                                className="bg-zinc-800/40 backdrop-blur-sm border-zinc-600/40 text-white placeholder-zinc-400 focus:ring-yellow-400 focus:border-yellow-400 rounded-2xl py-3 px-4"
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
                            <FormLabel className="text-white font-medium">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="seu@email.com"
                                {...field}
                                className="bg-zinc-800/40 backdrop-blur-sm border-zinc-600/40 text-white placeholder-zinc-400 focus:ring-yellow-400 focus:border-yellow-400 rounded-2xl py-3 px-4"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Telefone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(00) 00000-0000"
                                {...field}
                                className="bg-zinc-800/40 backdrop-blur-sm border-zinc-600/40 text-white placeholder-zinc-400 focus:ring-yellow-400 focus:border-yellow-400 rounded-2xl py-3 px-4"
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
                            <FormLabel className="text-white font-medium">
                              CPF <span className="text-xs text-zinc-400">(opcional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="000.000.000-00"
                                {...field}
                                className="bg-zinc-800/40 backdrop-blur-sm border-zinc-600/40 text-white placeholder-zinc-400 focus:ring-yellow-400 focus:border-yellow-400 rounded-2xl py-3 px-4"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h3 className="text-white font-medium text-lg">Forma de Pagamento</h3>
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-3 gap-4"
                                >
                                  {[
                                    { value: "credit_card", label: "Cartão", icon: CreditCard },
                                    { value: "boleto", label: "Boleto", icon: Landmark },
                                    { value: "pix", label: "PIX", icon: QrCode },
                                  ].map((method) => (
                                    <div
                                      key={method.value}
                                      className={`bg-zinc-800/40 backdrop-blur-sm border rounded-2xl p-4 cursor-pointer hover:border-yellow-400/50 transition-all duration-300 ${
                                        field.value === method.value
                                          ? "border-yellow-400/50 bg-yellow-400/10"
                                          : "border-zinc-600/40"
                                      }`}
                                    >
                                      <RadioGroupItem value={method.value} id={method.value} className="hidden" />
                                      <label
                                        htmlFor={method.value}
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                      >
                                        <method.icon className="h-6 w-6 text-yellow-400" />
                                        <span className="text-zinc-300 text-sm font-medium">{method.label}</span>
                                      </label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        id="pre-checkout-button"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          `Finalizar Pagamento - R$ ${selectedTicket.price.toFixed(2)}`
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
