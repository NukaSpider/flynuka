# Render Deployment Setup

## Option 1: Static Site (Recommended)

For a Vite React app, Render's **Static Site** service is the simplest option:

### Settings:
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18.x or 20.x (optional)

The static site will automatically serve your built files.

---

## Option 2: Web Service (Node.js)

If you need to use Render's **Web Service**:

### Settings:
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Node Version:** 18.x or 20.x

### Environment Variables:
Make sure to add these in Render's dashboard:
- `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` = `0x4AAAAAACJER-K2fsmCqWan`
- `VITE_CLOUDFLARE_TURNSTILE_SECRET_KEY` = `0x4AAAAAACJER1wGD6wofQ5cRtY--NPafNY` (optional, only needed for server-side verification)

Note: The start command uses `serve` to serve the built static files from the `dist` directory. This is a production-ready static file server.

---

## Recommended: Use Static Site

For this Vite React application, **Static Site** is recommended because:
- Simpler configuration
- Better performance (CDN distributed)
- Lower cost (free tier available)
- Automatic HTTPS

