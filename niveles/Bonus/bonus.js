
import * as THREE from "three";

// ======================================
// 1. CONFIGURACIÓN DEL ESCENARIO
// ======================================

const contenedor = document.getElementById("escenario");
const mensajeCarga = document.getElementById("mensajeCarga");

const escena = new THREE.Scene();

const camara = new THREE.OrthographicCamera(
    -8, 8, 5, -5, 0.1, 100
);

camara.position.z = 20;

const renderizador = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderizador.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderizador.setSize(
    contenedor.clientWidth,
    contenedor.clientHeight
);

contenedor.appendChild(renderizador.domElement);
// ======================================
// CONTROL DE PABLITO
// ======================================

const teclas = {
    izquierda: false,
    derecha: false
};

const velocidadPablo = 7;
const limiteIzquierdo = -7;
const limiteDerecho = 7;

let gamepadConectado = false;
// ======================================
// CONTROLES DEL TECLADO
// ======================================

window.addEventListener("keydown", (evento) => {

    if (
        ["ArrowLeft", "ArrowRight", " "].includes(evento.key)
    ) {
        evento.preventDefault();
    }

    if (evento.key === "ArrowLeft" || evento.key.toLowerCase() === "a") {
        teclas.izquierda = true;
    }

    if (evento.key === "ArrowRight" || evento.key.toLowerCase() === "d") {
        teclas.derecha = true;
    }

});

window.addEventListener("keyup", (evento) => {

    if (evento.key === "ArrowLeft" || evento.key.toLowerCase() === "a") {
        teclas.izquierda = false;
    }

    if (evento.key === "ArrowRight" || evento.key.toLowerCase() === "d") {
        teclas.derecha = false;
    }

});
// ======================================
// DETECCIÓN DEL CONTROL DE VIDEOJUEGOS
// ======================================

window.addEventListener("gamepadconnected", (evento) => {

    gamepadConectado = true;

    console.log(
        "Control conectado:",
        evento.gamepad.id
    );

});

window.addEventListener("gamepaddisconnected", () => {

    gamepadConectado = false;

    console.log("Control desconectado.");

});
// ======================================
// 2. CARGADOR DE IMÁGENES
// ======================================

const cargador = new THREE.TextureLoader();

function cargarImagen(ruta) {
    return new Promise((resolve, reject) => {
        cargador.load(
            ruta,
            (textura) => {
                textura.colorSpace = THREE.SRGBColorSpace;
                resolve(textura);
            },
            undefined,
            reject
        );
    });
}

// ======================================
// 3. CREAR PERSONAJES Y OBJETOS
// ======================================

function crearSprite(textura, altura, x, y, profundidad = 1) {

    const material = new THREE.SpriteMaterial({
        map: textura,
        transparent: true,
        depthTest: false
    });

    const sprite = new THREE.Sprite(material);

    const proporcion =
        textura.image.width / textura.image.height;

    sprite.scale.set(
        altura * proporcion,
        altura,
        1
    );

    sprite.position.set(x, y, profundidad);

    escena.add(sprite);

    return sprite;
}
// ======================================
// MOVIMIENTO DE PABLITO
// ======================================

function moverPablo(personaje, delta) {

    let direccion = 0;

    // Teclado
    if (teclas.izquierda) direccion -= 1;
    if (teclas.derecha) direccion += 1;

    // Gamepad
    const gamepads = navigator.getGamepads
        ? navigator.getGamepads()
        : [];

    const gamepad = Array.from(gamepads).find(
        control => control !== null && control.connected
    );

    if (gamepad) {

        const ejeHorizontal = gamepad.axes[0] || 0;

        if (Math.abs(ejeHorizontal) > 0.2) {
            direccion = ejeHorizontal;
        }

        // Cruceta izquierda y derecha
        if (gamepad.buttons[14]?.pressed) direccion = -1;
        if (gamepad.buttons[15]?.pressed) direccion = 1;

    }

    // Actualizar posición
    personaje.position.x +=
        direccion * velocidadPablo * delta;

    // Limitar movimiento
    personaje.position.x = THREE.MathUtils.clamp(
        personaje.position.x,
        limiteIzquierdo,
        limiteDerecho
    );

}

// ======================================
// 4. CARGAR LOS RECURSOS
// ======================================
let personaje = null;
async function iniciarBonus() {

    try {

        const [pablo, estrella, lanza] = await Promise.all([
            cargarImagen("./Recursos/pablito_canasta.png"),
            cargarImagen("./Recursos/estrella.png"),
            cargarImagen("./Recursos/lanza.png")
        ]);

        // Pablito
        personaje = crearSprite(
            pablo,
            4.5,
            -3,
            -2.2
        );

        // Estrellas de muestra
        crearSprite(estrella, 0.8, 0, 1.5);
        crearSprite(estrella, 0.8, 2.5, 0.5);
        crearSprite(estrella, 0.8, 4, -1.5);

        // Lanza de muestra
        crearSprite(lanza, 1.8, 5, 2);

        mensajeCarga.classList.add("oculto");

        console.log("Bonus cargado correctamente.");

        animar();

    } catch (error) {

        console.error("Error al cargar los recursos:", error);

        mensajeCarga.textContent =
            "No se pudieron cargar los recursos. Revisa las rutas y los nombres de las imágenes.";

    }
}

// ======================================
// 5. ANIMACIÓN PRINCIPAL
// ======================================

const reloj = new THREE.Clock();

function animar() {

    requestAnimationFrame(animar);

    const delta = Math.min(reloj.getDelta(), 0.05);

    if (personaje) {
        moverPablo(personaje, delta);
    }

    renderizador.render(escena, camara);
}
// ======================================
// 6. ADAPTACIÓN A LA PANTALLA
// ======================================

function ajustarPantalla() {

    const ancho = contenedor.clientWidth;
    const alto = contenedor.clientHeight;

    const proporcion = ancho / alto;
    const alturaVista = 10;

    camara.left = -(alturaVista * proporcion) / 2;
    camara.right = (alturaVista * proporcion) / 2;
    camara.top = alturaVista / 2;
    camara.bottom = -alturaVista / 2;

    camara.updateProjectionMatrix();

    renderizador.setSize(ancho, alto);
}

window.addEventListener("resize", ajustarPantalla);

// ======================================
// 7. INICIAR
// ======================================

iniciarBonus();
