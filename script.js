 // ==========================================
 // 1. MENÚ Y BIENVENIDA CINEMATOGRÁFICA
 // ==========================================

 let narracionIntro = null;
 function iniciarJuego() {
     const pantallaInicio = document.getElementById("pantallaInicio");
     const bienvenida = document.getElementById("escenaBienvenida");
     const texto = document.getElementById("textoNarracion");
     const botonExplorar = document.getElementById("botonExplorar");
     const botonOmitir = document.getElementById("botonOmitirIntro");

     // Ocultar el menú y mostrar la bienvenida
     pantallaInicio.style.display = "none";
     bienvenida.style.display = "flex";
     // Ocultar el botón de continuar mientras habla
     botonExplorar.style.display = "none";
     // Mostrar el texto completo de la narración
     texto.textContent =
         "Prepárate para viajar al pasado, descubrir las grandes civilizaciones de México y conocer los acontecimientos que marcaron nuestra historia. ¿Estás listo para comenzar esta aventura?";
     // Animar la aparición de la escena y del personaje
     if (typeof gsap !== "undefined") {
         gsap.fromTo(".contenido-bienvenida",
             { opacity: 0 },
             { opacity: 1, duration: 1.2 }
         );

         gsap.fromTo("#personajeIntro",
             { opacity: 0, x: -100, scale: 0.85 },
             { opacity: 1, x: 0, scale: 1, duration: 1.3, delay: 0.3 }
         );

         gsap.fromTo(".dialogo-bienvenida",
             { opacity: 0, y: 25 },
             { opacity: 1, y: 0, duration: 1, delay: 0.6 }
         );
     }

     // Iniciar la narración con la voz del navegador
     if ("speechSynthesis" in window) {
         window.speechSynthesis.cancel();

         narracionIntro = new SpeechSynthesisUtterance(texto.textContent);
         narracionIntro.lang = "es-MX";
         narracionIntro.rate = 0.9;
         narracionIntro.pitch = 1;

         narracionIntro.onend = function () {
             botonExplorar.style.display = "inline-block";
         };

         window.speechSynthesis.speak(narracionIntro);
     } else {
         // Si el navegador no admite voz, dejar continuar
         botonExplorar.style.display = "inline-block";
     }
 }

 // Omitir la voz y permitir continuar
 document.getElementById("botonOmitirIntro").addEventListener("click", function () {
     if ("speechSynthesis" in window) {
         window.speechSynthesis.cancel();
     }

     document.getElementById("botonExplorar").style.display = "inline-block";
 });

 // Pasar de la bienvenida al mapa
 document.getElementById("botonExplorar").addEventListener("click", function () {
     if ("speechSynthesis" in window) {
         window.speechSynthesis.cancel();
     }

     const bienvenida = document.getElementById("escenaBienvenida");
     const mapa = document.getElementById("pantallaMapa");

     if (typeof gsap !== "undefined") {
         gsap.to(bienvenida, {
             opacity: 0,
             duration: 0.7,
             onComplete: function () {
                 bienvenida.style.display = "none";
                 bienvenida.style.opacity = "1";
                 mapa.style.display = "block";

                 gsap.fromTo(mapa,
                     { opacity: 0 },
                     { opacity: 1, duration: 1 }
                 );
             }
         });
     } else {
         bienvenida.style.display = "none";
         mapa.style.display = "block";
     }
 });


// ==========================================
// 2. EFECTO DE PARTÍCULAS AL HACER CLIC
// ==========================================
document.addEventListener("click", function(event) {
    // Solo generar particulas en la pantalla de inicio
    const pantallaInicio = document.getElementById("pantallaInicio");
    if (pantallaInicio.style.display === "none") return;

    const figuras = ["✦", "✧", "◇", "◆", "⬡", "❖", "◈", "☽", "◉"];
    for (let i = 0; i < 7; i++) {
        const decoracion = document.createElement("div");
        decoracion.classList.add("decoracion");
        
        const figuraAleatoria = figuras[Math.floor(Math.random() * figuras.length)];
        decoracion.textContent = figuraAleatoria;

        const movimientoX = (Math.random() - 0.5) * 160;
        const movimientoY = (Math.random() - 0.5) * 120;

        decoracion.style.setProperty("--movimiento-x", movimientoX + "px");
        decoracion.style.setProperty("--movimiento-y", movimientoY + "px");
        decoracion.style.left = event.clientX + movimientoX + "px";
        decoracion.style.top = event.clientY + movimientoY + "px";

        document.getElementById("decoraciones").appendChild(decoracion);

        setTimeout(function() {
            decoracion.remove();
        }, 1800);
    }
});

