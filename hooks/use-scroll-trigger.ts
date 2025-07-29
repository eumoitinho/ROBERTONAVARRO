"use client"

import { useState, useEffect } from "react"

interface UseScrollTriggerProps {
  threshold?: number // Percentage of page height to trigger (default: 50% = second fold)
  delay?: number // Delay in milliseconds before showing popup
}

export function useScrollTrigger({ 
  threshold = 50, 
  delay = 1000 
}: UseScrollTriggerProps = {}) {
  const [isTriggered, setIsTriggered] = useState(false)
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('leadPopupShown')
    if (hasSeenPopup) {
      setHasBeenTriggered(true)
      return
    }

    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      if (hasBeenTriggered) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100

      if (scrollPercentage >= threshold) {
        // Clear any existing timeout
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        // Set delay before showing popup
        timeoutId = setTimeout(() => {
          setIsTriggered(true)
          setHasBeenTriggered(true)
          // Mark as shown in session storage
          sessionStorage.setItem('leadPopupShown', 'true')
        }, delay)

        // Remove scroll listener to prevent multiple triggers
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [threshold, delay, hasBeenTriggered])

  const resetTrigger = () => {
    setIsTriggered(false)
    setHasBeenTriggered(false)
    sessionStorage.removeItem('leadPopupShown')
  }

  return {
    isTriggered,
    hasBeenTriggered,
    resetTrigger
  }
}