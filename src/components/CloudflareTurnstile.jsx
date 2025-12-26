import { useEffect, useRef, useState } from 'react'

const CloudflareTurnstile = ({ onVerify, onError, siteKey }) => {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    // Check if script is already loaded
    if (window.turnstile) {
      setScriptLoaded(true)
      return
    }

    // Wait for script to load
    const checkScript = setInterval(() => {
      if (window.turnstile) {
        setScriptLoaded(true)
        clearInterval(checkScript)
      }
    }, 100)

    // Cleanup interval after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkScript)
      if (!window.turnstile) {
        console.warn('Cloudflare Turnstile script failed to load')
      }
    }, 10000)

    return () => {
      clearInterval(checkScript)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!scriptLoaded || !window.turnstile) return

    if (containerRef.current && !widgetIdRef.current) {
      try {
        const widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => {
            if (onVerify) {
              onVerify(token)
            }
          },
          'error-callback': (error) => {
            if (onError) {
              onError(error)
            }
          },
          theme: 'light',
          size: 'normal',
        })
        widgetIdRef.current = widgetId
      } catch (error) {
        console.error('Error rendering Turnstile:', error)
        if (onError) {
          onError(error)
        }
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
        } catch (error) {
          console.error('Error removing Turnstile:', error)
        }
      }
    }
  }, [scriptLoaded, siteKey, onVerify, onError])

  return <div ref={containerRef} />
}

export default CloudflareTurnstile

