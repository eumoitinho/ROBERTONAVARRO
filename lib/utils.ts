import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para capturar parâmetros UTM da URL
export function getUTMParameters() {
  if (typeof window === "undefined") {
    return {}
  }

  const urlParams = new URLSearchParams(window.location.search)

  return {
    utm_source: urlParams.get("utm_source") || undefined,
    utm_medium: urlParams.get("utm_medium") || undefined,
    utm_campaign: urlParams.get("utm_campaign") || undefined,
    utm_term: urlParams.get("utm_term") || undefined,
    utm_content: urlParams.get("utm_content") || undefined,
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
