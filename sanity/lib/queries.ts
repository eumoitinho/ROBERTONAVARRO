import { groq } from 'next-sanity'

// Site Settings Query
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    favicon,
    whatsapp,
    eventPopup,
    leadPopup,
    navigation,
    footer,
    socialMedia,
    contact,
    analytics,
    defaultSeo,
    theme
  }
`

// Home Page Query
export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    hero,
    about,
    formations {
      ...,
      featuredFormations[]->{
        _id,
        title,
        slug,
        subtitle,
        description,
        heroImage,
        price
      }
    },
    events,
    books,
    testimonials,
    transformationVideos,
    ctaSection,
    location,
    seo
  }
`

// Blog Queries
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

// Page Queries
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

// Formation Queries
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

// Event Queries
export const EVENTS_QUERY = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    heroImage,
    eventType,
    date,
    endDate,
    time,
    location,
    pricing,
    status,
    featured
  }
`

export const EVENT_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    description,
    longDescription,
    heroImage,
    eventType,
    date,
    endDate,
    time,
    location,
    pricing,
    capacity,
    speakers,
    schedule,
    benefits,
    targetAudience,
    partners,
    testimonials,
    gallery,
    videos,
    faq,
    cta,
    status,
    featured,
    seo
  }
`

export const UPCOMING_EVENTS_QUERY = groq`
  *[_type == "event" && status == "upcoming"] | order(date asc) {
    _id,
    title,
    slug,
    description,
    heroImage,
    date,
    location,
    pricing
  }
`

// Book Queries
export const BOOKS_QUERY = groq`
  *[_type == "book"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    author,
    subtitle,
    description,
    coverImage,
    pricing,
    purchaseLinks,
    formats,
    featured
  }
`

export const BOOK_QUERY = groq`
  *[_type == "book" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    subtitle,
    description,
    longDescription,
    coverImage,
    backCoverImage,
    isbn,
    publisher,
    publishDate,
    pages,
    language,
    categories,
    pricing,
    purchaseLinks,
    formats,
    highlights,
    chapters,
    testimonials,
    preview,
    bonus,
    faq,
    seo,
    featured
  }
`

export const FEATURED_BOOKS_QUERY = groq`
  *[_type == "book" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    author,
    subtitle,
    description,
    coverImage,
    pricing,
    purchaseLinks
  }
`

// Navigation Queries
export const NAVIGATION_QUERY = groq`
  *[_type == "navigation" && active == true][0] {
    _id,
    title,
    items,
    ctaButton,
    mobileMenu
  }
`

// Footer Query
export const FOOTER_QUERY = groq`
  *[_type == "footer" && active == true][0] {
    _id,
    title,
    logo,
    description,
    columns,
    socialMedia,
    newsletter,
    contact,
    payments,
    certifications,
    bottomBar,
    floatingButtons,
    scripts
  }
`

// Popup Queries
export const ACTIVE_POPUPS_QUERY = groq`
  *[_type == "popup" && active == true] | order(priority desc) {
    _id,
    title,
    slug,
    type,
    content,
    form,
    buttons,
    trigger,
    display,
    targeting,
    frequency,
    styling,
    analytics,
    schedule
  }
`

export const POPUP_QUERY = groq`
  *[_type == "popup" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    content,
    form,
    buttons,
    trigger,
    display,
    targeting,
    frequency,
    styling,
    analytics,
    schedule,
    active
  }
`

// Live Page Query
export const LIVE_PAGE_QUERY = groq`
  *[_type == "livePage"][0] {
    _id,
    title,
    hero,
    currentLive {
      ...,
      registrationForm->{
        _id,
        title,
        slug,
        type,
        content,
        form
      }
    },
    upcomingLives,
    pastLives,
    categories,
    newsletter,
    seo
  }
`

// Policies Query
export const POLICIES_QUERY = groq`
  *[_type == "policies" && active == true] {
    _id,
    title,
    slug,
    type
  }
`

export const POLICY_QUERY = groq`
  *[_type == "policies" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    content,
    sections,
    lastUpdated,
    effectiveDate,
    version,
    contactInfo
  }
`

// Career Page Query
export const CAREER_PAGE_QUERY = groq`
  *[_type == "careerPage"][0] {
    _id,
    title,
    hero,
    culture,
    benefits,
    jobOpenings,
    applicationProcess,
    testimonials,
    talentBank,
    faq,
    seo
  }
`