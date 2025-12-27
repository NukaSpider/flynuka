# FlyNuka Website

Modern personal/business hybrid website for Joseph Duguay - Remote Pilot specializing in drone photography and videography.

## Features

- ✨ Modern, responsive single-page design
- 🌓 Light/Dark mode toggle with persistent preference
- 🎬 Smooth animations and scroll effects
- 📧 Contact form with Cloudflare Turnstile captcha
- 📱 Fully responsive design
- 🚀 Ready for deployment on Render

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy your `.env` file or set environment variables in Render dashboard
   - Required variables:
     - `CLOUDFLARE_SITE_KEY` - Your Cloudflare Turnstile site key
     - `CLOUDFLARE_SECRET_KEY` - Your Cloudflare Turnstile secret key (server-side, not used in client)
     - `EMAILJS_SERVICE_ID` - Your EmailJS service ID
     - `EMAILJS_TEMPLATE_ID` - Your EmailJS template ID

3. Configure EmailJS:
   - Get your EmailJS Public Key from: https://dashboard.emailjs.com/admin/integration
   - Update `EMAILJS_PUBLIC_KEY` in `public/script.js` (line 9)
   - Make sure your EmailJS template matches these parameters:
     - `from_name`
     - `from_email`
     - `message`
     - `to_name`

## Running Locally

```bash
npm start
```

The site will be available at `http://localhost:3000`

## Deployment on Render

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Create a new Web Service on Render:
   - Connect your repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
   - Add environment variables from your `.env` file

3. The site will be automatically deployed and available at your Render URL

## Environment Variables in Render

Add these in the Render dashboard under "Environment":
- `NODE_ENV=production`
- `PORT=10000` (or let Render assign automatically)
- `CLOUDFLARE_SITE_KEY=your_site_key`
- `CLOUDFLARE_SECRET_KEY=your_secret_key` (optional, for server-side verification)
- `EMAILJS_SERVICE_ID=your_service_id`
- `EMAILJS_TEMPLATE_ID=your_template_id`

## Notes

- The Cloudflare Turnstile site key is safe to expose client-side
- EmailJS credentials (service ID, template ID) are safe to expose client-side
- Make sure to configure your EmailJS template to receive the form data
- The contact form will show a captcha modal after clicking submit for a clean UX

## License

MIT

