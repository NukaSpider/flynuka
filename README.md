# FlyNuka - Drone Photography & Videography Portfolio

A modern, responsive portfolio website for drone photography and videography services.

## Features

- 🎨 Modern, clean design with dark mode support
- 📱 Fully responsive layout
- ✉️ Contact form with EmailJS integration
- 🛡️ Cloudflare Turnstile spam protection
- 🎭 Smooth animations and transitions
- 🖼️ Portfolio gallery with filtering

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FlyNuka.git
   cd FlyNuka
   ```

2. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add your API keys:
     ```
     EMAILJS_SERVICE_ID=your_service_id
     EMAILJS_TEMPLATE_ID=your_template_id
     EMAILJS_PUBLIC_KEY=your_public_key
     TURNSTILE_SITE_KEY=your_turnstile_site_key
     TURNSTILE_SECRET_KEY=your_turnstile_secret_key
     ```

3. **Inject environment variables into config**
   ```bash
   npm run generate-env
   ```
   This reads your `.env` file and injects the values into `config.js`.

4. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

## Configuration

Edit `config.js` to customize:
- Personal information (name, title, contact info)
- Social media links
- Portfolio items
- Services offered
- About section content

## API Setup

### EmailJS
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Get your Service ID, Template ID, and Public Key
4. Add them to your `.env` file

### Cloudflare Turnstile
1. Sign up at [Cloudflare](https://dash.cloudflare.com/)
2. Create a Turnstile site
3. Get your Site Key and Secret Key
4. Add them to your `.env` file

See `CLOUDFLARE_SETUP.md` for detailed setup instructions.

## Project Structure

```
FlyNuka/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── config.js           # Site configuration (injects .env values)
├── package.json        # NPM configuration
├── .env                # Environment variables (gitignored)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## License

All rights reserved.

