import { getAllPosts, getCategories } from '@/lib/blog/queries'
import BlogPageClient from './page-client'

export const revalidate = 60

export default async function BlogPage() {
  const [posts, categoriesData] = await Promise.all([
          getAllPosts(),
          getCategories()
  ])
  
  // Convert categories to string array
  const categories = ["Todas", ...categoriesData.map(cat => cat._title)]
  
  return <BlogPageClient posts={posts} categories={categories} />
}