import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Sliders, X } from 'lucide-react'
import { useReverseGeocode } from '../hooks/useReverseGeocode'
import RadiusSlider from './RadiusSlider'

export default function Header({ coords, radius, onRadiusChange, showControls = false }) {
  const { place } = useReverseGeocode(coords?.lat, coords?.lon)
  const [mobileSliderOpen, setMobileSliderOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-xl bg-[#0A0A0F]/85 border-b border-white/[0.06]"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded-lg"
            aria-label="SportLinkr home"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
              aria-hidden="true"
            >
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm text-white hidden sm:inline tracking-tight">
              Sport<span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
              >Linkr</span>
            </span>
          </Link>

          {/* Location chip */}
          {coords && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/60 shrink-0">
              <MapPin className="w-3 h-3 text-violet-400" aria-hidden="true" />
              <span className="max-w-[140px] truncate">{place || 'Locating...'}</span>
            </div>
          )}

          <div className="flex-1" />

          {/* Radius slider — desktop */}
          {showControls && onRadiusChange && (
            <div className="hidden lg:flex items-center gap-3 w-56">
              <RadiusSlider value={radius} onChange={onRadiusChange} />
            </div>
          )}

          {/* Radius icon — mobile */}
          {showControls && onRadiusChange && (
            <button
              className="lg:hidden w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.07] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
              onClick={() => setMobileSliderOpen((v) => !v)}
              aria-label="Adjust search radius"
              aria-expanded={mobileSliderOpen}
            >
              {mobileSliderOpen ? (
                <X className="w-4 h-4 text-white/60" aria-hidden="true" />
              ) : (
                <Sliders className="w-4 h-4 text-white/60" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {/* Mobile radius row */}
        {showControls && mobileSliderOpen && onRadiusChange && (
          <div className="lg:hidden pb-3">
            <RadiusSlider value={radius} onChange={onRadiusChange} />
          </div>
        )}
      </div>
    </header>
  )
}
