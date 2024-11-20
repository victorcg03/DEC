window.addEventListener('load', empezarNivel);
let numeroEnemigos = 1;
let intervalosEnemigos = [];
let vidas = 6;
let pergamino = true;
function empezarNivel() {
    generarMapa();
    generarEnemigos();
    actualizarVidas();
    document.addEventListener('keydown', capturarMovimientos);
}
function limpiarNivel() {
    document.removeEventListener('keydown', capturarMovimientos);
    intervalosEnemigos.forEach(intervalo => {
        clearInterval(intervalo);
    });
    setTimeout(() => {
        document.querySelectorAll(".celda").forEach(celda => {
            celda.remove();
        });
        empezarNivel();
    }, 1000);
}
function actualizarVidas() {
    let vidasDiv = document.querySelector("#vidas #numero");
    vidasDiv.innerHTML = "";
    for (let i = 0; i < vidas; i++) {
        vidasDiv.innerHTML += `<div class="vida"></div>`;
    }
}
function generarMapa() {
    const filas = 14;
    const columnas = 21;
    let XColumnas = [2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20];
    let YColumnas = [3, 4, 6, 7, 9, 10, 12, 13];
    for (let y = 1; y <= filas; y++) {
        for (let x = 1; x <= columnas; x++) {
            let clase;
            if (y == 1 && x != Math.trunc(columnas / 2) + 1) {
                clase = "amarillo";
            } else if (y == 1 && x == Math.trunc(columnas / 2) + 1) {
                clase = "jugador camino visitada";
            } else if (!XColumnas.includes(x) || !YColumnas.includes(y)) {
                clase = "camino";
            } else {
                clase = "columna";
            }
            mapa.innerHTML += `<div class="celda ${clase}" data-x="${x}" data-y="${y}"></div>`
        }
    }
}
function generarEnemigos() {
    for (let i = 0; i < numeroEnemigos; i++) {
        generarEnemigo(i);
    }
}
function generarEnemigo(n) {
    let x = getRandomIntInclusive(1, 21);
    let y = getRandomIntInclusive(2, 14);
    let celda = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
    while (!celda.classList.contains("camino") || celda.classList.contains("jugador") || celda.classList.contains("enemigo")) {
        x = getRandomIntInclusive(1, 21);
        y = getRandomIntInclusive(2, 14);
        celda = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
    }
    celda.classList.add("enemigo", `enemigo${n}`);
    let tiempo = 1000 - n * 100 < 300 ? 300 : 1000 - n * 100;
    let controlIntervalo = setInterval(() => moverEnemigo(`enemigo${n}`, controlIntervalo), tiempo);
    intervalosEnemigos.push(controlIntervalo);
}
function moverEnemigo(enemigo, intervalo) {
    let celdaActual = document.querySelector(`.${enemigo}`);
    for (let i = 0; i < 4; i++) {
        let x = celdaActual.dataset.x;
        let y = celdaActual.dataset.y;
        let rotacion;
        let direccion = getRandomIntInclusive(1, 4);
        if (direccion == 1) {
            // Arriba
            y--;
            rotacion = "rotate(-90deg)";
        } else if (direccion == 2) {
            // Abajo
            y++;
            rotacion = "rotate(90deg)";
        } else if (direccion == 3) {
            // Izquierda
            x--;
            rotacion = "rotateY(180deg)";
        } else if (direccion == 4) {
            // Derecha
            x++;
            rotacion = "rotateY(0deg)";
        }
        celdaObjetivo = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (celdaObjetivo && celdaObjetivo.classList.contains("camino") && !celdaObjetivo.classList.contains("enemigo") && y != 1) {
            celdaActual.classList.remove("enemigo", `${enemigo}`);
            celdaObjetivo.classList.add("enemigo", `${enemigo}`);
            celdaActual.style.transform = "none";
            celdaObjetivo.style.transform = rotacion;
            // Si el enemigo colisiona con el jugador
            if (celdaObjetivo.classList.contains("jugador")) {
                if (pergamino) {
                    pergamino = false;
                    clearInterval(intervalo);
                    celdaObjetivo.classList.remove("enemigo", `${enemigo}`);
                    celdaObjetivo.style.transform = "none";
                } else {
                    vidas--;
                    document.querySelector(".jugador").classList.remove("jugador");
                    limpiarNivel();
                }
            }
            break;
        }
    }

}

function capturarMovimientos(e) {
    let celdaActual = document.querySelector(".jugador");
    let x = celdaActual.dataset.x;
    let y = celdaActual.dataset.y;
    let rotacion;
    if (e.key == "w") {
        y--;
        rotacion = "rotate(-90deg)";
    } else if (e.key == "s") {
        y++;
        rotacion = "rotate(90deg)";
    } else if (e.key == "a") {
        x--;
        rotacion = "rotateY(180deg)";
    } else if (e.key == "d") {
        x++;
        rotacion = "rotateY(0deg)";
    }
    let celdaObjetivo = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (celdaObjetivo && celdaObjetivo.classList.contains("camino")) {
        celdaActual.classList.remove("jugador");
        celdaActual.style.transform = "none";
        celdaObjetivo.classList.add("jugador", "visitada");
        celdaObjetivo.style.transform = rotacion;
    }
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}