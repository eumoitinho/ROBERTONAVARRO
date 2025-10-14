import { groq } from 'next-sanity';

// Query para buscar uma página por slug
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && isActive == true][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    isActive,
    heroSection {
      title,
      subtitle,
      description,
      backgroundImage {
        asset->,
        alt
      },
      backgroundColor,
      textColor,
      primaryButton,
      secondaryButton
    },
    mainContent,
    contentSections[] {
      _type,
      _key,
      _type == 'textSection' => {
        title,
        subtitle,
        content,
        backgroundColor
      },
      _type == 'imageSection' => {
        title,
        image {
          asset->,
          alt
        },
        caption,
        layout
      },
      _type == 'ctaSection' => {
        title,
        description,
        buttonText,
        buttonLink,
        style
      },
      _type == 'featuresSection' => {
        title,
        features[] {
          _key,
          icon,
          title,
          description
        }
      },
      _type == 'videoSection' => {
        title,
        videoUrl,
        description
      }
    },
    gallery[] {
      asset->,
      alt,
      caption
    },
    testimonials[] {
      _key,
      name,
      role,
      content,
      image {
        asset->
      },
      rating
    },
    faq[] {
      _key,
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->
      },
      noIndex
    },
    settings {
      showHeader,
      showFooter,
      showWhatsAppButton,
      customCSS
    },
    pageType,
    order
  }
`;

// Query para buscar todas as páginas ativas
export const allPagesQuery = groq`
  *[_type == "page" && isActive == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    pageType,
    order,
    heroSection {
      title,
      subtitle
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// Query para buscar páginas por tipo
export const pagesByTypeQuery = groq`
  *[_type == "page" && pageType == $pageType && isActive == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    pageType,
    heroSection {
      title,
      subtitle,
      backgroundImage {
        asset->
      }
    }
  }
`;

// Query para buscar todos os slugs das páginas (para generateStaticParams)
export const allPageSlugsQuery = groq`
  *[_type == "page" && isActive == true && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Query para buscar configurações do site
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteUrl,
    logo {
      asset->
    },
    tagline,
    contact,
    socialMedia,
    mainNavigation[] {
      _key,
      title,
      href,
      isButton,
      openInNewTab
    },
    footer {
      copyrightText,
      footerLinks[] {
        _key,
        title,
        href
      },
      showSocialMedia
    },
    seo {
      defaultMetaTitle,
      defaultMetaDescription,
      defaultOgImage {
        asset->
      },
      googleAnalyticsId,
      facebookPixelId
    },
    scripts
  }
`;

// Query para buscar homepage específica
export const homepageQuery = groq`
  *[_type == "page" && (pageType == "homepage" || slug.current == "/") && isActive == true][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    isActive,
    heroSection {
      title,
      subtitle,
      description,
      backgroundImage {
        asset->,
        alt
      },
      backgroundColor,
      textColor,
      primaryButton,
      secondaryButton
    },
    mainContent,
    contentSections[] {
      _type,
      _key,
      _type == 'textSection' => {
        title,
        subtitle,
        content,
        backgroundColor
      },
      _type == 'imageSection' => {
        title,
        image {
          asset->,
          alt
        },
        caption,
        layout
      },
      _type == 'ctaSection' => {
        title,
        description,
        buttonText,
        buttonLink,
        style
      },
      _type == 'featuresSection' => {
        title,
        features[] {
          _key,
          icon,
          title,
          description
        }
      },
      _type == 'videoSection' => {
        title,
        videoUrl,
        description
      }
    },
    gallery[] {
      asset->,
      alt,
      caption
    },
    testimonials[] {
      _key,
      name,
      role,
      content,
      image {
        asset->
      },
      rating
    },
    faq[] {
      _key,
      question,
      answer
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->
      },
      noIndex
    },
    settings {
      showHeader,
      showFooter,
      showWhatsAppButton,
      customCSS
    },
    pageType,
    order
  }
`;
