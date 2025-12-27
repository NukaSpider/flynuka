// Shortlink Page JavaScript
const shortlinkForm = document.getElementById('shortlinkForm');
const successModal = document.getElementById('successModal');
const errorContainer = document.getElementById('errorContainer');
const submitBtn = document.getElementById('submitBtn');
const copyBtn = document.getElementById('copyBtn');
const closeSuccessModal = document.getElementById('closeSuccessModal');

// Handle form submission
shortlinkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous results
    successModal.classList.remove('active');
    errorContainer.style.display = 'none';
    
    // Get form data
    const originalURL = document.getElementById('originalURL').value.trim();
    const customPath = document.getElementById('customPath').value.trim();
    
    // Validate URL
    try {
        const url = new URL(originalURL);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            throw new Error('Invalid protocol');
        }
    } catch (error) {
        showError('Please enter a valid URL (must start with http:// or https://)');
        return;
    }
    
    // Sanitize custom path if provided
    if (customPath) {
        const sanitized = customPath.replace(/[^a-zA-Z0-9-_]/g, '');
        if (sanitized !== customPath) {
            showError('Custom path can only contain letters, numbers, hyphens, and underscores');
            return;
        }
    }
    
    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Creating...</span><i class="fas fa-spinner fa-spin"></i>';
    
    try {
        const response = await fetch('/api/create-shortlink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                originalURL: originalURL,
                customPath: customPath || undefined
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create short link');
        }
        
        // Show success result
        showResult(data);
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message || 'An error occurred while creating the short link');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Create Short Link</span><i class="fas fa-magic"></i>';
    }
});

// Show success result
function showResult(data) {
    document.getElementById('shortLinkOutput').value = data.shortLink;
    document.getElementById('originalLinkOutput').textContent = data.originalURL;
    document.getElementById('pathOutput').textContent = data.path;
    
    successModal.classList.add('active');
    errorContainer.style.display = 'none';
}

// Show error message
function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    errorContainer.style.display = 'block';
    successModal.classList.remove('active');
    
    // Scroll to error
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy short link to clipboard
copyBtn.addEventListener('click', async () => {
    const shortLink = document.getElementById('shortLinkOutput').value;
    
    try {
        await navigator.clipboard.writeText(shortLink);
        
        // Show feedback
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = 'var(--accent-green)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
        }, 2000);
        
    } catch (error) {
        console.error('Failed to copy:', error);
        // Fallback: select text
        document.getElementById('shortLinkOutput').select();
        document.execCommand('copy');
    }
});

// Close success modal
closeSuccessModal.addEventListener('click', () => {
    successModal.classList.remove('active');
    shortlinkForm.reset();
    document.getElementById('originalURL').focus();
});

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
        shortlinkForm.reset();
        document.getElementById('originalURL').focus();
    }
});

// Auto-focus on page load
window.addEventListener('load', () => {
    document.getElementById('originalURL').focus();
});

