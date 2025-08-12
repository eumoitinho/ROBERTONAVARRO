// Script para migrar todo o conteúdo existente para o Sanity
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c2lnfkl6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'sku3NuSJsrRD4behyaUUkiddYZeUT37ei1qVx0arD76Qqu9yIYPHvNqlU79xvbsssQogmBKz4mvNZbAUIJZ5bDVls2PRWltMs6K3gzh1iD9mS5s71rusuacKm8EPZwo85XfP1ALeZ0BPbKk1J3H5nLNAWhA4fYh40md9Cf5mWFUALqu6gFIY',
  useCdn: false
})

async function migrate() {
  console.log('🚀 Iniciando migração do conteúdo para o Sanity...')

  try {
    // 1. CONFIGURAÇÕES DO SITE
    console.log('\n📋 Migrando configurações do site...')
    const siteSettings = {
      _id: 'siteSettings',
      _type: 'siteSettings',
      title: 'Roberto Navarro - Educação Financeira',
      description: 'Transforme sua vida financeira com Roberto Navarro',
      
      // WhatsApp Configuration
      whatsapp: {
        enabled: true,
        number: '5511999999999',
        message: 'Olá! Vim pelo site e gostaria de mais informações.',
        showDelay: 3,
        buttonText: 'Fale Conosco',
        position: 'bottom-right'
      },

      // Event Popup
      eventPopup: {
        enabled: true,
        showDelay: 3,
        badge: 'PRÓXIMO EVENTO',
        title: 'SEGREDOS DA',
        highlightText: 'MENTE MILIONÁRIA',
        description: 'Transforme sua mentalidade e aprenda os segredos dos milionários em um evento presencial exclusivo',
        date: '2025-08-09T09:00:00Z',
        location: 'São Paulo - SP',
        time: '9h às 18h',
        buttonText: 'GARANTIR MINHA VAGA',
        buttonLink: 'https://sun.eduzz.com/Z0B5XXE6WA'
      },

      // Lead Popup
      leadPopup: {
        enabled: true,
        showDelay: 30,
        showOnExitIntent: true,
        title: '🔥 Não Perca Esta Oportunidade!',
        subtitle: 'Receba conteúdos exclusivos',
        description: 'Seja o primeiro a saber das novidades e receba conteúdos exclusivos sobre educação financeira',
        fields: ['name', 'email', 'phone'],
        buttonText: 'QUERO RECEBER',
        successMessage: 'Obrigado! Em breve entraremos em contato.'
      },

      // Navigation
      navigation: {
        mainMenu: [
          {
            label: 'Início',
            link: '/'
          },
          {
            label: 'Formações',
            link: '/formacoes',
            submenu: [
              {
                label: 'Educador Financeiro',
                link: '/formacoes/educador-financeiro',
                description: 'Torne-se um especialista em educação financeira'
              },
              {
                label: 'Empreendedor Inteligente',
                link: '/formacoes/empreendedor-inteligente',
                description: 'Desenvolva habilidades empresariais'
              },
              {
                label: 'Método TF',
                link: '/formacoes/metodo-tf',
                description: 'Desbloqueie a riqueza em sua vida'
              },
              {
                label: 'Mentor Coaching Financeiro',
                link: '/formacoes/mentor-coaching-financeiro',
                description: 'Transforme-se em um gerador de riqueza'
              }
            ]
          },
          {
            label: 'Livros',
            link: '/livros'
          },
          {
            label: 'Eventos',
            link: '/eventos'
          },
          {
            label: 'Blog',
            link: '/blog'
          },
          {
            label: 'Contato',
            link: '#contato'
          }
        ],
        ctaButton: {
          text: 'QUERO MUDAR MINHA VIDA',
          link: '#formacoes',
          style: 'primary'
        }
      },

      // Footer
      footer: {
        description: 'Transformando vidas financeiras em todo o Brasil desde 2015. Mais de 130 mil pessoas já passaram por nossas formações e mentorias.',
        columns: [
          {
            title: 'Formações',
            links: [
              { label: 'Educador Financeiro', link: '/formacoes/educador-financeiro' },
              { label: 'Empreendedor Inteligente', link: '/formacoes/empreendedor-inteligente' },
              { label: 'LCF Mentoring Pro', link: '/formacoes/lcf-mentoring-pro' },
              { label: 'Mentoria Individual', link: '/formacoes/mentoria-individual' }
            ]
          },
          {
            title: 'Conteúdo',
            links: [
              { label: 'Lives', link: '/lives' },
              { label: 'Livros', link: '/livros' },
              { label: 'Blog', link: '/blog' }
            ]
          },
          {
            title: 'Eventos',
            links: [
              { label: 'Energia do Dinheiro', link: '/eventos/energia-do-dinheiro' },
              { label: 'Escalador de Negócios', link: '/eventos/escalador-de-negocios' },
              { label: 'Crenças da Riqueza', link: '/eventos/crencas-da-riqueza' }
            ]
          },
          {
            title: 'Institucional',
            links: [
              { label: 'Sobre Roberto Navarro', link: '/#sobre' },
              { label: 'Contato', link: '/contato' },
              { label: 'Política de Privacidade', link: '/politica-privacidade' },
              { label: 'Trabalhe Conosco', link: '/trabalhe-conosco' }
            ]
          }
        ],
        newsletter: {
          enabled: true,
          title: 'Receba nossos conteúdos',
          subtitle: 'Dicas exclusivas toda semana',
          placeholder: 'Seu melhor e-mail',
          buttonText: 'Inscrever-se'
        },
        copyright: '© 2025 Roberto Navarro. Todos os direitos reservados.',
        showReclameAqui: true
      },

      // Social Media
      socialMedia: {
        facebook: 'https://facebook.com/robertonavarrooficial',
        instagram: 'https://instagram.com/robertonavarrooficial',
        youtube: 'https://youtube.com/robertonavarrooficial',
        linkedin: 'https://linkedin.com/in/robertonavarrooficial',
        tiktok: 'https://tiktok.com/@robertonavarrooficial',
        whatsapp: 'https://wa.me/5511999999999'
      },

      // Contact
      contact: {
        email: 'contato@robertonavarro.com.br',
        supportEmail: 'suporte@robertonavarro.com.br',
        phone: '(11) 9999-9999',
        whatsapp: '5511999999999',
        address: 'São Paulo - SP',
        mapUrl: 'https://maps.google.com'
      },

      // Theme
      theme: {
        primaryColor: '#F59E0B',
        secondaryColor: '#D97706',
        fontFamily: 'Inter',
        darkMode: true
      }
    }
    
    await client.createOrReplace(siteSettings)
    console.log('✅ Configurações do site migradas')

    // 2. HOME PAGE
    console.log('\n📋 Migrando conteúdo da Home Page...')
    const homePage = {
      _id: 'homePage',
      _type: 'homePage',
      hero: {
        headline: 'TRANSFORME SUA VIDA FINANCEIRA',
        highlightText: 'EM 90 DIAS',
        subheadline: 'Descubra o método comprovado que já ajudou mais de 130 mil pessoas a conquistar liberdade financeira e viver com propósito',
        ctaButtons: [
          {
            text: 'QUERO MUDAR MINHA VIDA',
            link: '#formacoes',
            style: 'primary',
            icon: 'ArrowRight'
          },
          {
            text: 'Assistir Apresentação',
            link: '#video',
            style: 'outline',
            icon: 'Video'
          }
        ],
        statistics: [
          { number: '130K+', label: 'Alunos Transformados', icon: 'Users' },
          { number: '15+', label: 'Anos de Experiência', icon: 'TrendingUp' },
          { number: '98%', label: 'Taxa de Satisfação', icon: 'Star' }
        ]
      },
      about: {
        badge: 'QUEM SOMOS',
        title: 'Há mais de 15 anos',
        highlightText: 'transformando vidas',
        description: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Roberto Navarro é referência nacional em educação financeira e já impactou mais de 130 mil pessoas com seus treinamentos, mentorias e livros. Sua missão é democratizar o acesso ao conhecimento financeiro e ajudar pessoas a conquistarem liberdade e prosperidade.'
              }
            ]
          }
        ],
        achievements: [
          {
            icon: 'Users',
            title: '130.000+',
            description: 'Alunos formados'
          },
          {
            icon: 'BookOpen',
            title: '5 Livros',
            description: 'Best-sellers publicados'
          },
          {
            icon: 'TrendingUp',
            title: '15+ Anos',
            description: 'De experiência no mercado'
          },
          {
            icon: 'Star',
            title: '98%',
            description: 'De satisfação dos alunos'
          }
        ],
        ctaButton: {
          text: 'CONHECER MAIS',
          link: '#sobre'
        }
      },
      formations: {
        badge: 'FORMAÇÕES',
        title: 'Escolha sua',
        highlightText: 'JORNADA DE TRANSFORMAÇÃO',
        subtitle: 'Programas completos para você dominar suas finanças e conquistar a vida dos seus sonhos',
        ctaButton: {
          text: 'VER TODAS AS FORMAÇÕES',
          link: '/formacoes'
        }
      },
      events: {
        badge: 'EVENTOS',
        title: 'Participe dos nossos',
        highlightText: 'EVENTOS PRESENCIAIS',
        subtitle: 'Experiências transformadoras que vão mudar sua mentalidade sobre dinheiro',
        featuredEvents: [
          {
            title: 'Segredos da Mente Milionária',
            description: 'Descubra os segredos dos milionários',
            date: '2025-08-09T09:00:00Z',
            location: 'São Paulo - SP',
            link: '/eventos/segredos-da-mente-milionaria',
            buttonText: 'Saiba Mais'
          },
          {
            title: 'Energia do Dinheiro',
            description: 'Liberte-se das crenças limitantes',
            date: '2025-09-15T09:00:00Z',
            location: 'Rio de Janeiro - RJ',
            link: '/eventos/energia-do-dinheiro',
            buttonText: 'Saiba Mais'
          }
        ]
      },
      testimonials: {
        badge: 'DEPOIMENTOS',
        title: 'O que dizem nossos',
        highlightText: 'ALUNOS TRANSFORMADOS',
        subtitle: 'Histórias reais de pessoas que mudaram de vida',
        testimonialsList: [
          {
            name: 'Carlos Silva',
            role: 'Empresário',
            content: 'O método do Roberto mudou completamente minha visão sobre dinheiro. Em 6 meses, consegui quitar todas as minhas dívidas e hoje tenho uma reserva de emergência.',
            rating: 5
          },
          {
            name: 'Ana Paula',
            role: 'Professora',
            content: 'Sempre tive medo de investir. Após o curso, aprendi a fazer meu dinheiro trabalhar para mim. Hoje tenho múltiplas fontes de renda.',
            rating: 5
          },
          {
            name: 'João Santos',
            role: 'Consultor',
            content: 'A mentoria foi um divisor de águas na minha vida. Triplicei meu faturamento e consegui expandir meu negócio.',
            rating: 5
          }
        ]
      },
      ctaSection: {
        title: 'PRONTO PARA',
        highlightText: 'TRANSFORMAR SUA VIDA?',
        description: 'Junte-se a mais de 130 mil pessoas que já mudaram sua realidade financeira',
        buttons: [
          {
            text: 'COMEÇAR AGORA',
            link: '#formacoes',
            style: 'primary'
          }
        ]
      },
      seo: {
        metaTitle: 'Roberto Navarro - Educação Financeira e Liberdade',
        metaDescription: 'Transforme sua vida financeira com Roberto Navarro. Cursos, mentorias e livros para conquistar liberdade financeira.',
        keywords: ['educação financeira', 'roberto navarro', 'liberdade financeira', 'investimentos', 'mentoria']
      }
    }
    
    await client.createOrReplace(homePage)
    console.log('✅ Home Page migrada')

    // 3. FORMAÇÕES
    console.log('\n📋 Migrando formações...')
    const formations = [
      {
        _id: 'formation-educador-financeiro',
        _type: 'formation',
        title: 'Educador Financeiro',
        slug: { current: 'educador-financeiro' },
        subtitle: 'Torne-se um especialista em educação financeira',
        description: 'Programa completo para você se tornar um educador financeiro certificado e ajudar pessoas a transformarem suas vidas financeiras.',
        price: {
          value: 2997,
          discount: 50,
          installments: 12
        },
        features: [
          'Certificação reconhecida',
          '120 horas de conteúdo',
          'Suporte vitalício',
          'Material didático completo',
          'Comunidade exclusiva'
        ],
        modules: [
          {
            title: 'Módulo 1 - Fundamentos',
            description: 'Base sólida em educação financeira',
            lessons: ['Introdução', 'Conceitos básicos', 'Planejamento']
          },
          {
            title: 'Módulo 2 - Investimentos',
            description: 'Estratégias de investimento',
            lessons: ['Renda fixa', 'Renda variável', 'Diversificação']
          }
        ],
        guarantee: {
          days: 7,
          description: 'Garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do seu investimento.'
        }
      },
      {
        _id: 'formation-empreendedor-inteligente',
        _type: 'formation',
        title: 'Empreendedor Inteligente',
        slug: { current: 'empreendedor-inteligente' },
        subtitle: 'Desenvolva habilidades empresariais de alto nível',
        description: 'Aprenda a construir e escalar negócios de sucesso com inteligência emocional e financeira.',
        price: {
          value: 4997,
          discount: 40,
          installments: 12
        },
        features: [
          'Mentoria em grupo',
          '200 horas de conteúdo',
          'Cases de sucesso',
          'Networking exclusivo',
          'Bônus especiais'
        ],
        modules: [
          {
            title: 'Módulo 1 - Mindset Empreendedor',
            description: 'Desenvolvendo a mentalidade vencedora',
            lessons: ['Propósito', 'Visão', 'Estratégia']
          },
          {
            title: 'Módulo 2 - Gestão Inteligente',
            description: 'Ferramentas de gestão moderna',
            lessons: ['Finanças', 'Pessoas', 'Processos']
          }
        ],
        guarantee: {
          days: 15,
          description: 'Teste por 15 dias. Satisfação garantida ou seu dinheiro de volta.'
        }
      }
    ]

    for (const formation of formations) {
      await client.createOrReplace(formation)
    }
    console.log('✅ Formações migradas')

    // 4. EVENTOS
    console.log('\n📋 Migrando eventos...')
    const events = [
      {
        _id: 'event-segredos-mente-milionaria',
        _type: 'event',
        title: 'Segredos da Mente Milionária',
        slug: { current: 'segredos-da-mente-milionaria' },
        subtitle: 'Transforme sua mentalidade sobre dinheiro',
        description: 'Um dia intensivo para reprogramar suas crenças limitantes e desenvolver uma mentalidade de abundância.',
        eventType: 'presencial',
        date: '2025-08-09T09:00:00Z',
        time: {
          start: '09:00',
          end: '18:00',
          timezone: 'America/Sao_Paulo'
        },
        location: {
          venue: 'Centro de Convenções',
          address: 'Av. Paulista, 1000',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil'
        },
        pricing: {
          isFree: false,
          tickets: [
            {
              name: 'Ingresso Individual',
              price: 497,
              earlyBirdPrice: 297,
              quantity: 500,
              benefits: ['Acesso completo', 'Material didático', 'Certificado']
            }
          ],
          purchaseLink: 'https://sun.eduzz.com/Z0B5XXE6WA',
          purchaseButtonText: 'GARANTIR MINHA VAGA'
        },
        capacity: {
          total: 500,
          available: 127,
          showAvailability: true
        },
        status: 'upcoming',
        featured: true
      },
      {
        _id: 'event-energia-dinheiro',
        _type: 'event',
        title: 'Energia do Dinheiro',
        slug: { current: 'energia-do-dinheiro' },
        subtitle: 'Liberte-se das crenças limitantes',
        description: 'Workshop transformador para quebrar padrões negativos com dinheiro.',
        eventType: 'presencial',
        date: '2025-09-15T09:00:00Z',
        time: {
          start: '09:00',
          end: '18:00',
          timezone: 'America/Sao_Paulo'
        },
        location: {
          venue: 'Hotel Copacabana Palace',
          address: 'Av. Atlântica, 1702',
          city: 'Rio de Janeiro',
          state: 'RJ',
          country: 'Brasil'
        },
        pricing: {
          isFree: false,
          tickets: [
            {
              name: 'Ingresso Individual',
              price: 597,
              earlyBirdPrice: 397,
              quantity: 300,
              benefits: ['Acesso VIP', 'Material exclusivo', 'Jantar incluso']
            }
          ],
          purchaseLink: '#',
          purchaseButtonText: 'INSCREVER-SE'
        },
        capacity: {
          total: 300,
          available: 89,
          showAvailability: true
        },
        status: 'upcoming',
        featured: true
      }
    ]

    for (const event of events) {
      await client.createOrReplace(event)
    }
    console.log('✅ Eventos migrados')

    // 5. LIVROS
    console.log('\n📋 Migrando livros...')
    const books = [
      {
        _id: 'book-sabedoria-dinheiro',
        _type: 'book',
        title: 'A Sabedoria do Dinheiro',
        slug: { current: 'sabedoria-do-dinheiro' },
        author: 'Roberto Navarro',
        subtitle: 'Transforme sua mentalidade financeira',
        description: 'Best-seller que já transformou a vida de milhares de pessoas. Aprenda os princípios fundamentais para conquistar liberdade financeira.',
        isbn: '978-85-123456-78-9',
        publisher: 'Editora Gente',
        publishDate: '2020-03-15',
        pages: 256,
        language: 'Português',
        categories: ['Finanças Pessoais', 'Desenvolvimento Pessoal'],
        pricing: {
          regularPrice: 49.90,
          salePrice: 34.90,
          currency: 'BRL'
        },
        purchaseLinks: [
          {
            platform: 'amazon',
            url: 'https://amazon.com.br',
            buttonText: 'Comprar na Amazon'
          }
        ],
        formats: ['physical', 'ebook'],
        featured: true,
        order: 1
      },
      {
        _id: 'book-quebrando-mitos',
        _type: 'book',
        title: 'Quebrando Mitos com o Dinheiro',
        slug: { current: 'quebrando-mitos' },
        author: 'Roberto Navarro',
        subtitle: 'Liberte-se das crenças limitantes',
        description: 'Descubra como crenças limitantes estão sabotando seu sucesso financeiro e aprenda a reprogramar sua mente.',
        isbn: '978-85-123456-79-0',
        publisher: 'Editora Gente',
        publishDate: '2021-06-10',
        pages: 312,
        language: 'Português',
        categories: ['Finanças Pessoais', 'Psicologia'],
        pricing: {
          regularPrice: 54.90,
          salePrice: 39.90,
          currency: 'BRL'
        },
        purchaseLinks: [
          {
            platform: 'amazon',
            url: 'https://amazon.com.br',
            buttonText: 'Comprar na Amazon'
          }
        ],
        formats: ['physical', 'ebook', 'audiobook'],
        featured: true,
        order: 2
      }
    ]

    for (const book of books) {
      await client.createOrReplace(book)
    }
    console.log('✅ Livros migrados')

    // 6. CATEGORIAS DO BLOG
    console.log('\n📋 Criando categorias do blog...')
    const categories = [
      {
        _id: 'category-financas',
        _type: 'category',
        title: 'Finanças Pessoais',
        slug: { current: 'financas-pessoais' },
        description: 'Dicas e estratégias para organizar suas finanças'
      },
      {
        _id: 'category-investimentos',
        _type: 'category',
        title: 'Investimentos',
        slug: { current: 'investimentos' },
        description: 'Aprenda a investir com inteligência'
      },
      {
        _id: 'category-empreendedorismo',
        _type: 'category',
        title: 'Empreendedorismo',
        slug: { current: 'empreendedorismo' },
        description: 'Dicas para empreendedores'
      }
    ]

    for (const category of categories) {
      await client.createOrReplace(category)
    }
    console.log('✅ Categorias criadas')

    console.log('\n✨ MIGRAÇÃO CONCLUÍDA COM SUCESSO!')
    console.log('📌 Acesse http://localhost:3009/studio para ver todo o conteúdo')
    
  } catch (error) {
    console.error('❌ Erro na migração:', error)
  }
}

migrate()