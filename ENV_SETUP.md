# Environment Configuration Setup

This project uses a `.env` file to store sensitive configuration data (API keys, secrets, etc.) that should not be committed to version control.

## Setup Instructions

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   - Open `.env` in your text editor
   - Replace the placeholder values with your actual API keys
   - Get EmailJS credentials from: https://dashboard.emailjs.com/
   - Get Cloudflare Turnstile keys from: https://dash.cloudflare.com/

3. **Generate the JavaScript config file:**
   ```bash
   npm run generate-env
   ```
   
   This will read your `.env` file and generate `env-config.js` which is used by the browser.

## How It Works

- `.env` file contains your sensitive API keys in a standard format
- `generate-env.js` script reads `.env` and generates `env-config.js` (gitignored)
- `config.js` contains all non-sensitive configuration and default values
- When both files are loaded, `config.js` automatically merges the values from `env-config.js`
- This way, you can commit `config.js` to version control without exposing your API keys

## Workflow

1. Edit `.env` with your actual API keys
2. Run `npm run generate-env` to regenerate `env-config.js`
3. The website will use the values from `env-config.js`

## Important Notes

- **Never commit `.env` or `env-config.js` to version control** - they're already in `.gitignore`
- Always run `npm run generate-env` after updating `.env` to update the JavaScript config
- The `.env.example` file is committed as a template for reference

