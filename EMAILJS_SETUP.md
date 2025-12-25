# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form work.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook** / **Hotmail**
   - **Custom SMTP** (if you have your own email server)
4. Follow the setup instructions for your chosen provider
5. Note your **Service ID** (you'll need this)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template structure:

**Template Name:** Contact Form

**Subject:** New Contact Form Submission: {{subject}}

**Content:**
```
You have received a new message from your website contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. Click **Save**
5. Note your **Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy this key

## Step 5: Update Your Config File

1. Open `config.js` in your project
2. Find the `emailjs` section
3. Replace the placeholder values:
   ```javascript
   emailjs: {
     serviceId: "YOUR_SERVICE_ID",        // From Step 2
     templateId: "YOUR_TEMPLATE_ID",      // From Step 3
     publicKey: "YOUR_PUBLIC_KEY"         // From Step 4
   }
   ```

## Step 6: Test Your Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox for the message

## Troubleshooting

### Form shows "Email service is not configured"
- Make sure you've updated all three values in `config.js`
- Check that there are no extra spaces or quotes

### Emails not arriving
- Check your spam/junk folder
- Verify your EmailJS service is connected properly
- Check the browser console for error messages
- Make sure you haven't exceeded the free tier limit (200 emails/month)

### Using Your Own Domain Email

If you want to receive emails at `contact@flynuka.com`:

1. **Option A: Use Gmail with your domain**
   - Set up Google Workspace for your domain
   - Use Gmail as your EmailJS service
   - Configure it to send from your domain email

2. **Option B: Use Custom SMTP**
   - In EmailJS, choose "Custom SMTP" as your service
   - Enter your email server details (ask your hosting provider)
   - Configure it to use your domain email

3. **Option C: Use a forwarding service**
   - Set up email forwarding from `contact@flynuka.com` to your personal email
   - Use your personal email in EmailJS
   - Emails will be forwarded automatically

## Alternative Solutions

If EmailJS doesn't work for you, here are other options:

1. **Formspree** - Similar service, easy setup
2. **Netlify Forms** - If hosting on Netlify
3. **Backend API** - Custom server-side solution (requires backend development)

## Security Note

The Public Key is safe to expose in client-side code. EmailJS uses it to identify your account, but it has limited permissions. Never expose your Private Key (if you have one).

