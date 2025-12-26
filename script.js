// Navigation functionality
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
};

// Initialize scroll animations
animateOnScroll();

// Counter animation for stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_yu1fcbi';
const EMAILJS_TEMPLATE_ID = 'template_6lbas8s';

// Initialize EmailJS when it's loaded
if (typeof emailjs !== 'undefined') {
    // EmailJS v4+ doesn't require explicit init with CDN
    // If you need to use a public key, uncomment and add it:
    // emailjs.init("YOUR_PUBLIC_KEY");
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const turnstileModal = document.getElementById('turnstileModal');
const modalClose = document.getElementById('modalClose');
let formDataToSubmit = null;
let turnstileWidgetId = null;

// Show modal
const showModal = () => {
    turnstileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // First, ensure any previous widget is cleaned up
    if (turnstileWidgetId && typeof window.turnstile !== 'undefined') {
        try {
            window.turnstile.remove(turnstileWidgetId);
        } catch (e) {
            // Widget already removed, continue
        }
        turnstileWidgetId = null;
    }
    
    // Clear the container
    const widgetContainer = document.getElementById('turnstile-widget');
    if (widgetContainer) {
        widgetContainer.innerHTML = '';
    }
    
    // Wait for modal animation to complete and ensure it's visible before rendering Turnstile
    setTimeout(() => {
        const renderTurnstile = () => {
            const widgetContainer = document.getElementById('turnstile-widget');
            if (!widgetContainer) {
                console.error('Turnstile widget container not found');
                return;
            }
            
            // Ensure container is visible
            if (widgetContainer.offsetParent === null) {
                console.log('Widget container not visible, retrying...');
                setTimeout(renderTurnstile, 100);
                return;
            }
            
            if (typeof window.turnstile === 'undefined') {
                console.log('Turnstile not loaded yet, retrying...');
                // Retry after a short delay if Turnstile hasn't loaded yet
                setTimeout(renderTurnstile, 100);
                return;
            }
            
            try {
                // Render new widget
                turnstileWidgetId = window.turnstile.render(widgetContainer, {
                    sitekey: '0x4AAAAAACJER-K2fsmCqWan',
                    callback: (token) => {
                        console.log('Turnstile completed successfully');
                        // When Turnstile is completed, automatically submit
                        handleFormSubmit(token);
                    },
                    'error-callback': () => {
                        // Error callback fires on various errors (domain mismatch, network, etc.)
                        console.error('Turnstile error callback triggered');
                        // Note: Error callback may fire even if widget renders
                        // We'll let the widget try to render and only show error if it truly fails
                        // Check after a delay if widget actually rendered
                        setTimeout(() => {
                            if (turnstileModal.classList.contains('active')) {
                                const widgetContainer = document.getElementById('turnstile-widget');
                                // Check if widget has any content (iframe, divs, etc.)
                                const hasWidgetContent = widgetContainer && (
                                    widgetContainer.querySelector('iframe') || 
                                    widgetContainer.querySelector('.cf-turnstile') ||
                                    widgetContainer.children.length > 0
                                );
                                
                                // Only show error if widget truly failed to render
                                if (!hasWidgetContent) {
                                    console.error('Turnstile widget failed to render - likely domain configuration issue');
                                    showFormMessage('Security check failed. Please check that your domain is configured correctly in Cloudflare Turnstile settings, or try again.', 'error');
                                    closeModal();
                                } else {
                                    console.log('Turnstile widget appears to have rendered despite error callback');
                                }
                            }
                        }, 3000);
                    },
                    'expired-callback': () => {
                        console.log('Turnstile token expired');
                        // Token expired - user needs to complete again
                        if (widgetContainer) {
                            widgetContainer.innerHTML = '';
                            turnstileWidgetId = window.turnstile.render(widgetContainer, {
                                sitekey: '0x4AAAAAACJER-K2fsmCqWan',
                                callback: (token) => handleFormSubmit(token),
                            });
                        }
                    }
                });
                
                if (!turnstileWidgetId) {
                    throw new Error('Turnstile render returned no widget ID');
                }
            } catch (error) {
                console.error('Error rendering Turnstile:', error);
                showFormMessage('Security check failed to load. Please refresh and try again.', 'error');
                closeModal();
            }
        };
        
        // Start rendering after modal is visible
        renderTurnstile();
    }, 100); // Wait for modal to be visible
};

// Close modal
const closeModal = () => {
    // Reset Turnstile widget before closing
    const widgetContainer = document.getElementById('turnstile-widget');
    if (widgetContainer) {
        widgetContainer.innerHTML = '';
    }
    
    if (turnstileWidgetId && typeof window.turnstile !== 'undefined') {
        try {
            window.turnstile.remove(turnstileWidgetId);
        } catch (e) {
            console.log('Turnstile widget already removed');
        }
        turnstileWidgetId = null;
    }
    
    turnstileModal.classList.remove('active');
    document.body.style.overflow = '';
};

// Close modal on X button click
modalClose.addEventListener('click', () => {
    closeModal();
    formDataToSubmit = null;
});

// Close modal on outside click
turnstileModal.addEventListener('click', (e) => {
    if (e.target === turnstileModal) {
        closeModal();
        formDataToSubmit = null;
    }
});

// Close modal on Escape key (handled in keyboard navigation below)

// Handle form submission with Turnstile token
const handleFormSubmit = async (turnstileToken) => {
    if (!formDataToSubmit) {
        showFormMessage('Form data is missing. Please try again.', 'error');
        closeModal();
        return;
    }
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    closeModal();
    
    try {
        // Prepare EmailJS template parameters
        const templateParams = {
            from_name: formDataToSubmit.name,
            from_email: formDataToSubmit.email,
            phone: formDataToSubmit.phone || 'Not provided',
            message: formDataToSubmit.message,
            turnstile_token: turnstileToken
        };
        
        // Send email using EmailJS
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS is not loaded');
        }
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        
        showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        showFormMessage('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        formDataToSubmit = null;
    }
};

// Form submit handler - show modal first
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }
    
    // Get form data
    const formData = new FormData(contactForm);
    formDataToSubmit = Object.fromEntries(formData);
    
    // Show modal with Turnstile
    showModal();
});

const showFormMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
};

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Parallax effect for hero curves (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const curves = document.querySelectorAll('.curve');
    
    curves.forEach((curve, index) => {
        const speed = (index + 1) * 0.5;
        curve.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close modal if open
        if (turnstileModal.classList.contains('active')) {
            closeModal();
            formDataToSubmit = null;
        }
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Lazy loading for images (if you add images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animationDuration = '0.01ms !important';
        el.style.animationIterationCount = '1 !important';
        el.style.transitionDuration = '0.01ms !important';
    });
}

