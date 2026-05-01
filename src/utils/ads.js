// TODO: Replace ca-pub-XXXXXXXXXXXXXXXX with your actual AdSense publisher ID in both spots below

/**
 * Injects the AdSense script tag into the document head.
 * Only runs in production builds to avoid dev console errors.
 */
export function loadAdSenseScript() {
  if (!import.meta.env.PROD) return
  if (document.querySelector('script[data-adsense]')) return

  const script = document.createElement('script')
  script.async = true
  script.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX'
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-adsense', 'true')
  document.head.appendChild(script)
}

/**
 * Pushes a new ad slot to the adsbygoogle queue.
 * Safe to call even if AdSense hasn't loaded yet.
 */
export function pushAd() {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    // AdSense not loaded or blocked — silently ignore
  }
}
