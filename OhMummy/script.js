window.addEventListener('load', empezarNivel);
let vidas = 5;
let puntuacion = 0;
let jugadorX = 9;
let jugadorY = 1;
let momias = [];
let recompensas = [];
let pergamino = false;
let sarcofago = false;
let llave = false;
let numeroMomias;
function empezarNivel() {
    if (llave && sarcofago) {
        body.classList.add('vivo');
        setTimeout(() => {
            body.classList.remove('vivo');
        }, 1200);
        numeroMomias++;
    }
    if (vidas != 5 && (!llave || !sarcofago)) {
        body.classList.add('muerto');
        setTimeout(() => {
            body.classList.remove('muerto');
        }, 1200);
        if (vidas == 0) {
            vidas = 5;
            puntuacion = 0;
            document.querySelector('#marcador .puntuacion').innerText = puntuacion.toString().padStart(5, '0');
        }
    }
    if (puntuacion == 0) {
        numeroMomias = 0;
    }
    jugadorX = 9;
    jugadorY = 1;
    momias = [];
    pergamino = false;
    sarcofago = false;
    llave = false;
    recompensas = ["cofre", "cofre", "cofre","cofre", "cofre", "cofre", "cofre", "cofre", "cofre", "llave", "sarcofago", "pergamino", "momiaPilar", "vacio", "vacio", "vacio",  "vacio", "vacio", "vacio", "vacio"]
    document.querySelectorAll('.celda').forEach(celda=>celda.remove());
    document.querySelector("#vidas .puntuacion").innerHTML = "";
    for (let i = 0; i < vidas; i++) {
        document.querySelector("#vidas .puntuacion").innerHTML += `<img width="50px" src='./3716059.png'/>`;        
    }
    generarMapa();
    generarMomias(numeroMomias);
    document.addEventListener('keydown', moverJugador);
}
function generarMapa(){
    const filas = 14;
    const columnas = 21;
    let XColumnas = [2,3,4,6,7,8,10,11,12,14,15,16,18,19,20];
    let YColumnas = [3,4,6,7,9,10,12,13];
    for (let y = 1; y <= filas; y++) {
      for (let x = 1; x <= columnas; x++) {
        let clase;
        if (y == 1 && x != 9) {
            clase = "amarillo";
        } else if(y == 1 && x == 9){
            clase = "jugador camino visitada";
        }else if(!XColumnas.includes(x) || !YColumnas.includes(y)){
            clase = "camino";
        } else{
            clase = "columna";
        }
        tablero.innerHTML += `<div class="celda ${clase}" data-x="${x}" data-y="${y}"></div>`
      }
    }
}
function moverJugador(e){
    let copiaX = jugadorX;
    let copiaY = jugadorY;
    if (e.key == "w") {
        copiaY--;
    } else if (e.key == "s"){
        copiaY++;
    } else if (e.key == "a"){
        copiaX--;
    } else if (e.key == "d"){
        copiaX++;
    }
    if (e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d") {
        if (copiaX > 0 && copiaX <= 21 && copiaY > 0 && copiaY <= 14) {
            let celda = document.querySelector(`[data-x="${copiaX}"][data-y="${copiaY}"]`);
            if (celda.classList.contains("camino")) {
                celda.classList.add("jugador");
                celda.classList.add("visitada");
                document.querySelector(`[data-x="${jugadorX}"][data-y="${jugadorY}"]`).classList.remove("jugador");
                jugadorX = copiaX;
                jugadorY = copiaY;
                comprobarColumnas();
            }
        }
        moverMomias();
    }   
}
function generarMomias(numero){
    for (let i = 1; i <= numero; i++) {
        let momiaX = getRandomIntInclusive(1,21);
        let momiaY = getRandomIntInclusive(2,14);
        let celda = document.querySelector(`[data-x="${momiaX}"][data-y="${momiaY}"]`);
        while (!celda.classList.contains("camino") || celda.classList.contains("momia")) {
            momiaX = getRandomIntInclusive(1,21);
            momiaY = getRandomIntInclusive(2,14);
            celda = document.querySelector(`[data-x="${momiaX}"][data-y="${momiaY}"]`);
        }
        celda.classList.add("momia");
        momias.push([momiaY, momiaX]);
    }
}
function moverMomias(){
    for (let i = 0; i < momias.length; i++) {
        let momiaMovida = false;
        let movimientosIntentados = [];
        
        while (!momiaMovida) {
            let momiaY = momias[i][0];
            let momiaX = momias[i][1];
            let difX = jugadorX - momiaX;
            let difY = jugadorY - momiaY;

            const movimientoYaIntentado = (y, x) => movimientosIntentados.some(m => m[0] === y && m[1] === x);

            if (Math.abs(difX) > Math.abs(difY)) {
                if (difX > 0 && !movimientoYaIntentado(momiaY, momiaX + 1)) {
                    momiaX++;
                } else if (difX < 0 && !movimientoYaIntentado(momiaY, momiaX - 1)) {
                    momiaX--;
                } else {
                    if (difY > 0 && !movimientoYaIntentado(momiaY + 1, momiaX)) {
                        momiaY++;
                    } else if (difY < 0 && !movimientoYaIntentado(momiaY - 1, momiaX)) {
                        momiaY--;
                    }
                }
            } else {
                if (difY > 0 && !movimientoYaIntentado(momiaY + 1, momiaX)) {
                    momiaY++;
                } else if (difY < 0 && !movimientoYaIntentado(momiaY - 1, momiaX)) {
                    momiaY--;
                } else {
                    if (difX > 0 && !movimientoYaIntentado(momiaY, momiaX + 1)) {
                        momiaX++;
                    } else if (difX < 0 && !movimientoYaIntentado(momiaY, momiaX - 1)) {
                        momiaX--;
                    }
                }
            }
            movimientosIntentados.push([momiaY, momiaX]);
            if (momiaX > 0 && momiaX <= 21 && momiaY > 0 && momiaY <= 14) {
                let celda = document.querySelector(`[data-x="${momiaX}"][data-y="${momiaY}"]`);
                if (celda.classList.contains("camino") && !celda.classList.contains("momia") && !celda.classList.contains("jugador")) {
                    celda.classList.add("momia");
                    document.querySelector(`[data-x="${momias[i][1]}"][data-y="${momias[i][0]}"]`).classList.remove("momia");
                    momias[i][1] = momiaX;
                    momias[i][0] = momiaY;
                    momiaMovida = true;
                } else if (celda.classList.contains("jugador")) {
                    if (!pergamino) {
                        vidas--;
                        empezarNivel();
                        momiaMovida = true;
                    } else {
                        document.querySelector(`[data-x="${momias[i][1]}"][data-y="${momias[i][0]}"]`).classList.remove("momia");
                        momias.splice(i,1);
                        momiaMovida = true;
                    }
                }
            }
            if (movimientosIntentados.length == 4) {
                momiaMovida = true;
            }
        }
    }
}
function comprobarColumnas(){
    let izqArriba = [[3,2],[3,6], [3,10], [3,14], [3,18],
                    [6,2],[6,6], [6,10], [6,14], [6,18],
                    [9,2],[9,6], [9,10], [9,14], [9,18],
                    [12,2],[12,6], [12,10], [12,14], [12,18]]
    izqArriba.forEach(esquina=>{
        let celdaEsquina = document.querySelector(`[data-x="${esquina[1]}"][data-y="${esquina[0]}"]`);
        if (celdaEsquina.classList.contains("columna")) {
            let descubierta = comprobarColumna(esquina);
            if (descubierta) {
                let posRandom = getRandomIntInclusive(0, recompensas.length-1);
                let recompensa = recompensas[posRandom];
                recompensas.splice(posRandom, 1);
                for (let fila = esquina[0]; fila <= esquina[0]+1; fila++) {
                    for (let columna = esquina[1]; columna <= esquina[1]+2; columna++) {
                        let celda = document.querySelector(`[data-x="${columna}"][data-y="${fila}"]`);
                        celda.classList.add(recompensa);
                        celda.classList.remove("columna");
                    }
                }
                if (recompensa == "cofre") {
                    puntuacion += 500;
                    document.querySelector('#marcador .puntuacion').innerText = puntuacion.toString().padStart(5, '0');
                } else if (recompensa == "llave") {
                    llave = true;
                } else if (recompensa == "sarcofago") {
                    sarcofago = true;
                }else if(recompensa == "pergamino"){
                    pergamino = true;
                } else if(recompensa == "momiaPilar"){
                    generarMomias(1);
                    numeroMomias++;
                }
                if (sarcofago && llave) {
                    puntuacion+=1500;
                    document.querySelector('#marcador .puntuacion').innerText = puntuacion.toString().padStart(5, '0');
                    empezarNivel();
                    return;
                }
                
            }
        }
    });
}
function comprobarColumna(esquina){
    for (let fila = esquina[0]-1; fila <= esquina[0]+2; fila++) {
        for (let columna = esquina[1]-1; columna <= esquina[1]+3; columna++) {
            let celda = document.querySelector(`[data-x="${columna}"][data-y="${fila}"]`);
            if (!celda.classList.contains("columna")) {
                if(!celda.classList.contains("visitada")){
                    return false;
                }
            }
        }
    }
    return true;
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}