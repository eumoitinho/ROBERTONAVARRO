"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowRight, ChevronRight } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import MobileMenu from "@/components/mobile-menu"
import Logo from "@/components/logo"
import Footer from "@/components/footer"
import { SiteHeader } from "@/components/header"

export default function TrabalheConosco() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Add keyframe animation for hover effects (same as HomePage)
    const style = document.createElement("style")
    style.innerHTML = `
      .cta-hover {
        transition: all 0.3s ease;
      }
      .cta-hover:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.3);
      }
      .cta-hover-subtle {
        transition: all 0.3s ease;
      }
      .cta-hover-subtle:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 15px -5px rgba(245, 158, 11, 0.2);
      }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
     <SiteHeader
 
  showInicio={true}
/>
<section id="trabalhe-conosco" className="py-12 xs-py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900 to-zinc-950 z-0"></div>
        <div className="container mt-12 mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              FAÇA PARTE DO NOSSO <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">TIME</span>
            </h2>
            <p className="text-zinc-300 max-w-3xl mx-auto">
              Estamos sempre em busca de talentos que compartilham nossa missão de transformar vidas financeiras. Envie
              seu currículo e faça parte dessa jornada.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-3xl p-8 relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium mb-2">
                  Área de Interesse
                </label>
                <select
                  id="position"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Selecione uma área</option>
                  <option value="marketing">Marketing</option>
                  <option value="vendas">Vendas</option>
                  <option value="atendimento">Atendimento ao Cliente</option>
                  <option value="coaching">Coaching</option>
                  <option value="administrativo">Administrativo</option>
                </select>
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium mb-2">
                  Currículo (PDF)
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Conte-nos um pouco sobre você e suas experiências..."
                ></textarea>
              </div>
              <Button className="cta-hover bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold rounded-xl py-3 w-full">
                Enviar Currículo
              </Button>
            </form>
          </div>
        </div>
      </section>

     <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  )
}
