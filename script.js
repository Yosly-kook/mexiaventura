 // ==========================================
 // 1. MENÚ Y BIENVENIDA CINEMATOGRÁFICA
 // ==========================================

 let narracionIntro = null;
 function iniciarJuego() {
    // LÍNEA DE SEGURIDAD: Asegurar que la ventana de salir esté cerrada al iniciar
    const ventana = document.getElementById("ventanaSalir");
    if (ventana) {
        ventana.style.display = "none";
    }
     const pantallaInicio = document.getElementById("pantallaInicio");
     const bienvenida = document.getElementById("escenaBienvenida");
     const texto = document.getElementById("textoNarracion");
     const botonExplorar = document.getElementById("botonExplorar");
     const botonOmitir = document.getElementById("botonOmitirIntro");

// Ocultar el menú y mostrar la bienvenida original
pantallaInicio.style.display = "none";
bienvenida.style.display = "flex";

// Ocultar continuar mientras habla, pero dejar visible omitir
if (botonExplorar) botonExplorar.style.display = "none";
if (botonOmitir) botonOmitir.style.display = "inline-block";
    
  // Mostrar el texto original de la bienvenida
  texto.textContent = "Prepárate para viajar al pasado, descubrir las grandes civilizaciones de México y conocer los acontecimientos que marcaron nuestra historia. ¿Estás listo para comenzar esta aventura?";


const vozPersonaje = document.getElementById("vozPersonaje");
const videoBienvenida = document.getElementById("videoBienvenida");
const personajeIntro = document.getElementById("personajeIntro");

// Mostrar el video y ocultar la imagen fija
if (videoBienvenida) {
    videoBienvenida.style.display = "block";
    videoBienvenida.loop = false;
    videoBienvenida.muted = true;
}

if (personajeIntro) {
    personajeIntro.style.display = "none";
}

// Preparar y reproducir la voz
if (vozPersonaje) {
    vozPersonaje.pause();
    vozPersonaje.currentTime = 0;

    
vozPersonaje.onended = function () {
    if (videoBienvenida) {
        videoBienvenida.pause();
    }

    if (botonExplorar) {
        botonExplorar.style.display = "inline-block";
    }
};


    // Reproducir el video mientras habla el personaje
    if (videoBienvenida) {
        videoBienvenida.currentTime = 0;

        videoBienvenida.play().catch(function (error) {
            console.error("No se pudo reproducir el video:", error);
        });
    }

    // La voz sigue siendo el audio principal
    vozPersonaje.play().catch(function (error) {
        console.error("No se pudo reproducir la voz:", error);

        if (videoBienvenida) {
            videoBienvenida.pause();
        }

        if (botonExplorar) {
            botonExplorar.style.display = "inline-block";
        }
    });
} else {
    console.error("No se encontró el audio vozPersonaje.");

    if (botonExplorar) {
        botonExplorar.style.display = "inline-block";
    }
}

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

 }

 // Omitir la narración y mostrar el botón para continuar
 const botonOmitirIntro = document.getElementById("botonOmitirIntro");
 const botonExplorarIntro = document.getElementById("botonExplorar");

 if (botonOmitirIntro) {
     botonOmitirIntro.addEventListener("click", function () {
        
        const voz = document.getElementById("vozPersonaje");

if (voz) {
    voz.pause();
    voz.currentTime = 0;
}
const video = document.getElementById("videoBienvenida");

if (video) {
    video.pause();
    video.currentTime = 0;
}
         if (botonExplorarIntro) {
             botonExplorarIntro.style.display = "inline-block";
         }
     });
 }

 // Pasar de la bienvenida al mapa
 if (botonExplorarIntro) {
     botonExplorarIntro.addEventListener("click", function () {
        const voz = document.getElementById("vozPersonaje");

if (voz) {
    voz.pause();
    voz.currentTime = 0;
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
 }

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
        titulo: "El auge de la cultura olmeca",
        fecha: "1200–400 a. C.",
        texto: "Los olmecas construyeron centros ceremoniales, cultivaron maíz y crearon esculturas monumentales incluidas las famosas cabezas colosales. Su cultura influyó en otros pueblos mesoamericanos.",
        factTitle: "✦ DATO LEGENDARIO ✦",
        dato: "Son considerados una de las primeras grandes civilizaciones mesoamericanas.",
        imagen: "img/olmeca.png"
    },
    2: {
        titulo: "El esplendor de Teotihuacán",
        fecha: "100–650 d. C.",
        texto: "Teotihuacán fue una gran ciudad con impresionantes pirámides, barrios organizados y extensas redes comerciales que conectaban distintas regiones.",
        factTitle: "✦ DATO LEGENDARIO ✦",
        dato: "Su nombre en náhuatl suele interpretarse como <<Lugar donde nacen los dioses>>.",
        imagen: "img/teoticuacán.png"
    },
    3: {
        titulo: "La transformación de las ciudades mayas",
        fecha: "800–900 d. C.",
        texto: "Numerosas ciudades mayas de las tierras bajas del sur perdieron población y poder. Las sequías, los conflictos y otros factores contribuyeron a estos cambios.",
        factTitle: "✦ DATO LEGENDARIO ✦",
        dato: "La civilización maya no desapareció: sus pueblos y culturas continúan vivos.",
        imagen: "img/maya.png"
    },
    4: {
        titulo: "La fundación de Tenochtitlan",
        fecha: "1325 d. C. (fecha tradicional)",
        texto: "Los mexicas fundaron México-Tenochtitlan en un islote del lago de Texcoco. La tradición relata la señal de un águila sobre un nopal coo símbolo de su destino.",
        factTitle: "✦ DATO LEGENDARIO ✦",
        dato: "La ciudad se convirtió en un importante centro político y económico de un poderoso imperio.",
        imagen: "img/fundación.png"
    },
    5: {
        titulo: "La Triple Alianza",
        fecha: "1428 d. C.",
        texto: "Tenochtitlan, Texcoco y Tlacopan formaron una alianza política y militar. Juntos expandieron su infliencia y establecieron tributos sobre numerosos pueblos.",
        factTitle: "✦ DATO LEGENDARIO ✦",
        dato: "La alinaza cambió el equilibrio de poder en Mesoamérica, aunque Tenochtitlan llegó a ejercer una posición dominante.",
        imagen: "img/Talianza.png"
        
    },
    6: {
        titulo: "La alianza de Tlaxcala",
        fecha: "Septiembre de 1519",
        texto: "Tras enfrentamientos con los españoles, los tlaxcaltecas establecieron una alianza con Hernán Cortés y participaron en las campañas contra los mexicas.",
        factTitle: "✦ CLAVE HISTÓRICA ✦",
        dato: "La Conquista involucró alianzas indígenas, rivalidades políticas y diversos intereses.",
        imagen: "img/alianza.png"
    },
    7: {
        titulo: "El encuentro en Tenochtitlan",
        fecha: "8 de noviembre de 1519",
        texto: "Moctezuma Xocoyotzin recibió a Hernán Cortés en la capital mexica. El encuentro dio paso a una relación tensa que pronto se transformarías en conflicto.",
        factTitle: "✦ CLAVE HISTÓRICA ✦",
        dato: "Tenochtitlan impresionó por sus calzadas, canales y grandes construcciones.",
        imagen: "img/encuentro.png"
    },
    8: {
        titulo: "La matanza en el Templo Mayor",
        fecha: "Mayo de 1520",
        texto: "Durante la fiesta de Tóxcatl, las tropas de Pedro de Alvarado atacaron a participantes mexicas, provocando una grave crisis y aumentó la resistencia contra los españoles.",
        factTitle: "✦ CLAVE HISTÓRICA ✦",
        dato: "El ataque agravó el conflicto dentro de Tenochtitlan.",
        imagen: "img/matanza.png"
    },
    9: {
        titulo: "La Noche Triste",
        fecha: "30 de junio–1 de julio de 1520",
        texto: "Los españoles y sus aliados intentaron escapar de Tenochtitlan durante la noche, pero fueron descubiertos mientras cruzaban las calzadas y sufrieron grandes pérdidas.",
        factTitle: "✦ CLAVE HISTÓRICA ✦",
        dato: "Cuitláhuac asumió el liderazgo mexica tras la muerte de Moctezuma.",
        imagen:"img/nochetriste.png"
    },
    10: {
        titulo: "La caída de Tenochtitlan",
        fecha: "13 de agosto de 1521",
        texto: "Después de un asedio por tierra y agua, las fuerzas españolas y sus aliados indígenas conquistaron Tenochtitlan. Las epidemias, la falta de alimentos y los combates contribuyeron a la caída. Cuahutémoc fue capturado.",
        factTitle: "✦ FINAL DE CAMPAÑA ✦",
        dato: "La caída de Tenochtitlan puso fin al Imperio Mexica e inició la colonización española, transformando radicalmente la región.",
        imagen: "img/Caída.png"
    }
};


// ==========================================
// 4. FUNCIONES PARA EL MODAL
// ==========================================

function abrirNivel(numero) {
    const nivel = niveles[numero];
    if (!nivel) return;
    
    document.getElementById("tituloNivel").textContent = nivel.titulo;
    document.getElementById("fechaNivel").textContent = nivel.fecha;
    document.getElementById("textoNivel").textContent = nivel.texto;
    document.getElementById("datoNivel").textContent = nivel.dato;
    
    // AQUÍ ACTUALIZAMOS EL TÍTULO DINÁMICO DEL DATO
    document.getElementById("tituloFact").textContent = nivel.factTitle || "✦ DATO HISTÓRICO ✦";
    
    document.getElementById("datoNivel").textContent = nivel.dato;

    // CARGAR LA IMAGEN DINÁMICA DE CADA TARJETA
    const imgNivel = document.getElementById("imagenNivel");
    if (imgNivel) {
        imgNivel.src = nivel.imagen || ""; // Carga la ruta de la imagen o la deja vacía si no existe
    }

    document.getElementById("modal").classList.add("activo");
}


function cerrarNivel() {
    document.getElementById("modal").classList.remove("activo");
}

// CERRAR AL HACER CLIC FUERA
const modalNivel = document.getElementById("modal");
if (modalNivel) {
    modalNivel.addEventListener("click", function(event) {
        if (event.target === this) {
            cerrarNivel();
        }
    });
}
//5.CONTROL DE LA VENTANA SALIR
const botonSalir = document.getElementById("botonSalir");
const ventanaSalir = document.getElementById("ventanaSalir");
const botonQuedarse = document.getElementById("botonQuedarse");
const confirmarSalir = document.getElementById("confirmarSalir");

//Abrir la ventana de confirmación
if (botonSalir && ventanaSalir) {
    botonSalir.addEventListener("click", function(event) {
        event.stopPropagation();
        ventanaSalir.style.display = "flex";
    });
}

// Cerrar la ventana de confirmación y continuar jugando
if (botonQuedarse && ventanaSalir) {
    botonQuedarse.addEventListener("click", function() {
        ventanaSalir.style.display = "none";
    });
}

// Confirmar salida (Regresar a la pantalla de inicio)
if (confirmarSalir && ventanaSalir) {
    confirmarSalir.addEventListener("click", function() {
        ventanaSalir.style.display = "none";
        
        // Ocultar bienvenida y mapa
        const bienvenida = document.getElementById("escenaBienvenida");
        const pantallaMapa = document.getElementById("pantallaMapa");
        const pantallaInicio = document.getElementById("pantallaInicio");

        if (bienvenida) bienvenida.style.display = "none";
        if (pantallaMapa) pantallaMapa.style.display = "none";
        
        // Mostrar de nuevo el menú principal
        if (pantallaInicio) {
            pantallaInicio.style.display = "flex";
        }
    });
}

// ==========================================
// 6. EFECTO CANVAS DE HOJAS VERDES CAYENDO
// ==========================================
let canvasHojas = null;
let ctxHojas = null;
let widthHojas = 0, heightHojas = 0;
let arrayHojas = [];
const cantidadHojas = 30; // Cantidad de hojas en pantalla

// Paleta de tonos verdes mesoamericanos
const coloresHojasVerdes = ['#2e8b57', '#228b22', '#32cd32', '#10b981', '#006400'];

function initHojasCanvas() {
    canvasHojas = document.getElementById('leaf-canvas');
    if (!canvasHojas) return;

    ctxHojas = canvasHojas.getContext('2d');
    const contenedor = document.getElementById('pantallaMapa');
    
    widthHojas = contenedor ? contenedor.clientWidth : window.innerWidth;
    heightHojas = contenedor ? contenedor.clientHeight : window.innerHeight;
    
    canvasHojas.width = widthHojas;
    canvasHojas.height = heightHojas;
    arrayHojas = [];

    for (let i = 0; i < cantidadHojas; i++) {
        arrayHojas.push({
            x: Math.random() * widthHojas,
            y: Math.random() * heightHojas - heightHojas,
            size: Math.random() * 12 + 8,
            color: coloresHojasVerdes[Math.floor(Math.random() * coloresHojasVerdes.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 1.5 - 0.75,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 1.5 - 0.75,
            oscillation: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function dibujaHoja(l) {
    if (!ctxHojas) return;
    ctxHojas.save();
    const currentX = l.x + Math.sin(l.phase) * 25;
    ctxHojas.translate(currentX, l.y);
    ctxHojas.rotate(l.rotation * Math.PI / 180);

    ctxHojas.fillStyle = l.color;
    ctxHojas.beginPath();
    ctxHojas.moveTo(0, 0);
    ctxHojas.quadraticCurveTo(l.size, -l.size, 0, -l.size * 2);
    ctxHojas.quadraticCurveTo(-l.size, -l.size, 0, 0);
    ctxHojas.fill();

    ctxHojas.restore();
}

function animarHojasCanvas() {
    if (!ctxHojas || !canvasHojas) return;
    ctxHojas.clearRect(0, 0, widthHojas, heightHojas);

    arrayHojas.forEach(l => {
        l.y += l.speedY;
        l.x += l.speedX;
        l.rotation += l.rotationSpeed;
        l.phase += l.oscillation;

        if (l.y > heightHojas + 20) {
            l.y = -30;
            l.x = Math.random() * widthHojas;
        }
        dibujaHoja(l);
    });

    requestAnimationFrame(animarHojasCanvas);
}

window.addEventListener('resize', () => {
    if (canvasHojas && canvasHojas.offsetParent !== null) {
        initHojasCanvas();
    }
});
// Pasar de la bienvenida al mapa
    if (botonExplorarIntro) {
        botonExplorarIntro.addEventListener("click", function () {
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
                        
                        // 🍃 AGREGAR ESTAS DOS LÍNEAS AQUÍ:
                        initHojasCanvas();
                        animarHojasCanvas();

                        gsap.fromTo(mapa,
                            { opacity: 0 },
                            { opacity: 1, duration: 1 }
                        );
                    }
                });
            } else {
                bienvenida.style.display = "none";
                mapa.style.display = "block";
                
                // 🍃 Y AGREGAR ESTAS DOS LÍNEAS AQUÍ TAMBIÉN (POR SI NO CARGA GSAP):
                initHojasCanvas();
                animarHojasCanvas();
            }
        });
    }
    // ==========================================
// CONTROL DE LOS BOTONES FLOTANTES DEL MAPA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Botón Menú Principal (🏠)
    const btnMenuPrincipal = document.querySelector(".btn-inicio");
    if (btnMenuPrincipal) {
        btnMenuPrincipal.addEventListener("click", (e) => {
            e.preventDefault(); // Evita que salte como enlace vacío
            
            // Si ya tienes tu ventana de salida o quieres regresar directo al inicio:
            const pantallaMapa = document.getElementById("pantallaMapa");
            const pantallaInicio = document.getElementById("pantallaInicio");
            
            if (pantallaMapa) pantallaMapa.style.display = "none";
            if (pantallaInicio) pantallaInicio.style.display = "flex";
            
            // Reiniciar estado de música si lo deseas
            enPantallaInicio = true;
            reproducirMusicaActual();
        });
    }

    // 2. Botón Ajustes (⚙️)
    const btnAjustes = document.querySelector(".btn-ajustes");
    if (btnAjustes) {
        btnAjustes.addEventListener("click", (e) => {
            e.preventDefault();
            alert("⚙️ Menú de Ajustes: Aquí puedes configurar el volumen o preferencias pronto.");
            // Si creas un modal de ajustes en el HTML, puedes abrirlo aquí igual que el modal de niveles.
        });
    }

    // 3. Botón Mis Logros (🏆)
    const btnLogros = document.querySelector(".btn-logros");
    if (btnLogros) {
        btnLogros.addEventListener("click", (e) => {
            e.preventDefault();
            alert("🏆 ¡Tus Logros! Has avanzado por la historia de México prehispánico.");
            // Aquí puedes programar que se abra una ventana con las estrellas acumuladas.
        });
    }

    // 4. Botón Guía del Juego (📜)
    const btnAyuda = document.querySelector(".btn-ayuda");
    if (btnAyuda) {
        btnAyuda.addEventListener("click", (e) => {
            e.preventDefault();
            alert("📜 Guía: Haz clic en cada nivel numerado del mapa para descubrir los acontecimientos históricos y datos clave.");
        });
    }
});