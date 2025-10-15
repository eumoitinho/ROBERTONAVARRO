"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getUTMParams, buildURLWithUTM } from "@/lib/tracking/utm-tracker"
import { ArrowRight } from "lucide-react"

interface EventCTAButtonProps {
  eduzzUrl: string
  buttonText?: string
  className?: string
  showArrow?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function EventCTAButton({
  eduzzUrl,
  buttonText = "GARANTIR MINHA VAGA",
  className = "",
  showArrow = true,
  variant = "default",
  size = "default"
}: EventCTAButtonProps) {
  const [ctaLink, setCtaLink] = useState(eduzzUrl || "#form")
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Recapture UTMs at click time to ensure we have the latest
    const utmParams = getUTMParams()
    
    if (eduzzUrl.includes("eduzz.com") || eduzzUrl.includes("blinket.com")) {
      const finalUrl = buildURLWithUTM(eduzzUrl, utmParams)
      
      console.log('=== CLICK EVENT ===')
      console.log('UTMs at click time:', utmParams)
      console.log('Final URL being opened:', finalUrl)
      
      // Prevent default and manually open with the correct URL
      e.preventDefault()
      window.open(finalUrl, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    // Process UTM params for Eduzz or Blinket URLs
    if (eduzzUrl && eduzzUrl !== "#form") {
      // Always try to get UTM params, regardless of the URL
      const utmParams = getUTMParams()
      
      // Debug logs
      console.log('EventCTAButton - Original URL:', eduzzUrl)
      console.log('EventCTAButton - UTM Params found:', utmParams)
      console.log('EventCTAButton - Current URL:', window.location.href)
      
      // Build URL with UTMs if it's an external link
      if (eduzzUrl.includes("eduzz.com") || eduzzUrl.includes("blinket.com")) {
        const linkWithUTM = buildURLWithUTM(eduzzUrl, utmParams)
        console.log('EventCTAButton - Final URL with UTM:', linkWithUTM)
        setCtaLink(linkWithUTM)
      } else {
        setCtaLink(eduzzUrl)
      }
    }
  }, [eduzzUrl])

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      asChild
    >
      <a 
        href={ctaLink}
        onClick={handleClick}
        target={(eduzzUrl.includes("eduzz.com") || eduzzUrl.includes("blinket.com.br")) ? "_blank" : "_self"}
        rel={(eduzzUrl.includes("eduzz.com") || eduzzUrl.includes("blinket.com.br")) ? "noopener noreferrer" : undefined}
      >
        {buttonText}
        {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
      </a>
    </Button>
  )
}