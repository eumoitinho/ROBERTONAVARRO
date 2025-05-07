"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Mostrar o botão após 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Precisa de ajuda?</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>
          <p className="text-sm mb-3">
            Olá! Estou aqui para tirar suas dúvidas sobre nossas mentorias. Como posso te ajudar hoje?
          </p>
          <a
            href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20mentorias"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white py-2 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
          >
            <Image src="/whatsapp-logo.png" alt="WhatsApp" width={16} height={16} />
            Iniciar conversa
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 ${isOpen ? "rotate-180" : "animate-bounce-slow"}`}
      >
        {isOpen ? <X size={24} /> : <Image src="/whatsapp-logo.png" alt="WhatsApp" width={24} height={24} />}
      </button>
    </div>
  )
}
