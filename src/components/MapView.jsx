import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import { Navigation } from 'lucide-react'
import { getSport } from '../utils/sports'

// Fix default icon issue with webpack/vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createSportMarker(sport, isSelected) {
  const color = sport.color || '#A78BFA'
  const size = isSelected ? 44 : 34

  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="${isSelected ? 20 : 16}" fill="${color}" fill-opacity="${isSelected ? 0.25 : 0.15}"/>
    <circle cx="22" cy="22" r="${isSelected ? 14 : 11}" fill="${color}" fill-opacity="0.9"/>
    <circle cx="22" cy="22" r="${isSelected ? 14 : 11}" stroke="white" stroke-opacity="0.4" stroke-width="2"/>
  </svg>`

  return L.divIcon({
    html: `<div class="${isSelected ? 'marker-pulse' : ''}" style="display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 2px 8px ${color}60);">${svg}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

// Child component that handles fly-to when selectedVenueId changes
function FlyToSelected({ venues, selectedVenueId }) {
  const map = useMap()
  const prevId = useRef(null)

  useEffect(() => {
    if (!selectedVenueId || selectedVenueId === prevId.current) return
    const venue = venues.find((v) => v.id === selectedVenueId)
    if (venue) {
      map.flyTo([venue.lat, venue.lon], Math.max(map.getZoom(), 16), {
        duration: 1.2,
      })
      prevId.current = selectedVenueId
    }
  }, [selectedVenueId, venues, map])

  return null
}

// Recenter button component
function RecenterButton({ center }) {
  const map = useMap()

  if (!center) return null

  return (
    <div className="leaflet-bottom leaflet-right" style={{ marginBottom: '80px', marginRight: '12px' }}>
      <div className="leaflet-control">
        <button
          onClick={() => map.flyTo([center.lat, center.lon], 14, { duration: 1 })}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: 'rgba(16, 16, 26, 0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
          aria-label="Recenter map on my location"
          title="Recenter"
        >
          <Navigation className="w-4 h-4" style={{ color: '#A78BFA' }} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function MapView({
  venues,
  sportId,
  selectedVenueId,
  onVenueSelect,
  center,
}) {
  const sport = getSport(sportId)
  const mapCenter = center
    ? [center.lat, center.lon]
    : [-25.2744, 133.7751] // Australia fallback

  return (
    <div
      className="w-full h-full rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
      style={{ background: '#0a0a0f' }}
    >
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ width: '100%', height: '100%', background: '#0a0a0f' }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />

        <FlyToSelected venues={venues} selectedVenueId={selectedVenueId} />
        <RecenterButton center={center} />

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount()
            return L.divIcon({
              html: `<div style="
                width:36px;height:36px;
                background:rgba(167,139,250,0.85);
                border:2px solid rgba(255,255,255,0.3);
                border-radius:50%;
                display:flex;align-items:center;justify-content:center;
                color:#06060a;font-weight:700;font-size:13px;
                box-shadow:0 0 20px rgba(167,139,250,0.5);
              ">${count}</div>`,
              className: '',
              iconSize: [36, 36],
              iconAnchor: [18, 18],
            })
          }}
        >
          {venues.map((venue) => {
            const isSelected = venue.id === selectedVenueId
            const icon = createSportMarker(sport, isSelected)

            return (
              <Marker
                key={venue.id}
                position={[venue.lat, venue.lon]}
                icon={icon}
                eventHandlers={{
                  click: () => onVenueSelect(venue),
                }}
                aria-label={venue.name}
              >
                <Popup className="dark-popup">
                  <div className="popup-content">
                    <p className="popup-name">{venue.name}</p>
                    {venue.address && (
                      <p className="popup-address">{venue.address}</p>
                    )}
                    <button
                      onClick={() => onVenueSelect(venue)}
                      className="popup-btn"
                    >
                      View details
                    </button>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
