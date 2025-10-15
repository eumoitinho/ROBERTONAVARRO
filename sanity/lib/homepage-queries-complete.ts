import { groq } from 'next-sanity';

// Query completa para buscar a homepage com TODOS os dados
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    _type,
    title,
    
    // Hero Section
    heroSection {
      badge,
      title,
      subtitle,
      description,
      backgroundImage {
        asset->,
        hotspot,
        crop
      },
      primaryButtonText,
      primaryButtonLink,
      achievementsNumber,
      achievementsLabel
    },
    
    // Formações Section
    formacoesSection {
      badge,
      title,
      highlightedText,
      description,
      formacoes[] {
        title,
        description,
        link,
        buttonText
      }
    },
    
    // Mentor Section
    mentorSection {
      badge,
      title,
      highlightedText,
      subtitle,
      backgroundImage {
        asset->,
        hotspot,
        crop
      },
      bioParagraphs,
      stats[] {
        icon,
        value,
        label
      }
    },
    
    // Videos Section
    videosSection {
      badge,
      title,
      highlightedText,
      description,
      videos[] {
        youtubeId,
        title,
        person,
        description,
        chipLabel,
        thumbnail {
          asset->
        }
      },
      stats[] {
        icon,
        title,
        description
      },
      ctaButtonText,
      ctaButtonLink
    },
    
    // Testimonials Section
    testimonialsSection {
      badge,
      title,
      highlightedText,
      description,
      testimonials[] {
        name,
        role,
        initial,
        quote,
        rating,
        image {
          asset->
        }
      },
      ctaText,
      ctaButtonText,
      ctaButtonLink
    },
    
    // Location Section
    locationSection {
      show,
      address,
      phone,
      email,
      mapEmbedUrl
    },
    
    // Section Controls
    sectionControls {
      showMentorSection,
      showVideosSection,
      showTestimonialsSection,
      showLocationSection,
      showEventPopup
    },
    
    // SEO
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->
      }
    }
  }
`;

