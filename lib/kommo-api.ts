import { createKommoLead, updateKommoLeadStatus, createSyncLog, getKommoConfig } from "./kommo-db"

// Configurações da API do Kommo
const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN || "financeirocoachfinanceirocom"
const KOMMO_API_URL = `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4`

export interface KommoLeadData {
  name: string
  price?: number
  responsible_user_id?: number
  status_id?: number
  pipeline_id?: number
  custom_fields_values?: Array<{
    field_id: number
    values: Array<{
      value: string
    }>
  }>
  _embedded?: {
    contacts?: Array<{
      name: string
      custom_fields_values?: Array<{
        field_id: number
        values: Array<{
          value: string
          enum_code?: string
        }>
      }>
    }>
  }
}

export interface KommoContactData {
  name: string
  custom_fields_values?: Array<{
    field_id: number
    values: Array<{
      value: string
      enum_code?: string
    }>
  }>
}

// IDs dos campos personalizados descobertos no seu Kommo
export const KOMMO_FIELD_IDS = {
  PHONE: 1025408, // Campo "Telefone"
  EMAIL: 1025410, // Campo "Email"
  SOURCE: 1025412, // Campo "Fonte do Lead"
  // Campos UTM para tracking avançado
  UTM_SOURCE: 52686, // utm_source
  UTM_MEDIUM: 52682, // utm_medium
  UTM_CAMPAIGN: 52684, // utm_campaign
  UTM_CONTENT: 52680, // utm_content
  UTM_TERM: 52688, // utm_term
  REFERRER: 52692, // referrer
  GCLID: 52698, // gclid (Google Ads)
  FBCLID: 52700, // fbclid (Facebook Ads)
}

// IDs dos pipelines descobertos no seu Kommo
export const KOMMO_PIPELINE_IDS = {
  MAIN: 10749175, // "Funil de vendas" - Pipeline principal
  LUCAS: 10749211, // "Funil Lucas"
  ERIC: 10756351, // "Eric"
  ERIC_EVENTOS: 10756363, // "Eric Eventos" - Para eventos e formações
  POS_VENDAS: 10767187, // "Pós Vendas"
  ERIC_PNL: 10772919, // "Eric PNL"
}

// IDs dos status descobertos no seu Kommo
export const KOMMO_STATUS_IDS = {
  // Pipeline Principal (Funil de vendas)
  LEADS_ENTRADA: 82422239, // "Leads de entrada"
  NUNCA_RESPONDEU: 82422243, // "Nunca respondeu (LEAD)"
  RESPONDEU: 82422247, // "Respondeu (LEAD)"
  RESPONDEU_INTERESSADO: 82422251, // "Respondeu interessado (LEAD)"
  PIR_EVENTO: 82422255, // "PIR (EVENTO)"
  PRO_EVENTO: 82477147, // "PRO. (EVENTO)"
  SESSAO: 82477151, // "SESSÃO"
  ENTRADAS_EVENTO: 82477519, // "ENTRADAS EVENTO"

  // Pipeline Eric Eventos
  ERIC_EVENTOS_ENTRADA: 82477619, // "Etapa de leads de entrada"
  PIR_MENTORIA: 82477623, // "PIR+MENTORIA"
  PRO_MENTORIA: 82477627, // "PRO+MENTORIA"
  PIR: 82477631, // "PIR"
  PRO: 82477887, // "PRO"
  CURSOS_ALHEIO: 82477891, // "Cursos alheio"
  ENTRADAS: 82477895, // "Entradas"
  SOMENTE_MENTORIAS: 82477899, // "Somente mentorias"
  PLANO_ANUAL: 82777611, // "PLANO ANUAL"

  // Status universais
  CLOSED_WON: 142, // "Closed - won"
  CLOSED_LOST: 143, // "Closed - lost"
}

class KommoAPI {
  private baseURL: string

  constructor() {
    this.baseURL = KOMMO_API_URL
  }

  private async getAccessToken(): Promise<string> {
    // Primeiro tenta pegar da variável de ambiente
    const envToken = process.env.KOMMO_LONG_LIVED_TOKEN
    if (envToken) {
      return envToken
    }

    // Se não tiver, busca do banco de dados
    const config = await getKommoConfig()
    if (config?.access_token) {
      return config.access_token
    }

    throw new Error("Token de acesso do Kommo não encontrado")
  }

  private async makeRequest(endpoint: string, method: "GET" | "POST" | "PATCH" = "GET", data?: any) {
    const url = `${this.baseURL}${endpoint}`
    const accessToken = await this.getAccessToken()

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }

    const config: RequestInit = {
      method,
      headers,
    }

    if (data && (method === "POST" || method === "PATCH")) {
      config.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Kommo API Error: ${response.status} - ${errorText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Erro na requisição para Kommo:", error)
      throw error
    }
  }

  async createContact(contactData: KommoContactData) {
    try {
      const response = await this.makeRequest("/contacts", "POST", [contactData])
      return response
    } catch (error) {
      console.error("Erro ao criar contato no Kommo:", error)
      throw error
    }
  }

  async createLead(leadData: KommoLeadData) {
    try {
      const response = await this.makeRequest("/leads", "POST", [leadData])
      return response
    } catch (error) {
      console.error("Erro ao criar lead no Kommo:", error)
      throw error
    }
  }

