import { getBlogPosts } from '@/lib/payload/client'
import LivePreview from '@/components/live-preview'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Clock, User, Calendar, Tag, Search } from 'lucide-react'
import BlogPageClient from './blog-page-client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  const posts = await getBlogPosts()

  // Extrair categorias únicas dos posts
  const categoriesSet = new Set<string>(['Todas'])
  posts.forEach((post: any) => {
    if (post.category) {
      categoriesSet.add(post.category)
    }
  })
  const categories = Array.from(categoriesSet)

  return (
    <>
      <LivePreview />
      <BlogPageClient initialPosts={posts} categories={categories} />
    </>
  )
}
