type FormSeed = {
  name: string
  slug: string
  webhookUrl: string
  description?: string
}

const formSeeds: FormSeed[] = [
  {
    name: 'Energia do Dinheiro',
    slug: 'energia-do-dinheiro',
    webhookUrl: 'https://data.widgets.wearekwid.com/api/webhook/34323419/10bb731833c0cc2e49ec0c08a84f795bce797dade58f1dec712c864bb5fb17f9',
  },
  {
    name: 'Mentor Milionário',
    slug: 'mentor-milionario',
    webhookUrl: 'https://data.widgets.wearekwid.com/api/webhook/34323419/b73e5487da23018fccd52f8b185dec90fe7295c8daf1277654f634a07a75a937',
  },
  {
    name: 'Crenças da Riqueza',
    slug: 'crencas-da-riqueza',
    webhookUrl: 'https://data.widgets.wearekwid.com/api/webhook/34323419/83a88161bbd8cad66ff0fc4b0ef9302e1bd6673bf4dc2fb85785ca81f77e1ef8',
  },
  {
    name: 'Segredos da Mente Milionária',
    slug: 'segredos-da-mente-milionaria',
    webhookUrl: 'https://data.widgets.wearekwid.com/api/webhook/34323419/e715464a9cabe0d1c2047e54a708cb11ddba56af552318e8def5181ecbc3d0ea',
  },
  {
    name: 'Educador Financeiro',
    slug: 'educador-financeiro',
    webhookUrl: 'https://data.widgets.wearekwid.com/api/webhook/34323419/d06a4f8eeb692a9d94eb7e6b7be9273d2d28e300b793b4fc77440af834dd7dde',
  },
]

const defaultFields = [
  {
    name: 'name',
    label: 'Nome completo',
    type: 'text',
    required: true,
    placeholder: 'Seu nome completo',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'seu@email.com',
  },
  {
    name: 'phone',
    label: 'Telefone',
    type: 'tel',
    required: true,
    placeholder: '(00) 00000-0000',
  },
]

const defaultSettings = {
  submitText: 'Enviar',
  successMessage: 'Obrigado! Seu formulário foi enviado com sucesso.',
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value ?? {}))

const stripIds = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(stripIds)
  }
  if (!value || typeof value !== 'object') {
    return value
  }

  const result: Record<string, any> = {}
  for (const [key, val] of Object.entries(value)) {
    if (key === 'id') continue
    result[key] = stripIds(val)
  }

  return result
}

export async function seedForms(payload: any) {
  console.log('\n🧾 Populando Formulários...')

  const templateResult = await payload.find({
    collection: 'forms',
    where: {
      slug: {
        equals: 'educador-financeiro',
      },
    },
    limit: 1,
  })

  const templateForm = templateResult.docs[0]
  if (templateForm) {
    console.log('✅ Usando formulário "Educador Financeiro" como base')
  } else {
    console.log('⚠️  Formulário "Educador Financeiro" não encontrado, usando campos padrão')
  }

  const baseFields = templateForm?.fields?.length ? stripIds(templateForm.fields) : defaultFields
  const baseSettings = templateForm?.settings ? stripIds(templateForm.settings) : defaultSettings

  for (const form of formSeeds) {
    const existing = await payload.find({
      collection: 'forms',
      where: {
        slug: {
          equals: form.slug,
        },
      },
      limit: 1,
    })

    const settings = clone(baseSettings)
    const baseWebhook = clone(settings.webhook ?? {})
    const webhook = {
      ...baseWebhook,
      enabled: true,
      url: form.webhookUrl,
    }

    if (!webhook.method) {
      webhook.method = 'POST'
    }
    if (!webhook.timeout) {
      webhook.timeout = 10
    }

    settings.webhook = webhook
    settings.redirectUrl = '/obrigado'

    const data = {
      name: form.name,
      slug: form.slug,
      description: form.description || `Formulário de inscrição para ${form.name}.`,
      fields: clone(baseFields),
      settings,
    }

    if (existing.docs.length > 0) {
      console.log(`⚠️  Formulário "${form.name}" já existe, atualizando...`)
      await payload.update({
        collection: 'forms',
        id: existing.docs[0].id,
        data,
      })
    } else {
      console.log(`✅ Criando formulário "${form.name}"...`)
      await payload.create({
        collection: 'forms',
        data,
      })
    }
  }

  console.log('✅ Formulários atualizados com sucesso!')
}
