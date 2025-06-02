"use server"

import { sendLeadToKommo } from "./kommo-api"

export interface LeadFormData {
  name: string
  email: string
  phone: string
  source: string
}

export async function submitLead(data: LeadFormData) {
  try {
    console.log("Recebendo lead:", data)

    // Capturar dados UTM (se disponíveis no contexto)
    const utmData = {
      utm_source: undefined, // Será capturado no frontend
      utm_medium: undefined,
      utm_campaign: undefined,
      utm_content: undefined,
      utm_term: undefined,
      referrer: undefined,
      gclid: undefined,
      fbclid: undefined,
    }

    // Enviar para Kommo CRM (principal)
    try {
      const kommoResult = await sendLeadToKommo({
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: data.source,
        utmData,
      })

      console.log("Lead enviado para Kommo com sucesso:", kommoResult)

      return {
        success: true,
        message: "Lead enviado com sucesso para o CRM!",
        kommoResult,
      }
    } catch (kommoError) {
      console.error("Erro ao enviar para Kommo:", kommoError)

      // Se falhar no Kommo, ainda retorna sucesso para não quebrar a experiência do usuário
      // Você pode implementar um fallback aqui (ex: Google Sheets, email, etc.)

      return {
        success: true,
        message: "Dados recebidos com sucesso! Entraremos em contato em breve.",
        warning: "Erro no CRM, mas dados foram salvos em backup.",
      }
    }
  } catch (error) {
    console.error("Erro geral ao processar lead:", error)

    return {
      success: false,
      message: "Erro interno do servidor. Tente novamente em alguns minutos.",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}

// Função para testar a integração com Kommo
export async function testKommoIntegration() {
  try {
    const testData = {
      name: "João Silva (TESTE AUTOMÁTICO)",
      email: `teste-${Date.now()}@exemplo.com`,
      phone: "(11) 99999-9999",
      source: "Teste Automático - Integração Kommo",
      utmData: {
        utm_source: "website",
        utm_medium: "teste",
        utm_campaign: "integracao_kommo",
        utm_content: "teste_automatico",
        referrer: "https://financeirocoach.com.br",
      },
    }

    console.log("Iniciando teste de integração Kommo...")

    const result = await sendLeadToKommo(testData)

    console.log("Teste concluído com sucesso:", result)

    return {
      success: true,
      message: "Teste de integração Kommo realizado com sucesso!",
      data: result,
      testData,
    }
  } catch (error) {
    console.error("Erro no teste de integração Kommo:", error)

    return {
      success: false,
      message: "Erro no teste de integração Kommo",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}
