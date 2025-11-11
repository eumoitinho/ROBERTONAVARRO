import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const payload = await getPayloadClient()

    // Buscar o formulário pelo slug
    const forms = await payload.find({
      collection: 'forms',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (forms.docs.length === 0) {
      return NextResponse.json(
        { error: 'Formulário não encontrado' },
        { status: 404 }
      )
    }

    const form = forms.docs[0]

    // Validar campos obrigatórios
    const errors: string[] = []
    form.fields?.forEach((field: any) => {
      if (field.required && !body[field.name]) {
        errors.push(`Campo "${field.label}" é obrigatório`)
      }
    })

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos', errors },
        { status: 400 }
      )
    }

    // Obter informações da requisição
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Criar submissão (log apenas por enquanto)
    const submission = {
      data: body,
      submittedAt: new Date().toISOString(),
      ip: ip.split(',')[0].trim(), // Pegar primeiro IP se houver múltiplos
      userAgent,
    }

    // Log da submissão (por enquanto não salvamos no documento)
    console.log('📝 Form submission received:', {
      formId: form.id,
      formSlug: form.slug,
      submission,
    })

    // Enviar para Google Sheets se configurado
    if (form.settings?.googleSheets?.enabled && form.settings.googleSheets.scriptUrl) {
      try {
        const sheetUrl = form.settings.googleSheets.scriptUrl
        const sheetPayload = {
          ...body,
          formName: form.name,
          formSlug: form.slug,
          submittedAt: submission.submittedAt,
          source: 'Payload Forms',
        }

        // Enviar para Google Sheets de forma assíncrona
        const sheetPromise = fetch(sheetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sheetPayload),
        }).then(async (sheetRes) => {
          if (!sheetRes.ok) {
            console.error(`⚠️ Google Sheets retornou status ${sheetRes.status}`)
          } else {
            console.log('✅ Dados enviados para Google Sheets com sucesso')
          }
        }).catch((sheetError) => {
          console.error('❌ Erro ao enviar para Google Sheets:', sheetError)
        })

        // Não aguardar, deixar executar em background
        sheetPromise.catch(() => {
          // Erro já foi logado
        })
      } catch (sheetError) {
        console.error('❌ Erro ao processar Google Sheets:', sheetError)
        // Não falhar a requisição se o Google Sheets falhar
      }
    }

    // Enviar notificação por email se configurado
    if (form.settings?.emailNotifications?.enabled) {
      try {
        // Aqui você pode integrar com um serviço de email
        // Por exemplo: SendGrid, Resend, Nodemailer, etc.
        console.log('📧 Email notification would be sent to:', form.settings.emailNotifications.to)
        console.log('📧 Subject:', form.settings.emailNotifications.subject)
        console.log('📧 Data:', body)
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError)
        // Não falhar a requisição se o email falhar
      }
    }

    // Enviar webhook se configurado (de forma assíncrona para não bloquear a resposta)
    if (form.settings?.webhook?.enabled && form.settings.webhook.url) {
      // Executar webhook de forma assíncrona sem bloquear a resposta
      const webhookPromise = (async () => {
        try {
          const webhookUrl = form.settings.webhook.url
          const method = form.settings.webhook.method || 'POST'
          const timeout = (form.settings.webhook.timeout || 10) * 1000
          
          // Preparar headers
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'User-Agent': 'Payload-CMS-Form-Submission/1.0',
          }
          
          // Adicionar headers customizados
          if (form.settings.webhook.headers && Array.isArray(form.settings.webhook.headers)) {
            form.settings.webhook.headers.forEach((header: any) => {
              if (header.key && header.value) {
                headers[header.key] = header.value
              }
            })
          }
          
          // Preparar payload do webhook
          const webhookPayload = {
            form: {
              id: form.id,
              name: form.name,
              slug: form.slug,
            },
            submission: {
              data: body,
              submittedAt: submission.submittedAt,
              ip: submission.ip,
              userAgent: submission.userAgent,
            },
            timestamp: new Date().toISOString(),
          }
          
          // Criar AbortController para timeout
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), timeout)
          
          try {
            const webhookResponse = await fetch(webhookUrl, {
              method,
              headers,
              body: JSON.stringify(webhookPayload),
              signal: controller.signal,
            })
            
            clearTimeout(timeoutId)
            
            if (!webhookResponse.ok) {
              console.error(`⚠️ Webhook retornou status ${webhookResponse.status}:`, await webhookResponse.text().catch(() => ''))
            } else {
              console.log('✅ Webhook enviado com sucesso para:', webhookUrl)
            }
          } catch (fetchError: any) {
            clearTimeout(timeoutId)
            if (fetchError.name === 'AbortError') {
              console.error(`⏱️ Webhook timeout após ${timeout}ms:`, webhookUrl)
            } else {
              console.error('❌ Erro ao enviar webhook:', fetchError.message)
            }
          }
        } catch (webhookError) {
          console.error('❌ Erro ao processar webhook:', webhookError)
          // Não falhar a requisição se o webhook falhar
        }
      })()
      
      // Não aguardar o webhook, deixar executar em background
      webhookPromise.catch(() => {
        // Erro já foi logado acima
      })
    }

    // Retornar resposta baseada nas configurações do formulário
    const response: any = {
      success: true,
      message: form.settings?.successMessage || 'Formulário enviado com sucesso!',
    }

    // Se houver URL de redirecionamento, adicionar ao response
    if (form.settings?.redirectUrl) {
      response.redirect = form.settings.redirectUrl
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Erro ao processar formulário:', error)
    return NextResponse.json(
      {
        error: 'Erro ao processar formulário',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const payload = await getPayloadClient()

    const forms = await payload.find({
      collection: 'forms',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (forms.docs.length === 0) {
      return NextResponse.json(
        { error: 'Formulário não encontrado' },
        { status: 404 }
      )
    }

    const form = forms.docs[0]

    // Retornar apenas os dados necessários para renderizar o formulário
    return NextResponse.json({
      name: form.name,
      slug: form.slug,
      fields: form.fields || [],
      settings: {
        submitText: form.settings?.submitText || 'Enviar',
        successMessage: form.settings?.successMessage || 'Formulário enviado com sucesso!',
        redirectUrl: form.settings?.redirectUrl,
      },
    })
  } catch (error) {
    console.error('Erro ao buscar formulário:', error)
    return NextResponse.json(
      {
        error: 'Erro ao buscar formulário',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}

