// Simple helper to initialize and track Meta (Facebook) Pixel events
// Pixel ID: 529635403083441
// Usage:
// 1. Included via root layout Script injection (see app/layout.tsx)
// 2. Use trackMetaEvent('Lead') or other standard events where needed

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const META_PIXEL_ID = '529635403083441';

export function trackMetaEvent(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params || {});
  }
}
