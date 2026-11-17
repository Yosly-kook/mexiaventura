
const pablito = document.getElementById("pablito");
const mundo = document.getElementById("mundo");
const ventanaJuego = document.getElementById("ventanaJuego");
const contadorPiedras = document.getElementById("contadorPiedras");
const mensajeVictoria = document.getElementById("mensajeVictoria");

let posicionX = 100;
let posicionY = 200;

let piedrasRecolectadas = 0;

const velocidad = 4;
const teclas = {};

const fragmentos = [
    document.getElementById("piedra1"),
    document.getElementById("piedra2"),
    document.getElementById("piedra3"),
    document.getElementById("piedra4"),
    document.getElementById("piedra5")
];

const anchoMundo = 2400;

const anchoPersonaje = 75;
const altoPersonaje = 100;

const margen = 10;

// Detectar las teclas presionadas
document.addEventListener("keydown", (evento) => {
    if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(evento.key)
    ) {
        evento.preventDefault();
        teclas[evento.key] = true;
    }
});

// Detectar cuando se sueltan las teclas
document.addEventListener("keyup", (evento) => {
    teclas[evento.key] = false;
});

// Evitar que las teclas sigan activas al cambiar de ventana
window.addEventListener("blur", () => {
    for (const tecla in teclas) {
        teclas[tecla] = false;
    }
});

// Movimiento del personaje
function moverPablito() {

    if (mensajeVictoria.hidden === false) {
        return;
    }

    if (teclas["ArrowRight"]) {
        posicionX += velocidad;
    }

    if (teclas["ArrowLeft"]) {
        posicionX -= velocidad;
    }

    if (teclas["ArrowUp"]) {
        posicionY -= velocidad;
    }

    if (teclas["ArrowDown"]) {
        posicionY += velocidad;
    }

    // Limitar movimiento dentro del escenario
    const altoMundo = ventanaJuego.clientHeight;

    posicionX = Math.max(
        0,
        Math.min(posicionX, anchoMundo - anchoPersonaje)
    );

    posicionY = Math.max(
        0,
        Math.min(posicionY, altoMundo - altoPersonaje)
    );

    pablito.style.left = posicionX + "px";
    pablito.style.top = posicionY + "px";

    moverCamara();
    revisarColisiones();

    requestAnimationFrame(moverPablito);
}

// Cámara que sigue a Pablito
function moverCamara() {

    const anchoVentana = ventanaJuego.clientWidth;

    let desplazamiento = anchoVentana / 2 -
        (posicionX + anchoPersonaje / 2);

    const desplazamientoMaximo = anchoVentana - anchoMundo;

    desplazamiento = Math.max(
        desplazamientoMaximo,
        Math.min(0, desplazamiento)
    );

    mundo.style.transform = `translateX(${desplazamiento}px)`;
}

// Detectar recolección de fragmentos
function revisarColisiones() {

    fragmentos.forEach((fragmento) => {

        if (!fragmento || fragmento.dataset.recolectado === "true") {
            return;
        }

        const piedraX = fragmento.offsetLeft;
        const piedraY = fragmento.offsetTop;

        const piedraAncho = fragmento.offsetWidth;
        const piedraAlto = fragmento.offsetHeight;

        const hayColision =
            posicionX + anchoPersonaje > piedraX + margen &&
            posicionX < piedraX + piedraAncho - margen &&
            posicionY + altoPersonaje > piedraY + margen &&
            posicionY < piedraY + piedraAlto - margen;

        if (hayColision) {
            recogerFragmento(fragmento);
        }
    });
}

// Recoger un fragmento
function recogerFragmento(fragmento) {

    fragmento.dataset.recolectado = "true";
    fragmento.style.display = "none";

    piedrasRecolectadas++;

    contadorPiedras.textContent =
        `Fragmentos: ${piedrasRecolectadas}/5`;

    // Cuando se reúnen los cinco fragmentos
    if (piedrasRecolectadas === 5) {
        mensajeVictoria.hidden = false;
    }
}

// Iniciar el juego
moverPablito();
