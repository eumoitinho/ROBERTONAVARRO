"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  animation: string
  animationDelay?: string
  threshold?: number
  className?: string
}

export const ScrollAnimation = ({
  children,
  animation,
  animationDelay,
  threshold = 0.1,
  className = "",
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.classList.add("animated")
            target.classList.add(animation)
            observer.unobserve(target)
          }
        })
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [animation, threshold])

  return (
    <div ref={elementRef} className={`scroll-animation ${className}`} style={{ animationDelay: animationDelay }}>
      {children}
    </div>
  )
}

export default ScrollAnimation
