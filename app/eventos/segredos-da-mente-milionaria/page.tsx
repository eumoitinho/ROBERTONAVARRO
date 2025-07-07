"use client"

import type React from "react"
import {TicketPricingCards} from "@/components/ticket-pricing-cards"
import { useState, useEffect } from "react"
import { Users, Zap, Brain, Target, Wallet, GraduationCap, MapPin, Calendar } from "lucide-react"
import HeroPages from "@/components/hero-pages"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SiteHeader } from "@/components/header"
import NotableParticipants from "@/components/notable-persons"
import { SectionBadge } from "@/components/section-badge"
import Footerlp from "@/components/footerlp"



export default function SegredosDaMenteMilionaria() {
  // Página fallback: evento indisponível
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-yellow-900 text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">Evento Indisponível</h1>
      <p className="text-lg md:text-2xl text-zinc-200 mb-8 max-w-xl mx-auto">
        Esta página não está mais disponível.<br />
        O evento "Segredos da Mente Milionária" foi removido do ar.
      </p>
      <a href="/" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-8 py-4 text-lg transition-all shadow-lg">Voltar para a Home</a>
    </div>
  )
}

// The code below is unreachable and has been removed to fix the syntax error.
