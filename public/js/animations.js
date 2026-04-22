// ============================================
// ANIMATIONS AND EFFECTS
// ============================================

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    const words = text.split(' | ');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (!isDeleting && charIndex <= currentWord.length) {
            typewriterElement.textContent = currentWord.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex >= 0) {
            typewriterElement.textContent = currentWord.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            charIndex = 0;
            setTimeout(type, 500);
        }
    }

    type();
}

// ============================================
// GSAP-LIKE ANIMATIONS (Using CSS and JS)
// ============================================
function animateElementsOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animate');
                entry.target.style.animation = animation;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax');
            const yPos = window.scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.parentElement.querySelector('.skill-info span:last-child').textContent;
                entry.target.style.width = width;
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const text = target.textContent;
                
                if (text.includes('+')) {
                    animateNumber(target, 0, 50, 1500);
                }
                
                target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = end / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ============================================
// REVEAL TEXT ON SCROLL
// ============================================
function revealTextOnScroll() {
    const textElements = document.querySelectorAll('p, h2, h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// ============================================
// FLOATING ELEMENTS
// ============================================
function createFloatingParticles() {
    const container = document.querySelector('.hero-visual') || document.querySelector('.hero');
    if (!container) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: radial-gradient(circle, rgba(0, 217, 255, ${Math.random() * 0.3}), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: floatParticle ${Math.random() * 10 + 5}s ease-in-out infinite;
        `;
        
        container.appendChild(particle);
    }
}

// Add floating particle animation to style
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// GLOW EFFECT ON HOVER
// ============================================
function initGlowEffect() {
    const buttons = document.querySelectorAll('.btn, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.3)';
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.borderBottomColor = 'rgba(0, 217, 255, 0.1)';
            navbar.style.background = 'rgba(10, 14, 39, 0.9)';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// BLUR BACKGROUND ON MODAL
// ============================================
function handleBackgroundBlur() {
    const mainContent = document.querySelector('body');
    
    // Reduce blur on mobile devices
    if (window.innerWidth < 768) {
        mainContent.style.backdropFilter = 'none';
    }
}

// ============================================
// STAR FIELD BACKGROUND (Optional)
// ============================================
function createStarField() {
    const bg = document.querySelector('.animated-bg');
    if (!bg) return;

    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7};
            pointer-events: none;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        bg.appendChild(star);
    }

    // Add twinkle animation
    const twinkleStyle = document.createElement('style');
    twinkleStyle.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(twinkleStyle);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-text')) {
                    entry.target.style.animation = 'slideInLeft 0.8s ease-out';
                }
                if (entry.target.classList.contains('image-wrapper')) {
                    entry.target.style.animation = 'slideInRight 0.8s ease-out';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-text, .image-wrapper').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// INIT ALL ANIMATIONS
// ============================================
function initAllAnimations() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTypewriter();
            animateSkillBars();
            animateCounters();
            revealTextOnScroll();
            initGlowEffect();
            handleNavbarScroll();
            handleBackgroundBlur();
            setupIntersectionObserver();
            createStarField();
        });
    } else {
        initTypewriter();
        animateSkillBars();
        animateCounters();
        revealTextOnScroll();
        initGlowEffect();
        handleNavbarScroll();
        handleBackgroundBlur();
        setupIntersectionObserver();
        createStarField();
    }
}

// ============================================
// START ANIMATIONS
// ============================================
initAllAnimations();

// Handle window resize
window.addEventListener('resize', () => {
    handleBackgroundBlur();
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
