# Security Guide for FlyNuka

This document outlines the security measures implemented to protect the website from attacks and bot submissions.

## Security Features Implemented

### 1. Cloudflare Turnstile
- **Purpose**: Bot protection and spam prevention
- **Implementation**: Turnstile widget is required before form submission
- **Status**: Client-side verification is active
- **Recommendation**: Implement server-side token verification for maximum security

### 2. Honeypot Field
- **Purpose**: Detect automated bots
- **Implementation**: Hidden form field that legitimate users won't see or fill
- **Action**: Form submission is rejected if honeypot field is filled

### 3. Rate Limiting
- **Purpose**: Prevent spam and abuse
- **Implementation**:
  - Minimum 10 seconds between submissions
  - Maximum 5 submission attempts per minute
  - Automatic reset after 1 minute

### 4. Input Sanitization
- **Purpose**: Prevent XSS (Cross-Site Scripting) attacks
- **Implementation**:
  - All user inputs are sanitized before processing
  - HTML tags and scripts are removed
  - JavaScript event handlers are stripped
  - Dangerous protocols (javascript:) are removed

### 5. Input Validation
- **Email**: Validated using regex pattern
- **Name**: Validated for format (2-100 characters, letters, spaces, hyphens, apostrophes, periods)
- **Length Limits**:
  - Name: 100 characters max
  - Email: 254 characters max
  - Subject: 200 characters max
  - Message: 10-2000 characters

### 6. Content Security Policy (CSP)
- **Status**: Recommended for production
- **Implementation**: See Cloudflare configuration below

## Cloudflare Security Configuration

### Recommended Cloudflare Settings

1. **Enable Cloudflare Protection**
   - Go to Cloudflare Dashboard → Your Domain → Security
   - Set Security Level to "Medium" or "High"
   - Enable "Under Attack Mode" if experiencing DDoS

2. **Turnstile Configuration**
   - Create Turnstile site in Cloudflare Dashboard
   - Use "Managed" mode for automatic bot detection
   - Set widget to "Invisible" or "Non-interactive" for better UX

3. **Firewall Rules**
   - Block countries with high spam rates (if applicable)
   - Rate limit requests per IP
   - Block known bad IPs

4. **DDoS Protection**
   - Automatic DDoS mitigation is enabled by default
   - Configure custom rules if needed

### Server-Side Turnstile Verification

For maximum security, verify Turnstile tokens server-side:

```javascript
// Example server-side verification (Node.js)
const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        secret: 'YOUR_TURNSTILE_SECRET_KEY',
        response: turnstileToken,
        remoteip: clientIP
    })
});

const result = await response.json();
if (!result.success) {
    // Reject submission
}
```

## Content Security Policy (CSP)

Add this meta tag to `index.html` for additional XSS protection:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https://api.emailjs.com https://challenges.cloudflare.com;
">
```

## Security Headers (via Cloudflare)

Configure these headers in Cloudflare → Rules → Transform Rules → Modify Response Header:

1. **X-Content-Type-Options**: `nosniff`
2. **X-Frame-Options**: `DENY` or `SAMEORIGIN`
3. **X-XSS-Protection**: `1; mode=block`
4. **Referrer-Policy**: `strict-origin-when-cross-origin`
5. **Permissions-Policy**: `geolocation=(), microphone=(), camera=()`

## EmailJS Security

1. **Rate Limiting**: EmailJS has built-in rate limiting
2. **Template Validation**: Ensure EmailJS templates sanitize inputs
3. **Public Key**: The public key is safe to expose (it's meant to be public)
4. **Service ID & Template ID**: These are also safe to expose

## Additional Recommendations

### 1. HTTPS Only
- Ensure your site is served over HTTPS
- Cloudflare provides free SSL certificates
- Enable "Always Use HTTPS" in Cloudflare settings

### 2. Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update API keys if compromised

### 3. Monitoring
- Set up Cloudflare Analytics
- Monitor form submission patterns
- Alert on unusual activity

### 4. Backup
- Regular backups of your site
- Version control (Git) for code
- Backup configuration files

## Testing Security

1. **Test Honeypot**: Try filling the hidden field (should be rejected)
2. **Test Rate Limiting**: Submit form multiple times quickly (should be throttled)
3. **Test Input Sanitization**: Try submitting HTML/JavaScript in form fields
4. **Test Turnstile**: Verify widget appears and is required
5. **Test Validation**: Try invalid emails, names, etc.

## Incident Response

If you detect suspicious activity:

1. Enable "Under Attack Mode" in Cloudflare
2. Review Cloudflare Firewall logs
3. Block offending IPs if necessary
4. Review form submissions for patterns
5. Consider implementing additional rate limiting

## Security Checklist

Before going live, ensure:

- [ ] Cloudflare Turnstile is configured and working
- [ ] Honeypot field is in place
- [ ] Rate limiting is active
- [ ] Input sanitization is working
- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] CSP is implemented (optional but recommended)
- [ ] Server-side Turnstile verification is implemented (recommended)
- [ ] Regular backups are scheduled
- [ ] Monitoring is set up

## Support

For security concerns or questions:
- Cloudflare Support: https://support.cloudflare.com
- EmailJS Support: https://www.emailjs.com/support/
- Turnstile Docs: https://developers.cloudflare.com/turnstile/

