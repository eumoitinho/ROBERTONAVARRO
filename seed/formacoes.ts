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
            title: 'Independência financeira',
            description: 'Aprenda a aplicar os conceitos ensinados em sua própria vida e alcance estabilidade e liberdade financeira.',
            icon: 'DollarSign',
          },
          {
            title: 'Reconhecimento profissional',
            description: 'Torne-se referência no ensino de finanças e conquiste autoridade e credibilidade na área.',
            icon: 'Award',
          },
          {
            title: 'Realização de sonhos',
            description: 'Use seu novo conhecimento para alcançar objetivos pessoais e inspirar outros a fazerem o mesmo.',
            icon: 'Target',
          },
          {
            title: 'Alta rentabilidade',
            description: 'Transforme a educação financeira em uma fonte real de renda com potencial escalável.',
            icon: 'BarChart',
          },
        ],
        methodology: {
          description: [
            {
              type: 'p',
              children: [
                {
                  text: 'Com certificação reconhecida pelo MEC, a formação de Educador Financeiro é o seu passaporte para uma nova realidade de propósito e prosperidade.',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'Em poucos dias, você verá resultados concretos em sua vida e aprenderá como dominar os fundamentos da educação financeira e aplicar os conhecimentos na prática.',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'Além de possibilitar seu crescimento individual, você desenvolverá habilidades pedagógicas e de comunicação para transmitir esse conhecimento de forma eficaz, seja em consultorias, palestras ou cursos. O mercado busca educadores financeiros qualificados, e você estará pronto para atender a essa demanda.',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'Além de impactar vidas, a formação abre portas para novas fontes de renda e permite que você construa um negócio sólido e rentável no campo da educação financeira.',
                },
              ],
            },
          ],
        },
        exclusiveMaterials: {
          enabled: true,
          title: 'EXPERIMENTE A',
          description:
            'Tenha uma prévia da jornada com materiais oficiais, bastidores e um vídeo de apresentação conduzido pelo time da RNA. Explore o ritmo da formação antes de garantir sua vaga definitiva.',
          items: [
            { title: 'Download de apostilas e exercícios selecionados' },
            { title: 'Bastidores da metodologia com orientações do time' },
            { title: 'Vídeo introdutório guiado pela equipe oficial RNA' },
            { title: 'Checklist para acelerar seus primeiros atendimentos' },
          ],
          ctaText: 'ACESSAR PRÉVIA EXCLUSIVA',
        },
        resources: {
          enabled: true,
          title: 'TUDO O QUE VOCÊ PRECISA PARA TRANSFORMAR SUA CARREIRA',
          items: [
            {
              title: 'Conhecimento abrangente',
              description: 'Do básico ao avançado em finanças pessoais, planejamento e investimentos.',
              icon: 'BookOpen',
            },
            {
              title: 'Ferramentas práticas',
              description: 'Planilhas, checklists e templates prontos para aplicar com seus alunos ou clientes.',
              icon: 'Briefcase',
            },
            {
              title: 'Mentoria personalizada',
              description: 'Orientação direta de especialistas para acelerar sua evolução.',
              icon: 'Users',
            },
            {
              title: 'Networking e oportunidades',
              description: 'Acesso a uma comunidade ativa e conexões com profissionais da área.',
              icon: 'Zap',
            },
            {
              title: 'Certificação reconhecida',
              description: 'Competências validadas com um certificado que abre portas no mercado.',
              icon: 'Award',
            },
            {
              title: 'Método validado',
              description: 'Metodologia estruturada para ensinar finanças de forma clara, envolvente e eficaz.',
              icon: 'Lightbulb',
            },
          ],
        },
        exclusiveOpportunity: {
          enabled: true,
          badge: 'OPORTUNIDADE EXCLUSIVA',
          title: 'SEJA UM',
          description:
            'Além de se formar como Educador Financeiro, você poderá atuar como treinador licenciado dos cursos oficiais do Instituto Coaching Financeiro (ICF).',
          subDescription:
            'Ao concluir a formação, você estará apto a revender treinamentos selecionados do ICF, utilizando o material didático oficial e emitindo certificados com a sua assinatura, reconhecidos diretamente pelo instituto. Ou seja: você já sai com um modelo de negócio pronto para gerar renda.',
          trainings: [
            {
              title: 'LIVRE DE DÍVIDAS',
              description:
                'Estratégias práticas para negociação de dívidas e controle financeiro, com metodologia validada e conteúdo gravado. Uma base essencial para suas futuras aulas.',
            },
            {
              title: 'INVESTIMENTOS INTELIGENTES',
              description:
                'Curso introdutório e prático sobre bolsa de valores e renda fixa. Ideal para quem quer começar a investir com segurança e repassar seus conhecimentos a outras pessoas.',
            },
            {
              title: 'TRANSFORMAÇÃO FINANCEIRA',
              description:
                'Formação completa que aborda propósito com o dinheiro, liberdade financeira, planejamento de curto e longo prazo e criação de múltiplas fontes de renda.',
            },
          ],
        },
        mentorSection: {
          enabled: true,
          badge: 'SEU MENTOR',
          title: 'APRENDA COM O',
          subtitle: 'O maior e mais experiente formador de educadores, coaches e mentores financeiros do Brasil!',
          mentorName: 'Roberto Navarro',
          bio: [
            {
              type: 'p',
              children: [
                {
                  text: 'Roberto Navarro é um exemplo de superação e transformação. Começou sua trajetória profissional lavando vidros de carros aos 13 anos e, com determinação, construiu um caminho até se tornar multimilionário em menos de sete anos.',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'Atualmente, é reconhecido como o maior Educador Financeiro do Brasil e criador do Coach Financeiro no país. Sua metodologia exclusiva combina estratégias de educação financeira, inteligência emocional e princípios bíblicos, proporcionando resultados reais para quem busca sair das dívidas, construir riqueza e alcançar liberdade.',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'Ao longo de sua trajetória, já impactou mais de 13 mil alunos no Brasil e no mundo.',
                },
              ],
            },
            {
              type: 'p',
              children: [
                {
                  text: 'Além de mentor e empreendedor, é autor de best-sellers e especialista em inteligência espiritual e emocional. Hoje, sua missão é clara: ajudar 10 milhões de brasileiros a conquistarem uma vida próspera, com autonomia e visão de futuro.',
                },
              ],
            },
          ],
          ctaText: 'QUERO SER UM EDUCADOR FINANCEIRO!',
        },
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
          description: '',
          topics: [
            { text: 'Introdução à Virada de Chave' },
            { text: 'Qualidade de Vida' },
            { text: 'A Importância da Qualidade de Vida' },
            { text: 'O que é Muito Dinheiro pra Você?' },
            { text: 'Maiores Erros e Acertos com o Dinheiro' },
            { text: 'Como você quer se Sentir?' },
            { text: 'O que te motiva?' },
            { text: 'Custo de Vida' },
            { text: 'Sentimento com o Dinheiro' },
          ],
        },
        {
          title: 'MÓDULO 2 - CLAREAMENTO FINANCEIRO',
          description: '',
          topics: [
            { text: 'Introdução à Clareza Financeira' },
            { text: 'Causa das Dívidas' },
            { text: 'Despesas Fantasmas' },
            { text: 'Tomada de Decisão' },
            { text: 'Classificação de Contas' },
            { text: 'Dívida Boa X Dívida Ruim' },
            { text: 'Qual o tipo de Dívida você tem?' },
            { text: 'A Mágica dos Juros Compostos' },
          ],
        },
        {
          title: 'MÓDULO 3 - A GERAÇÃO DO DINHEIRO',
          description: '(Te preparando pro Mercado)',
          topics: [
            { text: 'Introdução à Geração de Dinheiro' },
            { text: 'Triatlon da Riqueza' },
            { text: 'Renda Principal e Perguntas' },
            { text: 'Renda Extra' },
            { text: 'Renda Passiva' },
            { text: 'Limitações Financeiras' },
            { text: 'Teste a sua meta' },
            { text: 'Oportunidade de Renda - MMN e Venda Direta' },
            { text: 'Oportunidade de Renda - Negócio Próprio, Franquia, Licença' },
            { text: 'Oportunidade de Renda - Marketing Digital' },
            { text: 'Oportunidade de Renda - Coach' },
            { text: 'Make Money' },
          ],
        },
        {
          title: 'MÓDULO 4 - LIBERDADE FINANCEIRA E INVESTIMENTOS',
          description: '',
          topics: [
            { text: 'Introdução e Fundo de Investimentos' },
            { text: 'Fundo de Investimentos - Multimercado' },
            { text: 'Fundo de Ações' },
            { text: 'Renda Fixa - CDB' },
            { text: 'Renda Fixa - Debentures' },
            { text: 'Renda Fixa - LCI e LCA' },
            { text: 'Renda Fixa - Tesouro Direto' },
            { text: 'Home Brocker - Ações' },
            { text: 'Conclusão do Curso' },
          ],
        },
        {
          title: 'MÓDULO 5 - FINANÇAS COM ROBERTO NAVARRO',
          description: 'Apostila de Acompanhamento incluída',
          topics: [
            { text: 'Ciência da Riqueza' },
            { text: 'Pilares da Riqueza' },
            { text: 'Padrão de Gastos' },
            { text: 'Projeto Reduzir para Prosperidade' },
            { text: 'Oportunidade de Renda Extra' },
            { text: 'Como Garantir um Futuro com Muito Dinheiro' },
            { text: 'Como Construir sua Riqueza' },
          ],
        },
      ],
      bonuses: [
        { title: '5 apostilas físicas com mais de 30 exercícios e dinâmicas' },
        { title: 'Scripts de vendas validados e testados' },
        { title: 'Acesso vitalício com atualizações mensais' },
        { title: 'Curso de Comunicação para vendas' },
        { title: 'Mentoria Como Atrair Riqueza' },
        { title: 'Curso Viva Livre das Dívidas' },
        { title: 'Aprenda a criar uma Landing Page Lucrativa' },
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
        {
          title: 'Você fatura, mas não lucra?',
          description: 'Aprenda a formar caixa, controlar gastos invisíveis e parar de pagar juros desnecessários.',
        },
        {
          title: 'Quer crescer, mas está preso à operação?',
          description: 'Crie um modelo de gestão inteligente para ter mais tempo e liberdade sem comprometer os resultados.',
        },
        {
          title: 'Dificuldade para contratar pessoas?',
          description: 'Descubra como atrair, treinar e reter talentos que realmente vestem a camisa da sua empresa.',
        },
        {
          title: 'Sente que ninguém entende seus desafios?',
          description: 'Participe de uma imersão com networking de alto nível e troque com empresários como você.',
        },
      ],
      learnings: [
        {
          title: 'Crédito inteligente',
          description: 'Pare de ser refém de bancos e aprenda a acessar capital de giro sem taxas abusivas.',
        },
        {
          title: 'Contabilidade estratégica',
          description: 'Use a contabilidade como aliada do lucro e da tomada de decisão.',
        },
        {
          title: 'Sócios e investidores',
          description: 'Estruture sua empresa para atrair investimentos sem abrir mão do controle.',
        },
        {
          title: 'Time comprometido',
          description: 'Monte um time que entrega resultado, mesmo quando você não está por perto.',
        },
        {
          title: 'Modelo de vendas lucrativo',
          description: 'Construa seu próprio sistema de vendas e pare de depender de fórmulas genéricas.',
        },
        {
          title: 'Marketing digital de verdade',
          description: 'Invista com inteligência e escale sua presença digital sem desperdiçar recursos.',
        },
        {
          title: 'Formação de caixa e capital de giro',
          description: 'Crie uma base financeira sólida para crescer com segurança e consistência.',
        },
        {
          title: 'Diversificação de rendas',
          description: 'Descubra como criar novas fontes de receita e blindar seu negócio contra imprevistos.',
        },
        {
          title: 'Plano de aposentadoria',
          description: 'Aprenda a construir sua liberdade financeira e garantir um futuro tranquilo, mesmo fora da operação.',
        },
        {
          title: 'Networking de alto nível',
          description: 'Conecte-se com empresários que podem abrir portas e transformar seu negócio.',
        },
      ],
    modules: [
      {
        title: 'Crescimento x Escala',
        description: 'Entenda a diferença entre crescer e escalar — e como se preparar para isso com segurança e previsibilidade.',
        topics: [
          { text: 'Fundamentos de escalabilidade' },
          { text: 'Modelos de negócio escaláveis' },
        ],
      },
      {
        title: 'Capital de Giro',
        description: 'Organize seu fluxo de caixa, equilibre entradas e saídas e mantenha seu negócio financeiramente saudável.',
        topics: [
          { text: 'Cálculo e otimização' },
          { text: 'Estratégias de financiamento' },
        ],
      },
      {
        title: 'Modelo de Trabalho ABC',
        description: 'Implante um modelo de operação eficiente, com prioridades bem definidas e foco no que gera valor.',
        topics: [
          { text: 'Aplicação prática' },
          { text: 'Casos de sucesso' },
        ],
      },
      {
        title: 'Marketing Digital',
        description: 'Use a comunicação digital para fortalecer sua presença online, atraindo e fidelizando clientes.',
        topics: [
          { text: 'Estratégias comprovadas' },
          { text: 'ROI e mensuração' },
        ],
      },
      {
        title: 'Valuation',
        description: 'Saiba quanto vale sua empresa e como aumentar esse valor, preparando-se para investidores.',
        topics: [
          { text: 'Métodos de avaliação' },
          { text: 'Preparação para investidores' },
        ],
      },
      ],
      targetAudience: [
        {
          title: 'Construir um planejamento eficiente',
          description: 'Atinga seu primeiro milhão com um plano claro e prático.',
        },
        {
          title: 'Criar objetivos práticos',
          description: 'Desenvolva uma empresa rica e próspera com metas bem definidas.',
        },
        {
          title: 'Elaborar estratégias inteligentes',
          description: 'Torne seu negócio o número 1 do seu segmento com abordagens eficazes.',
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
      badge: 'Mentoria exclusiva para transformação',
      subtitle: 'Você já tem o dinheiro. Agora, só falta o controle!',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'O LCF Mentoring PRO reúne os treinamentos mais transformadores do educador financeiro Roberto Navarro em um único programa criado para te colocar no seleto grupo de pessoas que vivem com consciência, riqueza e propósito.',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'O programa mais completo de transformação financeira, emocional e espiritual do Brasil, com conteúdos de alto nível, encontros presenciais e suporte contínuo.',
            },
          ],
        },
      ],
      ...(heroMentoriaImageId ? { backgroundImage: heroMentoriaImageId } : {}),
      ctaText: 'CONQUISTE SUA VAGA!',
      ctaLink: 'https://pay.eduzz.com/lcf-mentoring-pro',
    },
    learnings: [
      {
        text: 'Domine suas emoções e padrões mentais, desenvolvendo resiliência, clareza e foco para tomar decisões consistentes em qualquer área da vida.',
      },
      {
        text: 'Destrave suas crenças limitantes e aprenda a organizar, direcionar e multiplicar seus recursos com consciência e consistência.',
      },
      {
        text: 'Conecte sua jornada material com seu propósito de vida. Viver com significado não é um luxo — é a base para prosperar com equilíbrio.',
      },
      {
        text: 'Alinhe carreira, investimentos, rotina e hábitos com um plano de ação realista e poderoso.',
      },
    ],
    benefits: [
      {
        title: 'Resiliência emocional',
        description: 'Desenvolva resiliência e clareza para decisões consistentes.',
      },
      {
        title: 'Foco e controle',
        description: 'Domine padrões mentais e mantenha o foco nas metas.',
      },
      {
        title: 'Consciência financeira',
        description: 'Organize e direcione seus recursos com consciência.',
      },
      {
        title: 'Multiplicação de recursos',
        description: 'Aprenda a multiplicar seus recursos com consistência.',
      },
      {
        title: 'Propósito alinhado',
        description: 'Conecte sua jornada material ao seu propósito de vida.',
      },
      {
        title: 'Equilíbrio e significado',
        description: 'Prosperidade com equilíbrio e significado.',
      },
      {
        title: 'Plano estratégico',
        description: 'Alinhe carreira, investimentos, rotina e hábitos.',
      },
      {
        title: 'Execução poderosa',
        description: 'Plano realista com ações consistentes e aplicáveis.',
      },
    ],
    pricing: {
      price: 20000,
      installments: 12,
      installmentValue: 1667,
      link: 'https://pay.eduzz.com/lcf-mentoring-pro',
    },
    guarantee: {
      days: 180,
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Garantia de 6 meses: se sua vida não mudar, devolvemos seu dinheiro.',
            },
          ],
        },
      ],
    },
    seo: {
      title: 'LCF Mentoring Pro - Programa Completo | Roberto Navarro',
      description: 'Mentoria exclusiva para transformação. Você já tem o dinheiro. Agora, só falta o controle!',
      keywords: 'lcf mentoring pro, mentoria exclusiva, transformação financeira, roberto navarro',
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
      badge: 'Acompanhamento 100 % personalizado',
      subtitle: 'Transforme sua vida com a mentoria mais exclusiva do Brasil',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'A Mentoria Individual com Roberto Navarro é o caminho para quem busca resultados extraordinários em finanças, emoções e propósito.',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Um acompanhamento 100 % personalizado para destravar seu potencial e alcançar liberdade financeira com equilíbrio.',
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
        description: 'Estratégias desenhadas exclusivamente para suas metas e realidade.',
      },
      {
        title: 'Resultados Acelerados e Consistentes',
        description: 'Alcance seus objetivos financeiros com um plano claro e suporte próximo.',
      },
      {
        title: 'Acompanhamento 1:1 com Roberto Navarro',
        description: 'Mentoria direta com um dos maiores especialistas em finanças do Brasil.',
      },
      {
        title: 'Transformação Emocional e Espiritual',
        description: 'Desenvolva equilíbrio e propósito para uma vida plena.',
      },
      {
        title: 'Acesso a Ferramentas Exclusivas',
        description: 'Recursos únicos para maximizar seu crescimento financeiro e pessoal.',
      },
      {
        title: 'Networking de Alto Nível',
        description: 'Conecte-se a uma rede seleta de empreendedores e investidores.',
      },
    ],
    learnings: [
      { text: 'Qual o efeito do dinheiro em sua vida.' },
      { text: 'Como o seu estado emocional impacta diretamente sua conta bancária.' },
      { text: 'Quem está influenciando sua visão sobre dinheiro — e como retomar o controle.' },
      { text: 'O papel da ambiência e da atmosfera na construção da riqueza.' },
      { text: 'Como identificar e eliminar sabotadores financeiros.' },
      { text: 'A conexão poderosa (e oculta) entre energia sexual e prosperidade.' },
      { text: 'O protocolo da riqueza nos negócios e na vida pessoal.' },
      { text: 'A verdade sobre o “dinheirinho” e por que ele pode te manter preso na escassez.' },
      { text: 'Como criar a motivação certa para que o dinheiro venha até você.' },
    ],
    pricing: {
      price: 50000,
      installments: 12,
      installmentValue: 4167,
      link: 'https://pay.eduzz.com/mentoria-individual',
    },
    seo: {
      title: 'Mentoria Individual - Acompanhamento Personalizado | Roberto Navarro',
      description: 'Transforme sua vida com a mentoria mais exclusiva do Brasil. Acompanhamento 100 % personalizado.',
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
      badge: 'Formação prática',
      subtitle: 'Faça seu dinheiro trabalhar por você',
      description: [
        {
          type: 'p',
          children: [
            {
              text: 'Transforme sua vida financeira com a mentoria de investimentos.',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Formação prática para quem quer aprender a investir com segurança, confiança e estratégias reais do mercado.',
            },
          ],
        },
      ],
      ...(heroMentoriaInvestimentosImageId ? { backgroundImage: heroMentoriaInvestimentosImageId } : {}),
      ctaText: 'QUERO ME TORNAR UM INVESTIDOR!',
      ctaLink: 'https://pay.eduzz.com/mentoria-investimentos',
    },
    challenges: [
      { text: 'Medo de investir?' },
      { text: 'Não sabe por onde começar?' },
      { text: 'Cansado de taxas bancárias abusivas?' },
      { text: 'Sente que o dinheiro nunca é suficiente?' },
      { text: 'Já tentou sozinho e se frustrou?' },
    ],
    benefits: [
      {
        title: 'Investir com segurança',
        description: 'Aprenda o passo a passo de como investir com segurança, mesmo sendo iniciante.',
      },
      {
        title: 'Estratégias que os bancos escondem',
        description: 'Descubra estratégias que os bancos não querem que você saiba.',
      },
      {
        title: 'Confiança nas decisões',
        description: 'Desenvolva confiança para tomar decisões financeiras com autonomia.',
      },
      {
        title: 'Renda extra com pouco',
        description: 'Crie uma renda extra com investimentos, mesmo começando com pouco.',
      },
      {
        title: 'Acompanhamento certo',
        description: 'Tenha o acompanhamento e direcionamento certo para fazer seu dinheiro crescer.',
      },
    ],
    learnings: [
      { text: 'Investimentos na Bolsa – descubra como lucrar até quando a bolsa está em queda.' },
      { text: 'Renda fixa – saiba como proteger seu capital e garantir retorno.' },
      { text: 'Análise técnica – aprenda como ler gráficos e tomar decisões baseadas em dados.' },
      { text: 'Mercado futuro – descubra novas oportunidades para escalar seus ganhos.' },
      { text: 'Planejamento financeiro – monte seu plano de independência financeira.' },
      { text: 'Gestão de risco – saiba como administrar riscos, perdas e ganhos.' },
      { text: 'Potes milionários – crie métodos para alcançar a aposentadoria, a independência e a liberdade.' },
      { text: 'Gestão emocional – saiba como lidar e gerir com o estresse do mercado.' },
      { text: 'Inteligência de investimento – aprenda a escapar do overtrading e especialize-se em mercados específicos.' },
    ],
    modules: [
      {
        title: 'Investir é disciplina',
        description: 'Disciplina para seguir o plano e evitar decisões impulsivas.',
        topics: [
          { text: 'Construção de hábitos' },
          { text: 'Consistência nos aportes' },
        ],
      },
      {
        title: 'Investir é administrar riscos',
        description: 'Gestão consciente de riscos, perdas e ganhos.',
        topics: [
          { text: 'Análise de risco' },
          { text: 'Diversificação' },
        ],
      },
      {
        title: 'Investir é adquirir conhecimento constante',
        description: 'Aprendizado contínuo sobre mercados e estratégias.',
        topics: [
          { text: 'Mercados financeiros' },
          { text: 'Estratégias e fundamentos' },
        ],
      },
      {
        title: 'Investir é tolerar eventuais perdas com estratégia',
        description: 'Resiliência e controle emocional nas oscilações.',
        topics: [
          { text: 'Gestão emocional' },
          { text: 'Resiliência' },
        ],
      },
      {
        title: 'Investir é proteger o seu futuro com consciência',
        description: 'Planejamento de longo prazo para independência financeira.',
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
              text: 'Garantia legal de 7 dias — se, dentro dos primeiros 7 dias de acesso à formação, você decidir que o treinamento não está alinhado com suas expectativas ou objetivos, garantimos o reembolso integral do valor pago.',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Garantia de resultados em 6 meses — se, após aplicar as estratégias e conhecimentos compartilhados durante o curso, você não perceber uma melhoria significativa em sua vida financeira, devolveremos o dobro do seu investimento.',
            },
          ],
        },
      ],
    },
    seo: {
      title: 'Mentoria de Investimentos - Aprenda a Investir | Roberto Navarro',
      description: 'Formação prática para quem quer aprender a investir com segurança e confiança. Faça seu dinheiro trabalhar por você.',
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
        title: 'Transformação financeira genuína',
        description:
          'Conquiste a liberdade financeira que sempre almejou, redefinindo sua relação com o dinheiro e construindo um futuro de abundância.',
      },
      {
        title: 'Estratégias comprovadas e eficazes',
        description:
          'Aprenda técnicas que transcendem a teoria, com aplicação prática e resultados tangíveis, sem promessas vazias ou atalhos ilusórios.',
      },
      {
        title: 'Networking de alto valor',
        description:
          'Conecte-se com uma comunidade exclusiva de profissionais visionários, construindo uma rede de contatos que impulsionará seu crescimento.',
      },
      {
        title: 'Suporte contínuo e personalizado',
        description:
          'Receba orientação e acompanhamento mesmo após a conclusão do treinamento, garantindo que sua jornada seja contínua e bem-sucedida.',
      },
    ],
    targetAudience: [
      {
        title: 'Empreendedores',
        description: 'que buscam escalar seus negócios, otimizar lucros e consolidar sua posição no mercado.',
      },
      {
        title: 'Profissionais liberais',
        description: 'que almejam independência financeira, expansão de sua carteira de clientes e reconhecimento.',
      },
      {
        title: 'Pessoas com renda +R$ 5 mil',
        description: 'que desejam exponencializar seu potencial de ganhos e alcançar novos patamares.',
      },
      {
        title: 'Futuros mentores',
        description: 'que buscam atuar como coach e educador para transformar vidas através da educação financeira.',
      },
      {
        title: 'Visionários',
        description: 'que compreendem a importância da inteligência financeira como diferencial competitivo.',
      },
      {
        title: 'Pessoas ambiciosas',
        description: 'que buscam prosperar em todas as áreas da vida.',
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
    resources: {
      enabled: true,
      items: [
        {
          title: 'Método exclusivo e comprovado',
          description: 'Uma abordagem única, com estratégias práticas e testadas para desvendar o caminho da riqueza.',
          icon: 'Award',
        },
        {
          title: 'Aulas presenciais',
          description: 'Interação direta e imersiva com instrutores experientes, em um ambiente propício ao aprendizado.',
          icon: 'Users',
        },
        {
          title: 'Material de apoio abrangente',
          description: 'Apostilas detalhadas, exercícios práticos e acesso a conteúdo exclusivo para solidificar seu conhecimento.',
          icon: 'BookOpen',
        },
      ],
    },
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
