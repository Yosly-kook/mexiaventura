// ==========================================
// SISTEMA DE AUDIO UNIFICADO DE MEXIAVENTURA
// ==========================================

// 1. EFECTOS DE SONIDO (independientes)
const audioClic = new Audio("audio/clic.mp3");
audioClic.volume = 0.5;

const audioDestellos = new Audio("audio/brillos.mp3");
audioDestellos.volume = 0.6;

// 2. PLAYLIST DE MÚSICA DE FONDO (Incluye inicio, mapa y las nuevas pistas)
const playlist = [
    { nombre: "Fondo Inicial", archivo: new Audio("audio/fondo.mp3") },
    { nombre: "Clásico", archivo: new Audio("audio/fondomapa.mp3") },
    { nombre: "Melodía Prehispánica", archivo: new Audio("audio/Prehispánico.mp3") },
    { nombre: "Aventura Épica", archivo: new Audio("audio/Aventura.mp3") },
    { nombre: "Sendero del Sol", archivo: new Audio("audio/SenderoSol.mp3") }
    
];

let indicePistaActual = 0; // 0 = Fondo de Inicio por defecto
let musicaEncendida = false;
let enPantallaInicio = true;

// Configurar volumen inicial y loop para todas las pistas de la lista
playlist.forEach(pista => {
    pista.archivo.loop = true;
    pista.archivo.volume = 0.35;
});

// ==========================================
// FUNCIONES DE REPRODUCCIÓN Y CONTROL
// ==========================================

// Reproducir efecto de clic
function reproducirEfecto() {
    audioClic.currentTime = 0;
    audioClic.play().catch(e => console.log("Clic esperando interacción"));
}

// Reproducir destellos
function reproducirDestellos() {
    audioDestellos.currentTime = 0;
    audioDestellos.play().catch(e => console.log("Destello esperando interacción"));
}

// FUNCIÓN MAESTRA: DETENER ABSOLUTAMENTE TODO EL AUDIO
function detenerTodaLaMusica() {
    playlist.forEach(pista => {
        if (pista && pista.archivo) {
            pista.archivo.pause();
            pista.archivo.currentTime = 0;
        }
    });
    // Por compatibilidad con variables sueltas si quedaron por ahí
    if (typeof audioInicio !== "undefined") { audioInicio.pause(); audioInicio.currentTime = 0; }
    if (typeof audioMapa !== "undefined") { audioMapa.pause(); audioMapa.currentTime = 0; }
}

// REPRODUCIR LA MÚSICA SEGÚN EL ESTADO ACTUAL
function reproducirMusicaActual() {
    if (!musicaEncendida) return;
    
    // 1. Apagamos todo antes de encender algo nuevo
    detenerTodaLaMusica();

    // 2. Si estamos en inicio, tocamos la pista 0 (Fondo Clásico)
    // Si estamos en el mapa, tocamos la pista que el usuario haya seleccionado en la playlist
    if (enPantallaInicio) {
        indicePistaActual = 0; // Forzar inicio
    } else if (indicePistaActual === 0) {
        indicePistaActual = 4; // Si estaba en inicio y pasa al mapa, por defecto pone la del mapa ("Melodía del Mapa")
    }

    // Actualizar texto en el modal si existe
    const labelNombre = document.getElementById("nombrePistaActual");
    if (labelNombre) {
        labelNombre.textContent = playlist[indicePistaActual].nombre;
    }

    // Reproducir la pista activa con manejo de errores
    playlist[indicePistaActual].archivo.play().catch(e => console.log("Reproducción bloqueada por el navegador:", e));
}

// CAMBIAR AL MAPA (Se activa con el botón "COMENZAR A EXPLORAR")
function cambiarAMusicaMapa() {
    enPantallaInicio = false;
    musicaEncendida = true; // Activa la música automáticamente al empezar
    
    const botonAudio = document.getElementById("botonAudio");
    if (botonAudio) {
        botonAudio.style.borderColor = "#00ffaa"; // Indicador verde neón
    }
    reproducirMusicaActual();
}
// Función para cambiar de pista desde el menú desplegable (<select>)
function seleccionarPistaMusical(indice) {
    // 1. Convertimos el valor recibido a número
    indicePistaActual = parseInt(indice);

    // 2. Detenemos cualquier música que esté sonando
    detenerTodaLaMusica();

    // 3. Si la música global está encendida, reproducimos la canción elegida
    if (musicaEncendida && playlist[indicePistaActual]) {
        playlist[indicePistaActual].archivo.play().catch(e => console.log("Audio bloqueado:", e));
    }
}


// ==========================================
// CONTROL DE VOLUMEN DESDE AJUSTES
// ==========================================
function actualizarVolumenSonido(valor) {
    const volumenDecimal = valor / 100;
    if (typeof audioClic !== "undefined") audioClic.volume = volumenDecimal;
    if (typeof audioDestellos !== "undefined") audioDestellos.volume = volumenDecimal;
}

function actualizarVolumenMusica(valor) {
    const volumenDecimal = valor / 100;
    playlist.forEach(pista => {
        pista.archivo.volume = volumenDecimal;
    });
}

// ==========================================
// EVENTOS Y CONEXIÓN DOM
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
                detenerTodaLaMusica();
                botonAudio.style.borderColor = "rgba(212, 175, 55, 0.6)";
            }
        });
    }

    // B) DETECTAR EL BOTÓN "COMENZAR A EXPLORAR"
    document.querySelectorAll("button").forEach(btn => {
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
    document.querySelectorAll("button, .nivel, .btn-flotante").forEach(item => {
        item.addEventListener("click", () => {
            reproducirEfecto();
        });
    });
});

// ==========================================
// CONTROL DE LA VENTANA DE AJUSTES (MODAL)
// ==========================================
const btnAjustesMenu = document.querySelector(".btn-ajustes");
if (btnAjustesMenu) {
    btnAjustesMenu.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = document.getElementById("modalAjustes");
        if (modal) modal.classList.add("activo");
    });
}

function cerrarAjustes() {
    const modal = document.getElementById("modalAjustes");
    if (modal) modal.classList.remove("activo");
}