"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitLead } from "@/lib/actions"
import { getUTMParameters, getBrowserInfo } from "@/lib/utils"

interface NewsletterFormacoesProps {
  source?: string
  buttonText?: string
  placeholderName?: string
  placeholderEmail?: string
  placeholderPhone?: string
  className?: string
  buttonClassName?: string
}

export default function NewsletterFormacoes({
  source = "Formações",
  buttonText = "Quero saber mais",
  placeholderName = "Seu nome",
  placeholderEmail = "Seu melhor e-mail",
  placeholderPhone = "Seu WhatsApp",
  className = "",
  buttonClassName = "",
}: NewsletterFormacoesProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Obter parâmetros UTM e informações do navegador
      const utmParams = getUTMParameters()
      const browserInfo = getBrowserInfo()

      const result = await submitLead({
        name,
        email,
        phone,
        source,
        ...utmParams,
        ...browserInfo,
      })

      if (result.success) {
        setName("")
        setEmail("")
        setPhone("")
        setMessage("Inscrição realizada com sucesso!")
      } else {
        setMessage(`Erro: ${result.message}`)
      }
    } catch (error) {
      setMessage("Ocorreu um erro ao processar sua inscrição.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder={placeholderName}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/90"
        />
        <Input
          type="email"
          placeholder={placeholderEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/90"
        />
        <Input
          type="tel"
          placeholder={placeholderPhone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="bg-white/90"
        />
        <Button type="submit" className={`w-full ${buttonClassName}`} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : buttonText}
        </Button>
        {message && (
          <p className={`text-sm ${message.includes("Erro") ? "text-red-500" : "text-green-500"}`}>{message}</p>
        )}
      </form>
    </div>
  )
}
