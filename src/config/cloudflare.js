// Cloudflare Turnstile Configuration
// These values come from environment variables (VITE_ prefix required for Vite)
export const CLOUDFLARE_TURNSTILE_SITE_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || ''
export const CLOUDFLARE_TURNSTILE_SECRET_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SECRET_KEY || ''

// Note: Secret key is for server-side verification only
// Do not expose the secret key in client-side code (only needed on backend)

