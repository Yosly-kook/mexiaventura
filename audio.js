// audio.js

// Creamos los objetos de audio con la ruta exacta hacia tu carpeta 'audio'
const efectos = {
    clic: new Audio('audio/clic.mp3'),
    brillos: new Audio('audio/brillos.mp3') // Ajustado al nombre real de tu archivo
};

// Función para reproducir el efecto que quieras
function reproducirAudio(brillos) {
    if (efectos[brillos]) {
        efectos[brillos].currentTime = 0; // Reinicia el audio por si se repite rápido
        efectos[brillos].play().catch(error => {
            console.log("El navegador está esperando una interacción para reproducir el audio:", error);
        });
    }
}