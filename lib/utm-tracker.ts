/**
 * Utility functions to capture and preserve UTM parameters from URL
 */

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  [key: string]: string | undefined
}

/**
 * Capture UTM parameters from current URL
 */
export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') {
    return {}
  }

  const searchParams = new URLSearchParams(window.location.search)
  const utmParams: UTMParams = {}

  // Capture standard UTM parameters
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  
  utmKeys.forEach(key => {
    const value = searchParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  // Also capture any other tracking parameters that might be relevant
  const additionalParams = ['ref', 'source', 'fbclid', 'gclid']
  additionalParams.forEach(key => {
    const value = searchParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  return utmParams
}

/**
 * Build URL with UTM parameters
 */
export function buildURLWithUTM(baseURL: string, utmParams: UTMParams): string {
  if (!baseURL || Object.keys(utmParams).length === 0) {
    return baseURL
  }

  try {
    // Handle both relative and absolute URLs
    const url = baseURL.startsWith('http') 
      ? new URL(baseURL)
      : new URL(baseURL, window.location.origin)

    // Add UTM parameters to the URL
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value)
      }
    })

    // Return the full URL for external links, or pathname + search for internal
    return baseURL.startsWith('http') 
      ? url.toString()
      : url.pathname + url.search
  } catch (error) {
    console.error('Error building URL with UTM:', error)
    return baseURL
  }
}

/**
 * Store UTM parameters in sessionStorage for persistence across navigation
 */
export function storeUTMParams(utmParams: UTMParams): void {
  if (typeof window === 'undefined' || Object.keys(utmParams).length === 0) {
    return
  }

  try {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams))
  } catch (error) {
    console.error('Error storing UTM params:', error)
  }
}

/**
 * Retrieve stored UTM parameters from sessionStorage
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const stored = sessionStorage.getItem('utm_params')
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error retrieving UTM params:', error)
    return {}
  }
}

/**
 * Get UTM parameters - first try from URL, then from storage
 */
export function getUTMParams(): UTMParams {
  const urlParams = captureUTMParams()
  
  // If we have UTM params in URL, use and store them
  if (Object.keys(urlParams).length > 0) {
    storeUTMParams(urlParams)
    return urlParams
  }
  
  // Otherwise, get from storage
  return getStoredUTMParams()
}