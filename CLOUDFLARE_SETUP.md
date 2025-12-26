# Cloudflare Setup Guide

This guide will help you set up Cloudflare for your domain (flynuka.com) to enable DDoS protection, Turnstile CAPTCHA, and other security features.

## Part 1: Cloudflare Account & Domain Setup

### Step 1: Create Cloudflare Account
1. Go to [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Sign up for a free account (free tier includes excellent DDoS protection)
3. Verify your email address

### Step 2: Add Your Domain
1. In the Cloudflare dashboard, click **"Add a Site"**
2. Enter your domain: `flynuka.com`
3. Click **"Add site"**
4. Cloudflare will scan your DNS records

### Step 3: Update Nameservers
1. Cloudflare will provide you with two nameservers (e.g., `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`)
2. Go to your domain registrar (where you bought flynuka.com)
3. Find the DNS/Nameserver settings
4. Replace your current nameservers with Cloudflare's nameservers
5. Save and wait for propagation (can take up to 24 hours, usually much faster)

### Step 4: Configure DNS Records
1. In Cloudflare dashboard, go to **DNS** → **Records**
2. Add/verify your DNS records:
   - **A Record**: `@` pointing to your website's IP address
   - **CNAME Record**: `www` pointing to `flynuka.com` (or your hosting provider)
   - **MX Records**: For email (if you have email hosting)
3. Make sure the orange cloud icon is enabled (☁️) - this enables Cloudflare protection

## Part 2: Cloudflare Turnstile Setup

### Step 1: Create Turnstile Site
1. In Cloudflare dashboard, go to **Turnstile** (under "Security")
2. Click **"Add Site"**
3. Fill in the form:
   - **Site name**: Flynuka Contact Form
   - **Domain**: `flynuka.com` (or `*.flynuka.com` for all subdomains)
   - **Widget mode**: Choose "Managed" (recommended) or "Non-interactive"
4. Click **"Create"**

### Step 2: Get Your Keys
1. After creating the site, you'll see:
   - **Site Key** (public) - This goes in your `config.js`
   - **Secret Key** (private) - Keep this secret, use for server-side verification

### Step 3: Update Your Config
1. Open `config.js`
2. Update the Turnstile configuration:
   ```javascript
   turnstile: {
     siteKey: "your_actual_site_key_here",
     secretKey: "your_actual_secret_key_here" // For future server-side verification
   }
   ```
3. Also update the HTML: In `index.html`, find the Turnstile widget and update:
   ```html
   <div class="cf-turnstile" id="turnstile-widget" 
        data-sitekey="your_actual_site_key_here" 
        data-theme="light" 
        data-size="normal">
   </div>
   ```

## Part 3: Cloudflare Security Settings

### DDoS Protection (Automatic)
Cloudflare automatically protects against DDoS attacks. No configuration needed!

### Additional Security Settings

1. **SSL/TLS Settings**
   - Go to **SSL/TLS** → **Overview**
   - Set encryption mode to **"Full"** or **"Full (strict)"**
   - This ensures encrypted connections

2. **Security Level**
   - Go to **Security** → **Settings**
   - Set Security Level to **"Medium"** or **"High"**
   - This helps block malicious traffic

3. **Bot Fight Mode** (Free)
   - Go to **Security** → **Bots**
   - Enable **"Bot Fight Mode"**
   - This helps block automated bots

4. **Rate Limiting** (Paid feature, but free tier has basic protection)
   - Go to **Security** → **WAF**
   - Configure rate limiting rules if needed

5. **Page Rules** (Optional)
   - Go to **Rules** → **Page Rules**
   - Create rules for caching, security headers, etc.

## Part 4: Performance Optimization

### Caching
1. Go to **Caching** → **Configuration**
2. Enable **"Auto Minify"** for HTML, CSS, and JavaScript
3. Set **Browser Cache TTL** to **"Respect Existing Headers"** or a custom value

### Speed
1. Go to **Speed** → **Optimization**
2. Enable **"Auto Minify"**
3. Enable **"Brotli"** compression
4. Consider enabling **"Rocket Loader"** (can help with JavaScript loading)

## Part 5: Firewall Rules (Optional)

1. Go to **Security** → **WAF**
2. Create custom firewall rules to:
   - Block specific countries (if needed)
   - Rate limit requests
   - Block suspicious patterns

## Part 6: Analytics

1. Go to **Analytics** → **Web Analytics**
2. Enable **"Web Analytics"** to see traffic statistics
3. This is free and privacy-focused

## Testing Your Setup

1. **Test Turnstile**:
   - Visit your website
   - Try submitting the contact form
   - You should see the Turnstile widget
   - Complete the verification and submit

2. **Test DDoS Protection**:
   - Cloudflare automatically protects your site
   - You can see blocked requests in **Security** → **Events**

3. **Test SSL**:
   - Visit `https://flynuka.com`
   - Check that you see a secure connection (lock icon)

## Troubleshooting

### Turnstile not showing:
- Check that your Site Key is correct in `config.js` and `index.html`
- Check browser console for errors
- Make sure the Turnstile script is loading

### Domain not working:
- Wait for DNS propagation (can take up to 24 hours)
- Check that nameservers are correctly set at your registrar
- Verify DNS records in Cloudflare dashboard

### SSL errors:
- Make sure SSL/TLS mode is set to "Full" or "Full (strict)"
- Wait a few minutes after enabling SSL
- Clear browser cache

## Security Best Practices

1. **Keep Secret Keys Secret**: Never commit secret keys to public repositories
2. **Use Environment Variables**: For production, consider using environment variables
3. **Enable 2FA**: Enable two-factor authentication on your Cloudflare account
4. **Regular Updates**: Keep your website code updated
5. **Monitor**: Regularly check Cloudflare analytics for suspicious activity

## Additional Resources

- [Cloudflare Documentation](https://developers.cloudflare.com/)
- [Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Cloudflare Community](https://community.cloudflare.com/)

## Server-Side Verification (Advanced)

For maximum security, you should verify Turnstile tokens server-side. This requires:
1. A backend server (Node.js, PHP, Python, etc.)
2. The secret key (never expose this in client-side code)
3. API call to Cloudflare to verify the token

Example (Node.js):
```javascript
const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  body: JSON.stringify({
    secret: 'YOUR_SECRET_KEY',
    response: turnstileToken,
    remoteip: clientIP
  })
});
```

For now, the client-side implementation works, but server-side verification is more secure.

