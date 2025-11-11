import dotenv from 'dotenv'
import { getPayloadClient } from '../lib/payload/client'

dotenv.config()

async function updateEducadorFinanceiro() {
  console.log('🔄 Atualizando Formação Educador Financeiro com dados reais...')

  try {
    const payload = await getPayloadClient()

    // Buscar formação existente
    const result = await payload.find({
      collection: 'formacoes',
      where: {
        slug: {
          equals: 'educador-financeiro',
        },
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      console.log('❌ Formação não encontrada. Execute o seed primeiro.')
      process.exit(1)
    }

    const formacao = result.docs[0]

    // Atualizar com dados reais
    await payload.update({
      collection: 'formacoes',
      id: formacao.id,
      data: {
        accentColor: '#DC2626', // Red
        hero: {
          badge: 'EDUCADOR FINANCEIRO',
          title: 'EDUCADOR FINANCEIRO',
          subtitle: 'A única formação do mercado com LICENÇA PROFISSIONAL chancelada pela Roberto Navarro Academia - RNA',
          description: [
            {
              type: 'p',
              children: [
                {
                  text: 'Torne-se um Educador Financeiro licenciado com certificação reconhecida pelo MEC. Transforme vidas enquanto constrói sua própria prosperidade com respaldo profissional e metodologia validada.',
                },
              ],
            },
          ],
          ctaText: 'QUERO MINHA LICENÇA PROFISSIONAL!',
          ctaLink: '#inscricao',
        },
        modules: [
          {
            title: 'MÓDULO INICIAL - MUDANÇA DE MENTALIDADE',
            description: 'Fundamentos para transformação mental e financeira',
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
            description: 'Diagnóstico e organização da vida financeira',
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
            description: 'Estratégias para aumentar renda e criar fontes múltiplas',
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
            description: 'Estratégias de investimento e construção de patrimônio',
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
            description: 'Ensinamentos avançados e visão de mentor',
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
        benefits: [
          {
            title: 'Certificação Reconhecida',
            description: 'Certificado validado pelo MEC e Licença Profissional RNA',
            icon: 'Award',
          },
          {
            title: 'Método Validado',
            description: 'Metodologia testada e aprovada por mais de 130 mil alunos',
            icon: 'BookOpen',
          },
          {
            title: 'Conhecimento Abrangente',
            description: 'Desde os fundamentos até estratégias avançadas de educação financeira',
            icon: 'TrendingUp',
          },
          {
            title: 'Ferramentas Práticas',
            description: 'Planilhas, templates e recursos prontos para usar com seus clientes',
            icon: 'Users',
          },
        ],
        bonuses: [
          {
            title: 'Material Didático Completo',
            description: '5 apostilas físicas com mais de 30 exercícios e dinâmicas',
            value: 'R$ 997',
          },
          {
            title: 'Acesso a Comunidade Exclusiva',
            description: 'Network com outros educadores financeiros',
            value: 'R$ 497',
          },
          {
            title: 'Mentoria em Grupo',
            description: '12 encontros ao vivo com especialistas',
            value: 'R$ 1.997',
          },
          {
            title: '3 Dias Intensos ao Vivo Online',
            description: 'Com Roberto Navarro pessoalmente',
            value: 'R$ 2.997',
          },
          {
            title: 'Programa de Afiliação Premium',
            description: 'Possibilidade de se afiliar com produto de 70% de comissão',
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
                  text: 'Garantia incondicional de 7 dias. Se não ficar satisfeito, devolvemos 100% do seu investimento. Além disso, garantia de resultados em 6 meses: se você aplicar todo o conteúdo e não obtiver resultados, devolvemos o DOBRO do seu investimento.',
                },
              ],
            },
          ],
        },
        certification: {
          hasCertification: true,
          certificationText: [
            {
              type: 'p',
              children: [
                {
                  text: 'Certificado reconhecido pelo MEC através de parceria com instituição de ensino credenciada. Válido em todo território nacional. Além disso, você receberá a Licença Profissional RNA (Roberto Navarro Academia) que é a ÚNICA licença profissional chancelada para atuar como Educador Financeiro no mercado.',
                },
              ],
            },
          ],
        },
      },
    })

    console.log('✅ Formação Educador Financeiro atualizada com dados reais!')
    console.log('📝 Agora você pode editar no admin e ver no Live Preview')
  } catch (error) {
    console.error('❌ Erro ao atualizar:', error)
    process.exit(1)
  }
}

updateEducadorFinanceiro()

