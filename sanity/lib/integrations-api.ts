import { sanityClient } from './client'

export interface KommoWebhook {
  source: string
  webhookUrl: string
  description?: string
}

export interface IntegrationsConfig {
  _id: string
  title: string
  isActive: boolean
  googleSheets?: {
    enabled: boolean
    webhookUrl?: string
  }
  leadLovers?: {
    enabled: boolean
    webhookUrl?: string
    authKey?: string
    machineCode?: number
    sequenceCode?: number
    levelCode?: number
    tag?: number
  }
  kommoWebhooks?: KommoWebhook[]
  defaultKommoWebhook?: string
}

const integrationsQuery = `
  *[_type == "integrations" && isActive == true][0] {
    _id,
    title,
    isActive,
    googleSheets {
      enabled,
      webhookUrl
    },
    leadLovers {
      enabled,
      webhookUrl,
      authKey,
      machineCode,
      sequenceCode,
      levelCode,
      tag
    },
    kommoWebhooks[] {
      source,
      webhookUrl,
      description
    },
    defaultKommoWebhook
  }
`

export async function getActiveIntegrations(): Promise<IntegrationsConfig | null> {
  try {
    if (!sanityClient) {
      console.warn('Sanity client not configured')
      return null
    }

    const config = await sanityClient.fetch<IntegrationsConfig>(integrationsQuery)
    return config
  } catch (error) {
    console.error('Error fetching integrations config:', error)
    return null
  }
}

export function getKommoWebhookUrl(config: IntegrationsConfig | null, source: string): string {
  if (!config || !config.kommoWebhooks) {
    // Fallback para webhook padrão hardcoded
    return "https://data.widgets.wearekwid.com/api/webhook/34323419/d06a4f8eeb692a9d94eb7e6b7be9273d2d28e300b793b4fc77440af834dd7dde"
  }

  // Normaliza o source para comparação
  const normalizedSource = source.toLowerCase().trim()

  // Procura por um webhook específico
  const webhook = config.kommoWebhooks.find(
    w => w.source.toLowerCase().trim() === normalizedSource || w.source === source
  )

  if (webhook) {
    return webhook.webhookUrl
  }

  // Retorna o webhook padrão se configurado
  if (config.defaultKommoWebhook) {
    return config.defaultKommoWebhook
  }

  // Fallback final
  return "https://data.widgets.wearekwid.com/api/webhook/34323419/d06a4f8eeb692a9d94eb7e6b7be9273d2d28e300b793b4fc77440af834dd7dde"
}
