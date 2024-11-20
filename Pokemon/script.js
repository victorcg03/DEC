window.addEventListener('load', iniciarNivel);

function iniciarNivel() {
    crearMapa();
}

function crearMapa() {
    const mapa = document.getElementById("mapa");
    const columnas = 31; // Número de columnas del mapa
    const filas = 20; // Número de filas del mapa

    // Crear todas las celdas como césped
    mapa.innerHTML = "";
    for (let y = 1; y <= filas; y++) {
        for (let x = 1; x <= columnas; x++) {
            mapa.innerHTML += `<div data-x=${x} data-y=${y} class="cesped celda"></div>`;
        }
    }

    // Generar el camino serpenteante
    let xActual = 1;
    let yActual = 1;
    let anchoCamino = 2;

    while (!(xActual === columnas && yActual === filas)) {
        // Dibujar el tramo actual del camino
        for (let dx = 0; dx < anchoCamino; dx++) {
            for (let dy = 0; dy < anchoCamino; dy++) {
                const celda = document.querySelector(`[data-x="${xActual + dx}"][data-y="${yActual + dy}"]`);
                if (celda) {
                    celda.classList.remove("cesped");
                    celda.classList.add("camino");
                }
            }
        }

        // Decidir dirección: moverse en X (izquierda/derecha) o en Y (hacia abajo)
        const direccion = getRandomIntInclusive(1, 3); // 1 = derecha, 2 = izquierda, 3 = abajo
        switch (direccion) {
            case 1: // Mover derecha
                xActual += getRandomIntInclusive(1, 2);
                break;
            case 2: // Mover izquierda
                xActual -= getRandomIntInclusive(1, 2);
                break;
            case 3: // Mover abajo
                yActual += 1;
                break;
        }

        // Ajustar ancho del camino aleatoriamente
        anchoCamino = getRandomIntInclusive(1, 2);

        // Asegurarse de que no salga de los límites
        if (xActual < 1) xActual = 1;
        if (xActual > columnas) xActual = columnas;
        if (yActual > filas) yActual = filas;

        // Asegurarse de que avanza hacia abajo al menos un poco cada iteración
        if (yActual === filas && xActual !== columnas) {
            xActual += 1; // Avanzar a la derecha si ya estamos en la última fila
        }
    }
}

// Función para generar un número aleatorio entre min y max (inclusive)
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
