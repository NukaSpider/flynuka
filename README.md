# FlyNuka Website

A modern, responsive personal/business hybrid website built with React and Vite.

## Features

- 🎨 Modern UI with lime green theme
- 🌓 Dark/Light mode toggle
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 📧 Contact form with EmailJS integration
- 🔒 Cloudflare Turnstile captcha
- 🚀 Optimized for Render deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_CLOUDFLARE_SITE_KEY=your_cloudflare_site_key
```

   You can copy `.env.example` as a template if it exists.

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build locally:
```bash
npm run preview
```

## Deployment on Render

1. Connect your repository to Render
2. Create a new Web Service
3. Set the build command: `npm install && npm run build`
4. Set the start command: `npm run start`
5. Add your environment variables in the Render dashboard
6. Deploy!

## Project Structure

```
src/
  ├── components/     # React components
  ├── App.jsx        # Main app component
  ├── App.css        # App styles
  ├── main.jsx       # Entry point
  └── index.css      # Global styles
```

## Technologies

- React 18
- Vite
- Framer Motion
- EmailJS
- Font Awesome
- Cloudflare Turnstile

