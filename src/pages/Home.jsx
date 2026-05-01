import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Navigation,
  MapPin,
  ArrowRight,
  Check,
  Zap,
  Globe,
  Star,
  ArrowUpRight,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { useGeolocation } from '../hooks/useGeolocation'
import { SPORTS } from '../utils/sports'
import { SITE } from '../utils/seo'
import { fadeUp, fadeIn, staggerContainer, scaleIn } from '../utils/motion'

function SportIcon({ iconName, className }) {
  const Icon = LucideIcons[iconName]
  if (!Icon) return null
  return <Icon className={className} aria-hidden="true" />
}

const heroWords = ['Find', 'courts.', 'Play', 'more.']

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Share your location',
    desc: 'One tap and your browser shares your current position. Nothing is stored.',
    icon: 'MapPin',
  },
  {
    step: '02',
    title: 'Pick a sport',
    desc: 'Choose from 10 sports — basketball, tennis, padel, pickleball and more.',
    icon: 'Target',
  },
  {
    step: '03',
    title: 'Get directions',
    desc: 'Tap any venue to open Google Maps directions instantly.',
    icon: 'Navigation',
  },
]

const FEATURES = [
  {
    icon: 'Globe',
    title: 'Real-time OSM data',
    desc: 'Powered by OpenStreetMap — the world\'s largest open geographic database.',
  },
  {
    icon: 'Navigation',
    title: 'Distance & directions',
    desc: 'See how far each venue is and open turn-by-turn directions in one tap.',
  },
  {
    icon: 'Zap',
    title: '10+ sports covered',
    desc: 'Basketball, futsal, netball, tennis, pickleball, padel, cricket and more.',
  },
  {
    icon: 'Star',
    title: 'Mobile-first design',
    desc: 'Built for your phone. Fast, lightweight, no app download required.',
  },
]

const TRUST_SIGNALS = ['Free forever', 'No login required', 'Real-time data']

