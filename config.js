#!/usr/bin/env node
/**
 * This file serves dual purposes:
 * 1. When run with Node.js: Generates env.js from .env file
 * 2. When loaded in browser: Provides site configuration
 * 
 * To generate env.js: node config.js
 */

// Node.js execution: Generate env.js from .env
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  const fs = require('fs');
  const path = require('path');
  
  const envPath = path.join(__dirname, '.env');
  const outputPath = path.join(__dirname, 'env.js');
  
  // Read .env file
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found!');
    console.error('Please create a .env file based on .env.example');
    process.exit(1);
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  // Parse .env file
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      envVars[match[1].trim()] = match[2].trim();
    }
  });
  
  // Generate env.js
  const jsContent = `// Environment variables from .env file
// This file is auto-generated - do not edit manually
// To update, edit .env and run: node config.js
// This file is gitignored

window.env = {
  emailjs: {
    serviceId: "${envVars.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'}",
    templateId: "${envVars.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'}",
    publicKey: "${envVars.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'}"
  },
  turnstile: {
    siteKey: "${envVars.TURNSTILE_SITE_KEY || 'YOUR_TURNSTILE_SITE_KEY'}",
    secretKey: "${envVars.TURNSTILE_SECRET_KEY || 'YOUR_TURNSTILE_SECRET_KEY'}"
  }
};
`;
  
  fs.writeFileSync(outputPath, jsContent, 'utf8');
  console.log('✓ Generated env.js from .env file');
  process.exit(0);
}

// Browser execution: Site configuration
// Site configuration
const siteConfig = {
  // Personal Information
  name: "Joseph Duguay",
  title: "Remote Pilot",
  tagline: "Drone Photography and Videography",
  phone: "+1 (719) 666-1812",
  email: "contact@flynuka.com",
  
  // Social Links (add or remove as needed)
  socialLinks: {
    instagram: {
      handle: "@flynuka",
      url: "https://instagram.com/flynuka",
      icon: "fab fa-instagram"
    },
    // Add more social links here:
    // twitter: {
    //   handle: "@flynuka",
    //   url: "https://twitter.com/flynuka",
    //   icon: "fab fa-twitter"
    // },
    // linkedin: {
    //   handle: "Joseph Duguay",
    //   url: "https://linkedin.com/in/josephduguay",
    //   icon: "fab fa-linkedin"
    // },
    // youtube: {
    //   handle: "Flynuka",
    //   url: "https://youtube.com/@flynuka",
    //   icon: "fab fa-youtube"
    // }
  },
  
  // Portfolio Images (use placeholder URLs for now)
  portfolio: [
    {
      id: 1,
      title: "Aerial Landscape",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      description: "Stunning aerial view of natural landscapes"
    },
    {
      id: 2,
      title: "Urban Architecture",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
      description: "Modern cityscapes from above"
    },
    {
      id: 3,
      title: "Event Coverage",
      category: "Videography",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      description: "Dynamic event videography"
    },
    {
      id: 4,
      title: "Real Estate",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      description: "Professional property photography"
    },
    {
      id: 5,
      title: "Commercial Video",
      category: "Videography",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
      description: "High-quality commercial content"
    },
    {
      id: 6,
      title: "Nature Documentary",
      category: "Videography",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      description: "Cinematic nature footage"
    }
  ],
  
  // Services
  services: [
    {
      title: "Aerial Photography",
      description: "Stunning high-resolution aerial images for real estate, events, and commercial use.",
      icon: "fas fa-camera"
    },
    {
      title: "Drone Videography",
      description: "Cinematic video production with smooth, professional aerial footage.",
      icon: "fas fa-video"
    },
    {
      title: "Real Estate",
      description: "Property showcases that highlight unique features and surrounding areas.",
      icon: "fas fa-home"
    },
    {
      title: "Event Coverage",
      description: "Capture your special moments from unique aerial perspectives.",
      icon: "fas fa-calendar-alt"
    }
  ],
  
  // About Section
  about: {
    headline: "Elevating Perspectives Through Aerial Excellence",
    description: "With years of experience as a certified remote pilot, I specialize in capturing breathtaking aerial imagery and cinematic footage. From commercial projects to personal events, I bring a unique perspective to every assignment.",
    highlights: [
      "FAA Certified Remote Pilot",
      "Professional Grade Equipment",
      "Creative Vision & Technical Expertise",
      "Fully Insured & Licensed"
    ]
  },
  
  // EmailJS Configuration
  // Get these values from https://dashboard.emailjs.com/
  // Values are loaded from window.env (generated from .env file)
  emailjs: {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY"
  },
  
  // Cloudflare Turnstile Configuration
  // Get these values from https://dash.cloudflare.com/
  // Values are loaded from window.env (generated from .env file)
  turnstile: {
    siteKey: "YOUR_TURNSTILE_SITE_KEY",
    secretKey: "YOUR_TURNSTILE_SECRET_KEY" // Keep private - for server-side verification
  }
};

// Load environment variables from window.env if available (generated from .env file)
if (typeof window !== 'undefined' && window.env) {
  if (window.env.emailjs) {
    siteConfig.emailjs = { ...siteConfig.emailjs, ...window.env.emailjs };
  }
  if (window.env.turnstile) {
    siteConfig.turnstile = { ...siteConfig.turnstile, ...window.env.turnstile };
  }
}
