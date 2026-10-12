// audio.js

// Definimos los objetos de audio apuntando a tu carpeta
const efectos = {
    clic: new Audio("audio/clic.mp3"),
    brillitos: new Audio("audio/brillos.mp3")
};

// Función general para reproducir cualquier efecto fácilmente
function reproducirAudio(nombre) {
    if (efectos[nombre]) {
        // Reiniciamos el audio para que pueda sonar rápido varias veces seguidas
        efectos[nombre].currentTime = 0; 
        
        // Reproducimos y atrapamos cualquier detalle si el navegador pide interacción previa
        efectos[nombre].play().catch(error => {
            console.log("Esperando interacción del usuario para reproducir audio:", error);
        });
    }
}