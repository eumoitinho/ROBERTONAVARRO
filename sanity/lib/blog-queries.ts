import { groq } from 'next-sanity'

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    content,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    category,
    publishedAt,
    readingTime,
    featured
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    content,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    category,
    publishedAt,
    readingTime,
    featured
  }
`

export const blogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    content,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    category,
    publishedAt,
    readingTime,
    featured
  }
`

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    content,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    category,
    publishedAt,
    readingTime,
    featured
  }
`

export const blogCategoriesQuery = groq`
  array::unique(*[_type == "blogPost"].category)
`
