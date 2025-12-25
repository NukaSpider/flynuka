#!/usr/bin/env node

/**
 * Script to update config.js with values from .env file
 * This allows us to use a standard .env file format
 * and inject the values directly into config.js
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const configPath = path.join(__dirname, 'config.js');

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

// Read config.js
let configContent = fs.readFileSync(configPath, 'utf8');

// Escape special characters for regex replacement
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replace placeholder values with actual values from .env
const replacements = [
  { placeholder: 'YOUR_SERVICE_ID', value: envVars.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID' },
  { placeholder: 'YOUR_TEMPLATE_ID', value: envVars.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID' },
  { placeholder: 'YOUR_PUBLIC_KEY', value: envVars.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY' },
  { placeholder: 'YOUR_TURNSTILE_SITE_KEY', value: envVars.TURNSTILE_SITE_KEY || 'YOUR_TURNSTILE_SITE_KEY' },
  { placeholder: 'YOUR_TURNSTILE_SECRET_KEY', value: envVars.TURNSTILE_SECRET_KEY || 'YOUR_TURNSTILE_SECRET_KEY' }
];

replacements.forEach(({ placeholder, value }) => {
  // Replace in emailjs section
  configContent = configContent.replace(
    new RegExp(`(serviceId|templateId|publicKey):\\s*"${escapeRegex(placeholder)}"`, 'g'),
    (match, key) => `${key}: "${value}"`
  );
  
  // Replace in turnstile section
  configContent = configContent.replace(
    new RegExp(`(siteKey|secretKey):\\s*"${escapeRegex(placeholder)}"`, 'g'),
    (match, key) => `${key}: "${value}"`
  );
});

// Write the updated config.js
fs.writeFileSync(configPath, configContent, 'utf8');
console.log('✓ Updated config.js with values from .env file');

