#!/usr/bin/env node

/**
 * Script to generate env-config.js from .env file
 * This allows us to use a standard .env file format
 * and generate the JavaScript config file for the browser
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const outputPath = path.join(__dirname, 'env-config.js');

// Read .env file
if (!fs.existsSync(envPath)) {
  console.error('Error: .env file not found!');
  console.error('Please create a .env file based on .env.example');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

// Parse .env file (simple parser - handles comments and empty lines)
envContent.split('\n').forEach(line => {
  line = line.trim();
  
  // Skip empty lines and comments
  if (!line || line.startsWith('#')) {
    return;
  }
  
  // Parse KEY=VALUE format
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

// Generate env-config.js
const jsContent = `// Environment configuration for sensitive data
// This file is auto-generated from .env - do not edit manually
// To update values, edit .env and run: npm run generate-env
// This file is gitignored - do not commit it to version control

const envConfig = {
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

// Write the generated file
fs.writeFileSync(outputPath, jsContent, 'utf8');
console.log('✓ Generated env-config.js from .env file');