  async searchContactByEmail(email: string) {
    try {
      const response = await this.makeRequest(`/contacts?query=${encodeURIComponent(email)}`)
      return response
    } catch (error) {
      console.error("Erro ao buscar contato por email no Kommo:", error)
      throw error
    }
  }

  async testConnection() {
    try {
      const response = await this.makeRequest("/account")
      return {
        success: true,
        message: "Conexão com Kommo estabelecida com sucesso!",
        data: response,
      }
    } catch (error) {
      return {
        success: false,
        message: "Erro ao conectar com Kommo",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }
}

export const kommoAPI = new KommoAPI()

// Função principal para enviar lead para o Kommo com persistência no banco
export async function sendLeadToKommo(data: {
  name: string
  email: string
  phone: string
  source: string
  utmData?: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
    referrer?: string
    gclid?: string
    fbclid?: string
  }
}) {
  let dbLead = null

  try {
    // 1. Salvar lead no banco de dados primeiro
    dbLead = await createKommoLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source,
      utm_source: data.utmData?.utm_source,
      utm_medium: data.utmData?.utm_medium,
      utm_campaign: data.utmData?.utm_campaign,
      utm_content: data.utmData?.utm_content,
      utm_term: data.utmData?.utm_term,
      referrer: data.utmData?.referrer,
      gclid: data.utmData?.gclid,
      fbclid: data.utmData?.fbclid,
    })

    console.log("Lead salvo no banco:", dbLead.id)

    // 2. Verificar se já existe contato no Kommo
    const existingContact = await kommoAPI.searchContactByEmail(data.email)

    // 3. Preparar campos personalizados
    const contactCustomFields = [
      {
        field_id: KOMMO_FIELD_IDS.EMAIL,
        values: [{ value: data.email }],
      },
      {
        field_id: KOMMO_FIELD_IDS.PHONE,
        values: [{ value: data.phone }],
      },
    ]

    const leadCustomFields = [
      {
        field_id: KOMMO_FIELD_IDS.SOURCE,
        values: [{ value: data.source }],
      },
    ]

    // Adicionar dados UTM
    if (data.utmData) {
      Object.entries(data.utmData).forEach(([key, value]) => {
        if (value) {
          const fieldId = KOMMO_FIELD_IDS[key.toUpperCase() as keyof typeof KOMMO_FIELD_IDS]
          if (fieldId) {
            leadCustomFields.push({
              field_id: fieldId,
              values: [{ value }],
            })
          }
        }
      })
    }

    // 4. Determinar pipeline e status
    let pipelineId = KOMMO_PIPELINE_IDS.MAIN
    let statusId = KOMMO_STATUS_IDS.LEADS_ENTRADA

    if (
      data.source.includes("Evento") ||
      data.source.includes("Formação") ||
      data.source.includes("Mentoring") ||
      data.source.includes("Educador") ||
      data.source.includes("Empreendedor") ||
      data.source.includes("Rota Mind") ||
      data.source.includes("PIR") ||
      data.source.includes("PRO") ||
      data.source.includes("Crenças da Riqueza") ||
      data.source.includes("Energia do Dinheiro") ||
      data.source.includes("Escalador de Negócios") ||
      data.source.includes("Segredos da Mente Milionária")
    ) {
      pipelineId = KOMMO_PIPELINE_IDS.ERIC_EVENTOS
      statusId = KOMMO_STATUS_IDS.ERIC_EVENTOS_ENTRADA
    }

    // 5. Criar lead no Kommo
    const leadData: KommoLeadData = {
      name: `Lead: ${data.name} - ${data.source}`,
      price: 0,
      pipeline_id: pipelineId,
      status_id: statusId,
      custom_fields_values: leadCustomFields,
      _embedded: {
        contacts: [
          {
            name: data.name,
            custom_fields_values: contactCustomFields,
          },
        ],
      },
    }

    const kommoResponse = await kommoAPI.createLead(leadData)

    // 6. Atualizar status no banco
    await updateKommoLeadStatus(dbLead.id, {
      kommo_lead_id: kommoResponse._embedded?.leads?.[0]?.id,
      kommo_contact_id: kommoResponse._embedded?.contacts?.[0]?.id,
      pipeline_id: pipelineId,
      status_id: statusId,
      sent_to_kommo: true,
      kommo_response: kommoResponse,
    })

    // 7. Log de sucesso
    await createSyncLog({
      action: "create_lead",
      entity_type: "lead",
      entity_id: dbLead.id,
      kommo_id: kommoResponse._embedded?.leads?.[0]?.id,
      request_data: leadData,
      response_data: kommoResponse,
      success: true,
    })

    console.log("Lead enviado para Kommo com sucesso:", kommoResponse._embedded?.leads?.[0]?.id)

    return {
      success: true,
      dbLead,
      kommoResponse,
    }
  } catch (error) {
    console.error("Erro ao enviar lead para Kommo:", error)

    // Atualizar status de erro no banco se o lead foi criado
    if (dbLead) {
      await updateKommoLeadStatus(dbLead.id, {
        sent_to_kommo: false,
        error_message: error instanceof Error ? error.message : "Erro desconhecido",
      })

      // Log de erro
      await createSyncLog({
        action: "create_lead",
        entity_type: "lead",
        entity_id: dbLead.id,
        request_data: data,
        success: false,
        error_message: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }

    throw error
  }
}
