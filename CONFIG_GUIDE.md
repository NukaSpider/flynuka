# Configuration Files Guide

All content sections on the website can be customized through JSON configuration files. This makes it easy to update content without editing HTML or JavaScript code.

## Configuration Files

### 1. About Section - `public/about-data.json`

Contains the About Me section content including paragraphs and statistics.

**Structure:**
```json
{
    "paragraphs": [
        "First paragraph text...",
        "Second paragraph text..."
    ],
    "stats": [
        {
            "icon": "fas fa-camera",
            "value": "500+",
            "label": "Projects Completed"
        }
    ]
}
```

**Fields:**
- `paragraphs`: Array of strings - Each string becomes a paragraph
- `stats`: Array of stat objects with:
  - `icon`: Font Awesome icon class (e.g., "fas fa-camera")
  - `value`: The number or text to display (e.g., "500+", "FAA")
  - `label`: Description text below the value

**Example:**
```json
{
    "paragraphs": [
        "Your first paragraph about yourself here.",
        "Your second paragraph continues the story."
    ],
    "stats": [
        {
            "icon": "fas fa-trophy",
            "value": "1000+",
            "label": "Happy Clients"
        }
    ]
}
```

---

### 2. Services Section - `public/services-data.json`

Contains all service offerings displayed in cards.

**Structure:**
```json
[
    {
        "id": 1,
        "icon": "fas fa-home",
        "title": "Service Name",
        "description": "Service description text..."
    }
]
```

**Fields:**
- `id`: Unique number identifier
- `icon`: Font Awesome icon class
- `title`: Service name (displayed as heading)
- `description`: Service description (displayed as paragraph)

**Example:**
```json
[
    {
        "id": 1,
        "icon": "fas fa-camera",
        "title": "Aerial Photography",
        "description": "Stunning aerial shots from unique perspectives."
    },
    {
        "id": 2,
        "icon": "fas fa-video",
        "title": "Videography",
        "description": "Professional video production services."
    }
]
```

---

### 3. Contact Section - `public/contact-data.json`

Contains contact information items (phone, email, social media, etc.).

**Structure:**
```json
{
    "contactItems": [
        {
            "id": 1,
            "icon": "fas fa-phone",
            "label": "Phone",
            "value": "+1 (555) 123-4567",
            "link": "tel:+15551234567",
            "type": "phone"
        }
    ]
}
```

**Fields:**
- `id`: Unique number identifier
- `icon`: Font Awesome icon class
- `label`: Contact method label (e.g., "Phone", "Email", "Instagram")
- `value`: Display text (e.g., phone number, email address, username)
- `link`: URL or link (e.g., tel: link, mailto:, or website URL)
- `type`: Type of contact item:
  - `"phone"`: Phone number (uses tel: link)
  - `"email"`: Email address (use mailto: in link)
  - `"social"`: Social media (opens in new tab)

**Example:**
```json
{
    "contactItems": [
        {
            "id": 1,
            "icon": "fas fa-phone",
            "label": "Phone",
            "value": "+1 (555) 123-4567",
            "link": "tel:+15551234567",
            "type": "phone"
        },
        {
            "id": 2,
            "icon": "fas fa-envelope",
            "label": "Email",
            "value": "contact@example.com",
            "link": "mailto:contact@example.com",
            "type": "email"
        },
        {
            "id": 3,
            "icon": "fab fa-twitter",
            "label": "Twitter",
            "value": "@yourhandle",
            "link": "https://twitter.com/yourhandle",
            "type": "social"
        }
    ]
}
```

---

### 4. Portfolio Section - `public/portfolio-data.json`

Contains portfolio items with images and descriptions.

**Structure:**
```json
[
    {
        "id": 1,
        "title": "Project Title",
        "image": "https://example.com/image.jpg",
        "description": "Project description..."
    }
]
```

**Fields:**
- `id`: Unique number identifier
- `title`: Project title (shows on hover and in modal)
- `image`: URL to image (can be local path like `/images/photo.jpg` or external URL)
- `description`: Detailed description (shows in modal when clicked)

See `PORTFOLIO_SETUP.md` for more details on portfolio configuration.

---

## Font Awesome Icons

All icon fields use Font Awesome classes. Available icon styles:
- `fas` - Solid icons (most common)
- `far` - Regular icons
- `fab` - Brand icons (for social media)

**Popular Icons:**
- `fas fa-camera` - Camera
- `fas fa-video` - Video
- `fas fa-home` - Home/Real Estate
- `fas fa-calendar-alt` - Calendar/Events
- `fas fa-envelope` - Email
- `fas fa-phone` - Phone
- `fas fa-certificate` - Certificate
- `fab fa-instagram` - Instagram
- `fab fa-twitter` - Twitter
- `fab fa-facebook` - Facebook
- `fab fa-linkedin` - LinkedIn

Browse all icons at: https://fontawesome.com/icons

---

## Updating Content

1. **Edit the JSON file** you want to change
2. **Save the file**
3. **Refresh your browser** - Changes will appear immediately
4. **No code changes needed** - The website automatically loads the latest JSON data

---

## Tips

- **Keep JSON valid** - Use a JSON validator if you're unsure
- **Use proper icon classes** - Check Font Awesome documentation
- **Test links** - Make sure all links in contact-data.json work
- **Image URLs** - Use reliable image hosting or local paths
- **Consistent formatting** - Keep JSON formatting consistent for readability

---

## File Locations

All configuration files are located in the `public/` directory:
- `public/about-data.json`
- `public/services-data.json`
- `public/contact-data.json`
- `public/portfolio-data.json`

