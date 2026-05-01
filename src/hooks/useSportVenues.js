import { useState, useEffect, useCallback, useRef } from 'react'
import { buildOverpassQuery } from '../utils/overpassQueries'
import { composeAddress, roundCoord } from '../utils/formatters'

const PRIMARY_ENDPOINT = 'https://overpass-api.de/api/interpreter'
const FALLBACK_ENDPOINT = 'https://overpass.kumi.systems/api/interpreter'

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

function parseElement(el, unverified = false) {
  const tags = el.tags || {}
  const lat =
    el.lat ?? el.center?.lat ?? null
  const lon =
    el.lon ?? el.center?.lon ?? null

  if (lat == null || lon == null) return null

  const name = tags.name || 'Unnamed venue'
  const phone = tags.phone || tags['contact:phone'] || null
  const email = tags.email || tags['contact:email'] || null
  const website = tags.website || tags['contact:website'] || tags['url'] || null
  const address = composeAddress(tags)
  const openingHours = tags['opening_hours'] || null

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
        .map((el) => parseElement(el, false))
        .filter(Boolean)

      let supplementaryVenues = []
      if (supplementary) {
        try {
          const suppData = await fetchOverpass(supplementary, controller.signal)
          if (fetchId !== fetchCountRef.current) return
          supplementaryVenues = (suppData.elements || [])
            .map((el) => parseElement(el, true))
            .filter(Boolean)
        } catch (suppErr) {
          if (suppErr.name === 'AbortError') return
          // Silently skip supplementary on failure
        }
      }

      const all = deduplicateVenues([...primaryVenues, ...supplementaryVenues])
      setVenues(all)
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
