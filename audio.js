// audio.js

// Definimos los objetos de audio apuntando a tu carpeta 'audio'
const efectos = {
    clic: new Audio('audio/clic.mp3'),
    brillos: new Audio('audio/brillos.mp3')
};

// Función general para reproducir el efecto que le indiques
function reproducirAudio(nombre) {
    if (efectos[nombre]) {
        // Reiniciamos el audio para que pueda sonar rápido varias veces seguidas
        efectos[nombre].currentTime = 0; 
        
        // Reproducimos y atrapamos cualquier aviso si el navegador bloquea el autoplay inicial
        efectos[nombre].play().catch(error => {
            console.log("Esperando interacción del usuario para reproducir audio:", error);
        });
    }
}