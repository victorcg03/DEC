let cuadradosAleatorios;
let cuadrados;
let turno = 0;
window.addEventListener('load', function() {
    cuadrados = document.querySelectorAll('.cuadrado');
    boton.addEventListener('click', function () {
        tarjeta.style.display = 'none';
        document.querySelector('main').classList.remove('opacidad');
        cuadradosAleatorios = [];
        generarCuadrado();
    });
});
function generarCuadrado() {
    cuadrados.forEach(cuadrado =>{
        cuadrado.classList.remove('pulsado');
        cuadrado.classList.remove('hover');
    });
    cuadradosAleatorios.push(getRandomIntInclusive(1, 9));
    turno = 0;
    animarCuadrados();
}

function animarCuadrados() {
    for (let i = 0; i < cuadradosAleatorios.length; i++) {
        setTimeout(() => {
            const cuadradoElegido = document.getElementById(cuadradosAleatorios[i]);
            cuadradoElegido.classList.add('pulsado');
            setTimeout(() => {
                cuadradoElegido.classList.remove('pulsado');
            }, 500);
        }, i * 1000);
    }
    setTimeout(() => {
        habilitarInteraccion();
    }, cuadradosAleatorios.length * 1000 + 500);
}

function habilitarInteraccion() {
    cuadrados.forEach(cuadrado => {
        cuadrado.addEventListener('mouseover', hover);
        cuadrado.addEventListener('mouseleave', deshover);
        cuadrado.addEventListener('mousedown', pulsado);
        cuadrado.addEventListener('mouseup', despulsado);
    });
}

function hover(event) {
    event.target.classList.add('hover');
}

function deshover(event) {
    event.target.classList.remove('hover');
}

function pulsado(event) {
    event.target.classList.add('pulsado');
    if (event.target.id != cuadradosAleatorios[turno]) {
        finPartida(event);
        partidaPerdida.style.display = 'flex';
        setTimeout(() => {
            partidaPerdida.style.display = 'none';
            tarjeta.style.display = 'flex';
        }, 5000);
    } else {
        turno++;
        if (turno === 5) {
            finPartida(event);
            partidaGanada.style.display = 'flex';
            setTimeout(() => {
                partidaGanada.style.display = 'none';
                tarjeta.style.display = 'flex';
            }, 5000);
        } else {
            if (cuadradosAleatorios.length < 5 && turno == cuadradosAleatorios.length) {
                eliminarEventos();
                setTimeout(generarCuadrado, 1000); // Esperar 1 segundo antes de generar el siguiente
            }           
        }
    }
}
function finPartida(event){
        event.target.classList.remove('pulsado');
        event.target.classList.remove('hover');
        eliminarEventos();
        document.querySelector('main').classList.add('opacidad');
}
function despulsado(event) {
    event.target.classList.remove('pulsado');
}
function eliminarEventos() {
    cuadrados.forEach(cuadrado => {
        cuadrado.removeEventListener('mouseover', hover);
        // cuadrado.removeEventListener('mouseleave', deshover);
        cuadrado.removeEventListener('mousedown', pulsado);
        // cuadrado.removeEventListener('mouseup', despulsado);
    });
}
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // El máximo es inclusivo y el mínimo es inclusivo
}