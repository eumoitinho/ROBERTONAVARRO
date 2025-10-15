"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface ParallaxSectionProps {
  children: React.ReactNode
  backgroundImage: string
  overlayColors?: string[]
  className?: string
  speed?: number
}

export default function ParallaxSection({
  children,
  backgroundImage,
  overlayColors = ["rgba(0, 0, 0, 0.7)", "rgba(255, 215, 0, 0.3)"],
  className = "",
  speed = 0.15,
}: ParallaxSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const element = sectionRef.current
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isVisible) {
          const scrollPos = window.scrollY - (rect.top + window.scrollY - window.innerHeight)
          setScrollPosition(scrollPos * speed)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 w-full h-full" style={{ transform: `translateY(${scrollPosition}px)` }}>
        <Image src={backgroundImage || "/placeholder.svg"} alt="Background" fill className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${overlayColors[0]} 0%, ${overlayColors[1]} 100%)`,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
