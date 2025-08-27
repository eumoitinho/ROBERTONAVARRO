"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import EventCTAButton from "@/components/event-cta-button"
import { Button } from "@/components/ui/button"

export default function TestUTMPage() {
  const searchParams = useSearchParams()
  const [currentUrl, setCurrentUrl] = useState("")
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  useEffect(() => {
    // Set current URL
    setCurrentUrl(window.location.href)

    // Get all UTM parameters
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') || ['fbclid', 'gclid', 'ref', 'source'].includes(key)) {
        params[key] = value
      }
    })
    setUtmParams(params)
  }, [searchParams])

  const testLinks = [
    {
      title: "Facebook Ads",
      url: "?utm_source=facebook&utm_medium=paid&utm_campaign=lancamento&utm_content=story"
    },
    {
      title: "Instagram Organic",
      url: "?utm_source=instagram&utm_medium=social&utm_campaign=lancamento&utm_content=feed"
    },
    {
      title: "Google Ads",
      url: "?utm_source=google&utm_medium=cpc&utm_campaign=search&utm_term=coaching+financeiro"
    },
    {
      title: "Email Marketing",
      url: "?utm_source=email&utm_medium=newsletter&utm_campaign=base&utm_content=header"
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400">🧪 Teste de Parâmetros UTM</h1>
        
        {/* Current Status */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Status Atual:</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-zinc-400">URL Atual:</span>{" "}
              <code className="text-yellow-400 bg-zinc-800 px-2 py-1 rounded">{currentUrl}</code>
            </p>
            <div>
              <span className="text-zinc-400">Parâmetros Detectados:</span>
              {Object.keys(utmParams).length > 0 ? (
                <div className="mt-2 space-y-1">
                  {Object.entries(utmParams).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <code className="text-green-400">{key}</code>:{" "}
                      <code className="text-yellow-400">{value}</code>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-400 text-sm mt-2">Nenhum parâmetro UTM detectado</p>
              )}
            </div>
          </div>
        </div>

        {/* Test Links */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Links de Teste Rápido:</h2>
          <div className="grid grid-cols-2 gap-4">
            {testLinks.map((link) => (
              <a
                key={link.title}
                href={`/test-utm${link.url}`}
                className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-center transition-colors"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Botões de Teste:</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-zinc-400 mb-2">Segredos da Mente Milionária (Blinket):</h3>
              <EventCTAButton
                eduzzUrl="https://evento.blinket.com.br/segredos-da-mente-milionaria-26-agosto"
                buttonText="TESTAR BLINKET"
                className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold"
                showArrow={true}
              />
            </div>
            
            <div>
              <h3 className="text-sm text-zinc-400 mb-2">Teste Eduzz (quando configurar):</h3>
              <EventCTAButton
                eduzzUrl="https://pay.eduzz.com/teste"
                buttonText="TESTAR EDUZZ"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
                showArrow={true}
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">📋 Instruções:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-300">
            <li>Clique em um dos links de teste acima para adicionar UTMs à URL</li>
            <li>Verifique se os parâmetros aparecem em "Status Atual"</li>
            <li>Abra o Console do navegador (F12)</li>
            <li>Clique em um dos botões de teste</li>
            <li>Observe os logs no console mostrando os UTMs capturados</li>
            <li>Verifique a URL final que foi aberta na nova aba</li>
          </ol>
          
          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded">
            <p className="text-sm text-yellow-400">
              ⚠️ <strong>Importante:</strong> Os logs de debug aparecem no Console do navegador.
              Pressione F12 e vá na aba "Console" para ver os detalhes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}