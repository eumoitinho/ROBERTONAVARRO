export async function seedMentores(payload: any) {
  // Buscar photoId para usar nos mentores
  let photoMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: 'placeholder-user.jpg',
      },
    },
    limit: 1,
  })

  let photoId: string | undefined
  if (photoMedia.docs.length === 0) {
    console.log('⚠️  Nenhuma mídia encontrada. Criando mentores sem foto (você pode adicionar depois no admin)')
  } else {
    photoId = photoMedia.docs[0].id
  }

  // Verificar se Roberto já existe
  const existing = await payload.find({
    collection: 'mentores',
    where: {
      slug: {
        equals: 'roberto-navarro',
      },
    },
    limit: 1,
  })

  let robertoNavarro
  if (existing.docs.length > 0) {
    console.log('⚠️  Mentor "Roberto Navarro" já existe, usando existente...')
    robertoNavarro = existing.docs[0]
  } else {
    robertoNavarro = await payload.create({
      collection: 'mentores',
      data: {
        name: 'Roberto Navarro',
        slug: 'roberto-navarro',
        role: 'Fundador e CEO',
        photo: photoId || undefined,
        shortBio:
          'Especialista em educação financeira com mais de 20 anos de experiência. Autor de 4 best-sellers e mentor de mais de 1.5 milhão de pessoas.',
        bio: 'Roberto Navarro é um dos maiores especialistas em educação financeira do Brasil. Com mais de 20 anos de experiência, já transformou a vida de mais de 1.5 milhão de pessoas através de seus cursos, livros e mentorias.',
        achievements: [
          { text: 'Mais de 1.5 milhão de alunos transformados' },
          { text: 'Autor de 4 livros best-sellers' },
          { text: '20+ anos de experiência em educação financeira' },
          { text: 'Fundador de múltiplas empresas de sucesso' },
          { text: 'Palestrante internacional' },
        ],
        stats: [
          { label: 'Alunos', value: '1.5M+' },
          { label: 'Anos de experiência', value: '20+' },
          { label: 'Livros publicados', value: '4' },
          { label: 'Empresas fundadas', value: '10+' },
        ],
        social: {
          instagram: '@robertonavarrooficial',
          youtube: '@robertonavarro',
          linkedin: 'robertonavarro',
        },
        featured: true,
        order: 1,
      },
    })
    console.log('✅ Mentor Roberto Navarro criado')
  }

  // Criar Raíssa Navarro
  const existingRaissa = await payload.find({
    collection: 'mentores',
    where: {
      slug: {
        equals: 'raissa-navarro',
      },
    },
    limit: 1,
  })

  let raissaNavarro
  if (existingRaissa.docs.length > 0) {
    console.log('⚠️  Mentor "Raíssa Navarro" já existe, usando existente...')
    raissaNavarro = existingRaissa.docs[0]
  } else {
    raissaNavarro = await payload.create({
      collection: 'mentores',
      data: {
        name: 'Raíssa Navarro',
        slug: 'raissa-navarro',
        role: 'Especialista em PNL',
        photo: photoId || undefined,
        shortBio:
          'Especialista em comportamento humano e referência nacional em Programação Neurolinguística (PNL). Membro da The Society of NLP.',
        bio: [
          {
            text: 'Membro da The Society of NLP, Raíssa Navarro é uma das poucas profissionais brasileiras autorizadas a ensinar PNL diretamente pela linha do Dr. Richard Bandler, cocriador da técnica.',
          },
          {
            text: 'Foi selecionada para compor a equipe de apoio do próprio Tony Robbins, o maior nome do coaching no mundo.',
          },
          {
            text: 'Raissa conduz seus alunos por um caminho de autoconhecimento, consciência e libertação emocional, sempre com bom humor e energia elevada.',
          },
        ],
        achievements: [
          { text: 'Membro da The Society of NLP' },
          { text: 'Equipe de apoio do Tony Robbins' },
          { text: 'Uma das poucas autorizadas a ensinar PNL no Brasil' },
          { text: 'Referência nacional em PNL' },
        ],
        featured: true,
        order: 2,
      },
    })
    console.log('✅ Mentor Raíssa Navarro criado')
  }

  return {
    robertoNavarro,
    raissaNavarro,
  }
}
