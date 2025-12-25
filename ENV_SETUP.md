# Environment Configuration Setup

This project uses environment variables to store sensitive configuration data (API keys, secrets, etc.) that should not be committed to version control.

## Setup Instructions

1. **Copy the environment configuration file:**
   - The file `env-config.js` is gitignored and contains your sensitive API keys
   - If you don't have this file yet, create it based on the structure below

2. **Create `env-config.js` in the root directory:**
   ```javascript
   // Environment configuration for sensitive data
   // This file is gitignored - do not commit it to version control

   const envConfig = {
     emailjs: {
       serviceId: "your_emailjs_service_id",
       templateId: "your_emailjs_template_id",
       publicKey: "your_emailjs_public_key"
     },
     
     turnstile: {
       siteKey: "your_turnstile_site_key",
       secretKey: "your_turnstile_secret_key"
     }
   };
   ```

3. **Update the values:**
   - Replace the placeholder values with your actual API keys
   - Get EmailJS credentials from: https://dashboard.emailjs.com/
   - Get Cloudflare Turnstile keys from: https://dash.cloudflare.com/

## How It Works

- `config.js` contains all non-sensitive configuration and default values
- `env-config.js` (gitignored) contains only sensitive API keys
- When both files are loaded, `config.js` automatically merges the values from `env-config.js`
- This way, you can commit `config.js` to version control without exposing your API keys

## Important Notes

- **Never commit `env-config.js` to version control** - it's already in `.gitignore`
- If you're setting up the project for the first time, create `env-config.js` manually
- The `.env` and `.env.example` files are optional and provided for reference only (they're not used by the application directly)

