let puntuacion = '00000';
let mapa;
let posicionActual;
let numeroMomias = 5;
let vidas = 5;
window.addEventListener('load', empezarNivel);
function empezarNivel() {
    if (vidas != 5) {
        body.classList.add('muerto');
        setTimeout(() => {
            body.classList.remove('muerto');
        }, 2000);
    }
    posicionActual = [0, 8];
    mapa = [[3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    generarMomias(numeroMomias);
    actualizarTablero(mapa);
    document.addEventListener('keydown', moverJugador);
}
function moverJugador(e) {
    document.removeEventListener('keydown', moverJugador);
    if (e.key == "w" && posicionActual[0] - 1 >= 0 && (mapa[posicionActual[0] - 1][posicionActual[1]] == 0 || mapa[posicionActual[0] - 1][posicionActual[1]] == 6)) {
        mapa[posicionActual[0] - 1][posicionActual[1]] = 4;
        mapa[posicionActual[0]][posicionActual[1]] = 6;
        posicionActual[0]--;
    } else if (e.key == "s" && posicionActual[0] + 1 < mapa.length && (mapa[posicionActual[0] + 1][posicionActual[1]] == 0 || mapa[posicionActual[0] + 1][posicionActual[1]] == 6)) {
        mapa[posicionActual[0] + 1][posicionActual[1]] = 4;
        mapa[posicionActual[0]][posicionActual[1]] = 6;
        posicionActual[0]++;
    } else if (e.key == "a" && posicionActual[1] - 1 >= 0 && (mapa[posicionActual[0]][posicionActual[1] - 1] == 0 || mapa[posicionActual[0]][posicionActual[1] - 1] == 6)) {
        mapa[posicionActual[0]][posicionActual[1] - 1] = 4;
        mapa[posicionActual[0]][posicionActual[1]] = 6;
        posicionActual[1]--;
    } else if (e.key == "d" && posicionActual[1] + 1 < mapa[posicionActual[0]].length && (mapa[posicionActual[0]][posicionActual[1] + 1] == 0 || mapa[posicionActual[0]][posicionActual[1] + 1] == 6)) {
        mapa[posicionActual[0]][posicionActual[1] + 1] = 4;
        mapa[posicionActual[0]][posicionActual[1]] = 6;
        posicionActual[1]++;
    }
    if (e.key == "a" || e.key == "d" || e.key == "w" || e.key == "s") {
        moverMomias();
        actualizarTablero();
    }

    document.addEventListener('keydown', moverJugador);
}
function generarMomias(numeroMomias) {
    for (let i = 0; i < numeroMomias; i++) {
        posicion1 = getRandomIntInclusive(0, mapa.length - 1);
        posicion2 = getRandomIntInclusive(0, mapa[posicion1].length - 1);
        while (mapa[posicion1][posicion2] != 0) {
            posicion1 = getRandomIntInclusive(0, mapa.length - 1);
            posicion2 = getRandomIntInclusive(0, mapa[posicion1].length - 1);
        }
        mapa[posicion1][posicion2] = 5;
    }
}
function moverMomias() {
    let nuevoMapa = mapa.map(fila => fila.slice());
    for (let fila = 0; fila < mapa.length; fila++) {
        for (let columna = 0; columna < mapa[fila].length; columna++) {
            if (mapa[fila][columna] == 5) {
                let momiaMovida = false;
                while (!momiaMovida) {
                    let moverHacia = getRandomIntInclusive(1, 4);
                    if (moverHacia == 1 && fila - 1 >= 0) {
                        if (mapa[fila - 1][columna] == 4) {

                            vidas--;
                            empezarNivel();
                            return;
                        } else if (mapa[fila - 1][columna] == 0 && nuevoMapa[fila - 1][columna] != 5) {
                            nuevoMapa[fila - 1][columna] = 5;
                            nuevoMapa[fila][columna] = 0;
                            momiaMovida = true;
                        }
                    }
                    else if (moverHacia == 2 && fila + 1 < mapa.length) {
                        if (mapa[fila + 1][columna] == 4) {
                            vidas--;
                            empezarNivel();
                            return;
                        } else if (mapa[fila + 1][columna] == 0 && nuevoMapa[fila + 1][columna] != 5) {
                            nuevoMapa[fila + 1][columna] = 5;
                            nuevoMapa[fila][columna] = 0;
                            momiaMovida = true;
                        }
                    }
                    else if (moverHacia == 3 && columna - 1 >= 0) {
                        if (mapa[fila][columna - 1] == 4) {
                            vidas--;
                            empezarNivel();
                            return;
                        } else if (mapa[fila][columna - 1] == 0 && nuevoMapa[fila][columna - 1] != 5) {
                            nuevoMapa[fila][columna - 1] = 5;
                            nuevoMapa[fila][columna] = 0;
                            momiaMovida = true;
                        }
                    }
                    else if (moverHacia == 4 && columna + 1 < mapa[fila].length) {
                        if (mapa[fila][columna + 1] == 4) {
                            vidas--;
                            empezarNivel();
                            return;
                        } else if (mapa[fila][columna + 1] == 0 && nuevoMapa[fila][columna + 1] != 5) {
                            nuevoMapa[fila][columna + 1] = 5;
                            nuevoMapa[fila][columna] = 0;
                            momiaMovida = true;
                        }
                    }
                }
            }
        }
    }
    mapa = nuevoMapa;
}


function actualizarTablero() {
    tablero.innerHTML = `<div id="marcador"><span class="score">SCORE</span><span class="puntuacion">${puntuacion}</span></div>
            <div id="vidas"><span class="score">Vidas:</span><span class="puntuacion">${vidas}</span></div>`;
    for (let fila = 0; fila < mapa.length; fila++) {
        for (let columna = 0; columna < mapa[fila].length; columna++) {
            let casilla = mapa[fila][columna];
            if (casilla == 0) {
                celda = "camino";
            } else if (casilla == 1) {
                celda = "columna";
            } else if (casilla == 3) {
                celda = "amarillo";
            } else if (casilla == 4) {
                celda = "jugador";
            } else if (casilla == 6) {
                celda = "visitada";
            } else {
                celda = "momia";
            }
            tablero.innerHTML += `<div class="celda ${celda}"></div>`;
        }
    }
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}