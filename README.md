# FlyNuka Website

A modern, responsive website for FlyNuka - Drone Photography & Videography services.

## Features

- 🎨 Modern, clean design themed around the brand's bright green color scheme
- 📱 Fully responsive design that works on all devices
- ✨ Smooth animations powered by Framer Motion
- 🧩 Modular component structure for easy expansion
- ⚡ Fast and optimized with Vite
- 🎯 SEO-friendly structure

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Website/
├── src/
│   ├── components/          # Modular React components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Hero.jsx        # Hero section
│   │   ├── Services.jsx    # Services showcase
│   │   ├── Contact.jsx     # Contact information
│   │   └── Footer.jsx      # Footer component
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## Adding New Pages/Sections

The site is built with modularity in mind. To add new sections:

1. Create a new component in `src/components/`
2. Import and add it to `src/App.jsx`
3. Update navigation links in `src/components/Header.jsx` if needed

## Customization

### Colors

The brand colors are defined in `tailwind.config.js`. The primary brand green color is `#00FF88`.

### Animations

Animations are handled by Framer Motion. Each component uses motion variants for smooth, performant animations.

## License

© 2024 FlyNuka. All rights reserved.


