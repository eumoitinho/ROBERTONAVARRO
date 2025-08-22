import { getFormation } from '@/lib/sanity/fetch'
import { SiteHeader } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { TestimonialsSection } from '@/components/testimonials-section'
import FormationPageContent from '@/components/formation-page-content'

export default async function MentoriaPageCMS() {
  let formationData = null

  try {
    formationData = await getFormation('mentoria')
  } catch (error) {
    console.log('Sanity CMS not available for formation, using fallback content:', error)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader />
      
      <FormationPageContent 
        formationData={formationData} 
        slug="mentoria"
      />
      
      <TestimonialsSection />
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}