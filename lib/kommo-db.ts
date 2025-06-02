import { sql } from "@/lib/db"

// Tipos
export interface KommoConfig {
  id: number
  access_token: string
  refresh_token: string | null
  expires_at: Date | null
  subdomain: string
  integration_id: string
  created_at: Date
  updated_at: Date
}

export interface KommoLead {
  id: number
  name: string
  email: string
  phone: string | null
  source: string | null
  kommo_lead_id: number | null
  kommo_contact_id: number | null
  pipeline_id: number | null
  status_id: number | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  referrer: string | null
  gclid: string | null
  fbclid: string | null
  sent_to_kommo: boolean
  kommo_response: any | null
  error_message: string | null
  created_at: Date
  updated_at: Date
}

export interface KommoSyncLog {
  id: number
  action: string
  entity_type: string
  entity_id: number | null
  kommo_id: number | null
  request_data: any | null
  response_data: any | null
  success: boolean
  error_message: string | null
  created_at: Date
}

// Funções para configuração
export async function getKommoConfig(): Promise<KommoConfig | null> {
  try {
    const result = await sql<KommoConfig[]>`
      SELECT * FROM kommo_config
      ORDER BY id DESC
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("Erro ao buscar configuração do Kommo:", error)
    return null
  }
}

export async function updateKommoConfig(data: Partial<KommoConfig>): Promise<KommoConfig | null> {
  try {
    const config = await getKommoConfig()

    if (!config) {
      // Se não existir, criar
      const result = await sql<KommoConfig[]>`
        INSERT INTO kommo_config (
          access_token, refresh_token, expires_at, subdomain, integration_id, updated_at
        ) VALUES (
          ${data.access_token || ""}, 
          ${data.refresh_token || null}, 
          ${data.expires_at || null}, 
          ${data.subdomain || "financeirocoachfinanceirocom"}, 
          ${data.integration_id || "a9660545-00df-44ad-a2b5-cf20eada5105"}, 
          CURRENT_TIMESTAMP
        )
        RETURNING *
      `
      return result[0] || null
    }

    // Se existir, atualizar
    const result = await sql<KommoConfig[]>`
      UPDATE kommo_config
      SET 
        access_token = ${data.access_token || config.access_token},
        refresh_token = ${data.refresh_token || config.refresh_token},
        expires_at = ${data.expires_at || config.expires_at},
        subdomain = ${data.subdomain || config.subdomain},
        integration_id = ${data.integration_id || config.integration_id},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${config.id}
      RETURNING *
    `
    return result[0] || null
  } catch (error) {
    console.error("Erro ao atualizar configuração do Kommo:", error)
    return null
  }
}

// Funções para leads
export async function createKommoLead(data: {
  name: string
  email: string
  phone?: string | null
  source?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
  referrer?: string | null
  gclid?: string | null
  fbclid?: string | null
}): Promise<KommoLead> {
  try {
    const result = await sql<KommoLead[]>`
      INSERT INTO kommo_leads (
        name, email, phone, source, 
        utm_source, utm_medium, utm_campaign, utm_content, utm_term, 
        referrer, gclid, fbclid,
        sent_to_kommo, created_at, updated_at
      ) VALUES (
        ${data.name}, ${data.email}, ${data.phone || null}, ${data.source || null},
        ${data.utm_source || null}, ${data.utm_medium || null}, ${data.utm_campaign || null}, 
        ${data.utm_content || null}, ${data.utm_term || null},
        ${data.referrer || null}, ${data.gclid || null}, ${data.fbclid || null},
        false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Erro ao criar lead no banco:", error)
    throw error
  }
}

export async function updateKommoLeadStatus(
  id: number,
  data: {
    kommo_lead_id?: number | null
    kommo_contact_id?: number | null
    pipeline_id?: number | null
    status_id?: number | null
    sent_to_kommo?: boolean
    kommo_response?: any
    error_message?: string | null
  },
): Promise<KommoLead | null> {
  try {
    const result = await sql<KommoLead[]>`
      UPDATE kommo_leads
      SET 
        kommo_lead_id = ${data.kommo_lead_id !== undefined ? data.kommo_lead_id : null},
        kommo_contact_id = ${data.kommo_contact_id !== undefined ? data.kommo_contact_id : null},
        pipeline_id = ${data.pipeline_id !== undefined ? data.pipeline_id : null},
        status_id = ${data.status_id !== undefined ? data.status_id : null},
        sent_to_kommo = ${data.sent_to_kommo !== undefined ? data.sent_to_kommo : false},
        kommo_response = ${data.kommo_response ? JSON.stringify(data.kommo_response) : null},
        error_message = ${data.error_message || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    return result[0] || null
  } catch (error) {
    console.error(`Erro ao atualizar status do lead ${id}:`, error)
    return null
  }
}

export async function getKommoLeads(limit = 10): Promise<KommoLead[]> {
  try {
    const result = await sql<KommoLead[]>`
      SELECT * FROM kommo_leads
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return result
  } catch (error) {
    console.error("Erro ao buscar leads:", error)
    return []
  }
}

// Funções para logs
export async function createSyncLog(data: {
  action: string
  entity_type: string
  entity_id?: number | null
  kommo_id?: number | null
  request_data?: any
  response_data?: any
  success: boolean
  error_message?: string | null
}): Promise<KommoSyncLog | null> {
  try {
    const result = await sql<KommoSyncLog[]>`
      INSERT INTO kommo_sync_log (
        action, entity_type, entity_id, kommo_id,
        request_data, response_data, success, error_message
      ) VALUES (
        ${data.action}, ${data.entity_type}, ${data.entity_id || null}, ${data.kommo_id || null},
        ${data.request_data ? JSON.stringify(data.request_data) : null},
        ${data.response_data ? JSON.stringify(data.response_data) : null},
        ${data.success}, ${data.error_message || null}
      )
      RETURNING *
    `
    return result[0] || null
  } catch (error) {
    console.error("Erro ao criar log de sincronização:", error)
    return null
  }
}

export async function getSyncLogs(limit = 20): Promise<KommoSyncLog[]> {
  try {
    const result = await sql<KommoSyncLog[]>`
      SELECT * FROM kommo_sync_log
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return result
  } catch (error) {
    console.error("Erro ao buscar logs de sincronização:", error)
    return []
  }
}

// Estatísticas
export async function getKommoStats() {
  try {
    // Total de leads
    const totalLeadsResult = await sql`SELECT COUNT(*) as count FROM kommo_leads`
    const totalLeads = Number.parseInt(totalLeadsResult[0].count) || 0

    // Leads enviados com sucesso
    const sentLeadsResult = await sql`SELECT COUNT(*) as count FROM kommo_leads WHERE sent_to_kommo = true`
    const sentLeads = Number.parseInt(sentLeadsResult[0].count) || 0

    // Leads com falha
    const failedLeadsResult = await sql`
      SELECT COUNT(*) as count FROM kommo_leads 
      WHERE sent_to_kommo = false AND error_message IS NOT NULL
    `
    const failedLeads = Number.parseInt(failedLeadsResult[0].count) || 0

    // Leads de hoje
    const todayLeadsResult = await sql`
      SELECT COUNT(*) as count FROM kommo_leads 
      WHERE created_at >= CURRENT_DATE
    `
    const todayLeads = Number.parseInt(todayLeadsResult[0].count) || 0

    // Leads dos últimos 7 dias
    const weekLeadsResult = await sql`
      SELECT COUNT(*) as count FROM kommo_leads 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    `
    const weekLeads = Number.parseInt(weekLeadsResult[0].count) || 0

    // Leads dos últimos 30 dias
    const monthLeadsResult = await sql`
      SELECT COUNT(*) as count FROM kommo_leads 
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    `
    const monthLeads = Number.parseInt(monthLeadsResult[0].count) || 0

    return {
      total_leads: totalLeads,
      sent_to_kommo: sentLeads,
      failed_to_send: failedLeads,
      today_leads: todayLeads,
      week_leads: weekLeads,
      month_leads: monthLeads,
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return {
      total_leads: 0,
      sent_to_kommo: 0,
      failed_to_send: 0,
      today_leads: 0,
      week_leads: 0,
      month_leads: 0,
    }
  }
}
