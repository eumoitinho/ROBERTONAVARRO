"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface GlowEffectProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
  glowOpacity?: number
}

export default function GlowEffect({
  children,
  className = "",
  glowColor = "rgba(255, 215, 0, 0.3)",
  glowSize = 300,
  glowOpacity = 0.7,
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", () => setIsHovered(true))
      container.addEventListener("mouseleave", () => setIsHovered(false))
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", () => setIsHovered(true))
        container.removeEventListener("mouseleave", () => setIsHovered(false))
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={{ isolation: "isolate" }}>
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 rounded-full blur-[80px]"
          style={{
            left: position.x,
            top: position.y,
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            background: glowColor,
            transform: "translate(-50%, -50%)",
            opacity: glowOpacity,
            zIndex: -1,
          }}
        />
      )}
      {children}
    </div>
  )
}
