let numeroMinas;
let puntuacion;
let casillasReveladas;
window.addEventListener('load', empezarPartida);
function empezarPartida(){
    empezar.addEventListener('click', () => {
        if (numMinas.value < 5 || numMinas.value > 50) {
            error.innerText = "Tiene que ser un valor entre 5 y 50";
        } else {
            menu.classList.add('ocultar');
            numeroMinas = numMinas.value;
            let celdas = generarTablero(numeroMinas);
            console.table(celdas);
            imprimirTablero(celdas);
            habilitarEventos();
            puntuacion = 0;
            casillasReveladas = 0;
        }
    });
}
function revelarCasilla(event){
    event.target.classList.remove('oculto');
    casillasReveladas++;
    if (event.target.classList.contains('mina')) {
        finPartida(false);
    } else {
        puntuacion += (event.target.innerText + 1) * numeroMinas;
        if (casillasReveladas == 100) {
            finPartida(true);
        }
    }
    event.target.removeEventListener('click', revelarCasilla);
}
function finPartida(ganada){
    protector.classList.remove('ocultar');
    mensajeFinal.innerHTML = 
                                `<p>Has ${ganada ? 'ganado' : 'perdido'} con ${puntuacion} puntos</p>
                                <button id="volverJugar">Volver a jugar</button>`;
    mensajeFinal.classList.remove('ocultar');
    volverJugar.addEventListener('click', ()=>{
        document.querySelectorAll('.casilla').forEach(casilla=>{
            casilla.remove();
        });
        mensajeFinal.classList.add('ocultar');
        protector.classList.add('ocultar');
        menu.classList.remove('ocultar');
        empezarPartida();
    });
}
function generarTablero(numeroMinas) {
    //Creo un array de 10x10 que será el tablero y le doy valores por defecto para tener el tamaño y los valores base
    let tableroArray = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    //Relleno el array del tablero con el numero de minas introducido de manera aleatoria y siempre q en la celda generada aleatoriamente no hubiese una mina ya
    for (let i = 0; i < numeroMinas; i++) {
        let fila;
        let columna;
        do {
            fila = getRandomIntInclusive(0, 9);
            columna = getRandomIntInclusive(0, 9);
        } while (tableroArray[columna][fila] == 'bomba');
        tableroArray[columna][fila] = 'bomba';
        tableroArray = actualizarCercanas(columna, fila, tableroArray);
    }
    //Recorro el array y a las celdas de alrededor de las celdas que son minas les sumo 1, 
    //para así por cada mina que tengan cerca, irá incrementando ese número (siempre que no sea tambien una bomba)
    return tableroArray;
}
function actualizarCercanas(columna, fila, tableroArray){
    for (let i = columna-1; i <= columna+1; i++) {
        if (i >= 0 && i <= 9) {
            for (let j = fila-1; j <= fila+1; j++) {
                if (j >= 0 && j <= 9) {
                    if (tableroArray[i][j] != 'bomba') {
                        tableroArray[i][j] += 1;
                    }
                }
            }   
        }
    }
    return tableroArray;
}
//Imprime el tablero en base a un array con su contenido
function imprimirTablero(tableroMinas) {
    for (let i = 0; i < tableroMinas.length; i++) {
        for (let j = 0; j < tableroMinas[i].length; j++) {
            let celda = tableroMinas[i][j];
            let claseCelda;
            let contenidoCelda;
            //Asigno la clase y el contenido de la celda en base a si es una mina, una celda sin minas cerca o según el numero de minas que le rodean
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
//Habilito los eventos de las celdas una vez cargadas
function habilitarEventos(){
    document.querySelectorAll('.casilla').forEach(casilla=>{
        casilla.addEventListener('click', revelarCasilla);
    });
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}