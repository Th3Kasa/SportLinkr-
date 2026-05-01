import { useState, useCallback } from 'react'

/**
 * Wraps navigator.geolocation.getCurrentPosition.
 * Lazy — only requests location when request() is called.
 * Returns { coords, error, loading, request }
 */
export function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const request = useCallback(() => {
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
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
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
  }, [])

  return { coords, error, loading, request }
}
