"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SectionBadge } from "./section-badge"
import { submitLead } from "@/lib/actions"
import { useRouter } from "next/navigation"

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer?: any[]
  }
}

interface NewsletterFormacoesProps {
  onSubmit: (data: LeadFormData) => void
  title: string
  description: string
  source: string // Added source prop
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  source: string
}

export function NewsletterFormacoes({ onSubmit, title, description, source }: NewsletterFormacoesProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    source: source,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      // Push to dataLayer for GTM tracking
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "complete_formulario",
          form_name: "newsletter_signup",
          user_email: formData.email,
          user_phone: formData.phone,
          user_name: formData.name,
          form_source: source, // Added source to dataLayer
        })
      }
      // Enviar para o servidor
      const result = await submitLead(formData)

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Dados enviados com sucesso! Entraremos em contato em breve.",
        })
        // limpa o form
        setFormData({ name: "", email: "", phone: "", source: "" })
        // callback da página
        onSubmit(formData)
        // redireciona
        router.push("/obrigado")
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "Erro ao enviar seus dados. Por favor, tente novamente.",
        })
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: "Erro ao enviar seus dados. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="inscricao" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
      <SectionBadge text="INSCRIÇÃO" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {title.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                index === 4 || index === 5 || index === 6
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"
                  : "text-white"
              }
            >
              {word}{" "}
            </span>
          ))}
        </h2>
        <p className="text-lg text-zinc-300 max-w-3xl mx-auto mb-8">{description}</p>
        {/* Registration Form */}
        <div className="max-w-3xl mx-auto mt-20 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">PREENCHA SEUS DADOS</h3>
            <p className="text-zinc-300 text-center mb-8">
              Preencha o formulário abaixo e dê o primeiro passo rumo à sua transformação financeira
            </p>

            <form onSubmit={handleSubmit}>
              {submitStatus.message && !submitStatus.success && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{submitStatus.message}</h3>
                    </div>
                  </div>
                </div>
              )}
              {submitStatus.message && submitStatus.success && (
                <div className="rounded-md bg-green-50 p-4 mb-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">{submitStatus.message}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg cta-hover"
              >
                {isSubmitting ? "Enviando..." : "GARANTIR MINHA VAGA AGORA"}
              </Button>

              <p className="text-xs text-zinc-400 text-center mt-4">
                Ao clicar em "Garantir minha vaga agora", você concorda com nossos termos de uso e política de
                privacidade.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
