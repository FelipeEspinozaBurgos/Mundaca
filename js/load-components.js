/**
 * Hacienda Mundaca Eco-Tour - Fragment Loader
 * Ensures consistent Header and Footer across the multi-page static site.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Paths are relative to the root for Netlify deployment
    const headerPath = '/components/header.html';
    const footerPath = '/componen';

    // Load Header
    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('header-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
                
                // Once header is loaded, initialize theme icons from main.js state
                if (typeof updateToggleIcons === 'function') {
                    const isDark = document.body.classList.contains('dark');
                    updateToggleIcons(isDark);
                }

                // Re-run mobile menu listeners if defined in main.js
                if (typeof initHeaderScroll === 'function') {
                    initHeaderScroll();
                }
            }
        })
        .catch(err => console.error('Mundaca Error (Header):', err));

    // Load Footer
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        })
        .catch(err => console.error('Mundaca Error (Footer):', err));
});