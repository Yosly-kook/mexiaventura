let posX = 100;
let posY = 100;
let piedrasRecolectadas = 0;
let puntos = 0;

const pablito = document.getElementById("pablito");
const txtPiedras = document.getElementById("piedras");
const txtPuntos = document.getElementById("puntos");
const audioGems = document.getElementById("audioGems");

// Movimiento por teclado (Flechas o WASD)
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") mover(30, 0);
    if (e.key === "ArrowLeft" || e.key === "a") mover(-30, 0);
    if (e.key === "ArrowUp" || e.key === "w") mover(0, 30);
    if (e.key === "ArrowDown" || e.key === "s") mover(0, -30);
});

// Movimiento por botones en pantalla (como en tu imagen)
document.getElementById("btnDerecha").addEventListener("click", () => mover(30, 0));
document.getElementById("btnIzquierda").addEventListener("click", () => mover(-30, 0));
document.getElementById("btnArriba").addEventListener("click", () => mover(0, 30));
document.getElementById("btnAbajo").addEventListener("click", () => mover(0, -30));

function mover(dx, dy) {
    posX = Math.max(20, Math.min(window.innerWidth - 70, posX + dx));
    posY = Math.max(50, Math.min(window.innerHeight - 150, posY + dy));

    pablito.style.left = `${posX}px`;
    pablito.style.bottom = `${posY}px`;

    checarColisiones();
}

function checarColisiones() {
    for (let i = 1; i <= 4; i++) {
        const piedra = document.getElementById(`piedra${i}`);
        if (piedra && piedra.style.display !== "none") {
            const rectPablito = pablito.getBoundingClientRect();
            const rectPiedra = piedra.getBoundingClientRect();

            // Detectar si Pablito toca una piedra
            if (!(rectPablito.right < rectPiedra.left || 
                  rectPablito.left > rectPiedra.right || 
                  rectPablito.bottom < rectPiedra.top || 
                  rectPablito.top > rectPiedra.bottom)) {
                
                // Recolectar piedra
                piedra.style.display = "none";
                piedrasRecolectadas++;
                puntos += 25;

                if (audioGems) audioGems.play();

                txtPiedras.textContent = piedrasRecolectadas;
                txtPuntos.textContent = puntos;

                if (piedrasRecolectadas === 4) {
                    setTimeout(() => {
                        alert("¡Felicidades! Juntaste todas las piedras basálticas. ¡Se ha construido la Cabeza Colosal Olmeca! 🗿✨");
                        window.location.href = "../index.html"; // Regresa al mapa
                    }, 300);
                }
            }
        }
    }
}