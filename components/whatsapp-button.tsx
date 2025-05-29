"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface WhatsappButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function WhatsappButton({ message, className, children }: WhatsappButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Mostrar o botão após 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;
  const handleWhatsAppClick = () => {
    // Track WhatsApp click in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'complete_whatsapp',
        content_type: 'whatsapp',
        category: 'contato'
      });
    }
    
    // Original WhatsApp functionality
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre os eventos do Roberto Navarro.`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const whatsappUrl = `https://wa.me/5512997659057?text=${encodeURIComponent(message || "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white text-black p-4 rounded-lg shadow-lg mb-4 max-w-xs animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm">Precisa de ajuda?</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
          <p className="text-xs mb-3">
            Olá! Estou aqui para tirar suas dúvidas sobre nossas mentorias. Como posso te ajudar hoje?
          </p>
          <a
            href=""
            onClick={handleWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative inline-block px-4 py-2 text-white font-semibold rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300 ${className}`}
          >
            <span className="absolute inset-0 bg-green-600 rounded-lg -z-10"></span>
            {children || "Fale conosco no WhatsApp"}
          </a>
          
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isHovered ? "scale-110" : ""
        } ${isOpen ? "" : "animate-bounce-slow"}`}
        style={{
          boxShadow: isHovered
            ? "0 0 20px rgba(74, 222, 128, 0.6), 0 10px 20px -10px rgba(74, 222, 128, 0.8)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  );

}