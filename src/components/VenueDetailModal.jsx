import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Navigation,
  Search,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { buildDirectionsUrl, buildContactString } from '../utils/formatters'
import { getSport } from '../utils/sports'

function SportIcon({ iconName, className, style }) {
  const Icon = LucideIcons[iconName]
  if (!Icon) return null
  return <Icon className={className} style={style} aria-hidden="true" />
}

function InfoRow({ icon: Icon, label, value, href }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-white/40" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/30 mb-0.5">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-white/80 break-words">{value}</p>
        )}
      </div>
    </div>
  )
}

export default function VenueDetailModal({ venue, sportId, onClose }) {
  const [copied, setCopied] = useState(false)
  const sport = getSport(sportId)

  const directionsUrl = buildDirectionsUrl(
    venue.name,
    venue.address,
    venue.lat,
    venue.lon
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildContactString(venue))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard not available
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${venue.name}`}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full sm:max-w-lg bg-surface border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start gap-3 p-6 border-b border-white/5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${sport.color}20`, border: `1px solid ${sport.color}40` }}
            >
              <SportIcon iconName={sport.icon} className="w-5 h-5" style={{ color: sport.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: sport.color }}
              >
                {sport.label}
              </p>
              <h2 className="text-lg font-bold text-white leading-tight pr-2">
                {venue.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-white/60" aria-hidden="true" />
            </button>
          </div>

          {/* Unverified banner */}
          {venue.unverified && (
            <div className="px-6 py-3 bg-amber-400/5 border-b border-amber-400/10 flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <p className="text-xs text-amber-400/80">
                This venue may offer {sport.label} — please verify before visiting.
              </p>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <InfoRow icon={MapPin} label="Address" value={venue.address || 'Not listed'} />
            <InfoRow icon={Phone} label="Phone" value={venue.phone} href={venue.phone ? `tel:${venue.phone}` : null} />
            <InfoRow icon={Mail} label="Email" value={venue.email} href={venue.email ? `mailto:${venue.email}` : null} />
            <InfoRow icon={ExternalLink} label="Website" value={venue.website} href={venue.website} />
            <InfoRow icon={Navigation} label="Opening Hours" value={venue.openingHours} />
            <InfoRow
              icon={MapPin}
              label="Coordinates"
              value={`${venue.lat.toFixed(5)}, ${venue.lon.toFixed(5)}`}
            />
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-white/5 flex gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-bg font-semibold hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Get Directions
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-medium hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Copy contact info to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
                  <span className="text-green-400 text-sm">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
