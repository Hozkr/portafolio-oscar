// JS: traducciones
const translations = {
    esp: {
        "navbar-name": "Oscar López",
        "lang-toggle": "ESP",
        "hero-heading": "Diseño, interacción, movimiento y claridad.",
        "hero-paragraph": "Cada decisión se prueba, se mide y se mejora. UX/UI, animación: una misma visión, múltiples lenguajes. Porque el diseño sin propósito es decoración.",
        "about-subtitle": "¿Quién soy?",
        "about-title": "¡Hola!",
        "about-text": "Soy Oscar, diseñador de interacción y animación con enfoque en Quality Assurance y UX/UI."
    },
    eng: {
        "navbar-name": "Oscar López",
        "lang-toggle": "ENG",
        "hero-heading": "Design, interaction, movement, and clarity.",
        "hero-paragraph": "Every decision is tested, measured, and improved. UX/UI, animation: one vision, multiple languages. Because design without purpose is decoration.",
        "about-subtitle": "Who am I?",
        "about-title": "Hello!",
        "about-text": "I am an interaction and animation designer with a focus on Quality Assurance and UX/UI."
    }
};

// Idioma inicial
let currentLang = "esp";
document.documentElement.lang = "es";

// Referencia al botón
const langToggle = document.getElementById('langToggle');

function changeLanguage(lang) {
    currentLang = lang;

    document.documentElement.lang = lang === 'esp' ? 'es' : 'en';

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key] || el.textContent;
    });

    langToggle.querySelector(".lang-label").textContent =
        translations[lang]["lang-toggle"];

    langToggle.setAttribute("data-lang", translations[lang]["lang-toggle"]);
}
// Listener único para alternar idioma
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'eng' ? 'esp' : 'eng';
    changeLanguage(newLang);
});
