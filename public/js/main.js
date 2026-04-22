// ============================================
// MAIN JAVASCRIPT - Portfolio Functionality
// ============================================

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 100);
    }
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    htmlElement.style.colorScheme = 'light';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        localStorage.setItem('theme', newTheme);
        htmlElement.style.colorScheme = newTheme;

        // Update icon
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// ============================================
// PROJECTS DATA
// ============================================
const projectsData = [
    {
        id: 1,
        title: 'Portfolio',
        description: 'Personal portfolio website showcasing projects and skills.',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        category: 'frontend',
        github: 'https://github.com/mohityadavfsd',
        live: '#',
        icon: '🎯'
    },
    {
        id: 2,
        title: 'Jump Froggy Game',
        description: 'Fun and interactive froggy jumping game built with JavaScript.',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        category: 'frontend',
        github: 'https://github.com/mohityadavfsd',
        live: '#',
        icon: '🐸',
        status: 'upcoming'
    }
];

// ============================================
// RENDER PROJECTS
// ============================================
function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(project => project.category === filter);

    filteredProjects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        const techTags = project.tech
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        projectCard.innerHTML = `
            <div class="project-image">
                <span>${project.icon}</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                <div class="project-links">
                    ${project.status === 'upcoming' ? '<span class="upcoming-badge">🚀 Upcoming</span>' : `
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Live
                    </a>
                    `}
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

// ============================================
// FILTER PROJECTS
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Render filtered projects
        const filter = button.getAttribute('data-filter');
        renderProjects(filter);
    });
});

// Initial render
renderProjects();

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Clear previous errors
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';

        // Validation
        let isValid = true;

        if (!name) {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        }

        if (!email || !isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Valid email is required';
            isValid = false;
        }

        if (!message) {
            document.getElementById('messageError').textContent = 'Message is required';
            isValid = false;
        }

        if (!isValid) return;

        // Submit form
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
            } else {
                alert('Error sending message: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again later.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// EMAIL VALIDATION
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
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

// Observe all scrollable elements
document.querySelectorAll('.skill-item, .project-card, .timeline-item, .info-item').forEach(el => {
    el.classList.add('scroll-animated');
    observer.observe(el);
});

// ============================================
// INITIALIZE PAGE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    console.log('Welcome to Mohit Yadav\'s Portfolio');
});
