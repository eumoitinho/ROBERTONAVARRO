import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { createEduzzInvoice, getEduzzProductIdForEvent } from "@/lib/eduzz-api"
import { CreateInvoiceRequest } from "@/lib/eduzz-types"

// Make sure we export both GET and POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST instead." }, { status: 405 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, productId, customer, paymentMethod } = body

    if (!eventId || !customer || !customer.name || !customer.email) {
      return NextResponse.json({ error: "Dados incompletos para a compra" }, { status: 400 })
    }

    // Mapeie o evento para o productId, se necessário
    const eduzzProductId = productId || (await getEduzzProductIdForEvent(eventId));
    if (!eduzzProductId) {
      return NextResponse.json({ error: "Produto não encontrado na Eduzz" }, { status: 404 })
    }

    // Crie a fatura na Eduzz
    const invoiceData: CreateInvoiceRequest = {
      items: [
        {
          product_id: eduzzProductId,
          quantity: 1,
        },
      ],
      customer: {
        name: customer.name,
        email: customer.email,
      },
      payment_method: paymentMethod || "credit_card", // Ajuste conforme necessário
    };

    const invoice = await createEduzzInvoice(invoiceData);

    // Salve a inscrição no banco, se necessário
    const ticketCode = Math.random().toString(36).substring(2, 15).toUpperCase();
    await sql`
      INSERT INTO registrations (
        event_id, name, email, phone, ticket_code, eduzz_invoice_id
      ) VALUES (
        ${eventId}, ${customer.name}, ${customer.email}, ${customer.phone || ""}, ${ticketCode}, ${invoice.id}
      )
    `;

    return NextResponse.json({
      success: true,
      ticketCode,
      paymentUrl: invoice.payment_url, // Retorne o link de pagamento, se disponível
    });
  } catch (error) {
    console.error("Erro ao processar compra:", error);
    return NextResponse.json(
      { error: "Erro ao processar compra", details: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
