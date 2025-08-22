import { getPage } from '@/lib/sanity/fetch'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import HomePageContent from '@/components/home-page-content'

export default async function PoliticaPrivacidadePageCMS() {
  let pageData = null

  try {
    pageData = await getPage('politica-privacidade')
  } catch (error) {
    console.log('Sanity CMS not available for politica-privacidade page, using fallback content:', error)
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