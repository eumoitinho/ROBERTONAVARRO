export const eventBySlugQuery = `
  *[_type == "eventPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    hero {
      title,
      subtitle,
      secondTitle,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      ctaText,
      ctaHref,
      secondaryCtaText,
      secondaryCtaHref,
      showCountdown,
      countdownTargetDate
    },
    benefitsSection {
      badge,
      title,
      description,
      benefits[] {
        title,
        description,
        icon
      }
    },
    challengesSection {
      badge,
      title,
      description,
      challenges[] {
        question,
        answer,
        icon
      }
    },
    learningSection {
      badge,
      title,
      description,
      items[] {
        title,
        description,
        icon
      }
    },
    programSection {
      badge,
      title,
      description,
      blocks[] {
        title,
        subtitle,
        icon,
        description,
        items[] {
          text
        }
      }
    },
    audienceSection {
      badge,
      title,
      description,
      items[] {
        text,
        icon
      }
    },
    highlightsSection {
      badge,
      title,
      description,
      highlights[] {
        title,
        description,
        icon
      }
    },
    mentorsSection {
      badge,
      title,
      description,
      mentors[] {
        name,
        title,
        image {
          asset->{
            _id,
            url
          },
          alt
        },
        description,
        achievements[] {
          text
        }
      }
    },
    registrationSection {
      badge,
      title,
      description,
      eventDate,
      eventTime,
      eventLocation,
      ticketTypes[] {
        id,
        name,
        price,
        description,
        benefits,
        featured,
        eduzzContentId
      }
    },
    faqSection {
      badge,
      title,
      description,
      faqs[] {
        question,
        answer
      }
    },
    newsletterSection {
      source,
      title,
      description,
      ctaText,
      eventDate,
      eventTime,
      eventLocation
    },
    seo {
      title,
      description,
      keywords
    }
  }
`

export const allEventsQuery = `
  *[_type == "eventPage"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    hero {
      title,
      subtitle,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`
