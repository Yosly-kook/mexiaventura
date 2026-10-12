// audio.js

// Cada sonido tiene su propia variable y ruta directa
const sonidoClic = new Audio('audio/clic.mp3');
const sonidoBrillos = new Audio('audio/brillos.mp3');

// Forzamos la precarga para que estén listos al instante
sonidoClic.preload = 'auto';
sonidoBrillos.preload = 'auto';

// Funciones totalmente separadas y independientes
function reproducirClic() {
    sonidoClic.currentTime = 0;
    sonidoClic.play().catch(error => {
        console.log("Esperando interacción para el clic:", error);
    });
}

function reproducirBrillos() {
    sonidoBrillos.currentTime = 0;
    sonidoBrillos.play().catch(error => {
        console.log("Esperando interacción para los brillos:", error);
    });
}