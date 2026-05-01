import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { Map, List } from 'lucide-react'
import Header from '../components/Header'
import SportFilterPills from '../components/SportFilterPills'
import VenueCard from '../components/VenueCard'
import VenueDetailModal from '../components/VenueDetailModal'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import AdSlot from '../components/AdSlot'
import LocationPrompt from '../components/LocationPrompt'
import { useGeolocation } from '../hooks/useGeolocation'
import { useSportVenues } from '../hooks/useSportVenues'
import { useReverseGeocode } from '../hooks/useReverseGeocode'
import { buildSportMeta } from '../utils/seo'
import { getSport, SPORTS } from '../utils/sports'

// Lazy-load the map to avoid SSR issues with Leaflet
const MapView = React.lazy(() => import('../components/MapView'))

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const DEFAULT_RADIUS = 10

export default function Results() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  // Sport from URL or default
  const urlSport = searchParams.get('sport')
  const [activeSport, setActiveSport] = useState(
    urlSport && SPORTS.find((s) => s.id === urlSport) ? urlSport : SPORTS[0].id
  )

  const [radius, setRadius] = useState(DEFAULT_RADIUS)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'map'

  // Coords from navigation state or geolocation hook
  const navCoords = location.state?.coords || null
  const { coords: geoCoords, error: geoError, loading: geoLoading, request: requestGeo } = useGeolocation()
  const coords = navCoords || geoCoords

  // Auto-request if no coords from navigation
  useEffect(() => {
    if (!navCoords && !geoCoords && !geoLoading) {
      // Don't auto-request — show prompt
    }
  }, [navCoords, geoCoords, geoLoading])

  const sport = getSport(activeSport)
  const { place } = useReverseGeocode(coords?.lat, coords?.lon)
  const meta = buildSportMeta(sport.label, place)

  const { venues, loading, error, refetch } = useSportVenues(
    activeSport,
    coords,
    radius * 1000
  )

  // Sync sport to URL
  const handleSportChange = useCallback((sportId) => {
    setActiveSport(sportId)
    setSelectedVenue(null)
    setSearchParams({ sport: sportId }, { replace: true })
  }, [setSearchParams])

  const handleExpandRadius = () => {
    setRadius((r) => Math.min(r + 5, 25))
  }

  const skeletonCount = 6

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <div className="min-h-screen bg-bg flex flex-col">
        {/* Header */}
        <Header
          coords={coords}
          radius={radius}
          onRadiusChange={setRadius}
          showControls={!!coords}
        />

        {/* Sport filter pills */}
        {coords && (
          <div className="sticky top-14 z-20 bg-bg/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3">
            <SportFilterPills activeSport={activeSport} onChange={handleSportChange} />
          </div>
        )}

        {/* No location yet */}
        {!coords ? (
          <main className="flex-1" role="main" aria-label="Find sports venues">
            <LocationPrompt
              error={geoError}
              loading={geoLoading}
              onRequest={requestGeo}
            />
          </main>
        ) : (
          <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-6" role="main" aria-label={`${sport.label} venues near you`}>
            {/* Mobile list/map toggle */}
            <div className="lg:hidden flex gap-2 mb-4">
              <button
                onClick={() => setMobileView('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  mobileView === 'list'
                    ? 'bg-accent/20 border border-accent/30 text-accent'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                }`}
                aria-label="Show list view"
                aria-pressed={mobileView === 'list'}
              >
                <List className="w-4 h-4" aria-hidden="true" />
                List
              </button>
              <button
                onClick={() => setMobileView('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  mobileView === 'map'
                    ? 'bg-accent/20 border border-accent/30 text-accent'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                }`}
                aria-label="Show map view"
                aria-pressed={mobileView === 'map'}
              >
                <Map className="w-4 h-4" aria-hidden="true" />
                Map
              </button>
            </div>

            <div className="lg:grid lg:grid-cols-[1fr,420px] lg:gap-6">
              {/* Left: venue list */}
              <div className={`${mobileView === 'map' ? 'hidden lg:block' : ''}`}>
                {/* Result count */}
                {!loading && !error && venues.length > 0 && (
                  <p className="text-sm text-white/40 mb-4">
                    <span className="text-white font-medium">{venues.length}</span> {sport.label} venue{venues.length !== 1 ? 's' : ''} within {radius} km
                    {place ? ` of ${place}` : ''}
                  </p>
                )}

                {/* Skeletons */}
                {loading && (
                  <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
                    aria-label="Loading venues"
                    aria-busy="true"
                  >
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </motion.div>
                )}

                {/* Error */}
                {!loading && error && (
                  <ErrorState message={error} onRetry={refetch} />
                )}

                {/* Empty */}
                {!loading && !error && venues.length === 0 && (
                  <EmptyState
                    sportLabel={sport.label}
                    radiusKm={radius}
                    onExpandRadius={radius < 25 ? handleExpandRadius : null}
                  />
                )}

                {/* Cards */}
                {!loading && !error && venues.length > 0 && (
                  <motion.div
                    key={activeSport}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
                    aria-label={`${sport.label} venues`}
                  >
                    <AnimatePresence mode="popLayout">
                      {venues.map((venue, index) => (
                        <React.Fragment key={venue.id}>
                          <VenueCard
                            venue={venue}
                            sportId={activeSport}
                            isSelected={selectedVenue?.id === venue.id}
                            onClick={setSelectedVenue}
                          />
                          {/* Ad slot every 5 venues */}
                          {(index + 1) % 5 === 0 && index !== venues.length - 1 && (
                            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                              <AdSlot />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Right: map */}
              <div
                className={`
                  lg:sticky lg:top-[calc(3.5rem+56px)] lg:self-start
                  ${mobileView === 'list' ? 'hidden lg:block' : ''}
                `}
                style={{ height: 'calc(100vh - 160px)' }}
              >
                <Suspense
                  fallback={
                    <div className="w-full h-full rounded-2xl bg-surface border border-white/10 flex items-center justify-center">
                      <p className="text-white/30 text-sm">Loading map...</p>
                    </div>
                  }
                >
                  <MapView
                    venues={venues}
                    sportId={activeSport}
                    selectedVenueId={selectedVenue?.id}
                    onVenueSelect={setSelectedVenue}
                    center={coords}
                  />
                </Suspense>
              </div>
            </div>
          </main>
        )}

        {/* Mobile bottom ad banner */}
        {coords && (
          <div className="lg:hidden sticky bottom-0 z-20 px-4 pb-safe">
            <AdSlot className="rounded-none rounded-t-xl border-b-0" />
          </div>
        )}

        {/* Footer */}
        <footer className="py-6 px-6 text-center border-t border-white/5 hidden lg:block" role="contentinfo">
          <p className="text-xs text-white/20">
            Venue data &copy;{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/40 underline underline-offset-2"
            >
              OpenStreetMap
            </a>{' '}
            contributors. Map tiles &copy;{' '}
            <a
              href="https://carto.com/attributions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/40 underline underline-offset-2"
            >
              CARTO
            </a>
          </p>
        </footer>
      </div>

      {/* Venue detail modal */}
      <AnimatePresence>
        {selectedVenue && (
          <VenueDetailModal
            key={selectedVenue.id}
            venue={selectedVenue}
            sportId={activeSport}
            onClose={() => setSelectedVenue(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
