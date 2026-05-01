import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ExternalLink, Navigation, AlertCircle } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { buildDirectionsUrl } from '../utils/formatters'
import { getSport } from '../utils/sports'
import { fadeUp } from '../utils/motion'

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
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      onClick={() => onClick(venue)}
      className={`
        group relative bg-white/[0.03] backdrop-blur-xl border rounded-2xl p-6 cursor-pointer
        transition-colors overflow-hidden
        ${isSelected
          ? 'border-violet-400/40 shadow-[0_0_60px_-15px_rgba(167,139,250,0.35)]'
          : 'border-white/[0.06] hover:border-white/10 hover:shadow-[0_0_60px_-15px_rgba(167,139,250,0.25)]'
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
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        aria-hidden="true"
      />

      {/* Top row: sport badge + unverified chip */}
      <div className="relative flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
          style={{
            background: `${sport.color}15`,
            color: sport.color,
            borderColor: `${sport.color}30`,
          }}
        >
          <SportIcon iconName={sport.icon} className="w-3 h-3" />
          {sport.label}
        </span>
        {venue.unverified && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-400/10 border border-amber-400/20 text-amber-400">
            <AlertCircle className="w-3 h-3" aria-hidden="true" />
            Verify availability
          </span>
        )}
      </div>

      {/* Venue name */}
      <h3 className="relative text-xl font-semibold text-white mb-3 leading-tight line-clamp-2 tracking-tight">
        {venue.name}
      </h3>

      {/* Address — only render if present */}
      {venue.address && (
        <p className="relative text-[15px] text-white/50 mb-3 flex items-start gap-2 line-clamp-2 leading-relaxed">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-white/30" aria-hidden="true" />
          {venue.address}
        </p>
      )}

      {/* Contact rows — only render if values exist */}
      {(venue.phone || venue.email) && (
        <div className="relative flex flex-col gap-1.5 mb-4">
          {venue.phone && (
            <a
              href={`tel:${venue.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-violet-400 transition-colors"
              aria-label={`Call ${venue.name}`}
            >
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {venue.phone}
            </a>
          )}
          {venue.email && (
            <a
              href={`mailto:${venue.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-violet-400 transition-colors truncate"
              aria-label={`Email ${venue.name}`}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{venue.email}</span>
            </a>
          )}
        </div>
      )}

      {/* Unverified notice */}
      {venue.unverified && (
        <p className="relative text-xs text-amber-400/70 mb-3 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          May offer {sport.label} — verify before visiting
        </p>
      )}

      {/* Actions */}
      <div className="relative flex gap-2 border-t border-white/[0.06] pt-4 mt-auto">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_-4px_rgba(167,139,250,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
          style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
          aria-label={`Get directions to ${venue.name}`}
        >
          <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
          Get Directions
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick(venue)
          }}
          className="px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm font-medium hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
          aria-label={`View details for ${venue.name}`}
        >
          View details
        </button>
      </div>
    </motion.article>
  )
}
