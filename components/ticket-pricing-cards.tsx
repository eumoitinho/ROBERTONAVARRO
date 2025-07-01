"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
  eduzzContentId: string // ID do produto na Eduzz para o embed
}

// Esquema do formulário
const formSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string().min(10, { message: "O telefone deve ter pelo menos 10 dígitos." }),
  document: z.string().optional(),
})

interface TicketPricingCardsProps {
  eventId: number
  eventName: string
  ticketTypes: TicketType[]
}

// Declaração de tipos para o Eduzz
declare global {
  interface Window {
    Eduzz: {
      Checkout: {
        init: (config: {
          contentId: string
          target: string
          errorCover?: boolean
          customer?: {
            name?: string
            email?: string
            phone?: string
            document?: string
          }
          onSuccess?: () => void
          onError?: (error: any) => void
        }) => void
      }
    }
    dataLayer?: Object[]
  }
}

export function TicketPricingCards({ eventId, eventName, ticketTypes }: TicketPricingCardsProps) {
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [customerData, setCustomerData] = useState<z.infer<typeof formSchema> | null>(null)
  const router = useRouter()
  const checkoutPanelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eduzzScriptLoaded = useRef(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      document: "",
    },
  })

  const handleSelectTicket = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const handleCloseCheckout = () => {
    setSelectedTicket(null)
    setShowCheckout(false)
    setCustomerData(null)
    // Restore body scroll
    document.body.style.overflow = "unset"
  }

  // Load Eduzz script
  const loadEduzzScript = () => {
    if (eduzzScriptLoaded.current) return Promise.resolve()

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script")
      script.src = "https://cdn.eduzzcdn.com/sun/bridge/bridge.js"
      script.async = true
      script.type = "module"

      script.onload = () => {
        eduzzScriptLoaded.current = true
        resolve()
      }

      script.onerror = () => {
        reject(new Error("Falha ao carregar script da Eduzz"))
      }

      document.head.appendChild(script)
    })
  }

  // Initialize Eduzz checkout with customer data
  const initializeEduzzCheckout = async (contentId: string, customerInfo: z.infer<typeof formSchema>) => {
    try {
      await loadEduzzScript()

      // Wait for Eduzz to be available
      const waitForEduzz = () => {
        return new Promise<void>((resolve) => {
          const checkEduzz = () => {
            if (window.Eduzz && window.Eduzz.Checkout) {
              resolve()
            } else {
              setTimeout(checkEduzz, 100)
            }
          }
          checkEduzz()
        })
      }

      await waitForEduzz()

      // Limpar container anterior
      const container = document.getElementById("eduzz-checkout-container")
      if (container) {
        container.innerHTML = ""
      }

      // Preparar dados do cliente para a Eduzz
      const customerData = {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone.replace(/\D/g, ""), // Remove formatação do telefone
        ...(customerInfo.document && { document: customerInfo.document.replace(/\D/g, "") }),
      }

      console.log("Inicializando checkout da Eduzz com dados:", customerData)

      window.Eduzz.Checkout.init({
        contentId: contentId,
        target: "eduzz-checkout-container",
        errorCover: true,
        customer: customerData, // Passa os dados do cliente para pré-preenchimento
        onSuccess: () => {
          console.log("Compra realizada com sucesso!")

          // Disparar evento de conversão
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "purchase",
              ecommerce: {
                currency: "BRL",
                transaction_id: Date.now().toString(),
                value: selectedTicket?.price || 0,
                items: [
                  {
                    item_id: selectedTicket?.id.toString() || "",
                    item_name: selectedTicket?.name || "",
                    price: selectedTicket?.price || 0,
                    quantity: 1,
                  },
                ],
              },
            })

            // Evento específico para o GTM
            window.dataLayer.push({
              event: "sendEvent",
              category: "ecommerce",
              eventGA4: "purchase",
              content_type: "product",
            })
          }

          setSuccessMessage("Compra realizada com sucesso!")
          setTimeout(() => {
            router.push(
              `/obrigado_pela_compra?product_id=${selectedTicket?.id}&value=${selectedTicket?.price}&transaction_id=${Date.now()}`,
            )
          }, 2000)
        },
        onError: (error) => {
          console.error("Erro no checkout da Eduzz:", error)
          setError("Erro ao processar pagamento: " + (error?.message || "Erro desconhecido"))
        },
      })
    } catch (err) {
      console.error("Erro ao inicializar checkout:", err)
      setError("Erro ao inicializar checkout: " + (err as Error).message)
    }
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
      // Salvar dados do cliente
      setCustomerData(values)

      // Disparar evento de início de checkout
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "begin_checkout",
          ecommerce: {
            currency: "BRL",
            value: selectedTicket.price,
            items: [
              {
                item_id: selectedTicket.id.toString(),
                item_name: selectedTicket.name,
                price: selectedTicket.price,
                quantity: 1,
              },
            ],
          },
        })

        // Evento específico para o GTM
        window.dataLayer.push({
          event: "sendEvent",
          category: "ecommerce",
          eventGA4: "begin_checkout",
          content_type: "product",
        })
      }

      // Disparar clique no botão oculto para trigger do GTM
      const hiddenButton = document.getElementById("chk-finish-payment-button")
      if (hiddenButton) {
        hiddenButton.click()
      }

      console.log("Dados do formulário:", values)
      console.log("Iniciando checkout para:", selectedTicket.name)

      setShowCheckout(true)
      await initializeEduzzCheckout(selectedTicket.eduzzContentId, values)
    } catch (err) {
      console.error("Erro ao processar checkout:", err)
      setError(err instanceof Error ? err.message : "Erro ao processar sua compra")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToForm = () => {
    setShowCheckout(false)
    setCustomerData(null)
    // Limpar container do checkout
    const container = document.getElementById("eduzz-checkout-container")
    if (container) {
      container.innerHTML = ""
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
                  <h2 className="text-2xl font-bold text-white">
                    {showCheckout ? "Finalizar Pagamento" : "Finalizar Compra"}
                  </h2>
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

                  {/* Mostrar dados do cliente quando estiver no checkout */}
                  {showCheckout && customerData && (
                    <div className="mt-4 pt-4 border-t border-zinc-700/50">
                      <p className="text-sm text-zinc-400 mb-2">Dados do cliente:</p>
                      <div className="text-sm text-zinc-300 space-y-1">
                        <p>
                          <strong>Nome:</strong> {customerData.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {customerData.email}
                        </p>
                        <p>
                          <strong>Telefone:</strong> {customerData.phone}
                        </p>
                        {customerData.document && (
                          <p>
                            <strong>CPF:</strong> {customerData.document}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/50 rounded-2xl">
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {showCheckout ? (
                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[500px]">
                    {/* Container customizado para o checkout da Eduzz */}
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Finalize seu Pagamento</h3>
                        <p className="text-gray-600">Seus dados já foram preenchidos automaticamente</p>
                        <p className="text-sm text-gray-500 mt-2">✅ Nome, email e telefone já configurados</p>
                      </div>

                      {/* Container onde o checkout da Eduzz será renderizado */}
                      <div
                        id="eduzz-checkout-container"
                        className="min-h-[400px] w-full"
                        style={
                          {
                            // Estilos customizados para o checkout
                            "--eduzz-primary-color": "#f59e0b",
                            "--eduzz-secondary-color": "#1f2937",
                            "--eduzz-border-radius": "12px",
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    <div className="p-4 bg-zinc-800 border-t">
                      <Button
                        variant="outline"
                        onClick={handleBackToForm}
                        className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 rounded-xl bg-transparent"
                      >
                        ← Voltar aos Dados
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mb-6">
                        <p className="text-blue-400 text-sm">
                          💡 <strong>Dica:</strong> Seus dados serão automaticamente preenchidos no checkout, evitando
                          que você precise digitá-los novamente!
                        </p>
                      </div>

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

                      {/* Botão oculto para trigger do GTM */}
                      <button
                        id="chk-finish-payment-button"
                        type="button"
                        style={{ display: "none" }}
                        aria-hidden="true"
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          `Continuar para Pagamento - R$ ${selectedTicket.price.toFixed(2)}`
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

      {/* CSS customizado para o checkout da Eduzz */}
      <style jsx global>{`
        #eduzz-checkout-container {
          /* Customizações do design do checkout */
        }
        
        #eduzz-checkout-container .eduzz-checkout-form {
          border-radius: 12px !important;
          box-shadow: none !important;
        }
        
        #eduzz-checkout-container .eduzz-button-primary {
          background: linear-gradient(to right, #f59e0b, #d97706) !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
        }
        
        #eduzz-checkout-container .eduzz-input {
          border-radius: 8px !important;
          border: 1px solid #e5e7eb !important;
        }
        
        #eduzz-checkout-container .eduzz-input:focus {
          border-color: #f59e0b !important;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1) !important;
        }

        /* Ocultar campos já preenchidos no checkout da Eduzz */
        #eduzz-checkout-container input[name="customer_name"],
        #eduzz-checkout-container input[name="customer_email"],
        #eduzz-checkout-container input[name="customer_phone"],
        #eduzz-checkout-container input[name="customer_document"] {
          background-color: #f3f4f6 !important;
          border: 2px solid #10b981 !important;
        }

        #eduzz-checkout-container input[name="customer_name"]:before,
        #eduzz-checkout-container input[name="customer_email"]:before,
        #eduzz-checkout-container input[name="customer_phone"]:before {
          content: "✅ ";
          color: #10b981;
        }
      `}</style>
    </div>
  )
}
