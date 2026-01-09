"use server"

import { submitLeadToIntegrations, type LeadData } from "@/lib/lead-submission"

// Função principal para enviar leads
export async function submitLead(data: LeadData) {
  return submitLeadToIntegrations(data)
}

// Alias para compatibilidade - mantém submitLeadToSheetsOnly funcionando
export async function submitLeadToSheetsOnly(data: LeadData) {
  return submitLead(data)
}
