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

// Configurações do LeadLovers
const LEADLOVERS_WEBHOOK_URL = "https://llapi.leadlovers.com/webapi/lead?token=87FEADEAD3CB4AF8BAD1FFFFC047B140"
const LEADLOVERS_AUTH_KEY = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IldlYkFwaSIsInN1YiI6IldlYkFwaSIsInJvbGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6Ly93ZWJhcGlsbC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IjFhOTE4YzA3NmE1YjQwN2Q5MmJkMjQ0YTUyYjZmYjc0IiwiZXhwIjoxNjA1NDQxMzM4LCJuYmYiOjE0NzU4NDEzMzh9.YIIpOycEAVr_xrJPLlEgZ4628pLt8hvWTCtjqPTaWMs"
const LEADLOVERS_MACHINE_CODE = 673989
const LEADLOVERS_SEQUENCE_CODE = 1554588
const LEADLOVERS_LEVEL_CODE = 1
const LEADLOVERS_TAG = 649481

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

    // Envia para o LeadLovers
    try {
      console.log("Enviando dados para LeadLovers:", {
        name: data.name,
        email: data.email,
        phone: data.phone
      })
      
      const leadLoversPayload = {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        MachineCode: LEADLOVERS_MACHINE_CODE,
        EmailSequenceCode: LEADLOVERS_SEQUENCE_CODE,
        SequenceLevelCode: LEADLOVERS_LEVEL_CODE,
        Tag: LEADLOVERS_TAG,
        Score: 0,
        CustomFields: {
          utm_source: data.utm_source || "",
          utm_medium: data.utm_medium || "",
          utm_campaign: data.utm_campaign || "",
          utm_term: data.utm_term || "",
          utm_content: data.utm_content || "",
          page_url: data.page_url || "",
          source: data.source || ""
        }
      }

      const leadLoversRes = await fetch(LEADLOVERS_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": LEADLOVERS_AUTH_KEY,
        },
        body: JSON.stringify(leadLoversPayload),
      })

      if (!leadLoversRes.ok) {
        const leadLoversErr = await leadLoversRes.text()
        console.error("Erro ao enviar para LeadLovers:", leadLoversRes.status, leadLoversErr)
      } else {
        const leadLoversResult = await leadLoversRes.json()
        console.log("Lead enviado para LeadLovers com sucesso:", leadLoversResult)
      }
    } catch (leadLoversError) {
      console.error("Exception ao enviar para LeadLovers:", leadLoversError)
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