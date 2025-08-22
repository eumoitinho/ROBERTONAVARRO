"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getUTMParams, buildURLWithUTM } from "@/lib/utm-tracker"
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

  useEffect(() => {
    // Only process UTM params if we have a valid Eduzz URL
    if (eduzzUrl && eduzzUrl !== "#form" && eduzzUrl.includes("eduzz.com")) {
      const utmParams = getUTMParams()
      const linkWithUTM = buildURLWithUTM(eduzzUrl, utmParams)
      setCtaLink(linkWithUTM)
      
      // Log for debugging
      if (Object.keys(utmParams).length > 0) {
        console.log('UTM Parameters captured:', utmParams)
        console.log('Final URL with UTM:', linkWithUTM)
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
        target={eduzzUrl.includes("eduzz.com") ? "_blank" : "_self"}
        rel={eduzzUrl.includes("eduzz.com") ? "noopener noreferrer" : undefined}
      >
        {buttonText}
        {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
      </a>
    </Button>
  )
}