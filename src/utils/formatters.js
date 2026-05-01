/**
 * Formats a distance in metres to a human-readable string.
 * @param {number} metres
 */
export function formatDistance(metres) {
  if (metres < 1000) return `${Math.round(metres)} m`
  return `${(metres / 1000).toFixed(1)} km`
}

/**
 * Computes distance in metres between two lat/lon pairs using Haversine formula.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * Builds a Google Maps directions URL from a venue name and address.
 */
export function buildDirectionsUrl(name, address, lat, lon) {
  if (lat && lon) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
  }
  const destination = encodeURIComponent(
    [name, address].filter(Boolean).join(' ')
  )
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}

/**
 * Builds a Google Maps place URL for viewing.
 */
export function buildMapsUrl(name, lat, lon) {
  if (lat && lon) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`
}

/**
 * Composes a readable address from OSM addr tags.
 */
export function composeAddress(tags) {
  const parts = [
    tags['addr:housenumber'] && tags['addr:street']
      ? `${tags['addr:housenumber']} ${tags['addr:street']}`
      : tags['addr:street'],
    tags['addr:suburb'],
    tags['addr:city'],
    tags['addr:state'],
    tags['addr:postcode'],
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : null
}

/**
 * Rounds a number to a given decimal places.
 */
export function roundCoord(n, decimals = 4) {
  return Math.round(n * 10 ** decimals) / 10 ** decimals
}

/**
 * Builds a clipboard-friendly contact string for a venue.
 */
export function buildContactString(venue) {
  return [
    venue.name,
    venue.address,
    venue.phone,
    venue.email,
    venue.website,
  ]
    .filter(Boolean)
    .join('\n')
}
