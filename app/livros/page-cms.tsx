import { getPage, getBooks } from '@/lib/sanity/fetch'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HomePageContent from '@/components/home-page-content'

export default async function LivrosPageCMS() {
  let pageData = null
  let booksData = null

  try {
    pageData = await getPage('livros')
  } catch (error) {
    console.log('Sanity CMS not available for livros page, using fallback content:', error)
  }

  try {
    booksData = await getBooks()
  } catch (error) {
    console.log('Sanity CMS not available for books data, using fallback content:', error)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader />
      
      <HomePageContent 
        homePageData={pageData} 
        siteSettings={null}
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}