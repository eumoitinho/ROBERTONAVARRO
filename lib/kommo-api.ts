// Configurações da API do Kommo
const KOMMO_SUBDOMAIN = process.env.KOMMO_SUBDOMAIN || "your-subdomain"
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN || ""
const KOMMO_API_URL = `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4`

export interface KommoLead {
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

export interface KommoContact {
  name: string
  custom_fields_values?: Array<{
    field_id: number
    values: Array<{
      value: string
      enum_code?: string
    }>
  }>
}

// IDs dos campos customizados (você precisa configurar estes no seu Kommo)
export const KOMMO_FIELD_IDS = {
  PHONE: Number.parseInt(process.env.KOMMO_PHONE_FIELD_ID || "0"),
  EMAIL: Number.parseInt(process.env.KOMMO_EMAIL_FIELD_ID || "0"),
  SOURCE: Number.parseInt(process.env.KOMMO_SOURCE_FIELD_ID || "0"),
}

// IDs dos pipelines e status (você precisa configurar estes no seu Kommo)
export const KOMMO_PIPELINE_IDS = {
  LEADS: Number.parseInt(process.env.KOMMO_LEADS_PIPELINE_ID || "0"),
  FORMACOES: Number.parseInt(process.env.KOMMO_FORMACOES_PIPELINE_ID || "0"),
}

export const KOMMO_STATUS_IDS = {
  NEW_LEAD: Number.parseInt(process.env.KOMMO_NEW_LEAD_STATUS_ID || "0"),
  CONTACTED: Number.parseInt(process.env.KOMMO_CONTACTED_STATUS_ID || "0"),
}

class KommoAPI {
  private baseURL: string
  private accessToken: string

  constructor() {
    this.baseURL = KOMMO_API_URL
    this.accessToken = KOMMO_ACCESS_TOKEN
  }

  private async makeRequest(endpoint: string, method: "GET" | "POST" | "PATCH" = "GET", data?: any) {
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.accessToken}`,
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

  async createContact(contactData: KommoContact) {
    try {
      const response = await this.makeRequest("/contacts", "POST", [contactData])
      return response
    } catch (error) {
      console.error("Erro ao criar contato no Kommo:", error)
      throw error
    }
  }

  async createLead(leadData: KommoLead) {
    try {
      const response = await this.makeRequest("/leads", "POST", [leadData])
      return response
    } catch (error) {
      console.error("Erro ao criar lead no Kommo:", error)
      throw error
    }
  }

  async createLeadWithContact(name: string, email: string, phone: string, source: string) {
    try {
      // Primeiro, criar o contato
      const contactData: KommoContact = {
        name,
        custom_fields_values: [
          {
            field_id: KOMMO_FIELD_IDS.EMAIL,
            values: [{ value: email }],
          },
          {
            field_id: KOMMO_FIELD_IDS.PHONE,
            values: [{ value: phone }],
          },
        ],
      }

      // Criar o lead com o contato incorporado
      const leadData: KommoLead = {
        name: `Lead: ${name} - ${source}`,
        price: 0,
        pipeline_id:
          source.includes("Formação") ||
          source.includes("Mentoring") ||
          source.includes("Educador") ||
          source.includes("Empreendedor")
            ? KOMMO_PIPELINE_IDS.FORMACOES
            : KOMMO_PIPELINE_IDS.LEADS,
        status_id: KOMMO_STATUS_IDS.NEW_LEAD,
        custom_fields_values: [
          {
            field_id: KOMMO_FIELD_IDS.SOURCE,
            values: [{ value: source }],
          },
        ],
        _embedded: {
          contacts: [contactData],
        },
      }

      const response = await this.createLead(leadData)
      return response
    } catch (error) {
      console.error("Erro ao criar lead com contato no Kommo:", error)
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

  async updateContact(contactId: number, contactData: Partial<KommoContact>) {
    try {
      const response = await this.makeRequest(`/contacts/${contactId}`, "PATCH", contactData)
      return response
    } catch (error) {
      console.error("Erro ao atualizar contato no Kommo:", error)
      throw error
    }
  }
}

export const kommoAPI = new KommoAPI()

// Função helper para enviar lead para o Kommo
export async function sendLeadToKommo(data: {
  name: string
  email: string
  phone: string
  source: string
}) {
  try {
    // Verificar se o contato já existe
    const existingContact = await kommoAPI.searchContactByEmail(data.email)

    if (existingContact?._embedded?.contacts?.length > 0) {
      // Se o contato existe, criar apenas um novo lead
      const contact = existingContact._embedded.contacts[0]

      const leadData: KommoLead = {
        name: `Lead: ${data.name} - ${data.source}`,
        price: 0,
        pipeline_id:
          data.source.includes("Formação") ||
          data.source.includes("Mentoring") ||
          data.source.includes("Educador") ||
          data.source.includes("Empreendedor")
            ? KOMMO_PIPELINE_IDS.FORMACOES
            : KOMMO_PIPELINE_IDS.LEADS,
        status_id: KOMMO_STATUS_IDS.NEW_LEAD,
        custom_fields_values: [
          {
            field_id: KOMMO_FIELD_IDS.SOURCE,
            values: [{ value: data.source }],
          },
        ],
        _embedded: {
          contacts: [{ name: contact.name }],
        },
      }

      return await kommoAPI.createLead(leadData)
    } else {
      // Se o contato não existe, criar lead com contato
      return await kommoAPI.createLeadWithContact(data.name, data.email, data.phone, data.source)
    }
  } catch (error) {
    console.error("Erro ao enviar lead para Kommo:", error)
    throw error
  }
}
