import { groq } from 'next-sanity'

export const POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    mainImage,
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    excerpt,
    body
  }
`

export const POST_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    mainImage,
    categories[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    excerpt,
    body,
    seo
  }
`

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const PAGES_QUERY = groq`
  *[_type == "page"] {
    _id,
    title,
    slug,
    pageType,
    hero,
    sections,
    seo
  }
`

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageType,
    hero,
    sections,
    seo
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    title,
    logo,
    favicon,
    header,
    footer,
    socialMedia,
    contact,
    analytics,
    defaultSeo
  }
`

export const FORMATIONS_QUERY = groq`
  *[_type == "formation"] | order(title asc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    heroImage,
    price,
    features
  }
`

export const FORMATION_QUERY = groq`
  *[_type == "formation" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    description,
    heroImage,
    price,
    features,
    modules,
    benefits,
    testimonials,
    faq,
    cta,
    guarantee,
    seo
  }
`