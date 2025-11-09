export async function seedPages(payload: any) {
  const politicaPrivacidade = await payload.create({
    collection: 'pages',
    data: {
      title: 'Política de Privacidade',
      slug: 'politica-privacidade',
      status: 'published',
      layout: 'default',
      hero: {
        title: 'Política de Privacidade',
        subtitle: 'Última atualização: Janeiro de 2025',
      },
      content: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais quando você utiliza nossos serviços.',
            },
          ],
        },
      ],
      seo: {
        title: 'Política de Privacidade | Roberto Navarro',
        description: 'Conheça nossa política de privacidade e como protegemos seus dados.',
        keywords: 'política de privacidade, lgpd, proteção de dados',
      },
    },
  })

  const trabalheConosco = await payload.create({
    collection: 'pages',
    data: {
      title: 'Trabalhe Conosco',
      slug: 'trabalhe-conosco',
      status: 'published',
      layout: 'form',
      hero: {
        title: 'Trabalhe Conosco',
        subtitle: 'Faça parte do nosso time e ajude a transformar vidas através da educação financeira',
      },
      form: {
        formId: 'trabalhe-conosco',
        submitText: 'Enviar Candidatura',
        successMessage: 'Obrigado! Recebemos sua candidatura e entraremos em contato em breve.',
      },
      seo: {
        title: 'Trabalhe Conosco | Roberto Navarro',
        description: 'Junte-se ao nosso time e faça parte da transformação financeira de milhões de pessoas.',
        keywords: 'trabalhe conosco, vagas, carreiras, roberto navarro',
      },
    },
  })

  const obrigado = await payload.create({
    collection: 'pages',
    data: {
      title: 'Obrigado',
      slug: 'obrigado',
      status: 'published',
      layout: 'default',
      hero: {
        title: 'Obrigado pela sua compra!',
        subtitle: 'Seu pagamento está sendo processado',
      },
      content: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Você receberá um email de confirmação em breve com todos os detalhes de acesso.',
            },
          ],
        },
      ],
      seo: {
        title: 'Obrigado | Roberto Navarro',
        description: 'Página de confirmação de compra',
        keywords: 'obrigado, confirmação',
      },
    },
  })

  console.log('✅ Páginas criadas')

  return {
    politicaPrivacidade,
    trabalheConosco,
    obrigado,
  }
}
