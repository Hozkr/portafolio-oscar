// Seleccionamos las pupilas (ojos)
const ojoIzq = document.querySelector("#Ojo_izq ellipse");
const ojoDer = document.querySelector("#Ojo_der ellipse");

// Guardamos posición original de los ojos
const ojoIzqOriginal = { x: parseFloat(ojoIzq.getAttribute("cx")), y: parseFloat(ojoIzq.getAttribute("cy")) };
const ojoDerOriginal = { x: parseFloat(ojoDer.getAttribute("cx")), y: parseFloat(ojoDer.getAttribute("cy")) };

// Rango máximo de movimiento de cada ojo (más cercano para efecto visco)
const rangoOjoIzq = { x: 10, y: 10 };
const rangoOjoDer = { x: 10, y: 10 };

// Suavizado del movimiento
const suavizado = 0.15;

let posOjoIzq = { ...ojoIzqOriginal };
let posOjoDer = { ...ojoDerOriginal };

document.addEventListener("mousemove", (e) => {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    // porcentaje de cursor de -1 a 1
    const px = (e.clientX / ancho - 0.5) * 2;
    const py = (e.clientY / alto - 0.5) * 2;

    // cálculo del objetivo para cada ojo
    const objetivoIzq = {
        x: ojoIzqOriginal.x + px * rangoOjoIzq.x,
        y: ojoIzqOriginal.y + py * rangoOjoIzq.y
    };

    const objetivoDer = {
        x: ojoDerOriginal.x + px * rangoOjoDer.x,
        y: ojoDerOriginal.y + py * rangoOjoDer.y
    };

    // suavizado (lerp)
    posOjoIzq.x += (objetivoIzq.x - posOjoIzq.x) * suavizado;
    posOjoIzq.y += (objetivoIzq.y - posOjoIzq.y) * suavizado;

    posOjoDer.x += (objetivoDer.x - posOjoDer.x) * suavizado;
    posOjoDer.y += (objetivoDer.y - posOjoDer.y) * suavizado;

    // aplicar a los ojos
    ojoIzq.setAttribute("cx", posOjoIzq.x);
    ojoIzq.setAttribute("cy", posOjoIzq.y);

    ojoDer.setAttribute("cx", posOjoDer.x);
    ojoDer.setAttribute("cy", posOjoDer.y);
});
