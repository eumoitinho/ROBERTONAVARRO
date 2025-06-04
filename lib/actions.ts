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

export async function submitLead(data: LeadData) {
  try {
    const kommoWebhookUrl =
      "https://data.widgets.wearekwid.com/api/webhook/34323419/d06a4f8eeb692a9d94eb7e6b7be9273d2d28e300b793b4fc77440af834dd7dde"

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

    console.log("Enviando dados para Kommo:", payload)
    const kommoRes = await fetch(kommoWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!kommoRes.ok) {
      const errText = await kommoRes.text()
      console.error("Erro na resposta do Kommo:", kommoRes.status, errText)
      throw new Error(`Kommo HTTP ${kommoRes.status}`)
    }
    const kommoResult = await kommoRes.json()
    console.log("Resposta do Kommo:", kommoResult)

    // Também envia para a Planilha Google via Apps Script
    try {
      console.log("Enviando dados para Google Sheets:", payload)
      const sheetRes = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!sheetRes.ok) {
        const sheetErr = await sheetRes.text()
        console.error("Erro ao enviar para Google Sheets:", sheetRes.status, sheetErr)
      } else {
        console.log("Dados gravados na planilha com sucesso")
      }
    } catch (sheetError) {
      console.error("Exception ao enviar para Google Sheets:", sheetError)
    }

    return {
      success: true,
      message: "Lead enviado com sucesso!",
      data: kommoResult,
    }
  } catch (error) {
    console.error("Erro ao enviar lead:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}