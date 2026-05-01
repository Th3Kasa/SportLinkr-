import { MapPin, Search } from 'lucide-react'

export default function EmptyState({ sportLabel, radiusKm, onExpandRadius }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <Search className="w-7 h-7 text-white/30" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        No {sportLabel} venues found
      </h3>
      <p className="text-white/50 text-sm max-w-xs mb-6">
        We couldn't find any {sportLabel} venues within {radiusKm}km of your location.
        OpenStreetMap data may be incomplete in your area.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {onExpandRadius && (
          <button
            onClick={onExpandRadius}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/20 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Expand search radius
          </button>
        )}
        <a
          href="https://www.openstreetmap.org/fixthemap"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          Add venue to OSM
        </a>
      </div>
    </div>
  )
}
