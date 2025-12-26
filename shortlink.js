// ===== DOM Elements =====
const shortlinkForm = document.getElementById('shortlinkForm');
const longUrlInput = document.getElementById('longUrl');
const customSlugInput = document.getElementById('customSlug');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const resultContainer = document.getElementById('resultContainer');
const shortLinkOutput = document.getElementById('shortLinkOutput');
const copyBtn = document.getElementById('copyBtn');
const originalUrlLink = document.getElementById('originalUrlLink');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
    setupScrollAnimations();
});

// ===== Theme Management =====
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Form submission
    if (shortlinkForm) {
        shortlinkForm.addEventListener('submit', handleFormSubmit);
    }

    // Copy button
    if (copyBtn) {
        copyBtn.addEventListener('click', copyShortLink);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== Input Validation =====
function validateUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

function validateSlug(slug) {
    if (!slug) return true; // Optional field
    const slugRegex = /^[a-zA-Z0-9_-]+$/;
    return slugRegex.test(slug) && slug.length <= 50;
}

// ===== Form Submission =====
async function handleFormSubmit(e) {
    e.preventDefault();

    // Hide previous messages
    hideMessages();
    hideResult();

    // Get and validate inputs
    const longUrl = longUrlInput.value.trim();
    const customSlug = customSlugInput.value.trim();

    // Validate URL
    if (!longUrl) {
        showError('Please enter a URL.');
        return;
    }

    if (!validateUrl(longUrl)) {
        showError('Please enter a valid URL (must start with http:// or https://).');
        return;
    }

    // Validate custom slug if provided
    if (customSlug && !validateSlug(customSlug)) {
        showError('Custom slug can only contain letters, numbers, hyphens, and underscores (max 50 characters).');
        return;
    }

    // Check if short.io is configured
    if (!siteConfig.shortio || !siteConfig.shortio.apiKey || siteConfig.shortio.apiKey === 'YOUR_SHORTIO_API_KEY') {
        showError('Short.io is not configured. Please add your API key to the configuration.');
        return;
    }

    // Show loading state
    const originalButtonText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

    try {
        // Create short link via short.io API
        const response = await createShortLink(longUrl, customSlug);
        
        // Show success
        showResult(response.shortUrl, longUrl);
        shortlinkForm.reset();
        
    } catch (error) {
        console.error('Error creating short link:', error);
        
        // Handle specific error cases
        if (error.message.includes('already exists') || error.message.includes('already in use')) {
            showError('This custom slug is already in use. Please choose a different one.');
        } else if (error.message.includes('invalid') || error.message.includes('Invalid')) {
            showError('Invalid URL or slug. Please check your input.');
        } else if (error.message.includes('API key') || error.message.includes('unauthorized')) {
            showError('API authentication failed. Please check your Short.io API key.');
        } else {
            showError('Failed to create short link. Please try again.');
        }
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalButtonText;
    }
}

// ===== Short.io API Integration =====
async function createShortLink(longUrl, customSlug = null) {
    const apiKey = siteConfig.shortio.apiKey;
    const domain = siteConfig.shortio.domain || 'go.flynuka.com';

    const requestBody = {
        domain: domain,
        originalURL: longUrl
    };

    // Add custom slug if provided
    if (customSlug) {
        requestBody.path = customSlug;
    }

    const response = await fetch('https://api.short.io/links', {
        method: 'POST',
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
        // Parse error message
        let errorMessage = 'Failed to create short link';
        
        if (data.error) {
            errorMessage = data.error;
        } else if (data.message) {
            errorMessage = data.message;
        } else if (response.status === 409) {
            errorMessage = 'This slug is already in use';
        } else if (response.status === 401 || response.status === 403) {
            errorMessage = 'Invalid API key';
        } else if (response.status === 400) {
            errorMessage = 'Invalid request. Please check your URL and slug.';
        }

        throw new Error(errorMessage);
    }

    // Return the short URL
    return {
        shortUrl: `https://${domain}/${data.path || data.shortCode}`,
        originalUrl: longUrl,
        path: data.path || data.shortCode
    };
}

// ===== UI Helpers =====
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function showResult(shortUrl, originalUrl) {
    shortLinkOutput.value = shortUrl;
    originalUrlLink.href = originalUrl;
    originalUrlLink.textContent = originalUrl;
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResult() {
    resultContainer.style.display = 'none';
}

async function copyShortLink() {
    try {
        await navigator.clipboard.writeText(shortLinkOutput.value);
        
        // Show feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.disabled = true;
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.disabled = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback: select text
        shortLinkOutput.select();
        document.execCommand('copy');
    }
}

// ===== Scroll Animations =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe form elements
    const formElements = document.querySelectorAll('.form-group, .shortlink-form-container');
    formElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

