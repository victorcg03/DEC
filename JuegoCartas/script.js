let cartas = [
    { nombre: "AsTreboles", pos1: 0, pos2: 0 },
    { nombre: "DosTreboles", pos1: -147.7, pos2: 0 },
    { nombre: "TresTreboles", pos1: -295.4, pos2: 0 },
    { nombre: "CuatroTreboles", pos1: -443.1, pos2: 0 },
    { nombre: "CincoTreboles", pos1: -590.8, pos2: 0 },
    { nombre: "SeisTreboles", pos1: -738.5, pos2: 0 },
    { nombre: "SieteTreboles", pos1: -886.2, pos2: 0 },
    { nombre: "OchoTreboles", pos1: -1033.8, pos2: 0 },
    { nombre: "NueveTreboles", pos1: -1181.5, pos2: 0 },
    { nombre: "DiezTreboles", pos1: -1329.2, pos2: 0 },
    { nombre: "JotaTreboles", pos1: -1476.9, pos2: 0 },
    { nombre: "ReinaTreboles", pos1: -1624.6, pos2: 0 },
    { nombre: "ReyTreboles", pos1: -1772.3, pos2: 0 },
    { nombre: "AsDiamantes", pos1: 0, pos2: 230 },
    { nombre: "DosDiamantes", pos1: -147.7, pos2: 230 },
    { nombre: "TresDiamantes", pos1: -295.4, pos2: 230 },
    { nombre: "CuatroDiamantes", pos1: -443.1, pos2: 230 },
    { nombre: "CincoDiamantes", pos1: -590.8, pos2: 230 },
    { nombre: "SeisDiamantes", pos1: -738.5, pos2: 230 },
    { nombre: "SieteDiamantes", pos1: -886.2, pos2: 230 },
    { nombre: "OchoDiamantes", pos1: -1033.8, pos2: 230 },
    { nombre: "NueveDiamantes", pos1: -1181.5, pos2: 230 },
    { nombre: "DiezDiamantes", pos1: -1329.2, pos2: 230 },
    { nombre: "JotaDiamantes", pos1: -1476.9, pos2: 230 },
    { nombre: "ReinaDiamantes", pos1: -1624.6, pos2: 230 },
    { nombre: "ReyDiamantes", pos1: -1772.3, pos2: 230 },
    { nombre: "AsCorazones", pos1: 0, pos2: 460 },
    { nombre: "DosCorazones", pos1: -147.7, pos2: 460 },
    { nombre: "TresCorazones", pos1: -295.4, pos2: 460 },
    { nombre: "CuatroCorazones", pos1: -443.1, pos2: 460 },
    { nombre: "CincoCorazones", pos1: -590.8, pos2: 460 },
    { nombre: "SeisCorazones", pos1: -738.5, pos2: 460 },
    { nombre: "SieteCorazones", pos1: -886.2, pos2: 460 },
    { nombre: "OchoCorazones", pos1: -1033.8, pos2: 460 },
    { nombre: "NueveCorazones", pos1: -1181.5, pos2: 460 },
    { nombre: "DiezCorazones", pos1: -1329.2, pos2: 460 },
    { nombre: "JotaCorazones", pos1: -1476.9, pos2: 460 },
    { nombre: "ReinaCorazones", pos1: -1624.6, pos2: 460 },
    { nombre: "ReyCorazones", pos1: -1772.3, pos2: 460 },
    { nombre: "AsEspadas", pos1: 0, pos2: 690 },
    { nombre: "DosEspadas", pos1: -147.7, pos2: 690 },
    { nombre: "TresEspadas", pos1: -295.4, pos2: 690 },
    { nombre: "CuatroEspadas", pos1: -443.1, pos2: 690 },
    { nombre: "CincoEspadas", pos1: -590.8, pos2: 690 },
    { nombre: "SeisEspadas", pos1: -738.5, pos2: 690 },
    { nombre: "SieteEspadas", pos1: -886.2, pos2: 690 },
    { nombre: "OchoEspadas", pos1: -1033.8, pos2: 690 },
    { nombre: "NueveEspadas", pos1: -1181.5, pos2: 690 },
    { nombre: "DiezEspadas", pos1: -1329.2, pos2: 690 },
    { nombre: "JotaEspadas", pos1: -1476.9, pos2: 690 },
    { nombre: "ReinaEspadas", pos1: -1624.6, pos2: 690 },
    { nombre: "ReyEspadas", pos1: -1772.3, pos2: 690 }
];
window, addEventListener('load', habilitarEventoBoton);
let vidasRestantes;
let cartaClicada1;
let parejasAdivinadas;
let numParejas;
function habilitarEventoBoton(){
    botonJugar.addEventListener("click", function(){
        menu.style.display = "none";
        vidasRestantes = 5;
        cartaClicada1 = null;
        parejasAdivinadas = 0;
        numParejas = document.getElementById('dificultad').value;
        let cartasMostrar = generarCartas(numParejas);
        imprimirCartas(cartasMostrar);
    });
}
function finPartida(haGanado){
    let cartas = document.querySelectorAll('.carta');
    cartas.forEach(carta=>{
        carta.remove();
    });
    menuFinal.style.display = "flex";
    menuFinal.style.backgroundColor = haGanado ? "green" : "red";
    menuFinal.innerHTML = `<p>Has ${haGanado ? "ganado!" : "perdido..."}<p/>
                                        <button id="botonVolverJugar">Volver a jugar</button>`
}
function click(event) {
    event.target.classList.add('clicada');
    setTimeout(() => {
        event.target.classList.remove('oculta');
    }, 350);

    if (cartaClicada1 === null) {
        cartaClicada1 = event.target;
    } else {
        let cartaClicada2 = event.target;
        if (cartaClicada1.dataset.carta === cartaClicada2.dataset.carta) {
            cartaClicada1 = null;
            parejasAdivinadas++;
            if (parejasAdivinadas == numParejas) {
                finPartida(true);
            }
        } else {
            vidasRestantes--;
            if(vidasRestantes == 0){
                setTimeout(() => {
                    finPartida(false);
                },1500);
            }else {
                if (vidasRestantes < 2) {
                    vidas.style.color = "red";
                } else if (vidasRestantes < 3) {
                    vidas.style.color = "yellow";
                } else if (vidasRestantes < 4) {
                    vidas.style.color = "orange";
                }
            setTimeout(() => {
                cartaClicada1.classList.remove('clicada');
                cartaClicada2.classList.remove('clicada');
                cartaClicada1.classList.add('oculta');
                cartaClicada2.classList.add('oculta');
                cartaClicada1 = null;
            }, 1000);
            }
            vidas.innerText = vidasRestantes + " vidas";
        }
    }
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
function generarCartas(numCartas){
    let cartasMostrar = new Array(numCartas*2);
    for(let i = 0; i < numCartas; i++){
        let numRandom = getRandomIntInclusive(0, cartas.length-1);
        while (cartasMostrar.includes(cartas[numRandom])) {
            numRandom = getRandomIntInclusive(0, cartas.length-1);
        }
        let pos1 = getRandomIntInclusive(0, cartasMostrar.length-1);
        while (cartasMostrar[pos1] != null) {
            pos1 = getRandomIntInclusive(0, cartasMostrar.length-1);
        }
        cartasMostrar[pos1] = cartas[numRandom];

        let pos2 = getRandomIntInclusive(0, cartasMostrar.length-1);
        while (cartasMostrar[pos2] != null) {
            pos2 = getRandomIntInclusive(0, cartasMostrar.length-1);
        }
        cartasMostrar[pos2] = cartas[numRandom];
    }
    return cartasMostrar;
}
function imprimirCartas(cartasMostrar) {
    let body = document.querySelector('body');
    cartasMostrar.forEach(carta => {
        body.innerHTML += `<div class="carta oculta" data-carta="${carta.nombre}" style="background-position: ${carta.pos1}px -${carta.pos2}px ;"></div>`;
    });
    let cartasCreadas = document.querySelectorAll('.carta');
    cartasCreadas.forEach(carta=>{
        carta.addEventListener('mousedown', click);
    });
}


