/**
 * Hacienda Mundaca Eco-Tour - Core Interactivity
 * Focus: Modern 2026 Aesthetic, Brand Consistency & UX
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initHeaderScroll();
    initFormHandling();
    initNavigationHighlighter();
});

/**
 * --- Dark / Light Mode Toggle ---
 * Manages the visual state and persists user preference.
 */
function initThemeToggle() {
    const body = document.body;
    // Note: The toggle button is part of the header fragment. 
    // We use event delegation or wait for the fragment to load in load-components.js
    // For main.js, we define the logic.
    
    window.toggleTheme = () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('mundaca-theme', isDark ? 'dark' : 'light');
        updateToggleIcons(isDark);
    };

    // Apply saved theme
    if (localStorage.getItem('mundaca-theme') === 'dark') {
        body.classList.add('dark');
    }
}

function updateToggleIcons(isDark) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }
}

/**
 * --- Header Scroll Logic ---
 * Implements the "hidden scrolling" and glassmorphism effect.
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        if (!header) return;
        
        const currentScroll = window.pageYOffset;

        // Add glassmorphism background when scrolled
        if (currentScroll > 50) {
            header.classList.add('bg-foam/80', 'backdrop-blur-md', 'shadow-sm');
        } else {
            header.classList.remove('bg-foam/80', 'backdrop-blur-md', 'shadow-sm');
        }

        // Hide/Show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
}

/**
 * --- Form Handling ---
 * Replicates the elegant feedback from saved.html
 */
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Visual Feedback
        submitBtn.innerHTML = 'MESSAGE SENT!';
        submitBtn.style.backgroundColor = '#4A8C4A'; // eco green
        
        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = ''; // revert to scss primary
        }, 4000);
    });
}

/**
 * --- Navigation Highlighter ---
 * Subtle underline/color transition for the active section.
 */
function initNavigationHighlighter() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('text-primary');
            }
        });
    });
}