import { NextResponse } from "next/server"
import { getKommoStats, getKommoLeads, getSyncLogs } from "@/lib/kommo-db"

export async function GET() {
  try {
    // Obter estatísticas
    const stats = await getKommoStats()

    // Obter leads recentes (com tratamento de erro)
    let recentLeads = []
    try {
      recentLeads = (await getKommoLeads(10)) || []
    } catch (error) {
      console.error("Erro ao buscar leads recentes:", error)
    }

    // Obter logs recentes (com tratamento de erro)
    let recentLogs = []
    try {
      recentLogs = (await getSyncLogs(20)) || []
    } catch (error) {
      console.error("Erro ao buscar logs recentes:", error)
    }

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentLeads: Array.isArray(recentLeads) ? recentLeads : [],
        recentLogs: Array.isArray(recentLogs) ? recentLogs : [],
      },
    })
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar dados do dashboard",
        error: error instanceof Error ? error.message : "Erro desconhecido",
        data: {
          stats: {
            total_leads: 0,
            sent_to_kommo: 0,
            failed_to_send: 0,
            today_leads: 0,
            week_leads: 0,
            month_leads: 0,
          },
          recentLeads: [],
          recentLogs: [],
        },
      },
      { status: 500 },
    )
  }
}
