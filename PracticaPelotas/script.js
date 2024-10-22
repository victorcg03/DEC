window.addEventListener('load', ()=>{
    let opciones = document.querySelectorAll('.opcion');
    opciones.forEach(opcion => {
        opcion.addEventListener('click', cambiarOpcion);
    }); 
    botonJugar.addEventListener('click', jugar);
})
function jugar(){
        menu.classList.add('oculto');
        let numeroPelotas = numPelotas.value;
        let modoJuego = document.getElementsByClassName('selected')[0].id;
        if (modoJuego == 'todas') {
            jugarEliminarTodas(numeroPelotas);
        } else{
            jugarEliminarColor(numeroPelotas);
        }
}
function cambiarOpcion(){
    let opciones = document.querySelectorAll('.opcion');
    opciones.forEach(op=>{
        op.classList.toggle('selected');
    });
}
function finJuego(){
    let pelotasRestantes = document.querySelectorAll('.pelota');
    pelotasRestantes.forEach(pelotaEliminar =>{
        pelotaEliminar.remove();
    })
    horas = 0;
    minutos = 0;
    segundos = 0;
    let pantallaJuego = document.getElementById('main');
    let infoFinal = document.getElementById('infoFinal');
    infoFinal.classList.remove('oculto');
    pantallaJuego.style.flexDirection = 'column';
    infoFinal.innerHTML += `<button id="reiniciar">Volver a jugar</button>`;
    pantallaJuego.style.justifyContent = 'start';
    pantallaJuego.style.alignItems = 'center';
    cronometro.innerText = '00:00:00';
    correctas.innerText = '0';
    incorrectas.innerText = '0';
    reiniciar.addEventListener('click', ()=>{
        infoFinal.classList.add('oculto');
        menu.classList.remove('oculto');
        let opciones = document.querySelectorAll('.opcion');
        opciones.forEach(opcion => {
            opcion.addEventListener('click', cambiarOpcion);
        }); 
        botonJugar.addEventListener('click', jugar);
        pantallaJuego.style.justifyContent = 'end';
        pantallaJuego.style.paddingBottom = "20px";
    })
}
function jugarEliminarTodas(numeroPelotas){
    generarPelotas(numeroPelotas);
    cronometrar();
    let pelotasEliminadas = 0;
    document.querySelectorAll('.pelota').forEach(pelota =>{
        pelota.addEventListener('dblclick', ()=>{
            pelota.classList.add('oculto');
            pelotasEliminadas++;
            correctas.innerText = pelotasEliminadas;
            if (pelotasEliminadas == numeroPelotas) {
                parar();
                infoFinal.innerHTML = `<p>Has eliminado ${pelotasEliminadas} pelotas, en ${horas*60*60 + minutos * 60 + segundos} segundos</p>`;
                finJuego();
            }
        });
    });
}
function generarPelotas(numeroPelotas){
    let pantallaJuego = document.getElementById('main');
    pantallaJuego.style.padding = 0;
    for (let pelota = 0; pelota < numeroPelotas; pelota++) {
        let tamano = getRandomIntInclusive(10, 400);
        let top = getRandomIntInclusive(2, 100 - tamano / pantallaJuego.offsetHeight * 100);
        let left = getRandomIntInclusive(2, 100 - tamano / pantallaJuego.offsetWidth * 100);
        let rojo = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
        let verde = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
        let azul = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
        pantallaJuego.innerHTML += `<div class="pelota" style= 
                                                        "position:absolute;
                                                        top:${top}%;
                                                        left:${left}%;
                                                        width: ${tamano}px;
                                                        height: ${tamano}px;
                                                        background-color: #${rojo}${verde}${azul};">
                                    </div>`;
    }
}
function jugarEliminarColor(numeroPelotas){
    let colores = ['red', 'green', 'blue'];
    colorEliminar = colores[getRandomIntInclusive(0, 2)];
    menu.classList.add('oculto');
    menuEliminarColor.classList.remove('oculto');
    let pelotaColor = document.getElementById('pelotaEjemplo');
    pelotaColor.style.backgroundColor = colorEliminar;
    botonIniciar.addEventListener('click', ()=>{
        menuEliminarColor.classList.add('oculto');
        generarPelotasColor(numeroPelotas, colorEliminar);
        cronometrar();
        let pelotasEliminadas = 0;
        let pelotasCorrectas = 0;
        let pelotasinCorrectas = 0;
        document.querySelectorAll('.pelota').forEach(pelota =>{
            pelota.addEventListener('dblclick', ()=>{
                pelotasEliminadas++;
                pelota.classList.add('oculto');
                if (pelota.id == 'objetivo') {
                    pelotasCorrectas++;
                    correctas.innerText = pelotasCorrectas;
                }else{
                    pelotasinCorrectas++;
                    incorrectas.innerText = pelotasinCorrectas;
                }
                if (pelotasCorrectas == numeroPelotas/2) {
                    parar();
                    infoFinal.innerHTML = `<p>Has eliminado ${pelotasEliminadas} pelotas, ${pelotasCorrectas} correctas y ${pelotasinCorrectas} incorrectas, en ${horas*60*60 + minutos * 60 + segundos} segundos</p>`;
                    finJuego();
                }
            });
        });
    });
}
function generarPelotasColor(numeroPelotas, color){
    let pantallaJuego = document.getElementById('main');
    pantallaJuego.style.padding = 0;
    for (let pelota = 0; pelota < numeroPelotas; pelota++) {
        let tamano = getRandomIntInclusive(10, 400);
        let top = getRandomIntInclusive(2, 100 - tamano / pantallaJuego.offsetHeight * 100);
        let left = getRandomIntInclusive(2, 100 - tamano / pantallaJuego.offsetWidth * 100);
        let zIndex;
        let bgColor;
        let rojo;
        let verde;
        let azul;
        let id = "";
        if (pelota < numeroPelotas/2) {
            id = 'objetivo';
            bgColor = color;
            zIndex = 1;
        }else{
            if (color == 'red') {
                rojo = '00';
                verde = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
                azul = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
                bgColor = "#" + rojo + verde + azul;
            } else if(color == 'green'){
                rojo = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
                verde = '00';
                azul = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
                bgColor = "#" + rojo + verde + azul;
            }else{
                rojo = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
                verde = getRandomIntInclusive(1,255).toString(16).padStart(2, '0');
                azul = '00';
                bgColor = "#" + rojo + verde + azul;
            }
            zIndex = 0;
        }
        pantallaJuego.innerHTML += `<div id="${id}" class="pelota" style= 
                                                        "position:absolute;
                                                        top:${top}%;
                                                        left:${left}%;
                                                        z-index:${zIndex};
                                                        width: ${tamano}px;
                                                        height: ${tamano}px;
                                                        background-color: ${bgColor};">
                                    </div>`;
    }
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}











































let horas = 0;

let minutos = 0;

let segundos = 0;
let cronometro;
    /**********************CRONOMETRO***************************/
    //Comienza a cronometrar

    function cronometrar(){

        cronometro = document.getElementById('cronometro');

        crearReloj();

        intervalo = setInterval(crearReloj,1000);

    }

    function crearReloj(){

        let hAux, mAux, sAux;

        segundos++;

        if (segundos>59) {

            minutos++;

            segundos=0;

        }

        if (minutos>59) {

            horas++;

            minutos=0;

        }

        if (horas>24) horas=0;

        if (segundos<10) sAux="0"+segundos;

        else sAux=segundos;

        if (minutos<10) mAux="0"+minutos;

        else mAux=minutos;

        if (horas<10) hAux="0"+horas;

        else hAux=horas;

        cronometro.innerText = hAux + ":" + mAux + ":" + sAux;

    }

    //Detiene el cronometro

    function parar(){

        clearInterval(intervalo);

    }


