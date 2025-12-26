# FlyNuka Website

A modern, responsive single-page website for FlyNuka - Drone Photography and Videography services.

## Features

- Modern, clean design with smooth animations
- Fully responsive (mobile, tablet, desktop)
- Font Awesome icons throughout
- Cloudflare Turnstile integration for form security
- Ready for Render Web Service deployment

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:3000`

## Deployment to Render

This site is configured for Render Web Service deployment.

### Option 1: Using render.yaml (Recommended)

1. Connect your repository to Render
2. Render will automatically detect the `render.yaml` file and configure the service

### Option 2: Manual Configuration

1. Create a new Web Service on Render
2. Connect your repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

### Environment Variables

Make sure to set your Cloudflare Turnstile keys in Render's environment variables:
- `CLOUDFLARE_SITE_KEY` (already in your .env)
- `CLOUDFLARE_SECRET_KEY` (already in your .env)

## Project Structure

```
├── index.html      # Main HTML file
├── styles.css      # All styles and animations
├── script.js       # JavaScript functionality
├── server.js       # Express server for Render
├── package.json    # Dependencies and scripts
├── render.yaml     # Render deployment configuration
└── .env           # Environment variables (not committed)
```

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript (ES6+)
- Express.js (for Render deployment)
- Font Awesome 6.5.1
- Cloudflare Turnstile

