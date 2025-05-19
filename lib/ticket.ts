import QRCode from "qrcode"

/**
 * Gera um QR code para um ticket específico
 * @param ticketCode Código único do ticket
 * @returns Promise com a URL de dados do QR code
 */
export async function generateTicketQRCode(ticketCode: string): Promise<string> {
  try {
    // Obter a URL base da aplicação
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Criar a URL completa para verificação do ticket
    const verificationUrl = `${baseUrl}/verificar/${encodeURIComponent(ticketCode)}`

    console.log(`Gerando QR code para URL: ${verificationUrl}`)

    // Gerar o QR code como data URL
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 300,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })

    return qrCodeDataUrl
  } catch (error) {
    console.error("Erro ao gerar QR code:", error)
    throw new Error(`Falha ao gerar QR code: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
  }
}
