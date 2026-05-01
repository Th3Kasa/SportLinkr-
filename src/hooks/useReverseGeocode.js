import { useState, useEffect, useRef } from 'react'

// In-memory cache: "lat,lon" -> place string
const cache = new Map()

/**
 * Uses Nominatim reverse geocoding to convert coordinates to a place name.
 * Note: Nominatim requires a User-Agent header — the browser fetch will send
 * the browser's default User-Agent automatically which satisfies the requirement.
 * For server-side use, set a descriptive User-Agent like "SportLinkr/1.0".
 *
 * Returns { place, loading } where place is e.g. "Sydney, NSW".
 */
export function useReverseGeocode(lat, lon) {
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(false)
  const abortRef = useRef(null)

  useEffect(() => {
    if (lat == null || lon == null) return

    const key = `${lat.toFixed(3)},${lon.toFixed(3)}`

    if (cache.has(key)) {
      setPlace(cache.get(key))
      return
    }

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)

    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((r) => r.json())
      .then((data) => {
        const addr = data.address || {}
        const parts = [
          addr.suburb || addr.neighbourhood || addr.town || addr.village || addr.municipality,
          addr.city || addr.county,
          addr.state,
        ].filter(Boolean)

        const result = parts.slice(0, 2).join(', ') || data.display_name?.split(',')[0] || 'Nearby'
        cache.set(key, result)
        setPlace(result)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [lat, lon])

  return { place, loading }
}
