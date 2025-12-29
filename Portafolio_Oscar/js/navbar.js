const themeToggle = document.getElementById('themeToggle');
const gatoSVG = document.getElementById('gatoSVG');
const iconContainer = themeToggle.querySelector('.theme-icon');


const lightSVG = `<svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="27.0236" cy="25.6721" r="12.8361" fill="#FF8206"/>
<path d="M25.2917 3C26.0615 1.66667 27.986 1.66667 28.7558 3L31.7275 8.14718C32.4973 9.48051 31.5351 11.1472 29.9955 11.1472H24.052C22.5124 11.1472 21.5502 9.48052 22.32 8.14718L25.2917 3Z" fill="#FF8206"/>
<path d="M25.2917 49.6953C26.0615 51.0286 27.986 51.0286 28.7558 49.6953L31.7275 44.5481C32.4973 43.2148 31.5351 41.5481 29.9955 41.5481H24.052C22.5124 41.5481 21.5502 43.2148 22.32 44.5481L25.2917 49.6953Z" fill="#FF8206"/>
<path d="M44.3108 45.196C45.8105 45.5441 47.1248 44.1383 46.6764 42.6654L44.9456 36.9795C44.4973 35.5066 42.6226 35.0714 41.5713 36.1962L37.5126 40.538C36.4612 41.6627 37.0216 43.5038 38.5213 43.852L44.3108 45.196Z" fill="#FF8206"/>
<path d="M10.4763 6.88799C8.97657 6.53984 7.66235 7.94573 8.11069 9.4186L9.84148 15.1045C10.2898 16.5773 12.1645 17.0125 13.2158 15.8878L17.2745 11.546C18.3259 10.4213 17.7655 8.58018 16.2658 8.23202L10.4763 6.88799Z" fill="#FF8206"/>
<path d="M46.0406 9.55403C46.5403 8.09777 45.2762 6.64667 43.7652 6.94205L37.9322 8.08232C36.4212 8.37769 35.7965 10.198 36.8078 11.3589L40.7119 15.8403C41.7232 17.0012 43.6119 16.632 44.1116 15.1757L46.0406 9.55403Z" fill="#FF8206"/>
<path d="M6.75899 41.9901C6.31035 43.4629 7.62429 44.8691 9.12407 44.5212L14.9138 43.1783C16.4136 42.8304 16.9744 40.9895 15.9233 39.8645L11.8654 35.5219C10.8143 34.397 8.93953 34.8318 8.49089 36.3046L6.75899 41.9901Z" fill="#FF8206"/>
<path d="M50.3716 23.2639C51.7049 24.0337 51.7049 25.9582 50.3716 26.728L45.2244 29.6997C43.8911 30.4695 42.2244 29.5072 42.2244 27.9676L42.2244 22.0242C42.2244 20.4846 43.8911 19.5223 45.2244 20.2921L50.3716 23.2639Z" fill="#FF8206"/>
<path d="M3 23.2639C1.66667 24.0337 1.66667 25.9582 3 26.728L8.14718 29.6997C9.48051 30.4695 11.1472 29.5072 11.1472 27.9676L11.1472 22.0242C11.1472 20.4846 9.48052 19.5223 8.14718 20.2921L3 23.2639Z" fill="#FF8206"/>
</svg>`;
const darkSVG = `<svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.8685 7.2087C22.0066 8.46878 16 15.2829 16 23.5C16 32.6127 23.3873 40 32.5 40C36.9799 40 41.0427 38.2147 44.0159 35.3167C40.7745 41.3816 34.381 45.5082 27.0236 45.5082C16.3899 45.5082 7.76953 36.8879 7.76953 26.2541C7.76953 15.6204 16.3899 7 27.0236 7C27.9902 7 28.9401 7.07122 29.8685 7.2087Z" fill="#F7F7F7"/>
<path d="M35.5 31L35.9761 31.8447L36.9266 32.0365L36.2704 32.7503L36.3817 33.7135L35.5 33.31L34.6183 33.7135L34.7296 32.7503L34.0734 32.0365L35.0239 31.8447L35.5 31Z" fill="#F7F7F7"/>
<path d="M39 12L39.6348 13.1263L40.9021 13.382L40.0271 14.3337L40.1756 15.618L39 15.08L37.8244 15.618L37.9729 14.3337L37.0979 13.382L38.3652 13.1263L39 12Z" fill="#F7F7F7"/>
<path d="M27 18L28.2696 20.2525L30.8042 20.7639L29.0543 22.6675L29.3511 25.2361L27 24.16L24.6489 25.2361L24.9457 22.6675L23.1958 20.7639L25.7304 20.2525L27 18Z" fill="#F7F7F7"/>
</svg>`;

// Colores
const lightColor = "#FF8206";
const darkColor = "#F7F7F7";

// =========================
// Función para actualizar hover-move en un botón
// =========================
function aplicarHoverMove(btn) {
    const icon = btn.querySelector('svg, i, span');
    if (!icon) return;

    const moverIcon = e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = Math.max(Math.min(x / 10, 4), -4);
        const moveY = Math.max(Math.min(y / 10, 4), -4);

        icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    btn.addEventListener('mousemove', moverIcon);
    btn.addEventListener('mouseleave', () => icon.style.transform = 'translate(0,0)');
    btn.addEventListener('mousedown', moverIcon);
    btn.addEventListener('mouseup', moverIcon);
}

// =========================
// Función para actualizar colores del gato
// =========================
function actualizarColoresGato(theme) {
    if (!gatoSVG) return;
    gatoSVG.querySelectorAll(".st1").forEach(el => {
        el.setAttribute("fill", theme === "dark" ? "#6D6D6D" : "#202026");
    });
}

// =========================
// Estado inicial
// =========================
document.documentElement.setAttribute('data-theme', 'light');
iconContainer.innerHTML = lightSVG;
aplicarHoverMove(themeToggle);
actualizarColoresGato('light');

// =========================
// Toggle de tema
// =========================
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'light');
        iconContainer.innerHTML = lightSVG;
        themeToggle.style.backgroundColor = '#F7F7F7';
        themeToggle.style.borderColor = '#171717';
        aplicarHoverMove(themeToggle); // Reactivar hover
        actualizarColoresGato('light');
    } else {
        html.setAttribute('data-theme', 'dark');
        iconContainer.innerHTML = darkSVG;
        themeToggle.style.backgroundColor = '#262626';
        themeToggle.style.borderColor = '#EFEFEF';
        aplicarHoverMove(themeToggle); // Reactivar hover
        actualizarColoresGato('dark');
    }
});