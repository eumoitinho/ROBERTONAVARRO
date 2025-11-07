"use server"

export interface LeadData {
  name: string
  email: string
  phone: string
  source: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  page_url?: string
  user_agent?: string
}

// URL do seu Google Apps Script para adicionar na planilha
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx4s6y8Y8RUhqwW1ICXMtG952oe8DbDQGp8ZvK85jRylwlAD6pCBuldkyCuJGWO5-KrzQ/exec"

// Função principal para enviar leads para Google Sheets
export async function submitLead(data: LeadData) {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_term: data.utm_term,
      utm_content: data.utm_content,
      page_url: data.page_url,
      user_agent: data.user_agent,
      created_at: new Date().toISOString(),
    }

    console.log("Enviando dados para Google Sheets:", payload)
    const sheetRes = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    
    if (!sheetRes.ok) {
      const sheetErr = await sheetRes.text()
      console.error("Erro ao enviar para Google Sheets:", sheetRes.status, sheetErr)
      return {
        success: false,
        message: "Erro ao enviar dados para Google Sheets",
      }
    }

    console.log("Dados gravados na planilha com sucesso")
    return {
      success: true,
      message: "Dados enviados com sucesso!",
    }
  } catch (error) {
    console.error("Erro ao enviar lead:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

// Alias para compatibilidade - mantém submitLeadToSheetsOnly funcionando
export async function submitLeadToSheetsOnly(data: LeadData) {
  return submitLead(data)
}