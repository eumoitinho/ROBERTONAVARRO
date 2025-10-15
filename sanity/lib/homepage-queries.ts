export const homepageQuery = `*[_type == "homepage"][0]{
  _id,
  title,
  heroSection{
    badge,
    title,
    subtitle,
    description,
    achievementsNumber,
    achievementsLabel,
    primaryButtonText,
    primaryButtonLink,
    backgroundImage{asset->{url}}
  },
  formacoesSection{
    badge,
    title,
    highlightedText,
    description,
    formacoes[]{title, description, link, buttonText}
  },
  mentorSection{
    badge,
    title,
    highlightedText,
    subtitle,
    backgroundImage{asset->{url}},
    bioParagraphs,
    stats[]{icon, value, label}
  },
  videosSection{
    badge,
    title,
    highlightedText,
    description,
    videos[]{youtubeId, title, person, description, chipLabel, thumbnail{asset->{url}}},
    stats[]{icon, title, description},
    ctaButtonText,
    ctaButtonLink
  },
  testimonialsSection{
    badge,
    title,
    highlightedText,
    description,
    testimonials[]{name, role, initial, quote, rating, image{asset->{url}}},
    ctaText,
    ctaButtonText,
    ctaButtonLink
  },
  locationSection{
    show,
    mapEmbedUrl,
    address,
    phone,
    email
  },
  sectionControls{
    showMentorSection,
    showVideosSection,
    showTestimonialsSection,
    showLocationSection,
    showEventPopup
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    ogImage{asset->{url}}
  }
}`


