// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioGrid = document.getElementById('portfolioGrid');
const servicesGrid = document.getElementById('servicesGrid');
const portfolioModal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Turnstile state
let turnstileWidgetId = null;
let turnstileToken = null;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeSite();
    setupEventListeners();
    setupScrollAnimations();
    setupIntersectionObserver();
    initializeTurnstile();
});

// ===== Initialize Site Content =====
function initializeSite() {
    // Set hero subtitle
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = `${siteConfig.name} • ${siteConfig.title}`;
    }
    
    // Update Turnstile widget with site key
    const turnstileWidget = document.getElementById('turnstile-widget');
    if (turnstileWidget && siteConfig.turnstile.siteKey && siteConfig.turnstile.siteKey !== 'YOUR_TURNSTILE_SITE_KEY') {
        turnstileWidget.setAttribute('data-sitekey', siteConfig.turnstile.siteKey);
    }

    // Set about section
    const aboutTitle = document.getElementById('aboutTitle');
    const aboutDescription = document.getElementById('aboutDescription');
    const aboutName = document.getElementById('aboutName');
    const aboutTitleText = document.getElementById('aboutTitleText');
    const aboutHighlights = document.getElementById('aboutHighlights');

    if (aboutTitle) aboutTitle.textContent = siteConfig.about.headline;
    if (aboutDescription) aboutDescription.textContent = siteConfig.about.description;
    if (aboutName) aboutName.textContent = siteConfig.name;
    if (aboutTitleText) aboutTitleText.textContent = siteConfig.title;
    
    if (aboutHighlights) {
        aboutHighlights.innerHTML = siteConfig.about.highlights.map(highlight => `
            <div class="highlight-item">
                <i class="fas fa-check-circle"></i>
                <h4>${highlight}</h4>
            </div>
        `).join('');
    }

    // Render services
    renderServices();

    // Render portfolio
    renderPortfolio();

    // Set contact info
    const contactPhone = document.getElementById('contactPhone');
    const contactEmail = document.getElementById('contactEmail');
    if (contactPhone) contactPhone.textContent = siteConfig.phone;
    if (contactEmail) contactEmail.textContent = siteConfig.email;

    // Render social links
    renderSocialLinks();

    // Set current year
    const currentYear = document.getElementById('currentYear');
    if (currentYear) currentYear.textContent = new Date().getFullYear();
}

