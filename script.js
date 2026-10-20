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

// Ocultar el menú y mostrar la vienvenida original
pantallaInicio.style.display = "none";
bienvenida.style.display = "flex";

// Ocultar continuar mientras habla, pero dejar visible omitir
if (botonExplorar) botonExplorar.style.display = "none";
if (botonOmitir) botonOmitir.style.display = "inline-block";
    
  // Mostrar el texto original de la bienvenida
  texto.textContent = "Prepárate para viajar al pasado, descubrir las grandes civilizaciones de México y conocer los acontecimientos que marcaron nuestra historia. ¿Estás listo para comenzar esta aventura?";

  // Recuperar la voz del navegador
  if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      narracionIntro = new SpeechSynthesisUtterance(texto.textContent);
      narracionIntro.lang = "es-MX";
      narracionIntro.rate = 0.92;
      narracionIntro.pitch = 1.1;
      narracionIntro.volume = 1;

      narracionIntro.onend = function () {
          botonExplorar.style.display = "inline-block";
      };

      window.speechSynthesis.speak(narracionIntro);
  } else {
      // Si el navegador no admite voz, permitir continuar
      botonExplorar.style.display = "inline-block";
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
         if ("speechSynthesis" in window) {
             window.speechSynthesis.cancel();
         }

         if (botonExplorarIntro) {
             botonExplorarIntro.style.display = "inline-block";
         }
     });
 }

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
        dato: "Son considerados una de las primeras grandes civilizaciones mesoamericanas.",
        imagen: "img/olmeca.png"
    },
    2: {
        titulo: "El esplendor de Teotihuacán",
        fecha: "100–650 d. C.",
        texto: "Teotihuacán fue una gran ciudad con impresionantes pirámides, barrios organizados y extensas redes comerciales que conectaban distintas regiones.",
        dato: "Su nombre en náhuatl suele interpretarse como <<Lugar donde nacen los dioses>>.",
        imagen: "img/teoticuacán.png"
    },
    3: {
        titulo: "La transformación de las ciudades mayas",
        fecha: "800–900 d. C.",
        texto: "Numerosas ciudades mayas de las tierras bajas del sur perdieron población y poder. Las sequías, los conflictos y otros factores contribuyeron a estos cambios.",
        dato: "La civilización maya no desapareció: sus pueblos y culturas continúan vivos.",
        imagen: "img/maya.png"
    },
    4: {
        titulo: "La fundación de Tenochtitlan",
        fecha: "1325 d. C. (fecha tradicional)",
        texto: "Los mexicas fundaron México-Tenochtitlan en un islote del lago de Texcoco. La tradición relata la señal de un águila sobre un nopal coo símbolo de su destino.",
        dato: "La ciudad se convirtió en un importante centro político y económico de un poderoso imperio.",
        imagen: "img/fundación.png"
    },
    5: {
        titulo: "La Triple Alianza",
        fecha: "1428 d. C.",
        texto: "Tenochtitlan, Texcoco y Tlacopan formaron una alianza política y militar. Juntos expandieron su infliencia y establecieron tributos sobre numerosos pueblos.",
        dato: "La alinaza cambió el equilibrio de poder en Mesoamérica, aunque Tenochtitlan llegó a ejercer una posición dominante.",
        imagen: "img/Talianza.png"
        
    },
    6: {
        titulo: "La alianza de Tlaxcala",
        fecha: "Septiembre de 1519",
        texto: "Tras enfrentamientos con los españoles, los tlaxcaltecas establecieron una alianza con Hernán Cortés y participaron en las campañas contra los mexicas.",
        dato: "La Conquista involucró alianzas indígenas, rivalidades políticas y diversos intereses.",
        imagen: "img/alianza.png"
    },
    7: {
        titulo: "El encuentro en Tenochtitlan",
        fecha: "8 de noviembre de 1519",
        texto: "Moctezuma Xocoyotzin recibió a Hernán Cortés en la capital mexica. El encuentro dio paso a una relación tensa que pronto se transformarías en conflicto.",
        dato: "Tenochtitlan impresionó por sus calzadas, canales y grandes construcciones.",
        imagen: "img/encuentro.png"
    },
    8: {
        titulo: "La matanza del Templo Mayor",
        fecha: "Mayo de 1520",
        texto: "Durante la fiesta de Tóxcatl, las tropas de Pedro de Alvarado atacaron a participantes mexicas, provocando una grave crisis y aumentó la resistencia contra los españoles.",
        dato: "El ataque agravó el conflicto dentro de Tenochtitlan.",
        imagen: "img/matanza.png"
    },
    9: {
        titulo: "La Noche Triste",
        fecha: "30 de junio–1 de julio de 1520",
        texto: "Los españoles y sus aliados intentaron escapar de Tenochtitlan durante la noche, pero fueron descubiertos mientras cruzaban las calzadas y sufrieron grandes pérdidas.",
        dato: "Cuitláhuac asumió el liderazgo mexica tras la muerte de Moctezuma.",
        imagen:"img/nochetriste.png"
    },
    10: {
        titulo: "La caída de Tenochtitlan",
        fecha: "13 de agosto de 1521",
        texto: "Después de un asedio por tierra y agua, las fuerzas españolas y sus aliados indígenas conquistaron Tenochtitlan. Las epidemias, la falta de alimentos y los combates contribuyeron a la caída. Cuahutémoc fue capturado.",
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

