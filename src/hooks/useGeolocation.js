import { useState, useCallback } from 'react'

const CACHE_KEY = 'sl_coords'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

function loadCachedCoords() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.lat || !parsed.lon || !parsed.ts) return null
    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return { lat: parsed.lat, lon: parsed.lon, accuracy: parsed.accuracy ?? null }
  } catch {
    return null
  }
}

function saveCoordsToCache(lat, lon, accuracy) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ lat, lon, accuracy, ts: Date.now() }))
  } catch {
    // storage unavailable — ignore
  }
}

/**
 * Wraps navigator.geolocation.getCurrentPosition.
 * Lazy — only requests location when request() is called.
 * Caches coords in localStorage for 30 minutes to avoid re-prompting.
 * Returns { coords, error, loading, request, clearCachedLocation }
 */
export function useGeolocation() {
  const [coords, setCoords] = useState(() => loadCachedCoords())
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const request = useCallback(() => {
    // If we already have coords (from cache or previous request), don't re-request
    if (coords) return

    if (!navigator.geolocation) {
      setError(
        'Geolocation is not supported by your browser. Please try a modern browser.'
      )
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const accuracy = position.coords.accuracy
        saveCoordsToCache(lat, lon, accuracy)
        setCoords({ lat, lon, accuracy })
        setLoading(false)
      },
      (err) => {
        let message
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message =
              'Location access was denied. Please allow location access in your browser settings and try again.'
            break
          case err.POSITION_UNAVAILABLE:
            message =
              'Your location could not be determined. Please check your device settings.'
            break
          case err.TIMEOUT:
            message =
              'Location request timed out. Please try again.'
            break
          default:
            message = 'An unknown error occurred getting your location.'
        }
        setError(message)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  }, [coords])

  const clearCachedLocation = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch {
      // ignore
    }
    setCoords(null)
    setError(null)
  }, [])

  return { coords, error, loading, request, clearCachedLocation }
}