export default function Home() {
  const navigate = useNavigate()
  const { coords, error, loading, request } = useGeolocation()
  const sportSectionRef = useRef(null)

  useEffect(() => {
    if (coords) {
      navigate('/results', { state: { coords } })
    }
  }, [coords, navigate])

  const handleDetectLocation = () => {
    request()
  }

  const handleSportClick = (sportId) => {
    navigate(`/results?sport=${sportId}`)
  }

  const scrollToSports = () => {
    sportSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>SportLinkr — Find Sports Courts Near You</title>
        <meta name="description" content={SITE.description} />
        <link rel="canonical" href={SITE.url} />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0F] text-[#FAFAFA] flex flex-col">

        {/* ── Navigation ─────────────────────────────────────────── */}
        <nav
          className="sticky top-0 z-40 flex items-center px-6 lg:px-8 h-16 max-w-7xl mx-auto w-full backdrop-blur-xl"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-2 mr-auto">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
              aria-hidden="true"
            >
              <MapPin className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="font-semibold text-white tracking-tight">
              Sport<span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
              >Linkr</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 mr-8">
            <a
              href="#venues"
              onClick={(e) => { e.preventDefault(); scrollToSports() }}
              className="text-sm text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
            >
              Find Venues
            </a>
            <a
              href="#how"
              onClick={(e) => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="text-sm text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
            >
              How it Works
            </a>
            <a
              href="https://www.openstreetmap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
            >
              About
            </a>
          </div>

          <button
            onClick={handleDetectLocation}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/[0.06] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/10 transition-colors text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
          >
            Open App
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </nav>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <main role="main">
          <section
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 lg:px-8 py-20"
            aria-label="Hero section"
          >
            {/* Background blobs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(167,139,250,0.10) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(244,114,182,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />

            <div className="relative max-w-4xl w-full text-center">
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  Powered by OpenStreetMap
                </span>
              </motion.div>

              {/* Hero headline — per-word stagger */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 leading-[1.05]"
                aria-label="Find courts. Play more."
              >
                <motion.span
                  variants={staggerContainer(0.12, 0.2)}
                  initial="hidden"
                  animate="show"
                  className="inline-flex flex-wrap justify-center gap-x-4 gap-y-2"
                >
                  {heroWords.map((word, i) => (
                    <motion.span
                      key={i}
                      variants={fadeUp}
                      className={
                        i >= 2
                          ? 'bg-clip-text text-transparent'
                          : 'text-[#FAFAFA]'
                      }
                      style={
                        i >= 2
                          ? { backgroundImage: 'linear-gradient(135deg, #A78BFA, #F472B6, #FB7185)' }
                          : {}
                      }
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Discover sports venues near you in seconds. Basketball, padel,
                tennis and more — no app downloads, no signups.
              </motion.p>

              {/* CTA group */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center gap-4 mb-10"
              >
                <button
                  onClick={handleDetectLocation}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-base md:text-lg transition-all hover:shadow-[0_0_60px_-10px_rgba(167,139,250,0.6)] hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: loading ? '#A78BFA' : 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
                  aria-label="Detect my location and find nearby sports venues"
                >
                  <Navigation
                    className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  {loading ? 'Getting location...' : 'Detect my location'}
                  {!loading && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                </button>

                <button
                  onClick={scrollToSports}
                  className="text-sm text-white/50 hover:text-white/80 transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
                >
                  Browse by sport
                </button>
              </motion.div>

              {/* Error state */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-8 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-sm text-left max-w-md mx-auto"
                    role="alert"
                  >
                    <p className="font-medium mb-1">Location access denied</p>
                    <p className="text-amber-300/70 text-xs">{error}</p>
                    <button
                      onClick={handleDetectLocation}
                      className="mt-2 text-xs text-amber-300 underline underline-offset-2 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 rounded"
                    >
                      Try again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust signals */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="flex flex-wrap items-center justify-center gap-6"
              >
                {TRUST_SIGNALS.map((signal) => (
                  <span key={signal} className="flex items-center gap-2 text-sm text-white/40">
                    <Check className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                    {signal}
                  </span>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── Sport grid ─────────────────────────────────────────── */}
          <section
            id="venues"
            ref={sportSectionRef}
            className="py-20 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto"
            aria-labelledby="sports-heading"
          >
            <motion.div
              variants={staggerContainer(0.05, 0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp} className="text-center mb-16">
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
                  10 sports supported
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Pick your game
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {SPORTS.map((sport, i) => (
                  <motion.button
                    key={sport.id}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                    onClick={() => handleSportClick(sport.id)}
                    className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 overflow-hidden"
                    aria-label={`Find ${sport.label} venues near me`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: `${sport.color}18`, border: `1px solid ${sport.color}30` }}
                    >
                      <SportIcon iconName={sport.icon} className="w-5 h-5" style={{ color: sport.color }} />
                    </div>
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors text-center leading-tight">
                      {sport.label}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors absolute top-3 right-3" aria-hidden="true" />
                    {/* Subtle color glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at center, ${sport.color}08 0%, transparent 70%)` }}
                      aria-hidden="true"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── How it works ───────────────────────────────────────── */}
          <section
            id="how"
            className="py-20 md:py-32 px-6 lg:px-8 border-t border-white/[0.06]"
            aria-labelledby="how-heading"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div variants={fadeUp} className="text-center mb-16">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
                    Simple by design
                  </p>
                  <h2 id="how-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                    How it works
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  {HOW_IT_WORKS.map((item) => (
                    <motion.div
                      key={item.step}
                      variants={fadeUp}
                      className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <span className="text-5xl font-bold text-white/[0.04] absolute top-6 right-8 select-none">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center mb-6">
                        <SportIcon iconName={item.icon} className="w-6 h-6 text-violet-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-white/50 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Features grid ──────────────────────────────────────── */}
          <section
            className="py-20 md:py-32 px-6 lg:px-8 border-t border-white/[0.06]"
            aria-labelledby="features-heading"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div variants={fadeUp} className="text-center mb-16">
                  <h2 id="features-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                    Built for players
                  </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {FEATURES.map((feat) => (
                    <motion.div
                      key={feat.title}
                      variants={fadeUp}
                      className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center mb-4">
                        <SportIcon iconName={feat.icon} className="w-5 h-5 text-violet-400" />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{feat.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── CTA banner ─────────────────────────────────────────── */}
          <section
            className="py-20 md:py-32 px-6 lg:px-8 border-t border-white/[0.06]"
            aria-label="Call to action"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                >
                  Ready to find your{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
                  >
                    next game?
                  </span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/50 mb-8 text-lg">
                  Free, instant, no account needed.
                </motion.p>
                <motion.button
                  variants={fadeUp}
                  onClick={handleDetectLocation}
                  disabled={loading}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-base transition-all hover:shadow-[0_0_60px_-10px_rgba(167,139,250,0.6)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
                >
                  <Navigation className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
                  {loading ? 'Getting location...' : 'Find venues near me'}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer
          className="border-t border-white/[0.06] py-16 px-6 lg:px-8"
          role="contentinfo"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
                    aria-hidden="true"
                  >
                    <MapPin className="w-[18px] h-[18px] text-white" />
                  </div>
                  <span className="font-semibold text-white">SportLinkr</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
                  Find sports courts and venues near you, instantly.
                </p>
              </div>

              {/* Sports */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                  Sports
                </p>
                <ul className="space-y-2.5">
                  {SPORTS.slice(0, 5).map((sport) => (
                    <li key={sport.id}>
                      <button
                        onClick={() => handleSportClick(sport.id)}
                        className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
                      >
                        {sport.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                  Resources
                </p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="https://www.openstreetmap.org/copyright"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      OSM Attribution
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.openstreetmap.org/fixthemap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      Add a venue
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                  Legal
                </p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/25">
                &copy; 2026 SportLinkr &middot; Built with React + OpenStreetMap data
              </p>
              <p className="text-xs text-white/25">
                Venue data &copy;{' '}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/50 underline underline-offset-2"
                >
                  OpenStreetMap
                </a>{' '}
                contributors
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
