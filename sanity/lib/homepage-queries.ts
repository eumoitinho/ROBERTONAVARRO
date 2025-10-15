import { groq } from 'next-sanity';

// Query para buscar a homepage
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    _type,
    title,
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
    showQuemSomosSection,
    showTransformationVideos,
    showTestimonials,
    showLocationMap,
    showEventPopup,
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

