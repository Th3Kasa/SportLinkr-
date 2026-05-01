import { useEffect, useRef } from 'react'
import { pushAd } from '../utils/ads'

// TODO: Replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense publisher ID
// TODO: Replace the data-ad-slot value with your actual ad slot ID

export default function AdSlot({ className = '' }) {
  const pushed = useRef(false)

  useEffect(() => {
    if (!pushed.current) {
      pushed.current = true
      pushAd()
    }
  }, [])

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-surface border border-white/5 ${className}`}
      style={{ minHeight: 90 }}
      aria-label="Advertisement"
    >
      <span className="absolute top-2 right-3 text-[10px] text-white/20 uppercase tracking-widest z-10 pointer-events-none select-none">
        Sponsored
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
