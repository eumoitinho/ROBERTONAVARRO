"use client"

import { useState, useEffect } from "react"
import { X, Calendar, MapPin, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getUTMParams, buildURLWithUTM } from "@/lib/utm-tracker"

interface EventPopupProps {
  isVisible: boolean
  onClose: () => void
}

const events = [
  {
    id: 1,
    title: "SEGREDOS DA MENTE MILIONÁRIA",
    subtitle: "Transforme sua mentalidade e aprenda os segredos dos milionários",
    date: "03 de setembro de 2025",
    time: "13h às 20h",
    location: "Hotel Nacional Inn\nAv. Benedicto Campos, 35 - Jardim do Trevo, Campinas - SP",
    url: "https://evento.blinket.com.br/segredos-da-mente-milionaria-26-agosto",
    benefits: [
      "Mentalidade milionária na prática",
      "Como criar múltiplas fontes de renda",
      "Estratégias de investimento inteligente",
      "Transformação de crenças limitantes"
    ]
  },
  {
    id: 2,
    title: "CRENÇAS DA RIQUEZA",
    subtitle: "Desbloqueie seu potencial e supere crenças limitantes sobre dinheiro",
    date: "03 de setembro de 2025",
    time: "13h às 20h",
    location: "Alameda Araguaia, 751\nAlphaville Industrial, Barueri - SP",
    url: "https://evento.blinket.com.br/crencas-da-riqueza-03-setembro",
    benefits: [
      "Identificar e neutralizar crenças limitantes",
      "Expandir sua mentalidade financeira",
      "Técnicas práticas de transformação mental",
      "Estratégias para destravar seu potencial"
    ]
  }
]

export default function EventPopup({ isVisible, onClose }: EventPopupProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(0)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleInscreverClick = () => {
    // Captura UTMs e adiciona ao link
    const utmParams = getUTMParams()
    const finalUrl = buildURLWithUTM(events[selectedEvent].url, utmParams)
    
    console.log('=== POPUP CLICK ===')
    console.log('UTMs capturados:', utmParams)
    console.log('URL final com UTMs:', finalUrl)
    
    window.open(finalUrl, "_blank")
    handleClose()
  }

  if (!isVisible) return null

  const currentEvent = events[selectedEvent]

  return (
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border border-yellow-500/20 rounded-2xl max-w-2xl w-full p-8 relative transform transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Event Tabs */}
        <div className="flex mb-6 gap-2">
          {events.map((event, index) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(index)}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                selectedEvent === index
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              {event.title.includes('SEGREDOS') ? 'SEGREDOS DA MENTE' : 'CRENÇAS DA RIQUEZA'}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-full py-2 px-4 mb-4">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">PRÓXIMO EVENTO</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {currentEvent.title.includes('SEGREDOS') ? (
              <>SEGREDOS DA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">MENTE MILIONÁRIA</span></>
            ) : (
              <>CRENÇAS DA <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">RIQUEZA</span></>
            )}
          </h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {currentEvent.subtitle}
          </p>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-full p-2 flex-shrink-0">
              <Calendar className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Data</p>
              <p className="text-white font-semibold text-sm">{currentEvent.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-full p-2 flex-shrink-0">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Horário</p>
              <p className="text-white font-semibold text-sm">{currentEvent.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-full p-2 flex-shrink-0">
              <MapPin className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Local</p>
              <p className="text-white font-semibold text-sm whitespace-pre-line">{currentEvent.location}</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-white mb-4">O que você vai aprender:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {currentEvent.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                <p className="text-zinc-300 text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button
            onClick={handleInscreverClick}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            GARANTIR MINHA INSCRIÇÃO
          </Button>
          
          <p className="text-xs text-zinc-500 text-center">
            Vagas limitadas • Não perca esta oportunidade única
          </p>
        </div>

        {/* Roberto Image */}
        <div className="absolute -bottom-4 -right-4 opacity-10">
          <Image
            src="/images/roberto.webp"
            alt="Roberto Navarro"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  )
} 