export async function seedTestimonials(payload: any) {
  const testimonial1 = await payload.create({
    collection: 'testimonials',
    data: {
      name: 'Maria Silva',
      role: 'Empresária',
      company: 'Silva Consultoria',
      testimonial: 'A formação de Educador Financeiro mudou minha vida completamente. Hoje tenho minha própria consultoria e ajudo dezenas de pessoas todos os meses.',
      rating: 5,
      featured: true,
      category: 'formacao',
      order: 1,
    },
  })

  const testimonial2 = await payload.create({
    collection: 'testimonials',
    data: {
      name: 'João Santos',
      role: 'Coach Financeiro',
      testimonial: 'Em 6 meses após a certificação, multipliquei minha renda por 5. O método funciona de verdade!',
      rating: 5,
      featured: true,
      category: 'formacao',
      order: 2,
    },
  })

  const testimonial3 = await payload.create({
    collection: 'testimonials',
    data: {
      name: 'Ana Costa',
      role: 'Investidora',
      testimonial: 'O evento Crenças da Riqueza foi transformador. Identifiquei bloqueios que nem sabia que tinha e hoje minha relação com dinheiro é completamente diferente.',
      rating: 5,
      featured: true,
      category: 'evento',
      order: 3,
    },
  })

  console.log('✅ Depoimentos criados')

  return {
    testimonial1,
    testimonial2,
    testimonial3,
  }
}
