"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  animation: string
  delay?: string
  threshold?: number
  className?: string
}

export const ScrollAnimation = ({
  children,
  animation,
  delay = "",
  threshold = 0.1,
  className = "",
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated")
            entry.target.classList.add(animation)
            if (delay) {
              entry.target.classList.add(delay)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [animation, delay, threshold])

  return (
    <div ref={elementRef} className={`scroll-animation ${className}`}>
      {children}
    </div>
  )
}

// Also add a default export for backward compatibility
export default ScrollAnimation
