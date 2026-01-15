export type NavigationSubItem = {
  title: string
  href: string
  description?: string
}

export type NavigationItem = {
  title: string
  href: string
  items?: NavigationSubItem[]
  isButton?: boolean
}

export const navigationItemsDefault: NavigationItem[] = [
  {
    title: "Início",
    href: "/",
  },
  {
    title: "Formações",
    href: "/formacoes",
    items: [
      {
        title: "Educador Financeiro",
        href: "/formacoes/educador-financeiro",
        description: "Torne-se um especialista em educação financeira",
      },
      {
        title: "Empreendedor Inteligente",
        href: "/formacoes/empreendedor-inteligente",
        description: "Desenvolva habilidades empresariais",
      },
      {
        title: "Método TF",
        href: "/formacoes/metodo-tf",
        description: "Desbloqueie a riqueza em sua vida",
      },
      {
        title: "Mentor Coaching Financeiro",
        href: "/formacoes/mentor-coaching-financeiro",
        description: "Transforme-se em um gerador de riqueza",
      },
    ],
  },
  {
    title: "Conteúdo",
    href: "/conteudo",
    items: [
      {
        title: "Lives",
        href: "/lives",
        description: "Transmissões ao vivo e gravadas",
      },
      {
        title: "Livros",
        href: "/livros",
        description: "Biblioteca de conhecimento financeiro",
      },
    ],
  },
  {
    title: "Livros",
    href: "/livros",
    items: [
      {
        title: "A Sabedoria do Dinheiro",
        href: "/livros/sabedoria-do-dinheiro",
        description: "Transforme sua mentalidade financeira",
      },
      {
        title: "Quebrando Mitos com o Dinheiro",
        href: "/livros/quebrando-mitos",
        description: "Liberte-se das crenças limitantes",
      },
      {
        title: "A Arte de Enriquecer",
        href: "/livros/arte-de-enriquecer",
        description: "Metodologia prática para prosperar",
      },
      {
        title: "Coaching Financeiro",
        href: "/livros/coaching-financeiro",
        description: "Técnicas avançadas de coaching",
      },
    ],
  },
  {
    title: "Eventos",
    href: "/eventos",
    items: [
      {
        title: "Segredos da Mente Milionária",
        href: "/eventos/segredos-da-mente-milionaria",
        description: "Workshop de transformação mental",
      },
      {
        title: "Escalador de Negócios",
        href: "/eventos/escalador-de-negocios",
        description: "Estratégias para escalar empresas",
      },
      {
        title: "Energia do Dinheiro",
        href: "/eventos/energia-do-dinheiro",
        description: "Alinhe sua energia com a abundância",
      },
      {
        title: "Crenças da Riqueza",
        href: "/eventos/crencas-da-riqueza",
        description: "Reprograme suas crenças financeiras",
      },
      {
        title: "Mentor Milionário",
        href: "/eventos/mentor-milionario",
        description: "Transforme conhecimento em fortuna",
      },
    ],
  },
  {
    title: "Mentorias",
    href: "/formacoes",
    items: [
      {
        title: "Mentoria de Investimentos",
        href: "/formacoes/mentoria-de-investimentos",
        description: "Aprenda a investir com segurança",
      },
      {
        title: "Mentoria Individual",
        href: "/formacoes/mentoria-individual",
        description: "Acompanhamento personalizado 1:1",
      },
      {
        title: "LCF Mentoring Pro",
        href: "/formacoes/lcf-mentoring-pro",
        description: "Mentoria completa em liberdade financeira",
      },
      {
        title: "LCF Mentoring",
        href: "/formacoes/mentoria",
        description: "Acompanhamento personalizado",
      },
    ],
  },
  {
    title: "Sobre",
    href: "#quem-somos",
  },
  {
    title: "Contato",
    href: "#contato",
  },
]
