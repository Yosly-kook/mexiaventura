// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const btnEmpezar = document.getElementById('btnEmpezar');
    const btnCerrar = document.getElementById('btnCerrar');
    const seccionPersonaje = document.getElementById('seccion-personaje');
    const circuloMenu = document.querySelector('.circulo');
    const seccionRompecabezas = document.getElementById('seccion-rompecabezas');

    // Evento único y ordenado al hacer clic en "Empezar"
    btnEmpezar.addEventListener('click', () => {
        // 1. Ocultar el menú principal de bienvenida
        if (circuloMenu) {
            circuloMenu.style.display = 'none';
        }

        // 2. Mostrar la sección del personaje flotante
        if (seccionPersonaje) {
            seccionPersonaje.classList.remove('personaje-oculto');
            seccionPersonaje.classList.add('personaje-visible');
            seccionPersonaje.style.display = 'flex'; // Asegura que se muestre
        }

        // 3. Mostrar la sección del rompecabezas
        if (seccionRompecabezas) {
            seccionRompecabezas.style.display = 'flex';
        }
    });

    // Evento al hacer clic en el botón de cerrar/continuar del personaje (si aplica)
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            if (seccionPersonaje) {
                seccionPersonaje.classList.remove('personaje-visible');
                seccionPersonaje.classList.add('personaje-oculto');
            }
            alert("¡Que comience la aventura!");
        });
    }
});
