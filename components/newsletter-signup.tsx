"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Bell, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsletterSignupProps {
  className?: string
  variant?: "default" | "compact" | "hero"
  title?: string
  description?: string
}

export function NewsletterSignup({ className, variant = "default", title, description }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !name) {
      setStatus("error")
      setMessage("Por favor, preencha todos os campos.")
      return
    }

    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Cadastro realizado com sucesso! Você receberá notificações sobre nossos próximos eventos.")
        setEmail("")
        setName("")
      } else {
        setStatus("error")
        setMessage(data.error || "Erro ao realizar cadastro. Tente novamente.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Erro ao realizar cadastro. Verifique sua conexão e tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-3 sm:p-4 w-full max-w-[90%] sm:max-w-xs mx-auto",
          className
        )}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
          <h3 className="text-xs sm:text-sm font-semibold text-yellow-400">Próximos Eventos</h3>
        </div>
        <p className="text-[10px] sm:text-xs text-zinc-300 mb-2 sm:mb-3">Seja o primeiro a saber sobre nossos próximos eventos</p>

        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-400 text-[10px] sm:text-xs">
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Cadastro realizado!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-[10px] sm:text-xs h-7 sm:h-8"
              disabled={isLoading}
            />
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-[10px] sm:text-xs h-7 sm:h-8"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold text-[10px] sm:text-xs h-7 sm:h-8"
            >
              {isLoading ? <Loader2 className="h-3 w-3 sm:h-3 sm:w-3 animate-spin" /> : "Cadastrar"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <div className="flex items-start gap-2 text-red-400 text-[10px] sm:text-xs mt-2">
            <AlertCircle className="h-3 w-3 sm:h-3 sm:w-3 mt-0.5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </div>
    )
  }

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "relative overflow-hidden w-full max-w-[95%] sm:max-w-lg md:max-w-2xl mx-auto mt-10 pb-10 px-2 sm:px-0",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-600/10 rounded-3xl blur-3xl -z-10"></div>
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>

          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 mb-3 sm:mb-4">
              <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-yellow-300">PRÓXIMOS EVENTOS</span>
            </div>

            <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
              {title || (
                <>
                  Seja o primeiro a saber sobre nossos{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                    próximos eventos
                  </span>
                </>
              )}
            </h2>

            <p className="text-zinc-300 max-w-[90%] sm:max-w-md md:max-w-2xl mx-auto text-[10px] sm:text-sm md:text-base">
              {description ||
                "Cadastre-se em nossa newsletter e receba notificações exclusivas sobre datas, locais e promoções especiais dos nossos eventos transformadores."}
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-green-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-400 mb-2">Cadastro Realizado!</h3>
              <p className="text-zinc-300 text-[10px] sm:text-sm md:text-base">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-[90%] sm:max-w-xs md:max-w-md mx-auto space-y-2 sm:space-y-3 md:space-y-4">
              <div>
                <Label htmlFor="newsletter-name" className="text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2 block">
                  Nome Completo
                </Label>
                <Input
                  id="newsletter-name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 text-[10px] sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="newsletter-email" className="text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2 block">
                  Email
                </Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Digite seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 text-[10px] sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-sm md:text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Quero Receber Notificações
                  </>
                )}
              </Button>
            </form>
          )}

          {status === "error" && (
            <div className="flex items-start gap-2 text-red-400 text-[10px] sm:text-xs md:text-sm mt-3 sm:mt-4 max-w-[90%] sm:max-w-xs md:max-w-md mx-auto">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div
      className={cn(
        "bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-3 sm:p-4 md:p-6 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300 w-full max-w-[90%] sm:max-w-sm md:max-w-md mx-auto",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>

      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-1.5 sm:p-2 bg-yellow-500/20 rounded-lg">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-yellow-400">Próximos Eventos</h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400">Fique por dentro das novidades</p>
        </div>
      </div>

      <p className="text-zinc-300 mb-3 sm:mb-4 md:mb-6 text-[10px] sm:text-sm md:text-base">
        {description ||
          "Cadastre-se para receber notificações sobre nossos próximos eventos e seja o primeiro a garantir sua vaga."}
      </p>

      {status === "success" ? (
        <div className="text-center py-4 sm:py-6">
          <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 text-green-400 mx-auto mb-2 sm:mb-3" />
          <h4 className="text-sm sm:text-base md:text-lg font-bold text-green-400 mb-2">Sucesso!</h4>
          <p className="text-zinc-300 text-[10px] sm:text-sm md:text-base">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
          <div>
            <Label htmlFor="name" className="text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2 block">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 text-[10px] sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-[10px] sm:text-xs md:text-sm font-medium mb-1 sm:mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus:border-yellow-500 focus:ring-yellow-500 text-[10px] sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-sm md:text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Cadastrar
              </>
            )}
          </Button>
        </form>
      )}

      {status === "error" && (
        <div className="flex items-start gap-2 text-red-400 text-[10px] sm:text-xs md:text-sm mt-3 sm:mt-4">
          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}