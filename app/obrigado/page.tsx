"use client"
// app/obrigado/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo } from "react"

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
      }
    } as URLSearchParams
  }, [searchParams])

  // Aceita tanto os nomes antigos quanto os nomes vindos da Eduzz
  const productId = params.get("product_id") || params.get("produto")
  const value = params.get("value") || params.get("valor")
  const transactionId = params.get("transaction_id")
  const email = params.get("email") || params.get("email_comprador")
  const name = params.get("name") || params.get("nome_comprador")
  const eventName = params.get("event_name")
  const ticketName = params.get("ticket_name")

  // Só dispara o evento se vier de uma compra (tem todos os parâmetros obrigatórios)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.dataLayer &&
      productId &&
      value &&
      transactionId
    ) {
      window.dataLayer.push({
        event: "purchase_completed",
        ecommerce: {
          currency: "BRL",
          transaction_id: transactionId,
          value: Number(value),
          items: [
            {
              item_id: productId,
              item_name: ticketName || "Ingresso",
              price: Number(value),
              quantity: 1,
            },
          ],
        },
      })
      window.dataLayer.push({
        event: "sendEvent",
        category: "ecommerce",
        eventGA4: "purchase_completed",
        content_type: "product",
      })
    }
  }, [productId, value, transactionId, ticketName])

  const source = typeof searchParams?.source === "string" ? searchParams.source : "site"
  const message = encodeURIComponent(`Olá! Acabei de me inscrever no ${source} e gostaria de saber mais sobre.`)

  // Mensagem personalizada se vier de compra
  const isCompra = !!(productId && value && transactionId)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-yellow-900 text-white p-4">
      <div className="bg-zinc-800/70 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg">
        <svg
          className="w-16 h-16 mx-auto mb-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
          {isCompra ? "Compra realizada com sucesso!" : "Inscrição Recebida!"}
        </h1>
        {isCompra ? (
          <>
            <p className="text-lg text-zinc-300 mb-4">
              Obrigado por sua compra!
            </p>
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
            <p className="text-lg text-zinc-300 mb-8">
              Obrigado! Seus dados foram recebidos com sucesso.
            </p>
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
    </div>
  )
}
