// ==========================================
// SISTEMA DE AUDIO DE MEXIAVENTURA
// ==========================================

// Archivos de audio
const audioInicio = new Audio("audio/fondo.mp3");
audioInicio.loop = true;
audioInicio.volume = 0.35;

const audioMapa = new Audio("audio/fondomapa.mp3");
audioMapa.loop = true;
audioMapa.volume = 0.35;

const audioClic = new Audio("audio/clic.mp3");
audioClic.volume = 0.5;

const audioDestellos = new Audio("audio/brillos.mp3");
audioDestellos.volume = 0.6;

// Variables de estado
let musicaEncendida = false;
let enPantallaInicio = true;

// 1. REPRODUCIR EFECTO DE CLIC
function reproducirEfecto() {
    audioClic.currentTime = 0;
    audioClic.play().catch(e => console.log("Clic esperando interacción"));
}

// 2. REPRODUCIR DESTELLOS
function reproducirDestellos() {
    audioDestellos.currentTime = 0;
    audioDestellos.play().catch(e => console.log("Destello esperando interacción"));
}

// 3. CAMBIO DE MÚSICA DE FONDO (Inicio <-> Mapa)
function reproducirMusicaActual() {
    if (!musicaEncendida) return;

    if (enPantallaInicio) {
        // Pausamos y reseteamos el del mapa
        audioMapa.pause();
        audioMapa.currentTime = 0;

        // Reproducimos inicio
        audioInicio.play().catch(e => console.log("Audio inicio bloqueado:", e));
    } else {
        // Pausamos y reseteamos el de inicio
        audioInicio.pause();
        audioInicio.currentTime = 0;

        // Reproducimos mapa
        audioMapa.play().catch(e => console.log("Audio mapa bloqueado:", e));
    }
}

// 4. FUNCIÓN GLOBAL PARA PASAR AL MAPA (Se activa con el botón "COMENZAR A EXPLORAR")
function cambiarAMusicaMapa() {
    enPantallaInicio = false;
    musicaEncendida = true; // Activa la música automáticamente al empezar
    
    const botonAudio = document.getElementById("botonAudio");
    if (botonAudio) {
        botonAudio.style.borderColor = "#00ffaa"; // Indicador verde neón
    }

    reproducirMusicaActual();
}

// ==========================================
// EVENTOS Y CONEXIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const botonAudio = document.getElementById("botonAudio");
    const pantallaInicio = document.getElementById("pantallaInicio");

    // A) BOTÓN DE PRENDER / APAGAR AUDIO EN EL MENÚ
    if (botonAudio) {
        botonAudio.addEventListener("click", () => {
            reproducirEfecto();
            musicaEncendida = !musicaEncendida;

            if (musicaEncendida) {
                reproducirMusicaActual();
                botonAudio.style.borderColor = "#00ffaa";
            } else {
                audioInicio.pause();
                audioMapa.pause();
                botonAudio.style.borderColor = "rgba(212, 175, 55, 0.6)";
            }
        });
    }

    // B) DETECTAR EL BOTÓN "COMENZAR A EXPLORAR"
    const todosLosBotones = document.querySelectorAll("button");
    todosLosBotones.forEach(btn => {
        // Busca el botón que diga "COMENZAR A EXPLORAR" (sin importar mayúsculas/minúsculas)
        if (btn.textContent.trim().toUpperCase().includes("COMENZAR A EXPLORAR")) {
            btn.addEventListener("click", () => {
                cambiarAMusicaMapa();
            });
        }
    });

    // C) CLIC EN PANTALLA DE INICIO PARA LOS DESTELLOS
    if (pantallaInicio) {
        pantallaInicio.addEventListener("click", (event) => {
            if (event.target.closest("button")) return;
            reproducirDestellos();
        });
    }

    // D) EFECTO DE CLIC EN TODOS LOS BOTONES Y NIVELES
    const elementosInteractivos = document.querySelectorAll("button, .nivel");
    elementosInteractivos.forEach(item => {
        item.addEventListener("click", () => {
            reproducirEfecto();
        });
    });
});