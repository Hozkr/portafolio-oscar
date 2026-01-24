// JS: traducciones
const translations = {
    esp: {
        "navbar-name": "Oscar López",
        "lang-toggle": "ESP",
        "hero-heading": "QA visual y funcional enfocado en UX y usabilidad real.",
        "hero-text": "Reviso interfaces web buscando errores visuales, fallos funcionales y fricción en la experiencia del usuario. Trabajo con pruebas manuales, análisis UX y validación en entornos reales.",
        "about-subtitle": "¿Quién soy?",
        "about-title": "¡Hola!",
        "about-text": "Soy Oscar, diseñador de interacción y animación con enfoque en Quality Assurance y UX/UI.",
        "about-text2": "Actualmente trabajo como Digital Web QA Specialist, evaluando interfaces, flujos y funcionamiento de productos digitales en entornos reales.",
        "about-text3": "Transformo ideas en experiencias funcionales, claras y centradas en el usuario, con decisiones que se prueban, se miden y se mejoran.",
        "about-text4": "He contribuido a mejoras medibles, como un incremento del 16.65 % en la percepción de velocidad de carga (NPS).",
        "btn-label": "Descarga mi CV",
        "projects-title": "Mis proyectos",
        "projects__grid": "UX de videojuego",
        "projects__grid2": "Diseño de experiencia, interacción y pruebas de usabilidad.",
        "procesoportafolio": "Creación de portafolio",
        "procesoportafolio2": "UX, UI y QA aplicados a un producto real.",
        "proyectoqa": "QA Visual & Usabilidad",
        "proyectoqa2": "Auditoría, documentación y validación de una interfaz real.",
        "collaboration-text": "¿Te interesa colaborar?",
        "collaboration-text2": "Cuéntamelo aquí",
        "credits": "Diseñado y desarrollado por: Oscar López",
    },


    eng: {
        "navbar-name": "Oscar López",
        "lang-toggle": "ENG",
        "hero-heading": "Visual and functional QA focused on real UX and usability.",
        "hero-text": "I review web interfaces to identify visual issues, functional bugs, and friction in the user experience. I work with manual testing, UX analysis, and validation in real environments.",
        "about-subtitle": "Who am I?",
        "about-title": "Hi!",
        "about-text": "I’m Oscar, an interaction and motion designer with a strong focus on Quality Assurance and UX/UI.",
        "about-text2": "I currently work as a Digital Web QA Specialist, evaluating interfaces, user flows, and product behavior in real-world environments.",
        "about-text3": "I turn ideas into clear, functional, user-centered experiences, where decisions are tested, measured, and refined.",
        "about-text4": "I’ve contributed to measurable improvements, such as a 16.65% increase in perceived loading speed (NPS).",
        "btn-label": "Download my CV",
        "projects-title": "My projects",
        "projects__grid": "Game UX",
        "projects__grid2": "Experience design, interaction, and usability testing.",
        "procesoportafolio": "Portfolio creation",
        "procesoportafolio2": "UX, UI, and QA applied to a real product.",
        "proyectoqa": "Visual QA & Usability",
        "proyectoqa2": "Audit, documentation, and validation of a real interface.",
        "collaboration-text": "Interested in working together?",
        "collaboration-text2": "Tell me about it here",
        "credits": "Designed and developed by: Oscar López"
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
