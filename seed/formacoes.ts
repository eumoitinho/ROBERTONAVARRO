import { ensureMedia } from './helpers/ensure-media'

export async function seedFormacoes(payload: any, educadorFAQs: any[] = []) {
  // Obter IDs dos FAQs do Educador Financeiro (apenas IDs válidos)
  console.log(`📋 Processando ${educadorFAQs.length} FAQs do Educador Financeiro...`)
  
  const faqIds = educadorFAQs
    .filter((f: any) => {
      if (!f) return false
      // Verificar se tem id direto
      if (f.id) {
        return true
      }
      // Verificar se é um documento do Payload (pode ter _id ou id)
      return f._id || false
    })
    .map((f: any) => {
      // Extrair ID de diferentes formatos possíveis
      let id = f.id || f._id
      
      // Se o ID for um objeto (ObjectId do MongoDB), extrair a string
      if (typeof id === 'object') {
        if (id.toString) {
          id = id.toString()
        } else if (id.toHexString) {
          id = id.toHexString()
        } else {
          // Tentar acessar propriedades comuns
          id = id.id || id._id || String(id)
        }
      }
      
      // Garantir que seja string
      id = String(id)
      
      // Validar formato (ObjectId do MongoDB tem 24 caracteres hexadecimais)
      if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
        return id
      }
      
      console.log(`⚠️  FAQ com ID inválido ignorado: ${id} (tipo: ${typeof f.id || typeof f._id})`)
      return null
    })
    .filter((id: any) => id !== null && id !== undefined)
  
  console.log(`✅ ${faqIds.length} IDs de FAQs válidos encontrados`)
  
  // Validar e limpar IDs uma última vez antes de usar
  const validatedFaqIds = faqIds
    .map((id: any) => {
      const str = String(id).trim()
      // Garantir que seja exatamente 24 caracteres hexadecimais
      if (/^[0-9a-fA-F]{24}$/.test(str)) {
        return str // Manter o formato original (não converter para lowercase)
      }
      console.log(`⚠️  ID inválido removido: "${str}" (length: ${str.length})`)
      return null
    })
    .filter((id: any): id is string => id !== null && id !== undefined)
  
  if (validatedFaqIds.length !== faqIds.length) {
    console.log(`⚠️  ${faqIds.length - validatedFaqIds.length} IDs foram removidos após validação final`)
  }
  
  // Usar os IDs validados
  const finalFaqIds = validatedFaqIds

  const heroEducadorImageId = await ensureMedia(payload, 'public/images/HERO_EDUCADOR.png', 'Educador Financeiro')
  const heroEmpreendedorImageId = await ensureMedia(
    payload,
    'public/images/HERO_EMPREENDEDOR.png',
    'Empreendedor Inteligente',
  )
  const heroMentoriaImageId = await ensureMedia(payload, 'public/images/HERO_MENTORIA.png', 'LCF Mentoring')
  const heroMentoriaIndividualImageId = await ensureMedia(
    payload,
    'public/images/HERO_MENTORIAINDIVIDUAL.png',
    'Mentoria Individual',
  )
  const heroMentoriaInvestimentosImageId = await ensureMedia(
    payload,
    'public/images/HERO_MENTORIAINVESTIMENTOS.png',
    'Mentoria de Investimentos',
  )
  const heroRotaMindImageId = await ensureMedia(payload, 'public/images/HERO_ROTAMIND.png', 'Rota Mind')

  // Helper para normalizar IDs de relacionamentos
  const normalizeRelationshipId = (id: any): string | null => {
    if (!id) return null
    
    // Se já é string válida
    if (typeof id === 'string') {
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        return id
      }
      return null
    }
    
    // Se é objeto (ObjectId)
    if (typeof id === 'object') {
      if (id.toString) {
        const str = id.toString()
        if (/^[0-9a-fA-F]{24}$/.test(str)) {
          return str
        }
      }
      if (id.toHexString) {
        const str = id.toHexString()
        if (/^[0-9a-fA-F]{24}$/.test(str)) {
          return str
        }
      }
    }
    
    return null
  }

  // Helper para normalizar arrays de relacionamentos
  const normalizeRelationshipArray = (arr: any[]): string[] => {
    if (!Array.isArray(arr)) return []
    return arr
      .map(normalizeRelationshipId)
      .filter((id): id is string => id !== null)
  }

  // Helper para criar ou atualizar formação
  const createOrUpdateFormacao = async (slug: string, data: any) => {
  const existing = await payload.find({
    collection: 'formacoes',
    where: {
      slug: {
          equals: slug,
      },
    },
    limit: 1,
  })

    // Normalizar relacionamentos antes de salvar
    let normalizedData = { ...data }
    
      // Normalizar FAQs se existir
      if (normalizedData.faqs) {
        if (Array.isArray(normalizedData.faqs)) {
          console.log(`  🔍 FAQs antes da normalização:`, normalizedData.faqs.slice(0, 3).map((id: any) => `${typeof id}:${String(id).substring(0, 10)}...`))
          normalizedData.faqs = normalizeRelationshipArray(normalizedData.faqs)
          console.log(`  ✅ FAQs após normalização:`, normalizedData.faqs.length, 'IDs válidos')
          // Se não houver IDs válidos, remover o campo
          if (normalizedData.faqs.length === 0) {
            console.log(`  ⚠️  Nenhum FAQ válido, removendo campo...`)
            delete normalizedData.faqs
          } else {
            // Validar cada ID antes de passar
            const invalidIds = normalizedData.faqs.filter((id: string) => !/^[0-9a-fA-F]{24}$/.test(id))
            if (invalidIds.length > 0) {
              console.log(`  ❌ IDs inválidos encontrados:`, invalidIds)
              normalizedData.faqs = normalizedData.faqs.filter((id: string) => /^[0-9a-fA-F]{24}$/.test(id))
            }
          }
        } else {
          const normalized = normalizeRelationshipId(normalizedData.faqs)
          normalizedData.faqs = normalized || undefined
        }
      }
      
      // Função recursiva para normalizar relacionamentos em objetos aninhados
      const normalizeNestedRelationships = (obj: any, path: string = ''): any => {
        if (!obj || typeof obj !== 'object') return obj
        
        // Se for array, processar cada item
        if (Array.isArray(obj)) {
          return obj.map((item, index) => normalizeNestedRelationships(item, `${path}[${index}]`))
        }
        
        const normalized: any = {}
        
        for (const key in obj) {
          const value = obj[key]
          const currentPath = path ? `${path}.${key}` : key
          
          // Campos conhecidos de relacionamento
          if (key === 'backgroundImage' || key === 'certificationImage' || key === 'ogImage' || key === 'photo') {
            // Upload fields - só aceitar se for um ID válido, não strings de caminho
            if (typeof value === 'string' && value.startsWith('/')) {
              // É um caminho de arquivo, não um ID - remover
              console.log(`  ⚠️  Caminho de arquivo ignorado em ${currentPath}: ${value}`)
              // Não incluir
            } else {
              const normalizedId = normalizeRelationshipId(value)
              if (normalizedId) {
                normalized[key] = normalizedId
              } else if (value !== undefined && value !== null) {
                console.log(`  ⚠️  Relacionamento inválido em ${currentPath}: ${value}`)
                // Não incluir se inválido
              }
            }
          } else if (key === 'faqs' || key === 'testimonials' || key === 'mentors' || key === 'form') {
            // Relationship fields
            if (Array.isArray(value)) {
              const normalizedArray = normalizeRelationshipArray(value)
              if (normalizedArray.length > 0) {
                normalized[key] = normalizedArray
              } else if (value.length > 0) {
                console.log(`  ⚠️  Array de relacionamentos inválido em ${currentPath}`)
              }
            } else if (value) {
              const normalizedId = normalizeRelationshipId(value)
              if (normalizedId) {
                normalized[key] = normalizedId
              } else {
                console.log(`  ⚠️  Relacionamento inválido em ${currentPath}: ${value}`)
              }
            }
          } else if (typeof value === 'object' && value !== null) {
            // Recursivamente normalizar objetos aninhados
            normalized[key] = normalizeNestedRelationships(value, currentPath)
          } else {
            // Manter outros valores como estão
            normalized[key] = value
          }
        }
        
        return normalized
      }
      
      // Normalizar todos os relacionamentos, incluindo aninhados
      normalizedData = normalizeNestedRelationships(normalizedData)

  if (existing.docs.length > 0) {
      console.log(`⚠️  Formação "${data.title}" já existe, atualizando...`)
      
      // Remover campos undefined para evitar problemas
      Object.keys(normalizedData).forEach(key => {
        if (normalizedData[key] === undefined) {
          delete normalizedData[key]
        }
      })
      
      // Se há FAQs para atualizar, garantir que são válidos
      if (normalizedData.faqs && Array.isArray(normalizedData.faqs)) {
        console.log(`  📝 Tentando atualizar ${normalizedData.faqs.length} FAQs...`)
        // Validar cada ID individualmente antes de passar
        const validFaqs = normalizedData.faqs.filter((id: string) => {
          const isValid = typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id.trim())
          if (!isValid) {
            console.log(`  ⚠️  FAQ ID inválido removido: "${id}"`)
          }
          return isValid
        }).map((id: string) => id.trim()) // Manter formato original, apenas trim
        
        if (validFaqs.length > 0) {
          normalizedData.faqs = validFaqs
          console.log(`  ✅ ${validFaqs.length} FAQs válidos prontos para atualização`)
        } else {
          console.log(`  ⚠️  Nenhum FAQ válido, removendo campo...`)
          delete normalizedData.faqs
        }
      }
      
      // Log dos campos que serão atualizados (sem dados sensíveis)
      const fieldsToUpdate = Object.keys(normalizedData)
      console.log(`  📋 Campos a atualizar: ${fieldsToUpdate.join(', ')}`)
      if (normalizedData.faqs) {
        console.log(`  🔍 Primeiros 3 FAQ IDs: ${Array.isArray(normalizedData.faqs) ? normalizedData.faqs.slice(0, 3).join(', ') : normalizedData.faqs}`)
      }
      
      try {
        return await payload.update({
          collection: 'formacoes',
          id: existing.docs[0].id,
          data: normalizedData,
        })
      } catch (error: any) {
        console.error(`❌ Erro ao atualizar formação "${data.title}":`, error.message)
        // Se o erro for relacionado a FAQs, tentar sem eles
        if (error.message?.includes('ObjectId') || error.message?.includes('BSON') || error.message?.includes('24 character')) {
          console.log(`  🔄 Tentando atualizar sem FAQs...`)
          const dataWithoutFAQs = { ...normalizedData }
          delete dataWithoutFAQs.faqs
          try {
            return await payload.update({
              collection: 'formacoes',
              id: existing.docs[0].id,
              data: dataWithoutFAQs,
            })
          } catch (retryError: any) {
            console.error(`❌ Erro mesmo sem FAQs:`, retryError.message)
            throw retryError
          }
        }
        throw error
      }
  } else {
      console.log(`✅ Criando formação "${data.title}"...`)
      return await payload.create({
        collection: 'formacoes',
        data: normalizedData,
      })
    }
  }

  // 1. EDUCADOR FINANCEIRO
  await createOrUpdateFormacao('educador-financeiro', {
      title: 'Educador Financeiro',
      slug: 'educador-financeiro',
      status: 'published',
    template: 'default',
    accentColor: '#DC2626',
      hero: {
          badge: 'EDUCADOR FINANCEIRO',
        title: 'EDUCADOR FINANCEIRO',
          subtitle: 'A única formação do mercado com LICENÇA PROFISSIONAL chancelada pela Roberto Navarro Academia - RNA',
          description: [
            {
              type: 'p',
              children: [
                {
                  text: 'Transforme vidas através da educação financeira com certificação reconhecida pelo MEC',
                },
              ],
            },
          ],
          ...(heroEducadorImageId ? { backgroundImage: heroEducadorImageId } : {}),
          ctaText: 'QUERO MINHA LICENÇA PROFISSIONAL!',
          ctaLink: '#inscricao',
      },
      challenges: [
        { text: 'Você quer ajudar pessoas a conquistarem sua independência financeira?' },
        { text: 'Deseja construir uma carreira com propósito e alto potencial de ganhos?' },
        { text: 'Busca uma certificação reconhecida nacionalmente?' },
        { text: 'Quer dominar as metodologias mais eficazes de ensino financeiro?' },
      ],
        professionalLicense: {
          enabled: true,
          badge: 'DIFERENCIAL EXCLUSIVO',
          title: 'SUA LICENÇA PROFISSIONAL PARA ATUAR COMO EDUCADOR FINANCEIRO',
          description: 'Esta é a ÚNICA formação do mercado que te concede uma Licença Profissional chancelada pela Roberto Navarro Academia (RNA)',
          transformationTitle: 'Essa será sua transformação:',
          transformations: [
        { text: 'Licença para atuar como Educador Financeiro' },
        { text: 'Respeito profissional no mercado' },
        { text: 'Mais valorização do seu serviço' },
        { text: 'Respaldo do ICF para ensinar sobre geração de riqueza' },
        { text: 'Ampliar o número de clientes ativos' },
        { text: 'Consolidar uma carreira próspera e segura' },
          ],
          benefitsTitle: 'Benefícios da Licença:',
      benefits: [
        { text: 'Mais poder nas suas negociações' },
        { text: 'Mais otimismo na sua carreira' },
        { text: 'Mais admiração no seu círculo social' },
        { text: 'Licença chancelada pela RNA' },
        { text: 'Respaldo profissional que reduz a concorrência' },
        { text: 'Ganhos maiores que os demais profissionais' },
          ],
          shieldMessage: 'Em breve irão sobreviver no mercado apenas quem tiver respeitada Licença Profissional!',
          shieldDescription: 'Roberto Navarro criou essa Licença para separar os Profissionais dos amadores. Garanta sua posição no mercado com a credibilidade de quem é referência nacional em educação financeira.',
          ctaText: 'GARANTIR MINHA LICENÇA PROFISSIONAL',
        },
        certification: {
          hasCertification: true,
          certificationText: [
            {
              type: 'p',
              children: [
                {
              text: 'EXCELÊNCIA RECONHECIDA PELO MINISTÉRIO DA EDUCAÇÃO. Certificado reconhecido pelo MEC através de parceria com instituição de ensino credenciada. Válido em todo território nacional.',
                },
              ],
            },
          ],
        },
        benefits: [
          {
            title: 'Independência Financeira',
            description: 'Construa uma carreira sólida e lucrativa ajudando pessoas',
          icon: 'TrendingUp',
        },
        {
            title: 'Reconhecimento Profissional',
            description: 'Seja visto como autoridade no mercado de educação financeira',
            icon: 'Award',
          },
          {
            title: 'Realização de Sonhos',
            description: 'Trabalhe com propósito transformando vidas através da educação',
            icon: 'Heart',
          },
          {
            title: 'Alta Rentabilidade',
            description: 'Potencial de ganhos ilimitado com modelo de negócio escalável',
            icon: 'DollarSign',
        },
      ],
      learnings: [
        { text: 'Fundamentos da educação financeira e psicologia do dinheiro' },
        { text: 'Metodologias ativas de ensino e aprendizagem' },
        { text: 'Como estruturar e ministrar cursos e palestras' },
        { text: 'Gestão de finanças pessoais e empresariais' },
        { text: 'Investimentos e planejamento financeiro' },
        { text: 'Como criar seu próprio negócio como educador' },
        { text: 'Marketing pessoal e posicionamento profissional' },
        { text: 'Certificação e regulamentação da profissão' },
      ],
      modules: [
        {
            title: 'MÓDULO INICIAL - MUDANÇA DE MENTALIDADE',
            description: 'Fundamentos para transformação mental e financeira',
            topics: [
              { text: 'Aula 01 - Introdução ao Curso' },
              { text: 'Aula 02 - A Importância da Educação Financeira' },
              { text: 'Aula 03 - Crenças Limitantes sobre Dinheiro' },
              { text: 'Aula 04 - Mentalidade de Abundância vs Escassez' },
              { text: 'Aula 05 - Definindo Metas Financeiras' },
              { text: 'Aula 06 - Propósito e Dinheiro' },
              { text: 'Aula 07 - Inteligência Emocional Financeira' },
              { text: 'Aula 08 - Hábitos dos Milionários' },
              { text: 'Aula 09 - Exercícios Práticos de Reprogramação Mental' },
            ],
          },
          {
            title: 'MÓDULO 2 - CLAREAMENTO FINANCEIRO',
            description: 'Diagnóstico e organização da vida financeira',
          topics: [
              { text: 'Aula 01 - Diagnóstico Financeiro Pessoal' },
              { text: 'Aula 02 - Mapeamento de Receitas e Despesas' },
              { text: 'Aula 03 - Identificando Vazamentos Financeiros' },
              { text: 'Aula 04 - Criando um Orçamento Eficiente' },
              { text: 'Aula 05 - Gestão de Dívidas' },
              { text: 'Aula 06 - Estratégias para Sair do Vermelho' },
              { text: 'Aula 07 - Reserva de Emergência' },
              { text: 'Aula 08 - Ferramentas de Controle Financeiro' },
          ],
        },
        {
            title: 'MÓDULO 3 - A GERAÇÃO DO DINHEIRO',
            description: 'Estratégias para aumentar renda e criar fontes múltiplas',
          topics: [
              { text: 'Aula 01 - Renda Ativa vs Renda Passiva' },
              { text: 'Aula 02 - Como Aumentar sua Renda Principal' },
              { text: 'Aula 03 - Criando Múltiplas Fontes de Renda' },
              { text: 'Aula 04 - Empreendedorismo como Solução Financeira' },
              { text: 'Aula 05 - Negócios Digitais e Infoprodutos' },
              { text: 'Aula 06 - Monetizando Conhecimento e Habilidades' },
              { text: 'Aula 07 - Marketing Pessoal e Autoridade' },
              { text: 'Aula 08 - Vendas e Negociação' },
              { text: 'Aula 09 - Precificação de Serviços' },
              { text: 'Aula 10 - Gestão do Tempo e Produtividade' },
              { text: 'Aula 11 - Networking Estratégico' },
              { text: 'Aula 12 - Escalando Resultados' },
          ],
        },
        {
            title: 'MÓDULO 4 - LIBERDADE FINANCEIRA E INVESTIMENTOS',
            description: 'Estratégias de investimento e construção de patrimônio',
          topics: [
              { text: 'Aula 01 - O Que é Liberdade Financeira' },
              { text: 'Aula 02 - Introdução aos Investimentos' },
              { text: 'Aula 03 - Renda Fixa vs Renda Variável' },
              { text: 'Aula 04 - Bolsa de Valores para Iniciantes' },
              { text: 'Aula 05 - Fundos de Investimento' },
              { text: 'Aula 06 - Previdência Privada' },
              { text: 'Aula 07 - Diversificação de Portfólio' },
              { text: 'Aula 08 - Análise de Risco e Retorno' },
              { text: 'Aula 09 - Construindo Patrimônio a Longo Prazo' },
          ],
        },
        {
            title: 'MÓDULO 5 - FINANÇAS COM ROBERTO NAVARRO',
            description: 'Ensinamentos avançados e visão de mentor',
          topics: [
              { text: 'Aula 01 - A Jornada de Roberto Navarro' },
              { text: 'Aula 02 - Princípios Bíblicos e Prosperidade' },
              { text: 'Aula 03 - Inteligência Espiritual Financeira' },
              { text: 'Aula 04 - Generosidade e Abundância' },
              { text: 'Aula 05 - Legado e Propósito de Vida' },
              { text: 'Aula 06 - Liderança Financeira na Família' },
              { text: 'Aula 07 - Visão de Futuro e Planejamento Estratégico' },
          ],
        },
      ],
      bonuses: [
        {
            title: 'Materiais Complementares',
            description: 'Planilhas, templates e recursos exclusivos',
          value: 'R$ 997',
        },
        {
            title: 'Scripts de Atendimento',
            description: 'Roteiros prontos para usar com clientes',
          value: 'R$ 497',
        },
        {
            title: 'Cursos Extras',
            description: 'Conteúdos adicionais de aprofundamento',
          value: 'R$ 1.997',
          },
          {
            title: 'Dias ao Vivo',
            description: 'Participação em eventos presenciais exclusivos',
            value: 'R$ 2.997',
          },
          {
            title: 'Programa de Afiliação 70%',
            description: 'Ganhe comissões indicando a formação',
            value: 'R$ 997',
          },
        ],
        guarantee: {
          days: 7,
          description: [
            {
              type: 'p',
              children: [
                {
              text: 'Garantia Legal de 7 Dias: Experimente a formação por 7 dias. Se não gostar, devolvemos 100% do seu dinheiro. Garantia de Resultados em 6 Meses: Se você aplicar todo o conteúdo e não obtiver resultados, devolvemos o DOBRO do seu investimento.',
                },
              ],
            },
          ],
        },
      pricing: {
        price: 2997,
        installments: 12,
        installmentValue: 297,
        link: 'https://pay.eduzz.com/educador-financeiro',
      },
      seo: {
        title: 'Educador Financeiro - Certificação Reconhecida pelo MEC | Roberto Navarro',
        description: 'Torne-se um Educador Financeiro certificado e transforme vidas através da educação financeira. Certificação reconhecida pelo MEC.',
        keywords: 'educador financeiro, certificação mec, educação financeira, curso educador financeiro',
      },
    faqs: finalFaqIds.length > 0 ? finalFaqIds : undefined,
  })

  // 2. EMPREENDEDOR INTELIGENTE
  await createOrUpdateFormacao('empreendedor-inteligente', {
      title: 'Empreendedor Inteligente',
      slug: 'empreendedor-inteligente',
      status: 'published',
    template: 'empreendedor-inteligente',
    accentColor: '#FFD700',
      hero: {
        badge: 'IMERSÃO DE 3 DIAS',
        title: 'EMPREENDEDOR INTELIGENTE',
      subtitle: 'Formação exclusiva para empresários',
          description: [
            {
              type: 'p',
              children: [
                {
              text: 'Empreender com lucro, leveza e liberdade é possível. Descubra os segredos para empreender com inteligência financeira em uma imersão intensiva de 3 dias.',
                },
              ],
            },
          ],
      ...(heroEmpreendedorImageId ? { backgroundImage: heroEmpreendedorImageId } : {}),
      ctaText: 'GARANTA SUA VAGA!',
        ctaLink: 'https://pay.eduzz.com/empreendedor-inteligente',
      },
      challenges: [
      { text: 'Você fatura, mas não lucra?' },
      { text: 'Quer crescer, mas está preso à operação?' },
      { text: 'Dificuldade para contratar pessoas?' },
      { text: 'Sente que ninguém entende seus desafios?' },
      ],
      learnings: [
      { text: 'Crédito inteligente' },
      { text: 'Contabilidade estratégica' },
      { text: 'Sócios e investidores' },
      { text: 'Time comprometido' },
      { text: 'Modelo de vendas lucrativo' },
      { text: 'Marketing digital de verdade' },
      { text: 'Formação de caixa e capital de giro' },
      { text: 'Diversificação de rendas' },
      { text: 'Plano de aposentadoria' },
      { text: 'Networking de alto nível' },
    ],
    modules: [
      {
        title: 'Crescimento x Escala',
        description: 'Entenda a diferença entre crescer e escalar seu negócio',
        topics: [
          { text: 'Fundamentos de escalabilidade' },
          { text: 'Modelos de negócio escaláveis' },
        ],
      },
      {
        title: 'Capital de Giro',
        description: 'Gestão estratégica do capital de giro',
        topics: [
          { text: 'Cálculo e otimização' },
          { text: 'Estratégias de financiamento' },
        ],
      },
      {
        title: 'Modelo de Trabalho ABC',
        description: 'Metodologia para organização e eficiência',
        topics: [
          { text: 'Aplicação prática' },
          { text: 'Casos de sucesso' },
        ],
      },
      {
        title: 'Marketing Digital',
        description: 'Marketing digital estratégico e efetivo',
        topics: [
          { text: 'Estratégias comprovadas' },
          { text: 'ROI e mensuração' },
        ],
      },
      {
        title: 'Valuation',
        description: 'Como valorizar seu negócio',
        topics: [
          { text: 'Métodos de avaliação' },
          { text: 'Preparação para investidores' },
        ],
      },
      ],
      pricing: {
        price: 1997,
        installments: 10,
        installmentValue: 197,
        link: 'https://pay.eduzz.com/empreendedor-inteligente',
      },
    guarantee: {
      days: 7,
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Garantia de resultados em 6 meses ou devolvemos o dobro do seu investimento.',
            },
          ],
        },
      ],
      },
      seo: {
        title: 'Empreendedor Inteligente - Imersão de 3 Dias | Roberto Navarro',
        description: 'Aprenda a empreender com inteligência financeira em uma imersão intensiva de 3 dias.',
        keywords: 'empreendedor inteligente, gestão financeira empresarial, imersão empreendedorismo',
      },
  })

  // 3. LCF MENTORING PRO
  await createOrUpdateFormacao('lcf-mentoring-pro', {
    title: 'LCF Mentoring Pro',
    slug: 'lcf-mentoring-pro',
    status: 'published',
    template: 'lcf-mentoring-pro',
    accentColor: '#FFD700',
    hero: {
      title: 'LCF MENTORING PRO',
      subtitle: 'Você já tem o dinheiro. Agora, só falta o controle!',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Programa completo com treinamentos transformadores. A riqueza começa com clareza. E se constrói com método.',
            },
          ],
        },
      ],
      ...(heroMentoriaImageId ? { backgroundImage: heroMentoriaImageId } : {}),
      ctaText: 'CONQUISTE SUA VAGA!',
      ctaLink: 'https://pay.eduzz.com/lcf-mentoring-pro',
    },
    learnings: [
      { text: 'Inteligência emocional para prosperidade' },
      { text: 'Inteligência financeira avançada' },
      { text: 'Inteligência espiritual e propósito' },
      { text: 'Inteligência estratégica empresarial' },
    ],
    benefits: [
      {
        title: 'Acesso Vitalício',
        description: 'Acesso permanente a todo o conteúdo',
      },
      {
        title: '4 Imersões Presenciais',
        description: 'Encontros presenciais exclusivos',
      },
      {
        title: '+100h de Conteúdo',
        description: 'Material completo e atualizado',
      },
      {
        title: 'Suporte Direto',
        description: 'Acompanhamento personalizado',
      },
      {
        title: 'Garantia 6 Meses',
        description: 'Garantia de resultados ou devolução',
      },
    ],
    pricing: {
      price: 20000,
      installments: 12,
      installmentValue: 1667,
      link: 'https://pay.eduzz.com/lcf-mentoring-pro',
    },
    guarantee: {
      days: 7,
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Garantia de 6 meses. Se não obtiver resultados, devolvemos seu investimento.',
            },
          ],
        },
      ],
    },
    seo: {
      title: 'LCF Mentoring Pro - Programa Completo | Roberto Navarro',
      description: 'Programa completo com treinamentos transformadores. Você já tem o dinheiro. Agora, só falta o controle!',
      keywords: 'lcf mentoring pro, mentoria financeira, coaching financeiro',
    },
  })

  // 4. MENTORIA INDIVIDUAL
  await createOrUpdateFormacao('mentoria-individual', {
    title: 'Mentoria Individual',
    slug: 'mentoria-individual',
    status: 'published',
    template: 'mentoria-individual',
    accentColor: '#FFD700',
    hero: {
      title: 'MENTORIA INDIVIDUAL EXCLUSIVA',
      subtitle: 'Transforme sua vida com a mentoria mais exclusiva do Brasil',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Acompanhamento 100% personalizado para destravar seu potencial. Mais do que uma mentoria, um despertar de consciência.',
            },
          ],
        },
      ],
      ...(heroMentoriaIndividualImageId ? { backgroundImage: heroMentoriaIndividualImageId } : {}),
      ctaText: 'QUERO TRANSFORMAR MINHA VIDA',
      ctaLink: 'https://pay.eduzz.com/mentoria-individual',
    },
    benefits: [
      {
        title: 'Plano Financeiro 100% Personalizado',
        description: 'Estratégias adaptadas à sua realidade',
      },
      {
        title: 'Resultados Acelerados e Consistentes',
        description: 'Transformação rápida e duradoura',
      },
      {
        title: 'Acompanhamento 1:1 com Roberto Navarro',
        description: 'Acesso direto ao mentor',
      },
      {
        title: 'Transformação Emocional e Espiritual',
        description: 'Mudança completa de mindset',
      },
      {
        title: 'Acesso a Ferramentas Exclusivas',
        description: 'Recursos disponíveis apenas para mentoria',
      },
      {
        title: 'Networking de Alto Nível',
        description: 'Conexões estratégicas e valiosas',
      },
    ],
    learnings: [
      { text: 'Reprogramação mental para riqueza' },
      { text: 'Estratégias financeiras personalizadas' },
      { text: 'Planejamento de longo prazo' },
      { text: 'Gestão de patrimônio' },
      { text: 'Múltiplas fontes de renda' },
      { text: 'Mindset de prosperidade' },
      { text: 'Inteligência emocional financeira' },
      { text: 'Legado e propósito' },
      { text: 'Transformação completa de vida' },
    ],
    pricing: {
      price: 50000,
      installments: 12,
      installmentValue: 4167,
      link: 'https://pay.eduzz.com/mentoria-individual',
    },
    seo: {
      title: 'Mentoria Individual - Acompanhamento Personalizado | Roberto Navarro',
      description: 'Transforme sua vida com a mentoria mais exclusiva do Brasil. Acompanhamento 100% personalizado.',
      keywords: 'mentoria individual, coaching financeiro personalizado, roberto navarro mentoria',
    },
  })

  // 5. MENTORIA DE INVESTIMENTOS
  await createOrUpdateFormacao('mentoria-de-investimentos', {
    title: 'Mentoria de Investimentos',
    slug: 'mentoria-de-investimentos',
    status: 'published',
    template: 'mentoria-investimentos',
    accentColor: '#FFD700',
    hero: {
      title: 'MENTORIA DE INVESTIMENTOS',
      subtitle: 'Faça seu dinheiro trabalhar por você',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Formação prática para quem quer aprender a investir com segurança. A mentoria que vai transformar sua relação com o dinheiro.',
            },
          ],
        },
      ],
      ...(heroMentoriaInvestimentosImageId ? { backgroundImage: heroMentoriaInvestimentosImageId } : {}),
      ctaText: 'QUERO ME TORNAR UM INVESTIDOR!',
      ctaLink: 'https://pay.eduzz.com/mentoria-investimentos',
    },
    challenges: [
      { text: 'Medo de perder dinheiro investindo' },
      { text: 'Não sabe por onde começar' },
      { text: 'Falta de conhecimento técnico' },
      { text: 'Dificuldade em escolher investimentos' },
      { text: 'Não tem estratégia definida' },
    ],
    benefits: [
      {
        title: 'Investir com Segurança',
        description: 'Estratégias comprovadas e seguras',
      },
      {
        title: 'Conhecimento Técnico Completo',
        description: 'Aprenda tudo sobre investimentos',
      },
      {
        title: 'Planejamento Estratégico',
        description: 'Estratégia personalizada para você',
      },
      {
        title: 'Gestão de Risco',
        description: 'Aprenda a proteger seu capital',
      },
      {
        title: 'Resultados Consistentes',
        description: 'Ganhos previsíveis e seguros',
      },
    ],
    learnings: [
      { text: 'Investimentos na Bolsa' },
      { text: 'Renda fixa' },
      { text: 'Análise técnica' },
      { text: 'Mercado futuro' },
      { text: 'Planejamento financeiro' },
      { text: 'Gestão de risco' },
      { text: 'Potes milionários' },
      { text: 'Gestão emocional' },
      { text: 'Inteligência de investimento' },
    ],
    modules: [
      {
        title: 'Investir é Disciplina',
        description: 'Fundamentos da disciplina no investimento',
        topics: [
          { text: 'Construção de hábitos' },
          { text: 'Consistência nos investimentos' },
        ],
      },
      {
        title: 'Investir é Administrar Riscos',
        description: 'Gestão inteligente de riscos',
        topics: [
          { text: 'Análise de risco' },
          { text: 'Diversificação' },
        ],
      },
      {
        title: 'Investir é Conhecimento Constante',
        description: 'Aprendizado contínuo',
        topics: [
          { text: 'Mercados financeiros' },
          { text: 'Análise fundamentalista' },
        ],
      },
      {
        title: 'Investir é Tolerar Perdas',
        description: 'Psicologia do investidor',
        topics: [
          { text: 'Gestão emocional' },
          { text: 'Resiliência' },
        ],
      },
      {
        title: 'Investir é Proteger o Futuro',
        description: 'Planejamento de longo prazo',
        topics: [
          { text: 'Aposentadoria' },
          { text: 'Patrimônio' },
        ],
      },
    ],
    pricing: {
      price: 2997,
      installments: 12,
      installmentValue: 297,
      link: 'https://pay.eduzz.com/mentoria-investimentos',
    },
    guarantee: {
      days: 7,
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Garantia legal de 7 dias. Garantia de resultados em 6 meses.',
            },
          ],
        },
      ],
    },
    seo: {
      title: 'Mentoria de Investimentos - Aprenda a Investir | Roberto Navarro',
      description: 'Formação prática para quem quer aprender a investir com segurança. Faça seu dinheiro trabalhar por você.',
      keywords: 'mentoria investimentos, como investir, curso investimentos, roberto navarro investimentos',
    },
  })

  // 6. MÉTODO TF
  await createOrUpdateFormacao('metodo-tf', {
    title: 'Método TF',
    slug: 'metodo-tf',
    status: 'published',
    template: 'metodo-tf',
    accentColor: '#FFD700',
    hero: {
      badge: 'MÉTODO TF',
      title: 'MÉTODO TF',
      subtitle: 'Desbloqueie a riqueza em sua vida',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Dê um passo decisivo em direção a um futuro próspero. O bloqueio invisível que te impede de prosperar pode ser removido.',
            },
          ],
        },
      ],
      ...(heroEducadorImageId ? { backgroundImage: heroEducadorImageId } : {}),
      ctaText: 'QUERO ENTRAR NO MÉTODO TF!',
      ctaLink: 'https://pay.eduzz.com/metodo-tf',
    },
    benefits: [
      {
        title: 'Empreendedores',
        description: 'Para quem quer escalar seu negócio',
      },
      {
        title: 'Profissionais Liberais',
        description: 'Aumente sua renda e prosperidade',
      },
      {
        title: 'Pessoas com Renda +R$ 5 mil',
        description: 'Otimize seus recursos',
      },
      {
        title: 'Futuros Mentores',
        description: 'Prepare-se para ensinar',
      },
      {
        title: 'Visionários',
        description: 'Realize seus grandes sonhos',
      },
      {
        title: 'Pessoas Ambiciosas',
        description: 'Alcance novos patamares',
      },
    ],
    modules: [
      {
        title: 'Introdução ao Desbloqueio da Riqueza',
        description: 'Fundamentos do método',
        topics: [
          { text: 'O que é o bloqueio invisível' },
          { text: 'Como identificar seus bloqueios' },
        ],
      },
      {
        title: 'Superação de Bloqueios Financeiros',
        description: 'Técnicas de liberação',
        topics: [
          { text: 'Reprogramação mental' },
          { text: 'Eliminação de crenças limitantes' },
        ],
      },
      {
        title: 'Estratégias para Aumentar sua Renda',
        description: 'Métodos práticos',
        topics: [
          { text: 'Múltiplas fontes de renda' },
          { text: 'Escalabilidade' },
        ],
      },
      {
        title: 'Planejamento Financeiro Inteligente',
        description: 'Organização estratégica',
        topics: [
          { text: 'Orçamento eficiente' },
          { text: 'Investimentos estratégicos' },
        ],
      },
      {
        title: 'Criação de Plano de Ação Personalizado',
        description: 'Sua jornada personalizada',
        topics: [
          { text: 'Definição de metas' },
          { text: 'Plano de execução' },
        ],
      },
    ],
    pricing: {
      price: 4997,
      installments: 12,
      installmentValue: 497,
      link: 'https://pay.eduzz.com/metodo-tf',
    },
    guarantee: {
      days: 7,
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Satisfação garantida ou dinheiro de volta. Garantia incondicional de 6 meses. Dobro do dinheiro se não houver resultados.',
            },
          ],
        },
      ],
    },
    seo: {
      title: 'Método TF - Desbloqueie a Riqueza | Roberto Navarro',
      description: 'Desbloqueie a riqueza em sua vida. Dê um passo decisivo em direção a um futuro próspero.',
      keywords: 'método tf, desbloqueio riqueza, prosperidade financeira',
    },
  })

  // 7. MENTOR COACHING FINANCEIRO
  await createOrUpdateFormacao('mentor-coaching-financeiro', {
    title: 'Mentor Coaching Financeiro',
    slug: 'mentor-coaching-financeiro',
    status: 'published',
    template: 'mentor-coaching-financeiro',
    accentColor: '#FFD700',
    hero: {
      badge: 'FORMAÇÃO COMPLETA',
      title: 'Transformamos profissionais em verdadeiros geradores de riqueza',
      subtitle: '',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Aprenda a instalar a inteligência financeira na sua vida e aumentar sua renda, com estratégias comprovadas.',
            },
          ],
        },
      ],
      ...(heroEducadorImageId ? { backgroundImage: heroEducadorImageId } : {}),
      ctaText: 'ESTOU PRONTO PARA MUDAR MINHA VIDA!',
      ctaLink: '#inscricao',
    },
    challenges: [
      { text: 'O paradoxo da escolha financeira: com tantas opções de investimento e estratégias, você fica paralisado, adiando decisões importantes ou tomando decisões baseadas em emoção, não em inteligência.' },
      { text: 'A prisão do padrão de vida: você se tornou refém de um estilo de vida que consome praticamente toda sua renda, deixando pouco espaço para construção real de patrimônio.' },
      { text: 'O medo do próximo nível: subconscientemente, você sabota suas próprias oportunidades de crescimento financeiro porque não se sente "merecedor" ou tem medo das responsabilidades.' },
      { text: 'A dependência da renda ativa: você está completamente dependente do seu trabalho para manter seu padrão de vida, sem verdadeira liberdade ou segurança financeira.' },
    ],
    methodology: {
      enabled: true,
      badge: 'MENTOR COACHING FINANCEIRO',
      title: 'A metodologia que vai reprogramar sua relação com o dinheiro',
      description: 'O Mentor Coaching Financeiro é resultado de mais de uma década de pesquisa e aplicação prática com milhares de alunos. É a síntese de tudo que Roberto Navarro descobriu sobre como pessoas realmente bem-sucedidas pensam, sentem e agem em relação ao dinheiro.',
      highlight: 'Esta não é mais uma formação sobre "como investir" ou "como controlar gastos".',
      explanation: 'Este é um processo de transformação profunda que ataca a raiz do problema: sua programação inconsciente sobre dinheiro, sucesso e merecimento.',
    },
    learnings: [
      {
        title: 'Anamnese financeira profunda',
        description: 'Faça uma análise cirúrgica de sua relação com o dinheiro, identificando crenças limitantes profundamente enraizadas que sabotam seu crescimento financeiro.',
      },
      {
        title: 'Inteligência financeira automática',
        description: 'Desenvolva a capacidade de tomar decisões financeiras com a clareza de um investidor profissional e construa um senso financeiro aguçado que guiará suas decisões.',
      },
      {
        title: 'Ampliação de seu potencial financeiro',
        description: 'Mude literalmente sua identidade financeira, permitindo que níveis superiores de riqueza se manifestem naturalmente em sua vida.',
      },
      {
        title: 'Potes da Riqueza',
        description: 'Descubra como estruturar suas finanças para que o dinheiro trabalhe para você, criando múltiplas fontes de renda passiva e ativa.',
      },
      {
        title: 'Blindagem contra o consumo desnecessário',
        description: 'Aprenda a identificar e neutralizar os gatilhos psicológicos que levam ao consumo impulsivo e ao desperdício de recursos.',
      },
      {
        title: 'Estratégias de multiplicação de renda',
        description: 'Descubra como aumentar sua capacidade de geração de renda, criando novas oportunidades de renda e expandindo suas possibilidades financeiras.',
      },
    ],
    targetAudience: [
      {
        title: 'Empresários e empreendedores de sucesso',
        description: 'Que já construíram negócios rentáveis, mas sentem que poderiam otimizar muito melhor seus recursos e criar riqueza real a partir dos resultados do negócio.',
      },
      {
        title: 'Executivos e profissionais liberais',
        description: 'Médicos, advogados, consultores, engenheiros e outros profissionais que querem transformar sua renda em patrimônio sólido e liberdade financeira.',
      },
      {
        title: 'Investidores e gestores de patrimônio',
        description: 'Que já possuem conhecimento técnico sobre investimentos, mas querem desenvolver a mentalidade dos verdadeiros criadores de riqueza.',
      },
      {
        title: 'Servidores públicos',
        description: 'Que possuem estabilidade e renda consistente e querem maximizar seu potencial de construção de patrimônio.',
      },
      {
        title: 'Profissionais de marketing e consultoria',
        description: 'Que já dominam as técnicas de geração de renda online mas querem estruturar sua vida financeira como verdadeiros empresários.',
      },
    ],
    mentorSection: {
      enabled: true,
      badge: 'MENTOR',
      title: 'APRENDA COM O MENTOR DOS MENTORES',
      subtitle: 'O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!',
      mentorName: 'Roberto Navarro',
      bio: [
        {
          type: 'p',
          children: [
            {
              text: 'Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, se tornou multimilionário em menos de sete anos.',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos.',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Ao longo de sua trajetória, já impactou mais de 1,5 milhão de alunos no Brasil e no mundo.',
            },
          ],
        },
      ],
      ctaText: 'ESTOU PRONTO PARA MUDAR MINHA VIDA!',
    },
    results: [
      {
        title: 'Clareza total',
        description: 'Você saberá exatamente onde quer chegar financeiramente e terá um plano claro para isso.',
      },
      {
        title: 'Inteligência financeira automática',
        description: 'Suas decisões financeiras se tornarão naturalmente mais inteligentes e estratégicas.',
      },
      {
        title: 'Múltiplas fontes de renda',
        description: 'Você desenvolverá a capacidade de identificar e criar novas oportunidades de renda.',
      },
      {
        title: 'Proteção contra crises',
        description: 'Sua estrutura financeira será blindada contra oscilações econômicas e crises setoriais.',
      },
      {
        title: 'Legado familiar',
        description: 'Você construirá não apenas riqueza para si, mas um patrimônio que beneficiará as próximas gerações.',
      },
      {
        title: 'Liberdade real',
        description: 'Tenha mais opções e não dependa mais de uma única fonte de renda para manter seu padrão de vida.',
      },
    ],
    specialGuarantee: {
      title: '6 meses para experimentar uma mudança real',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Ao se inscrever no Mentor Coaching Financeiro, você conta com uma garantia incondicional de 6 meses. Aplique o método, veja resultados reais na sua vida financeira ou receba o dobro do seu dinheiro de volta!',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Isso mesmo: se em até 6 meses você sentir que não teve nenhum avanço, nós devolvemos duas vezes o valor pago, sem letras miúdas.',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Essa não é só uma garantia. É a nossa forma de mostrar que acreditamos profundamente no que fazemos – e no seu potencial de mudança.',
            },
          ],
        },
      ],
    },
    decisionPaths: [
      {
        title: 'Continue como está',
        description: 'Mantenha os mesmos padrões, as mesmas limitações e os mesmos resultados. Daqui a 5 anos, você provavelmente estará na mesma situação financeira, apenas um pouco mais velho e com mais arrependimentos.',
      },
      {
        title: 'Tente sozinho',
        description: 'Continue tentando descobrir por conta própria, cometendo os mesmos erros que a maioria comete, desperdiçando anos valiosos em tentativa e erro.',
      },
      {
        title: 'Acelere sua transformação',
        description: 'Invista em uma metodologia comprovada, com a mentoria de quem já percorreu este caminho e comprovou que é possível transformar completamente sua vida financeira em meses.',
      },
    ],
    decisionPathsNote: 'Quanto vale ter a tranquilidade de saber que suas decisões financeiras estão alinhadas com seu potencial máximo?',
    pricing: {
      price: 4997,
      installments: 12,
      installmentValue: 497,
      link: '#inscricao',
    },
    guarantee: {
      days: 180,
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Satisfação garantida ou seu dinheiro de volta. 6 meses para experimentar uma mudança real. Se não obtiver resultados, devolvemos o dobro do seu investimento.',
            },
          ],
        },
      ],
    },
    seo: {
      title: 'Mentor Coaching Financeiro - Transforme-se em Gerador de Riqueza | Roberto Navarro',
      description: 'Aprenda a instalar a inteligência financeira na sua vida e aumentar sua renda, com estratégias comprovadas. Transformamos profissionais em verdadeiros geradores da riqueza.',
      keywords: 'mentor coaching financeiro, coaching financeiro, roberto navarro, inteligência financeira, gerador de riqueza',
    },
  })

  // 8. ROTA MIND
  await createOrUpdateFormacao('rota-mind', {
    title: 'Rota Mind',
    slug: 'rota-mind',
    status: 'published',
    template: 'rota-mind',
    accentColor: '#3B82F6',
    hero: {
      title: 'ROTA MIND',
      subtitle: 'Mastermind exclusivo',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'O sucesso acontece no ambiente certo. Clube extremamente seleto para empresários de alto nível.',
            },
          ],
        },
      ],
      ...(heroRotaMindImageId ? { backgroundImage: heroRotaMindImageId } : {}),
      ctaText: 'QUERO ESTAR ENTRE OS MAIORES!',
      ctaLink: 'https://pay.eduzz.com/rota-mind',
    },
    challenges: [
      { text: 'Falta de técnica vs falta de acesso' },
      { text: 'Conhecimento mas conexões erradas' },
      { text: 'Dificuldade em pensar grande' },
      { text: 'Precisa de apoio para decisões estratégicas' },
      { text: 'Busca parcerias estratégicas' },
    ],
    benefits: [
      {
        title: 'Networking de Alto Nível',
        description: 'Conexões estratégicas e valiosas',
      },
      {
        title: 'Parcerias Estratégicas',
        description: 'Oportunidades de negócios reais',
      },
      {
        title: 'Treinamentos Exclusivos',
        description: 'Conteúdo exclusivo para membros',
      },
      {
        title: 'Apoio de Conselheiros',
        description: 'Orientação de especialistas',
      },
      {
        title: 'Visão Externa',
        description: 'Perspectivas diferentes e valiosas',
      },
      {
        title: 'Orientações Estratégicas',
        description: 'Direcionamento para decisões',
      },
      {
        title: 'Experiências Compartilhadas',
        description: 'Aprendizado com casos reais',
      },
      {
        title: 'Inteligência Coletiva',
        description: 'Poder do grupo seleto',
      },
    ],
    modules: [
      {
        title: 'DIA 1 - Conteúdo de Alta Performance',
        description: 'Imersão em estratégias avançadas',
        topics: [
          { text: 'Estratégias de alto nível' },
          { text: 'Metodologias exclusivas' },
        ],
      },
      {
        title: 'DIA 2 - Clube de Negócios',
        description: 'Networking e parcerias',
        topics: [
          { text: 'Conectando empresários' },
          { text: 'Oportunidades de negócio' },
        ],
      },
    ],
    pricing: {
      price: 50000,
      installments: 12,
      installmentValue: 4167,
      link: 'https://pay.eduzz.com/rota-mind',
    },
    seo: {
      title: 'Rota Mind - Mastermind Exclusivo | Roberto Navarro',
      description: 'O sucesso acontece no ambiente certo. Clube extremamente seleto para empresários de alto nível.',
      keywords: 'rota mind, mastermind, clube empresários, networking alto nível',
    },
  })

  console.log('✅ Todas as formações foram populadas com sucesso!')

  return {
    success: true,
    message: 'Formações populadas com sucesso',
  }
}
