"use server"

// URL do webhook do Kommo CRM via WebConnect
const KOMMO_WEBHOOK_URL =
  "https://data.widgets.wearekwid.com/api/webhook/34323419/d06a4f8eeb692a9d94eb7e6b7be9273d2d28e300b793b4fc77440af834dd7dde"

export interface LeadData {
  name: string
  email: string
  phone: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  page_url?: string
  user_agent?: string
}

export async function submitLead(data: LeadData) {
  try {
    // Preparar dados para o Kommo seguindo o formato do WebConnect
    const leadData = {
      // Campos obrigatórios
      name: data.name,
      email: data.email,
      phone: data.phone,

      // Fonte do lead
      source: data.source || "Website",

      // Parâmetros UTM (se disponíveis)
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_term: data.utm_term,
      utm_content: data.utm_content,

      // Dados adicionais
      created_at: new Date().toISOString(),
      page_url: data.page_url || "",
      user_agent: data.user_agent || "",
    }

    // Enviar dados para o webhook do Kommo
    const response = await fetch(KOMMO_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(leadData),
    })

    if (!response.ok) {
      throw new Error(`Erro ao enviar lead para Kommo: ${response.status} - ${response.statusText}`)
    }

    const result = await response.json()

    return {
      success: true,
      message: "Lead enviado com sucesso para o Kommo!",
      data: result,
    }
  } catch (error) {
    console.error("Erro ao enviar lead para Kommo:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao enviar lead",
    }
  }
}

// Função para buscar leads (mantida para compatibilidade, mas não funcional com Kommo)
export async function getLeads() {
  return {
    success: false,
    message: "Busca de leads não disponível com integração Kommo",
    leads: [],
  }
}