// ===== Render Services =====
function renderServices() {
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = siteConfig.services.map(service => `
        <div class="service-card fade-in">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// ===== Render Portfolio =====
function renderPortfolio(filter = 'all') {
    if (!portfolioGrid) return;

    const filteredItems = filter === 'all' 
        ? siteConfig.portfolio 
        : siteConfig.portfolio.filter(item => item.category === filter);

    portfolioGrid.innerHTML = filteredItems.map(item => `
        <div class="portfolio-item fade-in" data-category="${item.category}" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        </div>
    `).join('');

    // Add click listeners to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => openPortfolioModal(item.dataset.id));
    });

    // Re-trigger intersection observer for new items
    setTimeout(() => {
        setupIntersectionObserver();
    }, 100);
}

// ===== Render Social Links =====
function renderSocialLinks() {
    const socialLinksContainer = document.getElementById('socialLinks');
    if (!socialLinksContainer) return;

    const socialLinks = Object.entries(siteConfig.socialLinks);
    if (socialLinks.length === 0) return;

    socialLinksContainer.innerHTML = socialLinks.map(([key, value]) => `
        <a href="${value.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${key}">
            <i class="${value.icon}"></i>
        </a>
    `).join('');
}

// ===== Theme Management =====
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
        if (themeToggle) {
            themeToggle.classList.add('active');
        }
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        if (themeToggle) {
            themeToggle.classList.remove('active');
        }
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Portfolio filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter portfolio
            renderPortfolio(filter);
        });
    });

    // Modal close
    if (modalClose) {
        modalClose.addEventListener('click', closePortfolioModal);
    }

    if (portfolioModal) {
        portfolioModal.addEventListener('click', (e) => {
            if (e.target === portfolioModal) {
                closePortfolioModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            closePortfolioModal();
        }
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Navbar Scroll Effect =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// ===== Portfolio Modal =====
function openPortfolioModal(itemId) {
    const item = siteConfig.portfolio.find(p => p.id === parseInt(itemId));
    if (!item) return;

    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');

    if (modalImage) modalImage.src = item.image;
    if (modalImage) modalImage.alt = item.title;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalCategory) modalCategory.textContent = item.category;
    if (modalDescription) modalDescription.textContent = item.description;

    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Cloudflare Turnstile Functions =====
function initializeTurnstile() {
    // Check if Turnstile is configured
    if (!siteConfig.turnstile.siteKey || siteConfig.turnstile.siteKey === 'YOUR_TURNSTILE_SITE_KEY') {
        console.warn('Cloudflare Turnstile not configured. Please update config.js with your Turnstile Site Key.');
        // Hide Turnstile widget if not configured
        const turnstileContainer = document.querySelector('.turnstile-container');
        if (turnstileContainer) {
            turnstileContainer.style.display = 'none';
        }
        return;
    }
    
    // Update Turnstile widget with site key
    const turnstileWidget = document.getElementById('turnstile-widget');
    if (turnstileWidget) {
        turnstileWidget.setAttribute('data-sitekey', siteConfig.turnstile.siteKey);
        
        // Set theme based on current theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        turnstileWidget.setAttribute('data-theme', currentTheme === 'dark' ? 'dark' : 'light');
    }
    
    // Wait for Turnstile to load, then render widget
    if (typeof turnstile !== 'undefined') {
        renderTurnstile();
    } else {
        // Wait for Turnstile script to load
        window.addEventListener('load', () => {
            if (typeof turnstile !== 'undefined') {
                renderTurnstile();
            }
        });
    }
    
    // Listen for theme changes to update Turnstile theme
    const observer = new MutationObserver(() => {
        if (turnstileWidgetId !== null && typeof turnstile !== 'undefined') {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            turnstile.remove(turnstileWidgetId);
            renderTurnstile(currentTheme === 'dark' ? 'dark' : 'light');
        }
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

function renderTurnstile(theme = null) {
    const turnstileWidget = document.getElementById('turnstile-widget');
    if (!turnstileWidget || typeof turnstile === 'undefined') return;
    
    const currentTheme = theme || (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    
    turnstileWidgetId = turnstile.render(turnstileWidget, {
        sitekey: siteConfig.turnstile.siteKey,
        theme: currentTheme,
        size: 'normal',
        callback: function(token) {
            turnstileToken = token;
            console.log('Turnstile verified successfully');
        },
        'error-callback': function() {
            turnstileToken = null;
            console.error('Turnstile verification failed');
        },
        'expired-callback': function() {
            turnstileToken = null;
            console.log('Turnstile token expired');
        }
    });
}

function resetTurnstile() {
    if (turnstileWidgetId !== null && typeof turnstile !== 'undefined') {
        turnstile.reset(turnstileWidgetId);
        turnstileToken = null;
    }
}

// ===== Form Submission =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Check if EmailJS is configured
    if (!siteConfig.emailjs.serviceId || 
        siteConfig.emailjs.serviceId === 'YOUR_SERVICE_ID' ||
        !siteConfig.emailjs.templateId || 
        siteConfig.emailjs.templateId === 'YOUR_TEMPLATE_ID' ||
        !siteConfig.emailjs.publicKey || 
        siteConfig.emailjs.publicKey === 'YOUR_PUBLIC_KEY') {
        showFormMessage('Email service is not configured. Please check the setup instructions.', 'error');
        console.error('EmailJS not configured. Please update config.js with your EmailJS credentials.');
        return;
    }
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Check if Turnstile is configured and verify token
    if (siteConfig.turnstile.siteKey && siteConfig.turnstile.siteKey !== 'YOUR_TURNSTILE_SITE_KEY') {
        if (!turnstileToken) {
            showFormMessage('Please complete the security verification.', 'error');
            return;
        }
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Initialize EmailJS (only needed once, but safe to call multiple times)
    if (typeof emailjs !== 'undefined') {
        emailjs.init(siteConfig.emailjs.publicKey);
    }

    // Prepare template parameters (include Turnstile token for server-side verification if needed)
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: siteConfig.email, // Your email address
        reply_to: formData.email,
        turnstile_token: turnstileToken || '' // Include token for verification
    };

    // Send email using EmailJS
    emailjs.send(
        siteConfig.emailjs.serviceId,
        siteConfig.emailjs.templateId,
        templateParams
    )
    .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        showFormMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Reset Turnstile
        resetTurnstile();
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    })
    .catch((error) => {
        console.error('Email sending failed:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly at ' + siteConfig.email, 'error');
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    });
}

function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    
    // Add icon based on type
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    messageEl.innerHTML = `${icon} ${message}`;

    contactForm.appendChild(messageEl);

    // Scroll to message if it's not visible
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove message after 7 seconds (longer for error messages)
    const duration = type === 'error' ? 10000 : 7000;
    setTimeout(() => {
        messageEl.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => messageEl.remove(), 500);
    }, duration);
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
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== Intersection Observer for Section Animations =====
function setupIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate child elements with stagger
                const animatedChildren = entry.target.querySelectorAll('.fade-in');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.hero-shape');
    
    heroShapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Add CSS for fadeOut animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

