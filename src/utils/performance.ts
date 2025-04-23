// Performance optimization utilities
export const optimizeImages = (src: string): string => {
  // Add image optimization parameters
  return `${src}?auto=format&fit=crop&w=800&q=80`
}

export const preloadCriticalAssets = () => {
  // Preload critical assets
  const criticalAssets = ['/fonts/inter-var.woff2', '/images/logo.svg']

  criticalAssets.forEach((asset) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = asset
    link.as = asset.endsWith('.woff2') ? 'font' : 'image'
    document.head.appendChild(link)
  })
}

export const setupServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered with scope:', registration.scope)
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }
}

export const optimizeFontLoading = () => {
  // Add font-display: swap to critical fonts
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400 700;
      font-display: swap;
      src: url('/fonts/inter-var.woff2') format('woff2');
    }
  `
  document.head.appendChild(style)
}

export const setupResourceHints = () => {
  // Add resource hints for critical resources
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
  ]

  hints.forEach((hint) => {
    const link = document.createElement('link')
    link.rel = hint.rel
    link.href = hint.href
    document.head.appendChild(link)
  })
}
