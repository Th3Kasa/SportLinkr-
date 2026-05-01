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
  Clock,
  AlertCircle,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { buildDirectionsUrl, buildContactString } from '../utils/formatters'
import { getSport } from '../utils/sports'
import { scaleIn } from '../utils/motion'

function SportIcon({ iconName, className, style }) {
  const Icon = LucideIcons[iconName]
  if (!Icon) return null
  return <Icon className={className} style={style} aria-hidden="true" />
}

function InfoRow({ icon: Icon, label, value, href }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/[0.06] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-white/40" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/30 mb-0.5">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-violet-400 hover:text-violet-300 hover:underline break-all transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-white/80 break-words leading-relaxed">{value}</p>
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
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* Modal panel */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full sm:max-w-xl bg-[#10101A] border border-white/[0.06] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start gap-3 p-8 pb-6 border-b border-white/[0.06]">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${sport.color}18`, border: `1px solid ${sport.color}30` }}
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
              <h2 className="text-xl font-semibold text-white leading-tight pr-2 tracking-tight">
                {venue.name}
              </h2>
              {venue.address && (
                <p className="text-sm text-white/50 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                  {venue.address}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-white/60" aria-hidden="true" />
            </button>
          </div>

          {/* Unverified banner */}
          {venue.unverified && (
            <div className="px-8 py-3 bg-amber-400/[0.05] border-b border-amber-400/10 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <p className="text-xs text-amber-400/80">
                This venue may offer {sport.label} — please verify before visiting.
              </p>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-4">
            <InfoRow
              icon={Phone}
              label="Phone"
              value={venue.phone}
              href={venue.phone ? `tel:${venue.phone}` : null}
            />
            <InfoRow
              icon={Mail}
              label="Email"
              value={venue.email}
              href={venue.email ? `mailto:${venue.email}` : null}
            />
            <InfoRow
              icon={ExternalLink}
              label="Website"
              value={venue.website}
              href={venue.website}
            />
            <InfoRow
              icon={Clock}
              label="Opening Hours"
              value={venue.openingHours}
            />
            <InfoRow
              icon={MapPin}
              label="Coordinates"
              value={`${venue.lat.toFixed(5)}, ${venue.lon.toFixed(5)}`}
            />
          </div>

          {/* Actions */}
          <div className="p-8 pt-6 border-t border-white/[0.06] flex gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white transition-all hover:shadow-[0_0_32px_-6px_rgba(167,139,250,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
              aria-label={`Get directions to ${venue.name}`}
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              Get Directions
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm font-medium hover:text-white hover:bg-white/[0.07] hover:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
              aria-label="Copy contact info to clipboard"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 text-green-400"
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    Copy Info
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
