export const formationBySlugQuery = `*[_type == "formationPage" && slug.current == $slug] | order(_updatedAt desc)[0]{
  _id,
  title,
  slug,
  hero{ title, subtitle, description, ctaText, ctaLink, backgroundImage{asset->{url}} },
  controls{ showBenefits, showMainContent, showHighlights, showBonuses, showPricing, showTestimonials, showFaq },
  mainContent{ badge, title, description, items[]{ title, description, benefits[] } },
  benefits{ badge, title, description, items[]{ title, description } },
  highlights{ badge, title, items[]{ title, description, image{asset->{url}} } },
  bonuses{ badge, title, items[]{ value, title, description } },
  pricing{ badge, title, description, tickets[]{ name, price, description, features[], highlighted, ctaText, ctaLink } },
  testimonials{ badge, title, description, items[]{ name, role, quote, rating } },
  faq{ badge, title, items[]{ question, answer } },
  finalCta{ title, description, buttonText, buttonLink }
}`


