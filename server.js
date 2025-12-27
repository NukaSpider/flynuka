const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://challenges.cloudflare.com", "https://cdn.emailjs.com", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            connectSrc: ["'self'", "https://api.short.io", "https://api.emailjs.com", "https://challenges.cloudflare.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            frameSrc: ["'self'", "https://challenges.cloudflare.com"]
        }
    },
    crossOriginEmbedderPolicy: false
}));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const shortlinkLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 shortlink creations per windowMs
    message: 'Too many shortlink creation requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Serve static files from public directory
app.use(express.static('public', {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting
app.use('/api/', apiLimiter);

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve shortlink page (hidden, not in navigation)
app.get('/shortlink', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'shortlink.html'));
});

// URL validation helper
function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Sanitize custom path
function sanitizePath(path) {
    if (!path) return null;
    // Only allow alphanumeric, hyphens, and underscores
    return path.replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 50);
}

// API endpoint for creating short links via Short.io
app.post('/api/create-shortlink', shortlinkLimiter, async (req, res) => {
  try {
    const { originalURL, customPath } = req.body;
    
    // Validate input
    if (!originalURL || typeof originalURL !== 'string') {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Validate URL format
    if (!isValidURL(originalURL)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Sanitize custom path if provided
    const sanitizedPath = customPath ? sanitizePath(customPath) : null;

    const SHORTIO_PRIVATE_KEY = process.env.SHORTIO_PRIVATE_KEY;
    const SHORTIO_DOMAIN = 'go.flynuka.com';

    if (!SHORTIO_PRIVATE_KEY) {
      return res.status(500).json({ error: 'Short.io API key not configured' });
    }

    // Create short link via Short.io API
    const response = await fetch('https://api.short.io/links', {
      method: 'POST',
      headers: {
        'Authorization': SHORTIO_PRIVATE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        originalURL: originalURL.trim(),
        domain: SHORTIO_DOMAIN,
        ...(sanitizedPath && { path: sanitizedPath })
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.message || 'Failed to create short link'
      });
    }

    res.json({
      success: true,
      shortLink: `https://${SHORTIO_DOMAIN}/${data.pathString || data.path}`,
      originalURL: originalURL.trim(),
      path: data.pathString || data.path
    });
  } catch (error) {
    console.error('Error creating short link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

