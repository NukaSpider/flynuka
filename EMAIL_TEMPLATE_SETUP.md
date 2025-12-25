# Email Template Setup Guide

This guide will help you add the custom email template to your EmailJS account.

## Step 1: Copy the Template HTML

1. Open the `email-template.html` file
2. Copy the entire contents (Ctrl+A, then Ctrl+C)

## Step 2: Add Template to EmailJS

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates** in the left sidebar
3. Click **Create New Template** (or edit your existing template)
4. Give it a name: "Contact Form - Flynuka"

## Step 3: Configure the Template

1. **Subject Line:**
   ```
   New Contact Form Submission: {{subject}}
   ```

2. **Content:**
   - Click on the **HTML** tab (or switch from plain text to HTML)
   - Paste the entire HTML from `email-template.html`
   - Make sure you're in HTML mode, not plain text

3. **Template Variables:**
   The template uses these variables (they should auto-populate):
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{reply_to}}` - Reply-to email (same as from_email)

## Step 4: Test the Template

1. Click **Save** to save your template
2. Use the **Test** button to send a test email
3. Check your inbox to see how it looks

## Step 5: Update Your Template ID

1. After saving, note your **Template ID** (it will be something like `template_xxxxxxx`)
2. Make sure this matches the `templateId` in your `config.js` file

## Template Features

The template includes:
- ✅ Green/black/white color scheme matching your website
- ✅ Professional, modern design
- ✅ Responsive layout (works on mobile)
- ✅ Clear information hierarchy
- ✅ Reply button for easy response
- ✅ Branded footer

## Customization

You can customize the template by editing `email-template.html`:
- Change colors (search for `#00ff88` for green, `#000000` for black)
- Adjust spacing (padding values)
- Modify text styles
- Add your logo (if desired)

## Troubleshooting

**Template looks broken:**
- Make sure you're using the HTML tab, not plain text
- Some email clients have limited HTML support, but this template should work in most modern clients

**Variables not showing:**
- Make sure the variable names match exactly (case-sensitive)
- Check that you're using double curly braces: `{{variable_name}}`

**Colors look different:**
- Some email clients (like Outlook) have limited CSS support
- The template uses inline styles for maximum compatibility

## Alternative: Plain Text Version

If you prefer a simpler version, you can use this in the plain text tab:

```
New Contact Form Submission: {{subject}}

You have received a new message from your website contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

But the HTML version looks much better! 🎨

