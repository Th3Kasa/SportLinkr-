import { motion } from 'framer-motion'
import { MapPin, Search } from 'lucide-react'
import { fadeUp, staggerContainer } from '../utils/motion'

export default function EmptyState({ sportLabel, radiusKm, onExpandRadius }) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <motion.div
        variants={fadeUp}
        className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6"
      >
        <Search className="w-7 h-7 text-white/25" aria-hidden="true" />
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold tracking-tight mb-3 bg-clip-text text-transparent"
        style={{ backgroundImage: 'linear-gradient(135deg, #FAFAFA, rgba(250,250,250,0.6))' }}
      >
        No {sportLabel} venues found
      </motion.h3>

      <motion.p variants={fadeUp} className="text-[15px] text-white/40 max-w-xs mb-8 leading-relaxed">
        No verified {sportLabel} venues within {radiusKm}km of your location.
        Try expanding your search or pick a different sport.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        {onExpandRadius && (
          <button
            onClick={onExpandRadius}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:shadow-[0_0_24px_-4px_rgba(167,139,250,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
            style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Expand to 25km
          </button>
        )}
        <a
          href="https://www.openstreetmap.org/fixthemap"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm font-medium hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
        >
          Add venue to OSM
        </a>
      </motion.div>
    </motion.div>
  )
}
