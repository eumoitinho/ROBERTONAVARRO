import type { Event } from "./db"

export type TicketTemplate = {
  name: string
  headerClass: string
  contentClass: string
  footerClass: string
  qrCodeClass: string
  titleClass: string
  nameClass: string
  infoClass: string
  buttonClass: string
  patternStyle?: string
}

// Template padrão com cores âmbar e preto para todos os tickets
const defaultTemplate: TicketTemplate = {
  name: "Padrão",
  headerClass: "bg-gradient-to-r from-amber-500 to-amber-700 text-white",
  contentClass: "p-6 flex flex-col items-center bg-gradient-to-b from-amber-50 to-white",
  footerClass: "flex justify-center gap-4 p-6 pt-0",
  qrCodeClass: "bg-white p-4 rounded-md shadow-lg border-2 border-amber-200",
  titleClass: "text-center font-bold",
  nameClass: "font-bold text-xl text-gray-900",
  infoClass: "text-sm text-amber-700",
  buttonClass: "bg-amber-600 hover:bg-amber-700 text-white",
  patternStyle:
    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
}

// Todos os templates agora usam o mesmo estilo padrão com cores âmbar e preto
export const ticketTemplates: Record<string, TicketTemplate> = {
  default: defaultTemplate,
  corporate: defaultTemplate,
  premium: defaultTemplate,
  modern: defaultTemplate,
  academic: defaultTemplate,
  startup: defaultTemplate,
  business: defaultTemplate,
}

export function getTicketTemplate(event: Partial<Event>): TicketTemplate {
  // Retorna sempre o template padrão com cores âmbar e preto
  return defaultTemplate
}

export function getCustomStyles(event: Partial<Event>): { [key: string]: string } {
  // Cores fixas âmbar e preto para todos os tickets
  const primaryColor = "#F59E0B" // âmbar-500
  const secondaryColor = "#92400E" // âmbar-800

  return {
    headerClass: `bg-gradient-to-r from-amber-500 to-amber-700 text-white`,
    buttonClass: `bg-amber-600 hover:bg-amber-700 text-white`,
  }
}
