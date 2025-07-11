"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo } from "react"
import { CheckCircle } from "lucide-react"

interface ObrigadoPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ObrigadoPage({ searchParams }: ObrigadoPageProps) {
  // Pega os dados da query string (SSR + fallback para client)
  const params = useMemo(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search)
    }
    // SSR fallback para Next.js
    return {
      get: (key: string) => {
        const value = searchParams?.[key]
        if (Array.isArray(value)) return value[0]
        return value
      },
    } as URLSearchParams
  }, [searchParams])

  // Aceita vários nomes de parâmetros da Eduzz para maior compatibilidade
  const productId = params.get("product_id") || params.get("produto")
  const value = params.get("value") || params.get("valor")
  const transactionId =
    params.get("transaction_id") || params.get("trans_cod") || params.get("sale_id") || params.get("invoice_id")
  const email = params.get("email") || params.get("email_comprador")
  const name = params.get("name") || params.get("nome_comprador")
  const eventName = params.get("event_name")
  const ticketName = params.get("ticket_name")

  // Validação dos parâmetros obrigatórios para considerar uma compra válida
  const isValidPurchase = !!(productId && value && transactionId && !isNaN(Number(value)))

  useEffect(() => {
    // Log para depuração no console do navegador
    console.log("Parâmetros da página de Obrigado:", {
      url: window.location.href,
      productId,
      value,
      transactionId,
      isValidPurchase,
    })

    if (typeof window !== "undefined" && window.dataLayer && isValidPurchase) {
      console.log("Disparando evento 'purchase_completed' para o GTM.")
      window.dataLayer.push({
        event: "purchase_completed",
        ecommerce: {
          currency: "BRL",
          transaction_id: transactionId,
          value: Number(value),
          items: [
            {
              item_id: productId,
              item_name: ticketName || eventName || "Ingresso",
              price: Number(value),
              quantity: 1,
            },
          ],
        },
      })
      console.log("Evento 'purchase_completed' disparado com transaction_id:", transactionId)
    } else {
      console.log("Condições para disparar o evento 'purchase_completed' não foram atendidas.")
    }
  }, [productId, value, transactionId, ticketName, eventName, isValidPurchase])

  // Configuração da mensagem para o WhatsApp
  const source = typeof searchParams?.source === "string" ? searchParams.source : "site"
  const message = encodeURIComponent(`Olá! Acabei de me inscrever no ${source} e gostaria de saber mais sobre.`)

  const isCompra = isValidPurchase

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-yellow-900 text-white p-4">
      <div className="bg-zinc-800/70 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg">
        <CheckCircle className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
          {isCompra ? "Compra realizada com sucesso!" : "Inscrição Recebida!"}
        </h1>
        {isCompra ? (
          <>
            <p className="text-lg text-zinc-300 mb-4">Obrigado por sua compra!</p>
            {eventName && (
              <p className="text-md text-zinc-400 mb-2">
                Evento: <span className="font-semibold text-yellow-300">{eventName}</span>
              </p>
            )}
            {ticketName && (
              <p className="text-md text-zinc-400 mb-2">
                Ingresso: <span className="font-semibold text-yellow-300">{ticketName}</span>
              </p>
            )}
            <p className="text-md text-zinc-400 mb-2">
              Valor pago: <span className="font-semibold text-yellow-300">R$ {Number(value).toFixed(2)}</span>
            </p>
            {name && (
              <p className="text-md text-zinc-400 mb-2">
                Nome: <span className="font-semibold text-yellow-300">{name}</span>
              </p>
            )}
            {email && (
              <p className="text-md text-zinc-400 mb-2">
                O ingresso será enviado para: <span className="font-semibold text-yellow-300">{email}</span>
              </p>
            )}
            <p className="text-md text-zinc-400 mb-6">
              Número da transação: <span className="font-mono text-yellow-200">{transactionId}</span>
            </p>
            <p className="text-md text-zinc-400 mb-8">
              Em breve você receberá um e-mail com o seu ingresso e mais informações sobre o evento.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-zinc-300 mb-8">Obrigado! Seus dados foram recebidos com sucesso.</p>
            <p className="text-md text-zinc-400 mb-8">
              Se preferir, entre em contato agora mesmo com a nossa equipe para mais informações.
            </p>
          </>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg text-lg"
          >
            <Link href={`https://wa.me/5512997659057?text=${message}`}>Falar com a equipe</Link>
          </Button>
        </div>
      </div>
      {/* Script de integração Eduzz Thank You com configuração dinâmica */}
      {isValidPurchase && (
        <script
          src="https://cdn.eduzzcdn.com/sun/thankyou/thankyou.js"
          data-transaction-id={transactionId}
          data-product-id={productId}
          data-value={value}
        ></script>
      )}
    </div>
  )
}
