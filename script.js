// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Header background on scroll
// Remove header background on scroll logic

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe counter elements
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Awards Modal functionality
const modal = document.getElementById('awards-modal');
const viewMoreBtn = document.getElementById('view-more-awards');
const closeBtn = document.querySelector('.close');

if (viewMoreBtn && modal) {
    viewMoreBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-particles');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Award card hover effects
document.querySelectorAll('.award-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Button click effects with ripple
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

// Observe sections for reveal animation
document.querySelectorAll('section').forEach(section => {
    revealObserver.observe(section);
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(212, 175, 55, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border-top: 1px solid rgba(212, 175, 55, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card, .award-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hero-stats .stat-item {
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    .hero-stats .stat-item:nth-child(1) { animation-delay: 0.2s; }
    .hero-stats .stat-item:nth-child(2) { animation-delay: 0.4s; }
    .hero-stats .stat-item:nth-child(3) { animation-delay: 0.6s; }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal {
        animation: modalFadeIn 0.3s ease;
    }
    
    .modal-content {
        animation: modalSlideIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
        from { 
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
        }
        to { 
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-accent);
    color: var(--primary-color);
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: var(--shadow-heavy);
    transition: var(--transition);
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// Prevent About dropbtn from navigating or submitting

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropbtn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Toggle dropdown for mobile
            const parent = btn.parentElement;
            if (parent.classList.contains('dropdown')) {
                parent.classList.toggle('open');
            }
        });
    });

    // Close dropdown when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.dropdown.open').forEach(drop => {
            if (!drop.contains(e.target)) {
                drop.classList.remove('open');
            }
        });
    });
});

// Header transparency toggle for home page hero
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/bebl/') {
    document.body.classList.add('home');
    const header = document.querySelector('.header');
    function toggleHeaderTransparency() {
        if (window.scrollY < 40) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
        }
    }
    window.addEventListener('scroll', toggleHeaderTransparency);
    window.addEventListener('DOMContentLoaded', toggleHeaderTransparency);
} else {
    document.body.classList.remove('home');
}

// Remove window.scrollTo(0, 0) on DOMContentLoaded
// ... existing code ...

// Luxury Featured Projects Carousel Navigation
function setupFeaturedProjectsCarousel() {
    const carousel = document.querySelector('.featured-projects-carousel');
    const leftBtn = document.getElementById('carousel-left');
    const rightBtn = document.getElementById('carousel-right');
    if (!carousel || !leftBtn || !rightBtn) return;
    const scrollAmount = carousel.offsetWidth * 0.7;
    leftBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    // Keyboard accessibility
    leftBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') leftBtn.click(); });
    rightBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') rightBtn.click(); });
}
document.addEventListener('DOMContentLoaded', setupFeaturedProjectsCarousel);

// 3D Card Stack Carousel for Featured Projects
function setupFPCardStackCarousel() {
    const cards = Array.from(document.querySelectorAll('.fp-card'));
    const leftBtn = document.querySelector('.fp-carousel-left');
    const rightBtn = document.querySelector('.fp-carousel-right');
    const dots = Array.from(document.querySelectorAll('.fp-dot'));
    if (!cards.length) return;
    let current = 0;
    let autoRotate = null;
    function mod(n, m) { return ((n % m) + m) % m; }
    function updateCarousel() {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'left', 'right');
            card.style.display = 'none';
        });
        // Only show 3 cards: left, active, right
        const leftIdx = mod(current - 1, cards.length);
        const rightIdx = mod(current + 1, cards.length);
        cards[leftIdx].classList.add('left');
        cards[leftIdx].style.display = '';
        cards[current].classList.add('active');
        cards[current].style.display = '';
        cards[rightIdx].classList.add('right');
        cards[rightIdx].style.display = '';
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }
    function goLeft() {
        current = mod(current - 1, cards.length); updateCarousel();
    }
    function goRight() {
        current = mod(current + 1, cards.length); updateCarousel();
    }
    leftBtn && leftBtn.addEventListener('click', goLeft);
    rightBtn && rightBtn.addEventListener('click', goRight);
    leftBtn && leftBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') goLeft(); });
    rightBtn && rightBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') goRight(); });
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { current = i; updateCarousel(); });
    });
    // Swipe for mobile
    let startX = null;
    const carousel = document.querySelector('.fp-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
        carousel.addEventListener('touchend', e => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (dx > 40) goLeft();
            else if (dx < -40) goRight();
            startX = null;
        });
        // Pause auto-rotate on hover/focus
        carousel.addEventListener('mouseenter', pauseAutoRotate);
        carousel.addEventListener('mouseleave', startAutoRotate);
        carousel.addEventListener('focusin', pauseAutoRotate);
        carousel.addEventListener('focusout', startAutoRotate);
    }
    function startAutoRotate() {
        if (autoRotate) clearInterval(autoRotate);
        autoRotate = setInterval(goRight, 4000);
    }
    function pauseAutoRotate() {
        if (autoRotate) clearInterval(autoRotate);
    }
    updateCarousel();
    startAutoRotate();
}
document.addEventListener('DOMContentLoaded', setupFPCardStackCarousel); 