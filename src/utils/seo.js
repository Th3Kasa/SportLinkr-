export const SITE = {
  name: 'SportLinkr',
  url: 'https://sportlinkr.vercel.app',
  description:
    'Discover nearby sports courts and venues for free. Find basketball, tennis, futsal, padel, pickleball, badminton, volleyball, squash, netball and cricket venues using OpenStreetMap.',
  ogImage: '/og.png',
}

/**
 * Returns title and description meta for a given sport label.
 * @param {string} sportLabel - e.g. "Basketball"
 * @param {string} [place] - e.g. "Sydney, NSW"
 */
export function buildSportMeta(sportLabel, place) {
  const location = place ? ` near ${place}` : ' Near You'
  return {
    title: `Find ${sportLabel} Courts${location} — ${SITE.name}`,
    description: `Discover ${sportLabel} venues and courts${location}. Get directions, contact info and more. Free, powered by OpenStreetMap.`,
  }
}

/**
 * Builds a SportsActivityLocation JSON-LD schema object for a venue.
 */
export function buildVenueSchema(venue, sportLabel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: venue.name,
    address: venue.address || undefined,
    telephone: venue.phone || undefined,
    sport: sportLabel,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.lat,
      longitude: venue.lon,
    },
  }
}
