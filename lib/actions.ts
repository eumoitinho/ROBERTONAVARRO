"use server"

import { sendLeadToKommo } from "./kommo-api"

// URL do Google Apps Script Web App (mantendo como backup)
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx4s6y8Y8RUhqwW1ICXMtG952oe8DbDQGp8ZvK85jRylwlAD6pCBuldkyCuJGWO5-KrzQ/exec"

export interface LeadData {
  name: string
  email: string
  phone: string
  source?: string
}

export async function submitLead(data: LeadData) {
  try {
    // Adicionar data e hora atual
    const now = new Date()
    const formattedDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    const leadData = {
      ...data,
      date: formattedDate,
      time: formattedTime,
    }

    // Array para armazenar resultados das integrações
    const results = []

    // 1. Enviar para Kommo CRM (principal)
    try {
      const kommoResult = await sendLeadToKommo({
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: data.source || "Website",
      })

      results.push({
        service: "Kommo",
        success: true,
        data: kommoResult,
      })

      console.log("Lead enviado para Kommo com sucesso:", kommoResult)
    } catch (kommoError) {
      console.error("Erro ao enviar para Kommo:", kommoError)
      results.push({
        service: "Kommo",
        success: false,
        error: kommoError instanceof Error ? kommoError.message : "Erro desconhecido",
      })
    }

    // 2. Enviar para Google Sheets (backup)
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
        cache: "no-store",
      })

      if (response.ok) {
        const result = await response.json()
        results.push({
          service: "Google Sheets",
          success: true,
          data: result,
        })
        console.log("Lead enviado para Google Sheets com sucesso")
      } else {
        throw new Error(`Erro ao enviar para Google Sheets: ${response.status}`)
      }
    } catch (sheetsError) {
      console.error("Erro ao enviar para Google Sheets:", sheetsError)
      results.push({
        service: "Google Sheets",
        success: false,
        error: sheetsError instanceof Error ? sheetsError.message : "Erro desconhecido",
      })
    }

    // Verificar se pelo menos uma integração foi bem-sucedida
    const hasSuccess = results.some((result) => result.success)

    if (hasSuccess) {
      return {
        success: true,
        message: "Lead enviado com sucesso!",
        data: results,
      }
    } else {
      // Se todas as integrações falharam
      throw new Error("Falha em todas as integrações. Verifique os logs para mais detalhes.")
    }
  } catch (error) {
    console.error("Erro ao enviar lead:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao enviar lead",
    }
  }
}

// Função para buscar leads do Google Sheets (mantendo para compatibilidade)
export async function getLeads() {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar leads: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      leads: data.leads || [],
    }
  } catch (error) {
    console.error("Erro ao buscar leads:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao buscar leads",
      leads: [],
    }
  }
}

// Nova função específica para testar a integração com Kommo
export async function testKommoIntegration() {
  try {
    const testData = {
      name: "Teste de Integração",
      email: "teste@exemplo.com",
      phone: "(11) 99999-9999",
      source: "Teste Sistema",
    }

    const result = await sendLeadToKommo(testData)

    return {
      success: true,
      message: "Integração com Kommo testada com sucesso!",
      data: result,
    }
  } catch (error) {
    console.error("Erro no teste de integração Kommo:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro no teste de integração",
    }
  }
}
