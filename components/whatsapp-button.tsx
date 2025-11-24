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
