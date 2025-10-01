// Portfolio Interactive JavaScript

// Wait for DOM to load
// Portfolio Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== STICKY NAVIGATION ====================
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    function handleNavOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    // Heading slide-in animation (KEEP THIS)
    function createHeadingObserver() {
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                }
            });
        }, observerOptions);
        
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.classList.add('slide-ready');
            headingObserver.observe(heading);
        });
    }
    
    // ==================== HAMBURGER MENU ====================
    function initHamburgerMenu() {
        const navUl = nav.querySelector('ul');
        
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        nav.insertBefore(menuToggle, navUl);
        
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        const navLinks = navUl.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
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
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
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
    
    // ==================== ADD CSS FOR ANIMATIONS ====================
    const style = document.createElement('style');
    style.textContent = `
        nav {
            transition: all 0.3s ease;
        }
        
        nav.scrolled {
            background-color: rgba(52, 79, 31, 0.98);
            box-shadow: 0 2px 20px rgba(52, 79, 31, 0.4);
        }
        
        .slide-ready {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.8s ease;
        }
        
        .slide-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        h1.slide-ready { transition-delay: 0.1s; }
        h2.slide-ready { transition-delay: 0.2s; }
        h3.slide-ready { transition-delay: 0.3s; }
        
        article:hover {
            transform: translateY(-5px) scale(1.02);
        }
    `;
    document.head.appendChild(style);
    
    // ==================== INITIALIZE ALL FEATURES ====================
    handleNavOnScroll();
    window.addEventListener('scroll', handleNavOnScroll);
    
    createHeadingObserver();
    initSmoothScrolling();
    createScrollProgress();
    initHamburgerMenu();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

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

window.addEventListener('resize', debounce(() => {
    console.log('Window resized - animations adjusted');
}, 250));