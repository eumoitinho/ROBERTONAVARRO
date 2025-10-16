export const bookBySlugQuery = `
  *[_type == "bookPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    hero {
      badge,
      title,
      subtitle,
      description,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      coverImagePath,
      ctaText,
      purchaseLink,
      rating,
      totalReviews,
      gradientFrom,
      gradientTo
    },
    aboutSection {
      title,
      paragraphs,
      highlightText
    },
    pillarsSection {
      badge,
      title,
      description,
      items[] {
        title,
        description,
        icon
      }
    },
    benefitsSection {
      badge,
      title,
      items[] {
        title,
        description,
        icon
      }
    },
    chaptersSection {
      badge,
      title,
      chapters[] {
        title,
        description
      }
    },
    authorSection {
      badge,
      title,
      name,
      subtitle,
      bio,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      imagePath
    },
    ctaSection {
      title,
      description,
      ctaText,
      price,
      originalPrice
    },
    seo {
      title,
      description,
      keywords
    }
  }
`

export const allBooksQuery = `
  *[_type == "bookPage"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    hero {
      title,
      subtitle,
      coverImagePath,
      rating,
      totalReviews
    }
  }
`
