"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { submitLead, LeadData } from "@/lib/actions";
import { getUTMParameters, getBrowserInfo } from "@/lib/utils";

interface WhatsappButtonProps {
  className?: string;
}

export default function WhatsappButton({ className }: WhatsappButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});

  const [formData, setFormData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    source: "WhatsApp Chat",
    utm_source: undefined,
    utm_medium: undefined,
    utm_campaign: undefined,
    utm_term: undefined,
    utm_content: undefined,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const utm = getUTMParameters();
      const info = getBrowserInfo();
      setFormData(f => ({ ...f, ...utm, ...info }));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // GTM dataLayer
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "complete_formulario",
          form_name: "whatsapp_chat",
          user_email: formData.email,
          user_phone: formData.phone,
          user_name: formData.name,
          form_source: formData.source,
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign,
        });
      }

      // envia para Kommo e Sheets
      const result = await submitLead(formData);
      if (result.success) {
        setSubmitStatus({ success: true, message: "Dados enviados! Agora fale com nossa equipe." });
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      setSubmitStatus({ success: false, message: err.message || "Erro ao enviar dados." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const msg = encodeURIComponent(`Olá ${formData.name}, vamos conversar?`);
    window.open(`https://wa.me/5512997659057?text=${msg}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-xs animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-lg">Fale com nossa equipe</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-zinc-100 border rounded"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-zinc-100 border rounded"
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-zinc-100 border rounded"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
              >
                {isSubmitting ? "Enviando..." : "Enviar e Continuar"}
              </button>
            </form>
          ) : (
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
            >
              Falar no WhatsApp
            </button>
          )}
        </div>
      )}
      <button
        onClick={() => setIsOpen(o => !o)}
        className={`bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition ${
          isOpen ? "" : "animate-bounce"
        } ${className || ""}`}
      >
        {isOpen ? <X size={24} /> : <svg /* ícone WhatsApp */ />}
      </button>
    </div>
  );
}