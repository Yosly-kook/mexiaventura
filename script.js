function iniciarJuego() {

    document.getElementById("escenaBienvenida").style.display = "block";  
}

document.addEventListener("click", function(event) {

    const figuras = ["✦", "✧", "◇", "◆", "⬡", "❖", "◈", "☽", "◉"];

    for (let i = 0; i < 7; i++) {

        const decoracion = document.createElement("div");

        decoracion.classList.add("decoracion");

        const figuraAleatoria =
            figuras[Math.floor(Math.random() * figuras.length)];

        decoracion.textContent = figuraAleatoria;

        const movimientoX = (Math.random() - 0.5) * 160;
        const movimientoY = (Math.random() - 0.5) * 120;

        decoracion.style.setProperty(
    "--movimiento-x",
    movimientoX + "px"
);

decoracion.style.setProperty(
    "--movimiento-y",
    movimientoY + "px"
);

        decoracion.style.left =
            event.clientX + movimientoX + "px";

        decoracion.style.top =
            event.clientY + movimientoY + "px";

        document.getElementById("decoraciones")
            .appendChild(decoracion);

        setTimeout(function() {
            decoracion.remove();
        }, 1800);

    }

});