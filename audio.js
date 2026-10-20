// ==========================================
// SISTEMA DE AUDIO DE MEXIAVENTURA
// ==========================================

// 1. Cargamos las dos pistas de fondo y los efectos
const audioInicio = new Audio("audio/fondo.mp3"); // Música de la pantalla de inicio
audioInicio.loop = true;
audioInicio.volume = 0.35;

const audioMapa = new Audio("audio/fondomapa.mp3");     // Música del mapa de niveles
audioMapa.loop = true;
audioMapa.volume = 0.35;

const audioClic = new Audio("audio/clic.mp3");     // Clic para botones
audioClic.volume = 0.5;

const audioDestellos = new Audio("audio/brillitos.mp3"); // Efecto de inicio
audioDestellos.volume = 0.6;

// Variables de estado
let musicaEncendida = false;
let enPantallaInicio = true; // Empieza en la pantalla de inicio

// Función para el clic general
function reproducirEfecto() {
    audioClic.currentTime = 0;
    audioClic.play().catch(e => console.log("Clic esperando interacción"));
}

// Función para los destellos del inicio
function reproducirDestellos() {
    audioDestellos.currentTime = 0;
    audioDestellos.play().catch(e => console.log("Destellos esperando interacción"));
}

// Función que reproduce la música correcta según la pantalla activa
function reproducirMusicaActual() {
    if (!musicaEncendida) return;

    if (enPantallaInicio) {
        audioMapa.pause();
        audioInicio.play().catch(e => console.log("Audio inicio bloqueado"));
    } else {
        audioInicio.pause();
        audioMapa.play().catch(e => console.log("Audio mapa bloqueado"));
    }
}

// ==========================================
// EVENTOS Y CONEXIÓN DE BOTONES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const botonAudio = document.getElementById("botonAudio");
    const botonIniciar = document.getElementById("btnIniciar"); // Ajusta el ID de tu botón de iniciar
    const pantallaInicio = document.getElementById("pantallaInicio");

    // A) BOTÓN DE AUDIO (Prende / Apaga la música)
    if (botonAudio) {
        botonAudio.addEventListener("click", () => {
            reproducirEfecto();
            musicaEncendida = !musicaEncendida;

            if (musicaEncendida) {
                reproducirMusicaActual();
                botonAudio.style.borderColor = "#00ffaa"; // Indicador activo verde neón
            } else {
                audioInicio.pause();
                audioMapa.pause();
                botonAudio.style.borderColor = "rgba(212, 175, 55, 0.6)"; // Regresa a dorado
            }
        });
    }

    // B) AL DAR CLIC EN "INICIAR JUEGO" (Cambia de inicio.mp3 a mapa.mp3)
    if (botonIniciar) {
        botonIniciar.addEventListener("click", () => {
            enPantallaInicio = false; // Pasamos al mapa
            reproducirMusicaActual();
        });
    }

    // C) DESTELLOS EN PANTALLA DE INICIO
    if (pantallaInicio) {
        pantallaInicio.addEventListener("click", (event) => {
            // Si le dan clic a un botón, no suena el destello
            if (event.target.tagName === "BUTTON" || event.target.closest("button")) return;
            reproducirDestellos();
        });
    }

    // D) EFECTO DE CLIC A TODOS LOS BOTONES Y NIVELES
    const elementosInteractivos = document.querySelectorAll("button, .nivel");
    elementosInteractivos.forEach(item => {
        item.addEventListener("click", () => {
            reproducirEfecto();
        });
    });
});