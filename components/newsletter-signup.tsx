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

interface NewsletterSignupProps {
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

export function NewsletterSignup({ title, description, source, onSubmit }: NewsletterSignupProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
          form_source: source,
        })
      }

      // Enviar para o servidor (agora inclui Kommo + Google Sheets)
      const result = await submitLead(formData)

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Dados enviados com sucesso! Entraremos em contato em breve.",
        })

        // Push evento de conversão para GTM
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "conversion",
            conversion_type: "lead_submission",
            form_source: source,
            user_email: formData.email,
          })
        }

        // limpa o form
        setFormData({ name: "", email: "", phone: "", source: source })
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
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
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

            {submitStatus.success === false && submitStatus.message && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{submitStatus.message}</h3>
                  </div>
                </div>
              </div>
            )}
            {submitStatus.success === true && submitStatus.message && (
              <div className="rounded-md bg-green-50 p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">{submitStatus.message}</h3>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white text-left">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white text-left">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg cta-hover"
              >
                {isSubmitting ? "Enviando..." : "GARANTIR MINHA VAGA AGORA"}
              </Button>

              <p className="text-xs text-zinc-400 text-center">
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
