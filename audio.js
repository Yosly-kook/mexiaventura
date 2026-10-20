// ==========================================
// SISTEMA DE AUDIO DE MEXIAVENTURA
// ==========================================

const audioFondo = document.createElement("audio");
audioFondo.src = "audio/fondo.mp3";
audioFondo.loop = true;
audioFondo.volume = 0.35;

const audioClic = document.createElement("audio");
audioClic.src = "audio/clic.mp3"; // Efecto general para botones
audioClic.volume = 0.5;

// NUEVO: Audio exclusivo para los destellos de la pantalla de inicio
const audioDestellos = document.createElement("audio");
audioDestellos.src = "audio/brillos.mp3"; // Pon aquí la ruta de tu archivo de destellos
audioDestellos.volume = 0.6;

let musicaEncendida = false;

// Función para el clic general de botones
function reproducirEfecto() {
    audioClic.currentTime = 0;
    audioClic.play().catch(e => console.log("Audio de clic esperando interacción"));
}

// NUEVO: Función exclusiva para reproducir el sonido de destellos
function reproducirDestellos() {
    audioDestellos.currentTime = 0;
    audioDestellos.play().catch(e => console.log("Audio de destellos esperando interacción"));
}

document.addEventListener("DOMContentLoaded", () => {
    const botonAudio = document.getElementById("botonAudio");
    
    if (botonAudio) {
        botonAudio.addEventListener("click", () => {
            reproducirEfecto();
            musicaEncendida = !musicaEncendida;
            
            if (musicaEncendida) {
                audioFondo.play().then(() => {
                    botonAudio.style.borderColor = "#00ffaa";
                }).catch(err => {
                    console.log("Error al reproducir música:", err);
                    musicaEncendida = false;
                });
            } else {
                audioFondo.pause();
                botonAudio.style.borderColor = "rgba(212, 175, 55, 0.6)";
            }
        });
    }

    // Sonido para botones normales y niveles
    const elementosInteractivos = document.querySelectorAll("button, .nivel");
    elementosInteractivos.forEach(item => {
        item.addEventListener("click", () => {
            reproducirEfecto();
        });
    });

    // NUEVO: Detectar clics en la pantalla de inicio para disparar el sonido de los destellos
    const pantallaInicio = document.getElementById("pantallaInicio");
    if (pantallaInicio) {
        pantallaInicio.addEventListener("click", (event) => {
            // Evitamos que suene doble si le dan clic directo a un botón dentro del inicio
            if (event.target.tagName === "BUTTON" || event.target.closest("button")) return;
            reproducirDestellos();
        });
    }
});