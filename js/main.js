/**
 * MUNDACA ECO-TOUR - Lógica Principal
 */

document.addEventListener('componentsLoaded', () => {
    initTheme();
    initNavigation(); // Maneja Scroll + Resaltado de página actual
    initMobileMenu();
    initContactForm();
    initImageModal();
});

// 1. GESTIÓN DE TEMA
function initTheme() {
    const savedTheme = localStorage.getItem('mundaca-theme') || 'light';
    document.body.classList.add(`theme-${savedTheme}`);
    updateThemeIcons(savedTheme === 'dark');
}

window.toggleTheme = () => {
    const isDark = document.body.classList.toggle('theme-dark');
    const theme = isDark ? 'dark' : 'light';
    document.body.classList.toggle('theme-light', !isDark);
    localStorage.setItem('mundaca-theme', theme);
    updateThemeIcons(isDark);
};

function updateThemeIcons(isDark) {
    const sun = document.getElementById('sun-icon');
    const moon = document.getElementById('moon-icon');
    if (sun && moon) {
        sun.classList.toggle('hidden', isDark);
        moon.classList.toggle('hidden', !isDark);
    }
}

// 2. NAVEGACIÓN INTELIGENTE (Highlight & Scroll)
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;

    // A. Resaltar página actual por URL
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Si la URL coincide con el href, marcamos como activo
        if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (linkPath === 'index.html') link.classList.add('active');
        }
    });

    // B. Efecto Scroll Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('header-scrolled');
        } else {
            header?.classList.remove('header-scrolled');
        }
    });
}

// 3. MENÚ MÓVIL (Con Accesibilidad ARIA)
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isOpened = nav.classList.toggle('mobile-active');
            menuBtn.setAttribute('aria-expanded', isOpened);
            // Bloquear scroll del body al abrir menú
            document.body.style.overflow = isOpened ? 'hidden' : '';
        });
    }
}

// 4. FORMULARIO CON FEEDBACK REAL
function initContactForm() {
    const form = document.getElementById('quick-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = 'ENVIANDO...';

        // Simulamos éxito (el mailto se abrirá después)
        setTimeout(() => {
            btn.innerHTML = '¡MENSAJE LISTO!';
            btn.style.backgroundColor = '#4A8C4A'; // Verde eco
            
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        }, 800);
    });
}

// 5. IMAGE MODAL
function initImageModal() {
    const modal = document.getElementById('imgModal');
    if (!modal) return;
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close-btn');

    document.querySelectorAll('.team-card img, .previewable').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}