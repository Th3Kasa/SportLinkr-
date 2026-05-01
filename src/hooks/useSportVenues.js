import { useState, useEffect, useCallback, useRef } from 'react'
import { buildOverpassQuery } from '../utils/overpassQueries'
import { composeAddress, roundCoord } from '../utils/formatters'

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const PRIMARY_ENDPOINT = 'https://overpass-api.de/api/interpreter'
const FALLBACK_ENDPOINT = 'https://overpass.kumi.systems/api/interpreter'

// Module-level cache for reverse geocode results to avoid re-fetching on re-renders
const geocodeCache = new Map()

async function fetchOverpass(query, signal) {
  const body = `data=${encodeURIComponent(query)}`

  let response
  try {
    response = await fetch(PRIMARY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal,
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
  } catch (primaryErr) {
    if (primaryErr.name === 'AbortError') throw primaryErr
    // Try fallback
    response = await fetch(FALLBACK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal,
    })
    if (!response.ok) throw new Error(`Fallback HTTP ${response.status}`)
  }

  return response.json()
}

/**
 * Reverse-geocode a single lat/lon via Nominatim.
 * Returns a display address string or null on failure.
 */
async function reverseGeocode(lat, lon, signal) {
  const key = `${roundCoord(lat, 4)}|${roundCoord(lon, 4)}`
  if (geocodeCache.has(key)) return geocodeCache.get(key)

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'SportLinkr/1.0 (sportlinkr-app)',
      },
      signal,
    })
    if (!res.ok) {
      geocodeCache.set(key, null)
      return null
    }
    const data = await res.json()

    // Compose address from structured fields if available
    let address = null
    if (data.address) {
      const a = data.address
      const parts = [
        a.house_number && a.road ? `${a.house_number} ${a.road}` : a.road,
        a.suburb || a.neighbourhood || a.quarter,
        a.city || a.town || a.village || a.county,
        a.state,
      ].filter(Boolean)
      address = parts.length > 0 ? parts.join(', ') : null
    }

    // Fall back to first 3 components of display_name
    if (!address && data.display_name) {
      address = data.display_name.split(',').slice(0, 3).map((s) => s.trim()).join(', ')
    }

    geocodeCache.set(key, address)
    return address
  } catch {
    geocodeCache.set(key, null)
    return null
  }
}

/**
 * Enriches venues that have no address by reverse-geocoding via Nominatim.
 * Processes sequentially with 250ms delay to respect Nominatim rate limits.
 */
async function enrichAddresses(venues, signal) {
  const needsGeocode = venues.filter((v) => !v.address && v.lat != null && v.lon != null)
  if (needsGeocode.length === 0) return venues

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const geocoded = new Map()

  for (let i = 0; i < needsGeocode.length; i++) {
    if (signal?.aborted) break
    const venue = needsGeocode[i]
    const address = await reverseGeocode(venue.lat, venue.lon, signal)
    geocoded.set(venue.id, address)
    // Throttle: 250ms between requests to stay within Nominatim 1 req/sec limit
    if (i < needsGeocode.length - 1) {
      await delay(250)
    }
  }

  return venues.map((v) => {
    if (geocoded.has(v.id)) {
      return { ...v, address: geocoded.get(v.id) }
    }
    return v
  })
}

function parseElement(el, unverified = false, coords = null) {
  const tags = el.tags || {}
  const lat = el.lat ?? el.center?.lat ?? null
  const lon = el.lon ?? el.center?.lon ?? null

  if (lat == null || lon == null) return null

  // Filter out venues with no name — never show "Unnamed venue"
  const name = tags.name && tags.name.trim() ? tags.name.trim() : null
  if (!name) return null

  // Phone — check all OSM phone tag variants
  const phone = tags.phone
    || tags['contact:phone']
    || tags['phone:mobile']
    || tags['contact:mobile']
    || tags['telephone']
    || null

  // Email
  const email = tags.email
    || tags['contact:email']
    || null

  // Website
  const website = tags.website
    || tags['contact:website']
    || tags.url
    || tags['contact:url']
    || tags['website:official']
    || null

  const address = composeAddress(tags)
  const openingHours = tags['opening_hours'] || null

  const distanceKm = coords != null
    ? haversineKm(coords.lat, coords.lon, lat, lon)
    : null

  return {
    id: `${el.type}/${el.id}`,
    osmId: el.id,
    osmType: el.type,
    name,
    lat,
    lon,
    phone,
    email,
    website,
    address,
    openingHours,
    distanceKm,
    tags,
    unverified,
  }
}

function deduplicateVenues(venues) {
  const seen = new Set()
  return venues.filter((v) => {
    const key = `${v.name.toLowerCase().trim()}|${roundCoord(v.lat, 3)}|${roundCoord(v.lon, 3)}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Fetches sport venues from Overpass API.
 * Filters unnamed venues and enriches missing addresses via Nominatim.
 * Returns { venues, loading, error, refetch }
 */
export function useSportVenues(sportId, coords, radiusMeters) {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)
  const fetchCountRef = useRef(0)

  const fetchVenues = useCallback(async () => {
    if (!sportId || !coords) return

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const fetchId = ++fetchCountRef.current

    setLoading(true)
    setError(null)
    setVenues([])

    try {
      const { primary, supplementary } = buildOverpassQuery(
        sportId,
        coords.lat,
        coords.lon,
        radiusMeters
      )

      // Fetch primary query
      const primaryData = await fetchOverpass(primary, controller.signal)
      if (fetchId !== fetchCountRef.current) return

      const primaryVenues = (primaryData.elements || [])
        .map((el) => parseElement(el, false, coords))
        .filter(Boolean)

      let supplementaryVenues = []
      if (supplementary) {
        try {
          const suppData = await fetchOverpass(supplementary, controller.signal)
          if (fetchId !== fetchCountRef.current) return
          supplementaryVenues = (suppData.elements || [])
            .map((el) => parseElement(el, true, coords))
            .filter(Boolean)
        } catch (suppErr) {
          if (suppErr.name === 'AbortError') return
          // Silently skip supplementary on failure
        }
      }

      const deduplicated = deduplicateVenues([...primaryVenues, ...supplementaryVenues])

      // Sort by distance (closest first)
      if (coords) {
        deduplicated.sort((a, b) =>
          haversineKm(coords.lat, coords.lon, a.lat, a.lon) -
          haversineKm(coords.lat, coords.lon, b.lat, b.lon)
        )
      }

      // Enrich missing addresses via Nominatim reverse geocoding
      const enriched = await enrichAddresses(deduplicated, controller.signal)
      if (fetchId !== fetchCountRef.current) return

      setVenues(enriched)
      setLoading(false)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(
        'Failed to load venues. Please check your connection and try again.'
      )
      setLoading(false)
    }
  }, [sportId, coords, radiusMeters])

  useEffect(() => {
    fetchVenues()
    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [fetchVenues])

  return { venues, loading, error, refetch: fetchVenues }
}
