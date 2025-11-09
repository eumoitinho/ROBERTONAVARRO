export async function seedMentores(payload: any) {
  const robertoNavarro = await payload.create({
    collection: 'mentores',
    data: {
      name: 'Roberto Navarro',
      slug: 'roberto-navarro',
      role: 'Fundador e CEO',
      shortBio: 'Especialista em educação financeira com mais de 20 anos de experiência. Autor de 4 best-sellers e mentor de mais de 1.5 milhão de pessoas.',
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

  return {
    robertoNavarro,
  }
}
