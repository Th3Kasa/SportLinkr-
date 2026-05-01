import { motion } from 'framer-motion'
import { MapPin, AlertCircle, Activity, Navigation } from 'lucide-react'

export default function LocationPrompt({ error, loading, onRequest }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm w-full"
      >
        {error ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-7 h-7 text-amber-400" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              Location access needed
            </h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">{error}</p>
            <button
              onClick={onRequest}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Activity className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
              {loading ? (
                <Navigation
                  className="w-7 h-7 text-accent animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <MapPin className="w-7 h-7 text-accent" aria-hidden="true" />
              )}
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              {loading ? 'Getting your location...' : 'Allow location access'}
            </h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              {loading
                ? 'Finding venues near you. This may take a moment.'
                : 'SportLinkr needs your location to find nearby sports venues. Your location stays on your device.'}
            </p>
            {!loading && (
              <button
                onClick={onRequest}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold hover:bg-accent/90 transition-all shadow-glow hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                Detect my location
              </button>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}
