# Quick Setup Guide

## EmailJS Configuration

1. **Get your EmailJS Public Key:**
   - Go to: https://dashboard.emailjs.com/admin/integration
   - Copy your Public Key
   - Open `public/script.js`
   - Find line 9: `const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';`
   - Replace `'YOUR_PUBLIC_KEY'` with your actual public key (keep the quotes)

2. **Verify your EmailJS Template:**
   - Make sure your EmailJS template (ID: `template_6lbas8s`) has these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
     - `{{to_name}}` - Recipient name (set to "Joseph Duguay")

## Testing Locally

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser to: `http://localhost:3000`

## Deployment to Render

1. Push your code to GitHub/GitLab/Bitbucket

2. In Render Dashboard:
   - Create a new Web Service
   - Connect your repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

3. Add Environment Variables in Render:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (or leave blank for auto-assignment)
   - `CLOUDFLARE_SITE_KEY` = `0x4AAAAAACJER-K2fsmCqWan`
   - `EMAILJS_SERVICE_ID` = `service_yu1fcbi`
   - `EMAILJS_TEMPLATE_ID` = `template_6lbas8s`

Note: The EmailJS Public Key should be added directly in `public/script.js` (not as an environment variable) since it's used client-side.

