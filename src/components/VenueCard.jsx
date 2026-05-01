import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ExternalLink, Search } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { buildDirectionsUrl } from '../utils/formatters'
import { getSport } from '../utils/sports'

function SportIcon({ iconName, className }) {
  const Icon = LucideIcons[iconName]
  if (!Icon) return null
  return <Icon className={className} aria-hidden="true" />
}

export default function VenueCard({ venue, sportId, onClick, isSelected }) {
  const sport = getSport(sportId)

  const directionsUrl = buildDirectionsUrl(
    venue.name,
    venue.address,
    venue.lat,
    venue.lon
  )

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(venue)}
      className={`
        bg-white/5 backdrop-blur-xl border rounded-2xl p-5 cursor-pointer
        transition-shadow hover:shadow-glow
        ${isSelected
          ? 'border-accent/60 shadow-glow'
          : 'border-white/10 hover:border-accent/30'
        }
      `}
      role="button"
      tabIndex={0}
      aria-label={`${venue.name} — click for details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(venue)
        }
      }}
    >
      {/* Sport badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: `${sport.color}20`,
            color: sport.color,
            border: `1px solid ${sport.color}40`,
          }}
        >
          <SportIcon iconName={sport.icon} className="w-3 h-3" />
          {sport.label}
        </span>
        {venue.unverified && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-400/10 border border-amber-400/20 text-amber-400">
            <Search className="w-3 h-3" aria-hidden="true" />
            Unverified
          </span>
        )}
      </div>

      {/* Venue name */}
      <h3 className="text-base font-semibold text-white mb-1 leading-tight line-clamp-2">
        {venue.name}
      </h3>

      {/* Address */}
      {venue.address ? (
        <p className="text-sm text-white/50 mb-3 flex items-start gap-1.5 line-clamp-2">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white/30" aria-hidden="true" />
          {venue.address}
        </p>
      ) : (
        <p className="text-sm text-white/25 mb-3 italic">Address not listed</p>
      )}

      {/* Contact row */}
      <div className="flex items-center gap-4 mb-4">
        <span
          className={`flex items-center gap-1.5 text-xs ${venue.phone ? 'text-white/60' : 'text-white/25 italic'}`}
        >
          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
          {venue.phone || 'Not listed'}
        </span>
        <span
          className={`flex items-center gap-1.5 text-xs ${venue.email ? 'text-white/60' : 'text-white/25 italic'}`}
        >
          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
          {venue.email || 'Not listed'}
        </span>
      </div>

      {/* Unverified notice */}
      {venue.unverified && (
        <p className="text-xs text-amber-400/70 mb-3 flex items-center gap-1">
          <Search className="w-3 h-3 shrink-0" aria-hidden="true" />
          May offer {sport.label} — verify before visiting
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 border-t border-white/5 pt-3">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-bg text-sm font-semibold hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg"
          aria-label={`Get directions to ${venue.name}`}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          Get Directions
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick(venue)
          }}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label={`View details for ${venue.name}`}
        >
          Details
        </button>
      </div>
    </motion.article>
  )
}
