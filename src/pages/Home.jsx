import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Navigation, MapPin, ChevronRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { useGeolocation } from '../hooks/useGeolocation'
import { SPORTS } from '../utils/sports'
import { SITE } from '../utils/seo'

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

function SportIcon({ iconName, className }) {
  const Icon = LucideIcons[iconName]
  if (!Icon) return null
  return <Icon className={className} aria-hidden="true" />
}

export default function Home() {
  const navigate = useNavigate()
  const { coords, error, loading, request } = useGeolocation()

  // When coords arrive, navigate to results
  useEffect(() => {
    if (coords) {
      navigate('/results', { state: { coords } })
    }
  }, [coords, navigate])

  const handleDetectLocation = () => {
    request()
  }

  const handleSportClick = (sportId) => {
    // Navigate to results with sport pre-selected; location will be prompted there
    navigate(`/results?sport=${sportId}`)
  }

  return (
    <>
      <Helmet>
        <title>SportLinkr — Find Sports Courts Near You</title>
        <meta name="description" content={SITE.description} />
        <link rel="canonical" href={SITE.url} />
      </Helmet>

      <div className="min-h-screen bg-bg flex flex-col">
        {/* Navigation bar */}
        <nav className="flex items-center px-6 py-4 max-w-screen-xl mx-auto w-full" role="navigation">
          <div
            className="flex items-center gap-2"
            aria-label="SportLinkr brand"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
            >
              <MapPin className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" aria-hidden="true" />
            </div>
            <span className="font-bold text-white">
              Sport<span className="text-accent">Linkr</span>
            </span>
          </div>
        </nav>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24">
          {/* Background glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(167,139,250,0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="relative max-w-2xl w-full text-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                Powered by OpenStreetMap — completely free
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight"
            >
              Find courts near you.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #A78BFA, #F472B6)',
                }}
              >
                Play more.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/50 mb-10 max-w-lg mx-auto leading-relaxed"
            >
              Discover basketball, tennis, futsal, padel, pickleball and more
              sports venues near you — instantly, for free.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <button
                onClick={handleDetectLocation}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-bg text-base sm:text-lg transition-all shadow-glow hover:shadow-[0_0_60px_-10px_rgba(167,139,250,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? '#A78BFA'
                    : 'linear-gradient(135deg, #A78BFA, #F472B6)',
                }}
                aria-label="Detect my location and find nearby sports venues"
              >
                <Navigation
                  className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                {loading ? 'Getting location...' : 'Detect my location'}
              </button>
            </motion.div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-sm text-left max-w-md mx-auto"
                role="alert"
              >
                <p className="font-medium mb-1">Location access denied</p>
                <p className="text-amber-300/70 text-xs">{error}</p>
                <button
                  onClick={handleDetectLocation}
                  className="mt-2 text-xs text-amber-300 underline underline-offset-2 hover:text-amber-200"
                >
                  Try again
                </button>
              </motion.div>
            )}

            {/* Sport chips */}
            <motion.div variants={fadeUp}>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
                Or browse by sport
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => handleSportClick(sport.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`Find ${sport.label} venues near me`}
                  >
                    <SportIcon iconName={sport.icon} className="w-3.5 h-3.5" />
                    {sport.label}
                    <ChevronRight className="w-3 h-3 text-white/30" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 text-center border-t border-white/5" role="contentinfo">
          <p className="text-xs text-white/25">
            Venue data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 underline underline-offset-2">OpenStreetMap</a> contributors.
            SportLinkr is free and open source. No sign-up required.
          </p>
        </footer>
      </div>
    </>
  )
}
