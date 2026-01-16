"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SectionBadge } from "./section-badge"
import { submitLead } from "@/lib/actions"
import { getUTMParameters, getBrowserInfo } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer?: Object[]
  }
}

interface NewsletterSignupProps {
  onSubmit?: (data: LeadFormData) => void
  title: string
  description: string
  source: string
  formSlug?: string
  ctaText?: string
  sectionId?: string
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  source: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  page_url?: string
  user_agent?: string
}

export function NewsletterSignup({
  title,
  description,
  source,
  onSubmit,
  formSlug,
  ctaText,
  sectionId = "inscricao",
}: NewsletterSignupProps) {
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

  // Capturar parâmetros UTM quando o componente montar
  useEffect(() => {
    const utmParams = getUTMParameters()
    const browserInfo = getBrowserInfo()
    setFormData((prev) => ({
      ...prev,
      ...utmParams,
      ...browserInfo,
    }))
  }, [])

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
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign,
        })
      }

      const payload = formSlug
        ? {
            ...formData,
            source,
            name: formData.name,
            nome: formData.name,
            email: formData.email,
            phone: formData.phone,
            telefone: formData.phone,
            whatsapp: formData.phone,
          }
        : { ...formData, source }

      let result: { success?: boolean; message?: string; redirect?: string; error?: string } = {}

      if (formSlug) {
        const response = await fetch(`/api/forms/${formSlug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
        result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || result.message || "Erro ao enviar seus dados. Por favor, tente novamente.")
        }
      } else {
        result = await submitLead(payload)
        if (!result.success) {
          setSubmitStatus({
            success: false,
            message: result.message || "Erro ao enviar seus dados. Por favor, tente novamente.",
          })
          return
        }
      }

      setSubmitStatus({
        success: true,
        message: result.message || "Dados enviados com sucesso! Entraremos em contato em breve.",
      })
      // limpa o form
      const utmParams = getUTMParameters()
      const browserInfo = getBrowserInfo()
      setFormData({
        name: "",
        email: "",
        phone: "",
        source: source,
        ...utmParams,
        ...browserInfo,
      })
      // callback da página
      if (onSubmit) {
        onSubmit(formData)
      }
      // redireciona
      const redirectUrl = result.redirect || "/obrigado?source=" + encodeURIComponent(source)
      router.push(redirectUrl)
    } catch {
      setSubmitStatus({
        success: false,
        message: "Erro ao enviar seus dados. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resolvedCta = typeof ctaText === "string" && ctaText.trim() !== "" ? ctaText : "GARANTIR MINHA VAGA AGORA"

  return (
    <section id={sectionId} className="py-20 relative">
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

            {submitStatus.message && !submitStatus.success && (
              <div className="rounded-md bg-red-50 p-4 mb-4" role="alert">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{submitStatus.message}</h3>
                  </div>
                </div>
              </div>
            )}
            {submitStatus.message && submitStatus.success && (
              <div className="rounded-md bg-green-50 p-4 mb-4" role="alert">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">{submitStatus.message}</h3>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                    aria-required="true"
                    aria-label="Nome completo"
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
                    aria-required="true"
                    aria-label="Email"
                    autoComplete="email"
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
                    aria-required="true"
                    aria-label="Telefone"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-4 text-lg cta-hover"
              >
                {isSubmitting ? "Enviando..." : resolvedCta}
              </Button>

              <p className="text-xs text-zinc-400 text-center">
                Ao clicar em &ldquo;{resolvedCta}&rdquo;, você concorda com nossos termos de uso e política de
                privacidade.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
