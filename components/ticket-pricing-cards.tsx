"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
  eduzzContentId: string
}

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
          onSuccess?: () => void
          onError?: (error: any) => void
          redirectUrl?: string
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const checkoutPanelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const eduzzScriptLoaded = useRef(false)

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

  // Initialize Eduzz checkout
  const initializeEduzzCheckout = async (contentId: string) => {
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

      // Clear previous container
      const container = document.getElementById("eduzz-checkout-container")
      if (container) {
        container.innerHTML = ""
      }

      window.Eduzz.Checkout.init({
        contentId: contentId,
        target: "eduzz-checkout-container",
        errorCover: true,
        onSuccess: () => {
          console.log("Eduzz onSuccess triggered");
          // Opcional: forçar redirecionamento como fallback
          window.location.href = `https://robertonavarrooficial.com.br/obrigado?transaction_id=${Date.now()}&produto=${contentId}`;
        },
        onError: (error) => {
          console.error("Erro no checkout da Eduzz:", error);
          setError("Erro ao processar pagamento: " + (error?.message || "Erro desconhecido"));
        }
        // Remova ou ajuste: redirectUrl: "https://app.eduzz.com"
      });
    } catch (err) {
      console.error("Erro ao inicializar checkout:", err)
      setError("Erro ao inicializar checkout: " + (err as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelectTicket = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    // Trigger begin_checkout event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "BRL",
          value: ticket.price,
          items: [
            {
              item_id: ticket.id.toString(),
              item_name: ticket.name,
              price: ticket.price,
              quantity: 1,
            },
          ],
        },
      })

      window.dataLayer.push({
        event: "sendEvent",
        category: "ecommerce",
        eventGA4: "begin_checkout",
        content_type: "product",
      })
    }

    // Initialize checkout
    initializeEduzzCheckout(ticket.eduzzContentId)
    document.body.style.overflow = "hidden"
  }

  const handleCloseCheckout = () => {
    setSelectedTicket(null)
    setIsSubmitting(false)
    setError(null)
    setSuccessMessage(null)
    const container = document.getElementById("eduzz-checkout-container")
    if (container) {
      container.innerHTML = ""
    }
    document.body.style.overflow = "unset"
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
                disabled={isSubmitting}
              >
                {isSubmitting && selectedTicket?.id === ticket.id ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  "Selecionar Ingresso"
                )}
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
                <div className="flex justify-between items-center mb-8 relative">
                  <h2 className="text-2xl font-bold text-white">Finalizar Pagamento</h2>
                    <Button
    variant="ghost"
    size="icon"
    // Ajuste no posicionamento:
    className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full w-10 h-10 absolute top-0 right-0 md:static md:ml-auto"
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

                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[500px]">
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">Finalize seu Pagamento</h3>
                      <p className="text-gray-600">Preencha os dados para continuar</p>
                    </div>
                    <div
                      id="eduzz-checkout-container"
                      className="min-h-[400px] w-full"
                      style={
                        {
                          "--eduzz-primary-color": "#f59e0b",
                          "--eduzz-secondary-color": "#1f2937",
                          "--eduzz-border-radius": "12px",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
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
      `}</style>
    </div>
  )
}