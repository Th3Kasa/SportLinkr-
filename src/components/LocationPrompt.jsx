import { motion } from 'framer-motion'
import { MapPin, AlertCircle, Navigation, ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '../utils/motion'

export default function LocationPrompt({ error, loading, onRequest }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="show"
        className="max-w-sm w-full"
      >
        {error ? (
          <>
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <AlertCircle className="w-7 h-7 text-amber-400" aria-hidden="true" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl font-semibold tracking-tight text-white mb-3">
              Location access needed
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-white/50 mb-8 leading-relaxed">
              {error}
            </motion.p>
            <motion.button
              variants={fadeUp}
              onClick={onRequest}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:shadow-[0_0_32px_-6px_rgba(167,139,250,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              Try again
            </motion.button>
          </>
        ) : (
          <>
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center mx-auto mb-6"
            >
              {loading ? (
                <Navigation className="w-7 h-7 text-violet-400 animate-spin" aria-hidden="true" />
              ) : (
                <MapPin className="w-7 h-7 text-violet-400" aria-hidden="true" />
              )}
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl font-semibold tracking-tight text-white mb-3">
              {loading ? 'Getting your location...' : 'Allow location access'}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-white/50 mb-8 leading-relaxed">
              {loading
                ? 'Finding venues near you. This may take a moment.'
                : 'SportLinkr needs your location to find nearby sports venues. Your location stays on your device.'}
            </motion.p>
            {!loading && (
              <motion.button
                variants={fadeUp}
                onClick={onRequest}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:shadow-[0_0_32px_-6px_rgba(167,139,250,0.5)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                Detect my location
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}
