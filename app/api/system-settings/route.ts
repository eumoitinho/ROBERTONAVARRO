import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth"

const DEFAULT_SETTINGS = {
  siteName: "Sistema de Eventos",
  siteDescription: "Plataforma para gerenciamento de eventos e inscrições",
  emailSender: "eventos@exemplo.com",
  emailSmtp: "smtp.exemplo.com",
  emailPort: 587,
  emailUsername: "usuario@exemplo.com",
  enableEmailNotifications: true,
  enableSmsNotifications: false,
}

async function ensureSettingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS system_settings (
      id INTEGER PRIMARY KEY,
      site_name TEXT NOT NULL,
      site_description TEXT,
      email_sender TEXT NOT NULL,
      email_smtp TEXT NOT NULL,
      email_port INTEGER NOT NULL,
      email_username TEXT NOT NULL,
      email_password TEXT,
      enable_email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
      enable_sms_notifications BOOLEAN NOT NULL DEFAULT FALSE,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `
}

async function getSettingsRow() {
  const result = await sql`
    SELECT
      site_name,
      site_description,
      email_sender,
      email_smtp,
      email_port,
      email_username,
      enable_email_notifications,
      enable_sms_notifications
    FROM system_settings
    WHERE id = 1
  `

  if (result.rows.length === 0) {
    return DEFAULT_SETTINGS
  }

  const row = result.rows[0]
  return {
    siteName: row.site_name,
    siteDescription: row.site_description,
    emailSender: row.email_sender,
    emailSmtp: row.email_smtp,
    emailPort: row.email_port,
    emailUsername: row.email_username,
    enableEmailNotifications: row.enable_email_notifications,
    enableSmsNotifications: row.enable_sms_notifications,
  }
}

export async function GET() {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    await ensureSettingsTable()
    const settings = await getSettingsRow()

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Erro ao buscar configurações do sistema:", error)
    return NextResponse.json({ error: "Erro ao buscar configurações do sistema" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const {
      siteName,
      siteDescription,
      emailSender,
      emailSmtp,
      emailPort,
      emailUsername,
      emailPassword,
      enableEmailNotifications,
      enableSmsNotifications,
    } = body

    if (!siteName || !emailSender || !emailSmtp || !emailPort || !emailUsername) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    await ensureSettingsTable()

    await sql`
      INSERT INTO system_settings (
        id,
        site_name,
        site_description,
        email_sender,
        email_smtp,
        email_port,
        email_username,
        email_password,
        enable_email_notifications,
        enable_sms_notifications,
        updated_at
      )
      VALUES (
        1,
        ${siteName},
        ${siteDescription || null},
        ${emailSender},
        ${emailSmtp},
        ${emailPort},
        ${emailUsername},
        ${emailPassword || null},
        ${Boolean(enableEmailNotifications)},
        ${Boolean(enableSmsNotifications)},
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        site_name = EXCLUDED.site_name,
        site_description = EXCLUDED.site_description,
        email_sender = EXCLUDED.email_sender,
        email_smtp = EXCLUDED.email_smtp,
        email_port = EXCLUDED.email_port,
        email_username = EXCLUDED.email_username,
        email_password = EXCLUDED.email_password,
        enable_email_notifications = EXCLUDED.enable_email_notifications,
        enable_sms_notifications = EXCLUDED.enable_sms_notifications,
        updated_at = NOW()
    `

    const settings = await getSettingsRow()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Erro ao atualizar configurações do sistema:", error)
    return NextResponse.json({ error: "Erro ao atualizar configurações do sistema" }, { status: 500 })
  }
}
