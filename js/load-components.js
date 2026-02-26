/**
 * Carga de componentes asíncrona.
 * Ajustado para funcionar desde cualquier nivel de directorio.
 */
async function loadComponent(id, path) {
    try {
        // Usamos la ruta absoluta desde la raíz para evitar errores en subpáginas
        const response = await fetch(path);
        if (!response.ok) throw new Error(`No se pudo cargar: ${path}`);
        const html = await response.text();
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = html;
        }
    } catch (err) {
        console.warn("Error cargando componente:", err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Definimos las rutas exactas de tus componentes
    await Promise.all([
        loadComponent('header-placeholder', '/components/header.html'),
        loadComponent('footer-placeholder', '/components/footer.html')
    ]);

    // Avisamos a main.js que ya puede actuar sobre el Header/Footer
    document.dispatchEvent(new Event('componentsLoaded'));
});