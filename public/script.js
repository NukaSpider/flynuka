// EmailJS Configuration (from .env)
const EMAILJS_SERVICE_ID = 'service_yu1fcbi';
const EMAILJS_TEMPLATE_ID = 'template_6lbas8s';
const CLOUDFLARE_SITE_KEY = '0x4AAAAAACJER-K2fsmCqWan';

// Initialize EmailJS (public key should be set in EmailJS dashboard)
// You'll need to get your EmailJS Public Key from: https://dashboard.emailjs.com/admin/integration
// Then update this line with your actual public key
const EMAILJS_PUBLIC_KEY = 'JhDUSfAjpAQMBdV1n'; // Replace with your EmailJS Public Key from https://dashboard.emailjs.com/admin/integration

// Theme Toggle
const html = document.documentElement;

// Cookie helper functions
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? ';Secure' : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secureFlag}`;
}

// Check for saved theme preference or default to light mode
const currentTheme = getCookie('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

function updateThemeIcon(theme, themeIcon) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Scroll Animations
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

// Notification system
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--bg-primary);
                color: var(--text-primary);
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px var(--shadow);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 4000;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid var(--accent-green);
                max-width: 400px;
            }
            .notification-success {
                border-left-color: var(--accent-green);
            }
            .notification-error {
                border-left-color: #e74c3c;
            }
            .notification i {
                font-size: 1.5rem;
                color: var(--accent-green);
            }
            .notification-error i {
                color: #e74c3c;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Setup
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeToggle && themeIcon) {
        updateThemeIcon(currentTheme, themeIcon);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add clicked class for animation
            themeToggle.classList.add('clicked');
            setTimeout(() => {
                themeToggle.classList.remove('clicked');
            }, 600);
            
            // Smooth theme transition
            html.style.transition = 'background-color 0.4s ease, color 0.4s ease';
            html.setAttribute('data-theme', newTheme);
            setCookie('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll animations setup for static elements (section headers)
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Note: Dynamic elements (service cards, stat items, contact items, portfolio items)
    // are observed when they're created in their respective load functions
    
    // Initialize EmailJS - wait for script to load
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                emailjs.init(EMAILJS_PUBLIC_KEY);
            }
        } else {
            // Retry if EmailJS hasn't loaded yet
            setTimeout(initEmailJS, 100);
        }
    }
    
    // Start initialization
    initEmailJS();
    
    // Load and display dynamic content
    loadAboutContent();
    loadServicesContent();
    loadContactContent();
    loadPortfolioItems();
    
    // Setup portfolio modal
    setupPortfolioModal();
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const captchaModal = document.getElementById('captchaModal');
    const closeModal = document.getElementById('closeModal');
    const loadingOverlay = document.getElementById('loadingOverlay');
    let turnstileWidgetId = null;
    let formData = null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Store form data
            formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Show captcha modal
            captchaModal.classList.add('active');
            
            // Initialize Turnstile
            if (!turnstileWidgetId) {
                turnstileWidgetId = turnstile.render('#turnstile-container', {
                    sitekey: CLOUDFLARE_SITE_KEY,
                    callback: (token) => {
                        // Captcha verified, proceed with form submission
                        submitFormWithCaptcha(token);
                    },
                    'error-callback': () => {
                        console.error('Turnstile error');
                    }
                });
            } else {
                turnstile.reset(turnstileWidgetId);
            }
        });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            captchaModal.classList.remove('active');
            if (turnstileWidgetId) {
                turnstile.reset(turnstileWidgetId);
            }
            
            // Reset button state
            const submitButton = contactForm.querySelector('.btn-submit');
            if (submitButton) {
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        });
    }
    
    // Close modal when clicking outside
    if (captchaModal) {
        captchaModal.addEventListener('click', (e) => {
            if (e.target === captchaModal) {
                captchaModal.classList.remove('active');
                if (turnstileWidgetId) {
                    turnstile.reset(turnstileWidgetId);
                }
                
                // Reset button state
                const submitButton = contactForm.querySelector('.btn-submit');
                if (submitButton) {
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                }
            }
        });
    }
    
    // Submit form with captcha token
    function submitFormWithCaptcha(captchaToken) {
        // Hide captcha modal
        captchaModal.classList.remove('active');
        
        // Show loading overlay
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        // Prepare email template parameters
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Joseph Duguay'
        };
        
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }
            showNotification('Email service not initialized. Please refresh the page.', 'error');
            return;
        }
        
        // Send email via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                
                // Hide loading overlay
                if (loadingOverlay) {
                    loadingOverlay.classList.remove('active');
                }
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset captcha
                if (turnstileWidgetId) {
                    turnstile.reset(turnstileWidgetId);
                }
                
                // Reset button state
                const submitButton = contactForm.querySelector('.btn-submit');
                if (submitButton) {
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                }
            })
            .catch((error) => {
                console.error('FAILED...', error);
                
                // Hide loading overlay
                if (loadingOverlay) {
                    loadingOverlay.classList.remove('active');
                }
                
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
                
                // Reset button state
                const submitButton = contactForm.querySelector('.btn-submit');
                if (submitButton) {
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                }
            });
    }
    }
});

// About Section Functions
async function loadAboutContent() {
    try {
        const response = await fetch('about-data.json');
        const aboutData = await response.json();
        const aboutText = document.getElementById('aboutText');
        const aboutStats = document.getElementById('aboutStats');
        
        if (!aboutText || !aboutStats) return;
        
        // Load paragraphs
        aboutText.innerHTML = '';
        aboutData.paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutText.appendChild(p);
        });
        
        // Load stats
        aboutStats.innerHTML = '';
        aboutData.stats.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item fade-in';
            statItem.innerHTML = `
                <i class="${stat.icon}"></i>
                <h3>${stat.value}</h3>
                <p>${stat.label}</p>
            `;
            aboutStats.appendChild(statItem);
            observer.observe(statItem);
        });
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

// Services Section Functions
async function loadServicesContent() {
    try {
        const response = await fetch('services-data.json');
        const services = await response.json();
        const servicesGrid = document.getElementById('servicesGrid');
        
        if (!servicesGrid) return;
        
        servicesGrid.innerHTML = '';
        
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card fade-in';
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(serviceCard);
            observer.observe(serviceCard);
        });
    } catch (error) {
        console.error('Error loading services content:', error);
        const servicesGrid = document.getElementById('servicesGrid');
        if (servicesGrid) {
            servicesGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Services could not be loaded.</p>';
        }
    }
}

// Contact Section Functions
async function loadContactContent() {
    try {
        const response = await fetch('contact-data.json');
        const contactData = await response.json();
        const contactInfo = document.getElementById('contactInfo');
        
        if (!contactInfo) return;
        
        contactInfo.innerHTML = '';
        
        contactData.contactItems.forEach(item => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item fade-in';
            
            const linkAttributes = item.type === 'social' ? 'target="_blank" rel="noopener noreferrer"' : '';
            
            contactItem.innerHTML = `
                <i class="${item.icon}"></i>
                <div>
                    <h3>${item.label}</h3>
                    <a href="${item.link}" ${linkAttributes}>${item.value}</a>
                </div>
            `;
            contactInfo.appendChild(contactItem);
            observer.observe(contactItem);
        });
    } catch (error) {
        console.error('Error loading contact content:', error);
    }
}

// Portfolio Functions
async function loadPortfolioItems() {
    try {
        const response = await fetch('portfolio-data.json');
        const portfolioItems = await response.json();
        const portfolioGrid = document.getElementById('portfolioGrid');
        
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        
        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item fade-in';
            portfolioItem.dataset.id = item.id;
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-item-image" loading="lazy">
                <div class="portfolio-item-overlay">
                    <h3 class="portfolio-item-title">${item.title}</h3>
                </div>
            `;
            
            // Add click handler to open modal
            portfolioItem.addEventListener('click', () => {
                openPortfolioModal(item);
            });
            
            // Add z-index hover effect
            portfolioItem.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            portfolioItem.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
            
            portfolioGrid.appendChild(portfolioItem);
            observer.observe(portfolioItem);
        });
    } catch (error) {
        console.error('Error loading portfolio items:', error);
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (portfolioGrid) {
            portfolioGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Portfolio items could not be loaded.</p>';
        }
    }
}

function openPortfolioModal(item) {
    const modal = document.getElementById('portfolioModal');
    const modalTitle = document.getElementById('portfolioModalTitle');
    const modalImage = document.getElementById('portfolioModalImage');
    const modalDescription = document.getElementById('portfolioModalDescription');
    
    if (modal && modalTitle && modalImage && modalDescription) {
        modalTitle.textContent = item.title;
        modalImage.src = item.image;
        modalImage.alt = item.title;
        modalDescription.textContent = item.description;
        modal.classList.add('active');
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

// Setup portfolio modal (called from DOMContentLoaded)
function setupPortfolioModal() {
    const portfolioModal = document.getElementById('portfolioModal');
    const closePortfolioModal = document.getElementById('closePortfolioModal');
    
    function closeModal() {
        if (portfolioModal) {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (closePortfolioModal) {
        closePortfolioModal.addEventListener('click', closeModal);
    }
    
    if (portfolioModal) {
        portfolioModal.addEventListener('click', (e) => {
            if (e.target === portfolioModal) {
                closeModal();
            }
        });
    }
    
    // Close on Escape key (global listener)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && portfolioModal && portfolioModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px var(--shadow)';
    } else {
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section (more subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

