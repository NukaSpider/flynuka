# Render Deployment Guide for FlyNuka

This guide will help you deploy your FlyNuka portfolio site to Render as a Web Service.

## Prerequisites

- GitHub repository pushed (✅ Already done: https://github.com/NukaSpider/flynuka)
- Render account (sign up at https://render.com)

## Deployment Steps

### 1. Create a New Web Service on Render

1. **Log in to Render**
   - Go to https://dashboard.render.com
   - Sign in or create an account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Connect Repository**
   - Choose "Connect GitHub" or "Connect GitLab"
   - Authorize Render to access your repositories
   - Select the `flynuka` repository
   - Select the `main` branch

### 2. Configure Build Settings

Use these exact settings:

**Name:**
```
flynuka
```

**Environment:**
```
Node
```

**Region:**
```
(Choose closest to your users)
```

**Branch:**
```
main
```

**Root Directory:**
```
(leave empty - uses root)
```

**Build Command:**
```
npm install && npm run build
```

*This installs dependencies and runs the build script which injects environment variables into config.js*

**Start Command:**
```
npm start
```

*This starts the Express server*

### 3. Environment Variables

**Add these in Render Dashboard → Environment:**

- `EMAILJS_SERVICE_ID` - Your EmailJS Service ID
- `EMAILJS_TEMPLATE_ID` - Your EmailJS Template ID
- `EMAILJS_PUBLIC_KEY` - Your EmailJS Public Key
- `TURNSTILE_SITE_KEY` - Your Cloudflare Turnstile Site Key
- `TURNSTILE_SECRET_KEY` - Your Cloudflare Turnstile Secret Key

**How it works:**
- During build, `npm run build` runs `npm run generate-env`
- This reads environment variables from `process.env` (provided by Render)
- Values are injected into `config.js`
- The server then serves the updated `config.js` with your real API keys

### 4. Advanced Settings

**Auto-Deploy:**
```
Yes (automatically deploy on git push)
```

**Pull Request Previews:**
```
Yes (optional, but recommended)
```

**Instance Type:**
```
Free (sufficient for portfolio site)
```

**Health Check Path:**
```
/ (or leave empty)
```

**Note:** The Express server automatically sets security headers via the meta tags in `index.html`. For additional headers, you can add middleware to `server.js`.

### 5. Deploy

1. Click "Create Static Site"
2. Render will:
   - Clone your repository
   - Run the build command (if any)
   - Deploy your static files
3. Wait for deployment to complete (usually 1-2 minutes)

### 6. Get Your Render URL

After deployment, you'll get a URL like:
```
https://flynuka.onrender.com
```

**Note:** Free tier services may spin down after inactivity. First request after spin-down may take 30-60 seconds to respond.

## Cloudflare Configuration (After Nameservers Update)

Once your Cloudflare nameservers are active:

### Step 1: Point Cloudflare to Render

1. Go to Cloudflare Dashboard → DNS
2. Add a CNAME record:
   - **Name:** `@` (or `www` for www subdomain)
   - **Target:** `flynuka.onrender.com` (your Render URL)
   - **Proxy status:** Proxied (orange cloud) ✅

### Step 2: SSL/TLS Settings

1. Go to Cloudflare → SSL/TLS
2. Set encryption mode to **"Full"** or **"Full (strict)"**
3. Render provides SSL certificates automatically

### Step 3: Page Rules (Optional)

Create a page rule to:
- Always use HTTPS
- Cache static assets
- Set security headers

## Alternative: Deploy Without Build Command

If you prefer to keep environment variables out of Render:

1. **Remove Build Command:**
   ```
   (leave empty)
   ```

2. **Manually Configure:**
   - After first deployment, use Render's file editor
   - Edit `config.js` directly with your API keys
   - Or use Render's environment variables and a custom build script

## Recommended Render Settings Summary

```
Service Type: Web Service
Name: flynuka
Repository: NukaSpider/flynuka
Branch: main
Root Directory: (empty)
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
Instance Type: Free
Auto-Deploy: Yes
```

## Environment Variables (if using build command)

Add these in Render Dashboard → Environment:

```
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

## Troubleshooting

### Icons Not Showing
- Check browser console for CSP violations
- Verify Font Awesome CDN is accessible
- Check that CSP headers allow cdnjs.cloudflare.com

### Form Not Working
- Verify EmailJS credentials are correct
- Check browser console for errors
- Ensure Turnstile is configured

### Build Fails
- Check build logs in Render dashboard
- Verify package.json is correct
- Ensure all dependencies are available

## Custom Domain Setup

1. In Render Dashboard → Settings → Custom Domain
2. Add your domain: `flynuka.com`
3. Render will provide DNS records
4. Add these to Cloudflare DNS:
   - CNAME: `@` → `flynuka.onrender.com`
   - CNAME: `www` → `flynuka.onrender.com`

## Security Checklist for Production

- [ ] Environment variables are set in Render
- [ ] Turnstile is configured and working
- [ ] EmailJS is configured and tested
- [ ] HTTPS is enabled (automatic on Render)
- [ ] Custom domain is configured (if using)
- [ ] Cloudflare is pointing to Render
- [ ] Security headers are configured
- [ ] CSP is working correctly

## Cost

Render's free tier includes:
- ✅ Static sites (free forever)
- ✅ 750 hours/month
- ✅ Automatic SSL
- ✅ Custom domains
- ✅ Auto-deploy from Git

Perfect for this portfolio site!

## Next Steps After Deployment

1. Test the deployed site
2. Verify all features work
3. Test the contact form
4. Once Cloudflare nameservers are active, point DNS to Render
5. Enable Cloudflare proxy for DDoS protection
6. Configure Cloudflare Turnstile (if not already done)

## Support

- Render Docs: https://render.com/docs
- Render Support: https://render.com/support
- Your Repo: https://github.com/NukaSpider/flynuka

