"use client";

import React from "react";

interface Props {
  message?: string;
  children?: React.ReactNode;
  className?: string;
}

// Minimal safe WhatsApp button to avoid build-time syntax issues.
export default function WhatsAppButton({ message, children, className }: Props) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
  const href = `https://wa.me/${number}${encoded}`;

  return (
    <a
      className={className || "inline-block bg-green-600 text-white px-4 py-2 rounded mt-3"}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children || "Abrir conversa no WhatsApp"}
    </a>
  );
}
        <div className="bg-white text-black p-4 rounded-lg shadow-lg mb-4 max-w-xs animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm">Precisa de ajuda?</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>

          {submitStatus.message && (
            <div
              className={`p-2 mb-4 text-sm rounded ${
                submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {!submitStatus.success ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="wpp-name" className="sr-only">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="wpp-name"
                  name="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  required
                  aria-required="true"
                  aria-label="Nome completo"
                  className="w-full px-3 py-2 bg-zinc-100 border rounded text-sm"
                />
              </div>
              <div>
                <label htmlFor="wpp-email" className="sr-only">
                *** End Patch
                </label>
