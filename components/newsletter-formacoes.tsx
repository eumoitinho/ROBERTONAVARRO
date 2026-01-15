"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SectionBadge } from "./section-badge"
import { submitLead } from "@/lib/actions"
import { cn, getUTMParameters, getBrowserInfo } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Calendar, MapPin } from "lucide-react"

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer?: Object[]
  }
}

interface NewsletterFormacoesProps {
  onSubmit?: (data: LeadFormData) => void
  title: string
  description: string
  source: string
  formSlug?: string
  sectionId?: string
  ctaText?: string
  accent?: "yellow" | "red"
  eventDate?: string
  eventTime?: string
  eventLocation?: string
}

type Accent = "yellow" | "red"

type AccentStyles = {
  highlightGradient: string
  focusRing: string
  buttonGradient: string
  buttonText: string
  buttonShadow: string
  cardBorder: string
  cardHover: string
  radialOverlay: string
  headingAccent: string
  accentText: string
}

const accentStyles: Record<Accent, AccentStyles> = {
  yellow: {
    highlightGradient: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500",
    focusRing: "focus:ring-yellow-500 focus:ring-offset-0",
    buttonGradient: "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700",
    buttonText: "text-black",
    buttonShadow: "shadow-[0_18px_40px_-18px_rgba(234,179,8,0.55)]",
    cardBorder: "border-zinc-800/50",
    cardHover: "hover:border-yellow-400/30",
    radialOverlay: "bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.18)_0%,_rgba(12,10,9,0)_62%)]",
    headingAccent: "text-yellow-400",
    accentText: "text-yellow-300",
  },
  red: {
    highlightGradient: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600",
    focusRing: "focus:ring-red-500 focus:ring-offset-0",
    buttonGradient: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    buttonText: "text-white",
    buttonShadow: "shadow-[0_18px_40px_-18px_rgba(239,68,68,0.65)]",
    cardBorder: "border-red-500/15",
    cardHover: "hover:border-red-500/40",
    radialOverlay: "bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.22)_0%,_rgba(12,10,9,0)_60%)]",
    headingAccent: "text-red-400",
    accentText: "text-red-300",
  },
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

export function NewsletterFormacoes({
  onSubmit,
  title,
  description,
  source,
  formSlug,
  sectionId = "inscricao",
  ctaText,
  accent = "yellow",
  eventDate,
  eventTime,
  eventLocation,
}: NewsletterFormacoesProps) {
  const router = useRouter()
  const styles = accentStyles[accent]
  const titleWords = title.split(" ").filter(Boolean)
  const highlightStartIndex = Math.max(0, titleWords.length - 3)
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
      // callback da página (se fornecido)
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

  return (
    <section id={sectionId} className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
        <div className={cn("absolute inset-0 opacity-70", styles.radialOverlay)} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-10" />
      </div>

      <div className="relative z-10">
        <SectionBadge
          text="INSCRIÇÃO"
          className={cn(
            "bg-zinc-900/60 border-zinc-700/60 text-zinc-100",
            accent === "red" ? "from-red-500/30 to-red-600/30" : "from-yellow-500/25 to-amber-500/25",
          )}
        />

        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              {titleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={cn(
                    "transition-colors duration-300",
                    index >= highlightStartIndex ? styles.highlightGradient : "text-white",
                  )}
                >
                  {word}{" "}
                </span>
              ))}
            </h2>
            <p className="mt-4 text-lg text-zinc-300 md:text-xl">{description}</p>

            {/* Seção de Data e Localização */}
            {(eventDate || eventTime || eventLocation) && (
              <div className="mt-12 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                  {(eventDate || eventTime) && (
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "backdrop-blur-sm rounded-full p-4 flex-shrink-0",
                          accent === "red" ? "bg-red-500/10" : "bg-yellow-400/10",
                        )}
                      >
                        <Calendar
                          className={cn("h-7 w-7", accent === "red" ? "text-red-400" : "text-yellow-400")}
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">Data e Horário</h4>
                        <p className="text-zinc-300 text-lg">
                          {eventDate}
                          {eventDate && eventTime && ", "}
                          {eventTime}
                        </p>
                      </div>
                    </div>
                  )}
                  {(eventDate || eventTime) && eventLocation && (
                    <div className="hidden md:block w-px h-16 bg-zinc-700/30"></div>
                  )}
                  {eventLocation && (
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "backdrop-blur-sm rounded-full p-4 flex-shrink-0",
                          accent === "red" ? "bg-red-500/10" : "bg-yellow-400/10",
                        )}
                      >
                        <MapPin className={cn("h-7 w-7", accent === "red" ? "text-red-400" : "text-yellow-400")} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">Local</h4>
                        <p className="text-zinc-300 text-lg">{eventLocation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className={cn(
              "relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-3xl border bg-zinc-900/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_45px_-20px_rgba(0,0,0,0.45)]",
              styles.cardBorder,
              styles.cardHover,
            )}
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-40">
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04)_0%,transparent_65%)]" />
            </div>

            <div className="relative">
              <h3 className={cn("text-2xl font-semibold text-center", styles.headingAccent)}>PREENCHA SEUS DADOS</h3>
              <p className="mt-4 text-center text-sm text-zinc-400">
                Preencha o formulário abaixo e dê o primeiro passo rumo à sua transformação financeira
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left" noValidate>
                {submitStatus.message && !submitStatus.success && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300" role="alert">
                    {submitStatus.message}
                  </div>
                )}
                {submitStatus.message && submitStatus.success && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300" role="alert">
                    {submitStatus.message}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className={cn(
                        "w-full rounded-xl border bg-zinc-900/70 px-4 py-3 text-white/90 placeholder:text-zinc-500 transition-colors duration-300 focus:outline-none focus:ring-2",
                        styles.focusRing,
                        accent === "red" ? "border-red-500/20 hover:border-red-500/40" : "border-yellow-400/20 hover:border-yellow-400/30",
                      )}
                      placeholder="Seu nome completo"
                      required
                      aria-required="true"
                      aria-label="Nome completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={cn(
                        "w-full rounded-xl border bg-zinc-900/70 px-4 py-3 text-white/90 placeholder:text-zinc-500 transition-colors duration-300 focus:outline-none focus:ring-2",
                        styles.focusRing,
                        accent === "red" ? "border-red-500/20 hover:border-red-500/40" : "border-yellow-400/20 hover:border-yellow-400/30",
                      )}
                      placeholder="seu@email.com"
                      required
                      aria-required="true"
                      aria-label="Email"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className={cn(
                        "w-full rounded-xl border bg-zinc-900/70 px-4 py-3 text-white/90 placeholder:text-zinc-500 transition-colors duration-300 focus:outline-none focus:ring-2",
                        styles.focusRing,
                        accent === "red" ? "border-red-500/20 hover:border-red-500/40" : "border-yellow-400/20 hover:border-yellow-400/30",
                      )}
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
                  className={cn(
                    "cta-hover group relative w-full overflow-hidden rounded-2xl py-4 text-lg font-semibold transition-all duration-300",
                    styles.buttonGradient,
                    styles.buttonText,
                    styles.buttonShadow,
                  )}
                >
                  <span className="relative z-10">
                    {isSubmitting
                      ? "Enviando..."
                      : typeof ctaText === "string" && ctaText.trim() !== ""
                        ? ctaText
                        : "GARANTIR MINHA VAGA AGORA"}
                  </span>
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-40">
                    <div className="absolute inset-y-0 left-1/2 h-full w-2/3 -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />
                  </span>
                </Button>

                <p className={cn("text-center text-xs", styles.accentText)}>
                  Ao clicar em &ldquo;
                  {typeof ctaText === "string" && ctaText.trim() !== "" ? ctaText : "Garantir minha vaga agora"}
                  &rdquo;, você concorda com nossos termos de uso e política de privacidade.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
