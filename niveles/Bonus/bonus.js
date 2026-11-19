
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
// OBJETOS QUE CAEN
// ======================================

let estrellasCaida = [];
let lanzasCaida = [];

let tiempoPartida = 0;

// ======================================
// PUNTUACIÓN Y ESTADO DEL JUEGO
// ======================================

let puntuacion = 0;
let juegoTerminado = false;

const elementoPuntuacion =
    document.getElementById("puntuacion");

const pantallaFinal =
    document.getElementById("pantallaFinal");

const resultadoFinal =
    document.getElementById("resultadoFinal");

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

       // Iniciar objetos que caerán
        iniciarObjetos(estrella, lanza);

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
// CREAR OBJETOS QUE CAEN
// ======================================

function crearObjetoCaida(textura, altura, tipo, velocidad, indice) {

    const x = THREE.MathUtils.randFloat(-6.5, 6.5);
    const y = 5.5 + indice * 3;

    const sprite = crearSprite(
        textura,
        altura,
        x,
        y
    );

    return {
        sprite: sprite,
        velocidad: velocidad,
        tipo: tipo
    };
}

// ======================================
// INICIAR ESTRELLAS Y LANZAS
// ======================================

function iniciarObjetos(estrella, lanza) {
    estrellasCaida = [];
    lanzasCaida = [];

    for (let i = 0; i < 4; i++) {

        estrellasCaida.push(
            crearObjetoCaida(
                estrella,
                0.8,
                "estrella",
                2.5,
                i
            )
        );

    }

    for (let i = 0; i < 2; i++) {

        lanzasCaida.push(
            crearObjetoCaida(
                lanza,
                1.8,
                "lanza",
                3.2,
                i + 1
            )
        );

    }

}
// ======================================
// DETECTAR COLISIONES
// ======================================

function hayColision(objeto, personaje, zona) {

    const anchoPersonaje = Math.min(
        personaje.scale.x * 0.22,
        0.85
    );

    const centroY = zona === "canasta"
        ? personaje.position.y - personaje.scale.y * 0.20
        : personaje.position.y;

    const altoPersonaje = zona === "canasta"
        ? 0.45
        : personaje.scale.y * 0.42;

    const anchoObjeto = objeto.scale.x * 0.4;
    const altoObjeto = objeto.scale.y * 0.4;

    return (
        Math.abs(objeto.position.x - personaje.position.x)
            < anchoPersonaje + anchoObjeto &&

        Math.abs(objeto.position.y - centroY)
            < altoPersonaje + altoObjeto
    );

}
// ======================================
// ACTUALIZAR OBJETOS Y COLISIONES
// ======================================

function actualizarObjetos(delta) {

    const dificultad = Math.min(
        1 + tiempoPartida / 60 * 0.3,
        2.5
    );

    // ESTRELLAS
    estrellasCaida.forEach(estrella => {

        estrella.sprite.position.y -=
            estrella.velocidad * dificultad * delta;

        // Colisión con la canasta
        if (
            personaje &&
            hayColision(
                estrella.sprite,
                personaje,
                "canasta"
            )
        ) {

            puntuacion += 10;

            elementoPuntuacion.textContent = puntuacion;

            estrella.sprite.position.y =
                THREE.MathUtils.randFloat(7, 11);

            estrella.sprite.position.x =
                THREE.MathUtils.randFloat(-6.5, 6.5);

        }

        // Reaparecer si sale de la pantalla
        else if (estrella.sprite.position.y < -6) {

            estrella.sprite.position.y =
                THREE.MathUtils.randFloat(7, 11);

            estrella.sprite.position.x =
                THREE.MathUtils.randFloat(-6.5, 6.5);

        }

    });

    // LANZAS
    lanzasCaida.forEach(lanza => {

        lanza.sprite.position.y -=
            lanza.velocidad * dificultad * delta;

        // Colisión con Pablito
        if (
            personaje &&
            hayColision(
                lanza.sprite,
                personaje,
                "cuerpo"
            )
        ) {

            terminarBonus();

        }

        // Reaparecer si sale de la pantalla
        else if (lanza.sprite.position.y < -6) {

            lanza.sprite.position.y =
                THREE.MathUtils.randFloat(7, 11);

            lanza.sprite.position.x =
                THREE.MathUtils.randFloat(-6.5, 6.5);

        }

    });

}
// ======================================
// 5. ANIMACIÓN PRINCIPAL
// ======================================

const reloj = new THREE.Clock();

function animar() {

    requestAnimationFrame(animar);

    const delta = Math.min(reloj.getDelta(), 0.05);

    if (!juegoTerminado) {

        tiempoPartida += delta;

        if (personaje) {
            moverPablo(personaje, delta);
        }

        actualizarObjetos(delta);

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
// ======================================
// TERMINAR BONUS
// ======================================

function terminarBonus() {

    if (juegoTerminado) return;

    juegoTerminado = true;

    resultadoFinal.textContent = puntuacion;

    pantallaFinal.classList.remove("oculto");

    console.log(
        "Bonus terminado. Puntuación:",
        puntuacion
    );

}