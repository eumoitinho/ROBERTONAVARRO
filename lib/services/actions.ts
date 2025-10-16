"use server"

import { getActiveIntegrations, getKommoWebhookUrl } from '@/sanity/lib/integrations-api'

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

// FALLBACK: URL do seu Google Apps Script (usado se não houver configuração no Sanity)
const FALLBACK_GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx4s6y8Y8RUhqwW1ICXMtG952oe8DbDQGp8ZvK85jRylwlAD6pCBuldkyCuJGWO5-KrzQ/exec"

// FALLBACK: Configurações do LeadLovers (usadas se não houver configuração no Sanity)
const FALLBACK_LEADLOVERS_CONFIG = {
  webhookUrl: "https://llapi.leadlovers.com/webapi/lead?token=87FEADEAD3CB4AF8BAD1FFFFC047B140",
  authKey: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IldlYkFwaSIsInN1YiI6IldlYkFwaSIsInJvbGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6Ly93ZWJhcGlsbC5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IjFhOTE4YzA3NmE1YjQwN2Q5MmJkMjQ0YTUyYjZmYjc0IiwiZXhwIjoxNjA1NDQxMzM4LCJuYmYiOjE0NzU4NDEzMzh9.YIIpOycEAVr_xrJPLlEgZ4628pLt8hvWTCtjqPTaWMs",
  machineCode: 673989,
  sequenceCode: 1554588,
  levelCode: 1,
  tag: 649481
}

// FALLBACK: Mapeamento de webhooks por evento/página (usado se não houver configuração no Sanity)
const FALLBACK_WEBHOOK_URLS: Record<string, string> = {
  // Energia do Dinheiro
  "energia-do-dinheiro": "https://data.widgets.wearekwid.com/api/webhook/34323419/10bb731833c0cc2e49ec0c08a84f795bce797dade58f1dec712c864bb5fb17f9",
  "Energia do Dinheiro": "https://data.widgets.wearekwid.com/api/webhook/34323419/10bb731833c0cc2e49ec0c08a84f795bce797dade58f1dec712c864bb5fb17f9",
  
  // Mentor Milionário
  "mentor-milionario": "https://data.widgets.wearekwid.com/api/webhook/34323419/b73e5487da23018fccd52f8b185dec90fe7295c8daf1277654f634a07a75a937",
  "Mentor Milionário": "https://data.widgets.wearekwid.com/api/webhook/34323419/b73e5487da23018fccd52f8b185dec90fe7295c8daf1277654f634a07a75a937",
  
  // Crenças da Riqueza
  "crencas": "https://data.widgets.wearekwid.com/api/webhook/34323419/83a88161bbd8cad66ff0fc4b0ef9302e1bd6673bf4dc2fb85785ca81f77e1ef8",
  "Crenças": "https://data.widgets.wearekwid.com/api/webhook/34323419/83a88161bbd8cad66ff0fc4b0ef9302e1bd6673bf4dc2fb85785ca81f77e1ef8",
  "crencas-da-riqueza": "https://data.widgets.wearekwid.com/api/webhook/34323419/83a88161bbd8cad66ff0fc4b0ef9302e1bd6673bf4dc2fb85785ca81f77e1ef8",
  "Crenças da Riqueza": "https://data.widgets.wearekwid.com/api/webhook/34323419/83a88161bbd8cad66ff0fc4b0ef9302e1bd6673bf4dc2fb85785ca81f77e1ef8",
  
  // Segredos da Mente Milionária
  "segredos-da-mente-milionaria": "https://data.widgets.wearekwid.com/api/webhook/34323419/e715464a9cabe0d1c2047e54a708cb11ddba56af552318e8def5181ecbc3d0ea",
  "Segredos da Mente Milionária": "https://data.widgets.wearekwid.com/api/webhook/34323419/e715464a9cabe0d1c2047e54a708cb11ddba56af552318e8def5181ecbc3d0ea",
  
  // Educador Financeiro (webhook padrão)
  "default": "https://data.widgets.wearekwid.com/api/webhook/34323419/d06a4f8eeb692a9d94eb7e6b7be9273d2d28e300b793b4fc77440af834dd7dde"
}

/**
 * Determina o webhook correto baseado na origem do lead
 * Usa configuração do Sanity se disponível, caso contrário usa fallback
 */
async function getWebhookUrl(source: string): Promise<string> {
  // Tenta buscar configuração do Sanity
  const config = await getActiveIntegrations()
  
  if (config) {
    console.log(`[Webhook] Usando configuração do Sanity: "${config.title}"`)
    const webhookUrl = getKommoWebhookUrl(config, source)
    console.log(`[Webhook] Source: "${source}" -> URL: ${webhookUrl.substring(0, 60)}...`)
    return webhookUrl
  }
  
  // Fallback para configuração hardcoded
  console.log(`[Webhook] Usando configuração hardcoded (fallback)`)
  const normalizedSource = source.toLowerCase().trim()
  const webhookUrl = FALLBACK_WEBHOOK_URLS[source] || FALLBACK_WEBHOOK_URLS[normalizedSource] || FALLBACK_WEBHOOK_URLS["default"]
  console.log(`[Webhook] Source: "${source}" -> URL: ${webhookUrl.substring(0, 60)}...`)
  return webhookUrl
}

export async function submitLead(data: LeadData) {
  try {
    // Busca configurações do Sanity
    const config = await getActiveIntegrations()
    const kommoWebhookUrl = await getWebhookUrl(data.source)

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
    const googleSheetsEnabled = config?.googleSheets?.enabled !== false
    const googleSheetsUrl = config?.googleSheets?.webhookUrl || FALLBACK_GOOGLE_APPS_SCRIPT_URL
    
    if (googleSheetsEnabled && googleSheetsUrl) {
      try {
        console.log("Enviando dados para Google Sheets:", payload)
        const sheetRes = await fetch(googleSheetsUrl, {
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
    }

    // Envia para o LeadLovers
    const leadLoversEnabled = config?.leadLovers?.enabled !== false
    const leadLoversConfig = config?.leadLovers || FALLBACK_LEADLOVERS_CONFIG
    
    if (leadLoversEnabled && leadLoversConfig.webhookUrl) {
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
          MachineCode: leadLoversConfig.machineCode,
          EmailSequenceCode: leadLoversConfig.sequenceCode,
          SequenceLevelCode: leadLoversConfig.levelCode,
          Tag: leadLoversConfig.tag,
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

        const leadLoversRes = await fetch(leadLoversConfig.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": leadLoversConfig.authKey || "",
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