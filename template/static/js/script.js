// Portfolio Interactive JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== STICKY NAVIGATION ====================
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    function handleNavOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show nav on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    
    // Create Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    // Heading slide-in animation
    function createHeadingObserver() {
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                }
            });
        }, observerOptions);
        
        // Observe all headings
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.classList.add('slide-ready');
            headingObserver.observe(heading);
        });
    }
    
    // Typewriter effect for paragraphs
    function createTypewriterObserver() {
        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    startTypewriter(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all paragraphs
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
            // Store original text
            p.dataset.originalText = p.textContent;
            p.textContent = ''; // Clear text initially
            p.classList.add('typewriter-ready');
            typewriterObserver.observe(p);
        });
    }
    
    // Typewriter animation function
    function startTypewriter(element) {
        const text = element.dataset.originalText;
        const speed = 30; // Typing speed in milliseconds
        let i = 0;
        
        element.classList.add('typed');
        element.style.borderRight = '2px solid rgb(52, 79, 31)'; // Cursor effect
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }
        
        typeChar();
    }
    
    // ==================== SMOOTH SCROLLING FOR NAV LINKS ====================
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ==================== FORM ENHANCEMENTS ====================
    function enhanceForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add floating labels effect
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Add focus effects
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('input-focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('input-focused');
                    if (this.value) {
                        this.classList.add('has-value');
                    } else {
                        this.classList.remove('has-value');
                    }
                });
            });
            
            // Form submission feedback
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showFormFeedback();
            });
        });
    }
    
    function showFormFeedback() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Thank you! Your message has been sent.';
        successMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: rgb(52, 79, 31);
            color: rgb(250, 234, 177);
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(52, 79, 31, 0.3);
            transform: translateX(300px);
            transition: transform 0.3s ease;
            z-index: 1001;
        `;
        
        document.body.appendChild(successMessage);
        
        // Slide in
        setTimeout(() => {
            successMessage.style.transform = 'translateX(0)';
        }, 100);
        
        // Slide out and remove
        setTimeout(() => {
            successMessage.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }, 3000);
    }
    
    // ==================== SCROLL PROGRESS INDICATOR ====================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, rgb(52, 79, 31), rgba(52, 79, 31, 0.6));
            z-index: 1002;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // ==================== INITIALIZE ALL FEATURES ====================
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        /* Navigation transitions */
        nav {
            transition: all 0.3s ease;
        }
        
        nav.scrolled {
            background-color: rgba(52, 79, 31, 0.98);
            box-shadow: 0 2px 20px rgba(52, 79, 31, 0.4);
        }
        
        /* Heading slide-in animations */
        .slide-ready {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.8s ease;
        }
        
        .slide-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* Typewriter cursor */
        .typewriter-ready {
            min-height: 1.2em;
        }
        
        /* Stagger heading animations */
        h1.slide-ready { transition-delay: 0.1s; }
        h2.slide-ready { transition-delay: 0.2s; }
        h3.slide-ready { transition-delay: 0.3s; }
        
        /* Enhanced hover effects */
        article:hover {
            transform: translateY(-5px) scale(1.02);
        }
        
        /* Button pulse effect */
        input[type="submit"]:hover {
            animation: pulse 0.6s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        /* Loading animation for forms */
        .loading {
            position: relative;
            overflow: hidden;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(250, 234, 177, 0.4), transparent);
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all features
    handleNavOnScroll(); // Initial call
    window.addEventListener('scroll', handleNavOnScroll);
    
    createHeadingObserver();
    createTypewriterObserver();
    initSmoothScrolling();
    enhanceForms();
    createScrollProgress();
    
    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('Portfolio animations initialized! 🚀');
});

// ==================== ADDITIONAL UTILITY FUNCTIONS ====================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler with debounce
window.addEventListener('resize', debounce(() => {
    // Recalculate positions if needed
    console.log('Window resized - animations adjusted');
}, 250));