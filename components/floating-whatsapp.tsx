"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface FloatingWhatsAppProps {
  phoneNumber: string
  accountName: string
  statusMessage: string
  chatMessage: string
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber,
  accountName,
  statusMessage,
  chatMessage,
}) => {
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
        <div className="bg-white rounded-lg shadow-lg p-4 mb-2 w-72">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{accountName}</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>
          <h3 className="font-bold mb-1">Precisa de ajuda?</h3>
          <p className="text-sm mb-3">
            {statusMessage}
          </p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(chatMessage)}`}
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

export default FloatingWhatsApp
