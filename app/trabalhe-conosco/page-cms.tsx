import { getPage } from '@/lib/sanity/fetch'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HomePageContent from '@/components/home-page-content'

export default async function TrabalheConoscoPageCMS() {
  let pageData = null

  try {
    pageData = await getPage('trabalhe-conosco')
  } catch (error) {
    console.log('Sanity CMS not available for trabalhe-conosco page, using fallback content:', error)
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