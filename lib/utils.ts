import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para capturar e persistir parâmetros UTM da URL
export function getUTMParameters() {
  if (typeof window === "undefined") {
    return {}
  }

  const urlParams = new URLSearchParams(window.location.search)
  const storageKey = 'utm_params'
  
  // Capturar UTMs da URL atual
  const currentUtms = {
    utm_source: urlParams.get("utm_source") || null,
    utm_medium: urlParams.get("utm_medium") || null,
    utm_campaign: urlParams.get("utm_campaign") || null,
    utm_term: urlParams.get("utm_term") || null,
    utm_content: urlParams.get("utm_content") || null,
  }
  
  // Se há UTMs na URL, salvar no localStorage
  const hasUtms = Object.values(currentUtms).some(value => value !== null)
  if (hasUtms) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(currentUtms))
      localStorage.setItem('utm_timestamp', Date.now().toString())
    } catch (e) {
      console.warn('Não foi possível salvar UTMs no localStorage:', e)
    }
  }
  
  // Tentar recuperar UTMs salvos (válidos por 30 dias)
  try {
    const savedUtms = localStorage.getItem(storageKey)
    const timestamp = localStorage.getItem('utm_timestamp')
    
    if (savedUtms && timestamp) {
      const age = Date.now() - parseInt(timestamp)
      const thirtyDays = 30 * 24 * 60 * 60 * 1000
      
      if (age < thirtyDays) {
        const parsed = JSON.parse(savedUtms)
        // Se não há UTMs na URL atual, usar os salvos
        if (!hasUtms) {
          return {
            utm_source: parsed.utm_source || undefined,
            utm_medium: parsed.utm_medium || undefined,
            utm_campaign: parsed.utm_campaign || undefined,
            utm_term: parsed.utm_term || undefined,
            utm_content: parsed.utm_content || undefined,
          }
        }
      } else {
        // Limpar UTMs expirados
        localStorage.removeItem(storageKey)
        localStorage.removeItem('utm_timestamp')
      }
    }
  } catch (e) {
    console.warn('Erro ao recuperar UTMs do localStorage:', e)
  }

  return {
    utm_source: currentUtms.utm_source || undefined,
    utm_medium: currentUtms.utm_medium || undefined,
    utm_campaign: currentUtms.utm_campaign || undefined,
    utm_term: currentUtms.utm_term || undefined,
    utm_content: currentUtms.utm_content || undefined,
  }
}

// Função para capturar informações do navegador
export function getBrowserInfo() {
  if (typeof window === "undefined") {
    return {}
  }

  return {
    page_url: window.location.href,
    user_agent: navigator.userAgent,
  }
}

// Função para formatar data
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
