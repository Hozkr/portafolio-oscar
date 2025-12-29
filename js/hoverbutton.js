document.querySelectorAll('.hover-move').forEach(btn => {
    // Selecciona SVG o span dentro del botón
    const icon = btn.querySelector('i, svg, span');
    if (!icon) return;

    // Función que mueve el icono
    const moveIcon = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = Math.max(Math.min(x / 10, 4), -4);
        const moveY = Math.max(Math.min(y / 10, 4), -4);

        icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    btn.addEventListener('mousemove', moveIcon);

    btn.addEventListener('mouseleave', () => {
        icon.style.transform = 'translate(0,0)';
    });

    // Mantener efecto incluso si se hace click
    btn.addEventListener('mousedown', moveIcon);
    btn.addEventListener('mouseup', moveIcon);
});
