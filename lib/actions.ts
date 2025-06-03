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

export async function submitLead(data: LeadData) {
  try {
    const webhookUrl =
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

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erro na resposta do Kommo:", response.status, errorText)
      throw new Error(`Erro HTTP: ${response.status}`)
    }

    const result = await response.json()
    console.log("Resposta do Kommo:", result)

    return {
      success: true,
      message: "Lead enviado com sucesso!",
      data: result,
    }
  } catch (error) {
    console.error("Erro ao enviar lead para Kommo:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}
