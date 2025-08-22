import { ReactNode } from 'react'
import { getSiteSettings } from '@/lib/sanity/fetch'
import { DynamicHeader } from '@/components/dynamic-header'
import { DynamicFooter } from '@/components/dynamic-footer'
import WhatsAppButton from '@/components/whatsapp-button'

interface SiteLayoutProps {
  children: ReactNode
  className?: string
}

export default async function SiteLayout({ children, className = '' }: SiteLayoutProps) {
  let siteSettings = null
  let navigationData = null
  let footerData = null

  try {
    // Fetch site settings and navigation data from Sanity
    siteSettings = await getSiteSettings()
    
    // In a real implementation, you would have separate queries for navigation and footer
    // For now, we'll extract this data from site settings or use defaults
    navigationData = siteSettings?.navigation || null
    footerData = siteSettings?.footer || null
  } catch (error) {
    console.log('Sanity CMS not available for site layout, using fallback content:', error)
  }

  return (
    <div className={`min-h-screen bg-zinc-950 text-white ${className}`}>
      <DynamicHeader 
        navigationData={navigationData} 
        siteSettings={siteSettings} 
      />
      
      <main className="pt-16">
        {children}
      </main>
      
      <DynamicFooter 
        footerData={footerData} 
        siteSettings={siteSettings} 
      />
      
      <WhatsAppButton />
    </div>
  )
}