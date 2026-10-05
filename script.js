// ==========================================
// INICIAR JUEGO
// ==========================================

function iniciarJuego() {
    document.getElementById("pantallaInicio").style.display = "none";
    document.getElementById("mapaJuego").style.display = "block";
    document.querySelector(".botones-menu").style.display = "none";
}

// ==========================================
// INFORMACIÓN DE LOS NIVELES
// ==========================================

const niveles = {

    1: {
        titulo: "🌽 Nivel 1: Los pueblos de Mesoamérica",
        texto: `Mesoamérica fue una región cultural en la que se desarrollaron
        diferentes pueblos y culturas antes de la llegada de los españoles.
        Entre ellos estuvieron los olmecas, mayas, zapotecas, mixtecos,
        teotihuacanos y mexicas.

        Estos pueblos desarrollaron conocimientos de agricultura,
        arquitectura, astronomía, escritura, matemáticas y comercio.`
    },

    2: {
        titulo: "🏺 Nivel 2: Las grandes culturas prehispánicas",
        texto: `Antes de la llegada de los españoles existieron numerosas
        culturas en Mesoamérica.

        Los olmecas son considerados una de las primeras grandes culturas
        mesoamericanas. Los mayas desarrollaron importantes conocimientos
        matemáticos y astronómicos. Teotihuacan destacó por su enorme
        ciudad y sus grandes pirámides.

        Cada cultura tuvo sus propias formas de organización, religión,
        economía y expresiones artísticas.`
    },

    3: {
        titulo: "🦅 Nivel 3: La peregrinación mexica y Aztlán",
        texto: `Según la tradición mexica, los mexicas emprendieron una larga
        migración desde un lugar llamado Aztlán.

        Durante su recorrido llegaron a diferentes regiones hasta establecerse
        finalmente en el Valle de México.

        La tradición cuenta que Huitzilopochtli les indicó que debían buscar
        un lugar donde encontraran un águila sobre un nopal.`
    },

    4: {
        titulo: "🌵 Nivel 4: La fundación de México-Tenochtitlan",
        texto: `De acuerdo con la tradición, los mexicas encontraron la señal
        indicada por Huitzilopochtli: un águila sobre un nopal.

        En ese lugar fundaron México-Tenochtitlan, tradicionalmente fechada
        en 1325.

        La ciudad fue construida sobre una zona lacustre del lago de Texcoco
        y con el tiempo se convirtió en uno de los principales centros
        políticos y económicos de Mesoamérica.`
    },

    5: {
        titulo: "🛕 Nivel 5: El Templo Mayor y la vida mexica",
        texto: `El Templo Mayor fue uno de los principales centros religiosos
        de México-Tenochtitlan.

        En él se encontraban templos dedicados principalmente a
        Huitzilopochtli y Tláloc.

        La sociedad mexica tenía una organización política, económica,
        religiosa y militar compleja. El comercio y los mercados también
        tuvieron gran importancia en la vida de la ciudad.`
    },

    6: {
        titulo: "⛵ Nivel 6: La llegada de los españoles en 1519",
        texto: `En 1519, Hernán Cortés llegó a las costas del territorio que
        actualmente forma parte de México.

        Después de establecer contacto con diferentes pueblos indígenas,
        los españoles comenzaron su avance hacia el centro de Mesoamérica.

        Este proceso provocó importantes cambios políticos, sociales,
        económicos y culturales.`
    },

    7: {
        titulo: "🤝 Nivel 7: Cortés, Moctezuma y las alianzas indígenas",
        texto: `Durante el avance español hacia Tenochtitlan se establecieron
        diferentes alianzas con pueblos indígenas que eran rivales de los
        mexicas.

        Los tlaxcaltecas fueron uno de los principales aliados de los
        españoles.

        En 1519, Cortés y sus hombres llegaron a Tenochtitlan y tuvieron
        contacto con Moctezuma II, gobernante mexica.`
    },

    8: {
        titulo: "⚔️ Nivel 8: La Noche Triste y la resistencia mexica",
        texto: `En 1520 ocurrió un enfrentamiento conocido tradicionalmente
        como la Noche Triste.

        Los españoles y sus aliados tuvieron que abandonar Tenochtitlan
        después de fuertes combates con los mexicas.

        Sin embargo, los españoles regresaron posteriormente con nuevos
        aliados y prepararon un nuevo ataque contra la ciudad.`
    },

    9: {
        titulo: "🏹 Nivel 9: El sitio y la caída de Tenochtitlan",
        texto: `En 1521 comenzó el sitio de México-Tenochtitlan.

        Los españoles y sus aliados indígenas rodearon la ciudad y utilizaron
        también una fuerza naval en el lago de Texcoco.

        Después de meses de enfrentamientos, Tenochtitlan cayó el 13 de
        agosto de 1521, marcando un momento decisivo en el proceso de
        conquista.`
    },

    10: {
        titulo: "🏆 Nivel 10: El inicio de la Nueva España",
        texto: `Después de la caída de Tenochtitlan comenzó un nuevo periodo
        histórico.

        Los españoles establecieron instituciones políticas y económicas
        que dieron forma a la Nueva España.

        Al mismo tiempo, las culturas indígenas continuaron formando parte
        de la sociedad. La combinación de diferentes tradiciones, pueblos
        y culturas produjo profundas transformaciones que forman parte de
        la historia de México.`
    }

};


// ==========================================
// ABRIR UN NIVEL
// ==========================================

function abrirNivel(numero) {

    const nivel = niveles[numero];

    document.getElementById("tituloNivel").textContent = nivel.titulo;

    document.getElementById("textoNivel").textContent = nivel.texto;

    document.getElementById("modal").classList.add("activo");

}


// ==========================================
// CERRAR LA VENTANA
// ==========================================

function cerrarNivel() {

    document.getElementById("modal").classList.remove("activo");

}


// ==========================================
// CERRAR AL HACER CLIC FUERA
// ==========================================

document.getElementById("modal").addEventListener("click", function(event) {

    if (event.target === this) {

        cerrarNivel();

    }

});


// ==========================================
// DECORACIONES AL HACER CLIC
// ==========================================

document.addEventListener("click", function(event) {

    const figuras = [
        "✦",
        "✧",
        "◇",
        "◆",
        "⬡",
        "❖",
        "◈",
        "☽",
        "◉"
    ];

    for (let i = 0; i < 7; i++) {

        const decoracion = document.createElement("div");

        decoracion.classList.add("decoracion");

        const figuraAleatoria =
            figuras[Math.floor(Math.random() * figuras.length)];

        decoracion.textContent = figuraAleatoria;

        const movimientoX =
            (Math.random() - 0.5) * 160;

        const movimientoY =
            (Math.random() - 0.5) * 120;

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