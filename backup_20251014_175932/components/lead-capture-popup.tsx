"use client"

import { useState, useEffect } from "react"
import { X, Mail, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LeadCapturePopupProps {
  isVisible: boolean
  onClose: () => void
  title?: string
  subtitle?: string
}

export default function LeadCapturePopup({ 
  isVisible, 
  onClose, 
  title = "🔥 Não Perca Esta Oportunidade!",
  subtitle = "Receba conteúdos exclusivos e seja o primeiro a saber das novidades" 
}: LeadCapturePopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Aqui você pode integrar com a API do LeadLovers ou outro sistema
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
          setFormData({ name: "", email: "", phone: "" })
        }, 2000)
      }
    } catch (error) {
      console.error('Erro ao enviar lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6 relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {title}
              </h3>
              <p className="text-zinc-400 text-sm">
                {subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-zinc-300">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-zinc-300">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-zinc-300">
                  WhatsApp
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
              >
                {isSubmitting ? "Enviando..." : "QUERO RECEBER CONTEÚDOS EXCLUSIVOS"}
              </Button>
            </form>

            <p className="text-xs text-zinc-500 text-center mt-4">
              Seus dados estão seguros. Não enviamos spam.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              🎉 Cadastro Realizado!
            </h3>
            <p className="text-zinc-400">
              Em breve você receberá conteúdos exclusivos no seu e-mail.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}