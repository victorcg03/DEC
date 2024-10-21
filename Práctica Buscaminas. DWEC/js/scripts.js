let numeroMinas;
window.addEventListener('load', () => {
    empezar.addEventListener('click', () => {
        if (numMinas.value < 5 || numMinas.value > 50) {
            error.innerText = "Tiene que ser un valor entre 5 y 50";
        } else {
            numeroMinas = numMinas.value;
            tablero.innerHTML = "";
            let celdas = generarTablero(numeroMinas);
            imprimirTablero(celdas);
            habilitarEventos();
        }
    });
});
function habilitarEventos(){
    document.querySelectorAll('.casilla').forEach(casilla=>{
        casilla.addEventListener('click', revelarCasilla);
    });
}
let casillasReveladas = 0;
function revelarCasilla(event){
    event.target.classList.remove('oculto');
    event.target.removeEventListener('click', revelarCasilla);
    casillasReveladas++;
    if (event.target.classList) {
        
    }
}
function generarTablero(numeroMinas) {
    let tableroArray = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    for (let i = 0; i < numeroMinas; i++) {
        let fila;
        let columna;
        do {
            fila = [getRandomIntInclusive(0, 9)];
            columna = [getRandomIntInclusive(0, 9)];
        } while (tableroArray[columna][fila] == 'bomba');
        tableroArray[columna][fila] = 'bomba'
    }
    for (let i = 0; i < tableroArray.length; i++) {
        for (let j = 0; j < tableroArray[i].length; j++) {
            if (tableroArray[i][j] == 'bomba') {
                if (j + 1 <= 9) {
                    if (tableroArray[i][j + 1] != 'bomba') {
                        tableroArray[i][j + 1] += 1;
                    }
                }
                if (j - 1 >= 0) {
                    if (tableroArray[i][j - 1] != 'bomba') {
                        tableroArray[i][j - 1] += 1;
                    }
                }
                if (i - 1 >= 0) {
                    if (tableroArray[i - 1][j] != 'bomba') {
                        tableroArray[i - 1][j] += 1;
                    }
                }
                if (i + 1 <= 9) {
                    if (tableroArray[i + 1][j] != 'bomba') {
                        tableroArray[i + 1][j] += 1;
                    }
                }
                if (i + 1 <= 9 && j + 1 <= 9) {
                    if (tableroArray[i + 1][j + 1] != 'bomba') {
                        tableroArray[i + 1][j + 1] += 1;
                    }
                }
                if (i + 1 <= 9 && j - 1 >= 0) {
                    if (tableroArray[i + 1][j - 1] != 'bomba') {
                        tableroArray[i + 1][j - 1] += 1;
                    }
                }
                if (i - 1 >= 0 && j + 1 <= 9) {
                    if (tableroArray[i - 1][j + 1] != 'bomba') {
                        tableroArray[i - 1][j + 1] += 1;
                    }
                }
                if (i - 1 >= 0 && j - 1 >= 0) {
                    if (tableroArray[i - 1][j - 1] != 'bomba') {
                        tableroArray[i - 1][j - 1] += 1;
                    }
                }
            }
        }
    }
    return tableroArray;
}
function imprimirTablero(tableroMinas) {
    for (let i = 0; i < tableroMinas.length; i++) {
        for (let j = 0; j < tableroMinas[i].length; j++) {
            let celda = tableroMinas[i][j];
            let claseCelda;
            let contenidoCelda;
            if (celda == 1) {
                claseCelda = " poco";
                contenidoCelda = 1;
            } else if (celda == 2) {
                claseCelda = " medio";
                contenidoCelda = 2;
            } else if (celda == 'bomba') {
                claseCelda = " mina";
                contenidoCelda = "";
            } else if (celda == 0) {
                claseCelda = "";
                contenidoCelda = "";
            } else {
                claseCelda = " mucho";
                contenidoCelda = celda;
            }
            tablero.innerHTML += `<div class="casilla oculto${claseCelda}">${contenidoCelda}</div>`
        }
    }
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}