// ==========================================
// 3. INFORMACIÓN DE LOS NIVELES
// ==========================================
const niveles = {
    1: {
        titulo: "Nivel 1: El auge olmeca 1200-400 a.n.e",
        texto: `Los olmecas desarrollaron centros ceremoniales, cultivaron maíz y crearon esculturas monumentales, incluidas las famosas cabezas colosales. Su cultura influyó en otros pueblos mesoamericanos. Dato legendario: Se conoce a los olmecas como una de las primeras grandes civilizaciones de Mesoamérica.`
    },
    2: {
        titulo: "🏺 Nivel 2: Las grandes culturas prehispánicas",
        texto: `Antes de la llegada de los españoles existieron numerosas culturas en Mesoamérica. Los olmecas son considerados una de las primeras grandes culturas mesoamericanas. Los mayas desarrollaron importantes conocimientos matemáticos y astronómicos. Teotihuacan destacó por su enorme ciudad y sus grandes pirámides. Cada cultura tuvo sus propias formas de organización, religión, economía y expresiones artísticas.`
    },
    3: {
        titulo: "🦅 Nivel 3: La peregrinación mexica y Aztlán",
        texto: `Según la tradición mexica, los mexicas emprendieron una larga migración desde un lugar llamado Aztlán. Durante su recorrido llegaron a diferentes regiones hasta establecerse finalmente en el Valle de México. La tradición cuenta que Huitzilopochtli les indicó que debían buscar un lugar donde encontraran un águila sobre un nopal.`
    },
    4: {
        titulo: "🌵 Nivel 4: La fundación de México-Tenochtitlan",
        texto: `De acuerdo con la tradición, los mexicas encontraron la señal indicada por Huitzilopochtli: un águila sobre un nopal. En ese lugar fundaron México-Tenochtitlan, tradicionalmente fechada en 1325. La ciudad fue construida sobre una zona lacustre del lago de Texcoco y con el tiempo se convirtió en uno de los principales centros políticos y económicos de Mesoamérica.`
    },
    5: {
        titulo: "🛕 Nivel 5: El Templo Mayor y la vida mexica",
        texto: `El Templo Mayor fue uno de los principales centros religiosos de México-Tenochtitlan. En él se encontraban templos dedicados principalmente a Huitzilopochtli y Tláloc. La sociedad mexica tenía una organización política, económica, religiosa y militar compleja. El comercio y los mercados también tuvieron gran importancia en la vida de la ciudad.`
    },
    6: {
        titulo: "⛵ Nivel 6: La llegada de los españoles en 1519",
        texto: `En 1519, Hernán Cortés llegó a las costas del territorio que actualmente forma parte de México. Después de establecer contacto con diferentes pueblos indígenas, los españoles comenzaron su avance hacia el centro de Mesoamérica. Este proceso provocó importantes cambios políticos, sociales, económicos y culturales.`
    },
    7: {
        titulo: "🤝 Nivel 7: Cortés, Moctezuma y las alianzas indígenas",
        texto: `Durante el avance español hacia Tenochtitlan se establecieron diferentes alianzas con pueblos indígenas que eran rivales de los mexicas. Los tlaxcaltecas fueron uno de los principales aliados de los españoles. En 1519, Cortés y sus hombres llegaron a Tenochtitlan y tuvieron contacto con Moctezuma II, gobernante mexica.`
    },
    8: {
        titulo: "⚔️ Nivel 8: La Noche Triste y la resistencia mexica",
        texto: `En 1520 ocurrió un enfrentamiento conocido tradicionalmente como la Noche Triste. Los españoles y sus aliados tuvieron que abandonar Tenochtitlan después de fuertes combates con los mexicas. Sin embargo, los españoles regresarón posteriormente con nuevos aliados y prepararon un nuevo ataque contra la ciudad.`
    },
    9: {
        titulo: "🏹 Nivel 9: El sitio y la caída de Tenochtitlan",
        texto: `En 1521 comenzó el sitio de México-Tenochtitlan. Los españoles y sus aliados indígenas rodearon la ciudad y utilizaron también una fuerza naval en el lago de Texcoco. Después de meses de enfrentamientos, Tenochtitlan cayó el 13 de agosto de 1521, marcando un momento decisivo en el proceso de conquista.`
    },
    10: {
        titulo: "🏆 Nivel 10: El inicio de la Nueva España",
        texto: `Después de la caída de Tenochtitlan comenzó un nuevo periodo histórico. Los españoles establecieron instituciones políticas y económicas que dieron forma a la Nueva España. Al mismo tiempo, las culturas indígenas continuaron formando parte de la sociedad. La combinación de diferentes tradiciones, pueblos y culturas produjo profundas transformaciones que forman parte de la historia de México.`
    }
};

// ==========================================
// 4. FUNCIONES PARA EL MODAL
// ==========================================
function abrirNivel(numero) {
    const nivel = niveles[numero];
    document.getElementById("tituloNivel").textContent = nivel.titulo;
    document.getElementById("textoNivel").textContent = nivel.texto;
    document.getElementById("modal").classList.add("activo");
}

function cerrarNivel() {
    document.getElementById("modal").classList.remove("activo");
}

// CERRAR AL HACER CLIC FUERA
document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        cerrarNivel();
    }
});

const botonSalir = document.getElementById("botonSalir");
const ventanaSalir = document.getElementById("ventanaSalir");
const botonQuedarse = document.getElementById("botonQuedarse");
const confirmarSalir = document.getElementById("confirmarSalir");

//Abrir la ventana de confirmación
botonSalir.addEventListener("click", function(){
    ventanaSalir.style.display = "flex";
});
//Cerrar la ventana y continuar jugando
botonQuedarse.addEventListener("click", function(){
    ventanaSalir.style.display = "none";
});
//Confirmar que deseas salir
confirmarSalir.addEventListener("click", function(){
    ventanaSalir.style.display = "none";
    //Regresar a la pantalla de inicio del juego
    const bienvenida = document.getElementById("escenaBienvenida");

    if (bienvenida){
        bienvenida.style.display = "none";
    }
    const botonInicio = document.getElementById("botonInicio");

    if (botonInicio) {
        botonInicio.style.display = "block";
    }
});

